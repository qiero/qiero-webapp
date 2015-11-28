(function() {

    var app = angular.module('qiero-webapp', [
        'ngRoute',
        'main',
        'auth'
    ]);
    
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

})();
