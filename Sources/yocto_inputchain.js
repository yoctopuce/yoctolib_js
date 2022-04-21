/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for InputChain functions
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

//--- (YInputChain return codes)
//--- (end of YInputChain return codes)
//--- (YInputChain definitions)
var Y_LOOPBACKTEST_OFF              = 0;
var Y_LOOPBACKTEST_ON               = 1;
var Y_LOOPBACKTEST_INVALID          = -1;
var Y_EXPECTEDNODES_INVALID         = YAPI_INVALID_UINT;
var Y_DETECTEDNODES_INVALID         = YAPI_INVALID_UINT;
var Y_REFRESHRATE_INVALID           = YAPI_INVALID_UINT;
var Y_BITCHAIN1_INVALID             = YAPI_INVALID_STRING;
var Y_BITCHAIN2_INVALID             = YAPI_INVALID_STRING;
var Y_BITCHAIN3_INVALID             = YAPI_INVALID_STRING;
var Y_BITCHAIN4_INVALID             = YAPI_INVALID_STRING;
var Y_BITCHAIN5_INVALID             = YAPI_INVALID_STRING;
var Y_BITCHAIN6_INVALID             = YAPI_INVALID_STRING;
var Y_BITCHAIN7_INVALID             = YAPI_INVALID_STRING;
var Y_WATCHDOGPERIOD_INVALID        = YAPI_INVALID_UINT;
var Y_CHAINDIAGS_INVALID            = YAPI_INVALID_UINT;
//--- (end of YInputChain definitions)

function yInternalEventCallback(YInputChain_inputChain, str_value)
{
    YInputChain_inputChain._internalEventHandler(str_value);
}

//--- (YInputChain class start)
/**
 * YInputChain Class: InputChain function interface
 *
 * The YInputChain class provides access to separate
 * digital inputs connected in a chain.
 */
//--- (end of YInputChain class start)

var YInputChain; // definition below
(function()
{
    function _YInputChain(str_func)
    {
        //--- (YInputChain constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'InputChain';

        this._expectedNodes                  = Y_EXPECTEDNODES_INVALID;    // UInt31
        this._detectedNodes                  = Y_DETECTEDNODES_INVALID;    // UInt31
        this._loopbackTest                   = Y_LOOPBACKTEST_INVALID;     // OnOff
        this._refreshRate                    = Y_REFRESHRATE_INVALID;      // UInt31
        this._bitChain1                      = Y_BITCHAIN1_INVALID;        // Text
        this._bitChain2                      = Y_BITCHAIN2_INVALID;        // Text
        this._bitChain3                      = Y_BITCHAIN3_INVALID;        // Text
        this._bitChain4                      = Y_BITCHAIN4_INVALID;        // Text
        this._bitChain5                      = Y_BITCHAIN5_INVALID;        // Text
        this._bitChain6                      = Y_BITCHAIN6_INVALID;        // Text
        this._bitChain7                      = Y_BITCHAIN7_INVALID;        // Text
        this._watchdogPeriod                 = Y_WATCHDOGPERIOD_INVALID;   // UInt31
        this._chainDiags                     = Y_CHAINDIAGS_INVALID;       // InputChainDiags
        this._eventCallback                  = null;                       // YEventCallback
        this._prevPos                        = 0;                          // int
        this._eventPos                       = 0;                          // int
        this._eventStamp                     = 0;                          // int
        this._eventChains                    = [];                         // strArr
        //--- (end of YInputChain constructor)
    }

    //--- (YInputChain implementation)

    function YInputChain_parseAttr(name, val, _super)
    {
        switch(name) {
        case "expectedNodes":
            this._expectedNodes = parseInt(val);
            return 1;
        case "detectedNodes":
            this._detectedNodes = parseInt(val);
            return 1;
        case "loopbackTest":
            this._loopbackTest = parseInt(val);
            return 1;
        case "refreshRate":
            this._refreshRate = parseInt(val);
            return 1;
        case "bitChain1":
            this._bitChain1 = val;
            return 1;
        case "bitChain2":
            this._bitChain2 = val;
            return 1;
        case "bitChain3":
            this._bitChain3 = val;
            return 1;
        case "bitChain4":
            this._bitChain4 = val;
            return 1;
        case "bitChain5":
            this._bitChain5 = val;
            return 1;
        case "bitChain6":
            this._bitChain6 = val;
            return 1;
        case "bitChain7":
            this._bitChain7 = val;
            return 1;
        case "watchdogPeriod":
            this._watchdogPeriod = parseInt(val);
            return 1;
        case "chainDiags":
            this._chainDiags = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the number of nodes expected in the chain.
     *
     * @return an integer corresponding to the number of nodes expected in the chain
     *
     * On failure, throws an exception or returns YInputChain.EXPECTEDNODES_INVALID.
     */
    function YInputChain_get_expectedNodes()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_EXPECTEDNODES_INVALID;
            }
        }
        res = this._expectedNodes;
        return res;
    }

    /**
     * Gets the number of nodes expected in the chain.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:an integer corresponding to the number of nodes expected in the chain
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.EXPECTEDNODES_INVALID.
     */
    function YInputChain_get_expectedNodes_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_EXPECTEDNODES_INVALID);
            } else {
                callback(context, obj, obj._expectedNodes);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the number of nodes expected in the chain.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the number of nodes expected in the chain
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YInputChain_set_expectedNodes(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('expectedNodes',rest_val);
    }

    /**
     * Returns the number of nodes detected in the chain.
     *
     * @return an integer corresponding to the number of nodes detected in the chain
     *
     * On failure, throws an exception or returns YInputChain.DETECTEDNODES_INVALID.
     */
    function YInputChain_get_detectedNodes()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DETECTEDNODES_INVALID;
            }
        }
        res = this._detectedNodes;
        return res;
    }

    /**
     * Gets the number of nodes detected in the chain.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:an integer corresponding to the number of nodes detected in the chain
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.DETECTEDNODES_INVALID.
     */
    function YInputChain_get_detectedNodes_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DETECTEDNODES_INVALID);
            } else {
                callback(context, obj, obj._detectedNodes);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the activation state of the exhaustive chain connectivity test.
     * The connectivity test requires a cable connecting the end of the chain
     * to the loopback test connector.
     *
     * @return either YInputChain.LOOPBACKTEST_OFF or YInputChain.LOOPBACKTEST_ON, according to the
     * activation state of the exhaustive chain connectivity test
     *
     * On failure, throws an exception or returns YInputChain.LOOPBACKTEST_INVALID.
     */
    function YInputChain_get_loopbackTest()
    {
        var res;                    // enumONOFF;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LOOPBACKTEST_INVALID;
            }
        }
        res = this._loopbackTest;
        return res;
    }

    /**
     * Gets the activation state of the exhaustive chain connectivity test.
     * The connectivity test requires a cable connecting the end of the chain
     * to the loopback test connector.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:either YInputChain.LOOPBACKTEST_OFF or YInputChain.LOOPBACKTEST_ON, according to the
     *         activation state of the exhaustive chain connectivity test
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.LOOPBACKTEST_INVALID.
     */
    function YInputChain_get_loopbackTest_async(callback,context)
    {
        var res;                    // enumONOFF;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LOOPBACKTEST_INVALID);
            } else {
                callback(context, obj, obj._loopbackTest);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the activation state of the exhaustive chain connectivity test.
     * The connectivity test requires a cable connecting the end of the chain
     * to the loopback test connector.
     *
     * @param newval : either YInputChain.LOOPBACKTEST_OFF or YInputChain.LOOPBACKTEST_ON, according to
     * the activation state of the exhaustive chain connectivity test
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YInputChain_set_loopbackTest(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('loopbackTest',rest_val);
    }

    /**
     * Returns the desired refresh rate, measured in Hz.
     * The higher the refresh rate is set, the higher the
     * communication speed on the chain will be.
     *
     * @return an integer corresponding to the desired refresh rate, measured in Hz
     *
     * On failure, throws an exception or returns YInputChain.REFRESHRATE_INVALID.
     */
    function YInputChain_get_refreshRate()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_REFRESHRATE_INVALID;
            }
        }
        res = this._refreshRate;
        return res;
    }

    /**
     * Gets the desired refresh rate, measured in Hz.
     * The higher the refresh rate is set, the higher the
     * communication speed on the chain will be.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:an integer corresponding to the desired refresh rate, measured in Hz
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.REFRESHRATE_INVALID.
     */
    function YInputChain_get_refreshRate_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_REFRESHRATE_INVALID);
            } else {
                callback(context, obj, obj._refreshRate);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the desired refresh rate, measured in Hz.
     * The higher the refresh rate is set, the higher the
     * communication speed on the chain will be.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the desired refresh rate, measured in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YInputChain_set_refreshRate(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('refreshRate',rest_val);
    }

    /**
     * Returns the state of input 1 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 1 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN1_INVALID.
     */
    function YInputChain_get_bitChain1()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BITCHAIN1_INVALID;
            }
        }
        res = this._bitChain1;
        return res;
    }

    /**
     * Gets the state of input 1 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:a string corresponding to the state of input 1 for all nodes of the input chain,
     *         as a hexadecimal string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN1_INVALID.
     */
    function YInputChain_get_bitChain1_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BITCHAIN1_INVALID);
            } else {
                callback(context, obj, obj._bitChain1);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the state of input 2 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 2 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN2_INVALID.
     */
    function YInputChain_get_bitChain2()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BITCHAIN2_INVALID;
            }
        }
        res = this._bitChain2;
        return res;
    }

    /**
     * Gets the state of input 2 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:a string corresponding to the state of input 2 for all nodes of the input chain,
     *         as a hexadecimal string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN2_INVALID.
     */
    function YInputChain_get_bitChain2_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BITCHAIN2_INVALID);
            } else {
                callback(context, obj, obj._bitChain2);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the state of input 3 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 3 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN3_INVALID.
     */
    function YInputChain_get_bitChain3()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BITCHAIN3_INVALID;
            }
        }
        res = this._bitChain3;
        return res;
    }

    /**
     * Gets the state of input 3 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:a string corresponding to the state of input 3 for all nodes of the input chain,
     *         as a hexadecimal string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN3_INVALID.
     */
    function YInputChain_get_bitChain3_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BITCHAIN3_INVALID);
            } else {
                callback(context, obj, obj._bitChain3);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the state of input 4 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 4 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN4_INVALID.
     */
    function YInputChain_get_bitChain4()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BITCHAIN4_INVALID;
            }
        }
        res = this._bitChain4;
        return res;
    }

    /**
     * Gets the state of input 4 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:a string corresponding to the state of input 4 for all nodes of the input chain,
     *         as a hexadecimal string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN4_INVALID.
     */
    function YInputChain_get_bitChain4_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BITCHAIN4_INVALID);
            } else {
                callback(context, obj, obj._bitChain4);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the state of input 5 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 5 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN5_INVALID.
     */
    function YInputChain_get_bitChain5()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BITCHAIN5_INVALID;
            }
        }
        res = this._bitChain5;
        return res;
    }

    /**
     * Gets the state of input 5 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:a string corresponding to the state of input 5 for all nodes of the input chain,
     *         as a hexadecimal string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN5_INVALID.
     */
    function YInputChain_get_bitChain5_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BITCHAIN5_INVALID);
            } else {
                callback(context, obj, obj._bitChain5);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the state of input 6 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 6 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN6_INVALID.
     */
    function YInputChain_get_bitChain6()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BITCHAIN6_INVALID;
            }
        }
        res = this._bitChain6;
        return res;
    }

    /**
     * Gets the state of input 6 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:a string corresponding to the state of input 6 for all nodes of the input chain,
     *         as a hexadecimal string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN6_INVALID.
     */
    function YInputChain_get_bitChain6_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BITCHAIN6_INVALID);
            } else {
                callback(context, obj, obj._bitChain6);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the state of input 7 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @return a string corresponding to the state of input 7 for all nodes of the input chain,
     *         as a hexadecimal string
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN7_INVALID.
     */
    function YInputChain_get_bitChain7()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BITCHAIN7_INVALID;
            }
        }
        res = this._bitChain7;
        return res;
    }

    /**
     * Gets the state of input 7 for all nodes of the input chain,
     * as a hexadecimal string. The node nearest to the controller
     * is the lowest bit of the result.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:a string corresponding to the state of input 7 for all nodes of the input chain,
     *         as a hexadecimal string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.BITCHAIN7_INVALID.
     */
    function YInputChain_get_bitChain7_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BITCHAIN7_INVALID);
            } else {
                callback(context, obj, obj._bitChain7);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the wait time in seconds before triggering an inactivity
     * timeout error.
     *
     * @return an integer corresponding to the wait time in seconds before triggering an inactivity
     *         timeout error
     *
     * On failure, throws an exception or returns YInputChain.WATCHDOGPERIOD_INVALID.
     */
    function YInputChain_get_watchdogPeriod()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_WATCHDOGPERIOD_INVALID;
            }
        }
        res = this._watchdogPeriod;
        return res;
    }

    /**
     * Gets the wait time in seconds before triggering an inactivity
     * timeout error.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:an integer corresponding to the wait time in seconds before triggering an inactivity
     *         timeout error
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.WATCHDOGPERIOD_INVALID.
     */
    function YInputChain_get_watchdogPeriod_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_WATCHDOGPERIOD_INVALID);
            } else {
                callback(context, obj, obj._watchdogPeriod);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the wait time in seconds before triggering an inactivity
     * timeout error. Remember to call the saveToFlash() method
     * of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the wait time in seconds before triggering an inactivity
     *         timeout error
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YInputChain_set_watchdogPeriod(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('watchdogPeriod',rest_val);
    }

    /**
     * Returns the controller state diagnostics. Bit 0 indicates a chain length
     * error, bit 1 indicates an inactivity timeout and bit 2 indicates
     * a loopback test failure.
     *
     * @return an integer corresponding to the controller state diagnostics
     *
     * On failure, throws an exception or returns YInputChain.CHAINDIAGS_INVALID.
     */
    function YInputChain_get_chainDiags()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CHAINDIAGS_INVALID;
            }
        }
        res = this._chainDiags;
        return res;
    }

    /**
     * Gets the controller state diagnostics. Bit 0 indicates a chain length
     * error, bit 1 indicates an inactivity timeout and bit 2 indicates
     * a loopback test failure.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputChain object that invoked the callback
     *         - the result:an integer corresponding to the controller state diagnostics
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputChain.CHAINDIAGS_INVALID.
     */
    function YInputChain_get_chainDiags_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CHAINDIAGS_INVALID);
            } else {
                callback(context, obj, obj._chainDiags);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a digital input chain for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the digital input chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YInputChain.isOnline() to test if the digital input chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a digital input chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the digital input chain, for instance
     *         MyDevice.inputChain.
     *
     * @return a YInputChain object allowing you to drive the digital input chain.
     */
    function YInputChain_FindInputChain(func)                   // class method
    {
        var obj;                    // YInputChain;
        obj = YFunction._FindFromCache("InputChain", func);
        if (obj == null) {
            obj = new YInputChain(func);
            YFunction._AddToCache("InputChain", func, obj);
        }
        return obj;
    }

    /**
     * Resets the application watchdog countdown.
     * If you have setup a non-zero watchdogPeriod, you should
     * call this function on a regular basis to prevent the application
     * inactivity error to be triggered.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YInputChain_resetWatchdog()
    {
        return this.set_watchdogPeriod(-1);
    }

    /**
     * Returns a string with last events observed on the digital input chain.
     * This method return only events that are still buffered in the device memory.
     *
     * @return a string with last events observed (one per line).
     *
     * On failure, throws an exception or returns  YAPI_INVALID_STRING.
     */
    function YInputChain_get_lastEvents()
    {
        var content;                // bin;

        content = this._download("events.txt");
        return content;
    }

    /**
     * Registers a callback function to be called each time that an event is detected on the
     * input chain.
     *
     * @param callback : the callback function to call, or a null pointer.
     *         The callback function should take four arguments:
     *         the YInputChain object that emitted the event, the
     *         UTC timestamp of the event, a character string describing
     *         the type of event and a character string with the event data.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YInputChain_registerEventCallback(callback)
    {
        if (callback != null) {
            this.registerValueCallback(yInternalEventCallback);
        } else {
            this.registerValueCallback(null);
        }
        // register user callback AFTER the internal pseudo-event,
        // to make sure we start with future events only
        this._eventCallback = callback;
        return 0;
    }

    function YInputChain_internalEventHandler(cbpos)
    {
        var newPos;                 // int;
        var url;                    // str;
        var content;                // bin;
        var contentStr;             // str;
        var eventArr = [];          // strArr;
        var arrLen;                 // int;
        var lenStr;                 // str;
        var arrPos;                 // int;
        var eventStr;               // str;
        var eventLen;               // int;
        var hexStamp;               // str;
        var typePos;                // int;
        var dataPos;                // int;
        var evtStamp;               // int;
        var evtType;                // str;
        var evtData;                // str;
        var evtChange;              // str;
        var chainIdx;               // int;
        newPos = YAPI._atoi(cbpos);
        if (newPos < this._prevPos) {
            this._eventPos = 0;
        }
        this._prevPos = newPos;
        if (newPos < this._eventPos) {
            return YAPI_SUCCESS;
        }
        if (!(this._eventCallback != null)) {
            // first simulated event, use it to initialize reference values
            this._eventPos = newPos;
            this._eventChains.length = 0;
            this._eventChains.push(this.get_bitChain1());
            this._eventChains.push(this.get_bitChain2());
            this._eventChains.push(this.get_bitChain3());
            this._eventChains.push(this.get_bitChain4());
            this._eventChains.push(this.get_bitChain5());
            this._eventChains.push(this.get_bitChain6());
            this._eventChains.push(this.get_bitChain7());
            return YAPI_SUCCESS;
        }
        url = "events.txt?pos="+String(Math.round(this._eventPos));

        content = this._download(url);
        contentStr = content;
        eventArr = (contentStr).split('\n');
        arrLen = eventArr.length;
        if (!(arrLen > 0)) {
            return this._throw(YAPI_IO_ERROR,"fail to download events",YAPI_IO_ERROR);
        }
        // last element of array is the new position preceeded by '@'
        arrLen = arrLen - 1;
        lenStr = eventArr[arrLen];
        lenStr = (lenStr).substr( 1, (lenStr).length-1);
        // update processed event position pointer
        this._eventPos = YAPI._atoi(lenStr);
        // now generate callbacks for each event received
        arrPos = 0;
        while (arrPos < arrLen) {
            eventStr = eventArr[arrPos];
            eventLen = (eventStr).length;
            if (eventLen >= 1) {
                hexStamp = (eventStr).substr( 0, 8);
                evtStamp = parseInt(hexStamp, 16);
                typePos = (eventStr).indexOf(":")+1;
                if ((evtStamp >= this._eventStamp) && (typePos > 8)) {
                    this._eventStamp = evtStamp;
                    dataPos = (eventStr).indexOf("=")+1;
                    evtType = (eventStr).substr( typePos, 1);
                    evtData = "";
                    evtChange = "";
                    if (dataPos > 10) {
                        evtData = (eventStr).substr( dataPos, (eventStr).length-dataPos);
                        if (("1234567").indexOf(evtType) >= 0) {
                            chainIdx = YAPI._atoi(evtType) - 1;
                            evtChange = this._strXor(evtData, this._eventChains[chainIdx]);
                            this._eventChains[chainIdx] = evtData;
                        }
                    }
                    this._eventCallback(this, evtStamp, evtType, evtData, evtChange);
                }
            }
            arrPos = arrPos + 1;
        }
        return YAPI_SUCCESS;
    }

    function YInputChain_strXor(a,b)
    {
        var lenA;                   // int;
        var lenB;                   // int;
        var res;                    // str;
        var idx;                    // int;
        var digitA;                 // int;
        var digitB;                 // int;
        // make sure the result has the same length as first argument
        lenA = (a).length;
        lenB = (b).length;
        if (lenA > lenB) {
            res = (a).substr( 0, lenA-lenB);
            a = (a).substr( lenA-lenB, lenB);
            lenA = lenB;
        } else {
            res = "";
            b = (b).substr( lenA-lenB, lenA);
        }
        // scan strings and compare digit by digit
        idx = 0;
        while (idx < lenA) {
            digitA = parseInt((a).substr( idx, 1), 16);
            digitB = parseInt((b).substr( idx, 1), 16);
            res = ""+res+""+(((digitA) ^ (digitB))).toString(16).toLowerCase();
            idx = idx + 1;
        }
        return res;
    }

    function YInputChain_hex2array(hexstr)
    {
        var hexlen;                 // int;
        var res = [];               // intArr;
        var idx;                    // int;
        var digit;                  // int;
        hexlen = (hexstr).length;
        res.length = 0;
        idx = hexlen;
        while (idx > 0) {
            idx = idx - 1;
            digit = parseInt((hexstr).substr( idx, 1), 16);
            res.push(((digit) & (1)));
            res.push(((((digit) >> (1))) & (1)));
            res.push(((((digit) >> (2))) & (1)));
            res.push(((((digit) >> (3))) & (1)));
        }
        return res;
    }

    /**
     * Continues the enumeration of digital input chains started using yFirstInputChain().
     * Caution: You can't make any assumption about the returned digital input chains order.
     * If you want to find a specific a digital input chain, use InputChain.findInputChain()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YInputChain object, corresponding to
     *         a digital input chain currently online, or a null pointer
     *         if there are no more digital input chains to enumerate.
     */
    function YInputChain_nextInputChain()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YInputChain.FindInputChain(next_hwid);
    }

    /**
     * Starts the enumeration of digital input chains currently accessible.
     * Use the method YInputChain.nextInputChain() to iterate on
     * next digital input chains.
     *
     * @return a pointer to a YInputChain object, corresponding to
     *         the first digital input chain currently online, or a null pointer
     *         if there are none.
     */
    function YInputChain_FirstInputChain()
    {
        var next_hwid = YAPI.getFirstHardwareId('InputChain');
        if(next_hwid == null) return null;
        return YInputChain.FindInputChain(next_hwid);
    }

    //--- (end of YInputChain implementation)

    //--- (YInputChain initialization)
    YInputChain = YFunction._Subclass(_YInputChain, {
        // Constants
        EXPECTEDNODES_INVALID       : YAPI_INVALID_UINT,
        DETECTEDNODES_INVALID       : YAPI_INVALID_UINT,
        LOOPBACKTEST_OFF            : 0,
        LOOPBACKTEST_ON             : 1,
        LOOPBACKTEST_INVALID        : -1,
        REFRESHRATE_INVALID         : YAPI_INVALID_UINT,
        BITCHAIN1_INVALID           : YAPI_INVALID_STRING,
        BITCHAIN2_INVALID           : YAPI_INVALID_STRING,
        BITCHAIN3_INVALID           : YAPI_INVALID_STRING,
        BITCHAIN4_INVALID           : YAPI_INVALID_STRING,
        BITCHAIN5_INVALID           : YAPI_INVALID_STRING,
        BITCHAIN6_INVALID           : YAPI_INVALID_STRING,
        BITCHAIN7_INVALID           : YAPI_INVALID_STRING,
        WATCHDOGPERIOD_INVALID      : YAPI_INVALID_UINT,
        CHAINDIAGS_INVALID          : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindInputChain              : YInputChain_FindInputChain,
        FirstInputChain             : YInputChain_FirstInputChain
    }, {
        // Methods
        get_expectedNodes           : YInputChain_get_expectedNodes,
        expectedNodes               : YInputChain_get_expectedNodes,
        get_expectedNodes_async     : YInputChain_get_expectedNodes_async,
        expectedNodes_async         : YInputChain_get_expectedNodes_async,
        set_expectedNodes           : YInputChain_set_expectedNodes,
        setExpectedNodes            : YInputChain_set_expectedNodes,
        get_detectedNodes           : YInputChain_get_detectedNodes,
        detectedNodes               : YInputChain_get_detectedNodes,
        get_detectedNodes_async     : YInputChain_get_detectedNodes_async,
        detectedNodes_async         : YInputChain_get_detectedNodes_async,
        get_loopbackTest            : YInputChain_get_loopbackTest,
        loopbackTest                : YInputChain_get_loopbackTest,
        get_loopbackTest_async      : YInputChain_get_loopbackTest_async,
        loopbackTest_async          : YInputChain_get_loopbackTest_async,
        set_loopbackTest            : YInputChain_set_loopbackTest,
        setLoopbackTest             : YInputChain_set_loopbackTest,
        get_refreshRate             : YInputChain_get_refreshRate,
        refreshRate                 : YInputChain_get_refreshRate,
        get_refreshRate_async       : YInputChain_get_refreshRate_async,
        refreshRate_async           : YInputChain_get_refreshRate_async,
        set_refreshRate             : YInputChain_set_refreshRate,
        setRefreshRate              : YInputChain_set_refreshRate,
        get_bitChain1               : YInputChain_get_bitChain1,
        bitChain1                   : YInputChain_get_bitChain1,
        get_bitChain1_async         : YInputChain_get_bitChain1_async,
        bitChain1_async             : YInputChain_get_bitChain1_async,
        get_bitChain2               : YInputChain_get_bitChain2,
        bitChain2                   : YInputChain_get_bitChain2,
        get_bitChain2_async         : YInputChain_get_bitChain2_async,
        bitChain2_async             : YInputChain_get_bitChain2_async,
        get_bitChain3               : YInputChain_get_bitChain3,
        bitChain3                   : YInputChain_get_bitChain3,
        get_bitChain3_async         : YInputChain_get_bitChain3_async,
        bitChain3_async             : YInputChain_get_bitChain3_async,
        get_bitChain4               : YInputChain_get_bitChain4,
        bitChain4                   : YInputChain_get_bitChain4,
        get_bitChain4_async         : YInputChain_get_bitChain4_async,
        bitChain4_async             : YInputChain_get_bitChain4_async,
        get_bitChain5               : YInputChain_get_bitChain5,
        bitChain5                   : YInputChain_get_bitChain5,
        get_bitChain5_async         : YInputChain_get_bitChain5_async,
        bitChain5_async             : YInputChain_get_bitChain5_async,
        get_bitChain6               : YInputChain_get_bitChain6,
        bitChain6                   : YInputChain_get_bitChain6,
        get_bitChain6_async         : YInputChain_get_bitChain6_async,
        bitChain6_async             : YInputChain_get_bitChain6_async,
        get_bitChain7               : YInputChain_get_bitChain7,
        bitChain7                   : YInputChain_get_bitChain7,
        get_bitChain7_async         : YInputChain_get_bitChain7_async,
        bitChain7_async             : YInputChain_get_bitChain7_async,
        get_watchdogPeriod          : YInputChain_get_watchdogPeriod,
        watchdogPeriod              : YInputChain_get_watchdogPeriod,
        get_watchdogPeriod_async    : YInputChain_get_watchdogPeriod_async,
        watchdogPeriod_async        : YInputChain_get_watchdogPeriod_async,
        set_watchdogPeriod          : YInputChain_set_watchdogPeriod,
        setWatchdogPeriod           : YInputChain_set_watchdogPeriod,
        get_chainDiags              : YInputChain_get_chainDiags,
        chainDiags                  : YInputChain_get_chainDiags,
        get_chainDiags_async        : YInputChain_get_chainDiags_async,
        chainDiags_async            : YInputChain_get_chainDiags_async,
        resetWatchdog               : YInputChain_resetWatchdog,
        get_lastEvents              : YInputChain_get_lastEvents,
        lastEvents                  : YInputChain_get_lastEvents,
        registerEventCallback       : YInputChain_registerEventCallback,
        _internalEventHandler       : YInputChain_internalEventHandler,
        _strXor                     : YInputChain_strXor,
        hex2array                   : YInputChain_hex2array,
        nextInputChain              : YInputChain_nextInputChain,
        _parseAttr                  : YInputChain_parseAttr
    });
    //--- (end of YInputChain initialization)
})();

//--- (YInputChain functions)

/**
 * Retrieves a digital input chain for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the digital input chain is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YInputChain.isOnline() to test if the digital input chain is
 * indeed online at a given time. In case of ambiguity when looking for
 * a digital input chain by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the digital input chain, for instance
 *         MyDevice.inputChain.
 *
 * @return a YInputChain object allowing you to drive the digital input chain.
 */
function yFindInputChain(func)
{
    return YInputChain.FindInputChain(func);
}

/**
 * Starts the enumeration of digital input chains currently accessible.
 * Use the method YInputChain.nextInputChain() to iterate on
 * next digital input chains.
 *
 * @return a pointer to a YInputChain object, corresponding to
 *         the first digital input chain currently online, or a null pointer
 *         if there are none.
 */
function yFirstInputChain()
{
    return YInputChain.FirstInputChain();
}

//--- (end of YInputChain functions)
