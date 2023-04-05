var buttonPicky = document.getElementById("button1");
var letsEat = document.getElementById("button2");
var randomRest = document.getElementById("random");

const apiKey = 'hTu_VrReWNeoYJwZ0rtmm3ruFI6tcXH4Jn_LItoXCoJQQA6NK29KBphQ8KDq0LcSfxa1CZzJmHe9ypwEDKibnUG8PWiM2cqZFZ0w94B81O6_YcuUnMMwS6-pLNUsZHYx';
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
  fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=UT&categories=indian&sort_by=best_match&limit=20', options)
  .then(response => response.json())
  .then(response => {
    const businesses = response.businesses;
    if (businesses && businesses.length > 0) {
      const randomIndex = Math.floor(Math.random() * businesses.length);
      const randomRestaurant = businesses[randomIndex];
      console.log('Random restaurant:', randomRestaurant);
      displayRestaurantInfo(randomRestaurant);
      
      randomRest.style.display = "flex";
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