// Charge la navbar et le footer, puis marque la page courante (aria-current).
async function include(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(file + " introuvable");
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    include("main-navbar", "components/navbar.html"),
    include("main-footer", "components/footer.html"),
  ]);
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach((a) => {
    if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page");
  });

  // Menu mobile
  const burger = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  if (burger && menu) {
    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
    };
    burger.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); burger.focus(); }
    });
  }

  // Bascule de thème (mémorisé si le navigateur l'autorise)
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const root = document.documentElement;
      const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }
});
