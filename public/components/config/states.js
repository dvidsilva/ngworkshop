angular.module('ngWorkshop')
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/timeline/home.html"
    });
});

