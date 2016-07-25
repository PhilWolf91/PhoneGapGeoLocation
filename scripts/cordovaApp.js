var cordovaApp = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('load', this.onLoad, false);
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            document.addEventListener("deviceready", this.onDeviceReady, false);
        } else {
            this.onDeviceReady();
        }
    },
    onLoad: function () {

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        console.log("Device Ready");
        
    //     var geolocation = navigator.geolocation;
    //     console.log(geolocation);
    //     var location = geolocation.getCurrentPosition(this.geoLocationSuccess, this.geoLocationError);
    // },

    // geoLocationSuccess: function(data){
    //     console.log(data)
    // },

    // geoLocationError: function(data){
    //     console.log(data);
    // }
    }
};