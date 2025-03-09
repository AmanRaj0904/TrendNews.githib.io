const api_key = "24af8a1b989f4dc3a731b8e5768e0405";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
  // Fixed typo here
  const res = await fetch(`${url}${query}&apiKey=${api_key}`);
  const data = await res.json();
  //   console.log(data)
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("Card_Container");
  const cardTemplate = document.getElementById("card_template");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = cardTemplate.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
  // console.log(cardTemplate);
}
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news_img");
  const newsTile = cardClone.querySelector('#news_title');
  const newsDescription = cardClone.querySelector('#newsDesc');

  newsImg.src = article.urlToImage;
  newsTile.innerHTML=article.title;
  newsDescription.innerHTML = article.description;

  cardClone.firstElementChild.addEventListener('click',()=> {

    window.open(article.url,"_blank");
  
  })
}

function onNavItemClick(id){
    fetchNews(id);   
}

const searchButton = document.getElementById('Search_button')

const inputSearch =document.getElementById('Search_text');

searchButton.addEventListener('click',()=>{
  const query = inputSearch.value;
  if(!query) return;
  fetchNews(query)
})