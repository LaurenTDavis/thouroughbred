angular.module('App', []);


angular.module('App')
	.controller('mainController', ['$scope', '$http', function($scope, $http){
	function collapseNavbar() {
    if ($(".navbar").offset().top > 100) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});



function ValidateForm(frm) {
	if (frm.Name.value == "") { 
		alert('Name is required.'); 
		frm.Name.focus(); 
		return false; 
	}
	if (frm.FromEmailAddress.value == "") { 
		alert('Email address is required.'); 
		frm.FromEmailAddress.focus(); 
		return false; 
	}
	if (frm.FromEmailAddress.value.indexOf("@") < 1 || frm.FromEmailAddress.value.indexOf(".") < 1) { 
		alert('Please enter a valid email address.'); 
		frm.FromEmailAddress.focus(); 
		return false; 
	}
	return true; 
}


	
}])

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});



