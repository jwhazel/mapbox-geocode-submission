/***** SETUP *****/     
//Init the map and the geocoder
L.mapbox.accessToken = '';
var map = L.mapbox.map('map', 'examples.map-i875kd35').setView([39.4361929, -83.715820], 6);
var geocoder= L.mapbox.geocoder('mapbox.places-v1');
        


//Pull currently uploaded points from the server and plot them
$.getJSON('data.json', function(data){
    $tableData = $('#tableData');
    for (var i=0, f=data.length;i<f;i++){
        L.marker([data[i].lat, data[i].lng]).addTo(map).bindPopup(data[i].address);
        //DEBUG:
        $tableData.append('<tr><td>'+data[i].address+'</td><td>' + data[i].lat + '</td><td>'+data[i].lng+'</td></tr>');
    }
})


/***** EVENT HANDLERS *****/
//Handle user input
$('#searchAddress').click(function(){
    $addressValue = $('#addressValue');
    
    //User input was blank
    if ($addressValue.val() ===""){
        $(this).removeClass('shake').addClass('shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('shake');
            $addressValue.focus();
        });
        return;
    }
    geocoder.query($addressValue.val(),geocodeComplete);
});

        
/***** FUNCTIONS *****/        
//Handle the geocoder callback
function geocodeComplete(err, data) {
    var address = data.results.features[0].place_name
    var lat = data.latlng[0];
    var lng = data.latlng[1];
    
    //Plot the marker and send it to the server to record
    L.marker([lat, lng]).addTo(map).bindPopup(address);
    $.post('update.php', {'address':address, 'lat':lat, 'lng':lng})
    $('#addressValue').val('');
    //DEBUG:
    $('#tableData').append('<tr><td>'+address+'</td><td>' + lat + '</td><td>'+lng+'</td></tr>');
}
