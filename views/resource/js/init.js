"use strict";
let urlPath = window.location.href,
    fileJson,
    bodySelector = document.getElementsByTagName('body');
bodySelector[0].style.overflow = 'hidden';
/**
 * set app Environment mode for load file json
 * @type {string}
 */
let appEnvironment = window.enviroment;

/**
 * json of file.json
 * @type {{}}
 */
let appIncludeFilesJson = {};





/**
 * set background color for splash loading in market port 1 and 2
 * @returns {*}
 */
function getImageLoading() {
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }
    return window.location['origin'] + "/views/resource/images/signin-logotype.gif"
}


/**
 * check url for set market port
 */
    document.getElementById('loading-image').src = getImageLoading();

/**
 * set height for page dynamically according to height of screen
 */
// $(".application-start").css('height', window.innerHeight);
document.getElementsByClassName('application-start')[0].style.height = window.innerHeight+'px';

//
// window.addEventListener("scroll", function() {
//     let top = this.scrollY,
//         width = this.innerWidth;
//
// }, false);


//
// window.addEventListener("resize", function(){
//     let width = this.innerWidth;
//
// });



/**
 * animate scroll page to top with arrow up
 */
function goToTop(time) {
    window.scrollTo(0,0);

}



window.addEventListener("scroll", function() {


    // window.scrollTo(0,this.scrollY);

    let top = this.scrollY,
        arrowSelector = document.getElementsByClassName('arrow-up');
    if (top > 250) {
        arrowSelector[0].style.display = "block";

    } else {
        arrowSelector[0].style.display = "none";
    }

}, true);





