'use strict';

/**
 * @ngdoc function
 * @name filmNerdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the filmNerdApp
 */
angular.module('filmNerdApp')
  .controller('MainCtrl', function ($scope,$http) {
    var mapOptions = {
      zoom: 13,
      center: {latitude:37.775844,longitude:-122.419308},
      mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.contents = null;
    var createMarkers = function (i,contents,idKey){
      // console.log(contents);
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
      idKey = 'id';
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: title,
        contents: content
      };
      ret[idKey] = i;
     // console.log(ret);
      return ret;
    };

    $scope.oms = new OverlappingMarkerSpiderfier($scope.map, {
      keepSpiderfied: true
    });
    $scope.oms.addListener('unspiderfy', function () {
      $scope.iw.close();
    });
    //create a single InfoWindow-instance
    $scope.iw = new google.maps.InfoWindow();
    google.maps.event.addListener($scope.iw, 'closeclick', function () {
        $scope.oms.unspiderfy();
    });
    //add click-listener
    $scope.oms.addListener('click', function (marker) {
      $scope.iw.close();
      $scope.iw.setContent(marker.desc);
      $scope.iw.open($scope.map, marker);
    });

    $scope.options = {scrollwheel: false};
    $http.get('/data/data.json')
      .success(function(data) {
        $scope.contents=data;
        $scope.allMarkers = [];
        var markers = [];
        for (var i = 0; i < 1000; i++) {
          markers.push(new google.maps.Marker({createMarkers(i,$scope.contents[i])})
          );
        }
        $scope.allMarkers = markers;
        console.log($scope.allMarkers.length)
        //add the markers to the oms
        for (var i = 0; i < $scope.allMarkers.length; ++i) {
          $scope.oms.addMarker($scope.allMarkers[i]);
          $scope.allMarkers[i].setMap($scope.map);
        }
      })
      .error(function(){
        $scope.contents = [{heading:'Error',description:'Could not load json data'}];
      });
});
