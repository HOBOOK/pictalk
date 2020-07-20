var app = angular.module("mainApp", ['ngAnimate', 'ngSanitize', 'ui.bootstrap','ngFileUpload']);

var tempUserModel = {
    id: 0,
    firstName: "choi",
    lastName: "jieun",
    password: "1234",
    nickname: "나다",
    email: "me@naver.com",
    avatar: "/chat/img/thumbnail_example.png",
    album: [
        {
            url: "/chat/img/image_example.jpg",
            date: 1595174296810
        }, {
            url: "/img/no-image.png",
            date: 1595174296820
        }, {
            url: "/chat/img/thumbnail_example.png",
            date: 1595174296842
        }, {
            url: "/img/logo/logo_endspring.png",
            date: 1595174296845
        }, {
            url: "/chat/img/thumbnail_example.png",
            date: 1595174296852
        }, {
            url: "/chat/img/thumbnail_example.png",
            date: 1595174296854
        }, {
            url: "/chat/img/image_example.jpg",
            date: 1595174296855
        }, {
            url: "/chat/img/image_example.jpg",
            date: 1595174296860
        }, {
            url: "/chat/img/thumbnail_example.png",
            date: 159517429688
        }],
    myRooms: [],
    myRoomsMeta: [],
    follows: [{
            id: 1,
            avatar: 'choidanbi.jpeg',
            nickname: 'Jieun'
        },
        {
            id: 2,
            avatar: 'choidanbi.jpeg',
            nickname: 'danbi'
        },
        {
            id: 3,
            avatar: 'choidanbi.jpeg',
            nickname: '치민'
        },
        {
            id: 4,
            avatar: 'choidanbi.jpeg',
            nickname: '경호'
        }]
}
app.factory('UserService', function() {
    return {
        user : tempUserModel
    };
});