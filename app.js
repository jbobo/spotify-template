var data;
//search by song title
var baseUrl = 'https://api.spotify.com/v1/search?type=track&limit=25&query='
var artistUrl = 'artist%3A*';
var albumUrl = 'album%3A*';
var genreUrl = 'genre%3A*';
var url2 = '*&type=track';
var searchBy;
var myApp = angular.module('myApp', [])
var albumlg = '/img/placeholder.png';
var albummd = '/img/placeholder.png';
var albumsm = '/img/placeholder.png';
var myCtrl = myApp.controller('myCtrl', function($scope, $http, $window) {
    //$scope.albumArt =
    $scope.width = 0;
    $scope.albumArt = albumlg;

    $scope.sortType = 'name';
    $scope.sortReverse = '';

    $scope.searchBy = [
    {type:'Song Title'},
    {type:'Artist Name'},
    {type:'Album Title'},
    {type:'Genre'}
    //{type:'Release Year'}
    //track.album.release_date doesn't seem to be working on spotify yet. it just returns as empty for every item. I can do a successful query when I search for a certain release date too, but is just returns empty...
  ];
  $scope.search = $scope.searchBy[0]; // Default search song titles


  $scope.audioObject = {}
  $scope.getSongs = function() {
    if($scope.track != undefined){
            if ($scope.search == $scope.searchBy[0]){
            $http.get(baseUrl + $scope.track).success(function(response){
                data = $scope.tracks = response.tracks.items
            })
        }else if ($scope.search == $scope.searchBy[1]){
            var search = (artistUrl + $scope.track + url2);
            $http.get(baseUrl + search).success(function(response){
                data = $scope.tracks = response.tracks.items
            })
        } else if ($scope.search == $scope.searchBy[2]){
            var search = (albumUrl + $scope.track + url2);
            $http.get(baseUrl + search).success(function(response){
                data = $scope.tracks = response.tracks.items
            })
        } else if ($scope.search == $scope.searchBy[3]){
            var search = (genreUrl + $scope.track + url2);
            $http.get(baseUrl + search).success(function(response){
                data = $scope.tracks = response.tracks.items
            })
        }
        $scope.move();
    }
    //$(window).scrollTop($('#table').offset().top);
  }

  $scope.move = function(){
      $('html,body').animate({
       scrollTop: $("#searchForm").offset().top},
       'slow');
  }

  $scope.artist = function(artist){
      var artist = artist;
      $scope.search = $scope.searchBy[1];
      $scope.track = artist;
  }
  $scope.album = function(album){
      var album = album;
      $scope.search = $scope.searchBy[2];
      $scope.track = album;
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
      $('html,body').animate({
       scrollTop: $("#albumArt").offset().top},
       'slow');
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
