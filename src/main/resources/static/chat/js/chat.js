'use strict';

var stompClient = null;
var rooms = null;
var currentRoom  = null;
var chatPage = document.querySelector('#chat-page');
var messageArea = document.querySelector('#messageArea');
var tempMessageCover = document.createElement('div');
var connectingElement = document.querySelector('.connecting');
var chatSideMenu = document.querySelector('.chat-sidebar-tab');
var layout = document.querySelector('.layout-main');
var contextMenu = document.querySelector('.chat-context-menu-container');

app.controller("chatController", function ($scope, Scopes, $http, $sce, $uibModal, $filter, $timeout, $compile, $localStorage, $sessionStorage, UserService) {
    Scopes.store('chatController', $scope);
    // 사용자 모델
    $scope.me = UserService.user;
    // 현재 채팅방의 사용자 모델
    $scope.currentMe = angular.copy($scope.me);
    // 사용자 설정
    $scope.config = UserService.config;

    $scope.loadChatList = function(){
        $scope.filteredRooms = null;
        $http({
            method: 'GET',
            url: 'test'
        }).then(function successCallback(response){
            $scope.rooms = response.data;
            for(var i = 0; i < $scope.rooms.length; i++){
                // 채팅방 참여자 인풋
                $scope.rooms[i].participants = [
                    {
                        id: 1,
                        nickname: "방장님",
                        email: "park@naver.com",
                        avatar: "/chat/img/thumbnail_example.png",
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
                        avatar: "/chat/img/thumbnail_example.png"
                    })
                }

                // 채팅방 사진 저장소 인풋
                for(var j = 1; j < 10; j++){
                    var image = {
                        url:  "/chat/img/image_example.jpg",
                        date: Date.now().toString()
                    };
                    $scope.addImageToChatStorage($scope.rooms[i], image);
                }
            }
            $scope.filteredRooms = $scope.rooms;
        }, function errorCallback(response){
            console.log('채팅방 정보를 가져오는데 오류발생 -> ' +response);
        });
    }
    $scope.loadChatList();

    // 채팅 모듈 설정 데이터
    $scope.initConfig = function(){
        $scope.config_chat = {
            // 입력한 메시지
            tempMessage: "",
            // 채팅방 내 유저선택시 들어오는 모델
            selectedParticipant: {
                id: -1,
                nickname: null,
                email: null,
                thumbnail: null
            },
            // 이미지 선택 배열
            selectedImages: [],
            ui:{
                navBarIndex: 0,
                sidebarIndex: -1,
                scrollLimit:[
                    {limit: 18}, //채팅방 목록
                    {limit: 18}, //채팅방 정보(참여자 수)
                    {limit: 18}, //이미지 서랍
                    {limit: 18} //채팅방 사진 저장소
                ],
                visibleContextMenu: false,
                visibleImageInput: false
            }
        }
    }
    $scope.initConfig();

    // 채팅방 임시 데이터 생성
    $scope.initChatRoomData = function(){
        $scope.manager = $filter('filter')($scope.currentRoom.participants, {id: currentRoom.managerId}, true)[0];
    }

    // 채팅방의 사진 저장소에 사진 추가
    $scope.addImageToChatStorage = function(room, image){
        // 중복된 이미지가 저장소에 있는지 확인
        if($filter('filter')(room.savedImages, {url: image.url}, true)[0] != null){

        }else{
            room.savedImages.push(image);
        }

    }

    // 이미 채팅방에 접속중인지
    $scope.isAlreadyJoined = function(room){
        // return room.participants.indexOf($scope.me)!==-1;
        return !!$filter('filter')($scope.me.myRooms, {id: room.id}, true)[0];
    }
    $scope.tryConnect = function($event, room){
        if($scope.isAlreadyJoined(room)){
            $scope.connect($event, room);
        }else{
            $scope.openModalJoinNewChatRoom($event, room);
        }
    }


    // 채팅방 접속
    $scope.connect = function ($event, room) {
        connectingElement.classList.remove('hidden');
        $timeout(function () {
            currentRoom = room;
            chatPage.classList.remove('hidden');
            connectingElement.classList.add('hidden');
            clearChatText();
            if($scope.isAlreadyJoined(room)){
                $scope.currentRoom = $filter('filter')($scope.me.myRooms, {id: room.id}, true)[0];
                $scope.initChatRoomData();
                $scope.currentMe = $filter('filter')($scope.currentRoom.participants, {id: $scope.me.id}, true)[0];
                if(!$scope.currentMe){
                    console.log('오류 -> ' + 'currentMe');
                }
                $scope.getChatRoomMessages($scope.currentRoom);
            }else{
                $scope.currentRoom = room;
                $scope.initChatRoomData();
                /* 채팅방 프로필 설정창 오픈*/
                $scope.currentRoom.participants.push(angular.copy($scope.currentMe));
                if($scope.currentRoom.participants.length===1)
                    $scope.assignChatRoomManager();
                if($scope.me.myRooms.indexOf($scope.currentRoom) === -1){
                    $scope.me.myRooms.push($scope.currentRoom);
                }
            }
            $scope.setChatRoomMessageIndex($scope.currentRoom);
            $scope.onClickNavBar(1);

            if($event)
                $event.preventDefault();
        }, 1000);
    };

    // 메시지 전송 검증
    $scope.isValidationSendMessage = function(){
        if($scope.config_chat.tempMessage.length>0 && !$scope.config_chat.ui.visibleImageInput){
            return true;
        }
        return false;
    }
    // 이미지 메시지 전송 검증
    $scope.isValidationSendImageMessage = function(){
        if($scope.config_chat.selectedImages.length>0)
            return true;
        return false;
    }

    // 메시지 전송
    $scope.sendMessage = function ($event) {
        var messageContent = $scope.config_chat.tempMessage;
        if(messageContent.length<1){
            return;
        }
        clearChatText();
        var message = {
            id: $scope.currentRoom.messages.length > 0 ? $scope.currentRoom.messages[$scope.currentRoom.messages.length-1].index + 1 : 0,
            type: 'CHAT',
            state: 0,
            element : null,
            content: messageContent,
            sender: $scope.currentMe.nickname,
            senderModel: $scope.currentMe,
            date: getTimeStamp(),
            index: $scope.currentRoom.messages.length > 0 ? $scope.currentRoom.messages[$scope.currentRoom.messages.length-1].index + 1 : 0
        };
        $scope.currentRoom.messages.push(message);
        $scope.setChatRoomMessageIndex($scope.currentRoom);
        renderMessage(message);
        $event.preventDefault();
        scrollToBottom();
    };
    // 이미지 메시지 배열 전송
    $scope.sendSelectedImageMessage = function($event){
        if($scope.isValidationSendImageMessage()){
            for(var i = 0; i < $scope.config_chat.selectedImages.length; i++){
                $scope.sendImageMessage($event, $scope.config_chat.selectedImages[i].url);
            }
            $timeout(function () {
                scrollToBottom();
            },100);

            $scope.config_chat.selectedImages = [];
        }
    }

    // 이미지 메시지 전송
    $scope.sendImageMessage = function($event, url){
        var message = {
            id: $scope.currentRoom.messages.length > 0 ? $scope.currentRoom.messages[$scope.currentRoom.messages.length-1].index + 1 : 0,
            type: 'IMAGE',
            content: url,
            state: 0,
            element : null,
            sender: $scope.currentMe.nickname,
            senderModel: $scope.currentMe,
            date: getTimeStamp(),
            index: $scope.currentRoom.messages.length > 0 ? $scope.currentRoom.messages[$scope.currentRoom.messages.length-1].index + 1 : 0
        };
        $scope.currentRoom.messages.push(message);
        $scope.setChatRoomMessageIndex($scope.currentRoom);
        renderImageMessage(message);
        var image = {
            url: url,
            date: Date.now().toString()
        }
        $scope.addImageToChatStorage($scope.currentRoom, image);
        $event.preventDefault();
        scrollToBottom();
    };

    // 업로드 이미지 메시지 전송
    $scope.sendImageFileMessage = function($event, element){
        var reader = new FileReader();
        reader.onload = function(e)
        {
            $scope.sendImageMessage($event, e.target.result);
        };
        if(element.file)
            reader.readAsDataURL(element.file);
    }

    // 메시지 인덱스 설정
    $scope.setChatRoomMessageIndex = function(room){
        $scope.me.myRoomsMeta[room.id] = $scope.getChatRoomMessageIndex(room);
    }

    // 메시지 인덱스 가져오기
    $scope.getChatRoomMessageIndex = function(room){
        return room.messages.length > 0 ? room.messages[room.messages.length-1].index : 0;
    }

    // 읽지 않은 메시지 수
    $scope.getUnreadMessageCount = function(room){
        var count = ($scope.getChatRoomMessageIndex(room) - $scope.me.myRoomsMeta[room.id]);
        if(count === 0)
            return null;
        else
            return count;
    }


    // 이미 참여한 대화방에 연결시 기존의 대화내용들을 불러온다
    $scope.getChatRoomMessages = function(room){
        tempMessageCover = null;
        for(var i = 0 ; i < room.messages.length; i++){
            if(room.messages[i].type==='CHAT'){
                renderMessage(room.messages[i]);
            }else if(room.messages[i].type==='IMAGE'){
                renderImageMessage(room.messages[i]);
            }
        }
        $timeout(function () {
            scrollToBottom();
        },100);
    }

    // 채팅방의 가장 최근 메시지 정보를 가져오는 함수
    $scope.getLatestMessage = function(room){
        if(room.messages.length > 0){
            var msg = room.messages[room.messages.length-1];
            if(msg.type==='CHAT'){
                if(msg.content.length>30)
                    return msg.content.substring(0,30)+'...';
                return msg.content;
            }else if(msg.type==='IMAGE'){
                return '(사진)';
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
            $scope.config_chat.ui.sidebarIndex = 0;
            chatSideMenu.style.display = 'inline-block';
        }else{
            $scope.config_chat.ui.sidebarIndex = -1;
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
            if($scope.currentRoom.managerId === $scope.me.id){
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
        console.log('방장 위임 : ' + $scope.currentRoom.managerId + ' -> ' + $scope.currentRoom.participants[0].id);
        $scope.currentRoom.managerId = $scope.currentRoom.participants[0].id;
    }

    // 좌측 메뉴바 탭 선택 이벤트
    $scope.onClickNavBar = function(index, $event){
        $scope.config_chat.ui.navBarIndex = index;
    }

    // 좌측 메뉴바 현재 탭인지 확인
    $scope.isSelectedNavBar = function(index){
        return $scope.config_chat.ui.navBarIndex === index;
    }

    // 우측 메뉴바 선택 이벤트
    $scope.onClickOpenSidebar = function(index){
        if($scope.config_chat.ui.sidebarIndex === index){
            $scope.onClickToggleMenu();
            return;
        }
        $scope.config_chat.ui.sidebarIndex = index;
        var display = chatSideMenu.style.display;
        if(display === 'none' || display ===''){
            chatSideMenu.style.display = 'inline-block';
        }
    }

    // 우측 메뉴바 현재 탭인지 확인
    $scope.isSelectedSidebar = function(index){
        return $scope.config_chat.ui.sidebarIndex === index;
    }

    // 이미지 인풋창 오픈
    $scope.onClickOpenImageInput = function(){
        $scope.config_chat.ui.visibleImageInput = !$scope.config_chat.ui.visibleImageInput;
        $scope.config_chat.selectedImages = [];
    }

    // 이미지 목록창에서 이미지배열 선택
    $scope.onClickSelectImage = function (image) {
        if($scope.isSelectedImage(image)){
            $scope.config_chat.selectedImages.splice($scope.config_chat.selectedImages.indexOf(image), 1);
        }else{
            $scope.config_chat.selectedImages.push(image);
        }
    }

    // 선택된 이미지인지 확인
    $scope.isSelectedImage = function(image){
        return $scope.config_chat.selectedImages.indexOf(image) !== -1;
    }

    // 채팅방 프로필 설정 모달창 오픈
    $scope.openModalJoinNewChatRoom = function($event, room){
        layout.style.filter = "blur(1px)";
        var modalInstance = $uibModal.open({
            templateUrl: 'modal/modal_chat_profile',
            controller: 'chatProfileModalController',
            resolve: {
                user: function () {
                    return $scope.me;
                },
                room: room
            }
        });
        modalInstance.result.then(function (profile) {
            $scope.currentMe = angular.copy($scope.me);
            $scope.currentMe.nickname = profile.nickname;
            $scope.currentMe.avatar = profile.avatar;

            layout.style.filter = "";
            $scope.connect($event, room);
        }, function () {
            layout.style.filter = "";
        });

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

    // 공지 편집 이벤트
    $scope.onClickEditNotification = function(room){
        room.chatRoomConfig.isEditNotification = !room.chatRoomConfig.isEditNotification;
    }

    // 공지 더보기 이벤트
    $scope.onClickMoreNotification = function(room){
        if(!room.chatRoomConfig.isEditNotification)
            room.chatRoomConfig.isMoreNotification = !room.chatRoomConfig.isMoreNotification;
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
                return (room.title.indexOf(keyword) !== -1 || room.categories.filter(function (category) {
                    return category.indexOf(keyword)!==-1
                })[0]);
            });
        }, 1000);
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
                return room.categories.filter(function (category) {
                    return category === tag;
                })[0];
            });
        }, 2000);
    }
    // 부모 클릭 이벤트 막기
    $scope.onClickPreventParentEvent = function($event){
        $event.stopPropagation();
    }
    
    // 좋아요 버튼
    $scope.onClickLikeChatRoom = function (room) {
        if($scope.isAlreadyLikeChatRoom(room)){
            room.likes.splice(room.like.indexOf($scope.me.id),1);
        }else{
            room.likes.push($scope.me.id);
        }
    }
    // 이미 좋아요를 눌렀는지 확인
    $scope.isAlreadyLikeChatRoom = function (room) {
        if(room.likes.indexOf($scope.me.id)===-1){
            return false;
        }else{
            return true;
        }
    }

    // 최근 입력한 메시지가 같은 시간, 같은 사람이면 이어 붙인다
    $scope.isEqualLastMessageSender = function(message){
        if($scope.currentRoom.messages.length<2 || !tempMessageCover)
            return false;
        var lastMessage = $scope.currentRoom.messages[$scope.currentRoom.messages.length-2];
        return (lastMessage.sender === message.sender && lastMessage.date.substring(lastMessage.date.length-3, lastMessage.date.length-8) === message.date.substring(message.date.length-3
        , message.date.length-8));
    }

    // 메시지의 컨텍스트 메뉴를 보여준다
    $scope.onLoadContextMenu = function(messageId){
        $scope.selectedMessage = $filter('filter')($scope.currentRoom.messages, {id: messageId}, true)[0];
    }

    // 이미지 메시지 저장
    $scope.onClickSaveSelectedImage = function($event){
        if($scope.selectedMessage && $scope.selectedMessage.type === 'IMAGE'){
            var image = {
                id: $scope.selectedMessage.id,
                url: $scope.selectedMessage.content,
                date: Date.now().toString()
            }
            $scope.me.album.push(image);
        }
        $event.preventDefault();
    }

    // 메시지 신고
    $scope.onClickReportMessage = function () {
        if($scope.selectedMessage){
            console.log($scope.selectedMessage.content + '신고됨');
        }
    }

    // 메시지 숨기기
    $scope.onClickHideMessage = function () {
        if($scope.selectedMessage){
            var elem = $scope.selectedMessage.element;
            if(elem){
                var textElement = document.createElement('p');
                textElement.innerHTML = '메시지가 삭제되었습니다.';
                elem.parentNode.replaceChild(textElement, elem);
            }
        }
    }
    // 공지 가져오기
    $scope.getNotification = function(room){
        if(room){
            if(room.notification.length > 0)
                return room.notification;
            else
                return '공지사항이 없습니다.';
        }
    }

    // 공지 더보기 스타일
    $scope.styleNotificationText =function (room) {
        if(room){
            if(room.chatRoomConfig.isMoreNotification){
                return {
                    "white-space" : "initial"
                }
            }else{
                return {
                    "white-space" : "nowrap"
                }
            }
        }
        return "";
    }

    // 텍스트 메시지에서 url이 포함된 경우 추출하는 함수
    $scope.extractUrlFromMessage = function(content){
        var urlRE= new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
        if(content.match(urlRE)){
            var url = urlRE.exec(content)[0];
            $scope.getUrlMetaData(url);
        }else{
            console.log('url이 포함되어 있지 않음');
        }
    }

    // 링크 주소 메타 데이터 가져오기
    $scope.getUrlMetaData = function (url) {
        $http({
            method: 'JSONP',
            url: $sce.trustAsResourceUrl(url)
        }).
        then(function(data) {
            console.log('success -> ' + data);
        },function(error) {
            console.log('error -> ' + error);
        });
    }


    function disConnect(){
        currentRoom = null;
        chatPage.classList.add('hidden');
        connectingElement.classList.add('hidden');
    }

    // 텍스트 메시지를 그리는 함수
    function renderMessage(message) {
        var isMe = message.sender === $scope.currentMe.nickname;

        var isEqualSender = $scope.isEqualLastMessageSender(message);
        if(isEqualSender){
            renderInMessage(message, isEqualSender);
            return;
        }
        var messageElement = document.createElement('li');
        var messageCoverElement = document.createElement('span');

        messageCoverElement.classList.add('chat-message-cover');
        messageElement.classList.add('chat-message');
        if(isMe){
            messageCoverElement.classList.add('me');
            messageElement.classList.add('me');
        }
        var avatarElement = document.createElement('i');
        avatarElement.style['background-color'] = getAvatarColor(message.sender);
        if(!message.senderModel.avatar){
            var avatarText = document.createTextNode(message.sender[0]);
            avatarElement.appendChild(avatarText);
        }else{
            var avatarImage = document.createElement('img');
            avatarImage.src = $scope.currentMe.avatar;
            avatarImage.style.objectFit="cover";
            avatarImage.style.width='42px';
            avatarImage.style.maxWidth='42px';
            avatarImage.style.height='42px';
            avatarImage.style.margin='0 auto';
            avatarElement.appendChild(avatarImage);
        }


        messageCoverElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageCoverElement.appendChild(usernameElement);

        var dateElement = document.createElement('h6');
        var dateText = document.createTextNode(parseDateString(message.date.substring(11)));
        dateElement.appendChild(dateText);

        var coverElement = document.createElement('div');
        coverElement.classList.add('chat-equal-cover');
        coverElement.appendChild(dateElement);
        tempMessageCover = coverElement;
        renderInMessage(message, isEqualSender);

        messageCoverElement.appendChild(coverElement);

        messageElement.appendChild(messageCoverElement);

        messageArea.appendChild(messageElement);
    }

    // 메시지 커버 내부에 말풍선 그리는 함수
    function renderInMessage(message, isEqualSender){
        var textElement = document.createElement('p');
        var messageText = document.createTextNode(message.content);
        if(!isEqualSender)
            textElement.classList.add('start');
        var dateElement = tempMessageCover.getElementsByTagName('h6')[0];
        textElement.appendChild(dateElement);
        textElement.appendChild(messageText);
        textElement.setAttribute( 'ng-right-click', 'onLoadContextMenu(' + message.id +')');
        textElement.setAttribute('context', 'chat-message-context');
        message.element = textElement;

        $compile(textElement)($scope);
        tempMessageCover.appendChild(textElement);
    }

    // 메시지 커버 내부에 이미지 그리는 함수
    function renderInImageMessage(message){
        var imageCoverElement = document.createElement('a');
        var dateElement = tempMessageCover.getElementsByTagName('h6')[0];
        imageCoverElement.appendChild(dateElement);
        imageCoverElement.classList.add('spotlight');
        imageCoverElement.href = message.content;
        var imageElement = document.createElement('img');
        imageElement.src = message.content;
        imageCoverElement.appendChild(imageElement);
        imageCoverElement.setAttribute( 'ng-right-click', 'onLoadContextMenu(' + message.id +')');
        imageCoverElement.setAttribute('context', 'chat-message-context');
        message.element = imageCoverElement;
        $compile(imageCoverElement)($scope);
        tempMessageCover.appendChild(imageCoverElement);
    }

    // 이미지 메시지를 그리는 함수
    function renderImageMessage(message) {
        var isMe = message.sender === $scope.currentMe.nickname;

        if($scope.isEqualLastMessageSender(message)){
            renderInImageMessage(message);
            return;
        }

        var messageElement = document.createElement('li');
        var messageCoverElement = document.createElement('span');

        messageCoverElement.classList.add('chat-message-cover');
        messageElement.classList.add('chat-message');
        if(isMe){
            messageCoverElement.classList.add('me');
            messageElement.classList.add('me');
        }

        var avatarElement = document.createElement('i');
        if(!message.senderModel.avatar){
            var avatarText = document.createTextNode(message.sender[0]);
            avatarElement.appendChild(avatarText);
            avatarElement.style['background-color'] = getAvatarColor(message.sender);
        }else{
            var avatarImage = document.createElement('img');
            avatarImage.src = $scope.currentMe.avatar;
            avatarImage.style.width='42px';
            avatarImage.style.maxWidth='42px';
            avatarImage.style.height='42px';
            avatarImage.style.margin='0 auto';
            avatarElement.appendChild(avatarImage);
        }

        messageCoverElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageCoverElement.appendChild(usernameElement);

        var dateElement = document.createElement('h6');
        var dateText = document.createTextNode(parseDateString(message.date.substring(11)));
        dateElement.appendChild(dateText);

        var coverElement = document.createElement('div');
        coverElement.classList.add('chat-equal-cover');
        coverElement.appendChild(dateElement);
        tempMessageCover = coverElement;
        renderInImageMessage(message);

        messageCoverElement.appendChild(coverElement);
        messageElement.appendChild(messageCoverElement);

        messageArea.appendChild(messageElement);
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

    // 텍스트 입력창 초기화
    function clearChatText() {
        $scope.config_chat.tempMessage = "";
    }

    // 스크롤 아래로 내리기
    function scrollToBottom(){
        messageArea.scrollTop = messageArea.scrollHeight;
    }

});

// 채팅방 정보 배경 이미지 변경
app.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background':
                        'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + value + ') center center',
                'background-size': 'cover'
            });
        });
    };
});

// 채팅방 썸네일 배경 이미지 변경
app.directive('thumbnailImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('thumbnailImg', function(value) {
            element.css({
                'background':
                    'linear-gradient(to top, rgba(30,30,30,0.5) 20%,rgba(255,255,255,0.5) 70% , rgba(255,255,255,1)), url(' + value + ') center center'
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


// 롱 클릭 이벤트 -> 화면 렌더링 문제있어서 일시적으로 주석처리
app.directive('ngLongClick', function($timeout, $document) {
    return {
        restrict: 'A',
        link: function($scope, $elm, $attrs) {
            $elm.bind('mousedown', function(evt) {
                $scope.longClicking = true;
                $timeout(function() {
                    if ($scope.longClicking) {
                        $scope.$apply(function() {
                            $scope.$eval($attrs.ngLongClick);
                        });
                    }
                }, 600);
            });
        }
    };
});

//우측 마우스 클릭시 컨텍스트 메뉴 세팅
app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});

// 가로 스크롤 이벤트
app.directive('hScroll', function(){
    return {
        restrict: 'A',
        link: function(scope,elem,attrs){
            $(elem).on('wheel', function(evt){
                var current = elem[0].scrollLeft;
                var wheel = evt.originalEvent.wheelDelta;
                if(wheel >0){
                    elem[0].scrollLeft -= 200;
                }else if(wheel <0){
                    elem[0].scrollLeft += 200;
                }
                evt.preventDefault();
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
    var time = a;
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
