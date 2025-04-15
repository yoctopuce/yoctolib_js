/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for SpectralChannel functions
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

//--- (YSpectralChannel return codes)
//--- (end of YSpectralChannel return codes)
//--- (YSpectralChannel definitions)
var Y_RAWCOUNT_INVALID              = YAPI_INVALID_INT;
//--- (end of YSpectralChannel definitions)

//--- (YSpectralChannel class start)
/**
 * YSpectralChannel Class: spectral analysis channel control interface
 *
 * The YSpectralChannel class allows you to read and configure Yoctopuce spectral analysis channels.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YSpectralChannel class start)

var YSpectralChannel; // definition below
(function()
{
    function _YSpectralChannel(str_func)
    {
        //--- (YSpectralChannel constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'SpectralChannel';

        this._rawCount                       = Y_RAWCOUNT_INVALID;         // Int
        //--- (end of YSpectralChannel constructor)
    }

    //--- (YSpectralChannel implementation)

    function YSpectralChannel_parseAttr(name, val, _super)
    {
        switch(name) {
        case "rawCount":
            this._rawCount = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Retrieves the raw cspectral intensity value as measured by the sensor, without any scaling or calibration.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns YSpectralChannel.RAWCOUNT_INVALID.
     */
    function YSpectralChannel_get_rawCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RAWCOUNT_INVALID;
            }
        }
        res = this._rawCount;
        return res;
    }

    /**
     * Retrieves the raw cspectral intensity value as measured by the sensor, without any scaling or calibration.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpectralChannel object that invoked the callback
     *         - the result:an integer
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSpectralChannel.RAWCOUNT_INVALID.
     */
    function YSpectralChannel_get_rawCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RAWCOUNT_INVALID);
            } else {
                callback(context, obj, obj._rawCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a spectral analysis channel for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the spectral analysis channel is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpectralChannel.isOnline() to test if the spectral analysis channel is
     * indeed online at a given time. In case of ambiguity when looking for
     * a spectral analysis channel by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the spectral analysis channel, for instance
     *         MyDevice.spectralChannel1.
     *
     * @return a YSpectralChannel object allowing you to drive the spectral analysis channel.
     */
    function YSpectralChannel_FindSpectralChannel(func)         // class method
    {
        var obj;                    // YSpectralChannel;
        obj = YFunction._FindFromCache("SpectralChannel", func);
        if (obj == null) {
            obj = new YSpectralChannel(func);
            YFunction._AddToCache("SpectralChannel", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of spectral analysis channels started using yFirstSpectralChannel().
     * Caution: You can't make any assumption about the returned spectral analysis channels order.
     * If you want to find a specific a spectral analysis channel, use SpectralChannel.findSpectralChannel()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSpectralChannel object, corresponding to
     *         a spectral analysis channel currently online, or a null pointer
     *         if there are no more spectral analysis channels to enumerate.
     */
    function YSpectralChannel_nextSpectralChannel()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSpectralChannel.FindSpectralChannel(next_hwid);
    }

    /**
     * Starts the enumeration of spectral analysis channels currently accessible.
     * Use the method YSpectralChannel.nextSpectralChannel() to iterate on
     * next spectral analysis channels.
     *
     * @return a pointer to a YSpectralChannel object, corresponding to
     *         the first spectral analysis channel currently online, or a null pointer
     *         if there are none.
     */
    function YSpectralChannel_FirstSpectralChannel()
    {
        var next_hwid = YAPI.getFirstHardwareId('SpectralChannel');
        if(next_hwid == null) return null;
        return YSpectralChannel.FindSpectralChannel(next_hwid);
    }

    //--- (end of YSpectralChannel implementation)

    //--- (YSpectralChannel initialization)
    YSpectralChannel = YSensor._Subclass(_YSpectralChannel, {
        // Constants
        RAWCOUNT_INVALID            : YAPI_INVALID_INT
    }, {
        // Class methods
        FindSpectralChannel         : YSpectralChannel_FindSpectralChannel,
        FirstSpectralChannel        : YSpectralChannel_FirstSpectralChannel
    }, {
        // Methods
        get_rawCount                : YSpectralChannel_get_rawCount,
        rawCount                    : YSpectralChannel_get_rawCount,
        get_rawCount_async          : YSpectralChannel_get_rawCount_async,
        rawCount_async              : YSpectralChannel_get_rawCount_async,
        nextSpectralChannel         : YSpectralChannel_nextSpectralChannel,
        _parseAttr                  : YSpectralChannel_parseAttr
    });
    //--- (end of YSpectralChannel initialization)
})();

//--- (YSpectralChannel functions)

/**
 * Retrieves a spectral analysis channel for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the spectral analysis channel is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSpectralChannel.isOnline() to test if the spectral analysis channel is
 * indeed online at a given time. In case of ambiguity when looking for
 * a spectral analysis channel by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the spectral analysis channel, for instance
 *         MyDevice.spectralChannel1.
 *
 * @return a YSpectralChannel object allowing you to drive the spectral analysis channel.
 */
function yFindSpectralChannel(func)
{
    return YSpectralChannel.FindSpectralChannel(func);
}

/**
 * Starts the enumeration of spectral analysis channels currently accessible.
 * Use the method YSpectralChannel.nextSpectralChannel() to iterate on
 * next spectral analysis channels.
 *
 * @return a pointer to a YSpectralChannel object, corresponding to
 *         the first spectral analysis channel currently online, or a null pointer
 *         if there are none.
 */
function yFirstSpectralChannel()
{
    return YSpectralChannel.FirstSpectralChannel();
}

//--- (end of YSpectralChannel functions)
