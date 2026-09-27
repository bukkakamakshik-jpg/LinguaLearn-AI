// Audio feedback using Web Audio API synthesis (works everywhere without static asset dependencies)

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  return soundEnabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

// 1. Play Correct Chime (Pleasant high frequency two-tone ding)
export function playCorrectSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5

    osc2.frequency.setValueAtTime(1046.50, now + 0.1); // C6

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.1);

    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  } catch (e) {
    // Ignore audio context constraints
  }
}

// 2. Play Wrong Buzz (Low double buzz)
export function playWrongSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.setValueAtTime(140, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {
    // Ignore audio error
  }
}

// 3. Play Level Complete / Stage Complete Fanfare
export function playVictorySound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.2, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.4);
    });
  } catch (e) {
    // Ignore
  }
}

// 4. Play Bubble Click Pop
export function playClickSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {
    // Ignore
  }
}

// 5. Web Speech API: Text to Speech
export function speakSentence(text: string, lang = 'en-US', rate = 0.95) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis unavailable', e);
  }
}

// 6. Web Speech Recognition Helper
export function listenToSpeech(
  expectedText: string,
  onResult: (spokenText: string, accuracy: number, passed: boolean) => void,
  onError: (err: string) => void
): { stop: () => void } | null {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    onError('Speech recognition not supported in this browser. Please use text typing instead.');
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const cleanExpected = expectedText.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
      const cleanTranscript = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

      // Simple similarity measure
      const expectedWords = cleanExpected.split(/\s+/);
      const spokenWords = cleanTranscript.split(/\s+/);
      let matchCount = 0;
      expectedWords.forEach(w => {
        if (spokenWords.includes(w)) matchCount++;
      });

      const accuracy = Math.round((matchCount / Math.max(expectedWords.length, 1)) * 100);
      const passed = accuracy >= 65 || cleanExpected === cleanTranscript;

      onResult(transcript, accuracy, passed);
    };

    recognition.onerror = (event: any) => {
      onError(event.error || 'Speech input error');
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch (e) {}
      }
    };
  } catch (err: any) {
    onError(err.message || 'Microphone access failed');
    return null;
  }
}
