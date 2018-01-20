myApp.service('appService', ['$http', 'settings', '$rootScope',  '$state', '$timeout', 'loader','$filter', function ($http, settings, $rootScope, $state, $timeout, loader,$filter) {
    let resourceName = settings.serverPath;
    Array.prototype.numberSort = function () {
        if (this.length) return this.sort((a, b) => {
            return a - b
        })
    };
    let appService = {
        'userdata': (params) => {
            let startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise((resolve, reject) => {
                params['url'] = 'ws/sessions/daily/userdata';
                console.warn('start - userdata - ws/sessions/daily/userdata', params);
                post(params).then(response => {
                    console.warn('end - userdata - ws/sessions/daily/userdata', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'application': (params, action) => {
            let startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise((resolve, reject) => {
                params['url'] = 'ws/sessions/application/' + action;
                console.warn('start - application - ws/sessions/application/' + action, params);
                post(params).then(response => {
                    console.warn('end - application - ws/sessions/application/' + action, $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'signin': (params) => {
            let startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise((resolve, reject) => {
                params['url'] = 'ws/accounts/signin';
                console.warn('start - exceptions - ws/accounts/signin', params);
                post(params).then(response => {
                    console.warn('end - pushes - ws/accounts/signin', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'signout': (params) => {
            let startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise((resolve, reject) => {
                params['url'] = 'ws/accounts/signout';
                console.warn('start - exceptions - ws/accounts/signout', params);
                post(params).then(response => {
                    console.warn('end - pushes - ws/accounts/signout', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'producer': (params) => {
            let startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise((resolve, reject) => {
                params['url'] = 'ws/accounts/producer/list';
                console.warn('start - exceptions - ws/accounts/producer/list', params);
                post(params).then(response => {
                    console.warn('end - pushes - ws/accounts/producer/list', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'getAccount': (params) => {
            let startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise((resolve, reject) => {
                params['url'] = 'ws/accounts/account/get';
                console.warn('start - ws/accounts/account/get', params);
                post(params).then(response => {
                    console.warn('end - ws/accounts/account/get', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {
                    reject(error);
                });
            });
        },
        'appList': (params) => {
            let startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise((resolve, reject) => {
                params['url'] = 'ws/accounts/app/list';
                console.warn('start - ws/accounts/app/list', params);
                post(params).then(response => {
                    console.warn('end - ws/accounts/app/list', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {

                    reject(error);
                });
            });
        },
        'producerSetter': (params) => {
            let startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise((resolve, reject) => {
                params['url'] = 'ws/accounts/producer/set';
                console.warn('start - ws/accounts/producer/set', params);
                post(params).then(response => {
                    console.warn('end - ws/accounts/producer/set', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {

                    reject(error);
                });
            });
        },
        'appSetter': (params) => {
            let startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise((resolve, reject) => {
                params['url'] = 'ws/accounts/app/set';
                console.warn('start - ws/accounts/app/set', params);
                post(params).then(response => {
                    console.warn('end - ws/accounts/app/set', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {

                    reject(error);
                });
            });
        },
        'getAccountData': (check) => {
            return new Promise((resolve, reject) => {

                let option = {
                    data: {}
                };
                async.auto({
                    startLoading: cb => {
                        if (!check) {
                            $rootScope.showCOntent = false;
                            // loader.show('body')
                        }
                        cb(null, true);
                    }, getAppList: ['startLoading', (cb, result) => {
                        appService.appList(option).then(resp => {
                            if (resp && resp.status === 200 && resp.data && resp.data['appFamilies']) {
                                cb(null, resp.data['appFamilies']);
                            } else {
                                cb(null, 'signin');
                            }
                        }).catch(() => {
                            cb(null, 'signin');
                        })
                    }], getCheckData: ['getAppList', (cb) => {
                        appService.check(option).then(resp => {
                            console.log("resp check", resp)
                            if (resp && resp.status === 200 && resp.data && resp.data['errorCode'] === 0) {
                                cb(null, resp.data);
                            } else {
                                cb(null, 'signin');
                            }
                        }).catch(() => {
                            cb(null, 'signin');
                        })
                    }]
                }, (error, result) => {
                    if (error) {
                        // $state.go("root.signin");
                        reject(false);
                    } else {
                        if (result && result.getAppList === 'signin') {
                            reject(false);
                            // $state.go("root.signin");

                        } else {
                            $rootScope.generalData['jhoobinJhubDataSelected']='';
                            // $rootScope.jhoobinJhubDataSelected = '';
                            $rootScope.generalData['jhoobinJhubData']=result.getCheckData['packageName'];
                            // $rootScope.jhoobinJhubData = result.getCheckData['packageName'];
                            $rootScope.generalData['accountNumber']=result.getCheckData['accountId'];
                            // $rootScope.accountNumber = result.getCheckData['accountId'];
                            $rootScope.generalData['jhoobinJhubDataList']=result.getAppList;
                            // $rootScope.jhoobinJhubDataList = result.getAppList;
                            $rootScope.generalData['versionFilter']={};
                            // $rootScope.versionFilter = {};
                            $rootScope.generalData['jhoobinJhubDataApp']=result.getCheckData['producer'];
                            // $rootScope.generalData['state']=$state;
                            // $rootScope.jhoobinJhubDataApp = result.getCheckData['producer'];
                            if ($rootScope.generalData['jhoobinJhubDataList'].length) {
                                $rootScope.generalData['jhoobinJhubDataList'].forEach(item => {
                                    if (item && item.packageName === result.getCheckData['packageName']) {
                                        $rootScope.generalData['jhoobinJhubDataSelected'] = item.name;
                                        $rootScope.generalData['jhoobinJhubDataId'] = item.id;
                                        // $rootScope.jhoobinJhubDataId = item.id;
                                    }
                                });
                            } else {
                                $state.go('root.management')
                            }
                            $rootScope.generalData['showContent'] = true;
                            // $rootScope.showCOntent = true;
                            if ($rootScope.generalData['jhoobinJhubDataSelected']) {
                                resolve(true);
                            }
                            $timeout(function () {
                                $rootScope.$apply();
                            }, 100);

                        }
                    }
                    // loader.hide('body')
                })
            })
        },
        'check': (params) => {
            let startDate = new Date();
            /**
             * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
             * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
             */
            return new Promise((resolve, reject) => {
                params['url'] = 'ws/accounts/userData';
                console.warn('start - ws/accounts/userdata', params);
                post(params).then(response => {
                    console.warn('end - ws/accounts/userdata', $filter('generateDuration')(new Date() - startDate, 'ms'), response);
                    resolve(response);
                    // }).catch(error=> {
                }, function (error) {

                    reject(error);
                });
            });
        }
    };
    return appService;
    /**
     * call server with $http
     * @param params
     * @param urlType 'absolute' || ''
     * @returns {Promise} if success resolve data else reject error
     */
    function post(params, urlType, packageName) {
        /**
         * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
         * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
         */
        return new Promise((resolve, reject) => {
            /**
             * create structure for get data from server api
             * @type {{method: string, url: *, data, headers: {Content-Type: string}}}
             */
            let theOption = {
                method: 'POST',
                url: urlType === 'absolute' ? params.url : resourceName + params.url,
                data: params.data,
                headers: {
                    "Content-Type": "application/json",
                }
            };
            if ($rootScope.jhoobinJhubData) {
                if (packageName && params && params.data && params.data['packageName']) {
                    // theOption['data']['packageName'] =packageName || $rootScope.jhoobinJhubData;
                } else {
                    theOption['data']['packageName'] = $rootScope.jhoobinJhubData;
                }
            }
            !packageName && (theOption['data'] = Object.assign({}, theOption['data'], $rootScope.versionFilter));
            /**
             * call server with angular $http
             */
            $http(theOption).then(response => {
                resolve(response);
            }, function (error) {
                let beforeData = ['root.signin', 'root.notFound'];
                if (error && error.status === 401 && window.errorAu <= 1) {
                    if (beforeData.indexOf($state.current.name) > -1) {
                        $state.go($state.current.name)
                    } else {
                        $state.go('root.signin')
                    }
                    window.errorAu = 1
                }
                reject(error);
            });
        });
    }


}]);
