myApp.directive("viewDirective", function () {
    return {
        restrict: "E",
        scope: {
            pageContent: "=?",
            viewType: "=?",  //grid | list
            contentType: "=?",  //file | directory
        },
        templateUrl: 'library/bundle/html/view-template.html?@@timeStampVersion',
        controller: 'viewDirectiveController'
    };
});
myApp.controller("viewDirectiveController", ['$scope', '$rootScope','contextMenuFactory', function ($scope, $rootScope,contextMenuFactory) {
    $scope.menuOptions = contextMenuFactory;
    $("#main-content-id").click(function(){
        $(".box-item-file-folder").click(function(){return false;});
        $("#newFolderCreator").click(function(){return false;});
        $("#renameSelectedItem").click(function(){return false;});
        $("#removeSelectedItem").click(function(){return false;});
        $("#main-content-id").bind("click", function() {
            $rootScope.$broadcast('contentSelectedInformation', {},'' ,'view-directive');
            $rootScope.$broadcast('deselectItem','view-directive')
        });

    });


}]);