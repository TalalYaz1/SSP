// ✅ One single loadComponent function
function loadComponent(id, file) {
  fetch(file)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;

      // Re-run scripts after nav/footer injection
      if (id === "navbar") {
        initNavbar();
      }
    });
}

// ✅ One DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("navbar")) {
    loadComponent("navbar", "../components/template-nav-pages.html");
  }
  if (document.getElementById("footer")) {
    loadComponent("footer", "/components/footer.html");
  }
});

// ✅ Navbar dropdown + mobile menu logic
function initNavbar() {
  // Desktop dropdown
  document.querySelectorAll(".dropdown > a").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault(); // stop page refresh
      const parent = toggle.parentElement;

      // close other open dropdowns
      document.querySelectorAll(".dropdown").forEach((drop) => {
        if (drop !== parent) drop.classList.remove("active");
      });

      // toggle the clicked dropdown
      parent.classList.toggle("active");
    });
  });

  // Close dropdowns if clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document
        .querySelectorAll(".dropdown")
        .forEach((drop) => drop.classList.remove("active"));
    }
  });

  // 🔥 If you also want mobile hamburger menu
  const menuToggle = document.querySelector(".navbar__toggle");
  const menu = document.querySelector(".off-screen");
  const overlay = document.querySelector(".overlay");

  if (menuToggle && menu && overlay) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      menu.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      menu.classList.remove("active");
      overlay.classList.remove("active");
    });
  }
}
