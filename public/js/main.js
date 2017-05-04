angular.module('App', []);

var app = angular.module('App', []);

angular.module('App')
	.controller('mainController', ['$scope', '$http', function($scope, $http){


$(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },

            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');

            var forms = document.getElementById("contact_form");
            forms.reset();
        });
    });

// Trade and Barter Pop Up 
	$scope.part1 = true;
	$scope.part2 = false; 

	$scope.slide1 = function() {
		$scope.part1 = !$scope.part1;
		$scope.part2 = !$scope.part2;
	}

// Invest or Raise Pop up 
	$scope.questionnaire = true;
	$scope.investModel = false;

	$scope.slide2 = function() {
		$scope.questionnaire = !$scope.questionnaire;
		$scope.investModel = !$scope.investModel;
	}

	$scope.invest1 = true;
	$scope.invest2 = false;
	$scope.invest3 = false;


	$scope.continue1 = function() {
		$scope.invest1 = !$scope.invest1; 
		$scope.invest2 = !$scope.invest2;
	}

	$scope.continue2 = function() {
		$scope.invest2 = !$scope.invest2; 
		$scope.invest3 = !$scope.invest3;
	}









	$scope.question1 = true;
	$scope.question2 = false;
	$scope.question3 = false;
	$scope.question4 = false;


	$scope.next1 = function() {
		$scope.question1 = false; 
		$scope.question2 = true;


		var checkedValue1 = $('.checked1:checked').val();
	    document.getElementById("tp").innerHTML = checkedValue1;
		var checkedValue2 = $('.checked2:checked').val();
	    document.getElementById("fw").innerHTML = checkedValue2;
		var checkedValue3 = $('.checked3:checked').val();
	    document.getElementById("lm").innerHTML = checkedValue3;
		var checkedValue4 = $('.checked4:checked').val();
	    document.getElementById("oc").innerHTML = checkedValue4;
		var checkedValue5 = $('.checked5:checked').val();
	    document.getElementById("sc").innerHTML = checkedValue5;


	}

	$scope.next2 =function() {
		$scope.question2 = false; 
		$scope.question3 = true;
	}

	$scope.next3 = function() {
		$scope.question3 = false; 

	}
	
}])

app.directive('ngLightbox', ['$compile', function($compile) {
    return function(scope, element, attr) {
        var lightbox, options, overlay;

        var defaults = {
            'class_name': false,
            'trigger': 'manual',
            'element': element[0],
            'kind': 'normal'
        }

        var options = angular.extend(defaults, angular.fromJson(attr.ngLightbox));
        
        // check if element is passed by the user
        options.element = typeof options.element === 'string' ? document.getElementById(options.element) : options.element;

        var add_overlay = function(){
            if(document.getElementById('overlay')) return;
            // compiling when we add it to have the close directive kick in
            overlay = $compile('<div id="overlay" ng-lightbox-close/>')(scope);
            
            // add a custom class if specified
            options.class_name && overlay.addClass(options.class_name);

            // append to dom
            angular.element(document.body).append(overlay);

            // load iframe options if defined
            options.kind === 'iframe' && load_iframe();

            // we need to flush the styles before applying a class for animations
            window.getComputedStyle(overlay[0]).opacity;
            overlay.addClass('overlay-active');
            angular.element(options.element).addClass('lightbox-active');
        }

        var load_iframe = function(){
            options.element = options.element || 'lightbox-iframe';
            var iframe = "<div id='" + options.element + "' class='lightbox'><iframe frameBorder=0 width='100%' height='100%' src='" + attr.href + "'></iframe></div>";
            angular.element(document.body).append(iframe)
        }

        if(options.trigger === 'auto'){
            add_overlay();
        }else{
            element.bind('click', function(event) {
                add_overlay();
                event.preventDefault();
                return false;
            });
        }
    }
}]);

app.directive('ngLightboxClose', function() {
    return function(scope, element, attr) {
        var transition_events = ['webkitTransitionEnd', 'mozTransitionEnd', 'msTransitionEnd', 'oTransitionEnd', 'transitionend'];
        
        angular.forEach(transition_events, function(ev){
            element.bind(ev, function(){
                // on transitions, when the overlay doesnt have a class active, remove it
                !angular.element(document.getElementById('overlay')).hasClass('overlay-active') && angular.element(document.getElementById('overlay')).remove();
            });
        });

        // binding esc key to close
        angular.element(document.body).bind('keydown', function(event){
            event.keyCode === 27 && remove_overlay();
        });

        // binding click on overlay to close
        element.bind('click', function(event) {
            remove_overlay();
        });

        var remove_overlay = function(){
            var overlay = document.getElementById('overlay');
            angular.element(document.getElementsByClassName('lightbox-active')[0]).removeClass('lightbox-active');

            // fallback for ie8 and lower to handle the overlay close without animations
            if(angular.element(document.documentElement).hasClass('lt-ie9')){
                angular.element(overlay).remove();
            }else{
                angular.element(overlay).removeClass('overlay-active');
            }
        }
    }
});





// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});



