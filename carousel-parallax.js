const carousel = document.querySelector(".photo-carousel");
const track = document.querySelector(".carousel-track");

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

// Parallax no mouse
carousel.addEventListener("mousemove", (e) => {
  if (!track || window.innerWidth <= 768) return; // só em telas grandes
  const { left, width } = track.getBoundingClientRect();
  const mouseX = e.clientX - left;
  const center = width / 2;
  const offset = (mouseX - center) / center;
  track.style.transform = `translateX(${offset * 20}px)`;
});

carousel.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) {
    track.style.transform = "translateX(0)";
  }
});

// TOQUE (mobile): arrastar carrossel
carousel.addEventListener(
  "touchstart",
  (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  },
  { passive: true }
);

carousel.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5; // velocidade
    track.scrollLeft = scrollLeft - walk;
  },
  { passive: true }
);

carousel.addEventListener("touchend", () => {
  isDragging = false;
});
