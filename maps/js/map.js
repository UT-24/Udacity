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
		content: "Gives PCM a run for its money.  Yet another Chelsea Market type thing."
	}
  ]
};

var ViewModel = function() {
	var self = this;
	self.init = function(){
			View1.init();
			View2.init();
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
				
				marker.addListener("click", function(){
         			 marker.setAnimation(google.maps.Animation.DROP);	 
       				 infoWindow.open(map, marker);
				});
			});
	};

	self.getMarkerInfos = function(){
		return Model.allMarkerInfos;
	};

	self.animateMarker = function(clickedMarker){
		clickedMarker.setAnimation(google.maps.Animation.DROP);	
	}

	self.markersList = ko.observableArray([]);
}

var View1 = {
	init: function(){
			map = new google.maps.Map(document.getElementById('map'), {
			center:{lat:33.732337, lng:-84.344759},
			zoom: 13
		});
	}
};

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

function initApp(){
	koViewModel = new ViewModel();
	koViewModel.init();
	ko.applyBindings(koViewModel);
}

			

