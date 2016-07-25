/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        setupGeoLocationEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        setupGeoLocationEvents();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


function onDOMContentLoaded(){
    setupGeoLocationEvents();
}

function setupGeoLocationEvents(){
    if(navigator.geolocation){
        //getCurrentPosition takes a succesCallback function which
        //will be given an object with co-ordinates
        getNewCurrentPosition();
    }

    document.getElementById('setSavedPositionButton').addEventListener("click", savedPositionButtonClicked, false);
    document.getElementById('determineDistanceButton').addEventListener("click", determineDistanceButtonClicked, false);
    document.getElementById('getNewCurrentPositionButton').addEventListener("click", getNewCurrentPosition, false);
}

function getNewCurrentPosition(){
    navigator.geolocation.getCurrentPosition(showPosition);
}

function savedPositionButtonClicked (){
    navigator.geolocation.getCurrentPosition(setSavedPosition);

}

function setSavedPosition(position){
    savedPosition = position;
    var savedPositionString = "Logitude: " + position.coords.longitude + "; Latitude: " + position.coords.latitude;
    document.getElementById('savedPosition').textContent = savedPositionString; 
}

function showPosition(position) {
	var currentPositionString = "Logitude: " + position.coords.longitude + "; Latitude: " + position.coords.latitude;
	document.getElementById('currentPosition').textContent = currentPositionString;
    currentPosition = position;
}

function determineDistanceButtonClicked(){
    determineDistanceBetweenCurrentAndSavedPosition(currentPosition, savedPosition);
}

function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a = 
     0.5 - Math.cos(dLat)/2 + 
     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
     (1 - Math.cos(dLon))/2;

  return R * 2 * Math.asin(Math.sqrt(a));
}

function determineDistanceBetweenCurrentAndSavedPosition(currentPosition, savedPosition){
    
    distanceBetweenCurrentAndSaved = distance(currentPosition.coords.latitude, currentPosition.coords.longitude, savedPosition.coords.latitude, savedPosition.coords.longitude);
    document.getElementById('distance').textContent = distanceBetweenCurrentAndSaved.toString();
}