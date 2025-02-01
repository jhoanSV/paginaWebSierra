export const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES"; // Configurar idioma (puedes cambiarlo a otro)
      speechSynthesis.speak(utterance);
    } else {
      alert("Tu navegador no soporta la API de síntesis de voz.");
    }
};