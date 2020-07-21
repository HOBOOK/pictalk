
app.controller("dashboardCtrl", function ($scope) {

    $scope.board = [{
        title: "",
        count: "10000",
        percent: "15"
    },{
        title: "",
        count: "15000",
        percent: "30"
    },{
        title: "",
        count: "8500",
        percent: "32"
    },{
        title: "",
        count: "50000",
        percent: "10"
    }];

    console.log($scope.board[0]);

    $scope.chart = [{
        title: "",
        count: "",
        percent: ""
    }];

});