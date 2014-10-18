$(document).ready(function(){

	var circleColor = $('.bottom').css('background-color');
	var inputColor = $('.caption').css('color');
	var countFont = $('.caption').css('font-family');
	rgb = $('.caption').css('color').match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	var bgColor = 'rgba(' + rgb[1] + ',' + rgb[2] + ',' + rgb[3] + ', 0.15)' ;

	$(".days").knob({
		'readOnly': true,
		'max': daysMaxCount,
		'font': countFont,
		'fgColor': circleColor,
		'inputColor': inputColor,
		'bgColor': bgColor
	});
	$(".hours").knob({
		'readOnly': true,
		'max': 24,
		'font': countFont,
		'fgColor': circleColor,
		'inputColor': inputColor,
		'bgColor': bgColor
	});
	$(".minutes").knob({
		'readOnly': true,
		'max': 60,
		'font': countFont,
		'fgColor': circleColor,
		'inputColor': inputColor,
		'bgColor': bgColor
	});
	$(".seconds").knob({
		'readOnly': true,
		'max': 60,
		'font': countFont,
		'fgColor': circleColor,
		'inputColor': inputColor,
		'bgColor': bgColor
	});

	var eventDate = new Date(year, month-1, day, hour, minute, second);
	//var countdown = document.getElementById("countdown");

	setInterval(function () {
		var currentDate = new Date().getTime();
		var secondsLeft = (eventDate - currentDate) / 1000;

		days = parseInt(secondsLeft / 86400);
		secondsLeft = secondsLeft % 86400;
		if (days > 0) {
			$('#hours').addClass('hidden-xs');
			$('#minutes').addClass('hidden-xs');
			$('#seconds').addClass('hidden-xs');
		} 

		hours = parseInt(secondsLeft / 3600);
		secondsLeft = secondsLeft % 3600;
		if (hours > 0 && days == 0) {
			$('#days').addClass('hidden-xs');
			$('#hours').removeClass('hidden-xs');
			$('#minutes').addClass('hidden-xs');
			$('#seconds').addClass('hidden-xs');
		} 

		minutes = parseInt(secondsLeft / 60);
		if (minutes > 0 && hours == 0 && days == 0) {
			$('#days').addClass('hidden-xs');
			$('#hours').addClass('hidden-xs');
			$('#minutes').removeClass('hidden-xs');
			$('#seconds').addClass('hidden-xs');
		}

		seconds = parseInt(secondsLeft % 60);
		if (seconds > 0 && minutes == 0 && hours == 0 && days == 0) {
			$('#days').addClass('hidden-xs');
			$('#hours').addClass('hidden-xs');
			$('#minutes').addClass('hidden-xs');
			$('#seconds').removeClass('hidden-xs');
		}

		$('.days').val(days).trigger('change');
		$('.hours').val(hours).trigger('change');
		$('.minutes').val(minutes).trigger('change');
		$('.seconds').val(seconds).trigger('change');

		if (seconds <= 0 && minutes <= 0 && hours <= 0 && days <= 0) {
			$("#countdown").html('<p class="finish">' + finishText + '</p>');
		}
	}, 1000)
});
