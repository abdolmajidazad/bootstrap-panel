myApp.directive('notFoundPage', function () {
    return {
        restrict: 'E',
        scope: {
            text: "@"
        },
        templateUrl: 'library/bundle/html/not-found-directive.html?@@timeStampVersion',
        controller: function ($rootScope, $scope) {
        }
    };
});
