import { getData, refreshAccessToken } from '../js/get.js';

async function main() {
  await refreshAccessToken(localStorage.getItem('refresh_token'));
  const searchCateogoryPromise = getData(
    'https://api.spotify.com/v1/browse/categories?country=IN'
  );

  searchCateogoryPromise.then((data: any) => {
    const categoryData: any[] = [...data.categories.items];
    console.log(categoryData);
    const searchSection: HTMLElement | null = document.querySelector('section.searchDisplay');
    if (searchSection) {
      categoryData.forEach((elements: any) => {
        const searchContainer: HTMLDivElement = document.createElement('div');
        searchContainer.classList.add('searchBlock');

        const title: HTMLHeadingElement = document.createElement('h2');
        title.textContent = elements.name;

        let imageElement: HTMLImageElement = document.createElement('img');
        imageElement.src = elements.icons[0].url;

        searchContainer.append(title, imageElement);
        searchSection.appendChild(searchContainer);

        searchContainer.onclick = () => {
          window.location.href = `specificGenre.html?id=${elements.id}`;
        };
        const randomColor: string = getRandomColor();
        searchContainer.style.backgroundColor = randomColor;
      });
    }
  });
}

// Function to generate random colours
function getRandomColor(): string {
  const red: number = Math.floor(Math.random() * 256);
  const green: number = Math.floor(Math.random() * 256);
  const blue: number = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

const searchBar: HTMLInputElement | null = document.querySelector('.searchInput');
if (searchBar) {
  searchBar.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      window.location.href = `searchList.html?q=${searchBar.value}`;
    }
  });
}

main();
