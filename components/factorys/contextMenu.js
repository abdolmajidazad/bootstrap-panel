// https://github.com/Templarian/ui.bootstrap.contextMenu
myApp.factory('contextMenuFactory', ['$rootScope', '$http', function($rootScope, $http) {
    let copyItemVar = '';
    const copyItem = ($itemScope, $event, modelValue) => {
        copyItemVar = $itemScope['item'];
        console.log("copyItem",$itemScope['item']);

    };
    const pasteItem = ($itemScope, $event, modelValue) => {
        console.log("pasteItem",$itemScope['item'], copyItemVar);
        copyItemVar = '';

    };
    const deleteItem = ($itemScope, $event, modelValue) => {
        console.log("deleteItem", $itemScope['item']);
    };
    const newFolderItem = ($itemScope, $event, modelValue) => {
        console.log("newFolderItem", $itemScope['item']);
    };
    const moveItem = ($itemScope, $event, modelValue) => {

        $rootScope.$broadcast("dropDownItem", $itemScope['item']);

        console.log("moveItem", $itemScope['item']);
    };


    const bodyItem = [
        {
            title: "new-folder",
            divider: false,
            click: ($itemScope, $event, modelValue) => {
                newFolderItem($itemScope, $event, modelValue)
            }

        },
        {
            title: "file-upload",
            divider: true,
            click: ($itemScope, $event, modelValue) => {
                newFolderItem($itemScope, $event, modelValue)
            }

        }
    ];









    const fileItem = [
        {
            title: "copy",
            divider: false,
            click: ($itemScope, $event, modelValue) => {
                copyItem($itemScope, $event, modelValue)
            }

        },
        {
            title: "paste",
            divider: false,
            click: ($itemScope, $event, modelValue) => {
                pasteItem($itemScope, $event, modelValue)
            },
            enabled: function ($itemScope, $event, value) {
                console.log("$rootScope.copyItem", copyItemVar)
                if (!copyItemVar) {
                    return false;
                }
                return true;
            }

        },
        {
            title: "move",
            divider: false,
            click: ($itemScope, $event, modelValue) => {
                moveItem($itemScope, $event, modelValue)
            }

        },
        {
            title: "info",
            divider: false,
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
            divider: true,
            click: ($itemScope, $event, modelValue) => {
                deleteItem($itemScope, $event, modelValue)
            }
        }
    ];

    const directoryItem = [
        {
            title: "new-folder",
            divider: false,
            click: ($itemScope, $event, modelValue) => {
                newFolderItem($itemScope, $event, modelValue)
            }

        }
        , ...fileItem];





    let menuOptions = {};
    const loadContextMenu = (items, type) => {
        menuOptions[type] = [];
        items.map(item => {

            let contextItem = {
                html: `<div class="context-menu-items ${item['divider'] ? 'context-divider' : ''}"><i class="header-menu ${item['title']}-icon"></i> <div class="display-inline-block">${item['title']}</div> </div>`,
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
    //             loadContextMenu(fileItem, 'file', (resp)=>{
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