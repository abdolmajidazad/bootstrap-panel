var appEnvironment = "development";
var appIPAddress;
var appPort;
var appProtocol;
var appHost;
var appDirectory;

appName = "jhoobin";
appProtocol = "http://";
appPort = "8000";
appIPAddress = "127.0.0.1";
appHost = appProtocol + appIPAddress + ':' + appPort;
appDirectory = 'src/main/webapp';

var http = require('http');
var express = require('express');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');

var apiForwardingUrl = 'http://www.amaroid.net';
var apiForwardingClient = 'http://127.0.0.1:9000';

var proxyOptions = {
    changeOrigin: true

};
httpProxy.prototype.onError = function (err) {
    console.log(err);
};
var apiProxy = httpProxy.createProxyServer(proxyOptions);

console.log('Forwarding API requests to ' + apiForwardingUrl);

var path = require('path');
var app = express();

var compression = require('compression');
var contentDisposition = require('content-disposition');

// =============================================================================
// start response compression
// -----------------------------------------------------------------------------
function checkCompress (req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
}
app.use(compression({filter: checkCompress}));
// -----------------------------------------------------------------------------
// end response compression
// _____________________________________________________________________________


// =============================================================================
// start Set header to force download
// -----------------------------------------------------------------------------
function setCustomHeaders (res, path) {
    res.setHeader('Content-Disposition', contentDisposition(path));
    res.setHeader('X-Powered-By', appName);
}
// -----------------------------------------------------------------------------
// end Set header to force download
// _____________________________________________________________________________


app.set('protocol', appProtocol );
app.set('ip', appIPAddress );
app.set('port', appPort );
app.set('appPrefixPath', appHost );
global.appPrefixPath = app.get('appPrefixPath');

// console.log("global.appPrefixPath;", global.appPrefixPath)

app.use(express.static(path.join(__dirname, appDirectory), {
    //maxAge: '12h',
    'index': false,
    'setHeaders': setCustomHeaders
}));


// =============================================================================
// start dynamic routes resolve, redirect to index.html
// -----------------------------------------------------------------------------
app.get("*", function(req, res) {
    console.log("path.join(__dirname, appDirectory+'/', 'index.html'):", path.join(__dirname, appDirectory+'/', 'index.html'))
    res.sendFile(path.join(__dirname, appDirectory+'/', 'index.html'));
});
// -----------------------------------------------------------------------------
// end dynamic routes resolve
// _____________________________________________________________________________


var server = http.createServer(app);
// var server = express();
server.listen(app.get('port'), function(){
    console.log(appName + ' server listening on ' + app.get('appPrefixPath'));

});