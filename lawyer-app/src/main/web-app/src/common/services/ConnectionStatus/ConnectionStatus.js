angular.module('ConnectionStatus', [])

/**
 * Verifica se a conex�o musa de status.
 * Caso mudar, temos que implementar uma solu��o que avise o usu�rio para ele n�o navegar offline sem preenchimento de dados e sem saber o que ocorreu.
 * � igual ao Gmail.
 */
.factory('ConnectionStatus', ['$rootScope', '$window', function ($rootScope, $window) {

    var _online = true;

    return {
        handle : function() {
            _online = navigator.onLine;
            $window.addEventListener("offline", function () {
                $rootScope.$broadcast('ConnectionStatus.CHANGE', _online);
                _online = false;
            }, false);
            $window.addEventListener("online", function () {
                $rootScope.$broadcast('ConnectionStatus.CHANGE', _online);
                _online = true;
            }, false);
        },

        get : function () {
            return _online;
        }
    };
}])
;

