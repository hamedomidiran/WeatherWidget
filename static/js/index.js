$(function () {
    $('.maincontainer1').hide();
    $('.maincontainer2').hide();
    $('.maincontainer3').hide();
    $('#start').on('click', function () {
        $('#start').hide();
        $('#myCity').hide();
        $('.maincontainer1').show(1000);
    });
});


function urlToJson() {
    let city = $("#myInput").val();
    linkToCity = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=80cf29d45ee58c1bed2211d67b8d45a7&units=imperial"
    $.getJSON(linkToCity,
        function (data) {
            var listHTML = "<ul>";
            listHTML += "<h1>" + data['name'] + "</h1>";
            listHTML += '<br>' + "<li>" + "Current Temp: " + data['main']['temp'] + " F </li>" + '<br>';
            listHTML += '<br>' + "<li>" + "HI: " + data['main']['temp_max'] + " F </li>" + '<br>';
            listHTML += '<br>' + "<li>" + "LOW: " + data['main']['temp_min'] + " F </li>" + '<br>';
            listHTML += '<br>' + "<li>" + "Feels Like: " + data['main']['feels_like'] + " F </li>" + '<br>';
            listHTML += '<br>' + "<li>" + "Humidity: " + data['main']['humidity'] + " % </li>" + '<br>';
            listHTML += "</ul>";
            document.getElementById('status').innerHTML = listHTML;
            if (data['main']['temp'] > 50) {
                $("body").css("background-image", "url('/static/images/sunny2.jpg')");
            }
        })
        .fail(function() {alert("We currently do not have the data for that city.");})

}  

$("#submit").on('click', function() {
    $('.maincontainer1').hide();
    $('.maincontainer2').show(1000)

    urlToJson();
});


function search(ele) {
    if (event.key === 'Enter') {
        $('.maincontainer1').hide();
        $('.maincontainer2').show(1000);
        urlToJson();
    }
}



navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude
    let long= position.coords.longitude
    linkToCity2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=80cf29d45ee58c1bed2211d67b8d45a7&units=imperial";
    $.getJSON(linkToCity2,
        function (data) {
            document.getElementById('myCity').innerHTML = data["name"] + " : " + data['main']['temp'] + " F";
            $("#myCity").on('click', function () {
                $('#start').hide();
                $('.maincontainer1').hide();
                $('.maincontainer2').hide();
                $('.maincontainer3').show();
                var listHTML = "<ul>";
                listHTML += "<h1>" + data['name'] + "</h1>";
                listHTML += '<br>' + "<li>" + "Current Temp: " + data['main']['temp'] + " F </li>" + '<br>';
                listHTML += '<br>' + "<li>" + "HI: " + data['main']['temp_max'] + " F </li>" + '<br>';
                listHTML += '<br>' + "<li>" + "LOW: " + data['main']['temp_min'] + " F </li>" + '<br>';
                listHTML += '<br>' + "<li>" + "Feels Like: " + data['main']['feels_like'] + " F </li>" + '<br>';
                listHTML += '<br>' + "<li>" + "Humidity: " + data['main']['humidity'] + " % </li>" + '<br>';
                listHTML += "</ul>";
                document.getElementById('status2').innerHTML = listHTML;
                if (data['main']['temp'] > 50) {
                    $("body").css("background-image", "url('/static/images/sunny2.jpg')");
                }
            });
        });
});
 