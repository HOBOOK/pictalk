

app.controller("alarmCtrl", function ($scope) {

    $scope.showHide = false;

    $scope.alarms = [{
        no: "1",
        pofile: "/img/logo/logo.png",
        name: "송치민",
        content: "120번 채팅방 삭제",
        time: "1"
    },{
        no: "2",
        pofile: "/img/logo/logo.png",
        name: "박경호",
        content: "121번 채팅방 삭제",
        time: "2"
    },{
        no: "3",
        pofile: "/img/logo/logo.png",
        name: "최지은",
        content: "122번 채팅방 삭제",
        time: "3"
    },{
        no: "4",
        pofile: "/img/logo/logo.png",
        name: "송치민",
        content: "123번 채팅방 삭제",
        time: "4"
    },{
        no: "5",
        pofile: "/img/logo/logo.png",
        name: "박경호",
        content: "1102번 회원 정지",
        time: "5"
    }];


    //나중에 Back단에서 읽음 처리하기~
    $scope.alarm_Allclear = function() {
        $scope.alarms.splice(0);
        $("#notification").hide();
    };

    $scope.alarm_clear = function (alarm) {
        var idx = $scope.alarms.findIndex(function (item) {
            return item.no == alarm.no;
        })

        if(idx>-1){
            $scope.alarms.splice(idx,1)
        }
    };


    //알림창 버튼
    $scope.notificationButton = function () {
        if($("#notification").css("display") === "block") {
            $("#notification").hide();
        }else{
            $("#notification").show();
        }
    };

    //알림창 밖 section 부분 클릭시 닫기
    $("section").click(function(e) {
        if($("#notification").css("display") === "block") {
            if(!$('#notification').has(e.target).length == 1) {
                $("#notification").hide();
            }
        }
    });



});
