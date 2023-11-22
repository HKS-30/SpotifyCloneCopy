"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// specificGenre.ts
var get_js_1 = require("../js/get.js");
var es6_promise_1 = require("es6-promise");
function test() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var categoryId, genreUrl, _b, genreData, playlistData, genreTitleElement, mainContainer_1, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    // Refresh access token
                    return [4 /*yield*/, (0, get_js_1.refreshAccessToken)(localStorage.getItem('refresh_token'))];
                case 1:
                    // Refresh access token
                    _c.sent();
                    categoryId = new URLSearchParams(window.location.search).get('id');
                    genreUrl = "https://api.spotify.com/v1/browse/categories/".concat(categoryId);
                    console.log(genreUrl);
                    return [4 /*yield*/, es6_promise_1.Promise.all([
                            (0, get_js_1.getData)(genreUrl),
                            (0, get_js_1.getData)("".concat(genreUrl, "/playlists")),
                        ])];
                case 2:
                    _b = _c.sent(), genreData = _b[0], playlistData = _b[1];
                    console.log(playlistData);
                    genreTitleElement = document.querySelector('#genreTitleElement');
                    if (genreTitleElement) {
                        genreTitleElement.innerHTML = ((_a = genreData.playlists.items[0]) === null || _a === void 0 ? void 0 : _a.name) || '';
                    }
                    mainContainer_1 = document.getElementById('mainContainer');
                    if (mainContainer_1) {
                        // Iterate through playlist items
                        playlistData.playlists.items.forEach(function (playlist) {
                            var _a;
                            // Create playlist card element
                            var playlistCard = document.createElement('div');
                            playlistCard.className = 'playlistCard';
                            // Create image container
                            var imgContainer = document.createElement('div');
                            imgContainer.classList.add('imgContainer');
                            // Create image element
                            var imgElement = document.createElement('img');
                            imgElement.classList.add('imgElement');
                            imgElement.src = ((_a = playlist.images[0]) === null || _a === void 0 ? void 0 : _a.url) || '';
                            // Create play button element
                            var playButton = document.createElement('img');
                            playButton.src = './assets/imgs/spotify-play-button.png';
                            playButton.alt = 'Play';
                            playButton.classList.add('spotifyPlayButton');
                            // Append image and play button to image container
                            imgContainer.append(imgElement, playButton);
                            // Create playlist title element
                            var playlistTitleElement = document.createElement('h3');
                            playlistTitleElement.className = 'playlistTitleElement';
                            playlistTitleElement.innerHTML = playlist.name;
                            // Create description element
                            var descriptionElement = document.createElement('p');
                            descriptionElement.classList.add('descriptionElement');
                            descriptionElement.innerHTML = playlist.description;
                            // Append elements to playlist card
                            playlistCard.append(imgContainer, playlistTitleElement, descriptionElement);
                            // Append playlist card to main container
                            mainContainer_1.appendChild(playlistCard);
                            // Add click event to navigate to musiclist.html
                            playlistCard.onclick = function () {
                                window.location.href = "musiclist.html?id=".concat(playlist.id, "&type=").concat(playlist.type);
                            };
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    console.error('An error occurred:', error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
test();
