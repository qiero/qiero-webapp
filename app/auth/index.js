var angular = require('angular');

module.exports = angular.module('auth', [])
    .controller('LoginController', function() {
        console.log("Entered LoginController");
    }
);
