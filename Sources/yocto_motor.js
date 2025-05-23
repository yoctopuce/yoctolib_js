/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Motor functions
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

//--- (YMotor return codes)
//--- (end of YMotor return codes)
//--- (YMotor definitions)
var Y_MOTORSTATUS_IDLE              = 0;
var Y_MOTORSTATUS_BRAKE             = 1;
var Y_MOTORSTATUS_FORWD             = 2;
var Y_MOTORSTATUS_BACKWD            = 3;
var Y_MOTORSTATUS_LOVOLT            = 4;
var Y_MOTORSTATUS_HICURR            = 5;
var Y_MOTORSTATUS_HIHEAT            = 6;
var Y_MOTORSTATUS_FAILSF            = 7;
var Y_MOTORSTATUS_INVALID           = -1;
var Y_DRIVINGFORCE_INVALID          = YAPI_INVALID_DOUBLE;
var Y_BRAKINGFORCE_INVALID          = YAPI_INVALID_DOUBLE;
var Y_CUTOFFVOLTAGE_INVALID         = YAPI_INVALID_DOUBLE;
var Y_OVERCURRENTLIMIT_INVALID      = YAPI_INVALID_UINT;
var Y_FREQUENCY_INVALID             = YAPI_INVALID_DOUBLE;
var Y_STARTERTIME_INVALID           = YAPI_INVALID_UINT;
var Y_FAILSAFETIMEOUT_INVALID       = YAPI_INVALID_UINT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YMotor definitions)

//--- (YMotor class start)
/**
 * YMotor Class: motor control interface, available for instance in the Yocto-Motor-DC
 *
 * The YMotor class allows you to drive a DC motor. It can be used to configure the
 * power sent to the motor to make it turn both ways, but also to drive accelerations
 * and decelerations. The motor will then accelerate automatically: you will not
 * have to monitor it. The API also allows to slow down the motor by shortening
 * its terminals: the motor will then act as an electromagnetic brake.
 */
//--- (end of YMotor class start)

var YMotor; // definition below
(function()
{
    function _YMotor(str_func)
    {
        //--- (YMotor constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Motor';

        this._motorStatus                    = Y_MOTORSTATUS_INVALID;      // MotorState
        this._drivingForce                   = Y_DRIVINGFORCE_INVALID;     // MeasureVal
        this._brakingForce                   = Y_BRAKINGFORCE_INVALID;     // MeasureVal
        this._cutOffVoltage                  = Y_CUTOFFVOLTAGE_INVALID;    // MeasureVal
        this._overCurrentLimit               = Y_OVERCURRENTLIMIT_INVALID; // UInt31
        this._frequency                      = Y_FREQUENCY_INVALID;        // MeasureVal
        this._starterTime                    = Y_STARTERTIME_INVALID;      // UInt31
        this._failSafeTimeout                = Y_FAILSAFETIMEOUT_INVALID;  // UInt31
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YMotor constructor)
    }

    //--- (YMotor implementation)

    function YMotor_parseAttr(name, val, _super)
    {
        switch(name) {
        case "motorStatus":
            this._motorStatus = parseInt(val);
            return 1;
        case "drivingForce":
            this._drivingForce = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "brakingForce":
            this._brakingForce = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "cutOffVoltage":
            this._cutOffVoltage = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "overCurrentLimit":
            this._overCurrentLimit = parseInt(val);
            return 1;
        case "frequency":
            this._frequency = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "starterTime":
            this._starterTime = parseInt(val);
            return 1;
        case "failSafeTimeout":
            this._failSafeTimeout = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Return the controller state. Possible states are:
     * IDLE   when the motor is stopped/in free wheel, ready to start;
     * FORWD  when the controller is driving the motor forward;
     * BACKWD when the controller is driving the motor backward;
     * BRAKE  when the controller is braking;
     * LOVOLT when the controller has detected a low voltage condition;
     * HICURR when the controller has detected an over current condition;
     * HIHEAT when the controller has detected an overheat condition;
     * FAILSF when the controller switched on the failsafe security.
     *
     * When an error condition occurred (LOVOLT, HICURR, HIHEAT, FAILSF), the controller
     * status must be explicitly reset using the resetStatus function.
     *
     * @return a value among YMotor.MOTORSTATUS_IDLE, YMotor.MOTORSTATUS_BRAKE, YMotor.MOTORSTATUS_FORWD,
     * YMotor.MOTORSTATUS_BACKWD, YMotor.MOTORSTATUS_LOVOLT, YMotor.MOTORSTATUS_HICURR,
     * YMotor.MOTORSTATUS_HIHEAT and YMotor.MOTORSTATUS_FAILSF
     *
     * On failure, throws an exception or returns YMotor.MOTORSTATUS_INVALID.
     */
    function YMotor_get_motorStatus()
    {
        var res;                    // enumMOTORSTATE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MOTORSTATUS_INVALID;
            }
        }
        res = this._motorStatus;
        return res;
    }

    /**
     * Return the controller state. Possible states are:
     * IDLE   when the motor is stopped/in free wheel, ready to start;
     * FORWD  when the controller is driving the motor forward;
     * BACKWD when the controller is driving the motor backward;
     * BRAKE  when the controller is braking;
     * LOVOLT when the controller has detected a low voltage condition;
     * HICURR when the controller has detected an over current condition;
     * HIHEAT when the controller has detected an overheat condition;
     * FAILSF when the controller switched on the failsafe security.
     *
     * When an error condition occurred (LOVOLT, HICURR, HIHEAT, FAILSF), the controller
     * status must be explicitly reset using the resetStatus function.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMotor object that invoked the callback
     *         - the result:a value among YMotor.MOTORSTATUS_IDLE, YMotor.MOTORSTATUS_BRAKE,
     *         YMotor.MOTORSTATUS_FORWD, YMotor.MOTORSTATUS_BACKWD, YMotor.MOTORSTATUS_LOVOLT,
     *         YMotor.MOTORSTATUS_HICURR, YMotor.MOTORSTATUS_HIHEAT and YMotor.MOTORSTATUS_FAILSF
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMotor.MOTORSTATUS_INVALID.
     */
    function YMotor_get_motorStatus_async(callback,context)
    {
        var res;                    // enumMOTORSTATE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MOTORSTATUS_INVALID);
            } else {
                callback(context, obj, obj._motorStatus);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YMotor_set_motorStatus(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('motorStatus',rest_val);
    }

    /**
     * Changes immediately the power sent to the motor. The value is a percentage between -100%
     * to 100%. If you want go easy on your mechanics and avoid excessive current consumption,
     * try to avoid brutal power changes. For example, immediate transition from forward full power
     * to reverse full power is a very bad idea. Each time the driving power is modified, the
     * braking power is set to zero.
     *
     * @param newval : a floating point number corresponding to immediately the power sent to the motor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMotor_set_drivingForce(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('drivingForce',rest_val);
    }

    /**
     * Returns the power sent to the motor, as a percentage between -100% and +100%.
     *
     * @return a floating point number corresponding to the power sent to the motor, as a percentage
     * between -100% and +100%
     *
     * On failure, throws an exception or returns YMotor.DRIVINGFORCE_INVALID.
     */
    function YMotor_get_drivingForce()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DRIVINGFORCE_INVALID;
            }
        }
        res = this._drivingForce;
        return res;
    }

    /**
     * Gets the power sent to the motor, as a percentage between -100% and +100%.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMotor object that invoked the callback
     *         - the result:a floating point number corresponding to the power sent to the motor, as a percentage
     *         between -100% and +100%
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMotor.DRIVINGFORCE_INVALID.
     */
    function YMotor_get_drivingForce_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DRIVINGFORCE_INVALID);
            } else {
                callback(context, obj, obj._drivingForce);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes immediately the braking force applied to the motor (in percents).
     * The value 0 corresponds to no braking (free wheel). When the braking force
     * is changed, the driving power is set to zero. The value is a percentage.
     *
     * @param newval : a floating point number corresponding to immediately the braking force applied to
     * the motor (in percents)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMotor_set_brakingForce(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('brakingForce',rest_val);
    }

    /**
     * Returns the braking force applied to the motor, as a percentage.
     * The value 0 corresponds to no braking (free wheel).
     *
     * @return a floating point number corresponding to the braking force applied to the motor, as a percentage
     *
     * On failure, throws an exception or returns YMotor.BRAKINGFORCE_INVALID.
     */
    function YMotor_get_brakingForce()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BRAKINGFORCE_INVALID;
            }
        }
        res = this._brakingForce;
        return res;
    }

    /**
     * Gets the braking force applied to the motor, as a percentage.
     * The value 0 corresponds to no braking (free wheel).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMotor object that invoked the callback
     *         - the result:a floating point number corresponding to the braking force applied to the motor, as a percentage
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMotor.BRAKINGFORCE_INVALID.
     */
    function YMotor_get_brakingForce_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BRAKINGFORCE_INVALID);
            } else {
                callback(context, obj, obj._brakingForce);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the threshold voltage under which the controller automatically switches to error state
     * and prevents further current draw. This setting prevent damage to a battery that can
     * occur when drawing current from an "empty" battery.
     * Note that whatever the cutoff threshold, the controller switches to undervoltage
     * error state if the power supply goes under 3V, even for a very brief time.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the threshold voltage under which the
     * controller automatically switches to error state
     *         and prevents further current draw
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMotor_set_cutOffVoltage(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('cutOffVoltage',rest_val);
    }

    /**
     * Returns the threshold voltage under which the controller automatically switches to error state
     * and prevents further current draw. This setting prevents damage to a battery that can
     * occur when drawing current from an "empty" battery.
     *
     * @return a floating point number corresponding to the threshold voltage under which the controller
     * automatically switches to error state
     *         and prevents further current draw
     *
     * On failure, throws an exception or returns YMotor.CUTOFFVOLTAGE_INVALID.
     */
    function YMotor_get_cutOffVoltage()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CUTOFFVOLTAGE_INVALID;
            }
        }
        res = this._cutOffVoltage;
        return res;
    }

    /**
     * Gets the threshold voltage under which the controller automatically switches to error state
     * and prevents further current draw. This setting prevents damage to a battery that can
     * occur when drawing current from an "empty" battery.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMotor object that invoked the callback
     *         - the result:a floating point number corresponding to the threshold voltage under which the
     *         controller automatically switches to error state
     *         and prevents further current draw
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMotor.CUTOFFVOLTAGE_INVALID.
     */
    function YMotor_get_cutOffVoltage_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CUTOFFVOLTAGE_INVALID);
            } else {
                callback(context, obj, obj._cutOffVoltage);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current threshold (in mA) above which the controller automatically
     * switches to error state. A zero value means that there is no limit.
     *
     * @return an integer corresponding to the current threshold (in mA) above which the controller automatically
     *         switches to error state
     *
     * On failure, throws an exception or returns YMotor.OVERCURRENTLIMIT_INVALID.
     */
    function YMotor_get_overCurrentLimit()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_OVERCURRENTLIMIT_INVALID;
            }
        }
        res = this._overCurrentLimit;
        return res;
    }

    /**
     * Gets the current threshold (in mA) above which the controller automatically
     * switches to error state. A zero value means that there is no limit.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMotor object that invoked the callback
     *         - the result:an integer corresponding to the current threshold (in mA) above which the controller automatically
     *         switches to error state
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMotor.OVERCURRENTLIMIT_INVALID.
     */
    function YMotor_get_overCurrentLimit_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_OVERCURRENTLIMIT_INVALID);
            } else {
                callback(context, obj, obj._overCurrentLimit);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current threshold (in mA) above which the controller automatically
     * switches to error state. A zero value means that there is no limit. Note that whatever the
     * current limit is, the controller switches to OVERCURRENT status if the current
     * goes above 32A, even for a very brief time. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the current threshold (in mA) above which the
     * controller automatically
     *         switches to error state
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMotor_set_overCurrentLimit(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('overCurrentLimit',rest_val);
    }

    /**
     * Changes the PWM frequency used to control the motor. Low frequency is usually
     * more efficient and may help the motor to start, but an audible noise might be
     * generated. A higher frequency reduces the noise, but more energy is converted
     * into heat. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the PWM frequency used to control the motor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMotor_set_frequency(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('frequency',rest_val);
    }

    /**
     * Returns the PWM frequency used to control the motor.
     *
     * @return a floating point number corresponding to the PWM frequency used to control the motor
     *
     * On failure, throws an exception or returns YMotor.FREQUENCY_INVALID.
     */
    function YMotor_get_frequency()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_FREQUENCY_INVALID;
            }
        }
        res = this._frequency;
        return res;
    }

    /**
     * Gets the PWM frequency used to control the motor.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMotor object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM frequency used to control the motor
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMotor.FREQUENCY_INVALID.
     */
    function YMotor_get_frequency_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_FREQUENCY_INVALID);
            } else {
                callback(context, obj, obj._frequency);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the duration (in ms) during which the motor is driven at low frequency to help
     * it start up.
     *
     * @return an integer corresponding to the duration (in ms) during which the motor is driven at low
     * frequency to help
     *         it start up
     *
     * On failure, throws an exception or returns YMotor.STARTERTIME_INVALID.
     */
    function YMotor_get_starterTime()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_STARTERTIME_INVALID;
            }
        }
        res = this._starterTime;
        return res;
    }

    /**
     * Gets the duration (in ms) during which the motor is driven at low frequency to help
     * it start up.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMotor object that invoked the callback
     *         - the result:an integer corresponding to the duration (in ms) during which the motor is driven at
     *         low frequency to help
     *         it start up
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMotor.STARTERTIME_INVALID.
     */
    function YMotor_get_starterTime_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_STARTERTIME_INVALID);
            } else {
                callback(context, obj, obj._starterTime);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the duration (in ms) during which the motor is driven at low frequency to help
     * it start up. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the duration (in ms) during which the motor is driven
     * at low frequency to help
     *         it start up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMotor_set_starterTime(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('starterTime',rest_val);
    }

    /**
     * Returns the delay in milliseconds allowed for the controller to run autonomously without
     * receiving any instruction from the control process. When this delay has elapsed,
     * the controller automatically stops the motor and switches to FAILSAFE error.
     * Failsafe security is disabled when the value is zero.
     *
     * @return an integer corresponding to the delay in milliseconds allowed for the controller to run
     * autonomously without
     *         receiving any instruction from the control process
     *
     * On failure, throws an exception or returns YMotor.FAILSAFETIMEOUT_INVALID.
     */
    function YMotor_get_failSafeTimeout()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_FAILSAFETIMEOUT_INVALID;
            }
        }
        res = this._failSafeTimeout;
        return res;
    }

    /**
     * Gets the delay in milliseconds allowed for the controller to run autonomously without
     * receiving any instruction from the control process. When this delay has elapsed,
     * the controller automatically stops the motor and switches to FAILSAFE error.
     * Failsafe security is disabled when the value is zero.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMotor object that invoked the callback
     *         - the result:an integer corresponding to the delay in milliseconds allowed for the controller to
     *         run autonomously without
     *         receiving any instruction from the control process
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMotor.FAILSAFETIMEOUT_INVALID.
     */
    function YMotor_get_failSafeTimeout_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_FAILSAFETIMEOUT_INVALID);
            } else {
                callback(context, obj, obj._failSafeTimeout);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the delay in milliseconds allowed for the controller to run autonomously without
     * receiving any instruction from the control process. When this delay has elapsed,
     * the controller automatically stops the motor and switches to FAILSAFE error.
     * Failsafe security is disabled when the value is zero.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the delay in milliseconds allowed for the controller to
     * run autonomously without
     *         receiving any instruction from the control process
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMotor_set_failSafeTimeout(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('failSafeTimeout',rest_val);
    }

    function YMotor_get_command()
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
     *         - the YMotor object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YMotor_get_command_async(callback,context)
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

    function YMotor_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a motor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMotor.isOnline() to test if the motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the motor, for instance
     *         MOTORCTL.motor.
     *
     * @return a YMotor object allowing you to drive the motor.
     */
    function YMotor_FindMotor(func)                             // class method
    {
        var obj;                    // YMotor;
        obj = YFunction._FindFromCache("Motor", func);
        if (obj == null) {
            obj = new YMotor(func);
            YFunction._AddToCache("Motor", func, obj);
        }
        return obj;
    }

    /**
     * Rearms the controller failsafe timer. When the motor is running and the failsafe feature
     * is active, this function should be called periodically to prove that the control process
     * is running properly. Otherwise, the motor is automatically stopped after the specified
     * timeout. Calling a motor <i>set</i> function implicitly rearms the failsafe timer.
     */
    function YMotor_keepALive()
    {
        return this.set_command("K");
    }

    /**
     * Reset the controller state to IDLE. This function must be invoked explicitly
     * after any error condition is signaled.
     */
    function YMotor_resetStatus()
    {
        return this.set_motorStatus(Y_MOTORSTATUS_IDLE);
    }

    /**
     * Changes progressively the power sent to the motor for a specific duration.
     *
     * @param targetPower : desired motor power, in percents (between -100% and +100%)
     * @param delay : duration (in ms) of the transition
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMotor_drivingForceMove(targetPower,delay)
    {
        return this.set_command("P"+String(Math.round(Math.round(targetPower*10)))+","+String(Math.round(delay)));
    }

    /**
     * Changes progressively the braking force applied to the motor for a specific duration.
     *
     * @param targetPower : desired braking force, in percents
     * @param delay : duration (in ms) of the transition
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMotor_brakingForceMove(targetPower,delay)
    {
        return this.set_command("B"+String(Math.round(Math.round(targetPower*10)))+","+String(Math.round(delay)));
    }

    /**
     * Continues the enumeration of motors started using yFirstMotor().
     * Caution: You can't make any assumption about the returned motors order.
     * If you want to find a specific a motor, use Motor.findMotor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMotor object, corresponding to
     *         a motor currently online, or a null pointer
     *         if there are no more motors to enumerate.
     */
    function YMotor_nextMotor()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMotor.FindMotor(next_hwid);
    }

    /**
     * Starts the enumeration of motors currently accessible.
     * Use the method YMotor.nextMotor() to iterate on
     * next motors.
     *
     * @return a pointer to a YMotor object, corresponding to
     *         the first motor currently online, or a null pointer
     *         if there are none.
     */
    function YMotor_FirstMotor()
    {
        var next_hwid = YAPI.getFirstHardwareId('Motor');
        if(next_hwid == null) return null;
        return YMotor.FindMotor(next_hwid);
    }

    //--- (end of YMotor implementation)

    //--- (YMotor initialization)
    YMotor = YFunction._Subclass(_YMotor, {
        // Constants
        MOTORSTATUS_IDLE            : 0,
        MOTORSTATUS_BRAKE           : 1,
        MOTORSTATUS_FORWD           : 2,
        MOTORSTATUS_BACKWD          : 3,
        MOTORSTATUS_LOVOLT          : 4,
        MOTORSTATUS_HICURR          : 5,
        MOTORSTATUS_HIHEAT          : 6,
        MOTORSTATUS_FAILSF          : 7,
        MOTORSTATUS_INVALID         : -1,
        DRIVINGFORCE_INVALID        : YAPI_INVALID_DOUBLE,
        BRAKINGFORCE_INVALID        : YAPI_INVALID_DOUBLE,
        CUTOFFVOLTAGE_INVALID       : YAPI_INVALID_DOUBLE,
        OVERCURRENTLIMIT_INVALID    : YAPI_INVALID_UINT,
        FREQUENCY_INVALID           : YAPI_INVALID_DOUBLE,
        STARTERTIME_INVALID         : YAPI_INVALID_UINT,
        FAILSAFETIMEOUT_INVALID     : YAPI_INVALID_UINT,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindMotor                   : YMotor_FindMotor,
        FirstMotor                  : YMotor_FirstMotor
    }, {
        // Methods
        get_motorStatus             : YMotor_get_motorStatus,
        motorStatus                 : YMotor_get_motorStatus,
        get_motorStatus_async       : YMotor_get_motorStatus_async,
        motorStatus_async           : YMotor_get_motorStatus_async,
        set_motorStatus             : YMotor_set_motorStatus,
        setMotorStatus              : YMotor_set_motorStatus,
        set_drivingForce            : YMotor_set_drivingForce,
        setDrivingForce             : YMotor_set_drivingForce,
        get_drivingForce            : YMotor_get_drivingForce,
        drivingForce                : YMotor_get_drivingForce,
        get_drivingForce_async      : YMotor_get_drivingForce_async,
        drivingForce_async          : YMotor_get_drivingForce_async,
        set_brakingForce            : YMotor_set_brakingForce,
        setBrakingForce             : YMotor_set_brakingForce,
        get_brakingForce            : YMotor_get_brakingForce,
        brakingForce                : YMotor_get_brakingForce,
        get_brakingForce_async      : YMotor_get_brakingForce_async,
        brakingForce_async          : YMotor_get_brakingForce_async,
        set_cutOffVoltage           : YMotor_set_cutOffVoltage,
        setCutOffVoltage            : YMotor_set_cutOffVoltage,
        get_cutOffVoltage           : YMotor_get_cutOffVoltage,
        cutOffVoltage               : YMotor_get_cutOffVoltage,
        get_cutOffVoltage_async     : YMotor_get_cutOffVoltage_async,
        cutOffVoltage_async         : YMotor_get_cutOffVoltage_async,
        get_overCurrentLimit        : YMotor_get_overCurrentLimit,
        overCurrentLimit            : YMotor_get_overCurrentLimit,
        get_overCurrentLimit_async  : YMotor_get_overCurrentLimit_async,
        overCurrentLimit_async      : YMotor_get_overCurrentLimit_async,
        set_overCurrentLimit        : YMotor_set_overCurrentLimit,
        setOverCurrentLimit         : YMotor_set_overCurrentLimit,
        set_frequency               : YMotor_set_frequency,
        setFrequency                : YMotor_set_frequency,
        get_frequency               : YMotor_get_frequency,
        frequency                   : YMotor_get_frequency,
        get_frequency_async         : YMotor_get_frequency_async,
        frequency_async             : YMotor_get_frequency_async,
        get_starterTime             : YMotor_get_starterTime,
        starterTime                 : YMotor_get_starterTime,
        get_starterTime_async       : YMotor_get_starterTime_async,
        starterTime_async           : YMotor_get_starterTime_async,
        set_starterTime             : YMotor_set_starterTime,
        setStarterTime              : YMotor_set_starterTime,
        get_failSafeTimeout         : YMotor_get_failSafeTimeout,
        failSafeTimeout             : YMotor_get_failSafeTimeout,
        get_failSafeTimeout_async   : YMotor_get_failSafeTimeout_async,
        failSafeTimeout_async       : YMotor_get_failSafeTimeout_async,
        set_failSafeTimeout         : YMotor_set_failSafeTimeout,
        setFailSafeTimeout          : YMotor_set_failSafeTimeout,
        get_command                 : YMotor_get_command,
        command                     : YMotor_get_command,
        get_command_async           : YMotor_get_command_async,
        command_async               : YMotor_get_command_async,
        set_command                 : YMotor_set_command,
        setCommand                  : YMotor_set_command,
        keepALive                   : YMotor_keepALive,
        resetStatus                 : YMotor_resetStatus,
        drivingForceMove            : YMotor_drivingForceMove,
        brakingForceMove            : YMotor_brakingForceMove,
        nextMotor                   : YMotor_nextMotor,
        _parseAttr                  : YMotor_parseAttr
    });
    //--- (end of YMotor initialization)
})();

//--- (YMotor functions)

/**
 * Retrieves a motor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the motor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YMotor.isOnline() to test if the motor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a motor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the motor, for instance
 *         MOTORCTL.motor.
 *
 * @return a YMotor object allowing you to drive the motor.
 */
function yFindMotor(func)
{
    return YMotor.FindMotor(func);
}

/**
 * Starts the enumeration of motors currently accessible.
 * Use the method YMotor.nextMotor() to iterate on
 * next motors.
 *
 * @return a pointer to a YMotor object, corresponding to
 *         the first motor currently online, or a null pointer
 *         if there are none.
 */
function yFirstMotor()
{
    return YMotor.FirstMotor();
}

//--- (end of YMotor functions)
