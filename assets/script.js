var buttonPicky = document.getElementById("button1");
var letsEat = document.getElementById("button2");
var randomRest = document.getElementById("random");

//Custom icons for user location/random restaurant location
  var customicon1 = L.icon({
  iconUrl: 'https://toppng.com/uploads/preview/skyrim-map-icons-clip-library-skyrim-quest-marker-icon-11553438138ukhmthly3x.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
  });
  var customicon2 = L.icon({
  iconUrl: 'https://vectorified.com/image/pacman-vector-26.jpg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})

//Variables to hold api keys for bing/yelp
  const yelpApiKey = 'hTu_VrReWNeoYJwZ0rtmm3ruFI6tcXH4Jn_LItoXCoJQQA6NK29KBphQ8KDq0LcSfxa1CZzJmHe9ypwEDKibnUG8PWiM2cqZFZ0w94B81O6_YcuUnMMwS6-pLNUsZHYx';
  const bingMapsApiKey = 'AvB9Z6Gyuaz2wVO68rKeSphh-U0t8-T2hO7pmMfAHTRtfZHq04ONv2vMdclytiew';
  const options = { method: 'GET', headers: { accept: 'application/json', Authorization: 'Bearer ' + yelpApiKey } };

  function getLocation() {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

//Takes users city and state from bing API and generates random restaurant.
//Applies style to random div.
  function getRandomRestaurant(city, state, map, userMarker) {
  fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${city},${state}&sort_by=best_match&limit=20`, options)
    .then(response => response.json())
    .then(response => {
      const businesses = response.businesses;
      if (businesses && businesses.length > 0) {
        const randomIndex = Math.floor(Math.random() * businesses.length);
        const randomRestaurant = businesses[randomIndex];
        console.log('Random restaurant:', randomRestaurant);
        displayRestaurantInfo(randomRestaurant);

        const restaurantLat = randomRestaurant.coordinates.latitude;
        const restaurantLng = randomRestaurant.coordinates.longitude;
        const restaurantMarker = L.marker([restaurantLat, restaurantLng], {icon: customicon1 }).addTo(map);
        
        //Adjusts the maps so that both user/restaurant marker show without having to zoom out. 
        map.fitBounds([
          userMarker.getLatLng(),
          restaurantMarker.getLatLng()
        ]);

        randomRest.style.display = "flex";
      } else {
        console.log('No restaurants found.');
      }
    })
    .catch(err => console.error(err));
    }

//Appends random restaurant's name, phone number, and address to page.    
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
//Takes users position and gets latitude and longitude.
  function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  var map = L.map('mapid');
  var userMarker = L.marker([latitude, longitude], {icon: customicon2 }).addTo(map);
  map.setView([latitude, longitude], 13);

  var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  osm.addTo(map);


//Takes user's latitude/longtitude to pass to bing api to get city
//and state for yelp random restaurant function above.
  fetch(`https://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?o=json&key=${bingMapsApiKey}`)
    .then(response => response.json())
    .then(data => {
      const location = data.resourceSets[0].resources[0].address;
      //Passing extracted data as arguments to the getRandomRestaurant function 
      getRandomRestaurant(location.locality, location.adminDistrict, map, userMarker);
    })
    .catch(error => console.error('Error fetching location:', error));
  }

function errorCallback(error) {
  console.log('Error getting location:', error);
  alert('Unable to get your location.');
}   
//Takes user to 2nd html page
  buttonPicky.addEventListener("click", function () {
  window.location.href = "page2.html";
  });

//Kicks off functions when user clicks lets eat button.
//Starting with getting geo location.  
  letsEat.addEventListener("click", function () {
  getLocation();
  });