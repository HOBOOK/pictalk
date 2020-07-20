'use strict';

var nav = document.querySelector('.navLi');

app.controller('mypageCtrl',function ($scope, $location,UserService) {
    $scope.person = UserService.user;

    $scope.selected = $location.absUrl().split("http://localhost:8080/")[1];

    // 팔로워 삭제
    $scope.followerRemove = function (follow) {
        var idx = $scope.person.follows.findIndex(function (item) {
            return item.id == follow.id;
        });

        if (idx > -1) {
            $scope.person.follows.splice(idx, 1);
        }
    }



    // 정보 수정
    $scope.showHide = false;
    $scope.editText = "수정";
    $scope.editToggle = function () {
        if ($scope.showHide == true) {
            $scope.showHide = false;
            alert("변경사항이 저장됩니다.");
            $scope.editText = "수정";
        } else {
            $scope.showHide = true;
            $scope.editText = "저장";
        }
    }

    // 프로필 수정
    $scope.changeProfileImg = function($event,element) {

        var reader = new FileReader();
        reader.readAsDataURL(element.file);

        reader.onload = function (e) {
            $scope.person.avatar = e.target.result;
            $scope.$apply();

        }

    }


    // 보관함 이미지 삭제
    $scope.imgRemove = function (img) {
        var idx = $scope.person.album.findIndex(function (item) {
            return item.id == img.id;
        })

        if(idx>-1){
            $scope.person.album.splice(idx,1)
        }
    };




});


