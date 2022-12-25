let urlArray = [];
let clipboard = new ClipboardJS(".copy");

const btn = document.getElementById("btn-short");
const trash = document.getElementById("delete");
const inputField = document.getElementById("inputField");
const warning = document.querySelector(".warning");
const container = document.getElementsByClassName("container__result")[0];
const hamburger = document.querySelector(".hamburger");
const hamburger__container = document.querySelector(".hamburger__container");
let hamburger__toggle = true;
const urlRegex =
  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

const getShortURL = async (url) => {
  const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
  const data = await response.json();
  return data;
};

const truncate = (str) => {
  const length = 30;
  const ending = "...";
  const truncatedStr = str.substring(0, length - ending.length) + ending;
  const result = str.length > length ? truncatedStr : str;
  return result;
};

const displayData = (result) => {
  let div = document.createElement("div");
  console.log(result);
  div.classList.add("container__result-each");
  let html = `
      <div class="original">
        <div id="qrcode"></div>
        <p class="original__url">${truncate(result.original_link)}</p>
      </div>
      <div class="short">
        <p class="short__url">${result.full_short_link}</p>
        <button aria-label="Copy" data-clipboard-text=${
          result.full_short_link
        } class="btn-secondary copy">Copy URL</button>
        <a id="downloadQR">
            <button aria-label="Copy" class="btn-secondary downloadQR" id='saveQR'onClick=DownloadQR()>Save QR</button>
        </a>
        <button aria-label="Delete" id="delete" >Delete</button>
      </div>
      `;

  div.innerHTML = html;
  container.appendChild(div);
  let qrcode = new QRCode("qrcode", {
    text: result.full_short_link,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
  });
};

const DownloadQR = () => {
  const downloadQR = document.getElementById("downloadQR");
  const saveQR = document.getElementById("saveQR");
  const qr = document.getElementById("qrcode");
  const saveUrl = qr.querySelector("img").src;
  downloadQR.href = saveUrl;
  downloadQR.download = "qrcode";
  saveQR.disabled = true;
  setTimeout(() => {
    saveQR.disabled = false;
  }, 3000);
};

window.addEventListener("load", (event) => {
  AOS.init({ duration: 1, once: true });
});

btn.addEventListener("click", () => {
  let urlValue = inputField.value;
  warning.style.display = "none";

  if (urlValue.match(urlRegex)) {
    btn.textContent = "Loading ...";
    btn.disabled = true;
    getShortURL(urlValue)
      .then((data) => {
        btn.disabled = false;
        container.innerHTML = "";
        btn.textContent = "Submit";
        inputField.value = "";
        displayData(data.result);
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

document.addEventListener("click", (e) => {
  if (e.target.id === "delete") {
    container.innerHTML = "";
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy")) {
    e.target.textContent = "copied";
    e.target.classList.add("copied");
    setTimeout(() => {
      e.target.textContent = "Copy URL";
      e.target.classList.remove("copied");
    }, 800);
  }
});

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
