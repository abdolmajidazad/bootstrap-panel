myApp.directive("newFolderDirective", function () {
    return {
        restrict: "E",
        scope: {
        },
        templateUrl: 'library/bundle/html/new-folder-template.html?@@timeStampVersion',
        controller: 'newFolderDirectiveController'
    };
});
myApp.controller("newFolderDirectiveController", ['$scope',  function ($scope) {
    $scope.newFolder = '';
    let selectedFolder = '';
    $scope.$on("newFolderCreatorDirective",(e, data)=>{
        $("#newFolderCreator").modal('show');
        selectedFolder = data;
    });



    $scope.saveFolder = ()=>{
        console.log("selectedFolder: ", selectedFolder, $scope.newFolder);
        $scope.newFolder = '';
    }
}]);