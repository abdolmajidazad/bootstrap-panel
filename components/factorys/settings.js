myApp.factory('settings', ['$q', '$http', function($q, $http) {
    /**
     * data of this variable fill from config file
     * views/resource/js/config.js
     * @type {string}
     */
    let mode = window.enviroment; //development || production
    return {
        defaultLanguage : window.defaultLanguage,
        rateCount : 5,
        rateValue : 2,
        serverPath : (mode === 'development') ? "http://localhost:9000/" : '',
        clientPath : (mode === 'development') ? 'http://www.amaroid.net/' : '',
        pageRecords : 24,
        reloadTime: {
            second : 25000,
            minute : 600000,
            hour : 36000000
        },
        maxAnimationTime : 1000,
        minAnimationTime : 0,
        debounceTime : 300

    };








}]);