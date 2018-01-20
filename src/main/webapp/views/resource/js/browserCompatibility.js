if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
var sitename=window.location.origin+'/';
var userAgent = false;
/**
 * generate browser name and browser version for handle compatibility of browser
 * @returns {*}
 */
function get_browser_info() {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name: 'IE ', version: (tem[1] || '')};
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) {
            return {name: 'Opera', version: tem[1]};
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1]
    };
}
/**
 * check support Promise or not
 * when Not support promise , background color is #FFFBDD in ?force url
 */
if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
    document.getElementsByTagName('body')[0].style.backgroundColor = '';
    userAgent = false;
} else {
    /**
     * this variable contains browser name and browser version
     * No support : Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Win64; x64; Trident/4.0; .NET CLR 2.0.50727; SLCC2; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E) * MSIE * 8
     * @type {{name, version}}
     */
    var browser = get_browser_info();
    document.getElementById('navigator_userAgent').innerHTML = "<div class='force-error-box'><div class='force-error-header'>*** No support (  "+browser.name +" , "+ browser.version + "  ) ***</div><hr><div>*** "+ navigator.userAgent+" ***</div></div>";
    if (window.location.href.indexOf('force') > -1) {
        document.getElementById('navigator_userAgent').style.display = 'block';
    }

    userAgent = true;
}

/**
 * check url when load page
 * when url contains 'force'
 * load project without check compatibility
 * http://www.parshub.com?force
 *
 */
if (window.location.href.indexOf('force') === -1) {


    /**
     * generate new html file
     */
    function runNewPage() {
        document.getElementById("body-content").innerHTML = "";
        document.getElementById("body-content").innerHTML =
            '<div class="page-content-compatibility-1">'+
            '<div id="error-page-compatibility-1" class="first-load-page" >' +
            '<div class="download-content">' +
            '<img class="download-content-image-logo" src="' + sitename + 'views/resource/images/logo.png" alt="">' +
            '<div style="clear: both"></div>' +
            // '<img class="download-content-image-partsicon" src="http://' + sitename + '/views/resource/images.' + portNumber + '/start-partsicon.gif" alt="">' +
            // '<div style="clear: both"></div>' +
            // '<img class="download-content-image-getbutton" src="views/resource/images.' + portNumber + '/start-getbutton.gif" onclick="window.open(\'http://' + sitename + '/get\')" alt="">' +
            '</div>' +
            '<div class="signin-content">' +
            '<div onclick="showContentData()" style="cursor: pointer">ورود به سایت</div>' +
            '</div>' +
            '</div>' +
            '<div id="error-page-compatibility-2" class="first-load-page-compatibility" style="display: none">' +
            '<div class="download-content-compatibility">' +
            '<img width="150px" src="' + sitename + 'views/resource/images/logo.png" alt="">' +
            '<div style="clear: both"></div>' +
            '</div>' +
            // '<img class="content-compatibility-colorline" src="http://' + sitename + '/views/resource/images.' + portNumber + '/start-colorline.gif" alt="" width="100%" style="position: relative">' +
            '<div class="content-compatibility">' +
            '<div class="content-compatibility-error-text">ورود به سایت با مرورگر شما امکان پذیر نیست.</div>' +
            '<div class="content-compatibility-text">یکی از مرورگرهای زیر را امتحان کنید.</div>' +
            '<img class="browser-icon"  src="' + sitename + 'views/resource/images/browser-logos.png" alt="">' +
            '</div>' +
            '</div>'+
            '</div>'
    };



    if (userAgent) {
        runNewPage();
    }

    /**
     * show browser list and hide start page
     */
    function showContentData() {



        document.getElementById('error-page-compatibility-2').style.display = 'block';
        document.getElementById('error-page-compatibility-1').style.display = 'none';
    }
}


