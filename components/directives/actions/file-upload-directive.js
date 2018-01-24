myApp.directive("fileUploadDirective", function () {
    return {
        restrict: "E",
        scope: {},
        templateUrl: 'library/bundle/html/file-upload-template.html?@@timeStampVersion',
        controller: 'fileUploadDirectiveController'
    };
});
myApp.controller("fileUploadDirectiveController", ['$scope', function ($scope) {


    $scope.fileUploadData = '';
    $scope.$on("fileUploadDirective", (e, data) => {
        document.getElementById('fileToUpload').click()
    });


    let show = false;
    $scope.showOrHideBox = () => {
        show = !show;
        let box = $("#upload-notification");
        show && box.fadeIn(1000) || box.fadeOut(1000);
    };


    $scope.counterFile = 0;
    $scope.fileList = [];
    $scope.fileUpload = (element) => {
        $scope.fileList = [...$scope.fileList, ...element.files].reverse();
        show = false;
        $scope.showOrHideBox();
        setTimeout(() => {
            $scope.$apply();
        }, 100)
    };


    $scope.closeBox = () => {
        $scope.$emit('checkFileUploadList', 'close');
    };


    const resetCounter = () => {
        $scope.counterFileProcess = {
            complete: 0,
            abort: 0,
            error: 0,
            uploading: 0
        };
    };
    resetCounter();

    $scope.$on('checkFileUploadList', (e, data) => {
        resetCounter();

        if (data === 'abort') {
            $scope.$broadcast('abortAllUploadingStatus');
            $("#cancelFileUpload").modal('hide');
            $scope.showOrHideBox();
            $scope.fileList = [];

        } else {
            $scope.fileList.forEach(item => {
                $scope.counterFileProcess[item['status']] = $scope.counterFileProcess[item['status']] + 1;
            });
            if (data === 'close') {

                if ($scope.counterFileProcess['uploading'] > 0 || $scope.counterFileProcess['abort'] > 0 || $scope.counterFileProcess['error'] > 0)
                    $("#cancelFileUpload").modal('show');
                else {
                    $("#cancelFileUpload").modal('hide');
                    $scope.showOrHideBox();
                    $scope.fileList = [];
                }

                setTimeout(() => {
                    $scope.$apply()
                }, 1)
            }
        }

    });


    $scope.abort = () => {
        $scope.$emit('checkFileUploadList', 'abort');
    };



    $scope.showContent = true;
    $scope.toggleBox = ()=>{
        $scope.showContent = !$scope.showContent
    }
}]);