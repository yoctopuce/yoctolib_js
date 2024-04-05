/*********************************************************************
 *
 *  $Id: yocto_i2cport.js 52943 2023-01-26 15:46:47Z mvuilleu $
 *
 *  Implements the high-level API for I2cPort functions
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

//--- (generated code: YInputCapture return codes)
//--- (end of generated code: YInputCapture return codes)
//--- (generated code: YInputCapture definitions)
var Y_CAPTURETYPE_NONE              = 0;
var Y_CAPTURETYPE_TIMED             = 1;
var Y_CAPTURETYPE_V_MAX             = 2;
var Y_CAPTURETYPE_V_MIN             = 3;
var Y_CAPTURETYPE_I_MAX             = 4;
var Y_CAPTURETYPE_I_MIN             = 5;
var Y_CAPTURETYPE_P_MAX             = 6;
var Y_CAPTURETYPE_P_MIN             = 7;
var Y_CAPTURETYPE_V_AVG_MAX         = 8;
var Y_CAPTURETYPE_V_AVG_MIN         = 9;
var Y_CAPTURETYPE_V_RMS_MAX         = 10;
var Y_CAPTURETYPE_V_RMS_MIN         = 11;
var Y_CAPTURETYPE_I_AVG_MAX         = 12;
var Y_CAPTURETYPE_I_AVG_MIN         = 13;
var Y_CAPTURETYPE_I_RMS_MAX         = 14;
var Y_CAPTURETYPE_I_RMS_MIN         = 15;
var Y_CAPTURETYPE_P_AVG_MAX         = 16;
var Y_CAPTURETYPE_P_AVG_MIN         = 17;
var Y_CAPTURETYPE_PF_MIN            = 18;
var Y_CAPTURETYPE_DPF_MIN           = 19;
var Y_CAPTURETYPE_INVALID           = -1;
var Y_CAPTURETYPEATSTARTUP_NONE     = 0;
var Y_CAPTURETYPEATSTARTUP_TIMED    = 1;
var Y_CAPTURETYPEATSTARTUP_V_MAX    = 2;
var Y_CAPTURETYPEATSTARTUP_V_MIN    = 3;
var Y_CAPTURETYPEATSTARTUP_I_MAX    = 4;
var Y_CAPTURETYPEATSTARTUP_I_MIN    = 5;
var Y_CAPTURETYPEATSTARTUP_P_MAX    = 6;
var Y_CAPTURETYPEATSTARTUP_P_MIN    = 7;
var Y_CAPTURETYPEATSTARTUP_V_AVG_MAX = 8;
var Y_CAPTURETYPEATSTARTUP_V_AVG_MIN = 9;
var Y_CAPTURETYPEATSTARTUP_V_RMS_MAX = 10;
var Y_CAPTURETYPEATSTARTUP_V_RMS_MIN = 11;
var Y_CAPTURETYPEATSTARTUP_I_AVG_MAX = 12;
var Y_CAPTURETYPEATSTARTUP_I_AVG_MIN = 13;
var Y_CAPTURETYPEATSTARTUP_I_RMS_MAX = 14;
var Y_CAPTURETYPEATSTARTUP_I_RMS_MIN = 15;
var Y_CAPTURETYPEATSTARTUP_P_AVG_MAX = 16;
var Y_CAPTURETYPEATSTARTUP_P_AVG_MIN = 17;
var Y_CAPTURETYPEATSTARTUP_PF_MIN   = 18;
var Y_CAPTURETYPEATSTARTUP_DPF_MIN  = 19;
var Y_CAPTURETYPEATSTARTUP_INVALID  = -1;
var Y_LASTCAPTURETIME_INVALID       = YAPI_INVALID_LONG;
var Y_NSAMPLES_INVALID              = YAPI_INVALID_UINT;
var Y_SAMPLINGRATE_INVALID          = YAPI_INVALID_UINT;
var Y_CONDVALUE_INVALID             = YAPI_INVALID_DOUBLE;
var Y_CONDALIGN_INVALID             = YAPI_INVALID_UINT;
var Y_CONDVALUEATSTARTUP_INVALID    = YAPI_INVALID_DOUBLE;
//--- (end of generated code: YInputCapture definitions)

//--- (generated code: YInputCaptureData definitions)
//--- (end of generated code: YInputCaptureData definitions)

//--- (generated code: YInputCaptureData class start)
/**
 * YInputCaptureData Class: Sampled data from a Yoctopuce electrical sensor
 *
 * InputCaptureData objects represent raw data
 * sampled by the analog/digital converter present in
 * a Yoctopuce electrical sensor. When several inputs
 * are samples simultaneously, their data are provided
 * as distinct series.
 */
//--- (end of generated code: YInputCaptureData class start)

var YInputCaptureData; // definition below
(function()
{
    function _YInputCaptureData(yfun, sdata)
    {
        //--- (generated code: YInputCaptureData constructor)
        this._fmt                            = 0;                          // int
        this._var1size                       = 0;                          // int
        this._var2size                       = 0;                          // int
        this._var3size                       = 0;                          // int
        this._nVars                          = 0;                          // int
        this._recOfs                         = 0;                          // int
        this._nRecs                          = 0;                          // int
        this._samplesPerSec                  = 0;                          // int
        this._trigType                       = 0;                          // int
        this._trigVal                        = 0;                          // float
        this._trigPos                        = 0;                          // int
        this._trigUTC                        = 0;                          // float
        this._var1unit                       = "";                         // string
        this._var2unit                       = "";                         // string
        this._var3unit                       = "";                         // string
        this._var1samples                    = [];                         // floatArr
        this._var2samples                    = [];                         // floatArr
        this._var3samples                    = [];                         // floatArr
        //--- (end of generated code: YInputCaptureData constructor)
        this._decodeSnapBin(sdata);
    }

    //--- (generated code: YInputCaptureData implementation)

    function YInputCaptureData_decodeU16(sdata,ofs)
    {
        var v;                      // int;
        v = (sdata).charCodeAt(ofs);
        v = v + 256 * (sdata).charCodeAt(ofs+1);
        return v;
    }

    function YInputCaptureData_decodeU32(sdata,ofs)
    {
        var v;                      // float;
        v = this._decodeU16(sdata, ofs);
        v = v + 65536.0 * this._decodeU16(sdata, ofs+2);
        return v;
    }

    function YInputCaptureData_decodeVal(sdata,ofs,len)
    {
        var v;                      // float;
        var b;                      // float;
        v = this._decodeU16(sdata, ofs);
        b = 65536.0;
        ofs = ofs + 2;
        len = len - 2;
        while (len > 0) {
            v = v + b * (sdata).charCodeAt(ofs);
            b = b * 256;
            ofs = ofs + 1;
            len = len - 1;
        }
        if (v > (b/2)) {
            // negative number
            v = v - b;
        }
        return v;
    }

    function YInputCaptureData_decodeSnapBin(sdata)
    {
        var buffSize;               // int;
        var recOfs;                 // int;
        var ms;                     // int;
        var recSize;                // int;
        var count;                  // int;
        var mult1;                  // int;
        var mult2;                  // int;
        var mult3;                  // int;
        var v;                      // float;

        buffSize = (sdata).length;
        if (!(buffSize >= 24)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Invalid snapshot data (too short)",YAPI_INVALID_ARGUMENT);
        }
        this._fmt = (sdata).charCodeAt(0);
        this._var1size = (sdata).charCodeAt(1) - 48;
        this._var2size = (sdata).charCodeAt(2) - 48;
        this._var3size = (sdata).charCodeAt(3) - 48;
        if (!(this._fmt == 83)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Unsupported snapshot format",YAPI_INVALID_ARGUMENT);
        }
        if (!((this._var1size >= 2) && (this._var1size <= 4))) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Invalid sample size",YAPI_INVALID_ARGUMENT);
        }
        if (!((this._var2size >= 0) && (this._var1size <= 4))) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Invalid sample size",YAPI_INVALID_ARGUMENT);
        }
        if (!((this._var3size >= 0) && (this._var1size <= 4))) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Invalid sample size",YAPI_INVALID_ARGUMENT);
        }
        if (this._var2size == 0) {
            this._nVars = 1;
        } else {
            if (this._var3size == 0) {
                this._nVars = 2;
            } else {
                this._nVars = 3;
            }
        }
        recSize = this._var1size + this._var2size + this._var3size;
        this._recOfs = this._decodeU16(sdata, 4);
        this._nRecs = this._decodeU16(sdata, 6);
        this._samplesPerSec = this._decodeU16(sdata, 8);
        this._trigType = this._decodeU16(sdata, 10);
        this._trigVal = this._decodeVal(sdata, 12, 4) / 1000;
        this._trigPos = this._decodeU16(sdata, 16);
        ms = this._decodeU16(sdata, 18);
        this._trigUTC = this._decodeVal(sdata, 20, 4);
        this._trigUTC = this._trigUTC + (ms / 1000.0);
        recOfs = 24;
        while ((sdata).charCodeAt(recOfs) >= 32) {
            this._var1unit = ""+this._var1unit+""+String.fromCharCode((sdata).charCodeAt(recOfs));
            recOfs = recOfs + 1;
        }
        if (this._var2size > 0) {
            recOfs = recOfs + 1;
            while ((sdata).charCodeAt(recOfs) >= 32) {
                this._var2unit = ""+this._var2unit+""+String.fromCharCode((sdata).charCodeAt(recOfs));
                recOfs = recOfs + 1;
            }
        }
        if (this._var3size > 0) {
            recOfs = recOfs + 1;
            while ((sdata).charCodeAt(recOfs) >= 32) {
                this._var3unit = ""+this._var3unit+""+String.fromCharCode((sdata).charCodeAt(recOfs));
                recOfs = recOfs + 1;
            }
        }
        if (((recOfs) & (1)) == 1) {
            // align to next word
            recOfs = recOfs + 1;
        }
        mult1 = 1;
        mult2 = 1;
        mult3 = 1;
        if (recOfs < this._recOfs) {
            // load optional value multiplier
            mult1 = this._decodeU16(sdata, recOfs);
            recOfs = recOfs + 2;
            if (this._var2size > 0) {
                mult2 = this._decodeU16(sdata, recOfs);
                recOfs = recOfs + 2;
            }
            if (this._var3size > 0) {
                mult3 = this._decodeU16(sdata, recOfs);
                recOfs = recOfs + 2;
            }
        }
        recOfs = this._recOfs;
        count = this._nRecs;
        while ((count > 0) && (recOfs + this._var1size <= buffSize)) {
            v = this._decodeVal(sdata, recOfs, this._var1size) / 1000.0;
            this._var1samples.push(v*mult1);
            recOfs = recOfs + recSize;
        }
        if (this._var2size > 0) {
            recOfs = this._recOfs + this._var1size;
            count = this._nRecs;
            while ((count > 0) && (recOfs + this._var2size <= buffSize)) {
                v = this._decodeVal(sdata, recOfs, this._var2size) / 1000.0;
                this._var2samples.push(v*mult2);
                recOfs = recOfs + recSize;
            }
        }
        if (this._var3size > 0) {
            recOfs = this._recOfs + this._var1size + this._var2size;
            count = this._nRecs;
            while ((count > 0) && (recOfs + this._var3size <= buffSize)) {
                v = this._decodeVal(sdata, recOfs, this._var3size) / 1000.0;
                this._var3samples.push(v*mult3);
                recOfs = recOfs + recSize;
            }
        }
        return YAPI_SUCCESS;
    }

    /**
     * Returns the number of series available in the capture.
     *
     * @return an integer corresponding to the number of
     *         simultaneous data series available.
     */
    function YInputCaptureData_get_serieCount()
    {
        return this._nVars;
    }

    /**
     * Returns the number of records captured (in a serie).
     * In the exceptional case where it was not possible
     * to transfer all data in time, the number of records
     * actually present in the series might be lower than
     * the number of records captured
     *
     * @return an integer corresponding to the number of
     *         records expected in each serie.
     */
    function YInputCaptureData_get_recordCount()
    {
        return this._nRecs;
    }

    /**
     * Returns the effective sampling rate of the device.
     *
     * @return an integer corresponding to the number of
     *         samples taken each second.
     */
    function YInputCaptureData_get_samplingRate()
    {
        return this._samplesPerSec;
    }

    /**
     * Returns the type of automatic conditional capture
     * that triggered the capture of this data sequence.
     *
     * @return the type of conditional capture.
     */
    function YInputCaptureData_get_captureType()
    {
        return this._trigType;
    }

    /**
     * Returns the threshold value that triggered
     * this automatic conditional capture, if it was
     * not an instant captured triggered manually.
     *
     * @return the conditional threshold value
     *         at the time of capture.
     */
    function YInputCaptureData_get_triggerValue()
    {
        return this._trigVal;
    }

    /**
     * Returns the index in the series of the sample
     * corresponding to the exact time when the capture
     * was triggered. In case of trigger based on average
     * or RMS value, the trigger index corresponds to
     * the end of the averaging period.
     *
     * @return an integer corresponding to a position
     *         in the data serie.
     */
    function YInputCaptureData_get_triggerPosition()
    {
        return this._trigPos;
    }

    /**
     * Returns the absolute time when the capture was
     * triggered, as a Unix timestamp. Milliseconds are
     * included in this timestamp (floating-point number).
     *
     * @return a floating-point number corresponding to
     *         the number of seconds between the Jan 1,
     *         1970 and the moment where the capture
     *         was triggered.
     */
    function YInputCaptureData_get_triggerRealTimeUTC()
    {
        return this._trigUTC;
    }

    /**
     * Returns the unit of measurement for data points in
     * the first serie.
     *
     * @return a string containing to a physical unit of
     *         measurement.
     */
    function YInputCaptureData_get_serie1Unit()
    {
        return this._var1unit;
    }

    /**
     * Returns the unit of measurement for data points in
     * the second serie.
     *
     * @return a string containing to a physical unit of
     *         measurement.
     */
    function YInputCaptureData_get_serie2Unit()
    {
        if (!(this._nVars >= 2)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"There is no serie 2 in this capture data","");
        }
        return this._var2unit;
    }

    /**
     * Returns the unit of measurement for data points in
     * the third serie.
     *
     * @return a string containing to a physical unit of
     *         measurement.
     */
    function YInputCaptureData_get_serie3Unit()
    {
        if (!(this._nVars >= 3)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"There is no serie 3 in this capture data","");
        }
        return this._var3unit;
    }

    /**
     * Returns the sampled data corresponding to the first serie.
     * The corresponding physical unit can be obtained
     * using the method get_serie1Unit().
     *
     * @return a list of real numbers corresponding to all
     *         samples received for serie 1.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YInputCaptureData_get_serie1Values()
    {
        return this._var1samples;
    }

    /**
     * Returns the sampled data corresponding to the second serie.
     * The corresponding physical unit can be obtained
     * using the method get_serie2Unit().
     *
     * @return a list of real numbers corresponding to all
     *         samples received for serie 2.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YInputCaptureData_get_serie2Values()
    {
        if (!(this._nVars >= 2)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"There is no serie 2 in this capture data",this._var2samples);
        }
        return this._var2samples;
    }

    /**
     * Returns the sampled data corresponding to the third serie.
     * The corresponding physical unit can be obtained
     * using the method get_serie3Unit().
     *
     * @return a list of real numbers corresponding to all
     *         samples received for serie 3.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YInputCaptureData_get_serie3Values()
    {
        if (!(this._nVars >= 3)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"There is no serie 3 in this capture data",this._var3samples);
        }
        return this._var3samples;
    }

    //--- (end of generated code: YInputCaptureData implementation)

    //--- (generated code: YInputCaptureData initialization)
    YInputCaptureData = _YInputCaptureData;
    // Methods
    YInputCaptureData.prototype._decodeU16                  = YInputCaptureData_decodeU16;
    YInputCaptureData.prototype._decodeU32                  = YInputCaptureData_decodeU32;
    YInputCaptureData.prototype._decodeVal                  = YInputCaptureData_decodeVal;
    YInputCaptureData.prototype._decodeSnapBin              = YInputCaptureData_decodeSnapBin;
    YInputCaptureData.prototype.get_serieCount              = YInputCaptureData_get_serieCount;
    YInputCaptureData.prototype.serieCount                  = YInputCaptureData_get_serieCount;
    YInputCaptureData.prototype.get_recordCount             = YInputCaptureData_get_recordCount;
    YInputCaptureData.prototype.recordCount                 = YInputCaptureData_get_recordCount;
    YInputCaptureData.prototype.get_samplingRate            = YInputCaptureData_get_samplingRate;
    YInputCaptureData.prototype.samplingRate                = YInputCaptureData_get_samplingRate;
    YInputCaptureData.prototype.get_captureType             = YInputCaptureData_get_captureType;
    YInputCaptureData.prototype.captureType                 = YInputCaptureData_get_captureType;
    YInputCaptureData.prototype.get_triggerValue            = YInputCaptureData_get_triggerValue;
    YInputCaptureData.prototype.triggerValue                = YInputCaptureData_get_triggerValue;
    YInputCaptureData.prototype.get_triggerPosition         = YInputCaptureData_get_triggerPosition;
    YInputCaptureData.prototype.triggerPosition             = YInputCaptureData_get_triggerPosition;
    YInputCaptureData.prototype.get_triggerRealTimeUTC      = YInputCaptureData_get_triggerRealTimeUTC;
    YInputCaptureData.prototype.triggerRealTimeUTC          = YInputCaptureData_get_triggerRealTimeUTC;
    YInputCaptureData.prototype.get_serie1Unit              = YInputCaptureData_get_serie1Unit;
    YInputCaptureData.prototype.serie1Unit                  = YInputCaptureData_get_serie1Unit;
    YInputCaptureData.prototype.get_serie2Unit              = YInputCaptureData_get_serie2Unit;
    YInputCaptureData.prototype.serie2Unit                  = YInputCaptureData_get_serie2Unit;
    YInputCaptureData.prototype.get_serie3Unit              = YInputCaptureData_get_serie3Unit;
    YInputCaptureData.prototype.serie3Unit                  = YInputCaptureData_get_serie3Unit;
    YInputCaptureData.prototype.get_serie1Values            = YInputCaptureData_get_serie1Values;
    YInputCaptureData.prototype.serie1Values                = YInputCaptureData_get_serie1Values;
    YInputCaptureData.prototype.get_serie2Values            = YInputCaptureData_get_serie2Values;
    YInputCaptureData.prototype.serie2Values                = YInputCaptureData_get_serie2Values;
    YInputCaptureData.prototype.get_serie3Values            = YInputCaptureData_get_serie3Values;
    YInputCaptureData.prototype.serie3Values                = YInputCaptureData_get_serie3Values;
    //--- (end of generated code: YInputCaptureData initialization)
    YInputCaptureData.prototype._throw = YAPI._throw;
})();

//--- (generated code: YInputCapture class start)
/**
 * YInputCapture Class: instant snapshot trigger control interface
 *
 * The YInputCapture class allows you to access data samples
 * measured by a Yoctopuce electrical sensor. The data capture can be
 * triggered manually, or be configured to detect specific events.
 */
//--- (end of generated code: YInputCapture class start)

var YInputCapture; // definition below
(function()
{
    function _YInputCapture(str_func)
    {
        //--- (generated code: YInputCapture constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'InputCapture';

        this._lastCaptureTime                = Y_LASTCAPTURETIME_INVALID;  // Time
        this._nSamples                       = Y_NSAMPLES_INVALID;         // UInt31
        this._samplingRate                   = Y_SAMPLINGRATE_INVALID;     // UInt31
        this._captureType                    = Y_CAPTURETYPE_INVALID;      // CaptureTypeAll
        this._condValue                      = Y_CONDVALUE_INVALID;        // MeasureVal
        this._condAlign                      = Y_CONDALIGN_INVALID;        // Percent
        this._captureTypeAtStartup           = Y_CAPTURETYPEATSTARTUP_INVALID; // CaptureTypeAll
        this._condValueAtStartup             = Y_CONDVALUEATSTARTUP_INVALID; // MeasureVal
        //--- (end of generated code: YInputCapture constructor)
    }

    //--- (generated code: YInputCapture implementation)

    function YInputCapture_parseAttr(name, val, _super)
    {
        switch(name) {
        case "lastCaptureTime":
            this._lastCaptureTime = parseInt(val);
            return 1;
        case "nSamples":
            this._nSamples = parseInt(val);
            return 1;
        case "samplingRate":
            this._samplingRate = parseInt(val);
            return 1;
        case "captureType":
            this._captureType = parseInt(val);
            return 1;
        case "condValue":
            this._condValue = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "condAlign":
            this._condAlign = parseInt(val);
            return 1;
        case "captureTypeAtStartup":
            this._captureTypeAtStartup = parseInt(val);
            return 1;
        case "condValueAtStartup":
            this._condValueAtStartup = Math.round(val / 65.536) / 1000.0;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on
     * and the last capture (time of trigger), or zero if no capture has been done.
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     *         and the last capture (time of trigger), or zero if no capture has been done
     *
     * On failure, throws an exception or returns YInputCapture.LASTCAPTURETIME_INVALID.
     */
    function YInputCapture_get_lastCaptureTime()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LASTCAPTURETIME_INVALID;
            }
        }
        res = this._lastCaptureTime;
        return res;
    }

    /**
     * Gets the number of elapsed milliseconds between the module power on
     * and the last capture (time of trigger), or zero if no capture has been done.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputCapture object that invoked the callback
     *         - the result:an integer corresponding to the number of elapsed milliseconds between the module power on
     *         and the last capture (time of trigger), or zero if no capture has been done
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputCapture.LASTCAPTURETIME_INVALID.
     */
    function YInputCapture_get_lastCaptureTime_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LASTCAPTURETIME_INVALID);
            } else {
                callback(context, obj, obj._lastCaptureTime);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of samples that will be captured.
     *
     * @return an integer corresponding to the number of samples that will be captured
     *
     * On failure, throws an exception or returns YInputCapture.NSAMPLES_INVALID.
     */
    function YInputCapture_get_nSamples()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NSAMPLES_INVALID;
            }
        }
        res = this._nSamples;
        return res;
    }

    /**
     * Gets the number of samples that will be captured.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputCapture object that invoked the callback
     *         - the result:an integer corresponding to the number of samples that will be captured
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputCapture.NSAMPLES_INVALID.
     */
    function YInputCapture_get_nSamples_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NSAMPLES_INVALID);
            } else {
                callback(context, obj, obj._nSamples);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the type of automatic conditional capture.
     * The maximum number of samples depends on the device memory.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : an integer corresponding to the type of automatic conditional capture
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YInputCapture_set_nSamples(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('nSamples',rest_val);
    }

    /**
     * Returns the sampling frequency, in Hz.
     *
     * @return an integer corresponding to the sampling frequency, in Hz
     *
     * On failure, throws an exception or returns YInputCapture.SAMPLINGRATE_INVALID.
     */
    function YInputCapture_get_samplingRate()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SAMPLINGRATE_INVALID;
            }
        }
        res = this._samplingRate;
        return res;
    }

    /**
     * Gets the sampling frequency, in Hz.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputCapture object that invoked the callback
     *         - the result:an integer corresponding to the sampling frequency, in Hz
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputCapture.SAMPLINGRATE_INVALID.
     */
    function YInputCapture_get_samplingRate_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SAMPLINGRATE_INVALID);
            } else {
                callback(context, obj, obj._samplingRate);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the type of automatic conditional capture.
     *
     * @return a value among YInputCapture.CAPTURETYPE_NONE, YInputCapture.CAPTURETYPE_TIMED,
     * YInputCapture.CAPTURETYPE_V_MAX, YInputCapture.CAPTURETYPE_V_MIN, YInputCapture.CAPTURETYPE_I_MAX,
     * YInputCapture.CAPTURETYPE_I_MIN, YInputCapture.CAPTURETYPE_P_MAX, YInputCapture.CAPTURETYPE_P_MIN,
     * YInputCapture.CAPTURETYPE_V_AVG_MAX, YInputCapture.CAPTURETYPE_V_AVG_MIN,
     * YInputCapture.CAPTURETYPE_V_RMS_MAX, YInputCapture.CAPTURETYPE_V_RMS_MIN,
     * YInputCapture.CAPTURETYPE_I_AVG_MAX, YInputCapture.CAPTURETYPE_I_AVG_MIN,
     * YInputCapture.CAPTURETYPE_I_RMS_MAX, YInputCapture.CAPTURETYPE_I_RMS_MIN,
     * YInputCapture.CAPTURETYPE_P_AVG_MAX, YInputCapture.CAPTURETYPE_P_AVG_MIN,
     * YInputCapture.CAPTURETYPE_PF_MIN and YInputCapture.CAPTURETYPE_DPF_MIN corresponding to the type of
     * automatic conditional capture
     *
     * On failure, throws an exception or returns YInputCapture.CAPTURETYPE_INVALID.
     */
    function YInputCapture_get_captureType()
    {
        var res;                    // enumCAPTURETYPEALL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CAPTURETYPE_INVALID;
            }
        }
        res = this._captureType;
        return res;
    }

    /**
     * Gets the type of automatic conditional capture.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputCapture object that invoked the callback
     *         - the result:a value among YInputCapture.CAPTURETYPE_NONE, YInputCapture.CAPTURETYPE_TIMED,
     *         YInputCapture.CAPTURETYPE_V_MAX, YInputCapture.CAPTURETYPE_V_MIN, YInputCapture.CAPTURETYPE_I_MAX,
     *         YInputCapture.CAPTURETYPE_I_MIN, YInputCapture.CAPTURETYPE_P_MAX, YInputCapture.CAPTURETYPE_P_MIN,
     *         YInputCapture.CAPTURETYPE_V_AVG_MAX, YInputCapture.CAPTURETYPE_V_AVG_MIN,
     *         YInputCapture.CAPTURETYPE_V_RMS_MAX, YInputCapture.CAPTURETYPE_V_RMS_MIN,
     *         YInputCapture.CAPTURETYPE_I_AVG_MAX, YInputCapture.CAPTURETYPE_I_AVG_MIN,
     *         YInputCapture.CAPTURETYPE_I_RMS_MAX, YInputCapture.CAPTURETYPE_I_RMS_MIN,
     *         YInputCapture.CAPTURETYPE_P_AVG_MAX, YInputCapture.CAPTURETYPE_P_AVG_MIN,
     *         YInputCapture.CAPTURETYPE_PF_MIN and YInputCapture.CAPTURETYPE_DPF_MIN corresponding to the type of
     *         automatic conditional capture
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputCapture.CAPTURETYPE_INVALID.
     */
    function YInputCapture_get_captureType_async(callback,context)
    {
        var res;                    // enumCAPTURETYPEALL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CAPTURETYPE_INVALID);
            } else {
                callback(context, obj, obj._captureType);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the type of automatic conditional capture.
     *
     * @param newval : a value among YInputCapture.CAPTURETYPE_NONE, YInputCapture.CAPTURETYPE_TIMED,
     * YInputCapture.CAPTURETYPE_V_MAX, YInputCapture.CAPTURETYPE_V_MIN, YInputCapture.CAPTURETYPE_I_MAX,
     * YInputCapture.CAPTURETYPE_I_MIN, YInputCapture.CAPTURETYPE_P_MAX, YInputCapture.CAPTURETYPE_P_MIN,
     * YInputCapture.CAPTURETYPE_V_AVG_MAX, YInputCapture.CAPTURETYPE_V_AVG_MIN,
     * YInputCapture.CAPTURETYPE_V_RMS_MAX, YInputCapture.CAPTURETYPE_V_RMS_MIN,
     * YInputCapture.CAPTURETYPE_I_AVG_MAX, YInputCapture.CAPTURETYPE_I_AVG_MIN,
     * YInputCapture.CAPTURETYPE_I_RMS_MAX, YInputCapture.CAPTURETYPE_I_RMS_MIN,
     * YInputCapture.CAPTURETYPE_P_AVG_MAX, YInputCapture.CAPTURETYPE_P_AVG_MIN,
     * YInputCapture.CAPTURETYPE_PF_MIN and YInputCapture.CAPTURETYPE_DPF_MIN corresponding to the type of
     * automatic conditional capture
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YInputCapture_set_captureType(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('captureType',rest_val);
    }

    /**
     * Changes current threshold value for automatic conditional capture.
     *
     * @param newval : a floating point number corresponding to current threshold value for automatic
     * conditional capture
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YInputCapture_set_condValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('condValue',rest_val);
    }

    /**
     * Returns current threshold value for automatic conditional capture.
     *
     * @return a floating point number corresponding to current threshold value for automatic conditional capture
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUE_INVALID.
     */
    function YInputCapture_get_condValue()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CONDVALUE_INVALID;
            }
        }
        res = this._condValue;
        return res;
    }

    /**
     * Gets current threshold value for automatic conditional capture.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputCapture object that invoked the callback
     *         - the result:a floating point number corresponding to current threshold value for automatic conditional capture
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUE_INVALID.
     */
    function YInputCapture_get_condValue_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CONDVALUE_INVALID);
            } else {
                callback(context, obj, obj._condValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the relative position of the trigger event within the capture window.
     * When the value is 50%, the capture is centered on the event.
     *
     * @return an integer corresponding to the relative position of the trigger event within the capture window
     *
     * On failure, throws an exception or returns YInputCapture.CONDALIGN_INVALID.
     */
    function YInputCapture_get_condAlign()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CONDALIGN_INVALID;
            }
        }
        res = this._condAlign;
        return res;
    }

    /**
     * Gets the relative position of the trigger event within the capture window.
     * When the value is 50%, the capture is centered on the event.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputCapture object that invoked the callback
     *         - the result:an integer corresponding to the relative position of the trigger event within the capture window
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputCapture.CONDALIGN_INVALID.
     */
    function YInputCapture_get_condAlign_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CONDALIGN_INVALID);
            } else {
                callback(context, obj, obj._condAlign);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the relative position of the trigger event within the capture window.
     * The new value must be between 10% (on the left) and 90% (on the right).
     * When the value is 50%, the capture is centered on the event.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : an integer corresponding to the relative position of the trigger event within the capture window
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YInputCapture_set_condAlign(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('condAlign',rest_val);
    }

    /**
     * Returns the type of automatic conditional capture
     * applied at device power on.
     *
     * @return a value among YInputCapture.CAPTURETYPEATSTARTUP_NONE,
     * YInputCapture.CAPTURETYPEATSTARTUP_TIMED, YInputCapture.CAPTURETYPEATSTARTUP_V_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_PF_MIN and
     * YInputCapture.CAPTURETYPEATSTARTUP_DPF_MIN corresponding to the type of automatic conditional capture
     *         applied at device power on
     *
     * On failure, throws an exception or returns YInputCapture.CAPTURETYPEATSTARTUP_INVALID.
     */
    function YInputCapture_get_captureTypeAtStartup()
    {
        var res;                    // enumCAPTURETYPEALL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CAPTURETYPEATSTARTUP_INVALID;
            }
        }
        res = this._captureTypeAtStartup;
        return res;
    }

    /**
     * Gets the type of automatic conditional capture
     * applied at device power on.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputCapture object that invoked the callback
     *         - the result:a value among YInputCapture.CAPTURETYPEATSTARTUP_NONE,
     *         YInputCapture.CAPTURETYPEATSTARTUP_TIMED, YInputCapture.CAPTURETYPEATSTARTUP_V_MAX,
     *         YInputCapture.CAPTURETYPEATSTARTUP_V_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_MAX,
     *         YInputCapture.CAPTURETYPEATSTARTUP_I_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_MAX,
     *         YInputCapture.CAPTURETYPEATSTARTUP_P_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MAX,
     *         YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MAX,
     *         YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MAX,
     *         YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MAX,
     *         YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MAX,
     *         YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_PF_MIN and
     *         YInputCapture.CAPTURETYPEATSTARTUP_DPF_MIN corresponding to the type of automatic conditional capture
     *         applied at device power on
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputCapture.CAPTURETYPEATSTARTUP_INVALID.
     */
    function YInputCapture_get_captureTypeAtStartup_async(callback,context)
    {
        var res;                    // enumCAPTURETYPEALL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CAPTURETYPEATSTARTUP_INVALID);
            } else {
                callback(context, obj, obj._captureTypeAtStartup);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the type of automatic conditional capture
     * applied at device power on.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : a value among YInputCapture.CAPTURETYPEATSTARTUP_NONE,
     * YInputCapture.CAPTURETYPEATSTARTUP_TIMED, YInputCapture.CAPTURETYPEATSTARTUP_V_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_V_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_I_RMS_MIN, YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MAX,
     * YInputCapture.CAPTURETYPEATSTARTUP_P_AVG_MIN, YInputCapture.CAPTURETYPEATSTARTUP_PF_MIN and
     * YInputCapture.CAPTURETYPEATSTARTUP_DPF_MIN corresponding to the type of automatic conditional capture
     *         applied at device power on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YInputCapture_set_captureTypeAtStartup(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('captureTypeAtStartup',rest_val);
    }

    /**
     * Changes current threshold value for automatic conditional
     * capture applied at device power on.
     *
     * If you want the change to be kept after a device reboot,
     * make sure  to call the matching module saveToFlash().
     *
     * @param newval : a floating point number corresponding to current threshold value for automatic conditional
     *         capture applied at device power on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YInputCapture_set_condValueAtStartup(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('condValueAtStartup',rest_val);
    }

    /**
     * Returns the threshold value for automatic conditional
     * capture applied at device power on.
     *
     * @return a floating point number corresponding to the threshold value for automatic conditional
     *         capture applied at device power on
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUEATSTARTUP_INVALID.
     */
    function YInputCapture_get_condValueAtStartup()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CONDVALUEATSTARTUP_INVALID;
            }
        }
        res = this._condValueAtStartup;
        return res;
    }

    /**
     * Gets the threshold value for automatic conditional
     * capture applied at device power on.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YInputCapture object that invoked the callback
     *         - the result:a floating point number corresponding to the threshold value for automatic conditional
     *         capture applied at device power on
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YInputCapture.CONDVALUEATSTARTUP_INVALID.
     */
    function YInputCapture_get_condValueAtStartup_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CONDVALUEATSTARTUP_INVALID);
            } else {
                callback(context, obj, obj._condValueAtStartup);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves an instant snapshot trigger for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the instant snapshot trigger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YInputCapture.isOnline() to test if the instant snapshot trigger is
     * indeed online at a given time. In case of ambiguity when looking for
     * an instant snapshot trigger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the instant snapshot trigger, for instance
     *         MyDevice.inputCapture.
     *
     * @return a YInputCapture object allowing you to drive the instant snapshot trigger.
     */
    function YInputCapture_FindInputCapture(func)               // class method
    {
        var obj;                    // YInputCapture;
        obj = YFunction._FindFromCache("InputCapture", func);
        if (obj == null) {
            obj = new YInputCapture(func);
            YFunction._AddToCache("InputCapture", func, obj);
        }
        return obj;
    }

    /**
     * Returns all details about the last automatic input capture.
     *
     * @return an YInputCaptureData object including
     *         data series and all related meta-information.
     *         On failure, throws an exception or returns an capture object.
     */
    function YInputCapture_get_lastCapture()
    {
        var snapData;               // bin;

        snapData = this._download("snap.bin");
        return new YInputCaptureData(this, snapData);
    }

    /**
     * Returns a new immediate capture of the device inputs.
     *
     * @param msDuration : duration of the capture window,
     *         in milliseconds (eg. between 20 and 1000).
     *
     * @return an YInputCaptureData object including
     *         data series for the specified duration.
     *         On failure, throws an exception or returns an capture object.
     */
    function YInputCapture_get_immediateCapture(msDuration)
    {
        var snapUrl;                // str;
        var snapData;               // bin;
        var snapStart;              // int;
        if (msDuration < 1) {
            msDuration = 20;
        }
        if (msDuration > 1000) {
            msDuration = 1000;
        }
        snapStart = parseInt((-msDuration) / (2));
        snapUrl = "snap.bin?t="+String(Math.round(snapStart))+"&d="+String(Math.round(msDuration));

        snapData = this._download(snapUrl);
        return new YInputCaptureData(this, snapData);
    }

    /**
     * comment from .yc definition
     */
    function YInputCapture_nextInputCapture()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YInputCapture.FindInputCapture(next_hwid);
    }

    /**
     * comment from .yc definition
     */
    function YInputCapture_FirstInputCapture()
    {
        var next_hwid = YAPI.getFirstHardwareId('InputCapture');
        if(next_hwid == null) return null;
        return YInputCapture.FindInputCapture(next_hwid);
    }

    //--- (end of generated code: YInputCapture implementation)

    //--- (generated code: YInputCapture initialization)
    YInputCapture = YFunction._Subclass(_YInputCapture, {
        // Constants
        LASTCAPTURETIME_INVALID     : YAPI_INVALID_LONG,
        NSAMPLES_INVALID            : YAPI_INVALID_UINT,
        SAMPLINGRATE_INVALID        : YAPI_INVALID_UINT,
        CAPTURETYPE_NONE            : 0,
        CAPTURETYPE_TIMED           : 1,
        CAPTURETYPE_V_MAX           : 2,
        CAPTURETYPE_V_MIN           : 3,
        CAPTURETYPE_I_MAX           : 4,
        CAPTURETYPE_I_MIN           : 5,
        CAPTURETYPE_P_MAX           : 6,
        CAPTURETYPE_P_MIN           : 7,
        CAPTURETYPE_V_AVG_MAX       : 8,
        CAPTURETYPE_V_AVG_MIN       : 9,
        CAPTURETYPE_V_RMS_MAX       : 10,
        CAPTURETYPE_V_RMS_MIN       : 11,
        CAPTURETYPE_I_AVG_MAX       : 12,
        CAPTURETYPE_I_AVG_MIN       : 13,
        CAPTURETYPE_I_RMS_MAX       : 14,
        CAPTURETYPE_I_RMS_MIN       : 15,
        CAPTURETYPE_P_AVG_MAX       : 16,
        CAPTURETYPE_P_AVG_MIN       : 17,
        CAPTURETYPE_PF_MIN          : 18,
        CAPTURETYPE_DPF_MIN         : 19,
        CAPTURETYPE_INVALID         : -1,
        CONDVALUE_INVALID           : YAPI_INVALID_DOUBLE,
        CONDALIGN_INVALID           : YAPI_INVALID_UINT,
        CAPTURETYPEATSTARTUP_NONE   : 0,
        CAPTURETYPEATSTARTUP_TIMED  : 1,
        CAPTURETYPEATSTARTUP_V_MAX  : 2,
        CAPTURETYPEATSTARTUP_V_MIN  : 3,
        CAPTURETYPEATSTARTUP_I_MAX  : 4,
        CAPTURETYPEATSTARTUP_I_MIN  : 5,
        CAPTURETYPEATSTARTUP_P_MAX  : 6,
        CAPTURETYPEATSTARTUP_P_MIN  : 7,
        CAPTURETYPEATSTARTUP_V_AVG_MAX : 8,
        CAPTURETYPEATSTARTUP_V_AVG_MIN : 9,
        CAPTURETYPEATSTARTUP_V_RMS_MAX : 10,
        CAPTURETYPEATSTARTUP_V_RMS_MIN : 11,
        CAPTURETYPEATSTARTUP_I_AVG_MAX : 12,
        CAPTURETYPEATSTARTUP_I_AVG_MIN : 13,
        CAPTURETYPEATSTARTUP_I_RMS_MAX : 14,
        CAPTURETYPEATSTARTUP_I_RMS_MIN : 15,
        CAPTURETYPEATSTARTUP_P_AVG_MAX : 16,
        CAPTURETYPEATSTARTUP_P_AVG_MIN : 17,
        CAPTURETYPEATSTARTUP_PF_MIN : 18,
        CAPTURETYPEATSTARTUP_DPF_MIN : 19,
        CAPTURETYPEATSTARTUP_INVALID : -1,
        CONDVALUEATSTARTUP_INVALID  : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindInputCapture            : YInputCapture_FindInputCapture,
        FirstInputCapture           : YInputCapture_FirstInputCapture
    }, {
        // Methods
        get_lastCaptureTime         : YInputCapture_get_lastCaptureTime,
        lastCaptureTime             : YInputCapture_get_lastCaptureTime,
        get_lastCaptureTime_async   : YInputCapture_get_lastCaptureTime_async,
        lastCaptureTime_async       : YInputCapture_get_lastCaptureTime_async,
        get_nSamples                : YInputCapture_get_nSamples,
        nSamples                    : YInputCapture_get_nSamples,
        get_nSamples_async          : YInputCapture_get_nSamples_async,
        nSamples_async              : YInputCapture_get_nSamples_async,
        set_nSamples                : YInputCapture_set_nSamples,
        setNSamples                 : YInputCapture_set_nSamples,
        get_samplingRate            : YInputCapture_get_samplingRate,
        samplingRate                : YInputCapture_get_samplingRate,
        get_samplingRate_async      : YInputCapture_get_samplingRate_async,
        samplingRate_async          : YInputCapture_get_samplingRate_async,
        get_captureType             : YInputCapture_get_captureType,
        captureType                 : YInputCapture_get_captureType,
        get_captureType_async       : YInputCapture_get_captureType_async,
        captureType_async           : YInputCapture_get_captureType_async,
        set_captureType             : YInputCapture_set_captureType,
        setCaptureType              : YInputCapture_set_captureType,
        set_condValue               : YInputCapture_set_condValue,
        setCondValue                : YInputCapture_set_condValue,
        get_condValue               : YInputCapture_get_condValue,
        condValue                   : YInputCapture_get_condValue,
        get_condValue_async         : YInputCapture_get_condValue_async,
        condValue_async             : YInputCapture_get_condValue_async,
        get_condAlign               : YInputCapture_get_condAlign,
        condAlign                   : YInputCapture_get_condAlign,
        get_condAlign_async         : YInputCapture_get_condAlign_async,
        condAlign_async             : YInputCapture_get_condAlign_async,
        set_condAlign               : YInputCapture_set_condAlign,
        setCondAlign                : YInputCapture_set_condAlign,
        get_captureTypeAtStartup    : YInputCapture_get_captureTypeAtStartup,
        captureTypeAtStartup        : YInputCapture_get_captureTypeAtStartup,
        get_captureTypeAtStartup_async : YInputCapture_get_captureTypeAtStartup_async,
        captureTypeAtStartup_async  : YInputCapture_get_captureTypeAtStartup_async,
        set_captureTypeAtStartup    : YInputCapture_set_captureTypeAtStartup,
        setCaptureTypeAtStartup     : YInputCapture_set_captureTypeAtStartup,
        set_condValueAtStartup      : YInputCapture_set_condValueAtStartup,
        setCondValueAtStartup       : YInputCapture_set_condValueAtStartup,
        get_condValueAtStartup      : YInputCapture_get_condValueAtStartup,
        condValueAtStartup          : YInputCapture_get_condValueAtStartup,
        get_condValueAtStartup_async : YInputCapture_get_condValueAtStartup_async,
        condValueAtStartup_async    : YInputCapture_get_condValueAtStartup_async,
        get_lastCapture             : YInputCapture_get_lastCapture,
        lastCapture                 : YInputCapture_get_lastCapture,
        get_immediateCapture        : YInputCapture_get_immediateCapture,
        immediateCapture            : YInputCapture_get_immediateCapture,
        nextInputCapture            : YInputCapture_nextInputCapture,
        _parseAttr                  : YInputCapture_parseAttr
    });
    //--- (end of generated code: YInputCapture initialization)
})();

//--- (generated code: YInputCapture functions)

/**
 * Retrieves an instant snapshot trigger for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the instant snapshot trigger is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YInputCapture.isOnline() to test if the instant snapshot trigger is
 * indeed online at a given time. In case of ambiguity when looking for
 * an instant snapshot trigger by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the instant snapshot trigger, for instance
 *         MyDevice.inputCapture.
 *
 * @return a YInputCapture object allowing you to drive the instant snapshot trigger.
 */
function yFindInputCapture(func)
{
    return YInputCapture.FindInputCapture(func);
}

/**
 * comment from .yc definition
 */
function yFirstInputCapture()
{
    return YInputCapture.FirstInputCapture();
}

//--- (end of generated code: YInputCapture functions)
