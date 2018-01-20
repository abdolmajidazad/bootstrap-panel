'use strict';

myApp.controllerProvider.register('SigninCtrl', ['$rootScope', '$scope', '$timeout', 'settings', '$state', 'loader', 'appService', function ($rootScope, $scope, $timeout, settings, $state, loader, appService) {
    $scope.checkInput = function (input) {

        if (input === 'userName') {
            checkUserNameSignin()
        } else if (input === 'password') {
            if ($scope.signin.password) {
                $scope.errorPassword = '';
            } else {
                $scope.errorPassword = 'is_required';
            }
        }
    };

    function checkUserNameSignin() {
        if ($scope.signin.userName) {
            // let re = /^[A-Za-z][A-Za-z0-9]*$/;
            let re = /\s/;

            if (!re.test($scope.signin.userName)) {
                $scope.errorUsername = '';
            } else {
                $scope.errorUsername = 'wrong_phrase';
            }
        } else {
            $scope.errorUsername = 'is_required';
        }
    }

    $scope.signinFunc = function () {
        // $state.go('root.myDrive')
        $scope.errorResponce = '';
        if (!$scope.signin.userName || !$scope.signin.password) {
            $scope.errorUsername = 'is_required';
            $scope.errorPassword = 'is_required';
            return;
        }
        async.auto({
            startLoading: cb => {
                loader.show('.signin-loading')
                let hash = sha1.create();
                hash.update($scope.signin['password']);
                let data = {
                    userName: $scope.signin['userName'],
                    password: hash.hex()
                };
                cb(null, data)
            },
            getAuth: ['startLoading', (cb, result) => {
                let option = {
                    data: result.startLoading
                };
                /**
                 * call server api and get data from server for show in view page
                 */
                appService.signin(option).then(function (resp) {
                    if (resp.status === 200) {
                        cb(null, resp.data);
                    } else {
                        cb(resp);
                    }
                }, function (error) {
                    cb(error);
                });
            }], getProducerList: ['getAuth', (cb, result) => {

                if (result && result['getAuth'] && result['getAuth']['errorCode'] === 0) {

                    let option = {
                        data: {}
                    };
                    appService.producer(option).then(resp => {
                        console.log("slllllll", resp)

                        if (resp.status === 200) {
                            cb(null, resp.data);
                        } else {
                            cb(resp);
                        }
                    }).catch(error => {
                        cb(error);
                    });
                } else {
                    cb(null, true)
                }

            }]
        }, (errors, result) => {
            console.log("cb, result", result)


            if (errors) {

            } else {

                if (result && result.getAuth && result.getAuth['errorCode']) {
                    $scope.errorResponce = 'username_password_wrong'
                } else {

                    // $state.go('root.myDrive');
                    if (result && result.getProducerList && result.getProducerList['producers'] && result.getProducerList['producers'].length) {
                        // $("#producerModalLIst").modal('show');

                        // result.getProducerList['producers'].push({id : 12345, name:'test'});
                        $scope.producerSelected = result.getProducerList['producers'][0]['id'];
                        $rootScope.generalData['jhoobinJhubDataApp'] = result.getProducerList['producers'][0];
                        $scope.producerList = result.getProducerList['producers'];
                        if ($scope.producerList && $scope.producerList.length && $scope.producerList.length > 1) {
                            $('#producerModalLIst').modal({backdrop: 'static', keyboard: false})
                            $timeout(function () {
                                $scope.$apply()
                            }, 100)
                        } else {
                            $scope.runProject()
                        }

                    }
                }
            }
            loader.hide('.signin-loading')
            $scope.signin['password'] = '';
            $timeout(function () {
                $scope.$apply()
            }, 100)
        })

    };


    $scope.changeProducer = function (item) {

        $rootScope.generalData['jhoobinJhubDataApp'] = item;
        $scope.producerSelected = item.id;
        console.log("item:", item, $scope.producerSelected)
    };


    $scope.errorList = [];
    $scope.runProject = function () {
        $scope.errorList = []
        async.auto({
            startLoading: cb => {
                loader.show('.modal-dialog');
                cb(null, true);
            }, setProducer: ['startLoading', (cb, result) => {
                let option = {
                    data: {
                        producerId: $scope.producerSelected
                    }
                };
                appService.producerSetter(option).then(resp => {
                    if (resp.status === 200) {
                        cb(null, resp.data);
                    } else {
                        cb(resp);
                    }
                }).catch(error => {
                    cb(error);
                });
            }], getAccount: ['startLoading', (cb, result) => {
                let option = {
                    data: {
                        producerId: $scope.producerSelected
                    }
                };
                appService.getAccount(option).then(resp => {

                    console.log("resprespresp:getAccount", resp)
                    if (resp.status === 200) {
                        cb(null, resp.data);
                    } else {
                        cb(resp);
                    }
                }).catch(error => {
                    cb(error);
                });
            }]
        }, (errors, result) => {
            if (errors) {

            } else {
                if (result && result['getAccount'] && result['getAccount']['id']) {
                    $rootScope.generalData['accountNumber'] = result['getAccount']['id'];
                    // appService.appSetter({data:{accountNumber:result['getAccount']['id']}}).then(resp=>{}).catch(error=>{});
                    getAppList();
                } else {
                    loader.hide('.modal-dialog');
                    $('#producerModalLIst').modal('hide');
                    $('#legalInit').modal('show')
                }
            }
        })
    };

    function getAppList() {
        async.auto({
            getAppList: cb => {
                let option = {
                    data: {}
                };
                appService.appList(option).then(resp => {
                    if (resp.status === 200) {
                        cb(null, resp.data);
                    } else {
                        cb(resp);
                    }
                }).catch(error => {
                    cb(error);
                });
            }
        }, (error, result) => {
            if (error) {

            } else {

                let appFamily = result['getAppList']['appFamilies'];
                // if(result  && result['getAppList'] && result['getAppList']['appFamilies'] && result['getAppList']['appFamilies'].length){
                $rootScope.generalData['jhoobinJhubDataSelected'] = appFamily.length ? appFamily[0]['name'] : '';
                $rootScope.generalData['jhoobinJhubData'] = appFamily.length ? appFamily[0]['packageName'] : '';
                $rootScope.generalData['jhoobinJhubDataId'] = appFamily.length ? appFamily[0]['id'] : '';
                if (appFamily.length) {
                    appService.appSetter({data: {appPackageName: appFamily[0]['packageName']}}).then(resp => {
                    }).catch(error => {
                    })
                }

                $rootScope.generalData['jhoobinJhubDataList'] = appFamily;
                if ($rootScope.generalData['jhoobinJhubDataList'].length) {
                    $state.go('root.myDrive');
                } else {
                    $state.go('root.management');
                }
                // }
            }
            $rootScope.generalData['showContent'] = true;
            loader.hide('.modal-dialog');
            $timeout(function () {
                $scope.$apply()
            }, 100)
        })
    }

    $scope.signin = {
        userName: '',
        password: ''
    };
    $scope.initApp = function () {
        async.auto({
            startLoading: cb => {
                loader.show('.modal-dialog');
                cb(null, true);
            },
            initApp: ['startLoading', (cb, result) => {
                let option = {
                    data: {}
                };
                appService.init(option).then(resp => {
                    if (resp.status === 200) {
                        cb(null, resp.data);
                    } else {
                        cb(resp);
                    }
                }).catch(error => {
                    cb(error);
                });
            }]
        }, (error, result) => {
            if (error) {

            } else {
                getAppList()
            }
        })
    };


    $scope.signinFormShow = true;
    $scope.signupFormShow = false;
    $scope.forgotPasswordFormShow = false;
    $scope.redirectFunction = function (data) {
        if (data === 'signup') {
            $scope.registerANdForgotPasswordTitle = data;
            $scope.registerANdForgotPasswordContent = 'jhoobin_register';
            $scope.registerANdForgotPasswordLink = 'https://seller.jhoobin.com/main/signup.jsf';
            //
        } else if (data === 'reset_password') {
            $scope.registerANdForgotPasswordTitle = data;
            $scope.registerANdForgotPasswordContent = 'jhoobin_forgot_password';
            $scope.registerANdForgotPasswordLink = 'https://seller.jhoobin.com/main/recoverpassword.jsf';
        }
        setTimeout(() => {
            $scope.$apply();
        }, 100);

        $('#registerAndForgotPassword').modal('show')

    }


    /**
     * sign up functions
     */


    $scope.signupFunc = function () {
        // $state.go('root.myDrive')
        //
        console.log("checkFillForm", checkFillForm())
        if (!checkFillForm('sendData')) {
            console.log($scope.signupForm)
            resetSignupForm();
        } else {
            console.log($scope.signupForm)
        }

    };
    $scope.signupFormSubmitBtn = true;

    function resetSignupForm() {
        $scope.signupForm = {
            userName: {
                subject: '',
                error: ''
            },
            email: {
                subject: '',
                error: ''
            },
            // phoneNumber : {
            //     subject : '',
            //     error : ''
            // },
            mobileNumber: {
                subject: '',
                error: ''
            },
            // password : {
            //     subject : '',
            //     error : ''
            // },
            // confirmPassword : {
            //     subject : '',
            //     error : ''
            // }
        }
    }

    resetSignupForm();
    $scope.checkValidate = function (inputName) {
        console.log(inputName, $scope.signupForm);
        switch (inputName) {
            case 'userName': {
                checkUserName();
                break;
            }
            case 'email': {
                checkEmail();
                break;
            }
            case 'phoneNumber': {
                checkPhone(inputName);
                break;
            }
            case 'mobileNumber': {
                checkPhone(inputName);
                break;
            }
            // case 'password':{
            //     checkPassword();
            //     break;
            // }case 'confirmPassword':{
            //     checkPassword();
            //     break;
            // }
        }
        checkFillForm()

    };

    function checkFillForm(sendData) {
        let count = 0;
        for (let i in $scope.signupForm) {
            if ($scope.signupForm && $scope.signupForm[i] && $scope.signupForm[i]['error'] && $scope.signupForm[i]['error'].length) {
                count++;
                $scope.signupFormSubmitBtn = true;
            }

            if ($scope.signupForm && $scope.signupForm[i] && $scope.signupForm[i]['subject'].length === 0) {
                count++;
                if (sendData) {
                    $scope.signupForm[i]['error'] = 'is_required';
                }
                $scope.signupFormSubmitBtn = true;
            }
        }
        if (count === 0) {
            $scope.signupFormSubmitBtn = false;
        }
        $timeout(function () {
            $scope.$apply()
        }, 100);
        return $scope.signupFormSubmitBtn;
    }

    function checkUserName() {
        if ($scope.signupForm && $scope.signupForm['userName']['subject']) {
            let re = /^[A-Za-z][A-Za-z0-9]*$/;

            if (re.test($scope.signupForm['userName']['subject'])) {
                $scope.signupForm['userName']['error'] = '';
            } else {
                $scope.signupForm['userName']['error'] = 'wrong_phrase';
            }
        } else {
            $scope.signupForm['userName']['error'] = 'is_required';
        }
    }

    function checkEmail() {
        if ($scope.signupForm && $scope.signupForm['email']['subject']) {
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test($scope.signupForm['email']['subject'])) {
                $scope.signupForm['email']['error'] = '';
            } else {
                $scope.signupForm['email']['error'] = 'email_error';
            }
        } else {
            $scope.signupForm['email']['error'] = 'is_required';
        }
    }

    function checkPhone(input) {
        if ($scope.signupForm && $scope.signupForm[input]['subject'] && $scope.signupForm[input]['subject'].length === 15 && $scope.signupForm[input]['subject'].startsWith("98")) {
            $scope.signupForm[input]['error'] = '';
        } else if ($scope.signupForm && $scope.signupForm[input]['subject'] && ($scope.signupForm[input]['subject'].length < 15 || !$scope.signupForm[input]['subject'].startsWith("98"))) {
            $scope.signupForm[input]['error'] = 'mobile_error';
        } else {
            $scope.signupForm[input]['error'] = 'is_required';
        }
    }

    function checkPassword() {
        if ($scope.signupForm && $scope.signupForm['password']['subject'] && $scope.signupForm['confirmPassword']['subject']) {
            if ($scope.signupForm['password']['subject'] && $scope.signupForm['password']['subject'].length > 5) {
                if ($scope.signupForm['password']['subject'] === $scope.signupForm['confirmPassword']['subject']) {
                    $scope.signupForm['password']['error'] = '';
                    $scope.signupForm['confirmPassword']['error'] = '';
                } else {
                    $scope.signupForm['password']['error'] = '';
                    $scope.signupForm['confirmPassword']['error'] = 'password_confirm_not_equal';
                }
            } else {
                $scope.signupForm['confirmPassword']['error'] = 'password_confirm_not_equal';
            }

        } else if ($scope.signupForm && $scope.signupForm['password']['subject'] && !$scope.signupForm['confirmPassword']['subject']) {
            if ($scope.signupForm['password']['subject'] && $scope.signupForm['password']['subject'].length <= 5) {
                $scope.signupForm['password']['error'] = 'length_error';
            } else {
                $scope.signupForm['password']['error'] = '';
            }

        } else if ($scope.signupForm && !$scope.signupForm['password']['subject'] && $scope.signupForm['confirmPassword']['subject']) {
            $scope.signupForm['password']['error'] = 'is_required';
            $scope.signupForm['confirmPassword']['error'] = 'password_confirm_not_equal';
        } else if ($scope.signupForm && !$scope.signupForm['password']['subject'] && !$scope.signupForm['confirmPassword']['subject']) {
            $scope.signupForm['confirmPassword']['error'] = '';
        } else {
            $scope.signupForm['password']['error'] = 'is_required';
        }

    }

    // function runMobileNumber() {
    //     $("#MobileNumber").mask("99 999 999 9999");
    // };


    /**
     * forgot password functions
     */

    $scope.resetFunc = function () {
        if (!$scope.mobile) {
            $scope.mobileError = 'is_required'
            return;
        }

    };


    function resetForgotPasswordForm() {
        $scope.forgotPassword = {
            mobile: '',
            mobileError: ''
        };
    }

    resetForgotPasswordForm();

    $scope.checkValidateForgotPassword = function () {
        if ($scope.forgotPassword.mobile && $scope.forgotPassword.mobile && $scope.forgotPassword.mobile.length === 15 && $scope.forgotPassword.mobile.startsWith("98")) {
            $scope.forgotPassword.mobileError = '';
        } else if ($scope.forgotPassword.mobile && $scope.forgotPassword.mobile && ($scope.forgotPassword.mobile.length < 15 || !$scope.forgotPassword.mobile.startsWith("98"))) {
            $scope.forgotPassword.mobileError = 'mobile_error';
        } else {
            $scope.forgotPassword.mobileError = 'is_required';
        }
    }

}]);
