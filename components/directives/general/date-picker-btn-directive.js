myApp.directive("datePickerBtnDirective", function () {
    return {
        restrict: "E",
        scope: {
            overViewStatus: "=?",
            config: "=?"
        },
        templateUrl: 'library/bundle/html/date-picker-btn-template.html?@@timeStampVersion',
        controller: 'datePickerBtnController'
    };
});
myApp.controller("datePickerBtnController", ['$scope', '$timeout', "$filter", function ($scope, $timeout, $filter) {
    let datePickerSelected = {};
    $scope.getDateSelected = function (state) {
        let defaultDate = {
            selectFrom: new Date().setDate(new Date().getDate() - 7),
            selectTo: Number(new Date()),
            from: new Date().setDate(new Date().getDate() - 7),
            to: Number(new Date())
        };
        let from, to;
        let d = new Date();
        if (state) {
            datePickerSelected = {};
            switch (state) {
                case 'day':
                    from = Number(new Date());
                    to = Number(new Date());
                    break;
                case 'week':
                    from = d.setDate(d.getDate() - 7);
                    to = Number(new Date());
                    break;
                case 'month':
                    from = d.setMonth(d.getMonth() - 1);
                    to = Number(new Date());
                    break;

            }
        } else {
            from = (datePickerSelected && datePickerSelected['start']) ? datePickerSelected['start'] : defaultDate['from'];
            to = (datePickerSelected && datePickerSelected['end']) ? datePickerSelected['end'] : defaultDate['to'];
        }
        $scope.dateSelected = {
            selectFrom: from,
            selectTo: to,
            from: $filter("toPersianDate")(new persianDate(from)),
            to: $filter("toPersianDate")(new persianDate(to))
        };


        $scope.$emit("datePickerBtnResponse", {
            from: $filter("toEnDigit")($filter("toPersianDate")(new persianDate(from))),
            to: $filter("toEnDigit")($filter("toPersianDate")(new persianDate(to)))
        });
        $scope.toggleBox = false;
    };

    $scope.$watch('overViewStatus', function (n) {
        $scope.getDateSelected(n);
    });


    $scope.toggleBoxFunc = function () {
        $scope.toggleBox = !$scope.toggleBox;

        $scope.dateSelected['selectFrom'] = $scope.dateSelected['selectFrom'] || new Date().setDate(new Date().getDate() - 7)
        $scope.dateSelected['selectFrTo'] = $scope.dateSelected['selectFrTo'] || Number(new Date())

        $timeout(function () {
            $scope.$apply()
        }, 1)
    };


    $scope.$on("datePickerIsoDate", function (n, data) {
        datePickerSelected[data['position']] = data['date'];

    });


    let click;
    $("#body-content").click(function () {
        if (document.getElementsByClassName("btn-date-picker") && document.getElementsByClassName("btn-date-picker")[0]) {
            document.getElementsByClassName("btn-date-picker")[0].addEventListener("click", function (event) {
                click = 1
            }, true);
        }
        if (document.getElementsByClassName('date-picker-box') && document.getElementsByClassName('date-picker-box')[0]) {
            document.getElementsByClassName('date-picker-box')[0].addEventListener("click", function (event) {
                click = 1
            }, true);
        }

        if (click === 0) {
            $scope.toggleBox = false;
            $timeout(function () {
                $scope.$apply()
            }, 1)
        }
        click = 0
    });


    $scope.closeBox = function () {
        $scope.toggleBox = false;
        $timeout(function () {
            $scope.$apply()
        }, 1)
    }

}]);