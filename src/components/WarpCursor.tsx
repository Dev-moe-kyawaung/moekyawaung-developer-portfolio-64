import React, { useEffect, useRef } from "react";
import { rgba, WARP_THEME } from "../lib/warpTheme";

export const WarpCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.documentElement.classList.add("has-warp-cursor");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const pos = { x: -100, y: -100, ax: -100, ay: -100, rot: 0 };
    let isHovering = false;
    let isDown = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target as HTMLElement | null;
      isHovering = !!target?.closest("a, button, [role='button'], input, textarea");
    };

    const onMouseDown = () => { isDown = true; };
    const onMouseUp = () => { isDown = false; };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lag follow
      pos.ax += (pos.x - pos.ax) * 0.35;
      pos.ay += (pos.y - pos.ay) * 0.35;
      pos.rot += 0.03;

      if (pos.ax > 0 && pos.ay > 0) {
        const R = isHovering ? 20 : isDown ? 12 : 14;

        ctx.save();
        ctx.translate(pos.ax, pos.ay);

        // Rotating HUD reticle brackets
        ctx.rotate(pos.rot);
        ctx.strokeStyle = rgba(WARP_THEME.warpCyan, isHovering ? 0.95 : 0.65);
        ctx.lineWidth = 1.4;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Targeting Crosshair Spikes
        ctx.strokeStyle = isHovering ? WARP_THEME.sublightAmber : WARP_THEME.warpCyan;
        ctx.lineWidth = 1.2;
        for (let i = 0; i < 4; i++) {
          const a = (i / 4) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * (R - 3), Math.sin(a) * (R - 3));
          ctx.lineTo(Math.cos(a) * (R + 6), Math.sin(a) * (R + 6));
          ctx.stroke();
        }

        ctx.restore();

        // Center Tachyon Core Dot
        ctx.fillStyle = isHovering ? WARP_THEME.sublightAmber : "#ffffff";
        ctx.shadowColor = WARP_THEME.warpCyan;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(pos.ax, pos.ay, isDown ? 3 : 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.classList.remove("has-warp-cursor");
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[200] hidden [@media(pointer:fine)]:block"
      aria-hidden="true"
    />
  );
};
