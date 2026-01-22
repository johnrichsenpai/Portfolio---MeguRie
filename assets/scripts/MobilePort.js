function detectDeviceType(breakpoint = 768) {
  return {
    isMobile: window.innerWidth < breakpoint,
    type: window.innerWidth < breakpoint ? "mobile" : "desktop"
  };
}

/* =====================
   NAV ELEMENTS
===================== */

const navMain = document.getElementById("navMain");
const navMore = document.getElementById("navMore");
const moreMenu = document.getElementById("moreMenu");
const moreBtn = navMore.querySelector(".more-btn");
const allItems = Array.from(navMain.children);

/* =====================
   INITIAL STATE
===================== */

document.body.classList.add(detectDeviceType().type);
moreMenu.style.display = "none"; // hidden on load

/* =====================
   UPDATE NAV ITEMS
===================== */

function updateNav() {
  const device = detectDeviceType();

  document.body.classList.remove("mobile", "desktop");
  document.body.classList.add(device.type);

  // Reset items
  moreMenu.innerHTML = "";
  allItems.forEach(li => navMain.appendChild(li));

  // Mobile: keep only first 2 items
  if (device.isMobile) {
    allItems.forEach((li, index) => {
      if (index >= 3) {
        moreMenu.appendChild(li);
      }
    });
    return;
  }

  // Desktop: dynamic overflow
  const navWidth = navMain.parentElement.offsetWidth;
  const moreWidth = navMore.offsetWidth;
  const maxWidth = navWidth - moreWidth - 20;

  let usedWidth = 0;
  let visibleCount = 0;

  allItems.forEach(li => {
    usedWidth += li.offsetWidth;
    if (usedWidth > maxWidth && visibleCount >= 3) {
      moreMenu.appendChild(li);
    } else {
      visibleCount++;
    }
  });
  
}

/* =====================
   TOGGLE DROPDOWN
===================== */

moreBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  moreMenu.style.display =
    moreMenu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", () => {
  moreMenu.style.display = "none";
});

/* =====================
   EVENTS
===================== */

window.addEventListener("resize", () => {
  moreMenu.style.display = "none";
  updateNav();
});

window.addEventListener("orientationchange", () => {
  moreMenu.style.display = "none";
  updateNav();
});

document.addEventListener("DOMContentLoaded", updateNav);
