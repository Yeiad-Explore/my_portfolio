// Minimal Peaceful Ambient Engine for the Solitary Coder Aesthetic
class SubtleAudioEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleAmbient(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public isAmbientActive(): boolean {
    return this.isPlaying;
  }

  private start() {
    try {
      const ctx = this.getContext();
      this.isPlaying = true;

      // Soft master gain
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3.0);
      master.connect(ctx.destination);
      this.ambientGain = master;

      // Warm peaceful frequencies (calm wind & mountain drone)
      const frequencies = [110.0, 164.81, 220.0];
      this.oscillators = frequencies.map((freq) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(260, ctx.currentTime);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        osc.start();

        return osc;
      });
    } catch {
      this.isPlaying = false;
    }
  }

  private stop() {
    if (!this.isPlaying) return;
    try {
      if (this.ctx && this.ambientGain) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
        setTimeout(() => {
          this.oscillators.forEach(o => { try { o.stop(); o.disconnect(); } catch {} });
          this.oscillators = [];
          this.isPlaying = false;
        }, 1600);
      } else {
        this.isPlaying = false;
      }
    } catch {
      this.isPlaying = false;
    }
  }
}

export const subtleAudio = new SubtleAudioEngine();
