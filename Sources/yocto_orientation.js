/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Orientation functions
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

//--- (YOrientation return codes)
//--- (end of YOrientation return codes)
//--- (YOrientation definitions)
var Y_COUNTERCLOCKWISE_FALSE        = 0;
var Y_COUNTERCLOCKWISE_TRUE         = 1;
var Y_COUNTERCLOCKWISE_INVALID      = -1;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
var Y_ZEROOFFSET_INVALID            = YAPI_INVALID_DOUBLE;
//--- (end of YOrientation definitions)

//--- (YOrientation class start)
/**
 * YOrientation Class: orientation sensor control interface
 *
 * The YOrientation class allows you to read and configure Yoctopuce orientation sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YOrientation class start)

var YOrientation; // definition below
(function()
{
    function _YOrientation(str_func)
    {
        //--- (YOrientation constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Orientation';

        this._counterClockwise               = Y_COUNTERCLOCKWISE_INVALID; // Bool
        this._command                        = Y_COMMAND_INVALID;          // Text
        this._zeroOffset                     = Y_ZEROOFFSET_INVALID;       // MeasureVal
        //--- (end of YOrientation constructor)
    }

    //--- (YOrientation implementation)

    function YOrientation_parseAttr(name, val, _super)
    {
        switch(name) {
        case "counterClockwise":
            this._counterClockwise = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        case "zeroOffset":
            this._zeroOffset = Math.round(val / 65.536) / 1000.0;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns a value indicating whether the sensor is operating in a counterclockwise direction.
     *
     * @return either YOrientation.COUNTERCLOCKWISE_FALSE or YOrientation.COUNTERCLOCKWISE_TRUE, according
     * to a value indicating whether the sensor is operating in a counterclockwise direction
     *
     * On failure, throws an exception or returns YOrientation.COUNTERCLOCKWISE_INVALID.
     */
    function YOrientation_get_counterClockwise()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COUNTERCLOCKWISE_INVALID;
            }
        }
        res = this._counterClockwise;
        return res;
    }

    /**
     * Gets a value indicating whether the sensor is operating in a counterclockwise direction.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YOrientation object that invoked the callback
     *         - the result:either YOrientation.COUNTERCLOCKWISE_FALSE or YOrientation.COUNTERCLOCKWISE_TRUE,
     *         according to a value indicating whether the sensor is operating in a counterclockwise direction
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YOrientation.COUNTERCLOCKWISE_INVALID.
     */
    function YOrientation_get_counterClockwise_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COUNTERCLOCKWISE_INVALID);
            } else {
                callback(context, obj, obj._counterClockwise);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Defines the operating direction of the sensor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : either YOrientation.COUNTERCLOCKWISE_FALSE or YOrientation.COUNTERCLOCKWISE_TRUE
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YOrientation_set_counterClockwise(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('counterClockwise',rest_val);
    }

    function YOrientation_get_command()
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
     *         - the YOrientation object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YOrientation_get_command_async(callback,context)
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

    function YOrientation_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Sets an offset between the orientation reported by the sensor and the actual orientation. This
     * can typically be used  to compensate for mechanical offset. This offset can also be set
     * automatically using the zero() method.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a floating point number
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YOrientation_set_zeroOffset(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('zeroOffset',rest_val);
    }

    /**
     * Returns the Offset between the orientation reported by the sensor and the actual orientation.
     *
     * @return a floating point number corresponding to the Offset between the orientation reported by the
     * sensor and the actual orientation
     *
     * On failure, throws an exception or returns YOrientation.ZEROOFFSET_INVALID.
     */
    function YOrientation_get_zeroOffset()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ZEROOFFSET_INVALID;
            }
        }
        res = this._zeroOffset;
        return res;
    }

    /**
     * Gets the Offset between the orientation reported by the sensor and the actual orientation.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YOrientation object that invoked the callback
     *         - the result:a floating point number corresponding to the Offset between the orientation reported
     *         by the sensor and the actual orientation
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YOrientation.ZEROOFFSET_INVALID.
     */
    function YOrientation_get_zeroOffset_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ZEROOFFSET_INVALID);
            } else {
                callback(context, obj, obj._zeroOffset);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves an orientation sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the orientation sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YOrientation.isOnline() to test if the orientation sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * an orientation sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the orientation sensor, for instance
     *         MyDevice.orientation.
     *
     * @return a YOrientation object allowing you to drive the orientation sensor.
     */
    function YOrientation_FindOrientation(func)                 // class method
    {
        var obj;                    // YOrientation;
        obj = YFunction._FindFromCache("Orientation", func);
        if (obj == null) {
            obj = new YOrientation(func);
            YFunction._AddToCache("Orientation", func, obj);
        }
        return obj;
    }

    function YOrientation_sendCommand(command)
    {
        return this.set_command(command);
    }

    /**
     * Reset the sensor's zero to current position by automatically setting a new offset.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YOrientation_zero()
    {
        return this.sendCommand("Z");
    }

    /**
     * Modifies the calibration of the MA600A sensor using an array of 32
     * values representing the offset in degrees between the true values and
     * those measured regularly every 11.25 degrees starting from zero. The calibration
     * is applied immediately and is stored permanently in the MA600A sensor.
     * Before calculating the offset values, remember to clear any previous
     * calibration using the clearCalibration function and set
     * the zero offset  to 0. After a calibration change, the sensor will stop
     * measurements for about one second.
     * Do not confuse this function with the generic calibrateFromPoints function,
     * which works at the YSensor level and is not necessarily well suited to
     * a sensor returning circular values.
     *
     * @param offsetValues : array of 32 floating point values in the [-11.25..+11.25] range
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YOrientation_set_calibration(offsetValues)
    {
        var res;                    // str;
        var npt;                    // int;
        var idx;                    // int;
        var corr;                   // int;
        npt = offsetValues.length;
        if (npt != 32) {
            this._throw(YAPI_INVALID_ARGUMENT, "Invalid calibration parameters (32 expected)");
            return YAPI_INVALID_ARGUMENT;
        }
        res = "C";
        idx = 0;
        while (idx < npt) {
            corr = Math.round(offsetValues[idx] * 128 / 11.25);
            if ((corr < -128) || (corr > 127)) {
                this._throw(YAPI_INVALID_ARGUMENT, "Calibration parameter exceeds permitted range (+/-11.25)");
                return YAPI_INVALID_ARGUMENT;
            }
            if (corr < 0) {
                corr = corr + 256;
            }
            res = ""+res+""+('00'+(corr).toString(16)).slice(-2).toLowerCase();
            idx = idx + 1;
        }
        return this.sendCommand(res);
    }

    /**
     * Retrieves offset correction data points previously entered using the method
     * set_calibration.
     *
     * @param offsetValues : array of 32 floating point numbers, that will be filled by the
     *         function with the offset values for the correction points.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YOrientation_get_Calibration(offsetValues)
    {
        return 0;
    }

    /**
     * Cancels any calibration set with set_calibration. This function
     * is equivalent to calling set_calibration with only zeros.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YOrientation_clearCalibration()
    {
        return this.sendCommand("-");
    }

    /**
     * Continues the enumeration of orientation sensors started using yFirstOrientation().
     * Caution: You can't make any assumption about the returned orientation sensors order.
     * If you want to find a specific an orientation sensor, use Orientation.findOrientation()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YOrientation object, corresponding to
     *         an orientation sensor currently online, or a null pointer
     *         if there are no more orientation sensors to enumerate.
     */
    function YOrientation_nextOrientation()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YOrientation.FindOrientation(next_hwid);
    }

    /**
     * Starts the enumeration of orientation sensors currently accessible.
     * Use the method YOrientation.nextOrientation() to iterate on
     * next orientation sensors.
     *
     * @return a pointer to a YOrientation object, corresponding to
     *         the first orientation sensor currently online, or a null pointer
     *         if there are none.
     */
    function YOrientation_FirstOrientation()
    {
        var next_hwid = YAPI.getFirstHardwareId('Orientation');
        if(next_hwid == null) return null;
        return YOrientation.FindOrientation(next_hwid);
    }

    //--- (end of YOrientation implementation)

    //--- (YOrientation initialization)
    YOrientation = YSensor._Subclass(_YOrientation, {
        // Constants
        COUNTERCLOCKWISE_FALSE      : 0,
        COUNTERCLOCKWISE_TRUE       : 1,
        COUNTERCLOCKWISE_INVALID    : -1,
        COMMAND_INVALID             : YAPI_INVALID_STRING,
        ZEROOFFSET_INVALID          : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindOrientation             : YOrientation_FindOrientation,
        FirstOrientation            : YOrientation_FirstOrientation
    }, {
        // Methods
        get_counterClockwise        : YOrientation_get_counterClockwise,
        counterClockwise            : YOrientation_get_counterClockwise,
        get_counterClockwise_async  : YOrientation_get_counterClockwise_async,
        counterClockwise_async      : YOrientation_get_counterClockwise_async,
        set_counterClockwise        : YOrientation_set_counterClockwise,
        setCounterClockwise         : YOrientation_set_counterClockwise,
        get_command                 : YOrientation_get_command,
        command                     : YOrientation_get_command,
        get_command_async           : YOrientation_get_command_async,
        command_async               : YOrientation_get_command_async,
        set_command                 : YOrientation_set_command,
        setCommand                  : YOrientation_set_command,
        set_zeroOffset              : YOrientation_set_zeroOffset,
        setZeroOffset               : YOrientation_set_zeroOffset,
        get_zeroOffset              : YOrientation_get_zeroOffset,
        zeroOffset                  : YOrientation_get_zeroOffset,
        get_zeroOffset_async        : YOrientation_get_zeroOffset_async,
        zeroOffset_async            : YOrientation_get_zeroOffset_async,
        sendCommand                 : YOrientation_sendCommand,
        zero                        : YOrientation_zero,
        set_calibration             : YOrientation_set_calibration,
        setCalibration              : YOrientation_set_calibration,
        get_Calibration             : YOrientation_get_Calibration,
        Calibration                 : YOrientation_get_Calibration,
        clearCalibration            : YOrientation_clearCalibration,
        nextOrientation             : YOrientation_nextOrientation,
        _parseAttr                  : YOrientation_parseAttr
    });
    //--- (end of YOrientation initialization)
})();

//--- (YOrientation functions)

/**
 * Retrieves an orientation sensor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the orientation sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YOrientation.isOnline() to test if the orientation sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * an orientation sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the orientation sensor, for instance
 *         MyDevice.orientation.
 *
 * @return a YOrientation object allowing you to drive the orientation sensor.
 */
function yFindOrientation(func)
{
    return YOrientation.FindOrientation(func);
}

/**
 * Starts the enumeration of orientation sensors currently accessible.
 * Use the method YOrientation.nextOrientation() to iterate on
 * next orientation sensors.
 *
 * @return a pointer to a YOrientation object, corresponding to
 *         the first orientation sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstOrientation()
{
    return YOrientation.FirstOrientation();
}

//--- (end of YOrientation functions)
