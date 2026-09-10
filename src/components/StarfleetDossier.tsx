import React from "react";
import { STARSHIP_DATA, MISSIONS } from "../data/warpData";

export const StarfleetDossier: React.FC = () => {
  return (
    <div id="starship-dossier" className="hidden bg-white text-zinc-900 print:block">
      <div className="max-w-[760px] mx-auto p-10 font-sans text-xs leading-relaxed">
        {/* Header Block */}
        <div className="border-b-4 border-black pb-4">
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">
            {STARSHIP_DATA.engineer}
          </h1>
          <p className="text-sm font-bold text-zinc-800 mt-1">
            {STARSHIP_DATA.rank} // {STARSHIP_DATA.title}
          </p>
          <p className="text-[11px] text-zinc-600 mt-1">
            {STARSHIP_DATA.homeSpaceport} ⇄ {STARSHIP_DATA.outpostStation} · {STARSHIP_DATA.phone} · github.com/{STARSHIP_DATA.github}
          </p>
        </div>

        {/* Executive Summary */}
        <div className="mt-5">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black">
            Starfleet Flight &amp; Engineering Summary
          </h2>
          <p className="text-zinc-700 mt-1 leading-normal">
            Senior Android &amp; Full-Stack Systems Architect with 3+ years of production experience designing faster-than-light mobile applications using <b>Kotlin</b>, <b>Jetpack Compose</b>, <b>Clean Architecture</b>, and <b>MVVM/MVI</b> patterns. Proven expertise in offline-first distributed data synchronization (Room SQLite + WorkManager quantum outbox queues), Google Firebase cloud backends, and automated CI/CD release pipelines via GitHub Actions. Google Developers Launchpad participant with <b>82+ verified technical certifications</b> across 9 computer science domains. Currently deploying on-device AI translation engines using quantized TFLite models with 38ms latency guarantees.
          </p>
        </div>

        {/* Technical Conduits */}
        <div className="mt-5">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black">
            Primary Starship Conduits &amp; Core Systems
          </h2>
          <p className="text-zinc-700 mt-1">
            <b>Android / Mobile Conduits:</b> Kotlin 2.0, Jetpack Compose, ViewModel, Navigation, Room SQLite, WorkManager, ExoPlayer Media3, Material 3, Mapbox SDK.<br />
            <b>System Architecture:</b> Clean Architecture (Data/Domain/Presentation), MVI, MVVM, Multi-Module Design, Outbox Pattern, Repository Pattern.<br />
            <b>Cloud &amp; Telemetry:</b> Firebase Suite (Firestore, Cloud Messaging, Crashlytics, Auth), RESTful APIs, Retrofit, OkHttp, Python.<br />
            <b>AI &amp; Edge Inference:</b> TFLite On-Device Quantized Models, NNAPI Hardware Delegates, Edge Inference, Web PWA.<br />
            <b>DevOps &amp; Security:</b> GitHub Actions CI/CD, Automated Testing (JUnit, MockK, Espresso), Fastlane, Linux / Kali, Deflector Shield Encryption.
          </p>
        </div>

        {/* Selected Mission Logs */}
        <div className="mt-5">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black">
            Selected Orbital Mission Logs
          </h2>
          <ul className="mt-2 space-y-3">
            {MISSIONS.slice(0, 4).map((mission) => (
              <li key={mission.id} className="border-l-2 border-black pl-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-black text-sm">{mission.title}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{mission.techConduits.join(" · ")}</span>
                </div>
                <p className="text-zinc-700 mt-0.5">{mission.blurb}</p>
                <div className="text-[10px] text-zinc-600 mt-1 flex gap-4">
                  <span><b>Log:</b> {mission.computerLog}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Starfleet Certifications */}
        <div className="mt-5">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black">
            Starfleet Academy Certifications &amp; Credentials
          </h2>
          <p className="text-zinc-700 mt-1">
            • <b>82+ Certified Subjects (Programming Hub):</b> Programming Languages (13), Web Development (13), Mobile Development (7), Databases (6), AI &amp; Data Science (11), Security &amp; DevOps (10), Blockchain (4), Software Engineering (7), Business (11).<br />
            • <b>Google Developers Launchpad</b> selection and graduate.<br />
            • Bilingual fluency: Burmese (Native), English (Professional Working), Thai (Working).
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 border-t border-zinc-300 pt-3 text-center text-[10px] text-zinc-500 font-mono">
          “{STARSHIP_DATA.creed}” — Vessel Register: {STARSHIP_DATA.vessel} // github.com/{STARSHIP_DATA.github}
        </p>
      </div>
    </div>
  );
};
