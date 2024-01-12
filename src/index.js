const card = document.querySelector(".card");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal_close");
const modalOverlay = document.querySelector(".modal_overlay");
const modalItems = document.querySelectorAll(".modal_list_item");
const cursor = document.querySelector(".cursor");

const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.inOut" } });

const init = () => {
  gsap.set(modalItems, { x: "110%" });
  gsap.set(modalClose, { autoAlpha: 0, scale: 0 });
  initAnimation();
  addEventListeners();
};

const initAnimation = () => {
  tl.to(modalItems, {
    duration: 0.8,
    x: 0,
    stagger: 0.032,
  })
    .set(modal, { pointerEvents: "auto" })
    .to(
      modalOverlay,
      {
        duration: 1.2,
        backdropFilter: "blur(10px)",
        pointerEvents: "auto",
      },
      0
    )
    .to(card, { duration: 0.8, x: "110%" }, 0)
    .to(
      modalClose,
      {
        duration: 1.2,
        rotate: "90deg",
        scale: 1,
        autoAlpha: 1,
      },
      0.2
    );
};

const addEventListeners = () => {
  card.addEventListener("click", () => tl.play());
  modalClose.addEventListener("click", () => tl.reverse());
  modalOverlay.addEventListener("click", () => tl.reverse());
  card.addEventListener("mouseover", handleCursorHover);
  card.addEventListener("mouseout", handleCursorLeave);
  modalItems.forEach((el) => {
    el.addEventListener("mouseover", handleCursorHover);
    el.addEventListener("mouseout", handleCursorLeave);
  });
};

const handleCursorHover = () => {
  cursor.style.backgroundColor = "#f5f5f5";
};

const handleCursorLeave = () => {
  cursor.style.backgroundColor = "#ff4500";
};

window.addEventListener("mousemove", (e) => {
  const { pageX: x, pageY: y } = e;
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
});

document.addEventListener("DOMContentLoaded", () => {
  handleCursorLeave();
});

init();
