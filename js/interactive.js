document.addEventListener("DOMContentLoaded", () => {
  // Filtre des projets par technologie
  const bar = document.querySelector("[data-filter]");
  if (bar) {
    const cards = [...document.querySelectorAll("[data-tech]")];
    const out = document.getElementById("filter-status");
    bar.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-value]");
      if (!btn) return;
      bar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      const v = btn.dataset.value;
      let n = 0;
      cards.forEach((c) => {
        const show = v === "all" || c.dataset.tech.split(" ").includes(v);
        c.hidden = !show;
        if (show) n++;
      });
      out.textContent = `${n} projet${n > 1 ? "s" : ""} affiché${n > 1 ? "s" : ""}`;
    });
  }

  // Formulaire : validation côté client + envoi sans rechargement
  const form = document.querySelector(".form");
  if (form) {
    const status = form.querySelector(".form__status");
    const fields = [...form.querySelectorAll("[required]")];
    const check = (el) => {
      let msg = "";
      if (el.validity.valueMissing) msg = "Ce champ est obligatoire.";
      else if (el.validity.typeMismatch) msg = "Adresse e-mail invalide.";
      document.getElementById(el.id + "-err").textContent = msg;
      el.setAttribute("aria-invalid", String(Boolean(msg)));
      return !msg;
    };
    fields.forEach((el) => el.addEventListener("blur", () => check(el)));
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!fields.map(check).every(Boolean)) {
        form.querySelector('[aria-invalid="true"]').focus();
        return;
      }
      if (form.action.includes("YOUR_FORM_ID")) {
        status.textContent = "Formulaire non configuré : ajoute ton identifiant Formspree.";
        return;
      }
      status.textContent = "Envoi en cours…";
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error();
        form.reset();
        status.textContent = "Message envoyé, merci !";
      } catch (err) {
        status.textContent = "Échec de l’envoi. Réessaie ou écris-moi par e-mail.";
      }
    });
  }
});
