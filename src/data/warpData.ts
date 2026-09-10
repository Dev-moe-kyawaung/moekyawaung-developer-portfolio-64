import { MissionClassification } from "../lib/warpTheme";

const CLD = "https://res.cloudinary.com/dye5qpwii/image/upload";

export const STARSHIP_DATA = {
  vessel: "U.S.S. KOTLIN // NX-86",
  registry: "MKA-WARP-2026",
  engineer: "Moe Kyaw Aung",
  engineerMm: "မိုးကျော်အောင်",
  rank: "CHIEF WARP-DRIVE ENGINEER",
  title: "Senior Android & Full-Stack Systems Architect",
  stardate: "2026.120 // SECTOR ALPHA",
  homeSpaceport: "Yangon Space Command, Sector Myanmar",
  outpostStation: "Bangkok Hyper-Relay, Deep Station 9",
  status: "WARP CORE ONLINE // ANTIMATTER CONFINEMENT STABLE",
  creed: "Warp through the unknown. Engineer fault-tolerant conduits. Leave hyper-spatial corridors for those who follow.",
  bio: "Chief engineer mastering sub-light to faster-than-light computational architectures. Designing resilient multi-module mobile platforms, offline-first quantum outbox synchronization, and real-time telemetry conduits operating across high-stress planetary frontiers.",
  phone: "+95 9 889 000 889",
  phoneAlt: "+95 9 666 000 050",
  whatsapp: "https://wa.me/959889000889",
  github: "Dev-moe-kyawaung",
  githubUrl: "https://github.com/Dev-moe-kyawaung",
  gravatar: "https://gravatar.com/moekyawaung2026",
  
  // Real Cloudinary Assets provided in prompt
  avatarHero: `${CLD}/v1778527878/IMG_20260430_053105_uef0yr.png`,
  portraitHolo: `${CLD}/v1778763535/MKA_25_lbx6fb.webp`,
  flightLog1: `${CLD}/v1778763531/MKA_12_iv8kpm.webp`,
  flightLog2: `${CLD}/v1778763531/MKA_3_zqrhhr.webp`,
  flightLog3: `${CLD}/v1778763532/MKA_11_jbijtv.webp`,
  currentMission: "MoekyawTranslator // On-Device AI Neural Flatbuffer (TFLite 4MB, 38ms)",
  
  warpCoreTelemetry: {
    warpFactor: "WARP 9.85",
    coreOutput: "4,850 TERA-WATTS",
    dilithiumIntegrity: "99.8%",
    antimatterFlow: "14.2 g/sec",
    plasmaPressure: "12,800 kPa",
  },
};

export const WARP_STATS = [
  { label: "MISSIONS LOGGED", value: "16+", detail: "Production Systems" },
  { label: "STARFLEET CERTS", value: "82+", detail: "Programming Hub" },
  { label: "SYSTEM SECTORS", value: "9", detail: "Software Domains" },
  { label: "FLIGHT SERVICE", value: "3.4", detail: "Years Active" },
];

export interface MissionLog {
  id: string;
  stardate: string;
  missionCode: string;
  title: string;
  classification: MissionClassification;
  sector: string;
  orbitalRadius: number; // For interactive orbit SVG calculation
  orbitalPeriod: number; // animation speed
  image: string;
  blurb: string;
  techConduits: string[];
  metrics: { label: string; value: string }[];
  computerLog: string;
  githubUrl: string;
}

export const MISSIONS: MissionLog[] = [
  {
    id: "social-dash",
    stardate: "2026.04",
    missionCode: "MSN-WARP-01",
    title: "Social Telemetry Cortex",
    classification: "PRIMARY_WARP",
    sector: "Sector 001 // Core Worlds",
    orbitalRadius: 130,
    orbitalPeriod: 32,
    image: `${CLD}/v1778795856/copilot_image_1778795000722_eo96gj.png`,
    blurb: "Real-time starfleet telemetry dashboard streaming concurrent account metrics, sentiment spectrum radar, and automated warp dispatch alerts.",
    techConduits: ["Kotlin", "Jetpack Compose", "Firebase Realtime", "MVI Architecture"],
    metrics: [
      { label: "STREAM RATE", value: "12k ev/s" },
      { label: "LATENCY", value: "0.8s" },
      { label: "CONDUITS", value: "5 Unified" },
    ],
    computerLog: "Telemetry stream consolidated from five disparate subspace channels into a single unified reactive StateFlow. Subspace delay reduced by 92%. Antimatter containment zero-leak verification.",
    githubUrl: "https://github.com/moekyawaung-tech/social-dashboard",
  },
  {
    id: "pos-promax",
    stardate: "2026.02",
    missionCode: "MSN-WARP-02",
    title: "POS Ultimate Pro Max",
    classification: "PRIMARY_WARP",
    sector: "Deep Frontier // Border Outposts",
    orbitalRadius: 175,
    orbitalPeriod: 40,
    image: `${CLD}/v1778795856/copilot_image_1778794626112_ega7kk.png`,
    blurb: "Heavy-duty commercial point-of-sale platform featuring offline-first quantum outbox storage, thermal receipt printing, and multi-station synchronization.",
    techConduits: ["Room SQLite", "WorkManager", "Bluetooth ESC/POS", "Outbox Pattern"],
    metrics: [
      { label: "LEDGER DATA", value: "30,000 Rows" },
      { label: "LOCAL COMMIT", value: "0ms" },
      { label: "DATA LOSS", value: "0 Transactions" },
    ],
    computerLog: "Engineered specifically for planetary colonies operating under total subspace radio blackout. Every transaction seals locally within Room SQLite before draining to cloud starbases via idempotent retry queues.",
    githubUrl: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
  },
  {
    id: "video-player",
    stardate: "2026.03",
    missionCode: "MSN-WARP-03",
    title: "Tachyon Video Engine",
    classification: "TACTICAL_CORE",
    sector: "Media Nebula // Sector 8",
    orbitalRadius: 220,
    orbitalPeriod: 48,
    image: `${CLD}/v1778795847/copilot_image_1778795115579_acfm5j.png`,
    blurb: "Senior-grade media playback pipeline driven by ExoPlayer Media3 with hardware-accelerated gesture scrubbing, subtitle streams, and quantum picture-in-picture.",
    techConduits: ["ExoPlayer Media3", "Compose Gestures", "PiP", "Multi-Track"],
    metrics: [
      { label: "FRAMERATE", value: "60 FPS Locked" },
      { label: "SEEK TIME", value: "12ms" },
      { label: "DROPPED FRAMES", value: "0" },
    ],
    computerLog: "Pipeline overhaul eliminates surface memory leaks during high-frequency seek maneuvers. Features seamless handover to picture-in-picture mode while cruising at sublight velocity.",
    githubUrl: "https://github.com/moekyawaung-tech/video-player",
  },
  {
    id: "translator-ai",
    stardate: "2026.05",
    missionCode: "MSN-WARP-04",
    title: "MoekyawTranslator AI",
    classification: "TACTICAL_CORE",
    sector: "Xenolinguistic Corridor",
    orbitalRadius: 260,
    orbitalPeriod: 54,
    image: `${CLD}/v1778795856/copilot_image_1778795675037_heh9xk.png`,
    blurb: "On-device universal neural translator executing a 4MB quantized TFLite neural model in 38ms with zero subspace network relay requirements.",
    techConduits: ["TFLite", "On-Device AI", "NNAPI Delegate", "Bilingual Model"],
    metrics: [
      { label: "INFERENCE", value: "38ms" },
      { label: "MEMORY MASS", value: "4.0 MB" },
      { label: "CLOUD ZERO", value: "100% Offline" },
    ],
    computerLog: "Quantized sequence-to-sequence translation flatbuffer deployed to edge hardware. Operates instantaneously across planetary borders without exposing xenolinguistic data to external relay grids.",
    githubUrl: "https://github.com/moekyawaung-tech",
  },
  {
    id: "game-vault",
    stardate: "2026.01",
    missionCode: "MSN-WARP-05",
    title: "Holodeck Arcade Vault",
    classification: "DEEP_EXPLORATION",
    sector: "Holodeck Complex // Deck 7",
    orbitalRadius: 300,
    orbitalPeriod: 62,
    image: `${CLD}/v1778795822/preview_dzhqvv.webp`,
    blurb: "Multi-simulation arcade bundle with Neon Snake, 2048 Turbo, Space Invaders, and synchronous Web Audio chiptune synthesizer loops.",
    techConduits: ["Canvas 60FPS", "State Machine", "Web Audio API", "TypeScript"],
    metrics: [
      { label: "SIMS", value: "4-in-1 Vault" },
      { label: "DELTA SYNC", value: "60.0 Hz" },
      { label: "GC OVERHEAD", value: "0ms" },
    ],
    computerLog: "Single master clock loop regulates graphics rendering, user controls, and audio synthesis in tight coordination. Verified zero garbage collector pauses during high-density object collisions.",
    githubUrl: "https://github.com/moekyawaung-tech/game-collection",
  },
  {
    id: "weather-radar",
    stardate: "2025.12",
    missionCode: "MSN-WARP-06",
    title: "Planetary Atmospheric Radar",
    classification: "DEEP_EXPLORATION",
    sector: "Orbital Sensor Array",
    orbitalRadius: 340,
    orbitalPeriod: 70,
    image: `${CLD}/v1778795859/copilot_image_1778794430377_n7xlmz.png`,
    blurb: "Planetary weather forecast station tracking geo-coordinate barometric gradients, severe ion storms, and thermal precipitation contours.",
    techConduits: ["Retrofit", "REST API", "Geocoding GPS", "Canvas Charts"],
    metrics: [
      { label: "POWER DRAW", value: "-60%" },
      { label: "RADAR DELTA", value: "Hourly" },
      { label: "PRECISION", value: "Geo-Pinpoint" },
    ],
    computerLog: "Employs geofenced invalidation to cull redundant orbital pings. Vector charts render on dedicated GPU canvas threads, reducing battery power draw by 60%.",
    githubUrl: "https://github.com/moekyawaung-tech/Weather-app",
  },
  {
    id: "pwa-matrix",
    stardate: "2025.11",
    missionCode: "MSN-WARP-07",
    title: "Subspace PWA Terminal",
    classification: "SYSTEM_STATION",
    sector: "Communications Relay",
    orbitalRadius: 380,
    orbitalPeriod: 78,
    image: `${CLD}/v1778795829/copilot_image_1778795000722_okryxj.png`,
    blurb: "Progressive web application featuring Workbox service workers, persistent offline quantum asset caching, and background synchronization.",
    techConduits: ["PWA", "Workbox", "Service Workers", "Vite"],
    metrics: [
      { label: "OFFLINE READY", value: "100%" },
      { label: "LIGHTHOUSE", value: "100 Score" },
      { label: "HOME DEPLOY", value: "PWA Install" },
    ],
    computerLog: "Fault-tolerant communications terminal that boots in milliseconds even when severed from primary orbital transceivers. Background sync reconciles state upon link acquisition.",
    githubUrl: "https://github.com/moekyawaung-tech/pwa-app",
  },
  {
    id: "thailand-transit",
    stardate: "2025.10",
    missionCode: "MSN-WARP-08",
    title: "Sector Corridor Navigation",
    classification: "SYSTEM_STATION",
    sector: "Sector 16 ⇄ Deep Station 9",
    orbitalRadius: 420,
    orbitalPeriod: 86,
    image: `${CLD}/v1778795856/copilot_image_1778795675037_heh9xk.png`,
    blurb: "Cross-border transit companion for Thailand and Myanmar corridors. Features offline vector topography, live currency conversion, and border transit logistics.",
    techConduits: ["Mapbox SDK", "Offline Vectors", "Room DB", "Multilingual"],
    metrics: [
      { label: "OFFLINE TILES", value: "Full Corridor" },
      { label: "EXCHANGE", value: "Live THB" },
      { label: "LANGUAGES", value: "Tri-Lingual" },
    ],
    computerLog: "Engineered for officers traversing the Yangon ⇄ Bangkok border zone. Pre-caches map tiles and fiscal conversion formulas inside Room SQLite to guarantee navigational certainty.",
    githubUrl: "https://github.com/moekyawaung-tech/thailand-travel",
  },
];

export const WARP_SYSTEMS = [
  { name: "Kotlin 2.0", conduit: "WARP CORE DRIVER", efficiency: "98%", status: "OPTIMAL", color: "#38f9d7" },
  { name: "Jetpack Compose", conduit: "HULL INTERFACE HUD", efficiency: "96%", status: "OPTIMAL", color: "#38f9d7" },
  { name: "Clean Architecture", conduit: "STRUCTURAL BULKHEAD", efficiency: "95%", status: "STABLE", color: "#4361ee" },
  { name: "Room SQLite", conduit: "QUANTUM OUTBOX VAULT", efficiency: "96%", status: "ARMORED", color: "#ffb703" },
  { name: "Coroutines & Flow", conduit: "PLASMA CONDUCTION", efficiency: "97%", status: "OPTIMAL", color: "#38f9d7" },
  { name: "TFLite Edge AI", conduit: "TACHYON NEURAL CORES", efficiency: "88%", status: "38MS SYNC", color: "#b5179e" },
  { name: "Firebase Suite", conduit: "SUBSPACE TELEMETRY", efficiency: "92%", status: "STREAMING", color: "#ffb703" },
  { name: "Retrofit & REST", conduit: "COMMUNICATIONS ARRAY", efficiency: "96%", status: "CLEAR", color: "#06d6a0" },
  { name: "Python", conduit: "DIAGNOSTIC SCRIPTING", efficiency: "85%", status: "READY", color: "#b5179e" },
  { name: "TypeScript / React", conduit: "BRIDGE DISPLAY CONSOLES", efficiency: "94%", status: "ACTIVE", color: "#38f9d7" },
  { name: "GitHub Actions", conduit: "AUTOMATED DOCKING CI/CD", efficiency: "92%", status: "GREEN", color: "#06d6a0" },
  { name: "Cybersecurity & Kali", conduit: "DEFLECTOR SHIELD MATRIX", efficiency: "86%", status: "ENCRYPTED", color: "#ff3366" },
];

export const COMPUTER_DIAGNOSTICS = [
  {
    key: "warp",
    label: "Warp Core Status",
    inquiry: "Run full diagnostic on antimatter reactor & dilithium matrix",
    analysis:
      "Computer reporting: Warp Core is operating at Warp 9.85 nominal output (4,850 Tera-Watts). Dilithium matrix integrity is 99.8%. Kotlin runtime and Compose rendering conduits report zero garbage collection stalls across all 16 deployed space stations.",
  },
  {
    key: "architecture",
    label: "Clean Architecture Bulkhead",
    inquiry: "Inspect layer isolation between Presentation, Domain, and Data",
    analysis:
      "Computer reporting: Structural bulkheads are sealed. The Domain core maintains 100% pure-Kotlin insulation from outer Android framework gravity wells. Unit testing conduits report 94.6% test isolation. Zero layer leakage detected.",
  },
  {
    key: "neural",
    label: "On-Device Neural Plume",
    inquiry: "Analyze MoekyawTranslator TFLite inference latency and memory load",
    analysis:
      "Computer reporting: Tachyon Neural Plume confirmed at 4.0MB static memory footprint. NNAPI hardware delegates execute sentence translations at 38ms average latency. Subspace network transmissions: zero bytes. Complete privacy shields engaged.",
  },
  {
    key: "persistence",
    label: "Subspace Outbox Persistence",
    inquiry: "Simulate total subspace communications severance and outbox queue",
    analysis:
      "Computer reporting: Simulating communications blackout. Room SQLite outbox takes full sovereignty over all mission ledger commits. On signal restoration, WorkManager deploys backoff sync conduits with zero collision anomalies.",
  },
];

export const SPACE_COMM_CHANNELS = [
  { name: "GitHub Subspace", handle: "Dev-moe-kyawaung", url: "https://github.com/Dev-moe-kyawaung", color: "#38f9d7" },
  { name: "Gravatar Beacon", handle: "moekyawaung2026", url: "https://gravatar.com/moekyawaung2026", color: "#ffb703" },
  { name: "Dev Hyper-Portal", handle: "moekyawaung-dev", url: "https://moekyawaung-dev.github.io/", color: "#06d6a0" },
  { name: "Bio Transceiver", handle: "moekyawaungmybio", url: "https://moekyawaungmybio.lovable.app/", color: "#4361ee" },
  { name: "Starfleet CV Beacon", handle: "cv-beacon", url: "https://cv-beacon.lovable.app/", color: "#b5179e" },
  { name: "Technical Hub Array", handle: "moekyawaung-tech", url: "https://moekyawaung-tech.github.io/", color: "#38f9d7" },
];

export const NAV_SYSTEMS = [
  { label: "Warp Bridge", href: "#hero" },
  { label: "Mission Logs", href: "#missions" },
  { label: "Ship's Computer", href: "#computer" },
  { label: "Conduit Telemetry", href: "#telemetry" },
  { label: "Communications Relay", href: "#comms" },
];
