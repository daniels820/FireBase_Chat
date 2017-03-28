myApp.controller('ChatController', 
  ['$scope', 'Authentication', 'OnlineGroups',
  function($scope, Authentication , OnlineGroups) {

    $scope.check = OnlineGroups.check();//just a test

    $scope.users = OnlineGroups.getGroupList();//get all users

    $scope.chatMessages = OnlineGroups.getGroupMessages();//get group messages

    $scope.redirectChat = function (user) {
          //TODO: check if chat exists and retrieve it

          let current = this.currentUser.firstname;

          $scope.messages = OnlineGroups.getChat(current, user);

          console.log($scope.messages);
          // $(".panel-info").html($("#template").render());
          //
          // $( ".panel-info" ).load( "#/chat/", function() {
          //     alert( "Load was performed." );
          // });


        // return chat;

      }; //get chat between the currentUser and user


  }]);
