/**
 * get count of persian and english character and return direction(ltr | rtl) of show description
 */
myApp.filter('generateDirection', function () {
    return function (inp) {
        if (inp == null) {
            return "ltr";
        } else {
            let eng = 0;
            let per = 0;
            let chars = inp.split('');
            let len = chars.length;

            for (let i = 0; i < len; ++i) {
                if (chars[i].charCodeAt(0) > 255) {
                    ++per;
                } else {
                    ++eng;
                }
            }
            if (eng > per) {

                return "ltr";
            } else {
                return "rtl";
            }
        }
    };
});