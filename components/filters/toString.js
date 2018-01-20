/**
 * get parameter and return string of it with '' character
 */
myApp.filter('toString', function () {
    return function (str) {
        return "'" + str + "'";
    };
});