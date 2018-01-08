
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetDetails = $("#street").val();
    var cityDetails = $("#city").val();
    var address = streetDetails + ", " + cityDetails;
    var urlString = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+ address;
    $body.append("<img class='bgimg' alt='home' src=" + urlString + ">");
    $greeting.text("So you want to live at " + address + "?");

    //load NY Times Articles
	var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	nytURL += '?' + $.param({
  	'api-key': "f726bb30d0054a4fa1f00d62ad9cc439",
  	'q': cityDetails
	});
    $.getJSON(nytURL, function(data)
    {
    	var items = [];
    	$nytHeaderElem.text("New York Times Article About " + cityDetails);
    	var resultArray = data.response.docs;

    	$.each(resultArray, function(key,value)
    	{
    		var htmlItem = "<li class='article'>" + 
    					   "<a href='" + value.web_url +"'> " + value.headline.main + "</a>"+
    					   "<p>" + value.snippet + "</p>" +
    					   "</li>";
    		items.push(htmlItem);
    	});
        $nytElem.append(items.join(""));
    }).error(function()
    {
    	$nytHeaderElem.text("New York Times Article Could Not Be Loaded");
    });

    //load wikipedia articles
    var wikiRequestTimeout = setTimeout(function(){
    	$wikiElem.text("Failed to get wikipedia resources");
    }, 8000);

    var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=wikiCallback&search=" + cityDetails; 
    $.ajax(wikiURL, {
    	"dataType" : "jsonp",
    	"success": function(data, textStatus, jQXHR){
    		var items = [];
    		var resultArray = data[1];

	    	$.each(resultArray, function(key,value) {
	    		var href = "http://en.wikipedia.org/" + value;
	    		var htmlItem = "<li> <a href='" + href +"'>" + value + "</a> </li>";
	    		items.push(htmlItem);
	    	});

	    	 $wikiElem.append(items.join(""));
	    	 clearTimeout(wikiRequestTimeout);
    	}
	});

    return false;
};

$('#form-container').submit(loadData);
