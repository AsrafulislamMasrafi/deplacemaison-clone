const cursor = document.querySelector(".cursor");

const TAIL_LENGTH = 20;

let mouseX = 0;
let mouseY = 0;
let cursorCircle;
let cursorHistory = Array(TAIL_LENGTH).fill({ x: 0, y: 0 });

function onmousemove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function createCircle() {
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let div = document.createElement("div");
    div.classList.add("cursor-circle");
    cursor.append(div);
  }
  cursorCircle = Array.from(document.querySelectorAll(".cursor-circle"));
}

function updateCircle() {
  cursorHistory.shift();
  cursorHistory.push({ x: mouseX, y: mouseY });
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let current = cursorHistory[i];
    let next = cursorHistory[i - 1] || cursorHistory[TAIL_LENGTH - 1];

    let x = next.x - current.x;
    let y = next.y - current.y;

    current.x += x * 0.2;
    current.y += y * 0.2;

    cursorCircle[i].style.transform = `translate(${current.x}px, ${
      current.y
    }px) scale(${i / TAIL_LENGTH})`;
  }
  requestAnimationFrame(updateCircle);
}
if (cursor) {
  document.addEventListener("mousemove", onmousemove);

  createCircle();
  updateCircle();
}

// slider
const sliderDiv = document.querySelector(".sliderDiv");
const slider = document.querySelector(".slider");

let isDragging = false;
let startX;
let x;

function down(e) {
  isDragging = true;
  startX = e.pageX - slider.offsetLeft;
  sliderDiv.style.cursor = "grabbing";
}

function up() {
  isDragging = false;
  sliderDiv.style.cursor = "grab";
  updateSlider();
}

function leave() {
  isDragging = false;
  sliderDiv.style.cursor = "grab";
  updateSlider();
}
function move(e) {
  if (!isDragging) return;
  x = e.pageX;
  // slider.style.left = `${x - startX}px`;
  slider.animate(
    {
      left: `${x - startX}px`,
    },
    {
      duration: 1000,
      fill: "forwards",
    }
  );
}

sliderDiv.addEventListener("mousedown", function (e) {
  down(e);
});

sliderDiv.addEventListener("mouseleave", function (e) {
  leave();
});

sliderDiv.addEventListener("mouseup", function (e) {
  up();
});
sliderDiv.addEventListener("mousemove", function (e) {
  e.preventDefault();
  move(e);
});

slider.addEventListener("touchstart", function (e) {
  down(e.touches[0]);
});
slider.addEventListener("touchmove", function (e) {
  move(e.touches[0]);
});
slider.addEventListener("touchend", function (e) {
  up();
});

function updateSlider() {
  const outer = sliderDiv.getBoundingClientRect();
  const inner = slider.getBoundingClientRect();

  if (slider.offsetLeft > 0) {
    slider.animate(
      {
        left: `${0}px`,
      },
      {
        duration: 500,
        fill: "forwards",
      }
    );
  } else if (inner.right < outer.right) {
    slider.animate(
      {
        left: `${outer.width - inner.width}px`,
      },
      {
        duration: 500,
        fill: "forwards",
      }
    );
  }
}

// Function to switch between animations
const animeText = document.querySelector(".animeText");
function switchAnimation() {
  if (animeText.style.animationName === "moveDown") {
    animeText.style.animationName = "moveUp";
  } else {
    animeText.style.animationName = "moveDown";
  }
}

// Start the animation once
switchAnimation(); // Initial animation (moveDown)

// Set up the interval to repeat the animation every 5 seconds
const intervalId = setInterval(switchAnimation, 4000);

// Optionally, clear the interval when the element is no longer visible (e.g., on page unload)
window.addEventListener("unload", () => clearInterval(intervalId));

// hide menu
const menu = document.querySelector(".menu");

const footer = document.querySelector("footer");
window.addEventListener("scroll", function (e) {
  const windowY = window.scrollY;
  const position = footer.offsetTop - window.innerHeight;

  if (windowY >= position) {
    menu.style.display = "none";
  } else {
    // console.log("show");
    menu.style.display = "grid";
  }
});

// go to top button
document.querySelector(".gotop").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// mobile navbar
const btn = document.querySelectorAll(".btn");
const mobile = document.querySelector(".mobile");

btn[0].addEventListener("click", function (e) {
  btn[0].classList.toggle("btnClose");
  btn[1].classList.toggle("btnClose");

  btn[0].addEventListener(
    "transitionend",
    function () {
      if (mobile.classList.contains("mobileActive")) {
        mobile.classList.remove("mobileActive");
      } else {
        mobile.classList.add("mobileActive");
      }
    },
    { once: true }
  );
});

btn[1].addEventListener("click", function (e) {
  btn[1].classList.toggle("btnClose");
  btn[0].classList.toggle("btnClose");

  // if (mobile.classList.contains("mobileActive")) {
  //   mobile.classList.remove("mobileActive");
  // } else {
  //   mobile.classList.add("mobileActive");
  // }

  btn[1].addEventListener(
    "transitionend",
    function () {
      if (mobile.classList.contains("mobileActive")) {
        mobile.classList.remove("mobileActive");
      } else {
        mobile.classList.add("mobileActive");
      }
    },
    { once: true }
  );
});

const li = document.querySelectorAll("li .li");
li.forEach((el, i) => {
  el.style.animationDelay = `${0.2 * i}s`;
});
