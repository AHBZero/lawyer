angular.module('lawyer', [
        'templates-app',
        'templates-common',
        'lawyer.home',
        'ui.state',
        'ui.route',
        'ui.bootstrap',
        'lawyer.connectionStatus',
        'lawyer.auth',
        'services.i18nNotifications',
        'services.httpRequestTracker',
        'services.breadcrumbs',
        'i18n.Constants',
        'lawyer.header',
        'lawyer.menu.esquerda',
        'lawyer.menu.direita',
        'lawyer.menu.central'
    ])


    .config(['$urlRouterProvider', '$routeProvider', '$locationProvider', '$httpProvider', function ($urlRouterProvider, $routeProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/home');
        var interceptor = ['$location', '$q', function ($location, $q) {

            function success(response) {
                return response;
            }

            function error(response) {

                if (response.status === 401) {
                    $location.path('/login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }

            return function (promise) {
                return promise.then(success, error);
            };
        }];

        $httpProvider.responseInterceptors.push(interceptor);
    }])

    .run(['auth', function run(auth) {
        auth.set();
    }])

    .controller('AppCtrl', ['$scope', '$dialog', 'connectionStatus', 'i18nNotifications', function ($scope, $dialog, cconnectionStatus, i18nNotifications) {

        $scope.notifications = i18nNotifications;
        
        $scope.removeNotification = function (notification) {
            i18nNotifications.remove(notification);
        };

        $scope.$on('$stateChangeFail', function(event, current, previous, rejection){
            i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
        });

        // Tratamento de usuario sem conexao ativa.
        cconnectionStatus.handle();
        var offlineDialog = null;

        $scope.$on('ConnectionStatus.CHANGE', function (event, status) {
            $scope.$apply(function () {
                if (status === false && !offlineDialog) {
                    offlineDialog = $dialog.dialog({
                        backdropFade: true,
                        dialogFade: true,
                        keyboard: false,
                        backdropClick: false
                    });
                    offlineDialog.open('templates/modalOffline/modalOffline.tpl.html');
                } else if (status === true && offlineDialog) {
                    offlineDialog.close();
                    offlineDialog = null;
                }
            });
        });

    }]);


