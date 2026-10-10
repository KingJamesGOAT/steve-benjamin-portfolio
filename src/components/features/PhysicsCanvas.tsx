import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { RotateCcw } from 'lucide-react';

interface PhysicsCanvasProps {
  className?: string;
}

const TECH_ITEMS = [
  { name: 'React 18', bg: '#0052FF', text: '#FFFFFF', isAccent: true },
  { name: 'TypeScript', bg: '#1E293B', text: '#FFFFFF' },
  { name: 'Tailwind CSS', bg: '#0EA5E9', text: '#FFFFFF' },
  { name: 'Vite', bg: '#8B5CF6', text: '#FFFFFF' },
  { name: 'Figma', bg: '#F24E1E', text: '#FFFFFF' },
  { name: 'Laravel', bg: '#FF2D20', text: '#FFFFFF' },
  { name: 'Notion', bg: '#0F172A', text: '#FFFFFF' },
  { name: 'GitHub', bg: '#181717', text: '#FFFFFF' },
  { name: 'Vercel', bg: '#000000', text: '#FFFFFF' },
  { name: 'FL Studio', bg: '#F97316', text: '#FFFFFF' },
  { name: 'DaVinci Resolve', bg: '#3B82F6', text: '#FFFFFF' },
  { name: 'Trading212', bg: '#0284C7', text: '#FFFFFF' },
  { name: 'Binance API', bg: '#F59E0B', text: '#000000' },
  { name: 'HEIG-VD', bg: '#0052FF', text: '#FFFFFF', isAccent: true },
  { name: 'CFC Electronics', bg: '#10B981', text: '#FFFFFF' },
  { name: 'CapCut', bg: '#0F172A', text: '#FFFFFF' },
  { name: 'Tally', bg: '#64748B', text: '#FFFFFF' },
  { name: 'Canva', bg: '#06B6D4', text: '#FFFFFF' },
];

export const PhysicsCanvas: React.FC<PhysicsCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Module Aliases
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    // 2. Engine Creation
    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
    });
    engineRef.current = engine;

    // 3. Renderer Creation
    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;
    Render.run(render);

    // 4. Runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // 5. Boundaries (Ground, left, right walls, ceiling)
    const wallOptions: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      render: { fillStyle: 'transparent' },
      friction: 0.2,
      restitution: 0.35,
    };
    const wallThickness = 100;

    const ground = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width * 2,
      wallThickness,
      wallOptions
    );
    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height * 2,
      wallOptions
    );
    const rightWall = Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 2,
      wallOptions
    );
    const ceiling = Bodies.rectangle(
      width / 2,
      -wallThickness * 2,
      width * 2,
      wallThickness,
      wallOptions
    );

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // 6. Spawn Rectangular Tech Stack Bodies with Crisp Chamfer
    const bodies = TECH_ITEMS.map((item, index) => {
      // Calculate responsive rectangular dimensions based on text length
      const blockWidth = Math.max(88, item.name.length * 9.5 + 24);
      const blockHeight = 36;

      // Stagger spawn positions across the top
      const x = Math.min(
        Math.max(60, (width / (TECH_ITEMS.length + 1)) * (index + 1) + (Math.random() * 40 - 20)),
        width - 60
      );
      const y = -30 - index * 45;

      const body = Bodies.rectangle(x, y, blockWidth, blockHeight, {
        chamfer: { radius: 0 }, // Strict rectangular geometry
        restitution: 0.55,
        friction: 0.2,
        frictionAir: 0.012,
        density: 0.002,
        render: {
          fillStyle: item.bg,
        },
      });

      // Attach custom payload for rendering text
      (body as unknown as { customData: typeof item; blockWidth: number; blockHeight: number }).customData = item;
      (body as unknown as { customData: typeof item; blockWidth: number; blockHeight: number }).blockWidth = blockWidth;
      (body as unknown as { customData: typeof item; blockWidth: number; blockHeight: number }).blockHeight = blockHeight;

      return body;
    });

    Composite.add(engine.world, bodies);

    // 7. Interactive MouseConstraint for click, drag & throw physics
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.25,
        render: { visible: false },
      },
    });

    // Prevent page scroll interception when scrolling over canvas
    // @ts-expect-error matter-js mouse scroll override
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
    // @ts-expect-error matter-js mouse scroll override
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // 8. Custom Canvas Renderer to draw styled text & sharp border on each body
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      if (!ctx) return;

      bodies.forEach((body) => {
        const { position, angle } = body;
        const data = (body as unknown as { customData: typeof TECH_ITEMS[0]; blockWidth: number; blockHeight: number });
        if (!data || !data.customData) return;

        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);

        // Draw crisp modern typography
        ctx.font = '600 12px "Inter", -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = data.customData.text;
        ctx.fillText(data.customData.name, 0, 1);

        ctx.restore();
      });
    });

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !render) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      render.canvas.width = newWidth * (window.devicePixelRatio || 1);
      render.canvas.height = newHeight * (window.devicePixelRatio || 1);
      render.options.width = newWidth;
      render.options.height = newHeight;

      Matter.Body.setPosition(ground, {
        x: newWidth / 2,
        y: newHeight + wallThickness / 2,
      });
      Matter.Body.setPosition(rightWall, {
        x: newWidth + wallThickness / 2,
        y: newHeight / 2,
      });
    };

    window.addEventListener('resize', handleResize);

    // 10. CRITICAL CLEANUP (React 18 Strict Mode safe)
    return () => {
      window.removeEventListener('resize', handleResize);
      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
      }
      if (renderRef.current) {
        Render.stop(renderRef.current);
        renderRef.current.canvas?.remove();
      }
      if (engineRef.current) {
        Composite.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
    };
  }, [resetKey]);

  return (
    <div className={`relative w-full h-[420px] sm:h-[480px] rounded-none border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white overflow-hidden shadow-sm select-none ${className}`}>
      {/* Top Banner & Reset Control with Minimalist Rectangles */}
      <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-none bg-white/95 border border-slate-200 shadow-sm text-[11px] font-mono text-slate-600 backdrop-blur-sm pointer-events-auto">
          <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
          <span>Click & throw blocks</span>
        </div>

        <button
          type="button"
          onClick={() => setResetKey((prev) => prev + 1)}
          className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-none bg-white/95 hover:bg-white border border-slate-200 shadow-sm text-[11px] font-mono text-slate-600 hover:text-electric transition-colors backdrop-blur-sm pointer-events-auto active:scale-95"
          title="Reset physics gravity simulation"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Matter.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};

export default PhysicsCanvas;
