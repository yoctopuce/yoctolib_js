/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Counter functions
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

//--- (YCounter return codes)
//--- (end of YCounter return codes)
//--- (YCounter definitions)
var Y_DECIMALMODE_FALSE             = 0;
var Y_DECIMALMODE_TRUE              = 1;
var Y_DECIMALMODE_INVALID           = -1;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YCounter definitions)

//--- (YCounter class start)
/**
 * YCounter Class: counter control interface
 *
 * The YCounter class allows you to read and configure Yoctopuce gcounters.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YCounter class start)

var YCounter; // definition below
(function()
{
    function _YCounter(str_func)
    {
        //--- (YCounter constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Counter';

        this._decimalMode                    = Y_DECIMALMODE_INVALID;      // Bool
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YCounter constructor)
    }

    //--- (YCounter implementation)

    function YCounter_parseAttr(name, val, _super)
    {
        switch(name) {
        case "decimalMode":
            this._decimalMode = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns a value indicating if the senseur compute whole or fractional values.
     *
     * @return either YCounter.DECIMALMODE_FALSE or YCounter.DECIMALMODE_TRUE, according to a value
     * indicating if the senseur compute whole or fractional values
     *
     * On failure, throws an exception or returns YCounter.DECIMALMODE_INVALID.
     */
    function YCounter_get_decimalMode()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DECIMALMODE_INVALID;
            }
        }
        res = this._decimalMode;
        return res;
    }

    /**
     * Gets a value indicating if the senseur compute whole or fractional values.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCounter object that invoked the callback
     *         - the result:either YCounter.DECIMALMODE_FALSE or YCounter.DECIMALMODE_TRUE, according to a value
     *         indicating if the senseur compute whole or fractional values
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YCounter.DECIMALMODE_INVALID.
     */
    function YCounter_get_decimalMode_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DECIMALMODE_INVALID);
            } else {
                callback(context, obj, obj._decimalMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the sensor's operating mode so that it computes integer or decimal values.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YCounter.DECIMALMODE_FALSE or YCounter.DECIMALMODE_TRUE, according to the
     * sensor's operating mode so that it computes integer or decimal values
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCounter_set_decimalMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('decimalMode',rest_val);
    }

    function YCounter_get_command()
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
     *         - the YCounter object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YCounter_get_command_async(callback,context)
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

    function YCounter_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a counter for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the counter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCounter.isOnline() to test if the counter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a counter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the counter, for instance
     *         MyDevice.counter.
     *
     * @return a YCounter object allowing you to drive the counter.
     */
    function YCounter_FindCounter(func)                         // class method
    {
        var obj;                    // YCounter;
        obj = YFunction._FindFromCache("Counter", func);
        if (obj == null) {
            obj = new YCounter(func);
            YFunction._AddToCache("Counter", func, obj);
        }
        return obj;
    }

    function YCounter_sendCommand(command)
    {
        return this.set_command(command);
    }

    /**
     * Reset the counter to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds. Please note that this function only resets
     *         the integer part of the counter. In CONTINUOUS mode, the decimal part is calculated
     *         from the angle measured by the sensor. To set the decimal part of the sensor to zero,
     *         the origin of the sensor must be changed with the YOrientation.zero().
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCounter_zero()
    {
        return this.sendCommand("Z");
    }

    /**
     * Continues the enumeration of gcounters started using yFirstCounter().
     * Caution: You can't make any assumption about the returned gcounters order.
     * If you want to find a specific a counter, use Counter.findCounter()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YCounter object, corresponding to
     *         a counter currently online, or a null pointer
     *         if there are no more gcounters to enumerate.
     */
    function YCounter_nextCounter()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YCounter.FindCounter(next_hwid);
    }

    /**
     * Starts the enumeration of gcounters currently accessible.
     * Use the method YCounter.nextCounter() to iterate on
     * next gcounters.
     *
     * @return a pointer to a YCounter object, corresponding to
     *         the first counter currently online, or a null pointer
     *         if there are none.
     */
    function YCounter_FirstCounter()
    {
        var next_hwid = YAPI.getFirstHardwareId('Counter');
        if(next_hwid == null) return null;
        return YCounter.FindCounter(next_hwid);
    }

    //--- (end of YCounter implementation)

    //--- (YCounter initialization)
    YCounter = YSensor._Subclass(_YCounter, {
        // Constants
        DECIMALMODE_FALSE           : 0,
        DECIMALMODE_TRUE            : 1,
        DECIMALMODE_INVALID         : -1,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindCounter                 : YCounter_FindCounter,
        FirstCounter                : YCounter_FirstCounter
    }, {
        // Methods
        get_decimalMode             : YCounter_get_decimalMode,
        decimalMode                 : YCounter_get_decimalMode,
        get_decimalMode_async       : YCounter_get_decimalMode_async,
        decimalMode_async           : YCounter_get_decimalMode_async,
        set_decimalMode             : YCounter_set_decimalMode,
        setDecimalMode              : YCounter_set_decimalMode,
        get_command                 : YCounter_get_command,
        command                     : YCounter_get_command,
        get_command_async           : YCounter_get_command_async,
        command_async               : YCounter_get_command_async,
        set_command                 : YCounter_set_command,
        setCommand                  : YCounter_set_command,
        sendCommand                 : YCounter_sendCommand,
        zero                        : YCounter_zero,
        nextCounter                 : YCounter_nextCounter,
        _parseAttr                  : YCounter_parseAttr
    });
    //--- (end of YCounter initialization)
})();

//--- (YCounter functions)

/**
 * Retrieves a counter for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the counter is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YCounter.isOnline() to test if the counter is
 * indeed online at a given time. In case of ambiguity when looking for
 * a counter by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the counter, for instance
 *         MyDevice.counter.
 *
 * @return a YCounter object allowing you to drive the counter.
 */
function yFindCounter(func)
{
    return YCounter.FindCounter(func);
}

/**
 * Starts the enumeration of gcounters currently accessible.
 * Use the method YCounter.nextCounter() to iterate on
 * next gcounters.
 *
 * @return a pointer to a YCounter object, corresponding to
 *         the first counter currently online, or a null pointer
 *         if there are none.
 */
function yFirstCounter()
{
    return YCounter.FirstCounter();
}

//--- (end of YCounter functions)
