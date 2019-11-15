/*********************************************************************
 *
 *  $Id: yocto_i2cport.js 37827 2019-10-25 13:07:48Z mvuilleu $
 *
 *  Implements the high-level API for I2cPort functions
 *
 *  - - - - - - - - - License information: - - - - - - - - -
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

//--- (YI2cPort return codes)
//--- (end of YI2cPort return codes)
//--- (YI2cPort definitions)
var Y_I2CVOLTAGELEVEL_OFF           = 0;
var Y_I2CVOLTAGELEVEL_3V3           = 1;
var Y_I2CVOLTAGELEVEL_1V8           = 2;
var Y_I2CVOLTAGELEVEL_INVALID       = -1;
var Y_RXCOUNT_INVALID               = YAPI_INVALID_UINT;
var Y_TXCOUNT_INVALID               = YAPI_INVALID_UINT;
var Y_ERRCOUNT_INVALID              = YAPI_INVALID_UINT;
var Y_RXMSGCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_TXMSGCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_LASTMSG_INVALID               = YAPI_INVALID_STRING;
var Y_CURRENTJOB_INVALID            = YAPI_INVALID_STRING;
var Y_STARTUPJOB_INVALID            = YAPI_INVALID_STRING;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
var Y_PROTOCOL_INVALID              = YAPI_INVALID_STRING;
var Y_I2CMODE_INVALID               = YAPI_INVALID_STRING;
//--- (end of YI2cPort definitions)

//--- (YI2cPort class start)
/**
 * YI2cPort Class: I2C Port function interface
 *
 * The YI2cPort classe allows you to fully drive a Yoctopuce I2C port, for instance using a Yocto-I2C.
 * It can be used to send and receive data, and to configure communication
 * parameters (baud rate, etc).
 * Note that Yoctopuce I2C ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of YI2cPort class start)

var YI2cPort; // definition below
(function()
{
    function _YI2cPort(str_func)
    {
        //--- (YI2cPort constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'I2cPort';

        this._rxCount                        = Y_RXCOUNT_INVALID;          // UInt31
        this._txCount                        = Y_TXCOUNT_INVALID;          // UInt31
        this._errCount                       = Y_ERRCOUNT_INVALID;         // UInt31
        this._rxMsgCount                     = Y_RXMSGCOUNT_INVALID;       // UInt31
        this._txMsgCount                     = Y_TXMSGCOUNT_INVALID;       // UInt31
        this._lastMsg                        = Y_LASTMSG_INVALID;          // Text
        this._currentJob                     = Y_CURRENTJOB_INVALID;       // Text
        this._startupJob                     = Y_STARTUPJOB_INVALID;       // Text
        this._command                        = Y_COMMAND_INVALID;          // Text
        this._protocol                       = Y_PROTOCOL_INVALID;         // Protocol
        this._i2cVoltageLevel                = Y_I2CVOLTAGELEVEL_INVALID;  // I2cVoltageLevel
        this._i2cMode                        = Y_I2CMODE_INVALID;          // I2cMode
        this._rxptr                          = 0;                          // int
        this._rxbuff                         = "";                         // bin
        this._rxbuffptr                      = 0;                          // int
        //--- (end of YI2cPort constructor)
    }

    //--- (YI2cPort implementation)

    function YI2cPort_parseAttr(name, val, _super)
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
        case "command":
            this._command = val;
            return 1;
        case "protocol":
            this._protocol = val;
            return 1;
        case "i2cVoltageLevel":
            this._i2cVoltageLevel = parseInt(val);
            return 1;
        case "i2cMode":
            this._i2cMode = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns Y_RXCOUNT_INVALID.
     */
    function YI2cPort_get_rxCount()
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
     *         - the YI2cPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of bytes received since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_RXCOUNT_INVALID.
     */
    function YI2cPort_get_rxCount_async(callback,context)
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
     * On failure, throws an exception or returns Y_TXCOUNT_INVALID.
     */
    function YI2cPort_get_txCount()
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
     *         - the YI2cPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of bytes transmitted since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_TXCOUNT_INVALID.
     */
    function YI2cPort_get_txCount_async(callback,context)
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
     * On failure, throws an exception or returns Y_ERRCOUNT_INVALID.
     */
    function YI2cPort_get_errCount()
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
     *         - the YI2cPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of communication errors detected since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_ERRCOUNT_INVALID.
     */
    function YI2cPort_get_errCount_async(callback,context)
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
     * On failure, throws an exception or returns Y_RXMSGCOUNT_INVALID.
     */
    function YI2cPort_get_rxMsgCount()
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
     *         - the YI2cPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of messages received since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_RXMSGCOUNT_INVALID.
     */
    function YI2cPort_get_rxMsgCount_async(callback,context)
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
     * On failure, throws an exception or returns Y_TXMSGCOUNT_INVALID.
     */
    function YI2cPort_get_txMsgCount()
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
     *         - the YI2cPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of messages send since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_TXMSGCOUNT_INVALID.
     */
    function YI2cPort_get_txMsgCount_async(callback,context)
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
     * Returns the latest message fully received (for Line and Frame protocols).
     *
     * @return a string corresponding to the latest message fully received (for Line and Frame protocols)
     *
     * On failure, throws an exception or returns Y_LASTMSG_INVALID.
     */
    function YI2cPort_get_lastMsg()
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
     * Gets the latest message fully received (for Line and Frame protocols).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YI2cPort object that invoked the callback
     *         - the result:a string corresponding to the latest message fully received (for Line and Frame protocols)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_LASTMSG_INVALID.
     */
    function YI2cPort_get_lastMsg_async(callback,context)
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
     * On failure, throws an exception or returns Y_CURRENTJOB_INVALID.
     */
    function YI2cPort_get_currentJob()
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
     *         - the YI2cPort object that invoked the callback
     *         - the result:a string corresponding to the name of the job file currently in use
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CURRENTJOB_INVALID.
     */
    function YI2cPort_get_currentJob_async(callback,context)
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_set_currentJob(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('currentJob',rest_val);
    }

    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns Y_STARTUPJOB_INVALID.
     */
    function YI2cPort_get_startupJob()
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
     *         - the YI2cPort object that invoked the callback
     *         - the result:a string corresponding to the job file to use when the device is powered on
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_STARTUPJOB_INVALID.
     */
    function YI2cPort_get_startupJob_async(callback,context)
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_set_startupJob(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('startupJob',rest_val);
    }

    function YI2cPort_get_command()
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
     *         - the YI2cPort object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YI2cPort_get_command_async(callback,context)
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

    function YI2cPort_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Returns the type of protocol used to send I2C messages, as a string.
     * Possible values are
     * "Line" for messages separated by LF or
     * "Char" for continuous stream of codes.
     *
     * @return a string corresponding to the type of protocol used to send I2C messages, as a string
     *
     * On failure, throws an exception or returns Y_PROTOCOL_INVALID.
     */
    function YI2cPort_get_protocol()
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
     * Gets the type of protocol used to send I2C messages, as a string.
     * Possible values are
     * "Line" for messages separated by LF or
     * "Char" for continuous stream of codes.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YI2cPort object that invoked the callback
     *         - the result:a string corresponding to the type of protocol used to send I2C messages, as a string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PROTOCOL_INVALID.
     */
    function YI2cPort_get_protocol_async(callback,context)
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
     * Changes the type of protocol used to send I2C messages.
     * Possible values are
     * "Line" for messages separated by LF or
     * "Char" for continuous stream of codes.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each message sent.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the type of protocol used to send I2C messages
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_set_protocol(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('protocol',rest_val);
    }

    /**
     * Returns the voltage level used on the I2C bus.
     *
     * @return a value among Y_I2CVOLTAGELEVEL_OFF, Y_I2CVOLTAGELEVEL_3V3 and Y_I2CVOLTAGELEVEL_1V8
     * corresponding to the voltage level used on the I2C bus
     *
     * On failure, throws an exception or returns Y_I2CVOLTAGELEVEL_INVALID.
     */
    function YI2cPort_get_i2cVoltageLevel()
    {
        var res;                    // enumI2CVOLTAGELEVEL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_I2CVOLTAGELEVEL_INVALID;
            }
        }
        res = this._i2cVoltageLevel;
        return res;
    }

    /**
     * Gets the voltage level used on the I2C bus.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YI2cPort object that invoked the callback
     *         - the result:a value among Y_I2CVOLTAGELEVEL_OFF, Y_I2CVOLTAGELEVEL_3V3 and Y_I2CVOLTAGELEVEL_1V8
     *         corresponding to the voltage level used on the I2C bus
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_I2CVOLTAGELEVEL_INVALID.
     */
    function YI2cPort_get_i2cVoltageLevel_async(callback,context)
    {
        var res;                    // enumI2CVOLTAGELEVEL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_I2CVOLTAGELEVEL_INVALID);
            } else {
                callback(context, obj, obj._i2cVoltageLevel);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the voltage level used on the I2C bus.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among Y_I2CVOLTAGELEVEL_OFF, Y_I2CVOLTAGELEVEL_3V3 and
     * Y_I2CVOLTAGELEVEL_1V8 corresponding to the voltage level used on the I2C bus
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_set_i2cVoltageLevel(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('i2cVoltageLevel',rest_val);
    }

    /**
     * Returns the SPI port communication parameters, as a string such as
     * "400kbps,2000ms,NoRestart". The string includes the baud rate, the
     * recovery delay after communications errors, and if needed the option
     * NoRestart to use a Stop/Start sequence instead of the
     * Restart state when performing read on the I2C bus.
     *
     * @return a string corresponding to the SPI port communication parameters, as a string such as
     *         "400kbps,2000ms,NoRestart"
     *
     * On failure, throws an exception or returns Y_I2CMODE_INVALID.
     */
    function YI2cPort_get_i2cMode()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_I2CMODE_INVALID;
            }
        }
        res = this._i2cMode;
        return res;
    }

    /**
     * Gets the SPI port communication parameters, as a string such as
     * "400kbps,2000ms,NoRestart". The string includes the baud rate, the
     * recovery delay after communications errors, and if needed the option
     * NoRestart to use a Stop/Start sequence instead of the
     * Restart state when performing read on the I2C bus.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YI2cPort object that invoked the callback
     *         - the result:a string corresponding to the SPI port communication parameters, as a string such as
     *         "400kbps,2000ms,NoRestart"
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_I2CMODE_INVALID.
     */
    function YI2cPort_get_i2cMode_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_I2CMODE_INVALID);
            } else {
                callback(context, obj, obj._i2cMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the SPI port communication parameters, with a string such as
     * "400kbps,2000ms". The string includes the baud rate, the
     * recovery delay after communications errors, and if needed the option
     * NoRestart to use a Stop/Start sequence instead of the
     * Restart state when performing read on the I2C bus.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the SPI port communication parameters, with a string such as
     *         "400kbps,2000ms"
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_set_i2cMode(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('i2cMode',rest_val);
    }

    /**
     * Retrieves an I2C port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the I2C port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YI2cPort.isOnline() to test if the I2C port is
     * indeed online at a given time. In case of ambiguity when looking for
     * an I2C port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the I2C port, for instance
     *         YI2CMK01.i2cPort.
     *
     * @return a YI2cPort object allowing you to drive the I2C port.
     */
    function YI2cPort_FindI2cPort(func)                         // class method
    {
        var obj;                    // YI2cPort;
        obj = YFunction._FindFromCache("I2cPort", func);
        if (obj == null) {
            obj = new YI2cPort(func);
            YFunction._AddToCache("I2cPort", func, obj);
        }
        return obj;
    }

    function YI2cPort_sendCommand(text)
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
    function YI2cPort_readLine()
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
    function YI2cPort_readMessages(pattern,maxWait)
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
    function YI2cPort_read_seek(absPos)
    {
        this._rxptr = absPos;
        return YAPI_SUCCESS;
    }

    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return the absolute position index for next read operations.
     */
    function YI2cPort_read_tell()
    {
        return this._rxptr;
    }

    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return the number of bytes available to read
     */
    function YI2cPort_read_avail()
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var res;                    // int;

        buff = this._download("rxcnt.bin?pos="+String(Math.round(this._rxptr)));
        bufflen = (buff).length - 1;
        while ((bufflen > 0) && ((buff).charCodeAt(bufflen) != 64)) {
            bufflen = bufflen - 1;
        }
        res = YAPI._atoi((buff).substr( 0, bufflen));
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
    function YI2cPort_queryLine(query,maxWait)
    {
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res;                    // str;

        url = "rxmsg.json?len=1&maxw="+String(Math.round(maxWait))+"&cmd=!"+this._escapeAttr(query);
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_uploadJob(jobfile,jsonDef)
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_selectJob(jobfile)
    {
        return this.set_currentJob(jobfile);
    }

    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_reset()
    {
        this._rxptr = 0;
        this._rxbuffptr = 0;
        this._rxbuff = new Uint8Array(0);

        return this.sendCommand("Z");
    }

    /**
     * Sends a one-way message (provided as a a binary buffer) to a device on the I2C bus.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param buff : the binary buffer to be sent
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_i2cSendBin(slaveAddr,buff)
    {
        var nBytes;                 // int;
        var idx;                    // int;
        var val;                    // int;
        var msg;                    // str;
        var reply;                  // str;
        msg = "@"+('00'+(slaveAddr).toString(16)).slice(-2).toLowerCase()+":";
        nBytes = (buff).length;
        idx = 0;
        while (idx < nBytes) {
            val = (buff).charCodeAt(idx);
            msg = ""+msg+""+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }

        reply = this.queryLine(msg,1000);
        if (!((reply).length > 0)) {
            return this._throw(YAPI_IO_ERROR,"No response from I2C device",YAPI_IO_ERROR);
        }
        idx = (reply).indexOf("[N]!");
        if (!(idx < 0)) {
            return this._throw(YAPI_IO_ERROR,"No I2C ACK received",YAPI_IO_ERROR);
        }
        idx = (reply).indexOf("!");
        if (!(idx < 0)) {
            return this._throw(YAPI_IO_ERROR,"I2C protocol error",YAPI_IO_ERROR);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Sends a one-way message (provided as a list of integer) to a device on the I2C bus.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param values : a list of data bytes to be sent
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_i2cSendArray(slaveAddr,values)
    {
        var nBytes;                 // int;
        var idx;                    // int;
        var val;                    // int;
        var msg;                    // str;
        var reply;                  // str;
        msg = "@"+('00'+(slaveAddr).toString(16)).slice(-2).toLowerCase()+":";
        nBytes = values.length;
        idx = 0;
        while (idx < nBytes) {
            val = values[idx];
            msg = ""+msg+""+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }

        reply = this.queryLine(msg,1000);
        if (!((reply).length > 0)) {
            return this._throw(YAPI_IO_ERROR,"No response from I2C device",YAPI_IO_ERROR);
        }
        idx = (reply).indexOf("[N]!");
        if (!(idx < 0)) {
            return this._throw(YAPI_IO_ERROR,"No I2C ACK received",YAPI_IO_ERROR);
        }
        idx = (reply).indexOf("!");
        if (!(idx < 0)) {
            return this._throw(YAPI_IO_ERROR,"I2C protocol error",YAPI_IO_ERROR);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Sends a one-way message (provided as a a binary buffer) to a device on the I2C bus,
     * then read back the specified number of bytes from device.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param buff : the binary buffer to be sent
     * @param rcvCount : the number of bytes to receive once the data bytes are sent
     *
     * @return a list of bytes with the data received from slave device.
     *
     * On failure, throws an exception or returns an empty binary buffer.
     */
    function YI2cPort_i2cSendAndReceiveBin(slaveAddr,buff,rcvCount)
    {
        var nBytes;                 // int;
        var idx;                    // int;
        var val;                    // int;
        var msg;                    // str;
        var reply;                  // str;
        var rcvbytes;               // bin;
        msg = "@"+('00'+(slaveAddr).toString(16)).slice(-2).toLowerCase()+":";
        nBytes = (buff).length;
        idx = 0;
        while (idx < nBytes) {
            val = (buff).charCodeAt(idx);
            msg = ""+msg+""+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        idx = 0;
        while (idx < rcvCount) {
            msg = ""+msg+"xx";
            idx = idx + 1;
        }

        reply = this.queryLine(msg,1000);
        rcvbytes = new Uint8Array(0);
        if (!((reply).length > 0)) {
            return this._throw(YAPI_IO_ERROR,"No response from I2C device",rcvbytes);
        }
        idx = (reply).indexOf("[N]!");
        if (!(idx < 0)) {
            return this._throw(YAPI_IO_ERROR,"No I2C ACK received",rcvbytes);
        }
        idx = (reply).indexOf("!");
        if (!(idx < 0)) {
            return this._throw(YAPI_IO_ERROR,"I2C protocol error",rcvbytes);
        }
        reply = (reply).substr( (reply).length-2*rcvCount, 2*rcvCount);
        rcvbytes = YAPI._hexStrToBin(reply);
        return rcvbytes;
    }

    /**
     * Sends a one-way message (provided as a list of integer) to a device on the I2C bus,
     * then read back the specified number of bytes from device.
     * This function checks and reports communication errors on the I2C bus.
     *
     * @param slaveAddr : the 7-bit address of the slave device (without the direction bit)
     * @param values : a list of data bytes to be sent
     * @param rcvCount : the number of bytes to receive once the data bytes are sent
     *
     * @return a list of bytes with the data received from slave device.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YI2cPort_i2cSendAndReceiveArray(slaveAddr,values,rcvCount)
    {
        var nBytes;                 // int;
        var idx;                    // int;
        var val;                    // int;
        var msg;                    // str;
        var reply;                  // str;
        var rcvbytes;               // bin;
        var res = [];               // intArr;
        msg = "@"+('00'+(slaveAddr).toString(16)).slice(-2).toLowerCase()+":";
        nBytes = values.length;
        idx = 0;
        while (idx < nBytes) {
            val = values[idx];
            msg = ""+msg+""+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        idx = 0;
        while (idx < rcvCount) {
            msg = ""+msg+"xx";
            idx = idx + 1;
        }

        reply = this.queryLine(msg,1000);
        if (!((reply).length > 0)) {
            return this._throw(YAPI_IO_ERROR,"No response from I2C device",res);
        }
        idx = (reply).indexOf("[N]!");
        if (!(idx < 0)) {
            return this._throw(YAPI_IO_ERROR,"No I2C ACK received",res);
        }
        idx = (reply).indexOf("!");
        if (!(idx < 0)) {
            return this._throw(YAPI_IO_ERROR,"I2C protocol error",res);
        }
        reply = (reply).substr( (reply).length-2*rcvCount, 2*rcvCount);
        rcvbytes = YAPI._hexStrToBin(reply);
        res.length = 0;
        idx = 0;
        while (idx < rcvCount) {
            val = (rcvbytes).charCodeAt(idx);
            res.push(val);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Sends a text-encoded I2C code stream to the I2C bus, as is.
     * An I2C code stream is a string made of hexadecimal data bytes,
     * but that may also include the I2C state transitions code:
     * "{S}" to emit a start condition,
     * "{R}" for a repeated start condition,
     * "{P}" for a stop condition,
     * "xx" for receiving a data byte,
     * "{A}" to ack a data byte received and
     * "{N}" to nack a data byte received.
     * If a newline ("\n") is included in the stream, the message
     * will be terminated and a newline will also be added to the
     * receive stream.
     *
     * @param codes : the code stream to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_writeStr(codes)
    {
        var bufflen;                // int;
        var buff;                   // bin;
        var idx;                    // int;
        var ch;                     // int;
        buff = codes;
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
                return this.sendCommand("+"+codes);
            }
        }
        // send string using file upload
        return this._upload("txdata", buff);
    }

    /**
     * Sends a text-encoded I2C code stream to the I2C bus, and terminate
     * the message en relâchant le bus.
     * An I2C code stream is a string made of hexadecimal data bytes,
     * but that may also include the I2C state transitions code:
     * "{S}" to emit a start condition,
     * "{R}" for a repeated start condition,
     * "{P}" for a stop condition,
     * "xx" for receiving a data byte,
     * "{A}" to ack a data byte received and
     * "{N}" to nack a data byte received.
     * At the end of the stream, a stop condition is added if missing
     * and a newline is added to the receive buffer as well.
     *
     * @param codes : the code stream to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_writeLine(codes)
    {
        var bufflen;                // int;
        var buff;                   // bin;
        bufflen = (codes).length;
        if (bufflen < 100) {
            return this.sendCommand("!"+codes);
        }
        // send string using file upload
        buff = ""+codes+"\n";
        return this._upload("txdata", buff);
    }

    /**
     * Sends a single byte to the I2C bus. Depending on the I2C bus state, the byte
     * will be interpreted as an address byte or a data byte.
     *
     * @param code : the byte to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_writeByte(code)
    {
        return this.sendCommand("+"+('00'+(code).toString(16)).slice(-2).toUpperCase());
    }

    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the I2C bus.
     * Depending on the I2C bus state, the first byte will be interpreted as an
     * address byte or a data byte.
     *
     * @param hexString : a string of hexadecimal byte codes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_writeHex(hexString)
    {
        var bufflen;                // int;
        var buff;                   // bin;
        bufflen = (hexString).length;
        if (bufflen < 100) {
            return this.sendCommand("+"+hexString);
        }
        buff = hexString;

        return this._upload("txdata", buff);
    }

    /**
     * Sends a binary buffer to the I2C bus, as is.
     * Depending on the I2C bus state, the first byte will be interpreted
     * as an address byte or a data byte.
     *
     * @param buff : the binary buffer to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_writeBin(buff)
    {
        var nBytes;                 // int;
        var idx;                    // int;
        var val;                    // int;
        var msg;                    // str;
        msg = "";
        nBytes = (buff).length;
        idx = 0;
        while (idx < nBytes) {
            val = (buff).charCodeAt(idx);
            msg = ""+msg+""+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }

        return this.writeHex(msg);
    }

    /**
     * Sends a byte sequence (provided as a list of bytes) to the I2C bus.
     * Depending on the I2C bus state, the first byte will be interpreted as an
     * address byte or a data byte.
     *
     * @param byteList : a list of byte codes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YI2cPort_writeArray(byteList)
    {
        var nBytes;                 // int;
        var idx;                    // int;
        var val;                    // int;
        var msg;                    // str;
        msg = "";
        nBytes = byteList.length;
        idx = 0;
        while (idx < nBytes) {
            val = byteList[idx];
            msg = ""+msg+""+('00'+(val).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }

        return this.writeHex(msg);
    }

    /**
     * Continues the enumeration of I2C ports started using yFirstI2cPort().
     * Caution: You can't make any assumption about the returned I2C ports order.
     * If you want to find a specific an I2C port, use I2cPort.findI2cPort()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YI2cPort object, corresponding to
     *         an I2C port currently online, or a null pointer
     *         if there are no more I2C ports to enumerate.
     */
    function YI2cPort_nextI2cPort()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YI2cPort.FindI2cPort(next_hwid);
    }

    /**
     * Starts the enumeration of I2C ports currently accessible.
     * Use the method YI2cPort.nextI2cPort() to iterate on
     * next I2C ports.
     *
     * @return a pointer to a YI2cPort object, corresponding to
     *         the first I2C port currently online, or a null pointer
     *         if there are none.
     */
    function YI2cPort_FirstI2cPort()
    {
        var next_hwid = YAPI.getFirstHardwareId('I2cPort');
        if(next_hwid == null) return null;
        return YI2cPort.FindI2cPort(next_hwid);
    }

    //--- (end of YI2cPort implementation)

    //--- (YI2cPort initialization)
    YI2cPort = YFunction._Subclass(_YI2cPort, {
        // Constants
        RXCOUNT_INVALID             : YAPI_INVALID_UINT,
        TXCOUNT_INVALID             : YAPI_INVALID_UINT,
        ERRCOUNT_INVALID            : YAPI_INVALID_UINT,
        RXMSGCOUNT_INVALID          : YAPI_INVALID_UINT,
        TXMSGCOUNT_INVALID          : YAPI_INVALID_UINT,
        LASTMSG_INVALID             : YAPI_INVALID_STRING,
        CURRENTJOB_INVALID          : YAPI_INVALID_STRING,
        STARTUPJOB_INVALID          : YAPI_INVALID_STRING,
        COMMAND_INVALID             : YAPI_INVALID_STRING,
        PROTOCOL_INVALID            : YAPI_INVALID_STRING,
        I2CVOLTAGELEVEL_OFF         : 0,
        I2CVOLTAGELEVEL_3V3         : 1,
        I2CVOLTAGELEVEL_1V8         : 2,
        I2CVOLTAGELEVEL_INVALID     : -1,
        I2CMODE_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindI2cPort                 : YI2cPort_FindI2cPort,
        FirstI2cPort                : YI2cPort_FirstI2cPort
    }, {
        // Methods
        get_rxCount                 : YI2cPort_get_rxCount,
        rxCount                     : YI2cPort_get_rxCount,
        get_rxCount_async           : YI2cPort_get_rxCount_async,
        rxCount_async               : YI2cPort_get_rxCount_async,
        get_txCount                 : YI2cPort_get_txCount,
        txCount                     : YI2cPort_get_txCount,
        get_txCount_async           : YI2cPort_get_txCount_async,
        txCount_async               : YI2cPort_get_txCount_async,
        get_errCount                : YI2cPort_get_errCount,
        errCount                    : YI2cPort_get_errCount,
        get_errCount_async          : YI2cPort_get_errCount_async,
        errCount_async              : YI2cPort_get_errCount_async,
        get_rxMsgCount              : YI2cPort_get_rxMsgCount,
        rxMsgCount                  : YI2cPort_get_rxMsgCount,
        get_rxMsgCount_async        : YI2cPort_get_rxMsgCount_async,
        rxMsgCount_async            : YI2cPort_get_rxMsgCount_async,
        get_txMsgCount              : YI2cPort_get_txMsgCount,
        txMsgCount                  : YI2cPort_get_txMsgCount,
        get_txMsgCount_async        : YI2cPort_get_txMsgCount_async,
        txMsgCount_async            : YI2cPort_get_txMsgCount_async,
        get_lastMsg                 : YI2cPort_get_lastMsg,
        lastMsg                     : YI2cPort_get_lastMsg,
        get_lastMsg_async           : YI2cPort_get_lastMsg_async,
        lastMsg_async               : YI2cPort_get_lastMsg_async,
        get_currentJob              : YI2cPort_get_currentJob,
        currentJob                  : YI2cPort_get_currentJob,
        get_currentJob_async        : YI2cPort_get_currentJob_async,
        currentJob_async            : YI2cPort_get_currentJob_async,
        set_currentJob              : YI2cPort_set_currentJob,
        setCurrentJob               : YI2cPort_set_currentJob,
        get_startupJob              : YI2cPort_get_startupJob,
        startupJob                  : YI2cPort_get_startupJob,
        get_startupJob_async        : YI2cPort_get_startupJob_async,
        startupJob_async            : YI2cPort_get_startupJob_async,
        set_startupJob              : YI2cPort_set_startupJob,
        setStartupJob               : YI2cPort_set_startupJob,
        get_command                 : YI2cPort_get_command,
        command                     : YI2cPort_get_command,
        get_command_async           : YI2cPort_get_command_async,
        command_async               : YI2cPort_get_command_async,
        set_command                 : YI2cPort_set_command,
        setCommand                  : YI2cPort_set_command,
        get_protocol                : YI2cPort_get_protocol,
        protocol                    : YI2cPort_get_protocol,
        get_protocol_async          : YI2cPort_get_protocol_async,
        protocol_async              : YI2cPort_get_protocol_async,
        set_protocol                : YI2cPort_set_protocol,
        setProtocol                 : YI2cPort_set_protocol,
        get_i2cVoltageLevel         : YI2cPort_get_i2cVoltageLevel,
        i2cVoltageLevel             : YI2cPort_get_i2cVoltageLevel,
        get_i2cVoltageLevel_async   : YI2cPort_get_i2cVoltageLevel_async,
        i2cVoltageLevel_async       : YI2cPort_get_i2cVoltageLevel_async,
        set_i2cVoltageLevel         : YI2cPort_set_i2cVoltageLevel,
        setI2cVoltageLevel          : YI2cPort_set_i2cVoltageLevel,
        get_i2cMode                 : YI2cPort_get_i2cMode,
        i2cMode                     : YI2cPort_get_i2cMode,
        get_i2cMode_async           : YI2cPort_get_i2cMode_async,
        i2cMode_async               : YI2cPort_get_i2cMode_async,
        set_i2cMode                 : YI2cPort_set_i2cMode,
        setI2cMode                  : YI2cPort_set_i2cMode,
        sendCommand                 : YI2cPort_sendCommand,
        readLine                    : YI2cPort_readLine,
        readMessages                : YI2cPort_readMessages,
        read_seek                   : YI2cPort_read_seek,
        read_tell                   : YI2cPort_read_tell,
        read_avail                  : YI2cPort_read_avail,
        queryLine                   : YI2cPort_queryLine,
        uploadJob                   : YI2cPort_uploadJob,
        selectJob                   : YI2cPort_selectJob,
        reset                       : YI2cPort_reset,
        i2cSendBin                  : YI2cPort_i2cSendBin,
        i2cSendArray                : YI2cPort_i2cSendArray,
        i2cSendAndReceiveBin        : YI2cPort_i2cSendAndReceiveBin,
        i2cSendAndReceiveArray      : YI2cPort_i2cSendAndReceiveArray,
        writeStr                    : YI2cPort_writeStr,
        writeLine                   : YI2cPort_writeLine,
        writeByte                   : YI2cPort_writeByte,
        writeHex                    : YI2cPort_writeHex,
        writeBin                    : YI2cPort_writeBin,
        writeArray                  : YI2cPort_writeArray,
        nextI2cPort                 : YI2cPort_nextI2cPort,
        _parseAttr                  : YI2cPort_parseAttr
    });
    //--- (end of YI2cPort initialization)
})();

//--- (YI2cPort functions)

/**
 * Retrieves an I2C port for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the I2C port is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YI2cPort.isOnline() to test if the I2C port is
 * indeed online at a given time. In case of ambiguity when looking for
 * an I2C port by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the I2C port, for instance
 *         YI2CMK01.i2cPort.
 *
 * @return a YI2cPort object allowing you to drive the I2C port.
 */
function yFindI2cPort(func)
{
    return YI2cPort.FindI2cPort(func);
}

/**
 * Starts the enumeration of I2C ports currently accessible.
 * Use the method YI2cPort.nextI2cPort() to iterate on
 * next I2C ports.
 *
 * @return a pointer to a YI2cPort object, corresponding to
 *         the first I2C port currently online, or a null pointer
 *         if there are none.
 */
function yFirstI2cPort()
{
    return YI2cPort.FirstI2cPort();
}

//--- (end of YI2cPort functions)
