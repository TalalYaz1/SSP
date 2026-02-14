function setHeight(subMenu) {
  let total = 0;
  Array.from(subMenu.children).forEach((child) => {
    total += child.offsetHeight;
    const childSub = child.querySelector(".menu-item__sub");
    if (childSub && childSub.style.maxHeight) {
      total += parseInt(childSub.style.maxHeight);
    }
  });
  subMenu.style.maxHeight = total + "px";
}

function toggle(btn) {
  const subMenu = btn.nextElementSibling;
  if (!subMenu) return;

  if (subMenu.style.maxHeight) {
    subMenu.style.maxHeight = null;
    subMenu
      .querySelectorAll(".menu-item__sub")
      .forEach((child) => (child.style.maxHeight = null));
  } else {
    setHeight(subMenu);

    // Close sibling submenus
    const siblings = Array.from(
      btn.parentElement.parentElement.children,
    ).filter((el) => el !== btn.parentElement);
    siblings.forEach((sib) => {
      const sibSub = sib.querySelector(".menu-item__sub");
      if (sibSub) {
        sibSub.style.maxHeight = null;
        sibSub
          .querySelectorAll(".menu-item__sub")
          .forEach((c) => (c.style.maxHeight = null));
      }
    });

    // Update all parent heights recursively
    let parent = btn.parentElement.parentElement.closest(".menu-item__sub");
    while (parent) {
      setHeight(parent);
      parent = parent.parentElement.closest(".menu-item__sub");
    }
  }
}

// Add event listeners
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    toggle(btn);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Main dropdowns
  const dropdownToggles = document.querySelectorAll(".dropdown > a");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = toggle.parentElement;

      // Close other dropdowns if you only want one open at a time
      document.querySelectorAll(".dropdown.active").forEach((d) => {
        if (d !== parent) d.classList.remove("active");
      });

      parent.classList.toggle("active");
    });
  });

  // Nested submenus
  const submenuToggles = document.querySelectorAll(".has-submenu > a");

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = toggle.parentElement;
      parent.classList.toggle("active");
    });
  });
});

const menuToggle = document.querySelector(".navbar__toggle");
const menu = document.querySelector(".off-screen");
const overlay = document.querySelector(".overlay");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  console.log("hello");
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  menuToggle.classList.remove("active");
  menu.classList.remove("active");
  overlay.classList.remove("active");
});

const cards = document.querySelectorAll(".service-card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

// script.js or your existing JS file
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove active class from all other cards
      cards.forEach((c) => {
        if (c !== card) c.classList.remove("active");
      });

      // Toggle active on the clicked card
      card.classList.toggle("active");
    });
  });

  // Optional: close overlay if you click outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".service-card")) {
      cards.forEach((c) => c.classList.remove("active"));
    }
  });
});
