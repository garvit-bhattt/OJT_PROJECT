export class SoundManager {
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.context.createGain();
        this.masterGain.connect(this.context.destination);
        this.masterGain.gain.value = 0.3; // Global Volume
    }

    // Call this on the first user click to unlock audio in the browser
    resume() {
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
    }

    playCoin() {
        // A high-pitched "Ding" (Sine wave)
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.type = 'sine';
        
        // Pitch envelope: Slide UP quickly
        osc.frequency.setValueAtTime(1200, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(2000, this.context.currentTime + 0.1);

        // Volume envelope: Fade out quickly
        gain.gain.setValueAtTime(0.5, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.context.currentTime + 0.3);
    }

    playCrash() {
        // A low-pitched "Crunch" (Sawtooth wave)
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.type = 'sawtooth';

        // Pitch envelope: Slide DOWN
        osc.frequency.setValueAtTime(150, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.context.currentTime + 0.2);

        // Volume envelope
        gain.gain.setValueAtTime(0.8, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.context.currentTime + 0.2);
    }
}