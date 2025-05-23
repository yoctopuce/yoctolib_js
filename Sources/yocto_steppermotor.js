/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for StepperMotor functions
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

//--- (YStepperMotor return codes)
//--- (end of YStepperMotor return codes)
//--- (YStepperMotor definitions)
var Y_MOTORSTATE_ABSENT             = 0;
var Y_MOTORSTATE_ALERT              = 1;
var Y_MOTORSTATE_HI_Z               = 2;
var Y_MOTORSTATE_STOP               = 3;
var Y_MOTORSTATE_RUN                = 4;
var Y_MOTORSTATE_BATCH              = 5;
var Y_MOTORSTATE_INVALID            = -1;
var Y_STEPPING_MICROSTEP16          = 0;
var Y_STEPPING_MICROSTEP8           = 1;
var Y_STEPPING_MICROSTEP4           = 2;
var Y_STEPPING_HALFSTEP             = 3;
var Y_STEPPING_FULLSTEP             = 4;
var Y_STEPPING_INVALID              = -1;
var Y_DIAGS_INVALID                 = YAPI_INVALID_UINT;
var Y_STEPPOS_INVALID               = YAPI_INVALID_DOUBLE;
var Y_SPEED_INVALID                 = YAPI_INVALID_DOUBLE;
var Y_PULLINSPEED_INVALID           = YAPI_INVALID_DOUBLE;
var Y_MAXACCEL_INVALID              = YAPI_INVALID_DOUBLE;
var Y_MAXSPEED_INVALID              = YAPI_INVALID_DOUBLE;
var Y_OVERCURRENT_INVALID           = YAPI_INVALID_UINT;
var Y_TCURRSTOP_INVALID             = YAPI_INVALID_UINT;
var Y_TCURRRUN_INVALID              = YAPI_INVALID_UINT;
var Y_ALERTMODE_INVALID             = YAPI_INVALID_STRING;
var Y_AUXMODE_INVALID               = YAPI_INVALID_STRING;
var Y_AUXSIGNAL_INVALID             = YAPI_INVALID_INT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YStepperMotor definitions)

//--- (YStepperMotor class start)
/**
 * YStepperMotor Class: stepper motor control interface
 *
 * The YStepperMotor class allows you to drive a stepper motor.
 */
//--- (end of YStepperMotor class start)

var YStepperMotor; // definition below
(function()
{
    function _YStepperMotor(str_func)
    {
        //--- (YStepperMotor constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'StepperMotor';

        this._motorState                     = Y_MOTORSTATE_INVALID;       // StepperState
        this._diags                          = Y_DIAGS_INVALID;            // StepperDiags
        this._stepPos                        = Y_STEPPOS_INVALID;          // StepPos
        this._speed                          = Y_SPEED_INVALID;            // MeasureVal
        this._pullinSpeed                    = Y_PULLINSPEED_INVALID;      // MeasureVal
        this._maxAccel                       = Y_MAXACCEL_INVALID;         // MeasureVal
        this._maxSpeed                       = Y_MAXSPEED_INVALID;         // MeasureVal
        this._stepping                       = Y_STEPPING_INVALID;         // SteppingMode
        this._overcurrent                    = Y_OVERCURRENT_INVALID;      // UInt31
        this._tCurrStop                      = Y_TCURRSTOP_INVALID;        // UInt31
        this._tCurrRun                       = Y_TCURRRUN_INVALID;         // UInt31
        this._alertMode                      = Y_ALERTMODE_INVALID;        // AlertMode
        this._auxMode                        = Y_AUXMODE_INVALID;          // AuxMode
        this._auxSignal                      = Y_AUXSIGNAL_INVALID;        // Int
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YStepperMotor constructor)
    }

    //--- (YStepperMotor implementation)

    function YStepperMotor_parseAttr(name, val, _super)
    {
        switch(name) {
        case "motorState":
            this._motorState = parseInt(val);
            return 1;
        case "diags":
            this._diags = parseInt(val);
            return 1;
        case "stepPos":
            this._stepPos = val / 16.0;
            return 1;
        case "speed":
            this._speed = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "pullinSpeed":
            this._pullinSpeed = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "maxAccel":
            this._maxAccel = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "maxSpeed":
            this._maxSpeed = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "stepping":
            this._stepping = parseInt(val);
            return 1;
        case "overcurrent":
            this._overcurrent = parseInt(val);
            return 1;
        case "tCurrStop":
            this._tCurrStop = parseInt(val);
            return 1;
        case "tCurrRun":
            this._tCurrRun = parseInt(val);
            return 1;
        case "alertMode":
            this._alertMode = val;
            return 1;
        case "auxMode":
            this._auxMode = val;
            return 1;
        case "auxSignal":
            this._auxSignal = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the motor working state.
     *
     * @return a value among YStepperMotor.MOTORSTATE_ABSENT, YStepperMotor.MOTORSTATE_ALERT,
     * YStepperMotor.MOTORSTATE_HI_Z, YStepperMotor.MOTORSTATE_STOP, YStepperMotor.MOTORSTATE_RUN and
     * YStepperMotor.MOTORSTATE_BATCH corresponding to the motor working state
     *
     * On failure, throws an exception or returns YStepperMotor.MOTORSTATE_INVALID.
     */
    function YStepperMotor_get_motorState()
    {
        var res;                    // enumSTEPPERSTATE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MOTORSTATE_INVALID;
            }
        }
        res = this._motorState;
        return res;
    }

    /**
     * Gets the motor working state.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:a value among YStepperMotor.MOTORSTATE_ABSENT, YStepperMotor.MOTORSTATE_ALERT,
     *         YStepperMotor.MOTORSTATE_HI_Z, YStepperMotor.MOTORSTATE_STOP, YStepperMotor.MOTORSTATE_RUN and
     *         YStepperMotor.MOTORSTATE_BATCH corresponding to the motor working state
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.MOTORSTATE_INVALID.
     */
    function YStepperMotor_get_motorState_async(callback,context)
    {
        var res;                    // enumSTEPPERSTATE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MOTORSTATE_INVALID);
            } else {
                callback(context, obj, obj._motorState);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the stepper motor controller diagnostics, as a bitmap.
     *
     * @return an integer corresponding to the stepper motor controller diagnostics, as a bitmap
     *
     * On failure, throws an exception or returns YStepperMotor.DIAGS_INVALID.
     */
    function YStepperMotor_get_diags()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DIAGS_INVALID;
            }
        }
        res = this._diags;
        return res;
    }

    /**
     * Gets the stepper motor controller diagnostics, as a bitmap.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:an integer corresponding to the stepper motor controller diagnostics, as a bitmap
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.DIAGS_INVALID.
     */
    function YStepperMotor_get_diags_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DIAGS_INVALID);
            } else {
                callback(context, obj, obj._diags);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current logical motor position, measured in steps.
     * This command does not cause any motor move, as its purpose is only to set up
     * the origin of the position counter. The fractional part of the position,
     * that corresponds to the physical position of the rotor, is not changed.
     * To trigger a motor move, use methods moveTo() or moveRel()
     * instead.
     *
     * @param newval : a floating point number corresponding to the current logical motor position, measured in steps
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_set_stepPos(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 100.0)/100.0);
        return this._setAttr('stepPos',rest_val);
    }

    /**
     * Returns the current logical motor position, measured in steps.
     * The value may include a fractional part when micro-stepping is in use.
     *
     * @return a floating point number corresponding to the current logical motor position, measured in steps
     *
     * On failure, throws an exception or returns YStepperMotor.STEPPOS_INVALID.
     */
    function YStepperMotor_get_stepPos()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_STEPPOS_INVALID;
            }
        }
        res = this._stepPos;
        return res;
    }

    /**
     * Gets the current logical motor position, measured in steps.
     * The value may include a fractional part when micro-stepping is in use.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:a floating point number corresponding to the current logical motor position, measured in steps
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.STEPPOS_INVALID.
     */
    function YStepperMotor_get_stepPos_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_STEPPOS_INVALID);
            } else {
                callback(context, obj, obj._stepPos);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns current motor speed, measured in steps per second.
     * To change speed, use method changeSpeed().
     *
     * @return a floating point number corresponding to current motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.SPEED_INVALID.
     */
    function YStepperMotor_get_speed()
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
     * Gets current motor speed, measured in steps per second.
     * To change speed, use method changeSpeed().
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:a floating point number corresponding to current motor speed, measured in steps per second
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.SPEED_INVALID.
     */
    function YStepperMotor_get_speed_async(callback,context)
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
     * Changes the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @param newval : a floating point number corresponding to the motor speed immediately reachable from
     * stop state, measured in steps per second
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_set_pullinSpeed(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('pullinSpeed',rest_val);
    }

    /**
     * Returns the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @return a floating point number corresponding to the motor speed immediately reachable from stop
     * state, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.PULLINSPEED_INVALID.
     */
    function YStepperMotor_get_pullinSpeed()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULLINSPEED_INVALID;
            }
        }
        res = this._pullinSpeed;
        return res;
    }

    /**
     * Gets the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:a floating point number corresponding to the motor speed immediately reachable from
     *         stop state, measured in steps per second
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.PULLINSPEED_INVALID.
     */
    function YStepperMotor_get_pullinSpeed_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PULLINSPEED_INVALID);
            } else {
                callback(context, obj, obj._pullinSpeed);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the maximal motor acceleration, measured in steps per second^2.
     *
     * @param newval : a floating point number corresponding to the maximal motor acceleration, measured
     * in steps per second^2
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_set_maxAccel(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('maxAccel',rest_val);
    }

    /**
     * Returns the maximal motor acceleration, measured in steps per second^2.
     *
     * @return a floating point number corresponding to the maximal motor acceleration, measured in steps per second^2
     *
     * On failure, throws an exception or returns YStepperMotor.MAXACCEL_INVALID.
     */
    function YStepperMotor_get_maxAccel()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MAXACCEL_INVALID;
            }
        }
        res = this._maxAccel;
        return res;
    }

    /**
     * Gets the maximal motor acceleration, measured in steps per second^2.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:a floating point number corresponding to the maximal motor acceleration, measured in
     *         steps per second^2
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.MAXACCEL_INVALID.
     */
    function YStepperMotor_get_maxAccel_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MAXACCEL_INVALID);
            } else {
                callback(context, obj, obj._maxAccel);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the maximal motor speed, measured in steps per second.
     *
     * @param newval : a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_set_maxSpeed(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('maxSpeed',rest_val);
    }

    /**
     * Returns the maximal motor speed, measured in steps per second.
     *
     * @return a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.MAXSPEED_INVALID.
     */
    function YStepperMotor_get_maxSpeed()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MAXSPEED_INVALID;
            }
        }
        res = this._maxSpeed;
        return res;
    }

    /**
     * Gets the maximal motor speed, measured in steps per second.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:a floating point number corresponding to the maximal motor speed, measured in steps per second
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.MAXSPEED_INVALID.
     */
    function YStepperMotor_get_maxSpeed_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MAXSPEED_INVALID);
            } else {
                callback(context, obj, obj._maxSpeed);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the stepping mode used to drive the motor.
     *
     * @return a value among YStepperMotor.STEPPING_MICROSTEP16, YStepperMotor.STEPPING_MICROSTEP8,
     * YStepperMotor.STEPPING_MICROSTEP4, YStepperMotor.STEPPING_HALFSTEP and
     * YStepperMotor.STEPPING_FULLSTEP corresponding to the stepping mode used to drive the motor
     *
     * On failure, throws an exception or returns YStepperMotor.STEPPING_INVALID.
     */
    function YStepperMotor_get_stepping()
    {
        var res;                    // enumSTEPPINGMODE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_STEPPING_INVALID;
            }
        }
        res = this._stepping;
        return res;
    }

    /**
     * Gets the stepping mode used to drive the motor.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:a value among YStepperMotor.STEPPING_MICROSTEP16, YStepperMotor.STEPPING_MICROSTEP8,
     *         YStepperMotor.STEPPING_MICROSTEP4, YStepperMotor.STEPPING_HALFSTEP and
     *         YStepperMotor.STEPPING_FULLSTEP corresponding to the stepping mode used to drive the motor
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.STEPPING_INVALID.
     */
    function YStepperMotor_get_stepping_async(callback,context)
    {
        var res;                    // enumSTEPPINGMODE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_STEPPING_INVALID);
            } else {
                callback(context, obj, obj._stepping);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the stepping mode used to drive the motor.
     *
     * @param newval : a value among YStepperMotor.STEPPING_MICROSTEP16,
     * YStepperMotor.STEPPING_MICROSTEP8, YStepperMotor.STEPPING_MICROSTEP4,
     * YStepperMotor.STEPPING_HALFSTEP and YStepperMotor.STEPPING_FULLSTEP corresponding to the stepping
     * mode used to drive the motor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_set_stepping(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('stepping',rest_val);
    }

    /**
     * Returns the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @return an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.OVERCURRENT_INVALID.
     */
    function YStepperMotor_get_overcurrent()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_OVERCURRENT_INVALID;
            }
        }
        res = this._overcurrent;
        return res;
    }

    /**
     * Gets the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.OVERCURRENT_INVALID.
     */
    function YStepperMotor_get_overcurrent_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_OVERCURRENT_INVALID);
            } else {
                callback(context, obj, obj._overcurrent);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @param newval : an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_set_overcurrent(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('overcurrent',rest_val);
    }

    /**
     * Returns the torque regulation current when the motor is stopped, measured in mA.
     *
     * @return an integer corresponding to the torque regulation current when the motor is stopped, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.TCURRSTOP_INVALID.
     */
    function YStepperMotor_get_tCurrStop()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TCURRSTOP_INVALID;
            }
        }
        res = this._tCurrStop;
        return res;
    }

    /**
     * Gets the torque regulation current when the motor is stopped, measured in mA.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:an integer corresponding to the torque regulation current when the motor is stopped, measured in mA
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.TCURRSTOP_INVALID.
     */
    function YStepperMotor_get_tCurrStop_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TCURRSTOP_INVALID);
            } else {
                callback(context, obj, obj._tCurrStop);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the torque regulation current when the motor is stopped, measured in mA.
     *
     * @param newval : an integer corresponding to the torque regulation current when the motor is
     * stopped, measured in mA
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_set_tCurrStop(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('tCurrStop',rest_val);
    }

    /**
     * Returns the torque regulation current when the motor is running, measured in mA.
     *
     * @return an integer corresponding to the torque regulation current when the motor is running, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.TCURRRUN_INVALID.
     */
    function YStepperMotor_get_tCurrRun()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TCURRRUN_INVALID;
            }
        }
        res = this._tCurrRun;
        return res;
    }

    /**
     * Gets the torque regulation current when the motor is running, measured in mA.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:an integer corresponding to the torque regulation current when the motor is running, measured in mA
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.TCURRRUN_INVALID.
     */
    function YStepperMotor_get_tCurrRun_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TCURRRUN_INVALID);
            } else {
                callback(context, obj, obj._tCurrRun);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the torque regulation current when the motor is running, measured in mA.
     *
     * @param newval : an integer corresponding to the torque regulation current when the motor is
     * running, measured in mA
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_set_tCurrRun(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('tCurrRun',rest_val);
    }

    function YStepperMotor_get_alertMode()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ALERTMODE_INVALID;
            }
        }
        res = this._alertMode;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YStepperMotor_get_alertMode_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ALERTMODE_INVALID);
            } else {
                callback(context, obj, obj._alertMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YStepperMotor_set_alertMode(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('alertMode',rest_val);
    }

    function YStepperMotor_get_auxMode()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_AUXMODE_INVALID;
            }
        }
        res = this._auxMode;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YStepperMotor_get_auxMode_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_AUXMODE_INVALID);
            } else {
                callback(context, obj, obj._auxMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YStepperMotor_set_auxMode(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('auxMode',rest_val);
    }

    /**
     * Returns the current value of the signal generated on the auxiliary output.
     *
     * @return an integer corresponding to the current value of the signal generated on the auxiliary output
     *
     * On failure, throws an exception or returns YStepperMotor.AUXSIGNAL_INVALID.
     */
    function YStepperMotor_get_auxSignal()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_AUXSIGNAL_INVALID;
            }
        }
        res = this._auxSignal;
        return res;
    }

    /**
     * Gets the current value of the signal generated on the auxiliary output.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YStepperMotor object that invoked the callback
     *         - the result:an integer corresponding to the current value of the signal generated on the auxiliary output
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YStepperMotor.AUXSIGNAL_INVALID.
     */
    function YStepperMotor_get_auxSignal_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_AUXSIGNAL_INVALID);
            } else {
                callback(context, obj, obj._auxSignal);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the value of the signal generated on the auxiliary output.
     * Acceptable values depend on the auxiliary output signal type configured.
     *
     * @param newval : an integer corresponding to the value of the signal generated on the auxiliary output
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_set_auxSignal(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('auxSignal',rest_val);
    }

    function YStepperMotor_get_command()
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
     *         - the YStepperMotor object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YStepperMotor_get_command_async(callback,context)
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

    function YStepperMotor_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a stepper motor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the stepper motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YStepperMotor.isOnline() to test if the stepper motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a stepper motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the stepper motor, for instance
     *         MyDevice.stepperMotor1.
     *
     * @return a YStepperMotor object allowing you to drive the stepper motor.
     */
    function YStepperMotor_FindStepperMotor(func)               // class method
    {
        var obj;                    // YStepperMotor;
        obj = YFunction._FindFromCache("StepperMotor", func);
        if (obj == null) {
            obj = new YStepperMotor(func);
            YFunction._AddToCache("StepperMotor", func, obj);
        }
        return obj;
    }

    function YStepperMotor_sendCommand(command)
    {
        var id;                     // str;
        var url;                    // str;
        var retBin;                 // bin;
        var res;                    // int;
        id = this.get_functionId();
        id = id.substr(12, 1);
        url = "cmd.txt?"+id+"="+command;
        //may throw an exception
        retBin = this._download(url);
        res = (retBin).charCodeAt(0);
        if (res < 58) {
            if (!(res == 48)) {
                return this._throw(YAPI_DEVICE_BUSY,"Motor command pipeline is full, try again later",YAPI_DEVICE_BUSY);
            }
        } else {
            if (!(res == 48)) {
                return this._throw(YAPI_IO_ERROR,"Motor command failed permanently",YAPI_IO_ERROR);
            }
        }
        return YAPI_SUCCESS;
    }

    /**
     * Reinitialize the controller and clear all alert flags.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_reset()
    {
        return this.set_command("Z");
    }

    /**
     * Starts the motor backward at the specified speed, to search for the motor home position.
     *
     * @param speed : desired speed, in steps per second.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_findHomePosition(speed)
    {
        return this.sendCommand("H"+String(Math.round(Math.round(1000*speed))));
    }

    /**
     * Starts the motor at a given speed. The time needed to reach the requested speed
     * will depend on the acceleration parameters configured for the motor.
     *
     * @param speed : desired speed, in steps per second. The minimal non-zero speed
     *         is 0.001 pulse per second.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_changeSpeed(speed)
    {
        return this.sendCommand("R"+String(Math.round(Math.round(1000*speed))));
    }

    /**
     * Starts the motor to reach a given absolute position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param absPos : absolute position, measured in steps from the origin.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_moveTo(absPos)
    {
        return this.sendCommand("M"+String(Math.round(Math.round(16*absPos))));
    }

    /**
     * Starts the motor to reach a given relative position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param relPos : relative position, measured in steps from the current position.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_moveRel(relPos)
    {
        return this.sendCommand("m"+String(Math.round(Math.round(16*relPos))));
    }

    /**
     * Starts the motor to reach a given relative position, keeping the speed under the
     * specified limit. The time needed to reach the requested position will depend on
     * the acceleration parameters configured for the motor.
     *
     * @param relPos : relative position, measured in steps from the current position.
     * @param maxSpeed : limit speed, in steps per second.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_moveRelSlow(relPos,maxSpeed)
    {
        return this.sendCommand("m"+String(Math.round(Math.round(16*relPos)))+"@"+String(Math.round(Math.round(1000*maxSpeed))));
    }

    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs : wait time, specified in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_pause(waitMs)
    {
        return this.sendCommand("_"+String(Math.round(waitMs)));
    }

    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_emergencyStop()
    {
        return this.set_command("!");
    }

    /**
     * Move one step in the direction opposite the direction set when the most recent alert was raised.
     * The move occurs even if the system is still in alert mode (end switch depressed). Caution.
     * use this function with great care as it may cause mechanical damages !
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_alertStepOut()
    {
        return this.set_command(".");
    }

    /**
     * Move one single step in the selected direction without regards to end switches.
     * The move occurs even if the system is still in alert mode (end switch depressed). Caution.
     * use this function with great care as it may cause mechanical damages !
     *
     * @param dir : Value +1 or -1, according to the desired direction of the move
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_alertStepDir(dir)
    {
        if (!(dir != 0)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"direction must be +1 or -1",YAPI_INVALID_ARGUMENT);
        }
        if (dir > 0) {
            return this.set_command(".+");
        }
        return this.set_command(".-");
    }

    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_abortAndBrake()
    {
        return this.set_command("B");
    }

    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YStepperMotor_abortAndHiZ()
    {
        return this.set_command("z");
    }

    /**
     * Continues the enumeration of stepper motors started using yFirstStepperMotor().
     * Caution: You can't make any assumption about the returned stepper motors order.
     * If you want to find a specific a stepper motor, use StepperMotor.findStepperMotor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YStepperMotor object, corresponding to
     *         a stepper motor currently online, or a null pointer
     *         if there are no more stepper motors to enumerate.
     */
    function YStepperMotor_nextStepperMotor()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YStepperMotor.FindStepperMotor(next_hwid);
    }

    /**
     * Starts the enumeration of stepper motors currently accessible.
     * Use the method YStepperMotor.nextStepperMotor() to iterate on
     * next stepper motors.
     *
     * @return a pointer to a YStepperMotor object, corresponding to
     *         the first stepper motor currently online, or a null pointer
     *         if there are none.
     */
    function YStepperMotor_FirstStepperMotor()
    {
        var next_hwid = YAPI.getFirstHardwareId('StepperMotor');
        if(next_hwid == null) return null;
        return YStepperMotor.FindStepperMotor(next_hwid);
    }

    //--- (end of YStepperMotor implementation)

    //--- (YStepperMotor initialization)
    YStepperMotor = YFunction._Subclass(_YStepperMotor, {
        // Constants
        MOTORSTATE_ABSENT           : 0,
        MOTORSTATE_ALERT            : 1,
        MOTORSTATE_HI_Z             : 2,
        MOTORSTATE_STOP             : 3,
        MOTORSTATE_RUN              : 4,
        MOTORSTATE_BATCH            : 5,
        MOTORSTATE_INVALID          : -1,
        DIAGS_INVALID               : YAPI_INVALID_UINT,
        STEPPOS_INVALID             : YAPI_INVALID_DOUBLE,
        SPEED_INVALID               : YAPI_INVALID_DOUBLE,
        PULLINSPEED_INVALID         : YAPI_INVALID_DOUBLE,
        MAXACCEL_INVALID            : YAPI_INVALID_DOUBLE,
        MAXSPEED_INVALID            : YAPI_INVALID_DOUBLE,
        STEPPING_MICROSTEP16        : 0,
        STEPPING_MICROSTEP8         : 1,
        STEPPING_MICROSTEP4         : 2,
        STEPPING_HALFSTEP           : 3,
        STEPPING_FULLSTEP           : 4,
        STEPPING_INVALID            : -1,
        OVERCURRENT_INVALID         : YAPI_INVALID_UINT,
        TCURRSTOP_INVALID           : YAPI_INVALID_UINT,
        TCURRRUN_INVALID            : YAPI_INVALID_UINT,
        ALERTMODE_INVALID           : YAPI_INVALID_STRING,
        AUXMODE_INVALID             : YAPI_INVALID_STRING,
        AUXSIGNAL_INVALID           : YAPI_INVALID_INT,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindStepperMotor            : YStepperMotor_FindStepperMotor,
        FirstStepperMotor           : YStepperMotor_FirstStepperMotor
    }, {
        // Methods
        get_motorState              : YStepperMotor_get_motorState,
        motorState                  : YStepperMotor_get_motorState,
        get_motorState_async        : YStepperMotor_get_motorState_async,
        motorState_async            : YStepperMotor_get_motorState_async,
        get_diags                   : YStepperMotor_get_diags,
        diags                       : YStepperMotor_get_diags,
        get_diags_async             : YStepperMotor_get_diags_async,
        diags_async                 : YStepperMotor_get_diags_async,
        set_stepPos                 : YStepperMotor_set_stepPos,
        setStepPos                  : YStepperMotor_set_stepPos,
        get_stepPos                 : YStepperMotor_get_stepPos,
        stepPos                     : YStepperMotor_get_stepPos,
        get_stepPos_async           : YStepperMotor_get_stepPos_async,
        stepPos_async               : YStepperMotor_get_stepPos_async,
        get_speed                   : YStepperMotor_get_speed,
        speed                       : YStepperMotor_get_speed,
        get_speed_async             : YStepperMotor_get_speed_async,
        speed_async                 : YStepperMotor_get_speed_async,
        set_pullinSpeed             : YStepperMotor_set_pullinSpeed,
        setPullinSpeed              : YStepperMotor_set_pullinSpeed,
        get_pullinSpeed             : YStepperMotor_get_pullinSpeed,
        pullinSpeed                 : YStepperMotor_get_pullinSpeed,
        get_pullinSpeed_async       : YStepperMotor_get_pullinSpeed_async,
        pullinSpeed_async           : YStepperMotor_get_pullinSpeed_async,
        set_maxAccel                : YStepperMotor_set_maxAccel,
        setMaxAccel                 : YStepperMotor_set_maxAccel,
        get_maxAccel                : YStepperMotor_get_maxAccel,
        maxAccel                    : YStepperMotor_get_maxAccel,
        get_maxAccel_async          : YStepperMotor_get_maxAccel_async,
        maxAccel_async              : YStepperMotor_get_maxAccel_async,
        set_maxSpeed                : YStepperMotor_set_maxSpeed,
        setMaxSpeed                 : YStepperMotor_set_maxSpeed,
        get_maxSpeed                : YStepperMotor_get_maxSpeed,
        maxSpeed                    : YStepperMotor_get_maxSpeed,
        get_maxSpeed_async          : YStepperMotor_get_maxSpeed_async,
        maxSpeed_async              : YStepperMotor_get_maxSpeed_async,
        get_stepping                : YStepperMotor_get_stepping,
        stepping                    : YStepperMotor_get_stepping,
        get_stepping_async          : YStepperMotor_get_stepping_async,
        stepping_async              : YStepperMotor_get_stepping_async,
        set_stepping                : YStepperMotor_set_stepping,
        setStepping                 : YStepperMotor_set_stepping,
        get_overcurrent             : YStepperMotor_get_overcurrent,
        overcurrent                 : YStepperMotor_get_overcurrent,
        get_overcurrent_async       : YStepperMotor_get_overcurrent_async,
        overcurrent_async           : YStepperMotor_get_overcurrent_async,
        set_overcurrent             : YStepperMotor_set_overcurrent,
        setOvercurrent              : YStepperMotor_set_overcurrent,
        get_tCurrStop               : YStepperMotor_get_tCurrStop,
        tCurrStop                   : YStepperMotor_get_tCurrStop,
        get_tCurrStop_async         : YStepperMotor_get_tCurrStop_async,
        tCurrStop_async             : YStepperMotor_get_tCurrStop_async,
        set_tCurrStop               : YStepperMotor_set_tCurrStop,
        setTCurrStop                : YStepperMotor_set_tCurrStop,
        get_tCurrRun                : YStepperMotor_get_tCurrRun,
        tCurrRun                    : YStepperMotor_get_tCurrRun,
        get_tCurrRun_async          : YStepperMotor_get_tCurrRun_async,
        tCurrRun_async              : YStepperMotor_get_tCurrRun_async,
        set_tCurrRun                : YStepperMotor_set_tCurrRun,
        setTCurrRun                 : YStepperMotor_set_tCurrRun,
        get_alertMode               : YStepperMotor_get_alertMode,
        alertMode                   : YStepperMotor_get_alertMode,
        get_alertMode_async         : YStepperMotor_get_alertMode_async,
        alertMode_async             : YStepperMotor_get_alertMode_async,
        set_alertMode               : YStepperMotor_set_alertMode,
        setAlertMode                : YStepperMotor_set_alertMode,
        get_auxMode                 : YStepperMotor_get_auxMode,
        auxMode                     : YStepperMotor_get_auxMode,
        get_auxMode_async           : YStepperMotor_get_auxMode_async,
        auxMode_async               : YStepperMotor_get_auxMode_async,
        set_auxMode                 : YStepperMotor_set_auxMode,
        setAuxMode                  : YStepperMotor_set_auxMode,
        get_auxSignal               : YStepperMotor_get_auxSignal,
        auxSignal                   : YStepperMotor_get_auxSignal,
        get_auxSignal_async         : YStepperMotor_get_auxSignal_async,
        auxSignal_async             : YStepperMotor_get_auxSignal_async,
        set_auxSignal               : YStepperMotor_set_auxSignal,
        setAuxSignal                : YStepperMotor_set_auxSignal,
        get_command                 : YStepperMotor_get_command,
        command                     : YStepperMotor_get_command,
        get_command_async           : YStepperMotor_get_command_async,
        command_async               : YStepperMotor_get_command_async,
        set_command                 : YStepperMotor_set_command,
        setCommand                  : YStepperMotor_set_command,
        sendCommand                 : YStepperMotor_sendCommand,
        reset                       : YStepperMotor_reset,
        findHomePosition            : YStepperMotor_findHomePosition,
        changeSpeed                 : YStepperMotor_changeSpeed,
        moveTo                      : YStepperMotor_moveTo,
        moveRel                     : YStepperMotor_moveRel,
        moveRelSlow                 : YStepperMotor_moveRelSlow,
        pause                       : YStepperMotor_pause,
        emergencyStop               : YStepperMotor_emergencyStop,
        alertStepOut                : YStepperMotor_alertStepOut,
        alertStepDir                : YStepperMotor_alertStepDir,
        abortAndBrake               : YStepperMotor_abortAndBrake,
        abortAndHiZ                 : YStepperMotor_abortAndHiZ,
        nextStepperMotor            : YStepperMotor_nextStepperMotor,
        _parseAttr                  : YStepperMotor_parseAttr
    });
    //--- (end of YStepperMotor initialization)
})();

//--- (YStepperMotor functions)

/**
 * Retrieves a stepper motor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the stepper motor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YStepperMotor.isOnline() to test if the stepper motor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a stepper motor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the stepper motor, for instance
 *         MyDevice.stepperMotor1.
 *
 * @return a YStepperMotor object allowing you to drive the stepper motor.
 */
function yFindStepperMotor(func)
{
    return YStepperMotor.FindStepperMotor(func);
}

/**
 * Starts the enumeration of stepper motors currently accessible.
 * Use the method YStepperMotor.nextStepperMotor() to iterate on
 * next stepper motors.
 *
 * @return a pointer to a YStepperMotor object, corresponding to
 *         the first stepper motor currently online, or a null pointer
 *         if there are none.
 */
function yFirstStepperMotor()
{
    return YStepperMotor.FirstStepperMotor();
}

//--- (end of YStepperMotor functions)
