/**
 * get timestamp number and generate persian date with 1396/04/01 format
 * https://libraries.io/bower/persian-date
 */
myApp.filter('toPersianDate', function () {
    return function (time, format) {
        /**
         * return persian format date with persianDate bower
         */
        //
        if (format) {
            return persianDate(time).format(format);

        } else {
            return persianDate(time).format('L');
        }

    };
});