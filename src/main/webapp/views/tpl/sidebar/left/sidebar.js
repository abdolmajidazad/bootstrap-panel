'use strict';

myApp.controllerProvider.register('leftSidebarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.contentInformation = {};
    $scope.$on('contentSelectedInformation', (n, contentInfo, viewType) => {
        $scope.showTextarea = false;
        console.log("$scope.showTextarea: ", $scope.showTextarea);
        let viewTypePage = $rootScope.generalData['viewType'] ? 'list' : 'grid';
        if (viewTypePage !== viewType || $scope.contentInformation['Name'] === contentInfo['Name']) return;

        console.log("contentSelectedInformation", contentInfo, viewType)
        $scope.contentInformation = contentInfo

    });

    $scope.toggleTextarea = ()=>{
        $scope.showTextarea = !$scope.showTextarea
    };


    document.getElementById('left-sidebar-information').addEventListener('click',()=>{
    });



}]);
