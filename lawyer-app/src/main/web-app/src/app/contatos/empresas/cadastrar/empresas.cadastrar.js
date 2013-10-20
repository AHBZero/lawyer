angular.module('lawyer.empresas.cadastro', [
        'ui.bootstrap',
    ])

    .config(['$stateProvider',  function config($stateProvider) {
        $stateProvider.state('empresas.cadastrar', {
            url: '/cadastro',
            controller: 'EmpresaCadastroController',
            templateUrl: 'contatos/empresas/cadastrar/empresas.cadastrar.tpl.html'
        });
    }])

    .controller('EmpresaCadastroController', ['$scope', '$state', '$log', 'Empresa', 'Municipio', 'notifications', '$http',
        function ($scope, $state, $log, Empresa, Municipio, notifications, $http) {

            $scope.empresa = {
                telefones : [],
                enderecos : []
            };


            $scope.cadastrar = function () {
                $log.debug('Enviando cadastro para o endpoint', $scope.empresa);
                $scope.empresa = Empresa.save($scope.empresa, function (result) {
                    $log.debug('Empresa cadastrada:', $scope.empresa);
                    notifications.pushForCurrentRoute('empresa.salva', 'success', {nome : $scope.empresa.nomeFantasia});
                    if ($scope.empresas) {
                        $scope.empresas.content.push($scope.empresa);
                    }
                    $state.go('empresas.listar');
                });
            };

            $scope.salvarContinuar = function (cadastro) {
                $log.debug('Enviando cadastro para o endpoint', $scope.empresa);
                $scope.empresa = Empresa.save($scope.empresa, function () {
                    $log.debug('Empresa cadastrada:', $scope.empresa);
                    notifications.pushForCurrentRoute('empresa.salva', 'success', {nome : $scope.empresa.nomeFantasia});
                    if ($scope.empresas) {
                        $scope.empresas.content.push($scope.empresa);
                    }
                    $scope.empresa = {
                        telefones : [],
                        enderecos : []
                    };
                });
            };

            $scope.addTelefone = function () {
                $log.debug('Adicionando novo campo de telefone');
                $scope.empresa.telefones.push({});
                $log.debug('telefones: ', $scope.empresa.telefones);
            };

            $scope.removerTelefone = function (telefone) {
                $log.debug('removendo o telefone', telefone);
                $scope.empresa.telefones.splice($scope.empresa.telefones.indexOf(telefone), 1);
            };

            $scope.addEndereco = function () {
                $log.debug('Adicionando novo campo de endereco');
                $scope.empresa.enderecos.push({});
                $log.debug('enderecos : ', $scope.empresa.enderecos);
            };

            $scope.removerEndereco = function (endereco) {
                $log.debug('removendo o endereco', endereco);
                $scope.empresa.enderecos.splice($scope.empresa.enderecos.indexOf(endereco), 1);
            };

            $scope.getMunicipios = function (value) {
                return $http.get('/lawyer/api/municipios?q='+value)
                    .then(function(results){
                        return results.data;
                    });
            };

            $scope.getEmpresas = function (value) {
                Empresa.query({q : value}, function (data) {
                    return data;
                });
            };

    }])

;