
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



    //
    // var ctx = document.getElementById('myChart');
    // var ctx = document.getElementById('myChart').getContext('2d');
    // var ctx = $('#myChart');
    // var ctx = 'myChart';


    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["전월", "금월", "평균"],
            datasets: [
                {
                    data: [10,15,21,40],
                    label: "접속",
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                },
                {
                    data: [27,13,34,37],
                    label: "계정",
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    data: [19,25,44,60],
                    label: "채팅방",
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    data: [19,25,44,60],
                    label: "사진",
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '증가량',
                fontSize: 24
            }
        }
    });




    // label: '# of Votes',
    //     data: [12, 19, 3, 5, 2, 3],
    //     backgroundColor: [
    //     'rgba(255, 99, 132, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(255, 206, 86, 0.2)',myPieChart
    //     'rgba(75, 192, 192, 0.2)',
    //     'rgba(153, 102, 255, 0.2)',
    //     'rgba(255, 159, 64, 0.2)'
    // ],
    //     borderColor: [
    //     'rgba(255,99,132,1)',
    //     'rgba(54, 162, 235, 1)',
    //     'rgba(255, 206, 86, 1)',
    //     'rgba(75, 192, 192, 1)',
    //     'rgba(153, 102, 255, 1)',
    //     'rgba(255, 159, 64, 1)'
    // ],
    //     borderWidth: 1



    var ctx2 = document.getElementById('myPieChart');
    var myPieChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            datasets: [{
                // 퍼센트로 바꾸기
                data: [50, 50],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                '남',
                '여',
            ]
        },
        options: {
            title: {
                display: true,
                text: '비율',
                fontSize: 13
            }
        }
    });

    var ctx3 = document.getElementById('myPieChart2');
    var myPieChart2 = new Chart(ctx3, {
        type: 'pie',
        data: {
            datasets: [{
                // 퍼센트로 바꾸기
                data: [10, 20, 30],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                '사진',
                '일반',
                '통합'
            ]
        },
        options: {
            title: {
                display: true,
                text: '채팅방 비율',
                fontSize: 13
            }
        }
    });


});