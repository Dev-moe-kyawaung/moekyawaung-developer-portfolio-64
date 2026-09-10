import React from "react";
import { Zap, Compass, Radio, ArrowDown, Activity, Shield, Cpu } from "lucide-react";
import { STARSHIP_DATA, WARP_STATS } from "../data/warpData";
import { warpAudio } from "../lib/warpAudio";

export const WarpBridgeHero: React.FC = () => {
  return (
    <section id="hero" className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-28 pb-20 overflow-hidden">
      {/* Background Volumetric Tachyon Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#38f9d7]/15 via-[#4361ee]/20 to-[#b5179e]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Primary Warp Drive Telemetry Pill */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0b142b]/90 border border-[#38f9d7]/60 shadow-[0_0_20px_rgba(56,249,215,0.4)] mb-8">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38f9d7] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#38f9d7]" />
        </span>
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#38f9d7] font-bold">
          {STARSHIP_DATA.status}
        </span>
      </div>

      {/* Stellar Coordinates */}
      <p className="font-mono text-sm sm:text-base tracking-[0.4em] text-[#ffb703] mb-2 uppercase">
        // {STARSHIP_DATA.engineerMm} // {STARSHIP_DATA.vessel} //
      </p>

      {/* Metallic Warp Typography */}
      <h1 className="warp-title text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight leading-[0.95] mb-4">
        MOE KYAW AUNG
      </h1>

      {/* Subtitle with Tactical Conduits */}
      <div className="flex items-center justify-center gap-4 my-2 max-w-4xl mx-auto">
        <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#38f9d7]" />
        <h2 className="font-tech text-base sm:text-2xl text-[#38f9d7] font-bold tracking-[0.25em] uppercase">
          CHIEF WARP-DRIVE SYSTEMS ARCHITECT
        </h2>
        <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#38f9d7]" />
      </div>

      {/* Mission Log Creed */}
      <p className="font-body text-xl sm:text-2xl text-[#cad6f2] max-w-2xl mx-auto my-6 leading-relaxed italic">
        “Forging resilient Kotlin &amp; Jetpack Compose mobile platforms with Clean Architecture bulkheads and faster-than-light on-device AI.”
      </p>

      {/* Central Warp Core Crucible with Cloudinary Portrait */}
      <div className="relative my-8 flex items-center justify-center">
        {/* Orbital Trajectory Circles */}
        <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-[#38f9d7]/40 animate-spin-slow pointer-events-none" />
        <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-[#4361ee]/30 animate-spin-slower pointer-events-none" />
        <div className="absolute w-84 h-84 sm:w-96 sm:h-96 rounded-full border border-[#b5179e]/20 animate-spin-slow pointer-events-none" style={{ animationDuration: "36s", animationDirection: "reverse" }} />

        {/* Central Dilithium Core Housing */}
        <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-tr from-[#38f9d7] via-[#4361ee] to-[#b5179e] shadow-[0_0_60px_rgba(56,249,215,0.7)] gravity-pulse">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#38f9d7] bg-[#03050c] relative">
            <img
              src={STARSHIP_DATA.avatarHero}
              alt={STARSHIP_DATA.engineer}
              className="w-full h-full object-cover filter contrast-110 brightness-105"
            />
            {/* Scanline Sweep overlay */}
            <div className="warp-scanline" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03050c]/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 inset-x-0 text-center font-mono text-[9px] tracking-[0.3em] text-[#38f9d7]">
              {STARSHIP_DATA.registry}
            </div>
          </div>
        </div>

        {/* Orbiting Tachyon Flare Coordinates */}
        <div className="absolute -left-6 sm:-left-20 top-6 hud-panel px-3 py-1.5 rounded-xl font-mono text-[10px] tracking-wider text-[#38f9d7] shadow-[0_0_15px_rgba(56,249,215,0.3)] hidden xs:block">
          WARP FACTOR: 9.85
        </div>
        <div className="absolute -right-6 sm:-right-20 bottom-6 hud-panel px-3 py-1.5 rounded-xl font-mono text-[10px] tracking-wider text-[#ffb703] shadow-[0_0_15px_rgba(255,183,3,0.3)] hidden xs:block">
          DILITHIUM: 99.8%
        </div>
      </div>

      {/* Flight Telemetry Stat Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-6 w-full max-w-4xl">
        <div className="hud-panel p-4 rounded-2xl text-center border-t-2 border-[#38f9d7]">
          <Zap className="w-5 h-5 text-[#38f9d7] mx-auto mb-1" />
          <p className="font-display text-3xl font-black text-white">16+</p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#38f9d7] mt-0.5">{WARP_STATS[0].label}</p>
        </div>
        <div className="hud-panel p-4 rounded-2xl text-center border-t-2 border-[#ffb703]">
          <Shield className="w-5 h-5 text-[#ffb703] mx-auto mb-1" />
          <p className="font-display text-3xl font-black text-white">82+</p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#ffb703] mt-0.5">{WARP_STATS[1].label}</p>
        </div>
        <div className="hud-panel p-4 rounded-2xl text-center border-t-2 border-[#b5179e]">
          <Compass className="w-5 h-5 text-[#b5179e] mx-auto mb-1" />
          <p className="font-display text-3xl font-black text-white">9</p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#b5179e] mt-0.5">{WARP_STATS[2].label}</p>
        </div>
        <div className="hud-panel p-4 rounded-2xl text-center border-t-2 border-[#06d6a0]">
          <Activity className="w-5 h-5 text-[#06d6a0] mx-auto mb-1" />
          <p className="font-display text-3xl font-black text-white">3.4</p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#06d6a0] mt-0.5">{WARP_STATS[3].label}</p>
        </div>
      </div>

      {/* Tactical Warp Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        <a
          href="#missions"
          onClick={() => warpAudio.engageWarp()}
          className="px-7 py-4 bg-gradient-to-r from-[#38f9d7] via-[#4361ee] to-[#b5179e] hover:brightness-110 text-white font-tech text-xs sm:text-sm tracking-[0.2em] font-bold rounded-xl shadow-[0_0_30px_rgba(56,249,215,0.6)] flex items-center gap-2.5 transform hover:-translate-y-1 transition duration-300"
        >
          <Zap className="w-4 h-4 text-white" />
          <span>ENGAGE WARP MISSIONS</span>
        </a>

        <a
          href="#computer"
          onClick={() => warpAudio.computerChirp()}
          className="px-7 py-4 bg-[#0a1226] hover:bg-[#121f42] border-2 border-[#38f9d7]/60 text-[#38f9d7] font-tech text-xs sm:text-sm tracking-[0.2em] font-bold rounded-xl shadow-[0_0_20px_rgba(56,249,215,0.3)] flex items-center gap-2.5 transform hover:-translate-y-1 transition duration-300"
        >
          <Cpu className="w-4 h-4 text-[#38f9d7]" />
          <span>QUERY SHIP'S COMPUTER</span>
        </a>

        <a
          href="#comms"
          onClick={() => warpAudio.sensorTick()}
          className="px-6 py-4 bg-[#060a17] border border-[#ffb703]/40 text-[#cad6f2] hover:border-[#ffb703] font-tech text-xs sm:text-sm tracking-[0.2em] font-bold rounded-xl flex items-center gap-2 transition"
        >
          <Radio className="w-4 h-4 text-[#ffb703]" />
          <span>OPEN SUBSPACE RELAY</span>
        </a>
      </div>

      {/* Real-time Sector Routing Ribbon */}
      <div className="mt-12 w-full max-w-3xl hud-panel rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left border-l-4 border-[#38f9d7]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-[#38f9d7]/20 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-[#38f9d7] animate-pulse" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[9px] tracking-[0.3em] text-[#38f9d7]">ACTIVE FLIGHT VECTOR</p>
            <p className="font-tech text-sm sm:text-base font-bold text-white truncate">
              {STARSHIP_DATA.currentMission}
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2 font-mono text-[10px] text-[#ffb703] bg-[#03050c] px-3 py-1.5 rounded-lg border border-[#ffb703]/30">
          <Radio className="w-3.5 h-3.5 text-[#38f9d7]" />
          <span>YANGON ⇄ BANGKOK CORRIDOR</span>
        </div>
      </div>

      {/* Downward Navigation Cue */}
      <a
        href="#missions"
        onClick={() => warpAudio.sensorTick()}
        className="mt-12 flex flex-col items-center gap-1.5 font-mono text-[9px] tracking-[0.35em] text-[#546580] hover:text-[#38f9d7] transition"
      >
        <span>ENTER ORBITAL MISSION MATRIX</span>
        <ArrowDown className="w-4 h-4 text-[#38f9d7] animate-bounce" />
      </a>
    </section>
  );
};
