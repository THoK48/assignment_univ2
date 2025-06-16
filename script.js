document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const sideMenu = document.getElementById("side-menu");
  const toggleButton = document.getElementById("menu-toggle");

  let currentIndex = 0;
  let isScrolling = false;

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: "smooth" });
    updateNav(index);
    activateSection(index);
    currentIndex = index;
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  };

  const updateNav = (index) => {
    navLinks.forEach((link, i) => {
      link.classList.toggle("active", i === index);
    });
  };

  const activateSection = (index) => {
    document.querySelectorAll(".fade-section").forEach((sec, i) => {
      sec.classList.toggle("active", i === index);
    });
  };

window.addEventListener("wheel", (e) => {
  if (isScrolling) return;
  if (e.deltaY > 0) scrollToSection(currentIndex + 1);
  else scrollToSection(currentIndex - 1);
}, { passive: false }); 


  navLinks.forEach((link, i) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToSection(i);
    });
  });

  toggleButton.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
  });

  const getCurrentSectionIndex = () => {
    let index = 0;
    sections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        index = i;
      }
    });
    return index;
  };

  window.addEventListener("scroll", () => {
    const index = getCurrentSectionIndex();
    if (index !== currentIndex) {
      currentIndex = index;
      updateNav(currentIndex);
      activateSection(currentIndex);
    }
  });

  activateSection(0);
  updateNav(0);
    document.querySelectorAll(".card-stack").forEach(stack => {
    const cards = stack.querySelectorAll(".card");
    cards.forEach((card, i) => {
      card.style.transform = `translateY(${i * 8}px)`;
      card.style.zIndex = cards.length - i;
      card.style.filter = `brightness(${1 - i * 0.1}) blur(${i * 0.5}px)`;
    });
  });
  
});
