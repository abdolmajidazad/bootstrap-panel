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

    console.log("$scope.items", $scope.items)
    // $scope.items = [
    //     {name: 'Small Health Potion', cost: 4},
    //     {name: 'Small Mana Potion', cost: 5},
    //     {name: 'Iron Short Sword', cost: 12}
    // ];


    // $rootScope.copyItem = '';
    // const copyItem = ($itemScope, $event, modelValue) => {
    //     $rootScope.copyItem = $itemScope;
    //     setTimeout(()=>{
    //         $scope.$apply()
    //     },10);
    //
    //     console.log("copyItem");
    //
    // };
    // const pasteItem = ($itemScope, $event, modelValue) => {
    //     $rootScope.copyItem = '';
    //     console.log("pasteItem");
    // };
    // const deleteItem = ($itemScope, $event, modelValue) => {
    //     console.log("deleteItem");
    // };
    // const newFolderItem = ($itemScope, $event, modelValue) => {
    //     console.log("newFolderItem");
    // };
    // let menuItems = [
    //     {
    //         title: "copy",
    //         divider: false,
    //         click: ($itemScope, $event, modelValue) => {
    //             copyItem($itemScope, $event, modelValue)
    //         }
    //
    //     },
    //     {
    //         title: "paste",
    //         divider: false,
    //         click: ($itemScope, $event, modelValue) => {
    //             pasteItem($itemScope, $event, modelValue)
    //         },
    //         enabled: function ($itemScope, $event, value) {
    //             console.log("$rootScope.copyItem", $rootScope.copyItem)
    //             if (!$rootScope.copyItem) {
    //                 $('.paste-icon').addClass('disabled');
    //                 return false;
    //             }
    //             return true;
    //         }
    //
    //     },
    //     {
    //         title: "delete",
    //         divider: true,
    //         click: ($itemScope, $event, modelValue) => {
    //             deleteItem($itemScope, $event, modelValue)
    //         }
    //     }
    // ];
    //
    // let directoryItem = [
    //     {
    //         title: "new-folder",
    //         divider: false,
    //         click: ($itemScope, $event, modelValue) => {
    //             newFolderItem($itemScope, $event, modelValue)
    //         }
    //
    //     }
    //     , ...menuItems];
    // $scope.menuOptions = {};
    // const loadContextMenu = (items, type) => {
    //     $scope.menuOptions[type] = [];
    //     items.map(item => {
    //         let contextItem = {
    //             html: `<div class="context-menu-items ${item['divider'] ? 'context-divider' : ''}"><i class="header-menu ${item['title']}-icon"></i> <div class="display-inline-block">${item['title']}</div> </div>`,
    //             click: item['click'],
    //             enabled: item['enabled'] ? item['enabled'] : ''
    //         };
    //         $scope.menuOptions[type].push(contextItem)
    //     })
    // }
    //
    // console.log("directoryItem: ", directoryItem)
    // loadContextMenu(menuItems, 'file');
    // loadContextMenu(directoryItem, 'directory');


}]);