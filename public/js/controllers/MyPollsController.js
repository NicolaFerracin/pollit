app.controller('MyPollsController', ['$scope', '$http', 'User', '$window', function($scope, $http, User, $window) {

  // get all polls from DB
  $http.get('/api/polls/' + User.email)
  .success(function(data) {
    if (data.length == 0) {
      $window.location.href = '/home.html';
    }
    $scope.polls = data;
    sumVotes(data);
    console.log(data);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  var sumVotes = function(polls) {
    for (var i = 0; i < polls.length; i++) {
      var votes = 0;
      polls[i].answers.forEach(function(element, index, array) {
        votes += element.votes;
      });
      polls[i].votes = votes;
    }
  }
}]);
