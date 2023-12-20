const apiKey = '2b6ce072acd8fb5f6e5be70ad405ea49';
const apiUrl = 'http://ws.audioscrobbler.com/2.0/';

// Function to fetch a random album from Last.fm
async function fetchRandomAlbum() {
    const method = 'tag.gettopalbums';
    const tag = 'rock'; // You can change the tag or genre as needed

    const params = new URLSearchParams({
        method,
        tag,
        api_key: apiKey,
        format: 'json',
    });

    const response = await fetch(`${apiUrl}?${params}`);
    const data = await response.json();

    // Extract a random album from the response
    const randomIndex = Math.floor(Math.random() * data.albums.album.length);
    return data.albums.album[randomIndex];
}

// Function to display the random album
function displayAlbum(album) {
    const appElement = document.getElementById('app');

    // Clear existing content
    appElement.innerHTML = '';

    const albumElement = document.createElement('div');
    albumElement.classList.add('album');

    const albumImage = document.createElement('img');
    albumImage.src = album.image[2]['#text']; // Use a suitable image size
    albumElement.appendChild(albumImage);

    const albumName = document.createElement('p');
    albumName.textContent = album.name;
    albumElement.appendChild(albumName);

    const artistName = document.createElement('p');
    artistName.textContent = album.artist.name;
    albumElement.appendChild(artistName);

    appElement.appendChild(albumElement);
}

// Function to handle button click
async function onButtonClick() {
    const randomAlbum = await fetchRandomAlbum();
    displayAlbum(randomAlbum);
}

// Attach the onButtonClick function to a button click event
document.getElementById('loadButton').addEventListener('click', onButtonClick);

// Initial load
onButtonClick();