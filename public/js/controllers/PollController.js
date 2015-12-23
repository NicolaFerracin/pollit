app.controller('PollController', ['$scope', '$http', 'User', '$location', '$window', function($scope, $http, User, $location, $window) {

  var chartArray = [['Answer', 'Amount']];
  var totalAnswersSent = 0; // collect all the answers received
  var totalAnswers = 0; // collect all the answers a poll has
  var url;

  $scope.user = User;
  console.log("user", $scope.user.email)
  url = $location.absUrl()
  var _id = (url.substring(url.lastIndexOf('/') + 1 ));
  console.log(_id);
  $http.get('/api/poll/' + _id)
  .success(function(data) {
    $scope.poll = data;
    // populate an array with answer text + votes for the chart
    for (var i = 0; i < $scope.poll.answers.length; i++) {
      chartArray.push([$scope.poll.answers[i].text, $scope.poll.answers[i].votes])
      // this is used to determine if the poll has no answers yet and the chart shouldn't be displayed
      totalAnswersSent += $scope.poll.answers[i].votes
      totalAnswers++;
    }
    $scope.totalAnswers = totalAnswersSent;

    if (totalAnswersSent > 0) {
      drawChart()
    }

    if ($scope.poll.author === User.email) {
      $scope.isAuthor = true;
    } else {
      $scope.isAuthor = false;
    }
    console.log(data);
  })
  .error(function(data){
    console.log('Error: ' + data);
  })



  // on 'answer' button click
  $scope.answerPoll = function() {

    // if nothing selected, prompt error
    if(!$scope.radioValue) {
      $scope.error = true;
      return;
    }

    // else, disable button
    $('#submit').prop('disabled', true);
    // add one vote to answer
    $scope.poll.answers[$scope.radioValue.id].votes += 1;
    // add one vote to poll.votes
    $scope.poll.votes += 1;
    // update entry in DB
    $http.post('/api/polls/:id', $scope.poll)
    .success(function(data) {
      console.log(data);
      $window.location.href = '/polls.html';
    })
    .error(function(data) {
      console.log("Error: " + data);
    });
  }

  // on delete button click
  $scope.deletePoll = function(id) {
    if ($scope.poll.author != User.email) {
      return;
    }
    $('#submit').prop('disabled', true);
    $('#delete').prop('disabled', true);
    $http.delete('/api/polls/' + id)
    .success(function(data) {
      $window.location.href = '/polls.html';
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  // add new answer to poll
  $scope.addAnswer = function() {
    // if input is empty, return
    if(!$scope.newAnswer) {
      return;
    }
    // else, disable button
    $('#addNewAnswer').prop('disabled', true);
    // add answer to answers array
    $scope.poll.answers.push({'text' : $scope.newAnswer, 'votes' : 0, 'id' : totalAnswers})
    // add 1 to totalAnswers
    totalAnswers++;
    // update entry in DB
    $http.post('/api/polls/:id', $scope.poll)
    .success(function(data) {
      $scope.showNewAnswerInput = false;
      $scope.newAnswer = "";
      console.log(data);
    })
    .error(function(data) {
      console.log("Error: " + data);
    });
  };


  function drawChart() {
    google.setOnLoadCallback(drawChart);
    var data = google.visualization.arrayToDataTable(chartArray);
    var options = {
      title: 'Answers'
    };
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }

}]);
