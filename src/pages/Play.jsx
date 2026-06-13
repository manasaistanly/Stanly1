import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, Text, Image, Environment, ContactShadows, Stars } from '@react-three/drei';
import { PROJECTS } from '../data/content';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';

import * as THREE from 'three';

// First-Person Player Controller
function Player() {
  const { camera } = useThree();
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
      switch(e.code) {
        case 'KeyW': case 'ArrowUp': setMovement(m => ({ ...m, forward: true })); break;
        case 'KeyS': case 'ArrowDown': setMovement(m => ({ ...m, backward: true })); break;
        case 'KeyA': case 'ArrowLeft': setMovement(m => ({ ...m, left: true })); break;
        case 'KeyD': case 'ArrowRight': setMovement(m => ({ ...m, right: true })); break;
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
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const speed = 0.15;
    
    // Create movement vectors
    const frontVector = new THREE.Vector3(0, 0, (movement.backward ? 1 : 0) - (movement.forward ? 1 : 0));
    const sideVector = new THREE.Vector3((movement.left ? -1 : 0) + (movement.right ? 1 : 0), 0, 0);
    
    const direction = new THREE.Vector3();
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed);
    
    // Apply current camera Y rotation to direction
    const euler = new THREE.Euler(0, camera.rotation.y, 0, 'YXZ');
    direction.applyEuler(euler);
    
    camera.position.add(direction);
    camera.position.y = 1.7; // Keep fixed height
  });
  
  return <PointerLockControls onLock={() => document.body.dataset.locked = 'true'} onUnlock={() => document.body.dataset.locked = 'false'} />;
}

// 3D Gallery Component
function Gallery() {
  const radius = 12;

  return (
    <group>
      {PROJECTS.map((proj, i) => {
        const angle = (i / PROJECTS.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        // Frame facing the center
        const rotationY = Math.atan2(x, z) + Math.PI;

        return (
          <group key={proj.id} position={[x, 1.5, z]} rotation={[0, rotationY, 0]}>
            {/* Project Image Frame */}
            <mesh position={[0, 0, -0.05]}>
              <boxGeometry args={[6.2, 3.7, 0.1]} />
              <meshStandardMaterial color="#222222" />
            </mesh>
            <Image url={proj.image} scale={[6, 3.5]} position={[0, 0, 0.01]} transparent opacity={0.9} />
            
            {/* Title */}
            <Text position={[0, 2.5, 0]} fontSize={0.6} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf" color="#ffffff" anchorX="center" anchorY="middle">
              {proj.title}
            </Text>

            {/* Description */}
            <Text position={[0, -2.5, 0]} fontSize={0.25} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf" color="#888888" anchorX="center" anchorY="middle" maxWidth={6} textAlign="center">
              {proj.description}
            </Text>

            {/* Accent Light */}
            <pointLight position={[0, 0, 3]} intensity={1.5} color="#e5553b" distance={10} />
          </group>
        );
      })}

      {/* Center Pedestal / Welcome Text */}
      <group position={[0, 1.5, 0]}>
        <Text position={[0, 1, 0]} fontSize={0.8} color="#e5553b" anchorX="center" anchorY="middle">
          Manasai Stanly
        </Text>
        <Text position={[0, 0, 0]} fontSize={0.3} color="#888888" anchorX="center" anchorY="middle">
          3D Portfolio Museum
        </Text>
        <Text position={[0, -0.5, 0]} fontSize={0.2} color="#444444" anchorX="center" anchorY="middle">
          Use WASD to explore
        </Text>
      </group>
    </group>
  );
}

export default function Play() {
  const [locked, setLocked] = useState(false);

  return (
    <PageTransition>
      <div className="fixed inset-0 w-full h-full bg-[#0a0a0a] overflow-hidden z-[100]">
        
        {/* Three.js Canvas */}
        <Canvas camera={{ position: [0, 1.7, 0], fov: 75 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.2} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <Player />
          <Gallery />

          {/* Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
          </mesh>
          
          {/* Cool floor reflection */}
          <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.5} far={10} color="#000000" />
        </Canvas>

        {/* UI Overlay */}
        <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-10 pointer-events-none flex justify-between">
          <Link to="/" className="font-display font-medium text-white text-[18px] hover:text-[#e5553b] transition-colors pointer-events-auto bg-[#111111]/80 px-6 py-3 rounded-full backdrop-blur-md border border-[#333333]">
            ← Exit Museum
          </Link>
        </div>

        {/* Start Overlay (Requires click for PointerLock) */}
        {!locked && (
          <div 
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={(e) => {
              // The PointerLockControls component handles the actual locking when canvas is clicked,
              // but we need to hide this overlay so the canvas receives the click.
              setLocked(true);
            }}
          >
            <div className="text-center">
              <h1 className="font-display font-black text-[clamp(40px,6vw,80px)] text-white tracking-tight mb-4">
                3D Museum
              </h1>
              <p className="font-body text-[#888888] text-[20px] mb-8">
                Click anywhere to enter.<br/>Use <strong className="text-white">WASD</strong> and <strong className="text-white">Mouse</strong> to explore.
              </p>
              <div className="text-[#e5553b] animate-pulse font-medium tracking-widest uppercase">
                [ Click to Start ]
              </div>
            </div>
          </div>
        )}

        {/* Esc instruction when locked */}
        {locked && (
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#888888] font-mono text-[14px] pointer-events-none opacity-50">
             Press ESC to show cursor
           </div>
        )}
      </div>
    </PageTransition>
  );
}
