/*********************************************************************
 *
 * $Id: yocto_wireless.js 9921 2013-02-20 09:39:16Z seb $
 *
 * Implements yFindWireless(), the high-level API for Wireless functions
 *
 * - - - - - - - - - License information: - - - - - - - - - 
 *
 * Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 * 1) If you have obtained this file from www.yoctopuce.com,
 *    Yoctopuce Sarl licenses to you (hereafter Licensee) the
 *    right to use, modify, copy, and integrate this source file
 *    into your own solution for the sole purpose of interfacing
 *    a Yoctopuce product with Licensee's solution.
 *
 *    The use of this file and all relationship between Yoctopuce 
 *    and Licensee are governed by Yoctopuce General Terms and 
 *    Conditions.
 *
 *    THE SOFTWARE AND DOCUMENTATION ARE PROVIDED 'AS IS' WITHOUT
 *    WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING 
 *    WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS 
 *    FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO
 *    EVENT SHALL LICENSOR BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
 *    INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA, 
 *    COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY OR 
 *    SERVICES, ANY CLAIMS BY THIRD PARTIES (INCLUDING BUT NOT 
 *    LIMITED TO ANY DEFENSE THEREOF), ANY CLAIMS FOR INDEMNITY OR
 *    CONTRIBUTION, OR OTHER SIMILAR COSTS, WHETHER ASSERTED ON THE
 *    BASIS OF CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF
 *    WARRANTY, OR OTHERWISE.
 *
 * 2) If your intent is not to interface with Yoctopuce products,
 *    you are not entitled to use, read or create any derived
 *    material from this source file.
 *
 *********************************************************************/

if(typeof YAPI == "undefined") { if(typeof yAPI != "undefined") window["YAPI"]=yAPI; else throw "YAPI is not defined, please include yocto_api.js first"; }

//--- (return codes)
//--- (end of return codes)
//--- (YWireless definitions)
var Y_SECURITY_UNKNOWN              = 0;
var Y_SECURITY_OPEN                 = 1;
var Y_SECURITY_WEP                  = 2;
var Y_SECURITY_WPA                  = 3;
var Y_SECURITY_WPA2                 = 4;
var Y_SECURITY_INVALID              = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_LINKQUALITY_INVALID           = -1;
var Y_SSID_INVALID                  = "!INVALID!";
var Y_CHANNEL_INVALID               = -1;
var Y_MESSAGE_INVALID               = "!INVALID!";
var Y_WLANCONFIG_INVALID            = "!INVALID!";
//--- (end of YWireless definitions)

/**
 * YWireless Class: Wireless function interface
 * 
 * 
 */
var YWireless; // definition below
(function()
{
    //--- (YWireless implementation)

    /**
     * Returns the logical name of the wireless lan interface.
     * 
     * @return a string corresponding to the logical name of the wireless lan interface
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YWireless_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the wireless lan interface.
     * 
     * @return a string corresponding to the logical name of the wireless lan interface
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWireless_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the wireless lan interface. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the wireless lan interface
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWireless_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the wireless lan interface (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the wireless lan interface (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YWireless_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the wireless lan interface (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the wireless lan interface (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWireless_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the link quality, expressed in per cents.
     * 
     * @return an integer corresponding to the link quality, expressed in per cents
     * 
     * On failure, throws an exception or returns Y_LINKQUALITY_INVALID.
     */
    function YWireless_get_linkQuality()
    {   var json_val = this._getAttr('linkQuality');
        return (json_val == null ? Y_LINKQUALITY_INVALID : parseInt(json_val));
    }

    /**
     * Returns the link quality, expressed in per cents.
     * 
     * @return an integer corresponding to the link quality, expressed in per cents
     * 
     * On failure, throws an exception or returns Y_LINKQUALITY_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWireless_get_linkQuality_async(func_callback, obj_context)
    {   this._getAttr_async('linkQuality',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LINKQUALITY_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the wireless network name (SSID).
     * 
     * @return a string corresponding to the wireless network name (SSID)
     * 
     * On failure, throws an exception or returns Y_SSID_INVALID.
     */
    function YWireless_get_ssid()
    {   var json_val = this._getAttr('ssid');
        return (json_val == null ? Y_SSID_INVALID : json_val);
    }

    /**
     * Returns the wireless network name (SSID).
     * 
     * @return a string corresponding to the wireless network name (SSID)
     * 
     * On failure, throws an exception or returns Y_SSID_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWireless_get_ssid_async(func_callback, obj_context)
    {   this._getAttr_async('ssid',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SSID_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the 802.11 channel currently used, or 0 when the selected network has not been found.
     * 
     * @return an integer corresponding to the 802
     * 
     * On failure, throws an exception or returns Y_CHANNEL_INVALID.
     */
    function YWireless_get_channel()
    {   var json_val = this._getAttr('channel');
        return (json_val == null ? Y_CHANNEL_INVALID : parseInt(json_val));
    }

    /**
     * Returns the 802.11 channel currently used, or 0 when the selected network has not been found.
     * 
     * @return an integer corresponding to the 802
     * 
     * On failure, throws an exception or returns Y_CHANNEL_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWireless_get_channel_async(func_callback, obj_context)
    {   this._getAttr_async('channel',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CHANNEL_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the security algorithm used by the selected wireless network.
     * 
     * @return a value among Y_SECURITY_UNKNOWN, Y_SECURITY_OPEN, Y_SECURITY_WEP, Y_SECURITY_WPA and
     * Y_SECURITY_WPA2 corresponding to the security algorithm used by the selected wireless network
     * 
     * On failure, throws an exception or returns Y_SECURITY_INVALID.
     */
    function YWireless_get_security()
    {   var json_val = this._getAttr('security');
        return (json_val == null ? Y_SECURITY_INVALID : parseInt(json_val));
    }

    /**
     * Returns the security algorithm used by the selected wireless network.
     * 
     * @return a value among Y_SECURITY_UNKNOWN, Y_SECURITY_OPEN, Y_SECURITY_WEP, Y_SECURITY_WPA and
     * Y_SECURITY_WPA2 corresponding to the security algorithm used by the selected wireless network
     * 
     * On failure, throws an exception or returns Y_SECURITY_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWireless_get_security_async(func_callback, obj_context)
    {   this._getAttr_async('security',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SECURITY_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the last status message from the wireless interface.
     * 
     * @return a string corresponding to the last status message from the wireless interface
     * 
     * On failure, throws an exception or returns Y_MESSAGE_INVALID.
     */
    function YWireless_get_message()
    {   var json_val = this._getAttr('message');
        return (json_val == null ? Y_MESSAGE_INVALID : json_val);
    }

    /**
     * Returns the last status message from the wireless interface.
     * 
     * @return a string corresponding to the last status message from the wireless interface
     * 
     * On failure, throws an exception or returns Y_MESSAGE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWireless_get_message_async(func_callback, obj_context)
    {   this._getAttr_async('message',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_MESSAGE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YWireless_get_wlanConfig()
    {   var json_val = this._getAttr('wlanConfig');
        return (json_val == null ? Y_WLANCONFIG_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YWireless_get_wlanConfig_async(func_callback, obj_context)
    {   this._getAttr_async('wlanConfig',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_WLANCONFIG_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YWireless_set_wlanConfig(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('wlanConfig',rest_val);
    }

    /**
     * Changes the configuration of the wireless lan interface to connect to an existing
     * access point (infrastructure mode).
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     * 
     * @param ssid : the name of the network to connect to
     * @param securityKey : the network key, as a character string
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWireless_joinNetwork(str_ssid,str_securityKey)
    {   var rest_val;
        rest_val = 'INFRA:'+str_ssid+'\\'+str_securityKey;
        return this._setAttr('wlanConfig',rest_val);
    }

    /**
     * Changes the configuration of the wireless lan interface to create an ad-hoc
     * wireless network, without using an access point. If a security key is specified,
     * the network will be protected by WEP128, since WPA is not standardized for
     * ad-hoc networks.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     * 
     * @param ssid : the name of the network to connect to
     * @param securityKey : the network key, as a character string
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWireless_adhocNetwork(str_ssid,str_securityKey)
    {   var rest_val;
        rest_val = 'ADHOC:'+str_ssid+'\\'+str_securityKey;
        return this._setAttr('wlanConfig',rest_val);
    }

    /**
     * Continues the enumeration of wireless lan interfaces started using yFirstWireless().
     * 
     * @return a pointer to a YWireless object, corresponding to
     *         a wireless lan interface currently online, or a null pointer
     *         if there are no more wireless lan interfaces to enumerate.
     */
    function YWireless_nextWireless()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YWireless.FindWireless(next_hwid);
    }

    /**
     * Retrieves a wireless lan interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the wireless lan interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWireless.isOnline() to test if the wireless lan interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wireless lan interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the wireless lan interface
     * 
     * @return a YWireless object allowing you to drive the wireless lan interface.
     */
    function YWireless_FindWireless(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Wireless', str_func);
        if(obj_func) return obj_func;
        return new YWireless(str_func);
    }

    /**
     * Starts the enumeration of wireless lan interfaces currently accessible.
     * Use the method YWireless.nextWireless() to iterate on
     * next wireless lan interfaces.
     * 
     * @return a pointer to a YWireless object, corresponding to
     *         the first wireless lan interface currently online, or a null pointer
     *         if there are none.
     */
    function YWireless_FirstWireless()
    {
        var next_hwid = YAPI.getFirstHardwareId('Wireless');
        if(next_hwid == null) return null;
        return YWireless.FindWireless(next_hwid);
    }

    //--- (end of YWireless implementation)

    function _YWireless(str_func)
    {
        //--- (YWireless constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Wireless', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.LINKQUALITY_INVALID             = -1;
        this.SSID_INVALID                    = "!INVALID!";
        this.CHANNEL_INVALID                 = -1;
        this.SECURITY_UNKNOWN                = 0;
        this.SECURITY_OPEN                   = 1;
        this.SECURITY_WEP                    = 2;
        this.SECURITY_WPA                    = 3;
        this.SECURITY_WPA2                   = 4;
        this.SECURITY_INVALID                = -1;
        this.MESSAGE_INVALID                 = "!INVALID!";
        this.WLANCONFIG_INVALID              = "!INVALID!";
        this.get_logicalName                 = YWireless_get_logicalName;
        this.logicalName                     = YWireless_get_logicalName;
        this.get_logicalName_async           = YWireless_get_logicalName_async;
        this.logicalName_async               = YWireless_get_logicalName_async;
        this.set_logicalName                 = YWireless_set_logicalName;
        this.setLogicalName                  = YWireless_set_logicalName;
        this.get_advertisedValue             = YWireless_get_advertisedValue;
        this.advertisedValue                 = YWireless_get_advertisedValue;
        this.get_advertisedValue_async       = YWireless_get_advertisedValue_async;
        this.advertisedValue_async           = YWireless_get_advertisedValue_async;
        this.get_linkQuality                 = YWireless_get_linkQuality;
        this.linkQuality                     = YWireless_get_linkQuality;
        this.get_linkQuality_async           = YWireless_get_linkQuality_async;
        this.linkQuality_async               = YWireless_get_linkQuality_async;
        this.get_ssid                        = YWireless_get_ssid;
        this.ssid                            = YWireless_get_ssid;
        this.get_ssid_async                  = YWireless_get_ssid_async;
        this.ssid_async                      = YWireless_get_ssid_async;
        this.get_channel                     = YWireless_get_channel;
        this.channel                         = YWireless_get_channel;
        this.get_channel_async               = YWireless_get_channel_async;
        this.channel_async                   = YWireless_get_channel_async;
        this.get_security                    = YWireless_get_security;
        this.security                        = YWireless_get_security;
        this.get_security_async              = YWireless_get_security_async;
        this.security_async                  = YWireless_get_security_async;
        this.get_message                     = YWireless_get_message;
        this.message                         = YWireless_get_message;
        this.get_message_async               = YWireless_get_message_async;
        this.message_async                   = YWireless_get_message_async;
        this.get_wlanConfig                  = YWireless_get_wlanConfig;
        this.wlanConfig                      = YWireless_get_wlanConfig;
        this.get_wlanConfig_async            = YWireless_get_wlanConfig_async;
        this.wlanConfig_async                = YWireless_get_wlanConfig_async;
        this.set_wlanConfig                  = YWireless_set_wlanConfig;
        this.setWlanConfig                   = YWireless_set_wlanConfig;
        this.joinNetwork                     = YWireless_joinNetwork;
        this.adhocNetwork                    = YWireless_adhocNetwork;
        this.nextWireless                    = YWireless_nextWireless;
        //--- (end of YWireless constructor)
    }

    YWireless = _YWireless;
    YWireless.FindWireless  = YWireless_FindWireless;
    YWireless.FirstWireless = YWireless_FirstWireless;
})();

//--- (Wireless functions)

/**
 * Retrieves a wireless lan interface for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the wireless lan interface is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YWireless.isOnline() to test if the wireless lan interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a wireless lan interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the wireless lan interface
 * 
 * @return a YWireless object allowing you to drive the wireless lan interface.
 */
function yFindWireless(str_func)
{
    return YWireless.FindWireless(str_func);
}

/**
 * Starts the enumeration of wireless lan interfaces currently accessible.
 * Use the method YWireless.nextWireless() to iterate on
 * next wireless lan interfaces.
 * 
 * @return a pointer to a YWireless object, corresponding to
 *         the first wireless lan interface currently online, or a null pointer
 *         if there are none.
 */
function yFirstWireless()
{
    return YWireless.FirstWireless();
}

//--- (end of Wireless functions)
