"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: "white" | "purple";
}

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  colorRgb: string;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface CloudPatch {
  x: number;
  y: number;
  size: number;
  colorRgb: string;
  alpha: number;
  driftX: number;
  driftY: number;
}

interface Orb {
  x: number;
  y: number;
  size: number;
  colorRgb: string; // "r, g, b" format
  angle: number;
  speed: number;
  radius: number;
  opacity: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Mouse position tracking
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);
  
  // Interpolated mouse positions for smooth parallax (inertia)
  const smoothX = useRef<number>(0);
  const smoothY = useRef<number>(0);

  // Cache dimensions
  const width = useRef<number>(0);
  const height = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let isMobile = false;

    // Helper for random values
    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    // Data lists
    let stars: Star[] = [];
    let nodes: NodePoint[] = [];
    let dust: DustParticle[] = [];
    let orbs: Orb[] = [];
    let clouds: CloudPatch[] = [];

    function initElements() {
      const w = width.current;
      const h = height.current;
      if (w === 0 || h === 0) return;

      const starCount = isMobile ? 180 : 420;
      const nodeCount = isMobile ? 25 : 50;
      const dustCount = isMobile ? 50 : 120;

      // 1. Stars (background layer) - mixed purple and white stars
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: random(0, 1),
          y: random(0, 1),
          size: random(0.5, 1.7),
          alpha: random(0.35, 0.95),
          twinklePhase: random(0, Math.PI * 2),
          twinkleSpeed: random(0.006, 0.022),
          color: Math.random() > 0.72 ? "purple" : "white",
        });
      }

      // 2. Constellation Nodes (midground layer)
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: random(0.05, 0.95),
          y: random(0.05, 0.95),
          vx: random(-0.00005, 0.00005),
          vy: random(-0.00005, 0.00005),
          size: random(1.2, 3.2),
          alpha: random(0.3, 0.7),
          pulsePhase: random(0, Math.PI * 2),
          pulseSpeed: random(0.008, 0.025),
        });
      }

      // 3. Glowing Dust/Cosmic Particles (foreground layer)
      dust = [];
      const purplePalette = ["167, 139, 250", "192, 132, 252", "216, 180, 254", "255, 255, 255"];
      for (let i = 0; i < dustCount; i++) {
        dust.push({
          x: random(0, 1),
          y: random(0, 1),
          vx: random(-0.0006, 0.0006),
          vy: random(-0.0006, 0.0006),
          size: random(1.6, 5),
          colorRgb: purplePalette[Math.floor(Math.random() * purplePalette.length)],
          alpha: random(0.18, 0.75),
          pulsePhase: random(0, Math.PI * 2),
          pulseSpeed: random(0.005, 0.015),
        });
      }

      // 4. Light purple scattered cloud patches
      clouds = [];
      const cloudPalettes = [
        "168, 85, 247",
        "139, 92, 246",
        "192, 132, 252",
        "216, 180, 254",
        "167, 139, 250",
      ];
      for (let i = 0; i < 18; i++) {
        clouds.push({
          x: random(0, 1),
          y: random(0, 1),
          size: random(120, 320),
          colorRgb: cloudPalettes[i % cloudPalettes.length],
          alpha: random(0.06, 0.18),
          driftX: random(-0.0003, 0.0003),
          driftY: random(-0.0002, 0.0002),
        });
      }

      // 5. Large Luminous Spheres / Floating Orbs
      orbs = [
        {
          x: 0.68, // Centered behind the globe area
          y: 0.48,
          size: isMobile ? 180 : 340,
          colorRgb: "139, 92, 246", // #8B5CF6
          angle: random(0, Math.PI * 2),
          speed: 0.0004,
          radius: 0.04,
          opacity: 0.24,
        },
        {
          x: 0.74,
          y: 0.52,
          size: isMobile ? 130 : 260,
          colorRgb: "168, 85, 247", // #A855F7
          angle: random(0, Math.PI * 2),
          speed: -0.0003,
          radius: 0.03,
          opacity: 0.2,
        },
        {
          x: 0.22, // Left side ambient orb
          y: 0.62,
          size: isMobile ? 190 : 390,
          colorRgb: "20, 8, 45", // Deep violet
          angle: random(0, Math.PI * 2),
          speed: 0.0002,
          radius: 0.05,
          opacity: 0.32,
        },
        {
          x: 0.45,
          y: 0.8,
          size: isMobile ? 160 : 300,
          colorRgb: "139, 92, 246",
          angle: random(0, Math.PI * 2),
          speed: 0.0005,
          radius: 0.035,
          opacity: 0.15,
        },
      ];
    }

    // Handle responsiveness using window dimensions directly
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      
      width.current = w;
      height.current = h;
      
      ctx.scale(dpr, dpr);
      isMobile = w < 1024;
      
      initElements();
    };

    // Track mouse move relative to screen center
    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX.current = (e.clientX - halfW) / halfW;
      mouseY.current = (e.clientY - halfH) / halfH;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;
        mouseX.current = (touch.clientX - halfW) / halfW;
        mouseY.current = (touch.clientY - halfH) / halfH;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Initialize dimensions
    handleResize();

    const animate = () => {
      const w = width.current;
      const h = height.current;
      if (w === 0 || h === 0) {
      // ----------------------------------------------------
      // DRAW LAYER 6: Glassy cursor highlight (screen blend)
      // ----------------------------------------------------
      const glassX = (smoothX.current + 1) * 0.5 * w;
      const glassY = (smoothY.current + 1) * 0.5 * h;
      const glassRad = Math.min(w, h) * 0.25;

      ctx.globalCompositeOperation = "screen";
      const glassGrad = ctx.createRadialGradient(glassX, glassY, 0, glassX, glassY, glassRad);
      glassGrad.addColorStop(0, "rgba(255, 255, 255, 0.08)");
      glassGrad.addColorStop(0.2, "rgba(216, 180, 254, 0.05)");
      glassGrad.addColorStop(0.5, "rgba(167, 139, 250, 0.025)");
      glassGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glassGrad;
      ctx.beginPath();
      ctx.arc(glassX, glassY, glassRad, 0, Math.PI * 2);
      ctx.fill();

      // Secondary smaller brighter glass highlight
      const innerGlass = ctx.createRadialGradient(glassX, glassY, 0, glassX, glassY, glassRad * 0.35);
      innerGlass.addColorStop(0, "rgba(255, 255, 255, 0.12)");
      innerGlass.addColorStop(0.3, "rgba(216, 180, 254, 0.06)");
      innerGlass.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = innerGlass;
      ctx.beginPath();
      ctx.arc(glassX, glassY, glassRad * 0.35, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";

      animationId = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Smooth interpolation for parallax offsets
      smoothX.current += (mouseX.current - smoothX.current) * 0.05;
      smoothY.current += (mouseY.current - smoothY.current) * 0.05;

      // Mouse world position for scatter effects
      const mouseWorldX = 0.5 + smoothX.current * 0.5;
      const mouseWorldY = 0.5 + smoothY.current * 0.5;

      // Nodes drift imperceptibly (purely aesthetic floating)
      nodes.forEach((node) => {
        node.vx *= 0.999;
        node.vy *= 0.999;
      });

      // Mouse repulsion for dust particles too
      dust.forEach((p) => {
        const dx = p.x - mouseWorldX;
        const dy = p.y - mouseWorldY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0.01 && dist < 0.35) {
          const force = 0.0002 / (dist * dist);
          p.vx += dx * force;
          p.vy += dy * force;
          p.vx *= 0.995;
          p.vy *= 0.995;
        }
      });

      // Parallax shifts for layers
      const pxBackgroundX = smoothX.current * -35;
      const pxBackgroundY = smoothY.current * -35;

      const pxMidgroundX = smoothX.current * -12;
      const pxMidgroundY = smoothY.current * -12;

      const pxForegroundX = smoothX.current * -130;
      const pxForegroundY = smoothY.current * -130;

      // ----------------------------------------------------
      // DRAW LAYER 1: Background Stars / Light Purple Patches (Depth = 0.15)
      // ----------------------------------------------------
      stars.forEach((star) => {
        // Drift slowly
        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha = Math.max(0.2, star.alpha * (0.4 + 0.6 * Math.sin(star.twinklePhase)));
        
        let sx = star.x * w + pxBackgroundX;
        let sy = star.y * h + pxBackgroundY;

        // Wrap coords
        if (sx < 0) sx += w;
        if (sx > w) sx -= w;
        if (sy < 0) sy += h;
        if (sy > h) sy -= h;

        ctx.fillStyle = star.color === "purple"
          ? `rgba(168, 85, 247, ${currentAlpha})`
          : `rgba(255, 255, 255, ${currentAlpha})`;
          
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // ----------------------------------------------------
      // DRAW LAYER 2: Scattered Light Purple Cloud Patches
      // ----------------------------------------------------
      clouds.forEach((c) => {
        c.x += c.driftX;
        c.y += c.driftY;
        if (c.x < -0.1) c.x = 1.1;
        if (c.x > 1.1) c.x = -0.1;
        if (c.y < -0.1) c.y = 1.1;
        if (c.y > 1.1) c.y = -0.1;

        const px = c.x * w + pxBackgroundX;
        const py = c.y * h + pxBackgroundY;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, c.size);
        grad.addColorStop(0, `rgba(${c.colorRgb}, ${c.alpha})`);
        grad.addColorStop(0.3, `rgba(${c.colorRgb}, ${c.alpha * 0.5})`);
        grad.addColorStop(0.7, `rgba(${c.colorRgb}, ${c.alpha * 0.15})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, c.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // ----------------------------------------------------
      // DRAW LAYER 4: Luminous Spheres / Floating Orbs (Parallax)
      // ----------------------------------------------------
      ctx.globalCompositeOperation = "screen";
      orbs.forEach((orb) => {
        orb.angle += orb.speed;
        
        // Gentle orbital motion
        const ox = orb.x + Math.cos(orb.angle) * orb.radius;
        const oy = orb.y + Math.sin(orb.angle) * orb.radius;
        
        const px = ox * w + pxMidgroundX;
        const py = oy * h + pxMidgroundY;

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, orb.size);
        gradient.addColorStop(0, `rgba(${orb.colorRgb}, ${orb.opacity})`);
        gradient.addColorStop(0.25, `rgba(${orb.colorRgb}, ${orb.opacity * 0.45})`);
        gradient.addColorStop(0.6, `rgba(${orb.colorRgb}, ${orb.opacity * 0.12})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, orb.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";

      // ----------------------------------------------------
      // DRAW LAYER 3: Constellation / Neural Network (Depth = 0.45)
      // ----------------------------------------------------
      const maxDistance = isMobile ? 100 : 160;
      ctx.lineWidth = isMobile ? 0.4 : 0.55;
      
      const nodePixelCoords = nodes.map((node) => {
        // Update physics position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary bounce / wrap
        if (node.x < 0.02 || node.x > 0.98) node.vx *= -1;
        if (node.y < 0.02 || node.y > 0.98) node.vy *= -1;

        // Apply midground parallax
        const nx = node.x * w + pxMidgroundX;
        const ny = node.y * h + pxMidgroundY;
        return { nx, ny, node };
      });

      // Draw connecting lines
      for (let i = 0; i < nodePixelCoords.length; i++) {
        const p1 = nodePixelCoords[i];
        for (let j = i + 1; j < nodePixelCoords.length; j++) {
          const p2 = nodePixelCoords[j];
          
          const dx = p1.nx - p2.nx;
          const dy = p1.ny - p2.ny;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Scale line opacity with distance (higher max line opacity: 0.16)
            const lineOpacity = (1 - dist / maxDistance) * 0.22;
            
            ctx.strokeStyle = `rgba(167, 139, 250, ${lineOpacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.nx, p1.ny);
            ctx.lineTo(p2.nx, p2.ny);
            ctx.stroke();
          }
        }
      }

      // Draw node dots
      nodePixelCoords.forEach(({ nx, ny, node }) => {
        node.pulsePhase += node.pulseSpeed;
        const nodeAlpha = Math.max(0.25, node.alpha * (0.6 + 0.4 * Math.sin(node.pulsePhase)));

        // Outer glow dot
        ctx.fillStyle = `rgba(167, 139, 250, ${nodeAlpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(nx, ny, node.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha * 0.92})`;
        ctx.beginPath();
        ctx.arc(nx, ny, node.size * 0.9, 0, Math.PI * 2);
        ctx.fill();
      });

      // ----------------------------------------------------
      // DRAW LAYER 5: Glowing Cosmic Dust (Depth = 0.85)
      // ----------------------------------------------------
      dust.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x += 1;
        if (p.x > 1) p.x -= 1;
        if (p.y < 0) p.y += 1;
        if (p.y > 1) p.y -= 1;

        p.pulsePhase += p.pulseSpeed;
        const dustAlpha = Math.max(0.12, p.alpha * (0.3 + 0.7 * Math.sin(p.pulsePhase)));

        const dx = p.x * w + pxForegroundX;
        const dy = p.y * h + pxForegroundY;

        const glowRad = p.size * 1.8;
        const grad = ctx.createRadialGradient(dx, dy, 0, dx, dy, glowRad);
        grad.addColorStop(0, `rgba(${p.colorRgb}, ${dustAlpha})`);
        grad.addColorStop(0.3, `rgba(${p.colorRgb}, ${dustAlpha * 0.6})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(dx, dy, glowRad, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#04020A]">
      {/* Deep cosmic base gradient - matched exactly to the image's layout and tones */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 110% 90% at 71% 50%, #150734 0%, #090318 45%, #04020a 75%)",
        }}
      />

      {/* Massive soft purple glow aura positioned exactly behind the globe */}
      <div
        className="absolute rounded-full pointer-events-none opacity-85 lg:left-[71%] left-[50%] lg:top-[50%] top-[60%] -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] lg:w-[48vw] lg:h-[48vw] max-w-[850px] max-h-[850px]"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.36) 0%, rgba(139,92,246,0.18) 35%, rgba(20,8,45,0.05) 60%, transparent 80%)",
          filter: "blur(110px)",
        }}
      />
      
      {/* Secondary broader nebula background glow */}
      <div
        className="absolute rounded-full pointer-events-none opacity-70 lg:left-[69%] left-[50%] lg:top-[48%] top-[55%] -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vw] lg:w-[62vw] lg:h-[62vw] max-w-[1100px] max-h-[1100px]"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.24) 0%, rgba(168,85,247,0.1) 40%, transparent 75%)",
          filter: "blur(140px)",
        }}
      />

      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Vignette edge darkener */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 75% 70% at 50% 45%, transparent 25%, rgba(4,2,10,0.5) 65%, #04020A 100%)",
        }}
      />
    </div>
  );
}
