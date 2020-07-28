var app = angular.module("mainApp", ['ngAnimate', 'ngSanitize', 'ui.bootstrap','ngFileUpload','ngStorage']);
app.config(['$qProvider', function ($qProvider) {

    $qProvider.errorOnUnhandledRejections(false);

}]);

app.factory('UserService', function($localStorage) {
    // 사용자 계정 모델
    var tempUserModel = {
        id: 0,
        firstName: "choi",
        lastName: "jieun",
        password: "1234",
        nickname: "나다",
        email: "me@naver.com",
        avatar: "/chat/img/thumbnail_example.png",
        gender: "Female",
        album: [
            {
                id:0,
                url: "/chat/img/image_example.jpg",
                date: 1595174296810
            }, {
                id:40,
                url: "/img/no-image.png",
                date: 1595174296820
            }, {
                id:30,
                url: "/chat/img/thumbnail_example.png",
                date: 1595174296842
            }, {
                id:12,
                url: "/img/logo/logo_endspring.png",
                date: 1595174296845
            }, {
                id:87,
                url: "/chat/img/thumbnail_example.png",
                date: 1595174296852
            }, {
                id:13,
                url: "/chat/img/thumbnail_example.png",
                date: 1595174296854
            }, {
                id:9,
                url: "/chat/img/image_example.jpg",
                date: 1595174296855
            }, {
                id:88,
                url: "/chat/img/image_example.jpg",
                date: 1595174296860
            }, {
                id:33,
                url: "/chat/img/thumbnail_example.png",
                date: 159517429688
            }],
        myRooms: [],
        myRoomsMeta: [],
        follows: [{
            id: 1,
            avatar: 'choidanbi.jpeg',
            nickname: 'Jieun',
            state:"off"
        },
            {
                id: 2,
                avatar: 'choidanbi.jpeg',
                nickname: 'danbi',
                state:"on"
            },
            {
                id: 3,
                avatar: 'choidanbi.jpeg',
                nickname: '치민',
                state:"off"
            },
            {
                id: 4,
                avatar: 'choidanbi.jpeg',
                nickname: '경호',
                state:"on"


            }]
    }
    if(!$localStorage.user)
        $localStorage.user = tempUserModel;

    
    // 사용자 환경 설정 모델
    var config = {
        security: {
            isPrivateProfile: false,
            isRejectInvite: false
        },
        style:{
            isDarkTheme: false,
            scale: 1,
            background: ""
        },
        notification: {
            isHideUnreadMessageCount: false,
            isAlertNews: false
        }
    }
    if(!$localStorage.config)
        $localStorage.config = config;
    return {
        user : $localStorage.user,
        config : $localStorage.config
    };
});
app.factory('Scopes', function ($rootScope) {
    var mem = {};
    return {
        store: function (key, value) {
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
});

app.controller('navController', function ($scope, Scopes, $location) {
    Scopes.store('navController', $scope);
    $scope.selectedModuleIndex = 0;
    $scope.initModule = function () {
        var absUrl = $location.absUrl();
        if (absUrl.indexOf('mychat') !== -1){
            $scope.selectedModuleIndex = 1;

        }else if(absUrl.indexOf('mypage') !== -1) {
            $scope.selectedModuleIndex = 2;
        }else if(absUrl.indexOf('configuration') !== -1){
            $scope.selectedModuleIndex = 3;
        }else{
            $scope.selectedModuleIndex = 0;

        }
    }

    $scope.initModule();

    $scope.isSelectedModule = function (index) {
        return $scope.selectedModuleIndex === index;
    }

    $scope.onClickSelectModule = function(index, $event){
        if($scope.selectedModuleIndex <= 1 && (index === 0 || index === 1)){
            $event.preventDefault();
            Scopes.get('chatController').onClickOpenMainBar(index);
        }
        $scope.selectedModuleIndex = index;
    }
});