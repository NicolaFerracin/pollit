app.controller('NewPollController', ['$scope', '$http', '$window', function($scope, $http, $window) {

  var id = 1;

  $scope.question = "";

  $scope.answers = [
    { id : 0, text : "", votes : 0 },
    { id : 1, text : "", votes : 0 }
  ]

  $scope.addAnswer = function() {
    console.log($window)
    id++;
    $scope.answers.push({ id : id, text : "", votes : 0});
    $scope.submitButtonDisabled = true;

  }

  $scope.removeAnswer = function(index) {
    if ($scope.answers.length > 2) {
      $scope.answers.splice(index, 1);
    }
  }

  $scope.save = function(poll) {
    $scope.submitted = true;
    // if form is invalid, return
    if (poll.$invalid) {
      // do nothing and return
      return
    }
    // if form is ok, construct poll obj
    var newPoll = {
      question : $scope.question,
      answers : $scope.answers,
      views : 0,
      author : "admin"
    }

    // submit obj to db
    $http.post('/api/polls', newPoll)
    .success(function(data) {
      console.log("asdas");
      $window.location.href = '/home';
    })
    .error(function(data) {
      console.log("Error: " + data);
    });
  }
}]);
