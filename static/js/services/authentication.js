myApp.factory('Authentication',
  ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
  function($rootScope, $location, $firebaseObject, $firebaseAuth) {

  let ref = firebase.database().ref();
  let auth = $firebaseAuth();
  let myObject;
  let currentUser;

  auth.$onAuthStateChanged(function(authUser) {
    if(authUser) {
      let userRef = ref.child('users').child(authUser.uid);
      let userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });

  myObject = {
    getCurrentUser: function () {
        return currentUser;
    },

    login: function(user) {

      console.log('this is the email - ' + user.email + 'this is the password - ' + user.password);
      auth.$signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(user) {
          currentUser = user;
        console.log( user);
        $location.path('/chat');
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); //signInWithEmailAndPassword
    }, //login

    logout: function() {
      alert('logged out');
      return auth.$signOut();
    }, //logout

    requireAuth: function() {
      return auth.$requireSignIn();
    }, //require Authentication

    register: function(user) {
      auth.$createUserWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(regUser) {
        let regRef = ref.child('users')
          .child(regUser.uid).set({
            date: firebase.database.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          }); //userinfo
          myObject.login(user);
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); //createUserWithEmailAndPassword
    }, //register

    dissconnect: function () {
        let amOnline = new Firebase('https://sample-3ce35.firebaseio.com/.info/connected');
        let userRef = new Firebase('https://sample-3ce35.firebaseio.com/presence/' + user.uid);
        amOnline.on('value', function(snapshot) {
            if (snapshot.val()) {
                userRef.onDisconnect().remove();
                userRef.set(true);
            }
        });

    }
  }; //return


  return myObject;

}]); //factory