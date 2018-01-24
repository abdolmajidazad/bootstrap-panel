myApp.directive("renameDirective", function () {
    return {
        restrict: "E",
        scope: {
        },
        templateUrl: 'library/bundle/html/rename-template.html?@@timeStampVersion',
        controller: 'renameDirectiveController'
    };
});
myApp.controller("renameDirectiveController", ['$scope',  function ($scope) {
    $scope.renameData = '';
    $scope.$on("renameDirective",(e, data)=>{
        $("#renameSelectedItem").modal('show');
        $scope.mainData = {...data};
        $scope.renameData = data;
        setTimeout(()=>{$scope.$apply()},1);
    });



    $scope.rename = ()=>{
        console.log("selectedFolder: ", $scope.renameData, $scope.mainData)
    }
}]);