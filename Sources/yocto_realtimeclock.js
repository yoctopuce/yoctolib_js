/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for RealTimeClock functions
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

//--- (YRealTimeClock return codes)
//--- (end of YRealTimeClock return codes)
//--- (YRealTimeClock definitions)
var Y_TIMESET_FALSE                 = 0;
var Y_TIMESET_TRUE                  = 1;
var Y_TIMESET_INVALID               = -1;
var Y_DISABLEHOSTSYNC_FALSE         = 0;
var Y_DISABLEHOSTSYNC_TRUE          = 1;
var Y_DISABLEHOSTSYNC_INVALID       = -1;
var Y_UNIXTIME_INVALID              = YAPI_INVALID_LONG;
var Y_DATETIME_INVALID              = YAPI_INVALID_STRING;
var Y_UTCOFFSET_INVALID             = YAPI_INVALID_INT;
//--- (end of YRealTimeClock definitions)

//--- (YRealTimeClock class start)
/**
 * YRealTimeClock Class: real-time clock control interface, available for instance in the
 * YoctoHub-GSM-4G, the YoctoHub-Wireless-SR, the YoctoHub-Wireless-g or the YoctoHub-Wireless-n
 *
 * The YRealTimeClock class provide access to the embedded real-time clock available on some Yoctopuce
 * devices. It can provide current date and time, even after a power outage
 * lasting several days. It is the base for automated wake-up functions provided by the WakeUpScheduler.
 * The current time may represent a local time as well as an UTC time, but no automatic time change
 * will occur to account for daylight saving time.
 */
//--- (end of YRealTimeClock class start)

var YRealTimeClock; // definition below
(function()
{
    function _YRealTimeClock(str_func)
    {
        //--- (YRealTimeClock constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'RealTimeClock';

        this._unixTime                       = Y_UNIXTIME_INVALID;         // UTCTime
        this._dateTime                       = Y_DATETIME_INVALID;         // Text
        this._utcOffset                      = Y_UTCOFFSET_INVALID;        // Int
        this._timeSet                        = Y_TIMESET_INVALID;          // Bool
        this._disableHostSync                = Y_DISABLEHOSTSYNC_INVALID;  // Bool
        //--- (end of YRealTimeClock constructor)
    }

    //--- (YRealTimeClock implementation)

    function YRealTimeClock_parseAttr(name, val, _super)
    {
        switch(name) {
        case "unixTime":
            this._unixTime = parseInt(val);
            return 1;
        case "dateTime":
            this._dateTime = val;
            return 1;
        case "utcOffset":
            this._utcOffset = parseInt(val);
            return 1;
        case "timeSet":
            this._timeSet = parseInt(val);
            return 1;
        case "disableHostSync":
            this._disableHostSync = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current time in Unix format (number of elapsed seconds since Jan 1st, 1970).
     *
     * @return an integer corresponding to the current time in Unix format (number of elapsed seconds
     * since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns YRealTimeClock.UNIXTIME_INVALID.
     */
    function YRealTimeClock_get_unixTime()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_UNIXTIME_INVALID;
            }
        }
        res = this._unixTime;
        return res;
    }

    /**
     * Gets the current time in Unix format (number of elapsed seconds since Jan 1st, 1970).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRealTimeClock object that invoked the callback
     *         - the result:an integer corresponding to the current time in Unix format (number of elapsed seconds
     *         since Jan 1st, 1970)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRealTimeClock.UNIXTIME_INVALID.
     */
    function YRealTimeClock_get_unixTime_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_UNIXTIME_INVALID);
            } else {
                callback(context, obj, obj._unixTime);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current time. Time is specifid in Unix format (number of elapsed seconds since Jan 1st, 1970).
     *
     * @param newval : an integer corresponding to the current time
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRealTimeClock_set_unixTime(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('unixTime',rest_val);
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns YRealTimeClock.DATETIME_INVALID.
     */
    function YRealTimeClock_get_dateTime()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DATETIME_INVALID;
            }
        }
        res = this._dateTime;
        return res;
    }

    /**
     * Gets the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRealTimeClock object that invoked the callback
     *         - the result:a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRealTimeClock.DATETIME_INVALID.
     */
    function YRealTimeClock_get_dateTime_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DATETIME_INVALID);
            } else {
                callback(context, obj, obj._dateTime);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns YRealTimeClock.UTCOFFSET_INVALID.
     */
    function YRealTimeClock_get_utcOffset()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_UTCOFFSET_INVALID;
            }
        }
        res = this._utcOffset;
        return res;
    }

    /**
     * Gets the number of seconds between current time and UTC time (time zone).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRealTimeClock object that invoked the callback
     *         - the result:an integer corresponding to the number of seconds between current time and UTC time (time zone)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRealTimeClock.UTCOFFSET_INVALID.
     */
    function YRealTimeClock_get_utcOffset_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_UTCOFFSET_INVALID);
            } else {
                callback(context, obj, obj._utcOffset);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRealTimeClock_set_utcOffset(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('utcOffset',rest_val);
    }

    /**
     * Returns true if the clock has been set, and false otherwise.
     *
     * @return either YRealTimeClock.TIMESET_FALSE or YRealTimeClock.TIMESET_TRUE, according to true if
     * the clock has been set, and false otherwise
     *
     * On failure, throws an exception or returns YRealTimeClock.TIMESET_INVALID.
     */
    function YRealTimeClock_get_timeSet()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TIMESET_INVALID;
            }
        }
        res = this._timeSet;
        return res;
    }

    /**
     * Gets true if the clock has been set, and false otherwise.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRealTimeClock object that invoked the callback
     *         - the result:either YRealTimeClock.TIMESET_FALSE or YRealTimeClock.TIMESET_TRUE, according to true
     *         if the clock has been set, and false otherwise
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRealTimeClock.TIMESET_INVALID.
     */
    function YRealTimeClock_get_timeSet_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TIMESET_INVALID);
            } else {
                callback(context, obj, obj._timeSet);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns true if the automatic clock synchronization with host has been disabled,
     * and false otherwise.
     *
     * @return either YRealTimeClock.DISABLEHOSTSYNC_FALSE or YRealTimeClock.DISABLEHOSTSYNC_TRUE,
     * according to true if the automatic clock synchronization with host has been disabled,
     *         and false otherwise
     *
     * On failure, throws an exception or returns YRealTimeClock.DISABLEHOSTSYNC_INVALID.
     */
    function YRealTimeClock_get_disableHostSync()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DISABLEHOSTSYNC_INVALID;
            }
        }
        res = this._disableHostSync;
        return res;
    }

    /**
     * Gets true if the automatic clock synchronization with host has been disabled,
     * and false otherwise.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRealTimeClock object that invoked the callback
     *         - the result:either YRealTimeClock.DISABLEHOSTSYNC_FALSE or YRealTimeClock.DISABLEHOSTSYNC_TRUE,
     *         according to true if the automatic clock synchronization with host has been disabled,
     *         and false otherwise
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRealTimeClock.DISABLEHOSTSYNC_INVALID.
     */
    function YRealTimeClock_get_disableHostSync_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DISABLEHOSTSYNC_INVALID);
            } else {
                callback(context, obj, obj._disableHostSync);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the automatic clock synchronization with host working state.
     * To disable automatic synchronization, set the value to true.
     * To enable automatic synchronization (default), set the value to false.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : either YRealTimeClock.DISABLEHOSTSYNC_FALSE or YRealTimeClock.DISABLEHOSTSYNC_TRUE,
     * according to the automatic clock synchronization with host working state
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRealTimeClock_set_disableHostSync(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('disableHostSync',rest_val);
    }

    /**
     * Retrieves a real-time clock for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the real-time clock is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRealTimeClock.isOnline() to test if the real-time clock is
     * indeed online at a given time. In case of ambiguity when looking for
     * a real-time clock by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the real-time clock, for instance
     *         YHUBGSM5.realTimeClock.
     *
     * @return a YRealTimeClock object allowing you to drive the real-time clock.
     */
    function YRealTimeClock_FindRealTimeClock(func)             // class method
    {
        var obj;                    // YRealTimeClock;
        obj = YFunction._FindFromCache("RealTimeClock", func);
        if (obj == null) {
            obj = new YRealTimeClock(func);
            YFunction._AddToCache("RealTimeClock", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of real-time clocks started using yFirstRealTimeClock().
     * Caution: You can't make any assumption about the returned real-time clocks order.
     * If you want to find a specific a real-time clock, use RealTimeClock.findRealTimeClock()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YRealTimeClock object, corresponding to
     *         a real-time clock currently online, or a null pointer
     *         if there are no more real-time clocks to enumerate.
     */
    function YRealTimeClock_nextRealTimeClock()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YRealTimeClock.FindRealTimeClock(next_hwid);
    }

    /**
     * Starts the enumeration of real-time clocks currently accessible.
     * Use the method YRealTimeClock.nextRealTimeClock() to iterate on
     * next real-time clocks.
     *
     * @return a pointer to a YRealTimeClock object, corresponding to
     *         the first real-time clock currently online, or a null pointer
     *         if there are none.
     */
    function YRealTimeClock_FirstRealTimeClock()
    {
        var next_hwid = YAPI.getFirstHardwareId('RealTimeClock');
        if(next_hwid == null) return null;
        return YRealTimeClock.FindRealTimeClock(next_hwid);
    }

    //--- (end of YRealTimeClock implementation)

    //--- (YRealTimeClock initialization)
    YRealTimeClock = YFunction._Subclass(_YRealTimeClock, {
        // Constants
        UNIXTIME_INVALID            : YAPI_INVALID_LONG,
        DATETIME_INVALID            : YAPI_INVALID_STRING,
        UTCOFFSET_INVALID           : YAPI_INVALID_INT,
        TIMESET_FALSE               : 0,
        TIMESET_TRUE                : 1,
        TIMESET_INVALID             : -1,
        DISABLEHOSTSYNC_FALSE       : 0,
        DISABLEHOSTSYNC_TRUE        : 1,
        DISABLEHOSTSYNC_INVALID     : -1
    }, {
        // Class methods
        FindRealTimeClock           : YRealTimeClock_FindRealTimeClock,
        FirstRealTimeClock          : YRealTimeClock_FirstRealTimeClock
    }, {
        // Methods
        get_unixTime                : YRealTimeClock_get_unixTime,
        unixTime                    : YRealTimeClock_get_unixTime,
        get_unixTime_async          : YRealTimeClock_get_unixTime_async,
        unixTime_async              : YRealTimeClock_get_unixTime_async,
        set_unixTime                : YRealTimeClock_set_unixTime,
        setUnixTime                 : YRealTimeClock_set_unixTime,
        get_dateTime                : YRealTimeClock_get_dateTime,
        dateTime                    : YRealTimeClock_get_dateTime,
        get_dateTime_async          : YRealTimeClock_get_dateTime_async,
        dateTime_async              : YRealTimeClock_get_dateTime_async,
        get_utcOffset               : YRealTimeClock_get_utcOffset,
        utcOffset                   : YRealTimeClock_get_utcOffset,
        get_utcOffset_async         : YRealTimeClock_get_utcOffset_async,
        utcOffset_async             : YRealTimeClock_get_utcOffset_async,
        set_utcOffset               : YRealTimeClock_set_utcOffset,
        setUtcOffset                : YRealTimeClock_set_utcOffset,
        get_timeSet                 : YRealTimeClock_get_timeSet,
        timeSet                     : YRealTimeClock_get_timeSet,
        get_timeSet_async           : YRealTimeClock_get_timeSet_async,
        timeSet_async               : YRealTimeClock_get_timeSet_async,
        get_disableHostSync         : YRealTimeClock_get_disableHostSync,
        disableHostSync             : YRealTimeClock_get_disableHostSync,
        get_disableHostSync_async   : YRealTimeClock_get_disableHostSync_async,
        disableHostSync_async       : YRealTimeClock_get_disableHostSync_async,
        set_disableHostSync         : YRealTimeClock_set_disableHostSync,
        setDisableHostSync          : YRealTimeClock_set_disableHostSync,
        nextRealTimeClock           : YRealTimeClock_nextRealTimeClock,
        _parseAttr                  : YRealTimeClock_parseAttr
    });
    //--- (end of YRealTimeClock initialization)
})();

//--- (YRealTimeClock functions)

/**
 * Retrieves a real-time clock for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the real-time clock is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YRealTimeClock.isOnline() to test if the real-time clock is
 * indeed online at a given time. In case of ambiguity when looking for
 * a real-time clock by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the real-time clock, for instance
 *         YHUBGSM5.realTimeClock.
 *
 * @return a YRealTimeClock object allowing you to drive the real-time clock.
 */
function yFindRealTimeClock(func)
{
    return YRealTimeClock.FindRealTimeClock(func);
}

/**
 * Starts the enumeration of real-time clocks currently accessible.
 * Use the method YRealTimeClock.nextRealTimeClock() to iterate on
 * next real-time clocks.
 *
 * @return a pointer to a YRealTimeClock object, corresponding to
 *         the first real-time clock currently online, or a null pointer
 *         if there are none.
 */
function yFirstRealTimeClock()
{
    return YRealTimeClock.FirstRealTimeClock();
}

//--- (end of YRealTimeClock functions)
