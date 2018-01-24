// https://github.com/Templarian/ui.bootstrap.contextMenu
myApp.factory('contextMenuFactory', ['$rootScope', '$http','$filter', function($rootScope, $http,$filter) {
    let copyItemVar = '';
    const copyItem = ($itemScope, $event, modelValue) => {
        copyItemVar = $itemScope['item'];
        console.log("copyItem",$itemScope['item']);

    };
    const pasteItem = ($itemScope, $event, modelValue) => {
        console.log("pasteItem",$itemScope['item'], copyItemVar);
        copyItemVar = '';

    };
    const renameItem = ($itemScope, $event, modelValue) => {
        console.log("renameItem",$itemScope['item'], copyItemVar);
        $rootScope.$broadcast('renameDirective', $itemScope['item']);

    };
    const deleteItem = ($itemScope, $event, modelValue) => {
        console.log("deleteItem", $itemScope['item']);
        $rootScope.$broadcast('removeDirective', $itemScope['item']);
    };
    const newFolderItem = ($itemScope, $event, modelValue) => {
        console.log("newFolderItem", $itemScope['item']);
        $rootScope.$broadcast('newFolderCreatorDirective',  $itemScope['item']);
    };
    const moveItem = ($itemScope, $event, modelValue) => {
        $rootScope.$broadcast("dropDownItem", $itemScope['item']);
    };
    const fileUploadItem = ($itemScope, $event, modelValue) => {
        $rootScope.$broadcast("fileUploadDirective", $itemScope['item']);
    };


    const bodyItem = [
        {
            title: "new-folder",
            dividerTop: false,
            click: ($itemScope, $event, modelValue) => {
                newFolderItem($itemScope, $event, modelValue)
            }

        },
        {
            title: "file-upload",
            dividerTop: true,
            click: ($itemScope, $event, modelValue) => {
                fileUploadItem($itemScope, $event, modelValue)
            }

        }
    ];









    const generalItem = [
        // {
        //     title: "copy",
        //     dividerTop: false,
        //     click: ($itemScope, $event, modelValue) => {
        //         copyItem($itemScope, $event, modelValue)
        //     }
        //
        // },
        // {
        //     title: "paste",
        //     dividerTop: false,
        //     click: ($itemScope, $event, modelValue) => {
        //         pasteItem($itemScope, $event, modelValue)
        //     },
        //     enabled: function ($itemScope, $event, value) {
        //         console.log("$rootScope.copyItem", copyItemVar)
        //         if (!copyItemVar) {
        //             return false;
        //         }
        //         return true;
        //     }
        //
        // },
        {
            title: "move",
            dividerTop: false,
            click: ($itemScope, $event, modelValue) => {
                moveItem($itemScope, $event, modelValue)
            }

        },
        {
            title: "rename",
            dividerTop: false,
            click: ($itemScope, $event, modelValue) => {
                renameItem($itemScope, $event, modelValue)
            }

        },
        {
            title: "info",
            dividerTop: false,
            click: ($itemScope, $event, modelValue) => {
                $rootScope.changeInfoStatus()

            },
            enabled: function ($itemScope, $event, value) {

                if ($rootScope.generalData['informationData']) {
                    return false;
                }
                return true;
            }

        },
        {
            title: "delete",
            dividerTop: true,
            click: ($itemScope, $event, modelValue) => {
                deleteItem($itemScope, $event, modelValue)
            }
        }
    ];

    const fileItem = [...generalItem];
    const directoryItem = [
        {
            title: "new-folder",
            dividerTop: false,
            dividerBottom: true,
            click: ($itemScope, $event, modelValue) => {
                newFolderItem($itemScope, $event, modelValue)
            }

        }
        , ...generalItem];







    let menuOptions = {};
    const loadContextMenu = (items, type) => {

        menuOptions[type] = [];
        items.map(item => {
            let contextItem = {
                html: `<div class="context-menu-items ${item['dividerTop'] ? 'context-divider-top' : ''} ${item['dividerBottom'] ? 'context-divider-bottom' : ''}"><i class="header-menu ${item['title']}-icon"></i> <div class="display-inline-block">${$filter('translate')(item['title'])}</div> </div>`,
                click: item['click'],
                enabled: item['enabled'] ? item['enabled'] : ''
            };
            menuOptions[type].push(contextItem)
        });
        return menuOptions[type] ;
    }


    // const getMenu =(callback)=>{
    //     async.auto({
    //         getFileContextMenu : cb=>{
    //             loadContextMenu(generalItem, 'file', (resp)=>{
    //                 cb(null, resp);
    //             });
    //         },
    //         getFolderContextMenu : cb=>{
    //             loadContextMenu(directoryItem, 'directory',(resp)=>{
    //                 cb(null, resp);
    //             });
    //         }
    //     },(err, result)=>{
    //         console.log("resulteeeeeee: ", result)
    //         callback(result)
    //     })
    // };

    return {
        file : loadContextMenu(fileItem, 'file'),
        directory : loadContextMenu(directoryItem, 'directory'),
        body: loadContextMenu(bodyItem, 'body')
    }






}]);