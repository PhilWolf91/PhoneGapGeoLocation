var currentPosition;
var savedPosition;
var distanceBetweenCurrentAndSaved;
document.addEventListener("DOMContentLoaded", function () {
    if (navigator.geolocation) {
        //getCurrentPosition takes a succesCallback function which
        //will be given an object with co-ordinates
        getNewCurrentPosition();
    }
    document.getElementById('setSavedPositionButton').addEventListener("click", savedPositionButtonClicked, false);
    document.getElementById('determineDistanceButton').addEventListener("click", determineDistanceButtonClicked, false);
    document.getElementById('getNewCurrentPositionButton').addEventListener("click", getNewCurrentPosition);
});
function savedPositionButtonClicked() {
    navigator.geolocation.getCurrentPosition(setSavedPosition);
}
function setSavedPosition(position) {
    savedPosition = position;
    var savedPositionString = "Logitude: " + position.coords.longitude + "; Latitude: " + position.coords.latitude;
    document.getElementById('savedPosition').textContent = savedPositionString;
}
function showPosition(position) {
    var currentPositionString = "Logitude: " + position.coords.longitude + "; Latitude: " + position.coords.latitude;
    document.getElementById('currentPosition').textContent = currentPositionString;
    currentPosition = position;
}
function getNewCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
}
function determineDistanceButtonClicked() {
    determineDistanceBetweenCurrentAndSavedPosition(currentPosition, savedPosition);
}
function distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1) * Math.PI / 180; // deg2rad below
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = 0.5 - Math.cos(dLat) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
}
function determineDistanceBetweenCurrentAndSavedPosition(currentPosition, savedPosition) {
    distanceBetweenCurrentAndSaved = distance(currentPosition.coords.latitude, currentPosition.coords.longitude, savedPosition.coords.latitude, savedPosition.coords.longitude);
    document.getElementById('distance').textContent = distanceBetweenCurrentAndSaved.toString();
}
