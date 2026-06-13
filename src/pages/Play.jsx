import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';

export default function Play() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // module aliases
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    // create an engine
    const engine = Engine.create();
    engineRef.current = engine;
    
    // adjust gravity for a more floaty/premium feel
    engine.gravity.y = 0.8;

    // create a renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#111111',
        pixelRatio: window.devicePixelRatio || 1
      }
    });

    // Color palette for the blocks
    const colors = ['#e5553b', '#222222', '#333333', '#ffffff', '#e5553b'];

    // create bodies
    const bodies = [];
    
    // Add some large "hero" blocks
    for (let i = 0; i < 15; i++) {
      const isCircle = Math.random() > 0.5;
      const size = Math.random() * 60 + 40;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * -1000 - 100; // start way above screen
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      let body;
      if (isCircle) {
        body = Bodies.circle(x, y, size / 2, {
          restitution: 0.9, // bouncy
          friction: 0.001,
          render: {
            fillStyle: color,
            strokeStyle: '#111111',
            lineWidth: 2
          }
        });
      } else {
        body = Bodies.rectangle(x, y, size, size, {
          restitution: 0.6,
          friction: 0.1,
          chamfer: { radius: 10 }, // rounded corners
          render: {
            fillStyle: color,
            strokeStyle: '#111111',
            lineWidth: 2
          }
        });
      }
      bodies.push(body);
    }

    // Add many small particles
    for (let i = 0; i < 40; i++) {
      const size = Math.random() * 20 + 10;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * -1000 - 100;
      
      bodies.push(Bodies.polygon(x, y, Math.floor(Math.random() * 3) + 3, size, {
        restitution: 0.5,
        render: {
          fillStyle: '#222222',
          strokeStyle: '#333333',
          lineWidth: 1
        }
      }));
    }

    // create static walls
    const wallOptions = { 
      isStatic: true,
      render: { fillStyle: 'transparent' } 
    };
    
    // Floor, ceiling, left, right
    const thickness = 100;
    const floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + thickness / 2, window.innerWidth + 200, thickness, wallOptions);
    const leftWall = Bodies.rectangle(0 - thickness / 2, window.innerHeight / 2, thickness, window.innerHeight * 2, wallOptions);
    const rightWall = Bodies.rectangle(window.innerWidth + thickness / 2, window.innerHeight / 2, thickness, window.innerHeight * 2, wallOptions);
    // No ceiling so objects can fall from above
    
    Composite.add(engine.world, [...bodies, floor, leftWall, rightWall]);

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Composite.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // Handle Resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      
      // Update floor/walls position
      Matter.Body.setPosition(floor, { x: window.innerWidth / 2, y: window.innerHeight + thickness / 2 });
      Matter.Body.setPosition(rightWall, { x: window.innerWidth + thickness / 2, y: window.innerHeight / 2 });
      Matter.Body.setPosition(leftWall, { x: 0 - thickness / 2, y: window.innerHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
        render.canvas.remove();
      }
      Composite.clear(engine.world);
      Engine.clear(engine);
    };
  }, []);

  return (
    <PageTransition>
      <div className="relative w-full h-screen bg-[#111111] overflow-hidden z-[100]">
        
        {/* Physics Canvas Container */}
        <div ref={sceneRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

        {/* UI Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12">
          
          <div className="flex justify-between items-start">
            <Link to="/" className="font-display font-medium text-white text-[18px] hover:text-[#e5553b] transition-colors pointer-events-auto bg-[#111111]/50 px-4 py-2 rounded-full backdrop-blur-sm">
              ← Back to Portfolio
            </Link>
          </div>

          <div className="text-center pb-8">
            <h1 className="font-display font-black text-[clamp(40px,8vw,120px)] text-white/10 tracking-tighter uppercase leading-none select-none">
              Playground
            </h1>
            <p className="font-body text-[#888888] text-[18px] mt-4 select-none">
              Drag, throw, and bounce the elements.
            </p>
          </div>
          
        </div>
      </div>
    </PageTransition>
  );
}
