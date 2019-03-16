// Query topic button 
$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCMJ01rD9Ucqh2KEUE79yEpPMNvanTFGZg",
        authDomain: "louiefirstproject.firebaseapp.com",
        databaseURL: "https://louiefirstproject.firebaseio.com",
        projectId: "louiefirstproject",
        storageBucket: "louiefirstproject.appspot.com",
        messagingSenderId: "940218817270"
    };
    firebase.initializeApp(config);
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var globalUser;
    var userPref;

    //$(document.body).on("click", "#news", function () {
    // Build the query URL for the ajax request to the NYT API
    var queryURL = newsQueryURL();

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePage);
});
/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
function newsQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = {
        "api-key": "XIW58kpN63We5nGfdQE45koBdpNVyKvU"
    };

    // Grab text the user typed into the search input, add to the queryParams object
    //queryParams.q = $("#search-term")
    //    .val()
    //    .trim();
    queryParams.q = "sports";

    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
}


function updatePage(NYTData) {
    // Get from the form the number of results to display
    // API doesn't have a "limit" parameter, so we have to do this ourselves
    var numArticles = 1;

    // Log the NYTData to console, where it will show up as an object
    console.log(NYTData);
    console.log("------------------------------------");
    var divId = 0;
    var div = "";
    // Loop through and build elements for the defined number of articles
    for (var i = 0; i < numArticles; i++) {
        // Get specific article info for current index
        var article = NYTData.response.docs[i];
        var headline = article.headline.main;
        console.log("head line : ", headline);
        var byline = article.byline;
        var section = article.section_name;
        var pubDate = article.pub_date;
        id = "news" + (i + 1);

        var $newsList = $('<div id=' + id + ' class="row" >');

        // Add the newly created element to the DOM
        $("#news").append($newsList);

        if (headline && headline.main) {
            $("#" + id).append("<h5>" + headline + "</h5>");
        }

        if (byline && byline.original) {
            console.log(byline.original);
            //$articleListItem.append("<h5>" + byline.original + "</h5>");
        }

        // Log section, and append to document if exists

        if (section) {
            //$articleListItem.append("<h5>Section: " + section + "</h5>");
        }

        // Log published date, and append to document if exists

        console.log(article.pub_date);
        if (pubDate) {
            //$articleListItem.append("<h5>" + article.pub_date + "</h5>");
        }

        // Append and log url
        //$articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
        console.log(article.web_url);

        // Append the article
        //$articleList.append($articleListItem);
    }
}

// if there is a user signed in the global variable 'globalUser' is equal to the user
// this keeps the user authorization active on all pages
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        globalUser = user;
        // userPref =
        console.log("The logged in user is: " + globalUser.displayName);
    }
});

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            console.log(authResult);

            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById("loader").style.display = "none";
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "preferences.html",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
};
// The start method will wait until the DOM is loaded.

/// talking to firebase to read and write information
var database = firebase.database();

//  Array of possible news preferences
var newsPref = ["Sports", "World", "Politics"];

// Function for displaying news buttons

// This redirects the user to the home page
function Redirect(location) {
    window.location = location;
}

// This is the signout function
$(document).on("click", "#signOutButton", function (event) {
    event.preventDefault();
    firebase
        .auth()
        .signOut()
        .then(function () {
            console.log("Sign-out successful.");
        })
        .catch(function (error) {
            // An error happened.
        });
    Redirect("index.html");
});
var zipCode;
//////  GET IP ADDRESS ///////
var ipAddress;

$.getJSON("https://api.ipify.org?format=json", function (data) {
    ipAddress = data.ip;
});


