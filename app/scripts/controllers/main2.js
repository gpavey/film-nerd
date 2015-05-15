'use strict';

/**
 * @ngdoc function
 * @name filmNerdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the filmNerdApp
 */
(function(){
  angular.module('filmNerdApp')
    .controller('MainCtrl', function ($scope,movieDataService) {
      $scope.contents = null;
      $scope.allMarkers = {};
      $scope.map = {center: { latitude: 37.775854, longitude: -122.419308 }, zoom: 13 };
      $scope.options = {scrollwheel: true};

      movieDataService.getMovies()
        .then(function(movies){
            createMarkers(movies.data)
        })
      function createMarkers(movies){
        var markers = [];
        for (var i = 0; i < 100; i++) {
          var movie = movies[i];
          markers.push(new google.maps.Marker(addMarkers(i,movie))
          );
        }
        console.log(markers);
        $scope.allMarkers = markers;
      }

      var addMarkers = function (i,contents,idKey){
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
        var idKey = 'id';
        var ret = {
          latitude: latitude,
          longitude: longitude,
          title: title,
          contents: content,
          id: i
        };
        return ret;
      };
  })

  .service('movieDataService', function($http){
    this.getMovies = function() {
    return $http
      .get('/data/data.json')
        .success(function(res) {
          return res.data;
        })
      .error(function(){
        $scope.contents = [{heading:'Error',description:'Could not load json data'}];
      });
    };
  })

})();
