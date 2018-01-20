function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

myApp.directive("directoryDirective", function () {
    return {
        restrict: "E",
        scope: {
            pageContent: "=?",
            viewType: "=?", //grid | list
            contentType: "=?" //file | directory
        },
        // compile: function() {
        //     return {
        //         pre: function(scope, formElement, attr, controller) {
        //             console.log("scope, formElement, attr, controller: ", scope, formElement, attr, controller)
        //         }
        //     }/
        // },
        templateUrl: 'library/bundle/html/directory-template.html?1516450372242',
        controller: 'directoryDirectiveController'
    };
});
myApp.controller("directoryDirectiveController", ['$scope', '$rootScope', 'contextMenuFactory', function ($scope, $rootScope, contextMenuFactory) {
    $scope.selectedItem = '';
    $scope.menuOptions = contextMenuFactory;
    $scope.clickFolder = function (selectedItem) {
        /**
         * use for select and deselect items
         */
        $rootScope.$broadcast('selectedItem', selectedItem);
    };

    $scope.dblclickFolder = function (selectedItem) {
        alert('directory');
    };

    $scope.$on('selectedItem', function (n, itemSelected) {
        $scope.selectedItem = "";
        if ($scope.viewType === 'list') {
            var filterContent = $scope.pageContent.filter(function (item) {
                return item['Name'] === itemSelected;
            });
            if (!filterContent[0]) return;
            $scope.selectedItem = filterContent[0]['Name'];
            $rootScope.$broadcast('contentSelectedInformation', filterContent[0], $scope.viewType);
        } else {
            $scope.selectedItem = itemSelected === $scope.pageContent['Name'] ? itemSelected : "";
            if ($scope.selectedItem) $rootScope.$broadcast('contentSelectedInformation', $scope.pageContent, $scope.viewType);
        }
    });

    var getDirective = $("#move-directive-id");
    $scope.$on('dropDownItem', function (a, data) {
        $scope.itemDropDown = '';
        if (!$rootScope.generalData['viewType']) {
            if ($scope.viewType === 'grid') {
                if (data['Name'] === $scope.pageContent['Name']) {
                    $scope.itemDropDown = $scope.pageContent['Name'].replace(/^[^a-z]+|[^\w:.-]+/gi, "");
                    setTimeout(function () {
                        // $("#item-id-grid-"+$scope.itemDropDown).click();
                        loadMoveFunc('grid', $scope.itemDropDown, $rootScope.generalData['viewType']);
                    }, 100);
                }
            }
        } else {
            if ($scope.viewType === 'list') {
                $scope.pageContent.forEach(function (item) {
                    if (item['Name'] === data['Name']) {

                        $scope.itemDropDown = item['Name'].replace(/^[^a-z]+|[^\w:.-]+/gi, "");
                        item['move'] = $scope.itemDropDown;
                        setTimeout(function () {
                            // var $el =$("#item-id-list-"+$scope.itemDropDown);  //record the elem so you don't crawl the DOM everytime
                            // var bottom = $el.position().top + $el.outerHeight(true);
                            // getDirective.css('display' ,'block');
                            // getDirective.css('top' ,bottom+8)
                            loadMoveFunc('list', $scope.itemDropDown, $rootScope.generalData['viewType']);
                        }, 500);
                    }
                });
            }
        }
    });

    var loadMoveFunc = function loadMoveFunc(type, id, view) {
        $rootScope.$broadcast('runGetMoveStructure', true);
        var $el = $("#item-id-" + type + "-" + id);
        var offset = $el.offset();
        getDirective.css('display', 'block');
        getDirective.css('left', offset.left);
        if (view) {
            getDirective.css('top', offset.top - 20);
        } else {
            if ($scope.contentType === 'file') {
                getDirective.css('top', offset.top + 112);
            } else {
                getDirective.css('top', offset.top - 20);
            }
        }
    };

    $('html').click(function () {
        getDirective.click(function (event) {
            event.stopPropagation();
        });
        getDirective.css('display', 'none');
    });
}]);
myApp.directive("moveDirective", function () {
    return {
        restrict: "E",
        scope: {},
        templateUrl: 'library/bundle/html/move-template.html?1516450372242',
        controller: 'moveDirectiveController'
    };
});
myApp.controller("moveDirectiveController", ['$scope', 'loader', function ($scope, loader) {
    $scope.$on("runGetMoveStructure", function (n, data) {
        loader.show('#move-directive-id');
        $scope.data = {
            Buckets: {
                "file": [{
                    CreationDate: "date1",
                    Name: "file 1",
                    Mime: 'document',
                    Owner: "me",
                    LastModified: "Dec 1, 2012",
                    FileSize: "8 MB"
                }, {
                    CreationDate: "Date2",
                    Name: "file 2",
                    Mime: 'word',
                    Owner: "me",
                    LastModified: "Dec 1, 2012",
                    FileSize: "2 MB"
                }, {
                    CreationDate: "Date3",
                    Name: "file 3",
                    Mime: 'powerpoint',
                    Owner: "me",
                    LastModified: "Dec 1, 2012",
                    FileSize: "10 MB"
                }, {
                    CreationDate: "Date3",
                    Name: "file 4",
                    Mime: 'spreadsheet',
                    Owner: "me",
                    LastModified: "Dec 1, 2012",
                    FileSize: "10 MB"
                }, {
                    CreationDate: "Date3",
                    Name: "file 5",
                    Mime: 'archive',
                    Owner: "me",
                    LastModified: "Dec 1, 2012",
                    FileSize: "10 MB"
                }],
                "folder": [{
                    CreationDate: "date1",
                    Name: "examplebucket",
                    Owner: "me",
                    LastModified: "Dec 1, 2012",
                    FileSize: "8 MB"
                }, {
                    CreationDate: "Date2",
                    Name: "examplebucket2",
                    Owner: "me",
                    LastModified: "Dec 1, 2012",
                    FileSize: "2 MB"
                }, {
                    CreationDate: "Date3",
                    Name: "examplebucket3",
                    Owner: "me",
                    LastModified: "Dec 1, 2012",
                    FileSize: "10 MB"
                }],
                "Owner": {
                    DisplayName: "own-display-name",
                    ID: "examplee7a2f25102679df27bb0ae12b3f85be6f290b936c4393484be31"
                }
            }

        };
        $scope.dataList = [].concat(_toConsumableArray($scope.data['Buckets']['folder']), _toConsumableArray($scope.data['Buckets']['file']));
        console.log("$scope.dataList:", $scope.dataList);

        setTimeout(function () {
            $scope.$apply();
            loader.hide('#move-directive-id');
        }, 1000);
    });
}]);
myApp.directive("viewDirective", function () {
    return {
        restrict: "E",
        scope: {
            pageContent: "=?",
            viewType: "=?", //grid | list
            contentType: "=?" //file | directory
        },
        templateUrl: 'library/bundle/html/view-template.html?1516450372242',
        controller: 'viewDirectiveController'
    };
});
myApp.controller("viewDirectiveController", ['$scope', '$rootScope', 'contextMenuFactory', function ($scope, $rootScope, contextMenuFactory) {
    $scope.menuOptions = contextMenuFactory;

    console.log("$scope.items", $scope.items);
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
/***
 GLobal Directives
 ***/
//Route State Load Spinner(used on page or content load)
myApp.directive('ngSpinnerBar', ['$rootScope', function ($rootScope) {
    return {
        link: function link(scope, element, attrs) {
            // by defult hide the spinner bar
            element.addClass('hide'); // hide spinner bar by default

            // display the spinner bar whenever the route changes(the content part started loading)
            $rootScope.$on('$stateChangeStart', function () {
                element.removeClass('hide'); // show spinner bar
            });

            // hide the spinner bar on rounte change success(after the content loaded)
            $rootScope.$on('$stateChangeSuccess', function () {
                element.addClass('hide'); // hide spinner bar
                $('body').removeClass('page-on-load'); // remove page loading indicator
                Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu

                // auto scorll to page top
                setTimeout(function () {
                    App.scrollTop(); // scroll to the top on content load
                }, $rootScope.settings.layout.pageAutoScrollOnLoad);
            });

            // handle errors
            $rootScope.$on('$stateNotFound', function () {
                element.addClass('hide'); // hide spinner bar
            });

            // handle errors
            $rootScope.$on('$stateChangeError', function () {
                element.addClass('hide'); // hide spinner bar
            });
        }
    };
}]);

// Handle global LINK click
myApp.directive('a', function () {
    return {
        restrict: 'E', link: function link(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
myApp.directive('dropdownMenuHover', function () {
    return {
        link: function link(scope, elem) {
            elem.dropdownHover();
        }
    };
});
myApp.directive("datePickerBtnDirective", function () {
    return {
        restrict: "E",
        scope: {
            overViewStatus: "=?",
            config: "=?"
        },
        templateUrl: 'library/bundle/html/date-picker-btn-template.html?1516450372242',
        controller: 'datePickerBtnController'
    };
});
myApp.controller("datePickerBtnController", ['$scope', '$timeout', "$filter", function ($scope, $timeout, $filter) {
    var datePickerSelected = {};
    $scope.getDateSelected = function (state) {
        var defaultDate = {
            selectFrom: new Date().setDate(new Date().getDate() - 7),
            selectTo: Number(new Date()),
            from: new Date().setDate(new Date().getDate() - 7),
            to: Number(new Date())
        };
        var from = void 0,
            to = void 0;
        var d = new Date();
        if (state) {
            datePickerSelected = {};
            switch (state) {
                case 'day':
                    from = Number(new Date());
                    to = Number(new Date());
                    break;
                case 'week':
                    from = d.setDate(d.getDate() - 7);
                    to = Number(new Date());
                    break;
                case 'month':
                    from = d.setMonth(d.getMonth() - 1);
                    to = Number(new Date());
                    break;

            }
        } else {
            from = datePickerSelected && datePickerSelected['start'] ? datePickerSelected['start'] : defaultDate['from'];
            to = datePickerSelected && datePickerSelected['end'] ? datePickerSelected['end'] : defaultDate['to'];
        }
        $scope.dateSelected = {
            selectFrom: from,
            selectTo: to,
            from: $filter("toPersianDate")(new persianDate(from)),
            to: $filter("toPersianDate")(new persianDate(to))
        };

        $scope.$emit("datePickerBtnResponse", {
            from: $filter("toEnDigit")($filter("toPersianDate")(new persianDate(from))),
            to: $filter("toEnDigit")($filter("toPersianDate")(new persianDate(to)))
        });
        $scope.toggleBox = false;
    };

    $scope.$watch('overViewStatus', function (n) {
        $scope.getDateSelected(n);
    });

    $scope.toggleBoxFunc = function () {
        $scope.toggleBox = !$scope.toggleBox;

        $scope.dateSelected['selectFrom'] = $scope.dateSelected['selectFrom'] || new Date().setDate(new Date().getDate() - 7);
        $scope.dateSelected['selectFrTo'] = $scope.dateSelected['selectFrTo'] || Number(new Date());

        $timeout(function () {
            $scope.$apply();
        }, 1);
    };

    $scope.$on("datePickerIsoDate", function (n, data) {
        datePickerSelected[data['position']] = data['date'];
    });

    var click = void 0;
    $("#body-content").click(function () {
        if (document.getElementsByClassName("btn-date-picker") && document.getElementsByClassName("btn-date-picker")[0]) {
            document.getElementsByClassName("btn-date-picker")[0].addEventListener("click", function (event) {
                click = 1;
            }, true);
        }
        if (document.getElementsByClassName('date-picker-box') && document.getElementsByClassName('date-picker-box')[0]) {
            document.getElementsByClassName('date-picker-box')[0].addEventListener("click", function (event) {
                click = 1;
            }, true);
        }

        if (click === 0) {
            $scope.toggleBox = false;
            $timeout(function () {
                $scope.$apply();
            }, 1);
        }
        click = 0;
    });

    $scope.closeBox = function () {
        $scope.toggleBox = false;
        $timeout(function () {
            $scope.$apply();
        }, 1);
    };
}]);
myApp.directive("datePickerDirective", function () {
    return {
        restrict: "E",
        scope: {
            position: "=?",
            config: "=?",
            setDateCurrent: "=?"
        },
        templateUrl: 'library/bundle/html/date-picker-template.html?1516450372242',
        controller: 'datePickerController'
    };
});
myApp.controller("datePickerController", ['$scope', '$timeout', function ($scope, $timeout) {
    if ($.isNumeric($scope.setDateCurrent)) {
        $scope.setDateCurrent = moment($scope.setDateCurrent).format("L");
    }
    var firstCall = 0;
    var datePickerConfig = {
        autoClose: true,
        onSelect: function onSelect(unix) {
            // if (firstCall > 0) {
            emitData(unix);
            // }
        }
    };

    // http://babakhani.github.io/PersianWebToolkit/doc/datepicker/example/
    $scope.config = {
        //     inline: true,
        //     altField: '#inlineExampleAlt',
        //     format: 'L',
        initialValue: true,
        initialValueType: 'persian',
        format: 'YYYY/MM/DD',
        //     altFormat: 'L',
        //     maxDate: new persianDate().add('month', 3).valueOf(),
        //     minDate: new persianDate().subtract('month', 3).valueOf(),
        //     timePicker: {
        //         enabled: true,
        //         meridiem: {
        //             enabled: true
        //         }
        //     },
        //     observer: true,
        //     format: 'YYYY/MM/DD',
        //     formatter: function(unix){
        //         return 'selected unix: ' + unix;
        //     },
        persianDigit: true
        //     viewMode: 'year',
        //     checkDate: function(unix){
        //         return new persianDate(unix).day() != 4;
        //     },
        //     checkMonth: function(month){
        //         return month < 6;
        //     },
        //     checkYear: function(year){
        //         return year >= 1391;
        //     },
        //     onlyTimePicker: true,
        //     autoClose: true,
        //     onSelect: function(unix){
        //         console.log('datepicker select : ' + unix);
        //     }
    };

    if ($scope.config) {
        datePickerConfig = Object.assign($scope.config, datePickerConfig);
    }

    $timeout(function () {
        $('.date-picker-' + $scope.position).persianDatepicker(datePickerConfig);
    }, 10);

    $scope.removeDate = function () {
        $('.date-picker-' + $scope.position).val('');
        emitData('');
        firstCall++;
    };

    function emitData(unix) {

        $scope.$emit('datePickerIsoDate', {
            // date: unix ? new Date(unix).toISOString() : '',
            date: unix ? unix : '',
            position: $scope.position
        });
    }
}]);
myApp.directive("emptyBoxDirective", function () {
    return {
        restrict: "E",
        scope: {
            pageName: "=?",
            pageUrl: "=?",
            data: "@",
            errorCode: "=?"
        },
        // templateUrl: 'library/bundle/html/empty-box-template.html',
        template: "\n        <style>\n            .error-box-desc{\n                position: absolute;\n                top: 50%;\n                bottom: 0;\n                left: 0;\n                right: 0;\n                margin: auto;\n            }\n        </style>\n        <div  style=\"text-align: center;height: 300px; position: relative\">\n            <div class=\"error-box-desc\" ng-if=\"errorCode == 'internetError'\">\n                <h2>{{'internet_disconnect' | translate}}</h2>\n                <h3>{{'click_here_after_check' | translate}}</h3>\n                <a ng-click=\"reloadPage(location)\"  type=\"button\"  class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left\"  role=\"button\" aria-disabled=\"false\">\n                    <span class=\"ui-button-text ui-c\">{{\"reload\" | translate}}</span>\n                </a>\n            </div>\n        \n            <div class=\"error-box-desc\" ng-if=\"errorCode == 500\">\n                <h2>{{'server_error' | translate}}</h2>\n                <!--<h3>{{'click_here_after_check' | translate}}</h3>-->\n                <a ng-click=\"reloadPage(location)\"  type=\"button\"  class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left\"  role=\"button\" aria-disabled=\"false\">\n                    <span class=\"ui-button-text ui-c\">{{\"reload\" | translate}}</span>\n                </a>\n            </div>\n            <div class=\"error-box-desc\" ng-if=\"errorCode == 503 || errorCode == -1\">\n                <h2>{{'service_error' | translate}}</h2>\n                <h3>{{'try_again' | translate}}</h3>\n                <a ng-click=\"reloadPage(location)\"  type=\"button\"  class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left\"  role=\"button\" aria-disabled=\"false\">\n                    <span class=\"ui-button-text ui-c\">{{\"reload\" | translate}}</span>\n                </a>\n            </div>\n            <div class=\"error-box-desc\" ng-if=\"errorCode !=503 && errorCode != 500  && errorCode != -1\">\n                <h2 style=\"position: relative;top:45%\">{{errorCode | translate}}</h2>\n            </div>\n\n\n            <div class=\"error-box-desc\" ng-if=\"(!data || data!='service_error') && !errorCode\">\n                <h2 style=\"position: relative;top:45%\">{{data ? (data | translate) : ('not_exist_content' | translate)}}</h2>\n            </div>\n        \n        \n        </div>\n        ",
        controller: 'emptyBoxDirectiveController'
    };
});
myApp.controller("emptyBoxDirectiveController", ["$location", "$scope", "$state", '$rootScope', 'loader', function ($location, $scope, $state, $rootScope, loader) {
    $scope.location = $location["$$url"];

    /**
     * remove loading anyway
     */
    loader.hide();
    /**
     * remove home page data for load better
     */
    if ($scope.errorCode) {
        window.mainMenuSelected = '';
        $rootScope.subMenuData = [];
    }

    /**
     * reload current page
     */
    $scope.reloadPage = function () {
        // $state.reload();
        location.reload();
    };
}]);
myApp.directive('notFoundPage', function () {
    return {
        restrict: 'E',
        scope: {
            text: "@"
        },
        templateUrl: 'library/bundle/html/not-found-directive.html?1516450372242',
        controller: ['$rootScope', '$scope', function controller($rootScope, $scope) {}]
    };
});

myApp.directive('ngRightClick', ['$parse', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, { $event: event });
            });
        });
    };
}]);
myApp.directive('errSrc', function () {
    return {
        restrict: 'A', link: function link(scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                    scope.$emit("notFoundImg");
                }
            });
        }
    };
});

myApp.directive("translatorDirective", function () {
    return {
        restrict: "E",
        scope: {},
        templateUrl: 'library/bundle/html/translator-template.html',
        controller: 'translatorDirectiveController'
    };
});
myApp.controller("translatorDirectiveController", ['$scope', '$translate', 'settings', 'logger', function ($scope, $translate, settings, logger) {

    /**
     * change language of project with translator
     * @param langKey
     */
    $scope.changeLanguage = function (langKey) {
        setLanguage(langKey);

        /**
         * translate event for change language
         */
        $translate.use(langKey);
    };

    /**
     * set button value for change language
     * @param langKey
     */
    function setLanguage(langKey) {
        $scope.lan = langKey === 'fa' ? 'en' : 'fa';
        $scope.lanDetail = langKey === 'fa' ? 'BUTTON_LANG_EN' : 'BUTTON_LANG_FA';
    }
    setLanguage(settings['defaultLanguage']);
}]);
// https://github.com/Templarian/ui.bootstrap.contextMenu
myApp.factory('contextMenuFactory', ['$rootScope', '$http', function ($rootScope, $http) {
    var copyItemVar = '';
    var copyItem = function copyItem($itemScope, $event, modelValue) {
        copyItemVar = $itemScope['item'];
        console.log("copyItem", $itemScope['item']);
    };
    var pasteItem = function pasteItem($itemScope, $event, modelValue) {
        console.log("pasteItem", $itemScope['item'], copyItemVar);
        copyItemVar = '';
    };
    var deleteItem = function deleteItem($itemScope, $event, modelValue) {
        console.log("deleteItem", $itemScope['item']);
    };
    var newFolderItem = function newFolderItem($itemScope, $event, modelValue) {
        console.log("newFolderItem", $itemScope['item']);
    };
    var moveItem = function moveItem($itemScope, $event, modelValue) {

        $rootScope.$broadcast("dropDownItem", $itemScope['item']);

        console.log("moveItem", $itemScope['item']);
    };

    var bodyItem = [{
        title: "new-folder",
        divider: false,
        click: function click($itemScope, $event, modelValue) {
            newFolderItem($itemScope, $event, modelValue);
        }

    }, {
        title: "file-upload",
        divider: true,
        click: function click($itemScope, $event, modelValue) {
            newFolderItem($itemScope, $event, modelValue);
        }

    }];

    var fileItem = [{
        title: "copy",
        divider: false,
        click: function click($itemScope, $event, modelValue) {
            copyItem($itemScope, $event, modelValue);
        }

    }, {
        title: "paste",
        divider: false,
        click: function click($itemScope, $event, modelValue) {
            pasteItem($itemScope, $event, modelValue);
        },
        enabled: function enabled($itemScope, $event, value) {
            console.log("$rootScope.copyItem", copyItemVar);
            if (!copyItemVar) {
                return false;
            }
            return true;
        }

    }, {
        title: "move",
        divider: false,
        click: function click($itemScope, $event, modelValue) {
            moveItem($itemScope, $event, modelValue);
        }

    }, {
        title: "info",
        divider: false,
        click: function click($itemScope, $event, modelValue) {
            $rootScope.changeInfoStatus();
        },
        enabled: function enabled($itemScope, $event, value) {

            if ($rootScope.generalData['informationData']) {
                return false;
            }
            return true;
        }

    }, {
        title: "delete",
        divider: true,
        click: function click($itemScope, $event, modelValue) {
            deleteItem($itemScope, $event, modelValue);
        }
    }];

    var directoryItem = [{
        title: "new-folder",
        divider: false,
        click: function click($itemScope, $event, modelValue) {
            newFolderItem($itemScope, $event, modelValue);
        }

    }].concat(fileItem);

    var menuOptions = {};
    var loadContextMenu = function loadContextMenu(items, type) {
        menuOptions[type] = [];
        items.map(function (item) {

            var contextItem = {
                html: "<div class=\"context-menu-items " + (item['divider'] ? 'context-divider' : '') + "\"><i class=\"header-menu " + item['title'] + "-icon\"></i> <div class=\"display-inline-block\">" + item['title'] + "</div> </div>",
                click: item['click'],
                enabled: item['enabled'] ? item['enabled'] : ''
            };
            menuOptions[type].push(contextItem);
        });
        return menuOptions[type];
    };

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
        file: loadContextMenu(fileItem, 'file'),
        directory: loadContextMenu(directoryItem, 'directory'),
        body: loadContextMenu(bodyItem, 'body')
    };
}]);
//https://github.com/rstacruz/nprogress
myApp.factory('loader', ['settings', function (settings) {
    return {
        show: function show(element) {
            /**
             * check support Promise or not
             * when Not support promise , background color is #FFFBDD in ?force url
             */
            if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
                /**
                 * show git logo in center of page
                 * @type {string}
                 */

                var width = '30px';
                var time = 600;
                if (element === 'body' || element === 'html') {
                    width = '150px';
                    time = 0;
                }
                var imageUrl = 'views/resource/images/loading.gif';

                setTimeout(function () {
                    $(element).append('<div class="service-loading">' + '<div class="sk-wave">' + '<img src="' + imageUrl + '" alt="" width="' + width + '">' + '</div>' + '</div>');
                }, time);
            }
        }, hide: function hide(element) {
            /**
             * remove image from page center
             */
            var className = element + ' .service-loading';

            var time = 600;
            if (element === 'body' || element === 'html') {
                time = 0;
            }
            setTimeout(function () {
                $(className).remove();
            }, time);
        }
    };
}]);

myApp.factory('settings', ['$q', '$http', function ($q, $http) {
    /**
     * data of this variable fill from config file
     * views/resource/js/config.js
     * @type {string}
     */
    var mode = window.enviroment; //development || production
    return {
        defaultLanguage: window.defaultLanguage,
        rateCount: 5,
        rateValue: 2,
        serverPath: mode === 'development' ? "http://localhost:9000/" : '',
        clientPath: mode === 'development' ? 'http://www.amaroid.net/' : '',
        pageRecords: 24,
        reloadTime: {
            second: 25000,
            minute: 600000,
            hour: 36000000
        },
        maxAnimationTime: 1000,
        minAnimationTime: 0,
        debounceTime: 300

    };
}]);
myApp.filter('commaSeparated', function () {
    return function (number) {
        number = number || 0;
        return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1,');
    };
});
/**
 * get count of persian and english character and return direction(ltr | rtl) of show description
 */
myApp.filter('generateDirection', function () {
    return function (inp) {
        if (inp == null) {
            return "ltr";
        } else {
            var eng = 0;
            var per = 0;
            var chars = inp.split('');
            var len = chars.length;

            for (var i = 0; i < len; ++i) {
                if (chars[i].charCodeAt(0) > 255) {
                    ++per;
                } else {
                    ++eng;
                }
            }
            if (eng > per) {

                return "ltr";
            } else {
                return "rtl";
            }
        }
    };
});
/**
 * get millisecond and return time with minutes and seconds
 * example of use for generate time of music
 */
myApp.filter('generateDuration', function () {
    return function (sec, type) {

        /**
         * check entrance parameter is integer number
         * @type {Number}
         */

        // let sec_num = Math.round(sec);
        var sec_num = Math.round(sec * 1000);
        if (type === 'ms') {
            sec_num = Math.round(sec);
        }

        var returnTime = '';
        /**
         * get hours number of entrance parameter
         * @type {number}
         */
        var hours = Math.floor(sec_num / 3600000);
        if (hours >= 1) {
            returnTime = returnTime + hours + 'h ';
        }

        /**
         * get minutes number of entrance parameter from hours number
         * @type {number}
         */
        var minutes = Math.floor((sec_num - hours * 3600000) / 60000);

        if (minutes >= 1) {
            returnTime = returnTime + minutes + 'm ';
        }

        /**
         * get seconds number of entrance parameter from minutes and hours
         * @type {number}
         */
        var endTime = (sec_num - hours * 3600000 - minutes * 60000) / 1000;

        endTime = endTime.toString().split('.');
        var seconds = void 0,
            milliseconds = 0;
        if (parseInt(endTime[0]) > 0) {
            seconds = endTime[0];
            if (seconds >= 1) {
                returnTime = returnTime + seconds + 's ';
            }
        }

        if (parseInt(endTime[1]) > 0 && type === 'ms') {
            milliseconds = parseInt(endTime[1], 10);

            if (milliseconds >= 1) {
                returnTime = returnTime + milliseconds + 'ms';
            }
        }

        /**
         * generate tile format of entrance parameter with hours , minutes and second
         * and return it
         */
        return returnTime;
    };
});
/**
 * get byte number and generate size of file with b | kb | mb | gb
 */
myApp.filter('generateSize', ['$filter', function ($filter) {
    return function (number) {
        /**
         * define  the amount of byte
         * @type {number}
         */
        var b = 1;

        /**
         * define the amount of kilo byte
         * @type {number}
         */
        var kb = 1000;

        /**
         * define the amount of mega byte by kilo byte
         * @type {number}
         */
        var mb = Math.pow(kb, 2);

        /**
         * define the amount of giga byte by kilo byte
         * @type {number}
         */
        var gb = Math.pow(kb, 3);

        /**
         * define the amount of tera byte by kilo byte
         * @type {number}
         */
        var tb = Math.pow(kb, 4);

        /**
         * return number with suffix data
         */
        if (number > 0 && number < kb) {
            return number;
        } else if (number >= kb && number < mb) {
            return (number / kb).toFixed(2) + ' ' + $filter('translate')('K');
        } else if (number >= mb && number < gb) {
            return (number / mb).toFixed(2) + ' ' + $filter('translate')('M');
        } else if (number >= gb && number < tb) {
            return (number / gb).toFixed(2) + ' ' + $filter('translate')('G');
        }
        // $filter('translate')('HELLO_WORLD');
    };
}]);
myApp.filter('roundNumber', function () {
    return function (number) {

        return Math.round(number * 100) / 100;
        // return Math.round(number);
    };
});
/**
 * get english number and convert to persian number ,
 * convert '.' character to ','
 */
myApp.filter('toEnDigit', function () {
    return function (number) {

        /**
         * define number when entrance parameter is empty
         * @type {string}
         */
        number = number || '0';
        number = number.toString();
        var ret = '';

        /**
         * loop on number character and change char code to persian character with increase 1728
         * and set ',' instead '.'
         */
        for (var i = 0, len = number.length; i < len; i++) {
            if (number.charCodeAt(i) >= 1776 && number.charCodeAt(i) <= 1785) {
                ret += String.fromCharCode(number.charCodeAt(i) - 1728);
            } else {

                ret += number[i].toString();
            }
        }
        return ret;
    };
});
/**
 * get english number and convert to persian number ,
 * convert '.' character to ','
 */
myApp.filter('toFaDigit', function () {
    return function (number) {

        /**
         * define number when entrance parameter is empty
         * @type {string}
         */
        number = number || '0';
        number = number.toString();
        var ret = '';

        /**
         * loop on number character and change char code to persian character with increase 1728
         * and set ',' instead '.'
         */
        for (var i = 0, len = number.length; i < len; i++) {
            if (number.charCodeAt(i) >= 48 && number.charCodeAt(i) <= 57) {
                ret += String.fromCharCode(number.charCodeAt(i) + 1728);
            } else {
                if (number[i] == '.') {
                    ret += ',';
                } else {
                    ret += number[i].toString();
                }
            }
        }
        return ret;
    };
});
/**
 * get timestamp number and generate persian date with 1396/04/01 format
 * https://libraries.io/bower/persian-date
 */
myApp.filter('toPersianDate', function () {
    return function (time, format) {
        /**
         * return persian format date with persianDate bower
         */
        //
        if (format) {
            return persianDate(time).format(format);
        } else {
            return persianDate(time).format('L');
        }
    };
});
/**
 * get parameter and return string of it with '' character
 */
myApp.filter('toString', function () {
    return function (str) {
        return "'" + str + "'";
    };
});
myApp.service('appService', ['$http', 'settings', '$rootScope', '$state', '$timeout', 'loader', '$filter', function ($http, settings, $rootScope, $state, $timeout, loader, $filter) {
    var resourceName = settings.serverPath;
    Array.prototype.numberSort = function () {
        if (this.length) return this.sort(function (a, b) {
            return a - b;
        });
    };
    var appService = {
        'userdata': function userdata(params) {
            var startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise(function (resolve, reject) {
                params['url'] = 'ws/sessions/daily/userdata';
                console.warn('start - userdata - ws/sessions/daily/userdata', params);
                post(params).then(function (response) {
                    console.warn('end - userdata - ws/sessions/daily/userdata', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'application': function application(params, action) {
            var startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise(function (resolve, reject) {
                params['url'] = 'ws/sessions/application/' + action;
                console.warn('start - application - ws/sessions/application/' + action, params);
                post(params).then(function (response) {
                    console.warn('end - application - ws/sessions/application/' + action, $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'signin': function signin(params) {
            var startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise(function (resolve, reject) {
                params['url'] = 'ws/accounts/signin';
                console.warn('start - exceptions - ws/accounts/signin', params);
                post(params).then(function (response) {
                    console.warn('end - pushes - ws/accounts/signin', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'signout': function signout(params) {
            var startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise(function (resolve, reject) {
                params['url'] = 'ws/accounts/signout';
                console.warn('start - exceptions - ws/accounts/signout', params);
                post(params).then(function (response) {
                    console.warn('end - pushes - ws/accounts/signout', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'producer': function producer(params) {
            var startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise(function (resolve, reject) {
                params['url'] = 'ws/accounts/producer/list';
                console.warn('start - exceptions - ws/accounts/producer/list', params);
                post(params).then(function (response) {
                    console.warn('end - pushes - ws/accounts/producer/list', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'getAccount': function getAccount(params) {
            var startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise(function (resolve, reject) {
                params['url'] = 'ws/accounts/account/get';
                console.warn('start - ws/accounts/account/get', params);
                post(params).then(function (response) {
                    console.warn('end - ws/accounts/account/get', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'appList': function appList(params) {
            var startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise(function (resolve, reject) {
                params['url'] = 'ws/accounts/app/list';
                console.warn('start - ws/accounts/app/list', params);
                post(params).then(function (response) {
                    console.warn('end - ws/accounts/app/list', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {

                    reject(error);
                });
            });
        },
        'producerSetter': function producerSetter(params) {
            var startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise(function (resolve, reject) {
                params['url'] = 'ws/accounts/producer/set';
                console.warn('start - ws/accounts/producer/set', params);
                post(params).then(function (response) {
                    console.warn('end - ws/accounts/producer/set', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {

                    reject(error);
                });
            });
        },
        'appSetter': function appSetter(params) {
            var startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise(function (resolve, reject) {
                params['url'] = 'ws/accounts/app/set';
                console.warn('start - ws/accounts/app/set', params);
                post(params).then(function (response) {
                    console.warn('end - ws/accounts/app/set', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {

                    reject(error);
                });
            });
        },
        'getAccountData': function getAccountData(check) {
            return new Promise(function (resolve, reject) {

                var option = {
                    data: {}
                };
                async.auto({
                    startLoading: function startLoading(cb) {
                        if (!check) {
                            $rootScope.showCOntent = false;
                            // loader.show('body')
                        }
                        cb(null, true);
                    }, getAppList: ['startLoading', function (cb, result) {
                        appService.appList(option).then(function (resp) {
                            if (resp && resp.status === 200 && resp.data && resp.data['appFamilies']) {
                                cb(null, resp.data['appFamilies']);
                            } else {
                                cb(null, 'signin');
                            }
                        }).catch(function () {
                            cb(null, 'signin');
                        });
                    }], getCheckData: ['getAppList', function (cb) {
                        appService.check(option).then(function (resp) {
                            console.log("resp check", resp);
                            if (resp && resp.status === 200 && resp.data && resp.data['errorCode'] === 0) {
                                cb(null, resp.data);
                            } else {
                                cb(null, 'signin');
                            }
                        }).catch(function () {
                            cb(null, 'signin');
                        });
                    }]
                }, function (error, result) {
                    if (error) {
                        // $state.go("root.signin");
                        reject(false);
                    } else {
                        if (result && result.getAppList === 'signin') {
                            reject(false);
                            // $state.go("root.signin");
                        } else {
                            $rootScope.generalData['jhoobinJhubDataSelected'] = '';
                            // $rootScope.jhoobinJhubDataSelected = '';
                            $rootScope.generalData['jhoobinJhubData'] = result.getCheckData['packageName'];
                            // $rootScope.jhoobinJhubData = result.getCheckData['packageName'];
                            $rootScope.generalData['accountNumber'] = result.getCheckData['accountId'];
                            // $rootScope.accountNumber = result.getCheckData['accountId'];
                            $rootScope.generalData['jhoobinJhubDataList'] = result.getAppList;
                            // $rootScope.jhoobinJhubDataList = result.getAppList;
                            $rootScope.generalData['versionFilter'] = {};
                            // $rootScope.versionFilter = {};
                            $rootScope.generalData['jhoobinJhubDataApp'] = result.getCheckData['producer'];
                            // $rootScope.generalData['state']=$state;
                            // $rootScope.jhoobinJhubDataApp = result.getCheckData['producer'];
                            if ($rootScope.generalData['jhoobinJhubDataList'].length) {
                                $rootScope.generalData['jhoobinJhubDataList'].forEach(function (item) {
                                    if (item && item.packageName === result.getCheckData['packageName']) {
                                        $rootScope.generalData['jhoobinJhubDataSelected'] = item.name;
                                        $rootScope.generalData['jhoobinJhubDataId'] = item.id;
                                        // $rootScope.jhoobinJhubDataId = item.id;
                                    }
                                });
                            } else {
                                $state.go('root.management');
                            }
                            $rootScope.generalData['showContent'] = true;
                            // $rootScope.showCOntent = true;
                            if ($rootScope.generalData['jhoobinJhubDataSelected']) {
                                resolve(true);
                            }
                            $timeout(function () {
                                $rootScope.$apply();
                            }, 100);
                        }
                    }
                    // loader.hide('body')
                });
            });
        },
        'check': function check(params) {
            var startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise(function (resolve, reject) {
                params['url'] = 'ws/accounts/userData';
                console.warn('start - ws/accounts/userdata', params);
                post(params).then(function (response) {
                    console.warn('end - ws/accounts/userdata', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {

                    reject(error);
                });
            });
        }
    };
    return appService;
    /**
     * call server with $http
     * @param params
     * @param urlType 'absolute' || ''
     * @returns {Promise} if success resolve data else reject error
     */
    function post(params, urlType, packageName) {
        /**
         * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
         * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
         */
        return new Promise(function (resolve, reject) {
            /**
             * create structure for get data from server api
             * @type {{method: string, url: *, data, headers: {Content-Type: string}}}
             */
            var theOption = {
                method: 'POST',
                url: urlType === 'absolute' ? params.url : resourceName + params.url,
                data: params.data,
                headers: {
                    "Content-Type": "application/json"
                }
            };
            if ($rootScope.jhoobinJhubData) {
                if (packageName && params && params.data && params.data['packageName']) {
                    // theOption['data']['packageName'] =packageName || $rootScope.jhoobinJhubData;
                } else {
                    theOption['data']['packageName'] = $rootScope.jhoobinJhubData;
                }
            }
            !packageName && (theOption['data'] = Object.assign({}, theOption['data'], $rootScope.versionFilter));
            /**
             * call server with angular $http
             */
            $http(theOption).then(function (response) {
                resolve(response);
            }, function (error) {
                var beforeData = ['root.signin', 'root.notFound'];
                if (error && error.status === 401 && window.errorAu <= 1) {
                    if (beforeData.indexOf($state.current.name) > -1) {
                        $state.go($state.current.name);
                    } else {
                        $state.go('root.signin');
                    }
                    window.errorAu = 1;
                }
                reject(error);
            });
        });
    }
}]);
