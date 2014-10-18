$(document).ready(function() {
   	$('.tooltip').tooltipster({
   		animation: 'grow',
   		position: 'top',
   		theme: '.tooltips',
   		touchDevices: false,
	});
});

function checkEmail() {
    var email = document.getElementById('email');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})/;

	$('.email-tooltip').tooltipster({
   		animation: 'grow',
   		position: 'top',
   		theme: '.email-tooltips',
   		timer: 2500
	});

	$('.email-tooltip').tooltipster('enable');

	if (email.value == '') {
		$('.email-tooltip').tooltipster('update', blankEmail);
		$('.email-tooltip').tooltipster('show');
    	return false;
	} else {
    	if (!filter.test(email.value)) {
    		$('.email-tooltip').tooltipster('update', wrongEmail);
			$('.email-tooltip').tooltipster('show');
			return false;
		} else {
			$('.email-tooltip').tooltipster('disable');
			return email.value;
		}
	}
 };

function subscribe() {
	email = checkEmail();
	if (email != '') {
		$('#send').html('<i class="icon-spinner icon-spin send-icon"></i>');
		$.post('php/subscribe.php', {email: email},
			function(data) {
				$("#subscribe-form").fadeOut("slow");
				$('#subscribe-response').fadeIn("slow");
				$('#subscribe-response').html(data);
			}
		);
	}
}

function showForm() {
	$("#subscribe-response").fadeOut("slow");
	$('#subscribe-form').fadeIn("slow");
}

/* Google Analytics */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

ga('create', googleAnalyticsId, googleAnalyticsUrl);
ga('send', 'pageview');
