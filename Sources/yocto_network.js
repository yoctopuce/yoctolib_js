/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Network functions
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

//--- (YNetwork return codes)
//--- (end of YNetwork return codes)
//--- (YNetwork definitions)
var Y_READINESS_DOWN                = 0;
var Y_READINESS_EXISTS              = 1;
var Y_READINESS_LINKED              = 2;
var Y_READINESS_LAN_OK              = 3;
var Y_READINESS_WWW_OK              = 4;
var Y_READINESS_INVALID             = -1;
var Y_DISCOVERABLE_FALSE            = 0;
var Y_DISCOVERABLE_TRUE             = 1;
var Y_DISCOVERABLE_INVALID          = -1;
var Y_CALLBACKMETHOD_POST           = 0;
var Y_CALLBACKMETHOD_GET            = 1;
var Y_CALLBACKMETHOD_PUT            = 2;
var Y_CALLBACKMETHOD_INVALID        = -1;
var Y_CALLBACKENCODING_FORM         = 0;
var Y_CALLBACKENCODING_JSON         = 1;
var Y_CALLBACKENCODING_JSON_ARRAY   = 2;
var Y_CALLBACKENCODING_CSV          = 3;
var Y_CALLBACKENCODING_YOCTO_API    = 4;
var Y_CALLBACKENCODING_JSON_NUM     = 5;
var Y_CALLBACKENCODING_EMONCMS      = 6;
var Y_CALLBACKENCODING_AZURE        = 7;
var Y_CALLBACKENCODING_INFLUXDB     = 8;
var Y_CALLBACKENCODING_MQTT         = 9;
var Y_CALLBACKENCODING_YOCTO_API_JZON = 10;
var Y_CALLBACKENCODING_PRTG         = 11;
var Y_CALLBACKENCODING_INFLUXDB_V2  = 12;
var Y_CALLBACKENCODING_INVALID      = -1;
var Y_CALLBACKTEMPLATE_OFF          = 0;
var Y_CALLBACKTEMPLATE_ON           = 1;
var Y_CALLBACKTEMPLATE_INVALID      = -1;
var Y_MACADDRESS_INVALID            = YAPI_INVALID_STRING;
var Y_IPADDRESS_INVALID             = YAPI_INVALID_STRING;
var Y_SUBNETMASK_INVALID            = YAPI_INVALID_STRING;
var Y_ROUTER_INVALID                = YAPI_INVALID_STRING;
var Y_CURRENTDNS_INVALID            = YAPI_INVALID_STRING;
var Y_IPCONFIG_INVALID              = YAPI_INVALID_STRING;
var Y_PRIMARYDNS_INVALID            = YAPI_INVALID_STRING;
var Y_SECONDARYDNS_INVALID          = YAPI_INVALID_STRING;
var Y_NTPSERVER_INVALID             = YAPI_INVALID_STRING;
var Y_USERPASSWORD_INVALID          = YAPI_INVALID_STRING;
var Y_ADMINPASSWORD_INVALID         = YAPI_INVALID_STRING;
var Y_HTTPPORT_INVALID              = YAPI_INVALID_UINT;
var Y_DEFAULTPAGE_INVALID           = YAPI_INVALID_STRING;
var Y_WWWWATCHDOGDELAY_INVALID      = YAPI_INVALID_UINT;
var Y_CALLBACKURL_INVALID           = YAPI_INVALID_STRING;
var Y_CALLBACKCREDENTIALS_INVALID   = YAPI_INVALID_STRING;
var Y_CALLBACKINITIALDELAY_INVALID  = YAPI_INVALID_UINT;
var Y_CALLBACKSCHEDULE_INVALID      = YAPI_INVALID_STRING;
var Y_CALLBACKMINDELAY_INVALID      = YAPI_INVALID_UINT;
var Y_CALLBACKMAXDELAY_INVALID      = YAPI_INVALID_UINT;
var Y_POECURRENT_INVALID            = YAPI_INVALID_UINT;
//--- (end of YNetwork definitions)

//--- (YNetwork class start)
/**
 * YNetwork Class: network interface control interface, available for instance in the
 * YoctoHub-Ethernet, the YoctoHub-GSM-4G, the YoctoHub-Wireless-SR or the YoctoHub-Wireless-n
 *
 * YNetwork objects provide access to TCP/IP parameters of Yoctopuce
 * devices that include a built-in network interface.
 */
//--- (end of YNetwork class start)

var YNetwork; // definition below
(function()
{
    function _YNetwork(str_func)
    {
        //--- (YNetwork constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Network';

        this._readiness                      = Y_READINESS_INVALID;        // Readiness
        this._macAddress                     = Y_MACADDRESS_INVALID;       // MACAddress
        this._ipAddress                      = Y_IPADDRESS_INVALID;        // IPAddress
        this._subnetMask                     = Y_SUBNETMASK_INVALID;       // IPAddress
        this._router                         = Y_ROUTER_INVALID;           // IPAddress
        this._currentDNS                     = Y_CURRENTDNS_INVALID;       // IPAddress
        this._ipConfig                       = Y_IPCONFIG_INVALID;         // IPConfig
        this._primaryDNS                     = Y_PRIMARYDNS_INVALID;       // IPAddress
        this._secondaryDNS                   = Y_SECONDARYDNS_INVALID;     // IPAddress
        this._ntpServer                      = Y_NTPSERVER_INVALID;        // IPAddress
        this._userPassword                   = Y_USERPASSWORD_INVALID;     // UserPassword
        this._adminPassword                  = Y_ADMINPASSWORD_INVALID;    // AdminPassword
        this._httpPort                       = Y_HTTPPORT_INVALID;         // UInt31
        this._defaultPage                    = Y_DEFAULTPAGE_INVALID;      // Text
        this._discoverable                   = Y_DISCOVERABLE_INVALID;     // Bool
        this._wwwWatchdogDelay               = Y_WWWWATCHDOGDELAY_INVALID; // UInt31
        this._callbackUrl                    = Y_CALLBACKURL_INVALID;      // Text
        this._callbackMethod                 = Y_CALLBACKMETHOD_INVALID;   // HTTPMethod
        this._callbackEncoding               = Y_CALLBACKENCODING_INVALID; // CallbackEncoding
        this._callbackTemplate               = Y_CALLBACKTEMPLATE_INVALID; // OnOff
        this._callbackCredentials            = Y_CALLBACKCREDENTIALS_INVALID; // Credentials
        this._callbackInitialDelay           = Y_CALLBACKINITIALDELAY_INVALID; // UInt31
        this._callbackSchedule               = Y_CALLBACKSCHEDULE_INVALID; // CallbackSchedule
        this._callbackMinDelay               = Y_CALLBACKMINDELAY_INVALID; // UInt31
        this._callbackMaxDelay               = Y_CALLBACKMAXDELAY_INVALID; // UInt31
        this._poeCurrent                     = Y_POECURRENT_INVALID;       // UsedCurrent
        //--- (end of YNetwork constructor)
    }

    //--- (YNetwork implementation)

    function YNetwork_parseAttr(name, val, _super)
    {
        switch(name) {
        case "readiness":
            this._readiness = parseInt(val);
            return 1;
        case "macAddress":
            this._macAddress = val;
            return 1;
        case "ipAddress":
            this._ipAddress = val;
            return 1;
        case "subnetMask":
            this._subnetMask = val;
            return 1;
        case "router":
            this._router = val;
            return 1;
        case "currentDNS":
            this._currentDNS = val;
            return 1;
        case "ipConfig":
            this._ipConfig = val;
            return 1;
        case "primaryDNS":
            this._primaryDNS = val;
            return 1;
        case "secondaryDNS":
            this._secondaryDNS = val;
            return 1;
        case "ntpServer":
            this._ntpServer = val;
            return 1;
        case "userPassword":
            this._userPassword = val;
            return 1;
        case "adminPassword":
            this._adminPassword = val;
            return 1;
        case "httpPort":
            this._httpPort = parseInt(val);
            return 1;
        case "defaultPage":
            this._defaultPage = val;
            return 1;
        case "discoverable":
            this._discoverable = parseInt(val);
            return 1;
        case "wwwWatchdogDelay":
            this._wwwWatchdogDelay = parseInt(val);
            return 1;
        case "callbackUrl":
            this._callbackUrl = val;
            return 1;
        case "callbackMethod":
            this._callbackMethod = parseInt(val);
            return 1;
        case "callbackEncoding":
            this._callbackEncoding = parseInt(val);
            return 1;
        case "callbackTemplate":
            this._callbackTemplate = parseInt(val);
            return 1;
        case "callbackCredentials":
            this._callbackCredentials = val;
            return 1;
        case "callbackInitialDelay":
            this._callbackInitialDelay = parseInt(val);
            return 1;
        case "callbackSchedule":
            this._callbackSchedule = val;
            return 1;
        case "callbackMinDelay":
            this._callbackMinDelay = parseInt(val);
            return 1;
        case "callbackMaxDelay":
            this._callbackMaxDelay = parseInt(val);
            return 1;
        case "poeCurrent":
            this._poeCurrent = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current established working mode of the network interface.
     * Level zero (DOWN_0) means that no hardware link has been detected. Either there is no signal
     * on the network cable, or the selected wireless access point cannot be detected.
     * Level 1 (LIVE_1) is reached when the network is detected, but is not yet connected.
     * For a wireless network, this shows that the requested SSID is present.
     * Level 2 (LINK_2) is reached when the hardware connection is established.
     * For a wired network connection, level 2 means that the cable is attached at both ends.
     * For a connection to a wireless access point, it shows that the security parameters
     * are properly configured. For an ad-hoc wireless connection, it means that there is
     * at least one other device connected on the ad-hoc network.
     * Level 3 (DHCP_3) is reached when an IP address has been obtained using DHCP.
     * Level 4 (DNS_4) is reached when the DNS server is reachable on the network.
     * Level 5 (WWW_5) is reached when global connectivity is demonstrated by properly loading the
     * current time from an NTP server.
     *
     * @return a value among YNetwork.READINESS_DOWN, YNetwork.READINESS_EXISTS,
     * YNetwork.READINESS_LINKED, YNetwork.READINESS_LAN_OK and YNetwork.READINESS_WWW_OK corresponding to
     * the current established working mode of the network interface
     *
     * On failure, throws an exception or returns YNetwork.READINESS_INVALID.
     */
    function YNetwork_get_readiness()
    {
        var res;                    // enumREADINESS;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_READINESS_INVALID;
            }
        }
        res = this._readiness;
        return res;
    }

    /**
     * Gets the current established working mode of the network interface.
     * Level zero (DOWN_0) means that no hardware link has been detected. Either there is no signal
     * on the network cable, or the selected wireless access point cannot be detected.
     * Level 1 (LIVE_1) is reached when the network is detected, but is not yet connected.
     * For a wireless network, this shows that the requested SSID is present.
     * Level 2 (LINK_2) is reached when the hardware connection is established.
     * For a wired network connection, level 2 means that the cable is attached at both ends.
     * For a connection to a wireless access point, it shows that the security parameters
     * are properly configured. For an ad-hoc wireless connection, it means that there is
     * at least one other device connected on the ad-hoc network.
     * Level 3 (DHCP_3) is reached when an IP address has been obtained using DHCP.
     * Level 4 (DNS_4) is reached when the DNS server is reachable on the network.
     * Level 5 (WWW_5) is reached when global connectivity is demonstrated by properly loading the
     * current time from an NTP server.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a value among YNetwork.READINESS_DOWN, YNetwork.READINESS_EXISTS,
     *         YNetwork.READINESS_LINKED, YNetwork.READINESS_LAN_OK and YNetwork.READINESS_WWW_OK corresponding to
     *         the current established working mode of the network interface
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.READINESS_INVALID.
     */
    function YNetwork_get_readiness_async(callback,context)
    {
        var res;                    // enumREADINESS;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_READINESS_INVALID);
            } else {
                callback(context, obj, obj._readiness);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the MAC address of the network interface. The MAC address is also available on a sticker
     * on the module, in both numeric and barcode forms.
     *
     * @return a string corresponding to the MAC address of the network interface
     *
     * On failure, throws an exception or returns YNetwork.MACADDRESS_INVALID.
     */
    function YNetwork_get_macAddress()
    {
        var res;                    // string;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MACADDRESS_INVALID;
            }
        }
        res = this._macAddress;
        return res;
    }

    /**
     * Gets the MAC address of the network interface. The MAC address is also available on a sticker
     * on the module, in both numeric and barcode forms.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the MAC address of the network interface
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.MACADDRESS_INVALID.
     */
    function YNetwork_get_macAddress_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MACADDRESS_INVALID);
            } else {
                callback(context, obj, obj._macAddress);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the IP address currently in use by the device. The address may have been configured
     * statically, or provided by a DHCP server.
     *
     * @return a string corresponding to the IP address currently in use by the device
     *
     * On failure, throws an exception or returns YNetwork.IPADDRESS_INVALID.
     */
    function YNetwork_get_ipAddress()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_IPADDRESS_INVALID;
            }
        }
        res = this._ipAddress;
        return res;
    }

    /**
     * Gets the IP address currently in use by the device. The address may have been configured
     * statically, or provided by a DHCP server.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the IP address currently in use by the device
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.IPADDRESS_INVALID.
     */
    function YNetwork_get_ipAddress_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_IPADDRESS_INVALID);
            } else {
                callback(context, obj, obj._ipAddress);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the subnet mask currently used by the device.
     *
     * @return a string corresponding to the subnet mask currently used by the device
     *
     * On failure, throws an exception or returns YNetwork.SUBNETMASK_INVALID.
     */
    function YNetwork_get_subnetMask()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SUBNETMASK_INVALID;
            }
        }
        res = this._subnetMask;
        return res;
    }

    /**
     * Gets the subnet mask currently used by the device.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the subnet mask currently used by the device
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.SUBNETMASK_INVALID.
     */
    function YNetwork_get_subnetMask_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SUBNETMASK_INVALID);
            } else {
                callback(context, obj, obj._subnetMask);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the IP address of the router on the device subnet (default gateway).
     *
     * @return a string corresponding to the IP address of the router on the device subnet (default gateway)
     *
     * On failure, throws an exception or returns YNetwork.ROUTER_INVALID.
     */
    function YNetwork_get_router()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ROUTER_INVALID;
            }
        }
        res = this._router;
        return res;
    }

    /**
     * Gets the IP address of the router on the device subnet (default gateway).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the IP address of the router on the device subnet (default gateway)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.ROUTER_INVALID.
     */
    function YNetwork_get_router_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ROUTER_INVALID);
            } else {
                callback(context, obj, obj._router);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the IP address of the DNS server currently used by the device.
     *
     * @return a string corresponding to the IP address of the DNS server currently used by the device
     *
     * On failure, throws an exception or returns YNetwork.CURRENTDNS_INVALID.
     */
    function YNetwork_get_currentDNS()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTDNS_INVALID;
            }
        }
        res = this._currentDNS;
        return res;
    }

    /**
     * Gets the IP address of the DNS server currently used by the device.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the IP address of the DNS server currently used by the device
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.CURRENTDNS_INVALID.
     */
    function YNetwork_get_currentDNS_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTDNS_INVALID);
            } else {
                callback(context, obj, obj._currentDNS);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the IP configuration of the network interface.
     *
     * If the network interface is set up to use a static IP address, the string starts with "STATIC:" and
     * is followed by three
     * parameters, separated by "/". The first is the device IP address, followed by the subnet mask
     * length, and finally the
     * router IP address (default gateway). For instance: "STATIC:192.168.1.14/16/192.168.1.1"
     *
     * If the network interface is configured to receive its IP from a DHCP server, the string start with
     * "DHCP:" and is followed by
     * three parameters separated by "/". The first is the fallback IP address, then the fallback subnet
     * mask length and finally the
     * fallback router IP address. These three parameters are used when no DHCP reply is received.
     *
     * @return a string corresponding to the IP configuration of the network interface
     *
     * On failure, throws an exception or returns YNetwork.IPCONFIG_INVALID.
     */
    function YNetwork_get_ipConfig()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_IPCONFIG_INVALID;
            }
        }
        res = this._ipConfig;
        return res;
    }

    /**
     * Gets the IP configuration of the network interface.
     *
     * If the network interface is set up to use a static IP address, the string starts with "STATIC:" and
     * is followed by three
     * parameters, separated by "/". The first is the device IP address, followed by the subnet mask
     * length, and finally the
     * router IP address (default gateway). For instance: "STATIC:192.168.1.14/16/192.168.1.1"
     *
     * If the network interface is configured to receive its IP from a DHCP server, the string start with
     * "DHCP:" and is followed by
     * three parameters separated by "/". The first is the fallback IP address, then the fallback subnet
     * mask length and finally the
     * fallback router IP address. These three parameters are used when no DHCP reply is received.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the IP configuration of the network interface
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.IPCONFIG_INVALID.
     */
    function YNetwork_get_ipConfig_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_IPCONFIG_INVALID);
            } else {
                callback(context, obj, obj._ipConfig);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YNetwork_set_ipConfig(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('ipConfig',rest_val);
    }

    /**
     * Returns the IP address of the primary name server to be used by the module.
     *
     * @return a string corresponding to the IP address of the primary name server to be used by the module
     *
     * On failure, throws an exception or returns YNetwork.PRIMARYDNS_INVALID.
     */
    function YNetwork_get_primaryDNS()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PRIMARYDNS_INVALID;
            }
        }
        res = this._primaryDNS;
        return res;
    }

    /**
     * Gets the IP address of the primary name server to be used by the module.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the IP address of the primary name server to be used by the module
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.PRIMARYDNS_INVALID.
     */
    function YNetwork_get_primaryDNS_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PRIMARYDNS_INVALID);
            } else {
                callback(context, obj, obj._primaryDNS);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the IP address of the primary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the primary name server to be used by the module
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_primaryDNS(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('primaryDNS',rest_val);
    }

    /**
     * Returns the IP address of the secondary name server to be used by the module.
     *
     * @return a string corresponding to the IP address of the secondary name server to be used by the module
     *
     * On failure, throws an exception or returns YNetwork.SECONDARYDNS_INVALID.
     */
    function YNetwork_get_secondaryDNS()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SECONDARYDNS_INVALID;
            }
        }
        res = this._secondaryDNS;
        return res;
    }

    /**
     * Gets the IP address of the secondary name server to be used by the module.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the IP address of the secondary name server to be used by the module
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.SECONDARYDNS_INVALID.
     */
    function YNetwork_get_secondaryDNS_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SECONDARYDNS_INVALID);
            } else {
                callback(context, obj, obj._secondaryDNS);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the IP address of the secondary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the secondary name server to be used by the module
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_secondaryDNS(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('secondaryDNS',rest_val);
    }

    /**
     * Returns the IP address of the NTP server to be used by the device.
     *
     * @return a string corresponding to the IP address of the NTP server to be used by the device
     *
     * On failure, throws an exception or returns YNetwork.NTPSERVER_INVALID.
     */
    function YNetwork_get_ntpServer()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NTPSERVER_INVALID;
            }
        }
        res = this._ntpServer;
        return res;
    }

    /**
     * Gets the IP address of the NTP server to be used by the device.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the IP address of the NTP server to be used by the device
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.NTPSERVER_INVALID.
     */
    function YNetwork_get_ntpServer_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NTPSERVER_INVALID);
            } else {
                callback(context, obj, obj._ntpServer);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the IP address of the NTP server to be used by the module. Use an empty
     * string to restore the factory set  address.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the NTP server to be used by the module
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_ntpServer(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('ntpServer',rest_val);
    }

    /**
     * Returns a hash string if a password has been set for "user" user,
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hash string if a password has been set for "user" user,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.USERPASSWORD_INVALID.
     */
    function YNetwork_get_userPassword()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_USERPASSWORD_INVALID;
            }
        }
        res = this._userPassword;
        return res;
    }

    /**
     * Gets a hash string if a password has been set for "user" user,
     * or an empty string otherwise.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to a hash string if a password has been set for "user" user,
     *         or an empty string otherwise
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.USERPASSWORD_INVALID.
     */
    function YNetwork_get_userPassword_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_USERPASSWORD_INVALID);
            } else {
                callback(context, obj, obj._userPassword);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the password for the "user" user. This password becomes instantly required
     * to perform any use of the module. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the password for the "user" user
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_userPassword(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('userPassword',rest_val);
    }

    /**
     * Returns a hash string if a password has been set for user "admin",
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hash string if a password has been set for user "admin",
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.ADMINPASSWORD_INVALID.
     */
    function YNetwork_get_adminPassword()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ADMINPASSWORD_INVALID;
            }
        }
        res = this._adminPassword;
        return res;
    }

    /**
     * Gets a hash string if a password has been set for user "admin",
     * or an empty string otherwise.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to a hash string if a password has been set for user "admin",
     *         or an empty string otherwise
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.ADMINPASSWORD_INVALID.
     */
    function YNetwork_get_adminPassword_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ADMINPASSWORD_INVALID);
            } else {
                callback(context, obj, obj._adminPassword);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the password for the "admin" user. This password becomes instantly required
     * to perform any change of the module state. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the password for the "admin" user
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_adminPassword(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('adminPassword',rest_val);
    }

    /**
     * Returns the TCP port used to serve the hub web UI.
     *
     * @return an integer corresponding to the TCP port used to serve the hub web UI
     *
     * On failure, throws an exception or returns YNetwork.HTTPPORT_INVALID.
     */
    function YNetwork_get_httpPort()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_HTTPPORT_INVALID;
            }
        }
        res = this._httpPort;
        return res;
    }

    /**
     * Gets the TCP port used to serve the hub web UI.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:an integer corresponding to the TCP port used to serve the hub web UI
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.HTTPPORT_INVALID.
     */
    function YNetwork_get_httpPort_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_HTTPPORT_INVALID);
            } else {
                callback(context, obj, obj._httpPort);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the the TCP port used to serve the hub web UI. The default value is port 80,
     * which is the default for all Web servers. Regardless of the value set here,
     * the hub will always reply on port 4444, which is used by default by Yoctopuce
     * API library. When you change this parameter, remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the the TCP port used to serve the hub web UI
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_httpPort(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('httpPort',rest_val);
    }

    /**
     * Returns the HTML page to serve for the URL "/"" of the hub.
     *
     * @return a string corresponding to the HTML page to serve for the URL "/"" of the hub
     *
     * On failure, throws an exception or returns YNetwork.DEFAULTPAGE_INVALID.
     */
    function YNetwork_get_defaultPage()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DEFAULTPAGE_INVALID;
            }
        }
        res = this._defaultPage;
        return res;
    }

    /**
     * Gets the HTML page to serve for the URL "/"" of the hub.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the HTML page to serve for the URL "/"" of the hub
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.DEFAULTPAGE_INVALID.
     */
    function YNetwork_get_defaultPage_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DEFAULTPAGE_INVALID);
            } else {
                callback(context, obj, obj._defaultPage);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the default HTML page returned by the hub. If not value are set the hub return
     * "index.html" which is the web interface of the hub. It is possible to change this page
     * for file that has been uploaded on the hub. The maximum filename size is 15 characters.
     * When you change this parameter, remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the default HTML page returned by the hub
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_defaultPage(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('defaultPage',rest_val);
    }

    /**
     * Returns the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @return either YNetwork.DISCOVERABLE_FALSE or YNetwork.DISCOVERABLE_TRUE, according to the
     * activation state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * On failure, throws an exception or returns YNetwork.DISCOVERABLE_INVALID.
     */
    function YNetwork_get_discoverable()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DISCOVERABLE_INVALID;
            }
        }
        res = this._discoverable;
        return res;
    }

    /**
     * Gets the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:either YNetwork.DISCOVERABLE_FALSE or YNetwork.DISCOVERABLE_TRUE, according to the
     *         activation state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.DISCOVERABLE_INVALID.
     */
    function YNetwork_get_discoverable_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DISCOVERABLE_INVALID);
            } else {
                callback(context, obj, obj._discoverable);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : either YNetwork.DISCOVERABLE_FALSE or YNetwork.DISCOVERABLE_TRUE, according to the
     * activation state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_discoverable(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('discoverable',rest_val);
    }

    /**
     * Returns the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss.
     *
     * @return an integer corresponding to the allowed downtime of the WWW link (in seconds) before
     * triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * On failure, throws an exception or returns YNetwork.WWWWATCHDOGDELAY_INVALID.
     */
    function YNetwork_get_wwwWatchdogDelay()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_WWWWATCHDOGDELAY_INVALID;
            }
        }
        res = this._wwwWatchdogDelay;
        return res;
    }

    /**
     * Gets the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:an integer corresponding to the allowed downtime of the WWW link (in seconds) before
     *         triggering an automated
     *         reboot to try to recover Internet connectivity
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.WWWWATCHDOGDELAY_INVALID.
     */
    function YNetwork_get_wwwWatchdogDelay_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_WWWWATCHDOGDELAY_INVALID);
            } else {
                callback(context, obj, obj._wwwWatchdogDelay);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss. The smallest valid non-zero timeout is
     * 90 seconds. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the allowed downtime of the WWW link (in seconds)
     * before triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_wwwWatchdogDelay(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('wwwWatchdogDelay',rest_val);
    }

    /**
     * Returns the callback URL to notify of significant state changes.
     *
     * @return a string corresponding to the callback URL to notify of significant state changes
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKURL_INVALID.
     */
    function YNetwork_get_callbackUrl()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALLBACKURL_INVALID;
            }
        }
        res = this._callbackUrl;
        return res;
    }

    /**
     * Gets the callback URL to notify of significant state changes.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the callback URL to notify of significant state changes
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKURL_INVALID.
     */
    function YNetwork_get_callbackUrl_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALLBACKURL_INVALID);
            } else {
                callback(context, obj, obj._callbackUrl);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the callback URL to notify significant state changes. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the callback URL to notify significant state changes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackUrl(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('callbackUrl',rest_val);
    }

    /**
     * Returns the HTTP method used to notify callbacks for significant state changes.
     *
     * @return a value among YNetwork.CALLBACKMETHOD_POST, YNetwork.CALLBACKMETHOD_GET and
     * YNetwork.CALLBACKMETHOD_PUT corresponding to the HTTP method used to notify callbacks for
     * significant state changes
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMETHOD_INVALID.
     */
    function YNetwork_get_callbackMethod()
    {
        var res;                    // enumHTTPMETHOD;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALLBACKMETHOD_INVALID;
            }
        }
        res = this._callbackMethod;
        return res;
    }

    /**
     * Gets the HTTP method used to notify callbacks for significant state changes.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a value among YNetwork.CALLBACKMETHOD_POST, YNetwork.CALLBACKMETHOD_GET and
     *         YNetwork.CALLBACKMETHOD_PUT corresponding to the HTTP method used to notify callbacks for
     *         significant state changes
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMETHOD_INVALID.
     */
    function YNetwork_get_callbackMethod_async(callback,context)
    {
        var res;                    // enumHTTPMETHOD;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALLBACKMETHOD_INVALID);
            } else {
                callback(context, obj, obj._callbackMethod);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the HTTP method used to notify callbacks for significant state changes.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YNetwork.CALLBACKMETHOD_POST, YNetwork.CALLBACKMETHOD_GET and
     * YNetwork.CALLBACKMETHOD_PUT corresponding to the HTTP method used to notify callbacks for
     * significant state changes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackMethod(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('callbackMethod',rest_val);
    }

    /**
     * Returns the encoding standard to use for representing notification values.
     *
     * @return a value among YNetwork.CALLBACKENCODING_FORM, YNetwork.CALLBACKENCODING_JSON,
     * YNetwork.CALLBACKENCODING_JSON_ARRAY, YNetwork.CALLBACKENCODING_CSV,
     * YNetwork.CALLBACKENCODING_YOCTO_API, YNetwork.CALLBACKENCODING_JSON_NUM,
     * YNetwork.CALLBACKENCODING_EMONCMS, YNetwork.CALLBACKENCODING_AZURE,
     * YNetwork.CALLBACKENCODING_INFLUXDB, YNetwork.CALLBACKENCODING_MQTT,
     * YNetwork.CALLBACKENCODING_YOCTO_API_JZON, YNetwork.CALLBACKENCODING_PRTG and
     * YNetwork.CALLBACKENCODING_INFLUXDB_V2 corresponding to the encoding standard to use for
     * representing notification values
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKENCODING_INVALID.
     */
    function YNetwork_get_callbackEncoding()
    {
        var res;                    // enumCALLBACKENCODING;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALLBACKENCODING_INVALID;
            }
        }
        res = this._callbackEncoding;
        return res;
    }

    /**
     * Gets the encoding standard to use for representing notification values.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a value among YNetwork.CALLBACKENCODING_FORM, YNetwork.CALLBACKENCODING_JSON,
     *         YNetwork.CALLBACKENCODING_JSON_ARRAY, YNetwork.CALLBACKENCODING_CSV,
     *         YNetwork.CALLBACKENCODING_YOCTO_API, YNetwork.CALLBACKENCODING_JSON_NUM,
     *         YNetwork.CALLBACKENCODING_EMONCMS, YNetwork.CALLBACKENCODING_AZURE,
     *         YNetwork.CALLBACKENCODING_INFLUXDB, YNetwork.CALLBACKENCODING_MQTT,
     *         YNetwork.CALLBACKENCODING_YOCTO_API_JZON, YNetwork.CALLBACKENCODING_PRTG and
     *         YNetwork.CALLBACKENCODING_INFLUXDB_V2 corresponding to the encoding standard to use for
     *         representing notification values
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKENCODING_INVALID.
     */
    function YNetwork_get_callbackEncoding_async(callback,context)
    {
        var res;                    // enumCALLBACKENCODING;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALLBACKENCODING_INVALID);
            } else {
                callback(context, obj, obj._callbackEncoding);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the encoding standard to use for representing notification values.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YNetwork.CALLBACKENCODING_FORM, YNetwork.CALLBACKENCODING_JSON,
     * YNetwork.CALLBACKENCODING_JSON_ARRAY, YNetwork.CALLBACKENCODING_CSV,
     * YNetwork.CALLBACKENCODING_YOCTO_API, YNetwork.CALLBACKENCODING_JSON_NUM,
     * YNetwork.CALLBACKENCODING_EMONCMS, YNetwork.CALLBACKENCODING_AZURE,
     * YNetwork.CALLBACKENCODING_INFLUXDB, YNetwork.CALLBACKENCODING_MQTT,
     * YNetwork.CALLBACKENCODING_YOCTO_API_JZON, YNetwork.CALLBACKENCODING_PRTG and
     * YNetwork.CALLBACKENCODING_INFLUXDB_V2 corresponding to the encoding standard to use for
     * representing notification values
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackEncoding(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('callbackEncoding',rest_val);
    }

    /**
     * Returns the activation state of the custom template file to customize callback
     * format. If the custom callback template is disabled, it will be ignored even
     * if present on the YoctoHub.
     *
     * @return either YNetwork.CALLBACKTEMPLATE_OFF or YNetwork.CALLBACKTEMPLATE_ON, according to the
     * activation state of the custom template file to customize callback
     *         format
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKTEMPLATE_INVALID.
     */
    function YNetwork_get_callbackTemplate()
    {
        var res;                    // enumONOFF;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALLBACKTEMPLATE_INVALID;
            }
        }
        res = this._callbackTemplate;
        return res;
    }

    /**
     * Gets the activation state of the custom template file to customize callback
     * format. If the custom callback template is disabled, it will be ignored even
     * if present on the YoctoHub.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:either YNetwork.CALLBACKTEMPLATE_OFF or YNetwork.CALLBACKTEMPLATE_ON, according to the
     *         activation state of the custom template file to customize callback
     *         format
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKTEMPLATE_INVALID.
     */
    function YNetwork_get_callbackTemplate_async(callback,context)
    {
        var res;                    // enumONOFF;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALLBACKTEMPLATE_INVALID);
            } else {
                callback(context, obj, obj._callbackTemplate);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Enable the use of a template file to customize callbacks format.
     * When the custom callback template file is enabled, the template file
     * will be loaded for each callback in order to build the data to post to the
     * server. If template file does not exist on the YoctoHub, the callback will
     * fail with an error message indicating the name of the expected template file.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : either YNetwork.CALLBACKTEMPLATE_OFF or YNetwork.CALLBACKTEMPLATE_ON
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackTemplate(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('callbackTemplate',rest_val);
    }

    /**
     * Returns a hashed version of the notification callback credentials if set,
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hashed version of the notification callback credentials if set,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKCREDENTIALS_INVALID.
     */
    function YNetwork_get_callbackCredentials()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALLBACKCREDENTIALS_INVALID;
            }
        }
        res = this._callbackCredentials;
        return res;
    }

    /**
     * Gets a hashed version of the notification callback credentials if set,
     * or an empty string otherwise.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to a hashed version of the notification callback credentials if set,
     *         or an empty string otherwise
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKCREDENTIALS_INVALID.
     */
    function YNetwork_get_callbackCredentials_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALLBACKCREDENTIALS_INVALID);
            } else {
                callback(context, obj, obj._callbackCredentials);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the credentials required to connect to the callback address. The credentials
     * must be provided as returned by function get_callbackCredentials,
     * in the form username:hash. The method used to compute the hash varies according
     * to the the authentication scheme implemented by the callback, For Basic authentication,
     * the hash is the MD5 of the string username:password. For Digest authentication,
     * the hash is the MD5 of the string username:realm:password. For a simpler
     * way to configure callback credentials, use function callbackLogin instead.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the credentials required to connect to the callback address
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackCredentials(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('callbackCredentials',rest_val);
    }

    /**
     * Connects to the notification callback and saves the credentials required to
     * log into it. The password is not stored into the module, only a hashed
     * copy of the credentials are saved. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param username : username required to log to the callback
     * @param password : password required to log to the callback
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_callbackLogin(username,password)
    {   var rest_val;
        rest_val = username+':'+password;
        return this._setAttr('callbackCredentials',rest_val);
    }

    /**
     * Returns the initial waiting time before first callback notifications, in seconds.
     *
     * @return an integer corresponding to the initial waiting time before first callback notifications, in seconds
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKINITIALDELAY_INVALID.
     */
    function YNetwork_get_callbackInitialDelay()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALLBACKINITIALDELAY_INVALID;
            }
        }
        res = this._callbackInitialDelay;
        return res;
    }

    /**
     * Gets the initial waiting time before first callback notifications, in seconds.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:an integer corresponding to the initial waiting time before first callback
     *         notifications, in seconds
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKINITIALDELAY_INVALID.
     */
    function YNetwork_get_callbackInitialDelay_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALLBACKINITIALDELAY_INVALID);
            } else {
                callback(context, obj, obj._callbackInitialDelay);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the initial waiting time before first callback notifications, in seconds.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the initial waiting time before first callback
     * notifications, in seconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackInitialDelay(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('callbackInitialDelay',rest_val);
    }

    /**
     * Returns the HTTP callback schedule strategy, as a text string.
     *
     * @return a string corresponding to the HTTP callback schedule strategy, as a text string
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKSCHEDULE_INVALID.
     */
    function YNetwork_get_callbackSchedule()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALLBACKSCHEDULE_INVALID;
            }
        }
        res = this._callbackSchedule;
        return res;
    }

    /**
     * Gets the HTTP callback schedule strategy, as a text string.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:a string corresponding to the HTTP callback schedule strategy, as a text string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKSCHEDULE_INVALID.
     */
    function YNetwork_get_callbackSchedule_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALLBACKSCHEDULE_INVALID);
            } else {
                callback(context, obj, obj._callbackSchedule);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the HTTP callback schedule strategy, as a text string.
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the HTTP callback schedule strategy, as a text string
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackSchedule(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('callbackSchedule',rest_val);
    }

    /**
     * Returns the minimum waiting time between two HTTP callbacks, in seconds.
     *
     * @return an integer corresponding to the minimum waiting time between two HTTP callbacks, in seconds
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMINDELAY_INVALID.
     */
    function YNetwork_get_callbackMinDelay()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALLBACKMINDELAY_INVALID;
            }
        }
        res = this._callbackMinDelay;
        return res;
    }

    /**
     * Gets the minimum waiting time between two HTTP callbacks, in seconds.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:an integer corresponding to the minimum waiting time between two HTTP callbacks, in seconds
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMINDELAY_INVALID.
     */
    function YNetwork_get_callbackMinDelay_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALLBACKMINDELAY_INVALID);
            } else {
                callback(context, obj, obj._callbackMinDelay);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the minimum waiting time between two HTTP callbacks, in seconds.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the minimum waiting time between two HTTP callbacks, in seconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackMinDelay(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('callbackMinDelay',rest_val);
    }

    /**
     * Returns the waiting time between two HTTP callbacks when there is nothing new.
     *
     * @return an integer corresponding to the waiting time between two HTTP callbacks when there is nothing new
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMAXDELAY_INVALID.
     */
    function YNetwork_get_callbackMaxDelay()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALLBACKMAXDELAY_INVALID;
            }
        }
        res = this._callbackMaxDelay;
        return res;
    }

    /**
     * Gets the waiting time between two HTTP callbacks when there is nothing new.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:an integer corresponding to the waiting time between two HTTP callbacks when there is nothing new
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMAXDELAY_INVALID.
     */
    function YNetwork_get_callbackMaxDelay_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALLBACKMAXDELAY_INVALID);
            } else {
                callback(context, obj, obj._callbackMaxDelay);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the waiting time between two HTTP callbacks when there is nothing new.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the waiting time between two HTTP callbacks when there
     * is nothing new
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackMaxDelay(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('callbackMaxDelay',rest_val);
    }

    /**
     * Returns the current consumed by the module from Power-over-Ethernet (PoE), in milliamps.
     * The current consumption is measured after converting PoE source to 5 Volt, and should
     * never exceed 1800 mA.
     *
     * @return an integer corresponding to the current consumed by the module from Power-over-Ethernet
     * (PoE), in milliamps
     *
     * On failure, throws an exception or returns YNetwork.POECURRENT_INVALID.
     */
    function YNetwork_get_poeCurrent()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_POECURRENT_INVALID;
            }
        }
        res = this._poeCurrent;
        return res;
    }

    /**
     * Gets the current consumed by the module from Power-over-Ethernet (PoE), in milliamps.
     * The current consumption is measured after converting PoE source to 5 Volt, and should
     * never exceed 1800 mA.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YNetwork object that invoked the callback
     *         - the result:an integer corresponding to the current consumed by the module from
     *         Power-over-Ethernet (PoE), in milliamps
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YNetwork.POECURRENT_INVALID.
     */
    function YNetwork_get_poeCurrent_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_POECURRENT_INVALID);
            } else {
                callback(context, obj, obj._poeCurrent);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a network interface for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the network interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YNetwork.isOnline() to test if the network interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a network interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the network interface, for instance
     *         YHUBETH1.network.
     *
     * @return a YNetwork object allowing you to drive the network interface.
     */
    function YNetwork_FindNetwork(func)                         // class method
    {
        var obj;                    // YNetwork;
        obj = YFunction._FindFromCache("Network", func);
        if (obj == null) {
            obj = new YNetwork(func);
            YFunction._AddToCache("Network", func, obj);
        }
        return obj;
    }

    /**
     * Changes the configuration of the network interface to enable the use of an
     * IP address received from a DHCP server. Until an address is received from a DHCP
     * server, the module uses the IP parameters specified to this function.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param fallbackIpAddr : fallback IP address, to be used when no DHCP reply is received
     * @param fallbackSubnetMaskLen : fallback subnet mask length when no DHCP reply is received, as an
     *         integer (e.g. 24 means 255.255.255.0)
     * @param fallbackRouter : fallback router IP address, to be used when no DHCP reply is received
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_useDHCP(fallbackIpAddr,fallbackSubnetMaskLen,fallbackRouter)
    {
        return this.set_ipConfig("DHCP:"+fallbackIpAddr+"/"+String(Math.round(fallbackSubnetMaskLen))+"/"+fallbackRouter);
    }

    /**
     * Changes the configuration of the network interface to enable the use of an
     * IP address received from a DHCP server. Until an address is received from a DHCP
     * server, the module uses an IP of the network 169.254.0.0/16 (APIPA).
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_useDHCPauto()
    {
        return this.set_ipConfig("DHCP:");
    }

    /**
     * Changes the configuration of the network interface to use a static IP address.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param ipAddress : device IP address
     * @param subnetMaskLen : subnet mask length, as an integer (e.g. 24 means 255.255.255.0)
     * @param router : router IP address (default gateway)
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_useStaticIP(ipAddress,subnetMaskLen,router)
    {
        return this.set_ipConfig("STATIC:"+ipAddress+"/"+String(Math.round(subnetMaskLen))+"/"+router);
    }

    /**
     * Pings host to test the network connectivity. Sends four ICMP ECHO_REQUEST requests from the
     * module to the target host. This method returns a string with the result of the
     * 4 ICMP ECHO_REQUEST requests.
     *
     * @param host : the hostname or the IP address of the target
     *
     * @return a string with the result of the ping.
     */
    function YNetwork_ping(host)
    {
        var content;                // bin;

        content = this._download("ping.txt?host="+host);
        return content;
    }

    /**
     * Trigger an HTTP callback quickly. This function can even be called within
     * an HTTP callback, in which case the next callback will be triggered 5 seconds
     * after the end of the current callback, regardless if the minimum time between
     * callbacks configured in the device.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_triggerCallback()
    {
        return this.set_callbackMethod(this.get_callbackMethod());
    }

    /**
     * Set up periodic HTTP callbacks (simplified function).
     *
     * @param interval : a string representing the callback periodicity, expressed in
     *         seconds, minutes or hours, eg. "60s", "5m", "1h", "48h".
     * @param offset : an integer representing the time offset relative to the period
     *         when the callback should occur. For instance, if the periodicity is
     *         24h, an offset of 7 will make the callback occur each day at 7AM.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_periodicCallbackSchedule(interval,offset)
    {
        return this.set_callbackSchedule("every "+interval+"+"+String(Math.round(offset)));
    }

    /**
     * Continues the enumeration of network interfaces started using yFirstNetwork().
     * Caution: You can't make any assumption about the returned network interfaces order.
     * If you want to find a specific a network interface, use Network.findNetwork()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YNetwork object, corresponding to
     *         a network interface currently online, or a null pointer
     *         if there are no more network interfaces to enumerate.
     */
    function YNetwork_nextNetwork()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YNetwork.FindNetwork(next_hwid);
    }

    /**
     * Starts the enumeration of network interfaces currently accessible.
     * Use the method YNetwork.nextNetwork() to iterate on
     * next network interfaces.
     *
     * @return a pointer to a YNetwork object, corresponding to
     *         the first network interface currently online, or a null pointer
     *         if there are none.
     */
    function YNetwork_FirstNetwork()
    {
        var next_hwid = YAPI.getFirstHardwareId('Network');
        if(next_hwid == null) return null;
        return YNetwork.FindNetwork(next_hwid);
    }

    //--- (end of YNetwork implementation)

    //--- (YNetwork initialization)
    YNetwork = YFunction._Subclass(_YNetwork, {
        // Constants
        READINESS_DOWN              : 0,
        READINESS_EXISTS            : 1,
        READINESS_LINKED            : 2,
        READINESS_LAN_OK            : 3,
        READINESS_WWW_OK            : 4,
        READINESS_INVALID           : -1,
        MACADDRESS_INVALID          : YAPI_INVALID_STRING,
        IPADDRESS_INVALID           : YAPI_INVALID_STRING,
        SUBNETMASK_INVALID          : YAPI_INVALID_STRING,
        ROUTER_INVALID              : YAPI_INVALID_STRING,
        CURRENTDNS_INVALID          : YAPI_INVALID_STRING,
        IPCONFIG_INVALID            : YAPI_INVALID_STRING,
        PRIMARYDNS_INVALID          : YAPI_INVALID_STRING,
        SECONDARYDNS_INVALID        : YAPI_INVALID_STRING,
        NTPSERVER_INVALID           : YAPI_INVALID_STRING,
        USERPASSWORD_INVALID        : YAPI_INVALID_STRING,
        ADMINPASSWORD_INVALID       : YAPI_INVALID_STRING,
        HTTPPORT_INVALID            : YAPI_INVALID_UINT,
        DEFAULTPAGE_INVALID         : YAPI_INVALID_STRING,
        DISCOVERABLE_FALSE          : 0,
        DISCOVERABLE_TRUE           : 1,
        DISCOVERABLE_INVALID        : -1,
        WWWWATCHDOGDELAY_INVALID    : YAPI_INVALID_UINT,
        CALLBACKURL_INVALID         : YAPI_INVALID_STRING,
        CALLBACKMETHOD_POST         : 0,
        CALLBACKMETHOD_GET          : 1,
        CALLBACKMETHOD_PUT          : 2,
        CALLBACKMETHOD_INVALID      : -1,
        CALLBACKENCODING_FORM       : 0,
        CALLBACKENCODING_JSON       : 1,
        CALLBACKENCODING_JSON_ARRAY : 2,
        CALLBACKENCODING_CSV        : 3,
        CALLBACKENCODING_YOCTO_API  : 4,
        CALLBACKENCODING_JSON_NUM   : 5,
        CALLBACKENCODING_EMONCMS    : 6,
        CALLBACKENCODING_AZURE      : 7,
        CALLBACKENCODING_INFLUXDB   : 8,
        CALLBACKENCODING_MQTT       : 9,
        CALLBACKENCODING_YOCTO_API_JZON : 10,
        CALLBACKENCODING_PRTG       : 11,
        CALLBACKENCODING_INFLUXDB_V2 : 12,
        CALLBACKENCODING_INVALID    : -1,
        CALLBACKTEMPLATE_OFF        : 0,
        CALLBACKTEMPLATE_ON         : 1,
        CALLBACKTEMPLATE_INVALID    : -1,
        CALLBACKCREDENTIALS_INVALID : YAPI_INVALID_STRING,
        CALLBACKINITIALDELAY_INVALID : YAPI_INVALID_UINT,
        CALLBACKSCHEDULE_INVALID    : YAPI_INVALID_STRING,
        CALLBACKMINDELAY_INVALID    : YAPI_INVALID_UINT,
        CALLBACKMAXDELAY_INVALID    : YAPI_INVALID_UINT,
        POECURRENT_INVALID          : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindNetwork                 : YNetwork_FindNetwork,
        FirstNetwork                : YNetwork_FirstNetwork
    }, {
        // Methods
        get_readiness               : YNetwork_get_readiness,
        readiness                   : YNetwork_get_readiness,
        get_readiness_async         : YNetwork_get_readiness_async,
        readiness_async             : YNetwork_get_readiness_async,
        get_macAddress              : YNetwork_get_macAddress,
        macAddress                  : YNetwork_get_macAddress,
        get_macAddress_async        : YNetwork_get_macAddress_async,
        macAddress_async            : YNetwork_get_macAddress_async,
        get_ipAddress               : YNetwork_get_ipAddress,
        ipAddress                   : YNetwork_get_ipAddress,
        get_ipAddress_async         : YNetwork_get_ipAddress_async,
        ipAddress_async             : YNetwork_get_ipAddress_async,
        get_subnetMask              : YNetwork_get_subnetMask,
        subnetMask                  : YNetwork_get_subnetMask,
        get_subnetMask_async        : YNetwork_get_subnetMask_async,
        subnetMask_async            : YNetwork_get_subnetMask_async,
        get_router                  : YNetwork_get_router,
        router                      : YNetwork_get_router,
        get_router_async            : YNetwork_get_router_async,
        router_async                : YNetwork_get_router_async,
        get_currentDNS              : YNetwork_get_currentDNS,
        currentDNS                  : YNetwork_get_currentDNS,
        get_currentDNS_async        : YNetwork_get_currentDNS_async,
        currentDNS_async            : YNetwork_get_currentDNS_async,
        get_ipConfig                : YNetwork_get_ipConfig,
        ipConfig                    : YNetwork_get_ipConfig,
        get_ipConfig_async          : YNetwork_get_ipConfig_async,
        ipConfig_async              : YNetwork_get_ipConfig_async,
        set_ipConfig                : YNetwork_set_ipConfig,
        setIpConfig                 : YNetwork_set_ipConfig,
        get_primaryDNS              : YNetwork_get_primaryDNS,
        primaryDNS                  : YNetwork_get_primaryDNS,
        get_primaryDNS_async        : YNetwork_get_primaryDNS_async,
        primaryDNS_async            : YNetwork_get_primaryDNS_async,
        set_primaryDNS              : YNetwork_set_primaryDNS,
        setPrimaryDNS               : YNetwork_set_primaryDNS,
        get_secondaryDNS            : YNetwork_get_secondaryDNS,
        secondaryDNS                : YNetwork_get_secondaryDNS,
        get_secondaryDNS_async      : YNetwork_get_secondaryDNS_async,
        secondaryDNS_async          : YNetwork_get_secondaryDNS_async,
        set_secondaryDNS            : YNetwork_set_secondaryDNS,
        setSecondaryDNS             : YNetwork_set_secondaryDNS,
        get_ntpServer               : YNetwork_get_ntpServer,
        ntpServer                   : YNetwork_get_ntpServer,
        get_ntpServer_async         : YNetwork_get_ntpServer_async,
        ntpServer_async             : YNetwork_get_ntpServer_async,
        set_ntpServer               : YNetwork_set_ntpServer,
        setNtpServer                : YNetwork_set_ntpServer,
        get_userPassword            : YNetwork_get_userPassword,
        userPassword                : YNetwork_get_userPassword,
        get_userPassword_async      : YNetwork_get_userPassword_async,
        userPassword_async          : YNetwork_get_userPassword_async,
        set_userPassword            : YNetwork_set_userPassword,
        setUserPassword             : YNetwork_set_userPassword,
        get_adminPassword           : YNetwork_get_adminPassword,
        adminPassword               : YNetwork_get_adminPassword,
        get_adminPassword_async     : YNetwork_get_adminPassword_async,
        adminPassword_async         : YNetwork_get_adminPassword_async,
        set_adminPassword           : YNetwork_set_adminPassword,
        setAdminPassword            : YNetwork_set_adminPassword,
        get_httpPort                : YNetwork_get_httpPort,
        httpPort                    : YNetwork_get_httpPort,
        get_httpPort_async          : YNetwork_get_httpPort_async,
        httpPort_async              : YNetwork_get_httpPort_async,
        set_httpPort                : YNetwork_set_httpPort,
        setHttpPort                 : YNetwork_set_httpPort,
        get_defaultPage             : YNetwork_get_defaultPage,
        defaultPage                 : YNetwork_get_defaultPage,
        get_defaultPage_async       : YNetwork_get_defaultPage_async,
        defaultPage_async           : YNetwork_get_defaultPage_async,
        set_defaultPage             : YNetwork_set_defaultPage,
        setDefaultPage              : YNetwork_set_defaultPage,
        get_discoverable            : YNetwork_get_discoverable,
        discoverable                : YNetwork_get_discoverable,
        get_discoverable_async      : YNetwork_get_discoverable_async,
        discoverable_async          : YNetwork_get_discoverable_async,
        set_discoverable            : YNetwork_set_discoverable,
        setDiscoverable             : YNetwork_set_discoverable,
        get_wwwWatchdogDelay        : YNetwork_get_wwwWatchdogDelay,
        wwwWatchdogDelay            : YNetwork_get_wwwWatchdogDelay,
        get_wwwWatchdogDelay_async  : YNetwork_get_wwwWatchdogDelay_async,
        wwwWatchdogDelay_async      : YNetwork_get_wwwWatchdogDelay_async,
        set_wwwWatchdogDelay        : YNetwork_set_wwwWatchdogDelay,
        setWwwWatchdogDelay         : YNetwork_set_wwwWatchdogDelay,
        get_callbackUrl             : YNetwork_get_callbackUrl,
        callbackUrl                 : YNetwork_get_callbackUrl,
        get_callbackUrl_async       : YNetwork_get_callbackUrl_async,
        callbackUrl_async           : YNetwork_get_callbackUrl_async,
        set_callbackUrl             : YNetwork_set_callbackUrl,
        setCallbackUrl              : YNetwork_set_callbackUrl,
        get_callbackMethod          : YNetwork_get_callbackMethod,
        callbackMethod              : YNetwork_get_callbackMethod,
        get_callbackMethod_async    : YNetwork_get_callbackMethod_async,
        callbackMethod_async        : YNetwork_get_callbackMethod_async,
        set_callbackMethod          : YNetwork_set_callbackMethod,
        setCallbackMethod           : YNetwork_set_callbackMethod,
        get_callbackEncoding        : YNetwork_get_callbackEncoding,
        callbackEncoding            : YNetwork_get_callbackEncoding,
        get_callbackEncoding_async  : YNetwork_get_callbackEncoding_async,
        callbackEncoding_async      : YNetwork_get_callbackEncoding_async,
        set_callbackEncoding        : YNetwork_set_callbackEncoding,
        setCallbackEncoding         : YNetwork_set_callbackEncoding,
        get_callbackTemplate        : YNetwork_get_callbackTemplate,
        callbackTemplate            : YNetwork_get_callbackTemplate,
        get_callbackTemplate_async  : YNetwork_get_callbackTemplate_async,
        callbackTemplate_async      : YNetwork_get_callbackTemplate_async,
        set_callbackTemplate        : YNetwork_set_callbackTemplate,
        setCallbackTemplate         : YNetwork_set_callbackTemplate,
        get_callbackCredentials     : YNetwork_get_callbackCredentials,
        callbackCredentials         : YNetwork_get_callbackCredentials,
        get_callbackCredentials_async : YNetwork_get_callbackCredentials_async,
        callbackCredentials_async   : YNetwork_get_callbackCredentials_async,
        set_callbackCredentials     : YNetwork_set_callbackCredentials,
        setCallbackCredentials      : YNetwork_set_callbackCredentials,
        callbackLogin               : YNetwork_callbackLogin,
        get_callbackInitialDelay    : YNetwork_get_callbackInitialDelay,
        callbackInitialDelay        : YNetwork_get_callbackInitialDelay,
        get_callbackInitialDelay_async : YNetwork_get_callbackInitialDelay_async,
        callbackInitialDelay_async  : YNetwork_get_callbackInitialDelay_async,
        set_callbackInitialDelay    : YNetwork_set_callbackInitialDelay,
        setCallbackInitialDelay     : YNetwork_set_callbackInitialDelay,
        get_callbackSchedule        : YNetwork_get_callbackSchedule,
        callbackSchedule            : YNetwork_get_callbackSchedule,
        get_callbackSchedule_async  : YNetwork_get_callbackSchedule_async,
        callbackSchedule_async      : YNetwork_get_callbackSchedule_async,
        set_callbackSchedule        : YNetwork_set_callbackSchedule,
        setCallbackSchedule         : YNetwork_set_callbackSchedule,
        get_callbackMinDelay        : YNetwork_get_callbackMinDelay,
        callbackMinDelay            : YNetwork_get_callbackMinDelay,
        get_callbackMinDelay_async  : YNetwork_get_callbackMinDelay_async,
        callbackMinDelay_async      : YNetwork_get_callbackMinDelay_async,
        set_callbackMinDelay        : YNetwork_set_callbackMinDelay,
        setCallbackMinDelay         : YNetwork_set_callbackMinDelay,
        get_callbackMaxDelay        : YNetwork_get_callbackMaxDelay,
        callbackMaxDelay            : YNetwork_get_callbackMaxDelay,
        get_callbackMaxDelay_async  : YNetwork_get_callbackMaxDelay_async,
        callbackMaxDelay_async      : YNetwork_get_callbackMaxDelay_async,
        set_callbackMaxDelay        : YNetwork_set_callbackMaxDelay,
        setCallbackMaxDelay         : YNetwork_set_callbackMaxDelay,
        get_poeCurrent              : YNetwork_get_poeCurrent,
        poeCurrent                  : YNetwork_get_poeCurrent,
        get_poeCurrent_async        : YNetwork_get_poeCurrent_async,
        poeCurrent_async            : YNetwork_get_poeCurrent_async,
        useDHCP                     : YNetwork_useDHCP,
        useDHCPauto                 : YNetwork_useDHCPauto,
        useStaticIP                 : YNetwork_useStaticIP,
        ping                        : YNetwork_ping,
        triggerCallback             : YNetwork_triggerCallback,
        set_periodicCallbackSchedule : YNetwork_set_periodicCallbackSchedule,
        setPeriodicCallbackSchedule : YNetwork_set_periodicCallbackSchedule,
        nextNetwork                 : YNetwork_nextNetwork,
        _parseAttr                  : YNetwork_parseAttr
    });
    //--- (end of YNetwork initialization)
})();

//--- (YNetwork functions)

/**
 * Retrieves a network interface for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the network interface is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YNetwork.isOnline() to test if the network interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a network interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the network interface, for instance
 *         YHUBETH1.network.
 *
 * @return a YNetwork object allowing you to drive the network interface.
 */
function yFindNetwork(func)
{
    return YNetwork.FindNetwork(func);
}

/**
 * Starts the enumeration of network interfaces currently accessible.
 * Use the method YNetwork.nextNetwork() to iterate on
 * next network interfaces.
 *
 * @return a pointer to a YNetwork object, corresponding to
 *         the first network interface currently online, or a null pointer
 *         if there are none.
 */
function yFirstNetwork()
{
    return YNetwork.FirstNetwork();
}

//--- (end of YNetwork functions)
