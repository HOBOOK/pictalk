var app = angular.module("mainApp", ['ngAnimate', 'ngSanitize', 'ui.bootstrap','ngFileUpload','ngStorage']);

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
app.factory('UserService', function() {
    return {
        user : tempUserModel

    };
});