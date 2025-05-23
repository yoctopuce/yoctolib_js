/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for WakeUpMonitor functions
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

//--- (YWakeUpMonitor return codes)
//--- (end of YWakeUpMonitor return codes)
//--- (YWakeUpMonitor definitions)
var Y_WAKEUPREASON_USBPOWER         = 0;
var Y_WAKEUPREASON_EXTPOWER         = 1;
var Y_WAKEUPREASON_ENDOFSLEEP       = 2;
var Y_WAKEUPREASON_EXTSIG1          = 3;
var Y_WAKEUPREASON_SCHEDULE1        = 4;
var Y_WAKEUPREASON_SCHEDULE2        = 5;
var Y_WAKEUPREASON_SCHEDULE3        = 6;
var Y_WAKEUPREASON_INVALID          = -1;
var Y_WAKEUPSTATE_SLEEPING          = 0;
var Y_WAKEUPSTATE_AWAKE             = 1;
var Y_WAKEUPSTATE_INVALID           = -1;
var Y_POWERDURATION_INVALID         = YAPI_INVALID_UINT;
var Y_SLEEPCOUNTDOWN_INVALID        = YAPI_INVALID_UINT;
var Y_NEXTWAKEUP_INVALID            = YAPI_INVALID_LONG;
var Y_RTCTIME_INVALID               = YAPI_INVALID_LONG;
//--- (end of YWakeUpMonitor definitions)

//--- (YWakeUpMonitor class start)
/**
 * YWakeUpMonitor Class: wake-up monitor control interface, available for instance in the
 * YoctoHub-GSM-4G, the YoctoHub-Wireless-SR, the YoctoHub-Wireless-g or the YoctoHub-Wireless-n
 *
 * The YWakeUpMonitor class handles globally all wake-up sources, as well
 * as automated sleep mode.
 */
//--- (end of YWakeUpMonitor class start)

var YWakeUpMonitor; // definition below
(function()
{
    function _YWakeUpMonitor(str_func)
    {
        //--- (YWakeUpMonitor constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'WakeUpMonitor';

        this._powerDuration                  = Y_POWERDURATION_INVALID;    // UInt31
        this._sleepCountdown                 = Y_SLEEPCOUNTDOWN_INVALID;   // UInt31
        this._nextWakeUp                     = Y_NEXTWAKEUP_INVALID;       // UTCTime
        this._wakeUpReason                   = Y_WAKEUPREASON_INVALID;     // WakeUpReason
        this._wakeUpState                    = Y_WAKEUPSTATE_INVALID;      // WakeUpState
        this._rtcTime                        = Y_RTCTIME_INVALID;          // UTCTime
        this._endOfTime                      = 2145960000;                 // UInt31
        //--- (end of YWakeUpMonitor constructor)
    }

    //--- (YWakeUpMonitor implementation)

    function YWakeUpMonitor_parseAttr(name, val, _super)
    {
        switch(name) {
        case "powerDuration":
            this._powerDuration = parseInt(val);
            return 1;
        case "sleepCountdown":
            this._sleepCountdown = parseInt(val);
            return 1;
        case "nextWakeUp":
            this._nextWakeUp = parseInt(val);
            return 1;
        case "wakeUpReason":
            this._wakeUpReason = parseInt(val);
            return 1;
        case "wakeUpState":
            this._wakeUpState = parseInt(val);
            return 1;
        case "rtcTime":
            this._rtcTime = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the maximal wake up time (in seconds) before automatically going to sleep.
     *
     * @return an integer corresponding to the maximal wake up time (in seconds) before automatically going to sleep
     *
     * On failure, throws an exception or returns YWakeUpMonitor.POWERDURATION_INVALID.
     */
    function YWakeUpMonitor_get_powerDuration()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_POWERDURATION_INVALID;
            }
        }
        res = this._powerDuration;
        return res;
    }

    /**
     * Gets the maximal wake up time (in seconds) before automatically going to sleep.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpMonitor object that invoked the callback
     *         - the result:an integer corresponding to the maximal wake up time (in seconds) before automatically
     *         going to sleep
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWakeUpMonitor.POWERDURATION_INVALID.
     */
    function YWakeUpMonitor_get_powerDuration_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_POWERDURATION_INVALID);
            } else {
                callback(context, obj, obj._powerDuration);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the maximal wake up time (seconds) before automatically going to sleep.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the maximal wake up time (seconds) before automatically
     * going to sleep
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_set_powerDuration(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('powerDuration',rest_val);
    }

    /**
     * Returns the delay before the  next sleep period.
     *
     * @return an integer corresponding to the delay before the  next sleep period
     *
     * On failure, throws an exception or returns YWakeUpMonitor.SLEEPCOUNTDOWN_INVALID.
     */
    function YWakeUpMonitor_get_sleepCountdown()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SLEEPCOUNTDOWN_INVALID;
            }
        }
        res = this._sleepCountdown;
        return res;
    }

    /**
     * Gets the delay before the  next sleep period.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpMonitor object that invoked the callback
     *         - the result:an integer corresponding to the delay before the  next sleep period
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWakeUpMonitor.SLEEPCOUNTDOWN_INVALID.
     */
    function YWakeUpMonitor_get_sleepCountdown_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SLEEPCOUNTDOWN_INVALID);
            } else {
                callback(context, obj, obj._sleepCountdown);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the delay before the next sleep period.
     *
     * @param newval : an integer corresponding to the delay before the next sleep period
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_set_sleepCountdown(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('sleepCountdown',rest_val);
    }

    /**
     * Returns the next scheduled wake up date/time (UNIX format).
     *
     * @return an integer corresponding to the next scheduled wake up date/time (UNIX format)
     *
     * On failure, throws an exception or returns YWakeUpMonitor.NEXTWAKEUP_INVALID.
     */
    function YWakeUpMonitor_get_nextWakeUp()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NEXTWAKEUP_INVALID;
            }
        }
        res = this._nextWakeUp;
        return res;
    }

    /**
     * Gets the next scheduled wake up date/time (UNIX format).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpMonitor object that invoked the callback
     *         - the result:an integer corresponding to the next scheduled wake up date/time (UNIX format)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWakeUpMonitor.NEXTWAKEUP_INVALID.
     */
    function YWakeUpMonitor_get_nextWakeUp_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NEXTWAKEUP_INVALID);
            } else {
                callback(context, obj, obj._nextWakeUp);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the days of the week when a wake up must take place.
     *
     * @param newval : an integer corresponding to the days of the week when a wake up must take place
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_set_nextWakeUp(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('nextWakeUp',rest_val);
    }

    /**
     * Returns the latest wake up reason.
     *
     * @return a value among YWakeUpMonitor.WAKEUPREASON_USBPOWER, YWakeUpMonitor.WAKEUPREASON_EXTPOWER,
     * YWakeUpMonitor.WAKEUPREASON_ENDOFSLEEP, YWakeUpMonitor.WAKEUPREASON_EXTSIG1,
     * YWakeUpMonitor.WAKEUPREASON_SCHEDULE1, YWakeUpMonitor.WAKEUPREASON_SCHEDULE2 and
     * YWakeUpMonitor.WAKEUPREASON_SCHEDULE3 corresponding to the latest wake up reason
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPREASON_INVALID.
     */
    function YWakeUpMonitor_get_wakeUpReason()
    {
        var res;                    // enumWAKEUPREASON;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_WAKEUPREASON_INVALID;
            }
        }
        res = this._wakeUpReason;
        return res;
    }

    /**
     * Gets the latest wake up reason.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpMonitor object that invoked the callback
     *         - the result:a value among YWakeUpMonitor.WAKEUPREASON_USBPOWER,
     *         YWakeUpMonitor.WAKEUPREASON_EXTPOWER, YWakeUpMonitor.WAKEUPREASON_ENDOFSLEEP,
     *         YWakeUpMonitor.WAKEUPREASON_EXTSIG1, YWakeUpMonitor.WAKEUPREASON_SCHEDULE1,
     *         YWakeUpMonitor.WAKEUPREASON_SCHEDULE2 and YWakeUpMonitor.WAKEUPREASON_SCHEDULE3 corresponding to
     *         the latest wake up reason
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPREASON_INVALID.
     */
    function YWakeUpMonitor_get_wakeUpReason_async(callback,context)
    {
        var res;                    // enumWAKEUPREASON;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_WAKEUPREASON_INVALID);
            } else {
                callback(context, obj, obj._wakeUpReason);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns  the current state of the monitor.
     *
     * @return either YWakeUpMonitor.WAKEUPSTATE_SLEEPING or YWakeUpMonitor.WAKEUPSTATE_AWAKE, according
     * to  the current state of the monitor
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPSTATE_INVALID.
     */
    function YWakeUpMonitor_get_wakeUpState()
    {
        var res;                    // enumWAKEUPSTATE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_WAKEUPSTATE_INVALID;
            }
        }
        res = this._wakeUpState;
        return res;
    }

    /**
     * Gets  the current state of the monitor.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpMonitor object that invoked the callback
     *         - the result:either YWakeUpMonitor.WAKEUPSTATE_SLEEPING or YWakeUpMonitor.WAKEUPSTATE_AWAKE,
     *         according to  the current state of the monitor
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPSTATE_INVALID.
     */
    function YWakeUpMonitor_get_wakeUpState_async(callback,context)
    {
        var res;                    // enumWAKEUPSTATE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_WAKEUPSTATE_INVALID);
            } else {
                callback(context, obj, obj._wakeUpState);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YWakeUpMonitor_set_wakeUpState(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('wakeUpState',rest_val);
    }

    function YWakeUpMonitor_get_rtcTime()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RTCTIME_INVALID;
            }
        }
        res = this._rtcTime;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpMonitor object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YWakeUpMonitor_get_rtcTime_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RTCTIME_INVALID);
            } else {
                callback(context, obj, obj._rtcTime);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a wake-up monitor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the wake-up monitor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpMonitor.isOnline() to test if the wake-up monitor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wake-up monitor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the wake-up monitor, for instance
     *         YHUBGSM5.wakeUpMonitor.
     *
     * @return a YWakeUpMonitor object allowing you to drive the wake-up monitor.
     */
    function YWakeUpMonitor_FindWakeUpMonitor(func)             // class method
    {
        var obj;                    // YWakeUpMonitor;
        obj = YFunction._FindFromCache("WakeUpMonitor", func);
        if (obj == null) {
            obj = new YWakeUpMonitor(func);
            YFunction._AddToCache("WakeUpMonitor", func, obj);
        }
        return obj;
    }

    /**
     * Forces a wake up.
     */
    function YWakeUpMonitor_wakeUp()
    {
        return this.set_wakeUpState(Y_WAKEUPSTATE_AWAKE);
    }

    /**
     * Goes to sleep until the next wake up condition is met,  the
     * RTC time must have been set before calling this function.
     *
     * @param secBeforeSleep : number of seconds before going into sleep mode,
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_sleep(secBeforeSleep)
    {
        var currTime;               // int;
        currTime = this.get_rtcTime();
        if (!(currTime != 0)) {
            return this._throw(YAPI_RTC_NOT_READY,"RTC time not set",YAPI_RTC_NOT_READY);
        }
        this.set_nextWakeUp(this._endOfTime);
        this.set_sleepCountdown(secBeforeSleep);
        return YAPI_SUCCESS;
    }

    /**
     * Goes to sleep for a specific duration or until the next wake up condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     *
     * @param secUntilWakeUp : number of seconds before next wake up
     * @param secBeforeSleep : number of seconds before going into sleep mode
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_sleepFor(secUntilWakeUp,secBeforeSleep)
    {
        var currTime;               // int;
        currTime = this.get_rtcTime();
        if (!(currTime != 0)) {
            return this._throw(YAPI_RTC_NOT_READY,"RTC time not set",YAPI_RTC_NOT_READY);
        }
        this.set_nextWakeUp(currTime+secUntilWakeUp);
        this.set_sleepCountdown(secBeforeSleep);
        return YAPI_SUCCESS;
    }

    /**
     * Go to sleep until a specific date is reached or until the next wake up condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     *
     * @param wakeUpTime : wake-up datetime (UNIX format)
     * @param secBeforeSleep : number of seconds before going into sleep mode
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_sleepUntil(wakeUpTime,secBeforeSleep)
    {
        var currTime;               // int;
        currTime = this.get_rtcTime();
        if (!(currTime != 0)) {
            return this._throw(YAPI_RTC_NOT_READY,"RTC time not set",YAPI_RTC_NOT_READY);
        }
        this.set_nextWakeUp(wakeUpTime);
        this.set_sleepCountdown(secBeforeSleep);
        return YAPI_SUCCESS;
    }

    /**
     * Resets the sleep countdown.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_resetSleepCountDown()
    {
        this.set_sleepCountdown(0);
        this.set_nextWakeUp(0);
        return YAPI_SUCCESS;
    }

    /**
     * Continues the enumeration of wake-up monitors started using yFirstWakeUpMonitor().
     * Caution: You can't make any assumption about the returned wake-up monitors order.
     * If you want to find a specific a wake-up monitor, use WakeUpMonitor.findWakeUpMonitor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YWakeUpMonitor object, corresponding to
     *         a wake-up monitor currently online, or a null pointer
     *         if there are no more wake-up monitors to enumerate.
     */
    function YWakeUpMonitor_nextWakeUpMonitor()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitor(next_hwid);
    }

    /**
     * Starts the enumeration of wake-up monitors currently accessible.
     * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
     * next wake-up monitors.
     *
     * @return a pointer to a YWakeUpMonitor object, corresponding to
     *         the first wake-up monitor currently online, or a null pointer
     *         if there are none.
     */
    function YWakeUpMonitor_FirstWakeUpMonitor()
    {
        var next_hwid = YAPI.getFirstHardwareId('WakeUpMonitor');
        if(next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitor(next_hwid);
    }

    //--- (end of YWakeUpMonitor implementation)

    //--- (YWakeUpMonitor initialization)
    YWakeUpMonitor = YFunction._Subclass(_YWakeUpMonitor, {
        // Constants
        POWERDURATION_INVALID       : YAPI_INVALID_UINT,
        SLEEPCOUNTDOWN_INVALID      : YAPI_INVALID_UINT,
        NEXTWAKEUP_INVALID          : YAPI_INVALID_LONG,
        WAKEUPREASON_USBPOWER       : 0,
        WAKEUPREASON_EXTPOWER       : 1,
        WAKEUPREASON_ENDOFSLEEP     : 2,
        WAKEUPREASON_EXTSIG1        : 3,
        WAKEUPREASON_SCHEDULE1      : 4,
        WAKEUPREASON_SCHEDULE2      : 5,
        WAKEUPREASON_SCHEDULE3      : 6,
        WAKEUPREASON_INVALID        : -1,
        WAKEUPSTATE_SLEEPING        : 0,
        WAKEUPSTATE_AWAKE           : 1,
        WAKEUPSTATE_INVALID         : -1,
        RTCTIME_INVALID             : YAPI_INVALID_LONG
    }, {
        // Class methods
        FindWakeUpMonitor           : YWakeUpMonitor_FindWakeUpMonitor,
        FirstWakeUpMonitor          : YWakeUpMonitor_FirstWakeUpMonitor
    }, {
        // Methods
        get_powerDuration           : YWakeUpMonitor_get_powerDuration,
        powerDuration               : YWakeUpMonitor_get_powerDuration,
        get_powerDuration_async     : YWakeUpMonitor_get_powerDuration_async,
        powerDuration_async         : YWakeUpMonitor_get_powerDuration_async,
        set_powerDuration           : YWakeUpMonitor_set_powerDuration,
        setPowerDuration            : YWakeUpMonitor_set_powerDuration,
        get_sleepCountdown          : YWakeUpMonitor_get_sleepCountdown,
        sleepCountdown              : YWakeUpMonitor_get_sleepCountdown,
        get_sleepCountdown_async    : YWakeUpMonitor_get_sleepCountdown_async,
        sleepCountdown_async        : YWakeUpMonitor_get_sleepCountdown_async,
        set_sleepCountdown          : YWakeUpMonitor_set_sleepCountdown,
        setSleepCountdown           : YWakeUpMonitor_set_sleepCountdown,
        get_nextWakeUp              : YWakeUpMonitor_get_nextWakeUp,
        nextWakeUp                  : YWakeUpMonitor_get_nextWakeUp,
        get_nextWakeUp_async        : YWakeUpMonitor_get_nextWakeUp_async,
        nextWakeUp_async            : YWakeUpMonitor_get_nextWakeUp_async,
        set_nextWakeUp              : YWakeUpMonitor_set_nextWakeUp,
        setNextWakeUp               : YWakeUpMonitor_set_nextWakeUp,
        get_wakeUpReason            : YWakeUpMonitor_get_wakeUpReason,
        wakeUpReason                : YWakeUpMonitor_get_wakeUpReason,
        get_wakeUpReason_async      : YWakeUpMonitor_get_wakeUpReason_async,
        wakeUpReason_async          : YWakeUpMonitor_get_wakeUpReason_async,
        get_wakeUpState             : YWakeUpMonitor_get_wakeUpState,
        wakeUpState                 : YWakeUpMonitor_get_wakeUpState,
        get_wakeUpState_async       : YWakeUpMonitor_get_wakeUpState_async,
        wakeUpState_async           : YWakeUpMonitor_get_wakeUpState_async,
        set_wakeUpState             : YWakeUpMonitor_set_wakeUpState,
        setWakeUpState              : YWakeUpMonitor_set_wakeUpState,
        get_rtcTime                 : YWakeUpMonitor_get_rtcTime,
        rtcTime                     : YWakeUpMonitor_get_rtcTime,
        get_rtcTime_async           : YWakeUpMonitor_get_rtcTime_async,
        rtcTime_async               : YWakeUpMonitor_get_rtcTime_async,
        wakeUp                      : YWakeUpMonitor_wakeUp,
        sleep                       : YWakeUpMonitor_sleep,
        sleepFor                    : YWakeUpMonitor_sleepFor,
        sleepUntil                  : YWakeUpMonitor_sleepUntil,
        resetSleepCountDown         : YWakeUpMonitor_resetSleepCountDown,
        nextWakeUpMonitor           : YWakeUpMonitor_nextWakeUpMonitor,
        _parseAttr                  : YWakeUpMonitor_parseAttr
    });
    //--- (end of YWakeUpMonitor initialization)
})();

//--- (YWakeUpMonitor functions)

/**
 * Retrieves a wake-up monitor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the wake-up monitor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YWakeUpMonitor.isOnline() to test if the wake-up monitor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a wake-up monitor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the wake-up monitor, for instance
 *         YHUBGSM5.wakeUpMonitor.
 *
 * @return a YWakeUpMonitor object allowing you to drive the wake-up monitor.
 */
function yFindWakeUpMonitor(func)
{
    return YWakeUpMonitor.FindWakeUpMonitor(func);
}

/**
 * Starts the enumeration of wake-up monitors currently accessible.
 * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
 * next wake-up monitors.
 *
 * @return a pointer to a YWakeUpMonitor object, corresponding to
 *         the first wake-up monitor currently online, or a null pointer
 *         if there are none.
 */
function yFirstWakeUpMonitor()
{
    return YWakeUpMonitor.FirstWakeUpMonitor();
}

//--- (end of YWakeUpMonitor functions)
