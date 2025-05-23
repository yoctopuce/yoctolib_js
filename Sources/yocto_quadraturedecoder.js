/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for QuadratureDecoder functions
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

//--- (YQuadratureDecoder return codes)
//--- (end of YQuadratureDecoder return codes)
//--- (YQuadratureDecoder definitions)
var Y_DECODING_OFF                  = 0;
var Y_DECODING_ON                   = 1;
var Y_DECODING_INVALID              = -1;
var Y_SPEED_INVALID                 = YAPI_INVALID_DOUBLE;
var Y_EDGESPERCYCLE_INVALID         = YAPI_INVALID_UINT;
//--- (end of YQuadratureDecoder definitions)

//--- (YQuadratureDecoder class start)
/**
 * YQuadratureDecoder Class: quadrature decoder control interface, available for instance in the
 * Yocto-MaxiKnob or the Yocto-PWM-Rx
 *
 * The YQuadratureDecoder class allows you to read and configure Yoctopuce quadrature decoders.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YQuadratureDecoder class start)

var YQuadratureDecoder; // definition below
(function()
{
    function _YQuadratureDecoder(str_func)
    {
        //--- (YQuadratureDecoder constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'QuadratureDecoder';

        this._speed                          = Y_SPEED_INVALID;            // MeasureVal
        this._decoding                       = Y_DECODING_INVALID;         // OnOff
        this._edgesPerCycle                  = Y_EDGESPERCYCLE_INVALID;    // UInt31
        //--- (end of YQuadratureDecoder constructor)
    }

    //--- (YQuadratureDecoder implementation)

    function YQuadratureDecoder_parseAttr(name, val, _super)
    {
        switch(name) {
        case "speed":
            this._speed = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "decoding":
            this._decoding = parseInt(val);
            return 1;
        case "edgesPerCycle":
            this._edgesPerCycle = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the current expected position of the quadrature decoder.
     * Invoking this function implicitly activates the quadrature decoder.
     *
     * @param newval : a floating point number corresponding to the current expected position of the quadrature decoder
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YQuadratureDecoder_set_currentValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('currentValue',rest_val);
    }

    /**
     * Returns the cycle frequency, in Hz.
     *
     * @return a floating point number corresponding to the cycle frequency, in Hz
     *
     * On failure, throws an exception or returns YQuadratureDecoder.SPEED_INVALID.
     */
    function YQuadratureDecoder_get_speed()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SPEED_INVALID;
            }
        }
        res = this._speed;
        return res;
    }

    /**
     * Gets the cycle frequency, in Hz.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YQuadratureDecoder object that invoked the callback
     *         - the result:a floating point number corresponding to the cycle frequency, in Hz
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YQuadratureDecoder.SPEED_INVALID.
     */
    function YQuadratureDecoder_get_speed_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SPEED_INVALID);
            } else {
                callback(context, obj, obj._speed);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current activation state of the quadrature decoder.
     *
     * @return either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON, according to the
     * current activation state of the quadrature decoder
     *
     * On failure, throws an exception or returns YQuadratureDecoder.DECODING_INVALID.
     */
    function YQuadratureDecoder_get_decoding()
    {
        var res;                    // enumONOFF;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DECODING_INVALID;
            }
        }
        res = this._decoding;
        return res;
    }

    /**
     * Gets the current activation state of the quadrature decoder.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YQuadratureDecoder object that invoked the callback
     *         - the result:either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON, according to
     *         the current activation state of the quadrature decoder
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YQuadratureDecoder.DECODING_INVALID.
     */
    function YQuadratureDecoder_get_decoding_async(callback,context)
    {
        var res;                    // enumONOFF;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DECODING_INVALID);
            } else {
                callback(context, obj, obj._decoding);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the activation state of the quadrature decoder.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON, according
     * to the activation state of the quadrature decoder
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YQuadratureDecoder_set_decoding(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('decoding',rest_val);
    }

    /**
     * Returns the edge count per full cycle configuration setting.
     *
     * @return an integer corresponding to the edge count per full cycle configuration setting
     *
     * On failure, throws an exception or returns YQuadratureDecoder.EDGESPERCYCLE_INVALID.
     */
    function YQuadratureDecoder_get_edgesPerCycle()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_EDGESPERCYCLE_INVALID;
            }
        }
        res = this._edgesPerCycle;
        return res;
    }

    /**
     * Gets the edge count per full cycle configuration setting.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YQuadratureDecoder object that invoked the callback
     *         - the result:an integer corresponding to the edge count per full cycle configuration setting
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YQuadratureDecoder.EDGESPERCYCLE_INVALID.
     */
    function YQuadratureDecoder_get_edgesPerCycle_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_EDGESPERCYCLE_INVALID);
            } else {
                callback(context, obj, obj._edgesPerCycle);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the edge count per full cycle configuration setting.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the edge count per full cycle configuration setting
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YQuadratureDecoder_set_edgesPerCycle(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('edgesPerCycle',rest_val);
    }

    /**
     * Retrieves a quadrature decoder for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the quadrature decoder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQuadratureDecoder.isOnline() to test if the quadrature decoder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quadrature decoder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the quadrature decoder, for instance
     *         YMXBTN01.quadratureDecoder1.
     *
     * @return a YQuadratureDecoder object allowing you to drive the quadrature decoder.
     */
    function YQuadratureDecoder_FindQuadratureDecoder(func)     // class method
    {
        var obj;                    // YQuadratureDecoder;
        obj = YFunction._FindFromCache("QuadratureDecoder", func);
        if (obj == null) {
            obj = new YQuadratureDecoder(func);
            YFunction._AddToCache("QuadratureDecoder", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of quadrature decoders started using yFirstQuadratureDecoder().
     * Caution: You can't make any assumption about the returned quadrature decoders order.
     * If you want to find a specific a quadrature decoder, use QuadratureDecoder.findQuadratureDecoder()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YQuadratureDecoder object, corresponding to
     *         a quadrature decoder currently online, or a null pointer
     *         if there are no more quadrature decoders to enumerate.
     */
    function YQuadratureDecoder_nextQuadratureDecoder()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoder(next_hwid);
    }

    /**
     * Starts the enumeration of quadrature decoders currently accessible.
     * Use the method YQuadratureDecoder.nextQuadratureDecoder() to iterate on
     * next quadrature decoders.
     *
     * @return a pointer to a YQuadratureDecoder object, corresponding to
     *         the first quadrature decoder currently online, or a null pointer
     *         if there are none.
     */
    function YQuadratureDecoder_FirstQuadratureDecoder()
    {
        var next_hwid = YAPI.getFirstHardwareId('QuadratureDecoder');
        if(next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoder(next_hwid);
    }

    //--- (end of YQuadratureDecoder implementation)

    //--- (YQuadratureDecoder initialization)
    YQuadratureDecoder = YSensor._Subclass(_YQuadratureDecoder, {
        // Constants
        SPEED_INVALID               : YAPI_INVALID_DOUBLE,
        DECODING_OFF                : 0,
        DECODING_ON                 : 1,
        DECODING_INVALID            : -1,
        EDGESPERCYCLE_INVALID       : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindQuadratureDecoder       : YQuadratureDecoder_FindQuadratureDecoder,
        FirstQuadratureDecoder      : YQuadratureDecoder_FirstQuadratureDecoder
    }, {
        // Methods
        set_currentValue            : YQuadratureDecoder_set_currentValue,
        setCurrentValue             : YQuadratureDecoder_set_currentValue,
        get_speed                   : YQuadratureDecoder_get_speed,
        speed                       : YQuadratureDecoder_get_speed,
        get_speed_async             : YQuadratureDecoder_get_speed_async,
        speed_async                 : YQuadratureDecoder_get_speed_async,
        get_decoding                : YQuadratureDecoder_get_decoding,
        decoding                    : YQuadratureDecoder_get_decoding,
        get_decoding_async          : YQuadratureDecoder_get_decoding_async,
        decoding_async              : YQuadratureDecoder_get_decoding_async,
        set_decoding                : YQuadratureDecoder_set_decoding,
        setDecoding                 : YQuadratureDecoder_set_decoding,
        get_edgesPerCycle           : YQuadratureDecoder_get_edgesPerCycle,
        edgesPerCycle               : YQuadratureDecoder_get_edgesPerCycle,
        get_edgesPerCycle_async     : YQuadratureDecoder_get_edgesPerCycle_async,
        edgesPerCycle_async         : YQuadratureDecoder_get_edgesPerCycle_async,
        set_edgesPerCycle           : YQuadratureDecoder_set_edgesPerCycle,
        setEdgesPerCycle            : YQuadratureDecoder_set_edgesPerCycle,
        nextQuadratureDecoder       : YQuadratureDecoder_nextQuadratureDecoder,
        _parseAttr                  : YQuadratureDecoder_parseAttr
    });
    //--- (end of YQuadratureDecoder initialization)
})();

//--- (YQuadratureDecoder functions)

/**
 * Retrieves a quadrature decoder for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the quadrature decoder is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YQuadratureDecoder.isOnline() to test if the quadrature decoder is
 * indeed online at a given time. In case of ambiguity when looking for
 * a quadrature decoder by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the quadrature decoder, for instance
 *         YMXBTN01.quadratureDecoder1.
 *
 * @return a YQuadratureDecoder object allowing you to drive the quadrature decoder.
 */
function yFindQuadratureDecoder(func)
{
    return YQuadratureDecoder.FindQuadratureDecoder(func);
}

/**
 * Starts the enumeration of quadrature decoders currently accessible.
 * Use the method YQuadratureDecoder.nextQuadratureDecoder() to iterate on
 * next quadrature decoders.
 *
 * @return a pointer to a YQuadratureDecoder object, corresponding to
 *         the first quadrature decoder currently online, or a null pointer
 *         if there are none.
 */
function yFirstQuadratureDecoder()
{
    return YQuadratureDecoder.FirstQuadratureDecoder();
}

//--- (end of YQuadratureDecoder functions)
