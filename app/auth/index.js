var angular = require('angular');
var Hoodie = require('hoodie-client');

module.exports = angular.module('auth', [])
    .controller('LoginController', function() {
        console.log("Entered LoginController");
        this.hoodie = new Hoodie();
    }
);
