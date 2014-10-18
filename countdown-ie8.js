$(document).ready(function(){

	//var circleColor = $('.bottom').css('background-color');
	//var inputColor = $('.caption').css('color');
	//var countFont = $('.caption').css('font-family');
	//rgb = $('.caption').css('color').match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	//var bgColor = 'rgba(' + rgb[1] + ',' + rgb[2] + ',' + rgb[3] + ', 0.15)' ;

	var eventDate = new Date(year, month-1, day, hour, minute, second);
	//var countdown = document.getElementById("countdown");

	setInterval(function () {
		var currentDate = new Date().getTime();
		var secondsLeft = (eventDate - currentDate) / 1000;

		secondsLeft = parseInt(secondsLeft);

		var days = parseInt(secondsLeft / 86400);
		secondsLeft = secondsLeft % 86400;

		var hours = parseInt(secondsLeft / 3600);
		secondsLeft = secondsLeft % 3600;

		var minutes = parseInt(secondsLeft / 60);

		var seconds = parseInt(secondsLeft % 60);


		$('#days').html(days);
		$('#hours').html(hours);
		$('#minutes').html(minutes);
		$('#seconds').html(seconds);

		if (seconds <= 0 && minutes <= 0 && hours <= 0 && days <= 0) {
			$("#countdown").html('<p class="finish">' + finishText + '</p>');
		}
	}, 1000)
});
