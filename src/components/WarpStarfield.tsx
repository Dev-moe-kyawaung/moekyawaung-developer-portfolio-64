import React, { useEffect, useRef } from "react";
import { rgba, WARP_THEME } from "../lib/warpTheme";

interface StarfieldStreak {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  speed: number;
  color: string;
}

export const WarpStarfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - width / 2) * 0.15;
      mouse.targetY = (e.clientY - height / 2) * 0.15;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // 3D Starfield Array
    const numStars = 320;
    const stars: StarfieldStreak[] = [];
    const colors = [WARP_THEME.starlight, WARP_THEME.warpCyan, WARP_THEME.tachyonBlue, WARP_THEME.sublightAmber];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 1000 + 10,
        prevZ: 1000,
        speed: Math.random() * 12 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Interpolate pointer deflection for navigation feel
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const cx = width / 2 + mouse.x;
      const cy = height / 2 + mouse.y;

      // Deep Space Void Background
      const bg = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.85);
      bg.addColorStop(0, "#081028");
      bg.addColorStop(0.4, "#050918");
      bg.addColorStop(1, "#020308");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Volumetric Warp Core Nebulae Glow
      const nebulae = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.45);
      nebulae.addColorStop(0, rgba(WARP_THEME.warpCyan, 0.12 + Math.sin(time * 2) * 0.03));
      nebulae.addColorStop(0.5, rgba(WARP_THEME.singularityViolet, 0.06));
      nebulae.addColorStop(1, "transparent");
      ctx.fillStyle = nebulae;
      ctx.fillRect(0, 0, width, height);

      // Render 3D Streaking Stars (Z-projection)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.prevZ = s.z;
        s.z -= s.speed;

        // Reset if past camera view
        if (s.z <= 0) {
          s.x = (Math.random() - 0.5) * width * 2;
          s.y = (Math.random() - 0.5) * height * 2;
          s.z = 1000;
          s.prevZ = 1000;
        }

        // Project current 3D coordinates to 2D screen
        const k = 400 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        // Project previous 3D coordinates for warp streak tail
        const prevK = 400 / s.prevZ;
        const ppx = s.x * prevK + cx;
        const ppy = s.y * prevK + cy;

        // If within screen boundaries
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const brightness = Math.min(1, (1000 - s.z) / 750);
          const size = Math.max(0.6, (1 - s.z / 1000) * 3);

          ctx.strokeStyle = rgba(s.color, brightness * 0.85);
          ctx.lineWidth = size * 0.8;
          ctx.beginPath();
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.stroke();

          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(px, py, size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw faint concentric warp tunnel compression circles
      const rings = 4;
      ctx.lineWidth = 1;
      for (let r = 1; r <= rings; r++) {
        const ringRadius = ((time * 80 + r * 150) % 650);
        const alpha = Math.max(0, 0.25 * (1 - ringRadius / 650));
        ctx.strokeStyle = rgba(WARP_THEME.warpCyan, alpha);
        ctx.beginPath();
        ctx.ellipse(cx, cy, ringRadius * 1.3, ringRadius * 0.8, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
