function getMyAddress(cb) {
    $.ajax({
        type: "GET",
        url: "https://get-my-iphone-location.herokuapp.com/api/get-my-phone-location",
        success: function (data) {
            cb(data);
        }
    });
}

function initMap() {
    var geocoder = new google.maps.Geocoder();
    getMyAddress(function (res) {

        var address = res;

        geocoder.geocode({ 'address': address }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();

                var myLatLng = { lat: latitude, lng: longitude };

                var map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: latitude, lng: longitude },
                    zoom: 15,
                    scrollwheel: false,
                    navigationControl: false,
                    mapTypeControl: false,
                    scaleControl: false
                });

                var infowindow = new google.maps.InfoWindow();

                var marker = new google.maps.Marker({
                    map: map,
                    position: myLatLng
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent('<div>' + address + '</div>');
                    infowindow.open(map, this);
                });
            }
        });

    })
}