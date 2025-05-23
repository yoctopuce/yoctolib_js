/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Compass functions
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

//--- (YCompass return codes)
//--- (end of YCompass return codes)
//--- (YCompass definitions)
var Y_AXIS_X                        = 0;
var Y_AXIS_Y                        = 1;
var Y_AXIS_Z                        = 2;
var Y_AXIS_INVALID                  = -1;
var Y_BANDWIDTH_INVALID             = YAPI_INVALID_UINT;
var Y_MAGNETICHEADING_INVALID       = YAPI_INVALID_DOUBLE;
//--- (end of YCompass definitions)

//--- (YCompass class start)
/**
 * YCompass Class: compass function control interface, available for instance in the Yocto-3D-V2
 *
 * The YCompass class allows you to read and configure Yoctopuce compass functions.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YCompass class start)

var YCompass; // definition below
(function()
{
    function _YCompass(str_func)
    {
        //--- (YCompass constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Compass';

        this._bandwidth                      = Y_BANDWIDTH_INVALID;        // UInt31
        this._axis                           = Y_AXIS_INVALID;             // Axis
        this._magneticHeading                = Y_MAGNETICHEADING_INVALID;  // MeasureVal
        //--- (end of YCompass constructor)
    }

    //--- (YCompass implementation)

    function YCompass_parseAttr(name, val, _super)
    {
        switch(name) {
        case "bandwidth":
            this._bandwidth = parseInt(val);
            return 1;
        case "axis":
            this._axis = parseInt(val);
            return 1;
        case "magneticHeading":
            this._magneticHeading = Math.round(val / 65.536) / 1000.0;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the measure update frequency, measured in Hz.
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz
     *
     * On failure, throws an exception or returns YCompass.BANDWIDTH_INVALID.
     */
    function YCompass_get_bandwidth()
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
     * Gets the measure update frequency, measured in Hz.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCompass object that invoked the callback
     *         - the result:an integer corresponding to the measure update frequency, measured in Hz
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YCompass.BANDWIDTH_INVALID.
     */
    function YCompass_get_bandwidth_async(callback,context)
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
     * Changes the measure update frequency, measured in Hz. When the
     * frequency is lower, the device performs averaging.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the measure update frequency, measured in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCompass_set_bandwidth(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('bandwidth',rest_val);
    }

    function YCompass_get_axis()
    {
        var res;                    // enumAXIS;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_AXIS_INVALID;
            }
        }
        res = this._axis;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCompass object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YCompass_get_axis_async(callback,context)
    {
        var res;                    // enumAXIS;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_AXIS_INVALID);
            } else {
                callback(context, obj, obj._axis);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the magnetic heading, regardless of the configured bearing.
     *
     * @return a floating point number corresponding to the magnetic heading, regardless of the configured bearing
     *
     * On failure, throws an exception or returns YCompass.MAGNETICHEADING_INVALID.
     */
    function YCompass_get_magneticHeading()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MAGNETICHEADING_INVALID;
            }
        }
        res = this._magneticHeading;
        return res;
    }

    /**
     * Gets the magnetic heading, regardless of the configured bearing.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCompass object that invoked the callback
     *         - the result:a floating point number corresponding to the magnetic heading, regardless of the configured bearing
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YCompass.MAGNETICHEADING_INVALID.
     */
    function YCompass_get_magneticHeading_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MAGNETICHEADING_INVALID);
            } else {
                callback(context, obj, obj._magneticHeading);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a compass function for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the compass function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCompass.isOnline() to test if the compass function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a compass function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the compass function, for instance
     *         Y3DMK002.compass.
     *
     * @return a YCompass object allowing you to drive the compass function.
     */
    function YCompass_FindCompass(func)                         // class method
    {
        var obj;                    // YCompass;
        obj = YFunction._FindFromCache("Compass", func);
        if (obj == null) {
            obj = new YCompass(func);
            YFunction._AddToCache("Compass", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of compass functions started using yFirstCompass().
     * Caution: You can't make any assumption about the returned compass functions order.
     * If you want to find a specific a compass function, use Compass.findCompass()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YCompass object, corresponding to
     *         a compass function currently online, or a null pointer
     *         if there are no more compass functions to enumerate.
     */
    function YCompass_nextCompass()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YCompass.FindCompass(next_hwid);
    }

    /**
     * Starts the enumeration of compass functions currently accessible.
     * Use the method YCompass.nextCompass() to iterate on
     * next compass functions.
     *
     * @return a pointer to a YCompass object, corresponding to
     *         the first compass function currently online, or a null pointer
     *         if there are none.
     */
    function YCompass_FirstCompass()
    {
        var next_hwid = YAPI.getFirstHardwareId('Compass');
        if(next_hwid == null) return null;
        return YCompass.FindCompass(next_hwid);
    }

    //--- (end of YCompass implementation)

    //--- (YCompass initialization)
    YCompass = YSensor._Subclass(_YCompass, {
        // Constants
        BANDWIDTH_INVALID           : YAPI_INVALID_UINT,
        AXIS_X                      : 0,
        AXIS_Y                      : 1,
        AXIS_Z                      : 2,
        AXIS_INVALID                : -1,
        MAGNETICHEADING_INVALID     : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindCompass                 : YCompass_FindCompass,
        FirstCompass                : YCompass_FirstCompass
    }, {
        // Methods
        get_bandwidth               : YCompass_get_bandwidth,
        bandwidth                   : YCompass_get_bandwidth,
        get_bandwidth_async         : YCompass_get_bandwidth_async,
        bandwidth_async             : YCompass_get_bandwidth_async,
        set_bandwidth               : YCompass_set_bandwidth,
        setBandwidth                : YCompass_set_bandwidth,
        get_axis                    : YCompass_get_axis,
        axis                        : YCompass_get_axis,
        get_axis_async              : YCompass_get_axis_async,
        axis_async                  : YCompass_get_axis_async,
        get_magneticHeading         : YCompass_get_magneticHeading,
        magneticHeading             : YCompass_get_magneticHeading,
        get_magneticHeading_async   : YCompass_get_magneticHeading_async,
        magneticHeading_async       : YCompass_get_magneticHeading_async,
        nextCompass                 : YCompass_nextCompass,
        _parseAttr                  : YCompass_parseAttr
    });
    //--- (end of YCompass initialization)
})();

//--- (YCompass functions)

/**
 * Retrieves a compass function for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the compass function is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YCompass.isOnline() to test if the compass function is
 * indeed online at a given time. In case of ambiguity when looking for
 * a compass function by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the compass function, for instance
 *         Y3DMK002.compass.
 *
 * @return a YCompass object allowing you to drive the compass function.
 */
function yFindCompass(func)
{
    return YCompass.FindCompass(func);
}

/**
 * Starts the enumeration of compass functions currently accessible.
 * Use the method YCompass.nextCompass() to iterate on
 * next compass functions.
 *
 * @return a pointer to a YCompass object, corresponding to
 *         the first compass function currently online, or a null pointer
 *         if there are none.
 */
function yFirstCompass()
{
    return YCompass.FirstCompass();
}

//--- (end of YCompass functions)
