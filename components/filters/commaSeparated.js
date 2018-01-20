myApp.filter('commaSeparated', function () {
    return function (number) {
        number = number || 0;
        return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1,')
    };
});