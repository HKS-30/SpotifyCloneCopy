var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData, refreshAccessToken } from '../js/get.js';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield refreshAccessToken(localStorage.getItem('refresh_token'));
        const searchCateogoryPromise = getData('https://api.spotify.com/v1/browse/categories?country=IN');
        searchCateogoryPromise.then((data) => {
            const categoryData = [...data.categories.items];
            console.log(categoryData);
            const searchSection = document.querySelector('section.searchDisplay');
            if (searchSection) {
                categoryData.forEach((elements) => {
                    const searchContainer = document.createElement('div');
                    searchContainer.classList.add('searchBlock');
                    const title = document.createElement('h2');
                    title.textContent = elements.name;
                    let imageElement = document.createElement('img');
                    imageElement.src = elements.icons[0].url;
                    searchContainer.append(title, imageElement);
                    searchSection.appendChild(searchContainer);
                    searchContainer.onclick = () => {
                        window.location.href = `specificGenre.html?id=${elements.id}`;
                        // window.location.href = `specificGenre.html?url=${elements.href}`;
                    };
                    const randomColor = getRandomColor();
                    searchContainer.style.backgroundColor = randomColor;
                });
            }
        });
    });
}
// Function to generate random colours
function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}
const searchBar = document.querySelector('.searchInput');
if (searchBar) {
    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            window.location.href = `searchList.html?q=${searchBar.value}`;
        }
    });
}
main();
