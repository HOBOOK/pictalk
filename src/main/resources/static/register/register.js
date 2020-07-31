var appRegister = angular.module("registerApp", ['ngAnimate']);


//사용자 정의 정규식
// appRegister.directive("empty", function(){
//     return {
//         require: 'ngModel',
//         link: function(scope, elm, attrs, ctrl){
//             ctrl.$validators.integer = function(modelValue, viewValue){
//                 if(ctrl.$isEmpty(modelValue)){
//                     //비어 있을 경우 유효한 것으로 간주한다.
//                     return true;
//                 };
//                 // if(INTEGER_REGEXP.test(viewValue)){
//                 //     //정규식과 일치하므로 유효함
//                 //     return true;
//                 // };
//                 //위 두조건을 모두 만족하지 않으므로 유효하지 않음
//                 return false;
//             };
//         }
//     };
// });
//

appRegister.controller('registerCtrl',function ($scope,$timeout,$window) {

    $scope.checkFirst = false;
    $scope.checkedEmail = false;
    $scope.registerAlert= false;
    $scope.createdUser={};

    $scope.checkEmailalert = false;


    $scope.creatUser = function(user){
        $scope.createdUser = angular.copy(user);
        $scope.registerAlert= false;
        $scope.registerAlert= true;
        $scope.result = $timeout(function () {
            $scope.registerAlert = false;
            $window.location.href = "../signin";
        }, 3500);

    }


    $scope.checkEmail = function (email) {

        $scope.checkFirst = true;
        $scope.checkedEmail = true;
        $scope.checkEmailalert = false;

    }





});