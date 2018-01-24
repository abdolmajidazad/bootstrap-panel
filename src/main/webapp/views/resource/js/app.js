/**
 * create angular module and call  dependency module
 * @type {angular.Module}
 */
var myApp = angular.module('myApp', ['ui.router', 'pascalprecht.translate', 'ngSanitize', 'ui.bootstrap.contextMenu', 'angular-progress-arc']);

/**
 * root controller
 * this controller load in first call project
 */
myApp.controller("rootCtrl", ['$scope', '$rootScope', function ($scope, $rootScope) {

    // $scope.menuOptions = contextMenuFactory;
    $rootScope.startDate = new Date();
    $rootScope.generalData = {};
}]);

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs an AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform an OR.
 */
myApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }
        return out;
    };
});

// myApp.config(['$httpProvider',function ($httpProvider) {
//     $httpProvider.defaults.withCredentials = true;
//     //rest of route code
// }])

/**
 * this directive call when page load
 * remove splash project loading
 */
myApp.directive("applicationLoading", ["$animate", function ($animate) {
    return { link: link, restrict: "C" };

    function link(scope, element) {
        $animate.leave(element.children().eq(1)).then(function cleanupAfterAnimation() {
            /**
             * check support Promise or not
             * when Not support promise , background color is #FFFBDD in ?force url
             */
            if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
                document.getElementsByTagName('body')[0].style.overflow = '';
                $('.application-start').remove();
            }
        });
    }
}]);

/**
 * for resolve AngularJs Ui-routing transition superseded
 */
myApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

/**
 * change site language
 */
myApp.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.preferredLanguage('fa');
    $translateProvider.useLoader('languageLoader');
}]);

/**
 * load json file content translate word
 * for get fa | en language json file
 */
myApp.factory('languageLoader', ["$q", "$timeout", "$http", function ($q, $timeout, $http) {
    return function (options) {
        var deferred = $q.defer();
        var theOption = {
            method: 'GET',
            url: '../library/i18n/' + options.key + '.json'
        };
        $http(theOption).then(function (response) {
            deferred.resolve(response['data']);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);

/**
 * for remove #! from url of angular routing
 */
myApp.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true
    }).hashPrefix('');
}]);

/**
 * create state name for create new page and url
 */

myApp.config(["$stateProvider", "$urlRouterProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$provide", function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
    myApp.controllerProvider = $controllerProvider;
    myApp.compileProvider = $compileProvider;
    myApp.stateProvider = $stateProvider;
    myApp.filterProvider = $filterProvider;
    myApp.provide = $provide;

    /**
     * when page not exist in $stateProvider state , redirect page to 404
     */
    $urlRouterProvider.otherwise("/404");
    $stateProvider.state('root', {
        url: "",
        css: appIncludeFilesJson[appEnvironment].pages.root.css,

        abstract: true,
        views: {
            "main@": {
                template: '<div  ng-include="getTemplateUrl()"></div>',
                controller: 'rootController'
            },
            // "body@" : {},
            "header@root": {
                templateUrl: 'views/tpl/header/header.html?1516790568201',
                controller: 'headerController'
            },
            "footer@root": {
                templateUrl: 'views/tpl/footer/footer.html?1516790568201',
                controller: 'footerController'
            },
            "rightSidebar@root": {
                templateUrl: 'views/tpl/sidebar/right/sidebar.html?1516790568201',
                controller: 'rightSidebarController'
            },
            "leftSidebar@root": {
                templateUrl: 'views/tpl/sidebar/left/sidebar.html?1516790568201',
                controller: 'leftSidebarController'
            }
        },
        resolve: {
            deps: ['$q', '$rootScope', function deps($q, $rootScope) {
                //console.log('layout');
                var deferred = $q.defer();
                var dependencies = appIncludeFilesJson[appEnvironment].pages.root.js;
                $script(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }]
        }
    }).state('root.myDrive', {
        url: "/drive/my-drive",
        views: {
            "afterLogin": {
                templateUrl: "views/pages/myDrive/myDrive.html?1516790568201",
                controller: "MyDriveCtrl"
            }
        },

        css: appIncludeFilesJson[appEnvironment].pages.myDrive.css,
        resolve: {
            deps: ['$q', '$rootScope', function deps($q, $rootScope) {
                var deferred = $q.defer();
                var dependencies = appIncludeFilesJson[appEnvironment].pages.myDrive.js;
                $script(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }]
        }
    }).state('root.recent', {
        url: "/drive/recent",
        views: {
            "afterLogin": {
                templateUrl: "views/pages/recent/recent.html?1516790568201",
                controller: "RecentCtrl"
            }
        },
        css: appIncludeFilesJson[appEnvironment].pages.recent.css,
        resolve: {
            deps: ['$q', '$rootScope', function deps($q, $rootScope) {
                var deferred = $q.defer();
                var dependencies = appIncludeFilesJson[appEnvironment].pages.recent.js;
                $script(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }]
        }
    }).state('root.signin', {
        url: "/",
        views: {
            "beforeLogin": {
                templateUrl: "views/pages/signin/signin.html?1516790568201",
                controller: "SigninCtrl"
            }
        },
        css: appIncludeFilesJson[appEnvironment].pages.signin.css,
        resolve: {
            deps: ['$q', '$rootScope', function deps($q, $rootScope) {
                var deferred = $q.defer();
                var dependencies = appIncludeFilesJson[appEnvironment].pages.signin.js;

                $script(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }]
        }
    }).state('root.notFound', {
        url: "/404",
        views: {
            "beforeLogin": {
                templateUrl: "views/pages/404/404.html?1516790568201",
                controller: "NotFoundCtrl"
            }
        },
        css: appIncludeFilesJson[appEnvironment].pages.notFound.css,
        resolve: {
            deps: ['$q', '$rootScope', function deps($q, $rootScope) {
                var deferred = $q.defer();
                var dependencies = appIncludeFilesJson[appEnvironment].pages.notFound.js;

                $script(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }]
        }
    });
    $urlRouterProvider.deferIntercept();
}]);

myApp.controller("rootController", ['$scope', '$state', 'appService', '$rootScope', '$timeout', 'loader', function ($scope, $state, appService, $rootScope, $timeout, loader) {

    $scope.getTemplateUrl = function () {
        if ($state.current.url === '/' || $state.current.url === '/signin' || $state.current.url === '/404') {
            return 'views/tpl/main/before-login.html';
        } else {
            return 'views/tpl/main/after-login.html';
        }
    };
}]);

myApp.run(["$rootScope", "$state", "$stateParams", "$urlRouter", "$location", "$filter", "$window", "appService", '$timeout', 'loader', function ($rootScope, $state, $stateParams, $urlRouter, $location, $filter, $window, appService, $timeout, loader) {
    /**
     * listen of url change and load page with new condition
     */

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        /**
         * set active menu in any state
         */
        $rootScope.generalData['activeMenu'] = $state.current['url'];

        // console.log("$rootScope.removeContentSelectedInformation :: ",$rootScope.removeContentSelectedInformation)
        // $rootScope.$on("$destroy", $rootScope.removeContentSelectedInformation)
    });
    $rootScope.$on('$locationChangeSuccess', function (e, newUrl, oldUrl) {

        /**
         * remove modal when state change
         */
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        /**
         * get last item in url for check login page or other
         */
        var newUrlName = newUrl.split('/').slice(-1)[0];
        var oldUrlName = oldUrl.split('/').slice(-1)[0];

        /**
         * check jhoobinJhubData if exist change state else check is login and run state or not
         */
        if ($rootScope.generalData && $rootScope.generalData['jhoobinJhubData']) {
            console.log("1::", $rootScope.generalData);
            // $urlRouter.sync();
            $urlRouter.listen();
            if (!newUrlName) $state.go('root.myDrive');
        } else {
            appService.getAccountData().then(function () {
                console.log("2::", $rootScope.generalData);
                $urlRouter.sync();
                $urlRouter.listen();
                if (!newUrlName) $state.go('root.myDrive');
            }).catch(function () {
                console.log("3::");

                $urlRouter.sync();
                $urlRouter.listen();
                if (newUrlName) $state.go('root.signin');
            });
        }
    });
    // $urlRouter.listen();
}]);
