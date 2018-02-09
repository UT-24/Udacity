var map, koViewModel;
var Model = {
	allMarkerInfos : [{
		position: {lat: 33.732814, lng:-84.345038},
		title: "Home",
		content: "Uthra Ramaswamy lives here."
	},
	{
		position: {lat: 33.740386, lng:-84.34542},
		title: "Joe's Coffee Shop",
		content: "Popular coffee shop in East Atlanta Village"
	},
	{
		position: {lat: 33.739481, lng:-84.344303},
		title: "The Midway Pub",
		content: "Popular bar in East Atlanta Village"
	},
	{
		position: {lat: 33.734098, lng: -84.372268},
		title: "Zoo Atlanta",
		content: "Located in Grant Park.  Houses Kangaroos, Pandas and other non-dog animals."
	},
	{
		position: {lat: 33.756767, lng: -84.364034},
		title: "Krog Street Market",
		content: "Gives Ponce City Market a run for its money."
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
				var infoWindow = new google.maps.InfoWindow({
					content: markerInfo.content
				});
				
				//when marker is clicked on map, it should open an info window and drop in map
				marker.addListener("click", function(){
         			 marker.setAnimation(google.maps.Animation.DROP);	 
       				 infoWindow.open(map, marker);
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

				return filteredArray;
		}
	}, self);
}

//this view is just to manage the map
var View1 = {
	init: function(){
			map = new google.maps.Map(document.getElementById('map'), {
			center:{lat:33.732337, lng:-84.344759},
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

			

