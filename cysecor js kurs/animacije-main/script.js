let textTag = document.querySelector(".section1 h1");
let text = textTag.textContent;

let splittedText = text.split("");

textTag.innerHTML = "";

for (let i = 0; i < splittedText.length; i++) {
  if (splittedText[i] === " ") {
    splittedText[i] = "&nbsp";
  }

  textTag.innerHTML += `<span>${splittedText[i]}</span>`;
}

let spans = textTag.querySelectorAll("span");
let k = 0;
let interval = setInterval(() => {
  let singleSpan = spans[k];

  singleSpan.className = "fadeMove";
  k++;

  if (k === spans.length) {
    clearInterval(interval);
  }
}, 70);

let border = document.querySelector(".border-line");
let animationWidth = 0;
const bord = function () {
  let plus = document.querySelector(".plus");
  let minus = document.querySelector(".minus");

  plus.addEventListener("click", function () {
    animationWidth += 10;
    console.log(animationWidth);
    if (animationWidth >= 100) {
      animationWidth = 99;
    }
    border.style.width = animationWidth + "%";
  });

  minus.addEventListener("click", function () {
    console.log(animationWidth, border);
    if (animationWidth <= 0) {
      animationWidth = 0;
    }
    animationWidth -= 10;

    border.style.width = animationWidth + "%";
  });

  // if (animationWidth >= 100) {
  //  animationWidth = 100;
  // }

  //  if (animationWidth < 0) {
  //  animationWidth = 0;
  // }

  // border.style.width = animationWidth + "%";
};
bord();

window.onscroll = () => {
  /*if (this.oldScroll > this.scrollY) {
    animationWidth -= 1.5;
  } else {
    animationWidth += 1.5;
  }
*/

  this.oldScroll = this.scrollY;

  imageAnimation();
};

const imageAnimation = () => {
  let sectionForAnimation = document.querySelector(".section2 .images");
  let sectionPosition = sectionForAnimation.getBoundingClientRect().top;
  let btnLeft = document.querySelector(".left");
  let btnRight = document.querySelector(".right");

  let screenPosition = window.innerHeight / 1.3;

  let leftImage = document.querySelector(".slideFromLeft");
  let rightImage = document.querySelector(".slideFromRight");

  if (sectionPosition < screenPosition) {
    leftImage.classList.add("animated");
    rightImage.classList.add("animated");
  }

  btnLeft.addEventListener("click", () =>
    leftImage.classList.toggle("animated")
  );

  btnRight.addEventListener("click", () =>
    rightImage.classList.toggle("animated")
  );
};
