/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SoundLevel functions
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

//--- (YSoundLevel return codes)
//--- (end of YSoundLevel return codes)
//--- (YSoundLevel definitions)
var Y_LABEL_INVALID                 = YAPI_INVALID_STRING;
var Y_INTEGRATIONTIME_INVALID       = YAPI_INVALID_UINT;
//--- (end of YSoundLevel definitions)

//--- (YSoundLevel class start)
/**
 * YSoundLevel Class: sound pressure level meter control interface
 *
 * The YSoundLevel class allows you to read and configure Yoctopuce sound pressure level meters.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSoundLevel class start)

var YSoundLevel; // definition below
(function()
{
    function _YSoundLevel(str_func)
    {
        //--- (YSoundLevel constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'SoundLevel';

        this._label                          = Y_LABEL_INVALID;            // Text
        this._integrationTime                = Y_INTEGRATIONTIME_INVALID;  // UInt31
        //--- (end of YSoundLevel constructor)
    }

    //--- (YSoundLevel implementation)

    function YSoundLevel_parseAttr(name, val, _super)
    {
        switch(name) {
        case "label":
            this._label = val;
            return 1;
        case "integrationTime":
            this._integrationTime = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the measuring unit for the sound pressure level (dBA, dBC or dBZ).
     * That unit will directly determine frequency weighting to be used to compute
     * the measured value. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the sound pressure level (dBA, dBC or dBZ)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSoundLevel_set_unit(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('unit',rest_val);
    }

    /**
     * Returns the label for the sound pressure level measurement, as per
     * IEC standard 61672-1:2013.
     *
     * @return a string corresponding to the label for the sound pressure level measurement, as per
     *         IEC standard 61672-1:2013
     *
     * On failure, throws an exception or returns YSoundLevel.LABEL_INVALID.
     */
    function YSoundLevel_get_label()
    {
        var res;                    // string;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LABEL_INVALID;
            }
        }
        res = this._label;
        return res;
    }

    /**
     * Gets the label for the sound pressure level measurement, as per
     * IEC standard 61672-1:2013.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSoundLevel object that invoked the callback
     *         - the result:a string corresponding to the label for the sound pressure level measurement, as per
     *         IEC standard 61672-1:2013
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSoundLevel.LABEL_INVALID.
     */
    function YSoundLevel_get_label_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LABEL_INVALID);
            } else {
                callback(context, obj, obj._label);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the integration time in milliseconds for measuring the sound pressure level.
     *
     * @return an integer corresponding to the integration time in milliseconds for measuring the sound pressure level
     *
     * On failure, throws an exception or returns YSoundLevel.INTEGRATIONTIME_INVALID.
     */
    function YSoundLevel_get_integrationTime()
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
     * Gets the integration time in milliseconds for measuring the sound pressure level.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSoundLevel object that invoked the callback
     *         - the result:an integer corresponding to the integration time in milliseconds for measuring the
     *         sound pressure level
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSoundLevel.INTEGRATIONTIME_INVALID.
     */
    function YSoundLevel_get_integrationTime_async(callback,context)
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
     * Retrieves a sound pressure level meter for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sound pressure level meter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSoundLevel.isOnline() to test if the sound pressure level meter is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sound pressure level meter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the sound pressure level meter, for instance
     *         MyDevice.soundLevel1.
     *
     * @return a YSoundLevel object allowing you to drive the sound pressure level meter.
     */
    function YSoundLevel_FindSoundLevel(func)                   // class method
    {
        var obj;                    // YSoundLevel;
        obj = YFunction._FindFromCache("SoundLevel", func);
        if (obj == null) {
            obj = new YSoundLevel(func);
            YFunction._AddToCache("SoundLevel", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of sound pressure level meters started using yFirstSoundLevel().
     * Caution: You can't make any assumption about the returned sound pressure level meters order.
     * If you want to find a specific a sound pressure level meter, use SoundLevel.findSoundLevel()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSoundLevel object, corresponding to
     *         a sound pressure level meter currently online, or a null pointer
     *         if there are no more sound pressure level meters to enumerate.
     */
    function YSoundLevel_nextSoundLevel()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSoundLevel.FindSoundLevel(next_hwid);
    }

    /**
     * Starts the enumeration of sound pressure level meters currently accessible.
     * Use the method YSoundLevel.nextSoundLevel() to iterate on
     * next sound pressure level meters.
     *
     * @return a pointer to a YSoundLevel object, corresponding to
     *         the first sound pressure level meter currently online, or a null pointer
     *         if there are none.
     */
    function YSoundLevel_FirstSoundLevel()
    {
        var next_hwid = YAPI.getFirstHardwareId('SoundLevel');
        if(next_hwid == null) return null;
        return YSoundLevel.FindSoundLevel(next_hwid);
    }

    //--- (end of YSoundLevel implementation)

    //--- (YSoundLevel initialization)
    YSoundLevel = YSensor._Subclass(_YSoundLevel, {
        // Constants
        LABEL_INVALID               : YAPI_INVALID_STRING,
        INTEGRATIONTIME_INVALID     : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindSoundLevel              : YSoundLevel_FindSoundLevel,
        FirstSoundLevel             : YSoundLevel_FirstSoundLevel
    }, {
        // Methods
        set_unit                    : YSoundLevel_set_unit,
        setUnit                     : YSoundLevel_set_unit,
        get_label                   : YSoundLevel_get_label,
        label                       : YSoundLevel_get_label,
        get_label_async             : YSoundLevel_get_label_async,
        label_async                 : YSoundLevel_get_label_async,
        get_integrationTime         : YSoundLevel_get_integrationTime,
        integrationTime             : YSoundLevel_get_integrationTime,
        get_integrationTime_async   : YSoundLevel_get_integrationTime_async,
        integrationTime_async       : YSoundLevel_get_integrationTime_async,
        nextSoundLevel              : YSoundLevel_nextSoundLevel,
        _parseAttr                  : YSoundLevel_parseAttr
    });
    //--- (end of YSoundLevel initialization)
})();

//--- (YSoundLevel functions)

/**
 * Retrieves a sound pressure level meter for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the sound pressure level meter is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSoundLevel.isOnline() to test if the sound pressure level meter is
 * indeed online at a given time. In case of ambiguity when looking for
 * a sound pressure level meter by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the sound pressure level meter, for instance
 *         MyDevice.soundLevel1.
 *
 * @return a YSoundLevel object allowing you to drive the sound pressure level meter.
 */
function yFindSoundLevel(func)
{
    return YSoundLevel.FindSoundLevel(func);
}

/**
 * Starts the enumeration of sound pressure level meters currently accessible.
 * Use the method YSoundLevel.nextSoundLevel() to iterate on
 * next sound pressure level meters.
 *
 * @return a pointer to a YSoundLevel object, corresponding to
 *         the first sound pressure level meter currently online, or a null pointer
 *         if there are none.
 */
function yFirstSoundLevel()
{
    return YSoundLevel.FirstSoundLevel();
}

//--- (end of YSoundLevel functions)
