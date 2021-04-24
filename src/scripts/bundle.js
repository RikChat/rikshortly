// shortly - URL SHORTNER - shrtcode API

/*
 * LOAD AND INITIALIZE
 * ON BUTTON CLICK EVENT HANDLER
 * GETSHORTURL() RETURN PROMISE
 * HANDLE PROMISE
 * STORE IN LS @URLDB
 * DISPLAYDATA()
 * CLEAR INPUTS
 * HANDLE ERRORS
 */

let urlArray = [];
let clipboard = new ClipboardJS(".copy");

const btn = document.getElementById("btn-short");
const inputField = document.getElementById("inputField");
const warning = document.querySelector(".warning");
const container = document.getElementsByClassName("container__result")[0];
const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

const hamburger = document.querySelector(".hamburger");
const hamburger__container = document.querySelector(".hamburger__container");
let hamburger__toggle = true;

//3. RETURN URL
const getShortURL = async (url) => {
  const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
  const data = await response.json();
  return data;
};

// TRUNCATE FUNCTION
const truncate = (str) => {
  const length = 30;
  const ending = "...";
  const truncatedStr = str.substring(0, length - ending.length) + ending;
  const result = str.length > length ? truncatedStr : str;
  return result;
};

//4. DISPLAY DATA
const displayData = () => {
  container.innerHTML = "";
  let result = JSON.parse(localStorage.getItem("URLDB"));
  const trash = require("../assets/images/trash.svg");

  if (result != null) {
    result.forEach((element) => {
      let div = document.createElement("div");
      div.classList.add("container__result-each");
      div.setAttribute("id", element.code);

      let html = `
      <div class="original">
        <p class="original__url">${truncate(element.original_link)}</p>
      </div>
      <div class="short">
        <p class="short__url">${element.full_short_link}</p>
        <button aria-label="Copy" data-clipboard-text=${
          element.full_short_link
        } class="btn-secondary copy">Copy</button>
        <button aria-label="Delete" id="delete"><img  alt="Delete" src=${trash}></button>
      </div>
      `;
      div.innerHTML = html;
      container.appendChild(div);
    });
  }
};

// 1. ONLOAD
window.addEventListener("load", (event) => {
  AOS.init({ duration: 1000, once: true });
  displayData();
});

// 2. BUTTON CLICK & PROMISE HANDLE
btn.addEventListener("click", () => {
  let urlValue = inputField.value;
  warning.style.display = "none";
  inputField.style.border = "none";

  if (urlValue.match(urlRegex)) {
    btn.textContent = "Wait Loading ...";
    btn.disabled = true;
    getShortURL(urlValue)
      .then((data) => {
        data.ok ? urlArray.push(data.result) : alert(data.error);
      })
      .then(() => {
        // STORE in LS
        localStorage.setItem("URLDB", JSON.stringify(urlArray));
      })
      .then(() => {
        btn.disabled = false;
        container.innerHTML = "";
        btn.textContent = "Submit";
        inputField.value = "";
        displayData();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    inputField.value = "";
    warning.style.display = "block";
    inputField.style.border = "2px solid var(--secondary)";
  }
});

// 5. DELETE
document.addEventListener("click", (e) => {
  if (e.target.parentNode.id === "delete") {
    let result = JSON.parse(localStorage.getItem("URLDB"));
    let code = e.target.parentNode.parentNode.parentNode.id;
    console.log(code);
    let urlArr = result.filter((element) => {
      if (element.code !== code) {
        return element;
      }
    });
    localStorage.setItem("URLDB", JSON.stringify(urlArr));
    displayData();
  }
});

// 6. COPY
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy")) {
    e.target.textContent = "copied";
    e.target.classList.add("copied");
    setTimeout(() => {
      e.target.textContent = "Copy";
      e.target.classList.remove("copied");
    }, 800);
  }
});

// RESPONSIVE HAMBURGER
hamburger.addEventListener("click", () => {
  hamburger__container.classList.toggle("active");

  if (hamburger__toggle) {
    hamburger.classList.add("fa-times");
    hamburger.classList.remove("fa-bars");
  } else {
    hamburger.classList.remove("fa-times");
    hamburger.classList.add("fa-bars");
  }
  hamburger__toggle = !hamburger__toggle;
});
