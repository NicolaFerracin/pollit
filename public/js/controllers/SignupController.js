app.controller('SignupController', ['$scope', '$http', '$window', function($scope, $http, $window) {

  $scope.submitted = false;
  $scope.showPasswordAlert = false;
  $scope.showErrorAlert = false;

  $scope.account = {
    email : '',
    password : '',
    repeatPassword : ''
  }


  $scope.signup = function(account) {
    $scope.submitted = true;

    if (account.password != account.repeatPassword) {
      $scope.submitted = false;
      $scope.showPasswordAlert = true;
    }

    var user = {
      email : account.email,
      password : account.password
    };

    $http.post("/api/signup", user)
    .success(function (data, status) {
      console.log('Successful login.');
      console.log('data = ' + data);
      console.log('status = ' + status);
      $window.location.href = '/';
    })
    .error(function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
    });
  };


}]);
