// Responsive meni

let menuBtn = document.querySelector(".header button");

const mobileMenu = () => {
  let menu = document.querySelector(".header ul");
  let btn = document.querySelector(".header button");

  if (btn.innerText === "MENU") {
    menu.style.display = "block";
    btn.innerText = "CLOSE";
  } else {
    menu.style.display = "none";
    btn.innerText = "MENU";
  }
};

menuBtn.addEventListener("click", mobileMenu);

// Galerija
let rightBtn = document.querySelector("#right-btn");
let leftBtn = document.querySelector("#left-btn");
let pictures = document.querySelectorAll(".slider-images img");

let imgNum = 0;

// Pomjeramo slike u desno
const moveRight = () => {
  displayNone();
  imgNum++;

  if (imgNum === pictures.length) {
    imgNum = 0;
  }

  pictures[imgNum].style.display = "block";
};

//Pomjeramo slike u lijevo
const moveLeft = () => {
  displayNone();
  imgNum--;

  if (imgNum === -1) {
    imgNum = pictures.length - 1;
  }
  pictures[imgNum].style.display = "block";
};

// Eventovi
rightBtn.addEventListener("click", moveRight);
leftBtn.addEventListener("click", moveLeft);

const displayNone = () => {
  pictures.forEach((img) => {
    img.style.display = "none";
  });
};

// Portfolio
const portfolioSort = (button) => {
  let category = button.getAttribute("data-category");
  let portfolioItems = document.querySelectorAll(".portfolio-single-item");

  portfolioItems.forEach((item) => {
    item.style.display = "none";
  });

  if (category === "sve") {
    portfolioItems.forEach((item) => {
      item.style.display = "block";
    });
  }

  portfolioItems.forEach((item) => {
    if (item.getAttribute("data-category").includes(category)) {
      item.style.display = "block";
    }
  });
};

let portfolioBtns = document.querySelectorAll(".portfolio-categories button");
console.log(portfolioBtns);

portfolioBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    portfolioSort(e.target);
  });
});

// e.addEventListener("click", (e) => {
//   console.log(e);
// });

// Otvaramo modal

const openModal = () => {
  let modalWindow = document.querySelector(".popup-modal");
  let overlay = document.querySelector(".overlay");

  modalWindow.style.display = "block";
  overlay.style.display = "block";
};

// Zatvaramo modal

const closeModal = () => {
  let modalWindow = document.querySelector(".popup-modal");
  let overlay = document.querySelector(".overlay");

  modalWindow.style.display = "none";
  overlay.style.display = "none";
};

let modal1 = document.querySelector(".modal-section");
let close1 = document.querySelector("#closeModal");

modal1.addEventListener("click", openModal);
close1.addEventListener("click", closeModal);

const openModal2 = () => {
  let modalWindow = document.querySelector(".popup-modal2");
  let overlay = document.querySelector(".overlay2");

  modalWindow.style.display = "block";
  overlay.style.display = "block";
};

// Zatvaramo modal

const closeModal2 = () => {
  let modalWindow = document.querySelector(".popup-modal2");
  let overlay = document.querySelector(".overlay2");

  modalWindow.style.display = "none";
  overlay.style.display = "none";
};

let modal2 = document.querySelector(".modal-section2");
let close2 = document.querySelector("#closeModal2");

modal2.addEventListener("click", openModal2);
close2.addEventListener("click", closeModal2);
