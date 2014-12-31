'use strict';

/**
 * @ngdoc function
 * @name filmNerdApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the filmNerdApp
 */
angular.module('filmNerdApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
