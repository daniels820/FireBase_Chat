
myApp.controller('RegistrationController', 
  ['$scope', 'Authentication', '$firebaseObject',
  function($scope, Authentication , $firebaseObject) {






  $scope.login = function() {
    //console.log('currentUser is '+$scope.user.Email);
  //  $scope.currentUser = $scope.user.Email;

  $scope.currentUser = $scope.user.email;

    Authentication.login($scope.user);


  };

  $scope.logout = function() {

// var presenceRef = new Firebase('https://sample-3ce35.firebaseio.com/disconnectmessage');
// // Write a string when this client loses connection
// presenceRef.onDisconnect().set("I disconnected!");

let userLastOnlineRef = new Firebase("https://sample-3ce35.firebaseio.com/users/" + user.email  + "/lastOnline");
console.log(userLastOnlineRef);
userLastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);


    Authentication.logout();
  };

  $scope.register = function() {
    Authentication.register($scope.user);
  }; //register

}]); //Controller