// utils/voiceUtils.ts

export const speakScript = (
  script: string,
  onStart: () => void,
  onEnd: () => void,
  onError: () => void
) => {
  if (!script) return;

  window.speechSynthesis.cancel();

  const cleanScript = script
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#{1,6}\s/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanScript);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 0.8;

  utterance.onstart = onStart;
  utterance.onend = onEnd;
  utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  window.speechSynthesis.cancel();
};
