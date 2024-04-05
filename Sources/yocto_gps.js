/*********************************************************************
 *
 *  $Id: yocto_gps.js 59977 2024-03-18 15:02:32Z mvuilleu $
 *
 *  Implements the high-level API for Gps functions
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

//--- (YGps return codes)
//--- (end of YGps return codes)
//--- (YGps definitions)
var Y_ISFIXED_FALSE                 = 0;
var Y_ISFIXED_TRUE                  = 1;
var Y_ISFIXED_INVALID               = -1;
var Y_COORDSYSTEM_GPS_DMS           = 0;
var Y_COORDSYSTEM_GPS_DM            = 1;
var Y_COORDSYSTEM_GPS_D             = 2;
var Y_COORDSYSTEM_INVALID           = -1;
var Y_CONSTELLATION_GNSS            = 0;
var Y_CONSTELLATION_GPS             = 1;
var Y_CONSTELLATION_GLONASS         = 2;
var Y_CONSTELLATION_GALILEO         = 3;
var Y_CONSTELLATION_GPS_GLONASS     = 4;
var Y_CONSTELLATION_GPS_GALILEO     = 5;
var Y_CONSTELLATION_GLONASS_GALILEO = 6;
var Y_CONSTELLATION_INVALID         = -1;
var Y_SATCOUNT_INVALID              = YAPI_INVALID_LONG;
var Y_SATPERCONST_INVALID           = YAPI_INVALID_LONG;
var Y_GPSREFRESHRATE_INVALID        = YAPI_INVALID_DOUBLE;
var Y_LATITUDE_INVALID              = YAPI_INVALID_STRING;
var Y_LONGITUDE_INVALID             = YAPI_INVALID_STRING;
var Y_DILUTION_INVALID              = YAPI_INVALID_DOUBLE;
var Y_ALTITUDE_INVALID              = YAPI_INVALID_DOUBLE;
var Y_GROUNDSPEED_INVALID           = YAPI_INVALID_DOUBLE;
var Y_DIRECTION_INVALID             = YAPI_INVALID_DOUBLE;
var Y_UNIXTIME_INVALID              = YAPI_INVALID_LONG;
var Y_DATETIME_INVALID              = YAPI_INVALID_STRING;
var Y_UTCOFFSET_INVALID             = YAPI_INVALID_INT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YGps definitions)

//--- (YGps class start)
/**
 * YGps Class: Geolocalization control interface (GPS, GNSS, ...), available for instance in the Yocto-GPS-V2
 *
 * The YGps class allows you to retrieve positioning
 * data from a GPS/GNSS sensor. This class can provides
 * complete positioning information. However, if you
 * wish to define callbacks on position changes or record
 * the position in the datalogger, you
 * should use the YLatitude et YLongitude classes.
 */
//--- (end of YGps class start)

var YGps; // definition below
(function()
{
    function _YGps(str_func)
    {
        //--- (YGps constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Gps';

        this._isFixed                        = Y_ISFIXED_INVALID;          // Bool
        this._satCount                       = Y_SATCOUNT_INVALID;         // UInt
        this._satPerConst                    = Y_SATPERCONST_INVALID;      // UInt
        this._gpsRefreshRate                 = Y_GPSREFRESHRATE_INVALID;   // MeasureVal
        this._coordSystem                    = Y_COORDSYSTEM_INVALID;      // GPSCoordinateSystem
        this._constellation                  = Y_CONSTELLATION_INVALID;    // GPSConstellation
        this._latitude                       = Y_LATITUDE_INVALID;         // Text
        this._longitude                      = Y_LONGITUDE_INVALID;        // Text
        this._dilution                       = Y_DILUTION_INVALID;         // MeasureVal
        this._altitude                       = Y_ALTITUDE_INVALID;         // MeasureVal
        this._groundSpeed                    = Y_GROUNDSPEED_INVALID;      // MeasureVal
        this._direction                      = Y_DIRECTION_INVALID;        // MeasureVal
        this._unixTime                       = Y_UNIXTIME_INVALID;         // UTCTime
        this._dateTime                       = Y_DATETIME_INVALID;         // Text
        this._utcOffset                      = Y_UTCOFFSET_INVALID;        // Int
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YGps constructor)
    }

    //--- (YGps implementation)

    function YGps_parseAttr(name, val, _super)
    {
        switch(name) {
        case "isFixed":
            this._isFixed = parseInt(val);
            return 1;
        case "satCount":
            this._satCount = parseInt(val);
            return 1;
        case "satPerConst":
            this._satPerConst = parseInt(val);
            return 1;
        case "gpsRefreshRate":
            this._gpsRefreshRate = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "coordSystem":
            this._coordSystem = parseInt(val);
            return 1;
        case "constellation":
            this._constellation = parseInt(val);
            return 1;
        case "latitude":
            this._latitude = val;
            return 1;
        case "longitude":
            this._longitude = val;
            return 1;
        case "dilution":
            this._dilution = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "altitude":
            this._altitude = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "groundSpeed":
            this._groundSpeed = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "direction":
            this._direction = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "unixTime":
            this._unixTime = parseInt(val);
            return 1;
        case "dateTime":
            this._dateTime = val;
            return 1;
        case "utcOffset":
            this._utcOffset = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns TRUE if the receiver has found enough satellites to work.
     *
     * @return either YGps.ISFIXED_FALSE or YGps.ISFIXED_TRUE, according to TRUE if the receiver has found
     * enough satellites to work
     *
     * On failure, throws an exception or returns YGps.ISFIXED_INVALID.
     */
    function YGps_get_isFixed()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ISFIXED_INVALID;
            }
        }
        res = this._isFixed;
        return res;
    }

    /**
     * Gets TRUE if the receiver has found enough satellites to work.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:either YGps.ISFIXED_FALSE or YGps.ISFIXED_TRUE, according to TRUE if the receiver has
     *         found enough satellites to work
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.ISFIXED_INVALID.
     */
    function YGps_get_isFixed_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ISFIXED_INVALID);
            } else {
                callback(context, obj, obj._isFixed);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total count of satellites used to compute GPS position.
     *
     * @return an integer corresponding to the total count of satellites used to compute GPS position
     *
     * On failure, throws an exception or returns YGps.SATCOUNT_INVALID.
     */
    function YGps_get_satCount()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SATCOUNT_INVALID;
            }
        }
        res = this._satCount;
        return res;
    }

    /**
     * Gets the total count of satellites used to compute GPS position.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:an integer corresponding to the total count of satellites used to compute GPS position
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.SATCOUNT_INVALID.
     */
    function YGps_get_satCount_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SATCOUNT_INVALID);
            } else {
                callback(context, obj, obj._satCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the count of visible satellites per constellation encoded
     * on a 32 bit integer: bits 0..5: GPS satellites count,  bits 6..11 : Glonass, bits 12..17 : Galileo.
     * this value is refreshed every 5 seconds only.
     *
     * @return an integer corresponding to the count of visible satellites per constellation encoded
     *         on a 32 bit integer: bits 0.
     *
     * On failure, throws an exception or returns YGps.SATPERCONST_INVALID.
     */
    function YGps_get_satPerConst()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SATPERCONST_INVALID;
            }
        }
        res = this._satPerConst;
        return res;
    }

    /**
     * Gets the count of visible satellites per constellation encoded
     * on a 32 bit integer: bits 0..5: GPS satellites count,  bits 6..11 : Glonass, bits 12..17 : Galileo.
     * this value is refreshed every 5 seconds only.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:an integer corresponding to the count of visible satellites per constellation encoded
     *         on a 32 bit integer: bits 0.
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.SATPERCONST_INVALID.
     */
    function YGps_get_satPerConst_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SATPERCONST_INVALID);
            } else {
                callback(context, obj, obj._satPerConst);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns effective GPS data refresh frequency.
     * this value is refreshed every 5 seconds only.
     *
     * @return a floating point number corresponding to effective GPS data refresh frequency
     *
     * On failure, throws an exception or returns YGps.GPSREFRESHRATE_INVALID.
     */
    function YGps_get_gpsRefreshRate()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_GPSREFRESHRATE_INVALID;
            }
        }
        res = this._gpsRefreshRate;
        return res;
    }

    /**
     * Gets effective GPS data refresh frequency.
     * this value is refreshed every 5 seconds only.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:a floating point number corresponding to effective GPS data refresh frequency
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.GPSREFRESHRATE_INVALID.
     */
    function YGps_get_gpsRefreshRate_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_GPSREFRESHRATE_INVALID);
            } else {
                callback(context, obj, obj._gpsRefreshRate);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the representation system used for positioning data.
     *
     * @return a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and YGps.COORDSYSTEM_GPS_D
     * corresponding to the representation system used for positioning data
     *
     * On failure, throws an exception or returns YGps.COORDSYSTEM_INVALID.
     */
    function YGps_get_coordSystem()
    {
        var res;                    // enumGPSCOORDINATESYSTEM;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COORDSYSTEM_INVALID;
            }
        }
        res = this._coordSystem;
        return res;
    }

    /**
     * Gets the representation system used for positioning data.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and
     *         YGps.COORDSYSTEM_GPS_D corresponding to the representation system used for positioning data
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.COORDSYSTEM_INVALID.
     */
    function YGps_get_coordSystem_async(callback,context)
    {
        var res;                    // enumGPSCOORDINATESYSTEM;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COORDSYSTEM_INVALID);
            } else {
                callback(context, obj, obj._coordSystem);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the representation system used for positioning data.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and
     * YGps.COORDSYSTEM_GPS_D corresponding to the representation system used for positioning data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YGps_set_coordSystem(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('coordSystem',rest_val);
    }

    /**
     * Returns the the satellites constellation used to compute
     * positioning data.
     *
     * @return a value among YGps.CONSTELLATION_GNSS, YGps.CONSTELLATION_GPS, YGps.CONSTELLATION_GLONASS,
     * YGps.CONSTELLATION_GALILEO, YGps.CONSTELLATION_GPS_GLONASS, YGps.CONSTELLATION_GPS_GALILEO and
     * YGps.CONSTELLATION_GLONASS_GALILEO corresponding to the the satellites constellation used to compute
     *         positioning data
     *
     * On failure, throws an exception or returns YGps.CONSTELLATION_INVALID.
     */
    function YGps_get_constellation()
    {
        var res;                    // enumGPSCONSTELLATION;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CONSTELLATION_INVALID;
            }
        }
        res = this._constellation;
        return res;
    }

    /**
     * Gets the the satellites constellation used to compute
     * positioning data.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:a value among YGps.CONSTELLATION_GNSS, YGps.CONSTELLATION_GPS,
     *         YGps.CONSTELLATION_GLONASS, YGps.CONSTELLATION_GALILEO, YGps.CONSTELLATION_GPS_GLONASS,
     *         YGps.CONSTELLATION_GPS_GALILEO and YGps.CONSTELLATION_GLONASS_GALILEO corresponding to the the
     *         satellites constellation used to compute
     *         positioning data
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.CONSTELLATION_INVALID.
     */
    function YGps_get_constellation_async(callback,context)
    {
        var res;                    // enumGPSCONSTELLATION;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CONSTELLATION_INVALID);
            } else {
                callback(context, obj, obj._constellation);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the satellites constellation used to compute
     * positioning data. Possible  constellations are GNSS ( = all supported constellations),
     * GPS, Glonass, Galileo , and the 3 possible pairs. This setting has  no effect on Yocto-GPS (V1).
     *
     * @param newval : a value among YGps.CONSTELLATION_GNSS, YGps.CONSTELLATION_GPS,
     * YGps.CONSTELLATION_GLONASS, YGps.CONSTELLATION_GALILEO, YGps.CONSTELLATION_GPS_GLONASS,
     * YGps.CONSTELLATION_GPS_GALILEO and YGps.CONSTELLATION_GLONASS_GALILEO corresponding to the
     * satellites constellation used to compute
     *         positioning data
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YGps_set_constellation(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('constellation',rest_val);
    }

    /**
     * Returns the current latitude.
     *
     * @return a string corresponding to the current latitude
     *
     * On failure, throws an exception or returns YGps.LATITUDE_INVALID.
     */
    function YGps_get_latitude()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LATITUDE_INVALID;
            }
        }
        res = this._latitude;
        return res;
    }

    /**
     * Gets the current latitude.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:a string corresponding to the current latitude
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.LATITUDE_INVALID.
     */
    function YGps_get_latitude_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LATITUDE_INVALID);
            } else {
                callback(context, obj, obj._latitude);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current longitude.
     *
     * @return a string corresponding to the current longitude
     *
     * On failure, throws an exception or returns YGps.LONGITUDE_INVALID.
     */
    function YGps_get_longitude()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LONGITUDE_INVALID;
            }
        }
        res = this._longitude;
        return res;
    }

    /**
     * Gets the current longitude.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:a string corresponding to the current longitude
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.LONGITUDE_INVALID.
     */
    function YGps_get_longitude_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LONGITUDE_INVALID);
            } else {
                callback(context, obj, obj._longitude);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current horizontal dilution of precision,
     * the smaller that number is, the better .
     *
     * @return a floating point number corresponding to the current horizontal dilution of precision,
     *         the smaller that number is, the better
     *
     * On failure, throws an exception or returns YGps.DILUTION_INVALID.
     */
    function YGps_get_dilution()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DILUTION_INVALID;
            }
        }
        res = this._dilution;
        return res;
    }

    /**
     * Gets the current horizontal dilution of precision,
     * the smaller that number is, the better .
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:a floating point number corresponding to the current horizontal dilution of precision,
     *         the smaller that number is, the better
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.DILUTION_INVALID.
     */
    function YGps_get_dilution_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DILUTION_INVALID);
            } else {
                callback(context, obj, obj._dilution);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current altitude. Beware:  GPS technology
     * is very inaccurate regarding altitude.
     *
     * @return a floating point number corresponding to the current altitude
     *
     * On failure, throws an exception or returns YGps.ALTITUDE_INVALID.
     */
    function YGps_get_altitude()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ALTITUDE_INVALID;
            }
        }
        res = this._altitude;
        return res;
    }

    /**
     * Gets the current altitude. Beware:  GPS technology
     * is very inaccurate regarding altitude.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:a floating point number corresponding to the current altitude
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.ALTITUDE_INVALID.
     */
    function YGps_get_altitude_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ALTITUDE_INVALID);
            } else {
                callback(context, obj, obj._altitude);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current ground speed in Km/h.
     *
     * @return a floating point number corresponding to the current ground speed in Km/h
     *
     * On failure, throws an exception or returns YGps.GROUNDSPEED_INVALID.
     */
    function YGps_get_groundSpeed()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_GROUNDSPEED_INVALID;
            }
        }
        res = this._groundSpeed;
        return res;
    }

    /**
     * Gets the current ground speed in Km/h.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:a floating point number corresponding to the current ground speed in Km/h
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.GROUNDSPEED_INVALID.
     */
    function YGps_get_groundSpeed_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_GROUNDSPEED_INVALID);
            } else {
                callback(context, obj, obj._groundSpeed);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current move bearing in degrees, zero
     * is the true (geographic) north.
     *
     * @return a floating point number corresponding to the current move bearing in degrees, zero
     *         is the true (geographic) north
     *
     * On failure, throws an exception or returns YGps.DIRECTION_INVALID.
     */
    function YGps_get_direction()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DIRECTION_INVALID;
            }
        }
        res = this._direction;
        return res;
    }

    /**
     * Gets the current move bearing in degrees, zero
     * is the true (geographic) north.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:a floating point number corresponding to the current move bearing in degrees, zero
     *         is the true (geographic) north
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.DIRECTION_INVALID.
     */
    function YGps_get_direction_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DIRECTION_INVALID);
            } else {
                callback(context, obj, obj._direction);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current time in Unix format (number of
     * seconds elapsed since Jan 1st, 1970).
     *
     * @return an integer corresponding to the current time in Unix format (number of
     *         seconds elapsed since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns YGps.UNIXTIME_INVALID.
     */
    function YGps_get_unixTime()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_UNIXTIME_INVALID;
            }
        }
        res = this._unixTime;
        return res;
    }

    /**
     * Gets the current time in Unix format (number of
     * seconds elapsed since Jan 1st, 1970).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:an integer corresponding to the current time in Unix format (number of
     *         seconds elapsed since Jan 1st, 1970)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.UNIXTIME_INVALID.
     */
    function YGps_get_unixTime_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_UNIXTIME_INVALID);
            } else {
                callback(context, obj, obj._unixTime);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns YGps.DATETIME_INVALID.
     */
    function YGps_get_dateTime()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DATETIME_INVALID;
            }
        }
        res = this._dateTime;
        return res;
    }

    /**
     * Gets the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.DATETIME_INVALID.
     */
    function YGps_get_dateTime_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DATETIME_INVALID);
            } else {
                callback(context, obj, obj._dateTime);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns YGps.UTCOFFSET_INVALID.
     */
    function YGps_get_utcOffset()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_UTCOFFSET_INVALID;
            }
        }
        res = this._utcOffset;
        return res;
    }

    /**
     * Gets the number of seconds between current time and UTC time (time zone).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGps object that invoked the callback
     *         - the result:an integer corresponding to the number of seconds between current time and UTC time (time zone)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YGps.UTCOFFSET_INVALID.
     */
    function YGps_get_utcOffset_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_UTCOFFSET_INVALID);
            } else {
                callback(context, obj, obj._utcOffset);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * If current UTC time is known, the current time is automatically be updated according to the selected time zone.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YGps_set_utcOffset(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('utcOffset',rest_val);
    }

    function YGps_get_command()
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
     *         - the YGps object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YGps_get_command_async(callback,context)
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

    function YGps_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a geolocalization module for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the geolocalization module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGps.isOnline() to test if the geolocalization module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a geolocalization module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the geolocalization module, for instance
     *         YGNSSMK2.gps.
     *
     * @return a YGps object allowing you to drive the geolocalization module.
     */
    function YGps_FindGps(func)                                 // class method
    {
        var obj;                    // YGps;
        obj = YFunction._FindFromCache("Gps", func);
        if (obj == null) {
            obj = new YGps(func);
            YFunction._AddToCache("Gps", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of geolocalization modules started using yFirstGps().
     * Caution: You can't make any assumption about the returned geolocalization modules order.
     * If you want to find a specific a geolocalization module, use Gps.findGps()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YGps object, corresponding to
     *         a geolocalization module currently online, or a null pointer
     *         if there are no more geolocalization modules to enumerate.
     */
    function YGps_nextGps()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YGps.FindGps(next_hwid);
    }

    /**
     * Starts the enumeration of geolocalization modules currently accessible.
     * Use the method YGps.nextGps() to iterate on
     * next geolocalization modules.
     *
     * @return a pointer to a YGps object, corresponding to
     *         the first geolocalization module currently online, or a null pointer
     *         if there are none.
     */
    function YGps_FirstGps()
    {
        var next_hwid = YAPI.getFirstHardwareId('Gps');
        if(next_hwid == null) return null;
        return YGps.FindGps(next_hwid);
    }

    //--- (end of YGps implementation)

    //--- (YGps initialization)
    YGps = YFunction._Subclass(_YGps, {
        // Constants
        ISFIXED_FALSE               : 0,
        ISFIXED_TRUE                : 1,
        ISFIXED_INVALID             : -1,
        SATCOUNT_INVALID            : YAPI_INVALID_LONG,
        SATPERCONST_INVALID         : YAPI_INVALID_LONG,
        GPSREFRESHRATE_INVALID      : YAPI_INVALID_DOUBLE,
        COORDSYSTEM_GPS_DMS         : 0,
        COORDSYSTEM_GPS_DM          : 1,
        COORDSYSTEM_GPS_D           : 2,
        COORDSYSTEM_INVALID         : -1,
        CONSTELLATION_GNSS          : 0,
        CONSTELLATION_GPS           : 1,
        CONSTELLATION_GLONASS       : 2,
        CONSTELLATION_GALILEO       : 3,
        CONSTELLATION_GPS_GLONASS   : 4,
        CONSTELLATION_GPS_GALILEO   : 5,
        CONSTELLATION_GLONASS_GALILEO : 6,
        CONSTELLATION_INVALID       : -1,
        LATITUDE_INVALID            : YAPI_INVALID_STRING,
        LONGITUDE_INVALID           : YAPI_INVALID_STRING,
        DILUTION_INVALID            : YAPI_INVALID_DOUBLE,
        ALTITUDE_INVALID            : YAPI_INVALID_DOUBLE,
        GROUNDSPEED_INVALID         : YAPI_INVALID_DOUBLE,
        DIRECTION_INVALID           : YAPI_INVALID_DOUBLE,
        UNIXTIME_INVALID            : YAPI_INVALID_LONG,
        DATETIME_INVALID            : YAPI_INVALID_STRING,
        UTCOFFSET_INVALID           : YAPI_INVALID_INT,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindGps                     : YGps_FindGps,
        FirstGps                    : YGps_FirstGps
    }, {
        // Methods
        get_isFixed                 : YGps_get_isFixed,
        isFixed                     : YGps_get_isFixed,
        get_isFixed_async           : YGps_get_isFixed_async,
        isFixed_async               : YGps_get_isFixed_async,
        get_satCount                : YGps_get_satCount,
        satCount                    : YGps_get_satCount,
        get_satCount_async          : YGps_get_satCount_async,
        satCount_async              : YGps_get_satCount_async,
        get_satPerConst             : YGps_get_satPerConst,
        satPerConst                 : YGps_get_satPerConst,
        get_satPerConst_async       : YGps_get_satPerConst_async,
        satPerConst_async           : YGps_get_satPerConst_async,
        get_gpsRefreshRate          : YGps_get_gpsRefreshRate,
        gpsRefreshRate              : YGps_get_gpsRefreshRate,
        get_gpsRefreshRate_async    : YGps_get_gpsRefreshRate_async,
        gpsRefreshRate_async        : YGps_get_gpsRefreshRate_async,
        get_coordSystem             : YGps_get_coordSystem,
        coordSystem                 : YGps_get_coordSystem,
        get_coordSystem_async       : YGps_get_coordSystem_async,
        coordSystem_async           : YGps_get_coordSystem_async,
        set_coordSystem             : YGps_set_coordSystem,
        setCoordSystem              : YGps_set_coordSystem,
        get_constellation           : YGps_get_constellation,
        constellation               : YGps_get_constellation,
        get_constellation_async     : YGps_get_constellation_async,
        constellation_async         : YGps_get_constellation_async,
        set_constellation           : YGps_set_constellation,
        setConstellation            : YGps_set_constellation,
        get_latitude                : YGps_get_latitude,
        latitude                    : YGps_get_latitude,
        get_latitude_async          : YGps_get_latitude_async,
        latitude_async              : YGps_get_latitude_async,
        get_longitude               : YGps_get_longitude,
        longitude                   : YGps_get_longitude,
        get_longitude_async         : YGps_get_longitude_async,
        longitude_async             : YGps_get_longitude_async,
        get_dilution                : YGps_get_dilution,
        dilution                    : YGps_get_dilution,
        get_dilution_async          : YGps_get_dilution_async,
        dilution_async              : YGps_get_dilution_async,
        get_altitude                : YGps_get_altitude,
        altitude                    : YGps_get_altitude,
        get_altitude_async          : YGps_get_altitude_async,
        altitude_async              : YGps_get_altitude_async,
        get_groundSpeed             : YGps_get_groundSpeed,
        groundSpeed                 : YGps_get_groundSpeed,
        get_groundSpeed_async       : YGps_get_groundSpeed_async,
        groundSpeed_async           : YGps_get_groundSpeed_async,
        get_direction               : YGps_get_direction,
        direction                   : YGps_get_direction,
        get_direction_async         : YGps_get_direction_async,
        direction_async             : YGps_get_direction_async,
        get_unixTime                : YGps_get_unixTime,
        unixTime                    : YGps_get_unixTime,
        get_unixTime_async          : YGps_get_unixTime_async,
        unixTime_async              : YGps_get_unixTime_async,
        get_dateTime                : YGps_get_dateTime,
        dateTime                    : YGps_get_dateTime,
        get_dateTime_async          : YGps_get_dateTime_async,
        dateTime_async              : YGps_get_dateTime_async,
        get_utcOffset               : YGps_get_utcOffset,
        utcOffset                   : YGps_get_utcOffset,
        get_utcOffset_async         : YGps_get_utcOffset_async,
        utcOffset_async             : YGps_get_utcOffset_async,
        set_utcOffset               : YGps_set_utcOffset,
        setUtcOffset                : YGps_set_utcOffset,
        get_command                 : YGps_get_command,
        command                     : YGps_get_command,
        get_command_async           : YGps_get_command_async,
        command_async               : YGps_get_command_async,
        set_command                 : YGps_set_command,
        setCommand                  : YGps_set_command,
        nextGps                     : YGps_nextGps,
        _parseAttr                  : YGps_parseAttr
    });
    //--- (end of YGps initialization)
})();

//--- (YGps functions)

/**
 * Retrieves a geolocalization module for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the geolocalization module is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YGps.isOnline() to test if the geolocalization module is
 * indeed online at a given time. In case of ambiguity when looking for
 * a geolocalization module by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the geolocalization module, for instance
 *         YGNSSMK2.gps.
 *
 * @return a YGps object allowing you to drive the geolocalization module.
 */
function yFindGps(func)
{
    return YGps.FindGps(func);
}

/**
 * Starts the enumeration of geolocalization modules currently accessible.
 * Use the method YGps.nextGps() to iterate on
 * next geolocalization modules.
 *
 * @return a pointer to a YGps object, corresponding to
 *         the first geolocalization module currently online, or a null pointer
 *         if there are none.
 */
function yFirstGps()
{
    return YGps.FirstGps();
}

//--- (end of YGps functions)
