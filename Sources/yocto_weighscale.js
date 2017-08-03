/*********************************************************************
 *
 * $Id: yocto_weighscale.js 28231 2017-07-31 16:37:33Z mvuilleu $
 *
 * Implements the high-level API for WeighScale functions
 *
 * - - - - - - - - - License information: - - - - - - - - - 
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
var Y_ADAPTRATIO_INVALID            = YAPI_INVALID_DOUBLE;
var Y_COMPTEMPERATURE_INVALID       = YAPI_INVALID_DOUBLE;
var Y_COMPENSATION_INVALID          = YAPI_INVALID_DOUBLE;
var Y_ZEROTRACKING_INVALID          = YAPI_INVALID_DOUBLE;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YWeighScale definitions)

//--- (YWeighScale class start)
/**
 * YWeighScale Class: WeighScale function interface
 *
 * The YWeighScale class provides a weight measurement from a ratiometric load cell
 * sensor. It can be used to control the bridge excitation parameters, in order to avoid
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
        this._adaptRatio                     = Y_ADAPTRATIO_INVALID;       // MeasureVal
        this._compTemperature                = Y_COMPTEMPERATURE_INVALID;  // MeasureVal
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
        case "adaptRatio":
            this._adaptRatio = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "compTemperature":
            this._compTemperature = Math.round(val * 1000.0 / 65536.0) / 1000.0;
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
     * Returns the current load cell bridge excitation method.
     *
     * @return a value among Y_EXCITATION_OFF, Y_EXCITATION_DC and Y_EXCITATION_AC corresponding to the
     * current load cell bridge excitation method
     *
     * On failure, throws an exception or returns Y_EXCITATION_INVALID.
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
     *         - the result:a value among Y_EXCITATION_OFF, Y_EXCITATION_DC and Y_EXCITATION_AC corresponding to
     *         the current load cell bridge excitation method
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_EXCITATION_INVALID.
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
     *
     * @param newval : a value among Y_EXCITATION_OFF, Y_EXCITATION_DC and Y_EXCITATION_AC corresponding
     * to the current load cell bridge excitation method
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_excitation(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('excitation',rest_val);
    }

    /**
     * Changes the compensation temperature update rate, in percents.
     *
     * @param newval : a floating point number corresponding to the compensation temperature update rate, in percents
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_adaptRatio(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('adaptRatio',rest_val);
    }

    /**
     * Returns the compensation temperature update rate, in percents.
     * the maximal value is 65 percents.
     *
     * @return a floating point number corresponding to the compensation temperature update rate, in percents
     *
     * On failure, throws an exception or returns Y_ADAPTRATIO_INVALID.
     */
    function YWeighScale_get_adaptRatio()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ADAPTRATIO_INVALID;
            }
        }
        res = this._adaptRatio;
        return res;
    }

    /**
     * Gets the compensation temperature update rate, in percents.
     * the maximal value is 65 percents.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the compensation temperature update rate, in percents
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_ADAPTRATIO_INVALID.
     */
    function YWeighScale_get_adaptRatio_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ADAPTRATIO_INVALID);
            } else {
                callback(context, obj, obj._adaptRatio);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current compensation temperature.
     *
     * @return a floating point number corresponding to the current compensation temperature
     *
     * On failure, throws an exception or returns Y_COMPTEMPERATURE_INVALID.
     */
    function YWeighScale_get_compTemperature()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COMPTEMPERATURE_INVALID;
            }
        }
        res = this._compTemperature;
        return res;
    }

    /**
     * Gets the current compensation temperature.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWeighScale object that invoked the callback
     *         - the result:a floating point number corresponding to the current compensation temperature
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_COMPTEMPERATURE_INVALID.
     */
    function YWeighScale_get_compTemperature_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COMPTEMPERATURE_INVALID);
            } else {
                callback(context, obj, obj._compTemperature);
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
     * On failure, throws an exception or returns Y_COMPENSATION_INVALID.
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
     * Changes the compensation temperature update rate, in percents.
     *
     * @param newval : a floating point number corresponding to the compensation temperature update rate, in percents
     *
     * @return YAPI_SUCCESS if the call succeeds.
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
     * On failure, throws an exception or returns Y_ZEROTRACKING_INVALID.
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
     * On failure, throws an exception or returns Y_ZEROTRACKING_INVALID.
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
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
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
     * @param func : a string that uniquely characterizes the weighing scale sensor
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
     * so that the current signal corresponds to a zero weight.
     *
     * @return YAPI_SUCCESS if the call succeeds.
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
     * @param maxWeight : maximum weight to be expectect on the load cell.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_setupSpan(currWeight,maxWeight)
    {
        return this.set_command("S"+String(Math.round(Math.round(1000*currWeight)))+":"+String(Math.round(Math.round(1000*maxWeight))));
    }

    /**
     * Records a weight offset thermal compensation table, in order to automatically correct the
     * measured weight based on the compensation temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to all
     *         temperatures for which an offset correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the offset correction
     *         to apply for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_offsetCompensationTable(tempValues,compValues)
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

        res = this.set_command("2Z");
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
                res = this.set_command("2m"+String(Math.round(Math.round(1000*curr)))+":"+String(Math.round(Math.round(1000*currComp))));
                if (!(res==YAPI_SUCCESS)) {
                    return this._throw(YAPI_IO_ERROR,"unable to set thermal compensation table",YAPI_IO_ERROR);
                }
                prev = curr;
            }
        }
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves the weight offset thermal compensation table previously configured using the
     * set_offsetCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all temperatures for which an offset correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the offset correction applied for each of the temperature
     *         included in the first argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_loadOffsetCompensationTable(tempValues,compValues)
    {
        var id;                     // str;
        var bin_json;               // bin;
        var paramlist = [];         // strArr;
        var siz;                    // int;
        var idx;                    // int;
        var temp;                   // float;
        var comp;                   // float;

        id = this.get_functionId();
        id = (id).substr( 11, (id).length - 11);
        bin_json = this._download("extra.json?page=2");
        paramlist = this._json_get_array(bin_json);
        // convert all values to float and append records
        siz = ((paramlist.length) >> (1));
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
     * Records a weight span thermal compensation table, in order to automatically correct the
     * measured weight based on the compensation temperature.
     * The weight correction will be applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, corresponding to all
     *         temperatures for which a span correction is specified.
     * @param compValues : array of floating point numbers, corresponding to the span correction
     *         (in percents) to apply for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_set_spanCompensationTable(tempValues,compValues)
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

        res = this.set_command("3Z");
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
                res = this.set_command("3m"+String(Math.round(Math.round(1000*curr)))+":"+String(Math.round(Math.round(1000*currComp))));
                if (!(res==YAPI_SUCCESS)) {
                    return this._throw(YAPI_IO_ERROR,"unable to set thermal compensation table",YAPI_IO_ERROR);
                }
                prev = curr;
            }
        }
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves the weight span thermal compensation table previously configured using the
     * set_spanCompensationTable function.
     * The weight correction is applied by linear interpolation between specified points.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all temperatures for which an span correction is specified.
     * @param compValues : array of floating point numbers, that is filled by the function
     *         with the span correction applied for each of the temperature
     *         included in the first argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YWeighScale_loadSpanCompensationTable(tempValues,compValues)
    {
        var id;                     // str;
        var bin_json;               // bin;
        var paramlist = [];         // strArr;
        var siz;                    // int;
        var idx;                    // int;
        var temp;                   // float;
        var comp;                   // float;

        id = this.get_functionId();
        id = (id).substr( 11, (id).length - 11);
        bin_json = this._download("extra.json?page=3");
        paramlist = this._json_get_array(bin_json);
        // convert all values to float and append records
        siz = ((paramlist.length) >> (1));
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
     * Continues the enumeration of weighing scale sensors started using yFirstWeighScale().
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
        ADAPTRATIO_INVALID          : YAPI_INVALID_DOUBLE,
        COMPTEMPERATURE_INVALID     : YAPI_INVALID_DOUBLE,
        COMPENSATION_INVALID        : YAPI_INVALID_DOUBLE,
        ZEROTRACKING_INVALID        : YAPI_INVALID_DOUBLE,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindWeighScale              : YWeighScale_FindWeighScale,
        FirstWeighScale             : YWeighScale_FirstWeighScale
    }, {
        // Methods
        get_excitation              : YWeighScale_get_excitation,
        excitation                  : YWeighScale_get_excitation,
        get_excitation_async        : YWeighScale_get_excitation_async,
        excitation_async            : YWeighScale_get_excitation_async,
        set_excitation              : YWeighScale_set_excitation,
        setExcitation               : YWeighScale_set_excitation,
        set_adaptRatio              : YWeighScale_set_adaptRatio,
        setAdaptRatio               : YWeighScale_set_adaptRatio,
        get_adaptRatio              : YWeighScale_get_adaptRatio,
        adaptRatio                  : YWeighScale_get_adaptRatio,
        get_adaptRatio_async        : YWeighScale_get_adaptRatio_async,
        adaptRatio_async            : YWeighScale_get_adaptRatio_async,
        get_compTemperature         : YWeighScale_get_compTemperature,
        compTemperature             : YWeighScale_get_compTemperature,
        get_compTemperature_async   : YWeighScale_get_compTemperature_async,
        compTemperature_async       : YWeighScale_get_compTemperature_async,
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
        set_offsetCompensationTable : YWeighScale_set_offsetCompensationTable,
        setOffsetCompensationTable  : YWeighScale_set_offsetCompensationTable,
        loadOffsetCompensationTable : YWeighScale_loadOffsetCompensationTable,
        set_spanCompensationTable   : YWeighScale_set_spanCompensationTable,
        setSpanCompensationTable    : YWeighScale_set_spanCompensationTable,
        loadSpanCompensationTable   : YWeighScale_loadSpanCompensationTable,
        nextWeighScale              : YWeighScale_nextWeighScale,
        _parseAttr                  : YWeighScale_parseAttr
    });
    //--- (end of YWeighScale initialization)
})();

//--- (WeighScale functions)

/**
 * Retrieves a weighing scale sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
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
 * @param func : a string that uniquely characterizes the weighing scale sensor
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

//--- (end of WeighScale functions)
