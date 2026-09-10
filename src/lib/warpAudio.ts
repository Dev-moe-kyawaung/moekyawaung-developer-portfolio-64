// Interstellar Starship Web Audio Procedural Synthesizer
// Generates warp drive engagement spool-ups, tachyon pings, hull vibrations, and computer chirps

class WarpAudio {
  private ctx: AudioContext | null = null;
  public enabled = false;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === "suspended") void this.ctx.resume();
  }

  toggle(v?: boolean): boolean {
    this.enabled = v !== undefined ? v : !this.enabled;
    if (this.enabled) {
      this.init();
      this.computerChirp();
    }
    try {
      localStorage.setItem("warp-audio", this.enabled ? "1" : "0");
    } catch { /* noop */ }
    window.dispatchEvent(new CustomEvent("warp:audio", { detail: this.enabled }));
    return this.enabled;
  }

  // LCARS / Starship Computer acknowledgment chirp
  computerChirp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    
    // 2-tone melodic acknowledgment
    const freqs = [1046.5, 1318.5, 1567.98]; // C6, E6, G6
    freqs.forEach((freq, idx) => {
      const o = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(freq, t + idx * 0.05);
      
      g.gain.setValueAtTime(0.04, t + idx * 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.05 + 0.09);
      
      o.connect(g).connect(this.ctx!.destination);
      o.start(t + idx * 0.05);
      o.stop(t + idx * 0.05 + 0.1);
    });
  }

  // Warp core engage spool-up sweep
  engageWarp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const dur = 1.2;

    // Sub-bass rumble
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = "sawtooth";
    subOsc.frequency.setValueAtTime(60, t);
    subOsc.frequency.exponentialRampToValueAtTime(180, t + dur);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(140, t);
    filter.frequency.exponentialRampToValueAtTime(450, t + dur);

    subGain.gain.setValueAtTime(0.001, t);
    subGain.gain.exponentialRampToValueAtTime(0.09, t + 0.2);
    subGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    subOsc.connect(filter).connect(subGain).connect(this.ctx.destination);
    subOsc.start(t);
    subOsc.stop(t + dur);

    // High tachyon plasma rise
    const highOsc = this.ctx.createOscillator();
    const highGain = this.ctx.createGain();
    highOsc.type = "sine";
    highOsc.frequency.setValueAtTime(440, t);
    highOsc.frequency.exponentialRampToValueAtTime(2600, t + dur);

    highGain.gain.setValueAtTime(0.001, t);
    highGain.gain.exponentialRampToValueAtTime(0.05, t + 0.4);
    highGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    highOsc.connect(highGain).connect(this.ctx.destination);
    highOsc.start(t);
    highOsc.stop(t + dur + 0.05);
  }

  // HUD sensor tick
  sensorTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(2400, t);
    g.gain.setValueAtTime(0.02, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    o.connect(g).connect(this.ctx.destination);
    o.start(t);
    o.stop(t + 0.035);
  }

  // Gravity lens distortion wave
  gravityDistortion() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const dur = 0.8;

    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(800, t);
    o.frequency.exponentialRampToValueAtTime(150, t + dur * 0.5);
    o.frequency.exponentialRampToValueAtTime(400, t + dur);

    g.gain.setValueAtTime(0.001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.15);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);

    o.connect(g).connect(this.ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }
}

export const warpAudio = new WarpAudio();
