// bustime.js

var map;
var markers = [];

function initMap() {
  var myMapCenter = {lat: 43.052955, lng: -87.9003088};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myMapCenter
  });

  // var infoWindow = new google.maps.InfoWindow;

  setInterval(function() { // Timer Loop

    clearMarkers()

    // Data Fetch
    downloadUrl('http://test.koster.ninja/getvehicles', function(data) {
    var json_response = JSON.parse(data.response) // Transform JSON String to Object

    // Data Loop
    json_response["vehicle"].forEach(function(vehicle) {

      var marker = {lat: parseFloat(vehicle.lat), lng: parseFloat(vehicle.lon)};

      addMarker(marker)
      //
      // marker.addListener('click', function() {
      //   infoWindow.setContent(infowincontent);
      //   infoWindow.open(map, marker);
      // });

    }); // json_response
  }); // downloadUrl
}, 5000) // setInterval
} //initMap

// Adds a marker to the map and push to the array.
function addMarker(location) {
var marker = new google.maps.Marker({
  position: location,
  map: map
});
markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
for (var i = 0; i < markers.length; i++) {
  markers[i].setMap(map);
}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
setMapOnAll(null);
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  request.open('GET', url, true);
  request.send(null);
}

function doNothing() {} // Dummy function for State loop
