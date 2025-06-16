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

  // 휠 스크롤로 이동
window.addEventListener("wheel", (e) => {
  e.preventDefault(); // <- 이 줄 추가
  if (isScrolling) return;
  if (e.deltaY > 0) scrollToSection(currentIndex + 1);
  else scrollToSection(currentIndex - 1);
}, { passive: false }); // <- 이 옵션도 꼭 붙여야 preventDefault가 동작함


  // 메뉴 클릭으로 이동 (메뉴 닫지 않음)
  navLinks.forEach((link, i) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToSection(i);
    });
  });

  // 햄버거 버튼으로 사이드 메뉴 열기/닫기
  toggleButton.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
  });

  // 현재 화면에서 가장 중앙에 위치한 섹션을 구함
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

  // 일반 스크롤 시에도 섹션 강조 갱신
  window.addEventListener("scroll", () => {
    const index = getCurrentSectionIndex();
    if (index !== currentIndex) {
      currentIndex = index;
      updateNav(currentIndex);
      activateSection(currentIndex);
    }
  });

  // 초기 섹션 강조
  activateSection(0);
  updateNav(0);
});
