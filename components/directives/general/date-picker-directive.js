myApp.directive("datePickerDirective", function () {
    return {
        restrict: "E",
        scope: {
            position: "=?",
            config: "=?",
            setDateCurrent: "=?"
        },
        templateUrl: 'library/bundle/html/date-picker-template.html?@@timeStampVersion',
        controller: 'datePickerController'
    };
});
myApp.controller("datePickerController", ['$scope', '$timeout', function ($scope, $timeout) {
    if ($.isNumeric($scope.setDateCurrent)) {
        $scope.setDateCurrent = moment($scope.setDateCurrent).format("L")
    }
    let firstCall = 0;
    let datePickerConfig = {
        autoClose: true,
        onSelect: function (unix) {
            // if (firstCall > 0) {
            emitData(unix);
            // }

        }
    };

    // http://babakhani.github.io/PersianWebToolkit/doc/datepicker/example/
    $scope.config = {
        //     inline: true,
        //     altField: '#inlineExampleAlt',
        //     format: 'L',
        initialValue: true,
        initialValueType: 'persian',
        format: 'YYYY/MM/DD',
        //     altFormat: 'L',
        //     maxDate: new persianDate().add('month', 3).valueOf(),
        //     minDate: new persianDate().subtract('month', 3).valueOf(),
        //     timePicker: {
        //         enabled: true,
        //         meridiem: {
        //             enabled: true
        //         }
        //     },
        //     observer: true,
        //     format: 'YYYY/MM/DD',
        //     formatter: function(unix){
        //         return 'selected unix: ' + unix;
        //     },
        persianDigit: true,
        //     viewMode: 'year',
        //     checkDate: function(unix){
        //         return new persianDate(unix).day() != 4;
        //     },
        //     checkMonth: function(month){
        //         return month < 6;
        //     },
        //     checkYear: function(year){
        //         return year >= 1391;
        //     },
        //     onlyTimePicker: true,
        //     autoClose: true,
        //     onSelect: function(unix){
        //         console.log('datepicker select : ' + unix);
        //     }
    }

    if ($scope.config) {
        datePickerConfig = Object.assign($scope.config, datePickerConfig);
    }


    $timeout(function () {
        $('.date-picker-' + $scope.position).persianDatepicker(datePickerConfig);
    }, 10);


    $scope.removeDate = function () {
        $('.date-picker-' + $scope.position).val('');
        emitData('');
        firstCall++
    };

    function emitData(unix) {


        $scope.$emit('datePickerIsoDate',
            {
                // date: unix ? new Date(unix).toISOString() : '',
                date: unix ? unix : '',
                position: $scope.position
            }
        )
    }


}]);