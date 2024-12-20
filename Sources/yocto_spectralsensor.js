/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SpectralSensor functions
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

//--- (YSpectralSensor return codes)
//--- (end of YSpectralSensor return codes)
//--- (YSpectralSensor definitions)
var Y_LEDCURRENT_INVALID            = YAPI_INVALID_INT;
var Y_RESOLUTION_INVALID            = YAPI_INVALID_DOUBLE;
var Y_INTEGRATIONTIME_INVALID       = YAPI_INVALID_INT;
var Y_GAIN_INVALID                  = YAPI_INVALID_INT;
var Y_SATURATION_INVALID            = YAPI_INVALID_UINT;
var Y_LEDCURRENTATPOWERON_INVALID   = YAPI_INVALID_INT;
var Y_INTEGRATIONTIMEATPOWERON_INVALID = YAPI_INVALID_INT;
var Y_GAINATPOWERON_INVALID         = YAPI_INVALID_INT;
//--- (end of YSpectralSensor definitions)

//--- (YSpectralSensor class start)
/**
 * YSpectralSensor Class: spectral sensor control interface
 *
 * The YSpectralSensor class allows you to read and configure Yoctopuce spectral sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSpectralSensor class start)

var YSpectralSensor; // definition below
(function()
{
    function _YSpectralSensor(str_func)
    {
        //--- (YSpectralSensor constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'SpectralSensor';

        this._ledCurrent                     = Y_LEDCURRENT_INVALID;       // Int
        this._resolution                     = Y_RESOLUTION_INVALID;       // MeasureVal
        this._integrationTime                = Y_INTEGRATIONTIME_INVALID;  // Int
        this._gain                           = Y_GAIN_INVALID;             // Int
        this._saturation                     = Y_SATURATION_INVALID;       // SaturationBits
        this._ledCurrentAtPowerOn            = Y_LEDCURRENTATPOWERON_INVALID; // Int
        this._integrationTimeAtPowerOn       = Y_INTEGRATIONTIMEATPOWERON_INVALID; // Int
        this._gainAtPowerOn                  = Y_GAINATPOWERON_INVALID;    // Int
        //--- (end of YSpectralSensor constructor)
    }

    //--- (YSpectralSensor implementation)

    function YSpectralSensor_parseAttr(name, val, _super)
    {
        switch(name) {
        case "ledCurrent":
            this._ledCurrent = parseInt(val);
            return 1;
        case "resolution":
            this._resolution = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "integrationTime":
            this._integrationTime = parseInt(val);
            return 1;
        case "gain":
            this._gain = parseInt(val);
            return 1;
        case "saturation":
            this._saturation = parseInt(val);
            return 1;
        case "ledCurrentAtPowerOn":
            this._ledCurrentAtPowerOn = parseInt(val);
            return 1;
        case "integrationTimeAtPowerOn":
            this._integrationTimeAtPowerOn = parseInt(val);
            return 1;
        case "gainAtPowerOn":
            this._gainAtPowerOn = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.LEDCURRENT_INVALID.
     */
    function YSpectralSensor_get_ledCurrent()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LEDCURRENT_INVALID;
            }
        }
        res = this._ledCurrent;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpectralSensor object that invoked the callback
     *         - the result:an integer
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSpectralSensor.LEDCURRENT_INVALID.
     */
    function YSpectralSensor_get_ledCurrent_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LEDCURRENT_INVALID);
            } else {
                callback(context, obj, obj._ledCurrent);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the luminosity of the module leds. The parameter is a
     * value between 0 and 100.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the luminosity of the module leds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpectralSensor_set_ledCurrent(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('ledCurrent',rest_val);
    }

    /**
     * Changes the resolution of the measured physical values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the resolution of the measured physical values
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpectralSensor_set_resolution(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('resolution',rest_val);
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return a floating point number corresponding to the resolution of the measured values
     *
     * On failure, throws an exception or returns YSpectralSensor.RESOLUTION_INVALID.
     */
    function YSpectralSensor_get_resolution()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RESOLUTION_INVALID;
            }
        }
        res = this._resolution;
        return res;
    }

    /**
     * Gets the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpectralSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the resolution of the measured values
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSpectralSensor.RESOLUTION_INVALID.
     */
    function YSpectralSensor_get_resolution_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RESOLUTION_INVALID);
            } else {
                callback(context, obj, obj._resolution);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.INTEGRATIONTIME_INVALID.
     */
    function YSpectralSensor_get_integrationTime()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_INTEGRATIONTIME_INVALID;
            }
        }
        res = this._integrationTime;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpectralSensor object that invoked the callback
     *         - the result:an integer
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSpectralSensor.INTEGRATIONTIME_INVALID.
     */
    function YSpectralSensor_get_integrationTime_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_INTEGRATIONTIME_INVALID);
            } else {
                callback(context, obj, obj._integrationTime);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Change the integration time for a measure. The parameter is a
     * value between 0 and 100.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpectralSensor_set_integrationTime(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('integrationTime',rest_val);
    }

    /**
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.GAIN_INVALID.
     */
    function YSpectralSensor_get_gain()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_GAIN_INVALID;
            }
        }
        res = this._gain;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpectralSensor object that invoked the callback
     *         - the result:an integer
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSpectralSensor.GAIN_INVALID.
     */
    function YSpectralSensor_get_gain_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_GAIN_INVALID);
            } else {
                callback(context, obj, obj._gain);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpectralSensor_set_gain(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('gain',rest_val);
    }

    /**
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.SATURATION_INVALID.
     */
    function YSpectralSensor_get_saturation()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SATURATION_INVALID;
            }
        }
        res = this._saturation;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpectralSensor object that invoked the callback
     *         - the result:an integer
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSpectralSensor.SATURATION_INVALID.
     */
    function YSpectralSensor_get_saturation_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SATURATION_INVALID);
            } else {
                callback(context, obj, obj._saturation);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.LEDCURRENTATPOWERON_INVALID.
     */
    function YSpectralSensor_get_ledCurrentAtPowerOn()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LEDCURRENTATPOWERON_INVALID;
            }
        }
        res = this._ledCurrentAtPowerOn;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpectralSensor object that invoked the callback
     *         - the result:an integer
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSpectralSensor.LEDCURRENTATPOWERON_INVALID.
     */
    function YSpectralSensor_get_ledCurrentAtPowerOn_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LEDCURRENTATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._ledCurrentAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpectralSensor_set_ledCurrentAtPowerOn(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('ledCurrentAtPowerOn',rest_val);
    }

    /**
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.INTEGRATIONTIMEATPOWERON_INVALID.
     */
    function YSpectralSensor_get_integrationTimeAtPowerOn()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_INTEGRATIONTIMEATPOWERON_INVALID;
            }
        }
        res = this._integrationTimeAtPowerOn;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpectralSensor object that invoked the callback
     *         - the result:an integer
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSpectralSensor.INTEGRATIONTIMEATPOWERON_INVALID.
     */
    function YSpectralSensor_get_integrationTimeAtPowerOn_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_INTEGRATIONTIMEATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._integrationTimeAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpectralSensor_set_integrationTimeAtPowerOn(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('integrationTimeAtPowerOn',rest_val);
    }

    /**
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralSensor.GAINATPOWERON_INVALID.
     */
    function YSpectralSensor_get_gainAtPowerOn()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_GAINATPOWERON_INVALID;
            }
        }
        res = this._gainAtPowerOn;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpectralSensor object that invoked the callback
     *         - the result:an integer
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSpectralSensor.GAINATPOWERON_INVALID.
     */
    function YSpectralSensor_get_gainAtPowerOn_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_GAINATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._gainAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpectralSensor_set_gainAtPowerOn(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('gainAtPowerOn',rest_val);
    }

    /**
     * Retrieves a spectral sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralSensor.isOnline() to test if the spectral sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the spectral sensor, for instance
     *         MyDevice.spectralSensor.
     *
     * @return a YSpectralSensor object allowing you to drive the spectral sensor.
     */
    function YSpectralSensor_FindSpectralSensor(func)           // class method
    {
        var obj;                    // YSpectralSensor;
        obj = YFunction._FindFromCache("SpectralSensor", func);
        if (obj == null) {
            obj = new YSpectralSensor(func);
            YFunction._AddToCache("SpectralSensor", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of spectral sensors started using yFirstSpectralSensor().
     * Caution: You can't make any assumption about the returned spectral sensors order.
     * If you want to find a specific a spectral sensor, use SpectralSensor.findSpectralSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSpectralSensor object, corresponding to
     *         a spectral sensor currently online, or a null pointer
     *         if there are no more spectral sensors to enumerate.
     */
    function YSpectralSensor_nextSpectralSensor()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSpectralSensor.FindSpectralSensor(next_hwid);
    }

    /**
     * Starts the enumeration of spectral sensors currently accessible.
     * Use the method YSpectralSensor.nextSpectralSensor() to iterate on
     * next spectral sensors.
     *
     * @return a pointer to a YSpectralSensor object, corresponding to
     *         the first spectral sensor currently online, or a null pointer
     *         if there are none.
     */
    function YSpectralSensor_FirstSpectralSensor()
    {
        var next_hwid = YAPI.getFirstHardwareId('SpectralSensor');
        if(next_hwid == null) return null;
        return YSpectralSensor.FindSpectralSensor(next_hwid);
    }

    //--- (end of YSpectralSensor implementation)

    //--- (YSpectralSensor initialization)
    YSpectralSensor = YFunction._Subclass(_YSpectralSensor, {
        // Constants
        LEDCURRENT_INVALID          : YAPI_INVALID_INT,
        RESOLUTION_INVALID          : YAPI_INVALID_DOUBLE,
        INTEGRATIONTIME_INVALID     : YAPI_INVALID_INT,
        GAIN_INVALID                : YAPI_INVALID_INT,
        SATURATION_INVALID          : YAPI_INVALID_UINT,
        LEDCURRENTATPOWERON_INVALID : YAPI_INVALID_INT,
        INTEGRATIONTIMEATPOWERON_INVALID : YAPI_INVALID_INT,
        GAINATPOWERON_INVALID       : YAPI_INVALID_INT
    }, {
        // Class methods
        FindSpectralSensor          : YSpectralSensor_FindSpectralSensor,
        FirstSpectralSensor         : YSpectralSensor_FirstSpectralSensor
    }, {
        // Methods
        get_ledCurrent              : YSpectralSensor_get_ledCurrent,
        ledCurrent                  : YSpectralSensor_get_ledCurrent,
        get_ledCurrent_async        : YSpectralSensor_get_ledCurrent_async,
        ledCurrent_async            : YSpectralSensor_get_ledCurrent_async,
        set_ledCurrent              : YSpectralSensor_set_ledCurrent,
        setLedCurrent               : YSpectralSensor_set_ledCurrent,
        set_resolution              : YSpectralSensor_set_resolution,
        setResolution               : YSpectralSensor_set_resolution,
        get_resolution              : YSpectralSensor_get_resolution,
        resolution                  : YSpectralSensor_get_resolution,
        get_resolution_async        : YSpectralSensor_get_resolution_async,
        resolution_async            : YSpectralSensor_get_resolution_async,
        get_integrationTime         : YSpectralSensor_get_integrationTime,
        integrationTime             : YSpectralSensor_get_integrationTime,
        get_integrationTime_async   : YSpectralSensor_get_integrationTime_async,
        integrationTime_async       : YSpectralSensor_get_integrationTime_async,
        set_integrationTime         : YSpectralSensor_set_integrationTime,
        setIntegrationTime          : YSpectralSensor_set_integrationTime,
        get_gain                    : YSpectralSensor_get_gain,
        gain                        : YSpectralSensor_get_gain,
        get_gain_async              : YSpectralSensor_get_gain_async,
        gain_async                  : YSpectralSensor_get_gain_async,
        set_gain                    : YSpectralSensor_set_gain,
        setGain                     : YSpectralSensor_set_gain,
        get_saturation              : YSpectralSensor_get_saturation,
        saturation                  : YSpectralSensor_get_saturation,
        get_saturation_async        : YSpectralSensor_get_saturation_async,
        saturation_async            : YSpectralSensor_get_saturation_async,
        get_ledCurrentAtPowerOn     : YSpectralSensor_get_ledCurrentAtPowerOn,
        ledCurrentAtPowerOn         : YSpectralSensor_get_ledCurrentAtPowerOn,
        get_ledCurrentAtPowerOn_async : YSpectralSensor_get_ledCurrentAtPowerOn_async,
        ledCurrentAtPowerOn_async   : YSpectralSensor_get_ledCurrentAtPowerOn_async,
        set_ledCurrentAtPowerOn     : YSpectralSensor_set_ledCurrentAtPowerOn,
        setLedCurrentAtPowerOn      : YSpectralSensor_set_ledCurrentAtPowerOn,
        get_integrationTimeAtPowerOn : YSpectralSensor_get_integrationTimeAtPowerOn,
        integrationTimeAtPowerOn    : YSpectralSensor_get_integrationTimeAtPowerOn,
        get_integrationTimeAtPowerOn_async : YSpectralSensor_get_integrationTimeAtPowerOn_async,
        integrationTimeAtPowerOn_async : YSpectralSensor_get_integrationTimeAtPowerOn_async,
        set_integrationTimeAtPowerOn : YSpectralSensor_set_integrationTimeAtPowerOn,
        setIntegrationTimeAtPowerOn : YSpectralSensor_set_integrationTimeAtPowerOn,
        get_gainAtPowerOn           : YSpectralSensor_get_gainAtPowerOn,
        gainAtPowerOn               : YSpectralSensor_get_gainAtPowerOn,
        get_gainAtPowerOn_async     : YSpectralSensor_get_gainAtPowerOn_async,
        gainAtPowerOn_async         : YSpectralSensor_get_gainAtPowerOn_async,
        set_gainAtPowerOn           : YSpectralSensor_set_gainAtPowerOn,
        setGainAtPowerOn            : YSpectralSensor_set_gainAtPowerOn,
        nextSpectralSensor          : YSpectralSensor_nextSpectralSensor,
        _parseAttr                  : YSpectralSensor_parseAttr
    });
    //--- (end of YSpectralSensor initialization)
})();

//--- (YSpectralSensor functions)

/**
 * Retrieves a spectral sensor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the spectral sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSpectralSensor.isOnline() to test if the spectral sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a spectral sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the spectral sensor, for instance
 *         MyDevice.spectralSensor.
 *
 * @return a YSpectralSensor object allowing you to drive the spectral sensor.
 */
function yFindSpectralSensor(func)
{
    return YSpectralSensor.FindSpectralSensor(func);
}

/**
 * Starts the enumeration of spectral sensors currently accessible.
 * Use the method YSpectralSensor.nextSpectralSensor() to iterate on
 * next spectral sensors.
 *
 * @return a pointer to a YSpectralSensor object, corresponding to
 *         the first spectral sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstSpectralSensor()
{
    return YSpectralSensor.FirstSpectralSensor();
}

//--- (end of YSpectralSensor functions)
