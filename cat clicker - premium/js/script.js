$(function(){
	var model = {
		cats : [{
			name: "Guppie",
			src: "Guppie.jpg",
			clicks: 0 
		},
		{
			name: "Sparksy",
			src: "Sparksy.jpg",
			clicks: 0 
		},
		{
			name: "Leo",
			src: "Leo.jpg",
			clicks: 0 
		}]
	};

	var octopus = {
		init: function(){
			view1.init();
			view2.init();
			var currentCat = this.getCats()[0];
			view2.render(currentCat);
		},
		getCats: function() {
			return model.cats;
		},
		updateClicks: function(catName){
			this.getCats().forEach(function(cat){
				if(cat.name === catName){
					cat.clicks++;
					view2.render(cat);
				}
			});
		}
	};

	var view1 = {
		init: function(){
            var htmlStr = '';
            octopus.getCats().forEach(function(cat){
                htmlStr += '<li> <a href="#" class="catLink">'+
                        cat.name +
                    '</a></li>';
            });
            $("#catlist").html(htmlStr);
		}
	};

	var view2 = {
		init: function(){
			$('.catLink').click(function(){
				var catName = $(this).text();
				octopus.getCats().forEach(function(cat){
					if (cat.name === catName){
						view2.render(cat);
					}
				});
			});
			$("#i1").click(function(){
				var catName = $("#n1").text();
				octopus.updateClicks(catName);
			});
		},
		render: function(cat){
			$("#i1").attr("src", cat.src);
			$("#n1").text(cat.name);
			$("#c1").text(cat.clicks);
		}
	};

	octopus.init();
});
