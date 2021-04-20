let urlArray = [];

const btn = document.getElementById("btn");
const inputField = document.getElementById("inputField");
const container = document.getElementsByClassName("container")[0];

// 1. ONLOAD
window.addEventListener("load", (event) => {
  console.log("Page Loaded");
  displayData();
});

//3. FUNCTION TO CALL URL
const getShortURL = (url) => {
  fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.ok) {
        urlArray.push(data.result);
      } else {
        alert(error);
      }
    })
    .then(() => {
      localStorage.setItem("URLDB", JSON.stringify(urlArray));
    })
    .then(() => {
      container.innerHTML = "";
      displayData();
    })
    .catch((error) => {
      console.log(error);
    });
};

// 2. BUTTON CLICK EVENT HANDLER
btn.addEventListener("click", () => {
  let urlValue = inputField.value;
  getShortURL(urlValue);
  inputField.value = "";
});

//4. DISPLAY DATA
const displayData = () => {
  let result = JSON.parse(localStorage.getItem("URLDB"));

  if (result != null) {
    result.forEach((element) => {
      let link = document.createElement("p");
      link.classList.add("link");
      link.textContent = element.full_short_link;
      container.appendChild(link);
    });
  }
};
