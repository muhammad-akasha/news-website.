// from=2024-07-05   tofrom=2024-07-05    sortBy=popularity    q=trump  v2/top-headlines?  v2/everything  category=business  ( sources=bbc-newswork alone..)

let form = document.getElementById("searchform");
let input = document.getElementById("category");

let inpVal;
input.addEventListener("change", (e) => {
  inpVal = e.target.value;
  console.log(inpVal);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function showSearchBar() {
  let searchDiv = document.querySelector(".search-bar");
  if (searchDiv.getAttribute("class").includes("none")) {
    setTimeout(() => {
      searchDiv.classList.remove("none");
    }, 200);
  } else {
    searchDiv.classList.add("none");
  }
}

const newsContainer = document.querySelector(".news-container");
// console.log(newsContainer);
const apiKey = "02c65b7989fc4e03953d4436b04e60b2";
const date = new Date();
let currDate = date.getDate();
date.setDate(currDate - 5);
let adjustedDate = date.getDate();
let year = date.getFullYear();
let month = date.getMonth() + 1;

window.addEventListener("load", displayNewsOnload);
async function displayNewsOnload() {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=top&sortBy=popularity&from=${year}-${month}-${adjustedDate}&apiKey=${apiKey}`
      );
    const data = await res.json();
    console.log(data);
    newsContainer.innerHTML = "";
    for (let news of data.articles) {
      let publishedDate = news.publishedAt.slice(0, 10);
      let title = news.title;
      let description = news.description;
      let img = news.urlToImage;
      if (title && description && img) {
        let newDiv = `
      <div>
       <h2 style="text-align:center"> Published At ${publishedDate} <h2>
       <img src="${img === null ? "image not available" : img}" alt"${title}">
       <h2> <strong> Title  : </strong> <br /> ${title}  </h2>
       <h2><strong> Details : </strong> <br /> ${
         description === null ? "description not availble" : description
       } </h2>
      </div>
      `;
        newsContainer.innerHTML += newDiv;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function searchNewsByInput() {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${inpVal}&from=${year}-${month}-${adjustedDate}&apiKey=${apiKey}`
    );
    const data = await res.json();
    console.log(data);
    newsContainer.innerHTML = "";
    for (let news of data.articles) {
      let publishedDate = news.publishedAt.slice(0, 10);
      let title = news.title;
      let description = news.description;
      let img = news.urlToImage;
      let author = news.author;
      if (title && description && img) {
        let newDiv = `
      <div>
       <h2 style="text-align:center"> Published At ${publishedDate} <h2>
       <img src="${img === null ? "image not available" : img}" alt"${title}">
       <h2> <strong> Title  : </strong> <br /> ${title}  </h2>
       <h2><strong> Details : </strong> <br /> ${
         description === null ? "description not availble" : description
       } </h2>
      </div>
      `;
        newsContainer.innerHTML += newDiv;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function searchByCategory(ele) {
  let input = ele.innerText.toLowerCase().replaceAll(" ", "");
  console.log(input);
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&from=${year}-${month}-${adjustedDate}&apiKey=${apiKey}`
    );
    const data = await res.json();
    console.log(data);
    newsContainer.innerHTML = "";
    for (let news of data.articles) {
      let publishedDate = news.publishedAt.slice(0, 10);

      let title = news.title;
      let description = news.description;
      let img = news.urlToImage;
      newsContainer.innerHTML = `<h1 style=text-align:center ; text-transform:capitalize> ${ele.innerText} </h1>`;
      if (title && description && img) {
        let newDiv = `
        <div class="news-div">
        <h6 style="text-align:center"> Published date <strong class="publish-date"> ${publishedDate}  </strong> <h6>
       <img src="${img === null ? "image not available" : img}" alt"${title}">
       <h2>  Title  :  <br /><strong> ${title} </strong> </h2>
       <h2> Details : <br /><strong> ${
         description === null ? "description not availble" : description
       }</strong>  </h2>
      </div>
      `;
        newsContainer.innerHTML += newDiv;
      }
    }
  } catch (err) {
    console.log(err);
  }
}
