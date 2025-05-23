/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for DigitalIO functions
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

//--- (YDigitalIO return codes)
//--- (end of YDigitalIO return codes)
//--- (YDigitalIO definitions)
var Y_OUTPUTVOLTAGE_USB_5V          = 0;
var Y_OUTPUTVOLTAGE_USB_3V          = 1;
var Y_OUTPUTVOLTAGE_EXT_V           = 2;
var Y_OUTPUTVOLTAGE_INVALID         = -1;
var Y_PORTSTATE_INVALID             = YAPI_INVALID_UINT;
var Y_PORTDIRECTION_INVALID         = YAPI_INVALID_UINT;
var Y_PORTOPENDRAIN_INVALID         = YAPI_INVALID_UINT;
var Y_PORTPOLARITY_INVALID          = YAPI_INVALID_UINT;
var Y_PORTDIAGS_INVALID             = YAPI_INVALID_UINT;
var Y_PORTSIZE_INVALID              = YAPI_INVALID_UINT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YDigitalIO definitions)

//--- (YDigitalIO class start)
/**
 * YDigitalIO Class: digital IO port control interface, available for instance in the Yocto-IO or the
 * Yocto-Maxi-IO-V2
 *
 * The YDigitalIO class allows you drive a Yoctopuce digital input/output port.
 * It can be used to set up the direction of each channel, to read the state of each channel
 * and to switch the state of each channel configures as an output.
 * You can work on all channels at once, or one by one. Most functions
 * use a binary representation for channels where bit 0 matches channel #0 , bit 1 matches channel
 * #1 and so on. If you are not familiar with numbers binary representation, you will find more
 * information here: https://en.wikipedia.org/wiki/Binary_number#Representation. It is also possible
 * to automatically generate short pulses of a determined duration. Electrical behavior
 * of each I/O can be modified (open drain and reverse polarity).
 */
//--- (end of YDigitalIO class start)

var YDigitalIO; // definition below
(function()
{
    function _YDigitalIO(str_func)
    {
        //--- (YDigitalIO constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'DigitalIO';

        this._portState                      = Y_PORTSTATE_INVALID;        // BitByte
        this._portDirection                  = Y_PORTDIRECTION_INVALID;    // BitByte
        this._portOpenDrain                  = Y_PORTOPENDRAIN_INVALID;    // BitByte
        this._portPolarity                   = Y_PORTPOLARITY_INVALID;     // BitByte
        this._portDiags                      = Y_PORTDIAGS_INVALID;        // DigitalIODiags
        this._portSize                       = Y_PORTSIZE_INVALID;         // UInt31
        this._outputVoltage                  = Y_OUTPUTVOLTAGE_INVALID;    // IOVoltage
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YDigitalIO constructor)
    }

    //--- (YDigitalIO implementation)

    function YDigitalIO_parseAttr(name, val, _super)
    {
        switch(name) {
        case "portState":
            this._portState = parseInt(val);
            return 1;
        case "portDirection":
            this._portDirection = parseInt(val);
            return 1;
        case "portOpenDrain":
            this._portOpenDrain = parseInt(val);
            return 1;
        case "portPolarity":
            this._portPolarity = parseInt(val);
            return 1;
        case "portDiags":
            this._portDiags = parseInt(val);
            return 1;
        case "portSize":
            this._portSize = parseInt(val);
            return 1;
        case "outputVoltage":
            this._outputVoltage = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the digital IO port state as an integer with each bit
     * representing a channel.
     * value 0 = 0b00000000 -> all channels are OFF
     * value 1 = 0b00000001 -> channel #0 is ON
     * value 2 = 0b00000010 -> channel #1 is ON
     * value 3 = 0b00000011 -> channels #0 and #1 are ON
     * value 4 = 0b00000100 -> channel #2 is ON
     * and so on...
     *
     * @return an integer corresponding to the digital IO port state as an integer with each bit
     *         representing a channel
     *
     * On failure, throws an exception or returns YDigitalIO.PORTSTATE_INVALID.
     */
    function YDigitalIO_get_portState()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PORTSTATE_INVALID;
            }
        }
        res = this._portState;
        return res;
    }

    /**
     * Gets the digital IO port state as an integer with each bit
     * representing a channel.
     * value 0 = 0b00000000 -> all channels are OFF
     * value 1 = 0b00000001 -> channel #0 is ON
     * value 2 = 0b00000010 -> channel #1 is ON
     * value 3 = 0b00000011 -> channels #0 and #1 are ON
     * value 4 = 0b00000100 -> channel #2 is ON
     * and so on...
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDigitalIO object that invoked the callback
     *         - the result:an integer corresponding to the digital IO port state as an integer with each bit
     *         representing a channel
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDigitalIO.PORTSTATE_INVALID.
     */
    function YDigitalIO_get_portState_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PORTSTATE_INVALID);
            } else {
                callback(context, obj, obj._portState);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the state of all digital IO port's channels at once: the parameter
     * is an integer where each bit represents a channel, with bit 0 matching channel #0.
     * To set all channels to  0 -> 0b00000000 -> parameter = 0
     * To set channel #0 to 1 -> 0b00000001 -> parameter =  1
     * To set channel #1 to  1 -> 0b00000010 -> parameter = 2
     * To set channel #0 and #1 -> 0b00000011 -> parameter =  3
     * To set channel #2 to 1 -> 0b00000100 -> parameter =  4
     * an so on....
     * Only channels configured as outputs will be affecter, according to the value
     * configured using set_portDirection.
     *
     * @param newval : an integer corresponding to the state of all digital IO port's channels at once: the parameter
     *         is an integer where each bit represents a channel, with bit 0 matching channel #0
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_portState(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('portState',rest_val);
    }

    /**
     * Returns the I/O direction of all channels of the port (bitmap): 0 makes a bit an input, 1 makes it an output.
     *
     * @return an integer corresponding to the I/O direction of all channels of the port (bitmap): 0 makes
     * a bit an input, 1 makes it an output
     *
     * On failure, throws an exception or returns YDigitalIO.PORTDIRECTION_INVALID.
     */
    function YDigitalIO_get_portDirection()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PORTDIRECTION_INVALID;
            }
        }
        res = this._portDirection;
        return res;
    }

    /**
     * Gets the I/O direction of all channels of the port (bitmap): 0 makes a bit an input, 1 makes it an output.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDigitalIO object that invoked the callback
     *         - the result:an integer corresponding to the I/O direction of all channels of the port (bitmap): 0
     *         makes a bit an input, 1 makes it an output
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDigitalIO.PORTDIRECTION_INVALID.
     */
    function YDigitalIO_get_portDirection_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PORTDIRECTION_INVALID);
            } else {
                callback(context, obj, obj._portDirection);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the I/O direction of all channels of the port (bitmap): 0 makes a bit an input, 1 makes it an output.
     * Remember to call the saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval : an integer corresponding to the I/O direction of all channels of the port (bitmap):
     * 0 makes a bit an input, 1 makes it an output
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_portDirection(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('portDirection',rest_val);
    }

    /**
     * Returns the electrical interface for each bit of the port. For each bit set to 0  the matching I/O
     * works in the regular,
     * intuitive way, for each bit set to 1, the I/O works in reverse mode.
     *
     * @return an integer corresponding to the electrical interface for each bit of the port
     *
     * On failure, throws an exception or returns YDigitalIO.PORTOPENDRAIN_INVALID.
     */
    function YDigitalIO_get_portOpenDrain()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PORTOPENDRAIN_INVALID;
            }
        }
        res = this._portOpenDrain;
        return res;
    }

    /**
     * Gets the electrical interface for each bit of the port. For each bit set to 0  the matching I/O
     * works in the regular,
     * intuitive way, for each bit set to 1, the I/O works in reverse mode.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDigitalIO object that invoked the callback
     *         - the result:an integer corresponding to the electrical interface for each bit of the port
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDigitalIO.PORTOPENDRAIN_INVALID.
     */
    function YDigitalIO_get_portOpenDrain_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PORTOPENDRAIN_INVALID);
            } else {
                callback(context, obj, obj._portOpenDrain);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the electrical interface for each bit of the port. 0 makes a bit a regular input/output, 1 makes
     * it an open-drain (open-collector) input/output. Remember to call the
     * saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval : an integer corresponding to the electrical interface for each bit of the port
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_portOpenDrain(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('portOpenDrain',rest_val);
    }

    /**
     * Returns the polarity of all the bits of the port.  For each bit set to 0, the matching I/O works the regular,
     * intuitive way; for each bit set to 1, the I/O works in reverse mode.
     *
     * @return an integer corresponding to the polarity of all the bits of the port
     *
     * On failure, throws an exception or returns YDigitalIO.PORTPOLARITY_INVALID.
     */
    function YDigitalIO_get_portPolarity()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PORTPOLARITY_INVALID;
            }
        }
        res = this._portPolarity;
        return res;
    }

    /**
     * Gets the polarity of all the bits of the port.  For each bit set to 0, the matching I/O works the regular,
     * intuitive way; for each bit set to 1, the I/O works in reverse mode.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDigitalIO object that invoked the callback
     *         - the result:an integer corresponding to the polarity of all the bits of the port
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDigitalIO.PORTPOLARITY_INVALID.
     */
    function YDigitalIO_get_portPolarity_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PORTPOLARITY_INVALID);
            } else {
                callback(context, obj, obj._portPolarity);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the polarity of all the bits of the port: For each bit set to 0, the matching I/O works the regular,
     * intuitive way; for each bit set to 1, the I/O works in reverse mode.
     * Remember to call the saveToFlash() method  to make sure the setting will be kept after a reboot.
     *
     * @param newval : an integer corresponding to the polarity of all the bits of the port: For each bit
     * set to 0, the matching I/O works the regular,
     *         intuitive way; for each bit set to 1, the I/O works in reverse mode
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_portPolarity(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('portPolarity',rest_val);
    }

    /**
     * Returns the port state diagnostics. Bit 0 indicates a shortcut on output 0, etc.
     * Bit 8 indicates a power failure, and bit 9 signals overheating (overcurrent).
     * During normal use, all diagnostic bits should stay clear.
     *
     * @return an integer corresponding to the port state diagnostics
     *
     * On failure, throws an exception or returns YDigitalIO.PORTDIAGS_INVALID.
     */
    function YDigitalIO_get_portDiags()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PORTDIAGS_INVALID;
            }
        }
        res = this._portDiags;
        return res;
    }

    /**
     * Gets the port state diagnostics. Bit 0 indicates a shortcut on output 0, etc.
     * Bit 8 indicates a power failure, and bit 9 signals overheating (overcurrent).
     * During normal use, all diagnostic bits should stay clear.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDigitalIO object that invoked the callback
     *         - the result:an integer corresponding to the port state diagnostics
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDigitalIO.PORTDIAGS_INVALID.
     */
    function YDigitalIO_get_portDiags_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PORTDIAGS_INVALID);
            } else {
                callback(context, obj, obj._portDiags);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of bits (i.e. channels)implemented in the I/O port.
     *
     * @return an integer corresponding to the number of bits (i.e
     *
     * On failure, throws an exception or returns YDigitalIO.PORTSIZE_INVALID.
     */
    function YDigitalIO_get_portSize()
    {
        var res;                    // int;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PORTSIZE_INVALID;
            }
        }
        res = this._portSize;
        return res;
    }

    /**
     * Gets the number of bits (i.e. channels)implemented in the I/O port.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDigitalIO object that invoked the callback
     *         - the result:an integer corresponding to the number of bits (i.e
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDigitalIO.PORTSIZE_INVALID.
     */
    function YDigitalIO_get_portSize_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PORTSIZE_INVALID);
            } else {
                callback(context, obj, obj._portSize);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the voltage source used to drive output bits.
     *
     * @return a value among YDigitalIO.OUTPUTVOLTAGE_USB_5V, YDigitalIO.OUTPUTVOLTAGE_USB_3V and
     * YDigitalIO.OUTPUTVOLTAGE_EXT_V corresponding to the voltage source used to drive output bits
     *
     * On failure, throws an exception or returns YDigitalIO.OUTPUTVOLTAGE_INVALID.
     */
    function YDigitalIO_get_outputVoltage()
    {
        var res;                    // enumIOVOLTAGE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_OUTPUTVOLTAGE_INVALID;
            }
        }
        res = this._outputVoltage;
        return res;
    }

    /**
     * Gets the voltage source used to drive output bits.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDigitalIO object that invoked the callback
     *         - the result:a value among YDigitalIO.OUTPUTVOLTAGE_USB_5V, YDigitalIO.OUTPUTVOLTAGE_USB_3V and
     *         YDigitalIO.OUTPUTVOLTAGE_EXT_V corresponding to the voltage source used to drive output bits
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YDigitalIO.OUTPUTVOLTAGE_INVALID.
     */
    function YDigitalIO_get_outputVoltage_async(callback,context)
    {
        var res;                    // enumIOVOLTAGE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_OUTPUTVOLTAGE_INVALID);
            } else {
                callback(context, obj, obj._outputVoltage);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the voltage source used to drive output bits.
     * Remember to call the saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval : a value among YDigitalIO.OUTPUTVOLTAGE_USB_5V, YDigitalIO.OUTPUTVOLTAGE_USB_3V and
     * YDigitalIO.OUTPUTVOLTAGE_EXT_V corresponding to the voltage source used to drive output bits
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_outputVoltage(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('outputVoltage',rest_val);
    }

    function YDigitalIO_get_command()
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
     *         - the YDigitalIO object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YDigitalIO_get_command_async(callback,context)
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

    function YDigitalIO_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a digital IO port for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the digital IO port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDigitalIO.isOnline() to test if the digital IO port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a digital IO port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the digital IO port, for instance
     *         YMINIIO0.digitalIO.
     *
     * @return a YDigitalIO object allowing you to drive the digital IO port.
     */
    function YDigitalIO_FindDigitalIO(func)                     // class method
    {
        var obj;                    // YDigitalIO;
        obj = YFunction._FindFromCache("DigitalIO", func);
        if (obj == null) {
            obj = new YDigitalIO(func);
            YFunction._AddToCache("DigitalIO", func, obj);
        }
        return obj;
    }

    /**
     * Sets a single bit (i.e. channel) of the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param bitstate : the state of the bit (1 or 0)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_bitState(bitno,bitstate)
    {
        if (!(bitstate >= 0)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"invalid bit state",YAPI_INVALID_ARGUMENT);
        }
        if (!(bitstate <= 1)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"invalid bit state",YAPI_INVALID_ARGUMENT);
        }
        return this.set_command(""+String.fromCharCode(82+bitstate)+""+String(Math.round(bitno)));
    }

    /**
     * Returns the state of a single bit (i.e. channel)  of the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return the bit state (0 or 1)
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_get_bitState(bitno)
    {
        var portVal;                // int;
        portVal = this.get_portState();
        return ((portVal >> bitno) & 1);
    }

    /**
     * Reverts a single bit (i.e. channel) of the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_toggle_bitState(bitno)
    {
        return this.set_command("T"+String(Math.round(bitno)));
    }

    /**
     * Changes  the direction of a single bit (i.e. channel) from the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param bitdirection : direction to set, 0 makes the bit an input, 1 makes it an output.
     *         Remember to call the   saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_bitDirection(bitno,bitdirection)
    {
        if (!(bitdirection >= 0)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"invalid direction",YAPI_INVALID_ARGUMENT);
        }
        if (!(bitdirection <= 1)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"invalid direction",YAPI_INVALID_ARGUMENT);
        }
        return this.set_command(""+String.fromCharCode(73+6*bitdirection)+""+String(Math.round(bitno)));
    }

    /**
     * Returns the direction of a single bit (i.e. channel) from the I/O port (0 means the bit is an
     * input, 1  an output).
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_get_bitDirection(bitno)
    {
        var portDir;                // int;
        portDir = this.get_portDirection();
        return ((portDir >> bitno) & 1);
    }

    /**
     * Changes the polarity of a single bit from the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0.
     * @param bitpolarity : polarity to set, 0 makes the I/O work in regular mode, 1 makes the I/O  works
     * in reverse mode.
     *         Remember to call the   saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_bitPolarity(bitno,bitpolarity)
    {
        if (!(bitpolarity >= 0)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"invalid bit polarity",YAPI_INVALID_ARGUMENT);
        }
        if (!(bitpolarity <= 1)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"invalid bit polarity",YAPI_INVALID_ARGUMENT);
        }
        return this.set_command(""+String.fromCharCode(110+4*bitpolarity)+""+String(Math.round(bitno)));
    }

    /**
     * Returns the polarity of a single bit from the I/O port (0 means the I/O works in regular mode, 1
     * means the I/O  works in reverse mode).
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_get_bitPolarity(bitno)
    {
        var portPol;                // int;
        portPol = this.get_portPolarity();
        return ((portPol >> bitno) & 1);
    }

    /**
     * Changes  the electrical interface of a single bit from the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param opendrain : 0 makes a bit a regular input/output, 1 makes
     *         it an open-drain (open-collector) input/output. Remember to call the
     *         saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_bitOpenDrain(bitno,opendrain)
    {
        if (!(opendrain >= 0)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"invalid state",YAPI_INVALID_ARGUMENT);
        }
        if (!(opendrain <= 1)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"invalid state",YAPI_INVALID_ARGUMENT);
        }
        return this.set_command(""+String.fromCharCode(100-32*opendrain)+""+String(Math.round(bitno)));
    }

    /**
     * Returns the type of electrical interface of a single bit from the I/O port. (0 means the bit is an
     * input, 1  an output).
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return   0 means the a bit is a regular input/output, 1 means the bit is an open-drain
     *         (open-collector) input/output.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_get_bitOpenDrain(bitno)
    {
        var portOpenDrain;          // int;
        portOpenDrain = this.get_portOpenDrain();
        return ((portOpenDrain >> bitno) & 1);
    }

    /**
     * Triggers a pulse on a single bit for a specified duration. The specified bit
     * will be turned to 1, and then back to 0 after the given duration.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param ms_duration : desired pulse duration in milliseconds. Be aware that the device time
     *         resolution is not guaranteed up to the millisecond.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_pulse(bitno,ms_duration)
    {
        return this.set_command("Z"+String(Math.round(bitno))+",0,"+String(Math.round(ms_duration)));
    }

    /**
     * Schedules a pulse on a single bit for a specified duration. The specified bit
     * will be turned to 1, and then back to 0 after the given duration.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param ms_delay : waiting time before the pulse, in milliseconds
     * @param ms_duration : desired pulse duration in milliseconds. Be aware that the device time
     *         resolution is not guaranteed up to the millisecond.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_delayedPulse(bitno,ms_delay,ms_duration)
    {
        return this.set_command("Z"+String(Math.round(bitno))+","+String(Math.round(ms_delay))+","+String(Math.round(ms_duration)));
    }

    /**
     * Continues the enumeration of digital IO ports started using yFirstDigitalIO().
     * Caution: You can't make any assumption about the returned digital IO ports order.
     * If you want to find a specific a digital IO port, use DigitalIO.findDigitalIO()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YDigitalIO object, corresponding to
     *         a digital IO port currently online, or a null pointer
     *         if there are no more digital IO ports to enumerate.
     */
    function YDigitalIO_nextDigitalIO()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YDigitalIO.FindDigitalIO(next_hwid);
    }

    /**
     * Starts the enumeration of digital IO ports currently accessible.
     * Use the method YDigitalIO.nextDigitalIO() to iterate on
     * next digital IO ports.
     *
     * @return a pointer to a YDigitalIO object, corresponding to
     *         the first digital IO port currently online, or a null pointer
     *         if there are none.
     */
    function YDigitalIO_FirstDigitalIO()
    {
        var next_hwid = YAPI.getFirstHardwareId('DigitalIO');
        if(next_hwid == null) return null;
        return YDigitalIO.FindDigitalIO(next_hwid);
    }

    //--- (end of YDigitalIO implementation)

    //--- (YDigitalIO initialization)
    YDigitalIO = YFunction._Subclass(_YDigitalIO, {
        // Constants
        PORTSTATE_INVALID           : YAPI_INVALID_UINT,
        PORTDIRECTION_INVALID       : YAPI_INVALID_UINT,
        PORTOPENDRAIN_INVALID       : YAPI_INVALID_UINT,
        PORTPOLARITY_INVALID        : YAPI_INVALID_UINT,
        PORTDIAGS_INVALID           : YAPI_INVALID_UINT,
        PORTSIZE_INVALID            : YAPI_INVALID_UINT,
        OUTPUTVOLTAGE_USB_5V        : 0,
        OUTPUTVOLTAGE_USB_3V        : 1,
        OUTPUTVOLTAGE_EXT_V         : 2,
        OUTPUTVOLTAGE_INVALID       : -1,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindDigitalIO               : YDigitalIO_FindDigitalIO,
        FirstDigitalIO              : YDigitalIO_FirstDigitalIO
    }, {
        // Methods
        get_portState               : YDigitalIO_get_portState,
        portState                   : YDigitalIO_get_portState,
        get_portState_async         : YDigitalIO_get_portState_async,
        portState_async             : YDigitalIO_get_portState_async,
        set_portState               : YDigitalIO_set_portState,
        setPortState                : YDigitalIO_set_portState,
        get_portDirection           : YDigitalIO_get_portDirection,
        portDirection               : YDigitalIO_get_portDirection,
        get_portDirection_async     : YDigitalIO_get_portDirection_async,
        portDirection_async         : YDigitalIO_get_portDirection_async,
        set_portDirection           : YDigitalIO_set_portDirection,
        setPortDirection            : YDigitalIO_set_portDirection,
        get_portOpenDrain           : YDigitalIO_get_portOpenDrain,
        portOpenDrain               : YDigitalIO_get_portOpenDrain,
        get_portOpenDrain_async     : YDigitalIO_get_portOpenDrain_async,
        portOpenDrain_async         : YDigitalIO_get_portOpenDrain_async,
        set_portOpenDrain           : YDigitalIO_set_portOpenDrain,
        setPortOpenDrain            : YDigitalIO_set_portOpenDrain,
        get_portPolarity            : YDigitalIO_get_portPolarity,
        portPolarity                : YDigitalIO_get_portPolarity,
        get_portPolarity_async      : YDigitalIO_get_portPolarity_async,
        portPolarity_async          : YDigitalIO_get_portPolarity_async,
        set_portPolarity            : YDigitalIO_set_portPolarity,
        setPortPolarity             : YDigitalIO_set_portPolarity,
        get_portDiags               : YDigitalIO_get_portDiags,
        portDiags                   : YDigitalIO_get_portDiags,
        get_portDiags_async         : YDigitalIO_get_portDiags_async,
        portDiags_async             : YDigitalIO_get_portDiags_async,
        get_portSize                : YDigitalIO_get_portSize,
        portSize                    : YDigitalIO_get_portSize,
        get_portSize_async          : YDigitalIO_get_portSize_async,
        portSize_async              : YDigitalIO_get_portSize_async,
        get_outputVoltage           : YDigitalIO_get_outputVoltage,
        outputVoltage               : YDigitalIO_get_outputVoltage,
        get_outputVoltage_async     : YDigitalIO_get_outputVoltage_async,
        outputVoltage_async         : YDigitalIO_get_outputVoltage_async,
        set_outputVoltage           : YDigitalIO_set_outputVoltage,
        setOutputVoltage            : YDigitalIO_set_outputVoltage,
        get_command                 : YDigitalIO_get_command,
        command                     : YDigitalIO_get_command,
        get_command_async           : YDigitalIO_get_command_async,
        command_async               : YDigitalIO_get_command_async,
        set_command                 : YDigitalIO_set_command,
        setCommand                  : YDigitalIO_set_command,
        set_bitState                : YDigitalIO_set_bitState,
        setBitState                 : YDigitalIO_set_bitState,
        get_bitState                : YDigitalIO_get_bitState,
        bitState                    : YDigitalIO_get_bitState,
        toggle_bitState             : YDigitalIO_toggle_bitState,
        set_bitDirection            : YDigitalIO_set_bitDirection,
        setBitDirection             : YDigitalIO_set_bitDirection,
        get_bitDirection            : YDigitalIO_get_bitDirection,
        bitDirection                : YDigitalIO_get_bitDirection,
        set_bitPolarity             : YDigitalIO_set_bitPolarity,
        setBitPolarity              : YDigitalIO_set_bitPolarity,
        get_bitPolarity             : YDigitalIO_get_bitPolarity,
        bitPolarity                 : YDigitalIO_get_bitPolarity,
        set_bitOpenDrain            : YDigitalIO_set_bitOpenDrain,
        setBitOpenDrain             : YDigitalIO_set_bitOpenDrain,
        get_bitOpenDrain            : YDigitalIO_get_bitOpenDrain,
        bitOpenDrain                : YDigitalIO_get_bitOpenDrain,
        pulse                       : YDigitalIO_pulse,
        delayedPulse                : YDigitalIO_delayedPulse,
        nextDigitalIO               : YDigitalIO_nextDigitalIO,
        _parseAttr                  : YDigitalIO_parseAttr
    });
    //--- (end of YDigitalIO initialization)
})();

//--- (YDigitalIO functions)

/**
 * Retrieves a digital IO port for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the digital IO port is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDigitalIO.isOnline() to test if the digital IO port is
 * indeed online at a given time. In case of ambiguity when looking for
 * a digital IO port by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the digital IO port, for instance
 *         YMINIIO0.digitalIO.
 *
 * @return a YDigitalIO object allowing you to drive the digital IO port.
 */
function yFindDigitalIO(func)
{
    return YDigitalIO.FindDigitalIO(func);
}

/**
 * Starts the enumeration of digital IO ports currently accessible.
 * Use the method YDigitalIO.nextDigitalIO() to iterate on
 * next digital IO ports.
 *
 * @return a pointer to a YDigitalIO object, corresponding to
 *         the first digital IO port currently online, or a null pointer
 *         if there are none.
 */
function yFirstDigitalIO()
{
    return YDigitalIO.FirstDigitalIO();
}

//--- (end of YDigitalIO functions)
