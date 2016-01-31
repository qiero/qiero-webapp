(function() {

    angular.module('main', [])
        .controller('MainController', ['$scope', function($scope) {
            console.log("Entered MainController");
            $scope.helloText = "Qiero";
        }]);

})();
