let searchHistory = [];
localStorage.getItem('searchHistory') ? searchHistory = JSON.parse(localStorage.getItem('searchHistory')) : searchHistory = [];
const searchList = document.querySelector('.search-lists');
const clearSearch = document.querySelector('.clear-search');

let count = 1;
searchHistory.forEach(search => {
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

clearSearch.addEventListener('click', () => {
    localStorage.removeItem('searchHistory');
    location.reload();
})
