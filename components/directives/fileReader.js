myApp.directive('fileReader', function($parse) {
    return {
        scope: {
            fileReader: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    // scope.fileread = changeEvent.target.files[0];
                    // or all selected prodfiles:
                    scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
});