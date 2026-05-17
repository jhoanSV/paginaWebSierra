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

/**
 * Convierte un número a un formato de moneda localizado para Colombia.
 * * @description Utiliza la API `Intl.NumberFormat` para asegurar que los separadores 
 * de miles y decimales correspondan a la región es-CO.
 * * @param {number|bigint} valor - Cantidad numérica a procesar.
 * @returns {string} Texto formateado.
 * * @example
 * priceValue(15000); // Retorna "15.000"
 * priceValue(1250.5); // Retorna "1.250,5"
 */
export function priceValue(valor) {
  return new Intl.NumberFormat('es-CO', {maximumFractionDigits: 2}).format(valor);
}

export const getFontSize = (str, base, lim) => {
  const baseSize = base;
  console.log(str, str.length, lim);

  if (str.length > lim) {
    console.log('a');
    
    const newSize = baseSize - (str.length - 20) * 0.01;
    return `${Math.max(newSize, 1.2)}rem`;
  }
  return `${baseSize}rem`;
};