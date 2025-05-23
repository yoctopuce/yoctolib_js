/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Power functions
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

//--- (YPower return codes)
//--- (end of YPower return codes)
//--- (YPower definitions)
var Y_POWERFACTOR_INVALID           = YAPI_INVALID_DOUBLE;
var Y_COSPHI_INVALID                = YAPI_INVALID_DOUBLE;
var Y_METER_INVALID                 = YAPI_INVALID_DOUBLE;
var Y_DELIVEREDENERGYMETER_INVALID  = YAPI_INVALID_DOUBLE;
var Y_RECEIVEDENERGYMETER_INVALID   = YAPI_INVALID_DOUBLE;
var Y_METERTIMER_INVALID            = YAPI_INVALID_UINT;
//--- (end of YPower definitions)

//--- (YPower class start)
/**
 * YPower Class: electrical power sensor control interface, available for instance in the Yocto-Watt
 *
 * The YPower class allows you to read and configure Yoctopuce electrical power sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to access the energy counter and the power factor.
 */
//--- (end of YPower class start)

var YPower; // definition below
(function()
{
    function _YPower(str_func)
    {
        //--- (YPower constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Power';

        this._powerFactor                    = Y_POWERFACTOR_INVALID;      // MeasureVal
        this._cosPhi                         = Y_COSPHI_INVALID;           // MeasureVal
        this._meter                          = Y_METER_INVALID;            // MeasureVal
        this._deliveredEnergyMeter           = Y_DELIVEREDENERGYMETER_INVALID; // MeasureVal
        this._receivedEnergyMeter            = Y_RECEIVEDENERGYMETER_INVALID; // MeasureVal
        this._meterTimer                     = Y_METERTIMER_INVALID;       // UInt31
        //--- (end of YPower constructor)
    }

    //--- (YPower implementation)

    function YPower_parseAttr(name, val, _super)
    {
        switch(name) {
        case "powerFactor":
            this._powerFactor = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "cosPhi":
            this._cosPhi = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "meter":
            this._meter = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "deliveredEnergyMeter":
            this._deliveredEnergyMeter = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "receivedEnergyMeter":
            this._receivedEnergyMeter = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "meterTimer":
            this._meterTimer = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the power factor (PF), i.e. ratio between the active power consumed (in W)
     * and the apparent power provided (VA).
     *
     * @return a floating point number corresponding to the power factor (PF), i.e
     *
     * On failure, throws an exception or returns YPower.POWERFACTOR_INVALID.
     */
    function YPower_get_powerFactor()
    {
        var res;                    // float;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_POWERFACTOR_INVALID;
            }
        }
        res = this._powerFactor;
        if (res == Y_POWERFACTOR_INVALID) {
            res = this._cosPhi;
        }
        res = Math.round(res * 1000) / 1000;
        return res;
    }

    /**
     * Gets the power factor (PF), i.e. ratio between the active power consumed (in W)
     * and the apparent power provided (VA).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the power factor (PF), i.e
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPower.POWERFACTOR_INVALID.
     */
    function YPower_get_powerFactor_async(callback,context)
    {
        var res;                    // float;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_POWERFACTOR_INVALID);
            } else {
                res = obj._powerFactor;
                if (res == Y_POWERFACTOR_INVALID) {
                    res = obj._cosPhi;
                }
                callback(context, obj, Math.round(res * 1000) / 1000);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the Displacement Power factor (DPF), i.e. cosine of the phase shift between
     * the voltage and current fundamentals.
     * On the Yocto-Watt (V1), the value returned by this method correponds to the
     * power factor as this device is cannot estimate the true DPF.
     *
     * @return a floating point number corresponding to the Displacement Power factor (DPF), i.e
     *
     * On failure, throws an exception or returns YPower.COSPHI_INVALID.
     */
    function YPower_get_cosPhi()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COSPHI_INVALID;
            }
        }
        res = this._cosPhi;
        return res;
    }

    /**
     * Gets the Displacement Power factor (DPF), i.e. cosine of the phase shift between
     * the voltage and current fundamentals.
     * On the Yocto-Watt (V1), the value returned by this method correponds to the
     * power factor as this device is cannot estimate the true DPF.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the Displacement Power factor (DPF), i.e
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPower.COSPHI_INVALID.
     */
    function YPower_get_cosPhi_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COSPHI_INVALID);
            } else {
                callback(context, obj, obj._cosPhi);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YPower_set_meter(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('meter',rest_val);
    }

    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the
     * power consumption over time. This is the sum of forward and backwad energy transfers,
     * if you are insterested in only one direction, use  get_receivedEnergyMeter() or
     * get_deliveredEnergyMeter(). Note that this counter is reset at each start of the device.
     *
     * @return a floating point number corresponding to the energy counter, maintained by the wattmeter by
     * integrating the
     *         power consumption over time
     *
     * On failure, throws an exception or returns YPower.METER_INVALID.
     */
    function YPower_get_meter()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_METER_INVALID;
            }
        }
        res = this._meter;
        return res;
    }

    /**
     * Gets the energy counter, maintained by the wattmeter by integrating the
     * power consumption over time. This is the sum of forward and backwad energy transfers,
     * if you are insterested in only one direction, use  get_receivedEnergyMeter() or
     * get_deliveredEnergyMeter(). Note that this counter is reset at each start of the device.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the energy counter, maintained by the
     *         wattmeter by integrating the
     *         power consumption over time
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPower.METER_INVALID.
     */
    function YPower_get_meter_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_METER_INVALID);
            } else {
                callback(context, obj, obj._meter);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the power consumption over time,
     * but only when positive. Note that this counter is reset at each start of the device.
     *
     * @return a floating point number corresponding to the energy counter, maintained by the wattmeter by
     * integrating the power consumption over time,
     *         but only when positive
     *
     * On failure, throws an exception or returns YPower.DELIVEREDENERGYMETER_INVALID.
     */
    function YPower_get_deliveredEnergyMeter()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DELIVEREDENERGYMETER_INVALID;
            }
        }
        res = this._deliveredEnergyMeter;
        return res;
    }

    /**
     * Gets the energy counter, maintained by the wattmeter by integrating the power consumption over time,
     * but only when positive. Note that this counter is reset at each start of the device.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the energy counter, maintained by the
     *         wattmeter by integrating the power consumption over time,
     *         but only when positive
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPower.DELIVEREDENERGYMETER_INVALID.
     */
    function YPower_get_deliveredEnergyMeter_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DELIVEREDENERGYMETER_INVALID);
            } else {
                callback(context, obj, obj._deliveredEnergyMeter);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the power consumption over time,
     * but only when negative. Note that this counter is reset at each start of the device.
     *
     * @return a floating point number corresponding to the energy counter, maintained by the wattmeter by
     * integrating the power consumption over time,
     *         but only when negative
     *
     * On failure, throws an exception or returns YPower.RECEIVEDENERGYMETER_INVALID.
     */
    function YPower_get_receivedEnergyMeter()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RECEIVEDENERGYMETER_INVALID;
            }
        }
        res = this._receivedEnergyMeter;
        return res;
    }

    /**
     * Gets the energy counter, maintained by the wattmeter by integrating the power consumption over time,
     * but only when negative. Note that this counter is reset at each start of the device.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the energy counter, maintained by the
     *         wattmeter by integrating the power consumption over time,
     *         but only when negative
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPower.RECEIVEDENERGYMETER_INVALID.
     */
    function YPower_get_receivedEnergyMeter_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RECEIVEDENERGYMETER_INVALID);
            } else {
                callback(context, obj, obj._receivedEnergyMeter);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the elapsed time since last energy counter reset, in seconds.
     *
     * @return an integer corresponding to the elapsed time since last energy counter reset, in seconds
     *
     * On failure, throws an exception or returns YPower.METERTIMER_INVALID.
     */
    function YPower_get_meterTimer()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_METERTIMER_INVALID;
            }
        }
        res = this._meterTimer;
        return res;
    }

    /**
     * Gets the elapsed time since last energy counter reset, in seconds.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:an integer corresponding to the elapsed time since last energy counter reset, in seconds
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPower.METERTIMER_INVALID.
     */
    function YPower_get_meterTimer_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_METERTIMER_INVALID);
            } else {
                callback(context, obj, obj._meterTimer);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a electrical power sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the electrical power sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPower.isOnline() to test if the electrical power sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a electrical power sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the electrical power sensor, for instance
     *         YWATTMK1.power.
     *
     * @return a YPower object allowing you to drive the electrical power sensor.
     */
    function YPower_FindPower(func)                             // class method
    {
        var obj;                    // YPower;
        obj = YFunction._FindFromCache("Power", func);
        if (obj == null) {
            obj = new YPower(func);
            YFunction._AddToCache("Power", func, obj);
        }
        return obj;
    }

    /**
     * Resets the energy counters.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPower_reset()
    {
        return this.set_meter(0);
    }

    /**
     * Continues the enumeration of electrical power sensors started using yFirstPower().
     * Caution: You can't make any assumption about the returned electrical power sensors order.
     * If you want to find a specific a electrical power sensor, use Power.findPower()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPower object, corresponding to
     *         a electrical power sensor currently online, or a null pointer
     *         if there are no more electrical power sensors to enumerate.
     */
    function YPower_nextPower()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPower.FindPower(next_hwid);
    }

    /**
     * Starts the enumeration of electrical power sensors currently accessible.
     * Use the method YPower.nextPower() to iterate on
     * next electrical power sensors.
     *
     * @return a pointer to a YPower object, corresponding to
     *         the first electrical power sensor currently online, or a null pointer
     *         if there are none.
     */
    function YPower_FirstPower()
    {
        var next_hwid = YAPI.getFirstHardwareId('Power');
        if(next_hwid == null) return null;
        return YPower.FindPower(next_hwid);
    }

    //--- (end of YPower implementation)

    //--- (YPower initialization)
    YPower = YSensor._Subclass(_YPower, {
        // Constants
        POWERFACTOR_INVALID         : YAPI_INVALID_DOUBLE,
        COSPHI_INVALID              : YAPI_INVALID_DOUBLE,
        METER_INVALID               : YAPI_INVALID_DOUBLE,
        DELIVEREDENERGYMETER_INVALID : YAPI_INVALID_DOUBLE,
        RECEIVEDENERGYMETER_INVALID : YAPI_INVALID_DOUBLE,
        METERTIMER_INVALID          : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindPower                   : YPower_FindPower,
        FirstPower                  : YPower_FirstPower
    }, {
        // Methods
        get_powerFactor             : YPower_get_powerFactor,
        powerFactor                 : YPower_get_powerFactor,
        get_powerFactor_async       : YPower_get_powerFactor_async,
        powerFactor_async           : YPower_get_powerFactor_async,
        get_cosPhi                  : YPower_get_cosPhi,
        cosPhi                      : YPower_get_cosPhi,
        get_cosPhi_async            : YPower_get_cosPhi_async,
        cosPhi_async                : YPower_get_cosPhi_async,
        set_meter                   : YPower_set_meter,
        setMeter                    : YPower_set_meter,
        get_meter                   : YPower_get_meter,
        meter                       : YPower_get_meter,
        get_meter_async             : YPower_get_meter_async,
        meter_async                 : YPower_get_meter_async,
        get_deliveredEnergyMeter    : YPower_get_deliveredEnergyMeter,
        deliveredEnergyMeter        : YPower_get_deliveredEnergyMeter,
        get_deliveredEnergyMeter_async : YPower_get_deliveredEnergyMeter_async,
        deliveredEnergyMeter_async  : YPower_get_deliveredEnergyMeter_async,
        get_receivedEnergyMeter     : YPower_get_receivedEnergyMeter,
        receivedEnergyMeter         : YPower_get_receivedEnergyMeter,
        get_receivedEnergyMeter_async : YPower_get_receivedEnergyMeter_async,
        receivedEnergyMeter_async   : YPower_get_receivedEnergyMeter_async,
        get_meterTimer              : YPower_get_meterTimer,
        meterTimer                  : YPower_get_meterTimer,
        get_meterTimer_async        : YPower_get_meterTimer_async,
        meterTimer_async            : YPower_get_meterTimer_async,
        reset                       : YPower_reset,
        nextPower                   : YPower_nextPower,
        _parseAttr                  : YPower_parseAttr
    });
    //--- (end of YPower initialization)
})();

//--- (YPower functions)

/**
 * Retrieves a electrical power sensor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the electrical power sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPower.isOnline() to test if the electrical power sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a electrical power sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the electrical power sensor, for instance
 *         YWATTMK1.power.
 *
 * @return a YPower object allowing you to drive the electrical power sensor.
 */
function yFindPower(func)
{
    return YPower.FindPower(func);
}

/**
 * Starts the enumeration of electrical power sensors currently accessible.
 * Use the method YPower.nextPower() to iterate on
 * next electrical power sensors.
 *
 * @return a pointer to a YPower object, corresponding to
 *         the first electrical power sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstPower()
{
    return YPower.FirstPower();
}

//--- (end of YPower functions)
