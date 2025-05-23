/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Pressure functions
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

//--- (YPressure return codes)
//--- (end of YPressure return codes)
//--- (YPressure definitions)
//--- (end of YPressure definitions)

//--- (YPressure class start)
/**
 * YPressure Class: pressure sensor control interface, available for instance in the
 * Yocto-Altimeter-V2, the Yocto-CO2-V2, the Yocto-Meteo-V2 or the Yocto-Pressure
 *
 * The YPressure class allows you to read and configure Yoctopuce pressure sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YPressure class start)

var YPressure; // definition below
(function()
{
    function _YPressure(str_func)
    {
        //--- (YPressure constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Pressure';

        //--- (end of YPressure constructor)
    }

    //--- (YPressure implementation)

    /**
     * Retrieves a pressure sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the pressure sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPressure.isOnline() to test if the pressure sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a pressure sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the pressure sensor, for instance
     *         YALTIMK2.pressure.
     *
     * @return a YPressure object allowing you to drive the pressure sensor.
     */
    function YPressure_FindPressure(func)                       // class method
    {
        var obj;                    // YPressure;
        obj = YFunction._FindFromCache("Pressure", func);
        if (obj == null) {
            obj = new YPressure(func);
            YFunction._AddToCache("Pressure", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of pressure sensors started using yFirstPressure().
     * Caution: You can't make any assumption about the returned pressure sensors order.
     * If you want to find a specific a pressure sensor, use Pressure.findPressure()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YPressure object, corresponding to
     *         a pressure sensor currently online, or a null pointer
     *         if there are no more pressure sensors to enumerate.
     */
    function YPressure_nextPressure()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPressure.FindPressure(next_hwid);
    }

    /**
     * Starts the enumeration of pressure sensors currently accessible.
     * Use the method YPressure.nextPressure() to iterate on
     * next pressure sensors.
     *
     * @return a pointer to a YPressure object, corresponding to
     *         the first pressure sensor currently online, or a null pointer
     *         if there are none.
     */
    function YPressure_FirstPressure()
    {
        var next_hwid = YAPI.getFirstHardwareId('Pressure');
        if(next_hwid == null) return null;
        return YPressure.FindPressure(next_hwid);
    }

    //--- (end of YPressure implementation)

    //--- (YPressure initialization)
    YPressure = YSensor._Subclass(_YPressure, {
    }, {
        // Class methods
        FindPressure                : YPressure_FindPressure,
        FirstPressure               : YPressure_FirstPressure
    }, {
        // Methods
        nextPressure                : YPressure_nextPressure
    });
    //--- (end of YPressure initialization)
})();

//--- (YPressure functions)

/**
 * Retrieves a pressure sensor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the pressure sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPressure.isOnline() to test if the pressure sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a pressure sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the pressure sensor, for instance
 *         YALTIMK2.pressure.
 *
 * @return a YPressure object allowing you to drive the pressure sensor.
 */
function yFindPressure(func)
{
    return YPressure.FindPressure(func);
}

/**
 * Starts the enumeration of pressure sensors currently accessible.
 * Use the method YPressure.nextPressure() to iterate on
 * next pressure sensors.
 *
 * @return a pointer to a YPressure object, corresponding to
 *         the first pressure sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstPressure()
{
    return YPressure.FirstPressure();
}

//--- (end of YPressure functions)
