import React, { useEffect, useState } from "react";
import { Zap, Volume2, VolumeX, Terminal, Activity } from "lucide-react";
import { NAV_SYSTEMS, STARSHIP_DATA } from "../data/warpData";
import { warpAudio } from "../lib/warpAudio";

export const WarpNav: React.FC = () => {
  const [soundActive, setSoundActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSoundActive(warpAudio.enabled);
    const onAudio = (e: Event) => setSoundActive(!!(e as CustomEvent<boolean>).detail);
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("warp:audio", onAudio);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("warp:audio", onAudio);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleSound = () => {
    const next = warpAudio.toggle();
    setSoundActive(next);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#040817]/90 backdrop-blur-xl border-[#38f9d7]/30 shadow-[0_4px_30px_rgba(56,249,215,0.25)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Starship Vessel Brand */}
        <a
          href="#hero"
          onClick={() => warpAudio.sensorTick()}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#38f9d7] via-[#4361ee] to-[#b5179e] p-0.5 shadow-[0_0_15px_rgba(56,249,215,0.6)] flex items-center justify-center transform group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#060a1a] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#38f9d7] animate-pulse" />
            </div>
          </div>
          <div>
            <span className="font-display text-lg font-black tracking-wider text-white group-hover:text-[#38f9d7] transition block leading-tight">
              WARP<span className="text-[#38f9d7]">·</span>DRIVE
            </span>
            <span className="font-mono text-[9px] tracking-[0.35em] text-[#38f9d7] block -mt-0.5">
              {STARSHIP_DATA.registry}
            </span>
          </div>
        </a>

        {/* Central HUD Conduits */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-[11px] tracking-[0.22em]">
          {NAV_SYSTEMS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => warpAudio.sensorTick()}
              className="text-[#8fa0b8] hover:text-[#38f9d7] transition relative group py-1"
            >
              <span>{link.label.toUpperCase()}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#38f9d7] to-[#4361ee] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#38f9d7]" />
            </a>
          ))}
        </nav>

        {/* Tactical Status & Audio Controls */}
        <div className="flex items-center gap-3">
          {/* Warp Core Output Tag */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b1226] border border-[#38f9d7]/40 font-mono text-[10px] tracking-wider text-[#38f9d7] shadow-[0_0_12px_rgba(56,249,215,0.2)]">
            <Activity className="w-3.5 h-3.5 text-[#38f9d7] animate-pulse" />
            <span className="font-bold text-white">{STARSHIP_DATA.warpCoreTelemetry.warpFactor}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-[#ffb703]">{STARSHIP_DATA.warpCoreTelemetry.dilithiumIntegrity} DILITHIUM</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title="Toggle Starship Audio Conduits"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[10px] tracking-wider transition ${
              soundActive
                ? "bg-[#38f9d7]/20 border-[#38f9d7] text-[#38f9d7] shadow-[0_0_15px_rgba(56,249,215,0.5)]"
                : "bg-[#0b1226] border-[#546580]/40 text-[#8fa0b8] hover:border-[#38f9d7] hover:text-white"
            }`}
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{soundActive ? "WARP: ON" : "WARP: OFF"}</span>
          </button>

          {/* LCARS Command Deck Trigger */}
          <button
            onClick={() => window.dispatchEvent(new Event("warp:palette"))}
            title="Launch Ship's LCARS Command Console (Ctrl+K)"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#38f9d7]/40 bg-[#0d1633] hover:border-[#38f9d7] text-[#38f9d7] font-mono text-[10px] tracking-wider transition shadow-[0_0_10px_rgba(56,249,215,0.2)]"
          >
            <Terminal className="w-3.5 h-3.5 text-[#38f9d7]" />
            <span>CTRL K</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer Strip */}
      <nav className="no-scrollbar flex lg:hidden gap-5 overflow-x-auto border-t border-[#38f9d7]/20 px-4 py-2 bg-[#040817]/95 backdrop-blur">
        {NAV_SYSTEMS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => warpAudio.sensorTick()}
            className="whitespace-nowrap font-mono text-[10px] tracking-[0.2em] text-[#8fa0b8] hover:text-[#38f9d7]"
          >
            {link.label.toUpperCase()}
          </a>
        ))}
      </nav>
    </header>
  );
};
