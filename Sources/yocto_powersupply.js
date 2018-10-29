/*********************************************************************
 *
 *  $Id: yocto_powersupply.js 32610 2018-10-10 06:52:20Z seb $
 *
 *  Implements the high-level API for PowerSupply functions
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

//--- (YPowerSupply return codes)
//--- (end of YPowerSupply return codes)
//--- (YPowerSupply definitions)
var Y_POWEROUTPUT_OFF               = 0;
var Y_POWEROUTPUT_ON                = 1;
var Y_POWEROUTPUT_INVALID           = -1;
var Y_VOLTAGESENSE_INT              = 0;
var Y_VOLTAGESENSE_EXT              = 1;
var Y_VOLTAGESENSE_INVALID          = -1;
var Y_VOLTAGESETPOINT_INVALID       = YAPI_INVALID_DOUBLE;
var Y_CURRENTLIMIT_INVALID          = YAPI_INVALID_DOUBLE;
var Y_MEASUREDVOLTAGE_INVALID       = YAPI_INVALID_DOUBLE;
var Y_MEASUREDCURRENT_INVALID       = YAPI_INVALID_DOUBLE;
var Y_INPUTVOLTAGE_INVALID          = YAPI_INVALID_DOUBLE;
var Y_VINT_INVALID                  = YAPI_INVALID_DOUBLE;
var Y_LDOTEMPERATURE_INVALID        = YAPI_INVALID_DOUBLE;
var Y_VOLTAGETRANSITION_INVALID     = YAPI_INVALID_STRING;
var Y_VOLTAGEATSTARTUP_INVALID      = YAPI_INVALID_DOUBLE;
var Y_CURRENTATSTARTUP_INVALID      = YAPI_INVALID_DOUBLE;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YPowerSupply definitions)

//--- (YPowerSupply class start)
/**
 * YPowerSupply Class: PowerSupply function interface
 *
 * The Yoctopuce application programming interface allows you to change the voltage set point,
 * the current limit and the enable/disable the output.
 */
//--- (end of YPowerSupply class start)

var YPowerSupply; // definition below
(function()
{
    function _YPowerSupply(str_func)
    {
        //--- (YPowerSupply constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'PowerSupply';

        this._voltageSetPoint                = Y_VOLTAGESETPOINT_INVALID;  // MeasureVal
        this._currentLimit                   = Y_CURRENTLIMIT_INVALID;     // MeasureVal
        this._powerOutput                    = Y_POWEROUTPUT_INVALID;      // OnOff
        this._voltageSense                   = Y_VOLTAGESENSE_INVALID;     // VoltageSense
        this._measuredVoltage                = Y_MEASUREDVOLTAGE_INVALID;  // MeasureVal
        this._measuredCurrent                = Y_MEASUREDCURRENT_INVALID;  // MeasureVal
        this._inputVoltage                   = Y_INPUTVOLTAGE_INVALID;     // MeasureVal
        this._vInt                           = Y_VINT_INVALID;             // MeasureVal
        this._ldoTemperature                 = Y_LDOTEMPERATURE_INVALID;   // MeasureVal
        this._voltageTransition              = Y_VOLTAGETRANSITION_INVALID; // AnyFloatTransition
        this._voltageAtStartUp               = Y_VOLTAGEATSTARTUP_INVALID; // MeasureVal
        this._currentAtStartUp               = Y_CURRENTATSTARTUP_INVALID; // MeasureVal
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YPowerSupply constructor)
    }

    //--- (YPowerSupply implementation)

    function YPowerSupply_parseAttr(name, val, _super)
    {
        switch(name) {
        case "voltageSetPoint":
            this._voltageSetPoint = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "currentLimit":
            this._currentLimit = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "powerOutput":
            this._powerOutput = parseInt(val);
            return 1;
        case "voltageSense":
            this._voltageSense = parseInt(val);
            return 1;
        case "measuredVoltage":
            this._measuredVoltage = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "measuredCurrent":
            this._measuredCurrent = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "inputVoltage":
            this._inputVoltage = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "vInt":
            this._vInt = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "ldoTemperature":
            this._ldoTemperature = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "voltageTransition":
            this._voltageTransition = val;
            return 1;
        case "voltageAtStartUp":
            this._voltageAtStartUp = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "currentAtStartUp":
            this._currentAtStartUp = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the voltage set point, in V.
     *
     * @param newval : a floating point number corresponding to the voltage set point, in V
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPowerSupply_set_voltageSetPoint(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('voltageSetPoint',rest_val);
    }

    /**
     * Returns the voltage set point, in V.
     *
     * @return a floating point number corresponding to the voltage set point, in V
     *
     * On failure, throws an exception or returns Y_VOLTAGESETPOINT_INVALID.
     */
    function YPowerSupply_get_voltageSetPoint()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLTAGESETPOINT_INVALID;
            }
        }
        res = this._voltageSetPoint;
        return res;
    }

    /**
     * Gets the voltage set point, in V.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:a floating point number corresponding to the voltage set point, in V
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_VOLTAGESETPOINT_INVALID.
     */
    function YPowerSupply_get_voltageSetPoint_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLTAGESETPOINT_INVALID);
            } else {
                callback(context, obj, obj._voltageSetPoint);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current limit, in mA.
     *
     * @param newval : a floating point number corresponding to the current limit, in mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPowerSupply_set_currentLimit(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('currentLimit',rest_val);
    }

    /**
     * Returns the current limit, in mA.
     *
     * @return a floating point number corresponding to the current limit, in mA
     *
     * On failure, throws an exception or returns Y_CURRENTLIMIT_INVALID.
     */
    function YPowerSupply_get_currentLimit()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTLIMIT_INVALID;
            }
        }
        res = this._currentLimit;
        return res;
    }

    /**
     * Gets the current limit, in mA.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:a floating point number corresponding to the current limit, in mA
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CURRENTLIMIT_INVALID.
     */
    function YPowerSupply_get_currentLimit_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTLIMIT_INVALID);
            } else {
                callback(context, obj, obj._currentLimit);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the power supply output switch state.
     *
     * @return either Y_POWEROUTPUT_OFF or Y_POWEROUTPUT_ON, according to the power supply output switch state
     *
     * On failure, throws an exception or returns Y_POWEROUTPUT_INVALID.
     */
    function YPowerSupply_get_powerOutput()
    {
        var res;                    // enumONOFF;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_POWEROUTPUT_INVALID;
            }
        }
        res = this._powerOutput;
        return res;
    }

    /**
     * Gets the power supply output switch state.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:either Y_POWEROUTPUT_OFF or Y_POWEROUTPUT_ON, according to the power supply output switch state
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_POWEROUTPUT_INVALID.
     */
    function YPowerSupply_get_powerOutput_async(callback,context)
    {
        var res;                    // enumONOFF;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_POWEROUTPUT_INVALID);
            } else {
                callback(context, obj, obj._powerOutput);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the power supply output switch state.
     *
     * @param newval : either Y_POWEROUTPUT_OFF or Y_POWEROUTPUT_ON, according to the power supply output switch state
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPowerSupply_set_powerOutput(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('powerOutput',rest_val);
    }

    /**
     * Returns the output voltage control point.
     *
     * @return either Y_VOLTAGESENSE_INT or Y_VOLTAGESENSE_EXT, according to the output voltage control point
     *
     * On failure, throws an exception or returns Y_VOLTAGESENSE_INVALID.
     */
    function YPowerSupply_get_voltageSense()
    {
        var res;                    // enumVOLTAGESENSE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLTAGESENSE_INVALID;
            }
        }
        res = this._voltageSense;
        return res;
    }

    /**
     * Gets the output voltage control point.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:either Y_VOLTAGESENSE_INT or Y_VOLTAGESENSE_EXT, according to the output voltage control point
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_VOLTAGESENSE_INVALID.
     */
    function YPowerSupply_get_voltageSense_async(callback,context)
    {
        var res;                    // enumVOLTAGESENSE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLTAGESENSE_INVALID);
            } else {
                callback(context, obj, obj._voltageSense);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the voltage control point.
     *
     * @param newval : either Y_VOLTAGESENSE_INT or Y_VOLTAGESENSE_EXT, according to the voltage control point
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPowerSupply_set_voltageSense(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('voltageSense',rest_val);
    }

    /**
     * Returns the measured output voltage, in V.
     *
     * @return a floating point number corresponding to the measured output voltage, in V
     *
     * On failure, throws an exception or returns Y_MEASUREDVOLTAGE_INVALID.
     */
    function YPowerSupply_get_measuredVoltage()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MEASUREDVOLTAGE_INVALID;
            }
        }
        res = this._measuredVoltage;
        return res;
    }

    /**
     * Gets the measured output voltage, in V.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:a floating point number corresponding to the measured output voltage, in V
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_MEASUREDVOLTAGE_INVALID.
     */
    function YPowerSupply_get_measuredVoltage_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MEASUREDVOLTAGE_INVALID);
            } else {
                callback(context, obj, obj._measuredVoltage);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the measured output current, in mA.
     *
     * @return a floating point number corresponding to the measured output current, in mA
     *
     * On failure, throws an exception or returns Y_MEASUREDCURRENT_INVALID.
     */
    function YPowerSupply_get_measuredCurrent()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MEASUREDCURRENT_INVALID;
            }
        }
        res = this._measuredCurrent;
        return res;
    }

    /**
     * Gets the measured output current, in mA.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:a floating point number corresponding to the measured output current, in mA
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_MEASUREDCURRENT_INVALID.
     */
    function YPowerSupply_get_measuredCurrent_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MEASUREDCURRENT_INVALID);
            } else {
                callback(context, obj, obj._measuredCurrent);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the measured input voltage, in V.
     *
     * @return a floating point number corresponding to the measured input voltage, in V
     *
     * On failure, throws an exception or returns Y_INPUTVOLTAGE_INVALID.
     */
    function YPowerSupply_get_inputVoltage()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_INPUTVOLTAGE_INVALID;
            }
        }
        res = this._inputVoltage;
        return res;
    }

    /**
     * Gets the measured input voltage, in V.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:a floating point number corresponding to the measured input voltage, in V
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_INPUTVOLTAGE_INVALID.
     */
    function YPowerSupply_get_inputVoltage_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_INPUTVOLTAGE_INVALID);
            } else {
                callback(context, obj, obj._inputVoltage);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the internal voltage, in V.
     *
     * @return a floating point number corresponding to the internal voltage, in V
     *
     * On failure, throws an exception or returns Y_VINT_INVALID.
     */
    function YPowerSupply_get_vInt()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VINT_INVALID;
            }
        }
        res = this._vInt;
        return res;
    }

    /**
     * Gets the internal voltage, in V.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:a floating point number corresponding to the internal voltage, in V
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_VINT_INVALID.
     */
    function YPowerSupply_get_vInt_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VINT_INVALID);
            } else {
                callback(context, obj, obj._vInt);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the LDO temperature, in Celsius.
     *
     * @return a floating point number corresponding to the LDO temperature, in Celsius
     *
     * On failure, throws an exception or returns Y_LDOTEMPERATURE_INVALID.
     */
    function YPowerSupply_get_ldoTemperature()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LDOTEMPERATURE_INVALID;
            }
        }
        res = this._ldoTemperature;
        return res;
    }

    /**
     * Gets the LDO temperature, in Celsius.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:a floating point number corresponding to the LDO temperature, in Celsius
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_LDOTEMPERATURE_INVALID.
     */
    function YPowerSupply_get_ldoTemperature_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LDOTEMPERATURE_INVALID);
            } else {
                callback(context, obj, obj._ldoTemperature);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YPowerSupply_get_voltageTransition()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLTAGETRANSITION_INVALID;
            }
        }
        res = this._voltageTransition;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YPowerSupply_get_voltageTransition_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLTAGETRANSITION_INVALID);
            } else {
                callback(context, obj, obj._voltageTransition);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YPowerSupply_set_voltageTransition(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('voltageTransition',rest_val);
    }

    /**
     * Changes the voltage set point at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the voltage set point at device start up
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPowerSupply_set_voltageAtStartUp(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('voltageAtStartUp',rest_val);
    }

    /**
     * Returns the selected voltage set point at device startup, in V.
     *
     * @return a floating point number corresponding to the selected voltage set point at device startup, in V
     *
     * On failure, throws an exception or returns Y_VOLTAGEATSTARTUP_INVALID.
     */
    function YPowerSupply_get_voltageAtStartUp()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLTAGEATSTARTUP_INVALID;
            }
        }
        res = this._voltageAtStartUp;
        return res;
    }

    /**
     * Gets the selected voltage set point at device startup, in V.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:a floating point number corresponding to the selected voltage set point at device startup, in V
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_VOLTAGEATSTARTUP_INVALID.
     */
    function YPowerSupply_get_voltageAtStartUp_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLTAGEATSTARTUP_INVALID);
            } else {
                callback(context, obj, obj._voltageAtStartUp);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current limit at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the current limit at device start up
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPowerSupply_set_currentAtStartUp(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('currentAtStartUp',rest_val);
    }

    /**
     * Returns the selected current limit at device startup, in mA.
     *
     * @return a floating point number corresponding to the selected current limit at device startup, in mA
     *
     * On failure, throws an exception or returns Y_CURRENTATSTARTUP_INVALID.
     */
    function YPowerSupply_get_currentAtStartUp()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTATSTARTUP_INVALID;
            }
        }
        res = this._currentAtStartUp;
        return res;
    }

    /**
     * Gets the selected current limit at device startup, in mA.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPowerSupply object that invoked the callback
     *         - the result:a floating point number corresponding to the selected current limit at device startup, in mA
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CURRENTATSTARTUP_INVALID.
     */
    function YPowerSupply_get_currentAtStartUp_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTATSTARTUP_INVALID);
            } else {
                callback(context, obj, obj._currentAtStartUp);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YPowerSupply_get_command()
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
     *         - the YPowerSupply object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YPowerSupply_get_command_async(callback,context)
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

    function YPowerSupply_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a regulated power supply for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the regulated power supply is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerSupply.isOnline() to test if the regulated power supply is
     * indeed online at a given time. In case of ambiguity when looking for
     * a regulated power supply by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the regulated power supply
     *
     * @return a YPowerSupply object allowing you to drive the regulated power supply.
     */
    function YPowerSupply_FindPowerSupply(func)                 // class method
    {
        var obj;                    // YPowerSupply;
        obj = YFunction._FindFromCache("PowerSupply", func);
        if (obj == null) {
            obj = new YPowerSupply(func);
            YFunction._AddToCache("PowerSupply", func, obj);
        }
        return obj;
    }

    /**
     * Performs a smooth transistion of output voltage. Any explicit voltage
     * change cancels any ongoing transition process.
     *
     * @param V_target   : new output voltage value at the end of the transition
     *         (floating-point number, representing the end voltage in V)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI_SUCCESS when the call succeeds.
     */
    function YPowerSupply_voltageMove(V_target,ms_duration)
    {
        var newval;                 // str;
        if (V_target < 0.0) {
            V_target  = 0.0;
        }
        newval = ""+String(Math.round(Math.round(V_target*65536)))+":"+String(Math.round(ms_duration));

        return this.set_voltageTransition(newval);
    }

    /**
     * Continues the enumeration of regulated power supplies started using yFirstPowerSupply().
     *
     * @return a pointer to a YPowerSupply object, corresponding to
     *         a regulated power supply currently online, or a null pointer
     *         if there are no more regulated power supplies to enumerate.
     */
    function YPowerSupply_nextPowerSupply()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPowerSupply.FindPowerSupply(next_hwid);
    }

    /**
     * Starts the enumeration of regulated power supplies currently accessible.
     * Use the method YPowerSupply.nextPowerSupply() to iterate on
     * next regulated power supplies.
     *
     * @return a pointer to a YPowerSupply object, corresponding to
     *         the first regulated power supply currently online, or a null pointer
     *         if there are none.
     */
    function YPowerSupply_FirstPowerSupply()
    {
        var next_hwid = YAPI.getFirstHardwareId('PowerSupply');
        if(next_hwid == null) return null;
        return YPowerSupply.FindPowerSupply(next_hwid);
    }

    //--- (end of YPowerSupply implementation)

    //--- (YPowerSupply initialization)
    YPowerSupply = YFunction._Subclass(_YPowerSupply, {
        // Constants
        VOLTAGESETPOINT_INVALID     : YAPI_INVALID_DOUBLE,
        CURRENTLIMIT_INVALID        : YAPI_INVALID_DOUBLE,
        POWEROUTPUT_OFF             : 0,
        POWEROUTPUT_ON              : 1,
        POWEROUTPUT_INVALID         : -1,
        VOLTAGESENSE_INT            : 0,
        VOLTAGESENSE_EXT            : 1,
        VOLTAGESENSE_INVALID        : -1,
        MEASUREDVOLTAGE_INVALID     : YAPI_INVALID_DOUBLE,
        MEASUREDCURRENT_INVALID     : YAPI_INVALID_DOUBLE,
        INPUTVOLTAGE_INVALID        : YAPI_INVALID_DOUBLE,
        VINT_INVALID                : YAPI_INVALID_DOUBLE,
        LDOTEMPERATURE_INVALID      : YAPI_INVALID_DOUBLE,
        VOLTAGETRANSITION_INVALID   : YAPI_INVALID_STRING,
        VOLTAGEATSTARTUP_INVALID    : YAPI_INVALID_DOUBLE,
        CURRENTATSTARTUP_INVALID    : YAPI_INVALID_DOUBLE,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindPowerSupply             : YPowerSupply_FindPowerSupply,
        FirstPowerSupply            : YPowerSupply_FirstPowerSupply
    }, {
        // Methods
        set_voltageSetPoint         : YPowerSupply_set_voltageSetPoint,
        setVoltageSetPoint          : YPowerSupply_set_voltageSetPoint,
        get_voltageSetPoint         : YPowerSupply_get_voltageSetPoint,
        voltageSetPoint             : YPowerSupply_get_voltageSetPoint,
        get_voltageSetPoint_async   : YPowerSupply_get_voltageSetPoint_async,
        voltageSetPoint_async       : YPowerSupply_get_voltageSetPoint_async,
        set_currentLimit            : YPowerSupply_set_currentLimit,
        setCurrentLimit             : YPowerSupply_set_currentLimit,
        get_currentLimit            : YPowerSupply_get_currentLimit,
        currentLimit                : YPowerSupply_get_currentLimit,
        get_currentLimit_async      : YPowerSupply_get_currentLimit_async,
        currentLimit_async          : YPowerSupply_get_currentLimit_async,
        get_powerOutput             : YPowerSupply_get_powerOutput,
        powerOutput                 : YPowerSupply_get_powerOutput,
        get_powerOutput_async       : YPowerSupply_get_powerOutput_async,
        powerOutput_async           : YPowerSupply_get_powerOutput_async,
        set_powerOutput             : YPowerSupply_set_powerOutput,
        setPowerOutput              : YPowerSupply_set_powerOutput,
        get_voltageSense            : YPowerSupply_get_voltageSense,
        voltageSense                : YPowerSupply_get_voltageSense,
        get_voltageSense_async      : YPowerSupply_get_voltageSense_async,
        voltageSense_async          : YPowerSupply_get_voltageSense_async,
        set_voltageSense            : YPowerSupply_set_voltageSense,
        setVoltageSense             : YPowerSupply_set_voltageSense,
        get_measuredVoltage         : YPowerSupply_get_measuredVoltage,
        measuredVoltage             : YPowerSupply_get_measuredVoltage,
        get_measuredVoltage_async   : YPowerSupply_get_measuredVoltage_async,
        measuredVoltage_async       : YPowerSupply_get_measuredVoltage_async,
        get_measuredCurrent         : YPowerSupply_get_measuredCurrent,
        measuredCurrent             : YPowerSupply_get_measuredCurrent,
        get_measuredCurrent_async   : YPowerSupply_get_measuredCurrent_async,
        measuredCurrent_async       : YPowerSupply_get_measuredCurrent_async,
        get_inputVoltage            : YPowerSupply_get_inputVoltage,
        inputVoltage                : YPowerSupply_get_inputVoltage,
        get_inputVoltage_async      : YPowerSupply_get_inputVoltage_async,
        inputVoltage_async          : YPowerSupply_get_inputVoltage_async,
        get_vInt                    : YPowerSupply_get_vInt,
        vInt                        : YPowerSupply_get_vInt,
        get_vInt_async              : YPowerSupply_get_vInt_async,
        vInt_async                  : YPowerSupply_get_vInt_async,
        get_ldoTemperature          : YPowerSupply_get_ldoTemperature,
        ldoTemperature              : YPowerSupply_get_ldoTemperature,
        get_ldoTemperature_async    : YPowerSupply_get_ldoTemperature_async,
        ldoTemperature_async        : YPowerSupply_get_ldoTemperature_async,
        get_voltageTransition       : YPowerSupply_get_voltageTransition,
        voltageTransition           : YPowerSupply_get_voltageTransition,
        get_voltageTransition_async : YPowerSupply_get_voltageTransition_async,
        voltageTransition_async     : YPowerSupply_get_voltageTransition_async,
        set_voltageTransition       : YPowerSupply_set_voltageTransition,
        setVoltageTransition        : YPowerSupply_set_voltageTransition,
        set_voltageAtStartUp        : YPowerSupply_set_voltageAtStartUp,
        setVoltageAtStartUp         : YPowerSupply_set_voltageAtStartUp,
        get_voltageAtStartUp        : YPowerSupply_get_voltageAtStartUp,
        voltageAtStartUp            : YPowerSupply_get_voltageAtStartUp,
        get_voltageAtStartUp_async  : YPowerSupply_get_voltageAtStartUp_async,
        voltageAtStartUp_async      : YPowerSupply_get_voltageAtStartUp_async,
        set_currentAtStartUp        : YPowerSupply_set_currentAtStartUp,
        setCurrentAtStartUp         : YPowerSupply_set_currentAtStartUp,
        get_currentAtStartUp        : YPowerSupply_get_currentAtStartUp,
        currentAtStartUp            : YPowerSupply_get_currentAtStartUp,
        get_currentAtStartUp_async  : YPowerSupply_get_currentAtStartUp_async,
        currentAtStartUp_async      : YPowerSupply_get_currentAtStartUp_async,
        get_command                 : YPowerSupply_get_command,
        command                     : YPowerSupply_get_command,
        get_command_async           : YPowerSupply_get_command_async,
        command_async               : YPowerSupply_get_command_async,
        set_command                 : YPowerSupply_set_command,
        setCommand                  : YPowerSupply_set_command,
        voltageMove                 : YPowerSupply_voltageMove,
        nextPowerSupply             : YPowerSupply_nextPowerSupply,
        _parseAttr                  : YPowerSupply_parseAttr
    });
    //--- (end of YPowerSupply initialization)
})();

//--- (YPowerSupply functions)

/**
 * Retrieves a regulated power supply for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the regulated power supply is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPowerSupply.isOnline() to test if the regulated power supply is
 * indeed online at a given time. In case of ambiguity when looking for
 * a regulated power supply by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the regulated power supply
 *
 * @return a YPowerSupply object allowing you to drive the regulated power supply.
 */
function yFindPowerSupply(func)
{
    return YPowerSupply.FindPowerSupply(func);
}

/**
 * Starts the enumeration of regulated power supplies currently accessible.
 * Use the method YPowerSupply.nextPowerSupply() to iterate on
 * next regulated power supplies.
 *
 * @return a pointer to a YPowerSupply object, corresponding to
 *         the first regulated power supply currently online, or a null pointer
 *         if there are none.
 */
function yFirstPowerSupply()
{
    return YPowerSupply.FirstPowerSupply();
}

//--- (end of YPowerSupply functions)
