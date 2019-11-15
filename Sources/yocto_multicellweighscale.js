/*********************************************************************
 *
 *  $Id: yocto_multicellweighscale.js 37827 2019-10-25 13:07:48Z mvuilleu $
 *
 *  Implements the high-level API for MultiCellWeighScale functions
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

//--- (YMultiCellWeighScale return codes)
//--- (end of YMultiCellWeighScale return codes)
//--- (YMultiCellWeighScale definitions)
var Y_EXCITATION_OFF                = 0;
var Y_EXCITATION_DC                 = 1;
var Y_EXCITATION_AC                 = 2;
var Y_EXCITATION_INVALID            = -1;
var Y_CELLCOUNT_INVALID             = YAPI_INVALID_UINT;
var Y_TEMPAVGADAPTRATIO_INVALID     = YAPI_INVALID_DOUBLE;
var Y_TEMPCHGADAPTRATIO_INVALID     = YAPI_INVALID_DOUBLE;
var Y_COMPTEMPAVG_INVALID           = YAPI_INVALID_DOUBLE;
var Y_COMPTEMPCHG_INVALID           = YAPI_INVALID_DOUBLE;
var Y_COMPENSATION_INVALID          = YAPI_INVALID_DOUBLE;
var Y_ZEROTRACKING_INVALID          = YAPI_INVALID_DOUBLE;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YMultiCellWeighScale definitions)

//--- (YMultiCellWeighScale class start)
/**
 * YMultiCellWeighScale Class: MultiCellWeighScale function interface
 *
 * The YMultiCellWeighScale class provides a weight measurement from a set of ratiometric
 * sensors, for instance using a Yocto-MaxiBridge. It can be used to control the bridge excitation
 * parameters, in order to avoid
 * measure shifts caused by temperature variation in the electronics, and can also
 * automatically apply an additional correction factor based on temperature to
 * compensate for offsets in the load cells themselves.
 */
//--- (end of YMultiCellWeighScale class start)

var YMultiCellWeighScale; // definition below
(function()
{
    function _YMultiCellWeighScale(str_func)
    {
        //--- (YMultiCellWeighScale constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'MultiCellWeighScale';

        this._cellCount                      = Y_CELLCOUNT_INVALID;        // UInt31
        this._excitation                     = Y_EXCITATION_INVALID;       // ExcitationMode
        this._tempAvgAdaptRatio              = Y_TEMPAVGADAPTRATIO_INVALID; // MeasureVal
        this._tempChgAdaptRatio              = Y_TEMPCHGADAPTRATIO_INVALID; // MeasureVal
        this._compTempAvg                    = Y_COMPTEMPAVG_INVALID;      // MeasureVal
        this._compTempChg                    = Y_COMPTEMPCHG_INVALID;      // MeasureVal
        this._compensation                   = Y_COMPENSATION_INVALID;     // MeasureVal
        this._zeroTracking                   = Y_ZEROTRACKING_INVALID;     // MeasureVal
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YMultiCellWeighScale constructor)
    }

    //--- (YMultiCellWeighScale implementation)

    function YMultiCellWeighScale_parseAttr(name, val, _super)
    {
        switch(name) {
        case "cellCount":
            this._cellCount = parseInt(val);
            return 1;
        case "excitation":
            this._excitation = parseInt(val);
            return 1;
        case "tempAvgAdaptRatio":
            this._tempAvgAdaptRatio = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "tempChgAdaptRatio":
            this._tempChgAdaptRatio = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "compTempAvg":
            this._compTempAvg = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "compTempChg":
            this._compTempChg = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "compensation":
            this._compensation = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "zeroTracking":
            this._zeroTracking = Math.round(val * 1000.0 / 65536.0) / 1000.0;
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiCellWeighScale_set_unit(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('unit',rest_val);
    }

    /**
     * Returns the number of load cells in use.
     *
     * @return an integer corresponding to the number of load cells in use
     *
     * On failure, throws an exception or returns Y_CELLCOUNT_INVALID.
     */
    function YMultiCellWeighScale_get_cellCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CELLCOUNT_INVALID;
            }
        }
        res = this._cellCount;
        return res;
    }

    /**
     * Gets the number of load cells in use.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMultiCellWeighScale object that invoked the callback
     *         - the result:an integer corresponding to the number of load cells in use
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CELLCOUNT_INVALID.
     */
    function YMultiCellWeighScale_get_cellCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CELLCOUNT_INVALID);
            } else {
                callback(context, obj, obj._cellCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the number of load cells in use. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the number of load cells in use
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiCellWeighScale_set_cellCount(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('cellCount',rest_val);
    }

    /**
     * Returns the current load cell bridge excitation method.
     *
     * @return a value among Y_EXCITATION_OFF, Y_EXCITATION_DC and Y_EXCITATION_AC corresponding to the
     * current load cell bridge excitation method
     *
     * On failure, throws an exception or returns Y_EXCITATION_INVALID.
     */
    function YMultiCellWeighScale_get_excitation()
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
     *         - the YMultiCellWeighScale object that invoked the callback
     *         - the result:a value among Y_EXCITATION_OFF, Y_EXCITATION_DC and Y_EXCITATION_AC corresponding to
     *         the current load cell bridge excitation method
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_EXCITATION_INVALID.
     */
    function YMultiCellWeighScale_get_excitation_async(callback,context)
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
     * @param newval : a value among Y_EXCITATION_OFF, Y_EXCITATION_DC and Y_EXCITATION_AC corresponding
     * to the current load cell bridge excitation method
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiCellWeighScale_set_excitation(newval)
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiCellWeighScale_set_tempAvgAdaptRatio(newval)
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
     * On failure, throws an exception or returns Y_TEMPAVGADAPTRATIO_INVALID.
     */
    function YMultiCellWeighScale_get_tempAvgAdaptRatio()
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
     *         - the YMultiCellWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the averaged temperature update rate, in per mille
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_TEMPAVGADAPTRATIO_INVALID.
     */
    function YMultiCellWeighScale_get_tempAvgAdaptRatio_async(callback,context)
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiCellWeighScale_set_tempChgAdaptRatio(newval)
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
     * On failure, throws an exception or returns Y_TEMPCHGADAPTRATIO_INVALID.
     */
    function YMultiCellWeighScale_get_tempChgAdaptRatio()
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
     *         - the YMultiCellWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the temperature change update rate, in per mille
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_TEMPCHGADAPTRATIO_INVALID.
     */
    function YMultiCellWeighScale_get_tempChgAdaptRatio_async(callback,context)
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
     * On failure, throws an exception or returns Y_COMPTEMPAVG_INVALID.
     */
    function YMultiCellWeighScale_get_compTempAvg()
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
     *         - the YMultiCellWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the current averaged temperature, used for
     *         thermal compensation
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_COMPTEMPAVG_INVALID.
     */
    function YMultiCellWeighScale_get_compTempAvg_async(callback,context)
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
     * On failure, throws an exception or returns Y_COMPTEMPCHG_INVALID.
     */
    function YMultiCellWeighScale_get_compTempChg()
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
     *         - the YMultiCellWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the current temperature variation, used for
     *         thermal compensation
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_COMPTEMPCHG_INVALID.
     */
    function YMultiCellWeighScale_get_compTempChg_async(callback,context)
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
     * On failure, throws an exception or returns Y_COMPENSATION_INVALID.
     */
    function YMultiCellWeighScale_get_compensation()
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
     *         - the YMultiCellWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the current current thermal compensation value
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_COMPENSATION_INVALID.
     */
    function YMultiCellWeighScale_get_compensation_async(callback,context)
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
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiCellWeighScale_set_zeroTracking(newval)
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
     * On failure, throws an exception or returns Y_ZEROTRACKING_INVALID.
     */
    function YMultiCellWeighScale_get_zeroTracking()
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
     *         - the YMultiCellWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the zero tracking threshold value
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_ZEROTRACKING_INVALID.
     */
    function YMultiCellWeighScale_get_zeroTracking_async(callback,context)
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

    function YMultiCellWeighScale_get_command()
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
     *         - the YMultiCellWeighScale object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YMultiCellWeighScale_get_command_async(callback,context)
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

    function YMultiCellWeighScale_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a multi-cell weighing scale sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-cell weighing scale sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiCellWeighScale.isOnline() to test if the multi-cell weighing scale sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-cell weighing scale sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the multi-cell weighing scale sensor, for instance
     *         YWMBRDG1.multiCellWeighScale.
     *
     * @return a YMultiCellWeighScale object allowing you to drive the multi-cell weighing scale sensor.
     */
    function YMultiCellWeighScale_FindMultiCellWeighScale(func) // class method
    {
        var obj;                    // YMultiCellWeighScale;
        obj = YFunction._FindFromCache("MultiCellWeighScale", func);
        if (obj == null) {
            obj = new YMultiCellWeighScale(func);
            YFunction._AddToCache("MultiCellWeighScale", func, obj);
        }
        return obj;
    }

    /**
     * Adapts the load cell signal bias (stored in the corresponding genericSensor)
     * so that the current signal corresponds to a zero weight.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiCellWeighScale_tare()
    {
        return this.set_command("T");
    }

    /**
     * Configures the load cells span parameters (stored in the corresponding genericSensors)
     * so that the current signal corresponds to the specified reference weight.
     *
     * @param currWeight : reference weight presently on the load cell.
     * @param maxWeight : maximum weight to be expected on the load cell.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiCellWeighScale_setupSpan(currWeight,maxWeight)
    {
        return this.set_command("S"+String(Math.round(Math.round(1000*currWeight)))+":"+String(Math.round(Math.round(1000*maxWeight))));
    }

    /**
     * Continues the enumeration of multi-cell weighing scale sensors started using yFirstMultiCellWeighScale().
     * Caution: You can't make any assumption about the returned multi-cell weighing scale sensors order.
     * If you want to find a specific a multi-cell weighing scale sensor, use
     * MultiCellWeighScale.findMultiCellWeighScale()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMultiCellWeighScale object, corresponding to
     *         a multi-cell weighing scale sensor currently online, or a null pointer
     *         if there are no more multi-cell weighing scale sensors to enumerate.
     */
    function YMultiCellWeighScale_nextMultiCellWeighScale()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMultiCellWeighScale.FindMultiCellWeighScale(next_hwid);
    }

    /**
     * Starts the enumeration of multi-cell weighing scale sensors currently accessible.
     * Use the method YMultiCellWeighScale.nextMultiCellWeighScale() to iterate on
     * next multi-cell weighing scale sensors.
     *
     * @return a pointer to a YMultiCellWeighScale object, corresponding to
     *         the first multi-cell weighing scale sensor currently online, or a null pointer
     *         if there are none.
     */
    function YMultiCellWeighScale_FirstMultiCellWeighScale()
    {
        var next_hwid = YAPI.getFirstHardwareId('MultiCellWeighScale');
        if(next_hwid == null) return null;
        return YMultiCellWeighScale.FindMultiCellWeighScale(next_hwid);
    }

    //--- (end of YMultiCellWeighScale implementation)

    //--- (YMultiCellWeighScale initialization)
    YMultiCellWeighScale = YSensor._Subclass(_YMultiCellWeighScale, {
        // Constants
        CELLCOUNT_INVALID           : YAPI_INVALID_UINT,
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
        FindMultiCellWeighScale     : YMultiCellWeighScale_FindMultiCellWeighScale,
        FirstMultiCellWeighScale    : YMultiCellWeighScale_FirstMultiCellWeighScale
    }, {
        // Methods
        set_unit                    : YMultiCellWeighScale_set_unit,
        setUnit                     : YMultiCellWeighScale_set_unit,
        get_cellCount               : YMultiCellWeighScale_get_cellCount,
        cellCount                   : YMultiCellWeighScale_get_cellCount,
        get_cellCount_async         : YMultiCellWeighScale_get_cellCount_async,
        cellCount_async             : YMultiCellWeighScale_get_cellCount_async,
        set_cellCount               : YMultiCellWeighScale_set_cellCount,
        setCellCount                : YMultiCellWeighScale_set_cellCount,
        get_excitation              : YMultiCellWeighScale_get_excitation,
        excitation                  : YMultiCellWeighScale_get_excitation,
        get_excitation_async        : YMultiCellWeighScale_get_excitation_async,
        excitation_async            : YMultiCellWeighScale_get_excitation_async,
        set_excitation              : YMultiCellWeighScale_set_excitation,
        setExcitation               : YMultiCellWeighScale_set_excitation,
        set_tempAvgAdaptRatio       : YMultiCellWeighScale_set_tempAvgAdaptRatio,
        setTempAvgAdaptRatio        : YMultiCellWeighScale_set_tempAvgAdaptRatio,
        get_tempAvgAdaptRatio       : YMultiCellWeighScale_get_tempAvgAdaptRatio,
        tempAvgAdaptRatio           : YMultiCellWeighScale_get_tempAvgAdaptRatio,
        get_tempAvgAdaptRatio_async : YMultiCellWeighScale_get_tempAvgAdaptRatio_async,
        tempAvgAdaptRatio_async     : YMultiCellWeighScale_get_tempAvgAdaptRatio_async,
        set_tempChgAdaptRatio       : YMultiCellWeighScale_set_tempChgAdaptRatio,
        setTempChgAdaptRatio        : YMultiCellWeighScale_set_tempChgAdaptRatio,
        get_tempChgAdaptRatio       : YMultiCellWeighScale_get_tempChgAdaptRatio,
        tempChgAdaptRatio           : YMultiCellWeighScale_get_tempChgAdaptRatio,
        get_tempChgAdaptRatio_async : YMultiCellWeighScale_get_tempChgAdaptRatio_async,
        tempChgAdaptRatio_async     : YMultiCellWeighScale_get_tempChgAdaptRatio_async,
        get_compTempAvg             : YMultiCellWeighScale_get_compTempAvg,
        compTempAvg                 : YMultiCellWeighScale_get_compTempAvg,
        get_compTempAvg_async       : YMultiCellWeighScale_get_compTempAvg_async,
        compTempAvg_async           : YMultiCellWeighScale_get_compTempAvg_async,
        get_compTempChg             : YMultiCellWeighScale_get_compTempChg,
        compTempChg                 : YMultiCellWeighScale_get_compTempChg,
        get_compTempChg_async       : YMultiCellWeighScale_get_compTempChg_async,
        compTempChg_async           : YMultiCellWeighScale_get_compTempChg_async,
        get_compensation            : YMultiCellWeighScale_get_compensation,
        compensation                : YMultiCellWeighScale_get_compensation,
        get_compensation_async      : YMultiCellWeighScale_get_compensation_async,
        compensation_async          : YMultiCellWeighScale_get_compensation_async,
        set_zeroTracking            : YMultiCellWeighScale_set_zeroTracking,
        setZeroTracking             : YMultiCellWeighScale_set_zeroTracking,
        get_zeroTracking            : YMultiCellWeighScale_get_zeroTracking,
        zeroTracking                : YMultiCellWeighScale_get_zeroTracking,
        get_zeroTracking_async      : YMultiCellWeighScale_get_zeroTracking_async,
        zeroTracking_async          : YMultiCellWeighScale_get_zeroTracking_async,
        get_command                 : YMultiCellWeighScale_get_command,
        command                     : YMultiCellWeighScale_get_command,
        get_command_async           : YMultiCellWeighScale_get_command_async,
        command_async               : YMultiCellWeighScale_get_command_async,
        set_command                 : YMultiCellWeighScale_set_command,
        setCommand                  : YMultiCellWeighScale_set_command,
        tare                        : YMultiCellWeighScale_tare,
        setupSpan                   : YMultiCellWeighScale_setupSpan,
        nextMultiCellWeighScale     : YMultiCellWeighScale_nextMultiCellWeighScale,
        _parseAttr                  : YMultiCellWeighScale_parseAttr
    });
    //--- (end of YMultiCellWeighScale initialization)
})();

//--- (YMultiCellWeighScale functions)

/**
 * Retrieves a multi-cell weighing scale sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the multi-cell weighing scale sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YMultiCellWeighScale.isOnline() to test if the multi-cell weighing scale sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a multi-cell weighing scale sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the multi-cell weighing scale sensor, for instance
 *         YWMBRDG1.multiCellWeighScale.
 *
 * @return a YMultiCellWeighScale object allowing you to drive the multi-cell weighing scale sensor.
 */
function yFindMultiCellWeighScale(func)
{
    return YMultiCellWeighScale.FindMultiCellWeighScale(func);
}

/**
 * Starts the enumeration of multi-cell weighing scale sensors currently accessible.
 * Use the method YMultiCellWeighScale.nextMultiCellWeighScale() to iterate on
 * next multi-cell weighing scale sensors.
 *
 * @return a pointer to a YMultiCellWeighScale object, corresponding to
 *         the first multi-cell weighing scale sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstMultiCellWeighScale()
{
    return YMultiCellWeighScale.FirstMultiCellWeighScale();
}

//--- (end of YMultiCellWeighScale functions)
