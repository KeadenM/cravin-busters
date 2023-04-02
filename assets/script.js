var buttonPicky = document.getElementById("button1");






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

