/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for ColorLed functions
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

//--- (YColorLed return codes)
//--- (end of YColorLed return codes)
//--- (YColorLed definitions)
var Y_RGBCOLOR_INVALID              = YAPI_INVALID_UINT;
var Y_HSLCOLOR_INVALID              = YAPI_INVALID_UINT;
var Y_RGBMOVE_INVALID               = null;
var Y_HSLMOVE_INVALID               = null;
var Y_RGBCOLORATPOWERON_INVALID     = YAPI_INVALID_UINT;
var Y_BLINKSEQSIZE_INVALID          = YAPI_INVALID_UINT;
var Y_BLINKSEQMAXSIZE_INVALID       = YAPI_INVALID_UINT;
var Y_BLINKSEQSIGNATURE_INVALID     = YAPI_INVALID_UINT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YColorLed definitions)

//--- (YColorLed class start)
/**
 * YColorLed Class: RGB LED control interface, available for instance in the Yocto-Color-V2, the
 * Yocto-MaxiBuzzer or the Yocto-PowerColor
 *
 * The ColorLed class allows you to drive a color LED.
 * The color can be specified using RGB coordinates as well as HSL coordinates.
 * The module performs all conversions form RGB to HSL automatically. It is then
 * self-evident to turn on a LED with a given hue and to progressively vary its
 * saturation or lightness. If needed, you can find more information on the
 * difference between RGB and HSL in the section following this one.
 */
//--- (end of YColorLed class start)

var YColorLed; // definition below
(function()
{
    function _YColorLed(str_func)
    {
        //--- (YColorLed constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'ColorLed';

        this._rgbColor                       = Y_RGBCOLOR_INVALID;         // U24Color
        this._hslColor                       = Y_HSLCOLOR_INVALID;         // U24Color
        this._rgbMove                        = Y_RGBMOVE_INVALID;          // Move
        this._hslMove                        = Y_HSLMOVE_INVALID;          // Move
        this._rgbColorAtPowerOn              = Y_RGBCOLORATPOWERON_INVALID; // U24Color
        this._blinkSeqSize                   = Y_BLINKSEQSIZE_INVALID;     // UInt31
        this._blinkSeqMaxSize                = Y_BLINKSEQMAXSIZE_INVALID;  // UInt31
        this._blinkSeqSignature              = Y_BLINKSEQSIGNATURE_INVALID; // UInt31
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YColorLed constructor)
    }

    //--- (YColorLed implementation)

    function YColorLed_parseAttr(name, val, _super)
    {
        switch(name) {
        case "rgbColor":
            this._rgbColor = parseInt(val);
            return 1;
        case "hslColor":
            this._hslColor = parseInt(val);
            return 1;
        case "rgbMove":
            this._rgbMove = val;
            return 1;
        case "hslMove":
            this._hslMove = val;
            return 1;
        case "rgbColorAtPowerOn":
            this._rgbColorAtPowerOn = parseInt(val);
            return 1;
        case "blinkSeqSize":
            this._blinkSeqSize = parseInt(val);
            return 1;
        case "blinkSeqMaxSize":
            this._blinkSeqMaxSize = parseInt(val);
            return 1;
        case "blinkSeqSignature":
            this._blinkSeqSignature = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current RGB color of the LED.
     *
     * @return an integer corresponding to the current RGB color of the LED
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLOR_INVALID.
     */
    function YColorLed_get_rgbColor()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RGBCOLOR_INVALID;
            }
        }
        res = this._rgbColor;
        return res;
    }

    /**
     * Gets the current RGB color of the LED.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:an integer corresponding to the current RGB color of the LED
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLOR_INVALID.
     */
    function YColorLed_get_rgbColor_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RGBCOLOR_INVALID);
            } else {
                callback(context, obj, obj._rgbColor);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current color of the LED, using an RGB color. Encoding is done as follows: 0xRRGGBB.
     *
     * @param newval : an integer corresponding to the current color of the LED, using an RGB color
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_set_rgbColor(newval)
    {   var rest_val;
        rest_val = '0x'+newval.toString(16);
        return this._setAttr('rgbColor',rest_val);
    }

    /**
     * Returns the current HSL color of the LED.
     *
     * @return an integer corresponding to the current HSL color of the LED
     *
     * On failure, throws an exception or returns YColorLed.HSLCOLOR_INVALID.
     */
    function YColorLed_get_hslColor()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_HSLCOLOR_INVALID;
            }
        }
        res = this._hslColor;
        return res;
    }

    /**
     * Gets the current HSL color of the LED.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:an integer corresponding to the current HSL color of the LED
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorLed.HSLCOLOR_INVALID.
     */
    function YColorLed_get_hslColor_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_HSLCOLOR_INVALID);
            } else {
                callback(context, obj, obj._hslColor);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current color of the LED, using a specific HSL color. Encoding is done as follows: 0xHHSSLL.
     *
     * @param newval : an integer corresponding to the current color of the LED, using a specific HSL color
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_set_hslColor(newval)
    {   var rest_val;
        rest_val = '0x'+newval.toString(16);
        return this._setAttr('hslColor',rest_val);
    }

    function YColorLed_get_rgbMove()
    {
        var res;                    // YMove;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RGBMOVE_INVALID;
            }
        }
        res = this._rgbMove;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YColorLed_get_rgbMove_async(callback,context)
    {
        var res;                    // YMove;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RGBMOVE_INVALID);
            } else {
                callback(context, obj, obj._rgbMove);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YColorLed_set_rgbMove(newval)
    {   var rest_val;
        rest_val = String(newval.target)+':'+String(newval.ms);
        return this._setAttr('rgbMove',rest_val);
    }

    /**
     * Performs a smooth transition in the RGB color space between the current color and a target color.
     *
     * @param rgb_target  : desired RGB color at the end of the transition
     * @param ms_duration : duration of the transition, in millisecond
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_rgbMove(rgb_target,ms_duration)
    {   var rest_val;
        rest_val = String(rgb_target)+':'+String(ms_duration);
        return this._setAttr('rgbMove',rest_val);
    }

    function YColorLed_get_hslMove()
    {
        var res;                    // YMove;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_HSLMOVE_INVALID;
            }
        }
        res = this._hslMove;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YColorLed_get_hslMove_async(callback,context)
    {
        var res;                    // YMove;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_HSLMOVE_INVALID);
            } else {
                callback(context, obj, obj._hslMove);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YColorLed_set_hslMove(newval)
    {   var rest_val;
        rest_val = String(newval.target)+':'+String(newval.ms);
        return this._setAttr('hslMove',rest_val);
    }

    /**
     * Performs a smooth transition in the HSL color space between the current color and a target color.
     *
     * @param hsl_target  : desired HSL color at the end of the transition
     * @param ms_duration : duration of the transition, in millisecond
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_hslMove(hsl_target,ms_duration)
    {   var rest_val;
        rest_val = String(hsl_target)+':'+String(ms_duration);
        return this._setAttr('hslMove',rest_val);
    }

    /**
     * Returns the configured color to be displayed when the module is turned on.
     *
     * @return an integer corresponding to the configured color to be displayed when the module is turned on
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLORATPOWERON_INVALID.
     */
    function YColorLed_get_rgbColorAtPowerOn()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RGBCOLORATPOWERON_INVALID;
            }
        }
        res = this._rgbColorAtPowerOn;
        return res;
    }

    /**
     * Gets the configured color to be displayed when the module is turned on.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:an integer corresponding to the configured color to be displayed when the module is turned on
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLORATPOWERON_INVALID.
     */
    function YColorLed_get_rgbColorAtPowerOn_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RGBCOLORATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._rgbColorAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the color that the LED displays by default when the module is turned on.
     * Remember to call the saveLedsConfigAtPowerOn() method of the module if the modification must be kept.
     * Note: for the original modules Yocto-Color (version 1) et Yocto-PowerColor, the  saveToFlash()
     * method must be used instead.
     *
     * @param newval : an integer corresponding to the color that the LED displays by default when the
     * module is turned on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_set_rgbColorAtPowerOn(newval)
    {   var rest_val;
        rest_val = '0x'+newval.toString(16);
        return this._setAttr('rgbColorAtPowerOn',rest_val);
    }

    /**
     * Returns the current length of the blinking sequence.
     *
     * @return an integer corresponding to the current length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIZE_INVALID.
     */
    function YColorLed_get_blinkSeqSize()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BLINKSEQSIZE_INVALID;
            }
        }
        res = this._blinkSeqSize;
        return res;
    }

    /**
     * Gets the current length of the blinking sequence.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:an integer corresponding to the current length of the blinking sequence
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIZE_INVALID.
     */
    function YColorLed_get_blinkSeqSize_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BLINKSEQSIZE_INVALID);
            } else {
                callback(context, obj, obj._blinkSeqSize);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the maximum length of the blinking sequence.
     *
     * @return an integer corresponding to the maximum length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQMAXSIZE_INVALID.
     */
    function YColorLed_get_blinkSeqMaxSize()
    {
        var res;                    // int;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BLINKSEQMAXSIZE_INVALID;
            }
        }
        res = this._blinkSeqMaxSize;
        return res;
    }

    /**
     * Gets the maximum length of the blinking sequence.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:an integer corresponding to the maximum length of the blinking sequence
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQMAXSIZE_INVALID.
     */
    function YColorLed_get_blinkSeqMaxSize_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BLINKSEQMAXSIZE_INVALID);
            } else {
                callback(context, obj, obj._blinkSeqMaxSize);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the blinking sequence signature. Since blinking
     * sequences cannot be read from the device, this can be used
     * to detect if a specific blinking sequence is already
     * programmed.
     *
     * @return an integer corresponding to the blinking sequence signature
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIGNATURE_INVALID.
     */
    function YColorLed_get_blinkSeqSignature()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BLINKSEQSIGNATURE_INVALID;
            }
        }
        res = this._blinkSeqSignature;
        return res;
    }

    /**
     * Gets the blinking sequence signature. Since blinking
     * sequences cannot be read from the device, this can be used
     * to detect if a specific blinking sequence is already
     * programmed.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:an integer corresponding to the blinking sequence signature
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIGNATURE_INVALID.
     */
    function YColorLed_get_blinkSeqSignature_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BLINKSEQSIGNATURE_INVALID);
            } else {
                callback(context, obj, obj._blinkSeqSignature);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YColorLed_get_command()
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
     *         - the YColorLed object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YColorLed_get_command_async(callback,context)
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

    function YColorLed_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves an RGB LED for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the RGB LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the RGB LED, for instance
     *         YRGBLED2.colorLed1.
     *
     * @return a YColorLed object allowing you to drive the RGB LED.
     */
    function YColorLed_FindColorLed(func)                       // class method
    {
        var obj;                    // YColorLed;
        obj = YFunction._FindFromCache("ColorLed", func);
        if (obj == null) {
            obj = new YColorLed(func);
            YFunction._AddToCache("ColorLed", func, obj);
        }
        return obj;
    }

    function YColorLed_sendCommand(command)
    {
        return this.set_command(command);
    }

    /**
     * Add a new transition to the blinking sequence, the move will
     * be performed in the HSL space.
     *
     * @param HSLcolor : desired HSL color when the transition is completed
     * @param msDelay : duration of the color transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_addHslMoveToBlinkSeq(HSLcolor,msDelay)
    {
        return this.sendCommand("H"+String(Math.round(HSLcolor))+","+String(Math.round(msDelay)));
    }

    /**
     * Adds a new transition to the blinking sequence, the move is
     * performed in the RGB space.
     *
     * @param RGBcolor : desired RGB color when the transition is completed
     * @param msDelay : duration of the color transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_addRgbMoveToBlinkSeq(RGBcolor,msDelay)
    {
        return this.sendCommand("R"+String(Math.round(RGBcolor))+","+String(Math.round(msDelay)));
    }

    /**
     * Starts the preprogrammed blinking sequence. The sequence is
     * run in a loop until it is stopped by stopBlinkSeq or an explicit
     * change.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_startBlinkSeq()
    {
        return this.sendCommand("S");
    }

    /**
     * Stops the preprogrammed blinking sequence.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_stopBlinkSeq()
    {
        return this.sendCommand("X");
    }

    /**
     * Resets the preprogrammed blinking sequence.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_resetBlinkSeq()
    {
        return this.sendCommand("Z");
    }

    /**
     * Saves the LEDs power-on configuration.  Warning: this method is not supported by
     * Yocto-Color (version 1) and Yocto-PowerColor modules. For these devices, the saveToFlash()
     * method of the module must be used instead.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_saveLedsConfigAtPowerOn()
    {
        return this.sendCommand("W");
    }

    /**
     * Continues the enumeration of RGB LEDs started using yFirstColorLed().
     * Caution: You can't make any assumption about the returned RGB LEDs order.
     * If you want to find a specific an RGB LED, use ColorLed.findColorLed()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YColorLed object, corresponding to
     *         an RGB LED currently online, or a null pointer
     *         if there are no more RGB LEDs to enumerate.
     */
    function YColorLed_nextColorLed()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YColorLed.FindColorLed(next_hwid);
    }

    /**
     * Starts the enumeration of RGB LEDs currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB LEDs.
     *
     * @return a pointer to a YColorLed object, corresponding to
     *         the first RGB LED currently online, or a null pointer
     *         if there are none.
     */
    function YColorLed_FirstColorLed()
    {
        var next_hwid = YAPI.getFirstHardwareId('ColorLed');
        if(next_hwid == null) return null;
        return YColorLed.FindColorLed(next_hwid);
    }

    //--- (end of YColorLed implementation)

    //--- (YColorLed initialization)
    YColorLed = YFunction._Subclass(_YColorLed, {
        // Constants
        RGBCOLOR_INVALID            : YAPI_INVALID_UINT,
        HSLCOLOR_INVALID            : YAPI_INVALID_UINT,
        RGBCOLORATPOWERON_INVALID   : YAPI_INVALID_UINT,
        BLINKSEQSIZE_INVALID        : YAPI_INVALID_UINT,
        BLINKSEQMAXSIZE_INVALID     : YAPI_INVALID_UINT,
        BLINKSEQSIGNATURE_INVALID   : YAPI_INVALID_UINT,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindColorLed                : YColorLed_FindColorLed,
        FirstColorLed               : YColorLed_FirstColorLed
    }, {
        // Methods
        get_rgbColor                : YColorLed_get_rgbColor,
        rgbColor                    : YColorLed_get_rgbColor,
        get_rgbColor_async          : YColorLed_get_rgbColor_async,
        rgbColor_async              : YColorLed_get_rgbColor_async,
        set_rgbColor                : YColorLed_set_rgbColor,
        setRgbColor                 : YColorLed_set_rgbColor,
        get_hslColor                : YColorLed_get_hslColor,
        hslColor                    : YColorLed_get_hslColor,
        get_hslColor_async          : YColorLed_get_hslColor_async,
        hslColor_async              : YColorLed_get_hslColor_async,
        set_hslColor                : YColorLed_set_hslColor,
        setHslColor                 : YColorLed_set_hslColor,
        get_rgbMove                 : YColorLed_get_rgbMove,
        get_rgbMove_async           : YColorLed_get_rgbMove_async,
        rgbMove_async               : YColorLed_get_rgbMove_async,
        set_rgbMove                 : YColorLed_set_rgbMove,
        setRgbMove                  : YColorLed_set_rgbMove,
        rgbMove                     : YColorLed_rgbMove,
        get_hslMove                 : YColorLed_get_hslMove,
        get_hslMove_async           : YColorLed_get_hslMove_async,
        hslMove_async               : YColorLed_get_hslMove_async,
        set_hslMove                 : YColorLed_set_hslMove,
        setHslMove                  : YColorLed_set_hslMove,
        hslMove                     : YColorLed_hslMove,
        get_rgbColorAtPowerOn       : YColorLed_get_rgbColorAtPowerOn,
        rgbColorAtPowerOn           : YColorLed_get_rgbColorAtPowerOn,
        get_rgbColorAtPowerOn_async : YColorLed_get_rgbColorAtPowerOn_async,
        rgbColorAtPowerOn_async     : YColorLed_get_rgbColorAtPowerOn_async,
        set_rgbColorAtPowerOn       : YColorLed_set_rgbColorAtPowerOn,
        setRgbColorAtPowerOn        : YColorLed_set_rgbColorAtPowerOn,
        get_blinkSeqSize            : YColorLed_get_blinkSeqSize,
        blinkSeqSize                : YColorLed_get_blinkSeqSize,
        get_blinkSeqSize_async      : YColorLed_get_blinkSeqSize_async,
        blinkSeqSize_async          : YColorLed_get_blinkSeqSize_async,
        get_blinkSeqMaxSize         : YColorLed_get_blinkSeqMaxSize,
        blinkSeqMaxSize             : YColorLed_get_blinkSeqMaxSize,
        get_blinkSeqMaxSize_async   : YColorLed_get_blinkSeqMaxSize_async,
        blinkSeqMaxSize_async       : YColorLed_get_blinkSeqMaxSize_async,
        get_blinkSeqSignature       : YColorLed_get_blinkSeqSignature,
        blinkSeqSignature           : YColorLed_get_blinkSeqSignature,
        get_blinkSeqSignature_async : YColorLed_get_blinkSeqSignature_async,
        blinkSeqSignature_async     : YColorLed_get_blinkSeqSignature_async,
        get_command                 : YColorLed_get_command,
        command                     : YColorLed_get_command,
        get_command_async           : YColorLed_get_command_async,
        command_async               : YColorLed_get_command_async,
        set_command                 : YColorLed_set_command,
        setCommand                  : YColorLed_set_command,
        sendCommand                 : YColorLed_sendCommand,
        addHslMoveToBlinkSeq        : YColorLed_addHslMoveToBlinkSeq,
        addRgbMoveToBlinkSeq        : YColorLed_addRgbMoveToBlinkSeq,
        startBlinkSeq               : YColorLed_startBlinkSeq,
        stopBlinkSeq                : YColorLed_stopBlinkSeq,
        resetBlinkSeq               : YColorLed_resetBlinkSeq,
        saveLedsConfigAtPowerOn     : YColorLed_saveLedsConfigAtPowerOn,
        nextColorLed                : YColorLed_nextColorLed,
        _parseAttr                  : YColorLed_parseAttr
    });
    //--- (end of YColorLed initialization)
})();

//--- (YColorLed functions)

/**
 * Retrieves an RGB LED for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the RGB LED is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YColorLed.isOnline() to test if the RGB LED is
 * indeed online at a given time. In case of ambiguity when looking for
 * an RGB LED by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the RGB LED, for instance
 *         YRGBLED2.colorLed1.
 *
 * @return a YColorLed object allowing you to drive the RGB LED.
 */
function yFindColorLed(func)
{
    return YColorLed.FindColorLed(func);
}

/**
 * Starts the enumeration of RGB LEDs currently accessible.
 * Use the method YColorLed.nextColorLed() to iterate on
 * next RGB LEDs.
 *
 * @return a pointer to a YColorLed object, corresponding to
 *         the first RGB LED currently online, or a null pointer
 *         if there are none.
 */
function yFirstColorLed()
{
    return YColorLed.FirstColorLed();
}

//--- (end of YColorLed functions)
