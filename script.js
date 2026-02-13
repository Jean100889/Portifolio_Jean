// Sidebar / Navbar
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navOverlay = document.getElementById("navOverlay");
const navClose = document.getElementById("navClose");

function openNav() {
  navMenu.classList.add("open");
  navOverlay.classList.add("active");
  menuToggle.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("nav-open");
}

function closeNav() {
  navMenu.classList.remove("open");
  navOverlay.classList.remove("active");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.contains("open") ? closeNav() : openNav();
  });
}

if (navClose) {
  navClose.addEventListener("click", closeNav);
}

if (navOverlay) {
  navOverlay.addEventListener("click", closeNav);
}

// Fechar sidebar ao clicar em link
if (navMenu) {
  navMenu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });
}

// Fechar sidebar com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNav();
});

// Active link por scroll (scroll spy)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link[data-section]");

function updateActiveLink() {
  let current = "";
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.section === current);
  });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

// ===== Modal de Desbloqueio Premium =====
const unlockModal    = document.getElementById("unlockModal");
const modalClose     = document.getElementById("modalClose");
const modalTitle     = document.getElementById("modalTitle");
const modalProjectName = document.getElementById("modalProjectName");
const modalPriceDisplay = document.getElementById("modalPriceDisplay");
const pixAmount      = document.getElementById("pixAmount");
const modalWhatsappBtn = document.getElementById("modalWhatsappBtn");
const WA_NUMBER      = "5534996981710";
const PIX_KEY        = "+55 34 99698-1710"; // ← Altere para sua chave PIX real

function openUnlockModal(article) {
  const project = article.dataset.project || "";
  const price   = article.dataset.price   || "";

  if (modalProjectName) modalProjectName.textContent = project;
  if (modalPriceDisplay) modalPriceDisplay.textContent = price;
  if (pixAmount) pixAmount.textContent = price;

  const msg = encodeURIComponent(
    `Olá Jean! Acabei de fazer o pagamento de ${price} para acessar o projeto:\n"${project}"\n\nSegue o comprovante:`
  );
  if (modalWhatsappBtn) modalWhatsappBtn.href = `https://wa.me/${WA_NUMBER}?text=${msg}`;

  // Reset tabs
  switchTab("pix");

  if (unlockModal) {
    unlockModal.classList.add("open");
    document.body.classList.add("nav-open");
  }
}

function closeUnlockModal() {
  if (unlockModal) {
    unlockModal.classList.remove("open");
    document.body.classList.remove("nav-open");
  }
}

function switchTab(tab) {
  document.getElementById("tabPix")?.classList.toggle("active",  tab === "pix");
  document.getElementById("tabCard")?.classList.toggle("active", tab === "card");
  document.getElementById("panelPix")?.classList.toggle("hidden",  tab !== "pix");
  document.getElementById("panelCard")?.classList.toggle("hidden", tab !== "card");
}

function copyPixKey() {
  const btn = document.getElementById("copyPixBtn");
  navigator.clipboard.writeText(PIX_KEY).then(() => {
    if (btn) {
      btn.classList.add("copied");
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg> Copiado!`;
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copiar`;
      }, 2500);
    }
  }).catch(() => {
    if (btn) btn.textContent = "Erro ao copiar";
  });
}

// Tabs de pagamento
document.querySelectorAll(".pay-tab[data-tab]").forEach(tab => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

// Botão copiar PIX
document.getElementById("copyPixBtn")?.addEventListener("click", copyPixKey);

// Botões de desbloqueio
document.querySelectorAll(".unlock-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const article = btn.closest(".premium-item");
    if (article) openUnlockModal(article);
  });
});

// Fechar modal
if (modalClose) modalClose.addEventListener("click", closeUnlockModal);
if (unlockModal) {
  unlockModal.addEventListener("click", (e) => {
    if (e.target === unlockModal) closeUnlockModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && unlockModal?.classList.contains("open")) closeUnlockModal();
});

// Loop continuo na faixa de tecnologias
const tickerTrack = document.querySelector(".ticker-track");
if (tickerTrack) {
  tickerTrack.insertAdjacentHTML("beforeend", tickerTrack.innerHTML);
}

// Animações ao rolar (reveal)
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach((el) => observer.observe(el));
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
