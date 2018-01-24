'use strict';

myApp.controllerProvider.register('headerController', ['$scope', '$state', '$timeout', '$rootScope', '$location', 'loader', 'appService','contextMenuFactory', function ($scope, $state, $timeout, $rootScope, $location, loader, appService, contextMenuFactory) {
    // $rootScope.generalData = {};
    $rootScope.generalData['informationData'] = false;
    $scope.menuOptions = contextMenuFactory;
    $rootScope.generalData['viewType'] = false;
    // $rootScope.generalData['informationData'] = false;


    $scope.filterPanel = ()=>{
        let itemSelected = $rootScope.generalData['jhoobinJhubDataList'].filter(item => item['name'] === $rootScope.generalData['jhoobinJhubDataSelected']);
        $rootScope.generalData['jhoobinJhubDataRecordSelected'] = itemSelected[0];
        return itemSelected[0]['packageName'];
    };


    $scope.setPanelName = (data)=>{
        $rootScope.generalData['jhoobinJhubDataSelected'] = data['name'];
        let option = {
            data : {
                appPackageName : data['packageName']
            }
        };
        appService.appSetter(option).then(()=> {
            $("directory-directive").remove()
            $state.reload();
        })
    };




    $rootScope.changeInfoStatus = () => {
        $scope.toggleSide = !$scope.toggleSide;
        closeSide();
        $rootScope.generalData['informationData'] = !$rootScope.generalData['informationData'];
        document.getElementById('left-sidebar-information').style.left = $rootScope.generalData['informationData'] ? 0 : '';
        if (window.innerWidth <= 760) return;
        document.getElementById('main-data-content').style.width = $rootScope.generalData['informationData'] ? 'calc(100% - 320px)' : ''
    };


    $rootScope.changeInfoStatusOtherPage = () => {
        $rootScope.generalData['informationData'] = false;
        $rootScope.$broadcast('contentSelectedInformation', {},'','header');
        // $rootScope.$broadcast('selectedItem', '');
        document.getElementById('left-sidebar-information').style.left = $rootScope.generalData['informationData'] ? 0 : '';
        if (window.innerWidth <= 760) return;
        document.getElementById('main-data-content').style.width = $rootScope.generalData['informationData'] ? 'calc(100% - 320px)' : ''
    };

    $scope.toggleFunc = function (n) {

        $rootScope.generalData['toggleAppListStatus'] = false;
        $scope.toggleSide = !n;
        if ($scope.toggleSide) {
            openSide();
        } else {
            closeSide();
        }


        if (window.innerWidth > 760) return;
        document.getElementById('left-sidebar-information').style.left = '';
        $rootScope.generalData['informationData'] = false;
    };

    document.getElementsByClassName('main-content')[0].addEventListener("click", function () {
        $scope.toggleBox = false;
        closeSide();

        if (window.innerWidth > 760) return;
        document.getElementById('left-sidebar-information').style.left = '';
        $rootScope.generalData['informationData'] = false;
        $rootScope.$apply()
    });

    function openSide() {
        document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
        $scope.toggleSide = true;
        $(".sidebar.right").addClass('sidebar-toggle');
        $(".main-content").css('opacity', 0.9);
    }

    function closeSide() {
        document.getElementsByTagName('html')[0].style.overflowY = 'scroll';
        $scope.toggleSide = false;
        $(".sidebar.right").removeClass('sidebar-toggle');
        $(".main-content").css('opacity', 1);
    }


    $rootScope.setActiveMenu = function (text, url, checkDisabled) {
        closeSide();

        console.log(text, url, checkDisabled)
        if ($state.current['url'] === url) {
            if (checkDisabled && $rootScope.generalData['jhoobinJhubDataSelected']) {
                $state.reload();
            } else if (!checkDisabled) {
                console.log("sashalsihaksjahskajhsa")
                $state.reload();
            }
        }
        $timeout(function () {
            $rootScope.$apply();
        }, 1);
    };

    $scope.signoutFunc = function () {
        $rootScope.generalData['versionFilter'] = {};
        async.auto({
            startLoading: cb => {
                loader.show('html');
                cb(null, true);
            }, signout: ['startLoading', (cb, result) => {
                let options = {
                    data: {}
                };
                appService.signout(options).then(resp => {
                    console.log("resp", resp)
                    if (resp.status === 200) {
                        cb(null, resp.data);
                    } else {
                        cb(resp);
                    }

                }).catch(error => {
                    cb(error);
                })
            }]
        }, (errors, result) => {
            if (errors) {

            } else {
                $rootScope.generalData = {};
                $state.go('root.signin')
            }
            loader.hide('html');
        })
    };


    $rootScope.generalData['toggleAppListStatus'] = false;
    $scope.toggleAppList = function () {
        $rootScope.generalData['toggleAppListStatus'] = !$rootScope.generalData['toggleAppListStatus'];
        if (!$rootScope.generalData['toggleAppListStatus']) {
            $scope.$broadcast('exitFilter')
        }

    };


    $scope.toggleProfile = function () {
        $rootScope.generalData['toggleAppListStatus'] = false;
    };




    $scope.$on('contentSelectedInformation', (n, contentInfo, viewType, state) => {
        $scope.selectedItemInformation = contentInfo
    });

    $scope.move = ()=>{
        $scope.itemDropDown = $scope.selectedItemInformation['Name'].replace(/^[^a-z]+|[^\w:.-]+/gi, "");
        setTimeout(() => {
            $rootScope.$broadcast('loadMoveFunc', 'header', $scope.itemDropDown)
        }, 500);
    };



    $scope.newFolder = ()=>{
        $rootScope.$broadcast('newFolderCreatorDirective', {"test":3});
    }


    $scope.fileUpload = ()=>{
        $rootScope.$broadcast("fileUploadDirective");
    }
;
    $scope.remove = ()=>{
        $rootScope.$broadcast('removeDirective', $scope.selectedItemInformation);
    };

    $scope.rename = ()=>{
        $rootScope.$broadcast('renameDirective', $scope.selectedItemInformation);
    }

}]);
