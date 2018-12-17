/*********************************************************************
 *
 *  $Id: yocto_voltageoutput.js 33714 2018-12-14 14:20:39Z seb $
 *
 *  Implements the high-level API for VoltageOutput functions
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

//--- (YVoltageOutput return codes)
//--- (end of YVoltageOutput return codes)
//--- (YVoltageOutput definitions)
var Y_CURRENTVOLTAGE_INVALID        = YAPI_INVALID_DOUBLE;
var Y_VOLTAGETRANSITION_INVALID     = YAPI_INVALID_STRING;
var Y_VOLTAGEATSTARTUP_INVALID      = YAPI_INVALID_DOUBLE;
//--- (end of YVoltageOutput definitions)

//--- (YVoltageOutput class start)
/**
 * YVoltageOutput Class: VoltageOutput function interface
 *
 * The Yoctopuce application programming interface allows you to change the value of the voltage output.
 */
//--- (end of YVoltageOutput class start)

var YVoltageOutput; // definition below
(function()
{
    function _YVoltageOutput(str_func)
    {
        //--- (YVoltageOutput constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'VoltageOutput';

        this._currentVoltage                 = Y_CURRENTVOLTAGE_INVALID;   // MeasureVal
        this._voltageTransition              = Y_VOLTAGETRANSITION_INVALID; // AnyFloatTransition
        this._voltageAtStartUp               = Y_VOLTAGEATSTARTUP_INVALID; // MeasureVal
        //--- (end of YVoltageOutput constructor)
    }

    //--- (YVoltageOutput implementation)

    function YVoltageOutput_parseAttr(name, val, _super)
    {
        switch(name) {
        case "currentVoltage":
            this._currentVoltage = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "voltageTransition":
            this._voltageTransition = val;
            return 1;
        case "voltageAtStartUp":
            this._voltageAtStartUp = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the output voltage, in V. Valid range is from 0 to 10V.
     *
     * @param newval : a floating point number corresponding to the output voltage, in V
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YVoltageOutput_set_currentVoltage(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('currentVoltage',rest_val);
    }

    /**
     * Returns the output voltage set point, in V.
     *
     * @return a floating point number corresponding to the output voltage set point, in V
     *
     * On failure, throws an exception or returns Y_CURRENTVOLTAGE_INVALID.
     */
    function YVoltageOutput_get_currentVoltage()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTVOLTAGE_INVALID;
            }
        }
        res = this._currentVoltage;
        return res;
    }

    /**
     * Gets the output voltage set point, in V.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YVoltageOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the output voltage set point, in V
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CURRENTVOLTAGE_INVALID.
     */
    function YVoltageOutput_get_currentVoltage_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTVOLTAGE_INVALID);
            } else {
                callback(context, obj, obj._currentVoltage);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YVoltageOutput_get_voltageTransition()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLTAGETRANSITION_INVALID;
            }
        }
        res = this._voltageTransition;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YVoltageOutput object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YVoltageOutput_get_voltageTransition_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLTAGETRANSITION_INVALID);
            } else {
                callback(context, obj, obj._voltageTransition);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YVoltageOutput_set_voltageTransition(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('voltageTransition',rest_val);
    }

    /**
     * Changes the output voltage at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the output voltage at device start up
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YVoltageOutput_set_voltageAtStartUp(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('voltageAtStartUp',rest_val);
    }

    /**
     * Returns the selected voltage output at device startup, in V.
     *
     * @return a floating point number corresponding to the selected voltage output at device startup, in V
     *
     * On failure, throws an exception or returns Y_VOLTAGEATSTARTUP_INVALID.
     */
    function YVoltageOutput_get_voltageAtStartUp()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLTAGEATSTARTUP_INVALID;
            }
        }
        res = this._voltageAtStartUp;
        return res;
    }

    /**
     * Gets the selected voltage output at device startup, in V.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YVoltageOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the selected voltage output at device startup, in V
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_VOLTAGEATSTARTUP_INVALID.
     */
    function YVoltageOutput_get_voltageAtStartUp_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLTAGEATSTARTUP_INVALID);
            } else {
                callback(context, obj, obj._voltageAtStartUp);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a voltage output for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltageOutput.isOnline() to test if the voltage output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the voltage output
     *
     * @return a YVoltageOutput object allowing you to drive the voltage output.
     */
    function YVoltageOutput_FindVoltageOutput(func)             // class method
    {
        var obj;                    // YVoltageOutput;
        obj = YFunction._FindFromCache("VoltageOutput", func);
        if (obj == null) {
            obj = new YVoltageOutput(func);
            YFunction._AddToCache("VoltageOutput", func, obj);
        }
        return obj;
    }

    /**
     * Performs a smooth transition of output voltage. Any explicit voltage
     * change cancels any ongoing transition process.
     *
     * @param V_target   : new output voltage value at the end of the transition
     *         (floating-point number, representing the end voltage in V)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI_SUCCESS when the call succeeds.
     */
    function YVoltageOutput_voltageMove(V_target,ms_duration)
    {
        var newval;                 // str;
        if (V_target < 0.0) {
            V_target  = 0.0;
        }
        if (V_target > 10.0) {
            V_target = 10.0;
        }
        newval = ""+String(Math.round(Math.round(V_target*65536)))+":"+String(Math.round(ms_duration));

        return this.set_voltageTransition(newval);
    }

    /**
     * Continues the enumeration of voltage outputs started using yFirstVoltageOutput().
     * Caution: You can't make any assumption about the returned voltage outputs order.
     * If you want to find a specific a voltage output, use VoltageOutput.findVoltageOutput()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YVoltageOutput object, corresponding to
     *         a voltage output currently online, or a null pointer
     *         if there are no more voltage outputs to enumerate.
     */
    function YVoltageOutput_nextVoltageOutput()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YVoltageOutput.FindVoltageOutput(next_hwid);
    }

    /**
     * Starts the enumeration of voltage outputs currently accessible.
     * Use the method YVoltageOutput.nextVoltageOutput() to iterate on
     * next voltage outputs.
     *
     * @return a pointer to a YVoltageOutput object, corresponding to
     *         the first voltage output currently online, or a null pointer
     *         if there are none.
     */
    function YVoltageOutput_FirstVoltageOutput()
    {
        var next_hwid = YAPI.getFirstHardwareId('VoltageOutput');
        if(next_hwid == null) return null;
        return YVoltageOutput.FindVoltageOutput(next_hwid);
    }

    //--- (end of YVoltageOutput implementation)

    //--- (YVoltageOutput initialization)
    YVoltageOutput = YFunction._Subclass(_YVoltageOutput, {
        // Constants
        CURRENTVOLTAGE_INVALID      : YAPI_INVALID_DOUBLE,
        VOLTAGETRANSITION_INVALID   : YAPI_INVALID_STRING,
        VOLTAGEATSTARTUP_INVALID    : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindVoltageOutput           : YVoltageOutput_FindVoltageOutput,
        FirstVoltageOutput          : YVoltageOutput_FirstVoltageOutput
    }, {
        // Methods
        set_currentVoltage          : YVoltageOutput_set_currentVoltage,
        setCurrentVoltage           : YVoltageOutput_set_currentVoltage,
        get_currentVoltage          : YVoltageOutput_get_currentVoltage,
        currentVoltage              : YVoltageOutput_get_currentVoltage,
        get_currentVoltage_async    : YVoltageOutput_get_currentVoltage_async,
        currentVoltage_async        : YVoltageOutput_get_currentVoltage_async,
        get_voltageTransition       : YVoltageOutput_get_voltageTransition,
        voltageTransition           : YVoltageOutput_get_voltageTransition,
        get_voltageTransition_async : YVoltageOutput_get_voltageTransition_async,
        voltageTransition_async     : YVoltageOutput_get_voltageTransition_async,
        set_voltageTransition       : YVoltageOutput_set_voltageTransition,
        setVoltageTransition        : YVoltageOutput_set_voltageTransition,
        set_voltageAtStartUp        : YVoltageOutput_set_voltageAtStartUp,
        setVoltageAtStartUp         : YVoltageOutput_set_voltageAtStartUp,
        get_voltageAtStartUp        : YVoltageOutput_get_voltageAtStartUp,
        voltageAtStartUp            : YVoltageOutput_get_voltageAtStartUp,
        get_voltageAtStartUp_async  : YVoltageOutput_get_voltageAtStartUp_async,
        voltageAtStartUp_async      : YVoltageOutput_get_voltageAtStartUp_async,
        voltageMove                 : YVoltageOutput_voltageMove,
        nextVoltageOutput           : YVoltageOutput_nextVoltageOutput,
        _parseAttr                  : YVoltageOutput_parseAttr
    });
    //--- (end of YVoltageOutput initialization)
})();

//--- (YVoltageOutput functions)

/**
 * Retrieves a voltage output for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the voltage output is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YVoltageOutput.isOnline() to test if the voltage output is
 * indeed online at a given time. In case of ambiguity when looking for
 * a voltage output by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the voltage output
 *
 * @return a YVoltageOutput object allowing you to drive the voltage output.
 */
function yFindVoltageOutput(func)
{
    return YVoltageOutput.FindVoltageOutput(func);
}

/**
 * Starts the enumeration of voltage outputs currently accessible.
 * Use the method YVoltageOutput.nextVoltageOutput() to iterate on
 * next voltage outputs.
 *
 * @return a pointer to a YVoltageOutput object, corresponding to
 *         the first voltage output currently online, or a null pointer
 *         if there are none.
 */
function yFirstVoltageOutput()
{
    return YVoltageOutput.FirstVoltageOutput();
}

//--- (end of YVoltageOutput functions)
