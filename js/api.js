const api_key = "24af8a1b989f4dc3a731b8e5768e0405";
const url = "https://newsapi.org/v2/everything?q=";

// Ensure DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
  fetchNews("India"); 
});

// Function to reload the page
function reload() {
  window.location.reload();
}

// Fetch news from API
async function fetchNews(query) {
  try {
    console.log("Fetching news for:", query);
    const res = await fetch(`${url}${query}&apiKey=${api_key}`);
    
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    console.log("API Response:", data); 

    if (!data.articles || data.articles.length === 0) {
      console.warn("No articles found");
      return;
    }

    bindData(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

// Bind articles to the UI
function bindData(articles) {
  const cardsContainer = document.getElementById("Card_Container");
  const cardTemplate = document.getElementById("card_template");

  if (!cardsContainer || !cardTemplate) {
    console.error("Card container or template not found!");
    return;
  }

  cardsContainer.innerHTML = ""; // Clear previous data

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardClone = cardTemplate.cloneNode(true);
    cardClone.style.display = "block"; // Make sure it's visible
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

// Fill news data inside the card
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news_img");
  const newsTitle = cardClone.querySelector("#news_title");
  const newsDescription = cardClone.querySelector("#newsDesc");

  if (!newsImg || !newsTitle || !newsDescription) {
    console.error("Missing elements inside card template!");
    return;
  }

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDescription.innerHTML = article.description;

  cardClone.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

// Handle navigation category clicks
function onNavItemClick(id) {
  fetchNews(id);
}

// Handle search functionality
const searchButton = document.getElementById("Search_button");
const inputSearch = document.getElementById("Search_text");

if (searchButton && inputSearch) {
  searchButton.addEventListener("click", () => {
    const query = inputSearch.value.trim();
    if (!query) return;
    fetchNews(query);
  });
} else {
  console.error("Search button or input not found");
}
