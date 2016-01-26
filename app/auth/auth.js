(function() {

    angular.module('auth', [])
        .controller('LoginController', ['hoodieAccount', function(hoodieAccount) {
            console.log("Entered LoginController");
            hoodieAccount.signIn('test', 'test')
                .then(function (sth) {
                    alert('Logged in: ' + sth)
                }).catch(function (error) {
                    alert(error)
                });
        }
    ]);

})();