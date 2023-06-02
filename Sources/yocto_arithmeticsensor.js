/*********************************************************************
 *
 *  $Id: yocto_arithmeticsensor.js 54314 2023-05-01 14:21:11Z seb $
 *
 *  Implements the high-level API for ArithmeticSensor functions
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

//--- (YArithmeticSensor return codes)
//--- (end of YArithmeticSensor return codes)
//--- (YArithmeticSensor definitions)
var Y_DESCRIPTION_INVALID           = YAPI_INVALID_STRING;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YArithmeticSensor definitions)

//--- (YArithmeticSensor class start)
/**
 * YArithmeticSensor Class: arithmetic sensor control interface, available for instance in the
 * Yocto-MaxiMicroVolt-Rx
 *
 * The YArithmeticSensor class allows some Yoctopuce devices to compute in real-time
 * values based on an arithmetic formula involving one or more measured signals as
 * well as the temperature. As for any physical sensor, the computed values can be
 * read by callback and stored in the built-in datalogger.
 */
//--- (end of YArithmeticSensor class start)

var YArithmeticSensor; // definition below
(function()
{
    function _YArithmeticSensor(str_func)
    {
        //--- (YArithmeticSensor constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'ArithmeticSensor';

        this._description                    = Y_DESCRIPTION_INVALID;      // Text
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YArithmeticSensor constructor)
    }

    //--- (YArithmeticSensor implementation)

    function YArithmeticSensor_parseAttr(name, val, _super)
    {
        switch(name) {
        case "description":
            this._description = val;
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the measuring unit for the arithmetic sensor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the arithmetic sensor
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YArithmeticSensor_set_unit(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('unit',rest_val);
    }

    /**
     * Returns a short informative description of the formula.
     *
     * @return a string corresponding to a short informative description of the formula
     *
     * On failure, throws an exception or returns YArithmeticSensor.DESCRIPTION_INVALID.
     */
    function YArithmeticSensor_get_description()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DESCRIPTION_INVALID;
            }
        }
        res = this._description;
        return res;
    }

    /**
     * Gets a short informative description of the formula.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YArithmeticSensor object that invoked the callback
     *         - the result:a string corresponding to a short informative description of the formula
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YArithmeticSensor.DESCRIPTION_INVALID.
     */
    function YArithmeticSensor_get_description_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DESCRIPTION_INVALID);
            } else {
                callback(context, obj, obj._description);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YArithmeticSensor_get_command()
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
     *         - the YArithmeticSensor object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YArithmeticSensor_get_command_async(callback,context)
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

    function YArithmeticSensor_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves an arithmetic sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the arithmetic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YArithmeticSensor.isOnline() to test if the arithmetic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * an arithmetic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the arithmetic sensor, for instance
     *         RXUVOLT1.arithmeticSensor1.
     *
     * @return a YArithmeticSensor object allowing you to drive the arithmetic sensor.
     */
    function YArithmeticSensor_FindArithmeticSensor(func)       // class method
    {
        var obj;                    // YArithmeticSensor;
        obj = YFunction._FindFromCache("ArithmeticSensor", func);
        if (obj == null) {
            obj = new YArithmeticSensor(func);
            YFunction._AddToCache("ArithmeticSensor", func, obj);
        }
        return obj;
    }

    /**
     * Defines the arithmetic function by means of an algebraic expression. The expression
     * may include references to device sensors, by their physical or logical name, to
     * usual math functions and to auxiliary functions defined separately.
     *
     * @param expr : the algebraic expression defining the function.
     * @param descr : short informative description of the expression.
     *
     * @return the current expression value if the call succeeds.
     *
     * On failure, throws an exception or returns YAPI_INVALID_DOUBLE.
     */
    function YArithmeticSensor_defineExpression(expr,descr)
    {
        var id;                     // str;
        var fname;                  // str;
        var content;                // str;
        var data;                   // bin;
        var diags;                  // str;
        var resval;                 // float;
        id = this.get_functionId();
        id = (id).substr(16, (id).length - 16);
        fname = "arithmExpr"+id+".txt";

        content = "// "+descr+"\n"+expr;
        data = this._uploadEx(fname, content);
        diags = data;
        if (!((diags).substr(0, 8) == "Result: ")) {
            return this._throw(YAPI_INVALID_ARGUMENT,diags,YAPI_INVALID_DOUBLE);
        }
        resval = parseFloat((diags).substr(8, (diags).length-8));
        return resval;
    }

    /**
     * Retrieves the algebraic expression defining the arithmetic function, as previously
     * configured using the defineExpression function.
     *
     * @return a string containing the mathematical expression.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YArithmeticSensor_loadExpression()
    {
        var id;                     // str;
        var fname;                  // str;
        var content;                // str;
        var idx;                    // int;
        id = this.get_functionId();
        id = (id).substr(16, (id).length - 16);
        fname = "arithmExpr"+id+".txt";

        content = this._download(fname);
        idx = (content).indexOf("\n");
        if (idx > 0) {
            content = (content).substr(idx+1, (content).length-(idx+1));
        }
        return content;
    }

    /**
     * Defines a auxiliary function by means of a table of reference points. Intermediate values
     * will be interpolated between specified reference points. The reference points are given
     * as pairs of floating point numbers.
     * The auxiliary function will be available for use by all ArithmeticSensor objects of the
     * device. Up to nine auxiliary function can be defined in a device, each containing up to
     * 96 reference points.
     *
     * @param name : auxiliary function name, up to 16 characters.
     * @param inputValues : array of floating point numbers, corresponding to the function input value.
     * @param outputValues : array of floating point numbers, corresponding to the output value
     *         desired for each of the input value, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YArithmeticSensor_defineAuxiliaryFunction(name,inputValues,outputValues)
    {
        var siz;                    // int;
        var defstr;                 // str;
        var idx;                    // int;
        var inputVal;               // float;
        var outputVal;              // float;
        var fname;                  // str;
        siz = inputValues.length;
        if (!(siz > 1)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"auxiliary function must be defined by at least two points",YAPI_INVALID_ARGUMENT);
        }
        if (!(siz == outputValues.length)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"table sizes mismatch",YAPI_INVALID_ARGUMENT);
        }
        defstr = "";
        idx = 0;
        while (idx < siz) {
            inputVal = inputValues[idx];
            outputVal = outputValues[idx];
            defstr = ""+defstr+""+String(Math.round(inputVal*1000)/1000)+":"+String(Math.round(outputVal*1000)/1000)+"\n";
            idx = idx + 1;
        }
        fname = "userMap"+name+".txt";

        return this._upload(fname, defstr);
    }

    /**
     * Retrieves the reference points table defining an auxiliary function previously
     * configured using the defineAuxiliaryFunction function.
     *
     * @param name : auxiliary function name, up to 16 characters.
     * @param inputValues : array of floating point numbers, that is filled by the function
     *         with all the function reference input value.
     * @param outputValues : array of floating point numbers, that is filled by the function
     *         output value for each of the input value, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YArithmeticSensor_loadAuxiliaryFunction(name,inputValues,outputValues)
    {
        var fname;                  // str;
        var defbin;                 // bin;
        var siz;                    // int;

        fname = "userMap"+name+".txt";
        defbin = this._download(fname);
        siz = (defbin).length;
        if (!(siz > 0)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"auxiliary function does not exist",YAPI_INVALID_ARGUMENT);
        }
        inputValues.length = 0;
        outputValues.length = 0;
        // FIXME: decode line by line
        return YAPI_SUCCESS;
    }

    /**
     * Continues the enumeration of arithmetic sensors started using yFirstArithmeticSensor().
     * Caution: You can't make any assumption about the returned arithmetic sensors order.
     * If you want to find a specific an arithmetic sensor, use ArithmeticSensor.findArithmeticSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YArithmeticSensor object, corresponding to
     *         an arithmetic sensor currently online, or a null pointer
     *         if there are no more arithmetic sensors to enumerate.
     */
    function YArithmeticSensor_nextArithmeticSensor()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YArithmeticSensor.FindArithmeticSensor(next_hwid);
    }

    /**
     * Starts the enumeration of arithmetic sensors currently accessible.
     * Use the method YArithmeticSensor.nextArithmeticSensor() to iterate on
     * next arithmetic sensors.
     *
     * @return a pointer to a YArithmeticSensor object, corresponding to
     *         the first arithmetic sensor currently online, or a null pointer
     *         if there are none.
     */
    function YArithmeticSensor_FirstArithmeticSensor()
    {
        var next_hwid = YAPI.getFirstHardwareId('ArithmeticSensor');
        if(next_hwid == null) return null;
        return YArithmeticSensor.FindArithmeticSensor(next_hwid);
    }

    //--- (end of YArithmeticSensor implementation)

    //--- (YArithmeticSensor initialization)
    YArithmeticSensor = YSensor._Subclass(_YArithmeticSensor, {
        // Constants
        DESCRIPTION_INVALID         : YAPI_INVALID_STRING,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindArithmeticSensor        : YArithmeticSensor_FindArithmeticSensor,
        FirstArithmeticSensor       : YArithmeticSensor_FirstArithmeticSensor
    }, {
        // Methods
        set_unit                    : YArithmeticSensor_set_unit,
        setUnit                     : YArithmeticSensor_set_unit,
        get_description             : YArithmeticSensor_get_description,
        description                 : YArithmeticSensor_get_description,
        get_description_async       : YArithmeticSensor_get_description_async,
        description_async           : YArithmeticSensor_get_description_async,
        get_command                 : YArithmeticSensor_get_command,
        command                     : YArithmeticSensor_get_command,
        get_command_async           : YArithmeticSensor_get_command_async,
        command_async               : YArithmeticSensor_get_command_async,
        set_command                 : YArithmeticSensor_set_command,
        setCommand                  : YArithmeticSensor_set_command,
        defineExpression            : YArithmeticSensor_defineExpression,
        loadExpression              : YArithmeticSensor_loadExpression,
        defineAuxiliaryFunction     : YArithmeticSensor_defineAuxiliaryFunction,
        loadAuxiliaryFunction       : YArithmeticSensor_loadAuxiliaryFunction,
        nextArithmeticSensor        : YArithmeticSensor_nextArithmeticSensor,
        _parseAttr                  : YArithmeticSensor_parseAttr
    });
    //--- (end of YArithmeticSensor initialization)
})();

//--- (YArithmeticSensor functions)

/**
 * Retrieves an arithmetic sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the arithmetic sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YArithmeticSensor.isOnline() to test if the arithmetic sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * an arithmetic sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the arithmetic sensor, for instance
 *         RXUVOLT1.arithmeticSensor1.
 *
 * @return a YArithmeticSensor object allowing you to drive the arithmetic sensor.
 */
function yFindArithmeticSensor(func)
{
    return YArithmeticSensor.FindArithmeticSensor(func);
}

/**
 * Starts the enumeration of arithmetic sensors currently accessible.
 * Use the method YArithmeticSensor.nextArithmeticSensor() to iterate on
 * next arithmetic sensors.
 *
 * @return a pointer to a YArithmeticSensor object, corresponding to
 *         the first arithmetic sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstArithmeticSensor()
{
    return YArithmeticSensor.FirstArithmeticSensor();
}

//--- (end of YArithmeticSensor functions)
