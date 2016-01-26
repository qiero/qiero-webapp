(function() {

    angular.module('main', [])
        .controller('MainController', function() {
            console.log("Entered MainController");
            this.helloText = "Qiero";
        }
    );

})();
