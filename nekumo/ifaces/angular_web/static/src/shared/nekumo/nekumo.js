/**
 * Created by nekmo on 31/01/17.
 */
var module = angular.module('nekumo', ['ngMaterial']);


module.controller('nekumoCtrl', function ($scope, $mdSidenav) {
    $scope.toggleSidenav = function(sidenavId){
        $mdSidenav(sidenavId).toggle();
    };
});