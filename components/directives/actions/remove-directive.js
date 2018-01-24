myApp.directive("removeDirective", function () {
    return {
        restrict: "E",
        scope: {
        },
        templateUrl: 'library/bundle/html/remove-template.html?@@timeStampVersion',
        controller: 'removeDirectiveController'
    };
});
myApp.controller("removeDirectiveController", ['$scope',  function ($scope) {
    $scope.removeData = '';
    $scope.$on("removeDirective",(e, data)=>{
        $("#removeSelectedItem").modal('show');
        $scope.removeData = data;
        setTimeout(()=>{$scope.$apply()},1);
    });



    $scope.remove = ()=>{
        console.log("selectedFolder: ", $scope.removeData)
    }
}]);