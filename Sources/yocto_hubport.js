/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for HubPort functions
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

//--- (YHubPort return codes)
//--- (end of YHubPort return codes)
//--- (YHubPort definitions)
var Y_ENABLED_FALSE                 = 0;
var Y_ENABLED_TRUE                  = 1;
var Y_ENABLED_INVALID               = -1;
var Y_PORTSTATE_OFF                 = 0;
var Y_PORTSTATE_OVRLD               = 1;
var Y_PORTSTATE_ON                  = 2;
var Y_PORTSTATE_RUN                 = 3;
var Y_PORTSTATE_PROG                = 4;
var Y_PORTSTATE_INVALID             = -1;
var Y_BAUDRATE_INVALID              = YAPI_INVALID_UINT;
//--- (end of YHubPort definitions)

//--- (YHubPort class start)
/**
 * YHubPort Class: YoctoHub slave port control interface, available for instance in the
 * YoctoHub-Ethernet, the YoctoHub-GSM-4G, the YoctoHub-Shield or the YoctoHub-Wireless-n
 *
 * The YHubPort class provides control over the power supply for slave ports
 * on a YoctoHub. It provide information about the device connected to it.
 * The logical name of a YHubPort is always automatically set to the
 * unique serial number of the Yoctopuce device connected to it.
 */
//--- (end of YHubPort class start)

var YHubPort; // definition below
(function()
{
    function _YHubPort(str_func)
    {
        //--- (YHubPort constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'HubPort';

        this._enabled                        = Y_ENABLED_INVALID;          // Bool
        this._portState                      = Y_PORTSTATE_INVALID;        // PortState
        this._baudRate                       = Y_BAUDRATE_INVALID;         // BaudRate
        //--- (end of YHubPort constructor)
    }

    //--- (YHubPort implementation)

    function YHubPort_parseAttr(name, val, _super)
    {
        switch(name) {
        case "enabled":
            this._enabled = parseInt(val);
            return 1;
        case "portState":
            this._portState = parseInt(val);
            return 1;
        case "baudRate":
            this._baudRate = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns true if the YoctoHub port is powered, false otherwise.
     *
     * @return either YHubPort.ENABLED_FALSE or YHubPort.ENABLED_TRUE, according to true if the YoctoHub
     * port is powered, false otherwise
     *
     * On failure, throws an exception or returns YHubPort.ENABLED_INVALID.
     */
    function YHubPort_get_enabled()
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
     * Gets true if the YoctoHub port is powered, false otherwise.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YHubPort object that invoked the callback
     *         - the result:either YHubPort.ENABLED_FALSE or YHubPort.ENABLED_TRUE, according to true if the
     *         YoctoHub port is powered, false otherwise
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YHubPort.ENABLED_INVALID.
     */
    function YHubPort_get_enabled_async(callback,context)
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
     * Changes the activation of the YoctoHub port. If the port is enabled, the
     * connected module is powered. Otherwise, port power is shut down.
     *
     * @param newval : either YHubPort.ENABLED_FALSE or YHubPort.ENABLED_TRUE, according to the activation
     * of the YoctoHub port
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YHubPort_set_enabled(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabled',rest_val);
    }

    /**
     * Returns the current state of the YoctoHub port.
     *
     * @return a value among YHubPort.PORTSTATE_OFF, YHubPort.PORTSTATE_OVRLD, YHubPort.PORTSTATE_ON,
     * YHubPort.PORTSTATE_RUN and YHubPort.PORTSTATE_PROG corresponding to the current state of the YoctoHub port
     *
     * On failure, throws an exception or returns YHubPort.PORTSTATE_INVALID.
     */
    function YHubPort_get_portState()
    {
        var res;                    // enumPORTSTATE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PORTSTATE_INVALID;
            }
        }
        res = this._portState;
        return res;
    }

    /**
     * Gets the current state of the YoctoHub port.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YHubPort object that invoked the callback
     *         - the result:a value among YHubPort.PORTSTATE_OFF, YHubPort.PORTSTATE_OVRLD, YHubPort.PORTSTATE_ON,
     *         YHubPort.PORTSTATE_RUN and YHubPort.PORTSTATE_PROG corresponding to the current state of the YoctoHub port
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YHubPort.PORTSTATE_INVALID.
     */
    function YHubPort_get_portState_async(callback,context)
    {
        var res;                    // enumPORTSTATE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PORTSTATE_INVALID);
            } else {
                callback(context, obj, obj._portState);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current baud rate used by this YoctoHub port, in kbps.
     * The default value is 1000 kbps, but a slower rate may be used if communication
     * problems are encountered.
     *
     * @return an integer corresponding to the current baud rate used by this YoctoHub port, in kbps
     *
     * On failure, throws an exception or returns YHubPort.BAUDRATE_INVALID.
     */
    function YHubPort_get_baudRate()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BAUDRATE_INVALID;
            }
        }
        res = this._baudRate;
        return res;
    }

    /**
     * Gets the current baud rate used by this YoctoHub port, in kbps.
     * The default value is 1000 kbps, but a slower rate may be used if communication
     * problems are encountered.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YHubPort object that invoked the callback
     *         - the result:an integer corresponding to the current baud rate used by this YoctoHub port, in kbps
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YHubPort.BAUDRATE_INVALID.
     */
    function YHubPort_get_baudRate_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BAUDRATE_INVALID);
            } else {
                callback(context, obj, obj._baudRate);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a YoctoHub slave port for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the YoctoHub slave port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHubPort.isOnline() to test if the YoctoHub slave port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a YoctoHub slave port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the YoctoHub slave port, for instance
     *         YHUBETH1.hubPort1.
     *
     * @return a YHubPort object allowing you to drive the YoctoHub slave port.
     */
    function YHubPort_FindHubPort(func)                         // class method
    {
        var obj;                    // YHubPort;
        obj = YFunction._FindFromCache("HubPort", func);
        if (obj == null) {
            obj = new YHubPort(func);
            YFunction._AddToCache("HubPort", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of YoctoHub slave ports started using yFirstHubPort().
     * Caution: You can't make any assumption about the returned YoctoHub slave ports order.
     * If you want to find a specific a YoctoHub slave port, use HubPort.findHubPort()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YHubPort object, corresponding to
     *         a YoctoHub slave port currently online, or a null pointer
     *         if there are no more YoctoHub slave ports to enumerate.
     */
    function YHubPort_nextHubPort()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YHubPort.FindHubPort(next_hwid);
    }

    /**
     * Starts the enumeration of YoctoHub slave ports currently accessible.
     * Use the method YHubPort.nextHubPort() to iterate on
     * next YoctoHub slave ports.
     *
     * @return a pointer to a YHubPort object, corresponding to
     *         the first YoctoHub slave port currently online, or a null pointer
     *         if there are none.
     */
    function YHubPort_FirstHubPort()
    {
        var next_hwid = YAPI.getFirstHardwareId('HubPort');
        if(next_hwid == null) return null;
        return YHubPort.FindHubPort(next_hwid);
    }

    //--- (end of YHubPort implementation)

    //--- (YHubPort initialization)
    YHubPort = YFunction._Subclass(_YHubPort, {
        // Constants
        ENABLED_FALSE               : 0,
        ENABLED_TRUE                : 1,
        ENABLED_INVALID             : -1,
        PORTSTATE_OFF               : 0,
        PORTSTATE_OVRLD             : 1,
        PORTSTATE_ON                : 2,
        PORTSTATE_RUN               : 3,
        PORTSTATE_PROG              : 4,
        PORTSTATE_INVALID           : -1,
        BAUDRATE_INVALID            : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindHubPort                 : YHubPort_FindHubPort,
        FirstHubPort                : YHubPort_FirstHubPort
    }, {
        // Methods
        get_enabled                 : YHubPort_get_enabled,
        enabled                     : YHubPort_get_enabled,
        get_enabled_async           : YHubPort_get_enabled_async,
        enabled_async               : YHubPort_get_enabled_async,
        set_enabled                 : YHubPort_set_enabled,
        setEnabled                  : YHubPort_set_enabled,
        get_portState               : YHubPort_get_portState,
        portState                   : YHubPort_get_portState,
        get_portState_async         : YHubPort_get_portState_async,
        portState_async             : YHubPort_get_portState_async,
        get_baudRate                : YHubPort_get_baudRate,
        baudRate                    : YHubPort_get_baudRate,
        get_baudRate_async          : YHubPort_get_baudRate_async,
        baudRate_async              : YHubPort_get_baudRate_async,
        nextHubPort                 : YHubPort_nextHubPort,
        _parseAttr                  : YHubPort_parseAttr
    });
    //--- (end of YHubPort initialization)
})();

//--- (YHubPort functions)

/**
 * Retrieves a YoctoHub slave port for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the YoctoHub slave port is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YHubPort.isOnline() to test if the YoctoHub slave port is
 * indeed online at a given time. In case of ambiguity when looking for
 * a YoctoHub slave port by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the YoctoHub slave port, for instance
 *         YHUBETH1.hubPort1.
 *
 * @return a YHubPort object allowing you to drive the YoctoHub slave port.
 */
function yFindHubPort(func)
{
    return YHubPort.FindHubPort(func);
}

/**
 * Starts the enumeration of YoctoHub slave ports currently accessible.
 * Use the method YHubPort.nextHubPort() to iterate on
 * next YoctoHub slave ports.
 *
 * @return a pointer to a YHubPort object, corresponding to
 *         the first YoctoHub slave port currently online, or a null pointer
 *         if there are none.
 */
function yFirstHubPort()
{
    return YHubPort.FirstHubPort();
}

//--- (end of YHubPort functions)
