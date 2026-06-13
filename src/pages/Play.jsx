import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';

export default function Play() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Game state
    let animationId;
    let keys = {};
    
    const ship = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 15,
      angle: 0,
      rotation: 0,
      thrusting: false,
      thrust: { x: 0, y: 0 },
      cooldown: 0
    };

    let bullets = [];
    let asteroids = [];
    let particles = [];
    let currentScore = 0;

    // Spawn Asteroids
    const createAsteroid = (x, y, radius, level = 1) => {
      const v = 1 + Math.random() * 2;
      const a = Math.random() * Math.PI * 2;
      asteroids.push({
        x: x || Math.random() * canvas.width,
        y: y || Math.random() * canvas.height,
        radius: radius || 40,
        dx: Math.cos(a) * v,
        dy: Math.sin(a) * v,
        level: level,
        vertices: Math.floor(Math.random() * 5) + 5,
        offsets: Array.from({length: 10}, () => Math.random() * 0.4 + 0.8)
      });
    };

    // Initial Asteroids
    for(let i=0; i<5; i++) {
      let x, y;
      do {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      } while (Math.hypot(ship.x - x, ship.y - y) < 100);
      createAsteroid(x, y);
    }

    const explode = (x, y, color) => {
      for(let i=0; i<15; i++) {
        particles.push({
          x, y,
          dx: (Math.random() - 0.5) * 5,
          dy: (Math.random() - 0.5) * 5,
          life: 1,
          color
        });
      }
    };

    window.addEventListener('keydown', e => keys[e.code] = true);
    window.addEventListener('keyup', e => keys[e.code] = false);

    const update = () => {
      // Ship rotation
      if (keys['ArrowLeft']) ship.angle -= 0.1;
      if (keys['ArrowRight']) ship.angle += 0.1;
      
      // Ship thrust
      if (keys['ArrowUp']) {
        ship.thrust.x += Math.cos(ship.angle) * 0.1;
        ship.thrust.y += Math.sin(ship.angle) * 0.1;
        ship.thrusting = true;
      } else {
        ship.thrusting = false;
        ship.thrust.x *= 0.99;
        ship.thrust.y *= 0.99;
      }

      // Ship friction and velocity limits
      const speed = Math.hypot(ship.thrust.x, ship.thrust.y);
      if (speed > 7) {
        ship.thrust.x = (ship.thrust.x / speed) * 7;
        ship.thrust.y = (ship.thrust.y / speed) * 7;
      }

      ship.x += ship.thrust.x;
      ship.y += ship.thrust.y;

      // Screen wrap
      if (ship.x < 0) ship.x = canvas.width;
      if (ship.x > canvas.width) ship.x = 0;
      if (ship.y < 0) ship.y = canvas.height;
      if (ship.y > canvas.height) ship.y = 0;

      // Shooting
      if (ship.cooldown > 0) ship.cooldown--;
      if (keys['Space'] && ship.cooldown === 0) {
        bullets.push({
          x: ship.x + Math.cos(ship.angle) * ship.radius,
          y: ship.y + Math.sin(ship.angle) * ship.radius,
          dx: Math.cos(ship.angle) * 10,
          dy: Math.sin(ship.angle) * 10,
          life: 60
        });
        ship.cooldown = 15;
      }

      // Update Bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.x += b.dx;
        b.y += b.dy;
        b.life--;
        
        if (b.x < 0) b.x = canvas.width;
        if (b.x > canvas.width) b.x = 0;
        if (b.y < 0) b.y = canvas.height;
        if (b.y > canvas.height) b.y = 0;

        if (b.life <= 0) bullets.splice(i, 1);
      }

      // Update Asteroids & Collisions
      for (let i = asteroids.length - 1; i >= 0; i--) {
        const a = asteroids[i];
        a.x += a.dx;
        a.y += a.dy;

        if (a.x < -a.radius) a.x = canvas.width + a.radius;
        if (a.x > canvas.width + a.radius) a.x = -a.radius;
        if (a.y < -a.radius) a.y = canvas.height + a.radius;
        if (a.y > canvas.height + a.radius) a.y = -a.radius;

        // Check bullet hit
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (Math.hypot(a.x - b.x, a.y - b.y) < a.radius) {
            explode(a.x, a.y, '#e5553b');
            bullets.splice(j, 1);
            
            if (a.radius > 20) {
              createAsteroid(a.x, a.y, a.radius / 2, a.level + 1);
              createAsteroid(a.x, a.y, a.radius / 2, a.level + 1);
            }
            asteroids.splice(i, 1);
            currentScore += a.level * 100;
            setScore(currentScore);
            break;
          }
        }

        // Check ship hit
        if (asteroids[i] && Math.hypot(ship.x - a.x, ship.y - a.y) < ship.radius + a.radius) {
          explode(ship.x, ship.y, '#ffffff');
          setGameOver(true);
          return; // Stop update loop
        }
      }

      // Spawn new wave if cleared
      if (asteroids.length === 0) {
        for(let i=0; i<5 + Math.floor(currentScore/1000); i++) {
          let x, y;
          do {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
          } while (Math.hypot(ship.x - x, ship.y - y) < 100);
          createAsteroid(x, y);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].x += particles[i].dx;
        particles[i].y += particles[i].dy;
        particles[i].life -= 0.02;
        if (particles[i].life <= 0) particles.splice(i, 1);
      }
    };

    const draw = () => {
      ctx.fillStyle = '#111111';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid (Optional aesthetic)
      ctx.strokeStyle = '#222222';
      ctx.lineWidth = 1;
      for(let x=0; x<canvas.width; x+=50) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for(let y=0; y<canvas.height; y+=50) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Draw Ship
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.angle);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ship.radius, 0);
      ctx.lineTo(-ship.radius, ship.radius * 0.7);
      ctx.lineTo(-ship.radius * 0.5, 0);
      ctx.lineTo(-ship.radius, -ship.radius * 0.7);
      ctx.closePath();
      ctx.stroke();

      // Draw Thrust
      if (ship.thrusting) {
        ctx.strokeStyle = '#e5553b';
        ctx.beginPath();
        ctx.moveTo(-ship.radius * 0.6, 0);
        ctx.lineTo(-ship.radius * 1.5, ship.radius * 0.3);
        ctx.lineTo(-ship.radius * 1.2, 0);
        ctx.lineTo(-ship.radius * 1.5, -ship.radius * 0.3);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();

      // Draw Bullets
      ctx.fillStyle = '#ffffff';
      bullets.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Asteroids
      ctx.strokeStyle = '#e5553b';
      ctx.lineWidth = 2;
      asteroids.forEach(a => {
        ctx.beginPath();
        for (let j = 0; j < a.vertices; j++) {
          const angle = (j / a.vertices) * Math.PI * 2;
          const r = a.radius * a.offsets[j];
          const x = a.x + Math.cos(angle) * r;
          const y = a.y + Math.sin(angle) * r;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      });

      // Draw Particles
      particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (gameOver) return;
      update();
      draw();
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', e => keys[e.code] = true);
      window.removeEventListener('keyup', e => keys[e.code] = false);
    };
  }, [gameStarted, gameOver]);

  return (
    <PageTransition>
      <div className="fixed inset-0 bg-[#111111] overflow-hidden">
        
        {/* Canvas Background */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 block" />

        {/* UI Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12">
          
          <div className="flex justify-between items-start">
            <Link to="/" className="font-display font-medium text-white text-[18px] hover:text-[#e5553b] transition-colors pointer-events-auto">
              ← Back to Portfolio
            </Link>
            <div className="text-right">
              <div className="font-mono text-[#888888] text-[14px] uppercase tracking-widest">Score</div>
              <div className="font-display font-bold text-white text-[40px] leading-none">{score}</div>
            </div>
          </div>

          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-[#161616]/80 backdrop-blur-md p-10 rounded-2xl border border-[#333333] text-center pointer-events-auto max-w-md">
                <h1 className="font-display font-bold text-[48px] text-white tracking-tight mb-2">Asteroids</h1>
                <p className="font-body text-[#888888] mb-8">
                  Use <strong className="text-white">Arrow Keys</strong> to move and steer. <br/>
                  Press <strong className="text-white">Space</strong> to shoot bugs.
                </p>
                <button 
                  onClick={() => setGameStarted(true)}
                  className="bg-[#e5553b] text-white px-8 py-3 rounded-full font-body font-medium hover:bg-[#ff6a4f] transition-colors"
                >
                  Start Game
                </button>
              </div>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-[#161616]/90 backdrop-blur-md p-10 rounded-2xl border border-[#e5553b]/50 text-center pointer-events-auto max-w-md">
                <h1 className="font-display font-bold text-[64px] text-white tracking-tight mb-2">Game Over</h1>
                <p className="font-body text-[#888888] mb-8 text-[20px]">
                  Final Score: <strong className="text-white">{score}</strong>
                </p>
                <button 
                  onClick={() => {
                    setScore(0);
                    setGameOver(false);
                    setGameStarted(true);
                  }}
                  className="bg-white text-black px-8 py-3 rounded-full font-body font-medium hover:bg-[#e5553b] hover:text-white transition-colors"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </PageTransition>
  );
}
