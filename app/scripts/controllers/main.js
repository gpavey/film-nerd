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
    var addressPointsToMarkers = function(points) {
      return points.map(function(ap) {
        return {
          lat: ap[4],
          lng: ap[5]
        };
      });
    };

  var createContent = function (contents){
    var stuff = contents;
    var markers = {};
    var i = 0;
    var id;
    angular.forEach(stuff, function(value, key) {
      markers[i++]={
        lat: value.lat,
        lng:  value.lng,
        layer: 'realworld',
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
      }
    });
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
      events: {
        map: {
          enable: ['moveend', 'popupopen'],
          logic: 'emit'
        },
        marker: {
          enable: [],
          logic: 'emit'
        }
      },
      layers: {
        baselayers: {
          osm: {
            name: 'OpenStreetMap',
            type: 'xyz',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
        },
        overlays: {
          realworld: {
            name: "Real world data",
            type: "markercluster",
            visible: true
          }
        }
      },
      data: {markers: {}}
    });

  $http.get("/data/data.json").success(function(data) {
    createContent(data);
    // $scope.markers = addressPointsToMarkers(data);
    // console.log($scope.markers);
  });

}]);

