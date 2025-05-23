/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Relay functions
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

//--- (YRelay return codes)
//--- (end of YRelay return codes)
//--- (YRelay definitions)
var Y_STATE_A                       = 0;
var Y_STATE_B                       = 1;
var Y_STATE_INVALID                 = -1;
var Y_STATEATPOWERON_UNCHANGED      = 0;
var Y_STATEATPOWERON_A              = 1;
var Y_STATEATPOWERON_B              = 2;
var Y_STATEATPOWERON_INVALID        = -1;
var Y_OUTPUT_OFF                    = 0;
var Y_OUTPUT_ON                     = 1;
var Y_OUTPUT_INVALID                = -1;
var Y_MAXTIMEONSTATEA_INVALID       = YAPI_INVALID_LONG;
var Y_MAXTIMEONSTATEB_INVALID       = YAPI_INVALID_LONG;
var Y_PULSETIMER_INVALID            = YAPI_INVALID_LONG;
var Y_DELAYEDPULSETIMER_INVALID     = null;
var Y_COUNTDOWN_INVALID             = YAPI_INVALID_LONG;
//--- (end of YRelay definitions)

//--- (YRelay class start)
/**
 * YRelay Class: relay control interface, available for instance in the Yocto-LatchedRelay, the
 * Yocto-MaxiPowerRelay, the Yocto-PowerRelay-V3 or the Yocto-Relay
 *
 * The YRelay class allows you to drive a Yoctopuce relay or optocoupled output.
 * It can be used to simply switch the output on or off, but also to automatically generate short
 * pulses of determined duration.
 * On devices with two output for each relay (double throw), the two outputs are named A and B,
 * with output A corresponding to the idle position (normally closed) and the output B corresponding to the
 * active state (normally open).
 */
//--- (end of YRelay class start)

var YRelay; // definition below
(function()
{
    function _YRelay(str_func)
    {
        //--- (YRelay constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Relay';

        this._state                          = Y_STATE_INVALID;            // Toggle
        this._stateAtPowerOn                 = Y_STATEATPOWERON_INVALID;   // ToggleAtPowerOn
        this._maxTimeOnStateA                = Y_MAXTIMEONSTATEA_INVALID;  // Time
        this._maxTimeOnStateB                = Y_MAXTIMEONSTATEB_INVALID;  // Time
        this._output                         = Y_OUTPUT_INVALID;           // OnOff
        this._pulseTimer                     = Y_PULSETIMER_INVALID;       // Time
        this._delayedPulseTimer              = Y_DELAYEDPULSETIMER_INVALID; // DelayedPulse
        this._countdown                      = Y_COUNTDOWN_INVALID;        // Time
        this._firm                           = 0;                          // int
        //--- (end of YRelay constructor)
    }

    //--- (YRelay implementation)

    function YRelay_parseAttr(name, val, _super)
    {
        switch(name) {
        case "state":
            this._state = parseInt(val);
            return 1;
        case "stateAtPowerOn":
            this._stateAtPowerOn = parseInt(val);
            return 1;
        case "maxTimeOnStateA":
            this._maxTimeOnStateA = parseInt(val);
            return 1;
        case "maxTimeOnStateB":
            this._maxTimeOnStateB = parseInt(val);
            return 1;
        case "output":
            this._output = parseInt(val);
            return 1;
        case "pulseTimer":
            this._pulseTimer = parseInt(val);
            return 1;
        case "delayedPulseTimer":
            this._delayedPulseTimer = val;
            return 1;
        case "countdown":
            this._countdown = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the state of the relays (A for the idle position, B for the active position).
     *
     * @return either YRelay.STATE_A or YRelay.STATE_B, according to the state of the relays (A for the
     * idle position, B for the active position)
     *
     * On failure, throws an exception or returns YRelay.STATE_INVALID.
     */
    function YRelay_get_state()
    {
        var res;                    // enumTOGGLE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_STATE_INVALID;
            }
        }
        res = this._state;
        return res;
    }

    /**
     * Gets the state of the relays (A for the idle position, B for the active position).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:either YRelay.STATE_A or YRelay.STATE_B, according to the state of the relays (A for
     *         the idle position, B for the active position)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRelay.STATE_INVALID.
     */
    function YRelay_get_state_async(callback,context)
    {
        var res;                    // enumTOGGLE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_STATE_INVALID);
            } else {
                callback(context, obj, obj._state);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the state of the relays (A for the idle position, B for the active position).
     *
     * @param newval : either YRelay.STATE_A or YRelay.STATE_B, according to the state of the relays (A
     * for the idle position, B for the active position)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRelay_set_state(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('state',rest_val);
    }

    /**
     * Returns the state of the relays at device startup (A for the idle position,
     * B for the active position, UNCHANGED to leave the relay state as is).
     *
     * @return a value among YRelay.STATEATPOWERON_UNCHANGED, YRelay.STATEATPOWERON_A and
     * YRelay.STATEATPOWERON_B corresponding to the state of the relays at device startup (A for the idle position,
     *         B for the active position, UNCHANGED to leave the relay state as is)
     *
     * On failure, throws an exception or returns YRelay.STATEATPOWERON_INVALID.
     */
    function YRelay_get_stateAtPowerOn()
    {
        var res;                    // enumTOGGLEATPOWERON;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_STATEATPOWERON_INVALID;
            }
        }
        res = this._stateAtPowerOn;
        return res;
    }

    /**
     * Gets the state of the relays at device startup (A for the idle position,
     * B for the active position, UNCHANGED to leave the relay state as is).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:a value among YRelay.STATEATPOWERON_UNCHANGED, YRelay.STATEATPOWERON_A and
     *         YRelay.STATEATPOWERON_B corresponding to the state of the relays at device startup (A for the idle position,
     *         B for the active position, UNCHANGED to leave the relay state as is)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRelay.STATEATPOWERON_INVALID.
     */
    function YRelay_get_stateAtPowerOn_async(callback,context)
    {
        var res;                    // enumTOGGLEATPOWERON;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_STATEATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._stateAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the state of the relays at device startup (A for the idle position,
     * B for the active position, UNCHANGED to leave the relay state as is).
     * Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval : a value among YRelay.STATEATPOWERON_UNCHANGED, YRelay.STATEATPOWERON_A and
     * YRelay.STATEATPOWERON_B corresponding to the state of the relays at device startup (A for the idle position,
     *         B for the active position, UNCHANGED to leave the relay state as is)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRelay_set_stateAtPowerOn(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('stateAtPowerOn',rest_val);
    }

    /**
     * Returns the maximum time (ms) allowed for the relay to stay in state
     * A before automatically switching back in to B state. Zero means no time limit.
     *
     * @return an integer corresponding to the maximum time (ms) allowed for the relay to stay in state
     *         A before automatically switching back in to B state
     *
     * On failure, throws an exception or returns YRelay.MAXTIMEONSTATEA_INVALID.
     */
    function YRelay_get_maxTimeOnStateA()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MAXTIMEONSTATEA_INVALID;
            }
        }
        res = this._maxTimeOnStateA;
        return res;
    }

    /**
     * Gets the maximum time (ms) allowed for the relay to stay in state
     * A before automatically switching back in to B state. Zero means no time limit.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:an integer corresponding to the maximum time (ms) allowed for the relay to stay in state
     *         A before automatically switching back in to B state
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRelay.MAXTIMEONSTATEA_INVALID.
     */
    function YRelay_get_maxTimeOnStateA_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MAXTIMEONSTATEA_INVALID);
            } else {
                callback(context, obj, obj._maxTimeOnStateA);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the maximum time (ms) allowed for the relay to stay in state A
     * before automatically switching back in to B state. Use zero for no time limit.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the maximum time (ms) allowed for the relay to stay in state A
     *         before automatically switching back in to B state
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRelay_set_maxTimeOnStateA(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('maxTimeOnStateA',rest_val);
    }

    /**
     * Retourne the maximum time (ms) allowed for the relay to stay in state B
     * before automatically switching back in to A state. Zero means no time limit.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YRelay.MAXTIMEONSTATEB_INVALID.
     */
    function YRelay_get_maxTimeOnStateB()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MAXTIMEONSTATEB_INVALID;
            }
        }
        res = this._maxTimeOnStateB;
        return res;
    }

    /**
     * Retourne the maximum time (ms) allowed for the relay to stay in state B
     * before automatically switching back in to A state. Zero means no time limit.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:an integer
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRelay.MAXTIMEONSTATEB_INVALID.
     */
    function YRelay_get_maxTimeOnStateB_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MAXTIMEONSTATEB_INVALID);
            } else {
                callback(context, obj, obj._maxTimeOnStateB);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the maximum time (ms) allowed for the relay to stay in state B before
     * automatically switching back in to A state. Use zero for no time limit.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the maximum time (ms) allowed for the relay to stay in
     * state B before
     *         automatically switching back in to A state
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRelay_set_maxTimeOnStateB(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('maxTimeOnStateB',rest_val);
    }

    /**
     * Returns the output state of the relays, when used as a simple switch (single throw).
     *
     * @return either YRelay.OUTPUT_OFF or YRelay.OUTPUT_ON, according to the output state of the relays,
     * when used as a simple switch (single throw)
     *
     * On failure, throws an exception or returns YRelay.OUTPUT_INVALID.
     */
    function YRelay_get_output()
    {
        var res;                    // enumONOFF;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_OUTPUT_INVALID;
            }
        }
        res = this._output;
        return res;
    }

    /**
     * Gets the output state of the relays, when used as a simple switch (single throw).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:either YRelay.OUTPUT_OFF or YRelay.OUTPUT_ON, according to the output state of the
     *         relays, when used as a simple switch (single throw)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRelay.OUTPUT_INVALID.
     */
    function YRelay_get_output_async(callback,context)
    {
        var res;                    // enumONOFF;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_OUTPUT_INVALID);
            } else {
                callback(context, obj, obj._output);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the output state of the relays, when used as a simple switch (single throw).
     *
     * @param newval : either YRelay.OUTPUT_OFF or YRelay.OUTPUT_ON, according to the output state of the
     * relays, when used as a simple switch (single throw)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRelay_set_output(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('output',rest_val);
    }

    /**
     * Returns the number of milliseconds remaining before the relays is returned to idle position
     * (state A), during a measured pulse generation. When there is no ongoing pulse, returns zero.
     *
     * @return an integer corresponding to the number of milliseconds remaining before the relays is
     * returned to idle position
     *         (state A), during a measured pulse generation
     *
     * On failure, throws an exception or returns YRelay.PULSETIMER_INVALID.
     */
    function YRelay_get_pulseTimer()
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
     * Gets the number of milliseconds remaining before the relays is returned to idle position
     * (state A), during a measured pulse generation. When there is no ongoing pulse, returns zero.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:an integer corresponding to the number of milliseconds remaining before the relays is
     *         returned to idle position
     *         (state A), during a measured pulse generation
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRelay.PULSETIMER_INVALID.
     */
    function YRelay_get_pulseTimer_async(callback,context)
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

    function YRelay_set_pulseTimer(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pulseTimer',rest_val);
    }

    /**
     * Sets the relay to output B (active) for a specified duration, then brings it
     * automatically back to output A (idle state).
     *
     * @param ms_duration : pulse duration, in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRelay_pulse(ms_duration)
    {   var rest_val;
        rest_val = String(ms_duration);
        return this._setAttr('pulseTimer',rest_val);
    }

    function YRelay_get_delayedPulseTimer()
    {
        var res;                    // YDelayedPulse;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DELAYEDPULSETIMER_INVALID;
            }
        }
        res = this._delayedPulseTimer;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YRelay_get_delayedPulseTimer_async(callback,context)
    {
        var res;                    // YDelayedPulse;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DELAYEDPULSETIMER_INVALID);
            } else {
                callback(context, obj, obj._delayedPulseTimer);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YRelay_set_delayedPulseTimer(newval)
    {   var rest_val;
        rest_val = String(newval.target)+':'+String(newval.ms);
        return this._setAttr('delayedPulseTimer',rest_val);
    }

    /**
     * Schedules a pulse.
     *
     * @param ms_delay : waiting time before the pulse, in milliseconds
     * @param ms_duration : pulse duration, in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRelay_delayedPulse(ms_delay,ms_duration)
    {   var rest_val;
        rest_val = String(ms_delay)+':'+String(ms_duration);
        return this._setAttr('delayedPulseTimer',rest_val);
    }

    /**
     * Returns the number of milliseconds remaining before a pulse (delayedPulse() call)
     * When there is no scheduled pulse, returns zero.
     *
     * @return an integer corresponding to the number of milliseconds remaining before a pulse (delayedPulse() call)
     *         When there is no scheduled pulse, returns zero
     *
     * On failure, throws an exception or returns YRelay.COUNTDOWN_INVALID.
     */
    function YRelay_get_countdown()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COUNTDOWN_INVALID;
            }
        }
        res = this._countdown;
        return res;
    }

    /**
     * Gets the number of milliseconds remaining before a pulse (delayedPulse() call)
     * When there is no scheduled pulse, returns zero.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:an integer corresponding to the number of milliseconds remaining before a pulse
     *         (delayedPulse() call)
     *         When there is no scheduled pulse, returns zero
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRelay.COUNTDOWN_INVALID.
     */
    function YRelay_get_countdown_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COUNTDOWN_INVALID);
            } else {
                callback(context, obj, obj._countdown);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a relay for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the relay is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRelay.isOnline() to test if the relay is
     * indeed online at a given time. In case of ambiguity when looking for
     * a relay by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the relay, for instance
     *         YLTCHRL1.relay1.
     *
     * @return a YRelay object allowing you to drive the relay.
     */
    function YRelay_FindRelay(func)                             // class method
    {
        var obj;                    // YRelay;
        obj = YFunction._FindFromCache("Relay", func);
        if (obj == null) {
            obj = new YRelay(func);
            YFunction._AddToCache("Relay", func, obj);
        }
        return obj;
    }

    /**
     * Switch the relay to the opposite state.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRelay_toggle()
    {
        var sta;                    // int;
        var fw;                     // str;
        var mo;                     // YModule;
        if (this._firm == 0) {
            mo = this.get_module();
            fw = mo.get_firmwareRelease();
            if (fw == YModule.FIRMWARERELEASE_INVALID) {
                return Y_STATE_INVALID;
            }
            this._firm = YAPI._atoi(fw);
        }
        if (this._firm < 34921) {
            sta = this.get_state();
            if (sta == Y_STATE_INVALID) {
                return Y_STATE_INVALID;
            }
            if (sta == Y_STATE_B) {
                this.set_state(Y_STATE_A);
            } else {
                this.set_state(Y_STATE_B);
            }
            return YAPI_SUCCESS;
        } else {
            return this._setAttr("state","X");
        }
    }

    /**
     * Continues the enumeration of relays started using yFirstRelay().
     * Caution: You can't make any assumption about the returned relays order.
     * If you want to find a specific a relay, use Relay.findRelay()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YRelay object, corresponding to
     *         a relay currently online, or a null pointer
     *         if there are no more relays to enumerate.
     */
    function YRelay_nextRelay()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YRelay.FindRelay(next_hwid);
    }

    /**
     * Starts the enumeration of relays currently accessible.
     * Use the method YRelay.nextRelay() to iterate on
     * next relays.
     *
     * @return a pointer to a YRelay object, corresponding to
     *         the first relay currently online, or a null pointer
     *         if there are none.
     */
    function YRelay_FirstRelay()
    {
        var next_hwid = YAPI.getFirstHardwareId('Relay');
        if(next_hwid == null) return null;
        return YRelay.FindRelay(next_hwid);
    }

    //--- (end of YRelay implementation)

    //--- (YRelay initialization)
    YRelay = YFunction._Subclass(_YRelay, {
        // Constants
        STATE_A                     : 0,
        STATE_B                     : 1,
        STATE_INVALID               : -1,
        STATEATPOWERON_UNCHANGED    : 0,
        STATEATPOWERON_A            : 1,
        STATEATPOWERON_B            : 2,
        STATEATPOWERON_INVALID      : -1,
        MAXTIMEONSTATEA_INVALID     : YAPI_INVALID_LONG,
        MAXTIMEONSTATEB_INVALID     : YAPI_INVALID_LONG,
        OUTPUT_OFF                  : 0,
        OUTPUT_ON                   : 1,
        OUTPUT_INVALID              : -1,
        PULSETIMER_INVALID          : YAPI_INVALID_LONG,
        COUNTDOWN_INVALID           : YAPI_INVALID_LONG
    }, {
        // Class methods
        FindRelay                   : YRelay_FindRelay,
        FirstRelay                  : YRelay_FirstRelay
    }, {
        // Methods
        get_state                   : YRelay_get_state,
        state                       : YRelay_get_state,
        get_state_async             : YRelay_get_state_async,
        state_async                 : YRelay_get_state_async,
        set_state                   : YRelay_set_state,
        setState                    : YRelay_set_state,
        get_stateAtPowerOn          : YRelay_get_stateAtPowerOn,
        stateAtPowerOn              : YRelay_get_stateAtPowerOn,
        get_stateAtPowerOn_async    : YRelay_get_stateAtPowerOn_async,
        stateAtPowerOn_async        : YRelay_get_stateAtPowerOn_async,
        set_stateAtPowerOn          : YRelay_set_stateAtPowerOn,
        setStateAtPowerOn           : YRelay_set_stateAtPowerOn,
        get_maxTimeOnStateA         : YRelay_get_maxTimeOnStateA,
        maxTimeOnStateA             : YRelay_get_maxTimeOnStateA,
        get_maxTimeOnStateA_async   : YRelay_get_maxTimeOnStateA_async,
        maxTimeOnStateA_async       : YRelay_get_maxTimeOnStateA_async,
        set_maxTimeOnStateA         : YRelay_set_maxTimeOnStateA,
        setMaxTimeOnStateA          : YRelay_set_maxTimeOnStateA,
        get_maxTimeOnStateB         : YRelay_get_maxTimeOnStateB,
        maxTimeOnStateB             : YRelay_get_maxTimeOnStateB,
        get_maxTimeOnStateB_async   : YRelay_get_maxTimeOnStateB_async,
        maxTimeOnStateB_async       : YRelay_get_maxTimeOnStateB_async,
        set_maxTimeOnStateB         : YRelay_set_maxTimeOnStateB,
        setMaxTimeOnStateB          : YRelay_set_maxTimeOnStateB,
        get_output                  : YRelay_get_output,
        output                      : YRelay_get_output,
        get_output_async            : YRelay_get_output_async,
        output_async                : YRelay_get_output_async,
        set_output                  : YRelay_set_output,
        setOutput                   : YRelay_set_output,
        get_pulseTimer              : YRelay_get_pulseTimer,
        pulseTimer                  : YRelay_get_pulseTimer,
        get_pulseTimer_async        : YRelay_get_pulseTimer_async,
        pulseTimer_async            : YRelay_get_pulseTimer_async,
        set_pulseTimer              : YRelay_set_pulseTimer,
        setPulseTimer               : YRelay_set_pulseTimer,
        pulse                       : YRelay_pulse,
        get_delayedPulseTimer       : YRelay_get_delayedPulseTimer,
        delayedPulseTimer           : YRelay_get_delayedPulseTimer,
        get_delayedPulseTimer_async : YRelay_get_delayedPulseTimer_async,
        delayedPulseTimer_async     : YRelay_get_delayedPulseTimer_async,
        set_delayedPulseTimer       : YRelay_set_delayedPulseTimer,
        setDelayedPulseTimer        : YRelay_set_delayedPulseTimer,
        delayedPulse                : YRelay_delayedPulse,
        get_countdown               : YRelay_get_countdown,
        countdown                   : YRelay_get_countdown,
        get_countdown_async         : YRelay_get_countdown_async,
        countdown_async             : YRelay_get_countdown_async,
        toggle                      : YRelay_toggle,
        nextRelay                   : YRelay_nextRelay,
        _parseAttr                  : YRelay_parseAttr
    });
    //--- (end of YRelay initialization)
})();

//--- (YRelay functions)

/**
 * Retrieves a relay for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the relay is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YRelay.isOnline() to test if the relay is
 * indeed online at a given time. In case of ambiguity when looking for
 * a relay by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the relay, for instance
 *         YLTCHRL1.relay1.
 *
 * @return a YRelay object allowing you to drive the relay.
 */
function yFindRelay(func)
{
    return YRelay.FindRelay(func);
}

/**
 * Starts the enumeration of relays currently accessible.
 * Use the method YRelay.nextRelay() to iterate on
 * next relays.
 *
 * @return a pointer to a YRelay object, corresponding to
 *         the first relay currently online, or a null pointer
 *         if there are none.
 */
function yFirstRelay()
{
    return YRelay.FirstRelay();
}

//--- (end of YRelay functions)
