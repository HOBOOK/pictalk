'use strict';

app.controller("accountCtrl", function ($scope, $uibModal, $http, $document) {
    $scope.show="false";
    $scope.accounts = [{
        no: "1",
        profile: "/management/img/profile.png",
        email: "",
        name: "박경호",
        nickname: "호북이",
        gender: "남",
        birthday: "",
        joinDate: "2020-07-09 20:00",
        reportCount: 1,
        state: "on"
    },{
        no: "2",
        profile: "/management/img/profile.png",
        email: "vzcxds@gamil.com",
        name: "송치민",
        nickname: "송치킨",
        gender: "남",
        birthday: "",
        joinDate: "2020-07-09 20:00",
        reportCount: 10,
        state: "off"
    },{
        no: "3",
        profile: "/management/img/profile.png",
        email: "",
        name: "최지은",
        nickname: "최단비",
        gender: "여",
        birthday: "",
        joinDate: "2020-07-09 20:00",
        reportCount: 112,
        state: "ban"
    },{
        no: "4",
        profile: "/management/img/profile.png",
        email: "",
        name: "",
        nickname: "",
        gender: "",
        birthday: "",
        joinDate: "2020-07-09 20:00",
        reportCount: 0,
        state: 0
    },{
        no: "5",
        profile: "/management/img/profile.png",
        email: "",
        name: "",
        nickname: "",
        gender: "",
        birthday: "",
        joinDate: "2020-07-09 20:00",
        reportCount: 0,
        state: 0
    },{
        no: "6",
        profile: "/management/img/profile.png",
        email: "",
        name: "",
        nickname: "",
        gender: "",
        birthday: "",
        joinDate: "2020-07-09 20:00",
        reportCount: 0,
        state: 0
    },{
        no: "7",
        profile: "/management/img/profile.png",
        email: "",
        name: "",
        nickname: "",
        gender: "",
        birthday: "",
        joinDate: "2020-07-09 20:00",
        reportCount: 0,
        state: 0
    },{
        no: "8",
        profile: "/management/img/profile.png",
        email: "",
        name: "",
        nickname: "",
        gender: "",
        birthday: "",
        joinDate: "2020-07-09 20:00",
        reportCount: 0,
        state: 0
    },{
        no: "9",
        profile: "/management/img/profile.png",
        email: "",
        name: "",
        nickname: "",
        gender: "",
        birthday: "",
        joinDate: "2020-07-09 20:00",
        reportCount: 0,
        state: 0
    },{
        no: "10",
        profile: "/management/img/profile.png",
        email: "",
        name: "",
        nickname: "",
        gender: "",
        birthday: "",
        joinDate: "2020-07-09 20:00",
        reportCount: 0,
        state: 0
    },{
        no: "11",
        profile: "/management/img/profile.png",
        email: "",
        name: "",
        nickname: "",
        gender: "",
        birthday: "",
        joinDate: "2020-07-09 20:00",
        reportCount: 0,
        state: 0
    }];


    $scope.openModal = function(item) {

        var modalInstance = $uibModal.open({
            templateUrl: '/console/info',
            controller: 'infoController',
             size: 'lg',
            resolve: {
                no: function () {
                    return item.no;
                },
            }
        });
        modalInstance.result.then(function (item) {

        }, function () {

        });
    }

    // $scope.click = function() {
    //
    //     console.log('dddd');
    //     $('#account-modal').modal('show');
    //
    //     $http({
    //         method: 'GET',
    //         url: 'info'
    //     }).then(function successCallback(response) {
    //         $scope.myHTML = response.data;
    //
    //     }, function errorCallback(response) {
    //
    //     });
    // }

});

// app.config(['$qProvider', function ($qProvider) {
//     $qProvider.errorOnUnhandledRejections(false);
// }]);
