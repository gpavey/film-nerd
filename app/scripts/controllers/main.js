'use strict';

/**
 * @ngdoc function
 * @name filmNerdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the filmNerdApp
 */

angular.module('filmNerdApp')
  .controller('MainCtrl', function ($scope,movieDataFactory,createMarkerService,placeMarkersService) {
    $scope.map = {
      center: {
        latitude: 37.775844,
        longitude: -122.419308
      },
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    $scope.options = {scrollwheel: false};

    movieDataFactory.fetch().then(function(data){
      var contents = data;
      $scope.contents = createMarkerService.createMarker(contents);
      // placeMarkersService.createMarkers($scope.contents,$scope.map);
    });

  })

  .service('placeMarkersService', function(){
    // this.createMarkers = function(contents,map){
    //   this.contents = contents;
    //   this.map = map;

    //   var infoWindow = new google.maps.InfoWindow();
    //   var allMarkers = this.contents;

    //   var oms = new OverlappingMarkerSpiderfier(this.map, {
    //     keepSpiderfied: true
    //   });
    //   var iw = new google.maps.InfoWindow();
    //   var options = {scrollwheel: false};

    //   //add the markers to the oms
    //   for (var i = 0; i < allMarkers.length; ++i) {
    //     oms.addMarker(allMarkers[i]);
    //     allMarkers[i].setMap(map);
    //   }

    //   oms.addListener('unspiderfy', function () {
    //     iw.close();
    //   });

    //   //add click-listener
    //   oms.addListener('click', function (marker) {
    //     iw.close();
    //     iw.setContent(marker.desc);
    //     iw.open(map, marker);
    //   });

    //   //create a single InfoWindow-instance
    //   google.maps.event.addListener(iw, 'closeclick', function () {
    //     oms.unspiderfy();
    //   });
    // }
  })

  .service('createMarkerService', function (){
    this.createMarker = function(data){
      console.log('in createMarkerService');
      var markers = [];
      for (var i = 0; i < data.length; i++) {
        markers.push(new google.maps.Marker(createContent(i,data[i])));
      }
      console.log(markers);
      return markers;
    }

    var createContent = function (i,contents){
      var idkey = i;
      var latitude = contents.lat;
      var longitude = contents.lng;
      var title = contents.title;
      var content = '<div id="content">'+
                      '<div id="siteNotice">'+
                      '</div>'+
                      '<h1 id=firstHeading" class="firstHeading">'+contents.title+'</h1>'+
                      '<div id="bodycontents">'+
                      '<p><b>Year: </b>'+contents.release_year+'</p>'+
                      '<p><b>Locaton: </b>'+contents.location+'</p>'+
                      '<p><b>Director: </b>'+contents.director+'</p>'+
                      '<p><b>Writer: </b>'+contents.writer+'</p>'+
                      '<p><b>Lead Actors: </b>'+contents.actor1+', '+contents.actor2+', '+contents.actor3+'</p>'+
                      '<p><b>Fun Fact: </b>'+contents.fun_fact+'</p>'+
                      '<p><a href="http://www.imdb.com/find?s=tt&q='+contents.title+'">'+
                        'http://www.imdb.com/find?s=tt&q='+contents.title+'</a>' +
                      '</p>'+
                      '</div>'+
                    '</div>';
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: title,
        contents: content,
        id: idkey
      };

      return ret;
    };
  })

.factory('movieDataFactory', function($q, $timeout, $http) {
  var getMovies = {
    fetch: function() {

      var deferred = $q.defer();

      $timeout(function() {
        $http.get('/data/data.json').success(function(data) {
          deferred.resolve(data);
        });
      }, 30);

      return deferred.promise;
    }
  }
  return getMovies;
});
