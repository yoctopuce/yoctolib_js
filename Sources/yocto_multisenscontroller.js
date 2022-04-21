/*********************************************************************
 *
 *  $Id: yocto_multisenscontroller.js 49501 2022-04-21 07:09:25Z mvuilleu $
 *
 *  Implements the high-level API for MultiSensController functions
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

//--- (YMultiSensController return codes)
//--- (end of YMultiSensController return codes)
//--- (YMultiSensController definitions)
var Y_MAINTENANCEMODE_FALSE         = 0;
var Y_MAINTENANCEMODE_TRUE          = 1;
var Y_MAINTENANCEMODE_INVALID       = -1;
var Y_NSENSORS_INVALID              = YAPI_INVALID_UINT;
var Y_MAXSENSORS_INVALID            = YAPI_INVALID_UINT;
var Y_LASTADDRESSDETECTED_INVALID   = YAPI_INVALID_UINT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YMultiSensController definitions)

//--- (YMultiSensController class start)
/**
 * YMultiSensController Class: Sensor chain configuration interface, available for instance in the
 * Yocto-Temperature-IR
 *
 * The YMultiSensController class allows you to setup a customized
 * sensor chain on devices featuring that functionality.
 */
//--- (end of YMultiSensController class start)

var YMultiSensController; // definition below
(function()
{
    function _YMultiSensController(str_func)
    {
        //--- (YMultiSensController constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'MultiSensController';

        this._nSensors                       = Y_NSENSORS_INVALID;         // UInt31
        this._maxSensors                     = Y_MAXSENSORS_INVALID;       // UInt31
        this._maintenanceMode                = Y_MAINTENANCEMODE_INVALID;  // Bool
        this._lastAddressDetected            = Y_LASTADDRESSDETECTED_INVALID; // UInt31
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YMultiSensController constructor)
    }

    //--- (YMultiSensController implementation)

    function YMultiSensController_parseAttr(name, val, _super)
    {
        switch(name) {
        case "nSensors":
            this._nSensors = parseInt(val);
            return 1;
        case "maxSensors":
            this._maxSensors = parseInt(val);
            return 1;
        case "maintenanceMode":
            this._maintenanceMode = parseInt(val);
            return 1;
        case "lastAddressDetected":
            this._lastAddressDetected = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the number of sensors to poll.
     *
     * @return an integer corresponding to the number of sensors to poll
     *
     * On failure, throws an exception or returns YMultiSensController.NSENSORS_INVALID.
     */
    function YMultiSensController_get_nSensors()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NSENSORS_INVALID;
            }
        }
        res = this._nSensors;
        return res;
    }

    /**
     * Gets the number of sensors to poll.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMultiSensController object that invoked the callback
     *         - the result:an integer corresponding to the number of sensors to poll
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMultiSensController.NSENSORS_INVALID.
     */
    function YMultiSensController_get_nSensors_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NSENSORS_INVALID);
            } else {
                callback(context, obj, obj._nSensors);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the number of sensors to poll. Remember to call the
     * saveToFlash() method of the module if the
     * modification must be kept. It is recommended to restart the
     * device with  module->reboot() after modifying
     * (and saving) this settings.
     *
     * @param newval : an integer corresponding to the number of sensors to poll
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiSensController_set_nSensors(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('nSensors',rest_val);
    }

    /**
     * Returns the maximum configurable sensor count allowed on this device.
     *
     * @return an integer corresponding to the maximum configurable sensor count allowed on this device
     *
     * On failure, throws an exception or returns YMultiSensController.MAXSENSORS_INVALID.
     */
    function YMultiSensController_get_maxSensors()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MAXSENSORS_INVALID;
            }
        }
        res = this._maxSensors;
        return res;
    }

    /**
     * Gets the maximum configurable sensor count allowed on this device.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMultiSensController object that invoked the callback
     *         - the result:an integer corresponding to the maximum configurable sensor count allowed on this device
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMultiSensController.MAXSENSORS_INVALID.
     */
    function YMultiSensController_get_maxSensors_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MAXSENSORS_INVALID);
            } else {
                callback(context, obj, obj._maxSensors);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns true when the device is in maintenance mode.
     *
     * @return either YMultiSensController.MAINTENANCEMODE_FALSE or
     * YMultiSensController.MAINTENANCEMODE_TRUE, according to true when the device is in maintenance mode
     *
     * On failure, throws an exception or returns YMultiSensController.MAINTENANCEMODE_INVALID.
     */
    function YMultiSensController_get_maintenanceMode()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MAINTENANCEMODE_INVALID;
            }
        }
        res = this._maintenanceMode;
        return res;
    }

    /**
     * Gets true when the device is in maintenance mode.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMultiSensController object that invoked the callback
     *         - the result:either YMultiSensController.MAINTENANCEMODE_FALSE or
     *         YMultiSensController.MAINTENANCEMODE_TRUE, according to true when the device is in maintenance mode
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMultiSensController.MAINTENANCEMODE_INVALID.
     */
    function YMultiSensController_get_maintenanceMode_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MAINTENANCEMODE_INVALID);
            } else {
                callback(context, obj, obj._maintenanceMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the device mode to enable maintenance and to stop sensor polling.
     * This way, the device does not automatically restart when it cannot
     * communicate with one of the sensors.
     *
     * @param newval : either YMultiSensController.MAINTENANCEMODE_FALSE or
     * YMultiSensController.MAINTENANCEMODE_TRUE, according to the device mode to enable maintenance and
     * to stop sensor polling
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiSensController_set_maintenanceMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('maintenanceMode',rest_val);
    }

    /**
     * Returns the I2C address of the most recently detected sensor. This method can
     * be used to in case of I2C communication error to determine what is the
     * last sensor that can be reached, or after a call to setupAddress
     * to make sure that the address change was properly processed.
     *
     * @return an integer corresponding to the I2C address of the most recently detected sensor
     *
     * On failure, throws an exception or returns YMultiSensController.LASTADDRESSDETECTED_INVALID.
     */
    function YMultiSensController_get_lastAddressDetected()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LASTADDRESSDETECTED_INVALID;
            }
        }
        res = this._lastAddressDetected;
        return res;
    }

    /**
     * Gets the I2C address of the most recently detected sensor. This method can
     * be used to in case of I2C communication error to determine what is the
     * last sensor that can be reached, or after a call to setupAddress
     * to make sure that the address change was properly processed.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMultiSensController object that invoked the callback
     *         - the result:an integer corresponding to the I2C address of the most recently detected sensor
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMultiSensController.LASTADDRESSDETECTED_INVALID.
     */
    function YMultiSensController_get_lastAddressDetected_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LASTADDRESSDETECTED_INVALID);
            } else {
                callback(context, obj, obj._lastAddressDetected);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YMultiSensController_get_command()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMultiSensController object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YMultiSensController_get_command_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COMMAND_INVALID);
            } else {
                callback(context, obj, obj._command);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YMultiSensController_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a multi-sensor controller for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-sensor controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiSensController.isOnline() to test if the multi-sensor controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-sensor controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the multi-sensor controller, for instance
     *         YTEMPIR1.multiSensController.
     *
     * @return a YMultiSensController object allowing you to drive the multi-sensor controller.
     */
    function YMultiSensController_FindMultiSensController(func) // class method
    {
        var obj;                    // YMultiSensController;
        obj = YFunction._FindFromCache("MultiSensController", func);
        if (obj == null) {
            obj = new YMultiSensController(func);
            YFunction._AddToCache("MultiSensController", func, obj);
        }
        return obj;
    }

    /**
     * Configures the I2C address of the only sensor connected to the device.
     * It is recommended to put the the device in maintenance mode before
     * changing sensor addresses.  This method is only intended to work with a single
     * sensor connected to the device. If several sensors are connected, the result
     * is unpredictable.
     *
     * Note that the device is expecting to find a sensor or a string of sensors with specific
     * addresses. Check the device documentation to find out which addresses should be used.
     *
     * @param addr : new address of the connected sensor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YMultiSensController_setupAddress(addr)
    {
        var cmd;                    // str;
        var res;                    // int;
        cmd = "A"+String(Math.round(addr));
        res = this.set_command(cmd);
        if (!(res == YAPI_SUCCESS)) {
            return this._throw(YAPI_IO_ERROR,"unable to trigger address change",YAPI_IO_ERROR);
        }
        YAPI.Sleep(1500);
        res = this.get_lastAddressDetected();
        if (!(res > 0)) {
            return this._throw(YAPI_IO_ERROR,"IR sensor not found",YAPI_IO_ERROR);
        }
        if (!(res == addr)) {
            return this._throw(YAPI_IO_ERROR,"address change failed",YAPI_IO_ERROR);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Triggers the I2C address detection procedure for the only sensor connected to the device.
     * This method is only intended to work with a single sensor connected to the device.
     * If several sensors are connected, the result is unpredictable.
     *
     * @return the I2C address of the detected sensor, or 0 if none is found
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiSensController_get_sensorAddress()
    {
        var res;                    // int;
        res = this.set_command("a");
        if (!(res == YAPI_SUCCESS)) {
            return this._throw(YAPI_IO_ERROR,"unable to trigger address detection",res);
        }
        YAPI.Sleep(1000);
        res = this.get_lastAddressDetected();
        return res;
    }

    /**
     * Continues the enumeration of multi-sensor controllers started using yFirstMultiSensController().
     * Caution: You can't make any assumption about the returned multi-sensor controllers order.
     * If you want to find a specific a multi-sensor controller, use MultiSensController.findMultiSensController()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMultiSensController object, corresponding to
     *         a multi-sensor controller currently online, or a null pointer
     *         if there are no more multi-sensor controllers to enumerate.
     */
    function YMultiSensController_nextMultiSensController()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMultiSensController.FindMultiSensController(next_hwid);
    }

    /**
     * Starts the enumeration of multi-sensor controllers currently accessible.
     * Use the method YMultiSensController.nextMultiSensController() to iterate on
     * next multi-sensor controllers.
     *
     * @return a pointer to a YMultiSensController object, corresponding to
     *         the first multi-sensor controller currently online, or a null pointer
     *         if there are none.
     */
    function YMultiSensController_FirstMultiSensController()
    {
        var next_hwid = YAPI.getFirstHardwareId('MultiSensController');
        if(next_hwid == null) return null;
        return YMultiSensController.FindMultiSensController(next_hwid);
    }

    //--- (end of YMultiSensController implementation)

    //--- (YMultiSensController initialization)
    YMultiSensController = YFunction._Subclass(_YMultiSensController, {
        // Constants
        NSENSORS_INVALID            : YAPI_INVALID_UINT,
        MAXSENSORS_INVALID          : YAPI_INVALID_UINT,
        MAINTENANCEMODE_FALSE       : 0,
        MAINTENANCEMODE_TRUE        : 1,
        MAINTENANCEMODE_INVALID     : -1,
        LASTADDRESSDETECTED_INVALID : YAPI_INVALID_UINT,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindMultiSensController     : YMultiSensController_FindMultiSensController,
        FirstMultiSensController    : YMultiSensController_FirstMultiSensController
    }, {
        // Methods
        get_nSensors                : YMultiSensController_get_nSensors,
        nSensors                    : YMultiSensController_get_nSensors,
        get_nSensors_async          : YMultiSensController_get_nSensors_async,
        nSensors_async              : YMultiSensController_get_nSensors_async,
        set_nSensors                : YMultiSensController_set_nSensors,
        setNSensors                 : YMultiSensController_set_nSensors,
        get_maxSensors              : YMultiSensController_get_maxSensors,
        maxSensors                  : YMultiSensController_get_maxSensors,
        get_maxSensors_async        : YMultiSensController_get_maxSensors_async,
        maxSensors_async            : YMultiSensController_get_maxSensors_async,
        get_maintenanceMode         : YMultiSensController_get_maintenanceMode,
        maintenanceMode             : YMultiSensController_get_maintenanceMode,
        get_maintenanceMode_async   : YMultiSensController_get_maintenanceMode_async,
        maintenanceMode_async       : YMultiSensController_get_maintenanceMode_async,
        set_maintenanceMode         : YMultiSensController_set_maintenanceMode,
        setMaintenanceMode          : YMultiSensController_set_maintenanceMode,
        get_lastAddressDetected     : YMultiSensController_get_lastAddressDetected,
        lastAddressDetected         : YMultiSensController_get_lastAddressDetected,
        get_lastAddressDetected_async : YMultiSensController_get_lastAddressDetected_async,
        lastAddressDetected_async   : YMultiSensController_get_lastAddressDetected_async,
        get_command                 : YMultiSensController_get_command,
        command                     : YMultiSensController_get_command,
        get_command_async           : YMultiSensController_get_command_async,
        command_async               : YMultiSensController_get_command_async,
        set_command                 : YMultiSensController_set_command,
        setCommand                  : YMultiSensController_set_command,
        setupAddress                : YMultiSensController_setupAddress,
        get_sensorAddress           : YMultiSensController_get_sensorAddress,
        sensorAddress               : YMultiSensController_get_sensorAddress,
        nextMultiSensController     : YMultiSensController_nextMultiSensController,
        _parseAttr                  : YMultiSensController_parseAttr
    });
    //--- (end of YMultiSensController initialization)
})();

//--- (YMultiSensController functions)

/**
 * Retrieves a multi-sensor controller for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the multi-sensor controller is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YMultiSensController.isOnline() to test if the multi-sensor controller is
 * indeed online at a given time. In case of ambiguity when looking for
 * a multi-sensor controller by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the multi-sensor controller, for instance
 *         YTEMPIR1.multiSensController.
 *
 * @return a YMultiSensController object allowing you to drive the multi-sensor controller.
 */
function yFindMultiSensController(func)
{
    return YMultiSensController.FindMultiSensController(func);
}

/**
 * Starts the enumeration of multi-sensor controllers currently accessible.
 * Use the method YMultiSensController.nextMultiSensController() to iterate on
 * next multi-sensor controllers.
 *
 * @return a pointer to a YMultiSensController object, corresponding to
 *         the first multi-sensor controller currently online, or a null pointer
 *         if there are none.
 */
function yFirstMultiSensController()
{
    return YMultiSensController.FirstMultiSensController();
}

//--- (end of YMultiSensController functions)
