/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for PowerOutput functions
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

//--- (YPowerOutput return codes)
//--- (end of YPowerOutput return codes)
//--- (YPowerOutput definitions)
var Y_VOLTAGE_OFF                   = 0;
var Y_VOLTAGE_OUT3V3                = 1;
var Y_VOLTAGE_OUT5V                 = 2;
var Y_VOLTAGE_OUT4V7                = 3;
var Y_VOLTAGE_OUT1V8                = 4;
var Y_VOLTAGE_INVALID               = -1;
//--- (end of YPowerOutput definitions)

//--- (YPowerOutput class start)
/**
 * YPowerOutput Class: power output control interface, available for instance in the Yocto-I2C, the
 * Yocto-MaxiMicroVolt-Rx, the Yocto-SPI or the Yocto-Serial
 *
 * The YPowerOutput class allows you to control
 * the power output featured on some Yoctopuce devices.
 */
//--- (end of YPowerOutput class start)

var YPowerOutput; // definition below
(function()
{
    function _YPowerOutput(str_func)
    {
        //--- (YPowerOutput constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'PowerOutput';

        this._voltage                        = Y_VOLTAGE_INVALID;          // PowerOuputVoltage
        //--- (end of YPowerOutput constructor)
    }

    //--- (YPowerOutput implementation)

    function YPowerOutput_parseAttr(name, val, _super)
    {
        switch(name) {
        case "voltage":
            this._voltage = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the voltage on the power output featured by the module.
     *
     * @return a value among YPowerOutput.VOLTAGE_OFF, YPowerOutput.VOLTAGE_OUT3V3,
     * YPowerOutput.VOLTAGE_OUT5V, YPowerOutput.VOLTAGE_OUT4V7 and YPowerOutput.VOLTAGE_OUT1V8
     * corresponding to the voltage on the power output featured by the module
     *
     * On failure, throws an exception or returns YPowerOutput.VOLTAGE_INVALID.
     */
    function YPowerOutput_get_voltage()
    {
        var res;                    // enumPOWEROUPUTVOLTAGE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLTAGE_INVALID;
            }
        }
        res = this._voltage;
        return res;
    }

    /**
     * Gets the voltage on the power output featured by the module.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerOutput object that invoked the callback
     *         - the result:a value among YPowerOutput.VOLTAGE_OFF, YPowerOutput.VOLTAGE_OUT3V3,
     *         YPowerOutput.VOLTAGE_OUT5V, YPowerOutput.VOLTAGE_OUT4V7 and YPowerOutput.VOLTAGE_OUT1V8
     *         corresponding to the voltage on the power output featured by the module
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPowerOutput.VOLTAGE_INVALID.
     */
    function YPowerOutput_get_voltage_async(callback,context)
    {
        var res;                    // enumPOWEROUPUTVOLTAGE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLTAGE_INVALID);
            } else {
                callback(context, obj, obj._voltage);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the voltage on the power output provided by the
     * module. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YPowerOutput.VOLTAGE_OFF, YPowerOutput.VOLTAGE_OUT3V3,
     * YPowerOutput.VOLTAGE_OUT5V, YPowerOutput.VOLTAGE_OUT4V7 and YPowerOutput.VOLTAGE_OUT1V8
     * corresponding to the voltage on the power output provided by the
     *         module
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPowerOutput_set_voltage(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('voltage',rest_val);
    }

    /**
     * Retrieves a power output for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the power output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerOutput.isOnline() to test if the power output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a power output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the power output, for instance
     *         YI2CMK01.powerOutput.
     *
     * @return a YPowerOutput object allowing you to drive the power output.
     */
    function YPowerOutput_FindPowerOutput(func)                 // class method
    {
        var obj;                    // YPowerOutput;
        obj = YFunction._FindFromCache("PowerOutput", func);
        if (obj == null) {
            obj = new YPowerOutput(func);
            YFunction._AddToCache("PowerOutput", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of power output started using yFirstPowerOutput().
     * Caution: You can't make any assumption about the returned power output order.
     * If you want to find a specific a power output, use PowerOutput.findPowerOutput()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPowerOutput object, corresponding to
     *         a power output currently online, or a null pointer
     *         if there are no more power output to enumerate.
     */
    function YPowerOutput_nextPowerOutput()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPowerOutput.FindPowerOutput(next_hwid);
    }

    /**
     * Starts the enumeration of power output currently accessible.
     * Use the method YPowerOutput.nextPowerOutput() to iterate on
     * next power output.
     *
     * @return a pointer to a YPowerOutput object, corresponding to
     *         the first power output currently online, or a null pointer
     *         if there are none.
     */
    function YPowerOutput_FirstPowerOutput()
    {
        var next_hwid = YAPI.getFirstHardwareId('PowerOutput');
        if(next_hwid == null) return null;
        return YPowerOutput.FindPowerOutput(next_hwid);
    }

    //--- (end of YPowerOutput implementation)

    //--- (YPowerOutput initialization)
    YPowerOutput = YFunction._Subclass(_YPowerOutput, {
        // Constants
        VOLTAGE_OFF                 : 0,
        VOLTAGE_OUT3V3              : 1,
        VOLTAGE_OUT5V               : 2,
        VOLTAGE_OUT4V7              : 3,
        VOLTAGE_OUT1V8              : 4,
        VOLTAGE_INVALID             : -1
    }, {
        // Class methods
        FindPowerOutput             : YPowerOutput_FindPowerOutput,
        FirstPowerOutput            : YPowerOutput_FirstPowerOutput
    }, {
        // Methods
        get_voltage                 : YPowerOutput_get_voltage,
        voltage                     : YPowerOutput_get_voltage,
        get_voltage_async           : YPowerOutput_get_voltage_async,
        voltage_async               : YPowerOutput_get_voltage_async,
        set_voltage                 : YPowerOutput_set_voltage,
        setVoltage                  : YPowerOutput_set_voltage,
        nextPowerOutput             : YPowerOutput_nextPowerOutput,
        _parseAttr                  : YPowerOutput_parseAttr
    });
    //--- (end of YPowerOutput initialization)
})();

//--- (YPowerOutput functions)

/**
 * Retrieves a power output for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the power output is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPowerOutput.isOnline() to test if the power output is
 * indeed online at a given time. In case of ambiguity when looking for
 * a power output by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the power output, for instance
 *         YI2CMK01.powerOutput.
 *
 * @return a YPowerOutput object allowing you to drive the power output.
 */
function yFindPowerOutput(func)
{
    return YPowerOutput.FindPowerOutput(func);
}

/**
 * Starts the enumeration of power output currently accessible.
 * Use the method YPowerOutput.nextPowerOutput() to iterate on
 * next power output.
 *
 * @return a pointer to a YPowerOutput object, corresponding to
 *         the first power output currently online, or a null pointer
 *         if there are none.
 */
function yFirstPowerOutput()
{
    return YPowerOutput.FirstPowerOutput();
}

//--- (end of YPowerOutput functions)
