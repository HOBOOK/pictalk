'use strict';

var stompClient = null;
var rooms = null;
var currentRoom  = null;
var chatPage = document.querySelector('#chat-page');
var messageInput = document.querySelector('#chat-message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');
var chatSideMenu = document.querySelector('#chat-side-tab');
var layout = document.querySelector('.layout-main');

app.controller("chatController", function ($scope, $http, $uibModal, $filter, $timeout) {
    $scope.me ={
        id: 0,
        nickname: "나다",
        email: "me@naver.com",
        thumbnail: "/chat/img/thumbnail_example.png",
        album: [
            {
                url:"/chat/img/image_example.jpg"
            },{
                url:"/img/no-image.png"
            },{
                url:"/chat/img/thumbnail_example.png"
            },{
                url:"/img/logo/logo_endspring.png"
            },{
                url:"/chat/img/thumbnail_example.png"
            },{
                url:"/chat/img/thumbnail_example.png"
            },{
                url:"/chat/img/image_example.jpg"
            },{
                url:"/chat/img/image_example.jpg"
            },{
                url:"/chat/img/thumbnail_example.png"
            }],
        myRooms: [],
        myRoomsMeta: []
    }

    $timeout(function () {
        $scope.rooms = [{
            id: 0,
            type: 0,
            title: "방제목",
            description: "대화하고 노실분들 입장하세용",
            category:["태그1","태그2"],
            img: "/img/no-image.png",
            max: 100,
            createDate: "2020.07.13",
            manager_id: 1,
            participants: [],
            messages:[]
        }];

        var roomImages = ["/chat/img/thumbnail_example.png","/img/no-image.png"];
        for(var i = 1; i < 100; i++){
            $scope.rooms.push({
                id: i,
                type: 1,
                title: "방제목 " + i,
                description: "대화하고 노실분들 입장하세용",
                category:["태그1","태그2"],
                img: roomImages[(i%roomImages.length)],
                max: 500,
                createDate: "2020.07.13",
                manager_id: 1,
                participants: [],
                messages:[]
            });
            $scope.rooms[i].participants = [
                {
                    id: 1,
                    nickname: "방장님",
                    email: "park@naver.com",
                    thumbnail: "/chat/img/thumbnail_example.png",
                    album: [{
                        url:"/chat/img/image_example.jpg"
                    },{
                        url:"/img/no-image.png"
                    },{
                        url:"/chat/img/thumbnail_example.png"
                    }]
                }];
            var nicknames = ["팍경호","쏭치민","쵸지은","호경봑","민지쏭","은지쵸"];
            for(var j = 2; j < 200; j++){
                $scope.rooms[i].participants.push({
                    id: j,
                    nickname: nicknames[(j%nicknames.length)],
                    email: "park@naver.com",
                    thumbnail: "/chat/img/thumbnail_example.png"
                })
            }

        }
        $scope.filteredRooms = $scope.rooms;
        $scope.$apply();
    },1000);


    // 채팅 모듈 설정 데이터
    $scope.initConfig = function(){
        $scope.config_chat = {
            // 채팅방 내 유저선택시 들어오는 모델
            selectedParticipant: {
                id: -1,
                nickname: null,
                email: null,
                thumbnail: null
            },
            ui:{
                mainBarIndex: 0,
                sidebarIndex: 0,
                scrollLimit:[
                    {limit: 18}, //채팅방 목록
                    {limit: 18}, //채팅방 정보(참여자 수)
                    {limit: 18}, //이미지 서랍
                    {limit: 18} //채팅방 사진 저장소
                ]
            }
        }
    }
    $scope.initConfig();

    // 채팅방 임시 데이터 생성
    $scope.initChatRoomData = function(){
        $scope.storage_image = [
            {
                id: 0,
                url: "/chat/img/image_example.jpg"
            }]
        for(var i = 1; i < 100; i++){
            $scope.storage_image.push({
               id: i,
               url:  "/chat/img/image_example.jpg"
            });
        }
        $scope.manager = $filter('filter')($scope.currentRoom.participants, {id: currentRoom.manager_id}, true)[0];
    }

    // 이미 채팅방에 접속중인지
    $scope.isAlreadyJoined = function(room){
        return room.participants.indexOf($scope.me)!==-1;
    }

    // 채팅방 접속
    $scope.connect = function ($event, room) {
        connectingElement.classList.remove('hidden');
        $timeout(function () {
            if($scope.me) {
                disConnect();
                currentRoom = room;
                chatPage.classList.remove('hidden');
                connectingElement.classList.add('hidden');
                clearChatText();

                $scope.currentRoom = room;
                $scope.initChatRoomData();
                if($scope.isAlreadyJoined(room)){
                    $scope.getChatRoomMessages(room);
                }else{
                    $scope.currentRoom.participants.push($scope.me);
                    if($scope.currentRoom.participants.length===1)
                        $scope.assignChatRoomManager();
                    if($scope.me.myRooms.indexOf($scope.currentRoom) === -1){
                        $scope.me.myRooms.push($scope.currentRoom);
                    }
                }
                $scope.setChatRoomMessageIndex($scope.currentRoom);
            }
            if($event)
                $event.preventDefault();
        }, 2000);
    };

    // 메시지 전송
    $scope.sendMessage = function ($event) {
        var messageContent = messageInput.value.trim();
        if(messageContent.length<1){
            return;
        }
        var message = {
            type: 'CHAT',
            content: messageContent,
            sender: $scope.me.nickname,
            date: getTimeStamp(),
            index: $scope.currentRoom.messages.length > 0 ? $scope.currentRoom.messages[$scope.currentRoom.messages.length-1].index + 1 : 0
        };
        $scope.currentRoom.messages.push(message);
        $scope.setChatRoomMessageIndex($scope.currentRoom);
        renderMessage(message);
        $event.preventDefault();
    };

    // 메시지 전송 (읽지 않은 메시지 카운트 테스트)
    $scope.sendTestMessage = function()  {
        var room = $scope.me.myRooms[0];
        var message = {
            type: 'CHAT',
            content: '테스트',
            sender: $scope.me.nickname,
            date: getTimeStamp(),
            index: room.messages.length > 0 ? room.messages[room.messages.length-1].index + 1 : 0
        };
        room.messages.push(message);
        $scope.$apply();
    };
    
    // 이미지 메시지 전송
    $scope.sendImageMessage = function($event, url){
        var message = {
            type: 'IMAGE',
            content: url,
            sender: $scope.me.nickname,
            date: getTimeStamp(),
            index: $scope.currentRoom.messages.length > 0 ? $scope.currentRoom.messages[$scope.currentRoom.messages.length-1].index + 1 : 0
        };
        $scope.currentRoom.messages.push(message);
        $scope.setChatRoomMessageIndex($scope.currentRoom);
        renderImageMessage(message);
        $event.preventDefault();
    };

    // 업로드 이미지 메시지 전송
    $scope.sendImageFileMessage = function($event, element){
        var reader = new FileReader();
        reader.onload = function(e)
        {
            $scope.sendImageMessage($event, e.target.result);
        };
        reader.readAsDataURL(element.file);
    }
    $scope.setChatRoomMessageIndex = function(room){
        $scope.me.myRoomsMeta[room.id] = $scope.getChatRoomMessageIndex(room);
        console.log($scope.me.myRoomsMeta[room.id]);
    }

    $scope.getChatRoomMessageIndex = function(room){
        return room.messages.length > 0 ? room.messages[room.messages.length-1].index : 0;
    }

    $scope.getUnreadMessageCount = function(room){
        var count = ($scope.getChatRoomMessageIndex(room) - $scope.me.myRoomsMeta[room.id]);
        if(count === 0)
            return null;
        else
            return count;
    }

    // 이미 참여한 대화방에 연결시 기존의 대화내용들을 불러온다
    $scope.getChatRoomMessages = function(room){
        for(var i = 0 ; i < room.messages.length; i++){
            if(room.messages[i].type==='CHAT'){
                renderMessage(room.messages[i]);
            }else if(room.messages[i].type==='IMAGE'){
                renderImageMessage(room.messages[i]);
            }
        }
    }

    // 채팅방의 가장 최근 메시지 정보를 가져오는 함수
    $scope.getLatestMessage = function(room){
        if(room.messages.length > 0){
            var msg = room.messages[room.messages.length-1];
            if(msg.type==='CHAT'){
                return msg.content;
            }else if(msg.type==='IMAGE'){
                return '사진';
            }else{
                return '';
            }
        }else{
            return null;
        }
    }

    // 우측 상단 메뉴 토글 버튼
    $scope.onClickToggleMenu = function () {

        var display = chatSideMenu.style.display;
        if(display === 'none' || display ===''){
            chatSideMenu.style.display = 'inline-block';
        }else{
            $scope.config_chat.ui.sidebarIndex = 0;
            chatSideMenu.style.display = 'none';
        }
    };

    // 채팅방 나가기 버튼
    $scope.onClickExitChatRoom = function(){
        $scope.me.myRooms.splice($scope.me.myRooms.indexOf($scope.currentRoom), 1);
        $scope.currentRoom.participants.splice($scope.currentRoom.participants.indexOf($scope.me), 1);
        
        if($scope.currentRoom.participants.length === 0){
            // 채팅방 제거
            $scope.deleteChatRoom();
        }else{
            // 방장 위임
            if($scope.currentRoom.manager_id === $scope.me.id){
                $scope.assignChatRoomManager();
            }
        }
        chatSideMenu.style.display = 'none';
        disConnect();
    }
    
    // 채팅방 제거
    $scope.deleteChatRoom = function(){
        console.log('채팅방 제거 : ' + $scope.currentRoom.id);
        $scope.rooms.splice($scope.rooms.indexOf($scope.currentRoom),1);
    }
    
    // 방장 위임
    $scope.assignChatRoomManager = function(){
        console.log('방장 위임 : ' + $scope.currentRoom.manager_id + ' -> ' + $scope.currentRoom.participants[0].id);
        $scope.currentRoom.manager_id = $scope.currentRoom.participants[0].id;
    }

    // 좌측 메뉴바 탭 선택 이벤트
    $scope.onClickOpenMainBar = function(index, $event){
        $scope.config_chat.ui.mainBarIndex = index;
    }

    // 우측 메뉴바 선택 이벤트
    $scope.onClickOpenSidebar = function(index){
        $scope.config_chat.ui.sidebarIndex = index;
        chatSideMenu.style.display = 'inline-block';
    }

    // 채팅방 생성 버튼
    $scope.onClickAddChatRoom = function(){
        layout.style.filter = "blur(1px)";
        var modalInstance = $uibModal.open({
            templateUrl: 'modal/modal_chat',
            controller: 'chatModalController'
        });
        modalInstance.result.then(function (newChatRoom) {
            console.log("modal click ok : " + newChatRoom);
            $scope.rooms.push(newChatRoom);
            $scope.connect(null, newChatRoom);
            layout.style.filter = "";
        }, function () {
            console.log('modal에서 dismissed at: ' + new Date());
            layout.style.filter = "";
        });
    }
    
    // 채팅방 참여자 선택 버튼
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
    
    // 스크롤 이벤트
    $scope.scrollMore = function(limit){
        limit.limit += 9;
    }

    // 채팅방 검색
    $scope.search ={
        room: ""
    }
    $scope.onClickSearch = function(keyword){
        $scope.search.room = "";
        $scope.filteredRooms = null;
        $timeout(function () {
            $scope.config_chat.ui.scrollLimit[0].limit = 18;
            var tempRooms = $scope.rooms;
            $scope.filteredRooms = $filter('filter')(tempRooms, function (room) {
                return (room.title.indexOf(keyword) !== -1 || room.category.filter(function (category) {
                    return category.indexOf(keyword)!==-1
                })[0]);
            });
        }, 2000);
    }
    $scope.onKeyDownSearch = function($event,keyword){
        if($event.which === 13){
            $scope.onClickSearch(keyword);
        }
    }
    
    // 태그 검색 이벤트
    $scope.onClickTagSearch = function(tag){
        tag = tag.substring(1);
        $scope.filteredRooms = null;
        $timeout(function () {
            $scope.config_chat.ui.scrollLimit[0].limit = 18;
            var tempRooms = $scope.rooms;
            $scope.filteredRooms = $filter('filter')(tempRooms, function (room) {
                return room.category.filter(function (category) {
                    return category === tag;
                })[0];
            });
        }, 2000);
    }
    function disConnect(){
        currentRoom = null;
        chatPage.classList.add('hidden');
        connectingElement.classList.add('hidden');
    }

    // 텍스트 메시지를 그리는 함수
    function renderMessage(message) {
        messageInput.value = '';
        var isMe = message.sender === $scope.me.nickname;
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
    }

    // 이미지 메시지를 그리는 함수
    function renderImageMessage(message) {

        var isMe = message.sender === $scope.me.nickname;
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
    }


    // 임의의 아바타 그리기
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
});

// 채팅방 정보 배경 이미지 변경
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

// 드래그 앤 드랍
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

// 드래그 앤 드랍
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
                if(data !== '' && data !== null){
                    scope.sendImageMessage(evt, data);
                }

            });
        }
    }
});

// 스크롤 로드
app.directive('whenScrolled', function () {
    return {
        restrict: 'A',
        link: function(scope, elem, attr, controller) {
            var raw = elem[0];
            elem.bind("scroll", function(){
                if(raw.scrollTop+raw.offsetHeight+5 >= raw.scrollHeight){
                    scope.loading = true;
                    scope.$apply(attr.whenScrolled);
                }
            });
        }
    }
});

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

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
