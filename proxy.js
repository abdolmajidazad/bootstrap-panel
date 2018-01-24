var express = require('express');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');

var server = express();
server.listen('9000', function(){
    console.log('Proxy server listening on http://127.0.0.1:9000' );
});



var proxyOptions = {
    changeOrigin: true
};
var apiProxy = httpProxy.createProxyServer(proxyOptions);
httpProxy.prototype.onError = function (err) {
    console.log(err);
}
server.all("/*", function(req, res) {
    if(req['url'].indexOf('/ws')>-1){
        console.log('\x1b[34m%s\x1b[0m', " >> ",'https://www.amaroid.net'+req.url);
        apiProxy.web(req, res, {target: 'https://www.amaroid.net'});
    }else if(req['url'].indexOf('/fileUpload')>-1){
        console.log("file upload server on port 3000");
        apiProxy.web(req, res, {target: 'http://localhost:3000'});
    }else{
        console.log('\x1b[31m%s\x1b[0m', " >> ",'http://127.0.0.1:8000'+req.url);
        apiProxy.web(req, res, {target: 'http://127.0.0.1:8000'});
    }
});
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));