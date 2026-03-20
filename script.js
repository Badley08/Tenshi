/* =============================================
   SCRIPT.JS — Mercedes Tenshi Birthday Site
   ============================================= */

"use strict";

// =============================================
// ANNEE FOOTER
// =============================================
document.getElementById("year").textContent = new Date().getFullYear();

// =============================================
// PARTICULES DE FOND
// =============================================
function createParticles() {
  const container = document.getElementById("particles");
  const count = 60;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const left  = Math.random() * 100;
    const dur   = 6 + Math.random() * 8;
    const delay = Math.random() * 8;
    const drift = (Math.random() - 0.5) * 80;

    p.style.setProperty("--dur",   `${dur}s`);
    p.style.setProperty("--delay", `${delay}s`);
    p.style.setProperty("--drift", `${drift}px`);
    p.style.left = `${left}%`;

    const size = 2 + Math.random() * 4;
    p.style.width  = `${size}px`;
    p.style.height = `${size}px`;

    // Couleurs variees
    const colors = [
      "rgba(201,168,76,0.7)",
      "rgba(176,141,220,0.5)",
      "rgba(232,160,160,0.5)",
      "rgba(240,208,128,0.6)",
    ];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(p);
  }
}

createParticles();

// =============================================
// CONFETTI CANVAS
// =============================================
const canvas = document.getElementById("confetti-canvas");
const ctx    = canvas.getContext("2d");
let confettiPieces = [];
let confettiActive = false;

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});

class ConfettiPiece {
  constructor() {
    this.reset();
  }

  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = -20;
    this.w     = 6 + Math.random() * 8;
    this.h     = 3 + Math.random() * 4;
    this.color = this.randomColor();
    this.angle = Math.random() * Math.PI * 2;
    this.vx    = (Math.random() - 0.5) * 3;
    this.vy    = 2 + Math.random() * 4;
    this.va    = (Math.random() - 0.5) * 0.15;
    this.life  = 1;
  }

  randomColor() {
    const palette = [
      "#c9a84c", "#f0d080", "#e8a0a0", "#b08ddc",
      "#c0607a", "#ffffff", "#7b5ea7", "#fceabb"
    ];
    return palette[Math.floor(Math.random() * palette.length)];
  }

  update() {
    this.x     += this.vx;
    this.y     += this.vy;
    this.angle += this.va;
    this.life  -= 0.003;

    if (this.y > canvas.height + 20 || this.life <= 0) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  }
}

function launchConfetti(count = 120) {
  confettiActive = true;
  confettiPieces = [];

  for (let i = 0; i < count; i++) {
    const piece = new ConfettiPiece();
    piece.y     = Math.random() * -200; // decale vers le haut
    confettiPieces.push(piece);
  }

  animateConfetti();

  setTimeout(() => {
    confettiActive = false;
    confettiPieces = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 5000);
}

function animateConfetti() {
  if (!confettiActive) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateConfetti);
}

// Confetti auto au chargement
window.addEventListener("load", () => {
  setTimeout(() => launchConfetti(100), 1200);
});

// =============================================
// SCROLL REVEAL
// =============================================
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, i * 120);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// =============================================
// SCROLL TO MESSAGE
// =============================================
function scrollToMessage() {
  document.getElementById("message").scrollIntoView({ behavior: "smooth" });
}

// =============================================
// BOUGIE INTERACTIVE
// =============================================
const candleWrapper = document.getElementById("candleWrapper");
const flameGroup    = document.getElementById("flameGroup");
const wishMessage   = document.getElementById("wishMessage");

candleWrapper.addEventListener("click", blowCandle);

function blowCandle() {
  if (candleWrapper.classList.contains("blown")) return;

  // Animation d'extinction
  candleWrapper.classList.add("blown");

  // Message + confetti
  setTimeout(() => {
    wishMessage.classList.add("show");
    launchConfetti(80);
  }, 400);
}

// =============================================
// CAROUSEL MESSAGES ETOILES
// =============================================
const starMessages = [
  { icon: "fa-solid fa-star",               text: "Tu merites tout le bonheur du monde, chaque jour de l'annee." },
  { icon: "fa-solid fa-moon",               text: "Comme la lune qui eclaire la nuit, tu illumines nos vies." },
  { icon: "fa-solid fa-heart",              text: "Ton sourire est le plus beau cadeau que la vie nous offre." },
  { icon: "fa-solid fa-gem",                text: "Tu es un joyau rare dans ce monde, Mercedes." },
  { icon: "fa-solid fa-feather",            text: "Que tes reves prennent leur envol comme des plumes dans le vent." },
  { icon: "fa-solid fa-sun",                text: "Tu portes en toi la chaleur d'un soleil d'ete." },
  { icon: "fa-solid fa-music",              text: "Que ta vie soit une melodie douce et parfaite." },
  { icon: "fa-solid fa-wand-magic-sparkles", text: "Un peu de magie pour toi en ce jour special." },
  { icon: "fa-solid fa-dove",               text: "La paix, la joie et l'amour soient tes compagnons eternels." },
  { icon: "fa-solid fa-infinity",           text: "Un bonheur sans fin pour une personne hors du commun." },
  { icon: "fa-solid fa-leaf",               text: "Que chaque saison de ta vie soit aussi belle que le printemps." },
  { icon: "fa-solid fa-rainbow",            text: "Apres chaque epreuve vient un arc-en-ciel magnifique — c'est toi." },
];

function buildCarousel() {
  const inner  = document.getElementById("starsInner");
  // Double pour l'effet infini
  const all = [...starMessages, ...starMessages];

  all.forEach(msg => {
    const card = document.createElement("div");
    card.className = "star-card";
    card.innerHTML = `
      <div class="star-card-icon"><i class="${msg.icon}"></i></div>
      <p>${msg.text}</p>
    `;
    inner.appendChild(card);
  });
}

buildCarousel();

// =============================================
// HOVER PARALLAX LEGER SUR LE HERO
// =============================================
const heroSection = document.getElementById("hero");
const heroContent = heroSection.querySelector(".hero-content");

heroSection.addEventListener("mousemove", (e) => {
  const rect = heroSection.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;
  const dx   = (e.clientX - cx) / rect.width;
  const dy   = (e.clientY - cy) / rect.height;

  heroContent.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
});

heroSection.addEventListener("mouseleave", () => {
  heroContent.style.transform = "translate(0, 0)";
  heroContent.style.transition = "transform 0.8s ease";
});

heroSection.addEventListener("mouseenter", () => {
  heroContent.style.transition = "transform 0.1s ease";
});

// =============================================
// ANIMATION TITRE AU CHARGEMENT (STAGGER)
// =============================================
window.addEventListener("load", () => {
  // Titre lettre par lettre — effect subtil
  const nameLines = document.querySelectorAll(".name-line");
  nameLines.forEach((line, i) => {
    line.style.animationDelay = `${0.4 + i * 0.25}s`;
  });
});

// =============================================
// RIPPLE AU CLICK SUR LES WISH CARDS
// =============================================
const wishCards = document.querySelectorAll(".wish-card");

wishCards.forEach(card => {
  card.addEventListener("click", function(e) {
    const rect  = card.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size  = Math.max(rect.width, rect.height);

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(201,168,76,0.15);
      transform: scale(0);
      animation: rippleAnim 0.6s ease-out forwards;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      pointer-events: none;
    `;

    // Inject keyframes if not present
    if (!document.getElementById("ripple-style")) {
      const style = document.createElement("style");
      style.id = "ripple-style";
      style.textContent = `
        @keyframes rippleAnim {
          to { transform: scale(2.5); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    card.style.position = "relative";
    card.style.overflow = "hidden";
    card.appendChild(ripple);

    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

// =============================================
// KEYBOARD NAVIGATION
// =============================================
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === " ") {
    e.preventDefault();
    scrollToMessage();
  }
});
