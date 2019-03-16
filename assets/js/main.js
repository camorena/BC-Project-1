<<<<<<< HEAD
// Query topic button 
$(document).ready(function () {
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
        console.log("head line : ",headline);
        var byline = article.byline;
        var section = article.section_name;
        var pubDate = article.pub_date;
        id = "news" + (i+1);

        var $newsList = $('<div id='+ id + ' class="row" >');

    // Add the newly created element to the DOM
    $("#news").append($newsList);

        if (headline && headline.main) {
            $("#"+id).append("<h5>" + headline + "</h5>");
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
=======
//alert("Hi Brian!");

//console.log("Hi Brian!");
>>>>>>> 3d897bcef0505f50d49872a8bc2ad4788bc5872f
