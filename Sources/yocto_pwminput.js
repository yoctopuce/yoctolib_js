/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for PwmInput functions
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

//--- (YPwmInput return codes)
//--- (end of YPwmInput return codes)
//--- (YPwmInput definitions)
var Y_PWMREPORTMODE_PWM_DUTYCYCLE   = 0;
var Y_PWMREPORTMODE_PWM_FREQUENCY   = 1;
var Y_PWMREPORTMODE_PWM_PULSEDURATION = 2;
var Y_PWMREPORTMODE_PWM_EDGECOUNT   = 3;
var Y_PWMREPORTMODE_PWM_PULSECOUNT  = 4;
var Y_PWMREPORTMODE_PWM_CPS         = 5;
var Y_PWMREPORTMODE_PWM_CPM         = 6;
var Y_PWMREPORTMODE_PWM_STATE       = 7;
var Y_PWMREPORTMODE_PWM_FREQ_CPS    = 8;
var Y_PWMREPORTMODE_PWM_FREQ_CPM    = 9;
var Y_PWMREPORTMODE_PWM_PERIODCOUNT = 10;
var Y_PWMREPORTMODE_INVALID         = -1;
var Y_DUTYCYCLE_INVALID             = YAPI_INVALID_DOUBLE;
var Y_PULSEDURATION_INVALID         = YAPI_INVALID_DOUBLE;
var Y_FREQUENCY_INVALID             = YAPI_INVALID_DOUBLE;
var Y_PERIOD_INVALID                = YAPI_INVALID_DOUBLE;
var Y_PULSECOUNTER_INVALID          = YAPI_INVALID_LONG;
var Y_PULSETIMER_INVALID            = YAPI_INVALID_LONG;
var Y_DEBOUNCEPERIOD_INVALID        = YAPI_INVALID_UINT;
var Y_MINFREQUENCY_INVALID          = YAPI_INVALID_DOUBLE;
var Y_BANDWIDTH_INVALID             = YAPI_INVALID_UINT;
var Y_EDGESPERPERIOD_INVALID        = YAPI_INVALID_UINT;
//--- (end of YPwmInput definitions)

//--- (YPwmInput class start)
/**
 * YPwmInput Class: PWM input control interface, available for instance in the Yocto-PWM-Rx
 *
 * The YPwmInput class allows you to read and configure Yoctopuce PWM inputs.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 * This class adds the ability to configure the signal parameter used to transmit
 * information: the duty cycle, the frequency or the pulse width.
 */
//--- (end of YPwmInput class start)

var YPwmInput; // definition below
(function()
{
    function _YPwmInput(str_func)
    {
        //--- (YPwmInput constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'PwmInput';

        this._dutyCycle                      = Y_DUTYCYCLE_INVALID;        // MeasureVal
        this._pulseDuration                  = Y_PULSEDURATION_INVALID;    // MeasureVal
        this._frequency                      = Y_FREQUENCY_INVALID;        // MeasureVal
        this._period                         = Y_PERIOD_INVALID;           // MeasureVal
        this._pulseCounter                   = Y_PULSECOUNTER_INVALID;     // UInt
        this._pulseTimer                     = Y_PULSETIMER_INVALID;       // Time
        this._pwmReportMode                  = Y_PWMREPORTMODE_INVALID;    // PwmReportModeType
        this._debouncePeriod                 = Y_DEBOUNCEPERIOD_INVALID;   // UInt31
        this._minFrequency                   = Y_MINFREQUENCY_INVALID;     // MeasureVal
        this._bandwidth                      = Y_BANDWIDTH_INVALID;        // UInt31
        this._edgesPerPeriod                 = Y_EDGESPERPERIOD_INVALID;   // UInt31
        //--- (end of YPwmInput constructor)
    }

    //--- (YPwmInput implementation)

    function YPwmInput_parseAttr(name, val, _super)
    {
        switch(name) {
        case "dutyCycle":
            this._dutyCycle = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "pulseDuration":
            this._pulseDuration = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "frequency":
            this._frequency = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "period":
            this._period = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "pulseCounter":
            this._pulseCounter = parseInt(val);
            return 1;
        case "pulseTimer":
            this._pulseTimer = parseInt(val);
            return 1;
        case "pwmReportMode":
            this._pwmReportMode = parseInt(val);
            return 1;
        case "debouncePeriod":
            this._debouncePeriod = parseInt(val);
            return 1;
        case "minFrequency":
            this._minFrequency = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "bandwidth":
            this._bandwidth = parseInt(val);
            return 1;
        case "edgesPerPeriod":
            this._edgesPerPeriod = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the measuring unit for the measured quantity. That unit
     * is just a string which is automatically initialized each time
     * the measurement mode is changed. But is can be set to an
     * arbitrary value.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the measured quantity
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmInput_set_unit(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('unit',rest_val);
    }

    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns YPwmInput.DUTYCYCLE_INVALID.
     */
    function YPwmInput_get_dutyCycle()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DUTYCYCLE_INVALID;
            }
        }
        res = this._dutyCycle;
        return res;
    }

    /**
     * Gets the PWM duty cycle, in per cents.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM duty cycle, in per cents
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmInput.DUTYCYCLE_INVALID.
     */
    function YPwmInput_get_dutyCycle_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DUTYCYCLE_INVALID);
            } else {
                callback(context, obj, obj._dutyCycle);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return a floating point number corresponding to the PWM pulse length in milliseconds, as a
     * floating point number
     *
     * On failure, throws an exception or returns YPwmInput.PULSEDURATION_INVALID.
     */
    function YPwmInput_get_pulseDuration()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULSEDURATION_INVALID;
            }
        }
        res = this._pulseDuration;
        return res;
    }

    /**
     * Gets the PWM pulse length in milliseconds, as a floating point number.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM pulse length in milliseconds, as a
     *         floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmInput.PULSEDURATION_INVALID.
     */
    function YPwmInput_get_pulseDuration_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PULSEDURATION_INVALID);
            } else {
                callback(context, obj, obj._pulseDuration);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YPwmInput.FREQUENCY_INVALID.
     */
    function YPwmInput_get_frequency()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_FREQUENCY_INVALID;
            }
        }
        res = this._frequency;
        return res;
    }

    /**
     * Gets the PWM frequency in Hz.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM frequency in Hz
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmInput.FREQUENCY_INVALID.
     */
    function YPwmInput_get_frequency_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_FREQUENCY_INVALID);
            } else {
                callback(context, obj, obj._frequency);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the PWM period in milliseconds.
     *
     * @return a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns YPwmInput.PERIOD_INVALID.
     */
    function YPwmInput_get_period()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PERIOD_INVALID;
            }
        }
        res = this._period;
        return res;
    }

    /**
     * Gets the PWM period in milliseconds.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM period in milliseconds
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmInput.PERIOD_INVALID.
     */
    function YPwmInput_get_period_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PERIOD_INVALID);
            } else {
                callback(context, obj, obj._period);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the pulse counter value. Actually that
     * counter is incremented twice per period. That counter is
     * limited  to 1 billion.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YPwmInput.PULSECOUNTER_INVALID.
     */
    function YPwmInput_get_pulseCounter()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULSECOUNTER_INVALID;
            }
        }
        res = this._pulseCounter;
        return res;
    }

    /**
     * Gets the pulse counter value. Actually that
     * counter is incremented twice per period. That counter is
     * limited  to 1 billion.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:an integer corresponding to the pulse counter value
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmInput.PULSECOUNTER_INVALID.
     */
    function YPwmInput_get_pulseCounter_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PULSECOUNTER_INVALID);
            } else {
                callback(context, obj, obj._pulseCounter);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YPwmInput_set_pulseCounter(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pulseCounter',rest_val);
    }

    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns YPwmInput.PULSETIMER_INVALID.
     */
    function YPwmInput_get_pulseTimer()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULSETIMER_INVALID;
            }
        }
        res = this._pulseTimer;
        return res;
    }

    /**
     * Gets the timer of the pulses counter (ms).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:an integer corresponding to the timer of the pulses counter (ms)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmInput.PULSETIMER_INVALID.
     */
    function YPwmInput_get_pulseTimer_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PULSETIMER_INVALID);
            } else {
                callback(context, obj, obj._pulseTimer);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the parameter (frequency/duty cycle, pulse width, edges count) returned by the
     * get_currentValue function and callbacks. Attention
     *
     * @return a value among YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE, YPwmInput.PWMREPORTMODE_PWM_FREQUENCY,
     * YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION, YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT,
     * YPwmInput.PWMREPORTMODE_PWM_PULSECOUNT, YPwmInput.PWMREPORTMODE_PWM_CPS,
     * YPwmInput.PWMREPORTMODE_PWM_CPM, YPwmInput.PWMREPORTMODE_PWM_STATE,
     * YPwmInput.PWMREPORTMODE_PWM_FREQ_CPS, YPwmInput.PWMREPORTMODE_PWM_FREQ_CPM and
     * YPwmInput.PWMREPORTMODE_PWM_PERIODCOUNT corresponding to the parameter (frequency/duty cycle, pulse
     * width, edges count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns YPwmInput.PWMREPORTMODE_INVALID.
     */
    function YPwmInput_get_pwmReportMode()
    {
        var res;                    // enumPWMREPORTMODETYPE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PWMREPORTMODE_INVALID;
            }
        }
        res = this._pwmReportMode;
        return res;
    }

    /**
     * Gets the parameter (frequency/duty cycle, pulse width, edges count) returned by the
     * get_currentValue function and callbacks. Attention
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:a value among YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE,
     *         YPwmInput.PWMREPORTMODE_PWM_FREQUENCY, YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION,
     *         YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT, YPwmInput.PWMREPORTMODE_PWM_PULSECOUNT,
     *         YPwmInput.PWMREPORTMODE_PWM_CPS, YPwmInput.PWMREPORTMODE_PWM_CPM,
     *         YPwmInput.PWMREPORTMODE_PWM_STATE, YPwmInput.PWMREPORTMODE_PWM_FREQ_CPS,
     *         YPwmInput.PWMREPORTMODE_PWM_FREQ_CPM and YPwmInput.PWMREPORTMODE_PWM_PERIODCOUNT corresponding to
     *         the parameter (frequency/duty cycle, pulse width, edges count) returned by the get_currentValue
     *         function and callbacks
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmInput.PWMREPORTMODE_INVALID.
     */
    function YPwmInput_get_pwmReportMode_async(callback,context)
    {
        var res;                    // enumPWMREPORTMODETYPE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PWMREPORTMODE_INVALID);
            } else {
                callback(context, obj, obj._pwmReportMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the  parameter  type (frequency/duty cycle, pulse width, or edge count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a value among YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE,
     * YPwmInput.PWMREPORTMODE_PWM_FREQUENCY, YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION,
     * YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT, YPwmInput.PWMREPORTMODE_PWM_PULSECOUNT,
     * YPwmInput.PWMREPORTMODE_PWM_CPS, YPwmInput.PWMREPORTMODE_PWM_CPM,
     * YPwmInput.PWMREPORTMODE_PWM_STATE, YPwmInput.PWMREPORTMODE_PWM_FREQ_CPS,
     * YPwmInput.PWMREPORTMODE_PWM_FREQ_CPM and YPwmInput.PWMREPORTMODE_PWM_PERIODCOUNT corresponding to
     * the  parameter  type (frequency/duty cycle, pulse width, or edge count) returned by the
     * get_currentValue function and callbacks
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmInput_set_pwmReportMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pwmReportMode',rest_val);
    }

    /**
     * Returns the shortest expected pulse duration, in ms. Any shorter pulse will be automatically ignored (debounce).
     *
     * @return an integer corresponding to the shortest expected pulse duration, in ms
     *
     * On failure, throws an exception or returns YPwmInput.DEBOUNCEPERIOD_INVALID.
     */
    function YPwmInput_get_debouncePeriod()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DEBOUNCEPERIOD_INVALID;
            }
        }
        res = this._debouncePeriod;
        return res;
    }

    /**
     * Gets the shortest expected pulse duration, in ms. Any shorter pulse will be automatically ignored (debounce).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:an integer corresponding to the shortest expected pulse duration, in ms
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmInput.DEBOUNCEPERIOD_INVALID.
     */
    function YPwmInput_get_debouncePeriod_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DEBOUNCEPERIOD_INVALID);
            } else {
                callback(context, obj, obj._debouncePeriod);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the shortest expected pulse duration, in ms. Any shorter pulse will be automatically ignored (debounce).
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the shortest expected pulse duration, in ms
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmInput_set_debouncePeriod(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('debouncePeriod',rest_val);
    }

    /**
     * Changes the minimum detected frequency, in Hz. Slower signals will be consider as zero frequency.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the minimum detected frequency, in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmInput_set_minFrequency(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('minFrequency',rest_val);
    }

    /**
     * Returns the minimum detected frequency, in Hz. Slower signals will be consider as zero frequency.
     *
     * @return a floating point number corresponding to the minimum detected frequency, in Hz
     *
     * On failure, throws an exception or returns YPwmInput.MINFREQUENCY_INVALID.
     */
    function YPwmInput_get_minFrequency()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MINFREQUENCY_INVALID;
            }
        }
        res = this._minFrequency;
        return res;
    }

    /**
     * Gets the minimum detected frequency, in Hz. Slower signals will be consider as zero frequency.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:a floating point number corresponding to the minimum detected frequency, in Hz
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmInput.MINFREQUENCY_INVALID.
     */
    function YPwmInput_get_minFrequency_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MINFREQUENCY_INVALID);
            } else {
                callback(context, obj, obj._minFrequency);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the input signal sampling rate, in kHz.
     *
     * @return an integer corresponding to the input signal sampling rate, in kHz
     *
     * On failure, throws an exception or returns YPwmInput.BANDWIDTH_INVALID.
     */
    function YPwmInput_get_bandwidth()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BANDWIDTH_INVALID;
            }
        }
        res = this._bandwidth;
        return res;
    }

    /**
     * Gets the input signal sampling rate, in kHz.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:an integer corresponding to the input signal sampling rate, in kHz
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmInput.BANDWIDTH_INVALID.
     */
    function YPwmInput_get_bandwidth_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BANDWIDTH_INVALID);
            } else {
                callback(context, obj, obj._bandwidth);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the input signal sampling rate, measured in kHz.
     * A lower sampling frequency can be used to hide hide-frequency bounce effects,
     * for instance on electromechanical contacts, but limits the measure resolution.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the input signal sampling rate, measured in kHz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmInput_set_bandwidth(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('bandwidth',rest_val);
    }

    /**
     * Returns the number of edges detected per preiod. For a clean PWM signal, this should be exactly two,
     * but in cas the signal is created by a mechanical contact with bounces, it can get higher.
     *
     * @return an integer corresponding to the number of edges detected per preiod
     *
     * On failure, throws an exception or returns YPwmInput.EDGESPERPERIOD_INVALID.
     */
    function YPwmInput_get_edgesPerPeriod()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_EDGESPERPERIOD_INVALID;
            }
        }
        res = this._edgesPerPeriod;
        return res;
    }

    /**
     * Gets the number of edges detected per preiod. For a clean PWM signal, this should be exactly two,
     * but in cas the signal is created by a mechanical contact with bounces, it can get higher.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:an integer corresponding to the number of edges detected per preiod
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmInput.EDGESPERPERIOD_INVALID.
     */
    function YPwmInput_get_edgesPerPeriod_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_EDGESPERPERIOD_INVALID);
            } else {
                callback(context, obj, obj._edgesPerPeriod);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a PWM input for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the PWM input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmInput.isOnline() to test if the PWM input is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the PWM input, for instance
     *         YPWMRX01.pwmInput1.
     *
     * @return a YPwmInput object allowing you to drive the PWM input.
     */
    function YPwmInput_FindPwmInput(func)                       // class method
    {
        var obj;                    // YPwmInput;
        obj = YFunction._FindFromCache("PwmInput", func);
        if (obj == null) {
            obj = new YPwmInput(func);
            YFunction._AddToCache("PwmInput", func, obj);
        }
        return obj;
    }

    /**
     * Resets the periodicity detection algorithm.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmInput_resetPeriodDetection()
    {
        return this.set_bandwidth(this.get_bandwidth());
    }

    /**
     * Resets the pulse counter value as well as its timer.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmInput_resetCounter()
    {
        return this.set_pulseCounter(0);
    }

    /**
     * Continues the enumeration of PWM inputs started using yFirstPwmInput().
     * Caution: You can't make any assumption about the returned PWM inputs order.
     * If you want to find a specific a PWM input, use PwmInput.findPwmInput()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPwmInput object, corresponding to
     *         a PWM input currently online, or a null pointer
     *         if there are no more PWM inputs to enumerate.
     */
    function YPwmInput_nextPwmInput()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPwmInput.FindPwmInput(next_hwid);
    }

    /**
     * Starts the enumeration of PWM inputs currently accessible.
     * Use the method YPwmInput.nextPwmInput() to iterate on
     * next PWM inputs.
     *
     * @return a pointer to a YPwmInput object, corresponding to
     *         the first PWM input currently online, or a null pointer
     *         if there are none.
     */
    function YPwmInput_FirstPwmInput()
    {
        var next_hwid = YAPI.getFirstHardwareId('PwmInput');
        if(next_hwid == null) return null;
        return YPwmInput.FindPwmInput(next_hwid);
    }

    //--- (end of YPwmInput implementation)

    //--- (YPwmInput initialization)
    YPwmInput = YSensor._Subclass(_YPwmInput, {
        // Constants
        DUTYCYCLE_INVALID           : YAPI_INVALID_DOUBLE,
        PULSEDURATION_INVALID       : YAPI_INVALID_DOUBLE,
        FREQUENCY_INVALID           : YAPI_INVALID_DOUBLE,
        PERIOD_INVALID              : YAPI_INVALID_DOUBLE,
        PULSECOUNTER_INVALID        : YAPI_INVALID_LONG,
        PULSETIMER_INVALID          : YAPI_INVALID_LONG,
        PWMREPORTMODE_PWM_DUTYCYCLE : 0,
        PWMREPORTMODE_PWM_FREQUENCY : 1,
        PWMREPORTMODE_PWM_PULSEDURATION : 2,
        PWMREPORTMODE_PWM_EDGECOUNT : 3,
        PWMREPORTMODE_PWM_PULSECOUNT : 4,
        PWMREPORTMODE_PWM_CPS       : 5,
        PWMREPORTMODE_PWM_CPM       : 6,
        PWMREPORTMODE_PWM_STATE     : 7,
        PWMREPORTMODE_PWM_FREQ_CPS  : 8,
        PWMREPORTMODE_PWM_FREQ_CPM  : 9,
        PWMREPORTMODE_PWM_PERIODCOUNT : 10,
        PWMREPORTMODE_INVALID       : -1,
        DEBOUNCEPERIOD_INVALID      : YAPI_INVALID_UINT,
        MINFREQUENCY_INVALID        : YAPI_INVALID_DOUBLE,
        BANDWIDTH_INVALID           : YAPI_INVALID_UINT,
        EDGESPERPERIOD_INVALID      : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindPwmInput                : YPwmInput_FindPwmInput,
        FirstPwmInput               : YPwmInput_FirstPwmInput
    }, {
        // Methods
        set_unit                    : YPwmInput_set_unit,
        setUnit                     : YPwmInput_set_unit,
        get_dutyCycle               : YPwmInput_get_dutyCycle,
        dutyCycle                   : YPwmInput_get_dutyCycle,
        get_dutyCycle_async         : YPwmInput_get_dutyCycle_async,
        dutyCycle_async             : YPwmInput_get_dutyCycle_async,
        get_pulseDuration           : YPwmInput_get_pulseDuration,
        pulseDuration               : YPwmInput_get_pulseDuration,
        get_pulseDuration_async     : YPwmInput_get_pulseDuration_async,
        pulseDuration_async         : YPwmInput_get_pulseDuration_async,
        get_frequency               : YPwmInput_get_frequency,
        frequency                   : YPwmInput_get_frequency,
        get_frequency_async         : YPwmInput_get_frequency_async,
        frequency_async             : YPwmInput_get_frequency_async,
        get_period                  : YPwmInput_get_period,
        period                      : YPwmInput_get_period,
        get_period_async            : YPwmInput_get_period_async,
        period_async                : YPwmInput_get_period_async,
        get_pulseCounter            : YPwmInput_get_pulseCounter,
        pulseCounter                : YPwmInput_get_pulseCounter,
        get_pulseCounter_async      : YPwmInput_get_pulseCounter_async,
        pulseCounter_async          : YPwmInput_get_pulseCounter_async,
        set_pulseCounter            : YPwmInput_set_pulseCounter,
        setPulseCounter             : YPwmInput_set_pulseCounter,
        get_pulseTimer              : YPwmInput_get_pulseTimer,
        pulseTimer                  : YPwmInput_get_pulseTimer,
        get_pulseTimer_async        : YPwmInput_get_pulseTimer_async,
        pulseTimer_async            : YPwmInput_get_pulseTimer_async,
        get_pwmReportMode           : YPwmInput_get_pwmReportMode,
        pwmReportMode               : YPwmInput_get_pwmReportMode,
        get_pwmReportMode_async     : YPwmInput_get_pwmReportMode_async,
        pwmReportMode_async         : YPwmInput_get_pwmReportMode_async,
        set_pwmReportMode           : YPwmInput_set_pwmReportMode,
        setPwmReportMode            : YPwmInput_set_pwmReportMode,
        get_debouncePeriod          : YPwmInput_get_debouncePeriod,
        debouncePeriod              : YPwmInput_get_debouncePeriod,
        get_debouncePeriod_async    : YPwmInput_get_debouncePeriod_async,
        debouncePeriod_async        : YPwmInput_get_debouncePeriod_async,
        set_debouncePeriod          : YPwmInput_set_debouncePeriod,
        setDebouncePeriod           : YPwmInput_set_debouncePeriod,
        set_minFrequency            : YPwmInput_set_minFrequency,
        setMinFrequency             : YPwmInput_set_minFrequency,
        get_minFrequency            : YPwmInput_get_minFrequency,
        minFrequency                : YPwmInput_get_minFrequency,
        get_minFrequency_async      : YPwmInput_get_minFrequency_async,
        minFrequency_async          : YPwmInput_get_minFrequency_async,
        get_bandwidth               : YPwmInput_get_bandwidth,
        bandwidth                   : YPwmInput_get_bandwidth,
        get_bandwidth_async         : YPwmInput_get_bandwidth_async,
        bandwidth_async             : YPwmInput_get_bandwidth_async,
        set_bandwidth               : YPwmInput_set_bandwidth,
        setBandwidth                : YPwmInput_set_bandwidth,
        get_edgesPerPeriod          : YPwmInput_get_edgesPerPeriod,
        edgesPerPeriod              : YPwmInput_get_edgesPerPeriod,
        get_edgesPerPeriod_async    : YPwmInput_get_edgesPerPeriod_async,
        edgesPerPeriod_async        : YPwmInput_get_edgesPerPeriod_async,
        resetPeriodDetection        : YPwmInput_resetPeriodDetection,
        resetCounter                : YPwmInput_resetCounter,
        nextPwmInput                : YPwmInput_nextPwmInput,
        _parseAttr                  : YPwmInput_parseAttr
    });
    //--- (end of YPwmInput initialization)
})();

//--- (YPwmInput functions)

/**
 * Retrieves a PWM input for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the PWM input is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPwmInput.isOnline() to test if the PWM input is
 * indeed online at a given time. In case of ambiguity when looking for
 * a PWM input by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the PWM input, for instance
 *         YPWMRX01.pwmInput1.
 *
 * @return a YPwmInput object allowing you to drive the PWM input.
 */
function yFindPwmInput(func)
{
    return YPwmInput.FindPwmInput(func);
}

/**
 * Starts the enumeration of PWM inputs currently accessible.
 * Use the method YPwmInput.nextPwmInput() to iterate on
 * next PWM inputs.
 *
 * @return a pointer to a YPwmInput object, corresponding to
 *         the first PWM input currently online, or a null pointer
 *         if there are none.
 */
function yFirstPwmInput()
{
    return YPwmInput.FirstPwmInput();
}

//--- (end of YPwmInput functions)
