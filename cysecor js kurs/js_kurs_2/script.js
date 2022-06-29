function pokreniMe(dugme) {
  let nazivDugmeta = dugme.innerText;

  let message = document.querySelector("#kliknutoDugme");
  message.innerText = nazivDugmeta;
}
