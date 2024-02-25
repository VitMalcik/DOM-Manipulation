"use strict";

const nav = document.querySelector(".nav");
const headerPlaceholder = document.querySelector(".header-placeholder");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const btnCloseModal = document.querySelector(".close-modal");
const btnsShowModal = document.querySelectorAll(".show-modal");

const tabBtns = document.querySelectorAll(".btn-tab");
const tabBtnsContainer = document.querySelector(".tabbed-window-btns");
const tabsContent = document.querySelectorAll(".tabbed-window");

const RevealAllContent = document.querySelectorAll(".reveal-content");

const imgTarget = document.querySelectorAll("img[data-src]");

//
// FIXED HEADER BAR
//

const initialCoords = tabBtnsContainer.getBoundingClientRect();

window.addEventListener("scroll", function (e) {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add("fixed");
    headerPlaceholder.classList.remove("hidden");
  } else {
    nav.classList.remove("fixed");
    headerPlaceholder.classList.add("hidden");
  }
});

//
// MODAL WINDOW
//

const closeModal = function () {
  modal.classList.add("hidden");
};

const openModal = function (e) {
  e.stopPropagation();
  modal.classList.remove("hidden");
};

for (let i = 0; i < btnsShowModal.length; i++)
  btnsShowModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("click", function (e) {
  if (!modal.contains(e.target)) closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

//
// TABBED WINDOW
//

// handle clicks
tabBtnsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-tab");
  // console.dir(clicked);
  if (!clicked) return;
  tabBtns.forEach((t) => t.classList.remove("btn-tab-active"));
  clicked.classList.add("btn-tab-active");

  // display content
  tabsContent.forEach((content) =>
    content.classList.remove("tabbed-window-active")
  );
  document
    .querySelector(`.tabbed-window-${clicked.dataset.tab}`)
    .classList.add("tabbed-window-active");
});

//
// LAZY LOAD
//

const lazyImgCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove("lazy-img-blur");
  observer.unobserve(entry.target);
};

const lazyImgObserver = new IntersectionObserver(lazyImgCallback, {
  root: null,
  threshold: 0.2,
});

imgTarget.forEach((img) => lazyImgObserver.observe(img));

//
// REVEAL ON SCROLL
//

const revealContent = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("reveal-content-hidden");
  observer.unobserve(entry.target);
};

const contentObserver = new IntersectionObserver(revealContent, {
  root: null,
  threshold: 0.15,
});

RevealAllContent.forEach(function (content) {
  contentObserver.observe(content);
  content.classList.add("reveal-content-hidden");
});

//
// SLIDER
//

const slides = document.querySelectorAll(".slide");
const btnSliderLeft = document.querySelector(".btn-prev-img");
const btnSliderRight = document.querySelector(".btn-next-img");

let currentSlide = 0;
const maxSlide = slides.length;

slides.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - currentSlide) * 100}%)`)
  );
};

goToSlide(0);

// next slide

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
};

btnSliderRight.addEventListener("click", nextSlide);

// prev slide

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
};

btnSliderLeft.addEventListener("click", prevSlide);

//
// SMOOTH SCROLL
//

const smoothScrollContainer = document.querySelector(
  ".smooth-scroll-container"
);
const btnSmoothScroll = document.querySelector(".btn-smooth-scroll");
const header = document.querySelector(".header");

// Button hidden/visible
window.addEventListener("scroll", () => {
  if (window.scrollY > 1800) {
    btnSmoothScroll.classList.remove("btn-smooth-scroll-hidden");
  } else {
    btnSmoothScroll.classList.add("btn-smooth-scroll-hidden");
  }
});
// Button handle click

btnSmoothScroll.addEventListener("click", function (e) {
  const headerCoordinates = header.getBoundingClientRect();

  window.scrollTo({
    left: headerCoordinates.left,
    top: headerCoordinates.top,
    behavior: "smooth",
  });

  // header.scrollIntoView({ behavior: "smooth" });
});
