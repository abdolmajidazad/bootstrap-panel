/**
 * get byte number and generate size of file with b | kb | mb | gb
 */
myApp.filter('generateSize', ['$filter', function ($filter) {
    return function (number) {
        /**
         * define  the amount of byte
         * @type {number}
         */
        let b = 1;

        /**
         * define the amount of kilo byte
         * @type {number}
         */
        let kb = 1024;

        /**
         * define the amount of mega byte by kilo byte
         * @type {number}
         */
        let mb = Math.pow(kb, 2);

        /**
         * define the amount of giga byte by kilo byte
         * @type {number}
         */
        let gb = Math.pow(kb, 3);

        /**
         * define the amount of tera byte by kilo byte
         * @type {number}
         */
        let tb = Math.pow(kb, 4);

        /**
         * return number with suffix data
         */
        if (number > 0 && number < kb) {
            return number + ' ' + $filter('translate')('b');
        } else if (number >= kb && number < mb) {
            return (number / kb).toFixed(2) + ' ' + $filter('translate')('Kb');
        } else if (number >= mb && number < gb) {
            return (number / mb).toFixed(2) + ' ' + $filter('translate')('Mb');
        } else if (number >= gb && number < tb) {
            return (number / gb).toFixed(2) + ' ' + $filter('translate')('Gb');
        }
        // $filter('translate')('HELLO_WORLD');
    };
}]);