'use strict';

myApp.controllerProvider.register('leftSidebarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.contentInformation = {};
    $scope.$on('contentSelectedInformation', (n, contentInfo, viewType,state) => {
        console.log("state : ", state)
        if(!state) return;
        $scope.showTextarea = false;
        let count = contentInfo.length();
        console.log("count", count)
        if(count === 0){
            $scope.contentInformation = contentInfo;
            $scope.infoContentShow = false;
        }else{
            let viewTypePage = $rootScope.generalData['viewType'] ? 'list' : 'grid';
            if (viewTypePage !== viewType || $scope.contentInformation['Name'] === contentInfo['Name']) return;
            $scope.contentInformation = contentInfo;
            $scope.infoContentShow = true;
        }
        setTimeout(()=>{$scope.$apply()},1);


    });

    $scope.toggleTextarea = ()=>{
        $scope.showTextarea = !$scope.showTextarea
    };


    document.getElementById('left-sidebar-information').addEventListener('click',()=>{
    });



}]);
