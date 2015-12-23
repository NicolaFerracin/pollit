var app = angular.module('PollitApp', ['ngRoute']);

app.service('User', function () {
    return {};
})

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/browsePolls', {
    controller: 'BrowseController',
    templateUrl: 'views/browsePolls.html'
  })
  .when('/myPolls', {
    controller: 'MyPollsController',
    templateUrl: 'views/myPolls.html'
  })
  .when('/poll/:id', {
    controller: 'PollController',
    templateUrl: 'views/poll.html'
  })
  .when('/login', {
    controller: 'LoginController',
    templateUrl: 'views/login.html'
  })
  .when('/signup', {
    controller: 'SignupController',
    templateUrl: 'views/signup.html'
  })
  .when('/newPoll', {
    controller: 'NewPollController',
    templateUrl: 'views/newPoll.html'
  })
  .otherwise({
    controller: 'HomeController',
    templateUrl: 'views/home.html'
  });

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
});
