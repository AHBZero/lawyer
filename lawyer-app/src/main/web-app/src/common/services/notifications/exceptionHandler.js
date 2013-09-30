angular.module('services.exceptionHandler', ['services.i18nNotifications'])

    .factory('exceptionHandlerFactory', ['$injector', function ($injector) {
        return function ($delegate) {

            return function (exception, cause) {
                // Lazy load notifications para evitar a dependencia circular caso seja injetado diretamente
                var i18nNotifications = $injector.get('i18nNotifications');

                $delegate(exception, cause);

                i18nNotifications.pushForCurrentRoute('error.fatal', 'error', {}, {
                    exception: exception,
                    cause: cause
                });
            };
        };
    }])

    .config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', 'exceptionHandlerFactory', function ($delegate, exceptionHandlerFactory) {
            return exceptionHandlerFactory($delegate);
        }]);
    }]);