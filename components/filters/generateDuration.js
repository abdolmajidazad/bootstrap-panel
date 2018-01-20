/**
 * get millisecond and return time with minutes and seconds
 * example of use for generate time of music
 */
myApp.filter('generateDuration', function () {
    return function (sec, type) {


        /**
         * check entrance parameter is integer number
         * @type {Number}
         */

            // let sec_num = Math.round(sec);
        let sec_num = Math.round(sec * 1000);
        if (type === 'ms') {
            sec_num = Math.round(sec)
        }

        let returnTime = '';
        /**
         * get hours number of entrance parameter
         * @type {number}
         */
        let hours = Math.floor(sec_num / 3600000);
        if (hours >= 1) {
            returnTime = returnTime + hours + 'h '
        }

        /**
         * get minutes number of entrance parameter from hours number
         * @type {number}
         */
        let minutes = Math.floor((sec_num - (hours * 3600000)) / 60000);

        if (minutes >= 1) {
            returnTime = returnTime + minutes + 'm '
        }

        /**
         * get seconds number of entrance parameter from minutes and hours
         * @type {number}
         */
        let endTime = (sec_num - (hours * 3600000) - (minutes * 60000)) / 1000;

        endTime = endTime.toString().split('.');
        let seconds, milliseconds = 0;
        if (parseInt(endTime[0]) > 0) {
            seconds = endTime[0]
            if (seconds >= 1) {
                returnTime = returnTime + seconds + 's ';
            }
        }


        if (parseInt(endTime[1]) > 0 && type === 'ms') {
            milliseconds = parseInt(endTime[1], 10);

            if (milliseconds >= 1) {
                returnTime = returnTime + milliseconds + 'ms';
            }
        }

        /**
         * generate tile format of entrance parameter with hours , minutes and second
         * and return it
         */
        return returnTime;

    };
});