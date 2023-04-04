var buttonPicky = document.getElementById("button1");
var letsEat = document.getElementById("button2");

const apiKey = 'c4Wu7RmVz4Ug10l8nKrDJzieHkCoFYl6Ba_FBAxoiCeqjgXc8X6B6fJwA57154a2R9fh9SK-YbkPVhBLajXrBJwgxSd1g0knBtlX9-ANJ84rd9LUDyp15G0_iYgrZHYx';
const options = {method: 'GET', headers: {accept: 'application/json', Authorization: 'Bearer '+apiKey}};

fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=NYC&sort_by=best_match&limit=20', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  


const successCallback = (position) => {
    console.log(position);
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);



  //Linking get picky button to page2.html
  buttonPicky.addEventListener("click", function() {
    window.location.href = "page2.html";
  });

