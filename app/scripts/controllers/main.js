'use strict';

/**
 * @ngdoc function
 * @name filmNerdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the filmNerdApp
 */

 angular.module('filmNerdApp')

 .controller('MarkersController', [ '$scope', '$http', function($scope, $http) {

  var createContent = function (contents){
    var stuff = contents;
    var markers = {};
    var markerContent = [];
    var i = 0;
    angular.forEach(stuff, function(value, key) {
      markers[i++]={
        lat: value.lat,
        lng:  value.lng,
        message:  '<div id="content">'+
                  '<div id="siteNotice">'+
                  '</div>'+
                  '<h1 id=firstHeading" class="firstHeading">'+value.title+'</h1>'+
                  '<div id="bodycontents">'+
                  '<p><b>Year: </b>'+value.release_year+'</p>'+
                  '<p><b>Locaton: </b>'+value.location+'</p>'+
                  '<p><b>Director: </b>'+value.director+'</p>'+
                  '<p><b>Writer: </b>'+value.writer+'</p>'+
                  '<p><b>Lead Actors: </b>'+value.actor1+', '+value.actor2+', '+value.actor3+'</p>'+
                  '<p><b>Fun Fact: </b>'+value.fun_fact+'</p>'+
                  '<p><a href="http://www.imdb.com/find?s=tt&q='+value.title+'">'+
                    'http://www.imdb.com/find?s=tt&q='+value.title+'</a>' +
                  '</p>'+
                  '</div>'+
                  '</div>'
      };
    });
    console.log(markers);
    $scope.markers = markers;
  };

    angular.extend($scope, {
      sanfrancisco: {
        lat: 37.775844,
        lng: -122.419308,
        zoom: 13
      },
      defaults: {
        scrollWheelZoom: false
      },
      data: {markers: {}}
    });

  $http.get("/data/data.json").success(function(data) {
    createContent(data);
  });

}]);