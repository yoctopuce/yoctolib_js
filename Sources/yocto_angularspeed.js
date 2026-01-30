/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for AngularSpeed functions
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

//--- (YAngularSpeed return codes)
//--- (end of YAngularSpeed return codes)
//--- (YAngularSpeed definitions)
//--- (end of YAngularSpeed definitions)

//--- (YAngularSpeed class start)
/**
 * YAngularSpeed Class: tachometer control interface
 *
 * The YAngularSpeed class allows you to read and configure Yoctopuce tachometers.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YAngularSpeed class start)

var YAngularSpeed; // definition below
(function()
{
    function _YAngularSpeed(str_func)
    {
        //--- (YAngularSpeed constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'AngularSpeed';

        //--- (end of YAngularSpeed constructor)
    }

    //--- (YAngularSpeed implementation)

    /**
     * Retrieves a tachometer for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the rtachometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAngularSpeed.isOnline() to test if the rtachometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a tachometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the rtachometer, for instance
     *         MyDevice.angularSpeed.
     *
     * @return a YAngularSpeed object allowing you to drive the rtachometer.
     */
    function YAngularSpeed_FindAngularSpeed(func)               // class method
    {
        var obj;                    // YAngularSpeed;
        obj = YFunction._FindFromCache("AngularSpeed", func);
        if (obj == null) {
            obj = new YAngularSpeed(func);
            YFunction._AddToCache("AngularSpeed", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of tachometers started using yFirstAngularSpeed().
     * Caution: You can't make any assumption about the returned tachometers order.
     * If you want to find a specific a tachometer, use AngularSpeed.findAngularSpeed()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YAngularSpeed object, corresponding to
     *         a tachometer currently online, or a null pointer
     *         if there are no more tachometers to enumerate.
     */
    function YAngularSpeed_nextAngularSpeed()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAngularSpeed.FindAngularSpeed(next_hwid);
    }

    /**
     * Starts the enumeration of tachometers currently accessible.
     * Use the method YAngularSpeed.nextAngularSpeed() to iterate on
     * next tachometers.
     *
     * @return a pointer to a YAngularSpeed object, corresponding to
     *         the first tachometer currently online, or a null pointer
     *         if there are none.
     */
    function YAngularSpeed_FirstAngularSpeed()
    {
        var next_hwid = YAPI.getFirstHardwareId('AngularSpeed');
        if(next_hwid == null) return null;
        return YAngularSpeed.FindAngularSpeed(next_hwid);
    }

    //--- (end of YAngularSpeed implementation)

    //--- (YAngularSpeed initialization)
    YAngularSpeed = YSensor._Subclass(_YAngularSpeed, {
    }, {
        // Class methods
        FindAngularSpeed            : YAngularSpeed_FindAngularSpeed,
        FirstAngularSpeed           : YAngularSpeed_FirstAngularSpeed
    }, {
        // Methods
        nextAngularSpeed            : YAngularSpeed_nextAngularSpeed
    });
    //--- (end of YAngularSpeed initialization)
})();

//--- (YAngularSpeed functions)

/**
 * Retrieves a tachometer for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the rtachometer is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YAngularSpeed.isOnline() to test if the rtachometer is
 * indeed online at a given time. In case of ambiguity when looking for
 * a tachometer by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the rtachometer, for instance
 *         MyDevice.angularSpeed.
 *
 * @return a YAngularSpeed object allowing you to drive the rtachometer.
 */
function yFindAngularSpeed(func)
{
    return YAngularSpeed.FindAngularSpeed(func);
}

/**
 * Starts the enumeration of tachometers currently accessible.
 * Use the method YAngularSpeed.nextAngularSpeed() to iterate on
 * next tachometers.
 *
 * @return a pointer to a YAngularSpeed object, corresponding to
 *         the first tachometer currently online, or a null pointer
 *         if there are none.
 */
function yFirstAngularSpeed()
{
    return YAngularSpeed.FirstAngularSpeed();
}

//--- (end of YAngularSpeed functions)
