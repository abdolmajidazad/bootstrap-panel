myApp.filter('roundNumber', function () {
    return function (number) {

        return Math.round(number * 100) / 100
        // return Math.round(number);
    };
});