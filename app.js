var data;
//search by song title
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
//search by artist name

//search by album name

var myApp = angular.module('myApp', [])
var albumlg = '/img/placeholder.png';
var albummd = '/img/placeholder.png';
var albumsm = '/img/placeholder.png';
var myCtrl = myApp.controller('myCtrl', function($scope, $http, $window) {
    //$scope.albumArt =
    $scope.width = 0;
    $scope.albumArt = albumlg;

  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      data = $scope.tracks = response.tracks.items

    })
  }
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()
      $scope.currentSong = song
    }
  }
  $scope.art = function(lg, md, sm) {
      albumlg = lg;
      albummd = md;
      albumsm = sm;
      //$scope.albumArt = albumlg;
      if ($scope.width >= 768) {
          $scope.albumArt = albumlg;
      } else if ($scope.width >= 320) {
          $scope.albumArt = albummd;
      } else {
          $scope.albumArt = albumsm;
      }
  }
  $scope.updateWidth = function() {
      $scope.width = $window.innerWidth;
      //$scope.width = $window.outerWidth;
      //add the image if else statements from $scope.art
      if ($scope.width >= 768) {
          $scope.albumArt = albumlg;
          //if ($('#btn').hasClass('btn-lg')){
          //    $('#btn').removeClass('btn-lg');
          //    $('#btn').addClass(' btn-lg');
          //}
          //if ($('#btn').hasClass('btn-sm')){
          //    $('#btn').removeClass('btn-sm');
          //    $('#btn').addClass(' btn-lg');
          //}
          //if ($('#btn').hasClass('btn-xs')){
          //    $('#btn').removeClass('btn-xs');
          //    $('#btn').addClass(' btn-lg');
          //}
          document.getElementById("button").className = "btn btn-primary btn-lg";
          document.getElementById("searchForm").className = "form-control input-lg";
      } else if ($scope.width >= 320) {
          $scope.albumArt = albummd;
          document.getElementById("button").className = "btn btn-primary";
          document.getElementById("searchForm").className = "form-control";
      } else {
          $scope.albumArt = albumsm;
          document.getElementById("button").className = "btn btn-primary btn-sm";
          document.getElementById("searchForm").className = "form-control input-sm";
      }
      $scope.$apply();
  }
  $scope.updateWidth();
  $window.onresize = function(){
      $scope.updateWidth();
  }

})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
