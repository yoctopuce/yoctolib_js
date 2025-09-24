/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Voltage functions
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

//--- (YVoltage return codes)
//--- (end of YVoltage return codes)
//--- (YVoltage definitions)
var Y_ENABLED_FALSE                 = 0;
var Y_ENABLED_TRUE                  = 1;
var Y_ENABLED_INVALID               = -1;
var Y_SIGNALBIAS_INVALID            = YAPI_INVALID_DOUBLE;
//--- (end of YVoltage definitions)

//--- (YVoltage class start)
/**
 * YVoltage Class: voltage sensor control interface, available for instance in the Yocto-Motor-DC, the
 * Yocto-Volt or the Yocto-Watt
 *
 * The YVoltage class allows you to read and configure Yoctopuce voltage sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YVoltage class start)

var YVoltage; // definition below
(function()
{
    function _YVoltage(str_func)
    {
        //--- (YVoltage constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Voltage';

        this._enabled                        = Y_ENABLED_INVALID;          // Bool
        this._signalBias                     = Y_SIGNALBIAS_INVALID;       // MeasureVal
        //--- (end of YVoltage constructor)
    }

    //--- (YVoltage implementation)

    function YVoltage_parseAttr(name, val, _super)
    {
        switch(name) {
        case "enabled":
            this._enabled = parseInt(val);
            return 1;
        case "signalBias":
            this._signalBias = Math.round(val / 65.536) / 1000.0;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the activation state of this input.
     *
     * @return either YVoltage.ENABLED_FALSE or YVoltage.ENABLED_TRUE, according to the activation state of this input
     *
     * On failure, throws an exception or returns YVoltage.ENABLED_INVALID.
     */
    function YVoltage_get_enabled()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ENABLED_INVALID;
            }
        }
        res = this._enabled;
        return res;
    }

    /**
     * Gets the activation state of this input.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YVoltage object that invoked the callback
     *         - the result:either YVoltage.ENABLED_FALSE or YVoltage.ENABLED_TRUE, according to the activation
     *         state of this input
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YVoltage.ENABLED_INVALID.
     */
    function YVoltage_get_enabled_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ENABLED_INVALID);
            } else {
                callback(context, obj, obj._enabled);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the activation state of this voltage input. When AC measurements are disabled,
     * the device will always assume a DC signal, and vice-versa. When both AC and DC measurements
     * are active, the device switches between AC and DC mode based on the relative amplitude
     * of variations compared to the average value.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either YVoltage.ENABLED_FALSE or YVoltage.ENABLED_TRUE, according to the activation
     * state of this voltage input
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YVoltage_set_enabled(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabled',rest_val);
    }

    /**
     * Changes the DC bias configured for zero shift adjustment.
     * If your DC current reads positive when it should be zero, set up
     * a positive signalBias of the same value to fix the zero shift.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the DC bias configured for zero shift adjustment
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YVoltage_set_signalBias(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('signalBias',rest_val);
    }

    /**
     * Returns the DC bias configured for zero shift adjustment.
     * A positive bias value is used to correct a positive DC bias,
     * while a negative bias value is used to correct a negative DC bias.
     *
     * @return a floating point number corresponding to the DC bias configured for zero shift adjustment
     *
     * On failure, throws an exception or returns YVoltage.SIGNALBIAS_INVALID.
     */
    function YVoltage_get_signalBias()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SIGNALBIAS_INVALID;
            }
        }
        res = this._signalBias;
        return res;
    }

    /**
     * Gets the DC bias configured for zero shift adjustment.
     * A positive bias value is used to correct a positive DC bias,
     * while a negative bias value is used to correct a negative DC bias.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YVoltage object that invoked the callback
     *         - the result:a floating point number corresponding to the DC bias configured for zero shift adjustment
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YVoltage.SIGNALBIAS_INVALID.
     */
    function YVoltage_get_signalBias_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SIGNALBIAS_INVALID);
            } else {
                callback(context, obj, obj._signalBias);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a voltage sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the voltage sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltage.isOnline() to test if the voltage sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the voltage sensor, for instance
     *         MOTORCTL.voltage.
     *
     * @return a YVoltage object allowing you to drive the voltage sensor.
     */
    function YVoltage_FindVoltage(func)                         // class method
    {
        var obj;                    // YVoltage;
        obj = YFunction._FindFromCache("Voltage", func);
        if (obj == null) {
            obj = new YVoltage(func);
            YFunction._AddToCache("Voltage", func, obj);
        }
        return obj;
    }

    /**
     * Calibrate the device by adjusting signalBias so that the current
     * input voltage is precisely seen as zero. Before calling this method, make
     * sure to short the power source inputs as close as possible to the connector, and
     * to disconnect the load to ensure the wires don't capture radiated noise.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YVoltage_zeroAdjust()
    {
        var currSignal;             // float;
        var bias;                   // float;
        currSignal = this.get_currentRawValue();
        bias = this.get_signalBias() + currSignal;
        if (!(bias > -0.5 && bias < 0.5)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"suspicious zeroAdjust, please ensure that the power source inputs are shorted",YAPI_INVALID_ARGUMENT);
        }
        return this.set_signalBias(bias);
    }

    /**
     * Continues the enumeration of voltage sensors started using yFirstVoltage().
     * Caution: You can't make any assumption about the returned voltage sensors order.
     * If you want to find a specific a voltage sensor, use Voltage.findVoltage()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YVoltage object, corresponding to
     *         a voltage sensor currently online, or a null pointer
     *         if there are no more voltage sensors to enumerate.
     */
    function YVoltage_nextVoltage()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YVoltage.FindVoltage(next_hwid);
    }

    /**
     * Starts the enumeration of voltage sensors currently accessible.
     * Use the method YVoltage.nextVoltage() to iterate on
     * next voltage sensors.
     *
     * @return a pointer to a YVoltage object, corresponding to
     *         the first voltage sensor currently online, or a null pointer
     *         if there are none.
     */
    function YVoltage_FirstVoltage()
    {
        var next_hwid = YAPI.getFirstHardwareId('Voltage');
        if(next_hwid == null) return null;
        return YVoltage.FindVoltage(next_hwid);
    }

    //--- (end of YVoltage implementation)

    //--- (YVoltage initialization)
    YVoltage = YSensor._Subclass(_YVoltage, {
        // Constants
        ENABLED_FALSE               : 0,
        ENABLED_TRUE                : 1,
        ENABLED_INVALID             : -1,
        SIGNALBIAS_INVALID          : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindVoltage                 : YVoltage_FindVoltage,
        FirstVoltage                : YVoltage_FirstVoltage
    }, {
        // Methods
        get_enabled                 : YVoltage_get_enabled,
        enabled                     : YVoltage_get_enabled,
        get_enabled_async           : YVoltage_get_enabled_async,
        enabled_async               : YVoltage_get_enabled_async,
        set_enabled                 : YVoltage_set_enabled,
        setEnabled                  : YVoltage_set_enabled,
        set_signalBias              : YVoltage_set_signalBias,
        setSignalBias               : YVoltage_set_signalBias,
        get_signalBias              : YVoltage_get_signalBias,
        signalBias                  : YVoltage_get_signalBias,
        get_signalBias_async        : YVoltage_get_signalBias_async,
        signalBias_async            : YVoltage_get_signalBias_async,
        zeroAdjust                  : YVoltage_zeroAdjust,
        nextVoltage                 : YVoltage_nextVoltage,
        _parseAttr                  : YVoltage_parseAttr
    });
    //--- (end of YVoltage initialization)
})();

//--- (YVoltage functions)

/**
 * Retrieves a voltage sensor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the voltage sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YVoltage.isOnline() to test if the voltage sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a voltage sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the voltage sensor, for instance
 *         MOTORCTL.voltage.
 *
 * @return a YVoltage object allowing you to drive the voltage sensor.
 */
function yFindVoltage(func)
{
    return YVoltage.FindVoltage(func);
}

/**
 * Starts the enumeration of voltage sensors currently accessible.
 * Use the method YVoltage.nextVoltage() to iterate on
 * next voltage sensors.
 *
 * @return a pointer to a YVoltage object, corresponding to
 *         the first voltage sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstVoltage()
{
    return YVoltage.FirstVoltage();
}

//--- (end of YVoltage functions)
