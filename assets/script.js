var buttonPicky = document.getElementById("button1");
var letsEat = document.getElementById("button2");
var randomRest = document.getElementById("random");

const apiKey = 'c4Wu7RmVz4Ug10l8nKrDJzieHkCoFYl6Ba_FBAxoiCeqjgXc8X6B6fJwA57154a2R9fh9SK-YbkPVhBLajXrBJwgxSd1g0knBtlX9-ANJ84rd9LUDyp15G0_iYgrZHYx';
const options = { method: 'GET', headers: { accept: 'application/json', Authorization: 'Bearer ' + apiKey } };

function displayRestaurantInfo(restaurant) {
  const name = restaurant.name;
  const address = restaurant.location.address1;
  const phone = restaurant.display_phone;

  const nameElem = document.createElement('h4');
  nameElem.textContent = name;

  const addressElem = document.createElement('p');
  addressElem.textContent = address;

  const phoneElem = document.createElement('p');
  phoneElem.textContent = phone;

  randomRest.innerHTML = '';
  randomRest.appendChild(nameElem);
  randomRest.appendChild(addressElem);
  randomRest.appendChild(phoneElem);
}

function getRandomRestaurant() {
  fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=UT&sort_by=best_match&limit=20', options)
    .then(response => response.json())
    .then(response => {
      const businesses = response.businesses;
      if (businesses && businesses.length > 0) {
        const randomIndex = Math.floor(Math.random() * businesses.length);
        const randomRestaurant = businesses[randomIndex];
        console.log('Random restaurant:', randomRestaurant);
        displayRestaurantInfo(randomRestaurant);
      } else {
        console.log('No restaurants found.');
      }
    })
    .catch(err => console.error(err));
}

buttonPicky.addEventListener("click", function () {
  window.location.href = "page2.html";
});

letsEat.addEventListener("click", function () {
  getRandomRestaurant();
});












  const successCallback = (position) => {
    console.log(position);
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);