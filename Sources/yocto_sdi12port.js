/*********************************************************************
 *
 *  $Id: yocto_sdi12port.js 54314 2023-05-01 14:21:11Z seb $
 *
 *  Implements the high-level API for Sdi12Port functions
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

//--- (generated code: YSdi12Port return codes)
//--- (end of generated code: YSdi12Port return codes)
//--- (generated code: YSdi12Port definitions)
var Y_VOLTAGELEVEL_OFF              = 0;
var Y_VOLTAGELEVEL_TTL3V            = 1;
var Y_VOLTAGELEVEL_TTL3VR           = 2;
var Y_VOLTAGELEVEL_TTL5V            = 3;
var Y_VOLTAGELEVEL_TTL5VR           = 4;
var Y_VOLTAGELEVEL_RS232            = 5;
var Y_VOLTAGELEVEL_RS485            = 6;
var Y_VOLTAGELEVEL_TTL1V8           = 7;
var Y_VOLTAGELEVEL_SDI12            = 8;
var Y_VOLTAGELEVEL_INVALID          = -1;
var Y_RXCOUNT_INVALID               = YAPI_INVALID_UINT;
var Y_TXCOUNT_INVALID               = YAPI_INVALID_UINT;
var Y_ERRCOUNT_INVALID              = YAPI_INVALID_UINT;
var Y_RXMSGCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_TXMSGCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_LASTMSG_INVALID               = YAPI_INVALID_STRING;
var Y_CURRENTJOB_INVALID            = YAPI_INVALID_STRING;
var Y_STARTUPJOB_INVALID            = YAPI_INVALID_STRING;
var Y_JOBMAXTASK_INVALID            = YAPI_INVALID_UINT;
var Y_JOBMAXSIZE_INVALID            = YAPI_INVALID_UINT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
var Y_PROTOCOL_INVALID              = YAPI_INVALID_STRING;
var Y_SERIALMODE_INVALID            = YAPI_INVALID_STRING;
//--- (end of generated code: YSdi12Port definitions)

//--- (generated code: YSdi12SnoopingRecord definitions)
//--- (end of generated code: YSdi12SnoopingRecord definitions)

//--- (generated code: YSdi12SnoopingRecord class start)
/**
 * YSdi12SnoopingRecord Class: Intercepted SDI12 message description, returned by sdi12Port.snoopMessages method
 *
 *
 */
//--- (end of generated code: YSdi12SnoopingRecord class start)

var YSdi12SnoopingRecord; // definition below
(function()
{
    function _YSdi12SnoopingRecord(str_json)
    {
        //--- (generated code: YSdi12SnoopingRecord constructor)
        this._tim                            = 0;                          // int
        this._pos                            = 0;                          // int
        this._dir                            = 0;                          // int
        this._msg                            = "";                         // str
        //--- (end of generated code: YSdi12SnoopingRecord constructor)

        var loadval = JSON.parse(str_json);
        this._tim = loadval.t;
        this._pos = loadval.p;
        this._dir = (loadval.m[0] == '<' ? 1 : 0);
        this._msg = loadval.m.slice(1);

    }

    //--- (generated code: YSdi12SnoopingRecord implementation)

    /**
     * Returns the elapsed time, in ms, since the beginning of the preceding message.
     *
     * @return the elapsed time, in ms, since the beginning of the preceding message.
     */
    function YSdi12SnoopingRecord_get_time()
    {
        return this._tim;
    }

    /**
     * Returns the absolute position of the message end.
     *
     * @return the absolute position of the message end.
     */
    function YSdi12SnoopingRecord_get_pos()
    {
        return this._pos;
    }

    /**
     * Returns the message direction (RX=0, TX=1).
     *
     * @return the message direction (RX=0, TX=1).
     */
    function YSdi12SnoopingRecord_get_direction()
    {
        return this._dir;
    }

    /**
     * Returns the message content.
     *
     * @return the message content.
     */
    function YSdi12SnoopingRecord_get_message()
    {
        return this._msg;
    }

    //--- (end of generated code: YSdi12SnoopingRecord implementation)

    //--- (generated code: YSdi12SnoopingRecord initialization)
    YSdi12SnoopingRecord = _YSdi12SnoopingRecord;
    // Methods
    YSdi12SnoopingRecord.prototype.get_time                    = YSdi12SnoopingRecord_get_time;
    YSdi12SnoopingRecord.prototype.time                        = YSdi12SnoopingRecord_get_time;
    YSdi12SnoopingRecord.prototype.get_pos                     = YSdi12SnoopingRecord_get_pos;
    YSdi12SnoopingRecord.prototype.pos                         = YSdi12SnoopingRecord_get_pos;
    YSdi12SnoopingRecord.prototype.get_direction               = YSdi12SnoopingRecord_get_direction;
    YSdi12SnoopingRecord.prototype.direction                   = YSdi12SnoopingRecord_get_direction;
    YSdi12SnoopingRecord.prototype.get_message                 = YSdi12SnoopingRecord_get_message;
    YSdi12SnoopingRecord.prototype.message                     = YSdi12SnoopingRecord_get_message;
    //--- (end of generated code: YSdi12SnoopingRecord initialization)
})();

var YSdi12SensorInfo; // definition below
(function()
{
    function _YSdi12SensorInfo(sdi12Port,str_json)
    {
        //--- (generated code: YSdi12SensorInfo constructor)
        this._sdi12Port                      = null;                       // YSdi12Port
        this._isValid                        = 0;                          // bool
        this._addr                           = "";                         // str
        this._proto                          = "";                         // str
        this._mfg                            = "";                         // str
        this._model                          = "";                         // str
        this._ver                            = "";                         // str
        this._sn                             = "";                         // str
        this._valuesDesc                     = [];                         // strArrArr
        //--- (end of generated code: YSdi12SensorInfo constructor)

        this._sdi12Port = sdi12Port;
        this._parseInfoStr(str_json);
    }

    function YSdi12SensorInfo_throw(errcode,msg)
    {
        this._sdi12Port._throw(errcode,msg);
    }

    //--- (generated code: YSdi12SensorInfo implementation)

    /**
     * Returns the sensor state.
     *
     * @return the sensor state.
     */
    function YSdi12SensorInfo_isValid()
    {
        return this._isValid;
    }

    /**
     * Returns the sensor address.
     *
     * @return the sensor address.
     */
    function YSdi12SensorInfo_get_sensorAddress()
    {
        return this._addr;
    }

    /**
     * Returns the compatible SDI-12 version of the sensor.
     *
     * @return the compatible SDI-12 version of the sensor.
     */
    function YSdi12SensorInfo_get_sensorProtocol()
    {
        return this._proto;
    }

    /**
     * Returns the sensor vendor identification.
     *
     * @return the sensor vendor identification.
     */
    function YSdi12SensorInfo_get_sensorVendor()
    {
        return this._mfg;
    }

    /**
     * Returns the sensor model number.
     *
     * @return the sensor model number.
     */
    function YSdi12SensorInfo_get_sensorModel()
    {
        return this._model;
    }

    /**
     * Returns the sensor version.
     *
     * @return the sensor version.
     */
    function YSdi12SensorInfo_get_sensorVersion()
    {
        return this._ver;
    }

    /**
     * Returns the sensor serial number.
     *
     * @return the sensor serial number.
     */
    function YSdi12SensorInfo_get_sensorSerial()
    {
        return this._sn;
    }

    /**
     * Returns the number of sensor measurements.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @return the number of sensor measurements.
     */
    function YSdi12SensorInfo_get_measureCount()
    {
        return this._valuesDesc.length;
    }

    /**
     * Returns the sensor measurement command.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @param measureIndex : measurement index
     *
     * @return the sensor measurement command.
     *         On failure, throws an exception or returns an empty string.
     */
    function YSdi12SensorInfo_get_measureCommand(measureIndex)
    {
        if (!(measureIndex < this._valuesDesc.length)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Invalid measure index","");
        }
        return this._valuesDesc[measureIndex][0];
    }

    /**
     * Returns sensor measurement position.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @param measureIndex : measurement index
     *
     * @return the sensor measurement command.
     *         On failure, throws an exception or returns 0.
     */
    function YSdi12SensorInfo_get_measurePosition(measureIndex)
    {
        if (!(measureIndex < this._valuesDesc.length)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Invalid measure index",0);
        }
        return YAPI._atoi(this._valuesDesc[measureIndex][2]);
    }

    /**
     * Returns the measured value symbol.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @param measureIndex : measurement index
     *
     * @return the sensor measurement command.
     *         On failure, throws an exception or returns an empty string.
     */
    function YSdi12SensorInfo_get_measureSymbol(measureIndex)
    {
        if (!(measureIndex < this._valuesDesc.length)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Invalid measure index","");
        }
        return this._valuesDesc[measureIndex][3];
    }

    /**
     * Returns the unit of the measured value.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @param measureIndex : measurement index
     *
     * @return the sensor measurement command.
     *         On failure, throws an exception or returns an empty string.
     */
    function YSdi12SensorInfo_get_measureUnit(measureIndex)
    {
        if (!(measureIndex < this._valuesDesc.length)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Invalid measure index","");
        }
        return this._valuesDesc[measureIndex][4];
    }

    /**
     * Returns the description of the measured value.
     * This function only works if the sensor is in version 1.4 SDI-12
     * and supports metadata commands.
     *
     * @param measureIndex : measurement index
     *
     * @return the sensor measurement command.
     *         On failure, throws an exception or returns an empty string.
     */
    function YSdi12SensorInfo_get_measureDescription(measureIndex)
    {
        if (!(measureIndex < this._valuesDesc.length)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Invalid measure index","");
        }
        return this._valuesDesc[measureIndex][5];
    }

    function YSdi12SensorInfo_get_typeMeasure()
    {
        return this._valuesDesc;
    }

    function YSdi12SensorInfo_parseInfoStr(infoStr)
    {
        var errmsg;                 // str;

        if ((infoStr).length > 1) {
            if (infoStr.substr(0, 2) == "ER") {
                errmsg = infoStr.substr(2, (infoStr).length-2);
                this._addr = errmsg;
                this._proto = errmsg;
                this._mfg = errmsg;
                this._model = errmsg;
                this._ver = errmsg;
                this._sn = errmsg;
                this._isValid = false;
            } else {
                this._addr = infoStr.substr(0, 1);
                this._proto = infoStr.substr(1, 2);
                this._mfg = infoStr.substr(3, 8);
                this._model = infoStr.substr(11, 6);
                this._ver = infoStr.substr(17, 3);
                this._sn = infoStr.substr(20, (infoStr).length-20);
                this._isValid = true;
            }
        }
    }

    function YSdi12SensorInfo_queryValueInfo()
    {
        var val = [];               // strArrArr;
        var data = [];              // strArr;
        var infoNbVal;              // str;
        var cmd;                    // str;
        var infoVal;                // str;
        var value;                  // str;
        var nbVal;                  // int;
        var k;                      // int;
        var i;                      // int;
        var j;                      // int;
        var listVal = [];           // strArr;
        var size;                   // int;

        k = 0;
        size = 4;
        while (k < 10) {
            infoNbVal = this._sdi12Port.querySdi12(this._addr, "IM"+String(Math.round(k)), 5000);
            if ((infoNbVal).length > 1) {
                value = infoNbVal.substr(4, (infoNbVal).length-4);
                nbVal = YAPI._atoi(value);
                if (nbVal != 0) {
                    val.length = 0;
                    i = 0;
                    while (i < nbVal) {
                        cmd = "IM"+String(Math.round(k))+"_00"+String(Math.round(i+1));
                        infoVal = this._sdi12Port.querySdi12(this._addr, cmd, 5000);
                        data = (infoVal).split(';');
                        data = (data[0]).split(',');
                        listVal.length = 0;
                        listVal.push("M"+String(Math.round(k)));
                        listVal.push(i+1);
                        j = 0;
                        while (data.length < size) {
                            data.push("");
                        }
                        while (j < data.length) {
                            listVal.push(data[j]);
                            j = j + 1;
                        }
                        val.push(listVal.slice());
                        i = i + 1;
                    }
                }
            }
            k = k + 1;
        }
        this._valuesDesc = val;
    }

    //--- (end of generated code: YSdi12SensorInfo implementation)

    //--- (generated code: YSdi12SensorInfo initialization)
    YSdi12SensorInfo = _YSdi12SensorInfo;
    // Methods
    YSdi12SensorInfo.prototype.isValid                     = YSdi12SensorInfo_isValid;
    YSdi12SensorInfo.prototype.get_sensorAddress           = YSdi12SensorInfo_get_sensorAddress;
    YSdi12SensorInfo.prototype.sensorAddress               = YSdi12SensorInfo_get_sensorAddress;
    YSdi12SensorInfo.prototype.get_sensorProtocol          = YSdi12SensorInfo_get_sensorProtocol;
    YSdi12SensorInfo.prototype.sensorProtocol              = YSdi12SensorInfo_get_sensorProtocol;
    YSdi12SensorInfo.prototype.get_sensorVendor            = YSdi12SensorInfo_get_sensorVendor;
    YSdi12SensorInfo.prototype.sensorVendor                = YSdi12SensorInfo_get_sensorVendor;
    YSdi12SensorInfo.prototype.get_sensorModel             = YSdi12SensorInfo_get_sensorModel;
    YSdi12SensorInfo.prototype.sensorModel                 = YSdi12SensorInfo_get_sensorModel;
    YSdi12SensorInfo.prototype.get_sensorVersion           = YSdi12SensorInfo_get_sensorVersion;
    YSdi12SensorInfo.prototype.sensorVersion               = YSdi12SensorInfo_get_sensorVersion;
    YSdi12SensorInfo.prototype.get_sensorSerial            = YSdi12SensorInfo_get_sensorSerial;
    YSdi12SensorInfo.prototype.sensorSerial                = YSdi12SensorInfo_get_sensorSerial;
    YSdi12SensorInfo.prototype.get_measureCount            = YSdi12SensorInfo_get_measureCount;
    YSdi12SensorInfo.prototype.measureCount                = YSdi12SensorInfo_get_measureCount;
    YSdi12SensorInfo.prototype.get_measureCommand          = YSdi12SensorInfo_get_measureCommand;
    YSdi12SensorInfo.prototype.measureCommand              = YSdi12SensorInfo_get_measureCommand;
    YSdi12SensorInfo.prototype.get_measurePosition         = YSdi12SensorInfo_get_measurePosition;
    YSdi12SensorInfo.prototype.measurePosition             = YSdi12SensorInfo_get_measurePosition;
    YSdi12SensorInfo.prototype.get_measureSymbol           = YSdi12SensorInfo_get_measureSymbol;
    YSdi12SensorInfo.prototype.measureSymbol               = YSdi12SensorInfo_get_measureSymbol;
    YSdi12SensorInfo.prototype.get_measureUnit             = YSdi12SensorInfo_get_measureUnit;
    YSdi12SensorInfo.prototype.measureUnit                 = YSdi12SensorInfo_get_measureUnit;
    YSdi12SensorInfo.prototype.get_measureDescription      = YSdi12SensorInfo_get_measureDescription;
    YSdi12SensorInfo.prototype.measureDescription          = YSdi12SensorInfo_get_measureDescription;
    YSdi12SensorInfo.prototype.get_typeMeasure             = YSdi12SensorInfo_get_typeMeasure;
    YSdi12SensorInfo.prototype.typeMeasure                 = YSdi12SensorInfo_get_typeMeasure;
    YSdi12SensorInfo.prototype._parseInfoStr               = YSdi12SensorInfo_parseInfoStr;
    YSdi12SensorInfo.prototype._queryValueInfo             = YSdi12SensorInfo_queryValueInfo;
    //--- (end of generated code: YSdi12SensorInfo initialization)
    YSdi12SensorInfo.prototype._throw                      = YSdi12SensorInfo_throw;
})();

//--- (generated code: YSdi12Port class start)
/**
 * YSdi12Port Class: SDI12 port control interface
 *
 * The YSdi12Port class allows you to fully drive a Yoctopuce SDI12 port.
 * It can be used to send and receive data, and to configure communication
 * parameters (baud rate, bit count, parity, flow control and protocol).
 * Note that Yoctopuce SDI12 ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of generated code: YSdi12Port class start)

var YSdi12Port; // definition below
(function()
{
    function _YSdi12Port(str_func)
    {
        //--- (generated code: YSdi12Port constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Sdi12Port';

        this._rxCount                        = Y_RXCOUNT_INVALID;          // UInt31
        this._txCount                        = Y_TXCOUNT_INVALID;          // UInt31
        this._errCount                       = Y_ERRCOUNT_INVALID;         // UInt31
        this._rxMsgCount                     = Y_RXMSGCOUNT_INVALID;       // UInt31
        this._txMsgCount                     = Y_TXMSGCOUNT_INVALID;       // UInt31
        this._lastMsg                        = Y_LASTMSG_INVALID;          // Text
        this._currentJob                     = Y_CURRENTJOB_INVALID;       // Text
        this._startupJob                     = Y_STARTUPJOB_INVALID;       // Text
        this._jobMaxTask                     = Y_JOBMAXTASK_INVALID;       // UInt31
        this._jobMaxSize                     = Y_JOBMAXSIZE_INVALID;       // UInt31
        this._command                        = Y_COMMAND_INVALID;          // Text
        this._protocol                       = Y_PROTOCOL_INVALID;         // Protocol
        this._voltageLevel                   = Y_VOLTAGELEVEL_INVALID;     // SerialVoltageLevel
        this._serialMode                     = Y_SERIALMODE_INVALID;       // SerialMode
        this._rxptr                          = 0;                          // int
        this._rxbuff                         = "";                         // bin
        this._rxbuffptr                      = 0;                          // int
        this._eventPos                       = 0;                          // int
        //--- (end of generated code: YSdi12Port constructor)
    }

    //--- (generated code: YSdi12Port implementation)

    function YSdi12Port_parseAttr(name, val, _super)
    {
        switch(name) {
        case "rxCount":
            this._rxCount = parseInt(val);
            return 1;
        case "txCount":
            this._txCount = parseInt(val);
            return 1;
        case "errCount":
            this._errCount = parseInt(val);
            return 1;
        case "rxMsgCount":
            this._rxMsgCount = parseInt(val);
            return 1;
        case "txMsgCount":
            this._txMsgCount = parseInt(val);
            return 1;
        case "lastMsg":
            this._lastMsg = val;
            return 1;
        case "currentJob":
            this._currentJob = val;
            return 1;
        case "startupJob":
            this._startupJob = val;
            return 1;
        case "jobMaxTask":
            this._jobMaxTask = parseInt(val);
            return 1;
        case "jobMaxSize":
            this._jobMaxSize = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        case "protocol":
            this._protocol = val;
            return 1;
        case "voltageLevel":
            this._voltageLevel = parseInt(val);
            return 1;
        case "serialMode":
            this._serialMode = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YSdi12Port.RXCOUNT_INVALID.
     */
    function YSdi12Port_get_rxCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RXCOUNT_INVALID;
            }
        }
        res = this._rxCount;
        return res;
    }

    /**
     * Gets the total number of bytes received since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:an integer corresponding to the total number of bytes received since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.RXCOUNT_INVALID.
     */
    function YSdi12Port_get_rxCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RXCOUNT_INVALID);
            } else {
                callback(context, obj, obj._rxCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of bytes transmitted since last reset.
     *
     * @return an integer corresponding to the total number of bytes transmitted since last reset
     *
     * On failure, throws an exception or returns YSdi12Port.TXCOUNT_INVALID.
     */
    function YSdi12Port_get_txCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TXCOUNT_INVALID;
            }
        }
        res = this._txCount;
        return res;
    }

    /**
     * Gets the total number of bytes transmitted since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:an integer corresponding to the total number of bytes transmitted since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.TXCOUNT_INVALID.
     */
    function YSdi12Port_get_txCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TXCOUNT_INVALID);
            } else {
                callback(context, obj, obj._txCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of communication errors detected since last reset.
     *
     * @return an integer corresponding to the total number of communication errors detected since last reset
     *
     * On failure, throws an exception or returns YSdi12Port.ERRCOUNT_INVALID.
     */
    function YSdi12Port_get_errCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ERRCOUNT_INVALID;
            }
        }
        res = this._errCount;
        return res;
    }

    /**
     * Gets the total number of communication errors detected since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:an integer corresponding to the total number of communication errors detected since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.ERRCOUNT_INVALID.
     */
    function YSdi12Port_get_errCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ERRCOUNT_INVALID);
            } else {
                callback(context, obj, obj._errCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of messages received since last reset.
     *
     * @return an integer corresponding to the total number of messages received since last reset
     *
     * On failure, throws an exception or returns YSdi12Port.RXMSGCOUNT_INVALID.
     */
    function YSdi12Port_get_rxMsgCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RXMSGCOUNT_INVALID;
            }
        }
        res = this._rxMsgCount;
        return res;
    }

    /**
     * Gets the total number of messages received since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:an integer corresponding to the total number of messages received since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.RXMSGCOUNT_INVALID.
     */
    function YSdi12Port_get_rxMsgCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RXMSGCOUNT_INVALID);
            } else {
                callback(context, obj, obj._rxMsgCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of messages send since last reset.
     *
     * @return an integer corresponding to the total number of messages send since last reset
     *
     * On failure, throws an exception or returns YSdi12Port.TXMSGCOUNT_INVALID.
     */
    function YSdi12Port_get_txMsgCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TXMSGCOUNT_INVALID;
            }
        }
        res = this._txMsgCount;
        return res;
    }

    /**
     * Gets the total number of messages send since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:an integer corresponding to the total number of messages send since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.TXMSGCOUNT_INVALID.
     */
    function YSdi12Port_get_txMsgCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TXMSGCOUNT_INVALID);
            } else {
                callback(context, obj, obj._txMsgCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the latest message fully received.
     *
     * @return a string corresponding to the latest message fully received
     *
     * On failure, throws an exception or returns YSdi12Port.LASTMSG_INVALID.
     */
    function YSdi12Port_get_lastMsg()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LASTMSG_INVALID;
            }
        }
        res = this._lastMsg;
        return res;
    }

    /**
     * Gets the latest message fully received.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:a string corresponding to the latest message fully received
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.LASTMSG_INVALID.
     */
    function YSdi12Port_get_lastMsg_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LASTMSG_INVALID);
            } else {
                callback(context, obj, obj._lastMsg);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the name of the job file currently in use.
     *
     * @return a string corresponding to the name of the job file currently in use
     *
     * On failure, throws an exception or returns YSdi12Port.CURRENTJOB_INVALID.
     */
    function YSdi12Port_get_currentJob()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTJOB_INVALID;
            }
        }
        res = this._currentJob;
        return res;
    }

    /**
     * Gets the name of the job file currently in use.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:a string corresponding to the name of the job file currently in use
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.CURRENTJOB_INVALID.
     */
    function YSdi12Port_get_currentJob_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTJOB_INVALID);
            } else {
                callback(context, obj, obj._currentJob);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Selects a job file to run immediately. If an empty string is
     * given as argument, stops running current job file.
     *
     * @param newval : a string
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_set_currentJob(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('currentJob',rest_val);
    }

    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns YSdi12Port.STARTUPJOB_INVALID.
     */
    function YSdi12Port_get_startupJob()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_STARTUPJOB_INVALID;
            }
        }
        res = this._startupJob;
        return res;
    }

    /**
     * Gets the job file to use when the device is powered on.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:a string corresponding to the job file to use when the device is powered on
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.STARTUPJOB_INVALID.
     */
    function YSdi12Port_get_startupJob_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_STARTUPJOB_INVALID);
            } else {
                callback(context, obj, obj._startupJob);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the job to use when the device is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_set_startupJob(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('startupJob',rest_val);
    }

    /**
     * Returns the maximum number of tasks in a job that the device can handle.
     *
     * @return an integer corresponding to the maximum number of tasks in a job that the device can handle
     *
     * On failure, throws an exception or returns YSdi12Port.JOBMAXTASK_INVALID.
     */
    function YSdi12Port_get_jobMaxTask()
    {
        var res;                    // int;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_JOBMAXTASK_INVALID;
            }
        }
        res = this._jobMaxTask;
        return res;
    }

    /**
     * Gets the maximum number of tasks in a job that the device can handle.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:an integer corresponding to the maximum number of tasks in a job that the device can handle
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.JOBMAXTASK_INVALID.
     */
    function YSdi12Port_get_jobMaxTask_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_JOBMAXTASK_INVALID);
            } else {
                callback(context, obj, obj._jobMaxTask);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns maximum size allowed for job files.
     *
     * @return an integer corresponding to maximum size allowed for job files
     *
     * On failure, throws an exception or returns YSdi12Port.JOBMAXSIZE_INVALID.
     */
    function YSdi12Port_get_jobMaxSize()
    {
        var res;                    // int;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_JOBMAXSIZE_INVALID;
            }
        }
        res = this._jobMaxSize;
        return res;
    }

    /**
     * Gets maximum size allowed for job files.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:an integer corresponding to maximum size allowed for job files
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.JOBMAXSIZE_INVALID.
     */
    function YSdi12Port_get_jobMaxSize_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_JOBMAXSIZE_INVALID);
            } else {
                callback(context, obj, obj._jobMaxSize);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YSdi12Port_get_command()
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
     *         - the YSdi12Port object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YSdi12Port_get_command_async(callback,context)
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

    function YSdi12Port_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Returns the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @return a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns YSdi12Port.PROTOCOL_INVALID.
     */
    function YSdi12Port_get_protocol()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PROTOCOL_INVALID;
            }
        }
        res = this._protocol;
        return res;
    }

    /**
     * Gets the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:a string corresponding to the type of protocol used over the serial line, as a string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.PROTOCOL_INVALID.
     */
    function YSdi12Port_get_protocol_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PROTOCOL_INVALID);
            } else {
                callback(context, obj, obj._protocol);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the type of protocol used over the serial line.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each bytes sent.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the type of protocol used over the serial line
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_set_protocol(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('protocol',rest_val);
    }

    /**
     * Returns the voltage level used on the serial line.
     *
     * @return a value among YSdi12Port.VOLTAGELEVEL_OFF, YSdi12Port.VOLTAGELEVEL_TTL3V,
     * YSdi12Port.VOLTAGELEVEL_TTL3VR, YSdi12Port.VOLTAGELEVEL_TTL5V, YSdi12Port.VOLTAGELEVEL_TTL5VR,
     * YSdi12Port.VOLTAGELEVEL_RS232, YSdi12Port.VOLTAGELEVEL_RS485, YSdi12Port.VOLTAGELEVEL_TTL1V8 and
     * YSdi12Port.VOLTAGELEVEL_SDI12 corresponding to the voltage level used on the serial line
     *
     * On failure, throws an exception or returns YSdi12Port.VOLTAGELEVEL_INVALID.
     */
    function YSdi12Port_get_voltageLevel()
    {
        var res;                    // enumSERIALVOLTAGELEVEL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLTAGELEVEL_INVALID;
            }
        }
        res = this._voltageLevel;
        return res;
    }

    /**
     * Gets the voltage level used on the serial line.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:a value among YSdi12Port.VOLTAGELEVEL_OFF, YSdi12Port.VOLTAGELEVEL_TTL3V,
     *         YSdi12Port.VOLTAGELEVEL_TTL3VR, YSdi12Port.VOLTAGELEVEL_TTL5V, YSdi12Port.VOLTAGELEVEL_TTL5VR,
     *         YSdi12Port.VOLTAGELEVEL_RS232, YSdi12Port.VOLTAGELEVEL_RS485, YSdi12Port.VOLTAGELEVEL_TTL1V8 and
     *         YSdi12Port.VOLTAGELEVEL_SDI12 corresponding to the voltage level used on the serial line
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.VOLTAGELEVEL_INVALID.
     */
    function YSdi12Port_get_voltageLevel_async(callback,context)
    {
        var res;                    // enumSERIALVOLTAGELEVEL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLTAGELEVEL_INVALID);
            } else {
                callback(context, obj, obj._voltageLevel);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the voltage type used on the serial line. Valid
     * values  will depend on the Yoctopuce device model featuring
     * the serial port feature.  Check your device documentation
     * to find out which values are valid for that specific model.
     * Trying to set an invalid value will have no effect.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YSdi12Port.VOLTAGELEVEL_OFF, YSdi12Port.VOLTAGELEVEL_TTL3V,
     * YSdi12Port.VOLTAGELEVEL_TTL3VR, YSdi12Port.VOLTAGELEVEL_TTL5V, YSdi12Port.VOLTAGELEVEL_TTL5VR,
     * YSdi12Port.VOLTAGELEVEL_RS232, YSdi12Port.VOLTAGELEVEL_RS485, YSdi12Port.VOLTAGELEVEL_TTL1V8 and
     * YSdi12Port.VOLTAGELEVEL_SDI12 corresponding to the voltage type used on the serial line
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_set_voltageLevel(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('voltageLevel',rest_val);
    }

    /**
     * Returns the serial port communication parameters, as a string such as
     * "1200,7E1,Simplex". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. The suffix "Simplex" denotes
     * the fact that transmission in both directions is multiplexed on the
     * same transmission line.
     *
     * @return a string corresponding to the serial port communication parameters, as a string such as
     *         "1200,7E1,Simplex"
     *
     * On failure, throws an exception or returns YSdi12Port.SERIALMODE_INVALID.
     */
    function YSdi12Port_get_serialMode()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SERIALMODE_INVALID;
            }
        }
        res = this._serialMode;
        return res;
    }

    /**
     * Gets the serial port communication parameters, as a string such as
     * "1200,7E1,Simplex". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. The suffix "Simplex" denotes
     * the fact that transmission in both directions is multiplexed on the
     * same transmission line.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSdi12Port object that invoked the callback
     *         - the result:a string corresponding to the serial port communication parameters, as a string such as
     *         "1200,7E1,Simplex"
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YSdi12Port.SERIALMODE_INVALID.
     */
    function YSdi12Port_get_serialMode_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SERIALMODE_INVALID);
            } else {
                callback(context, obj, obj._serialMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the serial port communication parameters, with a string such as
     * "1200,7E1,Simplex". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. The suffix "Simplex" denotes
     * the fact that transmission in both directions is multiplexed on the
     * same transmission line.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the serial port communication parameters, with a string such as
     *         "1200,7E1,Simplex"
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_set_serialMode(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('serialMode',rest_val);
    }

    /**
     * Retrieves an SDI12 port for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the SDI12 port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSdi12Port.isOnline() to test if the SDI12 port is
     * indeed online at a given time. In case of ambiguity when looking for
     * an SDI12 port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the SDI12 port, for instance
     *         MyDevice.sdi12Port.
     *
     * @return a YSdi12Port object allowing you to drive the SDI12 port.
     */
    function YSdi12Port_FindSdi12Port(func)                     // class method
    {
        var obj;                    // YSdi12Port;
        obj = YFunction._FindFromCache("Sdi12Port", func);
        if (obj == null) {
            obj = new YSdi12Port(func);
            YFunction._AddToCache("Sdi12Port", func, obj);
        }
        return obj;
    }

    function YSdi12Port_sendCommand(text)
    {
        return this.set_command(text);
    }

    /**
     * Reads a single line (or message) from the receive buffer, starting at current stream position.
     * This function is intended to be used when the serial port is configured for a message protocol,
     * such as 'Line' mode or frame protocols.
     *
     * If data at current stream position is not available anymore in the receive buffer,
     * the function returns the oldest available line and moves the stream position just after.
     * If no new full line is received, the function returns an empty line.
     *
     * @return a string with a single line of text
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_readLine()
    {
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res;                    // str;

        url = "rxmsg.json?pos="+String(Math.round(this._rxptr))+"&len=1&maxw=1";
        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return "";
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        if (msglen == 0) {
            return "";
        }
        res = this._json_get_string(msgarr[0]);
        return res;
    }

    /**
     * Searches for incoming messages in the serial port receive buffer matching a given pattern,
     * starting at current position. This function will only compare and return printable characters
     * in the message strings. Binary protocols are handled as hexadecimal strings.
     *
     * The search returns all messages matching the expression provided as argument in the buffer.
     * If no matching message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param pattern : a limited regular expression describing the expected message format,
     *         or an empty string if all messages should be returned (no filtering).
     *         When using binary protocols, the format applies to the hexadecimal
     *         representation of the message.
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of strings containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSdi12Port_readMessages(pattern,maxWait)
    {
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res = [];               // strArr;
        var idx;                    // int;

        url = "rxmsg.json?pos="+String(Math.round(this._rxptr))+"&maxw="+String(Math.round(maxWait))+"&pat="+pattern;
        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(this._json_get_string(msgarr[idx]));
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Changes the current internal stream position to the specified value. This function
     * does not affect the device, it only changes the value stored in the API object
     * for the next read operations.
     *
     * @param absPos : the absolute position index for next read operations.
     *
     * @return nothing.
     */
    function YSdi12Port_read_seek(absPos)
    {
        this._rxptr = absPos;
        return YAPI_SUCCESS;
    }

    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return the absolute position index for next read operations.
     */
    function YSdi12Port_read_tell()
    {
        return this._rxptr;
    }

    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return the number of bytes available to read
     */
    function YSdi12Port_read_avail()
    {
        var availPosStr;            // str;
        var atPos;                  // int;
        var res;                    // int;
        var databin;                // bin;

        databin = this._download("rxcnt.bin?pos="+String(Math.round(this._rxptr)));
        availPosStr = databin;
        atPos = (availPosStr).indexOf("@");
        res = YAPI._atoi(availPosStr.substr(0, atPos));
        return res;
    }

    function YSdi12Port_end_tell()
    {
        var availPosStr;            // str;
        var atPos;                  // int;
        var res;                    // int;
        var databin;                // bin;

        databin = this._download("rxcnt.bin?pos="+String(Math.round(this._rxptr)));
        availPosStr = databin;
        atPos = (availPosStr).indexOf("@");
        res = YAPI._atoi(availPosStr.substr(atPos+1, (availPosStr).length-atPos-1));
        return res;
    }

    /**
     * Sends a text line query to the serial port, and reads the reply, if any.
     * This function is intended to be used when the serial port is configured for 'Line' protocol.
     *
     * @param query : the line query to send (without CR/LF)
     * @param maxWait : the maximum number of milliseconds to wait for a reply.
     *
     * @return the next text line received after sending the text query, as a string.
     *         Additional lines can be obtained by calling readLine or readMessages.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSdi12Port_queryLine(query,maxWait)
    {
        var prevpos;                // int;
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res;                    // str;
        if ((query).length <= 80) {
            // fast query
            url = "rxmsg.json?len=1&maxw="+String(Math.round(maxWait))+"&cmd=!"+this._escapeAttr(query);
        } else {
            // long query
            prevpos = this.end_tell();
            this._upload("txdata", query + "\r\n");
            url = "rxmsg.json?len=1&maxw="+String(Math.round(maxWait))+"&pos="+String(Math.round(prevpos));
        }

        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return "";
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        if (msglen == 0) {
            return "";
        }
        res = this._json_get_string(msgarr[0]);
        return res;
    }

    /**
     * Sends a binary message to the serial port, and reads the reply, if any.
     * This function is intended to be used when the serial port is configured for
     * Frame-based protocol.
     *
     * @param hexString : the message to send, coded in hexadecimal
     * @param maxWait : the maximum number of milliseconds to wait for a reply.
     *
     * @return the next frame received after sending the message, as a hex string.
     *         Additional frames can be obtained by calling readHex or readMessages.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSdi12Port_queryHex(hexString,maxWait)
    {
        var prevpos;                // int;
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res;                    // str;
        if ((hexString).length <= 80) {
            // fast query
            url = "rxmsg.json?len=1&maxw="+String(Math.round(maxWait))+"&cmd=$"+hexString;
        } else {
            // long query
            prevpos = this.end_tell();
            this._upload("txdata", YAPI._hexStrToBin(hexString));
            url = "rxmsg.json?len=1&maxw="+String(Math.round(maxWait))+"&pos="+String(Math.round(prevpos));
        }

        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return "";
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        if (msglen == 0) {
            return "";
        }
        res = this._json_get_string(msgarr[0]);
        return res;
    }

    /**
     * Saves the job definition string (JSON data) into a job file.
     * The job file can be later enabled using selectJob().
     *
     * @param jobfile : name of the job file to save on the device filesystem
     * @param jsonDef : a string containing a JSON definition of the job
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_uploadJob(jobfile,jsonDef)
    {
        this._upload(jobfile, jsonDef);
        return YAPI_SUCCESS;
    }

    /**
     * Load and start processing the specified job file. The file must have
     * been previously created using the user interface or uploaded on the
     * device filesystem using the uploadJob() function.
     *
     * @param jobfile : name of the job file (on the device filesystem)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_selectJob(jobfile)
    {
        return this.set_currentJob(jobfile);
    }

    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_reset()
    {
        this._eventPos = 0;
        this._rxptr = 0;
        this._rxbuffptr = 0;
        this._rxbuff = new Uint8Array(0);

        return this.sendCommand("Z");
    }

    /**
     * Sends a single byte to the serial port.
     *
     * @param code : the byte to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_writeByte(code)
    {
        return this.sendCommand("$"+('00'+(code).toString(16)).slice(-2).toUpperCase());
    }

    /**
     * Sends an ASCII string to the serial port, as is.
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_writeStr(text)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var ch;                     // int;
        buff = text;
        bufflen = (buff).length;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = (buff).charCodeAt(idx);
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                } else {
                    ch = 0;
                }
            }
            if (idx >= bufflen) {
                return this.sendCommand("+"+text);
            }
        }
        // send string using file upload
        return this._upload("txdata", buff);
    }

    /**
     * Sends a binary buffer to the serial port, as is.
     *
     * @param buff : the binary buffer to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_writeBin(buff)
    {
        return this._upload("txdata", buff);
    }

    /**
     * Sends a byte sequence (provided as a list of bytes) to the serial port.
     *
     * @param byteList : a list of byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_writeArray(byteList)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var hexb;                   // int;
        var res;                    // int;
        bufflen = byteList.length;
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = byteList[idx];
            buff[idx] = hexb;
            idx = idx + 1;
        }

        res = this._upload("txdata", buff);
        return res;
    }

    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the serial port.
     *
     * @param hexString : a string of hexadecimal byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_writeHex(hexString)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var hexb;                   // int;
        var res;                    // int;
        bufflen = (hexString).length;
        if (bufflen < 100) {
            return this.sendCommand("$"+hexString);
        }
        bufflen = (bufflen >> 1);
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = parseInt(hexString.substr(2 * idx, 2), 16);
            buff[idx] = hexb;
            idx = idx + 1;
        }

        res = this._upload("txdata", buff);
        return res;
    }

    /**
     * Sends an ASCII string to the serial port, followed by a line break (CR LF).
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_writeLine(text)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var ch;                     // int;
        buff = ""+text+"\r\n";
        bufflen = (buff).length-2;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = (buff).charCodeAt(idx);
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                } else {
                    ch = 0;
                }
            }
            if (idx >= bufflen) {
                return this.sendCommand("!"+text);
            }
        }
        // send string using file upload
        return this._upload("txdata", buff);
    }

    /**
     * Reads one byte from the receive buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer,
     * or if there is no data available yet, the function returns YAPI_NO_MORE_DATA.
     *
     * @return the next byte
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_readByte()
    {
        var currpos;                // int;
        var reqlen;                 // int;
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var res;                    // int;
        // first check if we have the requested character in the look-ahead buffer
        bufflen = (this._rxbuff).length;
        if ((this._rxptr >= this._rxbuffptr) && (this._rxptr < this._rxbuffptr+bufflen)) {
            res = (this._rxbuff).charCodeAt(this._rxptr-this._rxbuffptr);
            this._rxptr = this._rxptr + 1;
            return res;
        }
        // try to preload more than one byte to speed-up byte-per-byte access
        currpos = this._rxptr;
        reqlen = 1024;
        buff = this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos+bufflen) {
            res = (buff).charCodeAt(0);
            this._rxptr = currpos+1;
            this._rxbuffptr = currpos;
            this._rxbuff = buff;
            return res;
        }
        // mixed bidirectional data, retry with a smaller block
        this._rxptr = currpos;
        reqlen = 16;
        buff = this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos+bufflen) {
            res = (buff).charCodeAt(0);
            this._rxptr = currpos+1;
            this._rxbuffptr = currpos;
            this._rxbuff = buff;
            return res;
        }
        // still mixed, need to process character by character
        this._rxptr = currpos;

        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len=1");
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).charCodeAt(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).charCodeAt(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        if (bufflen == 0) {
            return YAPI_NO_MORE_DATA;
        }
        res = (buff).charCodeAt(0);
        return res;
    }

    /**
     * Reads data from the receive buffer as a string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of characters to read
     *
     * @return a string with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_readStr(nChars)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var res;                    // str;
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).charCodeAt(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).charCodeAt(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = buff.substr(0, bufflen);
        return res;
    }

    /**
     * Reads data from the receive buffer as a binary buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of bytes to read
     *
     * @return a binary object with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_readBin(nChars)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var idx;                    // int;
        var res;                    // bin;
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).charCodeAt(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).charCodeAt(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            res[idx] = (buff).charCodeAt(idx);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a list of bytes, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of bytes to read
     *
     * @return a sequence of bytes with receive buffer contents
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSdi12Port_readArray(nChars)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var idx;                    // int;
        var b;                      // int;
        var res = [];               // intArr;
        if (nChars > 65535) {
            nChars = 65535;
        }

        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).charCodeAt(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).charCodeAt(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res.length = 0;
        idx = 0;
        while (idx < bufflen) {
            b = (buff).charCodeAt(idx);
            res.push(b);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a hexadecimal string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nBytes : the maximum number of bytes to read
     *
     * @return a string with receive buffer contents, encoded in hexadecimal
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSdi12Port_readHex(nBytes)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var ofs;                    // int;
        var res;                    // str;
        if (nBytes > 65535) {
            nBytes = 65535;
        }

        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nBytes)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).charCodeAt(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).charCodeAt(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = "";
        ofs = 0;
        while (ofs + 3 < bufflen) {
            res = ""+res+""+('00'+((buff).charCodeAt(ofs)).toString(16)).slice(-2).toUpperCase()+""+('00'+((buff).charCodeAt(ofs + 1)).toString(16)).slice(-2).toUpperCase()+""+('00'+((buff).charCodeAt(ofs + 2)).toString(16)).slice(-2).toUpperCase()+""+('00'+((buff).charCodeAt(ofs + 3)).toString(16)).slice(-2).toUpperCase();
            ofs = ofs + 4;
        }
        while (ofs < bufflen) {
            res = ""+res+""+('00'+((buff).charCodeAt(ofs)).toString(16)).slice(-2).toUpperCase();
            ofs = ofs + 1;
        }
        return res;
    }

    /**
     * Sends a SDI-12 query to the bus, and reads the sensor immediate reply.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param sensorAddr : the sensor address, as a string
     * @param cmd : the SDI12 query to send (without address and exclamation point)
     * @param maxWait : the maximum timeout to wait for a reply from sensor, in millisecond
     *
     * @return the reply returned by the sensor, without newline, as a string.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSdi12Port_querySdi12(sensorAddr,cmd,maxWait)
    {
        var fullCmd;                // str;
        var cmdChar;                // str;
        var pattern;                // str;
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res;                    // str;
        cmdChar  = "";

        pattern = sensorAddr;
        if ((cmd).length > 0) {
            cmdChar = cmd.substr(0, 1);
        }
        if (sensorAddr == "?") {
            pattern = ".*";
        } else {
            if (cmdChar == "M" || cmdChar == "D") {
                pattern = ""+sensorAddr+":.*";
            } else {
                pattern = ""+sensorAddr+".*";
            }
        }
        pattern = this._escapeAttr(pattern);
        fullCmd = this._escapeAttr("+"+sensorAddr+""+cmd+"!");
        url = "rxmsg.json?len=1&maxw="+String(Math.round(maxWait))+"&cmd="+fullCmd+"&pat="+pattern;

        msgbin = this._download(url);
        if ((msgbin).length<2) {
            return "";
        }
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return "";
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        if (msglen == 0) {
            return "";
        }
        res = this._json_get_string(msgarr[0]);
        return res;
    }

    /**
     * Sends a discovery command to the bus, and reads the sensor information reply.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     * This function work when only one sensor is connected.
     *
     * @return the reply returned by the sensor, as a YSdi12SensorInfo object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSdi12Port_discoverSingleSensor()
    {
        var resStr;                 // str;

        resStr = this.querySdi12("?","",5000);
        if (resStr == "") {
            return new YSdi12SensorInfo(this, "ERSensor Not Found");
        }

        return this.getSensorInformation(resStr);
    }

    /**
     * Sends a discovery command to the bus, and reads all sensors information reply.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @return all the information from every connected sensor, as an array of YSdi12SensorInfo object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSdi12Port_discoverAllSensors()
    {
        var sensors = [];           // YSdi12SensorInfoArr;
        var idSens = [];            // strArr;
        var res;                    // str;
        var i;                      // int;
        var lettreMin;              // str;
        var lettreMaj;              // str;

        // 1. Search for sensors present
        idSens.length = 0;
        i = 0 ;
        while (i < 10) {
            res = this.querySdi12(i,"!",500);
            if ((res).length >= 1) {
                idSens.push(res);
            }
            i = i+1;
        }
        lettreMin = "abcdefghijklmnopqrstuvwxyz";
        lettreMaj = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        i = 0;
        while (i<26) {
            res = this.querySdi12(lettreMin.substr(i, 1),"!",500);
            if ((res).length >= 1) {
                idSens.push(res);
            }
            i = i +1;
        }
        while (i<26) {
            res = this.querySdi12(lettreMaj.substr(i, 1),"!",500);
            if ((res).length >= 1) {
                idSens.push(res);
            }
            i = i +1;
        }
        // 2. Query existing sensors information
        i = 0;
        sensors.length = 0;
        while (i < idSens.length) {
            sensors.push(this.getSensorInformation(idSens[i]));
            i = i + 1;
        }
        return sensors;
    }

    /**
     * Sends a mesurement command to the SDI-12 bus, and reads the sensor immediate reply.
     * The supported commands are:
     * M: Measurement start control
     * M1...M9: Additional measurement start command
     * D: Measurement reading control
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param sensorAddr : the sensor address, as a string
     * @param measCmd : the SDI12 query to send (without address and exclamation point)
     * @param maxWait : the maximum timeout to wait for a reply from sensor, in millisecond
     *
     * @return the reply returned by the sensor, without newline, as a list of float.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSdi12Port_readSensor(sensorAddr,measCmd,maxWait)
    {
        var resStr;                 // str;
        var res = [];               // floatArr;
        var tab = [];               // strArr;
        var split = [];             // strArr;
        var i;                      // int;
        var valdouble;              // float;

        resStr = this.querySdi12(sensorAddr,measCmd,maxWait);
        tab = (resStr).split(',');
        split = (tab[0]).split(':');
        if (split.length < 2) {
            return res;
        }
        valdouble = parseFloat(split[1]);
        res.push(valdouble);
        i = 1;
        while (i < tab.length) {
            valdouble = parseFloat(tab[i]);
            res.push(valdouble);
            i = i + 1;
        }
        return res;
    }

    /**
     * Changes the address of the selected sensor, and returns the sensor information with the new address.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param oldAddress : Actual sensor address, as a string
     * @param newAddress : New sensor address, as a string
     *
     * @return the sensor address and information , as a YSdi12SensorInfo object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSdi12Port_changeAddress(oldAddress,newAddress)
    {
        var addr;                   // YSdi12SensorInfo;

        this.querySdi12(oldAddress, "A" + newAddress,1000);
        addr = this.getSensorInformation(newAddress);
        return addr;
    }

    /**
     * Sends a information command to the bus, and reads sensors information selected.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param sensorAddr : Sensor address, as a string
     *
     * @return the reply returned by the sensor, as a YSdi12Port object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSdi12Port_getSensorInformation(sensorAddr)
    {
        var res;                    // str;
        var sensor;                 // YSdi12SensorInfo;

        res = this.querySdi12(sensorAddr,"I",1000);
        if (res == "") {
            return new YSdi12SensorInfo(this, "ERSensor Not Found");
        }
        sensor = new YSdi12SensorInfo(this, res);
        sensor._queryValueInfo();
        return sensor;
    }

    /**
     * Sends a information command to the bus, and reads sensors information selected.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param sensorAddr : Sensor address, as a string
     *
     * @return the reply returned by the sensor, as a YSdi12Port object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSdi12Port_readConcurrentMeasurements(sensorAddr)
    {
        var res = [];               // floatArr;

        res= this.readSensor(sensorAddr,"D",1000);
        return res;
    }

    /**
     * Sends a information command to the bus, and reads sensors information selected.
     * This function is intended to be used when the serial port is configured for 'SDI-12' protocol.
     *
     * @param sensorAddr : Sensor address, as a string
     *
     * @return the reply returned by the sensor, as a YSdi12Port object.
     *
     * On failure, throws an exception or returns an empty string.
     */
    function YSdi12Port_requestConcurrentMeasurements(sensorAddr)
    {
        var timewait;               // int;
        var wait;                   // str;

        wait = this.querySdi12(sensorAddr,"C",1000);
        wait = wait.substr(1, 3);
        timewait = YAPI._atoi(wait) * 1000;
        return timewait;
    }

    /**
     * Retrieves messages (both direction) in the SDI12 port buffer, starting at current position.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     * @param maxMsg : the maximum number of messages to be returned by the function; up to 254.
     *
     * @return an array of YSdi12SnoopingRecord objects containing the messages found, if any.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSdi12Port_snoopMessagesEx(maxWait,maxMsg)
    {
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res = [];               // YSdi12SnoopingRecordArr;
        var idx;                    // int;

        url = "rxmsg.json?pos="+String(Math.round(this._rxptr))+"&maxw="+String(Math.round(maxWait))+"&t=0&len="+String(Math.round(maxMsg));
        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(new YSdi12SnoopingRecord(msgarr[idx]));
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Retrieves messages (both direction) in the SDI12 port buffer, starting at current position.
     *
     * If no message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of YSdi12SnoopingRecord objects containing the messages found, if any.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSdi12Port_snoopMessages(maxWait)
    {
        return this.snoopMessagesEx(maxWait, 255);
    }

    /**
     * Continues the enumeration of SDI12 ports started using yFirstSdi12Port().
     * Caution: You can't make any assumption about the returned SDI12 ports order.
     * If you want to find a specific an SDI12 port, use Sdi12Port.findSdi12Port()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YSdi12Port object, corresponding to
     *         an SDI12 port currently online, or a null pointer
     *         if there are no more SDI12 ports to enumerate.
     */
    function YSdi12Port_nextSdi12Port()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSdi12Port.FindSdi12Port(next_hwid);
    }

    /**
     * Starts the enumeration of SDI12 ports currently accessible.
     * Use the method YSdi12Port.nextSdi12Port() to iterate on
     * next SDI12 ports.
     *
     * @return a pointer to a YSdi12Port object, corresponding to
     *         the first SDI12 port currently online, or a null pointer
     *         if there are none.
     */
    function YSdi12Port_FirstSdi12Port()
    {
        var next_hwid = YAPI.getFirstHardwareId('Sdi12Port');
        if(next_hwid == null) return null;
        return YSdi12Port.FindSdi12Port(next_hwid);
    }

    //--- (end of generated code: YSdi12Port implementation)

    //--- (generated code: YSdi12Port initialization)
    YSdi12Port = YFunction._Subclass(_YSdi12Port, {
        // Constants
        RXCOUNT_INVALID             : YAPI_INVALID_UINT,
        TXCOUNT_INVALID             : YAPI_INVALID_UINT,
        ERRCOUNT_INVALID            : YAPI_INVALID_UINT,
        RXMSGCOUNT_INVALID          : YAPI_INVALID_UINT,
        TXMSGCOUNT_INVALID          : YAPI_INVALID_UINT,
        LASTMSG_INVALID             : YAPI_INVALID_STRING,
        CURRENTJOB_INVALID          : YAPI_INVALID_STRING,
        STARTUPJOB_INVALID          : YAPI_INVALID_STRING,
        JOBMAXTASK_INVALID          : YAPI_INVALID_UINT,
        JOBMAXSIZE_INVALID          : YAPI_INVALID_UINT,
        COMMAND_INVALID             : YAPI_INVALID_STRING,
        PROTOCOL_INVALID            : YAPI_INVALID_STRING,
        VOLTAGELEVEL_OFF            : 0,
        VOLTAGELEVEL_TTL3V          : 1,
        VOLTAGELEVEL_TTL3VR         : 2,
        VOLTAGELEVEL_TTL5V          : 3,
        VOLTAGELEVEL_TTL5VR         : 4,
        VOLTAGELEVEL_RS232          : 5,
        VOLTAGELEVEL_RS485          : 6,
        VOLTAGELEVEL_TTL1V8         : 7,
        VOLTAGELEVEL_SDI12          : 8,
        VOLTAGELEVEL_INVALID        : -1,
        SERIALMODE_INVALID          : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindSdi12Port               : YSdi12Port_FindSdi12Port,
        FirstSdi12Port              : YSdi12Port_FirstSdi12Port
    }, {
        // Methods
        get_rxCount                 : YSdi12Port_get_rxCount,
        rxCount                     : YSdi12Port_get_rxCount,
        get_rxCount_async           : YSdi12Port_get_rxCount_async,
        rxCount_async               : YSdi12Port_get_rxCount_async,
        get_txCount                 : YSdi12Port_get_txCount,
        txCount                     : YSdi12Port_get_txCount,
        get_txCount_async           : YSdi12Port_get_txCount_async,
        txCount_async               : YSdi12Port_get_txCount_async,
        get_errCount                : YSdi12Port_get_errCount,
        errCount                    : YSdi12Port_get_errCount,
        get_errCount_async          : YSdi12Port_get_errCount_async,
        errCount_async              : YSdi12Port_get_errCount_async,
        get_rxMsgCount              : YSdi12Port_get_rxMsgCount,
        rxMsgCount                  : YSdi12Port_get_rxMsgCount,
        get_rxMsgCount_async        : YSdi12Port_get_rxMsgCount_async,
        rxMsgCount_async            : YSdi12Port_get_rxMsgCount_async,
        get_txMsgCount              : YSdi12Port_get_txMsgCount,
        txMsgCount                  : YSdi12Port_get_txMsgCount,
        get_txMsgCount_async        : YSdi12Port_get_txMsgCount_async,
        txMsgCount_async            : YSdi12Port_get_txMsgCount_async,
        get_lastMsg                 : YSdi12Port_get_lastMsg,
        lastMsg                     : YSdi12Port_get_lastMsg,
        get_lastMsg_async           : YSdi12Port_get_lastMsg_async,
        lastMsg_async               : YSdi12Port_get_lastMsg_async,
        get_currentJob              : YSdi12Port_get_currentJob,
        currentJob                  : YSdi12Port_get_currentJob,
        get_currentJob_async        : YSdi12Port_get_currentJob_async,
        currentJob_async            : YSdi12Port_get_currentJob_async,
        set_currentJob              : YSdi12Port_set_currentJob,
        setCurrentJob               : YSdi12Port_set_currentJob,
        get_startupJob              : YSdi12Port_get_startupJob,
        startupJob                  : YSdi12Port_get_startupJob,
        get_startupJob_async        : YSdi12Port_get_startupJob_async,
        startupJob_async            : YSdi12Port_get_startupJob_async,
        set_startupJob              : YSdi12Port_set_startupJob,
        setStartupJob               : YSdi12Port_set_startupJob,
        get_jobMaxTask              : YSdi12Port_get_jobMaxTask,
        jobMaxTask                  : YSdi12Port_get_jobMaxTask,
        get_jobMaxTask_async        : YSdi12Port_get_jobMaxTask_async,
        jobMaxTask_async            : YSdi12Port_get_jobMaxTask_async,
        get_jobMaxSize              : YSdi12Port_get_jobMaxSize,
        jobMaxSize                  : YSdi12Port_get_jobMaxSize,
        get_jobMaxSize_async        : YSdi12Port_get_jobMaxSize_async,
        jobMaxSize_async            : YSdi12Port_get_jobMaxSize_async,
        get_command                 : YSdi12Port_get_command,
        command                     : YSdi12Port_get_command,
        get_command_async           : YSdi12Port_get_command_async,
        command_async               : YSdi12Port_get_command_async,
        set_command                 : YSdi12Port_set_command,
        setCommand                  : YSdi12Port_set_command,
        get_protocol                : YSdi12Port_get_protocol,
        protocol                    : YSdi12Port_get_protocol,
        get_protocol_async          : YSdi12Port_get_protocol_async,
        protocol_async              : YSdi12Port_get_protocol_async,
        set_protocol                : YSdi12Port_set_protocol,
        setProtocol                 : YSdi12Port_set_protocol,
        get_voltageLevel            : YSdi12Port_get_voltageLevel,
        voltageLevel                : YSdi12Port_get_voltageLevel,
        get_voltageLevel_async      : YSdi12Port_get_voltageLevel_async,
        voltageLevel_async          : YSdi12Port_get_voltageLevel_async,
        set_voltageLevel            : YSdi12Port_set_voltageLevel,
        setVoltageLevel             : YSdi12Port_set_voltageLevel,
        get_serialMode              : YSdi12Port_get_serialMode,
        serialMode                  : YSdi12Port_get_serialMode,
        get_serialMode_async        : YSdi12Port_get_serialMode_async,
        serialMode_async            : YSdi12Port_get_serialMode_async,
        set_serialMode              : YSdi12Port_set_serialMode,
        setSerialMode               : YSdi12Port_set_serialMode,
        sendCommand                 : YSdi12Port_sendCommand,
        readLine                    : YSdi12Port_readLine,
        readMessages                : YSdi12Port_readMessages,
        read_seek                   : YSdi12Port_read_seek,
        read_tell                   : YSdi12Port_read_tell,
        read_avail                  : YSdi12Port_read_avail,
        end_tell                    : YSdi12Port_end_tell,
        queryLine                   : YSdi12Port_queryLine,
        queryHex                    : YSdi12Port_queryHex,
        uploadJob                   : YSdi12Port_uploadJob,
        selectJob                   : YSdi12Port_selectJob,
        reset                       : YSdi12Port_reset,
        writeByte                   : YSdi12Port_writeByte,
        writeStr                    : YSdi12Port_writeStr,
        writeBin                    : YSdi12Port_writeBin,
        writeArray                  : YSdi12Port_writeArray,
        writeHex                    : YSdi12Port_writeHex,
        writeLine                   : YSdi12Port_writeLine,
        readByte                    : YSdi12Port_readByte,
        readStr                     : YSdi12Port_readStr,
        readBin                     : YSdi12Port_readBin,
        readArray                   : YSdi12Port_readArray,
        readHex                     : YSdi12Port_readHex,
        querySdi12                  : YSdi12Port_querySdi12,
        discoverSingleSensor        : YSdi12Port_discoverSingleSensor,
        discoverAllSensors          : YSdi12Port_discoverAllSensors,
        readSensor                  : YSdi12Port_readSensor,
        changeAddress               : YSdi12Port_changeAddress,
        getSensorInformation        : YSdi12Port_getSensorInformation,
        readConcurrentMeasurements  : YSdi12Port_readConcurrentMeasurements,
        requestConcurrentMeasurements : YSdi12Port_requestConcurrentMeasurements,
        snoopMessagesEx             : YSdi12Port_snoopMessagesEx,
        snoopMessages               : YSdi12Port_snoopMessages,
        nextSdi12Port               : YSdi12Port_nextSdi12Port,
        _parseAttr                  : YSdi12Port_parseAttr
    });
    //--- (end of generated code: YSdi12Port initialization)
})();

//--- (generated code: YSdi12Port functions)

/**
 * Retrieves an SDI12 port for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the SDI12 port is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSdi12Port.isOnline() to test if the SDI12 port is
 * indeed online at a given time. In case of ambiguity when looking for
 * an SDI12 port by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the SDI12 port, for instance
 *         MyDevice.sdi12Port.
 *
 * @return a YSdi12Port object allowing you to drive the SDI12 port.
 */
function yFindSdi12Port(func)
{
    return YSdi12Port.FindSdi12Port(func);
}

/**
 * Starts the enumeration of SDI12 ports currently accessible.
 * Use the method YSdi12Port.nextSdi12Port() to iterate on
 * next SDI12 ports.
 *
 * @return a pointer to a YSdi12Port object, corresponding to
 *         the first SDI12 port currently online, or a null pointer
 *         if there are none.
 */
function yFirstSdi12Port()
{
    return YSdi12Port.FirstSdi12Port();
}

//--- (end of generated code: YSdi12Port functions)
