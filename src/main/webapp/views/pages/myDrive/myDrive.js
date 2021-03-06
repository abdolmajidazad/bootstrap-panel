'use strict';

myApp.controllerProvider.register('MyDriveCtrl', ['$scope','$state','$rootScope','contextMenuFactory', function ($scope, $state, $rootScope,contextMenuFactory) {




    console.log("contextMenuFactory:", contextMenuFactory)

    $scope.menuOptions = contextMenuFactory;
    $scope.data = {
        Buckets : {
            "file" : [
                {
                    CreationDate: "date1",
                    Name: "file 1",
                    Mime : 'document',
                    Owner : "me",
                    LastModified : "Dec 1, 2012",
                    FileSize : "8 MB"
                },
                {
                    CreationDate: "Date2",
                    Name: "file 2",
                    Mime : 'word',
                    Owner : "me",
                    LastModified : "Dec 1, 2012",
                    FileSize : "2 MB"
                },
                {
                    CreationDate: "Date3",
                    Name: "file 3",
                    Mime : 'powerpoint',
                    Owner : "me",
                    LastModified : "Dec 1, 2012",
                    FileSize : "10 MB"
                },
                {
                    CreationDate: "Date3",
                    Name: "file 4",
                    Mime : 'spreadsheet',
                    Owner : "me",
                    LastModified : "Dec 1, 2012",
                    FileSize : "10 MB"
                },
                {
                    CreationDate: "Date3",
                    Name: "file 5",
                    Mime : 'archive',
                    Owner : "me",
                    LastModified : "Dec 1, 2012",
                    FileSize : "10 MB"
                }
            ],
            "folder": [
                {
                    CreationDate: "date1",
                    Name: "examplebucket",
                    Owner : "me",
                    LastModified : "Dec 1, 2012",
                    FileSize : "8 MB"
                },
                {
                    CreationDate: "Date2",
                    Name: "examplebucket2",
                    Owner : "me",
                    LastModified : "Dec 1, 2012",
                    FileSize : "2 MB"
                },
                {
                    CreationDate: "Date3",
                    Name: "examplebucket3",
                    Owner : "me",
                    LastModified : "Dec 1, 2012",
                    FileSize : "10 MB"
                }
            ],
            "Owner": {
                DisplayName: "own-display-name",
                ID: "examplee7a2f25102679df27bb0ae12b3f85be6f290b936c4393484be31"
            }
        }



    }


    $scope.dataList = [...$scope.data['Buckets']['folder'], ...$scope.data['Buckets']['file']];
    console.log("$scope.dataList:", $scope.dataList)
    // https://github.com/alexcrack/angular-ui-notification



}]);
