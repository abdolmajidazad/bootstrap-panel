'use strict';

myApp.controllerProvider.register('rightSidebarController', ['$scope', function ($scope) {

    $scope.menuBar = [
        {
            title: 'my_drive',
            url: '/drive/my-drive',
            img: "my-drive",
            checkDisabled: true,
            sref: "root.myDrive"
        },
        {
            title: 'recent',
            url: '/drive/recent',
            img: "recent",
            checkDisabled: true,
            sref: "root.recent"
        }

    ]


}]);
