/*********************************************************************
 *
 * $Id: yocto_serialport.js 62273 2024-08-23 07:20:59Z seb $
 *
 * Implements the high-level API for SerialPort functions
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
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED 'AS IS' WITHOUT
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

if(typeof YAPI == "undefined") { if(typeof yAPI != "undefined") window["YAPI"]=yAPI; else throw "YAPI is not defined, please include yocto_api.js first"; }

//--- (generated code: YSerialPort return codes)
//--- (end of generated code: YSerialPort return codes)
//--- (generated code: YSerialPort definitions)
var Y_VOLTAGELEVEL_OFF              = 0;
var Y_VOLTAGELEVEL_TTL3V            = 1;
var Y_VOLTAGELEVEL_TTL3VR           = 2;
var Y_VOLTAGELEVEL_TTL5V            = 3;
var Y_VOLTAGELEVEL_TTL5VR           = 4;
var Y_VOLTAGELEVEL_RS232            = 5;
var Y_VOLTAGELEVEL_RS485            = 6;
var Y_VOLTAGELEVEL_TTL1V8           = 7;
var Y_VOLTAGELEVEL_SDI12            = 8;
var Y_VOLTAGELEVEL_INVALID          = -1;
var Y_RXCOUNT_INVALID               = YAPI_INVALID_UINT;
var Y_TXCOUNT_INVALID               = YAPI_INVALID_UINT;
var Y_ERRCOUNT_INVALID              = YAPI_INVALID_UINT;
var Y_RXMSGCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_TXMSGCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_LASTMSG_INVALID               = YAPI_INVALID_STRING;
var Y_CURRENTJOB_INVALID            = YAPI_INVALID_STRING;
var Y_STARTUPJOB_INVALID            = YAPI_INVALID_STRING;
var Y_JOBMAXTASK_INVALID            = YAPI_INVALID_UINT;
var Y_JOBMAXSIZE_INVALID            = YAPI_INVALID_UINT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
var Y_PROTOCOL_INVALID              = YAPI_INVALID_STRING;
var Y_SERIALMODE_INVALID            = YAPI_INVALID_STRING;
//--- (end of generated code: YSerialPort definitions)


//--- (generated code: YSnoopingRecord definitions)
//--- (end of generated code: YSnoopingRecord definitions)

//--- (generated code: YSnoopingRecord class start)
/**
 * YSnoopingRecord Class: Intercepted serial message description, returned by serialPort.snoopMessages method
 *
 *
 */
//--- (end of generated code: YSnoopingRecord class start)

var YSnoopingRecord; // definition below
(function()
{
    function _YSnoopingRecord(str_json)
    {
        //--- (generated code: YSnoopingRecord constructor)
        this._tim                            = 0;                          // int
        this._pos                            = 0;                          // int
        this._dir                            = 0;                          // int
        this._msg                            = "";                         // str
        //--- (end of generated code: YSnoopingRecord constructor)

        var loadval = JSON.parse(str_json);
        this._tim = loadval.t;
        this._pos = loadval.p;
        this._dir = (loadval.m[0] == '<' ? 1 : 0);
        this._msg = loadval.m.slice(1);

    }

    //--- (generated code: YSnoopingRecord implementation)

    /**
     * Returns the elapsed time, in ms, since the beginning of the preceding message.
     *
     * @return the elapsed time, in ms, since the beginning of the preceding message.
     */
    function YSnoopingRecord_get_time()
    {
        return this._tim;
    }

    /**
     * Returns the absolute position of the message end.
     *
     * @return the absolute position of the message end.
     */
    function YSnoopingRecord_get_pos()
    {
        return this._pos;
    }

    /**
     * Returns the message direction (RX=0, TX=1).
     *
     * @return the message direction (RX=0, TX=1).
     */
    function YSnoopingRecord_get_direction()
    {
        return this._dir;
    }

    /**
     * Returns the message content.
     *
     * @return the message content.
     */
    function YSnoopingRecord_get_message()
    {
        return this._msg;
    }

    //--- (end of generated code: YSnoopingRecord implementation)

    //--- (generated code: YSnoopingRecord initialization)
    YSnoopingRecord = _YSnoopingRecord;
    // Methods
    YSnoopingRecord.prototype.get_time                    = YSnoopingRecord_get_time;
    YSnoopingRecord.prototype.time                        = YSnoopingRecord_get_time;
    YSnoopingRecord.prototype.get_pos                     = YSnoopingRecord_get_pos;
    YSnoopingRecord.prototype.pos                         = YSnoopingRecord_get_pos;
    YSnoopingRecord.prototype.get_direction               = YSnoopingRecord_get_direction;
    YSnoopingRecord.prototype.direction                   = YSnoopingRecord_get_direction;
    YSnoopingRecord.prototype.get_message                 = YSnoopingRecord_get_message;
    YSnoopingRecord.prototype.message                     = YSnoopingRecord_get_message;
    //--- (end of generated code: YSnoopingRecord initialization)
})();


//--- (generated code: YSerialPort class start)
/**
 * YSerialPort Class: serial port control interface, available for instance in the Yocto-RS232, the
 * Yocto-RS485-V2 or the Yocto-Serial
 *
 * The YSerialPort class allows you to fully drive a Yoctopuce serial port.
 * It can be used to send and receive data, and to configure communication
 * parameters (baud rate, bit count, parity, flow control and protocol).
 * Note that Yoctopuce serial ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of generated code: YSerialPort class start)

var YSerialPort; // definition below
(function()
{
    function _YSerialPort(str_func)
    {
        //--- (generated code: YSerialPort constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'SerialPort';

        this._rxCount                        = Y_RXCOUNT_INVALID;          // UInt31
        this._txCount                        = Y_TXCOUNT_INVALID;          // UInt31
        this._errCount                       = Y_ERRCOUNT_INVALID;         // UInt31
        this._rxMsgCount                     = Y_RXMSGCOUNT_INVALID;       // UInt31
        this._txMsgCount                     = Y_TXMSGCOUNT_INVALID;       // UInt31
        this._lastMsg                        = Y_LASTMSG_INVALID;          // Text
        this._currentJob                     = Y_CURRENTJOB_INVALID;       // Text
        this._startupJob                     = Y_STARTUPJOB_INVALID;       // Text
        this._jobMaxTask                     = Y_JOBMAXTASK_INVALID;       // UInt31
        this._jobMaxSize                     = Y_JOBMAXSIZE_INVALID;       // UInt31
        this._command                        = Y_COMMAND_INVALID;          // Text
        this._protocol                       = Y_PROTOCOL_INVALID;         // Protocol
        this._voltageLevel                   = Y_VOLTAGELEVEL_INVALID;     // SerialVoltageLevel
        this._serialMode                     = Y_SERIALMODE_INVALID;       // SerialMode
        this._rxptr                          = 0;                          // int
        this._rxbuff                         = "";                         // bin
        this._rxbuffptr                      = 0;                          // int
        this._eventPos                       = 0;                          // int
        this._eventCallback                  = null;                       // YSnoopingCallback
        //--- (end of generated code: YSerialPort constructor)
    }

    //--- (generated code: YSerialPort implementation)

    function YSerialPort_parseAttr(name, val, _super)
    {
        switch(name) {
        case "rxCount":
            this._rxCount = parseInt(val);
            return 1;
        case "txCount":
            this._txCount = parseInt(val);
            return 1;
        case "errCount":
            this._errCount = parseInt(val);
            return 1;
        case "rxMsgCount":
            this._rxMsgCount = parseInt(val);
            return 1;
        case "txMsgCount":
            this._txMsgCount = parseInt(val);
            return 1;
        case "lastMsg":
            this._lastMsg = val;
            return 1;
        case "currentJob":
            this._currentJob = val;
            return 1;
        case "startupJob":
            this._startupJob = val;
            return 1;
        case "jobMaxTask":
            this._jobMaxTask = parseInt(val);
            return 1;
        case "jobMaxSize":
            this._jobMaxSize = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        case "protocol":
            this._protocol = val;
            return 1;
        case "voltageLevel":
            this._voltageLevel = parseInt(val);
            return 1;
        case "serialMode":
            this._serialMode = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YSerialPort.RXCOUNT_INVALID.
     */
    function YSerialPort_get_rxCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RXCOUNT_INVALID;
            }
        }
        res = this._rxCount;
        return res;
    }

    /**
     * Gets the total number of bytes received since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of bytes received since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.RXCOUNT_INVALID.
     */
    function YSerialPort_get_rxCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RXCOUNT_INVALID);
            } else {
                callback(context, obj, obj._rxCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of bytes transmitted since last reset.
     *
     * @return an integer corresponding to the total number of bytes transmitted since last reset
     *
     * On failure, throws an exception or returns YSerialPort.TXCOUNT_INVALID.
     */
    function YSerialPort_get_txCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TXCOUNT_INVALID;
            }
        }
        res = this._txCount;
        return res;
    }

    /**
     * Gets the total number of bytes transmitted since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of bytes transmitted since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.TXCOUNT_INVALID.
     */
    function YSerialPort_get_txCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TXCOUNT_INVALID);
            } else {
                callback(context, obj, obj._txCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of communication errors detected since last reset.
     *
     * @return an integer corresponding to the total number of communication errors detected since last reset
     *
     * On failure, throws an exception or returns YSerialPort.ERRCOUNT_INVALID.
     */
    function YSerialPort_get_errCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ERRCOUNT_INVALID;
            }
        }
        res = this._errCount;
        return res;
    }

    /**
     * Gets the total number of communication errors detected since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of communication errors detected since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.ERRCOUNT_INVALID.
     */
    function YSerialPort_get_errCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ERRCOUNT_INVALID);
            } else {
                callback(context, obj, obj._errCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of messages received since last reset.
     *
     * @return an integer corresponding to the total number of messages received since last reset
     *
     * On failure, throws an exception or returns YSerialPort.RXMSGCOUNT_INVALID.
     */
    function YSerialPort_get_rxMsgCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RXMSGCOUNT_INVALID;
            }
        }
        res = this._rxMsgCount;
        return res;
    }

    /**
     * Gets the total number of messages received since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of messages received since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.RXMSGCOUNT_INVALID.
     */
    function YSerialPort_get_rxMsgCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RXMSGCOUNT_INVALID);
            } else {
                callback(context, obj, obj._rxMsgCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of messages send since last reset.
     *
     * @return an integer corresponding to the total number of messages send since last reset
     *
     * On failure, throws an exception or returns YSerialPort.TXMSGCOUNT_INVALID.
     */
    function YSerialPort_get_txMsgCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TXMSGCOUNT_INVALID;
            }
        }
        res = this._txMsgCount;
        return res;
    }

    /**
     * Gets the total number of messages send since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of messages send since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.TXMSGCOUNT_INVALID.
     */
    function YSerialPort_get_txMsgCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TXMSGCOUNT_INVALID);
            } else {
                callback(context, obj, obj._txMsgCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the latest message fully received (for Line, Frame and Modbus protocols).
     *
     * @return a string corresponding to the latest message fully received (for Line, Frame and Modbus protocols)
     *
     * On failure, throws an exception or returns YSerialPort.LASTMSG_INVALID.
     */
    function YSerialPort_get_lastMsg()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LASTMSG_INVALID;
            }
        }
        res = this._lastMsg;
        return res;
    }

    /**
     * Gets the latest message fully received (for Line, Frame and Modbus protocols).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:a string corresponding to the latest message fully received (for Line, Frame and Modbus protocols)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.LASTMSG_INVALID.
     */
    function YSerialPort_get_lastMsg_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LASTMSG_INVALID);
            } else {
                callback(context, obj, obj._lastMsg);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the name of the job file currently in use.
     *
     * @return a string corresponding to the name of the job file currently in use
     *
     * On failure, throws an exception or returns YSerialPort.CURRENTJOB_INVALID.
     */
    function YSerialPort_get_currentJob()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTJOB_INVALID;
            }
        }
        res = this._currentJob;
        return res;
    }

    /**
     * Gets the name of the job file currently in use.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:a string corresponding to the name of the job file currently in use
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.CURRENTJOB_INVALID.
     */
    function YSerialPort_get_currentJob_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTJOB_INVALID);
            } else {
                callback(context, obj, obj._currentJob);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Selects a job file to run immediately. If an empty string is
     * given as argument, stops running current job file.
     *
     * @param newval : a string
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_set_currentJob(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('currentJob',rest_val);
    }

    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns YSerialPort.STARTUPJOB_INVALID.
     */
    function YSerialPort_get_startupJob()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_STARTUPJOB_INVALID;
            }
        }
        res = this._startupJob;
        return res;
    }

    /**
     * Gets the job file to use when the device is powered on.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:a string corresponding to the job file to use when the device is powered on
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.STARTUPJOB_INVALID.
     */
    function YSerialPort_get_startupJob_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_STARTUPJOB_INVALID);
            } else {
                callback(context, obj, obj._startupJob);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the job to use when the device is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_set_startupJob(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('startupJob',rest_val);
    }

    /**
     * Returns the maximum number of tasks in a job that the device can handle.
     *
     * @return an integer corresponding to the maximum number of tasks in a job that the device can handle
     *
     * On failure, throws an exception or returns YSerialPort.JOBMAXTASK_INVALID.
     */
    function YSerialPort_get_jobMaxTask()
    {
        var res;                    // int;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_JOBMAXTASK_INVALID;
            }
        }
        res = this._jobMaxTask;
        return res;
    }

    /**
     * Gets the maximum number of tasks in a job that the device can handle.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:an integer corresponding to the maximum number of tasks in a job that the device can handle
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.JOBMAXTASK_INVALID.
     */
    function YSerialPort_get_jobMaxTask_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_JOBMAXTASK_INVALID);
            } else {
                callback(context, obj, obj._jobMaxTask);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns maximum size allowed for job files.
     *
     * @return an integer corresponding to maximum size allowed for job files
     *
     * On failure, throws an exception or returns YSerialPort.JOBMAXSIZE_INVALID.
     */
    function YSerialPort_get_jobMaxSize()
    {
        var res;                    // int;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_JOBMAXSIZE_INVALID;
            }
        }
        res = this._jobMaxSize;
        return res;
    }

    /**
     * Gets maximum size allowed for job files.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:an integer corresponding to maximum size allowed for job files
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.JOBMAXSIZE_INVALID.
     */
    function YSerialPort_get_jobMaxSize_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_JOBMAXSIZE_INVALID);
            } else {
                callback(context, obj, obj._jobMaxSize);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YSerialPort_get_command()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YSerialPort_get_command_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COMMAND_INVALID);
            } else {
                callback(context, obj, obj._command);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YSerialPort_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Returns the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "StxEtx" for ASCII messages delimited by STX/ETX codes,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Wiegand-ASCII" for Wiegand messages in ASCII mode,
     * "Wiegand-26","Wiegand-34", etc for Wiegand messages in byte mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @return a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns YSerialPort.PROTOCOL_INVALID.
     */
    function YSerialPort_get_protocol()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PROTOCOL_INVALID;
            }
        }
        res = this._protocol;
        return res;
    }

    /**
     * Gets the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "StxEtx" for ASCII messages delimited by STX/ETX codes,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Wiegand-ASCII" for Wiegand messages in ASCII mode,
     * "Wiegand-26","Wiegand-34", etc for Wiegand messages in byte mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:a string corresponding to the type of protocol used over the serial line, as a string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.PROTOCOL_INVALID.
     */
    function YSerialPort_get_protocol_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PROTOCOL_INVALID);
            } else {
                callback(context, obj, obj._protocol);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the type of protocol used over the serial line.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "StxEtx" for ASCII messages delimited by STX/ETX codes,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Wiegand-ASCII" for Wiegand messages in ASCII mode,
     * "Wiegand-26","Wiegand-34", etc for Wiegand messages in byte mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each bytes sent.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the type of protocol used over the serial line
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_set_protocol(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('protocol',rest_val);
    }

    /**
     * Returns the voltage level used on the serial line.
     *
     * @return a value among YSerialPort.VOLTAGELEVEL_OFF, YSerialPort.VOLTAGELEVEL_TTL3V,
     * YSerialPort.VOLTAGELEVEL_TTL3VR, YSerialPort.VOLTAGELEVEL_TTL5V, YSerialPort.VOLTAGELEVEL_TTL5VR,
     * YSerialPort.VOLTAGELEVEL_RS232, YSerialPort.VOLTAGELEVEL_RS485, YSerialPort.VOLTAGELEVEL_TTL1V8 and
     * YSerialPort.VOLTAGELEVEL_SDI12 corresponding to the voltage level used on the serial line
     *
     * On failure, throws an exception or returns YSerialPort.VOLTAGELEVEL_INVALID.
     */
    function YSerialPort_get_voltageLevel()
    {
        var res;                    // enumSERIALVOLTAGELEVEL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLTAGELEVEL_INVALID;
            }
        }
        res = this._voltageLevel;
        return res;
    }

    /**
     * Gets the voltage level used on the serial line.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:a value among YSerialPort.VOLTAGELEVEL_OFF, YSerialPort.VOLTAGELEVEL_TTL3V,
     *         YSerialPort.VOLTAGELEVEL_TTL3VR, YSerialPort.VOLTAGELEVEL_TTL5V, YSerialPort.VOLTAGELEVEL_TTL5VR,
     *         YSerialPort.VOLTAGELEVEL_RS232, YSerialPort.VOLTAGELEVEL_RS485, YSerialPort.VOLTAGELEVEL_TTL1V8 and
     *         YSerialPort.VOLTAGELEVEL_SDI12 corresponding to the voltage level used on the serial line
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.VOLTAGELEVEL_INVALID.
     */
    function YSerialPort_get_voltageLevel_async(callback,context)
    {
        var res;                    // enumSERIALVOLTAGELEVEL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLTAGELEVEL_INVALID);
            } else {
                callback(context, obj, obj._voltageLevel);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the voltage type used on the serial line. Valid
     * values  will depend on the Yoctopuce device model featuring
     * the serial port feature.  Check your device documentation
     * to find out which values are valid for that specific model.
     * Trying to set an invalid value will have no effect.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YSerialPort.VOLTAGELEVEL_OFF, YSerialPort.VOLTAGELEVEL_TTL3V,
     * YSerialPort.VOLTAGELEVEL_TTL3VR, YSerialPort.VOLTAGELEVEL_TTL5V, YSerialPort.VOLTAGELEVEL_TTL5VR,
     * YSerialPort.VOLTAGELEVEL_RS232, YSerialPort.VOLTAGELEVEL_RS485, YSerialPort.VOLTAGELEVEL_TTL1V8 and
     * YSerialPort.VOLTAGELEVEL_SDI12 corresponding to the voltage type used on the serial line
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_set_voltageLevel(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('voltageLevel',rest_val);
    }

    /**
     * Returns the serial port communication parameters, as a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix is included
     * if flow control is active: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     *
     * @return a string corresponding to the serial port communication parameters, as a string such as
     *         "9600,8N1"
     *
     * On failure, throws an exception or returns YSerialPort.SERIALMODE_INVALID.
     */
    function YSerialPort_get_serialMode()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SERIALMODE_INVALID;
            }
        }
        res = this._serialMode;
        return res;
    }

    /**
     * Gets the serial port communication parameters, as a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix is included
     * if flow control is active: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSerialPort object that invoked the callback
     *         - the result:a string corresponding to the serial port communication parameters, as a string such as
     *         "9600,8N1"
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSerialPort.SERIALMODE_INVALID.
     */
    function YSerialPort_get_serialMode_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SERIALMODE_INVALID);
            } else {
                callback(context, obj, obj._serialMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the serial port communication parameters, with a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix can be added
     * to enable flow control: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the serial port communication parameters, with a string such as
     *         "9600,8N1"
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_set_serialMode(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('serialMode',rest_val);
    }

    /**
     * Retrieves a serial port for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the serial port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSerialPort.isOnline() to test if the serial port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a serial port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the serial port, for instance
     *         RS232MK1.serialPort.
     *
     * @return a YSerialPort object allowing you to drive the serial port.
     */
    function YSerialPort_FindSerialPort(func)                   // class method
    {
        var obj;                    // YSerialPort;
        obj = YFunction._FindFromCache("SerialPort", func);
        if (obj == null) {
            obj = new YSerialPort(func);
            YFunction._AddToCache("SerialPort", func, obj);
        }
        return obj;
    }

    function YSerialPort_sendCommand(text)
    {
        return this.set_command(text);
    }

    /**
     * Reads a single line (or message) from the receive buffer, starting at current stream position.
     * This function is intended to be used when the serial port is configured for a message protocol,
     * such as 'Line' mode or frame protocols.
     *
     * If data at current stream position is not available anymore in the receive buffer,
     * the function returns the oldest available line and moves the stream position just after.
     * If no new full line is received, the function returns an empty line.
     *
     * @return a string with a single line of text
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_readLine()
    {
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res;                    // str;

        url = "rxmsg.json?pos="+String(Math.round(this._rxptr))+"&len=1&maxw=1";
        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return "";
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        if (msglen == 0) {
            return "";
        }
        res = this._json_get_string(msgarr[0]);
        return res;
    }

    /**
     * Searches for incoming messages in the serial port receive buffer matching a given pattern,
     * starting at current position. This function will only compare and return printable characters
     * in the message strings. Binary protocols are handled as hexadecimal strings.
     *
     * The search returns all messages matching the expression provided as argument in the buffer.
     * If no matching message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param pattern : a limited regular expression describing the expected message format,
     *         or an empty string if all messages should be returned (no filtering).
     *         When using binary protocols, the format applies to the hexadecimal
     *         representation of the message.
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of strings containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSerialPort_readMessages(pattern,maxWait)
    {
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res = [];               // strArr;
        var idx;                    // int;

        url = "rxmsg.json?pos="+String(Math.round(this._rxptr))+"&maxw="+String(Math.round(maxWait))+"&pat="+pattern;
        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(this._json_get_string(msgarr[idx]));
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Changes the current internal stream position to the specified value. This function
     * does not affect the device, it only changes the value stored in the API object
     * for the next read operations.
     *
     * @param absPos : the absolute position index for next read operations.
     *
     * @return nothing.
     */
    function YSerialPort_read_seek(absPos)
    {
        this._rxptr = absPos;
        return YAPI_SUCCESS;
    }

    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return the absolute position index for next read operations.
     */
    function YSerialPort_read_tell()
    {
        return this._rxptr;
    }

    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return the number of bytes available to read
     */
    function YSerialPort_read_avail()
    {
        var availPosStr;            // str;
        var atPos;                  // int;
        var res;                    // int;
        var databin;                // bin;

        databin = this._download("rxcnt.bin?pos="+String(Math.round(this._rxptr)));
        availPosStr = databin;
        atPos = (availPosStr).indexOf("@");
        res = YAPI._atoi(availPosStr.substr(0, atPos));
        return res;
    }

    function YSerialPort_end_tell()
    {
        var availPosStr;            // str;
        var atPos;                  // int;
        var res;                    // int;
        var databin;                // bin;

        databin = this._download("rxcnt.bin?pos="+String(Math.round(this._rxptr)));
        availPosStr = databin;
        atPos = (availPosStr).indexOf("@");
        res = YAPI._atoi(availPosStr.substr(atPos+1, (availPosStr).length-atPos-1));
        return res;
    }

    /**
     * Sends a text line query to the serial port, and reads the reply, if any.
     * This function is intended to be used when the serial port is configured for 'Line' protocol.
     *
     * @param query : the line query to send (without CR/LF)
     * @param maxWait : the maximum number of milliseconds to wait for a reply.
     *
     * @return the next text line received after sending the text query, as a string.
     *         Additional lines can be obtained by calling readLine or readMessages.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSerialPort_queryLine(query,maxWait)
    {
        var prevpos;                // int;
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res;                    // str;
        if ((query).length <= 80) {
            // fast query
            url = "rxmsg.json?len=1&maxw="+String(Math.round(maxWait))+"&cmd=!"+this._escapeAttr(query);
        } else {
            // long query
            prevpos = this.end_tell();
            this._upload("txdata", query + "\r\n");
            url = "rxmsg.json?len=1&maxw="+String(Math.round(maxWait))+"&pos="+String(Math.round(prevpos));
        }

        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return "";
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        if (msglen == 0) {
            return "";
        }
        res = this._json_get_string(msgarr[0]);
        return res;
    }

    /**
     * Sends a binary message to the serial port, and reads the reply, if any.
     * This function is intended to be used when the serial port is configured for
     * Frame-based protocol.
     *
     * @param hexString : the message to send, coded in hexadecimal
     * @param maxWait : the maximum number of milliseconds to wait for a reply.
     *
     * @return the next frame received after sending the message, as a hex string.
     *         Additional frames can be obtained by calling readHex or readMessages.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSerialPort_queryHex(hexString,maxWait)
    {
        var prevpos;                // int;
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res;                    // str;
        if ((hexString).length <= 80) {
            // fast query
            url = "rxmsg.json?len=1&maxw="+String(Math.round(maxWait))+"&cmd=$"+hexString;
        } else {
            // long query
            prevpos = this.end_tell();
            this._upload("txdata", YAPI._hexStrToBin(hexString));
            url = "rxmsg.json?len=1&maxw="+String(Math.round(maxWait))+"&pos="+String(Math.round(prevpos));
        }

        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return "";
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        if (msglen == 0) {
            return "";
        }
        res = this._json_get_string(msgarr[0]);
        return res;
    }

    /**
     * Saves the job definition string (JSON data) into a job file.
     * The job file can be later enabled using selectJob().
     *
     * @param jobfile : name of the job file to save on the device filesystem
     * @param jsonDef : a string containing a JSON definition of the job
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_uploadJob(jobfile,jsonDef)
    {
        this._upload(jobfile, jsonDef);
        return YAPI_SUCCESS;
    }

    /**
     * Load and start processing the specified job file. The file must have
     * been previously created using the user interface or uploaded on the
     * device filesystem using the uploadJob() function.
     *
     * @param jobfile : name of the job file (on the device filesystem)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_selectJob(jobfile)
    {
        return this.set_currentJob(jobfile);
    }

    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_reset()
    {
        this._eventPos = 0;
        this._rxptr = 0;
        this._rxbuffptr = 0;
        this._rxbuff = new Uint8Array(0);

        return this.sendCommand("Z");
    }

    /**
     * Sends a single byte to the serial port.
     *
     * @param code : the byte to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_writeByte(code)
    {
        return this.sendCommand("$"+('00'+(code).toString(16)).slice(-2).toUpperCase());
    }

    /**
     * Sends an ASCII string to the serial port, as is.
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_writeStr(text)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var ch;                     // int;
        buff = text;
        bufflen = (buff).length;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = (buff).charCodeAt(idx);
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                } else {
                    ch = 0;
                }
            }
            if (idx >= bufflen) {
                return this.sendCommand("+"+text);
            }
        }
        // send string using file upload
        return this._upload("txdata", buff);
    }

    /**
     * Sends a binary buffer to the serial port, as is.
     *
     * @param buff : the binary buffer to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_writeBin(buff)
    {
        return this._upload("txdata", buff);
    }

    /**
     * Sends a byte sequence (provided as a list of bytes) to the serial port.
     *
     * @param byteList : a list of byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_writeArray(byteList)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var hexb;                   // int;
        var res;                    // int;
        bufflen = byteList.length;
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = byteList[idx];
            buff[idx] = hexb;
            idx = idx + 1;
        }

        res = this._upload("txdata", buff);
        return res;
    }

    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the serial port.
     *
     * @param hexString : a string of hexadecimal byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_writeHex(hexString)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var hexb;                   // int;
        var res;                    // int;
        bufflen = (hexString).length;
        if (bufflen < 100) {
            return this.sendCommand("$"+hexString);
        }
        bufflen = (bufflen >> 1);
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = parseInt(hexString.substr(2 * idx, 2), 16);
            buff[idx] = hexb;
            idx = idx + 1;
        }

        res = this._upload("txdata", buff);
        return res;
    }

    /**
     * Sends an ASCII string to the serial port, followed by a line break (CR LF).
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_writeLine(text)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var ch;                     // int;
        buff = ""+text+"\r\n";
        bufflen = (buff).length-2;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = (buff).charCodeAt(idx);
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                } else {
                    ch = 0;
                }
            }
            if (idx >= bufflen) {
                return this.sendCommand("!"+text);
            }
        }
        // send string using file upload
        return this._upload("txdata", buff);
    }

    /**
     * Reads one byte from the receive buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer,
     * or if there is no data available yet, the function returns YAPI_NO_MORE_DATA.
     *
     * @return the next byte
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_readByte()
    {
        var currpos;                // int;
        var reqlen;                 // int;
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var res;                    // int;
        // first check if we have the requested character in the look-ahead buffer
        bufflen = (this._rxbuff).length;
        if ((this._rxptr >= this._rxbuffptr) && (this._rxptr < this._rxbuffptr+bufflen)) {
            res = (this._rxbuff).charCodeAt(this._rxptr-this._rxbuffptr);
            this._rxptr = this._rxptr + 1;
            return res;
        }
        // try to preload more than one byte to speed-up byte-per-byte access
        currpos = this._rxptr;
        reqlen = 1024;
        buff = this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos+bufflen) {
            res = (buff).charCodeAt(0);
            this._rxptr = currpos+1;
            this._rxbuffptr = currpos;
            this._rxbuff = buff;
            return res;
        }
        // mixed bidirectional data, retry with a smaller block
        this._rxptr = currpos;
        reqlen = 16;
        buff = this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos+bufflen) {
            res = (buff).charCodeAt(0);
            this._rxptr = currpos+1;
            this._rxbuffptr = currpos;
            this._rxbuff = buff;
            return res;
        }
        // still mixed, need to process character by character
        this._rxptr = currpos;

        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len=1");
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).charCodeAt(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).charCodeAt(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        if (bufflen == 0) {
            return YAPI_NO_MORE_DATA;
        }
        res = (buff).charCodeAt(0);
        return res;
    }

    /**
     * Reads data from the receive buffer as a string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of characters to read
     *
     * @return a string with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_readStr(nChars)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var res;                    // str;
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).charCodeAt(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).charCodeAt(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = buff.substr(0, bufflen);
        return res;
    }

    /**
     * Reads data from the receive buffer as a binary buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of bytes to read
     *
     * @return a binary object with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_readBin(nChars)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var idx;                    // int;
        var res;                    // bin;
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).charCodeAt(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).charCodeAt(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            res[idx] = (buff).charCodeAt(idx);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a list of bytes, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of bytes to read
     *
     * @return a sequence of bytes with receive buffer contents
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSerialPort_readArray(nChars)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var idx;                    // int;
        var b;                      // int;
        var res = [];               // intArr;
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).charCodeAt(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).charCodeAt(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res.length = 0;
        idx = 0;
        while (idx < bufflen) {
            b = (buff).charCodeAt(idx);
            res.push(b);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a hexadecimal string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nBytes : the maximum number of bytes to read
     *
     * @return a string with receive buffer contents, encoded in hexadecimal
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_readHex(nBytes)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var ofs;                    // int;
        var res;                    // str;
        if (nBytes > 65535) {
            nBytes = 65535;
        }

        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nBytes)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).charCodeAt(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).charCodeAt(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = "";
        ofs = 0;
        while (ofs + 3 < bufflen) {
            res = ""+res+""+('00'+((buff).charCodeAt(ofs)).toString(16)).slice(-2).toUpperCase()+""+('00'+((buff).charCodeAt(ofs + 1)).toString(16)).slice(-2).toUpperCase()+""+('00'+((buff).charCodeAt(ofs + 2)).toString(16)).slice(-2).toUpperCase()+""+('00'+((buff).charCodeAt(ofs + 3)).toString(16)).slice(-2).toUpperCase();
            ofs = ofs + 4;
        }
        while (ofs < bufflen) {
            res = ""+res+""+('00'+((buff).charCodeAt(ofs)).toString(16)).slice(-2).toUpperCase();
            ofs = ofs + 1;
        }
        return res;
    }

    /**
     * Emits a BREAK condition on the serial interface. When the specified
     * duration is 0, the BREAK signal will be exactly one character wide.
     * When the duration is between 1 and 100, the BREAK condition will
     * be hold for the specified number of milliseconds.
     *
     * @param duration : 0 for a standard BREAK, or duration between 1 and 100 ms
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_sendBreak(duration)
    {
        return this.sendCommand("B"+String(Math.round(duration)));
    }

    /**
     * Manually sets the state of the RTS line. This function has no effect when
     * hardware handshake is enabled, as the RTS line is driven automatically.
     *
     * @param val : 1 to turn RTS on, 0 to turn RTS off
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_set_RTS(val)
    {
        return this.sendCommand("R"+String(Math.round(val)));
    }

    /**
     * Reads the level of the CTS line. The CTS line is usually driven by
     * the RTS signal of the connected serial device.
     *
     * @return 1 if the CTS line is high, 0 if the CTS line is low.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_get_CTS()
    {
        var buff;                   // bin;
        var res;                    // int;

        buff = this._download("cts.txt");
        if (!((buff).length == 1)) {
            return this._throw(YAPI_IO_ERROR,"invalid CTS reply",YAPI_IO_ERROR);
        }
        res = (buff).charCodeAt(0) - 48;
        return res;
    }

    /**
     * Retrieves messages (both direction) in the serial port buffer, starting at current position.
     * This function will only compare and return printable characters in the message strings.
     * Binary protocols are handled as hexadecimal strings.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     * @param maxMsg : the maximum number of messages to be returned by the function; up to 254.
     *
     * @return an array of YSnoopingRecord objects containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSerialPort_snoopMessagesEx(maxWait,maxMsg)
    {
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res = [];               // YSnoopingRecordArr;
        var idx;                    // int;

        url = "rxmsg.json?pos="+String(Math.round(this._rxptr))+"&maxw="+String(Math.round(maxWait))+"&t=0&len="+String(Math.round(maxMsg));
        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(new YSnoopingRecord(msgarr[idx]));
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Retrieves messages (both direction) in the serial port buffer, starting at current position.
     * This function will only compare and return printable characters in the message strings.
     * Binary protocols are handled as hexadecimal strings.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of YSnoopingRecord objects containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSerialPort_snoopMessages(maxWait)
    {
        return this.snoopMessagesEx(maxWait, 255);
    }

    /**
     * Registers a callback function to be called each time that a message is sent or
     * received by the serial port. The callback is invoked only during the execution of
     * ySleep or yHandleEvents. This provides control over the time when
     * the callback is triggered. For good responsiveness, remember to call one of these
     * two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer.
     *         The callback function should take four arguments:
     *         the YSerialPort object that emitted the event, and
     *         the YSnoopingRecord object that describes the message
     *         sent or received.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_registerSnoopingCallback(callback)
    {
        if (callback != null) {
            this.registerValueCallback(yInternalEventCallback);
        } else {
            this.registerValueCallback(null);
        }
        // register user callback AFTER the internal pseudo-event,
        // to make sure we start with future events only
        this._eventCallback = callback;
        return 0;
    }

    function YSerialPort_internalEventHandler(advstr)
    {
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var idx;                    // int;
        if (!(this._eventCallback != null)) {
            // first simulated event, use it only to initialize reference values
            this._eventPos = 0;
        }

        url = "rxmsg.json?pos="+String(Math.round(this._eventPos))+"&maxw=0&t=0";
        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return YAPI_SUCCESS;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        if (!(this._eventCallback != null)) {
            // first simulated event, use it only to initialize reference values
            this._eventPos = YAPI._atoi(msgarr[msglen]);
            return YAPI_SUCCESS;
        }
        this._eventPos = YAPI._atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            this._eventCallback(this, new YSnoopingRecord(msgarr[idx]));
            idx = idx + 1;
        }
        return YAPI_SUCCESS;
    }

    /**
     * Sends an ASCII string to the serial port, preceeded with an STX code and
     * followed by an ETX code.
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_writeStxEtx(text)
    {
        var buff;                   // bin;
        buff = ""+String.fromCharCode(2)+""+text+""+String.fromCharCode(3);
        // send string using file upload
        return this._upload("txdata", buff);
    }

    /**
     * Sends a MODBUS message (provided as a hexadecimal string) to the serial port.
     * The message must start with the slave address. The MODBUS CRC/LRC is
     * automatically added by the function. This function does not wait for a reply.
     *
     * @param hexString : a hexadecimal message string, including device address but no CRC/LRC
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSerialPort_writeMODBUS(hexString)
    {
        return this.sendCommand(":"+hexString);
    }

    /**
     * Sends a message to a specified MODBUS slave connected to the serial port, and reads the
     * reply, if any. The message is the PDU, provided as a vector of bytes.
     *
     * @param slaveNo : the address of the slave MODBUS device to query
     * @param pduBytes : the message to send (PDU), as a vector of bytes. The first byte of the
     *         PDU is the MODBUS function code.
     *
     * @return the received reply, as a vector of bytes.
     *
     * On failure, throws an exception or returns an empty array (or a MODBUS error reply).
     */
    function YSerialPort_queryMODBUS(slaveNo,pduBytes)
    {
        var funCode;                // int;
        var nib;                    // int;
        var i;                      // int;
        var cmd;                    // str;
        var prevpos;                // int;
        var url;                    // str;
        var pat;                    // str;
        var msgs;                   // bin;
        var reps = [];              // strArr;
        var rep;                    // str;
        var res = [];               // intArr;
        var replen;                 // int;
        var hexb;                   // int;
        funCode = pduBytes[0];
        nib = (funCode >> 4);
        pat = ""+('00'+(slaveNo).toString(16)).slice(-2).toUpperCase()+"["+(nib).toString(16).toUpperCase()+""+((nib+8)).toString(16).toUpperCase()+"]"+((funCode & 15)).toString(16).toUpperCase()+".*";
        cmd = ""+('00'+(slaveNo).toString(16)).slice(-2).toUpperCase()+""+('00'+(funCode).toString(16)).slice(-2).toUpperCase();
        i = 1;
        while (i < pduBytes.length) {
            cmd = ""+cmd+""+('00'+((pduBytes[i] & 0xff)).toString(16)).slice(-2).toUpperCase();
            i = i + 1;
        }
        if ((cmd).length <= 80) {
            // fast query
            url = "rxmsg.json?cmd=:"+cmd+"&pat=:"+pat;
        } else {
            // long query
            prevpos = this.end_tell();
            this._upload("txdata:", YAPI._hexStrToBin(cmd));
            url = "rxmsg.json?pos="+String(Math.round(prevpos))+"&maxw=2000&pat=:"+pat;
        }

        msgs = this._download(url);
        reps = this._json_get_array(msgs);
        if (!(reps.length > 1)) {
            return this._throw(YAPI_IO_ERROR,"no reply from MODBUS slave",res);
        }
        if (reps.length > 1) {
            rep = this._json_get_string(reps[0]);
            replen = (((rep).length - 3) >> 1);
            i = 0;
            while (i < replen) {
                hexb = parseInt(rep.substr(2 * i + 3, 2), 16);
                res.push(hexb);
                i = i + 1;
            }
            if (res[0] != funCode) {
                i = res[1];
                if (!(i > 1)) {
                    return this._throw(YAPI_NOT_SUPPORTED,"MODBUS error: unsupported function code",res);
                }
                if (!(i > 2)) {
                    return this._throw(YAPI_INVALID_ARGUMENT,"MODBUS error: illegal data address",res);
                }
                if (!(i > 3)) {
                    return this._throw(YAPI_INVALID_ARGUMENT,"MODBUS error: illegal data value",res);
                }
                if (!(i > 4)) {
                    return this._throw(YAPI_INVALID_ARGUMENT,"MODBUS error: failed to execute function",res);
                }
            }
        }
        return res;
    }

    /**
     * Reads one or more contiguous internal bits (or coil status) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x01 (Read Coils).
     *
     * @param slaveNo : the address of the slave MODBUS device to query
     * @param pduAddr : the relative address of the first bit/coil to read (zero-based)
     * @param nBits : the number of bits/coils to read
     *
     * @return a vector of integers, each corresponding to one bit.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSerialPort_modbusReadBits(slaveNo,pduAddr,nBits)
    {
        var pdu = [];               // intArr;
        var reply = [];             // intArr;
        var res = [];               // intArr;
        var bitpos;                 // int;
        var idx;                    // int;
        var val;                    // int;
        var mask;                   // int;
        pdu.push(0x01);
        pdu.push((pduAddr >> 8));
        pdu.push((pduAddr & 0xff));
        pdu.push((nBits >> 8));
        pdu.push((nBits & 0xff));

        reply = this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        bitpos = 0;
        idx = 2;
        val = reply[idx];
        mask = 1;
        while (bitpos < nBits) {
            if ((val & mask) == 0) {
                res.push(0);
            } else {
                res.push(1);
            }
            bitpos = bitpos + 1;
            if (mask == 0x80) {
                idx = idx + 1;
                val = reply[idx];
                mask = 1;
            } else {
                mask = (mask << 1);
            }
        }
        return res;
    }

    /**
     * Reads one or more contiguous input bits (or discrete inputs) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x02 (Read Discrete Inputs).
     *
     * @param slaveNo : the address of the slave MODBUS device to query
     * @param pduAddr : the relative address of the first bit/input to read (zero-based)
     * @param nBits : the number of bits/inputs to read
     *
     * @return a vector of integers, each corresponding to one bit.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSerialPort_modbusReadInputBits(slaveNo,pduAddr,nBits)
    {
        var pdu = [];               // intArr;
        var reply = [];             // intArr;
        var res = [];               // intArr;
        var bitpos;                 // int;
        var idx;                    // int;
        var val;                    // int;
        var mask;                   // int;
        pdu.push(0x02);
        pdu.push((pduAddr >> 8));
        pdu.push((pduAddr & 0xff));
        pdu.push((nBits >> 8));
        pdu.push((nBits & 0xff));

        reply = this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        bitpos = 0;
        idx = 2;
        val = reply[idx];
        mask = 1;
        while (bitpos < nBits) {
            if ((val & mask) == 0) {
                res.push(0);
            } else {
                res.push(1);
            }
            bitpos = bitpos + 1;
            if (mask == 0x80) {
                idx = idx + 1;
                val = reply[idx];
                mask = 1;
            } else {
                mask = (mask << 1);
            }
        }
        return res;
    }

    /**
     * Reads one or more contiguous internal registers (holding registers) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x03 (Read Holding Registers).
     *
     * @param slaveNo : the address of the slave MODBUS device to query
     * @param pduAddr : the relative address of the first holding register to read (zero-based)
     * @param nWords : the number of holding registers to read
     *
     * @return a vector of integers, each corresponding to one 16-bit register value.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSerialPort_modbusReadRegisters(slaveNo,pduAddr,nWords)
    {
        var pdu = [];               // intArr;
        var reply = [];             // intArr;
        var res = [];               // intArr;
        var regpos;                 // int;
        var idx;                    // int;
        var val;                    // int;
        if (!(nWords<=256)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Cannot read more than 256 words",res);
        }
        pdu.push(0x03);
        pdu.push((pduAddr >> 8));
        pdu.push((pduAddr & 0xff));
        pdu.push((nWords >> 8));
        pdu.push((nWords & 0xff));

        reply = this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        regpos = 0;
        idx = 2;
        while (regpos < nWords) {
            val = (reply[idx] << 8);
            idx = idx + 1;
            val = val + reply[idx];
            idx = idx + 1;
            res.push(val);
            regpos = regpos + 1;
        }
        return res;
    }

    /**
     * Reads one or more contiguous input registers (read-only registers) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x04 (Read Input Registers).
     *
     * @param slaveNo : the address of the slave MODBUS device to query
     * @param pduAddr : the relative address of the first input register to read (zero-based)
     * @param nWords : the number of input registers to read
     *
     * @return a vector of integers, each corresponding to one 16-bit input value.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSerialPort_modbusReadInputRegisters(slaveNo,pduAddr,nWords)
    {
        var pdu = [];               // intArr;
        var reply = [];             // intArr;
        var res = [];               // intArr;
        var regpos;                 // int;
        var idx;                    // int;
        var val;                    // int;
        pdu.push(0x04);
        pdu.push((pduAddr >> 8));
        pdu.push((pduAddr & 0xff));
        pdu.push((nWords >> 8));
        pdu.push((nWords & 0xff));

        reply = this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        regpos = 0;
        idx = 2;
        while (regpos < nWords) {
            val = (reply[idx] << 8);
            idx = idx + 1;
            val = val + reply[idx];
            idx = idx + 1;
            res.push(val);
            regpos = regpos + 1;
        }
        return res;
    }

    /**
     * Sets a single internal bit (or coil) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x05 (Write Single Coil).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the bit/coil to set (zero-based)
     * @param value : the value to set (0 for OFF state, non-zero for ON state)
     *
     * @return the number of bits/coils affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    function YSerialPort_modbusWriteBit(slaveNo,pduAddr,value)
    {
        var pdu = [];               // intArr;
        var reply = [];             // intArr;
        var res;                    // int;
        res = 0;
        if (value != 0) {
            value = 0xff;
        }
        pdu.push(0x05);
        pdu.push((pduAddr >> 8));
        pdu.push((pduAddr & 0xff));
        pdu.push(value);
        pdu.push(0x00);

        reply = this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = 1;
        return res;
    }

    /**
     * Sets several contiguous internal bits (or coils) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x0f (Write Multiple Coils).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the first bit/coil to set (zero-based)
     * @param bits : the vector of bits to be set (one integer per bit)
     *
     * @return the number of bits/coils affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    function YSerialPort_modbusWriteBits(slaveNo,pduAddr,bits)
    {
        var nBits;                  // int;
        var nBytes;                 // int;
        var bitpos;                 // int;
        var val;                    // int;
        var mask;                   // int;
        var pdu = [];               // intArr;
        var reply = [];             // intArr;
        var res;                    // int;
        res = 0;
        nBits = bits.length;
        nBytes = ((nBits + 7) >> 3);
        pdu.push(0x0f);
        pdu.push((pduAddr >> 8));
        pdu.push((pduAddr & 0xff));
        pdu.push((nBits >> 8));
        pdu.push((nBits & 0xff));
        pdu.push(nBytes);
        bitpos = 0;
        val = 0;
        mask = 1;
        while (bitpos < nBits) {
            if (bits[bitpos] != 0) {
                val = (val | mask);
            }
            bitpos = bitpos + 1;
            if (mask == 0x80) {
                pdu.push(val);
                val = 0;
                mask = 1;
            } else {
                mask = (mask << 1);
            }
        }
        if (mask != 1) {
            pdu.push(val);
        }

        reply = this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = (reply[3] << 8);
        res = res + reply[4];
        return res;
    }

    /**
     * Sets a single internal register (or holding register) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x06 (Write Single Register).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the register to set (zero-based)
     * @param value : the 16 bit value to set
     *
     * @return the number of registers affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    function YSerialPort_modbusWriteRegister(slaveNo,pduAddr,value)
    {
        var pdu = [];               // intArr;
        var reply = [];             // intArr;
        var res;                    // int;
        res = 0;
        pdu.push(0x06);
        pdu.push((pduAddr >> 8));
        pdu.push((pduAddr & 0xff));
        pdu.push((value >> 8));
        pdu.push((value & 0xff));

        reply = this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = 1;
        return res;
    }

    /**
     * Sets several contiguous internal registers (or holding registers) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x10 (Write Multiple Registers).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the first internal register to set (zero-based)
     * @param values : the vector of 16 bit values to set
     *
     * @return the number of registers affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    function YSerialPort_modbusWriteRegisters(slaveNo,pduAddr,values)
    {
        var nWords;                 // int;
        var nBytes;                 // int;
        var regpos;                 // int;
        var val;                    // int;
        var pdu = [];               // intArr;
        var reply = [];             // intArr;
        var res;                    // int;
        res = 0;
        nWords = values.length;
        nBytes = 2 * nWords;
        pdu.push(0x10);
        pdu.push((pduAddr >> 8));
        pdu.push((pduAddr & 0xff));
        pdu.push((nWords >> 8));
        pdu.push((nWords & 0xff));
        pdu.push(nBytes);
        regpos = 0;
        while (regpos < nWords) {
            val = values[regpos];
            pdu.push((val >> 8));
            pdu.push((val & 0xff));
            regpos = regpos + 1;
        }

        reply = this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        res = (reply[3] << 8);
        res = res + reply[4];
        return res;
    }

    /**
     * Sets several contiguous internal registers (holding registers) on a MODBUS serial device,
     * then performs a contiguous read of a set of (possibly different) internal registers.
     * This method uses the MODBUS function code 0x17 (Read/Write Multiple Registers).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduWriteAddr : the relative address of the first internal register to set (zero-based)
     * @param values : the vector of 16 bit values to set
     * @param pduReadAddr : the relative address of the first internal register to read (zero-based)
     * @param nReadWords : the number of 16 bit values to read
     *
     * @return a vector of integers, each corresponding to one 16-bit register value read.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSerialPort_modbusWriteAndReadRegisters(slaveNo,pduWriteAddr,values,pduReadAddr,nReadWords)
    {
        var nWriteWords;            // int;
        var nBytes;                 // int;
        var regpos;                 // int;
        var val;                    // int;
        var idx;                    // int;
        var pdu = [];               // intArr;
        var reply = [];             // intArr;
        var res = [];               // intArr;
        nWriteWords = values.length;
        nBytes = 2 * nWriteWords;
        pdu.push(0x17);
        pdu.push((pduReadAddr >> 8));
        pdu.push((pduReadAddr & 0xff));
        pdu.push((nReadWords >> 8));
        pdu.push((nReadWords & 0xff));
        pdu.push((pduWriteAddr >> 8));
        pdu.push((pduWriteAddr & 0xff));
        pdu.push((nWriteWords >> 8));
        pdu.push((nWriteWords & 0xff));
        pdu.push(nBytes);
        regpos = 0;
        while (regpos < nWriteWords) {
            val = values[regpos];
            pdu.push((val >> 8));
            pdu.push((val & 0xff));
            regpos = regpos + 1;
        }

        reply = this.queryMODBUS(slaveNo, pdu);
        if (reply.length == 0) {
            return res;
        }
        if (reply[0] != pdu[0]) {
            return res;
        }
        regpos = 0;
        idx = 2;
        while (regpos < nReadWords) {
            val = (reply[idx] << 8);
            idx = idx + 1;
            val = val + reply[idx];
            idx = idx + 1;
            res.push(val);
            regpos = regpos + 1;
        }
        return res;
    }

    /**
     * Continues the enumeration of serial ports started using yFirstSerialPort().
     * Caution: You can't make any assumption about the returned serial ports order.
     * If you want to find a specific a serial port, use SerialPort.findSerialPort()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSerialPort object, corresponding to
     *         a serial port currently online, or a null pointer
     *         if there are no more serial ports to enumerate.
     */
    function YSerialPort_nextSerialPort()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSerialPort.FindSerialPort(next_hwid);
    }

    /**
     * Starts the enumeration of serial ports currently accessible.
     * Use the method YSerialPort.nextSerialPort() to iterate on
     * next serial ports.
     *
     * @return a pointer to a YSerialPort object, corresponding to
     *         the first serial port currently online, or a null pointer
     *         if there are none.
     */
    function YSerialPort_FirstSerialPort()
    {
        var next_hwid = YAPI.getFirstHardwareId('SerialPort');
        if(next_hwid == null) return null;
        return YSerialPort.FindSerialPort(next_hwid);
    }

    //--- (end of generated code: YSerialPort implementation)

    //--- (generated code: YSerialPort initialization)
    YSerialPort = YFunction._Subclass(_YSerialPort, {
        // Constants
        RXCOUNT_INVALID             : YAPI_INVALID_UINT,
        TXCOUNT_INVALID             : YAPI_INVALID_UINT,
        ERRCOUNT_INVALID            : YAPI_INVALID_UINT,
        RXMSGCOUNT_INVALID          : YAPI_INVALID_UINT,
        TXMSGCOUNT_INVALID          : YAPI_INVALID_UINT,
        LASTMSG_INVALID             : YAPI_INVALID_STRING,
        CURRENTJOB_INVALID          : YAPI_INVALID_STRING,
        STARTUPJOB_INVALID          : YAPI_INVALID_STRING,
        JOBMAXTASK_INVALID          : YAPI_INVALID_UINT,
        JOBMAXSIZE_INVALID          : YAPI_INVALID_UINT,
        COMMAND_INVALID             : YAPI_INVALID_STRING,
        PROTOCOL_INVALID            : YAPI_INVALID_STRING,
        VOLTAGELEVEL_OFF            : 0,
        VOLTAGELEVEL_TTL3V          : 1,
        VOLTAGELEVEL_TTL3VR         : 2,
        VOLTAGELEVEL_TTL5V          : 3,
        VOLTAGELEVEL_TTL5VR         : 4,
        VOLTAGELEVEL_RS232          : 5,
        VOLTAGELEVEL_RS485          : 6,
        VOLTAGELEVEL_TTL1V8         : 7,
        VOLTAGELEVEL_SDI12          : 8,
        VOLTAGELEVEL_INVALID        : -1,
        SERIALMODE_INVALID          : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindSerialPort              : YSerialPort_FindSerialPort,
        FirstSerialPort             : YSerialPort_FirstSerialPort
    }, {
        // Methods
        get_rxCount                 : YSerialPort_get_rxCount,
        rxCount                     : YSerialPort_get_rxCount,
        get_rxCount_async           : YSerialPort_get_rxCount_async,
        rxCount_async               : YSerialPort_get_rxCount_async,
        get_txCount                 : YSerialPort_get_txCount,
        txCount                     : YSerialPort_get_txCount,
        get_txCount_async           : YSerialPort_get_txCount_async,
        txCount_async               : YSerialPort_get_txCount_async,
        get_errCount                : YSerialPort_get_errCount,
        errCount                    : YSerialPort_get_errCount,
        get_errCount_async          : YSerialPort_get_errCount_async,
        errCount_async              : YSerialPort_get_errCount_async,
        get_rxMsgCount              : YSerialPort_get_rxMsgCount,
        rxMsgCount                  : YSerialPort_get_rxMsgCount,
        get_rxMsgCount_async        : YSerialPort_get_rxMsgCount_async,
        rxMsgCount_async            : YSerialPort_get_rxMsgCount_async,
        get_txMsgCount              : YSerialPort_get_txMsgCount,
        txMsgCount                  : YSerialPort_get_txMsgCount,
        get_txMsgCount_async        : YSerialPort_get_txMsgCount_async,
        txMsgCount_async            : YSerialPort_get_txMsgCount_async,
        get_lastMsg                 : YSerialPort_get_lastMsg,
        lastMsg                     : YSerialPort_get_lastMsg,
        get_lastMsg_async           : YSerialPort_get_lastMsg_async,
        lastMsg_async               : YSerialPort_get_lastMsg_async,
        get_currentJob              : YSerialPort_get_currentJob,
        currentJob                  : YSerialPort_get_currentJob,
        get_currentJob_async        : YSerialPort_get_currentJob_async,
        currentJob_async            : YSerialPort_get_currentJob_async,
        set_currentJob              : YSerialPort_set_currentJob,
        setCurrentJob               : YSerialPort_set_currentJob,
        get_startupJob              : YSerialPort_get_startupJob,
        startupJob                  : YSerialPort_get_startupJob,
        get_startupJob_async        : YSerialPort_get_startupJob_async,
        startupJob_async            : YSerialPort_get_startupJob_async,
        set_startupJob              : YSerialPort_set_startupJob,
        setStartupJob               : YSerialPort_set_startupJob,
        get_jobMaxTask              : YSerialPort_get_jobMaxTask,
        jobMaxTask                  : YSerialPort_get_jobMaxTask,
        get_jobMaxTask_async        : YSerialPort_get_jobMaxTask_async,
        jobMaxTask_async            : YSerialPort_get_jobMaxTask_async,
        get_jobMaxSize              : YSerialPort_get_jobMaxSize,
        jobMaxSize                  : YSerialPort_get_jobMaxSize,
        get_jobMaxSize_async        : YSerialPort_get_jobMaxSize_async,
        jobMaxSize_async            : YSerialPort_get_jobMaxSize_async,
        get_command                 : YSerialPort_get_command,
        command                     : YSerialPort_get_command,
        get_command_async           : YSerialPort_get_command_async,
        command_async               : YSerialPort_get_command_async,
        set_command                 : YSerialPort_set_command,
        setCommand                  : YSerialPort_set_command,
        get_protocol                : YSerialPort_get_protocol,
        protocol                    : YSerialPort_get_protocol,
        get_protocol_async          : YSerialPort_get_protocol_async,
        protocol_async              : YSerialPort_get_protocol_async,
        set_protocol                : YSerialPort_set_protocol,
        setProtocol                 : YSerialPort_set_protocol,
        get_voltageLevel            : YSerialPort_get_voltageLevel,
        voltageLevel                : YSerialPort_get_voltageLevel,
        get_voltageLevel_async      : YSerialPort_get_voltageLevel_async,
        voltageLevel_async          : YSerialPort_get_voltageLevel_async,
        set_voltageLevel            : YSerialPort_set_voltageLevel,
        setVoltageLevel             : YSerialPort_set_voltageLevel,
        get_serialMode              : YSerialPort_get_serialMode,
        serialMode                  : YSerialPort_get_serialMode,
        get_serialMode_async        : YSerialPort_get_serialMode_async,
        serialMode_async            : YSerialPort_get_serialMode_async,
        set_serialMode              : YSerialPort_set_serialMode,
        setSerialMode               : YSerialPort_set_serialMode,
        sendCommand                 : YSerialPort_sendCommand,
        readLine                    : YSerialPort_readLine,
        readMessages                : YSerialPort_readMessages,
        read_seek                   : YSerialPort_read_seek,
        read_tell                   : YSerialPort_read_tell,
        read_avail                  : YSerialPort_read_avail,
        end_tell                    : YSerialPort_end_tell,
        queryLine                   : YSerialPort_queryLine,
        queryHex                    : YSerialPort_queryHex,
        uploadJob                   : YSerialPort_uploadJob,
        selectJob                   : YSerialPort_selectJob,
        reset                       : YSerialPort_reset,
        writeByte                   : YSerialPort_writeByte,
        writeStr                    : YSerialPort_writeStr,
        writeBin                    : YSerialPort_writeBin,
        writeArray                  : YSerialPort_writeArray,
        writeHex                    : YSerialPort_writeHex,
        writeLine                   : YSerialPort_writeLine,
        readByte                    : YSerialPort_readByte,
        readStr                     : YSerialPort_readStr,
        readBin                     : YSerialPort_readBin,
        readArray                   : YSerialPort_readArray,
        readHex                     : YSerialPort_readHex,
        sendBreak                   : YSerialPort_sendBreak,
        set_RTS                     : YSerialPort_set_RTS,
        setRTS                      : YSerialPort_set_RTS,
        get_CTS                     : YSerialPort_get_CTS,
        CTS                         : YSerialPort_get_CTS,
        snoopMessagesEx             : YSerialPort_snoopMessagesEx,
        snoopMessages               : YSerialPort_snoopMessages,
        registerSnoopingCallback    : YSerialPort_registerSnoopingCallback,
        _internalEventHandler       : YSerialPort_internalEventHandler,
        writeStxEtx                 : YSerialPort_writeStxEtx,
        writeMODBUS                 : YSerialPort_writeMODBUS,
        queryMODBUS                 : YSerialPort_queryMODBUS,
        modbusReadBits              : YSerialPort_modbusReadBits,
        modbusReadInputBits         : YSerialPort_modbusReadInputBits,
        modbusReadRegisters         : YSerialPort_modbusReadRegisters,
        modbusReadInputRegisters    : YSerialPort_modbusReadInputRegisters,
        modbusWriteBit              : YSerialPort_modbusWriteBit,
        modbusWriteBits             : YSerialPort_modbusWriteBits,
        modbusWriteRegister         : YSerialPort_modbusWriteRegister,
        modbusWriteRegisters        : YSerialPort_modbusWriteRegisters,
        modbusWriteAndReadRegisters : YSerialPort_modbusWriteAndReadRegisters,
        nextSerialPort              : YSerialPort_nextSerialPort,
        _parseAttr                  : YSerialPort_parseAttr
    });
    //--- (end of generated code: YSerialPort initialization)
})();

//--- (generated code: YSerialPort functions)

/**
 * Retrieves a serial port for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the serial port is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSerialPort.isOnline() to test if the serial port is
 * indeed online at a given time. In case of ambiguity when looking for
 * a serial port by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the serial port, for instance
 *         RS232MK1.serialPort.
 *
 * @return a YSerialPort object allowing you to drive the serial port.
 */
function yFindSerialPort(func)
{
    return YSerialPort.FindSerialPort(func);
}

/**
 * Starts the enumeration of serial ports currently accessible.
 * Use the method YSerialPort.nextSerialPort() to iterate on
 * next serial ports.
 *
 * @return a pointer to a YSerialPort object, corresponding to
 *         the first serial port currently online, or a null pointer
 *         if there are none.
 */
function yFirstSerialPort()
{
    return YSerialPort.FirstSerialPort();
}

//--- (end of generated code: YSerialPort functions)
