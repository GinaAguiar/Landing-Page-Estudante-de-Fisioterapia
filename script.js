document.body.classList.add("js-enabled");

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const revealElements = document.querySelectorAll(".reveal, .blur-reveal");
const topBtn = document.querySelector(".top-btn");

const syncMenuAccessibility = () => {
  const menuIsMobile = window.innerWidth <= 720;
  const menuIsOpen = navLinks.classList.contains("active");

  if (menuIsMobile) {
    navLinks.setAttribute("aria-hidden", String(!menuIsOpen));
  } else {
    navLinks.removeAttribute("aria-hidden");
  }
};

syncMenuAccessibility();

menuBtn.addEventListener("click", () => {
  const menuIsOpen = navLinks.classList.toggle("active");

  menuBtn.classList.toggle("active", menuIsOpen);
  menuBtn.setAttribute("aria-label", menuIsOpen ? "Fechar menu" : "Abrir menu");
  menuBtn.setAttribute("aria-expanded", String(menuIsOpen));
  syncMenuAccessibility();
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.classList.remove("active");
    menuBtn.setAttribute("aria-label", "Abrir menu");
    menuBtn.setAttribute("aria-expanded", "false");
    syncMenuAccessibility();
  });
});

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect();
    const elementTop = elementPosition.top;
    const elementBottom = elementPosition.bottom;
    const windowHeight = window.innerHeight;
    const elementIsVisible = elementTop < windowHeight - 100 && elementBottom > 100;

    if (elementIsVisible) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });

  if (window.scrollY > 500) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
};

let isScrolling = false;

window.addEventListener("scroll", () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      isScrolling = false;
    });

    isScrolling = true;
  }
});

window.addEventListener("load", revealOnScroll);
window.addEventListener("resize", syncMenuAccessibility);

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
