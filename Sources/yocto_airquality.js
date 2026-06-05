/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for AirQuality functions
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

//--- (YAirQuality return codes)
//--- (end of YAirQuality return codes)
//--- (YAirQuality definitions)
var Y_AQIMODE_RELATIVE              = 0;
var Y_AQIMODE_UBA                   = 1;
var Y_AQIMODE_INVALID               = -1;
var Y_UBAINDEX_INVALID              = YAPI_INVALID_DOUBLE;
var Y_RELATIVEINDEX_INVALID         = YAPI_INVALID_DOUBLE;
//--- (end of YAirQuality definitions)

//--- (YAirQuality class start)
/**
 * YAirQuality Class: air quality sensor control interface
 *
 * The YAirQuality class allows you to read and configure Yoctopuce air quality sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YAirQuality class start)

var YAirQuality; // definition below
(function()
{
    function _YAirQuality(str_func)
    {
        //--- (YAirQuality constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'AirQuality';

        this._ubaIndex                       = Y_UBAINDEX_INVALID;         // MeasureVal
        this._relativeIndex                  = Y_RELATIVEINDEX_INVALID;    // MeasureVal
        this._aqiMode                        = Y_AQIMODE_INVALID;          // AirQualityIndexType
        //--- (end of YAirQuality constructor)
    }

    //--- (YAirQuality implementation)

    function YAirQuality_parseAttr(name, val, _super)
    {
        switch(name) {
        case "ubaIndex":
            this._ubaIndex = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "relativeIndex":
            this._relativeIndex = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "aqiMode":
            this._aqiMode = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current air quality index, according to UBA (from 1 to 5).
     *
     * @return a floating point number corresponding to the current air quality index, according to UBA (from 1 to 5)
     *
     * On failure, throws an exception or returns YAirQuality.UBAINDEX_INVALID.
     */
    function YAirQuality_get_ubaIndex()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_UBAINDEX_INVALID;
            }
        }
        res = this._ubaIndex;
        return res;
    }

    /**
     * Gets the current air quality index, according to UBA (from 1 to 5).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAirQuality object that invoked the callback
     *         - the result:a floating point number corresponding to the current air quality index, according to
     *         UBA (from 1 to 5)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YAirQuality.UBAINDEX_INVALID.
     */
    function YAirQuality_get_ubaIndex_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_UBAINDEX_INVALID);
            } else {
                callback(context, obj, obj._ubaIndex);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the relative air quality index, according to ScioSense (from 0 to 500).
     * A value below 100 indicates better-than-average air quality compared to the past 24 hours,
     * while a value above 100 indicates poorer-than-average air quality compared to the past 24 hours.
     *
     * @return a floating point number corresponding to the relative air quality index, according to
     * ScioSense (from 0 to 500)
     *
     * On failure, throws an exception or returns YAirQuality.RELATIVEINDEX_INVALID.
     */
    function YAirQuality_get_relativeIndex()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RELATIVEINDEX_INVALID;
            }
        }
        res = this._relativeIndex;
        return res;
    }

    /**
     * Gets the relative air quality index, according to ScioSense (from 0 to 500).
     * A value below 100 indicates better-than-average air quality compared to the past 24 hours,
     * while a value above 100 indicates poorer-than-average air quality compared to the past 24 hours.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAirQuality object that invoked the callback
     *         - the result:a floating point number corresponding to the relative air quality index, according to
     *         ScioSense (from 0 to 500)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YAirQuality.RELATIVEINDEX_INVALID.
     */
    function YAirQuality_get_relativeIndex_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RELATIVEINDEX_INVALID);
            } else {
                callback(context, obj, obj._relativeIndex);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the type of index reported by the get_currentValue function and callbacks (UBA index or relative index).
     *
     * @return either YAirQuality.AQIMODE_RELATIVE or YAirQuality.AQIMODE_UBA, according to the type of
     * index reported by the get_currentValue function and callbacks (UBA index or relative index)
     *
     * On failure, throws an exception or returns YAirQuality.AQIMODE_INVALID.
     */
    function YAirQuality_get_aqiMode()
    {
        var res;                    // enumAIRQUALITYINDEXTYPE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_AQIMODE_INVALID;
            }
        }
        res = this._aqiMode;
        return res;
    }

    /**
     * Gets the type of index reported by the get_currentValue function and callbacks (UBA index or relative index).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAirQuality object that invoked the callback
     *         - the result:either YAirQuality.AQIMODE_RELATIVE or YAirQuality.AQIMODE_UBA, according to the type
     *         of index reported by the get_currentValue function and callbacks (UBA index or relative index)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YAirQuality.AQIMODE_INVALID.
     */
    function YAirQuality_get_aqiMode_async(callback,context)
    {
        var res;                    // enumAIRQUALITYINDEXTYPE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_AQIMODE_INVALID);
            } else {
                callback(context, obj, obj._aqiMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the the type of index reported by the get_currentValue function and callbacks (UBA index or
     * relative index).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YAirQuality.AQIMODE_RELATIVE or YAirQuality.AQIMODE_UBA, according to the
     * the type of index reported by the get_currentValue function and callbacks (UBA index or relative index)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YAirQuality_set_aqiMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('aqiMode',rest_val);
    }

    /**
     * Retrieves a air quality sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the air quality sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAirQuality.isOnline() to test if the air quality sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a air quality sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the air quality sensor, for instance
     *         MyDevice.airQuality.
     *
     * @return a YAirQuality object allowing you to drive the air quality sensor.
     */
    function YAirQuality_FindAirQuality(func)                   // class method
    {
        var obj;                    // YAirQuality;
        obj = YFunction._FindFromCache("AirQuality", func);
        if (obj == null) {
            obj = new YAirQuality(func);
            YFunction._AddToCache("AirQuality", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of air quality sensors started using yFirstAirQuality().
     * Caution: You can't make any assumption about the returned air quality sensors order.
     * If you want to find a specific a air quality sensor, use AirQuality.findAirQuality()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YAirQuality object, corresponding to
     *         a air quality sensor currently online, or a null pointer
     *         if there are no more air quality sensors to enumerate.
     */
    function YAirQuality_nextAirQuality()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAirQuality.FindAirQuality(next_hwid);
    }

    /**
     * Starts the enumeration of air quality sensors currently accessible.
     * Use the method YAirQuality.nextAirQuality() to iterate on
     * next air quality sensors.
     *
     * @return a pointer to a YAirQuality object, corresponding to
     *         the first air quality sensor currently online, or a null pointer
     *         if there are none.
     */
    function YAirQuality_FirstAirQuality()
    {
        var next_hwid = YAPI.getFirstHardwareId('AirQuality');
        if(next_hwid == null) return null;
        return YAirQuality.FindAirQuality(next_hwid);
    }

    //--- (end of YAirQuality implementation)

    //--- (YAirQuality initialization)
    YAirQuality = YSensor._Subclass(_YAirQuality, {
        // Constants
        UBAINDEX_INVALID            : YAPI_INVALID_DOUBLE,
        RELATIVEINDEX_INVALID       : YAPI_INVALID_DOUBLE,
        AQIMODE_RELATIVE            : 0,
        AQIMODE_UBA                 : 1,
        AQIMODE_INVALID             : -1
    }, {
        // Class methods
        FindAirQuality              : YAirQuality_FindAirQuality,
        FirstAirQuality             : YAirQuality_FirstAirQuality
    }, {
        // Methods
        get_ubaIndex                : YAirQuality_get_ubaIndex,
        ubaIndex                    : YAirQuality_get_ubaIndex,
        get_ubaIndex_async          : YAirQuality_get_ubaIndex_async,
        ubaIndex_async              : YAirQuality_get_ubaIndex_async,
        get_relativeIndex           : YAirQuality_get_relativeIndex,
        relativeIndex               : YAirQuality_get_relativeIndex,
        get_relativeIndex_async     : YAirQuality_get_relativeIndex_async,
        relativeIndex_async         : YAirQuality_get_relativeIndex_async,
        get_aqiMode                 : YAirQuality_get_aqiMode,
        aqiMode                     : YAirQuality_get_aqiMode,
        get_aqiMode_async           : YAirQuality_get_aqiMode_async,
        aqiMode_async               : YAirQuality_get_aqiMode_async,
        set_aqiMode                 : YAirQuality_set_aqiMode,
        setAqiMode                  : YAirQuality_set_aqiMode,
        nextAirQuality              : YAirQuality_nextAirQuality,
        _parseAttr                  : YAirQuality_parseAttr
    });
    //--- (end of YAirQuality initialization)
})();

//--- (YAirQuality functions)

/**
 * Retrieves a air quality sensor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the air quality sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YAirQuality.isOnline() to test if the air quality sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a air quality sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the air quality sensor, for instance
 *         MyDevice.airQuality.
 *
 * @return a YAirQuality object allowing you to drive the air quality sensor.
 */
function yFindAirQuality(func)
{
    return YAirQuality.FindAirQuality(func);
}

/**
 * Starts the enumeration of air quality sensors currently accessible.
 * Use the method YAirQuality.nextAirQuality() to iterate on
 * next air quality sensors.
 *
 * @return a pointer to a YAirQuality object, corresponding to
 *         the first air quality sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstAirQuality()
{
    return YAirQuality.FirstAirQuality();
}

//--- (end of YAirQuality functions)
