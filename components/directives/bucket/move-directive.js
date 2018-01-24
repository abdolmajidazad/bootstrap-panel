myApp.directive("moveDirective", function () {
    return {
        restrict: "E",
        scope: {},
        templateUrl: 'library/bundle/html/move-template.html?@@timeStampVersion',
        controller: 'moveDirectiveController'
    };
});
myApp.controller("moveDirectiveController", ['$scope', 'loader', '$rootScope', function ($scope, loader, $rootScope) {
    let getDirective = $("#move-directive-id");
    const loadMoveFunc = () => {
        loader.show('#move-directive-id');
        $scope.data = {
            Buckets: {
                "file": [
                    {
                        CreationDate: "date1",
                        Name: "file 1",
                        Mime: 'document',
                        Owner: "me",
                        LastModified: "Dec 1, 2012",
                        FileSize: "8 MB"
                    },
                    {
                        CreationDate: "Date2",
                        Name: "file 2",
                        Mime: 'word',
                        Owner: "me",
                        LastModified: "Dec 1, 2012",
                        FileSize: "2 MB"
                    },
                    {
                        CreationDate: "Date3",
                        Name: "file 3",
                        Mime: 'powerpoint',
                        Owner: "me",
                        LastModified: "Dec 1, 2012",
                        FileSize: "10 MB"
                    },
                    {
                        CreationDate: "Date3",
                        Name: "file 4",
                        Mime: 'spreadsheet',
                        Owner: "me",
                        LastModified: "Dec 1, 2012",
                        FileSize: "10 MB"
                    },
                    {
                        CreationDate: "Date3",
                        Name: "file 5",
                        Mime: 'archive',
                        Owner: "me",
                        LastModified: "Dec 1, 2012",
                        FileSize: "10 MB"
                    }
                ],
                "folder": [
                    {
                        CreationDate: "date1",
                        Name: "examplebucket",
                        Owner: "me",
                        LastModified: "Dec 1, 2012",
                        FileSize: "8 MB"
                    },
                    {
                        CreationDate: "Date2",
                        Name: "examplebucket2",
                        Owner: "me",
                        LastModified: "Dec 1, 2012",
                        FileSize: "2 MB"
                    },
                    {
                        CreationDate: "Date3",
                        Name: "examplebucket3",
                        Owner: "me",
                        LastModified: "Dec 1, 2012",
                        FileSize: "10 MB"
                    }
                ],
                "Owner": {
                    DisplayName: "own-display-name",
                    ID: "examplee7a2f25102679df27bb0ae12b3f85be6f290b936c4393484be31"
                }
            }


        };
        $scope.dataList = [...$scope.data['Buckets']['folder'], ...$scope.data['Buckets']['file']];
        setTimeout(() => {
            $scope.$apply();
            loader.hide('#move-directive-id');
        }, 500)
    };


    $(document).keyup(function (e) {
        if (e.keyCode === 27) { // escape key maps to keycode `27`
            $scope.close()
        }
    });
    $scope.close = () => {
        getDirective.css('display', 'none');
    };


    $scope.$on("loadMoveFunc", (e, type, id, view, contentType) => {
        loadMoveFunc();
        let $el = '';
        if (type === 'header') {
            $el = $("#move-item-header-site");
        } else {
            $el = $("#item-id-" + type + "-" + id);
        }
        let offset = $el.offset();
        getDirective.css('display', 'block');
        if (type === 'header') {
            getDirective.css('top', offset.top - 4);
            getDirective.css('left', offset.top + 110);
        } else {
            getDirective.css('left', offset.left);
            if (view) {
                getDirective.css('top', offset.top - 20);
            } else {
                if (contentType === 'file') {
                    getDirective.css('top', offset.top + 112);
                } else {
                    getDirective.css('top', offset.top - 20);
                }
            }
        }


    });

    $('html').click(() => {
        getDirective.click((event) => {
            event.stopPropagation();
        });
        getDirective.css('display', 'none');
    });

    $scope.itemSelected = {};
    $scope.itemSelectedFunc = (data) => {
        $scope.itemSelected = data
    };


    $scope.newFolder = () => {

    }


}]);