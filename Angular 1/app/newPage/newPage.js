//IFE imidiately invoke function expression
// wrap this in a function if you want it to fun on load
// it also makes vairables local to this specific file
// keeps it seperate

'use strict'; //ecma it is a javascript standard. ecma 5 has this feature. If there is common error patterns your browser  will tell you your errors

angular.module('myApp.newPage', ['ngRoute'])

// looks for NewPageCtrl controller in the same module.
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/newPage', {
    templateUrl: 'newPage/newPage.html',
    controller: 'NewPageCtrl'
  });
}])

// Square brackets are for dependancy injection.
// This is the correct format that needs to be done for the 
// minifiy process to work.

// Minify replaces variable names, so that way angular will still work after.
// ng-inject will also work

.controller('NewPageCtrl', ['$scope', 
	function($scope) {
	$scope.msg = "This Message is in the Controller";
}])

//Default restict is Element and Attribute
//Link runs after all the directives run
// template replaces everything in between those element tags.
// if we want to keep the content inside the directive their, we use the transclude property.
// don't pass string in the transclude
// replace removes the directive tags from the DOM if replace is true
//For safety reasons, during development, replace value is true.
.directive('demoOne', function(){
		return{
			restrict: 'E',
			replace: false,
			template: '<br><span>Hello this is in the Directive Object Model</span>',
			controller: function($scope){
				$scope.anotherMessage = 'Buisness Logic is usally in the controller portion';
			},
			link: function($scope, element, attrs){
				alert('How are you');
			}
		};
	})
// Template 
.directive('demoURL', function(){
	return{
		scope: false,
		templateUrl:'example.html',
		controller: function($scope){
			$scope.directiveVal = 'directive val'
		}
	};
})
// use = for 2 way binding and @ for one way binding. in the passedObj. In one way binding you, you need to evalate it with the $eval()
// a function can also be passed by & so that the function can be called by a isolate directive.
.directive('demoURLPassedObj', function(){
	return{
		scope: {passedObj: '=obj'},
		templateUrl:'example.html',
		controller: function($scope){
			$scope.directiveVal = 'directive val'
		}
	};
})



// You can have pre and post links which operate in a different order.
// you can pass the controller function of another directive with the require parameter.

// if you have multiple directives on the same element
// the order different directives are executing their compile function can be changed with the priority parameter from higher to lower
// there is a terminal parameter that will stop the execution of the other parameters

//require: 'demoURL', // Needs to be a controller


.directive('rogersDirective', function(){
		return{
			restrict: 'EA',
			template: '<div>{{greeting1}}{{name1}}</div>',
			link: {
				post: function(scope, element, attrs, ctrl){
					scope.name1 = 'Rogers.com'
					scope.greeting1= 'Hey, I am '
					//ctrl.directiveVal can be accessed
				}
			}
		};
	})
// if transclude is element, the template is not gonna show up
//			transclude: element,

.directive('demoOneWithTransclude', function(){
		return{
			restrict: 'E',
			template: '<br><span>Hello this is in transclude</span>',
			link: function($scope, element, attrs){
				alert('How are you');
			}
		};
	});
