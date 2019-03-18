$(document).ready(function () {
    var zipCode;
    var ipAddress;
    var newsUrl = newsQueryURL();
    var newPrefReff;
    var zipcode = '55101';
    $("#userpref").hide();



    $(".checkbox").prop("checked", "checked"); //set Metric by Default

    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location = "index.html";
        } else {
            globalUser = user;
            console.log("global user: " + globalUser);
            newsPrefReff = database.ref(
                "/users/" + globalUser.uid + "/newsPreferences/");
            console.log("----->" + newsPrefReff);
        }
        $("#userpref").show();
    })


    // Ajax call to get news from NYT
    $.ajax({
        url: newsUrl,
        method: "GET"
    }).then(displayNews);

    var ipAddress;

    $.getJSON("https://api.ipify.org?format=json", function (data) {
        ipAddress = data.ip;
        console.log("IP ADDRESS ", ipAddress);
    });

    getWeather();

});
/**
 * get preference information from from db otherwise default values will be used 
 * @returns {string} URL for NYT API based 
 */
function newsQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    // Set the API key
    var queryParams = {
        "api-key": "XIW58kpN63We5nGfdQE45koBdpNVyKvU"
    };
    // Grab user preferences from DB is user registered 
    //
    // Set user parameters for query
    queryParams.q = "sports";
    //
    return queryURL + $.param(queryParams);
}

function displayNews(newsData) {
    var numHeadLines = 3;
    console.log(newsData);
    var divId = 0;
    var div = "";

    var $news = $('<div>');

    // Loop through and build elements for the defined number of articles
    for (var i = 0; i < numHeadLines; i++) {
        // Get specific article info for current index
        var article = newsData.response.docs[i];

        //Get headline and Url to display
        var headline = article.headline.print_headline;
        var headLineUrl = article.web_url;

        console.log("head line : ", headline);
        //var byline = article.byline;
        //var section = article.section_name;
        //var pubDate = article.pub_date;
        //var $news.append("<a href='" + headLineUrl + "'>' +  "'<strong> '" + headline +  "</strong>" +"</a>");

        $news.append("<a href='" + headLineUrl + "' target='_blank'> <strong>" + headline + "</strong></a><hr>");

    }
    // Add div element to the DOM
    $(".news").append($news);
}


/* you can use only http:// protocol because OpenStreetMap works only via http for free */
/* that's why i use https://cors-anywhere.herokuapp.com/ */



function getWeather() {
    //$.get("https://ipapi.co/json", function (data) {
    //    getWeather(data.city);
    //});

    var lat, lon, api_url;
    var apiKey = "59e2552e8cb340c483081480d54a2aca";

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(gotLocation);

        function gotLocation(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log("LATITUD ->",lat,"LONGITUD -> ",lon);
            var api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey + "&JSONP=displayWeather";
            $.ajax({
                url: api_url,
                method: "GET"
            }).then(displayWeather);
        }
    } else {
        alert('Your browser doesnt support geolocation. Sorry.');
    }
}


function displayWeather(data) {
    console.log("WEATHER ->", data);

    var tempr = data.main.temp;
    var location = data.name;
    var desc = data.weather[0].description;
    var icon = data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"
    console.log("ICON  ->", iconUrl);

    $('.city').text(location);
    $('.temp').text(tempr + '°');
    var $weather_icon = $('<img class="icon" src="' + iconUrl +'">');
    $(".city").append($weather_icon);
}