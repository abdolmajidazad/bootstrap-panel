myApp.directive("fileUploadItemsDirective", function () {
    return {
        restrict: "E",
        scope: {
            fileItem : "=?",
            fileIndex : "=?"
        },
        templateUrl: 'library/bundle/html/file-upload-items-template.html?@@timeStampVersion',
        controller: 'fileUploadItemsDirectiveController'
    };
});
myApp.controller("fileUploadItemsDirectiveController", ['$scope', function ($scope) {

    // https://github.com/mathewbyrne/angular-progress-arc
    $scope.size = 25;
    $scope.progress = 0;
    $scope.strokeWidth = 3;
    $scope.stroke = '#4285f4';
    $scope.counterClockwise = true;
    $scope.background = '#ddd';
    $scope.progressing = true;


    console.log("fileItem:", $scope.fileItem)





    let ajax = new XMLHttpRequest();
    $scope.formdata = '';
    function sendImage(data) {
        $scope.fileItem['status'] = 'uploading';
        $scope.formdata = new FormData();
        $scope.formdata.append("file", data);

        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", "/fileUpload");
        ajax.send($scope.formdata);
    }
    sendImage($scope.fileItem);
    function progressHandler(event) {
        $scope.eventLoaded = event;
        $scope.progress = event.loaded / event.total;
        setTimeout(()=>{$scope.$apply()},1)

    }



    function completeHandler() {
        $scope.progressing = false;
        $scope.fileItem['status'] = 'complete';
        $scope.$emit('checkFileUploadList');
        setTimeout(()=>{$scope.$apply()},1)
    }




    function errorHandler() {
        $scope.progressing = false;
        $scope.fileItem['status'] = 'error';
        $scope.$emit('checkFileUploadList');
        setTimeout(()=>{$scope.$apply()},1);
    }

    function abortHandler() {
        $scope.progressing = false;
        $scope.fileItem['status'] = 'abort';
        $scope.$emit('checkFileUploadList');
        setTimeout(()=>{$scope.$apply()},1);


    }

    $scope.replay = ()=>{

        sendImage($scope.fileItem);
        $scope.progressing = true;
        $scope.status = '';
    };

    $scope.abort = ()=>{
        ajax.abort();
    };


    $scope.$on('abortAllUploadingStatus',()=>{
        if($scope.fileItem['status'] === 'uploading'){
            $scope.abort();
        }
    })



}]);