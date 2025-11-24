// Menu mobile
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

// Loop continuo na faixa de tecnologias
const tickerTrack = document.querySelector(".ticker-track");
if (tickerTrack) {
  tickerTrack.insertAdjacentHTML("beforeend", tickerTrack.innerHTML);
}

// Cards de serviços sempre abertos
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  const header = card.querySelector(".card-header");
  const body = card.querySelector(".card-body");
  if (!header || !body) return;

  card.classList.add("open");
  header.setAttribute("aria-expanded", "true");
  body.style.maxHeight = "none";
});

// Ano automatico no footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
