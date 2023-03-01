let options;
let currentPos;
let currentPoint;
let currentDistance;
let pointCount = 0;
let searchRadius = 0.02;
let hasStarted = false;
let wakeLock = null;
let wakeLockSupported = false;
let changeCount = 0;

//Array 
//mit Positions Name / Latitude, Longitude / Video, Bild Link
const posArray =   
[
  {name:"01_Die_Ortsansaessigen", lat: 0, long: 0, cover:1},
  {name:"02_Steinbruch_Ort", lat: 48.131290, long: 16.267342, cover:2},
  {name:"03_Verladestation", lat: 48.131026, long: 16.266549, cover:3},
  {name:"04_Das_Lager", lat: 48.131180, long: 16.268040, cover:4},
  {name:"05_Die_Ortschaften", lat: 48.128936, long: 16.267168, cover:5},
  {name:"06_Die_Kirche", lat: 48.128762, long: 16.266554, cover:6},
  {name:"07_Die_Einfahrt", lat: 48.127045, long: 16.268729, cover:7},
  {name:"08_Die_Wirtschaft", lat: 48.126301, long: 16.267669, cover:8},
  {name:"09_Die_Kollegen", lat: 48.125894, long: 16.268376, cover:9},
  {name:"10_Das_Spalten", lat: 48.125811, long: 16.267161, cover:10}
];

navigator.geolocation.watchPosition(succesCallback, errorCallback, options);

//Get the current position
function succesCallback(pos)
{
  if(hasStarted)
  {
    currentPos = pos.coords;
    SearchTriggerPos();
    UpdateHtmlText();
  }
}

//Called if an error appears
function errorCallback(error)
{
  console.log(error);
}

options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function SearchTriggerPos()
{
  changeCount++;
  let currentPointTemp;

  //Geht durch das posArray
  for (let index = 0; index < posArray.length; index++) {
    const element = posArray[index];
    
    //Berechnet die Distanz von der aktuellen Position zum Array Punkt
    distance = calculateDistance(currentPos.latitude, currentPos.longitude,element.lat, element.long);
    console.log(distance);

    if(distance <= searchRadius && element.name != currentPoint)
    {
      currentPointTemp = element;
      pointCount++;
    }
  }

  if(pointCount < 2 && pointCount != 0 )
  {
    currentPoint = currentPointTemp.name;
    console.log(currentPointTemp);
    currentDistance = calculateDistance(currentPos.latitude, currentPos.longitude,currentPointTemp.lat, currentPointTemp.long);
    $.getScript("player.js",loadPosition(currentPoint));
    document.getElementById("pointCountText").innerHTML = "Point Count: " + pointCount + "Change Count: " + changeCount;
  }
  else
  {
    document.getElementById("pointCountText").innerHTML = "Point Count: " + pointCount + "Change Count: " + changeCount;
  }

  pointCount = 0;
}

//Aktualisiert den Html Text
function UpdateHtmlText(){
      $("#currentLat").text(currentPos.latitude);
      $("#currentLon").text(currentPos.longitude);
      $("#accuracyText").text(currentPos.accuracy);
      $("#distance").text(currentDistance);
}

// Reused code - copyright Moveable Type Scripts - retrieved May 4, 2010.
// http://www.movable-type.co.uk/scripts/latlong.html
// Under Creative Commons License http://creativecommons.org/licenses/by/3.0/
function calculateDistance(lat1, lon1, lat2, lon2)
{
  var R = 6371; // km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

Number.prototype.toRad = function()
{
  return this * Math.PI / 180;
}

function ToggleDebug() {
  var x = document.getElementById("debug");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

if('wakeLock' in navigator)
{
  console.log("WakeLock Supported.");
  wakeLockSupported = true;
  document.getElementById("wakeText").innerHTML = wakeLockSupported;
}
else
{
  console.log("WakeLock not Supported.");
  wakeLockSupported = false;
}

async function acquireLock(){
  wakeLock = await navigator.wakeLock.request("screen");
  console.log("WakeLock activated.");
}

function releaseLock(){

}



