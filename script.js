const search = document.querySelector('.search');
const cardContainer = document.querySelector('.container');
const cardWrapper = document.querySelector('.card-wrapper');
const inputBtn = document.querySelector('.input-btn');
const bookResults = document.querySelector('.bookResults');

let bookStore = [];
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

inputBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const newSearch = search.value.trim().split(' ').join('+');
    if (!newSearch) return cardContainer.classList.add('hide');
    searchHistory.push({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        search: search.value,
    });
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    cardContainer.classList.remove('hide');
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${newSearch}`);
    const data = await response.json();
    bookStore = data.items?.map(({ id, volumeInfo }) => ({
        id,
        image: volumeInfo.imageLinks?.thumbnail,
        title: volumeInfo.title || 'NA',
        author: volumeInfo.authors?.[0] || 'NA',
        pageCount: volumeInfo.pageCount || 'NA',
        publisher: volumeInfo.publisher || 'NA',
    })) || [];
    localStorage.setItem('bookStore', JSON.stringify(bookStore));
    cardWrapper.innerHTML = bookStore.map(({ id, image, title, author, pageCount, publisher }) => `
        <div class="card">
            <img class="image-top" src=${image} alt="${title}">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-author">Author: ${author}</p>
                <p class="card-page-count">Page Count: ${pageCount}</p>
                <p class="card-publisher">Publisher: ${publisher}</p>
            </div>
            <div class="btn">
                <button class="buy-now">Buy Now</button>
            </div>
        </div>
    `).join('');
    bookResults.textContent = search.value;
});