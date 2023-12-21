// API key identifies user to and allows access to API. last fm does not require authentication.
const apiKey = '2b6ce072acd8fb5f6e5be70ad405ea49';
// The last fm api endpoint address
const apiUrl = 'http://ws.audioscrobbler.com/2.0/';
// Grabbing select element to give choice of genre when randomizing album.
let select = document.querySelector('#genre');

// Function to fetch a random album from Last.fm
async function fetchRandomAlbum() {
  const method = 'tag.gettopalbums';
  const tag = select.value; // You can change the tag or genre. Will add a select to give choice of genre.
  const limit = 200; // Limits the amount of albums that are possibly displayed.
  // 'new' operator creates an instance of a user-defined object type. This will store parameters that will later be used later to create and fetch api request.
  const params = new URLSearchParams({ method, tag, api_key: apiKey, format: 'json', limit });

  // Take API endpoint and params object and uses template literal to combine variables into a string
  const response = await fetch(`${apiUrl}?${params}`);
  const data = await response.json();
  console.log(data);

  // extracts a single album at random using Math.random method using a range of 0 (inclusive) to albums.album.length since albums.album is an array you can use .length property to identify the number of ablbums availible in the api. the default limit is 50 right now. results is stored in the variable randomIndex and give random index number 0-data.albums.album.length.
  const randomIndex = Math.floor(Math.random() * data.albums.album.length);
  console.log(randomIndex)
  return data.albums.album[randomIndex];
}

// Function to display the random album.
function displayAlbum(album) {
  const appElement = document.getElementById('app');

  // Clear existing content
  appElement.innerHTML = `
    <div class="album">
    <img src="${album.image[3]['#text']}">
      <p>${album.name}</p>
      <p>${album.artist.name}</p>
    </div>
    `
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

// add some animation to album cover so when cursor is over the image it moves the image up.
var albumCover = document.querySelector('.album-cover')

albumCover.addEventListener('mouseover', function () {
  classList.add('animate');
});

// last fm api link to top rock albums: https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=rock&api_key=2b6ce072acd8fb5f6e5be70ad405ea49&format=json

// shared secret key: 4359699d2d6dbeee73531e0950888373
// api key: 2b6ce072acd8fb5f6e5be70ad405ea49