(function(){

    function HomeCtrl($scope, roomFactory, $uibModal, Message, $cookies){
        $scope.roomsList = roomFactory.all;

        // //load without a room selected, used to hold current room
        // this.currentRoom = null;
        //
        // //states whether room name is shown or not
        // this.currentRoomShowing = false;
        //
        // //sets messages to null for first run through
        // this.messages = {};
        //
        // this.content = "";

        $scope.messages = {};
        $scope.currentRoom = null;
        $scope.currentUser = $cookies.get('blocChatCurrentUser');


        //sets the current room to the one clicked
        $scope.setCurrentChatRoom = function(room){
            // this.currentRoom = clickedRoom;
            // this.messages = Message.getByRoomId(this.currentRoom.$id);
            //
            // console.log(this.currentRoom.$id);
            // console.log(this.messages);
            $scope.currentRoom = room;
            $scope.messages = Message.getByRoomId(room.$id);

        };


//        tried using another controller to use uibmodal
//        $scope.createRoomModal = function(){
//            //to open a popup window use the $uiModal.open method call
//            $uibModal.open({
//                //what do you want the modal to open up
//                //link to html for popup dialog
//                animation: true,
//                templateUrl:'/templates/modal.html',
//                controller: 'CreateRoomCtrl'
//            })
//
//        };
//    }

        //method for Home Controller to open modal, used Travis Rodger's method
        //this was moved to a controller
        $scope.openModal = function(){
            var modalInstance = $uibModal.open({
                templateUrl: '/templates/modal.html',
                //function for modal
                controller: function($scope, $uibModalInstance){
                    $scope.newRoom = {$value: ''};

                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.create = function(){
                        $uibModalInstance.close($scope.newRoom);
                    };
                },
                size: 'md',
            });

            modalInstance.result.then(function(data){
               roomFactory.createRoom(data);
            });

        };

    $scope.sendMessage = function(room){
      // if(this.content){
      // Message.send($scope.newMessage, this.currentRoom.$id);
      //   this.content = "";
      // }
      console.log(room.$id);
      Message.send($scope.newMessage, room.$id);
      $scope.newMessage = null;
    };
  }
    angular
        .module('blocChat')
        .controller('HomeCtrl', ['$scope', 'roomFactory', '$uibModal', 'Message', '$cookies', HomeCtrl]);

 })();
