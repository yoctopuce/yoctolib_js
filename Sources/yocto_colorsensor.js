/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for ColorSensor functions
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

//--- (YColorSensor return codes)
//--- (end of YColorSensor return codes)
//--- (YColorSensor definitions)
var Y_ESTIMATIONMODEL_REFLECTION    = 0;
var Y_ESTIMATIONMODEL_EMISSION      = 1;
var Y_ESTIMATIONMODEL_INVALID       = -1;
var Y_WORKINGMODE_AUTO              = 0;
var Y_WORKINGMODE_EXPERT            = 1;
var Y_WORKINGMODE_INVALID           = -1;
var Y_NEARSIMPLECOLORINDEX_BROWN    = 0;
var Y_NEARSIMPLECOLORINDEX_RED      = 1;
var Y_NEARSIMPLECOLORINDEX_ORANGE   = 2;
var Y_NEARSIMPLECOLORINDEX_YELLOW   = 3;
var Y_NEARSIMPLECOLORINDEX_WHITE    = 4;
var Y_NEARSIMPLECOLORINDEX_GRAY     = 5;
var Y_NEARSIMPLECOLORINDEX_BLACK    = 6;
var Y_NEARSIMPLECOLORINDEX_GREEN    = 7;
var Y_NEARSIMPLECOLORINDEX_BLUE     = 8;
var Y_NEARSIMPLECOLORINDEX_PURPLE   = 9;
var Y_NEARSIMPLECOLORINDEX_PINK     = 10;
var Y_NEARSIMPLECOLORINDEX_INVALID  = -1;
var Y_SATURATION_INVALID            = YAPI_INVALID_UINT;
var Y_LEDCURRENT_INVALID            = YAPI_INVALID_UINT;
var Y_LEDCALIBRATION_INVALID        = YAPI_INVALID_UINT;
var Y_INTEGRATIONTIME_INVALID       = YAPI_INVALID_UINT;
var Y_GAIN_INVALID                  = YAPI_INVALID_UINT;
var Y_ESTIMATEDRGB_INVALID          = YAPI_INVALID_UINT;
var Y_ESTIMATEDHSL_INVALID          = YAPI_INVALID_UINT;
var Y_ESTIMATEDXYZ_INVALID          = YAPI_INVALID_STRING;
var Y_ESTIMATEDOKLAB_INVALID        = YAPI_INVALID_STRING;
var Y_NEARRAL1_INVALID              = YAPI_INVALID_STRING;
var Y_NEARRAL2_INVALID              = YAPI_INVALID_STRING;
var Y_NEARRAL3_INVALID              = YAPI_INVALID_STRING;
var Y_NEARHTMLCOLOR_INVALID         = YAPI_INVALID_STRING;
var Y_NEARSIMPLECOLOR_INVALID       = YAPI_INVALID_STRING;
//--- (end of YColorSensor definitions)

//--- (YColorSensor class start)
/**
 * YColorSensor Class: color sensor control interface
 *
 * The YColorSensor class allows you to read and configure Yoctopuce color sensors.
 * It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, and to access the autonomous datalogger.
 */
//--- (end of YColorSensor class start)

var YColorSensor; // definition below
(function()
{
    function _YColorSensor(str_func)
    {
        //--- (YColorSensor constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'ColorSensor';

        this._estimationModel                = Y_ESTIMATIONMODEL_INVALID;  // EstimationModel
        this._workingMode                    = Y_WORKINGMODE_INVALID;      // WorkingMode
        this._saturation                     = Y_SATURATION_INVALID;       // SaturationBits
        this._ledCurrent                     = Y_LEDCURRENT_INVALID;       // UInt31
        this._ledCalibration                 = Y_LEDCALIBRATION_INVALID;   // UInt31
        this._integrationTime                = Y_INTEGRATIONTIME_INVALID;  // UInt31
        this._gain                           = Y_GAIN_INVALID;             // UInt31
        this._estimatedRGB                   = Y_ESTIMATEDRGB_INVALID;     // U24Color
        this._estimatedHSL                   = Y_ESTIMATEDHSL_INVALID;     // U24Color
        this._estimatedXYZ                   = Y_ESTIMATEDXYZ_INVALID;     // ColorCoord
        this._estimatedOkLab                 = Y_ESTIMATEDOKLAB_INVALID;   // ColorCoord
        this._nearRAL1                       = Y_NEARRAL1_INVALID;         // Text
        this._nearRAL2                       = Y_NEARRAL2_INVALID;         // Text
        this._nearRAL3                       = Y_NEARRAL3_INVALID;         // Text
        this._nearHTMLColor                  = Y_NEARHTMLCOLOR_INVALID;    // Text
        this._nearSimpleColor                = Y_NEARSIMPLECOLOR_INVALID;  // Text
        this._nearSimpleColorIndex           = Y_NEARSIMPLECOLORINDEX_INVALID; // SimpleColor
        //--- (end of YColorSensor constructor)
    }

    //--- (YColorSensor implementation)

    function YColorSensor_parseAttr(name, val, _super)
    {
        switch(name) {
        case "estimationModel":
            this._estimationModel = parseInt(val);
            return 1;
        case "workingMode":
            this._workingMode = parseInt(val);
            return 1;
        case "saturation":
            this._saturation = parseInt(val);
            return 1;
        case "ledCurrent":
            this._ledCurrent = parseInt(val);
            return 1;
        case "ledCalibration":
            this._ledCalibration = parseInt(val);
            return 1;
        case "integrationTime":
            this._integrationTime = parseInt(val);
            return 1;
        case "gain":
            this._gain = parseInt(val);
            return 1;
        case "estimatedRGB":
            this._estimatedRGB = parseInt(val);
            return 1;
        case "estimatedHSL":
            this._estimatedHSL = parseInt(val);
            return 1;
        case "estimatedXYZ":
            this._estimatedXYZ = val;
            return 1;
        case "estimatedOkLab":
            this._estimatedOkLab = val;
            return 1;
        case "nearRAL1":
            this._nearRAL1 = val;
            return 1;
        case "nearRAL2":
            this._nearRAL2 = val;
            return 1;
        case "nearRAL3":
            this._nearRAL3 = val;
            return 1;
        case "nearHTMLColor":
            this._nearHTMLColor = val;
            return 1;
        case "nearSimpleColor":
            this._nearSimpleColor = val;
            return 1;
        case "nearSimpleColorIndex":
            this._nearSimpleColorIndex = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the model for color estimation.
     *
     * @return either YColorSensor.ESTIMATIONMODEL_REFLECTION or YColorSensor.ESTIMATIONMODEL_EMISSION,
     * according to the model for color estimation
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATIONMODEL_INVALID.
     */
    function YColorSensor_get_estimationModel()
    {
        var res;                    // enumESTIMATIONMODEL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ESTIMATIONMODEL_INVALID;
            }
        }
        res = this._estimationModel;
        return res;
    }

    /**
     * Gets the model for color estimation.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:either YColorSensor.ESTIMATIONMODEL_REFLECTION or
     *         YColorSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATIONMODEL_INVALID.
     */
    function YColorSensor_get_estimationModel_async(callback,context)
    {
        var res;                    // enumESTIMATIONMODEL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ESTIMATIONMODEL_INVALID);
            } else {
                callback(context, obj, obj._estimationModel);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the model for color estimation.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YColorSensor.ESTIMATIONMODEL_REFLECTION or
     * YColorSensor.ESTIMATIONMODEL_EMISSION, according to the model for color estimation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorSensor_set_estimationModel(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('estimationModel',rest_val);
    }

    /**
     * Returns the active working mode.
     *
     * @return either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT, according to the
     * active working mode
     *
     * On failure, throws an exception or returns YColorSensor.WORKINGMODE_INVALID.
     */
    function YColorSensor_get_workingMode()
    {
        var res;                    // enumWORKINGMODE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_WORKINGMODE_INVALID;
            }
        }
        res = this._workingMode;
        return res;
    }

    /**
     * Gets the active working mode.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT, according to
     *         the active working mode
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.WORKINGMODE_INVALID.
     */
    function YColorSensor_get_workingMode_async(callback,context)
    {
        var res;                    // enumWORKINGMODE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_WORKINGMODE_INVALID);
            } else {
                callback(context, obj, obj._workingMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the operating mode.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : either YColorSensor.WORKINGMODE_AUTO or YColorSensor.WORKINGMODE_EXPERT, according
     * to the operating mode
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorSensor_set_workingMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('workingMode',rest_val);
    }

    /**
     * Returns the current saturation of the sensor.
     * This function updates the sensor's saturation value.
     *
     * @return an integer corresponding to the current saturation of the sensor
     *
     * On failure, throws an exception or returns YColorSensor.SATURATION_INVALID.
     */
    function YColorSensor_get_saturation()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SATURATION_INVALID;
            }
        }
        res = this._saturation;
        return res;
    }

    /**
     * Gets the current saturation of the sensor.
     * This function updates the sensor's saturation value.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:an integer corresponding to the current saturation of the sensor
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.SATURATION_INVALID.
     */
    function YColorSensor_get_saturation_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SATURATION_INVALID);
            } else {
                callback(context, obj, obj._saturation);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current value of the LED.
     *
     * @return an integer corresponding to the current value of the LED
     *
     * On failure, throws an exception or returns YColorSensor.LEDCURRENT_INVALID.
     */
    function YColorSensor_get_ledCurrent()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LEDCURRENT_INVALID;
            }
        }
        res = this._ledCurrent;
        return res;
    }

    /**
     * Gets the current value of the LED.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:an integer corresponding to the current value of the LED
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.LEDCURRENT_INVALID.
     */
    function YColorSensor_get_ledCurrent_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LEDCURRENT_INVALID);
            } else {
                callback(context, obj, obj._ledCurrent);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the luminosity of the module leds. The parameter is a
     * value between 0 and 254.
     *
     * @param newval : an integer corresponding to the luminosity of the module leds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorSensor_set_ledCurrent(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('ledCurrent',rest_val);
    }

    /**
     * Returns the LED current at calibration.
     *
     * @return an integer corresponding to the LED current at calibration
     *
     * On failure, throws an exception or returns YColorSensor.LEDCALIBRATION_INVALID.
     */
    function YColorSensor_get_ledCalibration()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LEDCALIBRATION_INVALID;
            }
        }
        res = this._ledCalibration;
        return res;
    }

    /**
     * Gets the LED current at calibration.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:an integer corresponding to the LED current at calibration
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.LEDCALIBRATION_INVALID.
     */
    function YColorSensor_get_ledCalibration_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LEDCALIBRATION_INVALID);
            } else {
                callback(context, obj, obj._ledCalibration);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Sets the LED current for calibration.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorSensor_set_ledCalibration(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('ledCalibration',rest_val);
    }

    /**
     * Returns the current integration time.
     * This method retrieves the integration time value
     * used for data processing and returns it as an integer or an object.
     *
     * @return an integer corresponding to the current integration time
     *
     * On failure, throws an exception or returns YColorSensor.INTEGRATIONTIME_INVALID.
     */
    function YColorSensor_get_integrationTime()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_INTEGRATIONTIME_INVALID;
            }
        }
        res = this._integrationTime;
        return res;
    }

    /**
     * Gets the current integration time.
     * This method retrieves the integration time value
     * used for data processing and returns it as an integer or an object.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:an integer corresponding to the current integration time
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.INTEGRATIONTIME_INVALID.
     */
    function YColorSensor_get_integrationTime_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_INTEGRATIONTIME_INVALID);
            } else {
                callback(context, obj, obj._integrationTime);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the integration time for data processing.
     * This method takes a parameter and assigns it
     * as the new integration time. This affects the duration
     * for which data is integrated before being processed.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the integration time for data processing
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorSensor_set_integrationTime(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('integrationTime',rest_val);
    }

    /**
     * Returns the current gain.
     * This method updates the gain value.
     *
     * @return an integer corresponding to the current gain
     *
     * On failure, throws an exception or returns YColorSensor.GAIN_INVALID.
     */
    function YColorSensor_get_gain()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_GAIN_INVALID;
            }
        }
        res = this._gain;
        return res;
    }

    /**
     * Gets the current gain.
     * This method updates the gain value.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:an integer corresponding to the current gain
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.GAIN_INVALID.
     */
    function YColorSensor_get_gain_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_GAIN_INVALID);
            } else {
                callback(context, obj, obj._gain);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the gain for signal processing.
     * This method takes a parameter and assigns it
     * as the new gain. This affects the sensitivity and
     * intensity of the processed signal.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the gain for signal processing
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorSensor_set_gain(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('gain',rest_val);
    }

    /**
     * Returns the estimated color in RGB format (0xRRGGBB).
     *
     * @return an integer corresponding to the estimated color in RGB format (0xRRGGBB)
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDRGB_INVALID.
     */
    function YColorSensor_get_estimatedRGB()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ESTIMATEDRGB_INVALID;
            }
        }
        res = this._estimatedRGB;
        return res;
    }

    /**
     * Gets the estimated color in RGB format (0xRRGGBB).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:an integer corresponding to the estimated color in RGB format (0xRRGGBB)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDRGB_INVALID.
     */
    function YColorSensor_get_estimatedRGB_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ESTIMATEDRGB_INVALID);
            } else {
                callback(context, obj, obj._estimatedRGB);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the estimated color in HSL (Hue, Saturation, Lightness) format.
     *
     * @return an integer corresponding to the estimated color in HSL (Hue, Saturation, Lightness) format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDHSL_INVALID.
     */
    function YColorSensor_get_estimatedHSL()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ESTIMATEDHSL_INVALID;
            }
        }
        res = this._estimatedHSL;
        return res;
    }

    /**
     * Gets the estimated color in HSL (Hue, Saturation, Lightness) format.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:an integer corresponding to the estimated color in HSL (Hue, Saturation, Lightness) format
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDHSL_INVALID.
     */
    function YColorSensor_get_estimatedHSL_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ESTIMATEDHSL_INVALID);
            } else {
                callback(context, obj, obj._estimatedHSL);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the estimated color in XYZ format.
     *
     * @return a string corresponding to the estimated color in XYZ format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDXYZ_INVALID.
     */
    function YColorSensor_get_estimatedXYZ()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ESTIMATEDXYZ_INVALID;
            }
        }
        res = this._estimatedXYZ;
        return res;
    }

    /**
     * Gets the estimated color in XYZ format.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:a string corresponding to the estimated color in XYZ format
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDXYZ_INVALID.
     */
    function YColorSensor_get_estimatedXYZ_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ESTIMATEDXYZ_INVALID);
            } else {
                callback(context, obj, obj._estimatedXYZ);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the estimated color in OkLab format.
     *
     * @return a string corresponding to the estimated color in OkLab format
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDOKLAB_INVALID.
     */
    function YColorSensor_get_estimatedOkLab()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ESTIMATEDOKLAB_INVALID;
            }
        }
        res = this._estimatedOkLab;
        return res;
    }

    /**
     * Gets the estimated color in OkLab format.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:a string corresponding to the estimated color in OkLab format
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.ESTIMATEDOKLAB_INVALID.
     */
    function YColorSensor_get_estimatedOkLab_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ESTIMATEDOKLAB_INVALID);
            } else {
                callback(context, obj, obj._estimatedOkLab);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL1_INVALID.
     */
    function YColorSensor_get_nearRAL1()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NEARRAL1_INVALID;
            }
        }
        res = this._nearRAL1;
        return res;
    }

    /**
     * Gets the estimated color in RAL format.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:a string corresponding to the estimated color in RAL format
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL1_INVALID.
     */
    function YColorSensor_get_nearRAL1_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NEARRAL1_INVALID);
            } else {
                callback(context, obj, obj._nearRAL1);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL2_INVALID.
     */
    function YColorSensor_get_nearRAL2()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NEARRAL2_INVALID;
            }
        }
        res = this._nearRAL2;
        return res;
    }

    /**
     * Gets the estimated color in RAL format.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:a string corresponding to the estimated color in RAL format
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL2_INVALID.
     */
    function YColorSensor_get_nearRAL2_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NEARRAL2_INVALID);
            } else {
                callback(context, obj, obj._nearRAL2);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the estimated color in RAL format.
     *
     * @return a string corresponding to the estimated color in RAL format
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL3_INVALID.
     */
    function YColorSensor_get_nearRAL3()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NEARRAL3_INVALID;
            }
        }
        res = this._nearRAL3;
        return res;
    }

    /**
     * Gets the estimated color in RAL format.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:a string corresponding to the estimated color in RAL format
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.NEARRAL3_INVALID.
     */
    function YColorSensor_get_nearRAL3_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NEARRAL3_INVALID);
            } else {
                callback(context, obj, obj._nearRAL3);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the estimated HTML color .
     *
     * @return a string corresponding to the estimated HTML color
     *
     * On failure, throws an exception or returns YColorSensor.NEARHTMLCOLOR_INVALID.
     */
    function YColorSensor_get_nearHTMLColor()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NEARHTMLCOLOR_INVALID;
            }
        }
        res = this._nearHTMLColor;
        return res;
    }

    /**
     * Gets the estimated HTML color .
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:a string corresponding to the estimated HTML color
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.NEARHTMLCOLOR_INVALID.
     */
    function YColorSensor_get_nearHTMLColor_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NEARHTMLCOLOR_INVALID);
            } else {
                callback(context, obj, obj._nearHTMLColor);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the estimated color .
     *
     * @return a string corresponding to the estimated color
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLOR_INVALID.
     */
    function YColorSensor_get_nearSimpleColor()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NEARSIMPLECOLOR_INVALID;
            }
        }
        res = this._nearSimpleColor;
        return res;
    }

    /**
     * Gets the estimated color .
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:a string corresponding to the estimated color
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLOR_INVALID.
     */
    function YColorSensor_get_nearSimpleColor_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NEARSIMPLECOLOR_INVALID);
            } else {
                callback(context, obj, obj._nearSimpleColor);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the estimated color as an index.
     *
     * @return a value among YColorSensor.NEARSIMPLECOLORINDEX_BROWN,
     * YColorSensor.NEARSIMPLECOLORINDEX_RED, YColorSensor.NEARSIMPLECOLORINDEX_ORANGE,
     * YColorSensor.NEARSIMPLECOLORINDEX_YELLOW, YColorSensor.NEARSIMPLECOLORINDEX_WHITE,
     * YColorSensor.NEARSIMPLECOLORINDEX_GRAY, YColorSensor.NEARSIMPLECOLORINDEX_BLACK,
     * YColorSensor.NEARSIMPLECOLORINDEX_GREEN, YColorSensor.NEARSIMPLECOLORINDEX_BLUE,
     * YColorSensor.NEARSIMPLECOLORINDEX_PURPLE and YColorSensor.NEARSIMPLECOLORINDEX_PINK corresponding
     * to the estimated color as an index
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLORINDEX_INVALID.
     */
    function YColorSensor_get_nearSimpleColorIndex()
    {
        var res;                    // enumSIMPLECOLOR;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NEARSIMPLECOLORINDEX_INVALID;
            }
        }
        res = this._nearSimpleColorIndex;
        return res;
    }

    /**
     * Gets the estimated color as an index.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorSensor object that invoked the callback
     *         - the result:a value among YColorSensor.NEARSIMPLECOLORINDEX_BROWN,
     *         YColorSensor.NEARSIMPLECOLORINDEX_RED, YColorSensor.NEARSIMPLECOLORINDEX_ORANGE,
     *         YColorSensor.NEARSIMPLECOLORINDEX_YELLOW, YColorSensor.NEARSIMPLECOLORINDEX_WHITE,
     *         YColorSensor.NEARSIMPLECOLORINDEX_GRAY, YColorSensor.NEARSIMPLECOLORINDEX_BLACK,
     *         YColorSensor.NEARSIMPLECOLORINDEX_GREEN, YColorSensor.NEARSIMPLECOLORINDEX_BLUE,
     *         YColorSensor.NEARSIMPLECOLORINDEX_PURPLE and YColorSensor.NEARSIMPLECOLORINDEX_PINK corresponding
     *         to the estimated color as an index
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorSensor.NEARSIMPLECOLORINDEX_INVALID.
     */
    function YColorSensor_get_nearSimpleColorIndex_async(callback,context)
    {
        var res;                    // enumSIMPLECOLOR;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NEARSIMPLECOLORINDEX_INVALID);
            } else {
                callback(context, obj, obj._nearSimpleColorIndex);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a color sensor for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the color sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorSensor.isOnline() to test if the color sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a color sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the color sensor, for instance
     *         MyDevice.colorSensor.
     *
     * @return a YColorSensor object allowing you to drive the color sensor.
     */
    function YColorSensor_FindColorSensor(func)                 // class method
    {
        var obj;                    // YColorSensor;
        obj = YFunction._FindFromCache("ColorSensor", func);
        if (obj == null) {
            obj = new YColorSensor(func);
            YFunction._AddToCache("ColorSensor", func, obj);
        }
        return obj;
    }

    /**
     * Turns on the LEDs at the current used during calibration.
     * On failure, throws an exception or returns Y_DATA_INVALID.
     */
    function YColorSensor_turnLedOn()
    {
        return this.set_ledCurrent(this.get_ledCalibration());
    }

    /**
     * Turns off the LEDs.
     * On failure, throws an exception or returns Y_DATA_INVALID.
     */
    function YColorSensor_turnLedOff()
    {
        return this.set_ledCurrent(0);
    }

    /**
     * Continues the enumeration of color sensors started using yFirstColorSensor().
     * Caution: You can't make any assumption about the returned color sensors order.
     * If you want to find a specific a color sensor, use ColorSensor.findColorSensor()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YColorSensor object, corresponding to
     *         a color sensor currently online, or a null pointer
     *         if there are no more color sensors to enumerate.
     */
    function YColorSensor_nextColorSensor()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YColorSensor.FindColorSensor(next_hwid);
    }

    /**
     * Starts the enumeration of color sensors currently accessible.
     * Use the method YColorSensor.nextColorSensor() to iterate on
     * next color sensors.
     *
     * @return a pointer to a YColorSensor object, corresponding to
     *         the first color sensor currently online, or a null pointer
     *         if there are none.
     */
    function YColorSensor_FirstColorSensor()
    {
        var next_hwid = YAPI.getFirstHardwareId('ColorSensor');
        if(next_hwid == null) return null;
        return YColorSensor.FindColorSensor(next_hwid);
    }

    //--- (end of YColorSensor implementation)

    //--- (YColorSensor initialization)
    YColorSensor = YFunction._Subclass(_YColorSensor, {
        // Constants
        ESTIMATIONMODEL_REFLECTION  : 0,
        ESTIMATIONMODEL_EMISSION    : 1,
        ESTIMATIONMODEL_INVALID     : -1,
        WORKINGMODE_AUTO            : 0,
        WORKINGMODE_EXPERT          : 1,
        WORKINGMODE_INVALID         : -1,
        SATURATION_INVALID          : YAPI_INVALID_UINT,
        LEDCURRENT_INVALID          : YAPI_INVALID_UINT,
        LEDCALIBRATION_INVALID      : YAPI_INVALID_UINT,
        INTEGRATIONTIME_INVALID     : YAPI_INVALID_UINT,
        GAIN_INVALID                : YAPI_INVALID_UINT,
        ESTIMATEDRGB_INVALID        : YAPI_INVALID_UINT,
        ESTIMATEDHSL_INVALID        : YAPI_INVALID_UINT,
        ESTIMATEDXYZ_INVALID        : YAPI_INVALID_STRING,
        ESTIMATEDOKLAB_INVALID      : YAPI_INVALID_STRING,
        NEARRAL1_INVALID            : YAPI_INVALID_STRING,
        NEARRAL2_INVALID            : YAPI_INVALID_STRING,
        NEARRAL3_INVALID            : YAPI_INVALID_STRING,
        NEARHTMLCOLOR_INVALID       : YAPI_INVALID_STRING,
        NEARSIMPLECOLOR_INVALID     : YAPI_INVALID_STRING,
        NEARSIMPLECOLORINDEX_BROWN  : 0,
        NEARSIMPLECOLORINDEX_RED    : 1,
        NEARSIMPLECOLORINDEX_ORANGE : 2,
        NEARSIMPLECOLORINDEX_YELLOW : 3,
        NEARSIMPLECOLORINDEX_WHITE  : 4,
        NEARSIMPLECOLORINDEX_GRAY   : 5,
        NEARSIMPLECOLORINDEX_BLACK  : 6,
        NEARSIMPLECOLORINDEX_GREEN  : 7,
        NEARSIMPLECOLORINDEX_BLUE   : 8,
        NEARSIMPLECOLORINDEX_PURPLE : 9,
        NEARSIMPLECOLORINDEX_PINK   : 10,
        NEARSIMPLECOLORINDEX_INVALID : -1
    }, {
        // Class methods
        FindColorSensor             : YColorSensor_FindColorSensor,
        FirstColorSensor            : YColorSensor_FirstColorSensor
    }, {
        // Methods
        get_estimationModel         : YColorSensor_get_estimationModel,
        estimationModel             : YColorSensor_get_estimationModel,
        get_estimationModel_async   : YColorSensor_get_estimationModel_async,
        estimationModel_async       : YColorSensor_get_estimationModel_async,
        set_estimationModel         : YColorSensor_set_estimationModel,
        setEstimationModel          : YColorSensor_set_estimationModel,
        get_workingMode             : YColorSensor_get_workingMode,
        workingMode                 : YColorSensor_get_workingMode,
        get_workingMode_async       : YColorSensor_get_workingMode_async,
        workingMode_async           : YColorSensor_get_workingMode_async,
        set_workingMode             : YColorSensor_set_workingMode,
        setWorkingMode              : YColorSensor_set_workingMode,
        get_saturation              : YColorSensor_get_saturation,
        saturation                  : YColorSensor_get_saturation,
        get_saturation_async        : YColorSensor_get_saturation_async,
        saturation_async            : YColorSensor_get_saturation_async,
        get_ledCurrent              : YColorSensor_get_ledCurrent,
        ledCurrent                  : YColorSensor_get_ledCurrent,
        get_ledCurrent_async        : YColorSensor_get_ledCurrent_async,
        ledCurrent_async            : YColorSensor_get_ledCurrent_async,
        set_ledCurrent              : YColorSensor_set_ledCurrent,
        setLedCurrent               : YColorSensor_set_ledCurrent,
        get_ledCalibration          : YColorSensor_get_ledCalibration,
        ledCalibration              : YColorSensor_get_ledCalibration,
        get_ledCalibration_async    : YColorSensor_get_ledCalibration_async,
        ledCalibration_async        : YColorSensor_get_ledCalibration_async,
        set_ledCalibration          : YColorSensor_set_ledCalibration,
        setLedCalibration           : YColorSensor_set_ledCalibration,
        get_integrationTime         : YColorSensor_get_integrationTime,
        integrationTime             : YColorSensor_get_integrationTime,
        get_integrationTime_async   : YColorSensor_get_integrationTime_async,
        integrationTime_async       : YColorSensor_get_integrationTime_async,
        set_integrationTime         : YColorSensor_set_integrationTime,
        setIntegrationTime          : YColorSensor_set_integrationTime,
        get_gain                    : YColorSensor_get_gain,
        gain                        : YColorSensor_get_gain,
        get_gain_async              : YColorSensor_get_gain_async,
        gain_async                  : YColorSensor_get_gain_async,
        set_gain                    : YColorSensor_set_gain,
        setGain                     : YColorSensor_set_gain,
        get_estimatedRGB            : YColorSensor_get_estimatedRGB,
        estimatedRGB                : YColorSensor_get_estimatedRGB,
        get_estimatedRGB_async      : YColorSensor_get_estimatedRGB_async,
        estimatedRGB_async          : YColorSensor_get_estimatedRGB_async,
        get_estimatedHSL            : YColorSensor_get_estimatedHSL,
        estimatedHSL                : YColorSensor_get_estimatedHSL,
        get_estimatedHSL_async      : YColorSensor_get_estimatedHSL_async,
        estimatedHSL_async          : YColorSensor_get_estimatedHSL_async,
        get_estimatedXYZ            : YColorSensor_get_estimatedXYZ,
        estimatedXYZ                : YColorSensor_get_estimatedXYZ,
        get_estimatedXYZ_async      : YColorSensor_get_estimatedXYZ_async,
        estimatedXYZ_async          : YColorSensor_get_estimatedXYZ_async,
        get_estimatedOkLab          : YColorSensor_get_estimatedOkLab,
        estimatedOkLab              : YColorSensor_get_estimatedOkLab,
        get_estimatedOkLab_async    : YColorSensor_get_estimatedOkLab_async,
        estimatedOkLab_async        : YColorSensor_get_estimatedOkLab_async,
        get_nearRAL1                : YColorSensor_get_nearRAL1,
        nearRAL1                    : YColorSensor_get_nearRAL1,
        get_nearRAL1_async          : YColorSensor_get_nearRAL1_async,
        nearRAL1_async              : YColorSensor_get_nearRAL1_async,
        get_nearRAL2                : YColorSensor_get_nearRAL2,
        nearRAL2                    : YColorSensor_get_nearRAL2,
        get_nearRAL2_async          : YColorSensor_get_nearRAL2_async,
        nearRAL2_async              : YColorSensor_get_nearRAL2_async,
        get_nearRAL3                : YColorSensor_get_nearRAL3,
        nearRAL3                    : YColorSensor_get_nearRAL3,
        get_nearRAL3_async          : YColorSensor_get_nearRAL3_async,
        nearRAL3_async              : YColorSensor_get_nearRAL3_async,
        get_nearHTMLColor           : YColorSensor_get_nearHTMLColor,
        nearHTMLColor               : YColorSensor_get_nearHTMLColor,
        get_nearHTMLColor_async     : YColorSensor_get_nearHTMLColor_async,
        nearHTMLColor_async         : YColorSensor_get_nearHTMLColor_async,
        get_nearSimpleColor         : YColorSensor_get_nearSimpleColor,
        nearSimpleColor             : YColorSensor_get_nearSimpleColor,
        get_nearSimpleColor_async   : YColorSensor_get_nearSimpleColor_async,
        nearSimpleColor_async       : YColorSensor_get_nearSimpleColor_async,
        get_nearSimpleColorIndex    : YColorSensor_get_nearSimpleColorIndex,
        nearSimpleColorIndex        : YColorSensor_get_nearSimpleColorIndex,
        get_nearSimpleColorIndex_async : YColorSensor_get_nearSimpleColorIndex_async,
        nearSimpleColorIndex_async  : YColorSensor_get_nearSimpleColorIndex_async,
        turnLedOn                   : YColorSensor_turnLedOn,
        turnLedOff                  : YColorSensor_turnLedOff,
        nextColorSensor             : YColorSensor_nextColorSensor,
        _parseAttr                  : YColorSensor_parseAttr
    });
    //--- (end of YColorSensor initialization)
})();

//--- (YColorSensor functions)

/**
 * Retrieves a color sensor for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the color sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YColorSensor.isOnline() to test if the color sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a color sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the color sensor, for instance
 *         MyDevice.colorSensor.
 *
 * @return a YColorSensor object allowing you to drive the color sensor.
 */
function yFindColorSensor(func)
{
    return YColorSensor.FindColorSensor(func);
}

/**
 * Starts the enumeration of color sensors currently accessible.
 * Use the method YColorSensor.nextColorSensor() to iterate on
 * next color sensors.
 *
 * @return a pointer to a YColorSensor object, corresponding to
 *         the first color sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstColorSensor()
{
    return YColorSensor.FirstColorSensor();
}

//--- (end of YColorSensor functions)
