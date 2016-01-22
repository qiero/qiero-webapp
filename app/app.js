var angular = require('angular');
var ngRoute = require('angular-route');

var main = require('./main');
var auth = require('./auth');  

var app = angular.module('qiero-webapp', ['ngRoute', main.name, auth.name]); 
 
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
