/**
 * get english number and convert to persian number ,
 * convert '.' character to ','
 */
myApp.filter('toEnDigit', function () {
    return function (number) {

        /**
         * define number when entrance parameter is empty
         * @type {string}
         */
        number = number || '0';
        number = number.toString();
        let ret = '';


        /**
         * loop on number character and change char code to persian character with increase 1728
         * and set ',' instead '.'
         */
        for (let i = 0, len = number.length; i < len; i++) {
            if (number.charCodeAt(i) >= 1776 && number.charCodeAt(i) <= 1785) {
                ret += String.fromCharCode(number.charCodeAt(i) - 1728);
            } else {

                ret += number[i].toString();
            }
        }
        return ret;
    };
});