(function() {

    var authModule = angular.module('auth', []);
        
    authModule.service('userService', ['hoodieAccount', function(hoodieAccount) {
            
        this.isLoggedIn = function() {
            if (hoodieAccount.username) {
                return true;
            } else {
                return false;
            }
        };

        this.login = function(username, password) {
            hoodieAccount.signIn(username, password)
                .done(function (accountProperties) {
                    return true;
                }).fail(function (error) {
                    return false;
            });
        };

        this.logout = function() {
            hoodieAccount.signOut()
                .done(function (accountProperties) {
                    console.log("Successfully logged out " + accountProperties);
                    return true;
                })
                .fail(function (error) {
                    console.log("Error during logging out: " + error);
                    return false;
                });
        };

    }]);
        
    authModule.controller('LoginController', ['$scope', '$location', 'userService', 
        function($scope, $location, userService) {
            
            $scope.login = function() {
                console.log("Login attempt for username: " + $scope.username);
                
                var success = userService.login($scope.username, $scope.password);
                
                $scope.username = "";
                $scope.password = "";
                
                if (success) {
                    $location.path('/');
                } else {
                    $location.path('/login');
                }
            };
            
            $scope.isLoggedIn = function() {
                return userService.isLoggedIn();
            };
            
            console.log("Entered LoginController");
            
            if ($scope.isLoggedIn()) {
                $location.path('/');
            }
            
            $scope.username = "";
            $scope.password = "";
        }
    ]);

})();