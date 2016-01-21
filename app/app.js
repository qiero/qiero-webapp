var angular = require('angular');
var ngRoute = require('angular-route');

var MainController = require('./main/MainController.js');
var LoginController = require('./auth/LoginController.js');

var app = angular.module('qiero-webapp', ['ngRoute']);
    
app.config([
    '$routeProvider', function($routeProvider) {
        
        $routeProvider.when('/login', {
            templateUrl: 'auth/login.html',
            controller: 'LoginController'
        });
        
        $routeProvider.otherwise({
            templateUrl: 'main/main.html',
            controller: 'MainController'
        });
        
    }
]);
    
app.controller('MainController', ['$scope', MainController]);
app.controller('LoginController', ['$scope', LoginController]);