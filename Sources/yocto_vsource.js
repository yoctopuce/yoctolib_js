/*********************************************************************
 *
 * $Id: yocto_vsource.js 10263 2013-03-11 17:25:38Z seb $
 *
 * Implements yFindVSource(), the high-level API for VSource functions
 *
 * - - - - - - - - - License information: - - - - - - - - - 
 *
 * Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 * 1) If you have obtained this file from www.yoctopuce.com,
 *    Yoctopuce Sarl licenses to you (hereafter Licensee) the
 *    right to use, modify, copy, and integrate this source file
 *    into your own solution for the sole purpose of interfacing
 *    a Yoctopuce product with Licensee's solution.
 *
 *    The use of this file and all relationship between Yoctopuce 
 *    and Licensee are governed by Yoctopuce General Terms and 
 *    Conditions.
 *
 *    THE SOFTWARE AND DOCUMENTATION ARE PROVIDED 'AS IS' WITHOUT
 *    WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING 
 *    WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS 
 *    FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO
 *    EVENT SHALL LICENSOR BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
 *    INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA, 
 *    COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY OR 
 *    SERVICES, ANY CLAIMS BY THIRD PARTIES (INCLUDING BUT NOT 
 *    LIMITED TO ANY DEFENSE THEREOF), ANY CLAIMS FOR INDEMNITY OR
 *    CONTRIBUTION, OR OTHER SIMILAR COSTS, WHETHER ASSERTED ON THE
 *    BASIS OF CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF
 *    WARRANTY, OR OTHERWISE.
 *
 * 2) If your intent is not to interface with Yoctopuce products,
 *    you are not entitled to use, read or create any derived
 *    material from this source file.
 *
 *********************************************************************/

if(typeof YAPI == "undefined") { if(typeof yAPI != "undefined") window["YAPI"]=yAPI; else throw "YAPI is not defined, please include yocto_api.js first"; }

//--- (return codes)
//--- (end of return codes)
//--- (YVSource definitions)
var Y_FAILURE_FALSE                 = 0;
var Y_FAILURE_TRUE                  = 1;
var Y_FAILURE_INVALID               = -1;
var Y_OVERHEAT_FALSE                = 0;
var Y_OVERHEAT_TRUE                 = 1;
var Y_OVERHEAT_INVALID              = -1;
var Y_OVERCURRENT_FALSE             = 0;
var Y_OVERCURRENT_TRUE              = 1;
var Y_OVERCURRENT_INVALID           = -1;
var Y_OVERLOAD_FALSE                = 0;
var Y_OVERLOAD_TRUE                 = 1;
var Y_OVERLOAD_INVALID              = -1;
var Y_REGULATIONFAILURE_FALSE       = 0;
var Y_REGULATIONFAILURE_TRUE        = 1;
var Y_REGULATIONFAILURE_INVALID     = -1;
var Y_EXTPOWERFAILURE_FALSE         = 0;
var Y_EXTPOWERFAILURE_TRUE          = 1;
var Y_EXTPOWERFAILURE_INVALID       = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_UNIT_INVALID                  = "!INVALID!";
var Y_VOLTAGE_INVALID               = Number.NEGATIVE_INFINITY;
var Y_MOVE_INVALID                  = null;
var Y_PULSETIMER_INVALID            = null;
//--- (end of YVSource definitions)

/**
 * YVSource Class: Voltage source function interface
 * 
 * Yoctopuce application programming interface allows you to control
 * the module voltage output. You affect absolute output values or make
 * transitions
 */
var YVSource; // definition below
(function()
{
    //--- (YVSource implementation)

    /**
     * Returns the logical name of the voltage source.
     * 
     * @return a string corresponding to the logical name of the voltage source
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YVSource_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the voltage source.
     * 
     * @return a string corresponding to the logical name of the voltage source
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the voltage source. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the voltage source
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YVSource_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the voltage source (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the voltage source (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YVSource_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the voltage source (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the voltage source (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the measuring unit for the voltage.
     * 
     * @return a string corresponding to the measuring unit for the voltage
     * 
     * On failure, throws an exception or returns Y_UNIT_INVALID.
     */
    function YVSource_get_unit()
    {   var json_val = this._getAttr('unit');
        return (json_val == null ? Y_UNIT_INVALID : json_val);
    }

    /**
     * Returns the measuring unit for the voltage.
     * 
     * @return a string corresponding to the measuring unit for the voltage
     * 
     * On failure, throws an exception or returns Y_UNIT_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_unit_async(func_callback, obj_context)
    {   this._getAttr_async('unit',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_UNIT_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the voltage output command (mV)
     * 
     * @return an integer corresponding to the voltage output command (mV)
     * 
     * On failure, throws an exception or returns Y_VOLTAGE_INVALID.
     */
    function YVSource_get_voltage()
    {   var json_val = this._getAttr('voltage');
        return (json_val == null ? Y_VOLTAGE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the voltage output command (mV)
     * 
     * @return an integer corresponding to the voltage output command (mV)
     * 
     * On failure, throws an exception or returns Y_VOLTAGE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_voltage_async(func_callback, obj_context)
    {   this._getAttr_async('voltage',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_VOLTAGE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Tunes the device output voltage (milliVolts).
     * 
     * @param newval : an integer
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YVSource_set_voltage(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('voltage',rest_val);
    }

    /**
     * Returns true if the  module is in failure mode. More information can be obtained by testing
     * get_overheat, get_overcurrent etc... When a error condition is met, the output voltage is
     * set to zéro and cannot be changed until the reset() function is called.
     * 
     * @return either Y_FAILURE_FALSE or Y_FAILURE_TRUE, according to true if the  module is in failure mode
     * 
     * On failure, throws an exception or returns Y_FAILURE_INVALID.
     */
    function YVSource_get_failure()
    {   var json_val = this._getAttr('failure');
        return (json_val == null ? Y_FAILURE_INVALID : parseInt(json_val));
    }

    /**
     * Returns true if the  module is in failure mode. More information can be obtained by testing
     * get_overheat, get_overcurrent etc... When a error condition is met, the output voltage is
     * set to zéro and cannot be changed until the reset() function is called.
     * 
     * @return either Y_FAILURE_FALSE or Y_FAILURE_TRUE, according to true if the  module is in failure mode
     * 
     * On failure, throws an exception or returns Y_FAILURE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_failure_async(func_callback, obj_context)
    {   this._getAttr_async('failure',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_FAILURE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YVSource_set_failure(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('failure',rest_val);
    }

    /**
     * Returns TRUE if the  module is overheating.
     * 
     * @return either Y_OVERHEAT_FALSE or Y_OVERHEAT_TRUE, according to TRUE if the  module is overheating
     * 
     * On failure, throws an exception or returns Y_OVERHEAT_INVALID.
     */
    function YVSource_get_overHeat()
    {   var json_val = this._getAttr('overHeat');
        return (json_val == null ? Y_OVERHEAT_INVALID : parseInt(json_val));
    }

    /**
     * Returns TRUE if the  module is overheating.
     * 
     * @return either Y_OVERHEAT_FALSE or Y_OVERHEAT_TRUE, according to TRUE if the  module is overheating
     * 
     * On failure, throws an exception or returns Y_OVERHEAT_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_overHeat_async(func_callback, obj_context)
    {   this._getAttr_async('overHeat',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_OVERHEAT_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns true if the appliance connected to the device is too greedy .
     * 
     * @return either Y_OVERCURRENT_FALSE or Y_OVERCURRENT_TRUE, according to true if the appliance
     * connected to the device is too greedy
     * 
     * On failure, throws an exception or returns Y_OVERCURRENT_INVALID.
     */
    function YVSource_get_overCurrent()
    {   var json_val = this._getAttr('overCurrent');
        return (json_val == null ? Y_OVERCURRENT_INVALID : parseInt(json_val));
    }

    /**
     * Returns true if the appliance connected to the device is too greedy .
     * 
     * @return either Y_OVERCURRENT_FALSE or Y_OVERCURRENT_TRUE, according to true if the appliance
     * connected to the device is too greedy
     * 
     * On failure, throws an exception or returns Y_OVERCURRENT_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_overCurrent_async(func_callback, obj_context)
    {   this._getAttr_async('overCurrent',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_OVERCURRENT_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns true if the device is not able to maintaint the requested voltage output  .
     * 
     * @return either Y_OVERLOAD_FALSE or Y_OVERLOAD_TRUE, according to true if the device is not able to
     * maintaint the requested voltage output
     * 
     * On failure, throws an exception or returns Y_OVERLOAD_INVALID.
     */
    function YVSource_get_overLoad()
    {   var json_val = this._getAttr('overLoad');
        return (json_val == null ? Y_OVERLOAD_INVALID : parseInt(json_val));
    }

    /**
     * Returns true if the device is not able to maintaint the requested voltage output  .
     * 
     * @return either Y_OVERLOAD_FALSE or Y_OVERLOAD_TRUE, according to true if the device is not able to
     * maintaint the requested voltage output
     * 
     * On failure, throws an exception or returns Y_OVERLOAD_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_overLoad_async(func_callback, obj_context)
    {   this._getAttr_async('overLoad',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_OVERLOAD_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns true if the voltage output is too high regarding the requested voltage  .
     * 
     * @return either Y_REGULATIONFAILURE_FALSE or Y_REGULATIONFAILURE_TRUE, according to true if the
     * voltage output is too high regarding the requested voltage
     * 
     * On failure, throws an exception or returns Y_REGULATIONFAILURE_INVALID.
     */
    function YVSource_get_regulationFailure()
    {   var json_val = this._getAttr('regulationFailure');
        return (json_val == null ? Y_REGULATIONFAILURE_INVALID : parseInt(json_val));
    }

    /**
     * Returns true if the voltage output is too high regarding the requested voltage  .
     * 
     * @return either Y_REGULATIONFAILURE_FALSE or Y_REGULATIONFAILURE_TRUE, according to true if the
     * voltage output is too high regarding the requested voltage
     * 
     * On failure, throws an exception or returns Y_REGULATIONFAILURE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_regulationFailure_async(func_callback, obj_context)
    {   this._getAttr_async('regulationFailure',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_REGULATIONFAILURE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns true if external power supply voltage is too low.
     * 
     * @return either Y_EXTPOWERFAILURE_FALSE or Y_EXTPOWERFAILURE_TRUE, according to true if external
     * power supply voltage is too low
     * 
     * On failure, throws an exception or returns Y_EXTPOWERFAILURE_INVALID.
     */
    function YVSource_get_extPowerFailure()
    {   var json_val = this._getAttr('extPowerFailure');
        return (json_val == null ? Y_EXTPOWERFAILURE_INVALID : parseInt(json_val));
    }

    /**
     * Returns true if external power supply voltage is too low.
     * 
     * @return either Y_EXTPOWERFAILURE_FALSE or Y_EXTPOWERFAILURE_TRUE, according to true if external
     * power supply voltage is too low
     * 
     * On failure, throws an exception or returns Y_EXTPOWERFAILURE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_extPowerFailure_async(func_callback, obj_context)
    {   this._getAttr_async('extPowerFailure',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_EXTPOWERFAILURE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YVSource_get_move()
    {   var json_val = this._getAttr('move');
        return (json_val == null ? Y_MOVE_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_move_async(func_callback, obj_context)
    {   this._getAttr_async('move',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_MOVE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YVSource_set_move(newval)
    {   var rest_val;
        rest_val = String(newval.target)+":"+String(newval.ms);
        return this._setAttr('move',rest_val);
    }

    /**
     * Performs a smooth move at constant speed toward a given value.
     * 
     * @param target      : new output value at end of transition, in milliVolts.
     * @param ms_duration : transition duration, in milliseconds
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YVSource_voltageMove(int_target,int_ms_duration)
    {   var rest_val;
        rest_val = String(int_target)+":"+String(int_ms_duration);
        return this._setAttr('move',rest_val);
    }

    function YVSource_get_pulseTimer()
    {   var json_val = this._getAttr('pulseTimer');
        return (json_val == null ? Y_PULSETIMER_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YVSource_get_pulseTimer_async(func_callback, obj_context)
    {   this._getAttr_async('pulseTimer',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PULSETIMER_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YVSource_set_pulseTimer(newval)
    {   var rest_val;
        rest_val = String(newval.target)+":"+String(newval.ms);
        return this._setAttr('pulseTimer',rest_val);
    }

    /**
     * Sets device output to a specific volatage, for a specified duration, then brings it
     * automatically to 0V.
     * 
     * @param voltage : pulse voltage, in millivolts
     * @param ms_duration : pulse duration, in millisecondes
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YVSource_pulse(int_voltage,int_ms_duration)
    {   var rest_val;
        rest_val = String(int_voltage)+":"+String(int_ms_duration);
        return this._setAttr('pulseTimer',rest_val);
    }

    /**
     * Continues the enumeration of voltage sources started using yFirstVSource().
     * 
     * @return a pointer to a YVSource object, corresponding to
     *         a voltage source currently online, or a null pointer
     *         if there are no more voltage sources to enumerate.
     */
    function YVSource_nextVSource()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YVSource.FindVSource(next_hwid);
    }

    /**
     * Retrieves a voltage source for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the voltage source is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVSource.isOnline() to test if the voltage source is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage source by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the voltage source
     * 
     * @return a YVSource object allowing you to drive the voltage source.
     */
    function YVSource_FindVSource(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('VSource', str_func);
        if(obj_func) return obj_func;
        return new YVSource(str_func);
    }

    /**
     * Starts the enumeration of voltage sources currently accessible.
     * Use the method YVSource.nextVSource() to iterate on
     * next voltage sources.
     * 
     * @return a pointer to a YVSource object, corresponding to
     *         the first voltage source currently online, or a null pointer
     *         if there are none.
     */
    function YVSource_FirstVSource()
    {
        var next_hwid = YAPI.getFirstHardwareId('VSource');
        if(next_hwid == null) return null;
        return YVSource.FindVSource(next_hwid);
    }

    //--- (end of YVSource implementation)

    function _YVSource(str_func)
    {
        //--- (YVSource constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'VSource', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.UNIT_INVALID                    = "!INVALID!";
        this.VOLTAGE_INVALID                 = Number.NEGATIVE_INFINITY;
        this.FAILURE_FALSE                   = 0;
        this.FAILURE_TRUE                    = 1;
        this.FAILURE_INVALID                 = -1;
        this.OVERHEAT_FALSE                  = 0;
        this.OVERHEAT_TRUE                   = 1;
        this.OVERHEAT_INVALID                = -1;
        this.OVERCURRENT_FALSE               = 0;
        this.OVERCURRENT_TRUE                = 1;
        this.OVERCURRENT_INVALID             = -1;
        this.OVERLOAD_FALSE                  = 0;
        this.OVERLOAD_TRUE                   = 1;
        this.OVERLOAD_INVALID                = -1;
        this.REGULATIONFAILURE_FALSE         = 0;
        this.REGULATIONFAILURE_TRUE          = 1;
        this.REGULATIONFAILURE_INVALID       = -1;
        this.EXTPOWERFAILURE_FALSE           = 0;
        this.EXTPOWERFAILURE_TRUE            = 1;
        this.EXTPOWERFAILURE_INVALID         = -1;
        this.get_logicalName                 = YVSource_get_logicalName;
        this.logicalName                     = YVSource_get_logicalName;
        this.get_logicalName_async           = YVSource_get_logicalName_async;
        this.logicalName_async               = YVSource_get_logicalName_async;
        this.set_logicalName                 = YVSource_set_logicalName;
        this.setLogicalName                  = YVSource_set_logicalName;
        this.get_advertisedValue             = YVSource_get_advertisedValue;
        this.advertisedValue                 = YVSource_get_advertisedValue;
        this.get_advertisedValue_async       = YVSource_get_advertisedValue_async;
        this.advertisedValue_async           = YVSource_get_advertisedValue_async;
        this.get_unit                        = YVSource_get_unit;
        this.unit                            = YVSource_get_unit;
        this.get_unit_async                  = YVSource_get_unit_async;
        this.unit_async                      = YVSource_get_unit_async;
        this.get_voltage                     = YVSource_get_voltage;
        this.voltage                         = YVSource_get_voltage;
        this.get_voltage_async               = YVSource_get_voltage_async;
        this.voltage_async                   = YVSource_get_voltage_async;
        this.set_voltage                     = YVSource_set_voltage;
        this.setVoltage                      = YVSource_set_voltage;
        this.get_failure                     = YVSource_get_failure;
        this.failure                         = YVSource_get_failure;
        this.get_failure_async               = YVSource_get_failure_async;
        this.failure_async                   = YVSource_get_failure_async;
        this.set_failure                     = YVSource_set_failure;
        this.setFailure                      = YVSource_set_failure;
        this.get_overHeat                    = YVSource_get_overHeat;
        this.overHeat                        = YVSource_get_overHeat;
        this.get_overHeat_async              = YVSource_get_overHeat_async;
        this.overHeat_async                  = YVSource_get_overHeat_async;
        this.get_overCurrent                 = YVSource_get_overCurrent;
        this.overCurrent                     = YVSource_get_overCurrent;
        this.get_overCurrent_async           = YVSource_get_overCurrent_async;
        this.overCurrent_async               = YVSource_get_overCurrent_async;
        this.get_overLoad                    = YVSource_get_overLoad;
        this.overLoad                        = YVSource_get_overLoad;
        this.get_overLoad_async              = YVSource_get_overLoad_async;
        this.overLoad_async                  = YVSource_get_overLoad_async;
        this.get_regulationFailure           = YVSource_get_regulationFailure;
        this.regulationFailure               = YVSource_get_regulationFailure;
        this.get_regulationFailure_async     = YVSource_get_regulationFailure_async;
        this.regulationFailure_async         = YVSource_get_regulationFailure_async;
        this.get_extPowerFailure             = YVSource_get_extPowerFailure;
        this.extPowerFailure                 = YVSource_get_extPowerFailure;
        this.get_extPowerFailure_async       = YVSource_get_extPowerFailure_async;
        this.extPowerFailure_async           = YVSource_get_extPowerFailure_async;
        this.get_move                        = YVSource_get_move;
        this.move                            = YVSource_get_move;
        this.get_move_async                  = YVSource_get_move_async;
        this.move_async                      = YVSource_get_move_async;
        this.set_move                        = YVSource_set_move;
        this.setMove                         = YVSource_set_move;
        this.voltageMove                     = YVSource_voltageMove;
        this.get_pulseTimer                  = YVSource_get_pulseTimer;
        this.pulseTimer                      = YVSource_get_pulseTimer;
        this.get_pulseTimer_async            = YVSource_get_pulseTimer_async;
        this.pulseTimer_async                = YVSource_get_pulseTimer_async;
        this.set_pulseTimer                  = YVSource_set_pulseTimer;
        this.setPulseTimer                   = YVSource_set_pulseTimer;
        this.pulse                           = YVSource_pulse;
        this.nextVSource                     = YVSource_nextVSource;
        //--- (end of YVSource constructor)
    }

    YVSource = _YVSource;
    YVSource.FindVSource  = YVSource_FindVSource;
    YVSource.FirstVSource = YVSource_FirstVSource;
})();

//--- (VSource functions)

/**
 * Retrieves a voltage source for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the voltage source is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YVSource.isOnline() to test if the voltage source is
 * indeed online at a given time. In case of ambiguity when looking for
 * a voltage source by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the voltage source
 * 
 * @return a YVSource object allowing you to drive the voltage source.
 */
function yFindVSource(str_func)
{
    return YVSource.FindVSource(str_func);
}

/**
 * Starts the enumeration of voltage sources currently accessible.
 * Use the method YVSource.nextVSource() to iterate on
 * next voltage sources.
 * 
 * @return a pointer to a YVSource object, corresponding to
 *         the first voltage source currently online, or a null pointer
 *         if there are none.
 */
function yFirstVSource()
{
    return YVSource.FirstVSource();
}

//--- (end of VSource functions)
