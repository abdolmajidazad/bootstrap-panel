myApp.directive("directoryDirective", function () {
    return {
        restrict: "E",
        scope: {
            pageContent: "=?",
            viewType: "=?", //grid | list
            contentType: "=?",  //file | directory
        },
        // compile: function() {
        //     return {
        //         pre: function(scope, formElement, attr, controller) {
        //             console.log("scope, formElement, attr, controller: ", scope, formElement, attr, controller)
        //         }
        //     }/
        // },
        templateUrl: 'library/bundle/html/directory-template.html?@@timeStampVersion',
        controller: 'directoryDirectiveController'
    };
});
myApp.controller("directoryDirectiveController", ['$scope', '$rootScope', 'contextMenuFactory', function ($scope, $rootScope, contextMenuFactory) {
    $scope.selectedItem = '';
    $scope.menuOptions = contextMenuFactory;
    $scope.clickFolder = (selectedItem) => {
        /**
         * use for select and deselect items
         */
        $rootScope.$broadcast('selectedItem', selectedItem);
    };


    $scope.dblclickFolder = (selectedItem) => {
        alert('directory')
    };


    $scope.$on('deselectItem', (e,data)=>{
        console.log("data: ", data)
        $scope.selectedItem = "";
        setTimeout(()=>{$scope.$apply()},1)
    });
    $scope.$on('selectedItem', (n, itemSelected) => {
        $scope.selectedItem = "";
        if ($scope.viewType === 'list') {
            let filterContent = $scope.pageContent.filter(item => {
                return (item['Name'] === itemSelected)
            });
            if (!filterContent[0]) return;
            $scope.selectedItem = filterContent[0]['Name'];
            $rootScope.$broadcast('contentSelectedInformation', filterContent[0], $scope.viewType,'directory-directive');

        } else {
            $scope.selectedItem = itemSelected === $scope.pageContent['Name'] ? itemSelected : "";
            if ($scope.selectedItem)
                $rootScope.$broadcast('contentSelectedInformation', $scope.pageContent, $scope.viewType,'directory-directive');
        }
    });


    $scope.$on('dropDownItem', (a, data) => {
        $scope.itemDropDown = '';
        if (!$rootScope.generalData['viewType']) {
            if ($scope.viewType === 'grid') {
                if (data['Name'] === $scope.pageContent['Name']) {
                    $scope.itemDropDown = $scope.pageContent['Name'].replace(/^[^a-z]+|[^\w:.-]+/gi, "");
                    setTimeout(() => {
                        $rootScope.$broadcast('loadMoveFunc', 'grid', $scope.itemDropDown, $rootScope.generalData['viewType'], $scope.contentType)
                    }, 100);
                }
            }

        } else {
            if ($scope.viewType === 'list') {
                $scope.pageContent.forEach(item => {
                    if (item['Name'] === data['Name']) {

                        $scope.itemDropDown = item['Name'].replace(/^[^a-z]+|[^\w:.-]+/gi, "");
                        item['move'] = $scope.itemDropDown;
                        setTimeout(() => {
                            $rootScope.$broadcast('loadMoveFunc', 'list', $scope.itemDropDown, $rootScope.generalData['viewType'], $scope.contentType)
                        }, 500);
                    }
                });
            }

        }
    });

}]);