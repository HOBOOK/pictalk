
app.controller('infoController', function ($scope, $http, $uibModalInstance, account_info) {

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    }

    $scope.account = account_info;


    $scope.getLog = function(){
        $http({
            method:"get",
            url:"/ /",
            // data:{msg:$scope.msg},
        }).success(function(data){
            console.log(data);
        });
    };


    $scope.logs = [{
        no: "1",
        roomName: "채팅방",
        content: "로그내역1",
        logDate: "2020/07/13 24:00:00",
        remark: ""
    },{
        no: "2",
        roomName: "채팅방",
        content: "로그내역2",
        logDate: "2020/07/13 24:00:00",
        remark: ""
    },{
        no: "3",
        roomName: "채팅방",
        content: "로그내역3",
        logDate: "2020/07/13 24:00:00",
        remark: ""
    },{
        no: "4",
        roomName: "채팅방",
        content: "로그내역4",
        logDate: "2020/07/13 24:00:00",
        remark: ""
    },{
        no: "5",
        roomName: "채팅방",
        content: "로그내역5",
        logDate: "2020/07/13 24:00:00",
        remark: ""
    },{
        no: "6",
        roomName: "채팅방",
        content: "로그내역6",
        logDate: "2020/07/13 24:00:00",
        remark: ""
    },{
        no: "7",
        roomName: "채팅방",
        content: "로그내역7",
        logDate: "2020/07/13 24:00:00",
        remark: ""
    },{
        no: "8",
        roomName: "채팅방",
        content: "로그내역8",
        logDate: "2020/07/13 24:00:00",
        remark: ""
    },{
        no: "9",
        roomName: "채팅방",
        content: "로그내역9",
        logDate: "2020/07/13 24:00:00",
        remark: ""
    },{
        no: "10",
        roomName: "채팅방",
        content: "로그내역10",
        logDate: "2020/07/13 24:00:00",
        remark: ""
    },{
        no: "11",
        roomName: "채팅방",
        content: "로그내역11",
        logDate: "2020/07/13 24:00:00",
        remark: ""
    }];

    $scope.reports = [{
        no: "1",
        roomName: "채팅방1",
        content: "/management/img/jieun.jpg",
        reportContent: "신고내용1",
        userNo: "신고자번호",
        reportDate: "2020/07/15 24:00:00",
    },{
        no: "2",
        roomName: "채팅방2",
        content: "/management/img/jieun.jpg",
        reportContent: "신고내용2",
        userNo: "신고자번호",
        reportDate: "2020/07/15 24:00:00",
    }];


    angular.element(document).ready( function () {
        $("#info-tab").trigger("click");

        dTable = $('#table-info');
        dTable.DataTable();

        dTable2 = $('#report-info');
        dTable2.DataTable();
    });


    // 프로필사진 초기화
    $scope.profile_default = function() {
        $scope.account.profile = "/management/img/profile.png";
    };

    // 계정 정지
    $scope.account_ban= function() {
        var ban_days = $("#ban_days option:selected").val();
        console.log(ban_days);

        $scope.account.connect = "ban";
    };

    // 계정 정지 해제
    $scope.account_unban = function() {
        $scope.account.ban = "오늘날짜";
        $scope.account.connect = "off";
    };

    // 계정 삭제
    $scope.account_delete = function() {
        $scope.account.connect = "delete";
    };
    // 계정 삭제 취소
    $scope.account_delete_cancle = function() {
        $scope.account.connect = "off";
    };


});