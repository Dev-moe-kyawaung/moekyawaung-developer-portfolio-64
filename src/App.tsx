import { useEffect } from "react";
import { WarpStarfield } from "./components/WarpStarfield";
import { GravityLensFilter } from "./components/GravityLensFilter";
import { WarpCursor } from "./components/WarpCursor";
import { WarpBootSequence } from "./components/WarpBootSequence";
import { WarpNav } from "./components/WarpNav";
import { WarpBridgeHero } from "./components/WarpBridgeHero";
import { OrbitalMissions } from "./components/OrbitalMissions";
import { StarshipComputer } from "./components/StarshipComputer";
import { ConduitTelemetry } from "./components/ConduitTelemetry";
import { CommunicationsRelay } from "./components/CommunicationsRelay";
import { WarpDock } from "./components/WarpDock";
import { WarpPalette } from "./components/WarpPalette";
import { StarfleetDossier } from "./components/StarfleetDossier";
import { warpAudio } from "./lib/warpAudio";

export default function App() {
  // Global pointer parallax for starship hull layers
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--mx", x.toFixed(3));
      document.documentElement.style.setProperty("--my", y.toFixed(3));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Restore persisted audio preference
  useEffect(() => {
    try {
      if (localStorage.getItem("warp-audio") === "1") {
        warpAudio.toggle(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <>
      {/* Warp Core Spool-up Preloader */}
      <WarpBootSequence />

      {/* Tactical Targeting HUD Cursor */}
      <WarpCursor />

      {/* Gravity Lens & Tachyon SVG Distortion Filters */}
      <GravityLensFilter />

      <div className="app-shell relative min-h-screen bg-[#03050c] font-body text-[#cad6f2]">
        {/* Procedural 3D Warp Starfield & Tunnel Canvas */}
        <WarpStarfield />

        {/* Spacecraft HUD Atmospheric Vignette & Hull Texture */}
        <div className="fx-vignette pointer-events-none fixed inset-0 z-[40]" />
        <div className="fx-grain pointer-events-none fixed inset-0 z-[41]" />

        {/* Warp Bridge Navigation Console */}
        <WarpNav />

        {/* Main Starship Decks & Conduits */}
        <main className="relative">
          <WarpBridgeHero />
          <OrbitalMissions />
          <StarshipComputer />
          <ConduitTelemetry />
          <CommunicationsRelay />
        </main>

        {/* Tactical Subspace Instrument Dock */}
        <WarpDock />

        {/* LCARS Command Deck (Ctrl+K) */}
        <WarpPalette />
      </div>

      {/* Printable Starfleet Engineer Dossier (CV) */}
      <StarfleetDossier />
    </>
  );
}
