"use strict";

myApp.factory('OnlineGroups', ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
    function ($rootScope, $location, $firebaseObject, $firebaseAuth) {

        let myObject;
      //  let messageMap = new Map();
      //  let singleMesg = [];
        let chatMessages = [];
        let messages ;

        const dbRefObject = firebase.database().ref().child('users');
       // const dbRefMessages = firebase.database().ref().child('messages');


        myObject = {
            check: function () {
                //console.log('this is the email - ' + user.email + 'this is the password - ' + user.password);
            return 'is it working ? '
            }, //login

            getGroupList: function () {

                let usersJson = [];
                dbRefObject.on('value', snap => {
                    //preObj.innerText = JSON.stringify(snap.val(), null, 3);
                    // console.log(snap.val());
                    snap.forEach(function (user) {
                        usersJson.push(user.val().firstname);

                    })
                });
                return usersJson;
            },

            getGroupMessages: function () {


                firebase.database().ref().child('messages').on('value', function(obj){
                    chatMessages.push(obj.val());
                    // console.log(chatMessages[0]);
                });
                return chatMessages;

            },

            getChat: function (user1 , user2) {
                console.log('chatController: chat between ' + user1 + ' & ' + user2);
                let chat_id_promise ;

                chat_id_promise = firebase.database().ref('chats').once('value', function(obj){
                        let a = obj.numChildren();
                        return a;
                    });

                //seeking for existing chat
                firebase.database().ref().child('chats').once('value', function(obj){


                    chat_id_promise.then(function(results){
                        let chat_id = results.numChildren();
                        let size = chat_id;

                        console.log('chat size is ');
                        console.log(results.numChildren());

                        //Go's throw all our chat list searches for existing chat and if there isn't one it creates a new one.
                    for(let i = 1 ; i < size + 1 ; i++) {
                     let userOne = obj.child(i).child('users').child('user1').child('user_name').val();
                     let userTwo = obj.child(i).child('users').child('user2').child('user_name').val();

                         //Checks users
                        if( (userOne == user1 && userTwo == user2) || (userOne == user2 && userTwo == user1) ){
                            //TODO -> if so sends the chat's messages
                            console.log('chat exist');

                            messages = obj.child(i).child('messages').val();
                        }

                        else if(i == size){

                            //TODO new chat
                            let userOneList ={
                                "reg_user":'1',
                                "user_name": user1

                            };
                            let userTwoList ={
                                "reg_user":'2',
                                "user_name": user2

                            };
                            let usersJson = {
                                "user1": userOneList,
                                "user2": userTwoList
                            };
                            let userList ={
                                "reg_user":'',
                                "user_name": ''

                            };
                            let messageJson={
                                'user': userList,
                                'text': 'holly shit that is an improvement !!! ',
                                'time':'',
                                'date':''
                            };


                            console.log('creates a new chat');
                                chat_id += 1;
                                firebase.database().ref('chats/' + chat_id).set({
                                    chat_id: chat_id,
                                    messages: [messageJson],
                                    users : usersJson
                                });
                            break;
                        }
                    }
                    });
                });



                return messages;
            }
        };

        let deleteNode = function () {

            let ref = firebase.database().ref().child('chats');
            ref.remove();



        };

        return myObject;
    }
]); //factory