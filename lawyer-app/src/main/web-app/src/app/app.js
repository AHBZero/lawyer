angular.module('lawyer', [
        'templates-app',
        'templates-common',
        'lawyer.home',
        'ui.state',
        'ui.route',
        'ui.bootstrap',
        'ConnectionStatus',
        'Auth'

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

    .run(['ConnectionStatus', 'Auth', function run(ConnectionStatus, Auth) {
        ConnectionStatus.handle();
        Auth.set();
    }])

    .controller('AppCtrl', ['$scope', '$dialog', function ($scope, $dialog) {
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
                    offlineDialog.open('templates/modal-offline/modal-offline.tpl.html');
                } else if (status === true && offlineDialog) {
                    offlineDialog.close();
                    offlineDialog = null;
                }
            });
        });

    }]);


