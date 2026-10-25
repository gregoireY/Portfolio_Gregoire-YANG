// Exécuté dans le <head> : évite le flash de thème et signale que JS est actif.
document.documentElement.classList.add("js");
try {
  const t = localStorage.getItem("theme");
  if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
} catch (e) {}
