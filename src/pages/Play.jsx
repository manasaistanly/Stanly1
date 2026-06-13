import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, Text, Image, MeshReflectorMaterial, Stars } from '@react-three/drei';
import { PERSONAL, PROJECTS, SERVICES, ACHIEVEMENTS } from '../data/content';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

// Global state for interaction
const store = {
  hovered: null,
  active: null,
  setHovered: () => {},
  setActive: () => {},
  setLocked: () => {}
};

// First-Person Player Controller
function Player() {
  const { camera, scene } = useThree();
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false });
  const raycaster = useRef(new THREE.Raycaster());
  const center = new THREE.Vector2(0, 0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
      switch(e.code) {
        case 'KeyW': case 'ArrowUp': setMovement(m => ({ ...m, forward: true })); break;
        case 'KeyS': case 'ArrowDown': setMovement(m => ({ ...m, backward: true })); break;
        case 'KeyA': case 'ArrowLeft': setMovement(m => ({ ...m, left: true })); break;
        case 'KeyD': case 'ArrowRight': setMovement(m => ({ ...m, right: true })); break;
        case 'KeyE': 
          if (store.hovered && !store.active) {
            document.exitPointerLock();
            store.setActive(store.hovered);
          }
          break;
      }
    };
    const handleKeyUp = (e) => {
      switch(e.code) {
        case 'KeyW': case 'ArrowUp': setMovement(m => ({ ...m, forward: false })); break;
        case 'KeyS': case 'ArrowDown': setMovement(m => ({ ...m, backward: false })); break;
        case 'KeyA': case 'ArrowLeft': setMovement(m => ({ ...m, left: false })); break;
        case 'KeyD': case 'ArrowRight': setMovement(m => ({ ...m, right: false })); break;
      }
    };
    const handleClick = () => {
      if (store.hovered && !store.active) {
        document.exitPointerLock();
        store.setActive(store.hovered);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useFrame(() => {
    if (store.active) return; // Prevent movement when modal is open

    const speed = 0.2;
    
    // Create movement vectors
    const frontVector = new THREE.Vector3(0, 0, (movement.backward ? 1 : 0) - (movement.forward ? 1 : 0));
    const sideVector = new THREE.Vector3((movement.left ? -1 : 0) + (movement.right ? 1 : 0), 0, 0);
    
    const direction = new THREE.Vector3();
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed);
    
    // Apply current camera Y rotation to direction
    const euler = new THREE.Euler(0, camera.rotation.y, 0, 'YXZ');
    direction.applyEuler(euler);
    
    camera.position.add(direction);
    camera.position.y = 1.7; // Fixed height

    // Simple Collision Bounds (100x100 room)
    camera.position.x = Math.max(-48, Math.min(48, camera.position.x));
    camera.position.z = Math.max(-48, Math.min(48, camera.position.z));

    // Raycasting for Interaction
    raycaster.current.setFromCamera(center, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    const exhibitHit = intersects.find(hit => hit.object.userData?.isExhibit);
    
    if (exhibitHit) {
      if (store.hovered?.id !== exhibitHit.object.userData.data.id) {
        store.setHovered(exhibitHit.object.userData.data);
      }
    } else {
      if (store.hovered) store.setHovered(null);
    }
  });
  
  return <PointerLockControls onLock={() => store.setLocked(true)} onUnlock={() => store.setLocked(false)} />;
}

// Reusable Exhibit Frame Component
function ExhibitFrame({ position, rotation, data, image, title, subtitle }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Interaction Hitbox */}
      <mesh position={[0, 1.5, 0]} userData={{ isExhibit: true, data }}>
        <boxGeometry args={[7, 5, 0.5]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Frame Mesh */}
      <mesh position={[0, 1.5, -0.1]}>
        <boxGeometry args={[6.2, 3.7, 0.1]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {image && <Image url={image} scale={[6, 3.5]} position={[0, 1.5, -0.04]} transparent opacity={0.9} />}
      {!image && (
        <mesh position={[0, 1.5, -0.04]}>
          <planeGeometry args={[6, 3.5]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      )}

      {/* Texts */}
      <Text position={[0, 3.8, 0]} fontSize={0.5} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf" color="#ffffff" anchorX="center" anchorY="middle">
        {title}
      </Text>
      <Text position={[0, -0.8, 0]} fontSize={0.25} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf" color="#888888" anchorX="center" anchorY="middle" maxWidth={6} textAlign="center">
        {subtitle}
      </Text>

      {/* Ambient Glow */}
      <pointLight position={[0, 1.5, 2]} intensity={0.5} color="#e5553b" distance={10} />
    </group>
  );
}

// 3D Environment Architecture
function Architecture() {
  return (
    <group>
      {/* Ultra-Realistic Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          roughness={0.15}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.8}
        />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 5, -50]}>
        <boxGeometry args={[100, 10, 1]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 5, 50]}>
        <boxGeometry args={[100, 10, 1]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
      <mesh position={[-50, 5, 0]}>
        <boxGeometry args={[1, 10, 100]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
      <mesh position={[50, 5, 0]}>
        <boxGeometry args={[1, 10, 100]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* Center Monument (About Me) */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Interaction Hitbox */}
        <mesh position={[0, 1, 0]} userData={{ isExhibit: true, data: { type: 'about', title: PERSONAL.name, description: PERSONAL.bioLong } }}>
          <boxGeometry args={[3, 3, 3]} />
          <meshBasicMaterial visible={false} />
        </mesh>
        
        <Text position={[0, 3, 0]} fontSize={0.8} color="#e5553b" anchorX="center" anchorY="middle">
          {PERSONAL.name}
        </Text>
        <Text position={[0, 2.3, 0]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
          {PERSONAL.roleLine1}
        </Text>
        <Text position={[0, 1.8, 0]} fontSize={0.2} color="#888888" anchorX="center" anchorY="middle" maxWidth={4} textAlign="center">
          {PERSONAL.bioShort}
        </Text>
        
        <pointLight position={[0, 4, 0]} intensity={2} color="#e5553b" distance={15} />
      </group>

      {/* North Wing: Projects */}
      <Text position={[0, 6, -15]} fontSize={1} color="#333333" anchorX="center" anchorY="middle">
        PROJECTS GALLERY
      </Text>
      {PROJECTS.map((proj, i) => {
        const radius = 18;
        const angle = -Math.PI / 2 + (i - (PROJECTS.length-1)/2) * 0.4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius - 15;
        const rotationY = Math.atan2(x, z + 15) + Math.PI;

        return (
          <ExhibitFrame 
            key={`proj-${proj.id}`}
            position={[x, 0, z]}
            rotation={[0, rotationY, 0]}
            data={{ type: 'project', ...proj }}
            image={proj.image}
            title={proj.title}
            subtitle={proj.description}
          />
        );
      })}

      {/* West Wing: Services */}
      <Text position={[-25, 6, 0]} rotation={[0, Math.PI/2, 0]} fontSize={1} color="#333333" anchorX="center" anchorY="middle">
        SERVICES & EXPERTISE
      </Text>
      {SERVICES.map((srv, i) => {
        const z = (i - (SERVICES.length-1)/2) * 8;
        return (
          <ExhibitFrame 
            key={`srv-${srv.id}`}
            position={[-25, 0, z]}
            rotation={[0, Math.PI/2, 0]}
            data={{ type: 'service', ...srv }}
            title={srv.title}
            subtitle={srv.description}
          />
        );
      })}

      {/* East Wing: Achievements */}
      <Text position={[25, 6, 0]} rotation={[0, -Math.PI/2, 0]} fontSize={1} color="#333333" anchorX="center" anchorY="middle">
        ACHIEVEMENTS
      </Text>
      {ACHIEVEMENTS.map((ach, i) => {
        const z = (i - (ACHIEVEMENTS.length-1)/2) * 6;
        return (
          <ExhibitFrame 
            key={`ach-${ach.index}`}
            position={[25, 0, z]}
            rotation={[0, -Math.PI/2, 0]}
            data={{ type: 'achievement', ...ach }}
            title={ach.title}
            subtitle={ach.platform}
          />
        );
      })}

    </group>
  );
}

// Modals UI Component
function ModalOverlay({ active, onClose }) {
  if (!active) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#111111] border border-[#333333] rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl animate-fade-in-up">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[#888888] hover:text-white transition-colors text-2xl"
        >
          &times;
        </button>

        {active.type === 'project' && (
          <>
            <h2 className="font-display font-bold text-3xl text-white mb-2">{active.title}</h2>
            <div className="text-[#e5553b] text-sm font-mono mb-6">{active.year}</div>
            
            {active.image && (
              <img src={active.image} alt={active.title} className="w-full h-64 object-cover rounded-xl mb-6 border border-[#222222]" />
            )}
            
            <p className="font-body text-[#cccccc] text-lg leading-relaxed mb-8">
              {active.longDescription || active.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {active.tags?.map(tag => (
                <span key={tag} className="bg-[#222222] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {active.link && (
              <a href={active.link} target="_blank" rel="noreferrer" className="inline-block bg-[#e5553b] text-white font-medium px-6 py-3 rounded-full hover:bg-[#ff6b4f] transition-colors">
                View Project Source
              </a>
            )}
          </>
        )}

        {active.type === 'service' && (
          <>
            <div className="text-[#e5553b] font-display font-black text-5xl mb-4">{active.index}</div>
            <h2 className="font-display font-bold text-3xl text-white mb-6">{active.title}</h2>
            <p className="font-body text-[#cccccc] text-lg mb-8">{active.description}</p>
            <div className="grid grid-cols-2 gap-4">
              {active.items?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white">
                  <span className="text-[#e5553b]">▹</span> {item}
                </div>
              ))}
            </div>
          </>
        )}

        {active.type === 'about' && (
          <>
            <h2 className="font-display font-bold text-3xl text-white mb-2">{active.title}</h2>
            <div className="text-[#e5553b] font-medium mb-6">About the Architect</div>
            <p className="font-body text-[#cccccc] text-lg leading-relaxed">
              {active.description}
            </p>
          </>
        )}

        {active.type === 'achievement' && (
          <>
            <h2 className="font-display font-bold text-3xl text-white mb-4">{active.title}</h2>
            <div className="text-[#e5553b] text-lg mb-6">Platform: {active.platform || active.subtitle}</div>
            <p className="font-body text-[#888888]">This achievement represents a milestone in continuous learning and professional execution.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function Play() {
  const [locked, setLocked] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(null);

  // Sync state to the global store for the 3D loop to access
  useEffect(() => {
    store.setHovered = setHovered;
    store.setActive = setActive;
    store.setLocked = setLocked;
  }, []);

  useEffect(() => {
    store.hovered = hovered;
  }, [hovered]);

  useEffect(() => {
    store.active = active;
  }, [active]);

  return (
    <PageTransition>
      <div className="fixed inset-0 w-full h-full bg-[#050505] overflow-hidden z-[100]">
        
        {/* Three.js Canvas */}
        <Canvas camera={{ position: [0, 1.7, 10], fov: 75 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <Player />
          <Architecture />
        </Canvas>

        {/* UI Overlay: Crosshair */}
        {locked && !active && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${hovered ? 'bg-[#e5553b] scale-150' : 'bg-white/50'}`} />
          </div>
        )}

        {/* UI Overlay: Hover Interaction Prompt */}
        {locked && !active && hovered && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 animate-fade-in-up">
            <div className="text-white font-display text-2xl font-bold mb-1 drop-shadow-lg">{hovered.title || hovered.name}</div>
            <div className="text-[#e5553b] font-mono text-sm tracking-widest uppercase">[ Click or E to Inspect ]</div>
          </div>
        )}

        {/* Start / Intro Overlay */}
        {!locked && !active && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none">
            <div className="text-center max-w-2xl px-6">
              <h1 className="font-display font-black text-[clamp(40px,6vw,80px)] text-white tracking-tight mb-4 drop-shadow-2xl">
                The Metaverse Gallery
              </h1>
              <p className="font-body text-[#aaaaaa] text-[18px] mb-8 leading-relaxed">
                Step into a fully interactive 3D exhibition of my work, skills, and achievements.<br/>
                Navigate using <strong className="text-white">WASD</strong>. Look around with your <strong className="text-white">Mouse</strong>.<br/>
                Click on any exhibit to view its deep details.
              </p>
              <div className="inline-block bg-[#e5553b] text-white font-medium px-8 py-4 rounded-full hover:bg-[#ff6b4f] transition-all duration-300 shadow-[0_0_20px_rgba(229,85,59,0.4)]">
                Click Anywhere to Enter
              </div>
            </div>
          </div>
        )}

        {/* Exit Museum Button */}
        <div className="absolute top-8 left-8 z-30">
          <Link to="/" className="font-display font-medium text-white text-[16px] hover:text-[#e5553b] transition-colors bg-[#111111]/80 px-6 py-3 rounded-full backdrop-blur-md border border-[#333333]">
            ← Exit
          </Link>
        </div>

        {/* React UI Modals */}
        <ModalOverlay 
          active={active} 
          onClose={() => {
            setActive(null);
            // Optionally auto-lock again, but let's let the user click the background to re-enter
          }} 
        />

        {/* Esc instruction when locked */}
        {locked && !active && (
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#666666] font-mono text-[12px] pointer-events-none tracking-widest uppercase">
             Press ESC to pause
           </div>
        )}
      </div>
    </PageTransition>
  );
}
