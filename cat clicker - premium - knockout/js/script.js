var allCats = [{
			name: "Guppie",
			src: "Guppie.jpg",
			nicknames : ['bg', 't*rd', 'babygoose'],
			clickCount: 0 
		},
		{
			name: "Sparksy",
			src: "Sparksy.jpg",
			nicknames : ['bestcat', 'niceguy', 'carrotface'],
			clickCount: 0 
		},
		{
			name: "Leo",
			src: "Leo.jpg",
			nicknames : ['badcat', 'cuddlebug', 'sweetface'],
			clickCount: 0 
		},
		{
			name: "Millie",
			src: "Millie.jpg",
			nicknames : ['orangemonster', 'meowface', 'mousylovesy'],
			clickCount: 0
		}];

var Cat = function(data){
	this.name = ko.observable(data.name);
	this.clickCount = ko.observable(data.clickCount);
	this.src = ko.observable(data.src);
	this.nicknames = ko.observableArray(data.nicknames);
	this.level = ko.computed(function(){
		if (this.clickCount() < 5){
			return "infant";
		}
		else if (this.clickCount() < 20){
			return "child";
		}
		else if (this.clickCount() < 45){
			return "young adult";
		}
		else if (this.clickCount() < 70){
			return "adult";
		}
		else if (this.clickCount() < 100){
			return "senior";
		}
		else{
			return "unknown level";
		}
	}, this);
}

var ViewModel = function(){
	var self = this;
	this.catList = ko.observableArray([]);

	allCats.forEach(function(oneCat){
		self.catList.push(new Cat(oneCat))
	});

	this.currentCat = ko.observable(this.catList()[0]);
	this.incrementClicks = function(){
		this.clickCount(this.clickCount() + 1);
	}
	this.changeCat = function(clickedCat){
		self.currentCat(clickedCat);
	}
}

ko.applyBindings(new ViewModel());