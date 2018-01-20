//https://github.com/rstacruz/nprogress
myApp.factory('loader', function(settings) {
    return {
        show: function( element ) {
            /**
             * check support Promise or not
             * when Not support promise , background color is #FFFBDD in ?force url
             */
            if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
                /**
                 * show git logo in center of page
                 * @type {string}
                 */

                let width = '30px';
                let time = 600;
                if(element === 'body' || element === 'html'){
                    width = '150px';
                    time = 0
                }
                let imageUrl = 'views/resource/images/loading.gif';

                setTimeout(function(){
                    $(element).append(
                        '<div class="service-loading">' +
                        '<div class="sk-wave">' +
                        '<img src="'+imageUrl+'" alt="" width="'+width+'">'+
                        '</div>' +
                        '</div>');
                },time);

            }

        }, hide: function( element ) {
            /**
             * remove image from page center
             */
            let className = element+' .service-loading';

            let time = 600;
            if(element === 'body' || element === 'html'){
                time = 0
            }
            setTimeout(()=>{
                $(className).remove();
            }, time);

        }
    };
});
