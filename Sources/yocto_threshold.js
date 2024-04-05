/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Threshold functions
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

//--- (YThreshold return codes)
//--- (end of YThreshold return codes)
//--- (YThreshold definitions)
var Y_THRESHOLDSTATE_SAFE           = 0;
var Y_THRESHOLDSTATE_ALERT          = 1;
var Y_THRESHOLDSTATE_INVALID        = -1;
var Y_TARGETSENSOR_INVALID          = YAPI_INVALID_STRING;
var Y_ALERTLEVEL_INVALID            = YAPI_INVALID_DOUBLE;
var Y_SAFELEVEL_INVALID             = YAPI_INVALID_DOUBLE;
//--- (end of YThreshold definitions)

//--- (YThreshold class start)
/**
 * YThreshold Class: Control interface to define a threshold
 *
 * The Threshold class allows you define a threshold on a Yoctopuce sensor
 * to trigger a predefined action, on specific devices where this is implemented.
 */
//--- (end of YThreshold class start)

var YThreshold; // definition below
(function()
{
    function _YThreshold(str_func)
    {
        //--- (YThreshold constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Threshold';

        this._thresholdState                 = Y_THRESHOLDSTATE_INVALID;   // ThresholdState
        this._targetSensor                   = Y_TARGETSENSOR_INVALID;     // Text
        this._alertLevel                     = Y_ALERTLEVEL_INVALID;       // MeasureVal
        this._safeLevel                      = Y_SAFELEVEL_INVALID;        // MeasureVal
        //--- (end of YThreshold constructor)
    }

    //--- (YThreshold implementation)

    function YThreshold_parseAttr(name, val, _super)
    {
        switch(name) {
        case "thresholdState":
            this._thresholdState = parseInt(val);
            return 1;
        case "targetSensor":
            this._targetSensor = val;
            return 1;
        case "alertLevel":
            this._alertLevel = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "safeLevel":
            this._safeLevel = Math.round(val / 65.536) / 1000.0;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns current state of the threshold function.
     *
     * @return either YThreshold.THRESHOLDSTATE_SAFE or YThreshold.THRESHOLDSTATE_ALERT, according to
     * current state of the threshold function
     *
     * On failure, throws an exception or returns YThreshold.THRESHOLDSTATE_INVALID.
     */
    function YThreshold_get_thresholdState()
    {
        var res;                    // enumTHRESHOLDSTATE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_THRESHOLDSTATE_INVALID;
            }
        }
        res = this._thresholdState;
        return res;
    }

    /**
     * Gets current state of the threshold function.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YThreshold object that invoked the callback
     *         - the result:either YThreshold.THRESHOLDSTATE_SAFE or YThreshold.THRESHOLDSTATE_ALERT, according to
     *         current state of the threshold function
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YThreshold.THRESHOLDSTATE_INVALID.
     */
    function YThreshold_get_thresholdState_async(callback,context)
    {
        var res;                    // enumTHRESHOLDSTATE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_THRESHOLDSTATE_INVALID);
            } else {
                callback(context, obj, obj._thresholdState);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the name of the sensor monitored by the threshold function.
     *
     * @return a string corresponding to the name of the sensor monitored by the threshold function
     *
     * On failure, throws an exception or returns YThreshold.TARGETSENSOR_INVALID.
     */
    function YThreshold_get_targetSensor()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TARGETSENSOR_INVALID;
            }
        }
        res = this._targetSensor;
        return res;
    }

    /**
     * Gets the name of the sensor monitored by the threshold function.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YThreshold object that invoked the callback
     *         - the result:a string corresponding to the name of the sensor monitored by the threshold function
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YThreshold.TARGETSENSOR_INVALID.
     */
    function YThreshold_get_targetSensor_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TARGETSENSOR_INVALID);
            } else {
                callback(context, obj, obj._targetSensor);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the sensor alert level triggering the threshold function.
     * Remember to call the matching module saveToFlash()
     * method if you want to preserve the setting after reboot.
     *
     * @param newval : a floating point number corresponding to the sensor alert level triggering the
     * threshold function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YThreshold_set_alertLevel(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('alertLevel',rest_val);
    }

    /**
     * Returns the sensor alert level, triggering the threshold function.
     *
     * @return a floating point number corresponding to the sensor alert level, triggering the threshold function
     *
     * On failure, throws an exception or returns YThreshold.ALERTLEVEL_INVALID.
     */
    function YThreshold_get_alertLevel()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ALERTLEVEL_INVALID;
            }
        }
        res = this._alertLevel;
        return res;
    }

    /**
     * Gets the sensor alert level, triggering the threshold function.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YThreshold object that invoked the callback
     *         - the result:a floating point number corresponding to the sensor alert level, triggering the threshold function
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YThreshold.ALERTLEVEL_INVALID.
     */
    function YThreshold_get_alertLevel_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ALERTLEVEL_INVALID);
            } else {
                callback(context, obj, obj._alertLevel);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the sensor acceptable level for disabling the threshold function.
     * Remember to call the matching module saveToFlash()
     * method if you want to preserve the setting after reboot.
     *
     * @param newval : a floating point number corresponding to the sensor acceptable level for disabling
     * the threshold function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YThreshold_set_safeLevel(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('safeLevel',rest_val);
    }

    /**
     * Returns the sensor acceptable level for disabling the threshold function.
     *
     * @return a floating point number corresponding to the sensor acceptable level for disabling the
     * threshold function
     *
     * On failure, throws an exception or returns YThreshold.SAFELEVEL_INVALID.
     */
    function YThreshold_get_safeLevel()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SAFELEVEL_INVALID;
            }
        }
        res = this._safeLevel;
        return res;
    }

    /**
     * Gets the sensor acceptable level for disabling the threshold function.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YThreshold object that invoked the callback
     *         - the result:a floating point number corresponding to the sensor acceptable level for disabling the
     *         threshold function
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YThreshold.SAFELEVEL_INVALID.
     */
    function YThreshold_get_safeLevel_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SAFELEVEL_INVALID);
            } else {
                callback(context, obj, obj._safeLevel);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a threshold function for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the threshold function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YThreshold.isOnline() to test if the threshold function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a threshold function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the threshold function, for instance
     *         MyDevice.threshold1.
     *
     * @return a YThreshold object allowing you to drive the threshold function.
     */
    function YThreshold_FindThreshold(func)                     // class method
    {
        var obj;                    // YThreshold;
        obj = YFunction._FindFromCache("Threshold", func);
        if (obj == null) {
            obj = new YThreshold(func);
            YFunction._AddToCache("Threshold", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of threshold functions started using yFirstThreshold().
     * Caution: You can't make any assumption about the returned threshold functions order.
     * If you want to find a specific a threshold function, use Threshold.findThreshold()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YThreshold object, corresponding to
     *         a threshold function currently online, or a null pointer
     *         if there are no more threshold functions to enumerate.
     */
    function YThreshold_nextThreshold()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YThreshold.FindThreshold(next_hwid);
    }

    /**
     * Starts the enumeration of threshold functions currently accessible.
     * Use the method YThreshold.nextThreshold() to iterate on
     * next threshold functions.
     *
     * @return a pointer to a YThreshold object, corresponding to
     *         the first threshold function currently online, or a null pointer
     *         if there are none.
     */
    function YThreshold_FirstThreshold()
    {
        var next_hwid = YAPI.getFirstHardwareId('Threshold');
        if(next_hwid == null) return null;
        return YThreshold.FindThreshold(next_hwid);
    }

    //--- (end of YThreshold implementation)

    //--- (YThreshold initialization)
    YThreshold = YFunction._Subclass(_YThreshold, {
        // Constants
        THRESHOLDSTATE_SAFE         : 0,
        THRESHOLDSTATE_ALERT        : 1,
        THRESHOLDSTATE_INVALID      : -1,
        TARGETSENSOR_INVALID        : YAPI_INVALID_STRING,
        ALERTLEVEL_INVALID          : YAPI_INVALID_DOUBLE,
        SAFELEVEL_INVALID           : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindThreshold               : YThreshold_FindThreshold,
        FirstThreshold              : YThreshold_FirstThreshold
    }, {
        // Methods
        get_thresholdState          : YThreshold_get_thresholdState,
        thresholdState              : YThreshold_get_thresholdState,
        get_thresholdState_async    : YThreshold_get_thresholdState_async,
        thresholdState_async        : YThreshold_get_thresholdState_async,
        get_targetSensor            : YThreshold_get_targetSensor,
        targetSensor                : YThreshold_get_targetSensor,
        get_targetSensor_async      : YThreshold_get_targetSensor_async,
        targetSensor_async          : YThreshold_get_targetSensor_async,
        set_alertLevel              : YThreshold_set_alertLevel,
        setAlertLevel               : YThreshold_set_alertLevel,
        get_alertLevel              : YThreshold_get_alertLevel,
        alertLevel                  : YThreshold_get_alertLevel,
        get_alertLevel_async        : YThreshold_get_alertLevel_async,
        alertLevel_async            : YThreshold_get_alertLevel_async,
        set_safeLevel               : YThreshold_set_safeLevel,
        setSafeLevel                : YThreshold_set_safeLevel,
        get_safeLevel               : YThreshold_get_safeLevel,
        safeLevel                   : YThreshold_get_safeLevel,
        get_safeLevel_async         : YThreshold_get_safeLevel_async,
        safeLevel_async             : YThreshold_get_safeLevel_async,
        nextThreshold               : YThreshold_nextThreshold,
        _parseAttr                  : YThreshold_parseAttr
    });
    //--- (end of YThreshold initialization)
})();

//--- (YThreshold functions)

/**
 * Retrieves a threshold function for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the threshold function is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YThreshold.isOnline() to test if the threshold function is
 * indeed online at a given time. In case of ambiguity when looking for
 * a threshold function by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the threshold function, for instance
 *         MyDevice.threshold1.
 *
 * @return a YThreshold object allowing you to drive the threshold function.
 */
function yFindThreshold(func)
{
    return YThreshold.FindThreshold(func);
}

/**
 * Starts the enumeration of threshold functions currently accessible.
 * Use the method YThreshold.nextThreshold() to iterate on
 * next threshold functions.
 *
 * @return a pointer to a YThreshold object, corresponding to
 *         the first threshold function currently online, or a null pointer
 *         if there are none.
 */
function yFirstThreshold()
{
    return YThreshold.FirstThreshold();
}

//--- (end of YThreshold functions)
