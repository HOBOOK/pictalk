'use strict';

var stompClient = null;
var username = null;
var rooms = null;
var currentRoom  = null;
var chatPage = document.querySelector('#chat-page');
var messageInput = document.querySelector('#chat-message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');
var chatSideMenu = document.querySelector('#chat-side-tab');
var layout = document.querySelector('.layout-main');

app.controller("chatController", function ($scope, $http, $uibModal, $filter) {
    $scope.rooms = [];
    $scope.myRooms = [];
    $scope.rooms = [{
        id: 1,
        type: 0,
        title: "제목",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/img/no-image.png",
        max: 100,
        member: 30,
        createDate: "2020.07.13",
        manager_id: 1,
        latestMessage: ""
    },{
        id: 2,
        type: 1,
        title: "제목제목제목",
        description: "채팅방 채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/img/no-image.png",
        max: 50,
        member: 25,
        createDate: "2020.07.13",
        manager_id: 1,
        latestMessage: ""
    },{
        id: 3,
        type: 0,
        title: "제목제목",
        description: "채팅방 들어오세요 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 500,
        member: 500,
        createDate: "2020.07.13",
        manager_id: 1,
        latestMessage: ""
    },{
        id: 4,
        type: 1,
        title: "제목제목제목제목제목제목제목제목제목",
        description: "채팅방 들어오세요 들어오세요 들어오세요 들어오세요 들어오세요~",
        category:["태그1","태그2"],
        img: "/img/no-image.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1,
        latestMessage: ""
    },{
        id: 5,
        type: 0,
        title: "제목5",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1,
        latestMessage: ""
    },{
        id: 6,
        type: 1,
        title: "제목6",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/img/no-image.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1,
        latestMessage: ""
    },{
        id: 7,
        type: 0,
        title: "제목7",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1,
        latestMessage: ""
    },{
        id: 8,
        type: 1,
        title: "제목8",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1,
        latestMessage: ""
    }];

    $scope.initConfig = function(){
        $scope.config_chat = {
            selectedParticipant: {
                id: -1,
                nickname: null,
                email: null,
                thumbnail: null
            },
            ui:{
                mainBarIndex: 0,
                sidebarIndex: 0
            }
        }
    }
    $scope.initConfig();

    $scope.initDumpData = function(){
        $scope.storage_image = [
            {
                id: 1,
                url: "/chat/img/image_example.jpg"
            },
            {
                id: 2,
                url: "/chat/img/image_example.jpg"
            },
            {
                id: 3,
                url: "/chat/img/image_example.jpg"
            },
            {
                id: 4,
                url: "/chat/img/image_example.jpg"
            },
            {
                id: 5,
                url: "/chat/img/image_example.jpg"
            },
            {
                id: 6,
                url: "/chat/img/image_example.jpg"
            }
        ]
        $scope.participants = [
            {
                id: 1,
                nickname: "팍경호",
                email: "park@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 2,
                nickname: "쏭치민",
                email: "song@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 3,
                nickname: "쵸지은",
                email: "choi@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 4,
                nickname: "팍경호",
                email: "park@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 5,
                nickname: "쏭치민",
                email: "song@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 6,
                nickname: "쵸지은",
                email: "choi@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 7,
                nickname: "팍경호",
                email: "park@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 8,
                nickname: "쏭치민",
                email: "song@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 9,
                nickname: "쵸지은",
                email: "choi@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 10,
                nickname: "팍경호",
                email: "park@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 11,
                nickname: "쏭치민",
                email: "song@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 12,
                nickname: "쵸지은",
                email: "choi@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            }
        ];
        $scope.manager = $filter('filter')($scope.participants, {id: currentRoom.manager_id}, true)[0];
    }


    $scope.connect = function ($event, room) {
        connect($event, room);
        $scope.currentRoom = room;
        $scope.initDumpData();
        if($scope.myRooms.indexOf($scope.currentRoom) === -1)
            $scope.myRooms.push($scope.currentRoom);
    };

    $scope.sendMessage = function ($event) {
        var messageContent = messageInput.value.trim();
        $scope.currentRoom.latestMessage = messageContent;
        sendMessage(messageContent);
    };

    $scope.sendImageMessage = function($event, url){
        $scope.currentRoom.latestMessage = '이미지';
        sendImageMessage($event, url);
    };

    $scope.onClickToggleMenu = function () {

        var display = chatSideMenu.style.display;
        if(display === 'none' || display ===''){
            chatSideMenu.style.display = 'inline-block';
        }else{
            $scope.config_chat.ui.sidebarIndex = 0;
            chatSideMenu.style.display = 'none';
        }
    };

    $scope.onClickExitChatRoom = function(){
        $scope.myRooms.splice($scope.myRooms.indexOf($scope.currentRoom), 1);
        chatSideMenu.style.display = 'none';
        disConnect();
    }

    $scope.onClickOpenMainBar = function(index, $event){
        $scope.config_chat.ui.mainBarIndex = index;
    }

    $scope.onClickOpenSidebar = function(index){
        $scope.config_chat.ui.sidebarIndex = index;
        chatSideMenu.style.display = 'inline-block';
    }

    $scope.onClickAddChatRoom = function(){
        layout.style.filter = "blur(1px)";
        var modalInstance = $uibModal.open({
            templateUrl: 'modal/modal_chat',
            controller: 'chatModalController'
        });
        modalInstance.result.then(function (newChatRoom) {
            console.log("modal click ok : " + newChatRoom);
            $scope.rooms.push(newChatRoom);
            layout.style.filter = "";
        }, function () {
            console.log('modal에서 dismissed at: ' + new Date());
            layout.style.filter = "";
        });
    }
    $scope.onClickParticipant = function(participant){
        if($scope.config_chat.selectedParticipant.id !== participant.id)
            $scope.config_chat.selectedParticipant = participant;
        else{
            $scope.config_chat.selectedParticipant = {
                id: -1,
                nickname: null,
                email: null,
                thumbnail: null
            }
        }
    }
});

app.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background':
                        'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + value + ') center center'
            });
        });
    };
});

app.directive('dragItem', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attr, controller) {
            // Add drag event
            elem.bind('dragstart', function(evt) {
                var id = elem.attr('id');
                evt.dataTransfer.setData('src', id);
            });
        }
    }
});

app.directive('dropItem', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attr, controller) {
            // Drag over event
            elem.bind('dragover', function(evt) {
                if (evt.preventDefault) {
                    evt.preventDefault(); // Necessary. Allows us to drop.
                }
                if(evt.stopPropagation) {
                    evt.stopPropagation();
                }

                evt.dataTransfer.dropEffect = 'copy';
                return false;
            });

            // Drop item
            elem.bind('drop', function(evt) {
                evt.preventDefault();
                var data = evt.dataTransfer.getData('src');
                if(data !== '' && data !== null)
                    scope.sendImageMessage(evt, data);
            });
        }
    }
});

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event, room) {
    username = Math.random().toString(36).substr(2, 5);
    if(username) {
        disConnect();
        currentRoom = room;
        chatPage.classList.remove('hidden');
        connectingElement.classList.add('hidden');
        clearChatText();
    }
    event.preventDefault();
}

function disConnect(){
    currentRoom = null;
    chatPage.classList.add('hidden');
    connectingElement.classList.remove('hidden');
}

function sendMessage(messageContent) {
    if(messageContent.length<1){
        return;
    }
    var message = {
        type: 'CHAT',
        content: messageContent,
        sender: username,
        date: getTimeStamp()
    };
    messageInput.value = '';
    var isMe = message.sender === username;
    var messageElement = document.createElement('li');
    var messageCoverElement = document.createElement('span');

    messageCoverElement.classList.add('chat-message-cover');
    messageElement.classList.add('chat-message');
    if(isMe){
        messageCoverElement.classList.add('me');
        messageElement.classList.add('me');
    }
    var avatarElement = document.createElement('i');
    var avatarText = document.createTextNode(message.sender[0]);
    avatarElement.appendChild(avatarText);
    avatarElement.style['background-color'] = getAvatarColor(message.sender);

    messageCoverElement.appendChild(avatarElement);

    var usernameElement = document.createElement('span');
    var usernameText = document.createTextNode(message.sender);
    usernameElement.appendChild(usernameText);
    messageCoverElement.appendChild(usernameElement);

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);


    var dateElement = document.createElement('h6');
    var dateText = document.createTextNode(parseDateString(message.date.substring(11)));
    dateElement.appendChild(dateText);

    if(isMe){
        messageCoverElement.appendChild(dateElement);
        messageCoverElement.appendChild(textElement);
    }else{
        messageCoverElement.appendChild(textElement);
        messageCoverElement.appendChild(dateElement);
    }
    messageElement.appendChild(messageCoverElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
    event.preventDefault();
}

function sendImageMessage(event, url) {
    var message = {
        type: 'IMAGE',
        content: url,
        sender: username,
        date: getTimeStamp()
    };
    var isMe = message.sender === username;
    var messageElement = document.createElement('li');
    var messageCoverElement = document.createElement('span');

    messageCoverElement.classList.add('chat-message-cover');
    messageElement.classList.add('chat-message');
    if(isMe){
        messageCoverElement.classList.add('me');
        messageElement.classList.add('me');
    }
    var avatarElement = document.createElement('i');
    var avatarText = document.createTextNode(message.sender[0]);
    avatarElement.appendChild(avatarText);
    avatarElement.style['background-color'] = getAvatarColor(message.sender);

    messageCoverElement.appendChild(avatarElement);

    var usernameElement = document.createElement('span');
    var usernameText = document.createTextNode(message.sender);
    usernameElement.appendChild(usernameText);
    messageCoverElement.appendChild(usernameElement);

    var imageCoverElement = document.createElement('a');
    imageCoverElement.classList.add('spotlight');
    imageCoverElement.href = message.content;
    var imageElement = document.createElement('img');
    imageElement.src = message.content;
    imageCoverElement.appendChild(imageElement);

    var dateElement = document.createElement('h6');
    var dateText = document.createTextNode(parseDateString(message.date.substring(11)));
    dateElement.appendChild(dateText);

    if(isMe){
        messageCoverElement.appendChild(dateElement);
        messageCoverElement.appendChild(imageCoverElement);
    }else{
        messageCoverElement.appendChild(imageCoverElement);
        messageCoverElement.appendChild(dateElement);
    }

    messageElement.appendChild(messageCoverElement);

    messageArea.appendChild(messageElement);
    setTimeout(function () {
        messageArea.scrollTop = messageArea.scrollHeight;
    },50);

    event.preventDefault();
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}

function clearChatText() {
    $("#messageArea").empty();
}

/* 현재 시간 yyyy-mm-dd hh:mm:ss 포맷으로 가져오기 */
function getTimeStamp() {
    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2) + ' ' +

        leadingZeros(d.getHours(), 2) + ':' +
        leadingZeros(d.getMinutes(), 2) + ':' +
        leadingZeros(d.getSeconds(), 2);
    return s;
}

function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}


/* 날짜 변환 함수 ex) 오전 12:00 */
function parseDateString(a) {
    var time = a; // 'hh:mm' 형태로 값이 들어온다
    var getTime = time.substring(0, 2);
    var intTime = parseInt(getTime);
    if (intTime < 12 ) {
        var str = '오전 ';
    } else {
        var str = '오후 ';
    }
    if (intTime == 12) {
        var cvHour = intTime;
    } else {
        var cvHour = intTime%12;
    }
    var res = str + ('0' + cvHour).slice(-2) + time.substring(2,5);
    return res;
}
