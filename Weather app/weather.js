var myapp = angular.module('myapp',['ngRoute','ngResource']);

myapp.config(function($routeProvider) {
	
	$routeProvider
	
	.when( '/', {
		  
		  
		  templateUrl: 'pages/first.html',
		  controller: 'maincontroller'
		  
		  
		  })
		  
	.when('/second',{
		
		
		templateUrl:'pages/second.html',
		controller:'resultcontroller'
	})	
	
 });


//services

 myapp.service('cityservice', function(){
	 
	 
	 this.city='Bangalore';
	 
	 
	 
 } )

//controllers
myapp.controller('maincontroller', function($scope,cityservice){
	
	
	$scope.city = cityservice.city;
	$scope.$watch ('city', function(){
		
		cityservice.city= $scope.city;
		
	});
	
	
	
	
});

myapp.controller('resultcontroller', function($scope,$resource ,cityservice){
	
	 $scope.city = cityservice.city;
	
	$scope.weatherapi= $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK" },{get:{method:"JSONP"}});
	
	$scope.weatherResult= $scope.weatherapi.get({q:$scope.city, cnt:2});
	console.log($scope.weatherResult);
	
});