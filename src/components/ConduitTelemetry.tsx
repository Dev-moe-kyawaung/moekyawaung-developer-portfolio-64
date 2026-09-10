import React from "react";
import { Zap, Shield, Award } from "lucide-react";
import { WARP_SYSTEMS } from "../data/warpData";
import { warpAudio } from "../lib/warpAudio";

export const ConduitTelemetry: React.FC = () => {
  return (
    <section id="telemetry" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4361ee]/10 border border-[#4361ee]/40 rounded-full font-mono text-xs text-[#38f9d7] tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5 text-[#38f9d7] animate-pulse" />
            <span>POWER CONDUCTION MATRIX // 12 SHIELDED BUSWAYS</span>
          </div>
          <h2 className="warp-title text-3xl sm:text-5xl font-black tracking-tight">
            CONDUIT TELEMETRY
          </h2>
          <p className="font-body text-xl text-[#8fa0b8] max-w-xl mt-2 italic">
            Engineering conduits delivering power to mission systems across mobile, backend, and neural AI sectors.
          </p>
        </div>

        {/* Starfleet Credentials Badge */}
        <div className="hud-panel px-5 py-3 rounded-2xl flex items-center gap-3 border border-[#38f9d7]/40 shadow-[0_0_20px_rgba(56,249,215,0.2)]">
          <Award className="w-6 h-6 text-[#ffb703]" />
          <div>
            <span className="font-display text-xl font-bold text-white block">82+ STARFLEET CERTS</span>
            <span className="font-mono text-[9px] text-[#38f9d7] block tracking-wider">PROGRAMMING HUB // 9 DOMAINS</span>
          </div>
        </div>
      </div>

      {/* 12 Conduits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {WARP_SYSTEMS.map((system) => (
          <div
            key={system.name}
            onMouseEnter={() => warpAudio.sensorTick()}
            className="hud-panel rounded-2xl p-4 border border-[#4361ee]/30 hover:border-[#38f9d7] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(56,249,215,0.3)] group"
          >
            {/* Header: Tech Name & Efficiency */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="font-tech text-base font-bold text-white group-hover:text-[#38f9d7] transition">
                  {system.name}
                </span>
                <span className="font-mono text-[8px] text-[#8fa0b8] block tracking-wider mt-0.5">
                  {system.conduit}
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-[#38f9d7] shrink-0">
                {system.efficiency}
              </span>
            </div>

            {/* Plasma Conduction Bar */}
            <div className="w-full h-2.5 bg-[#03050c] rounded-full border border-[#38f9d7]/30 overflow-hidden p-0.5 my-3">
              <div
                className="h-full rounded-full transition-all duration-700 shadow-[0_0_10px_#38f9d7]"
                style={{
                  width: system.efficiency,
                  background: `linear-gradient(90deg, #4361ee, ${system.color}, #38f9d7)`,
                }}
              />
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between font-mono text-[10px] text-[#8fa0b8]">
              <span>STATUS: <strong className="text-white">{system.status}</strong></span>
              <span className="flex items-center gap-1 text-[#06d6a0]">
                <Shield className="w-3 h-3 text-[#06d6a0]" />
                SHIELDED
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
