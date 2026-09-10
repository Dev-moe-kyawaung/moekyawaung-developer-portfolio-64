import React, { useState } from "react";
import { Zap, X, FolderGit2, ChevronRight, Filter, Orbit } from "lucide-react";
import { MISSIONS, MissionLog } from "../data/warpData";
import { CLASSIFICATIONS, MissionClassification, rgba } from "../lib/warpTheme";
import { warpAudio } from "../lib/warpAudio";

export const OrbitalMissions: React.FC = () => {
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedMission, setSelectedMission] = useState<MissionLog | null>(null);
  const [warpingId, setWarpingId] = useState<string | null>(null);

  const categories: ("ALL" | MissionClassification)[] = [
    "ALL",
    "PRIMARY_WARP",
    "TACTICAL_CORE",
    "DEEP_EXPLORATION",
    "SYSTEM_STATION",
  ];

  const filteredMissions = filter === "ALL"
    ? MISSIONS
    : MISSIONS.filter((m) => m.classification === filter);

  const handleSelectMission = (mission: MissionLog) => {
    warpAudio.gravityDistortion();
    setWarpingId(mission.id);
    setTimeout(() => {
      setSelectedMission(mission);
      setWarpingId(null);
    }, 400);
  };

  const handleClose = () => {
    warpAudio.sensorTick();
    setSelectedMission(null);
  };

  return (
    <section id="missions" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#38f9d7]/10 border border-[#38f9d7]/40 rounded-full font-mono text-xs text-[#38f9d7] tracking-widest mb-3">
            <Orbit className="w-3.5 h-3.5 text-[#38f9d7] animate-pulse" />
            <span>ORBITAL TRAJECTORY MATRIX // 8 ACTIVE MISSIONS</span>
          </div>
          <h2 className="warp-title text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            MISSION LOGS
          </h2>
          <p className="font-body text-xl text-[#8fa0b8] max-w-xl mt-2 italic">
            Each system is a deployed starship mission orbiting regional starbases. Engage a mission conduit to inspect warp yields and flight telemetries.
          </p>
        </div>

        {/* Orbit Classification Filter */}
        <div className="flex items-center gap-2 bg-[#060a17] border border-[#38f9d7]/30 p-1.5 rounded-2xl self-start md:self-auto overflow-x-auto shadow-[0_0_15px_rgba(56,249,215,0.15)]">
          <Filter className="w-4 h-4 text-[#38f9d7] ml-2 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                warpAudio.sensorTick();
                setFilter(cat);
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-[10px] uppercase tracking-wider transition ${
                filter === cat
                  ? "bg-gradient-to-r from-[#38f9d7] to-[#4361ee] text-[#03050c] shadow-[0_0_15px_rgba(56,249,215,0.5)] font-bold"
                  : "text-[#8fa0b8] hover:text-white hover:bg-[#101b38]"
              }`}
            >
              {cat === "ALL" ? "ALL ORBITS" : cat.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Mission Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMissions.map((mission) => {
          const isWarping = warpingId === mission.id;
          const classMeta = CLASSIFICATIONS[mission.classification];

          return (
            <div
              key={mission.id}
              onClick={() => handleSelectMission(mission)}
              className={`hud-panel hud-bracket rounded-2xl p-5 cursor-pointer group flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-[#38f9d7] hover:shadow-[0_15px_40px_rgba(56,249,215,0.35)] ${
                isWarping ? "scale-95 brightness-150" : ""
              }`}
              style={{
                borderColor: rgba(classMeta.color, 0.35),
              }}
            >
              {/* Warp Speed Scanline Sheen */}
              <div className="warp-scanline" />

              <div>
                {/* Header: Mission Code & Velocity */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-[9px] px-2 py-0.5 rounded border tracking-wider font-bold"
                    style={{
                      color: classMeta.color,
                      borderColor: rgba(classMeta.color, 0.4),
                      background: rgba(classMeta.color, 0.1),
                    }}
                  >
                    {mission.missionCode}
                  </span>
                  <span className="font-mono text-[10px] text-[#38f9d7] flex items-center gap-1 font-bold">
                    <Zap className="w-3 h-3 text-[#ffb703]" />
                    {classMeta.warpFactor}
                  </span>
                </div>

                {/* Subspace Visual Array Screen */}
                <div className="relative w-full h-36 rounded-xl overflow-hidden border border-[#38f9d7]/30 bg-[#03050c] mb-4">
                  <img
                    src={mission.image}
                    alt={mission.title}
                    className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1226] via-transparent to-transparent opacity-80" />

                  {/* Orbital Radius & Stardate Stamp */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-[#060a17]/85 px-2 py-1 rounded border border-[#38f9d7]/30 font-mono text-[9px]">
                    <span className="text-[#8fa0b8] truncate max-w-[120px]">{mission.sector}</span>
                    <span className="text-[#ffb703] font-bold">{mission.stardate}</span>
                  </div>
                </div>

                {/* Mission Title & Blurb */}
                <h3 className="font-tech text-xl font-bold text-white group-hover:text-[#38f9d7] transition line-clamp-1">
                  {mission.title}
                </h3>
                <p className="font-body text-base text-[#8fa0b8] line-clamp-2 mt-1.5 leading-snug">
                  {mission.blurb}
                </p>
              </div>

              {/* Bottom Conduits & Engage CTA */}
              <div className="mt-5 pt-3 border-t border-[#38f9d7]/20 flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#ffb703] truncate max-w-[140px]">
                  {mission.techConduits.slice(0, 2).join(" · ")}
                </span>
                <span
                  className="font-mono text-[10px] font-bold tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition"
                  style={{ color: classMeta.color }}
                >
                  <span>ENGAGE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Starship Mission Holo-Deck Modal */}
      {selectedMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl hud-panel hud-bracket border-2 border-[#38f9d7] rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(56,249,215,0.4)] warp-emerge max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#0b1226] border border-[#38f9d7]/40 text-[#38f9d7] hover:text-white hover:border-[#38f9d7] transition"
              aria-label="Close Mission Telemetry"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Telemetry */}
            <div className="flex flex-wrap items-center gap-3 mb-6 pb-4 border-b border-[#38f9d7]/30">
              <span
                className="font-mono text-xs px-3 py-1 rounded-lg border font-bold"
                style={{
                  color: CLASSIFICATIONS[selectedMission.classification].color,
                  borderColor: rgba(CLASSIFICATIONS[selectedMission.classification].color, 0.5),
                  background: rgba(CLASSIFICATIONS[selectedMission.classification].color, 0.15),
                }}
              >
                {selectedMission.missionCode}
              </span>
              <span className="font-mono text-sm text-[#38f9d7] font-bold">
                STARDATE: {selectedMission.stardate}
              </span>
              <span className="text-zinc-600">|</span>
              <span className="font-mono text-sm text-[#ffb703]">
                {selectedMission.sector}
              </span>
            </div>

            {/* Modal Body: Image & Starship Computer Log */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column: Visual Recon */}
              <div className="md:col-span-5 rounded-2xl overflow-hidden border border-[#38f9d7]/40 shadow-[0_0_25px_rgba(56,249,215,0.25)]">
                <img
                  src={selectedMission.image}
                  alt={selectedMission.title}
                  className="w-full h-56 md:h-64 object-cover"
                />
              </div>

              {/* Right Column: Computer Mission Report */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                    {selectedMission.title}
                  </h3>
                  <p className="font-body text-lg text-[#cad6f2] italic mt-1 leading-snug">
                    “{selectedMission.blurb}”
                  </p>
                </div>

                {/* Starship Log Box */}
                <div className="space-y-3 bg-[#060a17]/90 p-4 rounded-xl border border-[#38f9d7]/30 font-mono text-xs">
                  <div>
                    <span className="text-[#38f9d7] font-bold block mb-0.5">
                      // CHIEF ENGINEER LOG:
                    </span>
                    <span className="text-[#cad6f2] leading-relaxed">
                      {selectedMission.computerLog}
                    </span>
                  </div>
                </div>

                {/* Subspace Flight Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {selectedMission.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="bg-[#0b1226] border border-[#38f9d7]/30 px-2 py-2 rounded-lg text-center font-mono"
                    >
                      <div className="text-[#38f9d7] font-bold text-xs">{metric.value}</div>
                      <div className="text-[#8fa0b8] text-[8px] tracking-wider mt-0.5">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Conduits Strip */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedMission.techConduits.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full bg-[#101b38] border border-[#38f9d7]/30 font-mono text-[9px] text-[#38f9d7]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub CTA Action */}
                <div className="pt-2 flex gap-3">
                  <a
                    href={selectedMission.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-[#38f9d7] via-[#4361ee] to-[#b5179e] hover:brightness-110 text-white font-tech text-xs tracking-[0.2em] font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,249,215,0.4)] transition"
                  >
                    <FolderGit2 className="w-4 h-4" />
                    <span>ACCESS REPOSITORY CONDUIT</span>
                  </a>
                  <button
                    onClick={handleClose}
                    className="py-3 px-5 bg-[#0b1226] border border-[#546580]/40 text-[#8fa0b8] hover:text-white font-mono text-xs rounded-xl transition"
                  >
                    STANDBY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
