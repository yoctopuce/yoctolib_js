/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for VirtualSensor functions
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

//--- (YVirtualSensor return codes)
//--- (end of YVirtualSensor return codes)
//--- (YVirtualSensor definitions)
var Y_INVALIDVALUE_INVALID          = YAPI_INVALID_DOUBLE;
//--- (end of YVirtualSensor definitions)

//--- (YVirtualSensor class start)
/**
 * YVirtualSensor Class: virtual sensor control interface
 *
 * The YVirtualSensor class allows you to use Yoctopuce virtual sensors.
 * These sensors make it possible to show external data collected by the user
 * as a Yoctopuce Sensor. This class inherits from YSensor class the core
 * functions to read measurements, to register callback functions, and to access
 * the autonomous datalogger. It adds the ability to change the sensor value as
 * needed, or to mark current value as invalid.
 */
//--- (end of YVirtualSensor class start)

var YVirtualSensor; // definition below
(function()
{
    function _YVirtualSensor(str_func)
    {
        //--- (YVirtualSensor constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'VirtualSensor';

        this._invalidValue                   = Y_INVALIDVALUE_INVALID;     // MeasureVal
        //--- (end of YVirtualSensor constructor)
    }

    //--- (YVirtualSensor implementation)

    function YVirtualSensor_parseAttr(name, val, _super)
    {
        switch(name) {
        case "invalidValue":
            this._invalidValue = Math.round(val / 65.536) / 1000.0;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the measuring unit for the measured value.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the measured value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YVirtualSensor_set_unit(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('unit',rest_val);
    }

    /**
     * Changes the current value of the sensor (raw value, before calibration).
     *
     * @param newval : a floating point number corresponding to the current value of the sensor (raw
     * value, before calibration)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YVirtualSensor_set_currentRawValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('currentRawValue',rest_val);
    }

    function YVirtualSensor_set_sensorState(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('sensorState',rest_val);
    }

    /**
     * Changes the invalid value of the sensor, returned if the sensor is read when in invalid state
     * (for instance before having been set). Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the invalid value of the sensor, returned
     * if the sensor is read when in invalid state
     *         (for instance before having been set)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YVirtualSensor_set_invalidValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('invalidValue',rest_val);
    }

    /**
     * Returns the invalid value of the sensor, returned if the sensor is read when in invalid state
     * (for instance before having been set).
     *
     * @return a floating point number corresponding to the invalid value of the sensor, returned if the
     * sensor is read when in invalid state
     *         (for instance before having been set)
     *
     * On failure, throws an exception or returns YVirtualSensor.INVALIDVALUE_INVALID.
     */
    function YVirtualSensor_get_invalidValue()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_INVALIDVALUE_INVALID;
            }
        }
        res = this._invalidValue;
        return res;
    }

    /**
     * Gets the invalid value of the sensor, returned if the sensor is read when in invalid state
     * (for instance before having been set).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YVirtualSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the invalid value of the sensor, returned if
     *         the sensor is read when in invalid state
     *         (for instance before having been set)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YVirtualSensor.INVALIDVALUE_INVALID.
     */
    function YVirtualSensor_get_invalidValue_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_INVALIDVALUE_INVALID);
            } else {
                callback(context, obj, obj._invalidValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a virtual sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the virtual sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVirtualSensor.isOnline() to test if the virtual sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a virtual sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the virtual sensor, for instance
     *         MyDevice.virtualSensor1.
     *
     * @return a YVirtualSensor object allowing you to drive the virtual sensor.
     */
    function YVirtualSensor_FindVirtualSensor(func)             // class method
    {
        var obj;                    // YVirtualSensor;
        obj = YFunction._FindFromCache("VirtualSensor", func);
        if (obj == null) {
            obj = new YVirtualSensor(func);
            YFunction._AddToCache("VirtualSensor", func, obj);
        }
        return obj;
    }

    /**
     * Changes the current sensor state to invalid (as if no value would have been ever set).
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YVirtualSensor_set_sensorAsInvalid()
    {
        return this.set_sensorState(1);
    }

    /**
     * Continues the enumeration of virtual sensors started using yFirstVirtualSensor().
     * Caution: You can't make any assumption about the returned virtual sensors order.
     * If you want to find a specific a virtual sensor, use VirtualSensor.findVirtualSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YVirtualSensor object, corresponding to
     *         a virtual sensor currently online, or a null pointer
     *         if there are no more virtual sensors to enumerate.
     */
    function YVirtualSensor_nextVirtualSensor()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YVirtualSensor.FindVirtualSensor(next_hwid);
    }

    /**
     * Starts the enumeration of virtual sensors currently accessible.
     * Use the method YVirtualSensor.nextVirtualSensor() to iterate on
     * next virtual sensors.
     *
     * @return a pointer to a YVirtualSensor object, corresponding to
     *         the first virtual sensor currently online, or a null pointer
     *         if there are none.
     */
    function YVirtualSensor_FirstVirtualSensor()
    {
        var next_hwid = YAPI.getFirstHardwareId('VirtualSensor');
        if(next_hwid == null) return null;
        return YVirtualSensor.FindVirtualSensor(next_hwid);
    }

    //--- (end of YVirtualSensor implementation)

    //--- (YVirtualSensor initialization)
    YVirtualSensor = YSensor._Subclass(_YVirtualSensor, {
        // Constants
        INVALIDVALUE_INVALID        : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindVirtualSensor           : YVirtualSensor_FindVirtualSensor,
        FirstVirtualSensor          : YVirtualSensor_FirstVirtualSensor
    }, {
        // Methods
        set_unit                    : YVirtualSensor_set_unit,
        setUnit                     : YVirtualSensor_set_unit,
        set_currentRawValue         : YVirtualSensor_set_currentRawValue,
        setCurrentRawValue          : YVirtualSensor_set_currentRawValue,
        set_sensorState             : YVirtualSensor_set_sensorState,
        setSensorState              : YVirtualSensor_set_sensorState,
        set_invalidValue            : YVirtualSensor_set_invalidValue,
        setInvalidValue             : YVirtualSensor_set_invalidValue,
        get_invalidValue            : YVirtualSensor_get_invalidValue,
        invalidValue                : YVirtualSensor_get_invalidValue,
        get_invalidValue_async      : YVirtualSensor_get_invalidValue_async,
        invalidValue_async          : YVirtualSensor_get_invalidValue_async,
        set_sensorAsInvalid         : YVirtualSensor_set_sensorAsInvalid,
        setSensorAsInvalid          : YVirtualSensor_set_sensorAsInvalid,
        nextVirtualSensor           : YVirtualSensor_nextVirtualSensor,
        _parseAttr                  : YVirtualSensor_parseAttr
    });
    //--- (end of YVirtualSensor initialization)
})();

//--- (YVirtualSensor functions)

/**
 * Retrieves a virtual sensor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the virtual sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YVirtualSensor.isOnline() to test if the virtual sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a virtual sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the virtual sensor, for instance
 *         MyDevice.virtualSensor1.
 *
 * @return a YVirtualSensor object allowing you to drive the virtual sensor.
 */
function yFindVirtualSensor(func)
{
    return YVirtualSensor.FindVirtualSensor(func);
}

/**
 * Starts the enumeration of virtual sensors currently accessible.
 * Use the method YVirtualSensor.nextVirtualSensor() to iterate on
 * next virtual sensors.
 *
 * @return a pointer to a YVirtualSensor object, corresponding to
 *         the first virtual sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstVirtualSensor()
{
    return YVirtualSensor.FirstVirtualSensor();
}

//--- (end of YVirtualSensor functions)
