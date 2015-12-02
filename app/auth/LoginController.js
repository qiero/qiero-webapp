(function() {
    var auth = angular.module('auth', ['pouchdb']);
    
    auth.config(function(pouchDBProvider, POUCHDB_METHODS) {
        var authMethods = {
            login: 'qify',
            logout: 'qify'
        };
        pouchDBProvider.methods = angular.extend({}, POUCHDB_METHODS, authMethods);
    });
    
    auth.controller('LoginController', ['pouchDB', function(pouchDB) {
        
        this.username = null;
        this.password = null;
        
        this.db = new PouchDB('http://localhost:5984/_users', {skipSetup: true});
        
        this.login = function() {
            this.db.login(this.username, this.password, function (err, response) {
                if (err) {
                    if (err.name === 'unauthorized') {
                        console.log("Unauthorized!");
                    } else {
                        console.log('Error during login: ' + err);
                    }
                    return;
                }
                
                console.log('Logged in!');
            });
        };
        
    }]);
            
})();

