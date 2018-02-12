var map, koViewModel;
var Model = {
	allMarkerInfos : [{
		position: {lat: 33.732814, lng:-84.345038},
		title: "Home",
		content: "Uthra Ramaswamy lives here."
	},
	{
		position: {lat: 33.758665, lng:-84.391449},
		title: "Tabernacle ATL",
		content: "One of the best music venues in ATL."
	},
	{
		position: {lat: 33.755889,  lng:-84.401064},
		title: "Mercedes Benz Stadium",
		content: "Brand new venue for ATL sports!"
	},
	{
		position: {lat: 33.734098, lng: -84.372268},
		title: "Zoo Atlanta",
		content: "Located in Grant Park.  Houses Kangaroos, Pandas - occasionally a dog or cat gets in."
	},
	{
		position: {lat: 33.756767, lng: -84.364034},
		title: "Krog Street Market",
		content: "Like Ponce City Market.."
	},
	{
		position: {lat: 33.771946, lng: -84.366527},
		title: "Ponce City Market",
		content: "Like Chelsea Market.."
	},
	{
		position: {lat: 33.772585, lng: -84.385603},
		title: "Fox Theater",
		content: "For all your theater needs."
	},
	{
		position: {lat: 33.785765, lng: -84.374271},
		title: "Piedmont Park",
		content: "Home of the Dogwood Festival."
	}
  ]
};

var ViewModel = function() {
	var self = this;
	self.currentFilter = ko.observable();
	self.markersList = ko.observableArray([]);

	self.init = function(){
			//get map ready
			View1.init();
			//get list ready
			View2.init();
			//create markers for each location in model, and set it on map
			self.getMarkerInfos().forEach(function(markerInfo){
				var marker = new google.maps.Marker({
					position: markerInfo.position,
					map: map,
					title: markerInfo.title,
				});

				self.markersList.push(marker);
				
				//when marker is clicked on map, it should open an info window and drop in map
				marker.addListener("click", function(){
         			 marker.setAnimation(google.maps.Animation.DROP);	 
         			 self.updateContentWithGeocode(markerInfo);				 
				});
			});
	};

	//get all markers stored in the model
	self.getMarkerInfos = function(){
		return Model.allMarkerInfos;
	};

	//marker should drop down on map when its list item is clicked
	self.animateMarker = function(clickedMarker){
		clickedMarker.setAnimation(google.maps.Animation.DROP);	
		self.getMarkerInfos().forEach(function(markerInfo){
			if (markerInfo.title === clickedMarker.title){
				 self.updateContentWithGeocode(markerInfo);		
			}
		});
	} 

	// for the first time, calculate filter list as just the marker list (no filter)
	// from subsequent times, when selection changes, filter out array values that are not the selected value
	self.filterList = ko.computed(function() {
	if (!self.currentFilter()) {
			return self.markersList();
	} else {
				var filteredArray = ko.utils.arrayFilter(self.markersList(), function(marker) {
					return (self.currentFilter().title === marker.title);
 				});

 				self.updateMarkersBasedOnFilter(self.currentFilter());
				return filteredArray;
		}
	}, self);

	self.updateMarkersBasedOnFilter = function(selectedMarker){
		self.markersList().forEach(function(marker){
			if (marker.title !== selectedMarker.title){
				marker.setMap(null);
			}
			else {
				marker.setMap(map);
			}
		});
	}

	self.updateContentWithGeocode = function(markerInfo){
		var geocoder  = new google.maps.Geocoder();             // create a geocoder object         
		geocoder.geocode({location: markerInfo.position}, function (results, status) {
			if(status == google.maps.GeocoderStatus.OK) {           // if geocode success
				address = results[0].formatted_address;  
				var updatedContent = "<p>" + markerInfo.content + "</p>" + 
							"<p> Location: " + address + "</p>";
         		self.getWikiResults(markerInfo.title, updatedContent);    
			}   
		});  
	}

	self.getWikiResults = function(title, content){
	var windowContent = content;
	//get wikipedia entry for the location
    var wikiRequestTimeout = setTimeout(function(){
    	windowContent += "<p>Wiki entry for " + title + " could not be fetched.</p>";
    	self.updateInfoWindow(title, windowContent);
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
			self.updateInfoWindow(title, windowContent);
	    	clearTimeout(wikiRequestTimeout);
    	}
	});
  }

  self.updateInfoWindow = function(title, windowContent){
  	self.markersList().forEach(function(marker) {
  		if (marker.title === title) {
  			var infoWindow = new google.maps.InfoWindow({
  				"content": windowContent
  			});
  			infoWindow.open(map, marker);
  		}
  	});
  }
}

//this view is just to manage the map
var View1 = {
	init: function(){
			map = new google.maps.Map(document.getElementById('map'), {
			center:{lat:33.758665, lng:-84.391449},
			zoom: 13
		});
	}
};

//this view is only concerned with the list
var View2 = {
	init: function(){
		$(".hb").click(function(){
			$(".menu").removeClass("menu-hide");
    		$(".menu").addClass("menu-show");
		});
		$(".close").click(function(){
    		$(".menu").addClass("menu-hide");
    		$(".menu").removeClass("menu-show");
		});
	}
};

//when google maps API call returns, we can create our view model and 
//initialize and make html bindings
function initApp(){
	koViewModel = new ViewModel();
	koViewModel.init();
	ko.applyBindings(koViewModel);
}

			

