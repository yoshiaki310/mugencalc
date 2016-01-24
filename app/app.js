'use strict';

// Declare app level module which depends on views, and components
angular.module('mugenCalc', [
  'ngRoute',
  'mugenCalc.view',
  'mugenCalc.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/mugencalc'});
}]);
