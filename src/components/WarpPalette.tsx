import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Zap,
  Activity,
  Printer,
  Volume2,
  VolumeX,
  ArrowUp,
  CornerDownLeft,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { NAV_SYSTEMS, MISSIONS, COMPUTER_DIAGNOSTICS } from "../data/warpData";
import { warpAudio } from "../lib/warpAudio";

interface PaletteEntry {
  group: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  run: () => void;
}

export const WarpPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("warp:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("warp:palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      window.setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const items: PaletteEntry[] = useMemo(() => {
    const list: PaletteEntry[] = [];

    // Navigation
    NAV_SYSTEMS.forEach((l) =>
      list.push({
        group: "TRAVERSE STARSHIP DECKS",
        label: `Navigate to ${l.label}`,
        hint: l.href,
        icon: Zap,
        run: () => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }),
      })
    );

    // Missions
    MISSIONS.forEach((m) =>
      list.push({
        group: "ENGAGE MISSION CONDUIT",
        label: m.title,
        hint: `${m.missionCode} // ${m.stardate}`,
        icon: Zap,
        run: () => {
          document.querySelector("#missions")?.scrollIntoView({ behavior: "smooth" });
          window.setTimeout(() => {
            warpAudio.engageWarp();
          }, 350);
        },
      })
    );

    // Ship's Computer Subroutines
    COMPUTER_DIAGNOSTICS.forEach((d) =>
      list.push({
        group: "COMPUTER SUBROUTINES",
        label: `Execute Inquiry: ${d.label}`,
        hint: d.key.toUpperCase(),
        icon: Cpu,
        run: () => {
          document.querySelector("#computer")?.scrollIntoView({ behavior: "smooth" });
        },
      })
    );

    // Operations
    list.push(
      {
        group: "OPERATIONS",
        label: "Print Starfleet Engineer Dossier (PDF)",
        hint: "Curriculum Vitae",
        icon: Printer,
        run: () => window.print(),
      },
      {
        group: "OPERATIONS",
        label: "Toggle Warp Audio Conduits",
        hint: warpAudio.enabled ? "ACTIVE" : "MUTED",
        icon: warpAudio.enabled ? Volume2 : VolumeX,
        run: () => warpAudio.toggle(),
      },
      {
        group: "OPERATIONS",
        label: "Return to Warp Bridge Apex",
        hint: "Top",
        icon: ArrowUp,
        run: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      }
    );

    return list;
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(needle) || i.group.toLowerCase().includes(needle) || i.hint?.toLowerCase().includes(needle)
    );
  }, [items, q]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const runItem = (item: PaletteEntry) => {
    setOpen(false);
    warpAudio.sensorTick();
    window.setTimeout(() => item.run(), 30);
  };

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-[180] flex items-start justify-center px-4 pt-[11vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Starship Tactical Console"
    >
      <div className="absolute inset-0 bg-[#03050c]/85 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="hud-panel hud-bracket relative w-full max-w-xl overflow-hidden rounded-2xl border-2 border-[#38f9d7] shadow-[0_0_80px_rgba(56,249,215,0.4)] warp-emerge">
        <div className="flex items-center gap-3 border-b border-[#38f9d7]/30 px-4 py-3.5 bg-[#03050c]/60">
          <Search className="h-4 w-4 shrink-0 text-[#38f9d7]" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(filtered.length - 1, a + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(0, a - 1));
              } else if (e.key === "Enter") {
                const it = filtered[active];
                if (it) runItem(it);
              }
            }}
            placeholder="Command vessel systems, mission logs, or computer diagnostics..."
            className="w-full bg-transparent font-mono text-sm tracking-wide text-white placeholder:text-[#546580] focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded border border-[#38f9d7]/30 px-1.5 py-0.5 font-mono text-[9px] text-[#38f9d7] sm:block">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[48vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center font-mono text-xs tracking-[0.3em] text-[#546580]">
              NO SUBSPACE TARGET IDENTIFIED
            </p>
          )}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            const Icon = item.icon;
            return (
              <div key={`${item.group}-${item.label}`}>
                {header && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[9px] tracking-[0.35em] text-[#38f9d7]">
                    {header}
                  </p>
                )}
                <button
                  data-idx={i}
                  onClick={() => runItem(item)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                    i === active ? "bg-[#38f9d7]/20 text-white" : "text-[#cad6f2]"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                      i === active ? "border-[#38f9d7] text-[#38f9d7]" : "border-[#546580]/30 text-[#8fa0b8]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-xs tracking-wider">
                    {item.label}
                  </span>
                  {item.hint && (
                    <span className="hidden shrink-0 font-mono text-[10px] text-[#ffb703] sm:block">
                      {item.hint}
                    </span>
                  )}
                  {i === active && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-[#38f9d7]" />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-[#38f9d7]/30 px-4 py-2.5 font-mono text-[9px] tracking-[0.25em] text-[#8fa0b8] bg-[#03050c]/60">
          <span className="flex items-center gap-1.5 text-[#38f9d7]">
            <Activity className="h-3 w-3 text-[#38f9d7]" /> WARP CONDUIT: ONLINE
          </span>
          <span>ENTER TO ENGAGE // ESC TO DISENGAGE</span>
        </div>
      </div>
    </div>
  );
};
