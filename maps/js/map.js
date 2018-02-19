var map, koViewModel;

// store information about map locations we want to highight
var Model = {
	allMarkerInfos : [{
		position: {lat: 33.732814, lng:-84.345038},
		title: "Home",
		content: "Uthra, Samir and Guppie live here."
	},
	{
		position: {lat: 33.758665, lng:-84.391449},
		title: "Tabernacle ATL",
		content: "Uthra and Samir attended a Kaleo concert here, Fall 2017."
	},
	{
		position: {lat: 33.757289,  lng:-84.396324},
		title: "Philips Arena",
		content: "Uthra watched her first Hawks game here."
	},
	{
		position: {lat: 33.734098, lng: -84.372268},
		title: "Zoo Atlanta",
		content: "Uthra felt at peace observing the Kangaroos and Pandas."
	},
	{
		position: {lat: 33.756767, lng: -84.364034},
		title: "Krog Street Market",
		content: "Varuni Napoli is as good as Antico."
	},
	{
		position: {lat: 33.771946, lng: -84.366527},
		title: "Ponce City Market",
		content: "Every beltline walk leads to Ponce City Market."
	},
	{
		position: {lat: 33.772585, lng: -84.385603},
		title: "Fox Theater ATL",
		content: "Uthra's first Year Up Atlanta graduation was here (Jan 2015)."
	},
	{
		position: {lat: 33.785765, lng: -84.374271},
		title: "Piedmont Park",
		content: "Uthra and Samir always had a fun time at the Dogwood Festival dog show."
	},
	{
		position: {lat: 33.759384, lng: -84.363975},
		title: "Beltline ATL",
		content: "Uthra trained here every week for her first marathon."
	},
	{
		position: {lat: 33.756286, lng: -84.356226},
		title: "Inman Park",
		content: "Uthra and Samir's wedding reception was at The Trolley Barn, best party ever!"
	},
	{
		position: {lat: 33.753254, lng: -84.395773},
		title: "Richard B. Russell Federal Building",
		content: "Samir works here. Uthra and Samir also got married here."
	},
	{
		position: {lat: 33.747495, lng: -84.375098},
		title: "Oakland Cemetery Atlanta",
		content: "Start venue for the St.Patrick's Day ATL Pub Run (organized by Samir and friends)"
	},
	{
		position: {lat: 33.740597, lng: -84.346975},
		title: "East Atlanta Village",
		content: "Endless hours have been spent by Uthra, Samir and Guppie at: EAAC, EAV Fitness, Argosy, Holy Taco, Tomatillos, We Suki Suki, Midway and Joe's Coffee Shop!"
	},
  ]
};

var ViewModel = function() {
	var self = this;
	self.currentFilter = ko.observable();
	self.markersList = ko.observableArray([]);
	self.infoWindow = new google.maps.InfoWindow({
  					"content": ""
  				});

	// called after google maps api returns
	self.init = function(){
			//get map ready
			View1.init();
			// get list ready
			View2.init();
			// create markers for each location in model, and set it on map
			self.getMarkerInfos().forEach(function(markerInfo){
				var marker = new google.maps.Marker({
					position: markerInfo.position,
					map: map,
					title: markerInfo.title
				});

				self.markersList.push(marker);
				
				// when marker is clicked on map, it should drop in map and fetch content for info window 
				marker.addListener("click", function(){
         			 marker.setAnimation(google.maps.Animation.DROP);	 
         			 self.updateContentWithAddress(markerInfo);				 
				});
			});
	};

	// get all markers stored in the model
	self.getMarkerInfos = function(){
		return Model.allMarkerInfos;
	};

	// marker should drop down on map when its list item is clicked
	// we should also fetch content for creating the info window
	self.animateMarker = function(clickedMarker){
		clickedMarker.setAnimation(google.maps.Animation.DROP);	
		self.getMarkerInfos().forEach(function(markerInfo){
			if (markerInfo.title === clickedMarker.title){
				 self.updateContentWithAddress(markerInfo);		
			}
		});
	};

	// for the first time, calculate filter list as just the marker list (no filter)
	// from subsequent times, when selection changes, filter out array values that are not the selected value
	// and update visible markers
	// reference for filter:  http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
	self.filterList = ko.computed(function() {
		if (!self.currentFilter()) {	
			self.markersList().forEach(function(marker){
				marker.setMap(map);
			});

			return self.markersList();
		} 
		else {
				var filteredArray = ko.utils.arrayFilter(self.markersList(), function(marker) {
					return (self.currentFilter().title === marker.title);
 				});

 				self.updateMarkersBasedOnFilter(self.currentFilter());
				return filteredArray;
		}
	}, self);

	// this function is called when a filter is applied to 
	// update visible markers, based on selected filter
	self.updateMarkersBasedOnFilter = function(selectedMarker){
		self.markersList().forEach(function(marker){	
			if (marker.title !== selectedMarker.title){
				marker.setMap(null);
			}
			else {
				marker.setMap(map);
			}
		});
	};

	// when a marker is clicked, or list item is clicked, we want to 
	// fetch and show the address for a given lat lng pair in the info window
	// reference for geocode:  https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
	self.updateContentWithAddress = function(markerInfo){
		// the geocoder is the one who can look up addresses for lat lng pairs
		var geocoder = new google.maps.Geocoder();               
		var address;
		geocoder.geocode({location: markerInfo.position}, function (results, status) {
			if(status === google.maps.GeocoderStatus.OK) {           
				address = results[0].formatted_address;  
			}
			else {
				address = "Unable to resolve this location's address.";
			}
			
			var updatedContent = "<p>" + markerInfo.title + ": " + markerInfo.content + "</p>" + 
							"<p> Location: " + address + "</p>";
			// after updating address, we can proceed to getting wiki results
         	self.getWikiResults(markerInfo.title, updatedContent);    
		});  
	};

	// this function is used to get the wikipedia link for a given location's title
	// reference for wiki lookup: the udacity ajax request lesson
	self.getWikiResults = function(title, content){
		var windowContent = content;

		// get wikipedia entry for the location, providing a timeout and error message 
		// for info window if your request does not return within timeout
	    var wikiRequestTimeout = setTimeout(function(){
	    	windowContent += "<p>Wiki entry for " + title + " could not be fetched.</p>";
	    	self.showInfoWindow(title, windowContent);
	    }, 2000);

	    var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=wikiCallback&search=" + title; 
	    $.ajax(wikiURL, {
	    	"dataType" : "jsonp",
	    	"success": function(data, textStatus, jQXHR){
		    		var wikiLink = data[3];
			    	var href = wikiLink[0];
			    	var htmlItem = "<p> <a href='" + href +"'>" + title + "</a> </p>";
					windowContent+= "<p> Wiki Entries for " + title + ":</p>";
					windowContent += htmlItem;

					// once the window's content has been fully formed, call function to open the window
					self.showInfoWindow(title, windowContent);
			    	clearTimeout(wikiRequestTimeout);
		    }
		});
  	};

  	// after you get the wikipedia and address content, create and open the marker's info window
  	self.showInfoWindow = function(title, windowContent){
  		self.markersList().forEach(function(marker) {
  			if (marker.title === title) {
  				self.infoWindow.setContent(windowContent);
  				self.infoWindow.open(map, marker);
  			}
  		});
  	};
};

// this view is just to manage the map
var View1 = {
	init: function(){
			map = new google.maps.Map(document.getElementById('map'), {
			center:{lat:33.758665, lng:-84.391449},
			zoom: 13
		});
	}
};

// this view is only concerned with the list
var View2 = {
	init: function(){
		$(".hamburger").click(function(){
			$(".menu").removeClass("menu-hide");
    		$(".menu").addClass("menu-show");
		});
		$(".close").click(function(){
    		$(".menu").addClass("menu-hide");
    		$(".menu").removeClass("menu-show");
		});
	}
};

// when google maps API call returns, we can create our view model and 
// initialize and make html bindings
function initApp(){
	koViewModel = new ViewModel();
	koViewModel.init();
	ko.applyBindings(koViewModel);
}

function displayMapLoadError(){
	$('#map').html("<h3 class='error'> Unable to load map from google.  Please try again later. </h3>");
}
			

