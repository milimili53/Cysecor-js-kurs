let logo = document.querySelector(".lnXdpd");
let logo2 = document.querySelector(".logo a img");

if (logo) {
  logo.src = chrome.runtime.getURL("images/cysecor_logo.png");
  logo.srcset = chrome.runtime.getURL("images/cysecor_logo.png");
}

if (logo2) {
  logo2.src = chrome.runtime.getURL("icons/icon48.png");
  logo2.style.height = "40px";
  logo2.style.width = "60px";
  // logo2.srcset = chrome.runtime.getURL("images/cysecor_logo.png");
}
