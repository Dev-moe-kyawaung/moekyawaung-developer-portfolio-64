import React, { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";
import { warpAudio } from "../lib/warpAudio";

const WARP_CALIBRATION_STEPS = [
  "> Initializing Starfleet LCARS terminal …",
  "> Warming dilithium reaction chamber …",
  "> Aligning magnetic antimatter containment fields …",
  "> Spooling 8 orbital mission conduits (Warp 9.85) …",
  "> Synchronizing on-device tachyon neural plumes (38ms) …",
  "> Engaging Ship's Main Computer neural core …",
  "> Warp engines nominal. Flight corridor open. Welcome aboard, officer.",
];

export const WarpBootSequence: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDismounted, setIsDismounted] = useState(false);
  const isComplete = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const startTime = performance.now();
    const duration = 2100;
    let animId = 0;

    const finish = () => {
      if (isComplete.current) return;
      isComplete.current = true;
      setPercent(100);
      warpAudio.engageWarp();

      setTimeout(() => {
        setIsFadingOut(true);
        document.body.style.overflow = "";
        setTimeout(() => setIsDismounted(true), 650);
      }, 250);
    };

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPercent(Math.round(eased * 100));

      if (progress < 1 && !isComplete.current) {
        animId = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    animId = requestAnimationFrame(tick);

    const onSkip = () => finish();
    window.addEventListener("pointerdown", onSkip);
    window.addEventListener("keydown", onSkip);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointerdown", onSkip);
      window.removeEventListener("keydown", onSkip);
      document.body.style.overflow = "";
    };
  }, []);

  if (isDismounted) return null;

  const shownLogs = WARP_CALIBRATION_STEPS.slice(
    0,
    Math.min(WARP_CALIBRATION_STEPS.length, 1 + Math.floor((percent / 100) * WARP_CALIBRATION_STEPS.length))
  );

  const radius = 62;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#03050c] transition-all duration-700 ${
        isFadingOut ? "opacity-0 blur-xl scale-105 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={isFadingOut}
    >
      {/* Background Volumetric Warp Tunnel */}
      <div className="absolute w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#38f9d7]/20 via-[#4361ee]/25 to-[#b5179e]/15 blur-[130px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-[min(92vw,500px)] px-4">
        {/* Warp Drive Circular Spooler */}
        <div className="relative w-56 h-56 flex items-center justify-center mb-4">
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#38f9d7]/40 animate-spin-slow" />
          <div className="absolute inset-6 rounded-full border border-[#4361ee]/30 animate-spin-slower" />

          {/* SVG Progress Gauge */}
          <svg width={150} height={150} className="absolute -rotate-90">
            <circle cx="75" cy="75" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke="url(#warpBootGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * percent) / 100}
              style={{
                filter: "drop-shadow(0 0 12px rgba(56,249,215,0.85))",
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
            <defs>
              <linearGradient id="warpBootGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38f9d7" />
                <stop offset="50%" stopColor="#4361ee" />
                <stop offset="100%" stopColor="#b5179e" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Warp Speed Indicator */}
          <div className="text-center">
            <Zap className="w-7 h-7 text-[#38f9d7] mx-auto animate-pulse" />
            <p className="font-display text-4xl font-black text-white tracking-wider mt-0.5">
              {percent}%
            </p>
            <p className="font-mono text-[8px] tracking-[0.35em] text-[#38f9d7]">
              SPOOLING WARP CORE
            </p>
          </div>
        </div>

        {/* Brand Banner */}
        <p className="warp-title text-3xl sm:text-4xl font-black tracking-wider text-center">
          U.S.S. KOTLIN
        </p>
        <p className="font-mono text-[9px] tracking-[0.45em] text-[#38f9d7] text-center mt-1">
          INTERSTELLAR WARP-DRIVE SYSTEMS ARCHITECTURE // NX-86
        </p>

        {/* Live Calibration Logs */}
        <div className="hud-panel mt-6 min-h-[130px] w-full rounded-2xl p-4 font-mono text-[11px] leading-relaxed border border-[#38f9d7]/30 shadow-[0_0_20px_rgba(56,249,215,0.2)]">
          {shownLogs.map((log, i) => (
            <p key={log} className={i === shownLogs.length - 1 ? "text-[#38f9d7]" : "text-[#546580]"}>
              {log}
            </p>
          ))}
          <span className="inline-block w-2 h-3.5 bg-[#38f9d7] ml-1 animate-pulse align-middle" />
        </div>

        <p className="font-mono text-[9px] tracking-[0.35em] text-[#546580] text-center mt-4">
          CLICK ANYWHERE TO ENGAGE WARP
        </p>
      </div>
    </div>
  );
};
