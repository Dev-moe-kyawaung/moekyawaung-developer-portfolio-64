import React, { useState, useEffect, useRef } from "react";
import { Cpu, Zap, Activity, CheckCircle2, ChevronRight, ShieldCheck, Disc } from "lucide-react";
import { COMPUTER_DIAGNOSTICS } from "../data/warpData";
import { warpAudio } from "../lib/warpAudio";

export const StarshipComputer: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>("warp");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [typedResponse, setTypedResponse] = useState<string>("");
  const typingTimerRef = useRef<number | null>(null);

  const activeDiag =
    COMPUTER_DIAGNOSTICS.find((d) => d.key === selectedKey) || COMPUTER_DIAGNOSTICS[0];

  const queryComputer = (key: string) => {
    warpAudio.computerChirp();
    setSelectedKey(key);
    setIsProcessing(true);
    setTypedResponse("");

    if (typingTimerRef.current) {
      window.clearInterval(typingTimerRef.current);
    }

    const target = COMPUTER_DIAGNOSTICS.find((d) => d.key === key) || COMPUTER_DIAGNOSTICS[0];

    setTimeout(() => {
      setIsProcessing(false);
      warpAudio.sensorTick();
      let charIdx = 0;
      typingTimerRef.current = window.setInterval(() => {
        charIdx += 2;
        setTypedResponse(target.analysis.slice(0, charIdx));
        if (charIdx >= target.analysis.length) {
          if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
        }
      }, 14);
    }, 400);
  };

  useEffect(() => {
    queryComputer("warp");
    return () => {
      if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="computer" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4361ee]/10 border border-[#4361ee]/30 rounded-full font-mono text-xs text-[#38f9d7] tracking-widest mb-3">
          <Cpu className="w-3.5 h-3.5 text-[#38f9d7] animate-pulse" />
          <span>LCARS NEURAL ENGINE // U.S.S. KOTLIN MAIN COMPUTER</span>
        </div>
        <h2 className="warp-title text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">
          SHIP'S COMPUTER
        </h2>
        <p className="font-body text-xl text-[#8fa0b8] max-w-2xl mx-auto mt-2 italic">
          An automated Starfleet vessel AI guiding officers through Moe Kyaw Aung's architectural conduits, antimatter containment, and mission logs.
        </p>
      </div>

      {/* Main Computer Console */}
      <div className="hud-panel rounded-3xl p-6 sm:p-10 border-2 border-[#38f9d7]/50 shadow-[0_0_50px_rgba(56,249,215,0.25)] relative overflow-hidden">
        <div className="warp-scanline" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 3D Antimatter Core Visualization */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Concentric Rotating Magnetic Containment Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#38f9d7]/40 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-[#4361ee]/35 animate-spin-slower" />
              <div className="absolute inset-10 rounded-full border border-[#b5179e]/25" />

              {/* Central Pulsing Tachyon Reactor */}
              <div className="relative z-10 w-44 h-44 rounded-full bg-gradient-to-tr from-[#0b1226] via-[#38f9d7] to-[#b5179e] p-1.5 shadow-[0_0_45px_rgba(56,249,215,0.7)] gravity-pulse flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#040817] p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <Disc className="w-8 h-8 text-[#38f9d7] animate-spin-slow mb-1" />
                  <span className="font-mono text-xs text-[#38f9d7] font-bold">WARP FACTOR</span>
                  <span className="font-display text-2xl font-black text-white tracking-wider">
                    9.85
                  </span>
                  <span className="font-mono text-[8px] text-[#ffb703] tracking-widest mt-0.5">
                    DILITHIUM 99.8%
                  </span>
                </div>
              </div>

              {/* Orbiting Tachyon Flare Nodes */}
              <span className="absolute inset-2 animate-spin-slower">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#38f9d7] shadow-[0_0_12px_#38f9d7]" />
              </span>
              <span className="absolute inset-8 animate-spin-slow">
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ffb703] shadow-[0_0_10px_#ffb703]" />
              </span>
            </div>

            {/* Status Telemetry */}
            <div className="mt-6 flex items-center gap-3 font-mono text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38f9d7]/15 border border-[#38f9d7]/40 text-[#38f9d7]">
                <Activity className="w-3.5 h-3.5 text-[#38f9d7] animate-pulse" />
                <span>WARP CORE STABLE</span>
              </span>
              <span className="text-[#8fa0b8] font-mono text-[10px]">
                4,850 TERA-WATTS
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Diagnostic Channels */}
          <div className="lg:col-span-7 space-y-6">
            {/* 4 Starfleet Inquiry Probes */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-[#38f9d7] mb-3">
                QUERY STARSHIP COMPUTER // SELECT SUBROUTINE:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {COMPUTER_DIAGNOSTICS.map((diag) => {
                  const isSelected = diag.key === selectedKey;
                  return (
                    <button
                      key={diag.key}
                      onClick={() => queryComputer(diag.key)}
                      disabled={isProcessing}
                      className={`p-3 rounded-xl border text-left font-mono text-xs transition duration-300 flex items-center justify-between group ${
                        isSelected
                          ? "bg-[#38f9d7]/20 border-[#38f9d7] text-white shadow-[0_0_20px_rgba(56,249,215,0.35)]"
                          : "bg-[#0b1226] border-[#546580]/30 text-[#8fa0b8] hover:border-[#38f9d7] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Zap
                          className={`w-4 h-4 transition ${
                            isSelected ? "text-[#38f9d7] animate-pulse" : "text-[#546580] group-hover:text-[#38f9d7]"
                          }`}
                        />
                        <div>
                          <span className="font-bold block">{diag.label}</span>
                          <span className="text-[10px] text-[#ffb703] block truncate max-w-[170px]">
                            {diag.inquiry}
                          </span>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition ${
                          isSelected ? "text-[#38f9d7] translate-x-1" : "text-[#546580] group-hover:text-white"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Computer Response Output Terminal */}
            <div className="bg-[#03050c] border-2 border-[#4361ee]/40 rounded-2xl p-5 shadow-[inset_0_0_25px_rgba(67,97,238,0.15)] relative">
              <div className="flex items-center justify-between border-b border-[#38f9d7]/25 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38f9d7] animate-ping" />
                  <span className="font-mono text-xs text-[#38f9d7] tracking-wider font-bold">
                    COMPUTER_RESPONSE: {activeDiag.label.toUpperCase()}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#ffb703]">
                  VOICE_SYNTH_ACTIVE
                </span>
              </div>

              {/* Typewriter Text Stream */}
              <div className="min-h-[90px] font-mono text-sm sm:text-base text-[#f2f6fb] leading-relaxed">
                {isProcessing ? (
                  <div className="flex items-center gap-2 text-[#38f9d7] animate-pulse py-4">
                    <Activity className="w-4 h-4 text-[#38f9d7]" />
                    <span>ACCESSING SHIP'S MAIN COMPUTER CORE...</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-[#38f9d7] mr-2">&gt;&gt;</span>
                    {typedResponse}
                    <span className="inline-block w-2 h-4 bg-[#38f9d7] ml-1 animate-pulse align-middle" />
                  </div>
                )}
              </div>

              {/* Starfleet Clearance Badge */}
              <div className="mt-4 pt-3 border-t border-[#546580]/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#8fa0b8]">
                <span className="flex items-center gap-1.5 text-[#06d6a0]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#06d6a0]" />
                  <span>Subspace Routing Nominal</span>
                </span>
                <span className="flex items-center gap-1 text-[#ffb703]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Deflector Shields 100%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
