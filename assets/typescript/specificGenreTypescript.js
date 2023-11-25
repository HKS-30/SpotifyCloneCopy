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
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield refreshAccessToken(localStorage.getItem('refresh_token'));
    const categoryId = new URLSearchParams(window.location.search).get('id');
    const genreUrl = `https://api.spotify.com/v1/browse/categories/${categoryId}`;
    console.log(genreUrl);
    // const genreData = await getData(genreUrl);
    // const playlistData = await getData(`${genreUrl}/playlists`);
    const [genreData, playlistData] = yield Promise.all([
        getData(genreUrl),
        getData(`${genreUrl}/playlists`),
    ]);
    console.log(playlistData);
    const genreTitleElement = document.querySelector('#genreTitleElement');
    if (genreTitleElement) {
        genreTitleElement.innerHTML = genreData.name;
    }
    const mainContainer = document.getElementById('mainContainer');
    if (mainContainer) {
        playlistData.playlists.items.forEach((playlist) => {
            const playlistCard = document.createElement('div');
            playlistCard.className = 'playlistCard';
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('imgContainer');
            const imgElement = document.createElement('img');
            imgElement.classList.add('imgElement');
            imgElement.src = playlist.images[0].url;
            const playButton = document.createElement('img');
            playButton.src = './assets/imgs/spotify-play-button.png';
            playButton.alt = 'Play';
            playButton.classList.add('spotifyPlayButton');
            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(playButton);
            const playlistTitleElement = document.createElement('h3');
            playlistTitleElement.className = 'playlistTitleElement';
            playlistTitleElement.innerHTML = playlist.name;
            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('dscriptionElement');
            descriptionElement.innerHTML = playlist.description;
            playlistCard.append(imgContainer, playlistTitleElement, descriptionElement);
            mainContainer.appendChild(playlistCard);
            playlistCard.onclick = () => {
                window.location.href = `musiclist.html?id=${playlist.id}&type=${playlist.type}`;
            };
        });
    }
}))();
