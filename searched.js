let searchHistory = [];
localStorage.getItem('searchHistory') ? searchHistory = JSON.parse(localStorage.getItem('searchHistory')) : searchHistory = [];
const searchList = document.querySelector('.search-lists');

let count = 1;
searchHistory.map(search => {
    searchList.innerHTML += `
    <div class="search-items">
        <div class="id-name">
            <div class="search-id">${count++}.</div>
            <div class="search-name">${search.search}</div>
        </div>
        <div class="date-time">Searched On :${search.date} at ${search.time}</div>
    </div>
    `
})

const cardContainer = document.querySelector('.container')
let searchItems;
document.querySelectorAll('.search-items') ? searchItems = document.querySelectorAll('.search-items') : searchItems = "";

searchItems.forEach(elem => {
    const search = elem.querySelector('.search-name').innerText;
    elem.addEventListener('click', () => {


        if (search.value != "") {
            cardContainer.classList.remove('hide');
            async function fetchingData() {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
                const data = await response.json();
                let bookStore = [];

                const dataItems = data.items;
                dataItems.map(arrItems => {
                    const bookInfo = arrItems.volumeInfo;
                    const books = {
                        id: arrItems.id,
                        image: bookInfo.imageLinks.thumbnail,
                        title: bookInfo.title,
                        author: bookInfo.authors == undefined ? bookInfo.authors = ["NA"] : bookInfo.authors = bookInfo.authors[0],
                        pageCount: bookInfo.pageCount,
                        publisher: bookInfo.publisher
                    }

                    if (bookStore.length < dataItems.length) {
                        bookStore.push(books);
                    }
                    localStorage.setItem('bookStore', JSON.stringify(bookStore));
                })

                const cardWrapper = document.querySelector('.card-wrapper');
                JSON.parse(localStorage.getItem('bookStore')) ?
                    JSON.parse(localStorage.getItem('bookStore')) : bookStore = [];
                cardWrapper.innerHTML = "";
                bookStore.map(item => {

                    item.name == undefined ? item.name = 'NA' : item.name;
                    item.title == undefined ? item.title = 'NA' : item.title;
                    item.author == undefined ? item.author = 'NA' : item.author;
                    item.pageCount == undefined ? item.pageCount = 'NA' : item.pageCount;
                    item.publisher == undefined ? item.publisher = 'NA' : item.publisher;

                    cardWrapper.innerHTML += `
                    <div class="card">
                        <img class="image-top" src=${item.image} alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-author">Author: ${item.author}</p>
                            <p class="card-page-count">Page Count: ${item.pageCount}</p>
                            <p class="card-publisher">Publisher: ${item.publisher}</p>
                        </div>
                        <div class="btn">
                            <button class="buy-now">Buy Now</button>
                        </div>
                    </div>
                    `
                })
            }
            fetchingData();

        }
        else {
            cardContainer.classList.add('hide');
        }
    })
})