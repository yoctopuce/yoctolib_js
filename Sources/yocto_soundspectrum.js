/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SoundSpectrum functions
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

//--- (YSoundSpectrum return codes)
//--- (end of YSoundSpectrum return codes)
//--- (YSoundSpectrum definitions)
var Y_INTEGRATIONTIME_INVALID       = YAPI_INVALID_UINT;
var Y_SPECTRUMDATA_INVALID          = YAPI_INVALID_STRING;
//--- (end of YSoundSpectrum definitions)

//--- (YSoundSpectrum class start)
/**
 * YSoundSpectrum Class: sound spectrum analyzer control interface
 *
 * The YSoundSpectrum class allows you to read and configure Yoctopuce sound spectrum analyzers.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSoundSpectrum class start)

var YSoundSpectrum; // definition below
(function()
{
    function _YSoundSpectrum(str_func)
    {
        //--- (YSoundSpectrum constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'SoundSpectrum';

        this._integrationTime                = Y_INTEGRATIONTIME_INVALID;  // UInt31
        this._spectrumData                   = Y_SPECTRUMDATA_INVALID;     // BinaryBuffer
        //--- (end of YSoundSpectrum constructor)
    }

    //--- (YSoundSpectrum implementation)

    function YSoundSpectrum_parseAttr(name, val, _super)
    {
        switch(name) {
        case "integrationTime":
            this._integrationTime = parseInt(val);
            return 1;
        case "spectrumData":
            this._spectrumData = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the integration time in milliseconds for calculating time
     * weighted spectrum data.
     *
     * @return an integer corresponding to the integration time in milliseconds for calculating time
     *         weighted spectrum data
     *
     * On failure, throws an exception or returns YSoundSpectrum.INTEGRATIONTIME_INVALID.
     */
    function YSoundSpectrum_get_integrationTime()
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
     * Gets the integration time in milliseconds for calculating time
     * weighted spectrum data.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSoundSpectrum object that invoked the callback
     *         - the result:an integer corresponding to the integration time in milliseconds for calculating time
     *         weighted spectrum data
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSoundSpectrum.INTEGRATIONTIME_INVALID.
     */
    function YSoundSpectrum_get_integrationTime_async(callback,context)
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
     * Changes the integration time in milliseconds for computing time weighted
     * spectrum data. Be aware that on some devices, changing the integration
     * time for time-weighted spectrum data may also affect the integration
     * period for one or more sound pressure level measurements.
     * Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the integration time in milliseconds for computing time weighted
     *         spectrum data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSoundSpectrum_set_integrationTime(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('integrationTime',rest_val);
    }

    function YSoundSpectrum_get_spectrumData()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SPECTRUMDATA_INVALID;
            }
        }
        res = this._spectrumData;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSoundSpectrum object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YSoundSpectrum_get_spectrumData_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SPECTRUMDATA_INVALID);
            } else {
                callback(context, obj, obj._spectrumData);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a sound spectrum analyzer for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the sound spectrum analyzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSoundSpectrum.isOnline() to test if the sound spectrum analyzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sound spectrum analyzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the sound spectrum analyzer, for instance
     *         MyDevice.soundSpectrum.
     *
     * @return a YSoundSpectrum object allowing you to drive the sound spectrum analyzer.
     */
    function YSoundSpectrum_FindSoundSpectrum(func)             // class method
    {
        var obj;                    // YSoundSpectrum;
        obj = YFunction._FindFromCache("SoundSpectrum", func);
        if (obj == null) {
            obj = new YSoundSpectrum(func);
            YFunction._AddToCache("SoundSpectrum", func, obj);
        }
        return obj;
    }

    /**
     * comment from .yc definition
     */
    function YSoundSpectrum_nextSoundSpectrum()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSoundSpectrum.FindSoundSpectrum(next_hwid);
    }

    /**
     * comment from .yc definition
     */
    function YSoundSpectrum_FirstSoundSpectrum()
    {
        var next_hwid = YAPI.getFirstHardwareId('SoundSpectrum');
        if(next_hwid == null) return null;
        return YSoundSpectrum.FindSoundSpectrum(next_hwid);
    }

    //--- (end of YSoundSpectrum implementation)

    //--- (YSoundSpectrum initialization)
    YSoundSpectrum = YFunction._Subclass(_YSoundSpectrum, {
        // Constants
        INTEGRATIONTIME_INVALID     : YAPI_INVALID_UINT,
        SPECTRUMDATA_INVALID        : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindSoundSpectrum           : YSoundSpectrum_FindSoundSpectrum,
        FirstSoundSpectrum          : YSoundSpectrum_FirstSoundSpectrum
    }, {
        // Methods
        get_integrationTime         : YSoundSpectrum_get_integrationTime,
        integrationTime             : YSoundSpectrum_get_integrationTime,
        get_integrationTime_async   : YSoundSpectrum_get_integrationTime_async,
        integrationTime_async       : YSoundSpectrum_get_integrationTime_async,
        set_integrationTime         : YSoundSpectrum_set_integrationTime,
        setIntegrationTime          : YSoundSpectrum_set_integrationTime,
        get_spectrumData            : YSoundSpectrum_get_spectrumData,
        spectrumData                : YSoundSpectrum_get_spectrumData,
        get_spectrumData_async      : YSoundSpectrum_get_spectrumData_async,
        spectrumData_async          : YSoundSpectrum_get_spectrumData_async,
        nextSoundSpectrum           : YSoundSpectrum_nextSoundSpectrum,
        _parseAttr                  : YSoundSpectrum_parseAttr
    });
    //--- (end of YSoundSpectrum initialization)
})();

//--- (YSoundSpectrum functions)

/**
 * Retrieves a sound spectrum analyzer for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the sound spectrum analyzer is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSoundSpectrum.isOnline() to test if the sound spectrum analyzer is
 * indeed online at a given time. In case of ambiguity when looking for
 * a sound spectrum analyzer by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the sound spectrum analyzer, for instance
 *         MyDevice.soundSpectrum.
 *
 * @return a YSoundSpectrum object allowing you to drive the sound spectrum analyzer.
 */
function yFindSoundSpectrum(func)
{
    return YSoundSpectrum.FindSoundSpectrum(func);
}

/**
 * comment from .yc definition
 */
function yFirstSoundSpectrum()
{
    return YSoundSpectrum.FirstSoundSpectrum();
}

//--- (end of YSoundSpectrum functions)
