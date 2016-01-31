(function() {

    var app = angular.module('qiero-webapp', ['ngRoute', 'hoodie', 'main', 'auth']); 
 
    app.config([
        '$routeProvider', 'hoodieProvider', function($routeProvider, hoodieProvider) {
        
            $routeProvider.when('/login', {
                templateUrl: 'auth/index.html',
                controller: 'LoginController'
            });
        
            $routeProvider.otherwise({
                templateUrl: 'main/index.html',
                controller: 'MainController'
            });
            
            hoodieProvider.url('http://localhost:6001');
            
            appCacheNanny.set('loaderPath', '/node_modules/appcache-nanny/appcache-loader.html')
            appCacheNanny.start();
        
        }
    ]);
    
    app.controller('AppController', ['$scope', 'userService', 
        function($scope, userService) {
        
        $scope.isLoggedIn = function() {
            return userService.isLoggedIn();
        };
        
        $scope.logout = function() {
            userService.logout();
        };
        
    }]);

})();
