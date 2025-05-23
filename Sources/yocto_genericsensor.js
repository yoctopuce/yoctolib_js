/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for GenericSensor functions
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

//--- (YGenericSensor return codes)
//--- (end of YGenericSensor return codes)
//--- (YGenericSensor definitions)
var Y_SIGNALSAMPLING_HIGH_RATE      = 0;
var Y_SIGNALSAMPLING_HIGH_RATE_FILTERED = 1;
var Y_SIGNALSAMPLING_LOW_NOISE      = 2;
var Y_SIGNALSAMPLING_LOW_NOISE_FILTERED = 3;
var Y_SIGNALSAMPLING_HIGHEST_RATE   = 4;
var Y_SIGNALSAMPLING_AC             = 5;
var Y_SIGNALSAMPLING_INVALID        = -1;
var Y_ENABLED_FALSE                 = 0;
var Y_ENABLED_TRUE                  = 1;
var Y_ENABLED_INVALID               = -1;
var Y_SIGNALVALUE_INVALID           = YAPI_INVALID_DOUBLE;
var Y_SIGNALUNIT_INVALID            = YAPI_INVALID_STRING;
var Y_SIGNALRANGE_INVALID           = YAPI_INVALID_STRING;
var Y_VALUERANGE_INVALID            = YAPI_INVALID_STRING;
var Y_SIGNALBIAS_INVALID            = YAPI_INVALID_DOUBLE;
//--- (end of YGenericSensor definitions)

//--- (YGenericSensor class start)
/**
 * YGenericSensor Class: GenericSensor control interface, available for instance in the
 * Yocto-0-10V-Rx, the Yocto-4-20mA-Rx, the Yocto-Bridge or the Yocto-milliVolt-Rx
 *
 * The YGenericSensor class allows you to read and configure Yoctopuce signal
 * transducers. It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, to access the autonomous datalogger.
 * This class adds the ability to configure the automatic conversion between the
 * measured signal and the corresponding engineering unit.
 */
//--- (end of YGenericSensor class start)

var YGenericSensor; // definition below
(function()
{
    function _YGenericSensor(str_func)
    {
        //--- (YGenericSensor constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'GenericSensor';

        this._signalValue                    = Y_SIGNALVALUE_INVALID;      // MeasureVal
        this._signalUnit                     = Y_SIGNALUNIT_INVALID;       // Text
        this._signalRange                    = Y_SIGNALRANGE_INVALID;      // ValueRange
        this._valueRange                     = Y_VALUERANGE_INVALID;       // ValueRange
        this._signalBias                     = Y_SIGNALBIAS_INVALID;       // MeasureVal
        this._signalSampling                 = Y_SIGNALSAMPLING_INVALID;   // SignalSampling
        this._enabled                        = Y_ENABLED_INVALID;          // Bool
        //--- (end of YGenericSensor constructor)
    }

    //--- (YGenericSensor implementation)

    function YGenericSensor_parseAttr(name, val, _super)
    {
        switch(name) {
        case "signalValue":
            this._signalValue = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "signalUnit":
            this._signalUnit = val;
            return 1;
        case "signalRange":
            this._signalRange = val;
            return 1;
        case "valueRange":
            this._valueRange = val;
            return 1;
        case "signalBias":
            this._signalBias = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "signalSampling":
            this._signalSampling = parseInt(val);
            return 1;
        case "enabled":
            this._enabled = parseInt(val);
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
    function YGenericSensor_set_unit(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('unit',rest_val);
    }

    /**
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return a floating point number corresponding to the current value of the electrical signal
     * measured by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALVALUE_INVALID.
     */
    function YGenericSensor_get_signalValue()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SIGNALVALUE_INVALID;
            }
        }
        res = Math.round(this._signalValue * 1000) / 1000;
        return res;
    }

    /**
     * Gets the current value of the electrical signal measured by the sensor.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGenericSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the current value of the electrical signal
     *         measured by the sensor
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALVALUE_INVALID.
     */
    function YGenericSensor_get_signalValue_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SIGNALVALUE_INVALID);
            } else {
                callback(context, obj, Math.round(obj._signalValue * 1000) / 1000);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     *
     * @return a string corresponding to the measuring unit of the electrical signal used by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALUNIT_INVALID.
     */
    function YGenericSensor_get_signalUnit()
    {
        var res;                    // string;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SIGNALUNIT_INVALID;
            }
        }
        res = this._signalUnit;
        return res;
    }

    /**
     * Gets the measuring unit of the electrical signal used by the sensor.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGenericSensor object that invoked the callback
     *         - the result:a string corresponding to the measuring unit of the electrical signal used by the sensor
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALUNIT_INVALID.
     */
    function YGenericSensor_get_signalUnit_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SIGNALUNIT_INVALID);
            } else {
                callback(context, obj, obj._signalUnit);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the input signal range used by the sensor.
     *
     * @return a string corresponding to the input signal range used by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALRANGE_INVALID.
     */
    function YGenericSensor_get_signalRange()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SIGNALRANGE_INVALID;
            }
        }
        res = this._signalRange;
        return res;
    }

    /**
     * Gets the input signal range used by the sensor.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGenericSensor object that invoked the callback
     *         - the result:a string corresponding to the input signal range used by the sensor
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALRANGE_INVALID.
     */
    function YGenericSensor_get_signalRange_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SIGNALRANGE_INVALID);
            } else {
                callback(context, obj, obj._signalRange);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the input signal range used by the sensor.
     * When the input signal gets out of the planned range, the output value
     * will be set to an arbitrary large value, whose sign indicates the direction
     * of the range overrun.
     *
     * For a 4-20mA sensor, the default input signal range is "4...20".
     * For a 0-10V sensor, the default input signal range is "0.1...10".
     * For numeric communication interfaces, the default input signal range is
     * "-999999.999...999999.999".
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the input signal range used by the sensor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YGenericSensor_set_signalRange(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('signalRange',rest_val);
    }

    /**
     * Returns the physical value range measured by the sensor.
     *
     * @return a string corresponding to the physical value range measured by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.VALUERANGE_INVALID.
     */
    function YGenericSensor_get_valueRange()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VALUERANGE_INVALID;
            }
        }
        res = this._valueRange;
        return res;
    }

    /**
     * Gets the physical value range measured by the sensor.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGenericSensor object that invoked the callback
     *         - the result:a string corresponding to the physical value range measured by the sensor
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGenericSensor.VALUERANGE_INVALID.
     */
    function YGenericSensor_get_valueRange_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VALUERANGE_INVALID);
            } else {
                callback(context, obj, obj._valueRange);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the output value range, corresponding to the physical value measured
     * by the sensor. The default output value range is the same as the input signal
     * range (1:1 mapping), but you can change it so that the function automatically
     * computes the physical value encoded by the input signal. Be aware that, as a
     * side effect, the range modification may automatically modify the display resolution.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the output value range, corresponding to the physical value measured
     *         by the sensor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YGenericSensor_set_valueRange(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('valueRange',rest_val);
    }

    /**
     * Changes the electric signal bias for zero shift adjustment.
     * If your electric signal reads positive when it should be zero, set up
     * a positive signalBias of the same value to fix the zero shift.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the electric signal bias for zero shift adjustment
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YGenericSensor_set_signalBias(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('signalBias',rest_val);
    }

    /**
     * Returns the electric signal bias for zero shift adjustment.
     * A positive bias means that the signal is over-reporting the measure,
     * while a negative bias means that the signal is under-reporting the measure.
     *
     * @return a floating point number corresponding to the electric signal bias for zero shift adjustment
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALBIAS_INVALID.
     */
    function YGenericSensor_get_signalBias()
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
     * Gets the electric signal bias for zero shift adjustment.
     * A positive bias means that the signal is over-reporting the measure,
     * while a negative bias means that the signal is under-reporting the measure.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGenericSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the electric signal bias for zero shift adjustment
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALBIAS_INVALID.
     */
    function YGenericSensor_get_signalBias_async(callback,context)
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
     * Returns the electric signal sampling method to use.
     * The HIGH_RATE method uses the highest sampling frequency, without any filtering.
     * The HIGH_RATE_FILTERED method adds a windowed 7-sample median filter.
     * The LOW_NOISE method uses a reduced acquisition frequency to reduce noise.
     * The LOW_NOISE_FILTERED method combines a reduced frequency with the median filter
     * to get measures as stable as possible when working on a noisy signal.
     *
     * @return a value among YGenericSensor.SIGNALSAMPLING_HIGH_RATE,
     * YGenericSensor.SIGNALSAMPLING_HIGH_RATE_FILTERED, YGenericSensor.SIGNALSAMPLING_LOW_NOISE,
     * YGenericSensor.SIGNALSAMPLING_LOW_NOISE_FILTERED, YGenericSensor.SIGNALSAMPLING_HIGHEST_RATE and
     * YGenericSensor.SIGNALSAMPLING_AC corresponding to the electric signal sampling method to use
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALSAMPLING_INVALID.
     */
    function YGenericSensor_get_signalSampling()
    {
        var res;                    // enumSIGNALSAMPLING;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SIGNALSAMPLING_INVALID;
            }
        }
        res = this._signalSampling;
        return res;
    }

    /**
     * Gets the electric signal sampling method to use.
     * The HIGH_RATE method uses the highest sampling frequency, without any filtering.
     * The HIGH_RATE_FILTERED method adds a windowed 7-sample median filter.
     * The LOW_NOISE method uses a reduced acquisition frequency to reduce noise.
     * The LOW_NOISE_FILTERED method combines a reduced frequency with the median filter
     * to get measures as stable as possible when working on a noisy signal.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGenericSensor object that invoked the callback
     *         - the result:a value among YGenericSensor.SIGNALSAMPLING_HIGH_RATE,
     *         YGenericSensor.SIGNALSAMPLING_HIGH_RATE_FILTERED, YGenericSensor.SIGNALSAMPLING_LOW_NOISE,
     *         YGenericSensor.SIGNALSAMPLING_LOW_NOISE_FILTERED, YGenericSensor.SIGNALSAMPLING_HIGHEST_RATE and
     *         YGenericSensor.SIGNALSAMPLING_AC corresponding to the electric signal sampling method to use
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALSAMPLING_INVALID.
     */
    function YGenericSensor_get_signalSampling_async(callback,context)
    {
        var res;                    // enumSIGNALSAMPLING;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SIGNALSAMPLING_INVALID);
            } else {
                callback(context, obj, obj._signalSampling);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the electric signal sampling method to use.
     * The HIGH_RATE method uses the highest sampling frequency, without any filtering.
     * The HIGH_RATE_FILTERED method adds a windowed 7-sample median filter.
     * The LOW_NOISE method uses a reduced acquisition frequency to reduce noise.
     * The LOW_NOISE_FILTERED method combines a reduced frequency with the median filter
     * to get measures as stable as possible when working on a noisy signal.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a value among YGenericSensor.SIGNALSAMPLING_HIGH_RATE,
     * YGenericSensor.SIGNALSAMPLING_HIGH_RATE_FILTERED, YGenericSensor.SIGNALSAMPLING_LOW_NOISE,
     * YGenericSensor.SIGNALSAMPLING_LOW_NOISE_FILTERED, YGenericSensor.SIGNALSAMPLING_HIGHEST_RATE and
     * YGenericSensor.SIGNALSAMPLING_AC corresponding to the electric signal sampling method to use
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YGenericSensor_set_signalSampling(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('signalSampling',rest_val);
    }

    /**
     * Returns the activation state of this input.
     *
     * @return either YGenericSensor.ENABLED_FALSE or YGenericSensor.ENABLED_TRUE, according to the
     * activation state of this input
     *
     * On failure, throws an exception or returns YGenericSensor.ENABLED_INVALID.
     */
    function YGenericSensor_get_enabled()
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
     *         - the YGenericSensor object that invoked the callback
     *         - the result:either YGenericSensor.ENABLED_FALSE or YGenericSensor.ENABLED_TRUE, according to the
     *         activation state of this input
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGenericSensor.ENABLED_INVALID.
     */
    function YGenericSensor_get_enabled_async(callback,context)
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
     * Changes the activation state of this input. When an input is disabled,
     * its value is no more updated. On some devices, disabling an input can
     * improve the refresh rate of the other active inputs.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either YGenericSensor.ENABLED_FALSE or YGenericSensor.ENABLED_TRUE, according to
     * the activation state of this input
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YGenericSensor_set_enabled(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabled',rest_val);
    }

    /**
     * Retrieves a generic sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the generic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGenericSensor.isOnline() to test if the generic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a generic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the generic sensor, for instance
     *         RX010V01.genericSensor1.
     *
     * @return a YGenericSensor object allowing you to drive the generic sensor.
     */
    function YGenericSensor_FindGenericSensor(func)             // class method
    {
        var obj;                    // YGenericSensor;
        obj = YFunction._FindFromCache("GenericSensor", func);
        if (obj == null) {
            obj = new YGenericSensor(func);
            YFunction._AddToCache("GenericSensor", func, obj);
        }
        return obj;
    }

    /**
     * Adjusts the signal bias so that the current signal value is need
     * precisely as zero. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YGenericSensor_zeroAdjust()
    {
        var currSignal;             // float;
        var currBias;               // float;
        currSignal = this.get_signalValue();
        currBias = this.get_signalBias();
        return this.set_signalBias(currSignal + currBias);
    }

    /**
     * Continues the enumeration of generic sensors started using yFirstGenericSensor().
     * Caution: You can't make any assumption about the returned generic sensors order.
     * If you want to find a specific a generic sensor, use GenericSensor.findGenericSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YGenericSensor object, corresponding to
     *         a generic sensor currently online, or a null pointer
     *         if there are no more generic sensors to enumerate.
     */
    function YGenericSensor_nextGenericSensor()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YGenericSensor.FindGenericSensor(next_hwid);
    }

    /**
     * Starts the enumeration of generic sensors currently accessible.
     * Use the method YGenericSensor.nextGenericSensor() to iterate on
     * next generic sensors.
     *
     * @return a pointer to a YGenericSensor object, corresponding to
     *         the first generic sensor currently online, or a null pointer
     *         if there are none.
     */
    function YGenericSensor_FirstGenericSensor()
    {
        var next_hwid = YAPI.getFirstHardwareId('GenericSensor');
        if(next_hwid == null) return null;
        return YGenericSensor.FindGenericSensor(next_hwid);
    }

    //--- (end of YGenericSensor implementation)

    //--- (YGenericSensor initialization)
    YGenericSensor = YSensor._Subclass(_YGenericSensor, {
        // Constants
        SIGNALVALUE_INVALID         : YAPI_INVALID_DOUBLE,
        SIGNALUNIT_INVALID          : YAPI_INVALID_STRING,
        SIGNALRANGE_INVALID         : YAPI_INVALID_STRING,
        VALUERANGE_INVALID          : YAPI_INVALID_STRING,
        SIGNALBIAS_INVALID          : YAPI_INVALID_DOUBLE,
        SIGNALSAMPLING_HIGH_RATE    : 0,
        SIGNALSAMPLING_HIGH_RATE_FILTERED : 1,
        SIGNALSAMPLING_LOW_NOISE    : 2,
        SIGNALSAMPLING_LOW_NOISE_FILTERED : 3,
        SIGNALSAMPLING_HIGHEST_RATE : 4,
        SIGNALSAMPLING_AC           : 5,
        SIGNALSAMPLING_INVALID      : -1,
        ENABLED_FALSE               : 0,
        ENABLED_TRUE                : 1,
        ENABLED_INVALID             : -1
    }, {
        // Class methods
        FindGenericSensor           : YGenericSensor_FindGenericSensor,
        FirstGenericSensor          : YGenericSensor_FirstGenericSensor
    }, {
        // Methods
        set_unit                    : YGenericSensor_set_unit,
        setUnit                     : YGenericSensor_set_unit,
        get_signalValue             : YGenericSensor_get_signalValue,
        signalValue                 : YGenericSensor_get_signalValue,
        get_signalValue_async       : YGenericSensor_get_signalValue_async,
        signalValue_async           : YGenericSensor_get_signalValue_async,
        get_signalUnit              : YGenericSensor_get_signalUnit,
        signalUnit                  : YGenericSensor_get_signalUnit,
        get_signalUnit_async        : YGenericSensor_get_signalUnit_async,
        signalUnit_async            : YGenericSensor_get_signalUnit_async,
        get_signalRange             : YGenericSensor_get_signalRange,
        signalRange                 : YGenericSensor_get_signalRange,
        get_signalRange_async       : YGenericSensor_get_signalRange_async,
        signalRange_async           : YGenericSensor_get_signalRange_async,
        set_signalRange             : YGenericSensor_set_signalRange,
        setSignalRange              : YGenericSensor_set_signalRange,
        get_valueRange              : YGenericSensor_get_valueRange,
        valueRange                  : YGenericSensor_get_valueRange,
        get_valueRange_async        : YGenericSensor_get_valueRange_async,
        valueRange_async            : YGenericSensor_get_valueRange_async,
        set_valueRange              : YGenericSensor_set_valueRange,
        setValueRange               : YGenericSensor_set_valueRange,
        set_signalBias              : YGenericSensor_set_signalBias,
        setSignalBias               : YGenericSensor_set_signalBias,
        get_signalBias              : YGenericSensor_get_signalBias,
        signalBias                  : YGenericSensor_get_signalBias,
        get_signalBias_async        : YGenericSensor_get_signalBias_async,
        signalBias_async            : YGenericSensor_get_signalBias_async,
        get_signalSampling          : YGenericSensor_get_signalSampling,
        signalSampling              : YGenericSensor_get_signalSampling,
        get_signalSampling_async    : YGenericSensor_get_signalSampling_async,
        signalSampling_async        : YGenericSensor_get_signalSampling_async,
        set_signalSampling          : YGenericSensor_set_signalSampling,
        setSignalSampling           : YGenericSensor_set_signalSampling,
        get_enabled                 : YGenericSensor_get_enabled,
        enabled                     : YGenericSensor_get_enabled,
        get_enabled_async           : YGenericSensor_get_enabled_async,
        enabled_async               : YGenericSensor_get_enabled_async,
        set_enabled                 : YGenericSensor_set_enabled,
        setEnabled                  : YGenericSensor_set_enabled,
        zeroAdjust                  : YGenericSensor_zeroAdjust,
        nextGenericSensor           : YGenericSensor_nextGenericSensor,
        _parseAttr                  : YGenericSensor_parseAttr
    });
    //--- (end of YGenericSensor initialization)
})();

//--- (YGenericSensor functions)

/**
 * Retrieves a generic sensor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the generic sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YGenericSensor.isOnline() to test if the generic sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a generic sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the generic sensor, for instance
 *         RX010V01.genericSensor1.
 *
 * @return a YGenericSensor object allowing you to drive the generic sensor.
 */
function yFindGenericSensor(func)
{
    return YGenericSensor.FindGenericSensor(func);
}

/**
 * Starts the enumeration of generic sensors currently accessible.
 * Use the method YGenericSensor.nextGenericSensor() to iterate on
 * next generic sensors.
 *
 * @return a pointer to a YGenericSensor object, corresponding to
 *         the first generic sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstGenericSensor()
{
    return YGenericSensor.FirstGenericSensor();
}

//--- (end of YGenericSensor functions)
