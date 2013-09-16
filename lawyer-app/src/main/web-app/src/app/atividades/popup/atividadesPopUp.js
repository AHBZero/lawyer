/**
 * @ngdoc object
 * @name lawyer.atividades.popup
 * @description
 * Pop-up para administra��o das atividades cadastradas pelo usu�rio.
 *
 * O usu�rio poder� alterar atividades passadas e iniciar / pausar novas atividades.
 * A atividade atual � carregada automaticamente pela directive {@link lawyer.menu.direita}
 */
angular.module('lawyer.atividades.popup', [])

    .config([function () {

    }])

    .controller('AtividadesPopUp', ['$scope', 'dialog', '$log', function ($scope, dialog, $log) {

        $scope.close = function () {
            dialog.close();
        };

    }])
;

