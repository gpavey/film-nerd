'use strict';

/**
 * @ngdoc overview
 * @name filmNerdApp
 * @description
 * # filmNerdApp
 *
 * Main module of the application.
 */
angular
  .module('filmNerdApp', [
    'ngRoute',
    'ngTouch',
    'leaflet-directive'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MarkersController'
      })
      // .when('/about', {
      //   templateUrl: 'views/about.html',
      //   controller: 'AboutCtrl'
      // })
      .otherwise({
        redirectTo: '/'
      });
  })

  ;
