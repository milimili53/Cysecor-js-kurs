const addBtn = document.querySelector(".addBtn");
const myNodelist = document.getElementsByTagName("LI");

addBtn.addEventListener("click", () => {
  let input = document.querySelector("#myInput").value;
  const list = document.createElement("li");
  const newEl = document.createTextNode(input);
  list.appendChild(newEl);
  if (input === "") {
    alert("You must to write something");
  } else {
    document.getElementById("myUL").appendChild(list);
  }
  document.querySelector("#myInput").value = "";

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);

  list.appendChild(span);

  closing();

  list.onclick = function () {
    this.classList.toggle("checked");
  };
});

for (let i = 0; i < myNodelist.length; i++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);

  myNodelist[i].appendChild(span);

  myNodelist[i].onclick = function () {
    this.classList.toggle("checked");
  };
}

const close = document.getElementsByClassName("close");

const closing = function () {
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      const li = this.parentElement;
      li.style.display = "none";
    };
  }
};

const unorderedList = document.querySelector("ul");
