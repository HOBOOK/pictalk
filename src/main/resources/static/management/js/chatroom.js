app.controller("chatRoomCtrl", function ($scope) {

    $scope.chatrooms = [{
        no: 0,
        type: 0,
        title: "방제목",
        description: "대화하고 노실분들 입장하세용",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_gif_example.gif",
        max: 100,
        createDate: "2020.07.13",
        private: true,
        manager_id: 1,
        participants: [],
        like: [],
        messages:[],
        accessKey: "1234",
        storageImage:[]
    },{
        no: 1,
        type: 0,
        title: "방제목2",
        description: "대화하고 노실분들 입장하세용2",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_gif_example.gif",
        max: 100,
        createDate: "2020.07.13",
        private: true,
        manager_id: 2,
        participants: [],
        like: [],
        messages:[],
        accessKey: "1234",
        storageImage:[]
    }];

    angular.element(document).ready( function () {
        $('#account-table').dataTable();
    });


});
