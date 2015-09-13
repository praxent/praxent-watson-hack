/**
 * The main Sails Angular app module
 *
 * @type {angular.Module}
 */
angular.module('PraxentWatson', [
  'bethel.sailsSocket',
  'ngMaterial',
])
.config(['$mdThemingProvider', function ($mdThemingProvider) {

  $mdThemingProvider.definePalette('brandBlue', $mdThemingProvider.extendPalette('blue', {
    '500': '27c4f3',
    '800': '0094ad'
  }));
  $mdThemingProvider.definePalette('brandAccent', $mdThemingProvider.extendPalette('teal', {
    'A200': '2ab574',
  }));

  $mdThemingProvider.theme('default')
    .primaryPalette('brandBlue')
    .accentPalette('brandAccent');

}])
.controller('App', ['$scope', 'sailsSocket', function ($scope, sailsSocket) {

  $scope.toggleListen = function() {
    alert('@todo');
  };

}]);
