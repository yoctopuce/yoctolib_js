// yapi loads asynchronously (usually within 5 ticks), so we don't try to access it right away..
 var yapi = require('./index');

 yapi.yDisableExceptions();

 if(yapi.yRegisterHub('http://127.0.0.1:4444/') != yapi.YAPI_SUCCESS) {
     throw new Error("Cannot contact VirtualHub on 127.0.0.1");
 }

 yapi.yUpdateDeviceList();

 var module = yapi.yFirstModule();
 while(module) {
     console.log(module.get_serialNumber() + '(' + module.get_productName() + ')');
     module = module.nextModule(); 
 }
