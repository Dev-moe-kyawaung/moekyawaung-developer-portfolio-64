import React, { useEffect, useState } from "react";
import { Activity, Command, Volume2, VolumeX, ArrowUp, Zap } from "lucide-react";
import { warpAudio } from "../lib/warpAudio";
import { STARSHIP_DATA } from "../data/warpData";

function useFps() {
  const [fps, setFps] = useState(60);
  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      frames++;
      if (t - last >= 1000) {
        setFps(Math.round((frames * 1000) / (t - last)));
        frames = 0;
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return fps;
}

function useStardate() {
  const [timeStr, setTimeStr] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "UTC",
        }).format(now)
      );
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);
  return timeStr;
}

export const WarpDock: React.FC = () => {
  const fps = useFps();
  const utcClock = useStardate();
  const [soundOn, setSoundOn] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setSoundOn(warpAudio.enabled);
    const onAudio = (e: Event) => setSoundOn(!!(e as CustomEvent<boolean>).detail);
    const onScroll = () => setShowTop(window.scrollY > 800);

    window.addEventListener("warp:audio", onAudio);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("warp:audio", onAudio);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToBridge = () => {
    warpAudio.sensorTick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Bottom Starship Telemetry Pill */}
      <div className="fixed bottom-4 left-4 z-[150] hidden md:flex items-center gap-3 hud-panel px-4 py-2 rounded-2xl border border-[#38f9d7]/40 font-mono text-[10px] tracking-[0.16em] text-[#8fa0b8] backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {/* Subspace sensor rate */}
        <span className="flex items-center gap-1.5 text-[#38f9d7]">
          <Activity className="h-3.5 w-3.5 animate-pulse" /> {fps} HZ
        </span>

        <span className="h-3 w-px bg-[#546580]/30" />

        {/* Global Spaceport Clocks */}
        <span className="tabular-nums text-[#38f9d7]">UTC {utcClock}</span>
        <span className="tabular-nums text-[#ffb703]">{STARSHIP_DATA.warpCoreTelemetry.warpFactor}</span>

        <span className="h-3 w-px bg-[#546580]/30" />

        {/* Core Output */}
        <span className="flex items-center gap-1 text-white font-bold">
          <Zap className="w-3 h-3 text-[#38f9d7]" />
          <span>4,850 TW</span>
        </span>

        <span className="h-3 w-px bg-[#546580]/30" />

        {/* Audio Engine Trigger */}
        <button
          onClick={() => warpAudio.toggle()}
          title="Toggle Starship Audio Conduits"
          className={`flex h-7 w-7 items-center justify-center rounded-lg border transition ${
            soundOn
              ? "border-[#38f9d7] bg-[#38f9d7]/20 text-[#38f9d7] shadow-[0_0_12px_rgba(56,249,215,0.5)]"
              : "border-[#546580]/30 text-[#546580] hover:border-[#38f9d7] hover:text-white"
          }`}
        >
          {soundOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        </button>

        {/* LCARS Palette Trigger */}
        <button
          onClick={() => window.dispatchEvent(new Event("warp:palette"))}
          title="Launch Starship Tactical Console (Ctrl+K)"
          className="flex h-7 items-center gap-1 rounded-lg px-2 text-[#546580] hover:bg-[#38f9d7]/15 hover:text-[#38f9d7] transition"
        >
          <Command className="h-3.5 w-3.5" /> CTRL K
        </button>
      </div>

      {/* Return to Bridge Apex Button */}
      <button
        onClick={scrollToBridge}
        aria-label="Return to Starship Bridge"
        className={`fixed bottom-5 right-5 z-[150] flex h-11 w-11 items-center justify-center rounded-full border border-[#38f9d7]/60 bg-[#060a17]/90 text-[#38f9d7] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,249,215,0.6)] hover:scale-105 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
};
