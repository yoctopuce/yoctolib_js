/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for WeighScale functions
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

//--- (YWeighScale return codes)
//--- (end of YWeighScale return codes)
//--- (YWeighScale definitions)
var Y_EXCITATION_OFF                = 0;
var Y_EXCITATION_DC                 = 1;
var Y_EXCITATION_AC                 = 2;
var Y_EXCITATION_INVALID            = -1;
var Y_TEMPAVGADAPTRATIO_INVALID     = YAPI_INVALID_DOUBLE;
var Y_TEMPCHGADAPTRATIO_INVALID     = YAPI_INVALID_DOUBLE;
var Y_COMPTEMPAVG_INVALID           = YAPI_INVALID_DOUBLE;
var Y_COMPTEMPCHG_INVALID           = YAPI_INVALID_DOUBLE;
var Y_COMPENSATION_INVALID          = YAPI_INVALID_DOUBLE;
var Y_ZEROTRACKING_INVALID          = YAPI_INVALID_DOUBLE;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YWeighScale definitions)

//--- (YWeighScale class start)
/**
 * YWeighScale Class: weighing scale sensor control interface, available for instance in the
 * Yocto-Bridge or the Yocto-MaxiBridge
 *
 * The YWeighScale class provides a weight measurement from a ratiometric sensor.
 * It can be used to control the bridge excitation parameters, in order to avoid
 * measure shifts caused by temperature variation in the electronics, and can also
 * automatically apply an additional correction factor based on temperature to
 * compensate for offsets in the load cell itself.
 */
//--- (end of YWeighScale class start)

var YWeighScale; // definition below
(function()
{
    function _YWeighScale(str_func)
    {
        //--- (YWeighScale constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'WeighScale';

        this._excitation                     = Y_EXCITATION_INVALID;       // ExcitationMode
        this._tempAvgAdaptRatio              = Y_TEMPAVGADAPTRATIO_INVALID; // MeasureVal
        this._tempChgAdaptRatio              = Y_TEMPCHGADAPTRATIO_INVALID; // MeasureVal
        this._compTempAvg                    = Y_COMPTEMPAVG_INVALID;      // MeasureVal
        this._compTempChg                    = Y_COMPTEMPCHG_INVALID;      // MeasureVal
        this._compensation                   = Y_COMPENSATION_INVALID;     // MeasureVal
        this._zeroTracking                   = Y_ZEROTRACKING_INVALID;     // MeasureVal
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YWeighScale constructor)
    }

    //--- (YWeighScale implementation)

    function YWeighScale_parseAttr(name, val, _super)
    {
        switch(name) {
        case "excitation":
            this._excitation = parseInt(val);
            return 1;
        case "tempAvgAdaptRatio":
            this._tempAvgAdaptRatio = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "tempChgAdaptRatio":
            this._tempChgAdaptRatio = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "compTempAvg":
            this._compTempAvg = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "compTempChg":
            this._compTempChg = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "compensation":
            this._compensation = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "zeroTracking":
            this._zeroTracking = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the measuring unit for the weight.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the weight
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_unit(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('unit',rest_val);
    }

    /**
     * Returns the current load cell bridge excitation method.
     *
     * @return a value among YWeighScale.EXCITATION_OFF, YWeighScale.EXCITATION_DC and
     * YWeighScale.EXCITATION_AC corresponding to the current load cell bridge excitation method
     *
     * On failure, throws an exception or returns YWeighScale.EXCITATION_INVALID.
     */
    function YWeighScale_get_excitation()
    {
        var res;                    // enumEXCITATIONMODE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_EXCITATION_INVALID;
            }
        }
        res = this._excitation;
        return res;
    }

    /**
     * Gets the current load cell bridge excitation method.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWeighScale object that invoked the callback
     *         - the result:a value among YWeighScale.EXCITATION_OFF, YWeighScale.EXCITATION_DC and
     *         YWeighScale.EXCITATION_AC corresponding to the current load cell bridge excitation method
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWeighScale.EXCITATION_INVALID.
     */
    function YWeighScale_get_excitation_async(callback,context)
    {
        var res;                    // enumEXCITATIONMODE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_EXCITATION_INVALID);
            } else {
                callback(context, obj, obj._excitation);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current load cell bridge excitation method.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YWeighScale.EXCITATION_OFF, YWeighScale.EXCITATION_DC and
     * YWeighScale.EXCITATION_AC corresponding to the current load cell bridge excitation method
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_excitation(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('excitation',rest_val);
    }

    /**
     * Changes the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the averaged temperature update rate, in per mille
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_tempAvgAdaptRatio(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('tempAvgAdaptRatio',rest_val);
    }

    /**
     * Returns the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     *
     * @return a floating point number corresponding to the averaged temperature update rate, in per mille
     *
     * On failure, throws an exception or returns YWeighScale.TEMPAVGADAPTRATIO_INVALID.
     */
    function YWeighScale_get_tempAvgAdaptRatio()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TEMPAVGADAPTRATIO_INVALID;
            }
        }
        res = this._tempAvgAdaptRatio;
        return res;
    }

    /**
     * Gets the averaged temperature update rate, in per mille.
     * The purpose of this adaptation ratio is to model the thermal inertia of the load cell.
     * The averaged temperature is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current compensation
     * temperature. The standard rate is 0.2 per mille, and the maximal rate is 65 per mille.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the averaged temperature update rate, in per mille
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWeighScale.TEMPAVGADAPTRATIO_INVALID.
     */
    function YWeighScale_get_tempAvgAdaptRatio_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TEMPAVGADAPTRATIO_INVALID);
            } else {
                callback(context, obj, obj._tempAvgAdaptRatio);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 per mille.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the temperature change update rate, in per mille
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_tempChgAdaptRatio(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('tempChgAdaptRatio',rest_val);
    }

    /**
     * Returns the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 per mille.
     *
     * @return a floating point number corresponding to the temperature change update rate, in per mille
     *
     * On failure, throws an exception or returns YWeighScale.TEMPCHGADAPTRATIO_INVALID.
     */
    function YWeighScale_get_tempChgAdaptRatio()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TEMPCHGADAPTRATIO_INVALID;
            }
        }
        res = this._tempChgAdaptRatio;
        return res;
    }

    /**
     * Gets the temperature change update rate, in per mille.
     * The temperature change is updated every 10 seconds, by applying this adaptation rate
     * to the difference between the measures ambient temperature and the current temperature used for
     * change compensation. The standard rate is 0.6 per mille, and the maximal rate is 65 per mille.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the temperature change update rate, in per mille
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWeighScale.TEMPCHGADAPTRATIO_INVALID.
     */
    function YWeighScale_get_tempChgAdaptRatio_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TEMPCHGADAPTRATIO_INVALID);
            } else {
                callback(context, obj, obj._tempChgAdaptRatio);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current averaged temperature, used for thermal compensation.
     *
     * @return a floating point number corresponding to the current averaged temperature, used for thermal compensation
     *
     * On failure, throws an exception or returns YWeighScale.COMPTEMPAVG_INVALID.
     */
    function YWeighScale_get_compTempAvg()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COMPTEMPAVG_INVALID;
            }
        }
        res = this._compTempAvg;
        return res;
    }

    /**
     * Gets the current averaged temperature, used for thermal compensation.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the current averaged temperature, used for
     *         thermal compensation
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWeighScale.COMPTEMPAVG_INVALID.
     */
    function YWeighScale_get_compTempAvg_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COMPTEMPAVG_INVALID);
            } else {
                callback(context, obj, obj._compTempAvg);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current temperature variation, used for thermal compensation.
     *
     * @return a floating point number corresponding to the current temperature variation, used for
     * thermal compensation
     *
     * On failure, throws an exception or returns YWeighScale.COMPTEMPCHG_INVALID.
     */
    function YWeighScale_get_compTempChg()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COMPTEMPCHG_INVALID;
            }
        }
        res = this._compTempChg;
        return res;
    }

    /**
     * Gets the current temperature variation, used for thermal compensation.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the current temperature variation, used for
     *         thermal compensation
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWeighScale.COMPTEMPCHG_INVALID.
     */
    function YWeighScale_get_compTempChg_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COMPTEMPCHG_INVALID);
            } else {
                callback(context, obj, obj._compTempChg);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current current thermal compensation value.
     *
     * @return a floating point number corresponding to the current current thermal compensation value
     *
     * On failure, throws an exception or returns YWeighScale.COMPENSATION_INVALID.
     */
    function YWeighScale_get_compensation()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COMPENSATION_INVALID;
            }
        }
        res = this._compensation;
        return res;
    }

    /**
     * Gets the current current thermal compensation value.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the current current thermal compensation value
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWeighScale.COMPENSATION_INVALID.
     */
    function YWeighScale_get_compensation_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COMPENSATION_INVALID);
            } else {
                callback(context, obj, obj._compensation);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a floating point number corresponding to the zero tracking threshold value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_zeroTracking(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('zeroTracking',rest_val);
    }

    /**
     * Returns the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     *
     * @return a floating point number corresponding to the zero tracking threshold value
     *
     * On failure, throws an exception or returns YWeighScale.ZEROTRACKING_INVALID.
     */
    function YWeighScale_get_zeroTracking()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ZEROTRACKING_INVALID;
            }
        }
        res = this._zeroTracking;
        return res;
    }

    /**
     * Gets the zero tracking threshold value. When this threshold is larger than
     * zero, any measure under the threshold will automatically be ignored and the
     * zero compensation will be updated.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the zero tracking threshold value
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YWeighScale.ZEROTRACKING_INVALID.
     */
    function YWeighScale_get_zeroTracking_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ZEROTRACKING_INVALID);
            } else {
                callback(context, obj, obj._zeroTracking);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YWeighScale_get_command()
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
     *         - the YWeighScale object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YWeighScale_get_command_async(callback,context)
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

    function YWeighScale_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a weighing scale sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWeighScale.isOnline() to test if the weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the weighing scale sensor, for instance
     *         YWBRIDG1.weighScale1.
     *
     * @return a YWeighScale object allowing you to drive the weighing scale sensor.
     */
    function YWeighScale_FindWeighScale(func)                   // class method
    {
        var obj;                    // YWeighScale;
        obj = YFunction._FindFromCache("WeighScale", func);
        if (obj == null) {
            obj = new YWeighScale(func);
            YFunction._AddToCache("WeighScale", func, obj);
        }
        return obj;
    }

    /**
     * Adapts the load cell signal bias (stored in the corresponding genericSensor)
     * so that the current signal corresponds to a zero weight. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_tare()
    {
        return this.set_command("T");
    }

    /**
     * Configures the load cell span parameters (stored in the corresponding genericSensor)
     * so that the current signal corresponds to the specified reference weight.
     *
     * @param currWeight : reference weight presently on the load cell.
     * @param maxWeight : maximum weight to be expected on the load cell.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_setupSpan(currWeight,maxWeight)
    {
        return this.set_command("S"+String(Math.round(Math.round(1000*currWeight)))+":"+String(Math.round(Math.round(1000*maxWeight))));
    }

    function YWeighScale_setCompensationTable(tableIndex,tempValues,compValues)
    {
        var siz;                    // int;
        var res;                    // int;
        var idx;                    // int;
        var found;                  // int;
        var prev;                   // float;
        var curr;                   // float;
        var currComp;               // float;
        var idxTemp;                // float;
        siz = tempValues.length;
        if (!(siz != 1)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"thermal compensation table must have at least two points",YAPI_INVALID_ARGUMENT);
        }
        if (!(siz == compValues.length)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"table sizes mismatch",YAPI_INVALID_ARGUMENT);
        }

        res = this.set_command(""+String(Math.round(tableIndex))+"Z");
        if (!(res==YAPI_SUCCESS)) {
            return this._throw(YAPI_IO_ERROR,"unable to reset thermal compensation table",YAPI_IO_ERROR);
        }
        // add records in growing temperature value
        found = 1;
        prev = -999999.0;
        while (found > 0) {
            found = 0;
            curr = 99999999.0;
            currComp = -999999.0;
            idx = 0;
            while (idx < siz) {
                idxTemp = tempValues[idx];
                if ((idxTemp > prev) && (idxTemp < curr)) {
                    curr = idxTemp;
                    currComp = compValues[idx];
                    found = 1;
                }
                idx = idx + 1;
            }
            if (found > 0) {
                res = this.set_command(""+String(Math.round(tableIndex))+"m"+String(Math.round(Math.round(1000*curr)))+":"+String(Math.round(Math.round(1000*currComp))));
                if (!(res==YAPI_SUCCESS)) {
                    return this._throw(YAPI_IO_ERROR,"unable to set thermal compensation table",YAPI_IO_ERROR);
                }
                prev = curr;
            }
        }
        return YAPI_SUCCESS;
    }

    function YWeighScale_loadCompensationTable(tableIndex,tempValues,compValues)
    {
        var id;                     // str;
        var bin_json;               // bin;
        var paramlist = [];         // strArr;
        var siz;                    // int;
        var idx;                    // int;
        var temp;                   // float;
        var comp;                   // float;

        id = this.get_functionId();
        id = id.substr(10, (id).length - 10);
        bin_json = this._download("extra.json?page="+String(Math.round((4*YAPI._atoi(id))+tableIndex)));
        paramlist = this._json_get_array(bin_json);
        // convert all values to float and append records
        siz = (paramlist.length >> 1);
        tempValues.length = 0;
        compValues.length = 0;
        idx = 0;
        while (idx < siz) {
            temp = parseFloat(paramlist[2*idx])/1000.0;
            comp = parseFloat(paramlist[2*idx+1])/1000.0;
            tempValues.push(temp);
            compValues.push(comp);
            idx = idx + 1;
        }
        return YAPI_SUCCESS;
    }

    /**
     * Records a weight offset thermal compensation table, in order to automatically correct the
     * measured weight based on the averaged compensation temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to all averaged
     *         temperatures for which an offset correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the offset correction
     *         to apply for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_offsetAvgCompensationTable(tempValues,compValues)
    {
        return this.setCompensationTable(0, tempValues, compValues);
    }

    /**
     * Retrieves the weight offset thermal compensation table previously configured using the
     * set_offsetAvgCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all averaged temperatures for which an offset correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the offset correction applied for each of the temperature
     *         included in the first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_loadOffsetAvgCompensationTable(tempValues,compValues)
    {
        return this.loadCompensationTable(0, tempValues, compValues);
    }

    /**
     * Records a weight offset thermal compensation table, in order to automatically correct the
     * measured weight based on the variation of temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to temperature
     *         variations for which an offset correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the offset correction
     *         to apply for each of the temperature variation included in the first
     *         argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_offsetChgCompensationTable(tempValues,compValues)
    {
        return this.setCompensationTable(1, tempValues, compValues);
    }

    /**
     * Retrieves the weight offset thermal compensation table previously configured using the
     * set_offsetChgCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all temperature variations for which an offset correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the offset correction applied for each of the temperature
     *         variation included in the first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_loadOffsetChgCompensationTable(tempValues,compValues)
    {
        return this.loadCompensationTable(1, tempValues, compValues);
    }

    /**
     * Records a weight span thermal compensation table, in order to automatically correct the
     * measured weight based on the compensation temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to all averaged
     *         temperatures for which a span correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the span correction
     *         (in percents) to apply for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_spanAvgCompensationTable(tempValues,compValues)
    {
        return this.setCompensationTable(2, tempValues, compValues);
    }

    /**
     * Retrieves the weight span thermal compensation table previously configured using the
     * set_spanAvgCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all averaged temperatures for which an span correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the span correction applied for each of the temperature
     *         included in the first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_loadSpanAvgCompensationTable(tempValues,compValues)
    {
        return this.loadCompensationTable(2, tempValues, compValues);
    }

    /**
     * Records a weight span thermal compensation table, in order to automatically correct the
     * measured weight based on the variation of temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to all variations of
     *         temperatures for which a span correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the span correction
     *         (in percents) to apply for each of the temperature variation included
     *         in the first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_spanChgCompensationTable(tempValues,compValues)
    {
        return this.setCompensationTable(3, tempValues, compValues);
    }

    /**
     * Retrieves the weight span thermal compensation table previously configured using the
     * set_spanChgCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all variation of temperature for which an span correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the span correction applied for each of variation of temperature
     *         included in the first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_loadSpanChgCompensationTable(tempValues,compValues)
    {
        return this.loadCompensationTable(3, tempValues, compValues);
    }

    /**
     * Continues the enumeration of weighing scale sensors started using yFirstWeighScale().
     * Caution: You can't make any assumption about the returned weighing scale sensors order.
     * If you want to find a specific a weighing scale sensor, use WeighScale.findWeighScale()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YWeighScale object, corresponding to
     *         a weighing scale sensor currently online, or a null pointer
     *         if there are no more weighing scale sensors to enumerate.
     */
    function YWeighScale_nextWeighScale()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YWeighScale.FindWeighScale(next_hwid);
    }

    /**
     * Starts the enumeration of weighing scale sensors currently accessible.
     * Use the method YWeighScale.nextWeighScale() to iterate on
     * next weighing scale sensors.
     *
     * @return a pointer to a YWeighScale object, corresponding to
     *         the first weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    function YWeighScale_FirstWeighScale()
    {
        var next_hwid = YAPI.getFirstHardwareId('WeighScale');
        if(next_hwid == null) return null;
        return YWeighScale.FindWeighScale(next_hwid);
    }

    //--- (end of YWeighScale implementation)

    //--- (YWeighScale initialization)
    YWeighScale = YSensor._Subclass(_YWeighScale, {
        // Constants
        EXCITATION_OFF              : 0,
        EXCITATION_DC               : 1,
        EXCITATION_AC               : 2,
        EXCITATION_INVALID          : -1,
        TEMPAVGADAPTRATIO_INVALID   : YAPI_INVALID_DOUBLE,
        TEMPCHGADAPTRATIO_INVALID   : YAPI_INVALID_DOUBLE,
        COMPTEMPAVG_INVALID         : YAPI_INVALID_DOUBLE,
        COMPTEMPCHG_INVALID         : YAPI_INVALID_DOUBLE,
        COMPENSATION_INVALID        : YAPI_INVALID_DOUBLE,
        ZEROTRACKING_INVALID        : YAPI_INVALID_DOUBLE,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindWeighScale              : YWeighScale_FindWeighScale,
        FirstWeighScale             : YWeighScale_FirstWeighScale
    }, {
        // Methods
        set_unit                    : YWeighScale_set_unit,
        setUnit                     : YWeighScale_set_unit,
        get_excitation              : YWeighScale_get_excitation,
        excitation                  : YWeighScale_get_excitation,
        get_excitation_async        : YWeighScale_get_excitation_async,
        excitation_async            : YWeighScale_get_excitation_async,
        set_excitation              : YWeighScale_set_excitation,
        setExcitation               : YWeighScale_set_excitation,
        set_tempAvgAdaptRatio       : YWeighScale_set_tempAvgAdaptRatio,
        setTempAvgAdaptRatio        : YWeighScale_set_tempAvgAdaptRatio,
        get_tempAvgAdaptRatio       : YWeighScale_get_tempAvgAdaptRatio,
        tempAvgAdaptRatio           : YWeighScale_get_tempAvgAdaptRatio,
        get_tempAvgAdaptRatio_async : YWeighScale_get_tempAvgAdaptRatio_async,
        tempAvgAdaptRatio_async     : YWeighScale_get_tempAvgAdaptRatio_async,
        set_tempChgAdaptRatio       : YWeighScale_set_tempChgAdaptRatio,
        setTempChgAdaptRatio        : YWeighScale_set_tempChgAdaptRatio,
        get_tempChgAdaptRatio       : YWeighScale_get_tempChgAdaptRatio,
        tempChgAdaptRatio           : YWeighScale_get_tempChgAdaptRatio,
        get_tempChgAdaptRatio_async : YWeighScale_get_tempChgAdaptRatio_async,
        tempChgAdaptRatio_async     : YWeighScale_get_tempChgAdaptRatio_async,
        get_compTempAvg             : YWeighScale_get_compTempAvg,
        compTempAvg                 : YWeighScale_get_compTempAvg,
        get_compTempAvg_async       : YWeighScale_get_compTempAvg_async,
        compTempAvg_async           : YWeighScale_get_compTempAvg_async,
        get_compTempChg             : YWeighScale_get_compTempChg,
        compTempChg                 : YWeighScale_get_compTempChg,
        get_compTempChg_async       : YWeighScale_get_compTempChg_async,
        compTempChg_async           : YWeighScale_get_compTempChg_async,
        get_compensation            : YWeighScale_get_compensation,
        compensation                : YWeighScale_get_compensation,
        get_compensation_async      : YWeighScale_get_compensation_async,
        compensation_async          : YWeighScale_get_compensation_async,
        set_zeroTracking            : YWeighScale_set_zeroTracking,
        setZeroTracking             : YWeighScale_set_zeroTracking,
        get_zeroTracking            : YWeighScale_get_zeroTracking,
        zeroTracking                : YWeighScale_get_zeroTracking,
        get_zeroTracking_async      : YWeighScale_get_zeroTracking_async,
        zeroTracking_async          : YWeighScale_get_zeroTracking_async,
        get_command                 : YWeighScale_get_command,
        command                     : YWeighScale_get_command,
        get_command_async           : YWeighScale_get_command_async,
        command_async               : YWeighScale_get_command_async,
        set_command                 : YWeighScale_set_command,
        setCommand                  : YWeighScale_set_command,
        tare                        : YWeighScale_tare,
        setupSpan                   : YWeighScale_setupSpan,
        setCompensationTable        : YWeighScale_setCompensationTable,
        loadCompensationTable       : YWeighScale_loadCompensationTable,
        set_offsetAvgCompensationTable : YWeighScale_set_offsetAvgCompensationTable,
        setOffsetAvgCompensationTable : YWeighScale_set_offsetAvgCompensationTable,
        loadOffsetAvgCompensationTable : YWeighScale_loadOffsetAvgCompensationTable,
        set_offsetChgCompensationTable : YWeighScale_set_offsetChgCompensationTable,
        setOffsetChgCompensationTable : YWeighScale_set_offsetChgCompensationTable,
        loadOffsetChgCompensationTable : YWeighScale_loadOffsetChgCompensationTable,
        set_spanAvgCompensationTable : YWeighScale_set_spanAvgCompensationTable,
        setSpanAvgCompensationTable : YWeighScale_set_spanAvgCompensationTable,
        loadSpanAvgCompensationTable : YWeighScale_loadSpanAvgCompensationTable,
        set_spanChgCompensationTable : YWeighScale_set_spanChgCompensationTable,
        setSpanChgCompensationTable : YWeighScale_set_spanChgCompensationTable,
        loadSpanChgCompensationTable : YWeighScale_loadSpanChgCompensationTable,
        nextWeighScale              : YWeighScale_nextWeighScale,
        _parseAttr                  : YWeighScale_parseAttr
    });
    //--- (end of YWeighScale initialization)
})();

//--- (YWeighScale functions)

/**
 * Retrieves a weighing scale sensor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the weighing scale sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YWeighScale.isOnline() to test if the weighing scale sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a weighing scale sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the weighing scale sensor, for instance
 *         YWBRIDG1.weighScale1.
 *
 * @return a YWeighScale object allowing you to drive the weighing scale sensor.
 */
function yFindWeighScale(func)
{
    return YWeighScale.FindWeighScale(func);
}

/**
 * Starts the enumeration of weighing scale sensors currently accessible.
 * Use the method YWeighScale.nextWeighScale() to iterate on
 * next weighing scale sensors.
 *
 * @return a pointer to a YWeighScale object, corresponding to
 *         the first weighing scale sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstWeighScale()
{
    return YWeighScale.FirstWeighScale();
}

//--- (end of YWeighScale functions)
