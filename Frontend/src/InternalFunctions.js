import { useState, useEffect } from "react";
export const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES"; // Configurar idioma (puedes cambiarlo a otro)
      speechSynthesis.speak(utterance);
    } else {
      alert("Tu navegador no soporta la API de síntesis de voz.");
    }
};

export const SpeakButton = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes("Google Español") || 
        voice.name.includes("US Spanish") || 
        voice.name.includes("Microsoft Sabina") ||
        voice.lang === "es-US"
      );
      setSelectedVoice(preferredVoice || voices.find(voice => voice.lang.startsWith("es")));
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);
  
  const toggleSpeech = () => {
    if (isSpeaking) {
      // Si ya está hablando, detenerlo
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "es-US";
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      } else {
        alert("Tu navegador no soporta la API de síntesis de voz.");
      }
    }
  };

  return (
    <button
      onClick={toggleSpeech}
      className="btn btn-primary"
    >
      <i className={`bi ${isSpeaking ? "bi-stop-circle" : "bi-volume-up"}`}></i>
    </button>
  );
};