/**
 * @ngdoc object
 * @name lawyer.app
 * @description
 * Esse � o modulo de entrada da aplicacao.
 *
 * Aqui est�o registrados alguns mapeamentos iniciais e o carregamento dos m�dulos dependentes para o aplicativo funcionar.
 *
 * <strong>Servi�os gerais do aplicativo devem ser carregados aqui, para evitar depend�ncias c�clicas em m�ltiplos carregamento de m�dulos.</strong>
 *
 * Possui o registro para o `$urlRouterProvider` que intercepta as requisi��es n�o autorizadas retornadas do server.
 * Configura o {@link laywer.auth} para recuperar o usu�rio gravado no cookie.
 * Mant�m o listener para o {@link ConnectionStatus} que notifica o usu�rio caso ele esteja offline no momento.
 */
angular.module('lawyer', [
        'ngAnimate',
        'ngLocale',
        'templates-app',
        'templates-common',
        'ui.router',
        'ui.bootstrap',
        'lawyer.controllers',
        'lawyer.connectionStatus',
        'lawyer.accessLevel',
        'services.notifications',
        'services.httpRequestTracker',
        'services.breadcrumbs',
        'i18n.Constants',
        'services.exceptionHandler',
        'lawyer.menus',
        'lawyer.noty',
        'lawyer.log'
    ])


    .config(['$urlRouterProvider', '$locationProvider', '$httpProvider', function ($urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/painel');

        $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
            return {
                'responseError': function(rejection) {
                    if (rejection.status === 401) {
                        $location.path('/login');
                        return $q.reject(rejection);
                    }
                    else {
                        return $q.reject(rejection);
                    }
                }
            };
        }]);
    }])

    .run(['auth', function run(auth) {
        auth.set();
    }])

    .controller('AppController', ['$scope', '$modal', 'connectionStatus',  function ($scope, $modal, connectionStatus) {

        // Tratamento de usuario sem conexao ativa.
        connectionStatus.handle();
        var offlineDialog = null;

        $scope.$on('ConnectionStatus.CHANGE', function (event, status) {
            $scope.$apply(function () {
                if (status === false && !offlineDialog) {
                    offlineDialog = $modal.open({
                        keyboard : false,
                        backdrop: 'static',
                        templateUrl : 'templates/modalOffline/modalOffline.tpl.html'
                    });
                } else if (status === true && offlineDialog) {
                    offlineDialog.close();
                    offlineDialog = null;
                }
            });
        });

    }]);