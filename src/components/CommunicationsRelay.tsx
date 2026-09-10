import React from "react";
import { Phone, MessageSquare, FolderGit2, Fingerprint, ArrowUpRight, Radio, Printer, Zap } from "lucide-react";
import { STARSHIP_DATA, SPACE_COMM_CHANNELS } from "../data/warpData";
import { warpAudio } from "../lib/warpAudio";

export const CommunicationsRelay: React.FC = () => {
  return (
    <section id="comms" className="relative z-10 py-24 px-4 max-w-7xl mx-auto space-y-16">
      {/* Subspace Communications Deck */}
      <div className="hud-panel hud-bracket rounded-3xl p-6 sm:p-10 border-2 border-[#38f9d7]/60 shadow-[0_0_50px_rgba(56,249,215,0.25)] relative overflow-hidden">
        <div className="warp-scanline" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: Direct Subspace Channels */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#38f9d7]/15 border border-[#38f9d7]/40 text-[#38f9d7] tracking-widest inline-block mb-3">
                SUBSPACE FREQUENCY // QUANTUM ENTANGLED
              </span>
              <h2 className="warp-title text-3xl sm:text-5xl font-black tracking-tight">
                COMMUNICATIONS RELAY
              </h2>
              <p className="font-body text-xl text-[#8fa0b8] mt-2 italic">
                Direct quantum channels open to Chief Engineer Moe Kyaw Aung. Available for mission deployments in Senior Android, Clean Architecture engineering, and on-device neural systems.
              </p>
            </div>

            {/* Direct Comms Frequency Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${STARSHIP_DATA.phone.replace(/\s+/g, "")}`}
                onClick={() => warpAudio.computerChirp()}
                className="hud-panel p-4 rounded-2xl border border-[#38f9d7]/40 hover:border-[#38f9d7] transition group shadow-[0_0_15px_rgba(56,249,215,0.2)] block"
              >
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-[#38f9d7]">
                  <Phone className="w-3.5 h-3.5 text-[#38f9d7]" />
                  <span>DIRECT AUDIO CONDUIT</span>
                </div>
                <p className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#38f9d7] transition">
                  {STARSHIP_DATA.phone}
                </p>
                <span className="font-mono text-[9px] text-[#ffb703] mt-1 block">
                  PRIORITY CARRIER ACTIVE
                </span>
              </a>

              <a
                href={STARSHIP_DATA.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => warpAudio.engageWarp()}
                className="hud-panel p-4 rounded-2xl border border-[#06d6a0]/40 hover:border-[#06d6a0] transition group shadow-[0_0_15px_rgba(6,214,160,0.2)] block"
              >
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-[#06d6a0]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#06d6a0]" />
                  <span>WHATSAPP SUBSPACE RELAY</span>
                </div>
                <p className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#06d6a0] transition">
                  INSTANT BEACON DISPATCH
                </p>
                <span className="font-mono text-[9px] text-[#06d6a0] mt-1 block">
                  24/7 ENCRYPTED COMM
                </span>
              </a>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={STARSHIP_DATA.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b1226] border border-[#38f9d7]/30 hover:border-[#38f9d7] text-[#cad6f2] hover:text-[#38f9d7] font-mono text-xs transition"
              >
                <FolderGit2 className="w-4 h-4 text-[#38f9d7]" />
                <span>GITHUB // {STARSHIP_DATA.github}</span>
              </a>

              <a
                href={STARSHIP_DATA.gravatar}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b1226] border border-[#ffb703]/30 hover:border-[#ffb703] text-[#cad6f2] hover:text-[#ffb703] font-mono text-xs transition"
              >
                <Fingerprint className="w-4 h-4 text-[#ffb703]" />
                <span>GRAVATAR BEACON</span>
              </a>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#38f9d7]/15 border border-[#38f9d7]/50 hover:bg-[#38f9d7]/30 text-[#38f9d7] font-mono text-xs transition shadow-[0_0_12px_rgba(56,249,215,0.3)]"
              >
                <Printer className="w-4 h-4 text-[#38f9d7]" />
                <span>PRINT STARFLEET DOSSIER</span>
              </button>
            </div>
          </div>

          {/* Right Column: Tactical Flight Visuals (Cloudinary assets) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative p-2.5 bg-gradient-to-br from-[#38f9d7]/30 to-[#03050c] rounded-2xl border border-[#38f9d7]/40 shadow-[0_0_30px_rgba(56,249,215,0.3)] w-full max-w-sm">
              <div className="w-full h-56 rounded-xl overflow-hidden border border-[#38f9d7]/30 bg-black relative">
                <img
                  src={STARSHIP_DATA.portraitHolo}
                  alt="Chief Engineer Moe Kyaw Aung"
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="warp-scanline" />
              </div>

              {/* Sub-visuals */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="h-20 rounded-lg overflow-hidden border border-[#4361ee]/40">
                  <img
                    src={STARSHIP_DATA.flightLog1}
                    alt="Flight Deck Engineering"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-20 rounded-lg overflow-hidden border border-[#b5179e]/40">
                  <img
                    src={STARSHIP_DATA.flightLog2}
                    alt="Space Station Diagnostics"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center font-mono text-[9px] text-[#38f9d7] mt-2.5 tracking-[0.25em]">
                {STARSHIP_DATA.vessel} // SECTOR ALPHA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subspace Communications Arrays Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SPACE_COMM_CHANNELS.map((channel) => (
          <a
            key={channel.name}
            href={channel.url}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => warpAudio.sensorTick()}
            className="hud-panel p-3.5 rounded-xl border border-[#38f9d7]/30 hover:border-[#38f9d7] flex flex-col justify-between group transition hover:-translate-y-1 hover:shadow-[0_0_18px_rgba(56,249,215,0.25)]"
          >
            <div className="flex items-center justify-between mb-1">
              <Radio className="w-3.5 h-3.5" style={{ color: channel.color }} />
              <ArrowUpRight className="w-3.5 h-3.5 text-[#546580] group-hover:text-[#38f9d7] group-hover:translate-x-0.5 transition" />
            </div>
            <span className="font-tech text-sm font-bold text-white group-hover:text-[#38f9d7] transition block">
              {channel.name}
            </span>
            <span className="font-mono text-[8px] text-[#8fa0b8] truncate block mt-0.5">
              {channel.handle}
            </span>
          </a>
        ))}
      </div>

      {/* Starship Footer */}
      <footer className="pt-12 border-t border-[#38f9d7]/30 text-center font-mono">
        <div className="flex items-center justify-center gap-2 mb-2 text-[#38f9d7]">
          <Zap className="w-4 h-4 text-[#38f9d7] animate-pulse" />
          <span className="text-xs tracking-[0.3em] font-bold">
            {STARSHIP_DATA.vessel} // {STARSHIP_DATA.registry}
          </span>
          <Zap className="w-4 h-4 text-[#38f9d7] animate-pulse" />
        </div>
        <p className="text-xs text-[#8fa0b8] tracking-wider mb-2">
          &copy; {new Date().getFullYear()} MOE KYAW AUNG ({STARSHIP_DATA.engineerMm}) — WARP ENGINES RATED AT WARP 9.85
        </p>
        <p className="text-[10px] text-[#546580] tracking-[0.25em]">
          “{STARSHIP_DATA.creed.toUpperCase()}” · ZERO FLIGHT ANOMALIES
        </p>
      </footer>
    </section>
  );
};
