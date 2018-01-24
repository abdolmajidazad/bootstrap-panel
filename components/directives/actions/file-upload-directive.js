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
        $scope.fileUploadFinal(element.files)
    }
    $scope.fileUploadFinal = (element) => {
        console.log("element: ", element)
        $scope.fileList = [...$scope.fileList, ...element].reverse();
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
            uploading: 0,
            uploadedSize :0
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

                if(item['status'] === 'complete')
                    $scope.counterFileProcess['uploadedSize'] = $scope.counterFileProcess['uploadedSize'] + item['size'];
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




























    // getElementById
    function $id(id) {
        return document.getElementById(id);
    }



    // file drag hover
    function FileDragHover(e) {
        console.log("a", e)
        e.stopPropagation();
        e.preventDefault();
        // e.target.className = (e.type == "dragover" ? "hover" : "");
    }


    // file selection
    function FileSelectHandler(e) {

        // cancel event and hover styling
        FileDragHover(e);

        // fetch FileList object
        var files = e.target.files || e.dataTransfer.files;
        $scope.fileArray = [];
        for (var i = 0, f; f = files[i]; i++) {
            $scope.fileArray.push(f);
        }

        $("#dragAndDropFiles").modal('show');



    }

    $scope.drop = ()=>{
        $("#dragAndDropFiles").modal('hide');
        $scope.fileUploadFinal($scope.fileArray);
    };



    // initialize
    function Init() {

        var fileselect = $id("fileselect"),
            filedrag = $id("main-content-id");

        // file select
        fileselect.addEventListener("change", FileSelectHandler, false);

        // is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
            // file drop
            filedrag.addEventListener("dragover", FileDragHover, false);
            filedrag.addEventListener("dragleave", FileDragHover, false);
            filedrag.addEventListener("drop", FileSelectHandler, false);
        }

    }
    Init();

}]);