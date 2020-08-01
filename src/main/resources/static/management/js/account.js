'use strict';

app.controller("accountCtrl", function ($scope, $uibModal, $http, $document) {
    // $scope.show="false";
    $scope.accounts = [{
        no: "1",
        email: "park@gmail.com",
        name: "박경호",
        nickname: "호북이",
        gender: "남",
        profile: "/management/img/profile.png",
        ban: "",
        authority: 0,
        connect: "on",
        joinDate: "2020-07-09 20:00",
        reportDate: "2020-07-20 16:00",
        reportCount: 1
    },{
        no: "2",
        email: "vzcxds@gamil.com",
        name: "송치민",
        nickname: "송치킨",
        gender: "남",
        profile: "/management/img/profile.png",
        ban: "",
        authority: 1,
        connect: "off",
        joinDate: "2020-07-09 20:00",
        reportDate: "2020-07-20 16:00",
        reportCount: 10
    },{
        no: "3",
        email: "choi@gmail.com",
        name: "최지은",
        nickname: "최단비",
        gender: "남",
        profile: "/profile/choidanbi.jpeg",
        ban: "날짜",
        authority: 1,
        connect: "ban",
        joinDate: "2020-07-09 20:00",
        reportDate: "2020-07-20 16:00",
        reportCount: 112
    },{
        no: "4",
        email: "kim@gmail.com",
        name: "송아리",
        nickname: "송알",
        gender: "여",
        profile: "/management/img/profile.png",
        ban: "날짜",
        authority: 1,
        connect: "delete",
        joinDate: "2020-07-09 20:00",
        reportDate: "2020-07-20 16:00",
        reportCount: 112
    }];


    angular.element(document).ready( function () {
        $('#account-table').dataTable();
    });



    $scope.openModal = function(account_info) {

        // console.log(account_info);

        //사용자 번호에 해당하는 Log,Report account_info랑 넘겨주기
        // $scope.getLog = function(){
        //     $http({
        //         method:"get",
        //         url:"/ /",
        //         // data:{msg:$scope.msg},
        //     }).success(function(data){
        //         console.log(data);
        //     });
        // };


        var modalInstance = $uibModal.open({
            templateUrl: '/console/info',
            controller: 'infoController',
            size: 'lg',
            resolve: {
                account_info: function () {
                    return account_info;
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






    $scope.openAddModal = function() {

        var modalInstance = $uibModal.open({
            templateUrl: '/console/add',
            controller: 'addAccountCtrl',
            size: 'lg',
            resolve: {

            }
        });
        modalInstance.result.then(function (item) {

        }, function () {
            alert('2');
        });
    }





});
