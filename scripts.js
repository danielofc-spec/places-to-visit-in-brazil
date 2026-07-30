const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const items = document.querySelectorAll(".item");
const dots = document.querySelectorAll(".dot");
const numberIndicator = document.querySelector(".numbers");
const list = document.querySelector(".list");

// Elementos do menu de navegação móvel
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("nav-active");
  });

  // Fechar o menu ao clicar em um link
  document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("nav-active");
    });
  });
}

let active = 0;
const total = items.length;
let timer;

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    update(1);
  }, 5000);
}

function update(direction) {
  const currentActiveItem = document.querySelector(".item.active");
  const currentActiveDot = document.querySelector(".dot.active");

  if (currentActiveItem) currentActiveItem.classList.remove("active");
  if (currentActiveDot) currentActiveDot.classList.remove("active");

  if (direction > 0) {
    active = active + 1;
    if (active >= total) {
      active = 0;
    }
  } else if (direction < 0) {
    active = active - 1;
    if (active < 0) {
      active = total - 1;
    }
  }

  if (items[active]) items[active].classList.add("active");
  if (dots[active]) dots[active].classList.add("active");

  if (numberIndicator) {
    numberIndicator.textContent = String(active + 1).padStart(2, "0");
  }
}

resetTimer();

if (prevButton) {
  prevButton.addEventListener("click", () => {
    update(-1);
    resetTimer();
  });
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    update(1);
    resetTimer();
  });
}

// Permite clicar diretamente nos slides
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    document.querySelector(".item.active")?.classList.remove("active");
    document.querySelector(".dot.active")?.classList.remove("active");

    active = index;
    items[active]?.classList.add("active");
    dots[active]?.classList.add("active");

    if (numberIndicator) {
      numberIndicator.textContent = String(active + 1).padStart(2, "0");
    }
    resetTimer();
  });
});
