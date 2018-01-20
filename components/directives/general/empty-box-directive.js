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
        template: `
        <style>
            .error-box-desc{
                position: absolute;
                top: 50%;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
            }
        </style>
        <div  style="text-align: center;height: 300px; position: relative">
            <div class="error-box-desc" ng-if="errorCode == 'internetError'">
                <h2>{{'internet_disconnect' | translate}}</h2>
                <h3>{{'click_here_after_check' | translate}}</h3>
                <a ng-click="reloadPage(location)"  type="button"  class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left"  role="button" aria-disabled="false">
                    <span class="ui-button-text ui-c">{{"reload" | translate}}</span>
                </a>
            </div>
        
            <div class="error-box-desc" ng-if="errorCode == 500">
                <h2>{{'server_error' | translate}}</h2>
                <!--<h3>{{'click_here_after_check' | translate}}</h3>-->
                <a ng-click="reloadPage(location)"  type="button"  class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left"  role="button" aria-disabled="false">
                    <span class="ui-button-text ui-c">{{"reload" | translate}}</span>
                </a>
            </div>
            <div class="error-box-desc" ng-if="errorCode == 503 || errorCode == -1">
                <h2>{{'service_error' | translate}}</h2>
                <h3>{{'try_again' | translate}}</h3>
                <a ng-click="reloadPage(location)"  type="button"  class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left"  role="button" aria-disabled="false">
                    <span class="ui-button-text ui-c">{{"reload" | translate}}</span>
                </a>
            </div>
            <div class="error-box-desc" ng-if="errorCode !=503 && errorCode != 500  && errorCode != -1">
                <h2 style="position: relative;top:45%">{{errorCode | translate}}</h2>
            </div>


            <div class="error-box-desc" ng-if="(!data || data!='service_error') && !errorCode">
                <h2 style="position: relative;top:45%">{{data ? (data | translate) : ('not_exist_content' | translate)}}</h2>
            </div>
        
        
        </div>
        `,
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
    }
}]);