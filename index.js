/* wrap the browser-side yoctolib_js library for node.js

   usage:

       var yapi = require('yoctolib');

       if (yapi.yRegisterHub('http://127.0.0.1:4444/') != yapi.YAPI_SUCCESS) ...

   note: this could load the library asynchronously, but there's only 30 files to load...

 */

var fs  = require('fs')
  , vm  = require('vm')
  , xhr = require('xmlhttprequest')
  ;


var api = { window         : { XMLHttpRequest : xhr.XMLHttpRequest }
          , XMLHttpRequest : xhr.XMLHttpRequest
          , console        : console
          , navigator      : {}
          };

var includeSync = function(filename) {
  vm.runInNewContext(fs.readFileSync(filename).toString(), api, filename);
};

var files = fs.readdirSync('./Sources');
var i = files.indexOf('yocto_api.js');
if (i !== -1) files.splice(i, 1);
includeSync('./Sources/yocto_api.js');
for (i = 0; i < files.length; i++) includeSync('./Sources/' + files[i]);
module.exports = api;
