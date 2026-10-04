document.addEventListener("DOMContentLoaded", () => {
  // 1. Load Navbar
  const navbarContainer = document.getElementById("main-navbar");
  if (navbarContainer) {
    fetch("components/navbar.html")
      .then((response) => {
        if (!response.ok) throw new Error("Navbar file not found");
        return response.text();
      })
      .then((data) => {
        navbarContainer.innerHTML = data;
      })
      .catch((error) => console.error("Error loading navbar:", error));
  }

  // 2. Load Footer
  const footerContainer = document.getElementById("main-footer");
  if (footerContainer) {
    fetch("components/footer.html")
      .then((response) => {
        if (!response.ok) throw new Error("Footer file not found");
        return response.text();
      })
      .then((data) => {
        footerContainer.innerHTML = data;
      })
      .catch((error) => console.error("Error loading footer:", error));
  }
});
