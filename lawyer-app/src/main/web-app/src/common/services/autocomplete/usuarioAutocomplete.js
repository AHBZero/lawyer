angular.module('usuarioAutocomplete', [])

    .factory('usuarioAutocomplete', ['$http', function ($http) {

        var lastResult = [];
        var lastQuery = null;
        return {
            query: function (value) {
                if (value.toLowerCase().indexOf(lastQuery) !== -1 && lastResult.length < 8) {
                    return lastResult;
                }
                lastQuery = value.toLowerCase();
                return $http.get('/lawyer/api/usuarios?q=' + value + '&page=0&limit:5')
                    .then(function (results) {
                        lastResult = results.data.content;
                        return lastResult;
                    });
            }
        };
    }])

;

