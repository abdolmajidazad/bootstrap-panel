myApp.directive("translatorDirective", function() {
    return {
        restrict: "E",
        scope:{},
        templateUrl: 'library/bundle/html/translator-template.html',
        controller: 'translatorDirectiveController'
    };
});
myApp.controller("translatorDirectiveController", ['$scope', '$translate', 'settings','logger',function( $scope, $translate, settings ,logger) {

    /**
     * change language of project with translator
     * @param langKey
     */
    $scope.changeLanguage = function(langKey){
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
    function setLanguage( langKey ){
        $scope.lan =  langKey === 'fa' ? 'en' : 'fa';
        $scope.lanDetail =  langKey === 'fa' ? 'BUTTON_LANG_EN' : 'BUTTON_LANG_FA';
    }
    setLanguage(settings['defaultLanguage']);
}]);