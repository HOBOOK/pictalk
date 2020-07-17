app.controller('infoController', function ($scope, $uibModalInstance, no, logs) {

    console.log(logs);

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    }

    $scope.logReports = logs;

    angular.element(document).ready( function () {
        $("#log-tab").trigger("click");

        dTable = $('#table-info');
        dTable.DataTable();

        dTable2 = $('#report-info');
        dTable2.DataTable();
    });


});