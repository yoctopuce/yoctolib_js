/*********************************************************************
 *
 * $Id: yocto_api.js 66103 2025-05-02 06:55:47Z seb $
 *
 * High-level programming interface, common to all modules
 *
 * - - - - - - - - - License information: - - - - - - - - -
 *
 *  Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 *  Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
 *  non-exclusive license to use, modify, copy and integrate this
 *  file into your software for the sole purpose of interfacing
 *  with Yoctopuce products.
 *
 *  You may reproduce and distribute copies of this file in
 *  source or object form, as long as the sole purpose of this
 *  code is to interface with Yoctopuce products. You must retain
 *  this notice in the distributed source file.
 *
 *  You should refer to Yoctopuce General Terms and Conditions
 *  for additional information regarding your rights and
 *  obligations.
 *
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
 *  WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
 *  WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS
 *  FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO
 *  EVENT SHALL LICENSOR BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
 *  INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA,
 *  COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY OR
 *  SERVICES, ANY CLAIMS BY THIRD PARTIES (INCLUDING BUT NOT
 *  LIMITED TO ANY DEFENSE THEREOF), ANY CLAIMS FOR INDEMNITY OR
 *  CONTRIBUTION, OR OTHER SIMILAR COSTS, WHETHER ASSERTED ON THE
 *  BASIS OF CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF
 *  WARRANTY, OR OTHERWISE.
 *
 *********************************************************************/

//--- (generated code: YFunction definitions)
// Yoctopuce error codes, also used by default as function return value
var YAPI_SUCCESS                    = 0;       // everything worked all right
var YAPI_NOT_INITIALIZED            = -1;      // call yInitAPI() first !
var YAPI_INVALID_ARGUMENT           = -2;      // one of the arguments passed to the function is invalid
var YAPI_NOT_SUPPORTED              = -3;      // the operation attempted is (currently) not supported
var YAPI_DEVICE_NOT_FOUND           = -4;      // the requested device is not reachable
var YAPI_VERSION_MISMATCH           = -5;      // the device firmware is incompatible with this API version
var YAPI_DEVICE_BUSY                = -6;      // the device is busy with another task and cannot answer
var YAPI_TIMEOUT                    = -7;      // the device took too long to provide an answer
var YAPI_IO_ERROR                   = -8;      // there was an I/O problem while talking to the device
var YAPI_NO_MORE_DATA               = -9;      // there is no more data to read from
var YAPI_EXHAUSTED                  = -10;     // you have run out of a limited resource, check the documentation
var YAPI_DOUBLE_ACCES               = -11;     // you have two process that try to access to the same device
var YAPI_UNAUTHORIZED               = -12;     // unauthorized access to password-protected device
var YAPI_RTC_NOT_READY              = -13;     // real-time clock has not been initialized (or time was lost)
var YAPI_FILE_NOT_FOUND             = -14;     // the file is not found
var YAPI_SSL_ERROR                  = -15;     // Error reported by mbedSSL
var YAPI_RFID_SOFT_ERROR            = -16;     // Recoverable error with RFID tag (eg. tag out of reach), check YRfidStatus for details
var YAPI_RFID_HARD_ERROR            = -17;     // Serious RFID error (eg. write-protected, out-of-boundary), check YRfidStatus for details
var YAPI_BUFFER_TOO_SMALL           = -18;     // The buffer provided is too small
var YAPI_DNS_ERROR                  = -19;     // Error during name resolutions (invalid hostname or dns communication error)
var YAPI_SSL_UNK_CERT               = -20;     // The certificate is not correctly signed by the trusted CA

var YAPI_INVALID_INT                = 0x7fffffff;
var YAPI_INVALID_UINT               = -1;
var YAPI_INVALID_LONG               = 0x7fffffffffffffff;
var YAPI_INVALID_DOUBLE             = -Number.MAX_VALUE;
var YAPI_INVALID_STRING             = "!INVALID!";
var Y_FUNCTIONDESCRIPTOR_INVALID    = YAPI_INVALID_STRING;
var Y_HARDWAREID_INVALID            = YAPI_INVALID_STRING;
var Y_FUNCTIONID_INVALID            = YAPI_INVALID_STRING;
var Y_FRIENDLYNAME_INVALID          = YAPI_INVALID_STRING;
var Y_LOGICALNAME_INVALID           = YAPI_INVALID_STRING;
var Y_ADVERTISEDVALUE_INVALID       = YAPI_INVALID_STRING;
//--- (end of generated code: YFunction definitions)
var YAPI_MAX_DOUBLE             = Number.MAX_VALUE;
var YAPI_MIN_DOUBLE             = -Number.MAX_VALUE;

//--- (generated code: YMeasure definitions)
//--- (end of generated code: YMeasure definitions)
var Y_DATA_INVALID                  = YAPI_INVALID_DOUBLE;
var Y_DURATION_INVALID              = YAPI_INVALID_INT;

//--- (generated code: YFirmwareUpdate definitions)
//--- (end of generated code: YFirmwareUpdate definitions)
//--- (generated code: YDataStream definitions)
//--- (end of generated code: YDataStream definitions)

//--- (generated code: YDataSet definitions)
//--- (end of generated code: YDataSet definitions)

//--- (generated code: YSensor definitions)
var Y_ADVMODE_IMMEDIATE             = 0;
var Y_ADVMODE_PERIOD_AVG            = 1;
var Y_ADVMODE_PERIOD_MIN            = 2;
var Y_ADVMODE_PERIOD_MAX            = 3;
var Y_ADVMODE_INVALID               = -1;
var Y_UNIT_INVALID                  = YAPI_INVALID_STRING;
var Y_CURRENTVALUE_INVALID          = YAPI_INVALID_DOUBLE;
var Y_LOWESTVALUE_INVALID           = YAPI_INVALID_DOUBLE;
var Y_HIGHESTVALUE_INVALID          = YAPI_INVALID_DOUBLE;
var Y_CURRENTRAWVALUE_INVALID       = YAPI_INVALID_DOUBLE;
var Y_LOGFREQUENCY_INVALID          = YAPI_INVALID_STRING;
var Y_REPORTFREQUENCY_INVALID       = YAPI_INVALID_STRING;
var Y_CALIBRATIONPARAM_INVALID      = YAPI_INVALID_STRING;
var Y_RESOLUTION_INVALID            = YAPI_INVALID_DOUBLE;
var Y_SENSORSTATE_INVALID           = YAPI_INVALID_INT;
//--- (end of generated code: YSensor definitions)

//--- (generated code: YModule definitions)
var Y_PERSISTENTSETTINGS_LOADED     = 0;
var Y_PERSISTENTSETTINGS_SAVED      = 1;
var Y_PERSISTENTSETTINGS_MODIFIED   = 2;
var Y_PERSISTENTSETTINGS_INVALID    = -1;
var Y_BEACON_OFF                    = 0;
var Y_BEACON_ON                     = 1;
var Y_BEACON_INVALID                = -1;
var Y_PRODUCTNAME_INVALID           = YAPI_INVALID_STRING;
var Y_SERIALNUMBER_INVALID          = YAPI_INVALID_STRING;
var Y_PRODUCTID_INVALID             = YAPI_INVALID_UINT;
var Y_PRODUCTRELEASE_INVALID        = YAPI_INVALID_UINT;
var Y_FIRMWARERELEASE_INVALID       = YAPI_INVALID_STRING;
var Y_LUMINOSITY_INVALID            = YAPI_INVALID_UINT;
var Y_UPTIME_INVALID                = YAPI_INVALID_LONG;
var Y_USBCURRENT_INVALID            = YAPI_INVALID_UINT;
var Y_REBOOTCOUNTDOWN_INVALID       = YAPI_INVALID_INT;
var Y_USERVAR_INVALID               = YAPI_INVALID_INT;
//--- (end of generated code: YModule definitions)

// yInitAPI constants (not really useful in Javascript, but defined for code portability)
var Y_DETECT_NONE                   = 0;
var Y_DETECT_USB                    = 1;
var Y_DETECT_NET                    = 2;
var Y_DETECT_ALL                    = (Y_DETECT_USB | Y_DETECT_NET);

// calibration types
var YOCTO_CALIB_TYPE_OFS            = 30;

var NOTIFY_NETPKT_NAME = '0';
var NOTIFY_NETPKT_CHILD = '2';
var NOTIFY_NETPKT_FUNCNAME = '4';
var NOTIFY_NETPKT_FUNCVAL = '5';
var NOTIFY_NETPKT_LOG = '7';
var NOTIFY_NETPKT_FUNCNAMEYDX = '8';
var NOTIFY_NETPKT_FLUSHV2YDX = 't';
var NOTIFY_NETPKT_FUNCV2YDX = 'u';
var NOTIFY_NETPKT_TIMEV2YDX = 'v';
var NOTIFY_NETPKT_DEVLOGYDX = 'w';
var NOTIFY_NETPKT_TIMEVALYDX = 'x';
var NOTIFY_NETPKT_FUNCVALYDX = 'y';
var NOTIFY_NETPKT_TIMEAVGYDX = 'z';
var NOTIFY_NETPKT_NOT_SYNC = '@';
var NOTIFY_NETPKT_STOP = 10;    // =\n

var NOTIFY_V2_LEGACY = 0;      // unused (reserved for compatibility with legacy notifications)
var NOTIFY_V2_6RAWBYTES = 1;   // largest type: data is always 6 bytes
var NOTIFY_V2_TYPEDDATA = 2;   // other types: first data byte holds the decoding format
var NOTIFY_V2_FLUSHGROUP = 3;  // no data associated

var PUBVAL_LEGACY = 0;     // 0-6 ASCII characters (normally sent as YSTREAM_NOTICE)
var PUBVAL_1RAWBYTE = 1;   // 1 raw byte  (=2 characters)
var PUBVAL_2RAWBYTES = 2;  // 2 raw bytes (=4 characters)
var PUBVAL_3RAWBYTES = 3;  // 3 raw bytes (=6 characters)
var PUBVAL_4RAWBYTES = 4;  // 4 raw bytes (=8 characters)
var PUBVAL_5RAWBYTES = 5;  // 5 raw bytes (=10 characters)
var PUBVAL_6RAWBYTES = 6;  // 6 hex bytes (=12 characters) (sent as V2_6RAWBYTES)
var PUBVAL_C_LONG = 7;      // 32-bit C signed integer
var PUBVAL_C_FLOAT = 8;     // 32-bit C float

var PUBVAL_YOCTO_FLOAT_E3 = 9;      // 32-bit Yocto fixed-point format (e-3)
var PUBVAL_YOCTO_FLOAT_E6 = 10;     // 32-bit Yocto fixed-point format (e-6)

var YOCTO_PUBVAL_LEN = 16;
var YOCTO_PUBVAL_SIZE = 6;


//--- (generated code: YDataLogger definitions)
var Y_RECORDING_OFF                 = 0;
var Y_RECORDING_ON                  = 1;
var Y_RECORDING_PENDING             = 2;
var Y_RECORDING_INVALID             = -1;
var Y_AUTOSTART_OFF                 = 0;
var Y_AUTOSTART_ON                  = 1;
var Y_AUTOSTART_INVALID             = -1;
var Y_BEACONDRIVEN_OFF              = 0;
var Y_BEACONDRIVEN_ON               = 1;
var Y_BEACONDRIVEN_INVALID          = -1;
var Y_CLEARHISTORY_FALSE            = 0;
var Y_CLEARHISTORY_TRUE             = 1;
var Y_CLEARHISTORY_INVALID          = -1;
var Y_CURRENTRUNINDEX_INVALID       = YAPI_INVALID_UINT;
var Y_TIMEUTC_INVALID               = YAPI_INVALID_LONG;
var Y_USAGE_INVALID                 = YAPI_INVALID_UINT;
//--- (end of generated code: YDataLogger definitions)

var Y_DATA_INVALID                  = YAPI_INVALID_DOUBLE;
var Y_MINVALUE_INVALID              = YAPI_INVALID_DOUBLE;
var Y_AVERAGEVALUE_INVALID          = YAPI_INVALID_DOUBLE;
var Y_MAXVALUE_INVALID              = YAPI_INVALID_DOUBLE;



var yAPI, YAPI;
var YFunction;
var YMeasure;
var YDataStream;
var YDataSet;
var YOldDataStream;
var YDataLogger;
var YSensor;
var YModule;

var Y_BASETYPES = { Function:0, Sensor:1 };

(function()
{
    //
    // Method common to all classes, to throw exceptions or report errors (Javascript-specific)
    //
    function YAPI_throw(int_errType, str_errMsg, obj_retVal)
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;

        if(!YAPI.exceptionsDisabled) {
            // create a well-formed exception object including stack
            try {
                // note: The function Trigger_Yocto_Error below does intentionally not exist !
                //       Its only purpose is to create a valid exception stack frame and
                //       trigger the javascript debugger in the best possible way
                Trigger_Yocto_Error(int_errType, str_errMsg);
            } catch (e) {
                var key, exc = new Error(str_errMsg);
                for(key in e) {
                    if(key != "name" && key != "number" && key != "message")
                        exc[key] = e[key];
                }
                exc["name"]        = "YoctoError";
                exc["message"]     = str_errMsg;
                exc["description"] = str_errMsg;
                exc["number"]      = int_errType;
                throw exc;
            }
        }
        return obj_retVal;
    }

    // FOR BROWSERS ONLY:
    // JSON parser emulation if no native support is available
    //
    if(typeof JSON == "undefined") {
        window.JSON = {res: null,
                        parse: function(str) {
                            eval("this.res = "+str+";");
                            return this.res;
                        }
                      };
    }
    // FOR BROWSERS ONLY:
    // Reference implementation of Array.indexOf (missing in IE8)
    //
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement, fromIndex) {
          var k;

          // 1. Let O be the result of calling ToObject passing
          //    the this value as the argument.
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }

          var O = Object(this);

          // 2. Let lenValue be the result of calling the Get
          //    internal method of O with the argument "length".
          // 3. Let len be ToUint32(lenValue).
          var len = O.length >>> 0;

          // 4. If len is 0, return -1.
          if (len === 0) {
            return -1;
          }

          // 5. If argument fromIndex was passed let n be
          //    ToInteger(fromIndex); else let n be 0.
          var n = +fromIndex || 0;

          if (Math.abs(n) === Infinity) {
            n = 0;
          }

          // 6. If n >= len, return -1.
          if (n >= len) {
            return -1;
          }

          // 7. If n >= 0, then Let k be n.
          // 8. Else, n<0, Let k be len - abs(n).
          //    If k is less than 0, then let k be 0.
          k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

          // 9. Repeat, while k < len
          while (k < len) {
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the
            //    HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            //    i.  Let elementK be the result of calling the Get
            //        internal method of O with the argument ToString(k).
            //   ii.  Let same be the result of applying the
            //        Strict Equality Comparison Algorithm to
            //        searchElement and elementK.
            //  iii.  If same is true, return k.
            if (k in O && O[k] === searchElement) {
              return k;
            }
            k++;
          }
          return -1;
        };
    }

    //
    // YFunctionType Class (used internally)
    //
    // Instances of this class stores everything we know about a given type of function:
    // Mapping between function logical names and Hardware ID as discovered on hubs,
    // and existing instances of YFunction (either already connected or simply requested).
    // To keep it simple, this implementation separates completely the name resolution
    // mechanism, implemented using the yellow pages, and the storage and retrieval of
    // existing YFunction instances.
    //
    function YFunctionType(str_classname)
    {
        // private
        this._className     = str_classname;
        this._connectedFns  = {};           // functions requested and available, by Hardware Id
        this._requestedFns  = {};           // functions requested but not yet known, by any type of name
        this._hwIdByName    = {};           // hash table of function Hardware Id by logical name
        this._nameByHwId    = {};           // hash table of function logical name by Hardware Id
        this._valueByHwId   = {};           // hash table of function advertised value by logical name
        this._baseType      = 0;            // default to no abstract base type (generic YFunction)
    }

    // Index a single function given by HardwareId and logical name; store any advertised value
    // Return true iff there was a logical name discrepancy
    function YFunctionType_reindexFunction(str_hwid, str_name, str_val, int_basetype)
    {
        var currname = this._nameByHwId[str_hwid];
        var res = false;
        if(currname == undefined || currname == "") {
            if(str_name != "") {
                this._nameByHwId[str_hwid] = str_name;
                res = true;
            }
        } else if(currname != str_name) {
            if(this._hwIdByName[currname] == str_hwid)
                delete this._hwIdByName[currname];
            if(str_name != "") {
                this._nameByHwId[str_hwid] = str_name;
            } else {
                delete this._nameByHwId[str_hwid];
            }
            res = true;
        }
        if(str_name != "") {
            this._hwIdByName[str_name] = str_hwid;
        }
        if(str_val != undefined) {
            this._valueByHwId[str_hwid] = str_val;
        } else {
            if(this._valueByHwId[str_hwid] == undefined) {
                this._valueByHwId[str_hwid] = "";
            }
        }
        if(int_basetype != undefined) {
            if(this._baseType == 0) {
                this._baseType = int_basetype;
            }
        }
        return res;
    }

    // Forget a disconnected function given by HardwareId
    function YFunctionType_forgetFunction(str_hwid)
    {
        var currname = this._nameByHwId[str_hwid];
        if(currname != undefined) {
            if(currname != "" && this._hwIdByName[currname] == str_hwid) {
                delete this._hwIdByName[currname];
            }
            delete this._nameByHwId[str_hwid];
        }
        if(this._valueByHwId[str_hwid] != undefined) {
            delete this._valueByHwId[str_hwid];
        }
    }

    // Find the exact Hardware Id of the specified function, if currently connected
    // If device is not known as connected, return a clean error
    // This function will not cause any network access
    function YFunctionType_resolve(str_func)
    {
        var dotpos = str_func.indexOf(".");
        var res;
        if(dotpos < 0) {
            // First case: str_func is the logicalname of a function
            res = this._hwIdByName[str_func];
            if(res != undefined) {
                return {errorType:YAPI_SUCCESS,
                         errorMsg:"no error",
                         result:String(res)};
            }

            // fallback to assuming that str_func is a logicalname or serial number of a module
            // with an implicit function name (like serial.module for instance)
            dotpos = str_func.length;
            str_func += "."+this._className.substr(0,1).toLowerCase()+this._className.substr(1);
        }

        // Second case: str_func is in the form: device_id.function_id

        // quick lookup for a known pure hardware id
        if(this._valueByHwId[str_func] != undefined) {
            return {errorType:YAPI_SUCCESS,
                     errorMsg:"no error",
                     result:String(str_func)};
        }
        if(dotpos>0) {

            // either the device id is a logical name, or the function is unknown
            var devid = str_func.substr(0,dotpos);
            var funcid = str_func.substr(dotpos+1);
            var dev = YAPI.getDevice(devid);
            if(!dev) {
                return {errorType:YAPI_DEVICE_NOT_FOUND,
                         errorMsg:"Device ["+devid+"] not online",
                         result:null};
            }
            var serial = dev.getSerialNumber();
            res = serial+"."+funcid;
            if(this._valueByHwId[res] != undefined) {
                return {errorType:YAPI_SUCCESS,
                         errorMsg:"no error",
                         result:String(res)};
            }

            // not found neither, may be funcid is a function logicalname
            var i, nfun = dev.functionCount();
            for(i = 0; i < nfun; i++) {
                res = serial+"."+dev.functionId(i);
                var name = this._nameByHwId[res];
                if(name != undefined && name == funcid) {
                    return {errorType:YAPI_SUCCESS,
                             errorMsg:"no error",
                             result:String(res)};
                }
            }
        } else {
            funcid = str_func.substr(1);
            for (var hwid_str in this._connectedFns){
                var pos = hwid_str.indexOf(".");
                var str_function = hwid_str.substr(pos+1);
                if(str_function == funcid) {
                    return {errorType:YAPI_SUCCESS,
                             errorMsg:"no error",
                             result:String(hwid_str)};
                }
            }
        }
        return {errorType:YAPI_DEVICE_NOT_FOUND,
                 errorMsg:"No function ["+funcid+"] found on device ["+serial+"]",
                 result:null};
    }

    // Find the friendly name (use logical name if available) of the
    // specified function, if currently connected
    // If device is not known as connected, return a clean error
    // This function will not cause any network access
    function YFunctionType_getFriendlyName(str_func)
    {
        var resolved = this.resolve(str_func);
        var name;
        if (resolved.errorType != YAPI_SUCCESS) {
            return resolved;
        }
        if (this._className == "Module"){
            var friend = resolved.result;
            name = this._nameByHwId[resolved.result];
            if (name !=undefined && name !=""){
                friend = this._nameByHwId[resolved.result];
            }
            return {errorType:YAPI_SUCCESS,
                     errorMsg:"no error",
                     result:String(friend)};
        } else {
            var pos = resolved.result.indexOf(".");
            var str_serialMod = resolved.result.substr(0,pos);
            var str_friendModFull = YAPI.getFriendlyNameFunction("Module",str_serialMod).result;
            var int_friendModDot = str_friendModFull.indexOf(".");
            var str_friendMod = (int_friendModDot > 0 ? str_friendModFull.substr(0,int_friendModDot) : str_friendModFull);
            var str_friendFunc = resolved.result.substr(pos+1);
            name = this._nameByHwId[resolved.result];
            if(name != undefined && name!="") {
                str_friendFunc = name;
            }
            return {errorType:YAPI_SUCCESS,
                     errorMsg:"no error",
                     result:String(str_friendMod+"."+str_friendFunc)};
		}
    }
    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    function YFunctionType_setFunction(str_func, obj_func)
    {
        var funres = this.resolve(str_func);
        if(funres.result != undefined) {
            // the function has been located on a device
            this._connectedFns[funres.result] = obj_func;
        } else {
            // the function is still abstract
            this._requestedFns[str_func] = obj_func;
        }
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    function YFunctionType_getFunction(str_func)
    {
        var funres = this.resolve(str_func);
        if(funres.errorType == YAPI_SUCCESS) {
            // the function has been located on a device
            var conn_fn = this._connectedFns[funres.result];
            if(conn_fn != undefined) return conn_fn;

            var req_fn = this._requestedFns[str_func];
            if(req_fn != undefined) {
                this._connectedFns[funres.result] = req_fn;
                delete this._requestedFns[str_func];
            }
            return req_fn;
        } else {
            // the function is still abstract
            return this._requestedFns[str_func];
        }
    }

    // Stores a function advertised value by hardware id, queue an event if needed
    function YFunctionType_setFunctionValue(str_hwid, str_pubval)
    {
        var currval = this._valueByHwId[str_hwid];
        if(!(currval == undefined) && currval == str_pubval) {
            return;
        }
        this._valueByHwId[str_hwid] = str_pubval;
        var receivers = YFunction._ValueCallbackList;
        for(var i = 0; i < receivers.length; i++) {
            var fun = receivers[i];
            if(!fun._hwId) continue;
            if(fun._hwId == str_hwid) {
                YAPI.addValueEvent(fun, str_pubval);
            }
        }
    }

    // Retrieve a function advertised value by hardware id
    function YFunctionType_getFunctionValue(str_hwid)
    {
        return this._valueByHwId[str_hwid];
    }

    // Stores a function timed value by hardware id, queue an event if needed
    function YFunctionType_setTimedReport(str_hwid, float_timestamp, arr_report)
    {
        var receivers = YFunction._TimedReportCallbackList;
        for(var i = 0; i < receivers.length; i++) {
            var fun = receivers[i];
            if(!fun._hwId) continue;
            if(fun._hwId == str_hwid) {
                YAPI.addTimedReportEvent(fun, float_timestamp, arr_report);
            }
        }
    }

    // Return the basetype of this function class
    function YFunctionType_getBaseType()
    {
        return this._baseType;
    }

    // Find the hardwareId of the first instance of a given function class
    function YFunctionType_getFirstHardwareId()
    {
        var res = null;
        for(res in this._valueByHwId) break;
        return res;
    }

    // Find the hardwareId for the next instance of a given function class
    function YFunctionType_getNextHardwareId(str_hwid)
    {
        for(var iter_hwid in this._valueByHwId) {
            if(str_hwid == "!")
                return iter_hwid;
            if(str_hwid == iter_hwid)
                str_hwid = "!";
        }
        return null; // no more instance found
    }

    YFunctionType.prototype.reindexFunction    = YFunctionType_reindexFunction;
    YFunctionType.prototype.forgetFunction     = YFunctionType_forgetFunction;
    YFunctionType.prototype.resolve            = YFunctionType_resolve;
    YFunctionType.prototype.getFriendlyName    = YFunctionType_getFriendlyName;
    YFunctionType.prototype.setFunction        = YFunctionType_setFunction;
    YFunctionType.prototype.getFunction        = YFunctionType_getFunction;
    YFunctionType.prototype.setFunctionValue   = YFunctionType_setFunctionValue;
    YFunctionType.prototype.getFunctionValue   = YFunctionType_getFunctionValue;
    YFunctionType.prototype.setTimedReport     = YFunctionType_setTimedReport;
    YFunctionType.prototype.getBaseType        = YFunctionType_getBaseType;
    YFunctionType.prototype.getFirstHardwareId = YFunctionType_getFirstHardwareId;
    YFunctionType.prototype.getNextHardwareId  = YFunctionType_getNextHardwareId;

    //
    // YDevice Class (used internally)
    //
    // This class is used to store everything we know about connected Yocto-Devices.
    // Instances are created when devices are discovered in the white pages
    // (or registered manually, for root hubs) and then used to keep track of
    // device naming changes. When a device or a function is renamed, this
    // object forces the local indexes to be immediately updated, even if not
    // yet fully propagated through the yellow pages of the device hub.
    //
    // In order to regroup multiple function queries on the same physical device,
    // this class implements a device-wide API string cache (agnostic of API content).
    // This is in addition to the function-specific cache implemented in YFunction.
    //

    // Device constructor. Automatically call the YAPI functin to reindex device
    function YDevice(str_rooturl, obj_wpRec, obj_ypRecs, async_callback, async_context)
    {
        // private attributes
        this._rootUrl         = str_rooturl;
        this._serialNumber    = "";
        this._logicalName     = "";
        this._productName     = "";
        this._productId       = 0;
        this._beacon          = 0;
        this._devYdx          = -1;
        this._lastErrorType   = YAPI_SUCCESS;
        this._lastErrorMsg    = "no error";
        this._cache           = {_expiration:0, _json:""};
        this._functions       = [];
        this._busy            = 0;
        this._runningQuery    = null;
        this._pendingQueries  = [];
        this._deviceTime      = 0;

        if(obj_wpRec != undefined) {
            // preload values from white pages, if provided
            this._serialNumber = obj_wpRec.serialNumber;
            this._logicalName  = obj_wpRec.logicalName;
            this._productName  = obj_wpRec.productName;
            this._productId    = obj_wpRec.productId;
            this._beacon       = obj_wpRec.beacon;
            this._devYdx       = (obj_wpRec.index == undefined ? -1 : obj_wpRec.index);
            this._updateFromYP(obj_ypRecs);
            YAPI.reindexDevice(this);
        } else {
            // preload values from device directly
            if(async_callback) {
                this.refresh_async(async_callback, async_context);
            } else {
                this.refresh();
            }
        }
    }

    // Return the root URL used to access a device (including the trailing slash)
    function YDevice_getRootUrl()
    {
        return this._rootUrl;
    }

    // Return the serial number of the device, as found during discovery
    function YDevice_getSerialNumber()
    {
        return this._serialNumber;
    }

    // Return the logical name of the device, as found during discovery
    function YDevice_getLogicalName()
    {
        return this._logicalName;
    }

    // Return the product name of the device, as found during discovery
    function YDevice_getProductName()
    {
        return this._productName;
    }

    // Return the product Id of the device, as found during discovery
    function YDevice_getProductId()
    {
        return this._productId;
    }

    // Return the beacon state of the device, as found during discovery
    function YDevice_getBeacon()
    {
        return this._beacon;
    }

    // Return the value of the last timestamp sent by the device, if any
    function YDevice_getDeviceTime()
    {
        return this._deviceTime;
    }

    // Return the value of the last timestamp sent by the device, if any
    function YDevice_setDeviceTime(float_timestamp)
    {
        this._deviceTime = float_timestamp;
    }

    // Return the hub-specific devYdx of the device, as found during discovery
    function YDevice_getDevYdx()
    {
        return this._devYdx;
    }

    // Return a string that describes the device (serial number, logical name or root URL)
    function YDevice_describe()
    {
        var res = this._rootUrl;
        if(this._serialNumber != "") {
            res = this._serialNumber;
            if(this._logicalName != "") {
                res = res + " (" + this._logicalName + ")";
            }
        }
        return this._productName+" "+res;
    }

    // Get the whole REST API string for a device, from cache if possible
    function YDevice_requestAPI(int_msValidity)
    {
        if(this._cache._expiration > YAPI.GetTickCount()) {
            return {errorType:YAPI_SUCCESS,
                     errorMsg:"no error",
                     result: this._cache._json};
        }
        var yreq = YAPI.devRequest(this._rootUrl, "GET /api.json");
        if(yreq.errorType != YAPI_SUCCESS) return yreq;
        if(!int_msValidity) {
            int_msValidity = YAPI.defaultCacheValidity;
        }
        this._cache._expiration = YAPI.GetTickCount() + int_msValidity;
        this._cache._json = yreq.result;
        return yreq;
    }

    // Get the whole REST API string for a device, from cache if possible
    //
    // This is the asynchronous version, that uses a callback instead of a return value.
    function YDevice_requestAPI_async(func_callback, obj_context)
    {
        if(this._cache._expiration > YAPI.GetTickCount()) {
            func_callback(obj_context, {errorType:YAPI_SUCCESS,
                                          errorMsg:"no error",
                                          result: this._cache._json});
            return;
        }
        YAPI.devRequest_async(this._rootUrl, "GET /api.json", '',
                              function(params, yreq) {
                                  if(yreq.errorType != YAPI_SUCCESS) {
                                      if(params.cb) params.cb(params.ctx, yreq);
                                      return;
                                  }
                                  params.obj._cache._expiration = YAPI.GetTickCount() + YAPI.defaultCacheValidity;
                                  params.obj._cache._json = yreq.result;
                                  if(params.cb) params.cb(params.ctx, yreq);
                              },
                              {obj:this, cb:func_callback, ctx:obj_context});
    }

    // Update device cache and YAPI function lists from yp records
    function YDevice_updateFromYP(obj_ypRecs)
    {
        var funidx = 0;
        for(var categ in obj_ypRecs) {
            for(var key in obj_ypRecs[categ]) {
                if(key=='indexOf') continue; // IE8 Don'tEnum bug
                var rec = obj_ypRecs[categ][key];
                var hwid = rec["hardwareId"];
                var dotpos = hwid.indexOf(".");
                if(hwid.substr(0,dotpos) == this._serialNumber) {
                    var funydx = rec["index"];
                    if(funydx == undefined) funydx = funidx;
                    this._functions[funydx] = [hwid.substr(dotpos+1), rec["logicalName"]];
                    funidx++;
                }
            }
        }
    }

    // Update device cache and YAPI function lists accordingly
    function YDevice_updateFromReq(yreq, loadval)
    {
        this._cache._expiration = YAPI.GetTickCount() + YAPI.defaultCacheValidity;
        this._cache._json = yreq.result;

        var func;
        var reindex = false;
        if(this._productName == "") {
            // parse module and function names for the first time
            for(func in loadval) {
                if(func == "module") {
                    this._serialNumber = loadval.module.serialNumber;
                    this._logicalName  = loadval.module.logicalName;
                    this._productName  = loadval.module.productName;
                    this._productId    = loadval.module.productId;
                    this._beacon       = loadval.module.beacon;
                } else if(func == "services") {
                    this._updateFromYP(loadval.services.yellowPages);
                }
            }
            reindex = true;
        } else {
            // parse module and refresh names if needed
            var renamed = false;
            for(func in loadval) {
                if(func == "module") {
                    if(this._logicalName != loadval.module.logicalName) {
                        this._logicalName = loadval.module.logicalName;
                        reindex = true;
                    }
                    this._beacon = loadval.module.beacon;
                } else if(func != "services") {
                    var name = loadval[func]["logicalName"];
                    if(name == undefined) name = loadval.module.logicalName;
                    var pubval = loadval[func]["advertisedValue"];
                    if(pubval != undefined) YAPI.setFunctionValue(loadval.module.serialNumber+"."+func, pubval);
                    var funydx;
                    for(funydx in this._functions) {
                        if(funydx=='indexOf') continue; // IE8 Don'tEnum bug
                        if(this._functions[funydx][0] == func) {
                            if(this._functions[funydx][1] != name) {
                                this._functions[funydx][1] = name;
                                reindex = true;
                            }
                            break;
                        }
                    }
                }
            }
        }
        if(reindex) {
            YAPI.reindexDevice(this);
        }
    }

    // Reload a device API (store in cache), and update YAPI function lists accordingly
    function YDevice_refresh()
    {
        var yreq = this.requestAPI(YAPI.defaultCacheValidity);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }

        var loadval = null;

        try {loadval = JSON.parse(yreq.result);} catch(err){}

        if(!loadval) {
            return this._throw(YAPI_IO_ERROR, "Request failed, could not parse API result for "+this._rootUrl,
                               YAPI_IO_ERROR);
        }
        this._updateFromReq(yreq, loadval);
        return YAPI_SUCCESS;
    }

    // Reload a device API (store in cache), and update YAPI function lists accordingly
    //
    // This is the asynchronous version, that uses a callback instead of a return value.
    function YDevice_refresh_async(func_callback, obj_context)
    {
        this.requestAPI_async(function(params, yreq) {
                                  if(yreq.errorType != YAPI_SUCCESS) {
                                      params.obj._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
                                      if(params.cb) params.cb(params.ctx, yreq.errorType);
                                      return;
                                  }
                                  var loadval = null;
                                  try {loadval=JSON.parse(yreq.result);} catch(err) {}
                                  if(!loadval) {
                                      params.obj._throw(YAPI_IO_ERROR, "Request failed, could not parse API result for "+params.obj._rootUrl,
                                                        YAPI_IO_ERROR);
                                      if(params.cb) params.cb(params.ctx, YAPI_IO_ERROR);
                                      return;
                                  }
                                  params.obj._updateFromReq(yreq, loadval);
                                  if(params.cb) params.cb(params.ctx, YAPI_SUCCESS);
                              },
                              {obj:this, cb:func_callback, ctx:obj_context});
    }

    // Force the REST API string in cache to expire immediately
    function YDevice_dropCache()
    {
        this._cache._expiration = 0;
    }

    // Retrieve the number of functions (beside "module") in the device
    function YDevice_functionCount()
    {
        var funcPos = 0;
        for (var key in this._functions) {
            funcPos++;
        }
        return funcPos;
    }

    // Retrieve the Id of the nth function (beside "module") in the device
    function YDevice_functionId(int_idx)
    {
        var funcPos = 0;
        for (var key in this._functions) {
            if(int_idx === funcPos) {
                return this._functions[key][0];
            }
            funcPos++;
        }
        return "";
    }

    // Retrieve the base type of the nth function (beside "module") in the device
    function YDevice_functionBaseType(int_idx)
    {
        var funid = this.functionId(int_idx);
        if(funid !== '') {
            var ftype = YAPI.getFunctionBaseType(this._serialNumber+'.'+funid);
            for (var baseType in Y_BASETYPES) {
                if (Y_BASETYPES[baseType] === ftype){
                    return baseType;
                }
            }
        }
        return "Function";
    }

    // Retrieve the type of the nth function (beside "module") in the device
    function YDevice_functionType(int_idx)
    {
        var funid = this.functionId(int_idx);
        if(funid !== '') {
            var i;
            for (i = 0; i < funid.length; i++) {
                if (funid[i] >= '0' && funid[i] <= '9') {
                    break;
                }
            }
            var functionType = funid[0].toUpperCase() + funid.substr(1, i - 1);
            return functionType;
        }
        return "";
    }

    // Retrieve the logical name of the nth function (beside "module") in the device
    function YDevice_functionName(int_idx)
    {
        var funcPos = 0;
        for (var key in this._functions) {
            if(int_idx === funcPos) {
                return this._functions[key][1];
            }
            funcPos++;
        }
        return "";
    }

    // Retrieve the advertised value of the nth function (beside "module") in the device
    function YDevice_functionValue(int_idx)
    {
        var funid = this.functionId(int_idx);
        if(funid !== '') {
            return YAPI.getFunctionValue(this._serialNumber+'.'+funid);
        }
        return "";
    }

    YDevice.prototype._throw           = YAPI_throw;
    YDevice.prototype._updateFromYP    = YDevice_updateFromYP;
    YDevice.prototype._updateFromReq   = YDevice_updateFromReq;
    YDevice.prototype.getRootUrl       = YDevice_getRootUrl;
    YDevice.prototype.getSerialNumber  = YDevice_getSerialNumber;
    YDevice.prototype.getLogicalName   = YDevice_getLogicalName;
    YDevice.prototype.getProductName   = YDevice_getProductName;
    YDevice.prototype.getProductId     = YDevice_getProductId;
    YDevice.prototype.getBeacon        = YDevice_getBeacon;
    YDevice.prototype.getDeviceTime    = YDevice_getDeviceTime;
    YDevice.prototype.setDeviceTime    = YDevice_setDeviceTime;
    YDevice.prototype.describe         = YDevice_describe;
    YDevice.prototype.requestAPI       = YDevice_requestAPI;
    YDevice.prototype.requestAPI_async = YDevice_requestAPI_async;
    YDevice.prototype.refresh          = YDevice_refresh;
    YDevice.prototype.refresh_async    = YDevice_refresh_async;
    YDevice.prototype.dropCache        = YDevice_dropCache;
    YDevice.prototype.functionCount    = YDevice_functionCount;
    YDevice.prototype.functionId       = YDevice_functionId;
    YDevice.prototype.functionType     = YDevice_functionType;
    YDevice.prototype.functionBaseType = YDevice_functionBaseType;
    YDevice.prototype.functionName     = YDevice_functionName;
    YDevice.prototype.functionValue    = YDevice_functionValue;

    //
    // YAPI Context
    //
    // This class provides the high-level entry points to access Functions, stores
    // an indexes instances of the Device object and of FunctionType collections.
    //

    function _YAPI()
    {
        // private
        this._init = function() {
            this._hubs = [];          // array of root urls
            this._devs = {};          // hash table of known devices, by serial number
            this._snByUrl = {};       // serial number for each known device, by URL
            this._snByName = {};      // serial number for each known device, by name
            this._fnByType = {};      // functions by type
            this._fnByType["Module"]    = new YFunctionType("Module");
            this._lastErrorType         = YAPI_SUCCESS;
            this._lastErrorMsg          = "no error";
            this._firstArrival          = true;
            this._pendingCallbacks      = [];
            this._arrivalCallback       = null;
            this._namechgCallback       = null;
            this._removalCallback       = null;
            this._data_events           = [];
            this._forwardValues         = 0;
            this._calibHandlers         = {};
            this._serverResponse        = null;
            this._callbackCache         = null;
        };
        this._init();

        // Default string encoding used in the library
        this.defaultEncoding       = 'binary';

        // Default cache validity (in [ms]) before reloading data from device. This saves a lots of trafic.
        // Note that a value under 2 ms makes little sense since a USB bus itself has a 2ms roundtrip period
        this.defaultCacheValidity  = 5;
        // Switch to turn off exceptions and use return codes instead, for source-code compatibility
        // with languages without exception support like C
        this.exceptionsDisabled    = false;

        for(var i = 1; i <= 20; i++) {
            this.RegisterCalibrationHandler(i,this.LinearCalibrationHandler);
        }
        this.RegisterCalibrationHandler(YOCTO_CALIB_TYPE_OFS,this.LinearCalibrationHandler);
    }

    // Context used to update the list of known devices by rescanning all hubs as needed
    function YAPI_updateDeviceList_init()
    {
        // make sure all hubs are reachable
        var rooturl;
        var hubs = [];
        var i;
        for(i = 0; i < this._hubs.length; i++) {
            rooturl = this._hubs[i].urlInfo.url;
            var hubdev = this.getDevice(rooturl);
            if(!hubdev) {
                return this._throw(YAPI_INVALID_ARGUMENT, "Cannot find hub "+this._hubs[i].urlInfo.url, null);
            }
            if(this._hubs[i].devListExpires <= YAPI.GetTickCount()) {
                hubs.push({hubidx: i,
                            huburl: rooturl,
                            hubdev: hubdev,
                            missing: {}});
            }
        }

        // assume all device as unpluged, unless proved wrong
        var serial;
        for(serial in this._devs) {
            rooturl = this._devs[serial].getRootUrl();
            for(i = 0; i < hubs.length; i++) {
                var huburl = hubs[i].huburl;
                if(rooturl.substr(0,huburl.length) == huburl) {
                    hubs[i].missing[serial] = true;
                }
            }
        }

        return {updidx:  0,
                 hubs:    hubs,
                 callbk:  true};
    }

    // function used to process the every hub api request to update the list of known devices
    function YAPI_updateDeviceList_process(ctx, yreq)
    {
        var hub = ctx.hubs[ctx.updidx];
        var hubdev = hub.hubdev;
        var loadval = null;
        var serial;
        try {loadval = JSON.parse(yreq.result);} catch (err) {}
        if(!loadval) {
            return this._throw(YAPI_IO_ERROR, "Request failed, could not parse API result for "+hubdev.describe(),
                               YAPI_IO_ERROR);
        }
        var whitePages = loadval["services"]["whitePages"];
        if(whitePages == undefined) {
            return this._throw(YAPI_INVALID_ARGUMENT, "Device "+hubdev.describe()+" is not a hub",
                               YAPI_INVALID_ARGUMENT);
        }
        // Reindex all functions from yellow pages
        var refresh = {};
        var yellowPages = loadval["services"]["yellowPages"];
        for(var classname in yellowPages) {
            var obj_yprecs = yellowPages[classname];
            var ftype = this._fnByType[classname];
            if(ftype == undefined) {
                ftype = new YFunctionType(classname);
                this._fnByType[classname] = ftype;
            }
            for(var key in obj_yprecs) {
                if(key=='indexOf') continue; // IE8 Don'tEnum bug
                var yprec = obj_yprecs[key];
                var hwid = yprec["hardwareId"];
                var basetype = yprec["baseType"];
                if(ftype.reindexFunction(hwid, yprec["logicalName"], yprec["advertisedValue"], basetype)) {
                    // logical name discrepency detected, force a refresh from device
                    serial = hwid.substr(0,hwid.indexOf("."));
                    refresh[serial] = true;
                }
            }
        }
        // Reindex all devices from white pages
        var thishub = this._hubs[hub.hubidx];
        var devkey;
        for(devkey in whitePages) {
            if(devkey=='indexOf') continue; // IE8 Don'tEnum bug
            var devinfo = whitePages[devkey];
            serial  = devinfo["serialNumber"];
            var devydx  = devinfo["index"];
            var rooturl = devinfo.networkUrl.slice(0,-3);
            if(rooturl.charAt(0) == "/") rooturl = hubdev.getRootUrl()+rooturl.substr(1);
            var currdev = this._devs[serial];
            if(currdev && this._arrivalCallback != undefined && this._firstArrival) {
                this._pendingCallbacks.push('+'+serial);
            }
            thishub.serialByYdx[devydx] = serial;
            if(!currdev) {
                // Add new device
                new YDevice(rooturl, devinfo, loadval["services"]["yellowPages"]);
                if(this._arrivalCallback != undefined) {
                    this._pendingCallbacks.push('+'+serial);
                }
            } else if(currdev.getLogicalName() != devinfo["logicalName"]) {
                // Reindex device from its own data
                currdev.refresh_async(null, null);
                if(this._namechgCallback != undefined) {
                    this._pendingCallbacks.push('/'+serial);
                }
            } else if(refresh[serial] || currdev.getRootUrl() != rooturl ||
                      currdev.getBeacon() != devinfo["beacon"]) {
                // Reindex device from its own data in case of discrepency
                currdev.refresh_async(null, null);
            }
            hub.missing[serial] = false;
        }

        // Keep track of all unplugged devices on this hub
        for(serial in hub.missing) {
            if(hub.missing[serial]) {
                if(this._removalCallback != undefined) {
                    this._pendingCallbacks.push('-'+serial);
                } else {
                    this.forgetDevice(this._devs[serial]);
                }
            }
        }

        // reset device list cache timeout for this hub
        var now = YAPI.GetTickCount();
        if(thishub.notifTrigger > 0) {
            if(now < thishub.notifTrigger) {
                // second yUpdateDeviceList within trigger time, try to open notification channel
                thishub.notifTrigger = -1;
                this.monitorEvents(hub.hubidx);
            }
        }
        if(thishub.notifTrigger >= 0) {
            // update notification trigger timestamp
            thishub.notifTrigger = YAPI.GetTickCount() + 3000;
        }
        thishub.devListExpires = now + thishub.devListValidity;

        // after processing all hubs, invoke pending callbacks if required
        if(ctx.updidx == ctx.hubs.length-1 && ctx.callbk) {
            var nbevents = this._pendingCallbacks.length;
            for(var i = 0; i < nbevents; i++) {
                var evt = this._pendingCallbacks[i];
                serial = evt.slice(1);
                switch(evt.charAt(0)) {
                case '+':
                    if(this._arrivalCallback != undefined) {
                        this._arrivalCallback(yFindModule(serial+".module"));
                    }
                    break;
                case '/':
                    if(this._namechgCallback != undefined) {
                        this._namechgCallback(yFindModule(serial+".module"));
                    }
                    break;
                case '-':
                    if(this._removalCallback != undefined) {
                        this._removalCallback(yFindModule(serial+".module"));
                    }
                    this.forgetDevice(this._devs[serial]);
                    break;
                }
            }
            this._pendingCallbacks = this._pendingCallbacks.slice(nbevents);
            if(this._arrivalCallback != undefined && this._firstArrival) {
                this._firstArrival = false;
            }
        }

        return YAPI_SUCCESS;
    }

    function YAPI_updateDeviceList_internal(bool_forceupdate, bool_invokecallbacks)
    {
        if(this._firstArrival && bool_invokecallbacks && this._arrivalCallback) {
            bool_forceupdate = true;
        }
        if(bool_forceupdate) {
            var now = YAPI.GetTickCount();
            for(var i = 0; i < this._hubs.length; i++) {
                this._hubs[i].devListExpires = now;
            }
        }

        var ctx = this._updateDeviceList_init();
        if(ctx == null){
            return {errorType: this._lastErrorType,
                     errorMsg:  this._lastErrorMsg,
                     result:    this._lastErrorType};
        }
        ctx.callbk = bool_invokecallbacks;

        // Rescan all hubs and update list of online devices
        for(ctx.updidx = 0; ctx.updidx < ctx.hubs.length; ctx.updidx++) {
            var hubdev = ctx.hubs[ctx.updidx].hubdev;
            var retcode = hubdev.refresh();
            if(retcode != YAPI_SUCCESS) {
                return {errorType: retcode,
                         errorMsg:  hubdev._lastErrorMsg,
                         result:    retcode};
            }
            var yreq = hubdev.requestAPI(YAPI.defaultCacheValidity);
            if(yreq.errorType != YAPI_SUCCESS) {
                return yreq;
            }
            retcode = this._updateDeviceList_process(ctx, yreq);
            if(retcode != YAPI_SUCCESS) {
                return {errorType: this._lastErrorType,
                         errorMsg: this._lastErrorMsg,
                         result:   this._lastErrorType};
            }
        }

        return {errorType:YAPI_SUCCESS,
                 errorMsg:"no error",
                 result:YAPI_SUCCESS};
    }

    function YAPI_getHub(str_rootUrl)
    {
        var i, hubUrl;

        for(i = 0; i < this._hubs.length; i++) {
            hubUrl = this._hubs[i].urlInfo.url;
            if(str_rootUrl.slice(0,hubUrl.length) == hubUrl) {
                return this._hubs[i];
            }
        }
        return null;
    }

    function YAPI_parseEvents(hub, str_lines)
    {
        hub.devListValidity = 10000; // 10s validity when notification are working properly

        var rows = str_lines.split("\n");
        var nrows = rows.length;
        var value;
        // in continuous mode, last line is either empty or a partial event
        nrows--;
        for(var idx = 0; idx < nrows; idx++) {
            var ev = rows[idx];
            if(ev.length == 0) continue;
            var firstCode = ev.charAt(0);
            if(ev.length >= 3 && firstCode >= NOTIFY_NETPKT_FLUSHV2YDX && firstCode <= NOTIFY_NETPKT_TIMEAVGYDX) {
                hub.retryDelay = 15;
                if(hub.notifPos>=0) hub.notifPos += ev.length+1;
                var devydx = ev.charCodeAt(1) - 65; // from 'A'
                var funydx = ev.charCodeAt(2) - 48; // from '0'
                if(funydx >= 64) { // high bit of devydx is on second character
                    funydx -= 64;
                    devydx += 128;
                }
                var serial = hub.serialByYdx[devydx];
                if(serial && YAPI._devs[serial]) {
                    var funcid = (funydx == 0xf ? 'time' : YAPI._devs[serial].functionId(funydx));
                    if(funcid != "") {
                        value = ev.slice(3);
                        switch (firstCode) {
                            case NOTIFY_NETPKT_FUNCVALYDX:
                                if (value != "") value = value.split("\0")[0];
                                // function value ydx (tiny notification)
                                YAPI.setFunctionValue(serial + "." + funcid, value);
                                break;
                            case NOTIFY_NETPKT_DEVLOGYDX:
                                // log notification
                                break;
                            case NOTIFY_NETPKT_TIMEVALYDX:
                            case NOTIFY_NETPKT_TIMEAVGYDX:
                            case NOTIFY_NETPKT_TIMEV2YDX:

                                // timed value report
                                var pos, arr = [(firstCode == 'x' ? 0 : (firstCode == 'z' ? 1 : 2))];
                                for (pos = 0; pos < value.length; pos += 2) {
                                    arr.push(parseInt(value.substr(pos, 2), 16));
                                }
                                var dev = YAPI._devs[serial];
                                if (funcid == 'time') {
                                    var time = arr[1] + 0x100 * arr[2] + 0x10000 * arr[3] + 0x1000000 * arr[4];
                                    dev.setDeviceTime(time + arr[5] / 250.0);
                                } else {
                                    YAPI.setTimedReport(serial + "." + funcid, dev.getDeviceTime(), arr);
                                }
                                break;
                            case NOTIFY_NETPKT_FUNCV2YDX:
                                var rawval = YAPI.decodeNetFuncValV2(value);
                                if (rawval != null) {
                                    var decodedval = YAPI.decodePubVal(rawval[0], rawval, 1, 6);
                                    YAPI.setFunctionValue(serial + "." + funcid, decodedval);
                                }
                                break;
                            case NOTIFY_NETPKT_FLUSHV2YDX:
                            // To be implemented later
                            default:
                                break;
                        }
                    }
                }
            } else if(ev.length > 5 && ev.substr(0,4) == 'YN01') {
                hub.retryDelay = 15;
                if(hub.notifPos>=0) hub.notifPos += ev.length+1;
                var notype = ev.substr(4,1);
                if(notype == '@') {
                    hub.notifPos = parseInt(ev.slice(5));
                } else switch(parseInt(notype)) {
                case 0: // device name change, or arrival
                case 2: // device plug/unplug
                case 4: // function name change
                case 8: // function name change (ydx)
                    hub.devListExpires = 0;
                    break;
                case 5: // function value (long notification)
                    var parts = ev.slice(5).split(",");
                    if(parts.length > 2) {
                        value = parts[2].split("\0");
                        YAPI.setFunctionValue(parts[0]+"."+parts[1], value[0]);
                    }
                    break;
                }
            } else {
                // oops, bad notification ? be safe until a good one comes
                hub.devListValidity = 500;
                hub.devListExpires = 0;
                //alert('bad event on line '+idx+'/'+nrows+' : '+ev);
                hub.notifPos = -1;
            }
            hub.currPos += ev.length + 1;
        }
    }

    // Handle the event-monitoring work on a registered hub
    // Called initially with a context containing just the 'rooturl'
    // of the hub to monitor
    function YAPI_monitorEvents(int_hubidx)
    {
        var yhub = YAPI._hubs[int_hubidx];
        if(yhub.urlInfo.host == 'callback') {
            return; // no event monitoring in callback mode
        }
        if(yhub.websocket) {
            return; // no need for additional request, websocket running
        }
        var args = "?len="+yhub.notiflen.toString();
        if(yhub.notifPos > 0) {
            args += "&abs="+yhub.notifPos.toString();
        }
        this.devRequest(yhub.urlInfo.url, "GET /not.byn"+args,
            function(httpRequest) {
                var hub = YAPI._hubs[int_hubidx];
                if (httpRequest.readyState >= 3) {
                    if(httpRequest.readyState == 4 &&
                       parseInt(httpRequest.status) != 200 &&
                       parseInt(httpRequest.status) != 304) {
                        // connection error
                        if(hub.retryDelay < 15000) hub.retryDelay *= 2;
                        hub.devListValidity = 500;
                        hub.devListExpires = 0;
                        // FOR BROWSERS ONLY:
                        if(typeof chrome != "undefined" && chrome.app && chrome.app.window) {
                            setTimeout(function(hubidx){YAPI.monitorEvents(hubidx);}, hub.retryDelay, int_hubidx);
                        } else {
                            setTimeout("YAPI.monitorEvents("+int_hubidx+")", hub.retryDelay);
                        }
                    } else {
                        // receiving data properly
                        var newlen;
                        if(httpRequest.readyState == 3) {
                            // when using reconnection mode, ignore state 3
                            if(hub.notiflen == 1) return;
                            // FOR BROWSERS ONLY:
                            try {
                                // try accessing the responseText carefully (bcoz of IE)
                                newlen = httpRequest.responseText.length;
                            } catch(err) {
                                // oops, readyState 3 is not usable, use alternate notification channel
                                hub.notiflen = 1;
                                hub.currPos = 0;
                                if(typeof chrome != "undefined" && chrome.app && chrome.app.window) {
                                    setTimeout(function(hubidx){YAPI.monitorEvents(hubidx);}, 15, int_hubidx);
                                } else {
                                    setTimeout("YAPI.monitorEvents("+int_hubidx+")", 15);
                                }
                                httpRequest.abort();
                                return;
                            }
                        } else {
                            // in state 4, responseText is always valid
                            newlen = httpRequest.responseText.length;
                        }
                        if(newlen > hub.currPos) {
                            YAPI.parseEvents(hub, httpRequest.responseText.substr(hub.currPos,newlen-hub.currPos));
                        }
                        // trigger immediately a new connection if closed in success
                        if(httpRequest.readyState == 4 && parseInt(httpRequest.status) != 0) {
                            hub.currPos = 0;
                            YAPI.monitorEvents.call(YAPI,int_hubidx);
                        }
                    }
                }
            }
        );
    }


    // Network notification format: 7x7bit (mapped to 7 chars in range 32..159)
    //                              used to represent 1 flag (RAW6BYTES) + 6 bytes
    // INPUT:  [R765432][1076543][2107654][3210765][4321076][5432107][6543210]
    // OUTPUT: 7 bytes array (1 byte for the funcint_TypeV2 and 6 bytes of USB like data
    //                     funcTypeV2 + [R][-byte 0][-byte 1-][-byte 2-][-byte 3-][-byte 4-][-byte 5-]
    //
    // return null on error
    //
    function YAPI_decodeNetFuncValV2(p) {
        var p_ofs = 0;
        var ch = p.charCodeAt(p_ofs) & 0xff;
        var len = 0;
        var funcVal = [0,0,0,0,0,0,0];

        if(ch < 32 || ch > 32 + 127) {
            return null;
        }
        // get the 7 first bits
        ch -= 32;
        funcVal[0] = ((ch & 0x40) != 0 ? NOTIFY_V2_6RAWBYTES : NOTIFY_V2_TYPEDDATA);
        // clear flag
        ch &= 0x3f;
        while(len < YOCTO_PUBVAL_SIZE) {
            p_ofs++;
            if (p_ofs >= p.length)
                break;
            var newCh = p.charCodeAt(p_ofs) & 0xff;
            if (newCh == NOTIFY_NETPKT_STOP) {
                break;
            }
            if(newCh < 32 || newCh > 32+127) {
                return null;
            }
            newCh -= 32;
            ch = (ch << 7) + newCh;
            funcVal[len + 1] = (ch >> (5 - len)) & 0xff;
            len++;
        }
        return funcVal;
    }

    function YAPI_decodePubVal(int_typeV2, arr_funcval, int_ofs, int_funcvalen) {
        var buffer = "";
        var endp;
        if (int_typeV2 == NOTIFY_V2_6RAWBYTES || int_typeV2 == NOTIFY_V2_TYPEDDATA) {
            var funcValType;
            if (int_typeV2 == NOTIFY_V2_6RAWBYTES) {
                funcValType = PUBVAL_6RAWBYTES;
            } else {
                funcValType = arr_funcval[int_ofs++];
            }
            switch (funcValType) {
                case PUBVAL_LEGACY:
                    // fallback to legacy handling, just in case
                    break;
                case PUBVAL_1RAWBYTE:
                case PUBVAL_2RAWBYTES:
                case PUBVAL_3RAWBYTES:
                case PUBVAL_4RAWBYTES:
                case PUBVAL_5RAWBYTES:
                case PUBVAL_6RAWBYTES:
                    // 1..5 hex bytes
                    for (var i = 0; i < funcValType; i++) {
                        var c = arr_funcval[int_ofs++];
                        var b = c >> 4;
                        buffer += b.toString(16);
                        b = c & 0xf;
                        buffer += b.toString(16);
                    }
                    return buffer;
                case PUBVAL_C_LONG:
                case PUBVAL_YOCTO_FLOAT_E3:
                    // 32bit integer in little endian format or Yoctopuce 10-3 format
                    var numVal = arr_funcval[int_ofs++];
                    numVal += arr_funcval[int_ofs++] << 8;
                    numVal += arr_funcval[int_ofs++] << 16;
                    numVal += arr_funcval[int_ofs++] << 24;
                    if (funcValType == PUBVAL_C_LONG) {
                        return String(Math.round(numVal));
                    } else {
                        buffer = String(Math.round(numVal*1000) / 1000000.0);
                        endp = buffer.length;
                        while (endp > 0 && buffer[endp - 1] == '0') {
                            --endp;
                        }
                        if (endp > 0 && buffer[endp - 1] == '.') {
                            --endp;
                            buffer = buffer.substr(0, endp);
                        }
                        return buffer;
                    }
                case PUBVAL_C_FLOAT:
                    // 32bit (short) float
                    var v = arr_funcval[int_ofs++];
                    v += arr_funcval[int_ofs++] << 8;
                    v += arr_funcval[int_ofs++] << 16;
                    v += arr_funcval[int_ofs++] << 24;
                    var fraction = (v & ((1 << 23) - 1)) + (1 << 23) * (v >> 31 | 1);
                    var exp = (v >> 23 & 0xFF) - 127;
                    var floatVal = fraction * Math.pow(2, exp - 23);
                    buffer = String(Math.round(floatVal*1000000)/1000000);
                    endp = buffer.length;
                    while (endp > 0 && buffer[endp - 1] == '0') {
                        --endp;
                    }
                    if (endp > 0 && $buffer[endp - 1] == '.') {
                        --endp;
                        buffer = buffer.substr(0, endp);
                    }
                    return buffer;
                default:
                    return "?";
            }

            // Legacy handling: just pad with NUL up to 7 chars
            var len = 0;
            buffer = "";
            while (len < YOCTO_PUBVAL_SIZE && len < int_funcvalen) {
                if (arr_funcval[len] == 0)
                    break;
                buffer += String.fromCharCode(arr_funcval[len]);
                len++;
            }
            return buffer;
        }
    }


    var decExp = [
        1.0e-6, 1.0e-5, 1.0e-4, 1.0e-3, 1.0e-2, 1.0e-1, 1.0,
        1.0e1, 1.0e2, 1.0e3, 1.0e4, 1.0e5, 1.0e6, 1.0e7, 1.0e8, 1.0e9 ];

    // Convert Yoctopuce 16-bit decimal floats to standard double-precision floats
    //
    function YAPI_decimalToDouble(val)
    {
        var negate = false;
        var res;
        var mantis = val & 2047;
        if(mantis == 0) return 0.0;
        if(val > 32767) {
            negate = true;
            val = 65536-val;
        } else if(val < 0) {
            negate = true;
            val = -val;
        }
        var decexp = decExp[val >> 11];
        if(decexp >= 1.0) {
            res = (mantis) * decexp;
        } else { // fix rounding issue
            res = (mantis) / Math.round(1/decexp);
        }

        return (negate ? -res : res);
    }

    // Convert standard double-precision floats to Yoctopuce 16-bit decimal floats
    //
    function YAPI_doubleToDecimal(val)
    {
        var     negate = false;
        var     comp, mant;
        var     decpow;
        var     res;

        if(val == 0.0) {
            return 0;
        }
        if(val < 0) {
            negate = true;
            val = -val;
        }
        comp = val / 1999.0;
        decpow = 0;
        while(comp > decExp[decpow] && decpow < 15) {
            decpow++;
        }
        mant = val / decExp[decpow];
        if(decpow == 15 && mant > 2047.0) {
            res = (15 << 11) + 2047; // overflow
        } else {
            res = (decpow << 11) + Math.round(mant);
        }
        return (negate ? -res : res);
    }

    function YAPI_getCalibrationHandler(calibType)
    {
        return this._calibHandlers[calibType];
    }

    // Parse an array of u16 encoded in a base64-like string with memory-based compression
    function YAPI_decodeWords(data)
    {
        var udata = [];
        for(var i = 0; i < data.length;) {
            var c = data[i];
            if(c == '*') {
                val = 0;
                i++;
            } else if(c == 'X') {
                val = 0xffff;
                i++;
            } else if(c == 'Y') {
                val = 0x7fff;
                i++;
            } else if(c >= 'a') {
                var srcpos = udata.length-1-(data.charCodeAt(i++)-97);
                if(srcpos < 0)
                    val = 0;
                else
                    val = udata[srcpos];
            } else {
                if(i+3 > data.length)
                    return udata;
                var val = (data.charCodeAt(i++) - 48);
                val += (data.charCodeAt(i++) - 48) << 5;
                var lastcode = data.charCodeAt(i++);
                if(lastcode == 122) lastcode = 92;
                val += (lastcode - 48) << 10;
            }
            udata.push(val);
        }
        return udata;
    }

    // Parse an array of u16 encoded in a base64-like string with memory-based compresssion
    function YAPI_decodeFloats(data)
    {
        var idata = [];
        var p = 0;
        var datalen = data.length;
        while (p < datalen) {
            var val = 0;
            var sign = 1;
            var dec = 0;
            var decInc = 0;
            var c = data[p++];
            while(c != '-' && (c < '0' || c > '9')) {
                if(p >= datalen) {
                    return idata;
                }
                c = data[p++];
            }
            if(c == '-') {
                if(p >= datalen) {
                    return idata;
                }
                sign = -sign;
                c = data[p++];
            }
            while((c >= '0' && c <= '9') || c == '.') {
                if(c == '.') {
                    decInc = 1;
                } else if(dec < 3) {
                    val = val * 10 + (c.charCodeAt(0) - 48);
                    dec += decInc;
                }
                if(p < datalen) {
                    c = data[p++];
                } else {
                    c = '\0';
                }
            }
            if(dec < 3) {
                if(dec == 0) val *= 1000;
                else if(dec == 1) val *= 100;
                else val *= 10;
            }
            idata.push(sign*val);
        }
        return idata;
    }
    function YAPI_atoi(str_data)
    {
        var num = parseInt(str_data);
        if (isNaN(num)) {
            return 0;
        }
        return Math.floor(num);
    }


    function YAPI_bytesToHexStr(str_data)
    {
        var i, len, res = '', n;
        len = str_data.length;
        str_data += '';
        for (i = 0; i < len; i++) {
            n = str_data.charCodeAt(i)
                .toString(16);
            res += n.length < 2 ? '0' + n : n;
        }

        res = res.toUpperCase();
        return res;

    }


    function YAPI_hexStrToBin(str_data)
    {
        var res = [], str;

        for (var i = 0; i < str_data.length - 1; i += 2) {
            res.push(parseInt(str_data.substr(i, 2), 16));
        }

        return String.fromCharCode.apply(String, res);
    }



    // Return a Device object for a specified URL, serial number or logical device name
    // This function will not cause any network access
    function YAPI_getDevice(str_device)
    {
        var dev = null;
        var serial;

        if(str_device.substr(0,7) == "http://" || str_device.substr(0,5) == "ws://") {
            // lookup by url
            serial = this._snByUrl[str_device];
            if(serial != undefined) dev = this._devs[serial];
        } else {
            // lookup by serial
            if(this._devs[str_device]) {
                dev = this._devs[str_device];
            } else {
                // fallback to lookup by logical name
                serial = this._snByName[str_device];
                if(serial) {
                    dev = this._devs[serial];
                }
            }
        }
        return dev;
    }

    // Return the class name for a given function ID or full Hardware Id
    // Also make sure that the function type is registered in the API
    function YAPI_functionClass(str_funcid)
    {
        var dotpos = str_funcid.indexOf(".");
        if(dotpos >= 0) str_funcid = str_funcid.substr(dotpos+1);
        var classlen = str_funcid.length;
        while(str_funcid.substr(classlen-1,1) <= '9') classlen--;
        var classname = str_funcid.substr(0,1).toUpperCase()+str_funcid.substr(1,classlen-1);
        if(this._fnByType[classname] == undefined)
            this._fnByType[classname] = new YFunctionType(classname);

        return classname;
    }

    // Reindex a device in YAPI after a name change detected by device refresh
    function YAPI_reindexDevice(obj_dev)
    {
        var rootUrl = obj_dev.getRootUrl();
        var serial = obj_dev.getSerialNumber();
        var lname  = obj_dev.getLogicalName();
        this._devs[serial] = obj_dev;
        this._snByUrl[rootUrl] = serial;
        if(lname != "") this._snByName[lname] = serial;
        this._fnByType["Module"].reindexFunction(serial+".module", lname, null, null);
        var i, count = obj_dev.functionCount();
        for(i = 0; i < count; i++) {
            var funcid = obj_dev.functionId(i);
            var funcname = obj_dev.functionName(i);
            var classname = this.functionClass(funcid);
            this._fnByType[classname].reindexFunction(serial+"."+funcid, funcname, null, null);
        }
    }

    // Remove a device from YAPI after an unplug detected by device refresh
    function YAPI_forgetDevice(obj_dev)
    {
        if(!obj_dev) return;
        var rootUrl = obj_dev.getRootUrl();
        var serial = obj_dev.getSerialNumber();
        var lname = obj_dev.getLogicalName();
        delete this._devs[serial];
        delete this._snByUrl[rootUrl];
        if(this._snByName[lname] == serial) {
            delete this._snByName[lname];
        }
        this._fnByType["Module"].forgetFunction(serial+".module");
        var i, count = obj_dev.functionCount();
        for(i = 0; i < count; i++) {
            var funcid = obj_dev.functionId(i);
            var classname = this.functionClass(funcid);
            this._fnByType[classname].forgetFunction(serial+"."+funcid);
        }
    }

    // Find the best known identifier (hardware Id) for a given function
    function YAPI_resolveFunction(str_className, str_func)
    {
        if(Y_BASETYPES[str_className] == undefined) {
            // using a regular function type
            if(this._fnByType[str_className] == undefined)
                this._fnByType[str_className] = new YFunctionType(str_className);
            return this._fnByType[str_className].resolve(str_func);
        }
        // using an abstract baseType
        var baseType = Y_BASETYPES[str_className];
        var res;
        for(str_className in this._fnByType) {
            if(this._fnByType[str_className].getBaseType() == baseType) {
                res = this._fnByType[str_className].resolve(str_func);
                if(res.errorType == YAPI_SUCCESS) return res;
            }
        }
        return {errorType:YAPI_DEVICE_NOT_FOUND,
                errorMsg:"No "+str_className+" ["+str_func+"] found (old firmware?)",
                result:null};
    }

    // Find the best known identifier (hardware Id) for a given function
    function YAPI_getFriendlyNameFunction(str_className, str_func)
    {
        if(Y_BASETYPES[str_className] == undefined) {
            // using a regular function type
            if(this._fnByType[str_className] == undefined)
                this._fnByType[str_className] = new YFunctionType(str_className);
            return this._fnByType[str_className].getFriendlyName(str_func);
        }
        // using an abstract baseType
        var baseType = Y_BASETYPES[str_className];
        var res;
        for(str_className in this._fnByType) {
            if(this._fnByType[str_className].getBaseType() == baseType) {
                res = this._fnByType[str_className].getFriendlyName(str_func);
                if(res.errorType == YAPI_SUCCESS) return res;
            }
        }
        return {errorType:YAPI_DEVICE_NOT_FOUND,
                errorMsg:"No "+str_className+" ["+str_func+"] found (old firmware?)",
                result:null};
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    function YAPI_setFunction(str_className, str_func, obj_func)
    {
        if(this._fnByType[str_className] == undefined)
            this._fnByType[str_className] = new YFunctionType(str_className);
        return this._fnByType[str_className].setFunction(str_func, obj_func);
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    function YAPI_getFunction(str_className, str_func)
    {
        if(this._fnByType[str_className] == undefined)
            this._fnByType[str_className] = new YFunctionType(str_className);
        return this._fnByType[str_className].getFunction(str_func);
    }

    // Set a function advertised value by hardware id
    function YAPI_setFunctionValue(str_hwid, str_pubval)
    {
        var classname = this.functionClass(str_hwid);
        this._fnByType[classname].setFunctionValue(str_hwid, str_pubval);
    }

    // Set add a timed value report for a function
    function YAPI_setTimedReport(str_hwid, float_timestamp, arr_report)
    {
        var classname = this.functionClass(str_hwid);
        this._fnByType[classname].setTimedReport(str_hwid, float_timestamp, arr_report);
    }

    // Retrieve a function advertised value by hardware id
    function YAPI_getFunctionValue(str_hwid)
    {
        var classname = this.functionClass(str_hwid);
        return this._fnByType[classname].getFunctionValue(str_hwid);
    }

    // Retrieve a function advertised value by hardware id
    function YAPI_getFunctionBaseType(str_hwid)
    {
        var classname = this.functionClass(str_hwid);
        return this._fnByType[classname].getBaseType();
    }

    // Queue a function value event
    function YAPI_addValueEvent(obj_func, str_newval)
    {
        this._data_events.push([obj_func, str_newval]);
        if(this._forwardValues > 0) {
            YAPI.HandleEvents();
        }
    }

    // Queue a timed value report event
    function YAPI_addTimedReportEvent(obj_func, float_timestamp, arr_report)
    {
        this._data_events.push([obj_func, float_timestamp, arr_report]);
        if(this._forwardValues > 0) {
            YAPI.HandleEvents();
        }
    }

    // Find the hardwareId for the first instance of a given function class
    function YAPI_getFirstHardwareId(str_className)
    {
        if(Y_BASETYPES[str_className] == undefined) {
            // enumeration of a regular function type
            if(this._fnByType[str_className] == undefined)
                this._fnByType[str_className] = new YFunctionType(str_className);
            return this._fnByType[str_className].getFirstHardwareId();
        }
        // enumeration of an abstract class
        var baseType = Y_BASETYPES[str_className];
        var res;
        for(str_className in this._fnByType) {
            if(this._fnByType[str_className].getBaseType() == baseType) {
                res = this._fnByType[str_className].getFirstHardwareId();
                if(res != undefined) return res;
            }
        }
        return null;
    }

    // Find the hardwareId for the next instance of a given function class
    function YAPI_getNextHardwareId(str_className, str_hwid)
    {
        if(Y_BASETYPES[str_className] == undefined) {
            // enumeration of a regular function type
            return this._fnByType[str_className].getNextHardwareId(str_hwid);
        }
        // enumeration of an abstract class
        var baseType = Y_BASETYPES[str_className];
        var prevclass = this.functionClass(str_hwid);
        var res = this._fnByType[prevclass].getNextHardwareId(str_hwid);
        if(res != undefined) return res;
        for(str_className in this._fnByType) {
            if(prevclass != "") {
                if(str_className != prevclass) continue;
                prevclass = "";
                continue;
            }
            if(this._fnByType[str_className].getBaseType() == baseType) {
                res = this._fnByType[str_className].getFirstHardwareId();
                if(res != undefined) return res;
            }
        }
        return null;
    }

    function YAPI_webSocketMsg(obj_hub, arr_bytes)
    {
        var text = '';
        if(arr_bytes[0] == 8*8) { // YSTREAM_TCP_NOTIF
            for(var i = 1; i < arr_bytes.length; i++) {
                text += String.fromCharCode(arr_bytes[i]);
            }
            YAPI.parseEvents(obj_hub, text);
            return;
        }
        // Other types of messages
        var ws = obj_hub.websocket;
        var ystream = arr_bytes[0] >> 3;
        var tcpchan = arr_bytes[0] & 7;
        if(ystream == 1 || ystream == 2) { // YSTREAM_TCP or YSTREAM_TCP_CLOSE
            if(!ws.tcpChan[tcpchan]) {
                console.log("WS: Drop frame for closed tcpChan "+tcpchan);
                return;
            }
            for(var i = 1; i < arr_bytes.length; i++) {
                text += String.fromCharCode(arr_bytes[i]);
            }
            ws.tcpChan[tcpchan].responseText += text;
            if(ystream == 2) { // YSTREAM_TCP_CLOSE
                // send YSTREAM_TCP_CLOSE
                var frame = new Uint8Array(1);
                frame[0] = 8*2 + tcpchan;
                obj_hub.websocket.send(frame);
                // free tcp channel
                var pseudoReq = ws.tcpChan[tcpchan];
                ws.tcpChan[tcpchan] = null;
                // process incoming reply
                var pos = pseudoReq.responseText.indexOf("\r");
                var words = pseudoReq.responseText.slice(0,pos).split(" ");
                if(words[0] == 'OK') {
                    pseudoReq.status = 200;
                } else if(words[0] == '0K') {
                    console.log("WS: Unexpected persistent connection!")
                    pseudoReq.status = 200;
                } else {
                    pseudoReq.status = words[1];
                }
                pseudoReq.readyState = 4;
                pseudoReq.responseText = pseudoReq.responseText.slice(pos+4);
                pseudoReq.onComplete();
            }
            return;
        }
        console.log("WS: Unsupported message", arr_bytes);
    }

    function YAPI_webSocketReq(obj_hub, obj_request, str_body)
    {
        var relUrl = obj_request.reqUrl.slice(obj_hub.urlInfo.url.length-1);
        var subReq = obj_request.method+" "+relUrl+" \r\n\r\n";
        var ws = obj_hub.websocket;
        var tcpchan = 0;

        while(ws.tcpChan[tcpchan]) {
            tcpchan++;
        }
        if(tcpchan > 2) {
            // For now, limit to 2 channels (up to 8 could be possible)
            console.log("WebSocket: TOO MANY CONCURRENT TCP CHANNELS");
            return;
        }
        ws.tcpChan[tcpchan] = obj_request;

        var pos = 0;
        while(pos < subReq.length) {
            var framelen = 1 + subReq.length - pos;
            if(framelen > 125) framelen = 125;
            var datalen = framelen - 1;
            var i, frame = new Uint8Array(framelen);

            // use YSTREAM_TCP
            frame[0] = 8 + tcpchan;
            for (i = 0; i < datalen; i++) {
                frame[1+i] = subReq.charCodeAt(pos+i);
            }
            pos += framelen-1;
            obj_hub.websocket.send(frame);
        }
        // FIXME: send body as well !
    }

    // Perform an HTTP request on a device, by URL or identifier.
    // When loading the REST API from a device by identifier, the device cache will be used.
    // The 3rd argument of the function is optional, and used for implementing the asynchronous
    // version only. Return a strucure including errorType, errorMsg and result
    function YAPI_devRequest(str_device, str_request, func_statechanged, obj_body)
    {
        var async = (typeof func_statechanged != "undefined");
        // FOR BROWSERS ONLY:
        if (!async && typeof chrome != "undefined" && chrome.app && chrome.app.window) {
            // Synchronous XML HTTP Requests are not possible when running as a chrome extension
            // This breakpoint is intended to help you understand what caused a synchronous request
            // while you should only use *_async functions
            debugger;
        }
        var lines = str_request.split("\n");
        var lockdev, baseUrl;
        if(str_device.substr(0,7) == "http://" || str_device.substr(0,5) == "ws://") {
            baseUrl = str_device;
            if (baseUrl.slice(-1) != "/") baseUrl = baseUrl + "/";
            if(lines[0].substr(0,12) != "GET /not.byn") {
                var serial = this._snByUrl[baseUrl];
                if(serial) {
                    lockdev = this._devs[serial];
                }
            }
        } else {
            lockdev = this.getDevice(str_device);
            if(!lockdev) {
                return { errorType:YAPI_DEVICE_NOT_FOUND,
                         errorMsg:"Device ["+str_device+"] not online",
                         result:null};
            }
            // use the device cache when loading the whole API
            if(lines[0] == "GET /api.json") {
                return lockdev.requestAPI(YAPI.defaultCacheValidity);
            }
            baseUrl = lockdev.getRootUrl();
        }
        // map str_device to a URL
        var words = lines[0].split(" ");
        if(words.length < 2) {
            return { errorType:YAPI_INVALID_ARGUMENT,
                     errorMsg: "Invalid request, not enough words; expected a method name and a URL",
                     result: null};
        } else if(words.length > 2) {
            return { errorType:YAPI_INVALID_ARGUMENT,
                     errorMsg: "Invalid request, too many words; make sure the URL is URI-encoded",
                     result: null};
        }
        var method = words[0];
        var devUrl = words[1];
        if(devUrl.substr(0,1) == "/") devUrl = devUrl.substr(1);
        if(baseUrl == "http://callback:4444/") {
            baseUrl = baseUrl.slice(baseUrl.indexOf('/',16));
            return this._httpCallbackRequest(method, baseUrl+devUrl, func_statechanged, obj_body);
        }
        // Synchronous queries are always HTTP (there is no synchronous WebSocket API)
        var isWebSocket = baseUrl.slice(0,5) == "ws://";
        if(isWebSocket && !async) {
            isWebSocket = false;
            baseUrl = "http://" + baseUrl.slice(5);
        }
        if(isWebSocket) {
            var hub = YAPI.getHub(baseUrl);
            if(!hub.websocket) {
                // Open WebSocket connection if not yet done
                var ws = new WebSocket(hub.urlInfo.url+'not.byn');
                ws.binaryType = "arraybuffer";
                ws.onopen    = function(evt) {
                    while(ws.openQueue.length > 0) {
                        (ws.openQueue.shift())();
                    }
                };
                ws.onerror   = function(evt) { console.log("WebSocket error: ", evt); hub.websocket=null; };
                ws.onclose   = function(evt) { console.log("WebSocket close !"); hub.websocket=null; };
                ws.onmessage = function(evt) { YAPI.webSocketMsg(hub, new Uint8Array(evt.data)); }
                // Add our own custom context fields to the websocket
                ws.openQueue = [];
                ws.tcpChan = [];
                hub.websocket = ws;
            }
            if(!obj_body) obj_body = '';
            var pseudoRequest = {};
            pseudoRequest.method = method;
            pseudoRequest.reqUrl = baseUrl+devUrl;
            pseudoRequest.responseText = '';
            pseudoRequest.onComplete = function() {
                if(lockdev) {
                    lockdev._runningQuery = null;
                    lockdev._busy--;
                    func_statechanged(pseudoRequest);
                    while(lockdev._busy == 0 && lockdev._pendingQueries.length > 0) {
                        var pq = lockdev._pendingQueries.shift();
                        if(pq.xhr) {
                            // send pending query
                            lockdev._busy++;
                            lockdev._runningQuery = pq.xhr;
                            YAPI.webSocketReq(hub, pq.xhr, pq.body);
                        } else if(pq.cb) {
                            // notify queued callback
                            pq.cb(pq.ctx, pq.obj);
                        }
                    }
                } else {
                    func_statechanged(pseudoRequest);
                }
            };
            if(lockdev && (lockdev._busy > 0 || lockdev._pendingQueries.length > 0)) {
                lockdev._pendingQueries.push({xhr:pseudoRequest,body:obj_body});
            } else {
                if(lockdev) {
                    lockdev._busy++;
                    lockdev._runningQuery = pseudoRequest;
                }
                if(hub.websocket.readyState != 1) {
                    // websocket not yet ready
                    if(devUrl.slice(0,7) != 'not.byn') {
                        ws.openQueue.push(function() {
                            YAPI.webSocketReq(hub, pseudoRequest, obj_body);
                        });
                    }
                } else {
                    YAPI.webSocketReq(hub, pseudoRequest, obj_body);
                }
            }
            return { errorType:YAPI_SUCCESS,
                     errorMsg:"no error",
                     result:pseudoRequest};
        }

        // FOR BROWSERS ONLY:
        var httpRequest = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        try {
            httpRequest.reqUrl = baseUrl+devUrl;
            httpRequest.open(method,baseUrl+devUrl,async,'','');
            if(!obj_body) {
                obj_body = '';
                if(devUrl.substr(0,7) == 'not.byn') {
                    httpRequest.overrideMimeType("text/plain; charset=x-user-defined");
                }
            } else if(typeof FormData == "undefined" && obj_body.length > 4 && obj_body.slice(0,2) == '--') {
                // Add form-encoding header
                var boundary = obj_body.slice(2, obj_body.indexOf('\r'));
                httpRequest.setRequestHeader("Content-Type", "multipart/form-data; boundary="+boundary);
            }
            if(async) {
                httpRequest.onreadystatechange = function() {
                    if(lockdev && httpRequest.readyState==4) {
                        lockdev._runningQuery = null;
                        lockdev._busy--;
                        func_statechanged(httpRequest);
                        while(lockdev._busy == 0 && lockdev._pendingQueries.length > 0) {
                            var pq = lockdev._pendingQueries.shift();
                            if(pq.xhr) {
                                // send pending query
                                lockdev._busy++;
                                lockdev._runningQuery = pq.xhr;
                                pq.xhr.send(pq.body);
                            } else if(pq.cb) {
                                // notify queued callback
                                pq.cb(pq.ctx, pq.obj);
                            }
                        }
                    } else {
                        func_statechanged(httpRequest);
                    }
                };
                if(lockdev && (lockdev._busy > 0 || lockdev._pendingQueries.length > 0)) {
                    lockdev._pendingQueries.push({xhr:httpRequest,body:obj_body});
                } else {
                    if(lockdev) {
                        lockdev._busy++;
                        lockdev._runningQuery = httpRequest;
                    }
                    httpRequest.send(obj_body);
                }
            } else {
                if(lockdev && lockdev._busy > 0 && (baseUrl.indexOf('/bySerial/') >= 0 ||
                                                    baseUrl.indexOf('/byName/') >= 0)) {
                    //console.log("HTTP blocking request: "+httpRequest.reqUrl);
                    //console.log("Currently executing: "+lockdev._runningQuery.reqUrl);
                    return {errorType:YAPI_DEVICE_BUSY,
                             errorMsg: "Non-async request would deadlock the browser",
                             result: null};
                }
                if(lockdev) {
                    lockdev._busy++;
                    lockdev._runningQuery = httpRequest;
                }
                httpRequest.send(obj_body);
                if(lockdev) {
                    lockdev._runningQuery = null;
                    lockdev._busy--;
                }
            }
        } catch(err) {
            //alert('http error:'+(err.message || err.description));
            return { errorType:YAPI_IO_ERROR,
                     errorMsg:"HTTP request raised an exception: "+(err.message || err.description || err.name),
                     result:null};
        }
        if(!async) {
            // called in blocking mode
            var status = parseInt(httpRequest.status);
            if(status != 200 && status != 304) {
                return { errorType:YAPI_IO_ERROR,
                         errorMsg:"Received HTTP status "+status+" ("+httpRequest.responseText+") for "+baseUrl+devUrl,
                         result:null};
            }
            return {errorType:YAPI_SUCCESS,
                     errorMsg:"no error",
                     result:String(httpRequest.responseText)};
        } else {
            // called in asynchronous mode
            return { errorType:YAPI_SUCCESS,
                     errorMsg:"no error",
                     result:httpRequest};
        }
    }

    // Emulate an HTTP request using preloaded HTTP callback cache
    // (used for node.js only)
    //
    function YAPI_httpCallbackRequest(method, devUrl, func_statechanged, obj_body)
    {
        var async = (typeof func_statechanged != "undefined");
        var res = { errorType:YAPI_SUCCESS,
                    errorMsg:"no error",
                    result:""};

        //console.log("Request: "+method+" "+devUrl+(async?" async":""));
        if(method == 'POST') {
            // Node.js uses a Buffer as body
            var boundary = '???';
            for(var endb = 0; endb < obj_body.length; endb++) {
                if(obj_body[endb] == 13) break;
            }
            if(obj_body.toString('ascii', 0, 2)=='--' && endb > 2 && endb < 20) {
                boundary = obj_body.toString('ascii', 2, endb);
            }
            this._serverResponse.write("\n@YoctoAPI:"+method+" "+devUrl+" "+obj_body.length+":"+boundary+"\n");
            this._serverResponse.write(obj_body);
        } else if(method == 'GET') {
            var jzon = devUrl.indexOf('?fw=');
            if(jzon != -1 && devUrl.indexOf('&', jzon) == -1) {
                devUrl = devUrl.slice(0, jzon);
            }
            if(devUrl.indexOf('?') == -1 ||
               devUrl.indexOf('/logs.txt') != -1 ||
               devUrl.indexOf('/logger.json') != -1 ||
               devUrl.indexOf('/ping.txt') != -1 ||
               devUrl.indexOf('/files.json?a=dir') != -1) {
                // read request, load from cache
                var subfun = /\/api\/([a-z][A-Za-z0-9]*)[.]json$/.exec(devUrl);
                if(subfun) {
                    devUrl = devUrl.slice(0,subfun.index)+'/api.json';
                }
                if(!this._callbackCache[devUrl]) {
                    this._serverResponse.write("\n!YoctoAPI:"+devUrl+" is not preloaded, adding to list");
                    this._serverResponse.write("\n@YoctoAPI:+"+devUrl+"\n");
                    res = { errorType:YAPI_NO_MORE_DATA,
                            errorMsg:"URL "+devUrl+" not preloaded, adding to list",
                            result:null};
                } else {
                    var jsonres = this._callbackCache[devUrl];
                    if(subfun) {
                        jsonres = jsonres[subfun[1]];
                    }
                    res.result = JSON.stringify(jsonres);
                }
            } else {
                // change request, print to output stream
                this._serverResponse.write("\n@YoctoAPI:"+method+" "+devUrl+"\n");
            }
        } else {
            res = { errorType:YAPI_NOT_SUPPORTED,
                    errorMsg:"Unsupported HTTP method",
                    result:null};
        }
        if(async) {
            var pseudoRequest = { readyState: 4, status: 200,
                                  responseText: new Buffer(res.result,YAPI.defaultEncoding) };
            if(res.errorType != YAPI_SUCCESS) {
                pseudoRequest.status = 405;
            }
            func_statechanged(pseudoRequest);
            res.result = pseudoRequest;
        }
        return res;
    }

    // Perform an HTTP request on a device, by URL or identifier.
    //
    // This is the asynchronous version, that uses a callback instead of a return value.
    function YAPI_devRequest_async(str_device, str_request, obj_body, func_callback, obj_context)
    {
        var yreq = this.devRequest(str_device, str_request, function(httpRequest) {
            if (httpRequest.readyState == 4) {
                var status = parseInt(httpRequest.status);
                if(status != 200 && status != 304) {
                    func_callback(obj_context, {errorType:YAPI_IO_ERROR,
                                                errorMsg:"Received HTTP status "+status+" ("+httpRequest.responseText+") for async query on "+str_device,
                                                result:null});
                } else {
                    func_callback(obj_context, {errorType:YAPI_SUCCESS,
                                                errorMsg:"no error",
                                                result:String(httpRequest.responseText)});
                }
            }
        }, obj_body);
        if(yreq.errorType != YAPI_SUCCESS && func_callback) {
            func_callback(obj_context, yreq);
        }
    }

    // Locate the device to access a specified function. May cause device list update if needed
    function YAPI_funcDev_internal(obj_ctx, int_prevresult)
    {
        var res;

        if(int_prevresult != YAPI_SUCCESS) {
            res = {errorType: int_prevresult,
                    errorMsg:  YAPI._lastErrorMsg,
                    result:    null};
            if(obj_ctx.callback) obj_ctx.callback(obj_ctx.context, res);
            return res;
        }
        var str_className = obj_ctx.className;
        var str_func = obj_ctx.func;
        var resolve = YAPI.resolveFunction(str_className, str_func);
        if(resolve.errorType != YAPI_SUCCESS) {
            if(obj_ctx.callback) obj_ctx.callback(obj_ctx.context, resolve);
            return resolve;
        }
        str_func = resolve.result;
        var dotpos = str_func.indexOf(".");
        var devid = str_func.substr(0,dotpos);
        var funcid = str_func.substr(dotpos+1);
        var dev = YAPI.getDevice(devid);
        if(dev == null) {
            res = {errorType: YAPI_DEVICE_NOT_FOUND,
                    errorMsg:  "Device ["+devid+"] not found",
                    result:    null};
        } else {
            res = {errorType: YAPI_SUCCESS,
                    errorMsg:  "no error",
                    result:    {device:dev, deviceid:devid, functionid:funcid, hwid:str_func}};
        }
        if(obj_ctx.callback) obj_ctx.callback(obj_ctx.context, res);
        return res;
    }

    // Locate the device to access a specified function. May cause device list update if needed
    //
    // This is the asynchronous version, that uses a callback instead of a return value.
    function YAPI_funcDev_async(str_className, str_func, func_callback, obj_context)
    {
        var resolve = this._funcDev_internal({className: str_className, func: str_func}, YAPI_SUCCESS);
        if(resolve.errorType == YAPI_SUCCESS) {
            func_callback(obj_context, resolve);
        } else if(resolve.errorType == YAPI_DEVICE_NOT_FOUND && this._hubs.length == 0) {
            // when USB is supported, check if no USB device is connected before outputing this message
            resolve.errorMsg = "Impossible to contact any device because no hub has been registered";
            func_callback(obj_context, resolve);
        } else {
            this.UpdateDeviceList_async(this._funcDev_internal,
                                        {className: str_className,
                                          func:      str_func,
                                          callback:  func_callback,
                                          context:   obj_context});
        }
    }

    // Locate the device to access a specified function. May cause device list update if needed
    function YAPI_funcDev(str_className, str_func)
    {
        var resolve = this._funcDev_internal({className: str_className, func: str_func}, YAPI_SUCCESS);
        if(resolve.errorType == YAPI_SUCCESS) {
            return resolve;
        } else if(resolve.errorType == YAPI_DEVICE_NOT_FOUND && this._hubs.length == 0) {
            // when USB is supported, check if no USB device is connected before outputing this message
            resolve.errorMsg = "Impossible to contact any device because no hub has been registered";
            return resolve;
        }
        resolve = this._updateDeviceList_internal(true, false);
        if(resolve.errorType != YAPI_SUCCESS) {
            return resolve;
        }
        return this._funcDev_internal({className: str_className, func: str_func}, YAPI_SUCCESS);
    }


    function YAPI_getSubDevicesFrom(str_device)
    {
        var dev = this.getDevice(str_device);
        if (!dev) {
            return [];
        }
        var baseUrl = dev.getRootUrl();
        baseUrl = baseUrl.replace('http://', '');
        var pos = baseUrl.indexOf('/');
        if(pos >= 0) {
            baseUrl = baseUrl.substr(0,pos)
        }
        var rooturl = "http://"+baseUrl+"/";
        for(var i = 0; i < this._hubs.length; i++) {
            if(this._hubs[i].urlInfo.url == rooturl) {
                if ( this._hubs[i].serialByYdx[0] == str_device) {
                    return this._hubs[i].serialByYdx.slice(1);
                }
                break;
            }
        }
        return [];
    }

    /**
     * @return {string}
     */
    function YAPI_getHubSerialFrom(str_device)
    {

        var dev = this.getDevice(str_device);
        if (!dev) {
            return '';
        }
        var baseUrl = dev.getRootUrl();
        baseUrl = baseUrl.replace('http://', '');
        var pos = baseUrl.indexOf('/');
        if(pos >= 0) {
            baseUrl = baseUrl.substr(0,pos)
        }
        var rooturl = "http://"+baseUrl+"/";
        for(var i = 0; i < this._hubs.length; i++) {
            if(this._hubs[i].urlInfo.url == rooturl) {
                return this._hubs[i].serialByYdx[0];
            }
        }
        return '';
    }


    // Load and parse the REST API for a function given by class name and identifier, possibly applying changes
    // Device cache will be preloaded when loading function "module" and leveraged for other modules
    // Return a strucure including errorType, errorMsg and result
    function YAPI_funcRequest(str_className, str_func, str_extra, int_msValidity)
    {
        var devreq = this._funcDev(str_className, str_func);
        if(devreq.errorType != YAPI_SUCCESS) {
            return devreq;
        }
        var yreq;
        devreq = devreq.result;
        var loadval = null;
        if(str_extra == "") {
            // use a cached API string (reload if needed)
            yreq = devreq.device.requestAPI(int_msValidity);
            if(yreq != null) {
                if(yreq.errorType != YAPI_SUCCESS) return yreq;
                try {loadval = JSON.parse(yreq.result)[devreq.functionid];} catch(err) {}
            }
        } else {
            devreq.device.dropCache();
        }
        if(!loadval) {
            // request specified function only to minimize traffic
            if(str_extra == "") str_extra = ".json";
            var httpreq = "GET /api/"+devreq.functionid+str_extra;
            yreq = this.devRequest(devreq.deviceid, httpreq);
            if(yreq.errorType != YAPI_SUCCESS) return yreq;
            if(yreq.result == '' && httpreq.indexOf('?') >= 0) return yreq;
            try {loadval = JSON.parse(yreq.result);} catch(err) {}
        }
        yreq.hwid       = devreq.hwid;
        yreq.deviceid   = devreq.deviceid;
        yreq.functionid = devreq.functionid;
        if(!loadval) {
            return {errorType:YAPI_IO_ERROR,
                     errorMsg:"Request failed, could not parse API value for function "+devreq.hwid,
                     result:null};
        }
        yreq.result = loadval;
        return yreq;
    }

    // Load and parse the REST API for a function given by class name and identifier, possibly applying changes
    // Device cache will be preloaded when loading function "module" and leveraged for other modules
    //
    // This is the asynchronous version, that uses a callback instead of a return value.
    function YAPI_funcRequest_async(str_className, str_func, str_extra, func_callback, obj_context)
    {
        var devreq = this._funcDev_async(str_className, str_func, function(obj_ctx, devreq) {
            if(devreq.errorType != YAPI_SUCCESS) {
                if(obj_ctx.callback) obj_ctx.callback(obj_ctx.context, devreq);
                return;
            }
            devreq = devreq.result;
            var reqcb = function(params, yreq) {
                var loadval = null;
                if(yreq != null) {
                    yreq.hwid       = params.hwid;
                    yreq.deviceid   = params.deviceid;
                    yreq.functionid = params.functionid;
                    if(yreq.errorType != YAPI_SUCCESS) {
                        if(params.cb) params.cb(params.ctx, yreq);
                        return;
                    }
                    if(!params.cb) {
                        loadval = '';
                    } else if(yreq.result == '' && str_extra.indexOf('?') >= 0) {
                        loadval = '';
                    } else {
                        try {loadval = JSON.parse(yreq.result);} catch(err) {}
                    }
                    if(!loadval) {
                        if(params.cb) params.cb(params.ctx, {
                            errorType:YAPI_IO_ERROR,
                            errorMsg:"Request failed, could not parse API value for function "+params.hwid,
                            result:null
                        });
                        return;
                    }
                    if(params.functionid != null) loadval = loadval[params.functionid];
                    yreq.result = loadval;
                    if(params.cb) params.cb(params.ctx, yreq);
                    return;
                }
            };
            if(obj_ctx.extra == "") {
                // use a cached API string (reload if needed)
                devreq.device.requestAPI_async(reqcb, {hwid       : devreq.hwid,
                                                       deviceid   : devreq.deviceid,
                                                       functionid : devreq.functionid,
                                                       cb         : obj_ctx.callback,
                                                       ctx        : obj_ctx.context});
            } else {
                // request specified function only to minimize traffic
                devreq.device.dropCache();
                var httpreq = "GET /api/"+devreq.functionid+obj_ctx.extra;
                YAPI.devRequest_async(devreq.deviceid, httpreq, '',
                                      reqcb, {hwid       : devreq.hwid,
                                              deviceid   : devreq.deviceid,
                                              functionid : devreq.functionid,
                                              cb         : obj_ctx.callback,
                                              ctx        : obj_ctx.context});
            }
        }, {extra: str_extra, callback: func_callback, context: obj_context} );
    }

    // Perform an HTTP request on a device and return the result string
    // Throw an exception (or return YAPI_ERROR_STRING on error)
    function YAPI_HTTPRequest(str_device, str_request)
    {
        var yreq = this.devRequest(str_device, str_request);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }
        return yreq.result;
    }

    // Perform an HTTP request on a device and return the result string
    //
    // This is the asynchronous version, that uses a callback instead of a return value.
    function YAPI_HTTPRequest_async(str_device, str_request, func_callback, obj_context)
    {
        this.devRequest_async(str_device, str_request, '',
                              function(params, yreq) {
                                  if(yreq.errorType != YAPI_SUCCESS) {
                                      params.obj._throw(yreq.errorType, yreq.errorMsg, null);
                                      if(params.cb) params.cb(params.ctx, null);
                                      return;
                                  }
                                  if(params.cb) params.cb(params.ctx, yreq.result);
                              },
                              {obj:this, cb:func_callback, ctx:obj_context});
    }

    /*
     * Return the API version
     */
    function YAPI_GetAPIVersion()
    {
        return "1.11.6320";
    }

    /**
     * Initializes the Yoctopuce programming library explicitly.
     * It is not strictly needed to call yInitAPI(), as the library is
     * automatically  initialized when calling yRegisterHub() for the
     * first time.
     *
     * When YAPI.DETECT_NONE is used as detection mode,
     * you must explicitly use yRegisterHub() to point the API to the
     * VirtualHub on which your devices are connected before trying to access them.
     *
     * @param mode : an integer corresponding to the type of automatic
     *         device detection to use. Possible values are
     *         YAPI.DETECT_NONE, YAPI.DETECT_USB, YAPI.DETECT_NET,
     *         and YAPI.DETECT_ALL.
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    function YAPI_InitAPI(mode,errmsg)
    {
        // nothing to be done for now
        return YAPI_SUCCESS;
    }

    /**
     * Waits for all pending communications with Yoctopuce devices to be
     * completed then frees dynamically allocated resources used by
     * the Yoctopuce library.
     *
     * From an operating system standpoint, it is generally not required to call
     * this function since the OS will automatically free allocated resources
     * once your program is completed. However, there are two situations when
     * you may really want to use that function:
     *
     * - Free all dynamically allocated memory blocks in order to
     * track a memory leak.
     *
     * - Send commands to devices right before the end
     * of the program. Since commands are sent in an asynchronous way
     * the program could exit before all commands are effectively sent.
     *
     * You should not call any other library function after calling
     * yFreeAPI(), or your program will crash.
     */
    function YAPI_FreeAPI()
    {
        // when invoked in callback mode, close connection
        if(this._serverResponse) {
            this._serverResponse.end();
        }

        // clear all caches
        this._init();
    }

    /**
     * Disables the use of exceptions to report runtime errors.
     * When exceptions are disabled, every function returns a specific
     * error value which depends on its type and which is documented in
     * this reference manual.
     */
    function YAPI_DisableExceptions()
    {
        this.exceptionsDisabled = true;
    }

    /**
     * Re-enables the use of exceptions for runtime error handling.
     * Be aware than when exceptions are enabled, every function that fails
     * triggers an exception. If the exception is not caught by the user code,
     * it either fires the debugger or aborts (i.e. crash) the program.
     */
    function YAPI_EnableExceptions()
    {
        this.exceptionsDisabled = false;
    }


    function _parseRegisteredUrl(str_url)
    {
        var user = '';
        var pass = '';
        var port = '4444';
        var host;
        var url = "http://";

        if(str_url.slice(0,7) == 'http://') {
            str_url = str_url.slice(7);
        } else if(str_url.slice(0,5) == 'ws://') {
            url = "ws://";
            str_url = str_url.slice(5);
        }
        var pos = str_url.indexOf('/');
        if (pos > 0) {
            str_url = str_url.slice(0, pos);
        }
        var authpos = str_url.indexOf('@');
        if (authpos >= 0) {
            var auth = str_url.slice(0, authpos);
            var passpos = auth.indexOf(':');
            if (passpos >= 0) {
                user = auth.slice(0, passpos);
                pass = auth.slice(passpos + 1);
                url += user + ':' + pass + '@';
            }else{
                user = auth;
                url += user + '@';
            }
            str_url = str_url.slice(authpos + 1);
        }
        pos = str_url.indexOf(':');
        if(pos < 0) {
            host = str_url;
        } else {
            host = str_url.slice(0,pos);
            port = str_url.slice(pos + 1);
        }
        if (host == 'callback')
            url = "http://callback:4444/";
        else
            url += host + ':' + port + "/";
        var res = {'user':user, 'pass':pass, 'host':host, 'port':port, 'url':url};
        return res;

    }

    function YAPI_preregisterHub_internal(var_urlInfo)
    {

        for(var i = 0; i < this._hubs.length; i++) {
            if(this._hubs[i].urlInfo.url == var_urlInfo.url) return;
        }

        // Add hub to known list
        var newhub = {
            hubidx          : this._hubs.length,   // index of hub in array
            urlInfo         : var_urlInfo,         // structure that describe the root URL of the hub
            websocket       : null,                // websocket connection, if active
            notiflen        : 32000,               // notification message length before forced disconnection
            notifTrigger    : 0,                   // timestamp of next manual updateDeviceList that would open not.byn
            devListValidity : 500,                 // default validity of updateDeviceList
            devListExpires  : 0,                   // timestamp of next useful updateDeviceList
            serialByYdx     : [],                  // serials by hub-specific devYdx
            retryDelay      : 15,                  // delay before reconnecting in case of error: initially 15ms
            notifPos        : -1,                  // current absolute position in hub notification stream
            currPos         : 0                    // current position in data stream
        };
        this._hubs.push(newhub);
    }

    /**
     * Set up the Yoctopuce library to use modules connected on a given machine. Idealy this
     * call will be made once at the begining of your application.  The
     * parameter will determine how the API will work. Use the following values:
     *
     * <b>usb</b>: When the usb keyword is used, the API will work with
     * devices connected directly to the USB bus. Some programming languages such a JavaScript,
     * PHP, and Java don't provide direct access to USB hardware, so usb will
     * not work with these. In this case, use a VirtualHub or a networked YoctoHub (see below).
     *
     * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
     * host with the given IP address or hostname. That host can be a regular computer
     * running a <i>native VirtualHub</i>, a <i>VirtualHub for web</i> hosted on a server,
     * or a networked YoctoHub such as YoctoHub-Ethernet or
     * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
     * computer, use the IP address 127.0.0.1. If the given IP is unresponsive, yRegisterHub
     * will not return until a time-out defined by ySetNetworkTimeout has elapsed.
     * However, it is possible to preventively test a connection  with yTestHub.
     * If you cannot afford a network time-out, you can use the non blocking yPregisterHub
     * function that will establish the connection as soon as it is available.
     *
     *
     * <b>callback</b>: that keyword make the API run in "<i>HTTP Callback</i>" mode.
     * This a special mode allowing to take control of Yoctopuce devices
     * through a NAT filter when using a VirtualHub or a networked YoctoHub. You only
     * need to configure your hub to call your server script on a regular basis.
     * This mode is currently available for PHP and Node.JS only.
     *
     * Be aware that only one application can use direct USB access at a
     * given time on a machine. Multiple access would cause conflicts
     * while trying to access the USB modules. In particular, this means
     * that you must stop the VirtualHub software before starting
     * an application that uses direct USB access. The workaround
     * for this limitation is to set up the library to use the VirtualHub
     * rather than direct USB access.
     *
     * If access control has been activated on the hub, virtual or not, you want to
     * reach, the URL parameter should look like:
     *
     * http://username:password@address:port
     *
     * You can call <i>RegisterHub</i> several times to connect to several machines. On
     * the other hand, it is useless and even counterproductive to call <i>RegisterHub</i>
     * with to same address multiple times during the life of the application.
     *
     * @param url : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    function YAPI_RegisterHub(url,errmsg)
    {
        var i;

        var urlInfo = _parseRegisteredUrl(url);

        var yreq = YAPI.devRequest(urlInfo.url, "GET /api.json");
        if(yreq.errorType != YAPI_SUCCESS) {
            if(errmsg != undefined) errmsg.msg = yreq.errorMsg;
            return this._throw(YAPI_DEVICE_NOT_FOUND, yreq.errorMsg, YAPI_DEVICE_NOT_FOUND);
        }

        this._preregisterHub_internal(urlInfo);
        // If hub is not yet known, create a device object (synchronous call)
        var serial = this._snByUrl[urlInfo.url];
        if(!serial) {
            new YDevice(urlInfo.url, null, null);
        }

        // Register device list
        yreq = this._updateDeviceList_internal(true, false);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(errmsg != undefined) errmsg.msg = yreq.errorMsg;
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a given machine. The
     * parameter will determine how the API will work. Use the follwing values:
     *
     * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
     * host with the given IP address or hostname. That host can be a regular computer
     * running a VirtualHub, or a networked YoctoHub such as YoctoHub-Ethernet or
     * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
     * computer, use the IP address 127.0.0.1.
     *
     * <b>callback</b>: that keywork make the API run in "<i>HTTP Callback</i>" mode.
     * This a special mode allowing to take control of Yoctopuce devices
     * through a NAT filter when using a VirtualHub ou a networked YoctoHub. You only
     * need to configure your hub to call your server script on a regular basis.
     * This mode is currently available for PHP and Node.JS only.
     *
     * Be aware that only one application can use direct USB access at a
     * given time on a machine. Multiple access would cause conflicts
     * while trying to access the USB modules. In particular, this means
     * that you must stop the VirtualHub software before starting
     * an application that uses direct USB access. The workaround
     * for this limitation is to setup the library to use the VirtualHub
     * rather than direct USB access.
     *
     * If acces control has been activated on the hub, virtual or not, you want to
     * reach, the URL parameter should look like:
     *
     * http://username:password@adresse:port
     *
     * You can call <i>RegisterHub</i> several times to connect to several machines.
     *
     * @param url : a string containing either the root URL of the hub to monitor, or "callback"
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the result code (YAPI_SUCCESS if the operation completes successfully)
     *         - the error message, if any
     * @param context : user-specific object that is passed as-is to the callback function
     * @param incomingMessage : when url is "callback", must be set to the node.js incomingMessage object.
     *         In all other cases, this parameter is ignored.
     * @param serverResponse  : when url is "callback", must be set to the node.js serverResponse object.
     *         In all other cases, this parameter is ignored.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_RegisterHub_async(url, callback, context, incomingMessage, serverResponse)
    {
        var i;

        var urlInfo = _parseRegisteredUrl(url);
        var doit = function() {
            YAPI.devRequest_async(urlInfo.url, "GET /api.json", '', function(params,yreq) {
                if(yreq.errorType != YAPI_SUCCESS) {
                    params.cb(params.ctx, yreq.errorType, yreq.errorMsg);
                }
                YAPI._preregisterHub_internal(urlInfo);
                // If hub is not yet known, create a device object
                var serial = YAPI._snByUrl[urlInfo.url];
                if(!serial) {
                    // create device asynchronously, without callback
                    new YDevice(urlInfo.url, null, null, function(params,res) {
                        // Update device list
                        YAPI.UpdateDeviceList_async(params.cb, params.ctx);
                    }, params);
                }
            }, {rooturl: urlInfo.url, cb: callback, ctx: context});
        };
        if(urlInfo['host'] == "callback") {
            YAPI._serverResponse = serverResponse;
            var badCallback = function() {
                var errmsg = "RegisterHub(callback) used without posting YoctoAPI data";
                //console.log(errmsg);
                YAPI._serverResponse.write("\n!YoctoAPI:"+errmsg+"\n");
                YAPI._callbackCache = [];
                callback(context, YAPI.NO_MORE_DATA, errmsg);
            };
            if(incomingMessage.method != 'POST') {
                badCallback();
            } else {
                YAPI._callbackCache = '';
                incomingMessage.on('end',function() {
                    if(YAPI._callbackCache == "") {
                        badCallback();
                    } else {
                        var data_str = YAPI._callbackCache;
                        YAPI._callbackCache = JSON.parse(data_str);
                        if (urlInfo.pass != '') {
                            // callback data signed, verify signature
                            if (!YAPI._callbackCache.sign) {
                                var errmsg = "missing signature from incoming YoctoHub (callback password required)";
                                YAPI._serverResponse.write("\n!YoctoAPI:"+errmsg+"\n");
                                YAPI._callbackCache = [];
                                callback(context, YAPI.NO_MORE_DATA, errmsg);
                                return YAPI_INVALID_ARGUMENT;
                            }
                            var sign = YAPI._callbackCache['sign'];
                            var pass = urlInfo.pass;
                            var salt;
                            if (pass.length == 32) {
                                salt = pass.toLowerCase();
                            } else {
                                salt = crypto.createHash("md5").update(pass).digest("hex");
                            }
                            data_str = data_str.replace(sign, salt);
                            var check = crypto.createHash("md5").update(data_str).digest("hex");
                            if (check.toLowerCase() != sign.toLowerCase()) {
                                //console.log("Computed signature: "+ check);
                                //console.log("Received signature: "+ sign);
                                var errmsg = "invalid signature from incoming YoctoHub (invalid callback password)";
                                YAPI._serverResponse.write("\n!YoctoAPI:"+errmsg+"\n");
                                YAPI._callbackCache = [];
                                callback(context, YAPI_UNAUTHORIZED, errmsg);
                                return YAPI_UNAUTHORIZED;
                            }
                        }
                        doit();
                    }
                });
                incomingMessage.on('data',function(chunk) {
                    YAPI._callbackCache += chunk.toString(YAPI.defaultEncoding);
                });
            }
        } else {
            doit();
        }

        return YAPI_SUCCESS;
    }


    /**
     * Fault-tolerant alternative to yRegisterHub(). This function has the same
     * purpose and same arguments as yRegisterHub(), but does not trigger
     * an error when the selected hub is not available at the time of the function call.
     * If the connexion cannot be established immediately, a background task will automatically
     * perform periodic retries. This makes it possible to register a network hub independently of the current
     * connectivity, and to try to contact it only when a device is actively needed.
     *
     * @param url : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    function YAPI_PreregisterHub(url, errmsg)
    {
        var urlInfo =  _parseRegisteredUrl(url);

        this._preregisterHub_internal(urlInfo);

        // If hub is not yet known, create a device object
        var serial = this._snByUrl[urlInfo.url];
        if(!serial) {
            // create device asynchronously, without callback
            new YDevice(urlInfo.url, null, null, function(){});
        }

        return YAPI_SUCCESS;
    }


    /**
     * Set up the Yoctopuce library to no more use modules connected on a previously
     * registered machine with RegisterHub.
     *
     * @param url : a string containing either "usb" or the
     *         root URL of the hub to monitor
     */
    function YAPI_UnregisterHub(url)
    {
        var urlInfo =  _parseRegisteredUrl(url);
        var i,j;

        for(i = 0; i < this._hubs.length; i++) {
            if(this._hubs[i].urlInfo.url == urlInfo.url)  {
            	for (j =0 ; j< this._hubs[i].serialByYdx.length ; j++) {
            		var serial = this._hubs[i].serialByYdx[j];
	            	this.forgetDevice(this._devs[serial]);
            	}
                var before = this._hubs.slice(0,i);
                if(i+1 < this._hubs.length) {
                    var after = this._hubs.slice(i+1);
                    this._hubs = before.concat(after);
                }
                this._hubs = before;
                return;
            }
        }
    }

    /**
     * Triggers a (re)detection of connected Yoctopuce modules.
     * The library searches the machines or USB ports previously registered using
     * yRegisterHub(), and invokes any user-defined callback function
     * in case a change in the list of connected devices is detected.
     *
     * This function can be called as frequently as desired to refresh the device list
     * and to make the application aware of hot-plug events. However, since device
     * detection is quite a heavy process, UpdateDeviceList shouldn't be called more
     * than once every two seconds.
     *
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    function YAPI_UpdateDeviceList(errmsg)
    {
        var yreq = this._updateDeviceList_internal(false, true);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(errmsg!=undefined) errmsg.msg = yreq.errorMsg;
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Triggers a (re)detection of connected Yoctopuce modules.
     * The library searches the machines or USB ports previously registered using
     * yRegisterHub(), and invokes any user-defined callback function
     * in case a change in the list of connected devices is detected.
     *
     * This function can be called as frequently as desired to refresh the device list
     * and to make the application aware of hot-plug events.
     *
     * This asynchronous version exists only in JavaScript. It uses a callback instead
     * of a return value in order to avoid blocking Firefox JavaScript VM that does not
     * implement context switching during blocking I/O calls.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments: the caller-specific
     *         context object, the result code (YAPI.SUCCESS
     *         if the operation completes successfully) and the error
     *         message.
     * @param context : caller-specific object that is passed as-is to the callback function
     *
     * @return nothing : the result is provided to the callback.
     */
    function YAPI_UpdateDeviceList_async(callback, context)
    {
        // Rescan all hubs and update list of online devices
        var func_iter = function(ctx) {
            ctx.hubs[ctx.updidx].hubdev.refresh_async(function(ctx, retcode) {
                if(retcode != YAPI_SUCCESS) {
                    ctx.usercb(ctx.userctx, retcode, YAPI._lastErrorMsg);
                    return;
                }
                ctx.hubs[ctx.updidx].hubdev.requestAPI_async(function(ctx, yreq) {
                    if(yreq.errorType != YAPI_SUCCESS) {
                        ctx.usercb(ctx.userctx, yreq.errorType, yreq.errorMsg);
                        return;
                    }
                    var retcode = YAPI._updateDeviceList_process(ctx, yreq);
                    if(retcode != YAPI_SUCCESS) {
                        ctx.usercb(ctx.userctx, retcode, YAPI._lastErrorMsg);
                        return;
                    }
                    if(++ctx.updidx < ctx.hubs.length) {
                        ctx.iter(ctx);
                    } else {
                        ctx.usercb(ctx.userctx, YAPI_SUCCESS, 'no error');
                        return;
                    }
                }, ctx);
            }, ctx);
        };

        var ctx = this._updateDeviceList_init();
        if(ctx==null) return;
        ctx.usercb  = callback;
        ctx.userctx = context;
        ctx.iter    = func_iter;
        if(ctx.hubs.length == 0) {
            ctx.usercb(ctx.userctx, YAPI_SUCCESS, 'no error');
            return;
        }

        ctx.iter(ctx);
    }

    /**
     * Maintains the device-to-library communication channel.
     * If your program includes significant loops, you may want to include
     * a call to this function to make sure that the library takes care of
     * the information pushed by the modules on the communication channels.
     * This is not strictly necessary, but it may improve the reactivity
     * of the library for the following commands.
     *
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     *
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    function YAPI_HandleEvents(errmsg)
    {
        var nEvents = this._data_events.length;
        for(var i = 0; i < nEvents; i++) {
            var evt = this._data_events[i];
            if(typeof evt[1] == "string") {
                // event object is an advertised value
                evt[0]._invokeValueCallback(evt[1]);
            } else {
                // event object is an array of bytes (encoded timed report)
                var dev = this.getDevice(evt[0]._serial);
                if(dev) {
                    var report = evt[0]._decodeTimedReport(evt[1], 0, evt[2]);
                    evt[0]._invokeTimedReportCallback(report);
                }
            }
        }
        this._data_events = this._data_events.slice(nEvents);

        return YAPI_SUCCESS;
    }

    /**
     * Pauses the execution flow for a specified duration.
     * This function implements a passive waiting loop, meaning that it does not
     * consume CPU cycles significantly. The processor is left available for
     * other threads and processes. During the pause, the library nevertheless
     * reads from time to time information from the Yoctopuce modules by
     * calling yHandleEvents(), in order to stay up-to-date.
     *
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     *
     * @param ms_duration : an integer corresponding to the duration of the pause,
     *         in milliseconds.
     * @param errmsg : a string passed by reference to receive any error message.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure returns a negative error code.
     */
    function YAPI_Sleep(ms_duration, errmsg)
    {
        var end = this.GetTickCount() + ms_duration;
        do {
            this.HandleEvents(errmsg);
        } while(this.GetTickCount() < end);

        return YAPI_SUCCESS;
    }

    /**
     * Invoke the specified callback function after a given timeout.
     * This function behaves more or less like Javascript setTimeout,
     * but during the waiting time, it will call yHandleEvents
     * and yUpdateDeviceList periodically, in order to
     * keep the API up-to-date with current devices.
     *
     * @param callback : the function to call after the timeout occurs.
     *         On Microsoft Internet Explorer, the callback must
     *         be provided as a string to be evaluated.
     * @param ms_timeout : an integer corresponding to the duration of the
     *         timeout, in milliseconds.
     * @param args : additional arguments to be passed to the
     *         callback function can be provided, if needed
     *         (not supported on Microsoft Internet Explorer).
     *
     * @return YAPI.SUCCESS
     */
    function YAPI_SetTimeout(callback, ms_timeout, args)
    {
        var ctx = {
            usercb:   callback,
            userargs: args,
            endtime:  YAPI.GetTickCount()+ms_timeout,
            updevlist: true
        };
        this.HandleEvents();
        YAPI._forwardValues++;
        YAPI._setTimeout_internal(ctx);

        return YAPI_SUCCESS;
    }

    function YAPI_setTimeout_internal(ctx)
    {
        var nextcall = ctx.endtime - YAPI.GetTickCount();
        if(nextcall <= 0) {
            YAPI._forwardValues--;
            if(typeof ctx.usercb == "function") {
                ctx.usercb.apply(null, ctx.userargs);
            } else {
                eval(ctx.usercb);
            }
        } else if(ctx.updevlist) {
            ctx.updevlist = false;
            YAPI.UpdateDeviceList_async(YAPI._setTimeout_internal, ctx);
        } else {
            nextcall = ctx.endtime - YAPI.GetTickCount();
            if(nextcall > 100) nextcall = 100;
            // FOR BROWSERS ONLY:
            if(navigator.appName == 'Microsoft Internet Explorer') {
                var evalstr = "YAPI._setTimeout_internal({usercb:'";
                for (var i = 0; i < ctx.usercb.length; i++) {
                    var ascii = ctx.usercb.charCodeAt(i);
                    if ((ascii>=32)&&(ascii<=127)&&(ascii!=34)&&(ascii!=39)) {
                        evalstr += ctx.usercb.charAt(i);
                    } else {
                        var hex = ascii.toString(16).toUpperCase();
                        if (hex.length==1) hex = '0'+hex;
                        evalstr += String.fromCharCode(92) + 'x'+ hex;
                    }
                }
                evalstr += "',userargs:[],endtime:"+ctx.endtime+",updevlist:true})";
                setTimeout(evalstr, nextcall);
            } else {
                ctx.updevlist=true;
                setTimeout(YAPI._setTimeout_internal, nextcall, ctx);
            }
        }
    }

    /**
     * Returns the current value of a monotone millisecond-based time counter.
     * This counter can be used to compute delays in relation with
     * Yoctopuce devices, which also uses the millisecond as timebase.
     *
     * @return a long integer corresponding to the millisecond counter.
     */
    function YAPI_GetTickCount()
    {
        return +new Date();
    }

    /**
     * Checks if a given string is valid as logical name for a module or a function.
     * A valid logical name has a maximum of 19 characters, all among
     * A...Z, a...z, 0...9, _, and -.
     * If you try to configure a logical name with an incorrect string,
     * the invalid characters are ignored.
     *
     * @param name : a string containing the name to check.
     *
     * @return true if the name is valid, false otherwise.
     */
    function YAPI_CheckLogicalName(name)
    {
        if(name == "") return true;
        if(!name) return false;
        if(name.length > 19) return false;
        return /^[A-Za-z0-9_\-]*$/.test(name);
    }

    /**
     * Register a callback function, to be called each time
     * a device is plugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     *
     * @param arrivalCallback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    function YAPI_RegisterDeviceArrivalCallback(arrivalCallback)
    {
        this._arrivalCallback = arrivalCallback;
    }

    function YAPI_RegisterDeviceChangeCallback(changeCallback)
    {
        this._namechgCallback = changeCallback;
    }

    /**
     * Register a callback function, to be called each time
     * a device is unplugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     *
     * @param removalCallback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    function YAPI_RegisterDeviceRemovalCallback(removalCallback)
    {
        this._removalCallback = removalCallback;
    }

    // Register a new value calibration handler for a given calibration type
    //
    function YAPI_RegisterCalibrationHandler(calibrationType, calibrationHandler)
    {
        this._calibHandlers[calibrationType.toString()] = calibrationHandler;
    }

    // Standard value calibration handler (n-point linear error correction)
    //
    function YAPI_LinearCalibrationHandler(float_rawValue, int_calibType, arr_calibParams,
                                           arr_calibRawValues, arr_calibRefValues)
    {
        // calibration types n=1..10 and 11..20 are meant for linear calibration using n points
        var npt;
        var x   = arr_calibRawValues[0];
        var adj = arr_calibRefValues[0] - x;
        var i   = 0;

        if(int_calibType < YOCTO_CALIB_TYPE_OFS) {
            npt = Math.min(int_calibType % 10, arr_calibRawValues.length, arr_calibRefValues.length);
        } else {
            npt = arr_calibRefValues.length;
        }
        while(float_rawValue > arr_calibRawValues[i] && ++i < npt) {
            var x2   = x;
            var adj2 = adj;

            x   = arr_calibRawValues[i];
            adj = arr_calibRefValues[i] - x;

            if(float_rawValue < x && x > x2) {
                adj = adj2 + (adj - adj2) * (float_rawValue - x2) / (x - x2);
            }
        }
        return float_rawValue + adj;
    }

    // WPA preshared-key computation
    //
    function _initshaw(str_s, int_pad, int_xinit, _shaw)
    {
        var i, j = -1, k = 0;
        var n = str_s.length;

        for(i = 0; i < 64; i++) {
            var c = 0;
            if (i < n) {
                c = str_s.charCodeAt(i);
            } else if (int_pad != 0) {
                if (i == n + 3) c = int_pad;
                else if (i == n + 4) c = 0x80;
            }
            if (k == 0) {
                j++;
                _shaw[j] = 0;
                k = 32;
            }
            k -= 8;
            _shaw[j] |= (c << k);
        }
        if(int_pad != 0) {
            _shaw[15] = 8 * (64 + n + 4);
        }
        if(int_xinit != 0) {
            var xdw = (int_xinit << 16) | int_xinit;
            for (j = 0; j < 16; j++) {
                _shaw[j] ^= xdw;
            }
        }
    }

    function _itershaw(s, _shaw)
    {
        var a, b, c, d, e, t, k;

        a = s[0];
        b = s[1];
        c = s[2];
        d = s[3];
        e = s[4];
        for (k = 16; k < 80; k++) {
            t = _shaw[k - 3] ^ _shaw[k - 8] ^ _shaw[k - 14] ^ _shaw[k - 16];
            _shaw[k] = (t << 1) | (t >>> 31);
        }
        for (k = 0; k < 20; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x5A827999 + ((b & c) | ((~b) & d));
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 20; k < 40; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x6ED9EBA1 + (b^c^d);
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 40; k < 60; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x8F1BBCDC + ((b & c) | (b & d) | (c & d));
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 60; k < 80; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0xCA62C1D6 + (b^c^d);
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff;
        }
        _shaw[0] = (s[0] + a) & 0xffffffff;
        _shaw[1] = (s[1] + b) & 0xffffffff;
        _shaw[2] = (s[2] + c) & 0xffffffff;
        _shaw[3] = (s[3] + d) & 0xffffffff;
        _shaw[4] = (s[4] + e) & 0xffffffff;
    }

    /**
     * Compute the WPA Preshared key for a given SSID and passphrase
     *
     * @param ssid : the access point SSID
     * @param pass : the access point WPA/WPA2 passphrase
     *
     * @return an hexadecimal string for the preshared key
     */
    function YAPI_ComputePSK(ssid, pass)
    {
        var sha1_init = [ 0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0 ];
        var inner=[], outer=[], shau=[], res=[];
        var iter, pos, k, _shaw;

        // precompute part of sha used in the loops
        _shaw = new Array(80);
        _initshaw(pass, 0, 0x3636, _shaw);
        _itershaw(sha1_init, _shaw);
        for(k = 0; k < 5; k++) inner[k] = _shaw[k];
        _shaw = new Array(80);
        _initshaw(pass, 0, 0x5c5c, _shaw);
        _itershaw(sha1_init, _shaw);
        for(k = 0; k < 5; k++) outer[k] = _shaw[k];

        // prepare to compute first 20 bytes
        pos = 0;
        for(k = 0; k < 5; k++) shau[k] = 0;
        _shaw = new Array(80);
        _initshaw(ssid, 1, 0, _shaw);

        for(iter = 0; iter < 8192;) {
            _itershaw(inner, _shaw);
            _shaw[5] = 0x80000000;
            for (k = 6; k < 15; k++) {
                _shaw[k] = 0;
            }
            _shaw[15] = 8 * (64 + 20);
            _itershaw(outer, _shaw);
            shau[0] ^= _shaw[0];
            shau[1] ^= _shaw[1];
            shau[2] ^= _shaw[2];
            shau[3] ^= _shaw[3];
            shau[4] ^= _shaw[4];
            iter++;
            // after 4096 loops, move to 2nd half of sha1
            if((iter & 4095) == 0) {
                for(k = 0; k < 5 && pos < 32; k++) {
                    res[pos++] = (shau[k] >>> 24) & 0xff;
                    res[pos++] = (shau[k] >>> 16) & 0xff;
                    res[pos++] = (shau[k] >>> 8) & 0xff;
                    res[pos++] = shau[k] & 0xff;
                }
                if(iter == 4096) {
                    for(k = 0; k < 5; k++) shau[k] = 0;
                    _shaw = new Array(80);
                    _initshaw(ssid, 2, 0, _shaw);
                }
            }
        }
        var hex = '';
        for(k = 0; k < 32; k++) {
            hex += ('0'+Number(res[k]).toString(16)).slice(-2);
        }
        return hex;
    }

    _YAPI.prototype._throw                     = YAPI_throw;
    _YAPI.prototype._funcDev_internal          = YAPI_funcDev_internal;
    _YAPI.prototype._funcDev_async             = YAPI_funcDev_async;
    _YAPI.prototype._funcDev                   = YAPI_funcDev;
    _YAPI.prototype._preregisterHub_internal   = YAPI_preregisterHub_internal;
    _YAPI.prototype._updateDeviceList_init     = YAPI_updateDeviceList_init;
    _YAPI.prototype._updateDeviceList_process  = YAPI_updateDeviceList_process;
    _YAPI.prototype._updateDeviceList_internal = YAPI_updateDeviceList_internal;
    _YAPI.prototype._setTimeout_internal       = YAPI_setTimeout_internal;
    _YAPI.prototype._httpCallbackRequest       = YAPI_httpCallbackRequest;
    _YAPI.prototype._doubleToDecimal           = YAPI_doubleToDecimal;
    _YAPI.prototype._decimalToDouble           = YAPI_decimalToDouble;
    _YAPI.prototype._getCalibrationHandler     = YAPI_getCalibrationHandler;
    _YAPI.prototype._decodeWords               = YAPI_decodeWords;
    _YAPI.prototype._decodeFloats              = YAPI_decodeFloats;
    _YAPI.prototype._atoi                      = YAPI_atoi;
    _YAPI.prototype._bytesToHexStr             = YAPI_bytesToHexStr;
    _YAPI.prototype._hexStrToBin               = YAPI_hexStrToBin;

    // Internal functions
    _YAPI.prototype.getDevice             = YAPI_getDevice;
    _YAPI.prototype.reindexDevice         = YAPI_reindexDevice;
    _YAPI.prototype.forgetDevice          = YAPI_forgetDevice;
    _YAPI.prototype.resolveFunction       = YAPI_resolveFunction;
    _YAPI.prototype.getFriendlyNameFunction = YAPI_getFriendlyNameFunction;
    _YAPI.prototype.functionClass         = YAPI_functionClass;
    _YAPI.prototype.setFunction           = YAPI_setFunction;
    _YAPI.prototype.getFunction           = YAPI_getFunction;
    _YAPI.prototype.setFunctionValue      = YAPI_setFunctionValue;
    _YAPI.prototype.getFunctionValue      = YAPI_getFunctionValue;
    _YAPI.prototype.getFunctionBaseType   = YAPI_getFunctionBaseType;
    _YAPI.prototype.setTimedReport        = YAPI_setTimedReport;
    _YAPI.prototype.addValueEvent         = YAPI_addValueEvent;
    _YAPI.prototype.addTimedReportEvent   = YAPI_addTimedReportEvent;
    _YAPI.prototype.getFirstHardwareId    = YAPI_getFirstHardwareId;
    _YAPI.prototype.getNextHardwareId     = YAPI_getNextHardwareId;
    _YAPI.prototype.webSocketMsg          = YAPI_webSocketMsg;
    _YAPI.prototype.webSocketReq          = YAPI_webSocketReq;
    _YAPI.prototype.devRequest            = YAPI_devRequest;
    _YAPI.prototype.devRequest_async      = YAPI_devRequest_async;
    _YAPI.prototype.getHubSerialFrom      = YAPI_getHubSerialFrom;
    _YAPI.prototype.getSubDevicesFrom     = YAPI_getSubDevicesFrom;
    _YAPI.prototype.funcRequest           = YAPI_funcRequest;
    _YAPI.prototype.funcRequest_async     = YAPI_funcRequest_async;
    _YAPI.prototype.getHub                = YAPI_getHub;
    _YAPI.prototype.parseEvents           = YAPI_parseEvents;
    _YAPI.prototype.monitorEvents         = YAPI_monitorEvents;
    _YAPI.prototype.decodeNetFuncValV2    = YAPI_decodeNetFuncValV2;
    _YAPI.prototype.decodePubVal          = YAPI_decodePubVal;

    // Low-level function to query devices
    _YAPI.prototype.HTTPRequest           = YAPI_HTTPRequest;
    _YAPI.prototype.HTTPRequest_async     = YAPI_HTTPRequest_async;

//--- (generated code: YFunction return codes)
    _YAPI.prototype.SUCCESS               = 0;       // everything worked all right
    _YAPI.prototype.NOT_INITIALIZED       = -1;      // call yInitAPI() first !
    _YAPI.prototype.INVALID_ARGUMENT      = -2;      // one of the arguments passed to the function is invalid
    _YAPI.prototype.NOT_SUPPORTED         = -3;      // the operation attempted is (currently) not supported
    _YAPI.prototype.DEVICE_NOT_FOUND      = -4;      // the requested device is not reachable
    _YAPI.prototype.VERSION_MISMATCH      = -5;      // the device firmware is incompatible with this API version
    _YAPI.prototype.DEVICE_BUSY           = -6;      // the device is busy with another task and cannot answer
    _YAPI.prototype.TIMEOUT               = -7;      // the device took too long to provide an answer
    _YAPI.prototype.IO_ERROR              = -8;      // there was an I/O problem while talking to the device
    _YAPI.prototype.NO_MORE_DATA          = -9;      // there is no more data to read from
    _YAPI.prototype.EXHAUSTED             = -10;     // you have run out of a limited resource, check the documentation
    _YAPI.prototype.DOUBLE_ACCES          = -11;     // you have two process that try to access to the same device
    _YAPI.prototype.UNAUTHORIZED          = -12;     // unauthorized access to password-protected device
    _YAPI.prototype.RTC_NOT_READY         = -13;     // real-time clock has not been initialized (or time was lost)
    _YAPI.prototype.FILE_NOT_FOUND        = -14;     // the file is not found
    _YAPI.prototype.SSL_ERROR             = -15;     // Error reported by mbedSSL
    _YAPI.prototype.RFID_SOFT_ERROR       = -16;     // Recoverable error with RFID tag (eg. tag out of reach), check YRfidStatus for details
    _YAPI.prototype.RFID_HARD_ERROR       = -17;     // Serious RFID error (eg. write-protected, out-of-boundary), check YRfidStatus for details
    _YAPI.prototype.BUFFER_TOO_SMALL      = -18;     // The buffer provided is too small
    _YAPI.prototype.DNS_ERROR             = -19;     // Error during name resolutions (invalid hostname or dns communication error)
    _YAPI.prototype.SSL_UNK_CERT          = -20;     // The certificate is not correctly signed by the trusted CA
//--- (end of generated code: YFunction return codes)

    _YAPI.prototype.INVALID_INT           = YAPI_INVALID_INT;
    _YAPI.prototype.INVALID_UINT          = YAPI_INVALID_UINT;
    _YAPI.prototype.INVALID_LONG          = YAPI_INVALID_LONG;
    _YAPI.prototype.INVALID_DOUBLE        = YAPI_INVALID_DOUBLE;
    _YAPI.prototype.INVALID_STRING        = YAPI_INVALID_STRING;

    // yInitAPI constants (not really useful in JavaScript)
    _YAPI.prototype.DETECT_NONE           = 0;
    _YAPI.prototype.DETECT_USB            = 1;
    _YAPI.prototype.DETECT_NET            = 2;
    _YAPI.prototype.DETECT_ALL            = (this.DETECT_USB | this.DETECT_NET);

    // High-level functions with a public function interface
    _YAPI.prototype.GetAPIVersion         = YAPI_GetAPIVersion;
    _YAPI.prototype.InitAPI               = YAPI_InitAPI;
    _YAPI.prototype.FreeAPI               = YAPI_FreeAPI;
    _YAPI.prototype.DisableExceptions     = YAPI_DisableExceptions;
    _YAPI.prototype.EnableExceptions      = YAPI_EnableExceptions;
    _YAPI.prototype.RegisterHub           = YAPI_RegisterHub;
    _YAPI.prototype.RegisterHub_async     = YAPI_RegisterHub_async;
    _YAPI.prototype.PreregisterHub        = YAPI_PreregisterHub;
    _YAPI.prototype.UnregisterHub         = YAPI_UnregisterHub;
    _YAPI.prototype.UpdateDeviceList      = YAPI_UpdateDeviceList;
    _YAPI.prototype.UpdateDeviceList_async= YAPI_UpdateDeviceList_async;
    _YAPI.prototype.HandleEvents          = YAPI_HandleEvents;
    _YAPI.prototype.Sleep                 = YAPI_Sleep;
    _YAPI.prototype.SetTimeout            = YAPI_SetTimeout;
    _YAPI.prototype.GetTickCount          = YAPI_GetTickCount;
    _YAPI.prototype.CheckLogicalName      = YAPI_CheckLogicalName;
    _YAPI.prototype.RegisterDeviceArrivalCallback = YAPI_RegisterDeviceArrivalCallback;
    _YAPI.prototype.RegisterDeviceChangeCallback  = YAPI_RegisterDeviceChangeCallback;
    _YAPI.prototype.RegisterDeviceRemovalCallback = YAPI_RegisterDeviceRemovalCallback;
    _YAPI.prototype.RegisterCalibrationHandler    = YAPI_RegisterCalibrationHandler;
    _YAPI.prototype.LinearCalibrationHandler      = YAPI_LinearCalibrationHandler;
    _YAPI.prototype.ComputePSK                    = YAPI_ComputePSK;

    YAPI = new _YAPI();
    yAPI = YAPI;

    //--- (generated code: YFunction class start)
/**
 * YFunction Class: Common function interface
 *
 * This is the parent class for all public objects representing device functions documented in
 * the high-level programming API. This abstract class does all the real job, but without
 * knowledge of the specific function attributes.
 *
 * Instantiating a child class of YFunction does not cause any communication.
 * The instance simply keeps track of its function identifier, and will dynamically bind
 * to a matching device at the time it is really being used to read or set an attribute.
 * In order to allow true hot-plug replacement of one device by another, the binding stay
 * dynamic through the life of the object.
 *
 * The YFunction class implements a generic high-level cache for the attribute values of
 * the specified function, pre-parsed from the REST API string.
 */
//--- (end of generated code: YFunction class start)

    function _YFunction(str_func)
    {
        // private
        this._className                      = 'Function';
        this._func                           = str_func;
        this._lastErrorType                  = YAPI_SUCCESS;
        this._lastErrorMsg                   = "no error";
        this._dataStreams                    = {};
        this._userData                       = null;
        this._cache                          = {_expiration:0};
        //--- (generated code: YFunction constructor)
        this._logicalName                    = Y_LOGICALNAME_INVALID;      // Text
        this._advertisedValue                = Y_ADVERTISEDVALUE_INVALID;  // PubText
        this._valueCallbackFunction          = null;                       // YFunctionValueCallback
        this._cacheExpiration                = 0;                          // ulong
        this._serial                         = "";                         // str
        this._funId                          = "";                         // str
        this._hwId                           = "";                         // str
        //--- (end of generated code: YFunction constructor)
    }

    function YFunction_isReadOnly()
    {
        try {
            var serial = this.get_serialNumber();
            return YAPI.isReadOnly(serial);
        } catch (e) {
            return true;
        }
    }

    //--- (generated code: YFunction implementation)

    function YFunction_parseAttr(name, val, _super)
    {
        switch(name) {
        case "_expiration":
            this._cacheExpiration = val;
            return 1;
        case "logicalName":
            this._logicalName = val;
            return 1;
        case "advertisedValue":
            this._advertisedValue = val;
            return 1;
        }
        return 0;
    }

    /**
     * Returns the logical name of the function.
     *
     * @return a string corresponding to the logical name of the function
     *
     * On failure, throws an exception or returns YFunction.LOGICALNAME_INVALID.
     */
    function YFunction_get_logicalName()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LOGICALNAME_INVALID;
            }
        }
        res = this._logicalName;
        return res;
    }

    /**
     * Gets the logical name of the function.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YFunction object that invoked the callback
     *         - the result:a string corresponding to the logical name of the function
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YFunction.LOGICALNAME_INVALID.
     */
    function YFunction_get_logicalName_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LOGICALNAME_INVALID);
            } else {
                callback(context, obj, obj._logicalName);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the logical name of the function. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the logical name of the function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YFunction_set_logicalName(newval)
    {   var rest_val;
        if (!YAPI.CheckLogicalName(newval)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Invalid name :" + newval, YAPI_INVALID_ARGUMENT);
        }
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns a short string representing the current state of the function.
     *
     * @return a string corresponding to a short string representing the current state of the function
     *
     * On failure, throws an exception or returns YFunction.ADVERTISEDVALUE_INVALID.
     */
    function YFunction_get_advertisedValue()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ADVERTISEDVALUE_INVALID;
            }
        }
        res = this._advertisedValue;
        return res;
    }

    /**
     * Gets a short string representing the current state of the function.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YFunction object that invoked the callback
     *         - the result:a string corresponding to a short string representing the current state of the function
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YFunction.ADVERTISEDVALUE_INVALID.
     */
    function YFunction_get_advertisedValue_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ADVERTISEDVALUE_INVALID);
            } else {
                callback(context, obj, obj._advertisedValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YFunction_set_advertisedValue(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('advertisedValue',rest_val);
    }

    /**
     * Retrieves a function for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFunction.isOnline() to test if the function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the function, for instance
     *         MyDevice..
     *
     * @return a YFunction object allowing you to drive the function.
     */
    function YFunction_FindFunction(func)                       // class method
    {
        var obj;                    // YFunction;
        obj = YFunction._FindFromCache("Function", func);
        if (obj == null) {
            obj = new YFunction(func);
            YFunction._AddToCache("Function", func, obj);
        }
        return obj;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    function YFunction_registerValueCallback(callback)
    {
        var val;                    // str;
        if (callback != null) {
            YFunction._UpdateValueCallbackList(this, true);
        } else {
            YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackFunction = callback;
        // Immediately invoke value callback with current value
        if (callback != null && this.isOnline()) {
            val = this._advertisedValue;
            if (!(val == "")) {
                this._invokeValueCallback(val);
            }
        }
        return 0;
    }

    function YFunction_invokeValueCallback(value)
    {
        if (this._valueCallbackFunction != null) {
            this._valueCallbackFunction(this, value);
        } else {
        }
        return 0;
    }

    /**
     * Disables the propagation of every new advertised value to the parent hub.
     * You can use this function to save bandwidth and CPU on computers with limited
     * resources, or to prevent unwanted invocations of the HTTP callback.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YFunction_muteValueCallbacks()
    {
        return this.set_advertisedValue("SILENT");
    }

    /**
     * Re-enables the propagation of every new advertised value to the parent hub.
     * This function reverts the effect of a previous call to muteValueCallbacks().
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YFunction_unmuteValueCallbacks()
    {
        return this.set_advertisedValue("");
    }

    /**
     * Returns the current value of a single function attribute, as a text string, as quickly as
     * possible but without using the cached value.
     *
     * @param attrName : the name of the requested attribute
     *
     * @return a string with the value of the the attribute
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YFunction_loadAttribute(attrName)
    {
        var url;                    // str;
        var attrVal;                // bin;
        url = "api/"+this.get_functionId()+"/"+attrName;
        attrVal = this._download(url);
        return attrVal;
    }

    //cannot be generated for JS:
    //function YFunction_isReadOnly()

    /**
     * Returns the serial number of the module, as set by the factory.
     *
     * @return a string corresponding to the serial number of the module, as set by the factory.
     *
     * On failure, throws an exception or returns YFunction.SERIALNUMBER_INVALID.
     */
    function YFunction_get_serialNumber()
    {
        var m;                      // YModule;
        m = this.get_module();
        return m.get_serialNumber();
    }

    function YFunction_parserHelper()
    {
        return 0;
    }

    /**
     * comment from .yc definition
     */
    function YFunction_nextFunction()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YFunction.FindFunction(next_hwid);
    }

    /**
     * comment from .yc definition
     */
    function YFunction_FirstFunction()
    {
        var next_hwid = YAPI.getFirstHardwareId('Function');
        if(next_hwid == null) return null;
        return YFunction.FindFunction(next_hwid);
    }

    //--- (end of generated code: YFunction implementation)

    function YFunction_FindFromCache(className, func)           // class method
    {
        return YAPI.getFunction(className, func);
    }

    function YFunction_AddToCache(className, func, obj)         // class method
    {
        YAPI.setFunction(className, func, obj);
    }

    function YFunction_ClearCache()                             // class method
    {
        YAPI._init();
    }

    function YFunction_Subclass(func,cnst,meta,inst)            // class method
    {
        // This is a class method, so 'this' points to the class
        var k;

        // Copy class attributes and methods
        for(k in this) {
            func[k] = this[k];
        }
        // Copy prototype methods
        for(k in this.prototype) {
            func.prototype[k] = this.prototype[k];
        }
        // Keep a pointer to the parent class
        func.prototype._super = this.prototype;
        // Add constants to the class and to the prototype
        for(k in cnst) {
            func.prototype[k] = func[k] = cnst[k];
        }
        // Assign class methods
        for(k in meta) {
            func[k] = meta[k];
        }
        // Assign methods to the prototype
        for(k in inst) {
            func.prototype[k] = inst[k];
        }
        return func;
    }

    function YFunction_UpdateValueCallbackList(obj_func, bool_add) // class method
    {
        var index = YFunction._ValueCallbackList.indexOf(obj_func);
        if (bool_add) {
            obj_func.isOnline();
            if(index < 0) {
                YFunction._ValueCallbackList.push(obj_func);
            }
        } else if(index >= 0) {
            YFunction._ValueCallbackList.splice(index, 1);
        }
    }

    function YFunction_UpdateTimedReportCallbackList(obj_func, bool_add) // class method
    {
        var index = YFunction._TimedReportCallbackList.indexOf(obj_func);
        if (bool_add) {
            obj_func.isOnline();
            if(index < 0) {
                YFunction._TimedReportCallbackList.push(obj_func);
            }
        } else if(index >= 0) {
            YFunction._TimedReportCallbackList.splice(index, 1);
        }
    }

    /**
     * Returns a short text that describes unambiguously the instance of the function in the form
     * TYPE(NAME)=SERIAL&#46;FUNCTIONID.
     * More precisely,
     * TYPE       is the type of the function,
     * NAME       it the name used for the first access to the function,
     * SERIAL     is the serial number of the module if the module is connected or "unresolved", and
     * FUNCTIONID is  the hardware identifier of the function if the module is connected.
     * For example, this method returns Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1 if the
     * module is already connected or Relay(BadCustomeName.relay1)=unresolved if the module has
     * not yet been connected. This method does not trigger any USB or TCP transaction and can therefore be used in
     * a debugger.
     *
     * @return a string that describes the function
     *         (ex: Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1)
     */
    function YFunction_describe()
    {
        if(this._hwId != "") {
            return this._className+"("+this._func+")="+this._hwId;
        }
        var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS && resolve.result != this._func) {
            return this._className+"("+this._func+")=unresolved";
        }
        return this._className+"("+this._func+")="+resolve.result;
    }

    /**
     * Returns the unique hardware identifier of the function in the form SERIAL.FUNCTIONID.
     * The unique hardware identifier is composed of the device serial
     * number and of the hardware identifier of the function (for example RELAYLO1-123456.relay1).
     *
     * @return a string that uniquely identifies the function (ex: RELAYLO1-123456.relay1)
     *
     * On failure, throws an exception or returns  YFunction.HARDWAREID_INVALID.
     */
    function YFunction_get_hardwareId()
    {
        if(this._hwId != "") {
            return this._hwId;
        }
        var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            this.isOnline();
            resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, Y_HARDWAREID_INVALID);
            }
        }
        return resolve.result;
    }

    /**
     * Returns the hardware identifier of the function, without reference to the module. For example
     * relay1
     *
     * @return a string that identifies the function (ex: relay1)
     *
     * On failure, throws an exception or returns  YFunction.FUNCTIONID_INVALID.
     */
    function YFunction_get_functionId()
    {
        if(this._funId != "") {
            return this._funId;
        }
        var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            this.isOnline();
            resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, Y_FUNCTIONID_INVALID);
            }
        }
        var pos =resolve.result.indexOf(".");
        return resolve.result.substr(pos+1);
    }



    /**
     * Returns a global identifier of the function in the format MODULE_NAME&#46;FUNCTION_NAME.
     * The returned string uses the logical names of the module and of the function if they are defined,
     * otherwise the serial number of the module and the hardware identifier of the function
     * (for example: MyCustomName.relay1)
     *
     * @return a string that uniquely identifies the function using logical names
     *         (ex: MyCustomName.relay1)
     *
     * On failure, throws an exception or returns  YFunction.FRIENDLYNAME_INVALID.
     */
    function YFunction_get_friendlyName()
    {
        var resolve = YAPI.getFriendlyNameFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            this.isOnline();
            resolve = YAPI.getFriendlyNameFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, Y_FRIENDLYNAME_INVALID);
            }
        }
        return resolve.result;
    }


    // Store and parse a an API request for current function
    //
    function YFunction_parse(yreq, msValidity)
    {
        // save the whole structure for backward-compatibility
        yreq.result["_expiration"] = YAPI.GetTickCount() + msValidity;
        this._serial = yreq.deviceid;
        this._funId  = yreq.functionid;
        this._hwId   = yreq.hwid;
        this._cache  = yreq.result;
        // process each attribute in turn for class-oriented processing
        for(var key in yreq.result) {
            this._parseAttr(key, yreq.result[key], this._super);
        }
        this._parserHelper();
    }

    // Helper for the VirtualHub (backward-compatible)
    function YFunction_g(str_attr)
    {
        this._parseAttr(str_attr,this._getAttr(str_attr),this._super);
        return this['_'+str_attr];
    }

    // Return the value of an attribute from function cache, after reloading it from device if needed
    // Note: the function cache is a typed (parsed) cache, contrarily to the agnostic device cache
    function YFunction_getAttr(str_attr)
    {
        if(this._cacheExpiration <= YAPI.GetTickCount()) {
            // no valid cached value, reload from device
            if(this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) return null;
        }
        if(typeof this._cache[str_attr] == "undefined") {
            this._throw(YAPI_VERSION_MISMATCH, "No such attribute "+str_attr+" in function", null);
        }
        return this._cache[str_attr];
    }

    // Return the value of an attribute from function cache, after loading it from device if never loaded
    function YFunction_getFixedAttr(str_attr)
    {
        if(this._cacheExpiration == 0) {
            // no cached value, load from device
            if(this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) return null;
        }
        if(typeof this._cache[str_attr] == "undefined") {
            this._throw(YAPI_VERSION_MISMATCH, "No such attribute "+str_attr+" in function", null);
        }
        return this._cache[str_attr];
    }

    // Return the value of an attribute from function cache, after reloading it from device if needed.
    //
    // This is the asynchronous version, that uses a callback instead of a return value.
    function YFunction_getAttr_async(str_attr, func_callback, obj_context)
    {
        if(this._cacheExpiration <= YAPI.GetTickCount()) {
            // no valid cached value, reload from device
            this.load_async(YAPI.defaultCacheValidity,
                            function(params, obj, retval) {
                                if(retval != YAPI_SUCCESS) {
                                    params.cb(params.ctx, obj, retval);
                                    return;
                                }
                                if(typeof obj._cache[params.attr] == "undefined") {
                                    obj._throw(YAPI_VERSION_MISMATCH, "No such attribute "+params.attr+" in function", null);
                                }
                                params.cb(params.ctx, obj, obj._cache[params.attr]);
                            },
                            {attr:str_attr, cb:func_callback, ctx:obj_context});
            return;
        }
        func_callback(obj_context, this, this._cache[str_attr]);
    }


    function YFunction_escapeAttr(str_newval)
    {
        return escape(str_newval).replace(/[+]/g, '%2B')
                        .replace(/%20/g, '+').replace(/%21/g, '!')
                        .replace(/%24/g, '$')
                        .replace(/%27/g, "'").replace(/%28/g, '(').replace(/%29/g, ')')
                        .replace(/%2[cC]/g, ',').replace(/%2[fF]/g, '/')
                        .replace(/%3[aA]/g, ':').replace(/%3[bB]/g, ';').replace(/%3[fF]/g, '?')
                        .replace(/%5[bB]/g, '[').replace(/%5[dD]/g, ']');
    }


    // Change the value of an attribute on a device, and invalidate the cache
    function YFunction_setAttr(str_attr, str_newval)
    {
        if(str_newval == undefined) {
            return this._throw(YAPI_INVALID_ARGUMENT, "Undefined value to set for attribute "+str_attr, null);
        }
        var attrname = encodeURIComponent(str_attr);
        var attrval = this._escapeAttr(str_newval);
        // FOR BROWSERS ONLY: add &. to use a persistant connection (would not work
        //                    on node since the XMLHttpRequest package is limited)
        var extra = "/"+attrname+"?"+attrname+"="+attrval+"&.";
        if(this._cacheExpiration != 0) {
            this._cacheExpiration = YAPI.GetTickCount();
            this._cache._expiration = this._cacheExpiration;
        }
        YAPI.funcRequest_async(this._className, this._func, extra, null);

        return YAPI_SUCCESS;
    }

    // Execute an arbitrary HTTP GET request on the device and return the binary content
    //
    function YFunction_download(str_path)
    {
        // get the device serial number
        var devid = this._serial;
        if(devid == "") {
            devid = this.module().get_serialNumber();
        }
        if(devid == Y_SERIALNUMBER_INVALID) {
            return '';
        }
        var yreq = YAPI.devRequest(devid, "GET /"+str_path);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, '');
        }
        return yreq.result;
    }

    // Execute an arbitrary HTTP GET request on the device and return the binary content
    //
    // This asynchronous version exists only in Javascript. It uses a callback instead
    // of a return value in order to avoid blocking Firefox javascript VM that does not
    // implement context switching during blocking I/O calls. See the documentation
    // section on asynchronous Javascript calls for more details.
    //
    // @param msValidity : an integer corresponding to the validity of the loaded
    //         function parameters, in milliseconds
    // @param callback : callback function that is invoked when the result is known.
    //         The callback function  receives three arguments: the caller-specific
    //         context object, the receiving function object and the downloaded data
    // @param context : caller-specific object that is passed as-is to the callback function
    //
    // @return nothing : the result is provided to the callback.
    //
    function YFunction_download_async(str_path, func_callback, obj_context)
    {
        // get the device serial number
        var devid = this._serial;
        if(devid == "") {
            devid = this.module().get_serialNumber();
        }
        if(devid == Y_SERIALNUMBER_INVALID) {
            if(params.cb) params.cb(params.ctx, params.obj, null);
        } else {
            YAPI.devRequest_async(devid, "GET /"+str_path, "",
                                  function(params, yreq) {
                                      if(yreq.errorType != YAPI_SUCCESS) {
                                          params.obj._throw(yreq.errorType, yreq.errorMsg, null);
                                          if(params.cb) params.cb(params.ctx, params.obj, null);
                                          return;
                                      }
                                      if(params.cb) params.cb(params.ctx, params.obj, yreq.result);
                                  },
                                  {obj:this, cb:func_callback, ctx:obj_context});
        }
    }

    // Upload a file to the filesystem, to the specified full path name.
    // If a file already exists with the same path name, its content is overwritten.
    //
    function YFunction_upload_async(str_path, bin_content, func_callback, obj_context)
    {
        // get the device serial number
        var devid = this._serial;
        if(devid == "") {
            devid = this.module().get_serialNumber();
        }
        if(devid == Y_SERIALNUMBER_INVALID) {
            return this.get_errorType();
        }
        var httpreq = 'POST /upload.html';
        var len = bin_content.length;
        // FOR BROWSERS ONLY:
        var body, i;
        if(typeof FormData == "undefined") {
            // fallback to sending a string body for non-HTML5 browsers
            var boundary;
            body = 'Content-Disposition: form-data; name="'+str_path+'"; filename="api"\r\n'+
                   'Content-Type: application/octet-stream\r\n'+
                   'Content-Transfer-Encoding: binary\r\n\r\n';
            if(typeof bin_content == 'string' || bin_content instanceof String) {
                body += bin_content;
            } else {
                for (i = 0; i < len; i++) {
                    // Note: when FormData is not available, we cannot send
                    //       non-ASCII characters... sorry
                    body += String.fromCharCode(bin_content[i] & 0x7f);
                }
            }
            do {
                boundary = "Zz"+Math.floor(Math.random() * 0xffffff).toString(16)+"zZ";
            } while(body.indexOf(boundary) >= 0);
            body = "--"+boundary+"\r\n"+body+"\r\n--"+boundary+"--\r\n";
        } else {
            // convert to Uint8Array if needed
            if(typeof bin_content == 'string' || bin_content instanceof String ||
               bin_content instanceof Array) {
                if(typeof bin_content == 'string' || bin_content instanceof String) {
                    var u8 = new Uint8Array(len);
                    for (i = 0; i < len; i++) {
                        u8[i] = bin_content.charCodeAt(i);
                    }
                    bin_content = u8;
                } else {
                    bin_content = new Uint8Array(bin_content);
                }
            }
            // convert Uint8Array to Blob if needed
            if(bin_content instanceof Uint8Array) {
                try {
                    bin_content = new Blob([bin_content], {type: "application/octet-binary"});
                } catch(e) {
                    window.BlobBuilder = window.BlobBuilder ||
                                         window.WebKitBlobBuilder ||
                                         window.MozBlobBuilder ||
                                         window.MSBlobBuilder;
                    if(e.name == 'TypeError' && window.BlobBuilder){
                        var bb = new BlobBuilder();
                        bb.append([bin_content.buffer]);
                        bin_content = bb.getBlob("application/octet-binary");
                    } else {
                        try {
                            bin_content = new Blob([bin_content.buffer], {type: "application/octet-binary"});
                        } catch(e) {
                            return this._throw(YAPI_NOT_SUPPORTED,
                                               "Blob constructor is not supported by this browser",
                                               YAPI_NOT_SUPPORTED);
                        }
                    }
                }
            }
            // else assume content is already a Blob, a File, etc
            body = new FormData();
            body.append(str_path, bin_content);
        }
        YAPI.devRequest_async(devid, httpreq, body,
                              function(params, yreq) {
                                  if(yreq.errorType != YAPI_SUCCESS) {
                                      params.obj._throw(yreq.errorType, yreq.errorMsg, null);
                                      if(params.cb) params.cb(params.ctx, params.obj, null);
                                      return;
                                  }
                                  if(params.cb) params.cb(params.ctx, params.obj, yreq.result);
                              },
                              {obj:this, cb:func_callback, ctx:obj_context});
        return YAPI_SUCCESS;
    }

    // Upload a file to the filesystem, to the specified full path name.
    // If a file already exists with the same path name, its content is overwritten.
    // This version is actually asynchronous, since this is the default behaviour
    // like for all set_* functions
    //
    function YFunction_upload(str_path, bin_content)
    {
        this._upload_async(str_path, bin_content, function(ctx,obj,res){}, null);
        return YAPI_SUCCESS;
    }

    /**
     * Waits for all pending asynchronous commands on the module to complete, and invoke
     * the user-provided callback function. The callback function can therefore freely
     * issue synchronous or asynchronous commands, without risking to block the
     * JavaScript VM.
     *
     * @param callback : callback function that is invoked when all pending commands on
     *         the module are completed.
     *         The callback function receives two arguments: the caller-specific
     *         context object and the receiving function object.
     * @param context : caller-specific object that is passed as-is to the callback function
     *
     * @return nothing.
     */
    function YFunction_wait_async(callback, context)
    {
        // get the device serial number
        var devid = this._serial;
        if(devid == "") {
            devid = this.module().get_serialNumber();
        }
        if(devid == Y_SERIALNUMBER_INVALID) {
            callback(context, this);
            return YAPI_SUCCESS;
        }
        var lockdev = YAPI.getDevice(devid);
        if(lockdev == null || (lockdev._busy == 0 && lockdev._pendingQueries.length == 0)) {
            // no pending callback
            callback(context, this);
        } else {
            lockdev._pendingQueries.push({cb:callback,obj:this,ctx:context});
        }
        return YAPI_SUCCESS;
    }

    // Get a value from a JSON buffer
    //
    function YFunction_json_get_key(bin_jsonbuff, str_key)
    {
        var loadval = JSON.parse(bin_jsonbuff);
        if(typeof loadval[str_key] != "undefined") {
            return loadval[str_key];
        }
        return "";
    }

    // Get a string from a JSON buffer
    //
    function YFunction_json_get_string(bin_jsonbuff)
    {
        return JSON.parse(bin_jsonbuff);
    }

    // Get an array of strings from a JSON buffer
    //
    function YFunction_json_get_array(bin_jsonbuff)
    {
        var loadval = JSON.parse(bin_jsonbuff, true);
        var res = new Array();
        for(var idx in loadval) {
            if(idx=='indexOf') continue; // IE8 Don'tEnum bug
            res.push(JSON.stringify(loadval[idx]));
        }
        return res;
    }

    function YFunction_get_json_path(str_json, str_path)
    {
        var json = JSON.parse(str_json);
        var paths = str_path.split('|');
        for (var i = 0; i < paths.length; i++) {
            var tmp = paths[i];
            json = json[tmp];
            if (json == undefined) {
                return "";
            }
        }
        return JSON.stringify(json);

    }

    function YFunction_decode_json_string(str_json)
    {
        return JSON.parse(str_json);
    }

    // Method used to cache DataStream objects (new DataLogger)
    //
    function YFunction_findDataStream(obj_dataset, str_def)
    {
        var key = obj_dataset.get_functionId()+":"+str_def;
        if(this._dataStreams[key])
            return this._dataStreams[key];

        var newDataStream = new YDataStream(this, obj_dataset, YAPI._decodeWords(str_def));
        this._dataStreams[key] = newDataStream;
        return newDataStream;
    }

    // Method used to clear cache of DataStream object (undocumented)
    function YFunction_clearDataStreamCache()
    {
        this._dataStreams = {};
    }

    /**
     * Checks if the function is currently reachable, without raising any error.
     * If there is a cached value for the function in cache, that has not yet
     * expired, the device is considered reachable.
     * No exception is raised if there is an error while trying to contact the
     * device hosting the function.
     *
     * @return true if the function can be reached, and false otherwise
     */
    function YFunction_isOnline()
    {
        // A valid value in cache means that the device is online
        if(this._cacheExpiration > YAPI.GetTickCount()) return true;

        // Check that the function is available without throwing exceptions
        var yreq = YAPI.funcRequest(this._className, this._func, "", YAPI.defaultCacheValidity);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(yreq.errorType == YAPI_DEVICE_BUSY) {
                return true;
            } else {
                return false;
            }
        }
        // save result in cache anyway
        this._parse(yreq, YAPI.defaultCacheValidity);

        return true;
    }

    /**
     * Checks if the function is currently reachable, without raising any error (asynchronous version).
     * If there is a cached value for the function in cache, that has not yet
     * expired, the device is considered reachable.
     * No exception is raised if there is an error while trying to contact the
     * device hosting the requested function.
     *
     * This asynchronous version exists only in Javascript. It uses a callback instead
     * of a return value in order to avoid blocking the Javascript virtual machine.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments: the caller-specific
     *         context object, the receiving function object and the boolean result
     * @param context : caller-specific object that is passed as-is to the callback function
     *
     * @return nothing : the result is provided to the callback.
     */
    function YFunction_isOnline_async(callback, context)
    {
        // A valid value in cache means that the device is online
        if(this._cacheExpiration > YAPI.GetTickCount()) {
            callback(context, this, true);
            return;
        }

        // Check that the function is available without throwing exceptions
        YAPI.funcRequest_async(this._className, this._func, "",
                               function(params, yreq) {
                                   if(yreq.errorType != YAPI_SUCCESS) {
                                       params.cb(params.ctx, params.obj, false);
                                       return;
                                   }
                                   // save result in cache anyway
                                   params.obj._parse(yreq, YAPI.defaultCacheValidity);
                                   params.cb(params.ctx, params.obj, true);
                               },
                               {obj:this, cb:callback, ctx:context});
    }

    /**
     * Returns the numerical error code of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return a number corresponding to the code of the latest error that occurred while
     *         using the function object
     */
    function YFunction_get_errorType()
    {
        return this._lastErrorType;
    }

    /**
     * Returns the error message of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return a string corresponding to the latest error message that occured while
     *         using the function object
     */
    function YFunction_get_errorMessage()
    {
        return this._lastErrorMsg;
    }

    /**
     * Preloads the function cache with a specified validity duration.
     * By default, whenever accessing a device, all function attributes
     * are kept in cache for the standard duration (5 ms). This method can be
     * used to temporarily mark the cache as valid for a longer period, in order
     * to reduce network traffic for instance.
     *
     * @param msValidity : an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YFunction_load(msValidity)
    {
        var yreq = YAPI.funcRequest(this._className, this._func, "", msValidity);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        this._parse(yreq, msValidity);

        return YAPI_SUCCESS;
    }

     /**
      * Invalidates the cache. Invalidates the cache of the function attributes. Forces the
      * next call to get_xxx() or loadxxx() to use values that come from the device.
      *
      * @noreturn
      */
    function YFunction_clearCache()
    {

        var devreq = YAPI._funcDev(this._className, this._func);
        if(devreq.errorType != YAPI_SUCCESS) {
            return;
        }
        devreq.result.device.dropCache();
        if (this._cacheExpiration > 0) {
            this._cacheExpiration = YAPI.GetTickCount();
        }
    }

    /**
     * Preloads the function cache with a specified validity duration (asynchronous version).
     * By default, whenever accessing a device, all function attributes
     * are kept in cache for the standard duration (5 ms). This method can be
     * used to temporarily mark the cache as valid for a longer period, in order
     * to reduce network traffic for instance.
     *
     * This asynchronous version exists only in JavaScript. It uses a callback instead
     * of a return value in order to avoid blocking the JavaScript virtual machine.
     *
     * @param msValidity : an integer corresponding to the validity of the loaded
     *         function parameters, in milliseconds
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function  receives three arguments: the caller-specific
     *         context object, the receiving function object and the error code
     *         (or YAPI.SUCCESS)
     * @param context : caller-specific object that is passed as-is to the callback function
     *
     * @return nothing : the result is provided to the callback.
     */
    function YFunction_load_async(msValidity, callback, context)
    {
        YAPI.funcRequest_async(this._className, this._func, "",
                               function(params, yreq) {
                                   if(yreq.errorType != YAPI_SUCCESS) {
                                       params.obj._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
                                       params.cb(params.ctx, params.obj, yreq.errorType);
                                       return;
                                   }
                                   params.obj._parse(yreq, msValidity);
                                   params.cb(params.ctx, params.obj, YAPI_SUCCESS);
                               },
                               {obj:this, cb:callback, ctx:context});
    }

    /**
     * Gets the YModule object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModule is not shown as on-line.
     *
     * @return an instance of YModule
     */
    function YFunction_get_module()
    {
        // try to resolve the function name to a device id without query
        if(this._serial != "") {
            return yFindModule(this._serial + ".module");
        }
        var hwid = this._func;
        var resolve;
        if(hwid.indexOf(".") < 0) {
            resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType == YAPI_SUCCESS) hwid = resolve.result;
        }
        var dotidx = hwid.indexOf(".");
        if(dotidx >= 0) {
            // resolution worked
            return yFindModule(hwid.substr(0, dotidx) + ".module");
        }

        // device not resolved for now, force a communication for a last chance resolution
        if(this.load(YAPI.defaultCacheValidity) == YAPI_SUCCESS) {
            resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.result != undefined) hwid = resolve.result;
        }
        dotidx = hwid.indexOf(".");
        if(dotidx >= 0) {
            // resolution worked
            return yFindModule(hwid.substr(0, dotidx) + ".module");
        }
        // return a true yFindModule object even if it is not a module valid for communicating
        return yFindModule("module_of_"+this.className+"_"+this._func);
    }

    /**
     * Gets the YModule object for the device on which the function is located (asynchronous version).
     * If the function cannot be located on any module, the returned YModule object does not show as on-line.
     *
     * This asynchronous version exists only in JavaScript. It uses a callback instead
     * of a return value in order to avoid blocking Firefox JavaScript VM that does not
     * implement context switching during blocking I/O calls. See the documentation
     * section on asynchronous JavasSript calls for more details.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments: the caller-specific
     *         context object, the receiving function object and the requested
     *         YModule object
     * @param context : caller-specific object that is passed as-is to the callback function
     *
     * @return nothing : the result is provided to the callback.
     */
    function YFunction_get_module_async(callback, context)
    {
        // try to resolve the function name to a device id without query
        if(this._serial != "") {
            callback(context, this, yFindModule(this._serial + ".module"));
            return;
        }
        var hwid = this._func;
        if(hwid.indexOf(".") < 0) {
            var resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) hwid = resolve.result;
        }
        var dotidx = hwid.indexOf(".");
        if(dotidx >= 0) {
            // resolution worked
            callback(context, this, yFindModule(hwid.substr(0, dotidx) + ".module"));
            return;
        }

        // device not resolved for now, force a communication for a last chance resolution
        this.load_async(YAPI.defaultCacheValidity,
                        function(params, obj, retval) {
                            var hwid = obj._func;
                            if(retval == YAPI_SUCCESS) {
                                var resolve = YAPI.resolveFunction(obj._className, obj._func);
                                if(resolve.result != undefined) hwid = resolve.result;
                            }
                            var dotidx = hwid.indexOf(".");
                            if(dotidx >= 0) {
                                // resolution worked
                                params.cb(params.ctx, obj, yFindModule(hwid.substr(0, dotidx) + ".module"));
                            } else {
                                // return a true yFindModule object even if it is not a module valid for communicating
                                params.cb(params.ctx, obj, yFindModule("module_of_"+this.className+"_"+this._func));
                            }
                        },
                        {cb:callback, ctx:context});
    }


    /**
     * Returns a unique identifier of type YFUN_DESCR corresponding to the function.
     * This identifier can be used to test if two instances of YFunction reference the same
     * physical function on the same physical device.
     *
     * @return an identifier of type YFUN_DESCR.
     *
     * If the function has never been contacted, the returned value is Y$CLASSNAME$.FUNCTIONDESCRIPTOR_INVALID.
     */
    function YFunction_get_functionDescriptor()
    {
        // try to resolve the function name to a device id without query
        if(this._hwId != "") {
            return this._hwId;
        }
        var hwid = this._func;
        if(hwid.indexOf(".") < 0) {
            var resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) hwid = resolve.result;
        }
        var dotidx = hwid.indexOf(".");
        if(dotidx >= 0) {
            return hwid;
        }
        return Y_FUNCTIONDESCRIPTOR_INVALID;
    }

    /**
     * Returns the value of the userData attribute, as previously stored using method
     * set_userData.
     * This attribute is never touched directly by the API, and is at disposal of the caller to
     * store a context.
     *
     * @return the object stored previously by the caller.
     */
    function YFunction_get_userData()
    {
        return this._userData;
    }

    /**
     * Stores a user context provided as argument in the userData attribute of the function.
     * This attribute is never touched by the API, and is at disposal of the caller to store a context.
     *
     * @param data : any kind of object to be stored
     * @noreturn
     */
    function YFunction_set_userData(data)
    {
        this._userData = data;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * This asynchronous version exists only in Javascript. It will use an asynchronous call to perform the
     * initial load of the advertised value in order to call the callback for the very first time.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    function YFunction_registerValueCallback_async(callback)
    {
        this._valueCallbackFunction = callback;
        if(callback != undefined) {
            this.isOnline_async(function(obj_ctx, obj_func, result) {
                if(result) {
                    var newval = obj_func.get_advertisedValue();
                    if(newval != "" && newval != "!INVALID!") {
                        callback(obj_func, newval);
                    }
                }
            }, null);
        }
    }

    //--- (generated code: YFunction initialization)
    YFunction = _YFunction;
    // Constants
    YFunction.FUNCTIONDESCRIPTOR_INVALID            = YAPI_INVALID_STRING;
    YFunction.prototype.FUNCTIONDESCRIPTOR_INVALID  = YAPI_INVALID_STRING;
    YFunction.HARDWAREID_INVALID                    = YAPI_INVALID_STRING;
    YFunction.prototype.HARDWAREID_INVALID          = YAPI_INVALID_STRING;
    YFunction.FUNCTIONID_INVALID                    = YAPI_INVALID_STRING;
    YFunction.prototype.FUNCTIONID_INVALID          = YAPI_INVALID_STRING;
    YFunction.FRIENDLYNAME_INVALID                  = YAPI_INVALID_STRING;
    YFunction.prototype.FRIENDLYNAME_INVALID        = YAPI_INVALID_STRING;
    YFunction.LOGICALNAME_INVALID                   = YAPI_INVALID_STRING;
    YFunction.prototype.LOGICALNAME_INVALID         = YAPI_INVALID_STRING;
    YFunction.ADVERTISEDVALUE_INVALID               = YAPI_INVALID_STRING;
    YFunction.prototype.ADVERTISEDVALUE_INVALID     = YAPI_INVALID_STRING;
    // Class methods
    YFunction.FindFunction                          = YFunction_FindFunction;
    YFunction.FirstFunction                         = YFunction_FirstFunction;
    // Methods
    YFunction.prototype.get_logicalName             = YFunction_get_logicalName;
    YFunction.prototype.logicalName                 = YFunction_get_logicalName;
    YFunction.prototype.get_logicalName_async       = YFunction_get_logicalName_async;
    YFunction.prototype.logicalName_async           = YFunction_get_logicalName_async;
    YFunction.prototype.set_logicalName             = YFunction_set_logicalName;
    YFunction.prototype.setLogicalName              = YFunction_set_logicalName;
    YFunction.prototype.get_advertisedValue         = YFunction_get_advertisedValue;
    YFunction.prototype.advertisedValue             = YFunction_get_advertisedValue;
    YFunction.prototype.get_advertisedValue_async   = YFunction_get_advertisedValue_async;
    YFunction.prototype.advertisedValue_async       = YFunction_get_advertisedValue_async;
    YFunction.prototype.set_advertisedValue         = YFunction_set_advertisedValue;
    YFunction.prototype.setAdvertisedValue          = YFunction_set_advertisedValue;
    YFunction.prototype.registerValueCallback       = YFunction_registerValueCallback;
    YFunction.prototype._invokeValueCallback        = YFunction_invokeValueCallback;
    YFunction.prototype.muteValueCallbacks          = YFunction_muteValueCallbacks;
    YFunction.prototype.unmuteValueCallbacks        = YFunction_unmuteValueCallbacks;
    YFunction.prototype.loadAttribute               = YFunction_loadAttribute;
    YFunction.prototype.isReadOnly                  = YFunction_isReadOnly;
    YFunction.prototype.get_serialNumber            = YFunction_get_serialNumber;
    YFunction.prototype.serialNumber                = YFunction_get_serialNumber;
    YFunction.prototype._parserHelper               = YFunction_parserHelper;
    YFunction.prototype.nextFunction                = YFunction_nextFunction;
    YFunction.prototype._parseAttr                  = YFunction_parseAttr;
    //--- (end of generated code: YFunction initialization)
    YFunction._FindFromCache                        = YFunction_FindFromCache;
    YFunction._AddToCache                           = YFunction_AddToCache;
    YFunction._ClearCache                           = YFunction_ClearCache;
    YFunction._Subclass                             = YFunction_Subclass;
    YFunction._UpdateValueCallbackList              = YFunction_UpdateValueCallbackList;
    YFunction._UpdateTimedReportCallbackList        = YFunction_UpdateTimedReportCallbackList;
    YFunction._ValueCallbackList                    = [];
    YFunction._TimedReportCallbackList              = [];
    YFunction.prototype._throw                      = YAPI_throw;
    YFunction.prototype._parse                      = YFunction_parse;
    YFunction.prototype._getAttr                    = YFunction_getAttr;
    YFunction.prototype._g                          = YFunction_g;
    YFunction.prototype._getFixedAttr               = YFunction_getFixedAttr;
    YFunction.prototype._getAttr_async              = YFunction_getAttr_async;
    YFunction.prototype._escapeAttr                 = YFunction_escapeAttr;
    YFunction.prototype._setAttr                    = YFunction_setAttr;
    YFunction.prototype._download                   = YFunction_download;
    YFunction.prototype._download_async             = YFunction_download_async;
    YFunction.prototype._upload                     = YFunction_upload;
    YFunction.prototype._upload_async               = YFunction_upload_async;
    YFunction.prototype._json_get_key               = YFunction_json_get_key;
    YFunction.prototype._json_get_string            = YFunction_json_get_string;
    YFunction.prototype._json_get_array             = YFunction_json_get_array;
    YFunction.prototype._get_json_path              = YFunction_get_json_path;
    YFunction.prototype._decode_json_string         = YFunction_decode_json_string;
    YFunction.prototype._findDataStream             = YFunction_findDataStream;
    YFunction.prototype._clearDataStreamCache       = YFunction_clearDataStreamCache;
    YFunction.prototype.describe                    = YFunction_describe;
    YFunction.prototype.isOnline                    = YFunction_isOnline;
    YFunction.prototype.isOnline_async              = YFunction_isOnline_async;
    YFunction.prototype.get_errorType               = YFunction_get_errorType;
    YFunction.prototype.errorType                   = YFunction_get_errorType;
    YFunction.prototype.errType                     = YFunction_get_errorType;
    YFunction.prototype.get_errorMessage            = YFunction_get_errorMessage;
    YFunction.prototype.errorMessage                = YFunction_get_errorMessage;
    YFunction.prototype.errMessage                  = YFunction_get_errorMessage;
    YFunction.prototype.load                        = YFunction_load;
    YFunction.prototype.load_async                  = YFunction_load_async;
    YFunction.prototype.clearCache                  = YFunction_clearCache;
    YFunction.prototype.get_module                  = YFunction_get_module;
    YFunction.prototype.module                      = YFunction_get_module;
    YFunction.prototype.get_module_async            = YFunction_get_module_async;
    YFunction.prototype.module_async                = YFunction_get_module_async;
    YFunction.prototype.get_functionDescriptor      = YFunction_get_functionDescriptor;
    YFunction.prototype.functionDescriptor          = YFunction_get_functionDescriptor;
    YFunction.prototype.get_userData                = YFunction_get_userData;
    YFunction.prototype.userData                    = YFunction_get_userData;
    YFunction.prototype.set_userData                = YFunction_set_userData;
    YFunction.prototype.setUserData                 = YFunction_set_userData;
    YFunction.prototype.registerValueCallback_async = YFunction_registerValueCallback_async;
    YFunction.prototype.set_callback                = YFunction_registerValueCallback;
    YFunction.prototype.set_callback_async          = YFunction_registerValueCallback_async;
    YFunction.prototype.setCallback                 = YFunction_registerValueCallback;
    YFunction.prototype.setCallback_async           = YFunction_registerValueCallback_async;
    YFunction.prototype.get_hardwareId              = YFunction_get_hardwareId;
    YFunction.prototype.get_functionId              = YFunction_get_functionId;
    YFunction.prototype.get_friendlyName            = YFunction_get_friendlyName;
    YFunction.prototype.wait_async                  = YFunction_wait_async;

//--- (generated code: YMeasure class start)
/**
 * YMeasure Class: Measured value, returned in particular by the methods of the YDataSet class.
 *
 * YMeasure objects are used within the API to represent
 * a value measured at a specified time. These objects are
 * used in particular in conjunction with the YDataSet class,
 * but also for sensors periodic timed reports
 * (see sensor.registerTimedReportCallback).
 */
//--- (end of generated code: YMeasure class start)

    function _YMeasure(float_start, float_end, float_minVal, float_avgVal, float_maxVal)
    {
        //--- (generated code: YMeasure constructor)
        this._start                          = 0;                          // float
        this._end                            = 0;                          // float
        this._minVal                         = 0;                          // float
        this._avgVal                         = 0;                          // float
        this._maxVal                         = 0;                          // float
        //--- (end of generated code: YMeasure constructor)
        this._start                          = float_start;
        this._end                            = float_end;
        this._minVal                         = float_minVal;
        this._avgVal                         = float_avgVal;
        this._maxVal                         = float_maxVal;
    }
    //--- (generated code: YMeasure implementation)

    /**
     * Returns the start time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher then 1 sample
     * per second, the timestamp may have a fractional part.
     *
     * @return a floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the beginning of this measure.
     */
    function YMeasure_get_startTimeUTC()
    {
        return this._start;
    }

    /**
     * Returns the end time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher than 1 sample
     * per second, the timestamp may have a fractional part.
     *
     * @return a floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the end of this measure.
     */
    function YMeasure_get_endTimeUTC()
    {
        return this._end;
    }

    /**
     * Returns the smallest value observed during the time interval
     * covered by this measure.
     *
     * @return a floating-point number corresponding to the smallest value observed.
     */
    function YMeasure_get_minValue()
    {
        return this._minVal;
    }

    /**
     * Returns the average value observed during the time interval
     * covered by this measure.
     *
     * @return a floating-point number corresponding to the average value observed.
     */
    function YMeasure_get_averageValue()
    {
        return this._avgVal;
    }

    /**
     * Returns the largest value observed during the time interval
     * covered by this measure.
     *
     * @return a floating-point number corresponding to the largest value observed.
     */
    function YMeasure_get_maxValue()
    {
        return this._maxVal;
    }

    //--- (end of generated code: YMeasure implementation)

    /**
     * Returns the start date of the measure.
     *
     * @return a Date object corresponding to the beginning of this measure
     */
    function YMeasure_get_startTimeUTC_asDate()
    {
        return new Date(Math.round(this._start * 1000));
    }

    /**
     * Returns the start date of the measure.
     *
     * @return a Date object corresponding to the end of this measure
     */
    function YMeasure_get_endTimeUTC_asDate()
    {
        return new Date(Math.round(this._end * 1000));
    }

    //--- (generated code: YMeasure initialization)
    YMeasure = _YMeasure;
    // Methods
    YMeasure.prototype.get_startTimeUTC            = YMeasure_get_startTimeUTC;
    YMeasure.prototype.startTimeUTC                = YMeasure_get_startTimeUTC;
    YMeasure.prototype.get_endTimeUTC              = YMeasure_get_endTimeUTC;
    YMeasure.prototype.endTimeUTC                  = YMeasure_get_endTimeUTC;
    YMeasure.prototype.get_minValue                = YMeasure_get_minValue;
    YMeasure.prototype.minValue                    = YMeasure_get_minValue;
    YMeasure.prototype.get_averageValue            = YMeasure_get_averageValue;
    YMeasure.prototype.averageValue                = YMeasure_get_averageValue;
    YMeasure.prototype.get_maxValue                = YMeasure_get_maxValue;
    YMeasure.prototype.maxValue                    = YMeasure_get_maxValue;
    //--- (end of generated code: YMeasure initialization)
    YMeasure.prototype.get_startTimeUTC_asDate     = YMeasure_get_startTimeUTC_asDate;
    YMeasure.prototype.startTimeUTC_asDate         = YMeasure_get_startTimeUTC_asDate;
    YMeasure.prototype.get_endTimeUTC_asDate       = YMeasure_get_endTimeUTC_asDate;
    YMeasure.prototype.endTimeUTC_asDate           = YMeasure_get_endTimeUTC_asDate;

//--- (generated code: YFirmwareUpdate class start)
/**
 * YFirmwareUpdate Class: Firmware update process control interface, returned by module.updateFirmware method.
 *
 * The YFirmwareUpdate class let you control the firmware update of a Yoctopuce
 * module. This class should not be instantiate directly, but instances should be retrieved
 * using the YModule method module.updateFirmware.
 */
//--- (end of generated code: YFirmwareUpdate class start)


    function _YFirmwareUpdate(str_serial, str_path, bin_settings)
    {
        //--- (generated code: YFirmwareUpdate constructor)
        this._serial                         = "";                         // str
        this._settings                       = "";                         // bin
        this._firmwarepath                   = "";                         // str
        this._progress_msg                   = "";                         // str
        this._progress_c                     = 0;                          // int
        this._progress                       = 0;                          // int
        this._restore_step                   = 0;                          // int
        this._force                          = 0;                          // bool
        //--- (end of generated code: YFirmwareUpdate constructor)
        this._serial                         = str_serial;
        this._settings                       = bin_settings;               // bin
        this._firmwarepath                   = str_path;                         // str
    }

    function YFirmwareUpdate_processMore(i)
    {
        this._progress = -1;
        this._progress_msg = "not supported in JS";
    }


    /**
     * Test if the byn file is valid for this module. It is possible to pass a directory instead of a file.
     * In that case, this method returns the path of the most recent appropriate byn file. This method will
     * ignore any firmware older than minrelease.
     *
     * @param serial : the serial number of the module to update
     * @param path : the path of a byn file or a directory that contains byn files
     * @param minrelease : a positive integer
     *
     * @return : the path of the byn file to use, or an empty string if no byn files matches the requirement
     *
     * On failure, returns a string that starts with "error:".
     */
    function YFirmwareUpdate_CheckFirmware(serial,path,minrelease)// class method
    {







        // FIXME: to be implemented
        return  "error:Not yet supported in Javascript";
    }

    function YFirmwareUpdate_GetAllBootLoaders()              // class method
    {
        return [];
    }

    //--- (generated code: YFirmwareUpdate implementation)

    //cannot be generated for JS:
    //function YFirmwareUpdate_processMore(newupdate)

    //cannot be generated for JS:
    //function YFirmwareUpdate_GetAllBootLoaders()              // class method

    //cannot be generated for JS:
    //function YFirmwareUpdate_CheckFirmware(serial,path,minrelease)// class method

    /**
     * Returns the progress of the firmware update, on a scale from 0 to 100. When the object is
     * instantiated, the progress is zero. The value is updated during the firmware update process until
     * the value of 100 is reached. The 100 value means that the firmware update was completed
     * successfully. If an error occurs during the firmware update, a negative value is returned, and the
     * error message can be retrieved with get_progressMessage.
     *
     * @return an integer in the range 0 to 100 (percentage of completion)
     *         or a negative error code in case of failure.
     */
    function YFirmwareUpdate_get_progress()
    {
        if (this._progress >= 0) {
            this._processMore(0);
        }
        return this._progress;
    }

    /**
     * Returns the last progress message of the firmware update process. If an error occurs during the
     * firmware update process, the error message is returned
     *
     * @return a string  with the latest progress message, or the error message.
     */
    function YFirmwareUpdate_get_progressMessage()
    {
        return this._progress_msg;
    }

    /**
     * Starts the firmware update process. This method starts the firmware update process in background. This method
     * returns immediately. You can monitor the progress of the firmware update with the get_progress()
     * and get_progressMessage() methods.
     *
     * @return an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure returns a negative error code.
     */
    function YFirmwareUpdate_startUpdate()
    {
        var err;                    // str;
        var leng;                   // int;
        err = this._settings;
        leng = (err).length;
        if ((leng >= 6) && ("error:" == err.substr(0, 6))) {
            this._progress = -1;
            this._progress_msg = err.substr(6, leng - 6);
        } else {
            this._progress = 0;
            this._progress_c = 0;
            this._processMore(1);
        }
        return this._progress;
    }

    //--- (end of generated code: YFirmwareUpdate implementation)
    //
    //--- (generated code: YFirmwareUpdate initialization)
    YFirmwareUpdate = _YFirmwareUpdate;
    // Class methods
    YFirmwareUpdate.GetAllBootLoaders                     = YFirmwareUpdate_GetAllBootLoaders;
    YFirmwareUpdate.CheckFirmware                         = YFirmwareUpdate_CheckFirmware;
    // Methods
    YFirmwareUpdate.prototype._processMore                = YFirmwareUpdate_processMore;
    YFirmwareUpdate.prototype.get_progress                = YFirmwareUpdate_get_progress;
    YFirmwareUpdate.prototype.progress                    = YFirmwareUpdate_get_progress;
    YFirmwareUpdate.prototype.get_progressMessage         = YFirmwareUpdate_get_progressMessage;
    YFirmwareUpdate.prototype.progressMessage             = YFirmwareUpdate_get_progressMessage;
    YFirmwareUpdate.prototype.startUpdate                 = YFirmwareUpdate_startUpdate;
    //--- (end of generated code: YFirmwareUpdate initialization)
    YFirmwareUpdate.prototype.processMore                 = YFirmwareUpdate_processMore;


//--- (generated code: YDataStream class start)
/**
 * YDataStream Class: Unformatted data sequence
 *
 * DataStream objects represent bare recorded measure sequences,
 * exactly as found within the data logger present on Yoctopuce
 * sensors.
 *
 * In most cases, it is not necessary to use DataStream objects
 * directly, as the DataSet objects (returned by the
 * get_recordedData() method from sensors and the
 * get_dataSets() method from the data logger) provide
 * a more convenient interface.
 */
//--- (end of generated code: YDataStream class start)


    function _YDataStream(obj_parent, obj_dataset, encoded)
    {
        //--- (generated code: YDataStream constructor)
        this._parent                         = null;                       // YFunction
        this._runNo                          = 0;                          // int
        this._utcStamp                       = 0;                          // u32
        this._nCols                          = 0;                          // int
        this._nRows                          = 0;                          // int
        this._startTime                      = 0;                          // float
        this._duration                       = 0;                          // float
        this._dataSamplesInterval            = 0;                          // float
        this._firstMeasureDuration           = 0;                          // float
        this._columnNames                    = [];                         // strArr
        this._functionId                     = "";                         // str
        this._isClosed                       = 0;                          // bool
        this._isAvg                          = 0;                          // bool
        this._minVal                         = 0;                          // float
        this._avgVal                         = 0;                          // float
        this._maxVal                         = 0;                          // float
        this._caltyp                         = 0;                          // int
        this._calpar                         = [];                         // intArr
        this._calraw                         = [];                         // floatArr
        this._calref                         = [];                         // floatArr
        this._values                         = [];                         // floatArrArr
        this._isLoaded                       = 0;                          // bool
        //--- (end of generated code: YDataStream constructor)

        this._parent = obj_parent;
        this._calhdl = null;
        if(typeof obj_dataset != "undefined") {
            this._initFromDataSet(obj_dataset, encoded);
        }
    }

    //--- (generated code: YDataStream implementation)

    function YDataStream_initFromDataSet(dataset,encoded)
    {
        var val;                    // int;
        var i;                      // int;
        var maxpos;                 // int;
        var ms_offset;              // int;
        var samplesPerHour;         // int;
        var fRaw;                   // float;
        var fRef;                   // float;
        var iCalib = [];            // intArr;
        // decode sequence header to extract data
        this._runNo = encoded[0] + ((encoded[1] << 16));
        this._utcStamp = encoded[2] + ((encoded[3] << 16));
        val = encoded[4];
        this._isAvg = ((val & 0x100) == 0);
        samplesPerHour = (val & 0xff);
        if ((val & 0x100) != 0) {
            samplesPerHour = samplesPerHour * 3600;
        } else {
            if ((val & 0x200) != 0) {
                samplesPerHour = samplesPerHour * 60;
            }
        }
        this._dataSamplesInterval = 3600.0 / samplesPerHour;
        ms_offset = encoded[6];
        if (ms_offset < 1000) {
            // new encoding . add the ms to the UTC timestamp
            this._startTime = this._utcStamp + (ms_offset / 1000.0);
        } else {
            // legacy encoding subtract the measure interval form the UTC timestamp
            this._startTime = this._utcStamp - this._dataSamplesInterval;
        }
        this._firstMeasureDuration = encoded[5];
        if (!(this._isAvg)) {
            this._firstMeasureDuration = this._firstMeasureDuration / 1000.0;
        }
        val = encoded[7];
        this._isClosed = (val != 0xffff);
        if (val == 0xffff) {
            val = 0;
        }
        this._nRows = val;
        if (this._nRows > 0) {
            if (this._firstMeasureDuration > 0) {
                this._duration = this._firstMeasureDuration + (this._nRows - 1) * this._dataSamplesInterval;
            } else {
                this._duration = this._nRows * this._dataSamplesInterval;
            }
        } else {
            this._duration = 0;
        }
        // precompute decoding parameters
        iCalib = dataset._get_calibration();
        this._caltyp = iCalib[0];
        if (this._caltyp != 0) {
            this._calhdl = YAPI._getCalibrationHandler(this._caltyp);
            maxpos = iCalib.length;
            this._calpar.length = 0;
            this._calraw.length = 0;
            this._calref.length = 0;
            i = 1;
            while (i < maxpos) {
                this._calpar.push(iCalib[i]);
                i = i + 1;
            }
            i = 1;
            while (i + 1 < maxpos) {
                fRaw = iCalib[i];
                fRaw = fRaw / 1000.0;
                fRef = iCalib[i + 1];
                fRef = fRef / 1000.0;
                this._calraw.push(fRaw);
                this._calref.push(fRef);
                i = i + 2;
            }
        }
        // preload column names for backward-compatibility
        this._functionId = dataset.get_functionId();
        if (this._isAvg) {
            this._columnNames.length = 0;
            this._columnNames.push(""+this._functionId+"_min");
            this._columnNames.push(""+this._functionId+"_avg");
            this._columnNames.push(""+this._functionId+"_max");
            this._nCols = 3;
        } else {
            this._columnNames.length = 0;
            this._columnNames.push(this._functionId);
            this._nCols = 1;
        }
        // decode min/avg/max values for the sequence
        if (this._nRows > 0) {
            this._avgVal = this._decodeAvg(encoded[8] + (((encoded[9] ^ 0x8000) << 16)), 1);
            this._minVal = this._decodeVal(encoded[10] + ((encoded[11] << 16)));
            this._maxVal = this._decodeVal(encoded[12] + ((encoded[13] << 16)));
        }
        return 0;
    }

    function YDataStream_parseStream(sdata)
    {
        var idx;                    // int;
        var udat = [];              // intArr;
        var dat = [];               // floatArr;
        if (this._isLoaded && !(this._isClosed)) {
            return YAPI_SUCCESS;
        }
        if ((sdata).length == 0) {
            this._nRows = 0;
            return YAPI_SUCCESS;
        }

        udat = YAPI._decodeWords(this._parent._json_get_string(sdata));
        this._values.length = 0;
        idx = 0;
        if (this._isAvg) {
            while (idx + 3 < udat.length) {
                dat.length = 0;
                if ((udat[idx] == 65535) && (udat[idx + 1] == 65535)) {
                    dat.push(NaN);
                    dat.push(NaN);
                    dat.push(NaN);
                } else {
                    dat.push(this._decodeVal(udat[idx + 2] + (((udat[idx + 3]) << 16))));
                    dat.push(this._decodeAvg(udat[idx] + ((((udat[idx + 1]) ^ 0x8000) << 16)), 1));
                    dat.push(this._decodeVal(udat[idx + 4] + (((udat[idx + 5]) << 16))));
                }
                idx = idx + 6;
                this._values.push(dat.slice());
            }
        } else {
            while (idx + 1 < udat.length) {
                dat.length = 0;
                if ((udat[idx] == 65535) && (udat[idx + 1] == 65535)) {
                    dat.push(NaN);
                } else {
                    dat.push(this._decodeAvg(udat[idx] + ((((udat[idx + 1]) ^ 0x8000) << 16)), 1));
                }
                this._values.push(dat.slice());
                idx = idx + 2;
            }
        }

        this._nRows = this._values.length;
        this._isLoaded = true;
        return YAPI_SUCCESS;
    }

    function YDataStream_wasLoaded()
    {
        return this._isLoaded;
    }

    function YDataStream_get_url()
    {
        var url;                    // str;
        url = "logger.json?id="+this._functionId+"&run="+String(Math.round(this._runNo))+"&utc="+String(Math.round(this._utcStamp));
        return url;
    }

    function YDataStream_get_baseurl()
    {
        var url;                    // str;
        url = "logger.json?id="+this._functionId+"&run="+String(Math.round(this._runNo))+"&utc=";
        return url;
    }

    function YDataStream_get_urlsuffix()
    {
        var url;                    // str;
        url = ""+String(Math.round(this._utcStamp));
        return url;
    }

    function YDataStream_loadStream()
    {
        return this._parseStream(this._parent._download(this._get_url()));
    }

    function YDataStream_decodeVal(w)
    {
        var val;                    // float;
        val = w;
        val = val / 1000.0;
        if (this._caltyp != 0) {
            if (this._calhdl != null) {
                val = this._calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    function YDataStream_decodeAvg(dw,count)
    {
        var val;                    // float;
        val = dw;
        val = val / 1000.0;
        if (this._caltyp != 0) {
            if (this._calhdl != null) {
                val = this._calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    function YDataStream_isClosed()
    {
        return this._isClosed;
    }

    /**
     * Returns the run index of the data stream. A run can be made of
     * multiple datastreams, for different time intervals.
     *
     * @return an unsigned number corresponding to the run index.
     */
    function YDataStream_get_runIndex()
    {
        return this._runNo;
    }

    /**
     * Returns the relative start time of the data stream, measured in seconds.
     * For recent firmwares, the value is relative to the present time,
     * which means the value is always negative.
     * If the device uses a firmware older than version 13000, value is
     * relative to the start of the time the device was powered on, and
     * is always positive.
     * If you need an absolute UTC timestamp, use get_realStartTimeUTC().
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_realStartTimeUTC().
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the start of the run and the beginning of this data
     *         stream.
     */
    function YDataStream_get_startTime()
    {
        return this._utcStamp - parseInt(+new Date()/1000);
    }

    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_realStartTimeUTC().
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    function YDataStream_get_startTimeUTC()
    {
        return Math.round(this._startTime);
    }

    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     *
     * @return a floating-point number  corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    function YDataStream_get_realStartTimeUTC()
    {
        return this._startTime;
    }

    /**
     * Returns the number of milliseconds between two consecutive
     * rows of this data stream. By default, the data logger records one row
     * per second, but the recording frequency can be changed for
     * each device function
     *
     * @return an unsigned number corresponding to a number of milliseconds.
     */
    function YDataStream_get_dataSamplesIntervalMs()
    {
        return Math.round(this._dataSamplesInterval*1000);
    }

    function YDataStream_get_dataSamplesInterval()
    {
        return this._dataSamplesInterval;
    }

    function YDataStream_get_firstDataSamplesInterval()
    {
        return this._firstMeasureDuration;
    }

    /**
     * Returns the number of data rows present in this stream.
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return an unsigned number corresponding to the number of rows.
     *
     * On failure, throws an exception or returns zero.
     */
    function YDataStream_get_rowCount()
    {
        if ((this._nRows != 0) && this._isClosed) {
            return this._nRows;
        }
        this.loadStream();
        return this._nRows;
    }

    /**
     * Returns the number of data columns present in this stream.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return an unsigned number corresponding to the number of columns.
     *
     * On failure, throws an exception or returns zero.
     */
    function YDataStream_get_columnCount()
    {
        if (this._nCols != 0) {
            return this._nCols;
        }
        this.loadStream();
        return this._nCols;
    }

    /**
     * Returns the title (or meaning) of each data column present in this stream.
     * In most case, the title of the data column is the hardware identifier
     * of the sensor that produced the data. For streams recorded at a lower
     * recording rate, the dataLogger stores the min, average and max value
     * during each measure interval into three columns with suffixes _min,
     * _avg and _max respectively.
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return a list containing as many strings as there are columns in the
     *         data stream.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YDataStream_get_columnNames()
    {
        if (this._columnNames.length != 0) {
            return this._columnNames;
        }
        this.loadStream();
        return this._columnNames;
    }

    /**
     * Returns the smallest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return Y_DATA_INVALID.
     *
     * @return a floating-point number corresponding to the smallest value,
     *         or Y_DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns Y_DATA_INVALID.
     */
    function YDataStream_get_minValue()
    {
        return this._minVal;
    }

    /**
     * Returns the average of all measures observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return Y_DATA_INVALID.
     *
     * @return a floating-point number corresponding to the average value,
     *         or Y_DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns Y_DATA_INVALID.
     */
    function YDataStream_get_averageValue()
    {
        return this._avgVal;
    }

    /**
     * Returns the largest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return Y_DATA_INVALID.
     *
     * @return a floating-point number corresponding to the largest value,
     *         or Y_DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns Y_DATA_INVALID.
     */
    function YDataStream_get_maxValue()
    {
        return this._maxVal;
    }

    function YDataStream_get_realDuration()
    {
        if (this._isClosed) {
            return this._duration;
        }
        return parseInt(+new Date()/1000) - this._utcStamp;
    }

    /**
     * Returns the whole data set contained in the stream, as a bidimensional
     * table of numbers.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * This method fetches the whole data stream from the device,
     * if not yet done.
     *
     * @return a list containing as many elements as there are rows in the
     *         data stream. Each row itself is a list of floating-point
     *         numbers.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YDataStream_get_dataRows()
    {
        if ((this._values.length == 0) || !(this._isClosed)) {
            this.loadStream();
        }
        return this._values;
    }

    /**
     * Returns a single measure from the data stream, specified by its
     * row and column index.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * This method fetches the whole data stream from the device,
     * if not yet done.
     *
     * @param row : row index
     * @param col : column index
     *
     * @return a floating-point number
     *
     * On failure, throws an exception or returns Y_DATA_INVALID.
     */
    function YDataStream_get_data(row,col)
    {
        if ((this._values.length == 0) || !(this._isClosed)) {
            this.loadStream();
        }
        if (row >= this._values.length) {
            return Y_DATA_INVALID;
        }
        if (col >= this._values[row].length) {
            return Y_DATA_INVALID;
        }
        return this._values[row][col];
    }

    //--- (end of generated code: YDataStream implementation)
    //
    //--- (generated code: YDataStream initialization)
    YDataStream = _YDataStream;
    // Methods
    YDataStream.prototype._initFromDataSet            = YDataStream_initFromDataSet;
    YDataStream.prototype._parseStream                = YDataStream_parseStream;
    YDataStream.prototype._wasLoaded                  = YDataStream_wasLoaded;
    YDataStream.prototype._get_url                    = YDataStream_get_url;
    YDataStream.prototype._get_baseurl                = YDataStream_get_baseurl;
    YDataStream.prototype._get_urlsuffix              = YDataStream_get_urlsuffix;
    YDataStream.prototype.loadStream                  = YDataStream_loadStream;
    YDataStream.prototype._decodeVal                  = YDataStream_decodeVal;
    YDataStream.prototype._decodeAvg                  = YDataStream_decodeAvg;
    YDataStream.prototype.isClosed                    = YDataStream_isClosed;
    YDataStream.prototype.get_runIndex                = YDataStream_get_runIndex;
    YDataStream.prototype.runIndex                    = YDataStream_get_runIndex;
    YDataStream.prototype.get_startTime               = YDataStream_get_startTime;
    YDataStream.prototype.startTime                   = YDataStream_get_startTime;
    YDataStream.prototype.get_startTimeUTC            = YDataStream_get_startTimeUTC;
    YDataStream.prototype.startTimeUTC                = YDataStream_get_startTimeUTC;
    YDataStream.prototype.get_realStartTimeUTC        = YDataStream_get_realStartTimeUTC;
    YDataStream.prototype.realStartTimeUTC            = YDataStream_get_realStartTimeUTC;
    YDataStream.prototype.get_dataSamplesIntervalMs   = YDataStream_get_dataSamplesIntervalMs;
    YDataStream.prototype.dataSamplesIntervalMs       = YDataStream_get_dataSamplesIntervalMs;
    YDataStream.prototype.get_dataSamplesInterval     = YDataStream_get_dataSamplesInterval;
    YDataStream.prototype.dataSamplesInterval         = YDataStream_get_dataSamplesInterval;
    YDataStream.prototype.get_firstDataSamplesInterval = YDataStream_get_firstDataSamplesInterval;
    YDataStream.prototype.firstDataSamplesInterval    = YDataStream_get_firstDataSamplesInterval;
    YDataStream.prototype.get_rowCount                = YDataStream_get_rowCount;
    YDataStream.prototype.rowCount                    = YDataStream_get_rowCount;
    YDataStream.prototype.get_columnCount             = YDataStream_get_columnCount;
    YDataStream.prototype.columnCount                 = YDataStream_get_columnCount;
    YDataStream.prototype.get_columnNames             = YDataStream_get_columnNames;
    YDataStream.prototype.columnNames                 = YDataStream_get_columnNames;
    YDataStream.prototype.get_minValue                = YDataStream_get_minValue;
    YDataStream.prototype.minValue                    = YDataStream_get_minValue;
    YDataStream.prototype.get_averageValue            = YDataStream_get_averageValue;
    YDataStream.prototype.averageValue                = YDataStream_get_averageValue;
    YDataStream.prototype.get_maxValue                = YDataStream_get_maxValue;
    YDataStream.prototype.maxValue                    = YDataStream_get_maxValue;
    YDataStream.prototype.get_realDuration            = YDataStream_get_realDuration;
    YDataStream.prototype.realDuration                = YDataStream_get_realDuration;
    YDataStream.prototype.get_dataRows                = YDataStream_get_dataRows;
    YDataStream.prototype.dataRows                    = YDataStream_get_dataRows;
    YDataStream.prototype.get_data                    = YDataStream_get_data;
    YDataStream.prototype.data                        = YDataStream_get_data;
    //--- (end of generated code: YDataStream initialization)

//--- (generated code: YDataSet class start)
/**
 * YDataSet Class: Recorded data sequence, as returned by sensor.get_recordedData()
 *
 * YDataSet objects make it possible to retrieve a set of recorded measures
 * for a given sensor and a specified time interval. They can be used
 * to load data points with a progress report. When the YDataSet object is
 * instantiated by the sensor.get_recordedData()  function, no data is
 * yet loaded from the module. It is only when the loadMore()
 * method is called over and over than data will be effectively loaded
 * from the dataLogger.
 *
 * A preview of available measures is available using the function
 * get_preview() as soon as loadMore() has been called
 * once. Measures themselves are available using function get_measures()
 * when loaded by subsequent calls to loadMore().
 *
 * This class can only be used on devices that use a relatively recent firmware,
 * as YDataSet objects are not supported by firmwares older than version 13000.
 */
//--- (end of generated code: YDataSet class start)

    function _YDataSet(obj_parent, str_functionId, str_unit, double_startTime, double_endTime)
    {
        //--- (generated code: YDataSet constructor)
        this._parent                         = null;                       // YFunction
        this._hardwareId                     = "";                         // str
        this._functionId                     = "";                         // str
        this._unit                           = "";                         // str
        this._bulkLoad                       = 0;                          // int
        this._startTimeMs                    = 0;                          // float
        this._endTimeMs                      = 0;                          // float
        this._progress                       = 0;                          // int
        this._calib                          = [];                         // intArr
        this._streams                        = [];                         // YDataStreamArr
        this._summary                        = null;                       // YMeasure
        this._preview                        = [];                         // YMeasureArr
        this._measures                       = [];                         // YMeasureArr
        this._summaryMinVal                  = 0;                          // float
        this._summaryMaxVal                  = 0;                          // float
        this._summaryTotalAvg                = 0;                          // float
        this._summaryTotalTime               = 0;                          // float
        //--- (end of generated code: YDataSet constructor)
        this._parse                          = YDataSet_parse;
        this.loadMore_async                  = YDataSet_loadMore_async;
        this.get_measuresAt_async            = YDataSet_get_measuresAt_async;
        // init _summary with dummy value
        this._summary = new YMeasure(0, 0, 0, 0, 0);
        if(typeof str_unit === "undefined") {
            // 1st version of constructor, called from YDataLogger
            this._parent     = obj_parent;
            this._startTime = 0;
            this._endTime   = 0;
        } else {
            // 2nd version of constructor, called from YFunction
            this._parent     = obj_parent;
            this._functionId = str_functionId;
            this._unit       = str_unit;
            this._startTimeMs= double_startTime;
            this._endTimeMs  = double_endTime;
            this._progress   = -1;
        }
    }

    //--- (generated code: YDataSet implementation)

    function YDataSet_get_calibration()
    {
        return this._calib;
    }

    function YDataSet_loadSummary(data)
    {
        var ii; // iterator
        var dataRows = [];          // floatArrArr;
        var tim;                    // float;
        var mitv;                   // float;
        var itv;                    // float;
        var fitv;                   // float;
        var end_;                   // float;
        var nCols;                  // int;
        var minCol;                 // int;
        var avgCol;                 // int;
        var maxCol;                 // int;
        var res;                    // int;
        var m_pos;                  // int;
        var previewTotalTime;       // float;
        var previewTotalAvg;        // float;
        var previewMinVal;          // float;
        var previewMaxVal;          // float;
        var previewAvgVal;          // float;
        var previewStartMs;         // float;
        var previewStopMs;          // float;
        var previewDuration;        // float;
        var streamStartTimeMs;      // float;
        var streamDuration;         // float;
        var streamEndTimeMs;        // float;
        var minVal;                 // float;
        var avgVal;                 // float;
        var maxVal;                 // float;
        var summaryStartMs;         // float;
        var summaryStopMs;          // float;
        var summaryTotalTime;       // float;
        var summaryTotalAvg;        // float;
        var summaryMinVal;          // float;
        var summaryMaxVal;          // float;
        var url;                    // str;
        var strdata;                // str;
        var measure_data = [];      // floatArr;

        if (this._progress < 0) {
            strdata = data;
            if (strdata == "{}") {
                this._parent._throw(YAPI_VERSION_MISMATCH, "device firmware is too old");
                return YAPI_VERSION_MISMATCH;
            }
            res = this._parse(strdata);
            if (res < 0) {
                return res;
            }
        }
        summaryTotalTime = 0;
        summaryTotalAvg = 0;
        summaryMinVal = YAPI_MAX_DOUBLE;
        summaryMaxVal = YAPI_MIN_DOUBLE;
        summaryStartMs = YAPI_MAX_DOUBLE;
        summaryStopMs = YAPI_MIN_DOUBLE;

        // Parse complete streams
        for (ii_0 in this._streams) {
            if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
            streamStartTimeMs = Math.round(this._streams[ii_0].get_realStartTimeUTC() * 1000);
            streamDuration = this._streams[ii_0].get_realDuration();
            streamEndTimeMs = streamStartTimeMs + Math.round(streamDuration * 1000);
            if ((streamStartTimeMs >= this._startTimeMs) && ((this._endTimeMs == 0) || (streamEndTimeMs <= this._endTimeMs))) {
                // stream that are completely inside the dataset
                previewMinVal = this._streams[ii_0].get_minValue();
                previewAvgVal = this._streams[ii_0].get_averageValue();
                previewMaxVal = this._streams[ii_0].get_maxValue();
                previewStartMs = streamStartTimeMs;
                previewStopMs = streamEndTimeMs;
                previewDuration = streamDuration;
            } else {
                // stream that are partially in the dataset
                // we need to parse data to filter value outside the dataset
                if (!(this._streams[ii_0]._wasLoaded())) {
                    url = this._streams[ii_0]._get_url();
                    data = this._parent._download(url);
                    this._streams[ii_0]._parseStream(data);
                }
                dataRows = this._streams[ii_0].get_dataRows();
                if (dataRows.length == 0) {
                    return this.get_progress();
                }
                tim = streamStartTimeMs;
                fitv = Math.round(this._streams[ii_0].get_firstDataSamplesInterval() * 1000);
                itv = Math.round(this._streams[ii_0].get_dataSamplesInterval() * 1000);
                nCols = dataRows[0].length;
                minCol = 0;
                if (nCols > 2) {
                    avgCol = 1;
                } else {
                    avgCol = 0;
                }
                if (nCols > 2) {
                    maxCol = 2;
                } else {
                    maxCol = 0;
                }
                previewTotalTime = 0;
                previewTotalAvg = 0;
                previewStartMs = streamEndTimeMs;
                previewStopMs = streamStartTimeMs;
                previewMinVal = YAPI_MAX_DOUBLE;
                previewMaxVal = YAPI_MIN_DOUBLE;
                m_pos = 0;
                while (m_pos < dataRows.length) {
                    measure_data = dataRows[m_pos];
                    if (m_pos == 0) {
                        mitv = fitv;
                    } else {
                        mitv = itv;
                    }
                    end_ = tim + mitv;
                    if ((end_ > this._startTimeMs) && ((this._endTimeMs == 0) || (tim < this._endTimeMs))) {
                        minVal = measure_data[minCol];
                        avgVal = measure_data[avgCol];
                        maxVal = measure_data[maxCol];
                        if (previewStartMs > tim) {
                            previewStartMs = tim;
                        }
                        if (previewStopMs < end_) {
                            previewStopMs = end_;
                        }
                        if (previewMinVal > minVal) {
                            previewMinVal = minVal;
                        }
                        if (previewMaxVal < maxVal) {
                            previewMaxVal = maxVal;
                        }
                        if (!(isNaN(avgVal))) {
                            previewTotalAvg = previewTotalAvg + (avgVal * mitv);
                            previewTotalTime = previewTotalTime + mitv;
                        }
                    }
                    tim = end_;
                    m_pos = m_pos + 1;
                }
                if (previewTotalTime > 0) {
                    previewAvgVal = previewTotalAvg / previewTotalTime;
                    previewDuration = (previewStopMs - previewStartMs) / 1000.0;
                } else {
                    previewAvgVal = 0.0;
                    previewDuration = 0.0;
                }
            }
            this._preview.push(new YMeasure(previewStartMs / 1000.0, previewStopMs / 1000.0, previewMinVal, previewAvgVal, previewMaxVal));
            if (summaryMinVal > previewMinVal) {
                summaryMinVal = previewMinVal;
            }
            if (summaryMaxVal < previewMaxVal) {
                summaryMaxVal = previewMaxVal;
            }
            if (summaryStartMs > previewStartMs) {
                summaryStartMs = previewStartMs;
            }
            if (summaryStopMs < previewStopMs) {
                summaryStopMs = previewStopMs;
            }
            summaryTotalAvg = summaryTotalAvg + (previewAvgVal * previewDuration);
            summaryTotalTime = summaryTotalTime + previewDuration;
        }
        if ((this._startTimeMs == 0) || (this._startTimeMs > summaryStartMs)) {
            this._startTimeMs = summaryStartMs;
        }
        if ((this._endTimeMs == 0) || (this._endTimeMs < summaryStopMs)) {
            this._endTimeMs = summaryStopMs;
        }
        if (summaryTotalTime > 0) {
            this._summary = new YMeasure(summaryStartMs / 1000.0, summaryStopMs / 1000.0, summaryMinVal, summaryTotalAvg / summaryTotalTime, summaryMaxVal);
        } else {
            this._summary = new YMeasure(0.0, 0.0, YAPI_INVALID_DOUBLE, YAPI_INVALID_DOUBLE, YAPI_INVALID_DOUBLE);
        }
        return this.get_progress();
    }

    function YDataSet_processMore(progress,data)
    {
        var ii; // iterator
        var stream;                 // YDataStream;
        var dataRows = [];          // floatArrArr;
        var tim;                    // float;
        var itv;                    // float;
        var fitv;                   // float;
        var avgv;                   // float;
        var end_;                   // float;
        var nCols;                  // int;
        var minCol;                 // int;
        var avgCol;                 // int;
        var maxCol;                 // int;
        var firstMeasure;           // bool;
        var baseurl;                // str;
        var url;                    // str;
        var suffix;                 // str;
        var suffixes = [];          // strArr;
        var idx;                    // int;
        var bulkFile;               // bin;
        var streamStr = [];         // strArr;
        var urlIdx;                 // int;
        var streamBin;              // bin;

        if (progress != this._progress) {
            return this._progress;
        }
        if (this._progress < 0) {
            return this.loadSummary(data);
        }
        stream = this._streams[this._progress];
        if (!(stream._wasLoaded())) {
            stream._parseStream(data);
        }
        dataRows = stream.get_dataRows();
        this._progress = this._progress + 1;
        if (dataRows.length == 0) {
            return this.get_progress();
        }
        tim = Math.round(stream.get_realStartTimeUTC() * 1000);
        fitv = Math.round(stream.get_firstDataSamplesInterval() * 1000);
        itv = Math.round(stream.get_dataSamplesInterval() * 1000);
        if (fitv == 0) {
            fitv = itv;
        }
        if (tim < itv) {
            tim = itv;
        }
        nCols = dataRows[0].length;
        minCol = 0;
        if (nCols > 2) {
            avgCol = 1;
        } else {
            avgCol = 0;
        }
        if (nCols > 2) {
            maxCol = 2;
        } else {
            maxCol = 0;
        }

        firstMeasure = true;
        for (ii_0 in dataRows) {
            if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
            if (firstMeasure) {
                end_ = tim + fitv;
                firstMeasure = false;
            } else {
                end_ = tim + itv;
            }
            avgv = dataRows[ii_0][avgCol];
            if ((end_ > this._startTimeMs) && ((this._endTimeMs == 0) || (tim < this._endTimeMs)) && !(isNaN(avgv))) {
                this._measures.push(new YMeasure(tim / 1000, end_ / 1000, dataRows[ii_0][minCol], avgv, dataRows[ii_0][maxCol]));
            }
            tim = end_;
        }
        // Perform bulk preload to speed-up network transfer
        if ((this._bulkLoad > 0) && (this._progress < this._streams.length)) {
            stream = this._streams[this._progress];
            if (stream._wasLoaded()) {
                return this.get_progress();
            }
            baseurl = stream._get_baseurl();
            url = stream._get_url();
            suffix = stream._get_urlsuffix();
            suffixes.push(suffix);
            idx = this._progress + 1;
            while ((idx < this._streams.length) && (suffixes.length < this._bulkLoad)) {
                stream = this._streams[idx];
                if (!(stream._wasLoaded()) && (stream._get_baseurl() == baseurl)) {
                    suffix = stream._get_urlsuffix();
                    suffixes.push(suffix);
                    url = url + "," + suffix;
                }
                idx = idx + 1;
            }
            bulkFile = this._parent._download(url);
            streamStr = this._parent._json_get_array(bulkFile);
            urlIdx = 0;
            idx = this._progress;
            while ((idx < this._streams.length) && (urlIdx < suffixes.length) && (urlIdx < streamStr.length)) {
                stream = this._streams[idx];
                if ((stream._get_baseurl() == baseurl) && (stream._get_urlsuffix() == suffixes[urlIdx])) {
                    streamBin = streamStr[urlIdx];
                    stream._parseStream(streamBin);
                    urlIdx = urlIdx + 1;
                }
                idx = idx + 1;
            }
        }
        return this.get_progress();
    }

    function YDataSet_get_privateDataStreams()
    {
        return this._streams;
    }

    /**
     * Returns the unique hardware identifier of the function who performed the measures,
     * in the form SERIAL.FUNCTIONID. The unique hardware identifier is composed of the
     * device serial number and of the hardware identifier of the function
     * (for example THRMCPL1-123456.temperature1)
     *
     * @return a string that uniquely identifies the function (ex: THRMCPL1-123456.temperature1)
     *
     * On failure, throws an exception or returns  YDataSet.HARDWAREID_INVALID.
     */
    function YDataSet_get_hardwareId()
    {
        var mo;                     // YModule;
        if (!(this._hardwareId == "")) {
            return this._hardwareId;
        }
        mo = this._parent.get_module();
        this._hardwareId = ""+mo.get_serialNumber()+"."+this.get_functionId();
        return this._hardwareId;
    }

    /**
     * Returns the hardware identifier of the function that performed the measure,
     * without reference to the module. For example temperature1.
     *
     * @return a string that identifies the function (ex: temperature1)
     */
    function YDataSet_get_functionId()
    {
        return this._functionId;
    }

    /**
     * Returns the measuring unit for the measured value.
     *
     * @return a string that represents a physical unit.
     *
     * On failure, throws an exception or returns  YDataSet.UNIT_INVALID.
     */
    function YDataSet_get_unit()
    {
        return this._unit;
    }

    /**
     * Returns the start time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet object is created, the start time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the start time is updated
     * to reflect the timestamp of the first measure actually found in the
     * dataLogger within the specified range.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_summary()
     * which contain more precise informations.
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    function YDataSet_get_startTimeUTC()
    {
        return this.imm_get_startTimeUTC();
    }

    function YDataSet_imm_get_startTimeUTC()
    {
        return (this._startTimeMs / 1000.0);
    }

    /**
     * Returns the end time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet object is created, the end time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the end time is updated
     * to reflect the timestamp of the last measure actually found in the
     * dataLogger within the specified range.
     *
     * <b>DEPRECATED</b>: This method has been replaced by get_summary()
     * which contain more precise informations.
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the end of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    function YDataSet_get_endTimeUTC()
    {
        return this.imm_get_endTimeUTC();
    }

    function YDataSet_imm_get_endTimeUTC()
    {
        return Math.round(this._endTimeMs / 1000.0);
    }

    /**
     * Returns the progress of the downloads of the measures from the data logger,
     * on a scale from 0 to 100. When the object is instantiated by get_dataSet,
     * the progress is zero. Each time loadMore() is invoked, the progress
     * is updated, to reach the value 100 only once all measures have been loaded.
     *
     * @return an integer in the range 0 to 100 (percentage of completion).
     */
    function YDataSet_get_progress()
    {
        if (this._progress < 0) {
            return 0;
        }
        // index not yet loaded
        if (this._progress >= this._streams.length) {
            return 100;
        }
        return parseInt((1 + (1 + this._progress) * 98) / ((1 + this._streams.length)));
    }

    /**
     * Loads the next block of measures from the dataLogger, and updates
     * the progress indicator.
     *
     * @return an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataSet_loadMore()
    {
        var url;                    // str;
        var stream;                 // YDataStream;
        if (this._progress < 0) {
            url = "logger.json?id="+this._functionId;
            if (this._startTimeMs != 0) {
                url = ""+url+"&from="+String(Math.round(this.imm_get_startTimeUTC()));
            }
            if (this._endTimeMs != 0) {
                url = ""+url+"&to="+String(Math.round(this.imm_get_endTimeUTC() + 1));
            }
        } else {
            if (this._progress >= this._streams.length) {
                return 100;
            } else {
                stream = this._streams[this._progress];
                if (stream._wasLoaded()) {
                    // Do not reload stream if it was already loaded
                    return this.processMore(this._progress, "");
                }
                url = stream._get_url();
            }
        }
        try {
            return this.processMore(this._progress, this._parent._download(url));
        } catch {
            return this.processMore(this._progress, this._parent._download(url));
        }
    }

    /**
     * Returns an YMeasure object which summarizes the whole
     * YDataSet. In includes the following information:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * This summary is available as soon as loadMore() has
     * been called for the first time.
     *
     * @return an YMeasure object
     */
    function YDataSet_get_summary()
    {
        return this._summary;
    }

    /**
     * Returns a condensed version of the measures that can
     * retrieved in this YDataSet, as a list of YMeasure
     * objects. Each item includes:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * This preview is available as soon as loadMore() has
     * been called for the first time.
     *
     * @return a table of records, where each record depicts the
     *         measured values during a time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YDataSet_get_preview()
    {
        return this._preview;
    }

    /**
     * Returns the detailed set of measures for the time interval corresponding
     * to a given condensed measures previously returned by get_preview().
     * The result is provided as a list of YMeasure objects.
     *
     * @param measure : condensed measure from the list previously returned by
     *         get_preview().
     *
     * @return a table of records, where each record depicts the
     *         measured values during a time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YDataSet_get_measuresAt(measure)
    {
        var ii; // iterator
        var startUtcMs;             // float;
        var stream;                 // YDataStream;
        var dataRows = [];          // floatArrArr;
        var measures = [];          // YMeasureArr;
        var tim;                    // float;
        var itv;                    // float;
        var end_;                   // float;
        var nCols;                  // int;
        var minCol;                 // int;
        var avgCol;                 // int;
        var maxCol;                 // int;

        startUtcMs = measure.get_startTimeUTC() * 1000;
        stream = null;
        for (ii_0 in this._streams) {
            if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
            if (Math.round(this._streams[ii_0].get_realStartTimeUTC() *1000) == startUtcMs) {
                stream = this._streams[ii_0];
            }
        }
        if (stream == null) {
            return measures;
        }
        dataRows = stream.get_dataRows();
        if (dataRows.length == 0) {
            return measures;
        }
        tim = Math.round(stream.get_realStartTimeUTC() * 1000);
        itv = Math.round(stream.get_dataSamplesInterval() * 1000);
        if (tim < itv) {
            tim = itv;
        }
        nCols = dataRows[0].length;
        minCol = 0;
        if (nCols > 2) {
            avgCol = 1;
        } else {
            avgCol = 0;
        }
        if (nCols > 2) {
            maxCol = 2;
        } else {
            maxCol = 0;
        }

        for (ii_1 in dataRows) {
            if(ii_1 =='indexOf') continue; // IE8 Don'tEnum bug
            end_ = tim + itv;
            if ((end_ > this._startTimeMs) && ((this._endTimeMs == 0) || (tim < this._endTimeMs))) {
                measures.push(new YMeasure(tim / 1000.0, end_ / 1000.0, dataRows[ii_1][minCol], dataRows[ii_1][avgCol], dataRows[ii_1][maxCol]));
            }
            tim = end_;
        }
        return measures;
    }

    /**
     * Returns all measured values currently available for this DataSet,
     * as a list of YMeasure objects. Each item includes:
     * - the start of the measure time interval
     * - the end of the measure time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * Before calling this method, you should call loadMore()
     * to load data from the device. You may have to call loadMore()
     * several time until all rows are loaded, but you can start
     * looking at available data rows before the load is complete.
     *
     * The oldest measures are always loaded first, and the most
     * recent measures will be loaded last. As a result, timestamps
     * are normally sorted in ascending order within the measure table,
     * unless there was an unexpected adjustment of the datalogger UTC
     * clock.
     *
     * @return a table of records, where each record depicts the
     *         measured value for a given time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YDataSet_get_measures()
    {
        return this._measures;
    }

    //--- (end of generated code: YDataSet implementation)

    // YDataSet parser for stream list
    function YDataSet_parse(str_json)
    {
        var loadval;

        try {loadval = JSON.parse(str_json);} catch(err){}
        if(!loadval) {
            // no data available
            this._progress = 0;
            return this.get_progress();
        }

        this._functionId = loadval.id;
        this._unit       = loadval.unit;
        this._bulkLoad   = (loadval.bulk ? parseInt(loadval.bulk) : 0);
        if(loadval.calib) {
            this._calib  = YAPI._decodeFloats(loadval.calib);
            this._calib[0] = parseInt(this._calib[0] / 1000);
        } else {
            this._calib  = YAPI._decodeWords(loadval.cal);
        }
        this._summary    = new YMeasure(0,0,0,0,0);
        this._streams    = [];
        this._preview    = [];
        this._measures   = [];
        for(var i = 0; i < loadval.streams.length; i++) {
            var stream = this._parent._findDataStream(this, loadval.streams[i]);
            var streamStartTime = stream.get_realStartTimeUTC() * 1000;
            var streamEndTime = streamStartTime + stream.get_realDuration() * 1000;
            if(this._startTimeMs > 0 && streamEndTime <= this._startTimeMs) {
                // this stream is too early, drop it
            } else if(this._endTimeMs > 0 && streamStartTime >= this._endTimeMs) {
                // this stream is too late, drop it
            } else {
                this._streams.push(stream);
            }
        }
        this._progress = 0;
        return this.get_progress();
    }

    /**
     * Loads the next block of measures from the dataLogger asynchronously.
     *
     * @param callback : callback function that is invoked when the w
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataSet object whose loadMore_async was invoked
     *         - the load result: either the progress indicator (0...100), or
     *         a negative error code in case of failure.
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing.
     */
    function YDataSet_loadMore_async(callback, context)
    {
        var url;
        var stream;
        if (this._progress < 0) {
            url = "logger.json?id="+this._functionId;
        } else {
            if (this._progress >= this._streams.length) {
                callback(context, this, 100);
            } else {
                stream = this._streams[this._progress];
                url = stream._get_url();
            }
        }
        this._parent._download_async(url, function(ctx, parent, data) {
            var res = ctx.dataset.processMore(ctx.progress, data);
            ctx.usercb(ctx.userctx, ctx.dataset, res);
        }, { progress:this._progress, dataset:this, usercb:callback, userctx:context });
    }

    /**
     * Loads the the next block of measures from the dataLogger asynchronously.
     *
     * @param measure : condensed measure from the list previously returned by get_preview().
     * @param callback : callback function that is invoked when the w
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataSet object whose get_measuresAt_async was invoked
     *         - the result: an array of measures, or an empty array in case of failure.
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing.
     */
    function YDataSet_get_measuresAt_async(measure, callback, context)
    {
        var startUtc = Math.round(measure.get_startTimeUTC());
        var stream = null;
        for (var ii in this._streams) {
            if(ii=='indexOf') continue; // IE8 Don'tEnum bug
            if (this._streams[ii].get_startTimeUTC() == startUtc) {
                stream = this._streams[ii];
            }
        }
        if (stream == null) {
            callback(context, this, []);
            return;
        }

        this._parent._download_async(stream._get_url(), function(ctx, parent, data) {
            var measures = [];          // YMeasureArr;
            stream._parseStream(data);
            var dataRows = stream.get_dataRows();
            if (dataRows.length == 0) {
                return measures;
            }
            var tim = stream.get_startTimeUTC();
            var itv = stream.get_dataSamplesInterval();
            if (tim < itv) {
                tim = itv;
            }
            var nCols = dataRows[0].length;
            var minCol = 0;
            var avgCol, maxCol;
            if (nCols > 2) {
                avgCol = 1;
            } else {
                avgCol = 0;
            }
            if (nCols > 2) {
                maxCol = 2;
            } else {
                maxCol = 0;
            }

            for (ii in dataRows) {
                if(ii=='indexOf') continue; // IE8 Don'tEnum bug
                if ((tim >= ctx.dataset._startTime) && ((ctx.dataset._endTime == 0) || (tim <= ctx.dataset._endTime))) {
                    measures.push(new YMeasure(tim - itv, tim, dataRows[ii][minCol], dataRows[ii][avgCol], dataRows[ii][maxCol]));
                }
                tim = tim + itv;;
            }
            ctx.usercb(ctx.userctx, ctx.dataset, measures);
        }, { progress:this._progress, dataset:this, usercb:callback, userctx:context });
    }

    //--- (generated code: YDataSet initialization)
    YDataSet = _YDataSet;
    // Methods
    YDataSet.prototype._get_calibration            = YDataSet_get_calibration;
    YDataSet.prototype.loadSummary                 = YDataSet_loadSummary;
    YDataSet.prototype.processMore                 = YDataSet_processMore;
    YDataSet.prototype.get_privateDataStreams      = YDataSet_get_privateDataStreams;
    YDataSet.prototype.privateDataStreams          = YDataSet_get_privateDataStreams;
    YDataSet.prototype.get_hardwareId              = YDataSet_get_hardwareId;
    YDataSet.prototype.hardwareId                  = YDataSet_get_hardwareId;
    YDataSet.prototype.get_functionId              = YDataSet_get_functionId;
    YDataSet.prototype.functionId                  = YDataSet_get_functionId;
    YDataSet.prototype.get_unit                    = YDataSet_get_unit;
    YDataSet.prototype.unit                        = YDataSet_get_unit;
    YDataSet.prototype.get_startTimeUTC            = YDataSet_get_startTimeUTC;
    YDataSet.prototype.startTimeUTC                = YDataSet_get_startTimeUTC;
    YDataSet.prototype.imm_get_startTimeUTC        = YDataSet_imm_get_startTimeUTC;
    YDataSet.prototype.get_endTimeUTC              = YDataSet_get_endTimeUTC;
    YDataSet.prototype.endTimeUTC                  = YDataSet_get_endTimeUTC;
    YDataSet.prototype.imm_get_endTimeUTC          = YDataSet_imm_get_endTimeUTC;
    YDataSet.prototype.get_progress                = YDataSet_get_progress;
    YDataSet.prototype.progress                    = YDataSet_get_progress;
    YDataSet.prototype.loadMore                    = YDataSet_loadMore;
    YDataSet.prototype.get_summary                 = YDataSet_get_summary;
    YDataSet.prototype.summary                     = YDataSet_get_summary;
    YDataSet.prototype.get_preview                 = YDataSet_get_preview;
    YDataSet.prototype.preview                     = YDataSet_get_preview;
    YDataSet.prototype.get_measuresAt              = YDataSet_get_measuresAt;
    YDataSet.prototype.measuresAt                  = YDataSet_get_measuresAt;
    YDataSet.prototype.get_measures                = YDataSet_get_measures;
    YDataSet.prototype.measures                    = YDataSet_get_measures;
    //--- (end of generated code: YDataSet initialization)

//--- (generated code: YSensor class start)
/**
 * YSensor Class: Sensor function interface.
 *
 * The YSensor class is the parent class for all Yoctopuce sensor types. It can be
 * used to read the current value and unit of any sensor, read the min/max
 * value, configure autonomous recording frequency and access recorded data.
 * It also provides a function to register a callback invoked each time the
 * observed value changes, or at a predefined interval. Using this class rather
 * than a specific subclass makes it possible to create generic applications
 * that work with any Yoctopuce sensor, even those that do not yet exist.
 * Note: The YAnButton class is the only analog input which does not inherit
 * from YSensor.
 */
//--- (end of generated code: YSensor class start)

    function _YSensor(str_func)
    {
        //--- (generated code: YSensor constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Sensor';

        this._unit                           = Y_UNIT_INVALID;             // Text
        this._currentValue                   = Y_CURRENTVALUE_INVALID;     // MeasureVal
        this._lowestValue                    = Y_LOWESTVALUE_INVALID;      // MeasureVal
        this._highestValue                   = Y_HIGHESTVALUE_INVALID;     // MeasureVal
        this._currentRawValue                = Y_CURRENTRAWVALUE_INVALID;  // MeasureVal
        this._logFrequency                   = Y_LOGFREQUENCY_INVALID;     // YFrequency
        this._reportFrequency                = Y_REPORTFREQUENCY_INVALID;  // YFrequency
        this._advMode                        = Y_ADVMODE_INVALID;          // AdvertisingMode
        this._calibrationParam               = Y_CALIBRATIONPARAM_INVALID; // CalibParams
        this._resolution                     = Y_RESOLUTION_INVALID;       // MeasureVal
        this._sensorState                    = Y_SENSORSTATE_INVALID;      // Int
        this._timedReportCallbackSensor      = null;                       // YSensorTimedReportCallback
        this._prevTimedReport                = 0;                          // float
        this._iresol                         = 0;                          // float
        this._offset                         = 0;                          // float
        this._scale                          = 0;                          // float
        this._decexp                         = 0;                          // float
        this._caltyp                         = 0;                          // int
        this._calpar                         = [];                         // intArr
        this._calraw                         = [];                         // floatArr
        this._calref                         = [];                         // floatArr
        this._calhdl                         = null;                       // yCalibrationHandler
        //--- (end of generated code: YSensor constructor)
    }

    //--- (generated code: YSensor implementation)

    function YSensor_parseAttr(name, val, _super)
    {
        switch(name) {
        case "unit":
            this._unit = val;
            return 1;
        case "currentValue":
            this._currentValue = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "lowestValue":
            this._lowestValue = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "highestValue":
            this._highestValue = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "currentRawValue":
            this._currentRawValue = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "logFrequency":
            this._logFrequency = val;
            return 1;
        case "reportFrequency":
            this._reportFrequency = val;
            return 1;
        case "advMode":
            this._advMode = parseInt(val);
            return 1;
        case "calibrationParam":
            this._calibrationParam = val;
            return 1;
        case "resolution":
            this._resolution = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "sensorState":
            this._sensorState = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the measuring unit for the measure.
     *
     * @return a string corresponding to the measuring unit for the measure
     *
     * On failure, throws an exception or returns YSensor.UNIT_INVALID.
     */
    function YSensor_get_unit()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_UNIT_INVALID;
            }
        }
        res = this._unit;
        return res;
    }

    /**
     * Gets the measuring unit for the measure.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a string corresponding to the measuring unit for the measure
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSensor.UNIT_INVALID.
     */
    function YSensor_get_unit_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_UNIT_INVALID);
            } else {
                callback(context, obj, obj._unit);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current value of the measure, in the specified unit, as a floating point number.
     * Note that a get_currentValue() call will *not* start a measure in the device, it
     * will just return the last measure that occurred in the device. Indeed, internally, each Yoctopuce
     * devices is continuously making measurements at a hardware specific frequency.
     *
     * If continuously calling  get_currentValue() leads you to performances issues, then
     * you might consider to switch to callback programming model. Check the "advanced
     * programming" chapter in in your device user manual for more information.
     *
     * @return a floating point number corresponding to the current value of the measure, in the specified
     * unit, as a floating point number
     *
     * On failure, throws an exception or returns YSensor.CURRENTVALUE_INVALID.
     */
    function YSensor_get_currentValue()
    {
        var res;                    // float;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTVALUE_INVALID;
            }
        }
        res = this._applyCalibration(this._currentRawValue);
        if (res == Y_CURRENTVALUE_INVALID) {
            res = this._currentValue;
        }
        res = res * this._iresol;
        res = Math.round(res) / this._iresol;
        return res;
    }

    /**
     * Gets the current value of the measure, in the specified unit, as a floating point number.
     * Note that a get_currentValue() call will *not* start a measure in the device, it
     * will just return the last measure that occurred in the device. Indeed, internally, each Yoctopuce
     * devices is continuously making measurements at a hardware specific frequency.
     *
     * If continuously calling  get_currentValue() leads you to performances issues, then
     * you might consider to switch to callback programming model. Check the "advanced
     * programming" chapter in in your device user manual for more information.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the current value of the measure, in the
     *         specified unit, as a floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSensor.CURRENTVALUE_INVALID.
     */
    function YSensor_get_currentValue_async(callback,context)
    {
        var res;                    // float;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTVALUE_INVALID);
            } else {
                res = obj._applyCalibration(obj._currentRawValue);
                if (res == Y_CURRENTVALUE_INVALID) {
                    res = obj._currentValue;
                }
                res = res * obj._iresol;
                callback(context, obj, Math.round(res) / obj._iresol);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the recorded minimal value observed. Can be used to reset the value returned
     * by get_lowestValue().
     *
     * @param newval : a floating point number corresponding to the recorded minimal value observed
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_set_lowestValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('lowestValue',rest_val);
    }

    /**
     * Returns the minimal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_lowestValue().
     *
     * @return a floating point number corresponding to the minimal value observed for the measure since
     * the device was started
     *
     * On failure, throws an exception or returns YSensor.LOWESTVALUE_INVALID.
     */
    function YSensor_get_lowestValue()
    {
        var res;                    // float;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LOWESTVALUE_INVALID;
            }
        }
        res = this._lowestValue * this._iresol;
        res = Math.round(res) / this._iresol;
        return res;
    }

    /**
     * Gets the minimal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_lowestValue().
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the minimal value observed for the measure
     *         since the device was started
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSensor.LOWESTVALUE_INVALID.
     */
    function YSensor_get_lowestValue_async(callback,context)
    {
        var res;                    // float;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LOWESTVALUE_INVALID);
            } else {
                res = obj._lowestValue * obj._iresol;
                callback(context, obj, Math.round(res) / obj._iresol);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the recorded maximal value observed. Can be used to reset the value returned
     * by get_lowestValue().
     *
     * @param newval : a floating point number corresponding to the recorded maximal value observed
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_set_highestValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('highestValue',rest_val);
    }

    /**
     * Returns the maximal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_highestValue().
     *
     * @return a floating point number corresponding to the maximal value observed for the measure since
     * the device was started
     *
     * On failure, throws an exception or returns YSensor.HIGHESTVALUE_INVALID.
     */
    function YSensor_get_highestValue()
    {
        var res;                    // float;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_HIGHESTVALUE_INVALID;
            }
        }
        res = this._highestValue * this._iresol;
        res = Math.round(res) / this._iresol;
        return res;
    }

    /**
     * Gets the maximal value observed for the measure since the device was started.
     * Can be reset to an arbitrary value thanks to set_highestValue().
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the maximal value observed for the measure
     *         since the device was started
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSensor.HIGHESTVALUE_INVALID.
     */
    function YSensor_get_highestValue_async(callback,context)
    {
        var res;                    // float;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_HIGHESTVALUE_INVALID);
            } else {
                res = obj._highestValue * obj._iresol;
                callback(context, obj, Math.round(res) / obj._iresol);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the uncalibrated, unrounded raw value returned by the
     * sensor, in the specified unit, as a floating point number.
     *
     * @return a floating point number corresponding to the uncalibrated, unrounded raw value returned by the
     *         sensor, in the specified unit, as a floating point number
     *
     * On failure, throws an exception or returns YSensor.CURRENTRAWVALUE_INVALID.
     */
    function YSensor_get_currentRawValue()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTRAWVALUE_INVALID;
            }
        }
        res = this._currentRawValue;
        return res;
    }

    /**
     * Gets the uncalibrated, unrounded raw value returned by the
     * sensor, in the specified unit, as a floating point number.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the uncalibrated, unrounded raw value returned by the
     *         sensor, in the specified unit, as a floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSensor.CURRENTRAWVALUE_INVALID.
     */
    function YSensor_get_currentRawValue_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTRAWVALUE_INVALID);
            } else {
                callback(context, obj, obj._currentRawValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the datalogger recording frequency for this function, or "OFF"
     * when measures are not stored in the data logger flash memory.
     *
     * @return a string corresponding to the datalogger recording frequency for this function, or "OFF"
     *         when measures are not stored in the data logger flash memory
     *
     * On failure, throws an exception or returns YSensor.LOGFREQUENCY_INVALID.
     */
    function YSensor_get_logFrequency()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LOGFREQUENCY_INVALID;
            }
        }
        res = this._logFrequency;
        return res;
    }

    /**
     * Gets the datalogger recording frequency for this function, or "OFF"
     * when measures are not stored in the data logger flash memory.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a string corresponding to the datalogger recording frequency for this function, or "OFF"
     *         when measures are not stored in the data logger flash memory
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSensor.LOGFREQUENCY_INVALID.
     */
    function YSensor_get_logFrequency_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LOGFREQUENCY_INVALID);
            } else {
                callback(context, obj, obj._logFrequency);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the datalogger recording frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (eg. "4/h"). To disable recording for this function, use
     * the value "OFF". Note that setting the  datalogger recording frequency
     * to a greater value than the sensor native sampling frequency is useless,
     * and even counterproductive: those two frequencies are not related.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the datalogger recording frequency for this function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_set_logFrequency(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logFrequency',rest_val);
    }

    /**
     * Returns the timed value notification frequency, or "OFF" if timed
     * value notifications are disabled for this function.
     *
     * @return a string corresponding to the timed value notification frequency, or "OFF" if timed
     *         value notifications are disabled for this function
     *
     * On failure, throws an exception or returns YSensor.REPORTFREQUENCY_INVALID.
     */
    function YSensor_get_reportFrequency()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_REPORTFREQUENCY_INVALID;
            }
        }
        res = this._reportFrequency;
        return res;
    }

    /**
     * Gets the timed value notification frequency, or "OFF" if timed
     * value notifications are disabled for this function.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a string corresponding to the timed value notification frequency, or "OFF" if timed
     *         value notifications are disabled for this function
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSensor.REPORTFREQUENCY_INVALID.
     */
    function YSensor_get_reportFrequency_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_REPORTFREQUENCY_INVALID);
            } else {
                callback(context, obj, obj._reportFrequency);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the timed value notification frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (e.g. "4/h"). To disable timed value notifications for this
     * function, use the value "OFF". Note that setting the  timed value
     * notification frequency to a greater value than the sensor native
     * sampling frequency is unless, and even counterproductive: those two
     * frequencies are not related.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the timed value notification frequency for this function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_set_reportFrequency(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('reportFrequency',rest_val);
    }

    /**
     * Returns the measuring mode used for the advertised value pushed to the parent hub.
     *
     * @return a value among YSensor.ADVMODE_IMMEDIATE, YSensor.ADVMODE_PERIOD_AVG,
     * YSensor.ADVMODE_PERIOD_MIN and YSensor.ADVMODE_PERIOD_MAX corresponding to the measuring mode used
     * for the advertised value pushed to the parent hub
     *
     * On failure, throws an exception or returns YSensor.ADVMODE_INVALID.
     */
    function YSensor_get_advMode()
    {
        var res;                    // enumADVERTISINGMODE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ADVMODE_INVALID;
            }
        }
        res = this._advMode;
        return res;
    }

    /**
     * Gets the measuring mode used for the advertised value pushed to the parent hub.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a value among YSensor.ADVMODE_IMMEDIATE, YSensor.ADVMODE_PERIOD_AVG,
     *         YSensor.ADVMODE_PERIOD_MIN and YSensor.ADVMODE_PERIOD_MAX corresponding to the measuring mode used
     *         for the advertised value pushed to the parent hub
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSensor.ADVMODE_INVALID.
     */
    function YSensor_get_advMode_async(callback,context)
    {
        var res;                    // enumADVERTISINGMODE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ADVMODE_INVALID);
            } else {
                callback(context, obj, obj._advMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the measuring mode used for the advertised value pushed to the parent hub.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YSensor.ADVMODE_IMMEDIATE, YSensor.ADVMODE_PERIOD_AVG,
     * YSensor.ADVMODE_PERIOD_MIN and YSensor.ADVMODE_PERIOD_MAX corresponding to the measuring mode used
     * for the advertised value pushed to the parent hub
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_set_advMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('advMode',rest_val);
    }

    function YSensor_get_calibrationParam()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALIBRATIONPARAM_INVALID;
            }
        }
        res = this._calibrationParam;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YSensor_get_calibrationParam_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALIBRATIONPARAM_INVALID);
            } else {
                callback(context, obj, obj._calibrationParam);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YSensor_set_calibrationParam(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('calibrationParam',rest_val);
    }

    /**
     * Changes the resolution of the measured physical values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the resolution of the measured physical values
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_set_resolution(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('resolution',rest_val);
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return a floating point number corresponding to the resolution of the measured values
     *
     * On failure, throws an exception or returns YSensor.RESOLUTION_INVALID.
     */
    function YSensor_get_resolution()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RESOLUTION_INVALID;
            }
        }
        res = this._resolution;
        return res;
    }

    /**
     * Gets the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the resolution of the measured values
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSensor.RESOLUTION_INVALID.
     */
    function YSensor_get_resolution_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RESOLUTION_INVALID);
            } else {
                callback(context, obj, obj._resolution);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the sensor state code, which is zero when there is an up-to-date measure
     * available or a positive code if the sensor is not able to provide a measure right now.
     *
     * @return an integer corresponding to the sensor state code, which is zero when there is an up-to-date measure
     *         available or a positive code if the sensor is not able to provide a measure right now
     *
     * On failure, throws an exception or returns YSensor.SENSORSTATE_INVALID.
     */
    function YSensor_get_sensorState()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SENSORSTATE_INVALID;
            }
        }
        res = this._sensorState;
        return res;
    }

    /**
     * Gets the sensor state code, which is zero when there is an up-to-date measure
     * available or a positive code if the sensor is not able to provide a measure right now.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:an integer corresponding to the sensor state code, which is zero when there is an
     *         up-to-date measure
     *         available or a positive code if the sensor is not able to provide a measure right now
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSensor.SENSORSTATE_INVALID.
     */
    function YSensor_get_sensorState_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SENSORSTATE_INVALID);
            } else {
                callback(context, obj, obj._sensorState);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSensor.isOnline() to test if the sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the sensor, for instance
     *         MyDevice..
     *
     * @return a YSensor object allowing you to drive the sensor.
     */
    function YSensor_FindSensor(func)                           // class method
    {
        var obj;                    // YSensor;
        obj = YFunction._FindFromCache("Sensor", func);
        if (obj == null) {
            obj = new YSensor(func);
            YFunction._AddToCache("Sensor", func, obj);
        }
        return obj;
    }

    function YSensor_parserHelper()
    {
        var position;               // int;
        var maxpos;                 // int;
        var iCalib = [];            // intArr;
        var iRaw;                   // int;
        var iRef;                   // int;
        var fRaw;                   // float;
        var fRef;                   // float;
        this._caltyp = -1;
        this._scale = -1;
        this._calpar.length = 0;
        this._calraw.length = 0;
        this._calref.length = 0;
        // Store inverted resolution, to provide better rounding
        if (this._resolution > 0) {
            this._iresol = Math.round(1.0 / this._resolution);
        } else {
            this._iresol = 10000;
            this._resolution = 0.0001;
        }
        // Old format: supported when there is no calibration
        if (this._calibrationParam == "" || this._calibrationParam == "0") {
            this._caltyp = 0;
            return 0;
        }
        if ((this._calibrationParam).indexOf(",") >= 0) {
            // Plain text format
            iCalib = YAPI._decodeFloats(this._calibrationParam);
            this._caltyp = parseInt((iCalib[0]) / (1000));
            if (this._caltyp > 0) {
                if (this._caltyp < YOCTO_CALIB_TYPE_OFS) {
                    // Unknown calibration type: calibrated value will be provided by the device
                    this._caltyp = -1;
                    return 0;
                }
                this._calhdl = YAPI._getCalibrationHandler(this._caltyp);
                if (!(this._calhdl != null)) {
                    // Unknown calibration type: calibrated value will be provided by the device
                    this._caltyp = -1;
                    return 0;
                }
            }
            // New 32 bits text format
            this._offset = 0;
            this._scale = 1000;
            maxpos = iCalib.length;
            this._calpar.length = 0;
            position = 1;
            while (position < maxpos) {
                this._calpar.push(iCalib[position]);
                position = position + 1;
            }
            this._calraw.length = 0;
            this._calref.length = 0;
            position = 1;
            while (position + 1 < maxpos) {
                fRaw = iCalib[position];
                fRaw = fRaw / 1000.0;
                fRef = iCalib[position + 1];
                fRef = fRef / 1000.0;
                this._calraw.push(fRaw);
                this._calref.push(fRef);
                position = position + 2;
            }
        } else {
            // Recorder-encoded format, including encoding
            iCalib = YAPI._decodeWords(this._calibrationParam);
            // In case of unknown format, calibrated value will be provided by the device
            if (iCalib.length < 2) {
                this._caltyp = -1;
                return 0;
            }
            // Save variable format (scale for scalar, or decimal exponent)
            this._offset = 0;
            this._scale = 1;
            this._decexp = 1.0;
            position = iCalib[0];
            while (position > 0) {
                this._decexp = this._decexp * 10;
                position = position - 1;
            }
            // Shortcut when there is no calibration parameter
            if (iCalib.length == 2) {
                this._caltyp = 0;
                return 0;
            }
            this._caltyp = iCalib[2];
            this._calhdl = YAPI._getCalibrationHandler(this._caltyp);
            // parse calibration points
            if (this._caltyp <= 10) {
                maxpos = this._caltyp;
            } else {
                if (this._caltyp <= 20) {
                    maxpos = this._caltyp - 10;
                } else {
                    maxpos = 5;
                }
            }
            maxpos = 3 + 2 * maxpos;
            if (maxpos > iCalib.length) {
                maxpos = iCalib.length;
            }
            this._calpar.length = 0;
            this._calraw.length = 0;
            this._calref.length = 0;
            position = 3;
            while (position + 1 < maxpos) {
                iRaw = iCalib[position];
                iRef = iCalib[position + 1];
                this._calpar.push(iRaw);
                this._calpar.push(iRef);
                this._calraw.push(YAPI._decimalToDouble(iRaw));
                this._calref.push(YAPI._decimalToDouble(iRef));
                position = position + 2;
            }
        }
        return 0;
    }

    /**
     * Checks if the sensor is currently able to provide an up-to-date measure.
     * Returns false if the device is unreachable, or if the sensor does not have
     * a current measure to transmit. No exception is raised if there is an error
     * while trying to contact the device hosting $THEFUNCTION$.
     *
     * @return true if the sensor can provide an up-to-date measure, and false otherwise
     */
    function YSensor_isSensorReady()
    {
        if (!(this.isOnline())) {
            return false;
        }
        if (!(this._sensorState == 0)) {
            return false;
        }
        return true;
    }

    /**
     * Returns the YDatalogger object of the device hosting the sensor. This method returns an object
     * that can control global parameters of the data logger. The returned object
     * should not be freed.
     *
     * @return an YDatalogger object, or null on error.
     */
    function YSensor_get_dataLogger()
    {
        var logger;                 // YDataLogger;
        var modu;                   // YModule;
        var serial;                 // str;
        var hwid;                   // str;

        modu = this.get_module();
        serial = modu.get_serialNumber();
        if (serial == YAPI_INVALID_STRING) {
            return null;
        }
        hwid = serial + ".dataLogger";
        logger = YDataLogger.FindDataLogger(hwid);
        return logger;
    }

    /**
     * Starts the data logger on the device. Note that the data logger
     * will only save the measures on this sensor if the logFrequency
     * is not set to "OFF".
     *
     * @return YAPI.SUCCESS if the call succeeds.
     */
    function YSensor_startDataLogger()
    {
        var res;                    // bin;

        res = this._download("api/dataLogger/recording?recording=1");
        if (!((res).length > 0)) {
            return this._throw(YAPI_IO_ERROR,"unable to start datalogger",YAPI_IO_ERROR);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Stops the datalogger on the device.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     */
    function YSensor_stopDataLogger()
    {
        var res;                    // bin;

        res = this._download("api/dataLogger/recording?recording=0");
        if (!((res).length > 0)) {
            return this._throw(YAPI_IO_ERROR,"unable to stop datalogger",YAPI_IO_ERROR);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves a YDataSet object holding historical data for this
     * sensor, for a specified time interval. The measures will be
     * retrieved from the data logger, which must have been turned
     * on at the desired time. See the documentation of the YDataSet
     * class for information on how to get an overview of the
     * recorded data, and how to load progressively a large set
     * of measures from the data logger.
     *
     * This function only works if the device uses a recent firmware,
     * as YDataSet objects are not supported by firmwares older than
     * version 13000.
     *
     * @param startTime : the start of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without initial limit.
     * @param endTime : the end of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any measure, without ending limit.
     *
     * @return an instance of YDataSet, providing access to historical
     *         data. Past measures can be loaded progressively
     *         using methods from the YDataSet object.
     */
    function YSensor_get_recordedData(startTime,endTime)
    {
        var funcid;                 // str;
        var funit;                  // str;

        funcid = this.get_functionId();
        funit = this.get_unit();
        return new YDataSet(this, funcid, funit, startTime, endTime);
    }

    /**
     * Registers the callback function that is invoked on every periodic timed notification.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and an YMeasure object describing
     *         the new advertised value.
     * @noreturn
     */
    function YSensor_registerTimedReportCallback(callback)
    {
        var sensor;                 // YSensor;
        sensor = this;
        if (callback != null) {
            YFunction._UpdateTimedReportCallbackList(sensor, true);
        } else {
            YFunction._UpdateTimedReportCallbackList(sensor, false);
        }
        this._timedReportCallbackSensor = callback;
        return 0;
    }

    function YSensor_invokeTimedReportCallback(value)
    {
        if (this._timedReportCallbackSensor != null) {
            this._timedReportCallbackSensor(this, value);
        } else {
        }
        return 0;
    }

    /**
     * Configures error correction data points, in particular to compensate for
     * a possible perturbation of the measure caused by an enclosure. It is possible
     * to configure up to five correction points. Correction points must be provided
     * in ascending order, and be in the range of the sensor. The device will automatically
     * perform a linear interpolation of the error correction between specified
     * points. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * For more information on advanced capabilities to refine the calibration of
     * sensors, please contact support@yoctopuce.com.
     *
     * @param rawValues : array of floating point numbers, corresponding to the raw
     *         values returned by the sensor for the correction points.
     * @param refValues : array of floating point numbers, corresponding to the corrected
     *         values for the correction points.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_calibrateFromPoints(rawValues,refValues)
    {
        var rest_val;               // str;
        var res;                    // int;

        rest_val = this._encodeCalibrationPoints(rawValues, refValues);
        res = this._setAttr("calibrationParam", rest_val);
        return res;
    }

    /**
     * Retrieves error correction data points previously entered using the method
     * calibrateFromPoints.
     *
     * @param rawValues : array of floating point numbers, that will be filled by the
     *         function with the raw sensor values for the correction points.
     * @param refValues : array of floating point numbers, that will be filled by the
     *         function with the desired values for the correction points.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_loadCalibrationPoints(rawValues,refValues)
    {
        var ii; // iterator
        rawValues.length = 0;
        refValues.length = 0;
        // Load function parameters if not yet loaded
        if ((this._scale == 0) || (this._cacheExpiration <= YAPI.GetTickCount())) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return YAPI_DEVICE_NOT_FOUND;
            }
        }
        if (this._caltyp < 0) {
            this._throw(YAPI_NOT_SUPPORTED, "Calibration parameters format mismatch. Please upgrade your library or firmware.");
            return YAPI_NOT_SUPPORTED;
        }
        rawValues.length = 0;
        refValues.length = 0;
        for (ii_0 in this._calraw) {
            if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
            rawValues.push(this._calraw[ii_0]);
        }
        for (ii_1 in this._calref) {
            if(ii_1 =='indexOf') continue; // IE8 Don'tEnum bug
            refValues.push(this._calref[ii_1]);
        }
        return YAPI_SUCCESS;
    }

    function YSensor_encodeCalibrationPoints(rawValues,refValues)
    {
        var res;                    // str;
        var npt;                    // int;
        var idx;                    // int;
        npt = rawValues.length;
        if (npt != refValues.length) {
            this._throw(YAPI_INVALID_ARGUMENT, "Invalid calibration parameters (size mismatch)");
            return YAPI_INVALID_STRING;
        }
        // Shortcut when building empty calibration parameters
        if (npt == 0) {
            return "0";
        }
        // Load function parameters if not yet loaded
        if (this._scale == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return YAPI_INVALID_STRING;
            }
        }
        // Detect old firmware
        if ((this._caltyp < 0) || (this._scale < 0)) {
            this._throw(YAPI_NOT_SUPPORTED, "Calibration parameters format mismatch. Please upgrade your library or firmware.");
            return "0";
        }
        // 32-bit fixed-point encoding
        res = ""+String(Math.round(YOCTO_CALIB_TYPE_OFS));
        idx = 0;
        while (idx < npt) {
            res = ""+res+","+String(Math.round(rawValues[idx]*1000)/1000)+","+String(Math.round(refValues[idx]*1000)/1000);
            idx = idx + 1;
        }
        return res;
    }

    function YSensor_applyCalibration(rawValue)
    {
        if (rawValue == Y_CURRENTVALUE_INVALID) {
            return Y_CURRENTVALUE_INVALID;
        }
        if (this._caltyp == 0) {
            return rawValue;
        }
        if (this._caltyp < 0) {
            return Y_CURRENTVALUE_INVALID;
        }
        if (!(this._calhdl != null)) {
            return Y_CURRENTVALUE_INVALID;
        }
        return this._calhdl(rawValue, this._caltyp, this._calpar, this._calraw, this._calref);
    }

    function YSensor_decodeTimedReport(timestamp,duration,report)
    {
        var i;                      // int;
        var byteVal;                // int;
        var poww;                   // float;
        var minRaw;                 // float;
        var avgRaw;                 // float;
        var maxRaw;                 // float;
        var sublen;                 // int;
        var difRaw;                 // float;
        var startTime;              // float;
        var endTime;                // float;
        var minVal;                 // float;
        var avgVal;                 // float;
        var maxVal;                 // float;
        if (duration > 0) {
            startTime = timestamp - duration;
        } else {
            startTime = this._prevTimedReport;
        }
        endTime = timestamp;
        this._prevTimedReport = endTime;
        if (startTime == 0) {
            startTime = endTime;
        }
        // 32 bits timed report format
        if (report.length <= 5) {
            // sub-second report, 1-4 bytes
            poww = 1;
            avgRaw = 0;
            byteVal = 0;
            i = 1;
            while (i < report.length) {
                byteVal = report[i];
                avgRaw = avgRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
            }
            if ((byteVal & 0x80) != 0) {
                avgRaw = avgRaw - poww;
            }
            avgVal = avgRaw / 1000.0;
            if (this._caltyp != 0) {
                if (this._calhdl != null) {
                    avgVal = this._calhdl(avgVal, this._caltyp, this._calpar, this._calraw, this._calref);
                }
            }
            minVal = avgVal;
            maxVal = avgVal;
        } else {
            // averaged report: avg,avg-min,max-avg
            sublen = 1 + (report[1] & 3);
            poww = 1;
            avgRaw = 0;
            byteVal = 0;
            i = 2;
            while ((sublen > 0) && (i < report.length)) {
                byteVal = report[i];
                avgRaw = avgRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
                sublen = sublen - 1;
            }
            if ((byteVal & 0x80) != 0) {
                avgRaw = avgRaw - poww;
            }
            sublen = 1 + ((report[1] >> 2) & 3);
            poww = 1;
            difRaw = 0;
            while ((sublen > 0) && (i < report.length)) {
                byteVal = report[i];
                difRaw = difRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
                sublen = sublen - 1;
            }
            minRaw = avgRaw - difRaw;
            sublen = 1 + ((report[1] >> 4) & 3);
            poww = 1;
            difRaw = 0;
            while ((sublen > 0) && (i < report.length)) {
                byteVal = report[i];
                difRaw = difRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
                sublen = sublen - 1;
            }
            maxRaw = avgRaw + difRaw;
            avgVal = avgRaw / 1000.0;
            minVal = minRaw / 1000.0;
            maxVal = maxRaw / 1000.0;
            if (this._caltyp != 0) {
                if (this._calhdl != null) {
                    avgVal = this._calhdl(avgVal, this._caltyp, this._calpar, this._calraw, this._calref);
                    minVal = this._calhdl(minVal, this._caltyp, this._calpar, this._calraw, this._calref);
                    maxVal = this._calhdl(maxVal, this._caltyp, this._calpar, this._calraw, this._calref);
                }
            }
        }
        return new YMeasure(startTime, endTime, minVal, avgVal, maxVal);
    }

    function YSensor_decodeVal(w)
    {
        var val;                    // float;
        val = w;
        if (this._caltyp != 0) {
            if (this._calhdl != null) {
                val = this._calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    function YSensor_decodeAvg(dw)
    {
        var val;                    // float;
        val = dw;
        if (this._caltyp != 0) {
            if (this._calhdl != null) {
                val = this._calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    /**
     * Continues the enumeration of sensors started using yFirstSensor().
     * Caution: You can't make any assumption about the returned sensors order.
     * If you want to find a specific a sensor, use Sensor.findSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSensor object, corresponding to
     *         a sensor currently online, or a null pointer
     *         if there are no more sensors to enumerate.
     */
    function YSensor_nextSensor()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSensor.FindSensor(next_hwid);
    }

    /**
     * Starts the enumeration of sensors currently accessible.
     * Use the method YSensor.nextSensor() to iterate on
     * next sensors.
     *
     * @return a pointer to a YSensor object, corresponding to
     *         the first sensor currently online, or a null pointer
     *         if there are none.
     */
    function YSensor_FirstSensor()
    {
        var next_hwid = YAPI.getFirstHardwareId('Sensor');
        if(next_hwid == null) return null;
        return YSensor.FindSensor(next_hwid);
    }

    //--- (end of generated code: YSensor implementation)

    //--- (generated code: YSensor initialization)
    YSensor = YFunction._Subclass(_YSensor, {
        // Constants
        UNIT_INVALID                : YAPI_INVALID_STRING,
        CURRENTVALUE_INVALID        : YAPI_INVALID_DOUBLE,
        LOWESTVALUE_INVALID         : YAPI_INVALID_DOUBLE,
        HIGHESTVALUE_INVALID        : YAPI_INVALID_DOUBLE,
        CURRENTRAWVALUE_INVALID     : YAPI_INVALID_DOUBLE,
        LOGFREQUENCY_INVALID        : YAPI_INVALID_STRING,
        REPORTFREQUENCY_INVALID     : YAPI_INVALID_STRING,
        ADVMODE_IMMEDIATE           : 0,
        ADVMODE_PERIOD_AVG          : 1,
        ADVMODE_PERIOD_MIN          : 2,
        ADVMODE_PERIOD_MAX          : 3,
        ADVMODE_INVALID             : -1,
        CALIBRATIONPARAM_INVALID    : YAPI_INVALID_STRING,
        RESOLUTION_INVALID          : YAPI_INVALID_DOUBLE,
        SENSORSTATE_INVALID         : YAPI_INVALID_INT
    }, {
        // Class methods
        FindSensor                  : YSensor_FindSensor,
        FirstSensor                 : YSensor_FirstSensor
    }, {
        // Methods
        get_unit                    : YSensor_get_unit,
        unit                        : YSensor_get_unit,
        get_unit_async              : YSensor_get_unit_async,
        unit_async                  : YSensor_get_unit_async,
        get_currentValue            : YSensor_get_currentValue,
        currentValue                : YSensor_get_currentValue,
        get_currentValue_async      : YSensor_get_currentValue_async,
        currentValue_async          : YSensor_get_currentValue_async,
        set_lowestValue             : YSensor_set_lowestValue,
        setLowestValue              : YSensor_set_lowestValue,
        get_lowestValue             : YSensor_get_lowestValue,
        lowestValue                 : YSensor_get_lowestValue,
        get_lowestValue_async       : YSensor_get_lowestValue_async,
        lowestValue_async           : YSensor_get_lowestValue_async,
        set_highestValue            : YSensor_set_highestValue,
        setHighestValue             : YSensor_set_highestValue,
        get_highestValue            : YSensor_get_highestValue,
        highestValue                : YSensor_get_highestValue,
        get_highestValue_async      : YSensor_get_highestValue_async,
        highestValue_async          : YSensor_get_highestValue_async,
        get_currentRawValue         : YSensor_get_currentRawValue,
        currentRawValue             : YSensor_get_currentRawValue,
        get_currentRawValue_async   : YSensor_get_currentRawValue_async,
        currentRawValue_async       : YSensor_get_currentRawValue_async,
        get_logFrequency            : YSensor_get_logFrequency,
        logFrequency                : YSensor_get_logFrequency,
        get_logFrequency_async      : YSensor_get_logFrequency_async,
        logFrequency_async          : YSensor_get_logFrequency_async,
        set_logFrequency            : YSensor_set_logFrequency,
        setLogFrequency             : YSensor_set_logFrequency,
        get_reportFrequency         : YSensor_get_reportFrequency,
        reportFrequency             : YSensor_get_reportFrequency,
        get_reportFrequency_async   : YSensor_get_reportFrequency_async,
        reportFrequency_async       : YSensor_get_reportFrequency_async,
        set_reportFrequency         : YSensor_set_reportFrequency,
        setReportFrequency          : YSensor_set_reportFrequency,
        get_advMode                 : YSensor_get_advMode,
        advMode                     : YSensor_get_advMode,
        get_advMode_async           : YSensor_get_advMode_async,
        advMode_async               : YSensor_get_advMode_async,
        set_advMode                 : YSensor_set_advMode,
        setAdvMode                  : YSensor_set_advMode,
        get_calibrationParam        : YSensor_get_calibrationParam,
        calibrationParam            : YSensor_get_calibrationParam,
        get_calibrationParam_async  : YSensor_get_calibrationParam_async,
        calibrationParam_async      : YSensor_get_calibrationParam_async,
        set_calibrationParam        : YSensor_set_calibrationParam,
        setCalibrationParam         : YSensor_set_calibrationParam,
        set_resolution              : YSensor_set_resolution,
        setResolution               : YSensor_set_resolution,
        get_resolution              : YSensor_get_resolution,
        resolution                  : YSensor_get_resolution,
        get_resolution_async        : YSensor_get_resolution_async,
        resolution_async            : YSensor_get_resolution_async,
        get_sensorState             : YSensor_get_sensorState,
        sensorState                 : YSensor_get_sensorState,
        get_sensorState_async       : YSensor_get_sensorState_async,
        sensorState_async           : YSensor_get_sensorState_async,
        _parserHelper               : YSensor_parserHelper,
        isSensorReady               : YSensor_isSensorReady,
        get_dataLogger              : YSensor_get_dataLogger,
        dataLogger                  : YSensor_get_dataLogger,
        startDataLogger             : YSensor_startDataLogger,
        stopDataLogger              : YSensor_stopDataLogger,
        get_recordedData            : YSensor_get_recordedData,
        recordedData                : YSensor_get_recordedData,
        registerTimedReportCallback : YSensor_registerTimedReportCallback,
        _invokeTimedReportCallback  : YSensor_invokeTimedReportCallback,
        calibrateFromPoints         : YSensor_calibrateFromPoints,
        loadCalibrationPoints       : YSensor_loadCalibrationPoints,
        _encodeCalibrationPoints    : YSensor_encodeCalibrationPoints,
        _applyCalibration           : YSensor_applyCalibration,
        _decodeTimedReport          : YSensor_decodeTimedReport,
        _decodeVal                  : YSensor_decodeVal,
        _decodeAvg                  : YSensor_decodeAvg,
        nextSensor                  : YSensor_nextSensor,
        _parseAttr                  : YSensor_parseAttr
    });
    //--- (end of generated code: YSensor initialization)


    // Internal function to preload all values into object
    //
    function YOldDataStream_loadStream()
    {
        var coldiv = null;
        var coltyp = null;
        var colscl = null;
        var colofs = null;
        var calhdl = null;
        var caltyp = null;
        var calpar = null;
        var calraw = null;
        var calref = null;
        var c, i;

        var loadval = this._dataLogger.getData(this._runNo, this._timeStamp);
        if(loadval == null) {
            return this._dataLogger.get_errorType();
        }
        if(loadval['time'] != null)     this._timeStamp = loadval['time'];
        if(loadval['UTC'] != null)      this._utcStamp  = loadval['UTC'];
        if(loadval['interval'] != null) this._interval  = loadval['interval'];
        if(loadval['nRows'] != null)    this._nRows     = loadval['nRows'];
        if(loadval['keys'] != null) {
            this._columnNames = loadval['keys'];
            if(this._nCols == 0) {
                this._nCols = this._columnNames.length;
            } else if(this._nCols != this._columnNames.length) {
                this._nCols = 0;
                return YAPI_IO_ERROR;
            }
        }
        if(loadval['div'] != null) {
            coldiv = loadval['div'];
            if(this._nCols == 0) {
                this._nCols = coldiv.length;
            } else if(this._nCols != coldiv.length) {
                this._nCols = 0;
                return YAPI_IO_ERROR;
            }
        }
        if(loadval['type'] != null) {
            coltyp = loadval['type'];
            if(this._nCols == 0) {
                this._nCols = coltyp.length;
            } else if(this._nCols != coltyp.length) {
                this._nCols = 0;
                return YAPI_IO_ERROR;
            }
        }
        if(loadval['scal'] != null) {
            colscl = loadval['scal'];
            colofs = [];
            if(this._nCols != colscl.length) {
                this._nCols = 0;
                return YAPI_IO_ERROR;
            }
            for(i = 0; i < colscl.length; i++) {
                colscl[i] /= 65536.0;
                colofs[i] = (coltyp[i] != 0 ? -32767 : 0);
            }
        } else {
            colscl = [];
            colofs = [];
            for(i = 0; i < coldiv.length; i++) {
                colscl[i] = 1.0 / coldiv[i];
                colofs[i] = (coltyp[i] != 0 ? -32767 : 0);
            }
        }
        if(loadval['cal'] != null) {
            calhdl = new Array(this._nCols);
            caltyp = new Array(this._nCols);
            calpar = new Array(this._nCols);
            calraw = new Array(this._nCols);
            calref = new Array(this._nCols);
            for(c = 0; c < this._nCols; c++) {
                var params = loadval['cal'][c];
                if(!params) continue;
                params = params.split(",");
                if(params.length < 11) continue;
                calhdl[c] = YAPI._getCalibrationHandler(params[0]);
                if(!calhdl[c]) continue;
                caltyp[c] = parseInt(params[0]);
                calpar[c] = new Array(params.length-1);
                calraw[c] = new Array(params.length>>1);
                calref[c] = new Array(params.length>>1);
                for(i = 1; i < params.length; i += 2) {
                    calpar[c][i-1] = parseInt(params[i]);
                    calpar[c][i]   = parseInt(params[i+1]);
                    if(caltyp[c] <= 10) {
                        calraw[c][i>>1] = (calpar[c][i-1] + colofs[c]) / coldiv[c];
                        calref[c][i>>1] = (calpar[c][i]   + colofs[c]) / coldiv[c];
                    } else {
                        calraw[c][i>>1] = YAPI._decimalToDouble(calpar[c][i-1]);
                        calref[c][i>>1] = YAPI._decimalToDouble(calpar[c][i]);
                    }
                }
            }
        }
        if(loadval['data'] != null) {
            if(this._nCols == 0 || coldiv == null || coltyp == null) {
                return YAPI_IO_ERROR;
            }
            this._values = [];
            var data = loadval['data'];
            if(typeof data == "string") {
                data = YAPI._decodeWords(data);
            }
            var dat = [];
            c = 0;
            for(var idx in data) {
                var val;
                if(coltyp[c] < 2) {
                    val = (data[idx] + colofs[c]) * colscl[c];
                } else {
                    val = YAPI._decimalToDouble(data[idx]-32767);
                }
                if(calhdl && calhdl[c]) {
                    // use post-calibration function
                    if(caltyp[c] <= 10) {
                        // linear calibration using unscaled value
                        val = calhdl[c]((data[idx] + colofs[c]) / coldiv[c], caltyp[c], calpar[c], calraw[c], calref[c]);
                    } else if(caltyp[c] > 20) {
                        // custom calibration using raw floating-point value stored by the datalogger
                        val = calhdl[c](val, caltyp[c], calpar[c], calraw[c], calref[c]);
                    }
                }
                dat.push(val);
                if(++c == this._nCols) {
                    this._values.push(dat);
                    dat = [];
                    c = 0;
                }
            }
        }
        return YAPI_SUCCESS;
    }

    /**
     * Returns the relative start time of the data stream, measured in seconds.
     * For recent firmwares, the value is relative to the present time,
     * which means the value is always negative.
     * If the device uses a firmware older than version 13000, value is
     * relative to the start of the time the device was powered on, and
     * is always positive.
     * If you need an absolute UTC timestamp, use get_startTimeUTC().
     *
     * @return an unsigned number corresponding to the number of seconds
     *         between the start of the run and the beginning of this data
     *         stream.
     */
    function YOldDataStream_get_startTime()
    {
        return this._timeStamp;
    }

    /**
     * Returns the number of seconds elapsed between  two consecutive
     * rows of this data stream. By default, the data logger records one row
     * per second, but there might be alternative streams at lower resolution
     * created by summarizing the original stream for archiving purposes.
     *
     * This method does not cause any access to the device, as the value
     * is preloaded in the object at instantiation time.
     *
     * @return an unsigned number corresponding to a number of seconds.
     */
    function YOldDataStream_get_dataSamplesInterval()
    {
        if(this._interval == 0) this.loadStream();
        return this._interval;
    }

    // Data preloaded on object instantiation
    function _YOldDataStream(obj_parent, int_run, int_stamp, int_utc, int_itv)
    {
        // inherit from YDataStream
        YDataStream.call(this, obj_parent);

        this._dataLogger = obj_parent;
        this._runNo      = int_run;
        this._timeStamp  = int_stamp;
        this._utcStamp   = (int_utc == null ? -1 : int_utc);
        this._interval   = (int_itv == null ? 0 : int_itv);
        this._samplesPerHour = (this._interval == 0 ? 3600 : 3600 / this._interval);
        this._isClosed   = 1;
        this._minVal     = this.DATA_INVALID;
        this._avgVal     = this.DATA_INVALID;
        this._maxVal     = this.DATA_INVALID;
    }

    YOldDataStream = _YOldDataStream;
    // Methods
    YOldDataStream.prototype.loadStream              = YOldDataStream_loadStream;
    YOldDataStream.prototype.get_startTime           = YOldDataStream_get_startTime;
    YOldDataStream.prototype.startTime               = YOldDataStream_get_startTime;
    YOldDataStream.prototype.get_dataSamplesInterval = YOldDataStream_get_dataSamplesInterval;
    YOldDataStream.prototype.dataSamplesInterval     = YOldDataStream_get_dataSamplesInterval;

    // Internal function to retrieve datalogger memory
    //
    function YDataLogger_getData(runIdx, timeIdx)
    {
        var loadval;

        if(this.dataLoggerURL == undefined) {
            this.dataLoggerURL = '/logger.json';
        }

        // get the device serial number
        var devid = this.module().get_serialNumber();
        if(devid == Y_SERIALNUMBER_INVALID) {
            return null;
        }
        var httpreq = "GET "+this.dataLoggerURL;
        if(timeIdx) {
            httpreq += "?run="+runIdx+"&time="+timeIdx;
        }
        var yreq = YAPI.devRequest(devid, httpreq);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(yreq.errorMsg.indexOf('HTTP status 404') >= 0 && this.dataLoggerURL != '/dataLogger.json') {
                this.dataLoggerURL = '/dataLogger.json';
                return this.getData(runIdx, timeIdx);
            }
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }

        return JSON.parse(yreq.result, true);
    }

    function YDataLogger_get_dataStreams(v)
    {
        var loadval = this.getData(null, null);
        if(loadval == null) {
            return this.get_errorType();
        }
        if(loadval.length == 0) {
            return YAPI_SUCCESS;
        }
        if(Array.isArray(loadval[0])) {
            // old datalogger format: [runIdx, timerel, utc, interval]
            for(var idx in loadval) {
                var arr = loadval[idx];
                if(arr.length < 4) {
                    _throw(YAPI_IO_ERROR, "Unexpected JSON reply format");
                    return YAPI_IO_ERROR;
                }
                v.push(new YOldDataStream(this,arr[0],arr[1],arr[2],arr[3]));
            }
        } else {
            // new datalogger format: {"id":"...","unit":"...","streams":["...",...]}
            var sets = this.parse_dataSets(JSON.stringify(loadval));
            for (var i = 0; i < sets.length; i++) {
                var ds = sets[i].get_privateDataStreams();
                for (var si=0; si < ds.length; si++) {
                    v.push(ds[si]);
                }
            }
        }
        return YAPI_SUCCESS;
    }


    //--- (generated code: YDataLogger implementation)

    function YDataLogger_parseAttr(name, val, _super)
    {
        switch(name) {
        case "currentRunIndex":
            this._currentRunIndex = parseInt(val);
            return 1;
        case "timeUTC":
            this._timeUTC = parseInt(val);
            return 1;
        case "recording":
            this._recording = parseInt(val);
            return 1;
        case "autoStart":
            this._autoStart = parseInt(val);
            return 1;
        case "beaconDriven":
            this._beaconDriven = parseInt(val);
            return 1;
        case "usage":
            this._usage = parseInt(val);
            return 1;
        case "clearHistory":
            this._clearHistory = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current run number, corresponding to the number of times the module was
     * powered on with the dataLogger enabled at some point.
     *
     * @return an integer corresponding to the current run number, corresponding to the number of times the module was
     *         powered on with the dataLogger enabled at some point
     *
     * On failure, throws an exception or returns YDataLogger.CURRENTRUNINDEX_INVALID.
     */
    function YDataLogger_get_currentRunIndex()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTRUNINDEX_INVALID;
            }
        }
        res = this._currentRunIndex;
        return res;
    }

    /**
     * Gets the current run number, corresponding to the number of times the module was
     * powered on with the dataLogger enabled at some point.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:an integer corresponding to the current run number, corresponding to the number of
     *         times the module was
     *         powered on with the dataLogger enabled at some point
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDataLogger.CURRENTRUNINDEX_INVALID.
     */
    function YDataLogger_get_currentRunIndex_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTRUNINDEX_INVALID);
            } else {
                callback(context, obj, obj._currentRunIndex);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the Unix timestamp for current UTC time, if known.
     *
     * @return an integer corresponding to the Unix timestamp for current UTC time, if known
     *
     * On failure, throws an exception or returns YDataLogger.TIMEUTC_INVALID.
     */
    function YDataLogger_get_timeUTC()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TIMEUTC_INVALID;
            }
        }
        res = this._timeUTC;
        return res;
    }

    /**
     * Gets the Unix timestamp for current UTC time, if known.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:an integer corresponding to the Unix timestamp for current UTC time, if known
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDataLogger.TIMEUTC_INVALID.
     */
    function YDataLogger_get_timeUTC_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TIMEUTC_INVALID);
            } else {
                callback(context, obj, obj._timeUTC);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current UTC time reference used for recorded data.
     *
     * @param newval : an integer corresponding to the current UTC time reference used for recorded data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_set_timeUTC(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('timeUTC',rest_val);
    }

    /**
     * Returns the current activation state of the data logger.
     *
     * @return a value among YDataLogger.RECORDING_OFF, YDataLogger.RECORDING_ON and
     * YDataLogger.RECORDING_PENDING corresponding to the current activation state of the data logger
     *
     * On failure, throws an exception or returns YDataLogger.RECORDING_INVALID.
     */
    function YDataLogger_get_recording()
    {
        var res;                    // enumOFFONPENDING;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RECORDING_INVALID;
            }
        }
        res = this._recording;
        return res;
    }

    /**
     * Gets the current activation state of the data logger.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:a value among YDataLogger.RECORDING_OFF, YDataLogger.RECORDING_ON and
     *         YDataLogger.RECORDING_PENDING corresponding to the current activation state of the data logger
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDataLogger.RECORDING_INVALID.
     */
    function YDataLogger_get_recording_async(callback,context)
    {
        var res;                    // enumOFFONPENDING;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RECORDING_INVALID);
            } else {
                callback(context, obj, obj._recording);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the activation state of the data logger to start/stop recording data.
     *
     * @param newval : a value among YDataLogger.RECORDING_OFF, YDataLogger.RECORDING_ON and
     * YDataLogger.RECORDING_PENDING corresponding to the activation state of the data logger to
     * start/stop recording data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_set_recording(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('recording',rest_val);
    }

    /**
     * Returns the default activation state of the data logger on power up.
     *
     * @return either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to the default
     * activation state of the data logger on power up
     *
     * On failure, throws an exception or returns YDataLogger.AUTOSTART_INVALID.
     */
    function YDataLogger_get_autoStart()
    {
        var res;                    // enumONOFF;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_AUTOSTART_INVALID;
            }
        }
        res = this._autoStart;
        return res;
    }

    /**
     * Gets the default activation state of the data logger on power up.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to the default
     *         activation state of the data logger on power up
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDataLogger.AUTOSTART_INVALID.
     */
    function YDataLogger_get_autoStart_async(callback,context)
    {
        var res;                    // enumONOFF;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_AUTOSTART_INVALID);
            } else {
                callback(context, obj, obj._autoStart);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the default activation state of the data logger on power up.
     * Do not forget to call the saveToFlash() method of the module to save the
     * configuration change.  Note: if the device doesn't have any time source at his disposal when
     * starting up, it will wait for ~8 seconds before automatically starting to record  with
     * an arbitrary timestamp
     *
     * @param newval : either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to the
     * default activation state of the data logger on power up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_set_autoStart(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('autoStart',rest_val);
    }

    /**
     * Returns true if the data logger is synchronised with the localization beacon.
     *
     * @return either YDataLogger.BEACONDRIVEN_OFF or YDataLogger.BEACONDRIVEN_ON, according to true if
     * the data logger is synchronised with the localization beacon
     *
     * On failure, throws an exception or returns YDataLogger.BEACONDRIVEN_INVALID.
     */
    function YDataLogger_get_beaconDriven()
    {
        var res;                    // enumONOFF;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BEACONDRIVEN_INVALID;
            }
        }
        res = this._beaconDriven;
        return res;
    }

    /**
     * Gets true if the data logger is synchronised with the localization beacon.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:either YDataLogger.BEACONDRIVEN_OFF or YDataLogger.BEACONDRIVEN_ON, according to true
     *         if the data logger is synchronised with the localization beacon
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDataLogger.BEACONDRIVEN_INVALID.
     */
    function YDataLogger_get_beaconDriven_async(callback,context)
    {
        var res;                    // enumONOFF;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BEACONDRIVEN_INVALID);
            } else {
                callback(context, obj, obj._beaconDriven);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the type of synchronisation of the data logger.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : either YDataLogger.BEACONDRIVEN_OFF or YDataLogger.BEACONDRIVEN_ON, according to
     * the type of synchronisation of the data logger
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_set_beaconDriven(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('beaconDriven',rest_val);
    }

    /**
     * Returns the percentage of datalogger memory in use.
     *
     * @return an integer corresponding to the percentage of datalogger memory in use
     *
     * On failure, throws an exception or returns YDataLogger.USAGE_INVALID.
     */
    function YDataLogger_get_usage()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_USAGE_INVALID;
            }
        }
        res = this._usage;
        return res;
    }

    /**
     * Gets the percentage of datalogger memory in use.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:an integer corresponding to the percentage of datalogger memory in use
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDataLogger.USAGE_INVALID.
     */
    function YDataLogger_get_usage_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_USAGE_INVALID);
            } else {
                callback(context, obj, obj._usage);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YDataLogger_get_clearHistory()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CLEARHISTORY_INVALID;
            }
        }
        res = this._clearHistory;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YDataLogger_get_clearHistory_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CLEARHISTORY_INVALID);
            } else {
                callback(context, obj, obj._clearHistory);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YDataLogger_set_clearHistory(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('clearHistory',rest_val);
    }

    /**
     * Retrieves a data logger for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the data logger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDataLogger.isOnline() to test if the data logger is
     * indeed online at a given time. In case of ambiguity when looking for
     * a data logger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the data logger, for instance
     *         LIGHTMK4.dataLogger.
     *
     * @return a YDataLogger object allowing you to drive the data logger.
     */
    function YDataLogger_FindDataLogger(func)                   // class method
    {
        var obj;                    // YDataLogger;
        obj = YFunction._FindFromCache("DataLogger", func);
        if (obj == null) {
            obj = new YDataLogger(func);
            YFunction._AddToCache("DataLogger", func, obj);
        }
        return obj;
    }

    /**
     * Clears the data logger memory and discards all recorded data streams.
     * This method also resets the current run index to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_forgetAllDataStreams()
    {
        return this.set_clearHistory(Y_CLEARHISTORY_TRUE);
    }

    /**
     * Returns a list of YDataSet objects that can be used to retrieve
     * all measures stored by the data logger.
     *
     * This function only works if the device uses a recent firmware,
     * as YDataSet objects are not supported by firmwares older than
     * version 13000.
     *
     * @return a list of YDataSet object.
     *
     * On failure, throws an exception or returns an empty list.
     */
    function YDataLogger_get_dataSets()
    {
        return this.parse_dataSets(this._download("logger.json"));
    }

    function YDataLogger_parse_dataSets(json)
    {
        var ii; // iterator
        var dslist = [];            // strArr;
        var dataset;                // YDataSetPtr;
        var res = [];               // YDataSetArr;

        dslist = this._json_get_array(json);
        res.length = 0;
        for (ii_0 in dslist) {
            if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
            dataset = new YDataSet(this);
            dataset._parse(dslist[ii_0]);
            res.push(dataset);
        }
        return res;
    }

    /**
     * Continues the enumeration of data loggers started using yFirstDataLogger().
     * Caution: You can't make any assumption about the returned data loggers order.
     * If you want to find a specific a data logger, use DataLogger.findDataLogger()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDataLogger object, corresponding to
     *         a data logger currently online, or a null pointer
     *         if there are no more data loggers to enumerate.
     */
    function YDataLogger_nextDataLogger()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YDataLogger.FindDataLogger(next_hwid);
    }

    /**
     * Starts the enumeration of data loggers currently accessible.
     * Use the method YDataLogger.nextDataLogger() to iterate on
     * next data loggers.
     *
     * @return a pointer to a YDataLogger object, corresponding to
     *         the first data logger currently online, or a null pointer
     *         if there are none.
     */
    function YDataLogger_FirstDataLogger()
    {
        var next_hwid = YAPI.getFirstHardwareId('DataLogger');
        if(next_hwid == null) return null;
        return YDataLogger.FindDataLogger(next_hwid);
    }

    //--- (end of generated code: YDataLogger implementation)

    function _YDataLogger(str_func)
    {
        //--- (generated code: YDataLogger constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'DataLogger';

        this._currentRunIndex                = Y_CURRENTRUNINDEX_INVALID;  // UInt31
        this._timeUTC                        = Y_TIMEUTC_INVALID;          // UTCTime
        this._recording                      = Y_RECORDING_INVALID;        // OffOnPending
        this._autoStart                      = Y_AUTOSTART_INVALID;        // OnOff
        this._beaconDriven                   = Y_BEACONDRIVEN_INVALID;     // OnOff
        this._usage                          = Y_USAGE_INVALID;            // Percent
        this._clearHistory                   = Y_CLEARHISTORY_INVALID;     // Bool
        //--- (end of generated code: YDataLogger constructor)
        this.getData                         = YDataLogger_getData;
        this.get_dataStreams                 = YDataLogger_get_dataStreams;
        this.dataStreams                     = YDataLogger_get_dataStreams;

        this.DATA_INVALID                    = -Number.MAX_VALUE;
    }

    //--- (generated code: YDataLogger initialization)
    YDataLogger = YFunction._Subclass(_YDataLogger, {
        // Constants
        CURRENTRUNINDEX_INVALID     : YAPI_INVALID_UINT,
        TIMEUTC_INVALID             : YAPI_INVALID_LONG,
        RECORDING_OFF               : 0,
        RECORDING_ON                : 1,
        RECORDING_PENDING           : 2,
        RECORDING_INVALID           : -1,
        AUTOSTART_OFF               : 0,
        AUTOSTART_ON                : 1,
        AUTOSTART_INVALID           : -1,
        BEACONDRIVEN_OFF            : 0,
        BEACONDRIVEN_ON             : 1,
        BEACONDRIVEN_INVALID        : -1,
        USAGE_INVALID               : YAPI_INVALID_UINT,
        CLEARHISTORY_FALSE          : 0,
        CLEARHISTORY_TRUE           : 1,
        CLEARHISTORY_INVALID        : -1
    }, {
        // Class methods
        FindDataLogger              : YDataLogger_FindDataLogger,
        FirstDataLogger             : YDataLogger_FirstDataLogger
    }, {
        // Methods
        get_currentRunIndex         : YDataLogger_get_currentRunIndex,
        currentRunIndex             : YDataLogger_get_currentRunIndex,
        get_currentRunIndex_async   : YDataLogger_get_currentRunIndex_async,
        currentRunIndex_async       : YDataLogger_get_currentRunIndex_async,
        get_timeUTC                 : YDataLogger_get_timeUTC,
        timeUTC                     : YDataLogger_get_timeUTC,
        get_timeUTC_async           : YDataLogger_get_timeUTC_async,
        timeUTC_async               : YDataLogger_get_timeUTC_async,
        set_timeUTC                 : YDataLogger_set_timeUTC,
        setTimeUTC                  : YDataLogger_set_timeUTC,
        get_recording               : YDataLogger_get_recording,
        recording                   : YDataLogger_get_recording,
        get_recording_async         : YDataLogger_get_recording_async,
        recording_async             : YDataLogger_get_recording_async,
        set_recording               : YDataLogger_set_recording,
        setRecording                : YDataLogger_set_recording,
        get_autoStart               : YDataLogger_get_autoStart,
        autoStart                   : YDataLogger_get_autoStart,
        get_autoStart_async         : YDataLogger_get_autoStart_async,
        autoStart_async             : YDataLogger_get_autoStart_async,
        set_autoStart               : YDataLogger_set_autoStart,
        setAutoStart                : YDataLogger_set_autoStart,
        get_beaconDriven            : YDataLogger_get_beaconDriven,
        beaconDriven                : YDataLogger_get_beaconDriven,
        get_beaconDriven_async      : YDataLogger_get_beaconDriven_async,
        beaconDriven_async          : YDataLogger_get_beaconDriven_async,
        set_beaconDriven            : YDataLogger_set_beaconDriven,
        setBeaconDriven             : YDataLogger_set_beaconDriven,
        get_usage                   : YDataLogger_get_usage,
        usage                       : YDataLogger_get_usage,
        get_usage_async             : YDataLogger_get_usage_async,
        usage_async                 : YDataLogger_get_usage_async,
        get_clearHistory            : YDataLogger_get_clearHistory,
        clearHistory                : YDataLogger_get_clearHistory,
        get_clearHistory_async      : YDataLogger_get_clearHistory_async,
        clearHistory_async          : YDataLogger_get_clearHistory_async,
        set_clearHistory            : YDataLogger_set_clearHistory,
        setClearHistory             : YDataLogger_set_clearHistory,
        forgetAllDataStreams        : YDataLogger_forgetAllDataStreams,
        get_dataSets                : YDataLogger_get_dataSets,
        dataSets                    : YDataLogger_get_dataSets,
        parse_dataSets              : YDataLogger_parse_dataSets,
        nextDataLogger              : YDataLogger_nextDataLogger,
        _parseAttr                  : YDataLogger_parseAttr
    });
    //--- (end of generated code: YDataLogger initialization)



//--- (generated code: YModule class start)
/**
 * YModule Class: Global parameters control interface for all Yoctopuce devices
 *
 * The YModule class can be used with all Yoctopuce USB devices.
 * It can be used to control the module global parameters, and
 * to enumerate the functions provided by each module.
 */
//--- (end of generated code: YModule class start)

    function _YModule(str_func)
    {
        //--- (generated code: YModule constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Module';

        this._productName                    = Y_PRODUCTNAME_INVALID;      // Text
        this._serialNumber                   = Y_SERIALNUMBER_INVALID;     // Text
        this._productId                      = Y_PRODUCTID_INVALID;        // XWord
        this._productRelease                 = Y_PRODUCTRELEASE_INVALID;   // XWord
        this._firmwareRelease                = Y_FIRMWARERELEASE_INVALID;  // Text
        this._persistentSettings             = Y_PERSISTENTSETTINGS_INVALID; // FlashSettings
        this._luminosity                     = Y_LUMINOSITY_INVALID;       // Percent
        this._beacon                         = Y_BEACON_INVALID;           // OnOff
        this._upTime                         = Y_UPTIME_INVALID;           // Time
        this._usbCurrent                     = Y_USBCURRENT_INVALID;       // UsedCurrent
        this._rebootCountdown                = Y_REBOOTCOUNTDOWN_INVALID;  // Int
        this._userVar                        = Y_USERVAR_INVALID;          // Int
        this._logCallback                    = null;                       // YModuleLogCallback
        this._confChangeCallback             = null;                       // YModuleConfigChangeCallback
        this._beaconCallback                 = null;                       // YModuleBeaconCallback
        //--- (end of generated code: YModule constructor)

        // automatically fill in hardware properties if they can be resolved
        // without any network access (getDevice does not cause network access)
        var devid = this._func;
        var dotidx = devid.indexOf(".");
        if(dotidx > 0) devid = devid.substr(0, dotidx);
        var dev = YAPI.getDevice(devid);
        if(dev) {
            this._serial = dev.getSerialNumber();
            this._funId  = "module";
            this._hwId   = this._serial+".module";
        }
    }

    // Return the internal device object hosting the function
    // Raise an error if not found
    function YModule_getDev()
    {
        var devid = this._func;
        var dotidx = devid.indexOf(".");
        if(dotidx > 0) devid = devid.substr(0, dotidx);
        var dev = YAPI.getDevice(devid);
        if(!dev) {
            this._throw(YAPI_DEVICE_NOT_FOUND, "Device ["+devid+"] is not online", null);
        }
        return dev;
    }

    /**
     * Returns the number of functions (beside the "module" interface) available on the module.
     *
     * @return the number of functions on the module
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_functionCount()
    {
        var dev = this._getDev();
        if(!dev) return YAPI_DEVICE_NOT_FOUND;
        return dev.functionCount();
    }

    /**
     * Retrieves the hardware identifier of the <i>n</i>th function on the module.
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the unambiguous hardware identifier of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YModule_functionId(functionIndex)
    {
        var dev = this._getDev();
        if(!dev) return "";
        return dev.functionId(functionIndex);
    }

    /**
     * Retrieves the type of the <i>n</i>th function on the module. Yoctopuce functions type names match
     * their class names without the <i>Y</i> prefix, for instance <i>Relay</i>, <i>Temperature</i> etc..
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the type of the function.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YModule_functionType(functionIndex)
    {
        var dev = this._getDev();
        if(!dev) return "";
        return dev.functionType(functionIndex);
    }

    /**
     * Retrieves the base type of the <i>n</i>th function on the module.
     * For instance, the base type of all measuring functions is "Sensor".
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the base type of the function
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YModule_functionBaseType(functionIndex)
    {
        var dev = this._getDev();
        if(!dev) return "";
        return dev.functionBaseType(functionIndex);
    }

    /**
     * Retrieves the logical name of the <i>n</i>th function on the module.
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a string corresponding to the logical name of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YModule_functionName(functionIndex)
    {
        var dev = this._getDev();
        if(!dev) return "";
        return dev.functionName(functionIndex);
    }

    /**
     * Retrieves the advertised value of the <i>n</i>th function on the module.
     *
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return a short string (up to 6 characters) corresponding to the advertised value of the requested
     * module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YModule_functionValue(functionIndex)
    {
        var dev = this._getDev();
        if(!dev) return "";
        return dev.functionValue(functionIndex);
    }

    function YModule_loadUrl(str_url)
    {
        var dev = this._getDev();
        if(!dev) return null;
        var yreq = YAPI.devRequest(dev.getRootUrl(), "GET "+str_url);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }
        return yreq.result;
    }

    /**
     * Returns the logical name of the module.
     *
     * @return a string corresponding to the logical name of the module
     *
     * On failure, throws an exception or returns YModule.LOGICALNAME_INVALID.
     */
    function YModule_get_logicalName()
    {
        var dev = this._getDev();
        if(dev != null && this._cache._expiration <= YAPI.GetTickCount()) {
            return dev._logicalName;
        }
        var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Gets the logical name of the module.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YFunction object that invoked the callback
     *         - the result:a string corresponding to the logical name of the module
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YModule_get_logicalName_async(callback, context)
    {   callback(context, this, this.get_logicalName());   }



    function YModule_flattenJsonStruct(jsoncomplex)
    {
        var decoded = JSON.parse(jsoncomplex, true);
        var attrs = [];
        for(var function_name in decoded) {
            if (function_name ==  "services")
                continue;
            var function_attrs = decoded[function_name];
            for(var attr_name in function_attrs) {
                attr_value = function_attrs[attr_name];
                if (attr_value === null || typeof attr_value === 'object') {
                    continue;
                }
                var flat = function_name + '/' + attr_name + "=" + attr_value;
                attrs.push(flat);
            }
        }
        return JSON.stringify(attrs);
    }


    /**
     * Returns a list of all the modules that are plugged into the current module.
     * This method only makes sense when called for a YoctoHub/VirtualHub.
     * Otherwise, an empty array will be returned.
     *
     * @return an array of strings containing the sub modules.
     */
    function YModule_get_subDevices()
    {
        var serial = this.get_serialNumber();
        return YAPI.getSubDevicesFrom(serial);
    }

    /**
     * Returns the serial number of the YoctoHub on which this module is connected.
     * If the module is connected by USB, or if the module is the root YoctoHub, an
     * empty string is returned.
     *
     * @return a string with the serial number of the YoctoHub or an empty string
     */
    function YModule_get_parentHub()
    {
        var serial = this.get_serialNumber();
        var hubserial = YAPI.getHubSerialFrom(serial);
        if (hubserial == serial)
            return '';
        return hubserial;
    }

    /**
     * Returns the URL used to access the module. If the module is connected by USB, the
     * string 'usb' is returned.
     *
     * @return a string with the URL of the module.
     */
   function YModule_get_url()
   {
       var dev = this._getDev();
       if (!(dev == null)) {
           return dev.getRootUrl();
       }
       return "";
   }

    function YModule_startStopDevLog(serial,start)
    {

    }
    //--- (generated code: YModule implementation)

    function YModule_parseAttr(name, val, _super)
    {
        switch(name) {
        case "productName":
            this._productName = val;
            return 1;
        case "serialNumber":
            this._serialNumber = val;
            return 1;
        case "productId":
            this._productId = parseInt(val);
            return 1;
        case "productRelease":
            this._productRelease = parseInt(val);
            return 1;
        case "firmwareRelease":
            this._firmwareRelease = val;
            return 1;
        case "persistentSettings":
            this._persistentSettings = parseInt(val);
            return 1;
        case "luminosity":
            this._luminosity = parseInt(val);
            return 1;
        case "beacon":
            this._beacon = parseInt(val);
            return 1;
        case "upTime":
            this._upTime = parseInt(val);
            return 1;
        case "usbCurrent":
            this._usbCurrent = parseInt(val);
            return 1;
        case "rebootCountdown":
            this._rebootCountdown = parseInt(val);
            return 1;
        case "userVar":
            this._userVar = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the commercial name of the module, as set by the factory.
     *
     * @return a string corresponding to the commercial name of the module, as set by the factory
     *
     * On failure, throws an exception or returns YModule.PRODUCTNAME_INVALID.
     */
    function YModule_get_productName()
    {
        var res;                    // string;
        var dev;                    // YDevice;
        if (this._cacheExpiration == 0) {
            dev = this._getDev();
            if (!(dev == null)) {
                return dev.getProductName();
            }
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PRODUCTNAME_INVALID;
            }
        }
        res = this._productName;
        return res;
    }

    /**
     * Gets the commercial name of the module, as set by the factory.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:a string corresponding to the commercial name of the module, as set by the factory
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.PRODUCTNAME_INVALID.
     */
    function YModule_get_productName_async(callback,context)
    {
        var res;                    // string;
        var dev;                    // YDevice;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PRODUCTNAME_INVALID);
            } else {
                callback(context, obj, obj._productName);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the serial number of the module, as set by the factory.
     *
     * @return a string corresponding to the serial number of the module, as set by the factory
     *
     * On failure, throws an exception or returns YModule.SERIALNUMBER_INVALID.
     */
    function YModule_get_serialNumber()
    {
        var res;                    // string;
        var dev;                    // YDevice;
        if (this._cacheExpiration == 0) {
            dev = this._getDev();
            if (!(dev == null)) {
                return dev.getSerialNumber();
            }
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SERIALNUMBER_INVALID;
            }
        }
        res = this._serialNumber;
        return res;
    }

    /**
     * Gets the serial number of the module, as set by the factory.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:a string corresponding to the serial number of the module, as set by the factory
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.SERIALNUMBER_INVALID.
     */
    function YModule_get_serialNumber_async(callback,context)
    {
        var res;                    // string;
        var dev;                    // YDevice;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SERIALNUMBER_INVALID);
            } else {
                callback(context, obj, obj._serialNumber);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the USB device identifier of the module.
     *
     * @return an integer corresponding to the USB device identifier of the module
     *
     * On failure, throws an exception or returns YModule.PRODUCTID_INVALID.
     */
    function YModule_get_productId()
    {
        var res;                    // int;
        var dev;                    // YDevice;
        if (this._cacheExpiration == 0) {
            dev = this._getDev();
            if (!(dev == null)) {
                return dev.getProductId();
            }
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PRODUCTID_INVALID;
            }
        }
        res = this._productId;
        return res;
    }

    /**
     * Gets the USB device identifier of the module.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the USB device identifier of the module
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.PRODUCTID_INVALID.
     */
    function YModule_get_productId_async(callback,context)
    {
        var res;                    // int;
        var dev;                    // YDevice;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PRODUCTID_INVALID);
            } else {
                callback(context, obj, obj._productId);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the release number of the module hardware, preprogrammed at the factory.
     * The original hardware release returns value 1, revision B returns value 2, etc.
     *
     * @return an integer corresponding to the release number of the module hardware, preprogrammed at the factory
     *
     * On failure, throws an exception or returns YModule.PRODUCTRELEASE_INVALID.
     */
    function YModule_get_productRelease()
    {
        var res;                    // int;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PRODUCTRELEASE_INVALID;
            }
        }
        res = this._productRelease;
        return res;
    }

    /**
     * Gets the release number of the module hardware, preprogrammed at the factory.
     * The original hardware release returns value 1, revision B returns value 2, etc.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the release number of the module hardware, preprogrammed at the factory
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.PRODUCTRELEASE_INVALID.
     */
    function YModule_get_productRelease_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PRODUCTRELEASE_INVALID);
            } else {
                callback(context, obj, obj._productRelease);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the version of the firmware embedded in the module.
     *
     * @return a string corresponding to the version of the firmware embedded in the module
     *
     * On failure, throws an exception or returns YModule.FIRMWARERELEASE_INVALID.
     */
    function YModule_get_firmwareRelease()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_FIRMWARERELEASE_INVALID;
            }
        }
        res = this._firmwareRelease;
        return res;
    }

    /**
     * Gets the version of the firmware embedded in the module.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:a string corresponding to the version of the firmware embedded in the module
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.FIRMWARERELEASE_INVALID.
     */
    function YModule_get_firmwareRelease_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_FIRMWARERELEASE_INVALID);
            } else {
                callback(context, obj, obj._firmwareRelease);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current state of persistent module settings.
     *
     * @return a value among YModule.PERSISTENTSETTINGS_LOADED, YModule.PERSISTENTSETTINGS_SAVED and
     * YModule.PERSISTENTSETTINGS_MODIFIED corresponding to the current state of persistent module settings
     *
     * On failure, throws an exception or returns YModule.PERSISTENTSETTINGS_INVALID.
     */
    function YModule_get_persistentSettings()
    {
        var res;                    // enumFLASHSETTINGS;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PERSISTENTSETTINGS_INVALID;
            }
        }
        res = this._persistentSettings;
        return res;
    }

    /**
     * Gets the current state of persistent module settings.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:a value among YModule.PERSISTENTSETTINGS_LOADED, YModule.PERSISTENTSETTINGS_SAVED and
     *         YModule.PERSISTENTSETTINGS_MODIFIED corresponding to the current state of persistent module settings
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.PERSISTENTSETTINGS_INVALID.
     */
    function YModule_get_persistentSettings_async(callback,context)
    {
        var res;                    // enumFLASHSETTINGS;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PERSISTENTSETTINGS_INVALID);
            } else {
                callback(context, obj, obj._persistentSettings);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YModule_set_persistentSettings(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('persistentSettings',rest_val);
    }

    /**
     * Returns the luminosity of the  module informative LEDs (from 0 to 100).
     *
     * @return an integer corresponding to the luminosity of the  module informative LEDs (from 0 to 100)
     *
     * On failure, throws an exception or returns YModule.LUMINOSITY_INVALID.
     */
    function YModule_get_luminosity()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LUMINOSITY_INVALID;
            }
        }
        res = this._luminosity;
        return res;
    }

    /**
     * Gets the luminosity of the  module informative LEDs (from 0 to 100).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the luminosity of the  module informative LEDs (from 0 to 100)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.LUMINOSITY_INVALID.
     */
    function YModule_get_luminosity_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LUMINOSITY_INVALID);
            } else {
                callback(context, obj, obj._luminosity);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the luminosity of the module informative leds. The parameter is a
     * value between 0 and 100.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the luminosity of the module informative leds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_set_luminosity(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('luminosity',rest_val);
    }

    /**
     * Returns the state of the localization beacon.
     *
     * @return either YModule.BEACON_OFF or YModule.BEACON_ON, according to the state of the localization beacon
     *
     * On failure, throws an exception or returns YModule.BEACON_INVALID.
     */
    function YModule_get_beacon()
    {
        var res;                    // enumONOFF;
        var dev;                    // YDevice;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            dev = this._getDev();
            if (!(dev == null)) {
                return dev.getBeacon();
            }
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BEACON_INVALID;
            }
        }
        res = this._beacon;
        return res;
    }

    /**
     * Gets the state of the localization beacon.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:either YModule.BEACON_OFF or YModule.BEACON_ON, according to the state of the localization beacon
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.BEACON_INVALID.
     */
    function YModule_get_beacon_async(callback,context)
    {
        var res;                    // enumONOFF;
        var dev;                    // YDevice;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BEACON_INVALID);
            } else {
                callback(context, obj, obj._beacon);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Turns on or off the module localization beacon.
     *
     * @param newval : either YModule.BEACON_OFF or YModule.BEACON_ON
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_set_beacon(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('beacon',rest_val);
    }

    /**
     * Returns the number of milliseconds spent since the module was powered on.
     *
     * @return an integer corresponding to the number of milliseconds spent since the module was powered on
     *
     * On failure, throws an exception or returns YModule.UPTIME_INVALID.
     */
    function YModule_get_upTime()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_UPTIME_INVALID;
            }
        }
        res = this._upTime;
        return res;
    }

    /**
     * Gets the number of milliseconds spent since the module was powered on.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the number of milliseconds spent since the module was powered on
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.UPTIME_INVALID.
     */
    function YModule_get_upTime_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_UPTIME_INVALID);
            } else {
                callback(context, obj, obj._upTime);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current consumed by the module on the USB bus, in milli-amps.
     *
     * @return an integer corresponding to the current consumed by the module on the USB bus, in milli-amps
     *
     * On failure, throws an exception or returns YModule.USBCURRENT_INVALID.
     */
    function YModule_get_usbCurrent()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_USBCURRENT_INVALID;
            }
        }
        res = this._usbCurrent;
        return res;
    }

    /**
     * Gets the current consumed by the module on the USB bus, in milli-amps.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the current consumed by the module on the USB bus, in milli-amps
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.USBCURRENT_INVALID.
     */
    function YModule_get_usbCurrent_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_USBCURRENT_INVALID);
            } else {
                callback(context, obj, obj._usbCurrent);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the remaining number of seconds before the module restarts, or zero when no
     * reboot has been scheduled.
     *
     * @return an integer corresponding to the remaining number of seconds before the module restarts, or zero when no
     *         reboot has been scheduled
     *
     * On failure, throws an exception or returns YModule.REBOOTCOUNTDOWN_INVALID.
     */
    function YModule_get_rebootCountdown()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_REBOOTCOUNTDOWN_INVALID;
            }
        }
        res = this._rebootCountdown;
        return res;
    }

    /**
     * Gets the remaining number of seconds before the module restarts, or zero when no
     * reboot has been scheduled.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the remaining number of seconds before the module
     *         restarts, or zero when no
     *         reboot has been scheduled
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.REBOOTCOUNTDOWN_INVALID.
     */
    function YModule_get_rebootCountdown_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_REBOOTCOUNTDOWN_INVALID);
            } else {
                callback(context, obj, obj._rebootCountdown);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YModule_set_rebootCountdown(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('rebootCountdown',rest_val);
    }

    /**
     * Returns the value previously stored in this attribute.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @return an integer corresponding to the value previously stored in this attribute
     *
     * On failure, throws an exception or returns YModule.USERVAR_INVALID.
     */
    function YModule_get_userVar()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_USERVAR_INVALID;
            }
        }
        res = this._userVar;
        return res;
    }

    /**
     * Gets the value previously stored in this attribute.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the value previously stored in this attribute
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YModule.USERVAR_INVALID.
     */
    function YModule_get_userVar_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_USERVAR_INVALID);
            } else {
                callback(context, obj, obj._userVar);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Stores a 32 bit value in the device RAM. This attribute is at programmer disposal,
     * should he need to store a state variable.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_set_userVar(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('userVar',rest_val);
    }

    /**
     * Allows you to find a module from its serial number or from its logical name.
     *
     * This function does not require that the module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YModule.isOnline() to test if the module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string containing either the serial number or
     *         the logical name of the desired module
     *
     * @return a YModule object allowing you to drive the module
     *         or get additional information on the module.
     */
    function YModule_FindModule(func)                           // class method
    {
        var obj;                    // YModule;
        var cleanHwId;              // str;
        var modpos;                 // int;
        cleanHwId = func;
        modpos = (func).indexOf(".module");
        if (modpos != ((func).length - 7)) {
            cleanHwId = func + ".module";
        }
        obj = YFunction._FindFromCache("Module", cleanHwId);
        if (obj == null) {
            obj = new YModule(cleanHwId);
            YFunction._AddToCache("Module", cleanHwId, obj);
        }
        return obj;
    }

    function YModule_get_productNameAndRevision()
    {
        var prodname;               // str;
        var prodrel;                // int;
        var fullname;               // str;

        prodname = this.get_productName();
        prodrel = this.get_productRelease();
        if (prodrel > 1) {
            fullname = ""+prodname+" rev. "+String.fromCharCode(64 + prodrel);
        } else {
            fullname = prodname;
        }
        return fullname;
    }

    /**
     * Saves current settings in the nonvolatile memory of the module.
     * Warning: the number of allowed save operations during a module life is
     * limited (about 100000 cycles). Do not call this function within a loop.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_saveToFlash()
    {
        return this.set_persistentSettings(Y_PERSISTENTSETTINGS_SAVED);
    }

    /**
     * Reloads the settings stored in the nonvolatile memory, as
     * when the module is powered on.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_revertFromFlash()
    {
        return this.set_persistentSettings(Y_PERSISTENTSETTINGS_LOADED);
    }

    /**
     * Schedules a simple module reboot after the given number of seconds.
     *
     * @param secBeforeReboot : number of seconds before rebooting
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_reboot(secBeforeReboot)
    {
        return this.set_rebootCountdown(secBeforeReboot);
    }

    /**
     * Schedules a module reboot into special firmware update mode.
     *
     * @param secBeforeReboot : number of seconds before rebooting
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_triggerFirmwareUpdate(secBeforeReboot)
    {
        return this.set_rebootCountdown(-secBeforeReboot);
    }

    //cannot be generated for JS:
    //function YModule_startStopDevLog(serial,start)

    /**
     * Registers a device log callback function. This callback will be called each time
     * that a module sends a new log message. Mostly useful to debug a Yoctopuce module.
     *
     * @param callback : the callback function to call, or a null pointer.
     *         The callback function should take two
     *         arguments: the module object that emitted the log message,
     *         and the character string containing the log.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YModule_registerLogCallback(callback)
    {
        var serial;                 // str;

        serial = this.get_serialNumber();
        if (serial == YAPI_INVALID_STRING) {
            return YAPI_DEVICE_NOT_FOUND;
        }
        this._logCallback = callback;
        this._startStopDevLog(serial, callback != null);
        return 0;
    }

    function YModule_get_logCallback()
    {
        return this._logCallback;
    }

    /**
     * Register a callback function, to be called when a persistent settings in
     * a device configuration has been changed (e.g. change of unit, etc).
     *
     * @param callback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    function YModule_registerConfigChangeCallback(callback)
    {
        if (callback != null) {
            YModule._updateModuleCallbackList(this, true);
        } else {
            YModule._updateModuleCallbackList(this, false);
        }
        this._confChangeCallback = callback;
        return 0;
    }

    function YModule_invokeConfigChangeCallback()
    {
        if (this._confChangeCallback != null) {
            this._confChangeCallback(this);
        }
        return 0;
    }

    /**
     * Register a callback function, to be called when the localization beacon of the module
     * has been changed. The callback function should take two arguments: the YModule object of
     * which the beacon has changed, and an integer describing the new beacon state.
     *
     * @param callback : The callback function to call, or null to unregister a
     *         previously registered callback.
     */
    function YModule_registerBeaconCallback(callback)
    {
        if (callback != null) {
            YModule._updateModuleCallbackList(this, true);
        } else {
            YModule._updateModuleCallbackList(this, false);
        }
        this._beaconCallback = callback;
        return 0;
    }

    function YModule_invokeBeaconCallback(beaconState)
    {
        if (this._beaconCallback != null) {
            this._beaconCallback(this, beaconState);
        }
        return 0;
    }

    /**
     * Triggers a configuration change callback, to check if they are supported or not.
     */
    function YModule_triggerConfigChangeCallback()
    {
        this._setAttr("persistentSettings", "2");
        return 0;
    }

    /**
     * Tests whether the byn file is valid for this module. This method is useful to test if the module
     * needs to be updated.
     * It is possible to pass a directory as argument instead of a file. In this case, this method returns
     * the path of the most recent
     * appropriate .byn file. If the parameter onlynew is true, the function discards firmwares that are older or
     * equal to the installed firmware.
     *
     * @param path : the path of a byn file or a directory that contains byn files
     * @param onlynew : returns only files that are strictly newer
     *
     * @return the path of the byn file to use or a empty string if no byn files matches the requirement
     *
     * On failure, throws an exception or returns a string that start with "error:".
     */
    function YModule_checkFirmware(path,onlynew)
    {
        var serial;                 // str;
        var release;                // int;
        var tmp_res;                // str;
        if (onlynew) {
            release = YAPI._atoi(this.get_firmwareRelease());
        } else {
            release = 0;
        }
        //may throw an exception
        serial = this.get_serialNumber();
        tmp_res = YFirmwareUpdate.CheckFirmware(serial, path, release);
        if ((tmp_res).indexOf("error:") == 0) {
            this._throw(YAPI_INVALID_ARGUMENT, tmp_res);
        }
        return tmp_res;
    }

    /**
     * Prepares a firmware update of the module. This method returns a YFirmwareUpdate object which
     * handles the firmware update process.
     *
     * @param path : the path of the .byn file to use.
     * @param force : true to force the firmware update even if some prerequisites appear not to be met
     *
     * @return a YFirmwareUpdate object or NULL on error.
     */
    function YModule_updateFirmwareEx(path,force)
    {
        var serial;                 // str;
        var settings;               // bin;

        serial = this.get_serialNumber();
        settings = this.get_allSettings();
        if ((settings).length == 0) {
            this._throw(YAPI_IO_ERROR, "Unable to get device settings");
            settings = "error:Unable to get device settings";
        }
        return new YFirmwareUpdate(serial, path, settings, force);
    }

    /**
     * Prepares a firmware update of the module. This method returns a YFirmwareUpdate object which
     * handles the firmware update process.
     *
     * @param path : the path of the .byn file to use.
     *
     * @return a YFirmwareUpdate object or NULL on error.
     */
    function YModule_updateFirmware(path)
    {
        return this.updateFirmwareEx(path, false);
    }

    /**
     * Returns all the settings and uploaded files of the module. Useful to backup all the
     * logical names, calibrations parameters, and uploaded files of a device.
     *
     * @return a binary buffer with all the settings.
     *
     * On failure, throws an exception or returns an binary object of size 0.
     */
    function YModule_get_allSettings()
    {
        var ii; // iterator
        var settings;               // bin;
        var json;                   // bin;
        var res;                    // bin;
        var sep;                    // str;
        var name;                   // str;
        var item;                   // str;
        var t_type;                 // str;
        var id;                     // str;
        var url;                    // str;
        var file_data;              // str;
        var file_data_bin;          // bin;
        var temp_data_bin;          // bin;
        var ext_settings;           // str;
        var filelist = [];          // strArr;
        var templist = [];          // strArr;

        settings = this._download("api.json");
        if ((settings).length == 0) {
            return settings;
        }
        ext_settings = ", \"extras\":[";
        templist = this.get_functionIds("Temperature");
        sep = "";
        for (ii_0 in templist) {
            if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
            if (YAPI._atoi(this.get_firmwareRelease()) > 9000) {
                url = "api/"+templist[ii_0]+"/sensorType";
                t_type = this._download(url);
                if (t_type == "RES_NTC" || t_type == "RES_LINEAR") {
                    id = templist[ii_0].substr(11, (templist[ii_0]).length - 11);
                    if (id == "") {
                        id = "1";
                    }
                    temp_data_bin = this._download("extra.json?page="+id);
                    if ((temp_data_bin).length > 0) {
                        item = ""+sep+"{\"fid\":\""+templist[ii_0]+"\", \"json\":"+temp_data_bin+"}\n";
                        ext_settings = ext_settings + item;
                        sep = ",";
                    }
                }
            }
        }
        ext_settings = ext_settings + "],\n\"files\":[";
        if (this.hasFunction("files")) {
            json = this._download("files.json?a=dir&f=");
            if ((json).length == 0) {
                return json;
            }
            filelist = this._json_get_array(json);
            sep = "";
            for (ii_1 in filelist) {
                if(ii_1 =='indexOf') continue; // IE8 Don'tEnum bug
                name = this._json_get_key(filelist[ii_1], "name");
                if (((name).length > 0) && !(name == "startupConf.json")) {
                    file_data_bin = this._download(this._escapeAttr(name));
                    file_data = YAPI._bytesToHexStr(file_data_bin);
                    item = ""+sep+"{\"name\":\""+name+"\", \"data\":\""+file_data+"\"}\n";
                    ext_settings = ext_settings + item;
                    sep = ",";
                }
            }
        }
        res = "{ \"api\":" + settings + ext_settings + "]}";
        return res;
    }

    function YModule_loadThermistorExtra(funcId,jsonExtra)
    {
        var values = [];            // strArr;
        var url;                    // str;
        var curr;                   // str;
        var currTemp;               // str;
        var ofs;                    // int;
        var size;                   // int;
        url = "api/" + funcId + ".json?command=Z";

        this._download(url);
        // add records in growing resistance value
        values = this._json_get_array(jsonExtra);
        ofs = 0;
        size = values.length;
        while (ofs + 1 < size) {
            curr = values[ofs];
            currTemp = values[ofs + 1];
            url = "api/"+funcId+".json?command=m"+curr+":"+currTemp;
            this._download(url);
            ofs = ofs + 2;
        }
        return YAPI_SUCCESS;
    }

    function YModule_set_extraSettings(jsonExtra)
    {
        var ii; // iterator
        var extras = [];            // strArr;
        var functionId;             // str;
        var data;                   // str;
        extras = this._json_get_array(jsonExtra);
        for (ii_0 in extras) {
            if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
            functionId = this._get_json_path(extras[ii_0], "fid");
            functionId = this._decode_json_string(functionId);
            data = this._get_json_path(extras[ii_0], "json");
            if (this.hasFunction(functionId)) {
                this.loadThermistorExtra(functionId, data);
            }
        }
        return YAPI_SUCCESS;
    }

    /**
     * Restores all the settings and uploaded files to the module.
     * This method is useful to restore all the logical names and calibrations parameters,
     * uploaded files etc. of a device from a backup.
     * Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings : a binary buffer with all the settings.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_set_allSettingsAndFiles(settings)
    {
        var ii; // iterator
        var down;                   // bin;
        var json;                   // str;
        var json_api;               // str;
        var json_files;             // str;
        var json_extra;             // str;
        var fuperror;               // int;
        var globalres;              // int;
        fuperror = 0;
        json = settings;
        json_api = this._get_json_path(json, "api");
        if (json_api == "") {
            return this.set_allSettings(settings);
        }
        json_extra = this._get_json_path(json, "extras");
        if (!(json_extra == "")) {
            this.set_extraSettings(json_extra);
        }
        this.set_allSettings(json_api);
        if (this.hasFunction("files")) {
            var files = [];             // strArr;
            var res;                    // str;
            var name;                   // str;
            var data;                   // str;
            down = this._download("files.json?a=format");
            res = this._get_json_path(down, "res");
            res = this._decode_json_string(res);
            if (!(res == "ok")) {
                return this._throw(YAPI_IO_ERROR,"format failed",YAPI_IO_ERROR);
            }
            json_files = this._get_json_path(json, "files");
            files = this._json_get_array(json_files);
            for (ii_0 in files) {
                if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
                name = this._get_json_path(files[ii_0], "name");
                name = this._decode_json_string(name);
                data = this._get_json_path(files[ii_0], "data");
                data = this._decode_json_string(data);
                if (name == "") {
                    fuperror = fuperror + 1;
                } else {
                    this._upload(name, YAPI._hexStrToBin(data));
                }
            }
        }
        // Apply settings a second time for file-dependent settings and dynamic sensor nodes
        globalres = this.set_allSettings(json_api);
        if (!(fuperror == 0)) {
            return this._throw(YAPI_IO_ERROR,"Error during file upload",YAPI_IO_ERROR);
        }
        return globalres;
    }

    /**
     * Tests if the device includes a specific function. This method takes a function identifier
     * and returns a boolean.
     *
     * @param funcId : the requested function identifier
     *
     * @return true if the device has the function identifier
     */
    function YModule_hasFunction(funcId)
    {
        var count;                  // int;
        var i;                      // int;
        var fid;                    // str;

        count = this.functionCount();
        i = 0;
        while (i < count) {
            fid = this.functionId(i);
            if (fid == funcId) {
                return true;
            }
            i = i + 1;
        }
        return false;
    }

    /**
     * Retrieve all hardware identifier that match the type passed in argument.
     *
     * @param funType : The type of function (Relay, LightSensor, Voltage,...)
     *
     * @return an array of strings.
     */
    function YModule_get_functionIds(funType)
    {
        var count;                  // int;
        var i;                      // int;
        var ftype;                  // str;
        var res = [];               // strArr;

        count = this.functionCount();
        i = 0;
        while (i < count) {
            ftype = this.functionType(i);
            if (ftype == funType) {
                res.push(this.functionId(i));
            } else {
                ftype = this.functionBaseType(i);
                if (ftype == funType) {
                    res.push(this.functionId(i));
                }
            }
            i = i + 1;
        }
        return res;
    }

    //cannot be generated for JS:
    //function YModule_flattenJsonStruct(jsoncomplex)

    function YModule_calibVersion(cparams)
    {
        if (cparams == "0,") {
            return 3;
        }
        if ((cparams).indexOf(",") >= 0) {
            if ((cparams).indexOf(" ") > 0) {
                return 3;
            } else {
                return 1;
            }
        }
        if (cparams == "" || cparams == "0") {
            return 1;
        }
        if (((cparams).length < 2) || ((cparams).indexOf(".") >= 0)) {
            return 0;
        } else {
            return 2;
        }
    }

    function YModule_calibScale(unit_name,sensorType)
    {
        if (unit_name == "g" || unit_name == "gauss" || unit_name == "W") {
            return 1000;
        }
        if (unit_name == "C") {
            if (sensorType == "") {
                return 16;
            }
            if (YAPI._atoi(sensorType) < 8) {
                return 16;
            } else {
                return 100;
            }
        }
        if (unit_name == "m" || unit_name == "deg") {
            return 10;
        }
        return 1;
    }

    function YModule_calibOffset(unit_name)
    {
        if (unit_name == "% RH" || unit_name == "mbar" || unit_name == "lx") {
            return 0;
        }
        return 32767;
    }

    function YModule_calibConvert(param,currentFuncValue,unit_name,sensorType)
    {
        var ii; // iterator
        var paramVer;               // int;
        var funVer;                 // int;
        var funScale;               // int;
        var funOffset;              // int;
        var paramScale;             // int;
        var paramOffset;            // int;
        var words = [];             // intArr;
        var words_str = [];         // strArr;
        var calibData = [];         // floatArr;
        var iCalib = [];            // intArr;
        var calibType;              // int;
        var i;                      // int;
        var maxSize;                // int;
        var ratio;                  // float;
        var nPoints;                // int;
        var wordVal;                // float;
        // Initial guess for parameter encoding
        paramVer = this.calibVersion(param);
        funVer = this.calibVersion(currentFuncValue);
        funScale = this.calibScale(unit_name, sensorType);
        funOffset = this.calibOffset(unit_name);
        paramScale = funScale;
        paramOffset = funOffset;
        if (funVer < 3) {
            // Read the effective device scale if available
            if (funVer == 2) {
                words = YAPI._decodeWords(currentFuncValue);
                if ((words[0] == 1366) && (words[1] == 12500)) {
                    // Yocto-3D RefFrame used a special encoding
                    funScale = 1;
                    funOffset = 0;
                } else {
                    funScale = words[1];
                    funOffset = words[0];
                }
            } else {
                if (funVer == 1) {
                    if (currentFuncValue == "" || (YAPI._atoi(currentFuncValue) > 10)) {
                        funScale = 0;
                    }
                }
            }
        }
        calibData.length = 0;
        calibType = 0;
        if (paramVer < 3) {
            // Handle old 16 bit parameters formats
            if (paramVer == 2) {
                words = YAPI._decodeWords(param);
                if ((words[0] == 1366) && (words[1] == 12500)) {
                    // Yocto-3D RefFrame used a special encoding
                    paramScale = 1;
                    paramOffset = 0;
                } else {
                    paramScale = words[1];
                    paramOffset = words[0];
                }
                if ((words.length >= 3) && (words[2] > 0)) {
                    maxSize = 3 + 2 * ((words[2]) % (10));
                    if (maxSize > words.length) {
                        maxSize = words.length;
                    }
                    i = 3;
                    while (i < maxSize) {
                        calibData.push(words[i]);
                        i = i + 1;
                    }
                }
            } else {
                if (paramVer == 1) {
                    words_str = (param).split(',');
                    for (ii_0 in words_str) {
                        if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
                        words.push(YAPI._atoi(words_str[ii_0]));
                    }
                    if (param == "" || (words[0] > 10)) {
                        paramScale = 0;
                    }
                    if ((words.length > 0) && (words[0] > 0)) {
                        maxSize = 1 + 2 * ((words[0]) % (10));
                        if (maxSize > words.length) {
                            maxSize = words.length;
                        }
                        i = 1;
                        while (i < maxSize) {
                            calibData.push(words[i]);
                            i = i + 1;
                        }
                    }
                } else {
                    if (paramVer == 0) {
                        ratio = parseFloat(param);
                        if (ratio > 0) {
                            calibData.push(0.0);
                            calibData.push(0.0);
                            calibData.push(Math.round(65535 / ratio));
                            calibData.push(65535.0);
                        }
                    }
                }
            }
            i = 0;
            while (i < calibData.length) {
                if (paramScale > 0) {
                    // scalar decoding
                    calibData[i] = (calibData[i] - paramOffset) / paramScale;
                } else {
                    // floating-point decoding
                    calibData[i] = YAPI._decimalToDouble(Math.round(calibData[i]));
                }
                i = i + 1;
            }
        } else {
            // Handle latest 32bit parameter format
            iCalib = YAPI._decodeFloats(param);
            calibType = Math.round(iCalib[0] / 1000.0);
            if (calibType >= 30) {
                calibType = calibType - 30;
            }
            i = 1;
            while (i < iCalib.length) {
                calibData.push(iCalib[i] / 1000.0);
                i = i + 1;
            }
        }
        if (funVer >= 3) {
            // Encode parameters in new format
            if (calibData.length == 0) {
                param = "0,";
            } else {
                param = 30 + calibType;
                i = 0;
                while (i < calibData.length) {
                    if ((i & 1) > 0) {
                        param = param + ":";
                    } else {
                        param = param + " ";
                    }
                    param = param + Math.round(calibData[i] * 1000.0 / 1000.0);
                    i = i + 1;
                }
                param = param + ",";
            }
        } else {
            if (funVer >= 1) {
                // Encode parameters for older devices
                nPoints = parseInt((calibData.length) / (2));
                param = nPoints;
                i = 0;
                while (i < 2 * nPoints) {
                    if (funScale == 0) {
                        wordVal = YAPI._doubleToDecimal(Math.round(calibData[i]));
                    } else {
                        wordVal = calibData[i] * funScale + funOffset;
                    }
                    param = param + "," + Math.round(wordVal);
                    i = i + 1;
                }
            } else {
                // Initial V0 encoding used for old Yocto-Light
                if (calibData.length == 4) {
                    param = Math.round(1000 * (calibData[3] - calibData[1]) / calibData[2] - calibData[0]);
                }
            }
        }
        return param;
    }

    function YModule_tryExec(url)
    {
        var res;                    // int;
        var done;                   // int;
        res = YAPI_SUCCESS;
        done = 1;
        try {
            this._download(url);
        } catch {
            done = 0;
        }
        if (done == 0) {
            // retry silently after a short wait
            try {
                YAPI.Sleep(500);
                this._download(url);
            } catch {
                // second failure, return error code
                res = this.get_errorType();
            }
        }
        return res;
    }

    /**
     * Restores all the settings of the device. Useful to restore all the logical names and calibrations parameters
     * of a module from a backup.Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings : a binary buffer with all the settings.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_set_allSettings(settings)
    {
        var ii; // iterator
        var restoreLast = [];       // strArr;
        var old_json_flat;          // bin;
        var old_dslist = [];        // strArr;
        var old_jpath = [];         // strArr;
        var old_jpath_len = [];     // intArr;
        var old_val_arr = [];       // strArr;
        var actualSettings;         // bin;
        var new_dslist = [];        // strArr;
        var new_jpath = [];         // strArr;
        var new_jpath_len = [];     // intArr;
        var new_val_arr = [];       // strArr;
        var cpos;                   // int;
        var eqpos;                  // int;
        var leng;                   // int;
        var i;                      // int;
        var j;                      // int;
        var subres;                 // int;
        var res;                    // int;
        var njpath;                 // str;
        var jpath;                  // str;
        var fun;                    // str;
        var attr;                   // str;
        var value;                  // str;
        var old_serial;             // str;
        var new_serial;             // str;
        var url;                    // str;
        var tmp;                    // str;
        var new_calib;              // str;
        var sensorType;             // str;
        var unit_name;              // str;
        var newval;                 // str;
        var oldval;                 // str;
        var old_calib;              // str;
        var each_str;               // str;
        var do_update;              // bool;
        var found;                  // bool;
        res = YAPI_SUCCESS;
        tmp = settings;
        tmp = this._get_json_path(tmp, "api");
        if (!(tmp == "")) {
            settings = tmp;
        }
        old_serial = "";
        oldval = "";
        newval = "";
        old_json_flat = this._flattenJsonStruct(settings);
        old_dslist = this._json_get_array(old_json_flat);
        for (ii_0 in old_dslist) {
            if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
            each_str = this._json_get_string(old_dslist[ii_0]);
            // split json path and attr
            leng = (each_str).length;
            eqpos = (each_str).indexOf("=");
            if ((eqpos < 0) || (leng == 0)) {
                this._throw(YAPI_INVALID_ARGUMENT, "Invalid settings");
                return YAPI_INVALID_ARGUMENT;
            }
            jpath = each_str.substr(0, eqpos);
            eqpos = eqpos + 1;
            value = each_str.substr(eqpos, leng - eqpos);
            old_jpath.push(jpath);
            old_jpath_len.push((jpath).length);
            old_val_arr.push(value);
            if (jpath == "module/serialNumber") {
                old_serial = value;
            }
        }

        try {
            actualSettings = this._download("api.json");
        } catch {
            // retry silently after a short wait
            YAPI.Sleep(500);
            actualSettings = this._download("api.json");
        }
        new_serial = this.get_serialNumber();
        if (old_serial == new_serial || old_serial == "") {
            old_serial = "_NO_SERIAL_FILTER_";
        }
        actualSettings = this._flattenJsonStruct(actualSettings);
        new_dslist = this._json_get_array(actualSettings);
        for (ii_1 in new_dslist) {
            if(ii_1 =='indexOf') continue; // IE8 Don'tEnum bug
            // remove quotes
            each_str = this._json_get_string(new_dslist[ii_1]);
            // split json path and attr
            leng = (each_str).length;
            eqpos = (each_str).indexOf("=");
            if ((eqpos < 0) || (leng == 0)) {
                this._throw(YAPI_INVALID_ARGUMENT, "Invalid settings");
                return YAPI_INVALID_ARGUMENT;
            }
            jpath = each_str.substr(0, eqpos);
            eqpos = eqpos + 1;
            value = each_str.substr(eqpos, leng - eqpos);
            new_jpath.push(jpath);
            new_jpath_len.push((jpath).length);
            new_val_arr.push(value);
        }
        i = 0;
        while (i < new_jpath.length) {
            njpath = new_jpath[i];
            leng = (njpath).length;
            cpos = (njpath).indexOf("/");
            if ((cpos < 0) || (leng == 0)) {
                continue;
            }
            fun = njpath.substr(0, cpos);
            cpos = cpos + 1;
            attr = njpath.substr(cpos, leng - cpos);
            do_update = true;
            if (fun == "services") {
                do_update = false;
            }
            if ((do_update) && (attr == "firmwareRelease")) {
                do_update = false;
            }
            if ((do_update) && (attr == "usbCurrent")) {
                do_update = false;
            }
            if ((do_update) && (attr == "upTime")) {
                do_update = false;
            }
            if ((do_update) && (attr == "persistentSettings")) {
                do_update = false;
            }
            if ((do_update) && (attr == "adminPassword")) {
                do_update = false;
            }
            if ((do_update) && (attr == "userPassword")) {
                do_update = false;
            }
            if ((do_update) && (attr == "rebootCountdown")) {
                do_update = false;
            }
            if ((do_update) && (attr == "advertisedValue")) {
                do_update = false;
            }
            if ((do_update) && (attr == "poeCurrent")) {
                do_update = false;
            }
            if ((do_update) && (attr == "readiness")) {
                do_update = false;
            }
            if ((do_update) && (attr == "ipAddress")) {
                do_update = false;
            }
            if ((do_update) && (attr == "subnetMask")) {
                do_update = false;
            }
            if ((do_update) && (attr == "router")) {
                do_update = false;
            }
            if ((do_update) && (attr == "linkQuality")) {
                do_update = false;
            }
            if ((do_update) && (attr == "ssid")) {
                do_update = false;
            }
            if ((do_update) && (attr == "channel")) {
                do_update = false;
            }
            if ((do_update) && (attr == "security")) {
                do_update = false;
            }
            if ((do_update) && (attr == "message")) {
                do_update = false;
            }
            if ((do_update) && (attr == "signalValue")) {
                do_update = false;
            }
            if ((do_update) && (attr == "currentValue")) {
                do_update = false;
            }
            if ((do_update) && (attr == "currentRawValue")) {
                do_update = false;
            }
            if ((do_update) && (attr == "currentRunIndex")) {
                do_update = false;
            }
            if ((do_update) && (attr == "pulseTimer")) {
                do_update = false;
            }
            if ((do_update) && (attr == "lastTimePressed")) {
                do_update = false;
            }
            if ((do_update) && (attr == "lastTimeReleased")) {
                do_update = false;
            }
            if ((do_update) && (attr == "filesCount")) {
                do_update = false;
            }
            if ((do_update) && (attr == "freeSpace")) {
                do_update = false;
            }
            if ((do_update) && (attr == "timeUTC")) {
                do_update = false;
            }
            if ((do_update) && (attr == "rtcTime")) {
                do_update = false;
            }
            if ((do_update) && (attr == "unixTime")) {
                do_update = false;
            }
            if ((do_update) && (attr == "dateTime")) {
                do_update = false;
            }
            if ((do_update) && (attr == "rawValue")) {
                do_update = false;
            }
            if ((do_update) && (attr == "lastMsg")) {
                do_update = false;
            }
            if ((do_update) && (attr == "delayedPulseTimer")) {
                do_update = false;
            }
            if ((do_update) && (attr == "rxCount")) {
                do_update = false;
            }
            if ((do_update) && (attr == "txCount")) {
                do_update = false;
            }
            if ((do_update) && (attr == "msgCount")) {
                do_update = false;
            }
            if ((do_update) && (attr == "rxMsgCount")) {
                do_update = false;
            }
            if ((do_update) && (attr == "txMsgCount")) {
                do_update = false;
            }
            if (do_update) {
                do_update = false;
                j = 0;
                found = false;
                newval = new_val_arr[i];
                while ((j < old_jpath.length) && !(found)) {
                    if ((new_jpath_len[i] == old_jpath_len[j]) && (new_jpath[i] == old_jpath[j])) {
                        found = true;
                        oldval = old_val_arr[j];
                        if (!(newval == oldval) && !(oldval == old_serial)) {
                            do_update = true;
                        }
                    }
                    j = j + 1;
                }
            }
            if (do_update) {
                if (attr == "calibrationParam") {
                    old_calib = "";
                    unit_name = "";
                    sensorType = "";
                    new_calib = newval;
                    j = 0;
                    found = false;
                    while ((j < old_jpath.length) && !(found)) {
                        if ((new_jpath_len[i] == old_jpath_len[j]) && (new_jpath[i] == old_jpath[j])) {
                            found = true;
                            old_calib = old_val_arr[j];
                        }
                        j = j + 1;
                    }
                    tmp = fun + "/unit";
                    j = 0;
                    found = false;
                    while ((j < new_jpath.length) && !(found)) {
                        if (tmp == new_jpath[j]) {
                            found = true;
                            unit_name = new_val_arr[j];
                        }
                        j = j + 1;
                    }
                    tmp = fun + "/sensorType";
                    j = 0;
                    found = false;
                    while ((j < new_jpath.length) && !(found)) {
                        if (tmp == new_jpath[j]) {
                            found = true;
                            sensorType = new_val_arr[j];
                        }
                        j = j + 1;
                    }
                    newval = this.calibConvert(old_calib, new_val_arr[i], unit_name, sensorType);
                    url = "api/" + fun + ".json?" + attr + "=" + this._escapeAttr(newval);
                    subres = this._tryExec(url);
                    if ((res == YAPI_SUCCESS) && (subres != YAPI_SUCCESS)) {
                        res = subres;
                    }
                } else {
                    url = "api/" + fun + ".json?" + attr + "=" + this._escapeAttr(oldval);
                    if (attr == "resolution") {
                        restoreLast.push(url);
                    } else {
                        subres = this._tryExec(url);
                        if ((res == YAPI_SUCCESS) && (subres != YAPI_SUCCESS)) {
                            res = subres;
                        }
                    }
                }
            }
            i = i + 1;
        }
        for (ii_2 in restoreLast) {
            if(ii_2 =='indexOf') continue; // IE8 Don'tEnum bug
            subres = this._tryExec(restoreLast[ii_2]);
            if ((res == YAPI_SUCCESS) && (subres != YAPI_SUCCESS)) {
                res = subres;
            }
        }
        this.clearCache();
        return res;
    }

    /**
     * Adds a file to the uploaded data at the next HTTP callback.
     * This function only affects the next HTTP callback and only works in
     * HTTP callback mode.
     *
     * @param filename : the name of the file to upload at the next HTTP callback
     *
     * @return nothing.
     */
    function YModule_addFileToHTTPCallback(filename)
    {
        var content;                // bin;

        content = this._download("@YCB+" + filename);
        if ((content).length == 0) {
            return YAPI_NOT_SUPPORTED;
        }
        return YAPI_SUCCESS;
    }

    /**
     * Returns the unique hardware identifier of the module.
     * The unique hardware identifier is made of the device serial
     * number followed by string ".module".
     *
     * @return a string that uniquely identifies the module
     */
    function YModule_get_hardwareId()
    {
        var serial;                 // str;

        serial = this.get_serialNumber();
        return serial + ".module";
    }

    /**
     * Downloads the specified built-in file and returns a binary buffer with its content.
     *
     * @param pathname : name of the new file to load
     *
     * @return a binary buffer with the file content
     *
     * On failure, throws an exception or returns  YAPI_INVALID_STRING.
     */
    function YModule_download(pathname)
    {
        return this._download(pathname);
    }

    /**
     * Returns the icon of the module. The icon is a PNG image and does not
     * exceeds 1536 bytes.
     *
     * @return a binary buffer with module icon, in png format.
     *         On failure, throws an exception or returns  YAPI_INVALID_STRING.
     */
    function YModule_get_icon2d()
    {
        return this._download("icon2d.png");
    }

    /**
     * Returns a string with last logs of the module. This method return only
     * logs that are still in the module.
     *
     * @return a string with last logs of the module.
     *         On failure, throws an exception or returns  YAPI_INVALID_STRING.
     */
    function YModule_get_lastLogs()
    {
        var content;                // bin;

        content = this._download("logs.txt");
        return content;
    }

    /**
     * Adds a text message to the device logs. This function is useful in
     * particular to trace the execution of HTTP callbacks. If a newline
     * is desired after the message, it must be included in the string.
     *
     * @param text : the string to append to the logs.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_log(text)
    {
        return this._upload("logs.txt", text);
    }

    //cannot be generated for JS:
    //function YModule_get_subDevices()

    //cannot be generated for JS:
    //function YModule_get_parentHub()

    //cannot be generated for JS:
    //function YModule_get_url()

    /**
     * Continues the module enumeration started using yFirstModule().
     * Caution: You can't make any assumption about the returned modules order.
     * If you want to find a specific module, use Module.findModule()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YModule object, corresponding to
     *         the next module found, or a null pointer
     *         if there are no more modules to enumerate.
     */
    function YModule_nextModule()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YModule.FindModule(next_hwid);
    }

    /**
     * Starts the enumeration of modules currently accessible.
     * Use the method YModule.nextModule() to iterate on the
     * next modules.
     *
     * @return a pointer to a YModule object, corresponding to
     *         the first module currently online, or a null pointer
     *         if there are none.
     */
    function YModule_FirstModule()
    {
        var next_hwid = YAPI.getFirstHardwareId('Module');
        if(next_hwid == null) return null;
        return YModule.FindModule(next_hwid);
    }

    //--- (end of generated code: YModule implementation)

    //--- (generated code: YModule initialization)
    YModule = YFunction._Subclass(_YModule, {
        // Constants
        PRODUCTNAME_INVALID         : YAPI_INVALID_STRING,
        SERIALNUMBER_INVALID        : YAPI_INVALID_STRING,
        PRODUCTID_INVALID           : YAPI_INVALID_UINT,
        PRODUCTRELEASE_INVALID      : YAPI_INVALID_UINT,
        FIRMWARERELEASE_INVALID     : YAPI_INVALID_STRING,
        PERSISTENTSETTINGS_LOADED   : 0,
        PERSISTENTSETTINGS_SAVED    : 1,
        PERSISTENTSETTINGS_MODIFIED : 2,
        PERSISTENTSETTINGS_INVALID  : -1,
        LUMINOSITY_INVALID          : YAPI_INVALID_UINT,
        BEACON_OFF                  : 0,
        BEACON_ON                   : 1,
        BEACON_INVALID              : -1,
        UPTIME_INVALID              : YAPI_INVALID_LONG,
        USBCURRENT_INVALID          : YAPI_INVALID_UINT,
        REBOOTCOUNTDOWN_INVALID     : YAPI_INVALID_INT,
        USERVAR_INVALID             : YAPI_INVALID_INT
    }, {
        // Class methods
        FindModule                  : YModule_FindModule,
        FirstModule                 : YModule_FirstModule
    }, {
        // Methods
        get_productName             : YModule_get_productName,
        productName                 : YModule_get_productName,
        get_productName_async       : YModule_get_productName_async,
        productName_async           : YModule_get_productName_async,
        get_serialNumber            : YModule_get_serialNumber,
        serialNumber                : YModule_get_serialNumber,
        get_serialNumber_async      : YModule_get_serialNumber_async,
        serialNumber_async          : YModule_get_serialNumber_async,
        get_productId               : YModule_get_productId,
        productId                   : YModule_get_productId,
        get_productId_async         : YModule_get_productId_async,
        productId_async             : YModule_get_productId_async,
        get_productRelease          : YModule_get_productRelease,
        productRelease              : YModule_get_productRelease,
        get_productRelease_async    : YModule_get_productRelease_async,
        productRelease_async        : YModule_get_productRelease_async,
        get_firmwareRelease         : YModule_get_firmwareRelease,
        firmwareRelease             : YModule_get_firmwareRelease,
        get_firmwareRelease_async   : YModule_get_firmwareRelease_async,
        firmwareRelease_async       : YModule_get_firmwareRelease_async,
        get_persistentSettings      : YModule_get_persistentSettings,
        persistentSettings          : YModule_get_persistentSettings,
        get_persistentSettings_async : YModule_get_persistentSettings_async,
        persistentSettings_async    : YModule_get_persistentSettings_async,
        set_persistentSettings      : YModule_set_persistentSettings,
        setPersistentSettings       : YModule_set_persistentSettings,
        get_luminosity              : YModule_get_luminosity,
        luminosity                  : YModule_get_luminosity,
        get_luminosity_async        : YModule_get_luminosity_async,
        luminosity_async            : YModule_get_luminosity_async,
        set_luminosity              : YModule_set_luminosity,
        setLuminosity               : YModule_set_luminosity,
        get_beacon                  : YModule_get_beacon,
        beacon                      : YModule_get_beacon,
        get_beacon_async            : YModule_get_beacon_async,
        beacon_async                : YModule_get_beacon_async,
        set_beacon                  : YModule_set_beacon,
        setBeacon                   : YModule_set_beacon,
        get_upTime                  : YModule_get_upTime,
        upTime                      : YModule_get_upTime,
        get_upTime_async            : YModule_get_upTime_async,
        upTime_async                : YModule_get_upTime_async,
        get_usbCurrent              : YModule_get_usbCurrent,
        usbCurrent                  : YModule_get_usbCurrent,
        get_usbCurrent_async        : YModule_get_usbCurrent_async,
        usbCurrent_async            : YModule_get_usbCurrent_async,
        get_rebootCountdown         : YModule_get_rebootCountdown,
        rebootCountdown             : YModule_get_rebootCountdown,
        get_rebootCountdown_async   : YModule_get_rebootCountdown_async,
        rebootCountdown_async       : YModule_get_rebootCountdown_async,
        set_rebootCountdown         : YModule_set_rebootCountdown,
        setRebootCountdown          : YModule_set_rebootCountdown,
        get_userVar                 : YModule_get_userVar,
        userVar                     : YModule_get_userVar,
        get_userVar_async           : YModule_get_userVar_async,
        userVar_async               : YModule_get_userVar_async,
        set_userVar                 : YModule_set_userVar,
        setUserVar                  : YModule_set_userVar,
        get_productNameAndRevision  : YModule_get_productNameAndRevision,
        productNameAndRevision      : YModule_get_productNameAndRevision,
        saveToFlash                 : YModule_saveToFlash,
        revertFromFlash             : YModule_revertFromFlash,
        reboot                      : YModule_reboot,
        triggerFirmwareUpdate       : YModule_triggerFirmwareUpdate,
        _startStopDevLog            : YModule_startStopDevLog,
        registerLogCallback         : YModule_registerLogCallback,
        get_logCallback             : YModule_get_logCallback,
        logCallback                 : YModule_get_logCallback,
        registerConfigChangeCallback : YModule_registerConfigChangeCallback,
        _invokeConfigChangeCallback : YModule_invokeConfigChangeCallback,
        registerBeaconCallback      : YModule_registerBeaconCallback,
        _invokeBeaconCallback       : YModule_invokeBeaconCallback,
        triggerConfigChangeCallback : YModule_triggerConfigChangeCallback,
        checkFirmware               : YModule_checkFirmware,
        updateFirmwareEx            : YModule_updateFirmwareEx,
        updateFirmware              : YModule_updateFirmware,
        get_allSettings             : YModule_get_allSettings,
        allSettings                 : YModule_get_allSettings,
        loadThermistorExtra         : YModule_loadThermistorExtra,
        set_extraSettings           : YModule_set_extraSettings,
        setExtraSettings            : YModule_set_extraSettings,
        set_allSettingsAndFiles     : YModule_set_allSettingsAndFiles,
        setAllSettingsAndFiles      : YModule_set_allSettingsAndFiles,
        hasFunction                 : YModule_hasFunction,
        get_functionIds             : YModule_get_functionIds,
        functionIds                 : YModule_get_functionIds,
        _flattenJsonStruct          : YModule_flattenJsonStruct,
        calibVersion                : YModule_calibVersion,
        calibScale                  : YModule_calibScale,
        calibOffset                 : YModule_calibOffset,
        calibConvert                : YModule_calibConvert,
        _tryExec                    : YModule_tryExec,
        set_allSettings             : YModule_set_allSettings,
        setAllSettings              : YModule_set_allSettings,
        addFileToHTTPCallback       : YModule_addFileToHTTPCallback,
        get_hardwareId              : YModule_get_hardwareId,
        hardwareId                  : YModule_get_hardwareId,
        download                    : YModule_download,
        get_icon2d                  : YModule_get_icon2d,
        icon2d                      : YModule_get_icon2d,
        get_lastLogs                : YModule_get_lastLogs,
        lastLogs                    : YModule_get_lastLogs,
        log                         : YModule_log,
        get_subDevices              : YModule_get_subDevices,
        subDevices                  : YModule_get_subDevices,
        get_parentHub               : YModule_get_parentHub,
        parentHub                   : YModule_get_parentHub,
        get_url                     : YModule_get_url,
        url                         : YModule_get_url,
        nextModule                  : YModule_nextModule,
        _parseAttr                  : YModule_parseAttr
    });
    //--- (end of generated code: YModule initialization)
    YModule.prototype._getDev               = YModule_getDev;
    YModule.prototype.functionCount         = YModule_functionCount;
    YModule.prototype.functionId            = YModule_functionId;
    YModule.prototype.functionType          = YModule_functionType;
    YModule.prototype.functionBaseType      = YModule_functionBaseType;
    YModule.prototype.functionName          = YModule_functionName;
    YModule.prototype.functionValue         = YModule_functionValue;
    YModule.prototype.loadUrl               = YModule_loadUrl;
    YModule.prototype.get_logicalName       = YModule_get_logicalName;
    YModule.prototype.logicalName           = YModule_get_logicalName;
    YModule.prototype.get_logicalName_async = YModule_get_logicalName_async;
    YModule.prototype.logicalName_async     = YModule_get_logicalName_async;

/**
 * Backward-compatibility for devices prior to revision 13890
 *
 * Older embedded yocto_dev.js was instantiating functions using
 * an object constructor pointed by YAPI.newFunction
 */

    // for backward-compatibility with older devices
    YAPI.newFunction = function(str_classname,str_func) {
        // Assume all old functions inherit from YSensor,
        // too much is better than not enough
        for(var k in YSensor.prototype) {
            this[k] = YSensor.prototype[k];
        }
        YSensor.call(this, str_func);
        this._className = str_classname;
        // prevent calibration code to fail on non-Sensor devices
        this._calibrationParam = "";
    };
})();

/**
 * Returns the version identifier for the Yoctopuce library in use.
 * The version is a string in the form "Major.Minor.Build",
 * for instance "1.01.5535". For languages using an external
 * DLL (for instance C#, VisualBasic or Delphi), the character string
 * includes as well the DLL version, for instance
 * "1.01.5535 (1.01.5439)".
 *
 * If you want to verify in your code that the library version is
 * compatible with the version that you have used during development,
 * verify that the major number is strictly equal and that the minor
 * number is greater or equal. The build number is not relevant
 * with respect to the library compatibility.
 *
 * @return a character string describing the library version.
 */
function yGetAPIVersion()
{
    return YAPI.GetAPIVersion();
}

/**
 * Initializes the Yoctopuce programming library explicitly.
 * It is not strictly needed to call yInitAPI(), as the library is
 * automatically  initialized when calling yRegisterHub() for the
 * first time.
 *
 * When YAPI.DETECT_NONE is used as detection mode,
 * you must explicitly use yRegisterHub() to point the API to the
 * VirtualHub on which your devices are connected before trying to access them.
 *
 * @param mode : an integer corresponding to the type of automatic
 *         device detection to use. Possible values are
 *         YAPI.DETECT_NONE, YAPI.DETECT_USB, YAPI.DETECT_NET,
 *         and YAPI.DETECT_ALL.
 * @param errmsg : a string passed by reference to receive any error message.
 *
 * @return YAPI.SUCCESS when the call succeeds.
 *
 * On failure returns a negative error code.
 */
function yInitAPI(mode,errmsg)
{
    return YAPI.InitAPI(mode,errmsg);
}

/**
 * Waits for all pending communications with Yoctopuce devices to be
 * completed then frees dynamically allocated resources used by
 * the Yoctopuce library.
 *
 * From an operating system standpoint, it is generally not required to call
 * this function since the OS will automatically free allocated resources
 * once your program is completed. However, there are two situations when
 * you may really want to use that function:
 *
 * - Free all dynamically allocated memory blocks in order to
 * track a memory leak.
 *
 * - Send commands to devices right before the end
 * of the program. Since commands are sent in an asynchronous way
 * the program could exit before all commands are effectively sent.
 *
 * You should not call any other library function after calling
 * yFreeAPI(), or your program will crash.
 */
function yFreeAPI()
{
    YAPI.FreeAPI();
}

/**
 * Disables the use of exceptions to report runtime errors.
 * When exceptions are disabled, every function returns a specific
 * error value which depends on its type and which is documented in
 * this reference manual.
 */
function yDisableExceptions()
{
    YAPI.DisableExceptions();
}

/**
 * Re-enables the use of exceptions for runtime error handling.
 * Be aware than when exceptions are enabled, every function that fails
 * triggers an exception. If the exception is not caught by the user code,
 * it either fires the debugger or aborts (i.e. crash) the program.
 */
function yEnableExceptions()
{
    YAPI.EnableExceptions();
}

/**
 * Set up the Yoctopuce library to use modules connected on a given machine. Idealy this
 * call will be made once at the begining of your application.  The
 * parameter will determine how the API will work. Use the following values:
 *
 * <b>usb</b>: When the usb keyword is used, the API will work with
 * devices connected directly to the USB bus. Some programming languages such a JavaScript,
 * PHP, and Java don't provide direct access to USB hardware, so usb will
 * not work with these. In this case, use a VirtualHub or a networked YoctoHub (see below).
 *
 * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
 * host with the given IP address or hostname. That host can be a regular computer
 * running a <i>native VirtualHub</i>, a <i>VirtualHub for web</i> hosted on a server,
 * or a networked YoctoHub such as YoctoHub-Ethernet or
 * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
 * computer, use the IP address 127.0.0.1. If the given IP is unresponsive, yRegisterHub
 * will not return until a time-out defined by ySetNetworkTimeout has elapsed.
 * However, it is possible to preventively test a connection  with yTestHub.
 * If you cannot afford a network time-out, you can use the non blocking yPregisterHub
 * function that will establish the connection as soon as it is available.
 *
 *
 * <b>callback</b>: that keyword make the API run in "<i>HTTP Callback</i>" mode.
 * This a special mode allowing to take control of Yoctopuce devices
 * through a NAT filter when using a VirtualHub or a networked YoctoHub. You only
 * need to configure your hub to call your server script on a regular basis.
 * This mode is currently available for PHP and Node.JS only.
 *
 * Be aware that only one application can use direct USB access at a
 * given time on a machine. Multiple access would cause conflicts
 * while trying to access the USB modules. In particular, this means
 * that you must stop the VirtualHub software before starting
 * an application that uses direct USB access. The workaround
 * for this limitation is to set up the library to use the VirtualHub
 * rather than direct USB access.
 *
 * If access control has been activated on the hub, virtual or not, you want to
 * reach, the URL parameter should look like:
 *
 * http://username:password@address:port
 *
 * You can call <i>RegisterHub</i> several times to connect to several machines. On
 * the other hand, it is useless and even counterproductive to call <i>RegisterHub</i>
 * with to same address multiple times during the life of the application.
 *
 * @param url : a string containing either "usb","callback" or the
 *         root URL of the hub to monitor
 * @param errmsg : a string passed by reference to receive any error message.
 *
 * @return YAPI.SUCCESS when the call succeeds.
 *
 * On failure returns a negative error code.
 */
function yRegisterHub(url,errmsg)
{
    return YAPI.RegisterHub(url,errmsg);
}

/**
 * Fault-tolerant alternative to yRegisterHub(). This function has the same
 * purpose and same arguments as yRegisterHub(), but does not trigger
 * an error when the selected hub is not available at the time of the function call.
 * If the connexion cannot be established immediately, a background task will automatically
 * perform periodic retries. This makes it possible to register a network hub independently of the current
 * connectivity, and to try to contact it only when a device is actively needed.
 *
 * @param url : a string containing either "usb","callback" or the
 *         root URL of the hub to monitor
 * @param errmsg : a string passed by reference to receive any error message.
 *
 * @return YAPI.SUCCESS when the call succeeds.
 *
 * On failure returns a negative error code.
 */
function yPreregisterHub(url,errmsg)
{
    return YAPI.PreregisterHub(url,errmsg);
}

/**
 * Set up the Yoctopuce library to no more use modules connected on a previously
 * registered machine with RegisterHub.
 *
 * @param url : a string containing either "usb" or the
 *         root URL of the hub to monitor
 */
function yUnregisterHub(url)
{
    YAPI.UnregisterHub(url);
}

/**
 * Triggers a (re)detection of connected Yoctopuce modules.
 * The library searches the machines or USB ports previously registered using
 * yRegisterHub(), and invokes any user-defined callback function
 * in case a change in the list of connected devices is detected.
 *
 * This function can be called as frequently as desired to refresh the device list
 * and to make the application aware of hot-plug events. However, since device
 * detection is quite a heavy process, UpdateDeviceList shouldn't be called more
 * than once every two seconds.
 *
 * @param errmsg : a string passed by reference to receive any error message.
 *
 * @return YAPI.SUCCESS when the call succeeds.
 *
 * On failure returns a negative error code.
 */
function yUpdateDeviceList(errmsg)
{
    return YAPI.UpdateDeviceList(errmsg);
}

/**
 * Triggers a (re)detection of connected Yoctopuce modules.
 * The library searches the machines or USB ports previously registered using
 * yRegisterHub(), and invokes any user-defined callback function
 * in case a change in the list of connected devices is detected.
 *
 * This function can be called as frequently as desired to refresh the device list
 * and to make the application aware of hot-plug events.
 *
 * This asynchronous version exists only in JavaScript. It uses a callback instead
 * of a return value in order to avoid blocking Firefox JavaScript VM that does not
 * implement context switching during blocking I/O calls.
 *
 * @param callback : callback function that is invoked when the result is known.
 *         The callback function receives three arguments: the caller-specific
 *         context object, the result code (YAPI.SUCCESS
 *         if the operation completes successfully) and the error
 *         message.
 * @param context : caller-specific object that is passed as-is to the callback function
 *
 * @return nothing : the result is provided to the callback.
 */
function yUpdateDeviceList_async(callback, context)
{
    return YAPI.UpdateDeviceList_async(callback, context);
}

/**
 * Maintains the device-to-library communication channel.
 * If your program includes significant loops, you may want to include
 * a call to this function to make sure that the library takes care of
 * the information pushed by the modules on the communication channels.
 * This is not strictly necessary, but it may improve the reactivity
 * of the library for the following commands.
 *
 * This function may signal an error in case there is a communication problem
 * while contacting a module.
 *
 * @param errmsg : a string passed by reference to receive any error message.
 *
 * @return YAPI.SUCCESS when the call succeeds.
 *
 * On failure returns a negative error code.
 */
function yHandleEvents(errmsg)
{
    return YAPI.HandleEvents(errmsg);
}

/**
 * Pauses the execution flow for a specified duration.
 * This function implements a passive waiting loop, meaning that it does not
 * consume CPU cycles significantly. The processor is left available for
 * other threads and processes. During the pause, the library nevertheless
 * reads from time to time information from the Yoctopuce modules by
 * calling yHandleEvents(), in order to stay up-to-date.
 *
 * This function may signal an error in case there is a communication problem
 * while contacting a module.
 *
 * @param ms_duration : an integer corresponding to the duration of the pause,
 *         in milliseconds.
 * @param errmsg : a string passed by reference to receive any error message.
 *
 * @return YAPI.SUCCESS when the call succeeds.
 *
 * On failure returns a negative error code.
 */
function ySleep(ms_duration, errmsg)
{
    return YAPI.Sleep(ms_duration, errmsg);
}

/**
 * Invoke the specified callback function after a given timeout.
 * This function behaves more or less like Javascript setTimeout,
 * but during the waiting time, it will call yHandleEvents
 * and yUpdateDeviceList periodically, in order to
 * keep the API up-to-date with current devices.
 *
 * @param callback : the function to call after the timeout occurs.
 *         On Microsoft Internet Explorer, the callback must
 *         be provided as a string to be evaluated.
 * @param ms_timeout : an integer corresponding to the duration of the
 *         timeout, in milliseconds.
 * @param args : additional arguments to be passed to the
 *         callback function can be provided, if needed
 *         (not supported on Microsoft Internet Explorer).
 *
 * @return YAPI.SUCCESS
 */
function ySetTimeout(callback, ms_timeout, args)
{
    var allArgs = [callback, ms_timeout];
    if(args) allArgs.push(args);
    return YAPI.SetTimeout.apply(YAPI, allArgs);
}

/**
 * Returns the current value of a monotone millisecond-based time counter.
 * This counter can be used to compute delays in relation with
 * Yoctopuce devices, which also uses the millisecond as timebase.
 *
 * @return a long integer corresponding to the millisecond counter.
 */
function yGetTickCount()
{
    return YAPI.GetTickCount();
}

/**
 * Checks if a given string is valid as logical name for a module or a function.
 * A valid logical name has a maximum of 19 characters, all among
 * A...Z, a...z, 0...9, _, and -.
 * If you try to configure a logical name with an incorrect string,
 * the invalid characters are ignored.
 *
 * @param name : a string containing the name to check.
 *
 * @return true if the name is valid, false otherwise.
 */
function yCheckLogicalName(name)
{
    return YAPI.CheckLogicalName(name);
}

/**
 * Register a callback function, to be called each time
 * a device is plugged. This callback will be invoked while yUpdateDeviceList
 * is running. You will have to call this function on a regular basis.
 *
 * @param arrivalCallback : a procedure taking a YModule parameter, or null
 *         to unregister a previously registered  callback.
 */
function yRegisterDeviceArrivalCallback(arrivalCallback)
{
    return YAPI.RegisterDeviceArrivalCallback(arrivalCallback);
}

function yRegisterDeviceChangeCallback(changeCallback)
{
    return YAPI.RegisterDeviceChangeCallback(changeCallback);
}

/**
 * Register a callback function, to be called each time
 * a device is unplugged. This callback will be invoked while yUpdateDeviceList
 * is running. You will have to call this function on a regular basis.
 *
 * @param removalCallback : a procedure taking a YModule parameter, or null
 *         to unregister a previously registered  callback.
 */
function yRegisterDeviceRemovalCallback(removalCallback)
{
    return YAPI.RegisterDeviceRemovalCallback(removalCallback);
}

// Register a new value calibration handler for a given calibration type
//
function yRegisterCalibrationHandler(calibrationType, calibrationHandler)
{
    return YAPI.RegisterCalibrationHandler(calibrationType, calibrationHandler);
}

// Standard value calibration handler (n-point linear error correction)
//
var yLinearCalibrationHandler = YAPI.LinearCalibrationHandler;

//--- (generated code: YSensor functions)

/**
 * Retrieves a sensor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSensor.isOnline() to test if the sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the sensor, for instance
 *         MyDevice..
 *
 * @return a YSensor object allowing you to drive the sensor.
 */
function yFindSensor(func)
{
    return YSensor.FindSensor(func);
}

/**
 * Starts the enumeration of sensors currently accessible.
 * Use the method YSensor.nextSensor() to iterate on
 * next sensors.
 *
 * @return a pointer to a YSensor object, corresponding to
 *         the first sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstSensor()
{
    return YSensor.FirstSensor();
}

//--- (end of generated code: YSensor functions)

//--- (generated code: YModule functions)

/**
 * Allows you to find a module from its serial number or from its logical name.
 *
 * This function does not require that the module is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YModule.isOnline() to test if the module is
 * indeed online at a given time. In case of ambiguity when looking for
 * a module by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string containing either the serial number or
 *         the logical name of the desired module
 *
 * @return a YModule object allowing you to drive the module
 *         or get additional information on the module.
 */
function yFindModule(func)
{
    return YModule.FindModule(func);
}

/**
 * Starts the enumeration of modules currently accessible.
 * Use the method YModule.nextModule() to iterate on the
 * next modules.
 *
 * @return a pointer to a YModule object, corresponding to
 *         the first module currently online, or a null pointer
 *         if there are none.
 */
function yFirstModule()
{
    return YModule.FirstModule();
}

//--- (end of generated code: YModule functions)



//--- (generated code: YDataLogger functions)

/**
 * Retrieves a data logger for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the data logger is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDataLogger.isOnline() to test if the data logger is
 * indeed online at a given time. In case of ambiguity when looking for
 * a data logger by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the data logger, for instance
 *         LIGHTMK4.dataLogger.
 *
 * @return a YDataLogger object allowing you to drive the data logger.
 */
function yFindDataLogger(func)
{
    return YDataLogger.FindDataLogger(func);
}

/**
 * Starts the enumeration of data loggers currently accessible.
 * Use the method YDataLogger.nextDataLogger() to iterate on
 * next data loggers.
 *
 * @return a pointer to a YDataLogger object, corresponding to
 *         the first data logger currently online, or a null pointer
 *         if there are none.
 */
function yFirstDataLogger()
{
    return YDataLogger.FirstDataLogger();
}

//--- (end of generated code: YDataLogger functions)