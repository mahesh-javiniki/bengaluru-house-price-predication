function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  // Validate area input
  var areaValue = parseFloat(sqft.value);
  
  if (isNaN(areaValue) || areaValue < 300) {
    estPrice.innerHTML = "<h2>⚠️ Area must be 300 sq ft or more</h2>";
    estPrice.style.background = "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)";
    
    // Show alert for better user experience
    alert("Please enter an area of 300 square feet or more. Our model requires a minimum area of 300 sq ft for accurate predictions.");
    
    // Focus back to the input field
    sqft.focus();
    sqft.select();
    return;
  }

  // Reset result styling for successful predictions
  estPrice.style.background = "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)";

  // var url = "http://127.0.0.1:5000/predict_house_price"; // Without nginx.
  var url = "/api/predict_house_price"; // With nginx.

  $.post(url, {
      total_sqft: areaValue,
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>₹ " + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  }).fail(function() {
      estPrice.innerHTML = "<h2>❌ Error getting prediction</h2>";
      estPrice.style.background = "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)";
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  // var url = "http://127.0.0.1:5000/locations"; // Without nginx.
  var url = "/api/locations"; // With nginx.
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;
