/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for PwmOutput functions
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

//--- (YPwmOutput return codes)
//--- (end of YPwmOutput return codes)
//--- (YPwmOutput definitions)
var Y_ENABLED_FALSE                 = 0;
var Y_ENABLED_TRUE                  = 1;
var Y_ENABLED_INVALID               = -1;
var Y_INVERTEDOUTPUT_FALSE          = 0;
var Y_INVERTEDOUTPUT_TRUE           = 1;
var Y_INVERTEDOUTPUT_INVALID        = -1;
var Y_ENABLEDATPOWERON_FALSE        = 0;
var Y_ENABLEDATPOWERON_TRUE         = 1;
var Y_ENABLEDATPOWERON_INVALID      = -1;
var Y_FREQUENCY_INVALID             = YAPI_INVALID_DOUBLE;
var Y_PERIOD_INVALID                = YAPI_INVALID_DOUBLE;
var Y_DUTYCYCLE_INVALID             = YAPI_INVALID_DOUBLE;
var Y_PULSEDURATION_INVALID         = YAPI_INVALID_DOUBLE;
var Y_PWMTRANSITION_INVALID         = YAPI_INVALID_STRING;
var Y_DUTYCYCLEATPOWERON_INVALID    = YAPI_INVALID_DOUBLE;
//--- (end of YPwmOutput definitions)

//--- (YPwmOutput class start)
/**
 * YPwmOutput Class: PWM generator control interface, available for instance in the Yocto-PWM-Tx
 *
 * The YPwmOutput class allows you to drive a pulse-width modulated output (PWM).
 * You can configure the frequency as well as the duty cycle, and set up progressive
 * transitions.
 */
//--- (end of YPwmOutput class start)

var YPwmOutput; // definition below
(function()
{
    function _YPwmOutput(str_func)
    {
        //--- (YPwmOutput constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'PwmOutput';

        this._enabled                        = Y_ENABLED_INVALID;          // Bool
        this._frequency                      = Y_FREQUENCY_INVALID;        // MeasureVal
        this._period                         = Y_PERIOD_INVALID;           // MeasureVal
        this._dutyCycle                      = Y_DUTYCYCLE_INVALID;        // MeasureVal
        this._pulseDuration                  = Y_PULSEDURATION_INVALID;    // MeasureVal
        this._pwmTransition                  = Y_PWMTRANSITION_INVALID;    // Text
        this._invertedOutput                 = Y_INVERTEDOUTPUT_INVALID;   // Bool
        this._enabledAtPowerOn               = Y_ENABLEDATPOWERON_INVALID; // Bool
        this._dutyCycleAtPowerOn             = Y_DUTYCYCLEATPOWERON_INVALID; // MeasureVal
        //--- (end of YPwmOutput constructor)
    }

    //--- (YPwmOutput implementation)

    function YPwmOutput_parseAttr(name, val, _super)
    {
        switch(name) {
        case "enabled":
            this._enabled = parseInt(val);
            return 1;
        case "frequency":
            this._frequency = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "period":
            this._period = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "dutyCycle":
            this._dutyCycle = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "pulseDuration":
            this._pulseDuration = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "pwmTransition":
            this._pwmTransition = val;
            return 1;
        case "invertedOutput":
            this._invertedOutput = parseInt(val);
            return 1;
        case "enabledAtPowerOn":
            this._enabledAtPowerOn = parseInt(val);
            return 1;
        case "dutyCycleAtPowerOn":
            this._dutyCycleAtPowerOn = Math.round(val / 65.536) / 1000.0;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the state of the PWM generators.
     *
     * @return either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE, according to the state of the PWM generators
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLED_INVALID.
     */
    function YPwmOutput_get_enabled()
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
     * Gets the state of the PWM generators.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmOutput object that invoked the callback
     *         - the result:either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE, according to the state of
     *         the PWM generators
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLED_INVALID.
     */
    function YPwmOutput_get_enabled_async(callback,context)
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
     * Stops or starts the PWM.
     *
     * @param newval : either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_enabled(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabled',rest_val);
    }

    /**
     * Changes the PWM frequency. The duty cycle is kept unchanged thanks to an
     * automatic pulse width change, in other words, the change will not be applied
     * before the end of the current period. This can significantly affect reaction
     * time at low frequencies. If you call the matching module saveToFlash()
     * method, the frequency will be kept after a device power cycle.
     * To stop the PWM signal, do not set the frequency to zero, use the set_enabled()
     * method instead.
     *
     * @param newval : a floating point number corresponding to the PWM frequency
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_frequency(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('frequency',rest_val);
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YPwmOutput.FREQUENCY_INVALID.
     */
    function YPwmOutput_get_frequency()
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
     *         - the YPwmOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM frequency in Hz
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmOutput.FREQUENCY_INVALID.
     */
    function YPwmOutput_get_frequency_async(callback,context)
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
     * Changes the PWM period in milliseconds. Caution: in order to avoid  random truncation of
     * the current pulse, the change will not be applied
     * before the end of the current period. This can significantly affect reaction
     * time at low frequencies. If you call the matching module saveToFlash()
     * method, the frequency will be kept after a device power cycle.
     *
     * @param newval : a floating point number corresponding to the PWM period in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_period(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('period',rest_val);
    }

    /**
     * Returns the PWM period in milliseconds.
     *
     * @return a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns YPwmOutput.PERIOD_INVALID.
     */
    function YPwmOutput_get_period()
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
     *         - the YPwmOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM period in milliseconds
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmOutput.PERIOD_INVALID.
     */
    function YPwmOutput_get_period_async(callback,context)
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
     * Changes the PWM duty cycle, in per cents.
     *
     * @param newval : a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_dutyCycle(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('dutyCycle',rest_val);
    }

    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLE_INVALID.
     */
    function YPwmOutput_get_dutyCycle()
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
     *         - the YPwmOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM duty cycle, in per cents
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLE_INVALID.
     */
    function YPwmOutput_get_dutyCycle_async(callback,context)
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
     * Changes the PWM pulse length, in milliseconds. A pulse length cannot be longer than period,
     * otherwise it is truncated.
     *
     * @param newval : a floating point number corresponding to the PWM pulse length, in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_pulseDuration(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('pulseDuration',rest_val);
    }

    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return a floating point number corresponding to the PWM pulse length in milliseconds, as a
     * floating point number
     *
     * On failure, throws an exception or returns YPwmOutput.PULSEDURATION_INVALID.
     */
    function YPwmOutput_get_pulseDuration()
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
     *         - the YPwmOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM pulse length in milliseconds, as a
     *         floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmOutput.PULSEDURATION_INVALID.
     */
    function YPwmOutput_get_pulseDuration_async(callback,context)
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

    function YPwmOutput_get_pwmTransition()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PWMTRANSITION_INVALID;
            }
        }
        res = this._pwmTransition;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmOutput object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YPwmOutput_get_pwmTransition_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PWMTRANSITION_INVALID);
            } else {
                callback(context, obj, obj._pwmTransition);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YPwmOutput_set_pwmTransition(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('pwmTransition',rest_val);
    }

    /**
     * Returns true if the output signal is configured as inverted, and false otherwise.
     *
     * @return either YPwmOutput.INVERTEDOUTPUT_FALSE or YPwmOutput.INVERTEDOUTPUT_TRUE, according to true
     * if the output signal is configured as inverted, and false otherwise
     *
     * On failure, throws an exception or returns YPwmOutput.INVERTEDOUTPUT_INVALID.
     */
    function YPwmOutput_get_invertedOutput()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_INVERTEDOUTPUT_INVALID;
            }
        }
        res = this._invertedOutput;
        return res;
    }

    /**
     * Gets true if the output signal is configured as inverted, and false otherwise.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmOutput object that invoked the callback
     *         - the result:either YPwmOutput.INVERTEDOUTPUT_FALSE or YPwmOutput.INVERTEDOUTPUT_TRUE, according to
     *         true if the output signal is configured as inverted, and false otherwise
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmOutput.INVERTEDOUTPUT_INVALID.
     */
    function YPwmOutput_get_invertedOutput_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_INVERTEDOUTPUT_INVALID);
            } else {
                callback(context, obj, obj._invertedOutput);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the inversion mode of the output signal.
     * Remember to call the matching module saveToFlash() method if you want
     * the change to be kept after power cycle.
     *
     * @param newval : either YPwmOutput.INVERTEDOUTPUT_FALSE or YPwmOutput.INVERTEDOUTPUT_TRUE, according
     * to the inversion mode of the output signal
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_invertedOutput(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('invertedOutput',rest_val);
    }

    /**
     * Returns the state of the PWM at device power on.
     *
     * @return either YPwmOutput.ENABLEDATPOWERON_FALSE or YPwmOutput.ENABLEDATPOWERON_TRUE, according to
     * the state of the PWM at device power on
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLEDATPOWERON_INVALID.
     */
    function YPwmOutput_get_enabledAtPowerOn()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ENABLEDATPOWERON_INVALID;
            }
        }
        res = this._enabledAtPowerOn;
        return res;
    }

    /**
     * Gets the state of the PWM at device power on.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmOutput object that invoked the callback
     *         - the result:either YPwmOutput.ENABLEDATPOWERON_FALSE or YPwmOutput.ENABLEDATPOWERON_TRUE,
     *         according to the state of the PWM at device power on
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLEDATPOWERON_INVALID.
     */
    function YPwmOutput_get_enabledAtPowerOn_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ENABLEDATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._enabledAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the state of the PWM at device power on. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval : either YPwmOutput.ENABLEDATPOWERON_FALSE or YPwmOutput.ENABLEDATPOWERON_TRUE,
     * according to the state of the PWM at device power on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_enabledAtPowerOn(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabledAtPowerOn',rest_val);
    }

    /**
     * Changes the PWM duty cycle at device power on. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : a floating point number corresponding to the PWM duty cycle at device power on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_dutyCycleAtPowerOn(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('dutyCycleAtPowerOn',rest_val);
    }

    /**
     * Returns the PWM generators duty cycle at device power on as a floating point number between 0 and 100.
     *
     * @return a floating point number corresponding to the PWM generators duty cycle at device power on
     * as a floating point number between 0 and 100
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLEATPOWERON_INVALID.
     */
    function YPwmOutput_get_dutyCycleAtPowerOn()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DUTYCYCLEATPOWERON_INVALID;
            }
        }
        res = this._dutyCycleAtPowerOn;
        return res;
    }

    /**
     * Gets the PWM generators duty cycle at device power on as a floating point number between 0 and 100.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM generators duty cycle at device power
     *         on as a floating point number between 0 and 100
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLEATPOWERON_INVALID.
     */
    function YPwmOutput_get_dutyCycleAtPowerOn_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DUTYCYCLEATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._dutyCycleAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a PWM generator for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the PWM generator is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmOutput.isOnline() to test if the PWM generator is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM generator by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the PWM generator, for instance
     *         YPWMTX01.pwmOutput1.
     *
     * @return a YPwmOutput object allowing you to drive the PWM generator.
     */
    function YPwmOutput_FindPwmOutput(func)                     // class method
    {
        var obj;                    // YPwmOutput;
        obj = YFunction._FindFromCache("PwmOutput", func);
        if (obj == null) {
            obj = new YPwmOutput(func);
            YFunction._AddToCache("PwmOutput", func, obj);
        }
        return obj;
    }

    /**
     * Performs a smooth transition of the pulse duration toward a given value.
     * Any period, frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     *
     * @param ms_target   : new pulse duration at the end of the transition
     *         (floating-point number, representing the pulse duration in milliseconds)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_pulseDurationMove(ms_target,ms_duration)
    {
        var newval;                 // str;
        if (ms_target < 0.0) {
            ms_target = 0.0;
        }
        newval = ""+String(Math.round(Math.round(ms_target*65536)))+"ms:"+String(Math.round(ms_duration));
        return this.set_pwmTransition(newval);
    }

    /**
     * Performs a smooth change of the duty cycle toward a given value.
     * Any period, frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     *
     * @param target      : new duty cycle at the end of the transition
     *         (percentage, floating-point number between 0 and 100)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_dutyCycleMove(target,ms_duration)
    {
        var newval;                 // str;
        if (target < 0.0) {
            target = 0.0;
        }
        if (target > 100.0) {
            target = 100.0;
        }
        newval = ""+String(Math.round(Math.round(target*65536)))+":"+String(Math.round(ms_duration));
        return this.set_pwmTransition(newval);
    }

    /**
     * Performs a smooth frequency change toward a given value.
     * Any period, frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     *
     * @param target      : new frequency at the end of the transition (floating-point number)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_frequencyMove(target,ms_duration)
    {
        var newval;                 // str;
        if (target < 0.001) {
            target = 0.001;
        }
        newval = ""+String(Math.round(target*1000)/1000)+"Hz:"+String(Math.round(ms_duration));
        return this.set_pwmTransition(newval);
    }

    /**
     * Performs a smooth transition toward a specified value of the phase shift between this channel
     * and the other channel. The phase shift is executed by slightly changing the frequency
     * temporarily during the specified duration. This function only makes sense when both channels
     * are running, either at the same frequency, or at a multiple of the channel frequency.
     * Any period, frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     *
     * @param target      : phase shift at the end of the transition, in milliseconds (floating-point number)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_phaseMove(target,ms_duration)
    {
        var newval;                 // str;
        newval = ""+String(Math.round(target*1000)/1000)+"ps:"+String(Math.round(ms_duration));
        return this.set_pwmTransition(newval);
    }

    /**
     * Trigger a given number of pulses of specified duration, at current frequency.
     * At the end of the pulse train, revert to the original state of the PWM generator.
     *
     * @param ms_target : desired pulse duration
     *         (floating-point number, representing the pulse duration in milliseconds)
     * @param n_pulses  : desired pulse count
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_triggerPulsesByDuration(ms_target,n_pulses)
    {
        var newval;                 // str;
        if (ms_target < 0.0) {
            ms_target = 0.0;
        }
        newval = ""+String(Math.round(Math.round(ms_target*65536)))+"ms*"+String(Math.round(n_pulses));
        return this.set_pwmTransition(newval);
    }

    /**
     * Trigger a given number of pulses of specified duration, at current frequency.
     * At the end of the pulse train, revert to the original state of the PWM generator.
     *
     * @param target   : desired duty cycle for the generated pulses
     *         (percentage, floating-point number between 0 and 100)
     * @param n_pulses : desired pulse count
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_triggerPulsesByDutyCycle(target,n_pulses)
    {
        var newval;                 // str;
        if (target < 0.0) {
            target = 0.0;
        }
        if (target > 100.0) {
            target = 100.0;
        }
        newval = ""+String(Math.round(Math.round(target*65536)))+"*"+String(Math.round(n_pulses));
        return this.set_pwmTransition(newval);
    }

    /**
     * Trigger a given number of pulses at the specified frequency, using current duty cycle.
     * At the end of the pulse train, revert to the original state of the PWM generator.
     *
     * @param target   : desired frequency for the generated pulses (floating-point number)
     * @param n_pulses : desired pulse count
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_triggerPulsesByFrequency(target,n_pulses)
    {
        var newval;                 // str;
        if (target < 0.001) {
            target = 0.001;
        }
        newval = ""+String(Math.round(target*1000)/1000)+"Hz*"+String(Math.round(n_pulses));
        return this.set_pwmTransition(newval);
    }

    function YPwmOutput_markForRepeat()
    {
        return this.set_pwmTransition(":");
    }

    function YPwmOutput_repeatFromMark()
    {
        return this.set_pwmTransition("R");
    }

    /**
     * Continues the enumeration of PWM generators started using yFirstPwmOutput().
     * Caution: You can't make any assumption about the returned PWM generators order.
     * If you want to find a specific a PWM generator, use PwmOutput.findPwmOutput()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPwmOutput object, corresponding to
     *         a PWM generator currently online, or a null pointer
     *         if there are no more PWM generators to enumerate.
     */
    function YPwmOutput_nextPwmOutput()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPwmOutput.FindPwmOutput(next_hwid);
    }

    /**
     * Starts the enumeration of PWM generators currently accessible.
     * Use the method YPwmOutput.nextPwmOutput() to iterate on
     * next PWM generators.
     *
     * @return a pointer to a YPwmOutput object, corresponding to
     *         the first PWM generator currently online, or a null pointer
     *         if there are none.
     */
    function YPwmOutput_FirstPwmOutput()
    {
        var next_hwid = YAPI.getFirstHardwareId('PwmOutput');
        if(next_hwid == null) return null;
        return YPwmOutput.FindPwmOutput(next_hwid);
    }

    //--- (end of YPwmOutput implementation)

    //--- (YPwmOutput initialization)
    YPwmOutput = YFunction._Subclass(_YPwmOutput, {
        // Constants
        ENABLED_FALSE               : 0,
        ENABLED_TRUE                : 1,
        ENABLED_INVALID             : -1,
        FREQUENCY_INVALID           : YAPI_INVALID_DOUBLE,
        PERIOD_INVALID              : YAPI_INVALID_DOUBLE,
        DUTYCYCLE_INVALID           : YAPI_INVALID_DOUBLE,
        PULSEDURATION_INVALID       : YAPI_INVALID_DOUBLE,
        PWMTRANSITION_INVALID       : YAPI_INVALID_STRING,
        INVERTEDOUTPUT_FALSE        : 0,
        INVERTEDOUTPUT_TRUE         : 1,
        INVERTEDOUTPUT_INVALID      : -1,
        ENABLEDATPOWERON_FALSE      : 0,
        ENABLEDATPOWERON_TRUE       : 1,
        ENABLEDATPOWERON_INVALID    : -1,
        DUTYCYCLEATPOWERON_INVALID  : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindPwmOutput               : YPwmOutput_FindPwmOutput,
        FirstPwmOutput              : YPwmOutput_FirstPwmOutput
    }, {
        // Methods
        get_enabled                 : YPwmOutput_get_enabled,
        enabled                     : YPwmOutput_get_enabled,
        get_enabled_async           : YPwmOutput_get_enabled_async,
        enabled_async               : YPwmOutput_get_enabled_async,
        set_enabled                 : YPwmOutput_set_enabled,
        setEnabled                  : YPwmOutput_set_enabled,
        set_frequency               : YPwmOutput_set_frequency,
        setFrequency                : YPwmOutput_set_frequency,
        get_frequency               : YPwmOutput_get_frequency,
        frequency                   : YPwmOutput_get_frequency,
        get_frequency_async         : YPwmOutput_get_frequency_async,
        frequency_async             : YPwmOutput_get_frequency_async,
        set_period                  : YPwmOutput_set_period,
        setPeriod                   : YPwmOutput_set_period,
        get_period                  : YPwmOutput_get_period,
        period                      : YPwmOutput_get_period,
        get_period_async            : YPwmOutput_get_period_async,
        period_async                : YPwmOutput_get_period_async,
        set_dutyCycle               : YPwmOutput_set_dutyCycle,
        setDutyCycle                : YPwmOutput_set_dutyCycle,
        get_dutyCycle               : YPwmOutput_get_dutyCycle,
        dutyCycle                   : YPwmOutput_get_dutyCycle,
        get_dutyCycle_async         : YPwmOutput_get_dutyCycle_async,
        dutyCycle_async             : YPwmOutput_get_dutyCycle_async,
        set_pulseDuration           : YPwmOutput_set_pulseDuration,
        setPulseDuration            : YPwmOutput_set_pulseDuration,
        get_pulseDuration           : YPwmOutput_get_pulseDuration,
        pulseDuration               : YPwmOutput_get_pulseDuration,
        get_pulseDuration_async     : YPwmOutput_get_pulseDuration_async,
        pulseDuration_async         : YPwmOutput_get_pulseDuration_async,
        get_pwmTransition           : YPwmOutput_get_pwmTransition,
        pwmTransition               : YPwmOutput_get_pwmTransition,
        get_pwmTransition_async     : YPwmOutput_get_pwmTransition_async,
        pwmTransition_async         : YPwmOutput_get_pwmTransition_async,
        set_pwmTransition           : YPwmOutput_set_pwmTransition,
        setPwmTransition            : YPwmOutput_set_pwmTransition,
        get_invertedOutput          : YPwmOutput_get_invertedOutput,
        invertedOutput              : YPwmOutput_get_invertedOutput,
        get_invertedOutput_async    : YPwmOutput_get_invertedOutput_async,
        invertedOutput_async        : YPwmOutput_get_invertedOutput_async,
        set_invertedOutput          : YPwmOutput_set_invertedOutput,
        setInvertedOutput           : YPwmOutput_set_invertedOutput,
        get_enabledAtPowerOn        : YPwmOutput_get_enabledAtPowerOn,
        enabledAtPowerOn            : YPwmOutput_get_enabledAtPowerOn,
        get_enabledAtPowerOn_async  : YPwmOutput_get_enabledAtPowerOn_async,
        enabledAtPowerOn_async      : YPwmOutput_get_enabledAtPowerOn_async,
        set_enabledAtPowerOn        : YPwmOutput_set_enabledAtPowerOn,
        setEnabledAtPowerOn         : YPwmOutput_set_enabledAtPowerOn,
        set_dutyCycleAtPowerOn      : YPwmOutput_set_dutyCycleAtPowerOn,
        setDutyCycleAtPowerOn       : YPwmOutput_set_dutyCycleAtPowerOn,
        get_dutyCycleAtPowerOn      : YPwmOutput_get_dutyCycleAtPowerOn,
        dutyCycleAtPowerOn          : YPwmOutput_get_dutyCycleAtPowerOn,
        get_dutyCycleAtPowerOn_async : YPwmOutput_get_dutyCycleAtPowerOn_async,
        dutyCycleAtPowerOn_async    : YPwmOutput_get_dutyCycleAtPowerOn_async,
        pulseDurationMove           : YPwmOutput_pulseDurationMove,
        dutyCycleMove               : YPwmOutput_dutyCycleMove,
        frequencyMove               : YPwmOutput_frequencyMove,
        phaseMove                   : YPwmOutput_phaseMove,
        triggerPulsesByDuration     : YPwmOutput_triggerPulsesByDuration,
        triggerPulsesByDutyCycle    : YPwmOutput_triggerPulsesByDutyCycle,
        triggerPulsesByFrequency    : YPwmOutput_triggerPulsesByFrequency,
        markForRepeat               : YPwmOutput_markForRepeat,
        repeatFromMark              : YPwmOutput_repeatFromMark,
        nextPwmOutput               : YPwmOutput_nextPwmOutput,
        _parseAttr                  : YPwmOutput_parseAttr
    });
    //--- (end of YPwmOutput initialization)
})();

//--- (YPwmOutput functions)

/**
 * Retrieves a PWM generator for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the PWM generator is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPwmOutput.isOnline() to test if the PWM generator is
 * indeed online at a given time. In case of ambiguity when looking for
 * a PWM generator by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the PWM generator, for instance
 *         YPWMTX01.pwmOutput1.
 *
 * @return a YPwmOutput object allowing you to drive the PWM generator.
 */
function yFindPwmOutput(func)
{
    return YPwmOutput.FindPwmOutput(func);
}

/**
 * Starts the enumeration of PWM generators currently accessible.
 * Use the method YPwmOutput.nextPwmOutput() to iterate on
 * next PWM generators.
 *
 * @return a pointer to a YPwmOutput object, corresponding to
 *         the first PWM generator currently online, or a null pointer
 *         if there are none.
 */
function yFirstPwmOutput()
{
    return YPwmOutput.FirstPwmOutput();
}

//--- (end of YPwmOutput functions)
