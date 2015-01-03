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
    $scope.contents = null;
    $http.get('/data/data.json')
      .success(function(data) {
        $scope.contents=data;
        $scope.allMarkers = [];
        var markers = [];
        for (var i = 0; i < 50; i++) {
          markers.push(createMarkers(i,$scope.contents[i]));
        }
        $scope.allMarkers = markers;

      })

      .error(function(){
        $scope.contents = [{heading:'Error',description:'Could not load json data'}];
      });

    $scope.map = {center: { latitude: 37.733795, longitude: -122.431297 }, zoom: 14 };
    $scope.options = {scrollwheel: false};
    // $scope.marker = {
    //       coords: {
    //           latitude: 40.1451,
    //           longitude: -99.6680
    //       },
    //       show: false,
    //       id: 0
    //   };
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


})
  ;
