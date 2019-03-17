$(document).ready(function () {
    var zipCode;
    var ipAddress;
    var newsUrl = newsQueryURL();

    // Ajax call to get news from NYT
    $.ajax({
        url: newsUrl,
        method: "GET"
    }).then(displayNews);
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
    var numHeadLines = 4 ;
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