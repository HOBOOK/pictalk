'use strict';

app.controller('personalCtrl',function ($scope) {
    $scope.person=
        {
            firstName: 'choi',
            lastName:'jieun',
            nickName: 'danbi',
            password: '1234'

        }
    $scope.showHide = false;
    $scope.editText="edit"
    $scope.editToggle = function () {
        if($scope.showHide==true){
            $scope.showHide=false;
            alert("변경사항이 저장됩니다.")
            $scope.editText="edit";
        }
        else{
            $scope.showHide=true;
            $scope.editText="save";
        }
    }
})