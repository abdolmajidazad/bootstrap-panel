/**
 * get parameter and return string of it with '' character
 */
myApp.filter('generateIcon', function () {
    return function (fileName) {
        const str = fileName.split('.').pop();

        console.log("str: ", str)
        const image = ['jpeg', 'jpg','png', 'gif', 'svg'];
        const zip = ['zip', 'rar'];
        const move = ['mp4', 'mpeg','webm'];

        if(image.includes(str)){
            return 'image';
        }else if(zip.includes(str)){
            return 'archive';
        }else if(move.includes(str)){
            return 'video';
        }else {
            return 'document';
        }
    };
});