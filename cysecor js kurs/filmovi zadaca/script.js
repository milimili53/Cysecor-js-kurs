let allTotals = 0;

function watchMovie(el) {
  const mainEl = el.closest(".movie");

  mainEl.classList.toggle("watched");
  if (mainEl.classList.contains("watched")) {
    el.setAttribute("disabled", "true");
    el.innerText = "Watched";
    const againBtn = mainEl.querySelector(".again");
    againBtn.classList.remove("none");

    const price = parseInt(mainEl.querySelector(".price").innerText);

    allTotals += price;

    const movies = mainEl.closest(".movies");
    const totals = movies.nextElementSibling;
    totals.innerHTML = `<h2 >Total money spent on movies: $${allTotals}</h2>`;
  }
}

function remove(el) {
  const mainEl = el.closest(".movie");
  mainEl.classList.remove("watched");
  el.classList.add("none");
  const watch = mainEl.querySelector(".watch-btn");
  watch.removeAttribute("disabled");
  watch.innerText = "Watch";

  const price = parseInt(mainEl.querySelector(".price").innerText);

  allTotals -= price;

  const movies = mainEl.closest(".movies");
  const totals = movies.nextElementSibling;
  totals.innerHTML = `<h2>Total money spent on movies: $${allTotals}</h2>`;
}
