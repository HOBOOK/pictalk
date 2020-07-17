'use strict';
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "personal"
        })
        .when("/follow", {
            templateUrl : "follow"
        })
        .when("/pictures", {
            templateUrl : "pictures"
        });
});


app.controller('mypageCtrl',function ($scope) {
    $scope.follows = [
        {
            src: 'choidanbi.jpeg',
            name: 'Jieun'
        },
        {
            src: 'choidanbi.jpeg',
            name: 'danbi'
        },
        {
            src: 'choidanbi.jpeg',
            name: '치민'
        },
        {
            src: 'choidanbi.jpeg',
            name: '경호'
        }
    ]


    $scope.followerRemove = function (follow) {
        var idx = $scope.follows.findIndex(function (item) {
            return item.name == follow.name;
        });

        if (idx > -1) {
            $scope.follows.splice(idx, 1);
        }
    }


    $scope.person =
        {
            firstName: 'choi',
            lastName: 'jieun',
            nickName: 'danbi',
            password: '1234'

        }
    $scope.showHide = false;
    $scope.editText = "edit";
    $scope.editToggle = function () {
        if ($scope.showHide == true) {
            $scope.showHide = false;
            alert("변경사항이 저장됩니다.");
            $scope.editText = "edit";
        } else {
            $scope.showHide = true;
            $scope.editText = "save";
        }
    }

    $scope.images=[
        {
            src: 'choidanbi.jpeg',
            id:1

        },
        {
            src: 'choidanbi.jpeg',
            id:2
        },
        {
            src: 'choidanbi.jpeg',
            id:3
        },
        {
            src: 'choidanbi.jpeg',
            id:4
        }
    ]


    $scope.imgRemove = function (img) {
        var idx = $scope.images.findIndex(function (item) {
            return item.id == img.id;
        })

        if(idx>-1){
            $scope.images.splice(idx,1)
        }
    }


});
// $scope.nav = function (name) {
//     return {
//                 templateUrl: 'personal'
//             };
//
// }


// $scope.test = function(name){
//         alert(name);
//     //     app.directive('myCustomUrlFunction', function () {
//     //     return {
//     //         templateUrl: function (element) {
//     //             return name;
//     //         }
//     //     };
//     // });
//     // $http({
//     //     method: 'GET',
//     //     url: name
//     // }).then(function successCallback(response) {
//     //     $scope.myHTML = response.data;
//     //
//     // }, function errorCallback(response) {
//     //
//     // });
// }






    // $scope.nav= '';
    // $scope.mypage =
    //
    // $scope.rightWrap = $scope.

    // $scope.test = function () {
    //     alert('song');
    //
    //     return {
    //         templateUrl: 'personal'
    //     };
    // }


// app.directive('mydirc', function() {
//     return {
//         restrict: 'E',
//         replace: true,
//         // template: '<div></div>',
//         link: function($scope, element, attrs) {
//             $scope.test= function(name) {
//                 return {
//                     templateUrl: name
//                 }
//             }
//         }
//     }
// });

