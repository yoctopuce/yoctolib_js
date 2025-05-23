/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for Buzzer functions
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

//--- (YBuzzer return codes)
//--- (end of YBuzzer return codes)
//--- (YBuzzer definitions)
var Y_FREQUENCY_INVALID             = YAPI_INVALID_DOUBLE;
var Y_VOLUME_INVALID                = YAPI_INVALID_UINT;
var Y_PLAYSEQSIZE_INVALID           = YAPI_INVALID_UINT;
var Y_PLAYSEQMAXSIZE_INVALID        = YAPI_INVALID_UINT;
var Y_PLAYSEQSIGNATURE_INVALID      = YAPI_INVALID_UINT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YBuzzer definitions)

//--- (YBuzzer class start)
/**
 * YBuzzer Class: buzzer control interface, available for instance in the Yocto-Buzzer, the
 * Yocto-MaxiBuzzer or the Yocto-MaxiKnob
 *
 * The YBuzzer class allows you to drive a buzzer. You can
 * choose the frequency and the volume at which the buzzer must sound.
 * You can also pre-program a play sequence.
 */
//--- (end of YBuzzer class start)

var YBuzzer; // definition below
(function()
{
    function _YBuzzer(str_func)
    {
        //--- (YBuzzer constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Buzzer';

        this._frequency                      = Y_FREQUENCY_INVALID;        // MeasureVal
        this._volume                         = Y_VOLUME_INVALID;           // Percent
        this._playSeqSize                    = Y_PLAYSEQSIZE_INVALID;      // UInt31
        this._playSeqMaxSize                 = Y_PLAYSEQMAXSIZE_INVALID;   // UInt31
        this._playSeqSignature               = Y_PLAYSEQSIGNATURE_INVALID; // UInt31
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YBuzzer constructor)
    }

    //--- (YBuzzer implementation)

    function YBuzzer_parseAttr(name, val, _super)
    {
        switch(name) {
        case "frequency":
            this._frequency = Math.round(val / 65.536) / 1000.0;
            return 1;
        case "volume":
            this._volume = parseInt(val);
            return 1;
        case "playSeqSize":
            this._playSeqSize = parseInt(val);
            return 1;
        case "playSeqMaxSize":
            this._playSeqMaxSize = parseInt(val);
            return 1;
        case "playSeqSignature":
            this._playSeqSignature = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the frequency of the signal sent to the buzzer. A zero value stops the buzzer.
     *
     * @param newval : a floating point number corresponding to the frequency of the signal sent to the buzzer
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_set_frequency(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('frequency',rest_val);
    }

    /**
     * Returns the  frequency of the signal sent to the buzzer/speaker.
     *
     * @return a floating point number corresponding to the  frequency of the signal sent to the buzzer/speaker
     *
     * On failure, throws an exception or returns YBuzzer.FREQUENCY_INVALID.
     */
    function YBuzzer_get_frequency()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_FREQUENCY_INVALID;
            }
        }
        res = this._frequency;
        return res;
    }

    /**
     * Gets the  frequency of the signal sent to the buzzer/speaker.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBuzzer object that invoked the callback
     *         - the result:a floating point number corresponding to the  frequency of the signal sent to the buzzer/speaker
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YBuzzer.FREQUENCY_INVALID.
     */
    function YBuzzer_get_frequency_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_FREQUENCY_INVALID);
            } else {
                callback(context, obj, obj._frequency);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the volume of the signal sent to the buzzer/speaker.
     *
     * @return an integer corresponding to the volume of the signal sent to the buzzer/speaker
     *
     * On failure, throws an exception or returns YBuzzer.VOLUME_INVALID.
     */
    function YBuzzer_get_volume()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLUME_INVALID;
            }
        }
        res = this._volume;
        return res;
    }

    /**
     * Gets the volume of the signal sent to the buzzer/speaker.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBuzzer object that invoked the callback
     *         - the result:an integer corresponding to the volume of the signal sent to the buzzer/speaker
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YBuzzer.VOLUME_INVALID.
     */
    function YBuzzer_get_volume_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLUME_INVALID);
            } else {
                callback(context, obj, obj._volume);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the volume of the signal sent to the buzzer/speaker. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the volume of the signal sent to the buzzer/speaker
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_set_volume(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('volume',rest_val);
    }

    /**
     * Returns the current length of the playing sequence.
     *
     * @return an integer corresponding to the current length of the playing sequence
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQSIZE_INVALID.
     */
    function YBuzzer_get_playSeqSize()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PLAYSEQSIZE_INVALID;
            }
        }
        res = this._playSeqSize;
        return res;
    }

    /**
     * Gets the current length of the playing sequence.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBuzzer object that invoked the callback
     *         - the result:an integer corresponding to the current length of the playing sequence
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQSIZE_INVALID.
     */
    function YBuzzer_get_playSeqSize_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PLAYSEQSIZE_INVALID);
            } else {
                callback(context, obj, obj._playSeqSize);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the maximum length of the playing sequence.
     *
     * @return an integer corresponding to the maximum length of the playing sequence
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQMAXSIZE_INVALID.
     */
    function YBuzzer_get_playSeqMaxSize()
    {
        var res;                    // int;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PLAYSEQMAXSIZE_INVALID;
            }
        }
        res = this._playSeqMaxSize;
        return res;
    }

    /**
     * Gets the maximum length of the playing sequence.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBuzzer object that invoked the callback
     *         - the result:an integer corresponding to the maximum length of the playing sequence
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQMAXSIZE_INVALID.
     */
    function YBuzzer_get_playSeqMaxSize_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PLAYSEQMAXSIZE_INVALID);
            } else {
                callback(context, obj, obj._playSeqMaxSize);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the playing sequence signature. As playing
     * sequences cannot be read from the device, this can be used
     * to detect if a specific playing sequence is already
     * programmed.
     *
     * @return an integer corresponding to the playing sequence signature
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQSIGNATURE_INVALID.
     */
    function YBuzzer_get_playSeqSignature()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PLAYSEQSIGNATURE_INVALID;
            }
        }
        res = this._playSeqSignature;
        return res;
    }

    /**
     * Gets the playing sequence signature. As playing
     * sequences cannot be read from the device, this can be used
     * to detect if a specific playing sequence is already
     * programmed.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBuzzer object that invoked the callback
     *         - the result:an integer corresponding to the playing sequence signature
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQSIGNATURE_INVALID.
     */
    function YBuzzer_get_playSeqSignature_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PLAYSEQSIGNATURE_INVALID);
            } else {
                callback(context, obj, obj._playSeqSignature);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YBuzzer_get_command()
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
     *         - the YBuzzer object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YBuzzer_get_command_async(callback,context)
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

    function YBuzzer_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a buzzer for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the buzzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBuzzer.isOnline() to test if the buzzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a buzzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the buzzer, for instance
     *         YBUZZER2.buzzer.
     *
     * @return a YBuzzer object allowing you to drive the buzzer.
     */
    function YBuzzer_FindBuzzer(func)                           // class method
    {
        var obj;                    // YBuzzer;
        obj = YFunction._FindFromCache("Buzzer", func);
        if (obj == null) {
            obj = new YBuzzer(func);
            YFunction._AddToCache("Buzzer", func, obj);
        }
        return obj;
    }

    function YBuzzer_sendCommand(command)
    {
        return this.set_command(command);
    }

    /**
     * Adds a new frequency transition to the playing sequence.
     *
     * @param freq    : desired frequency when the transition is completed, in Hz
     * @param msDelay : duration of the frequency transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_addFreqMoveToPlaySeq(freq,msDelay)
    {
        return this.sendCommand("A"+String(Math.round(freq))+","+String(Math.round(msDelay)));
    }

    /**
     * Adds a pulse to the playing sequence.
     *
     * @param freq : pulse frequency, in Hz
     * @param msDuration : pulse duration, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_addPulseToPlaySeq(freq,msDuration)
    {
        return this.sendCommand("B"+String(Math.round(freq))+","+String(Math.round(msDuration)));
    }

    /**
     * Adds a new volume transition to the playing sequence. Frequency stays untouched:
     * if frequency is at zero, the transition has no effect.
     *
     * @param volume    : desired volume when the transition is completed, as a percentage.
     * @param msDuration : duration of the volume transition, in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_addVolMoveToPlaySeq(volume,msDuration)
    {
        return this.sendCommand("C"+String(Math.round(volume))+","+String(Math.round(msDuration)));
    }

    /**
     * Adds notes to the playing sequence. Notes are provided as text words, separated by
     * spaces. The pitch is specified using the usual letter from A to G. The duration is
     * specified as the divisor of a whole note: 4 for a fourth, 8 for an eight note, etc.
     * Some modifiers are supported: # and b to alter a note pitch,
     * ' and , to move to the upper/lower octave, . to enlarge
     * the note duration.
     *
     * @param notes : notes to be played, as a text string.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_addNotesToPlaySeq(notes)
    {
        var tempo;                  // int;
        var prevPitch;              // int;
        var prevDuration;           // int;
        var prevFreq;               // int;
        var note;                   // int;
        var num;                    // int;
        var typ;                    // int;
        var ascNotes;               // bin;
        var notesLen;               // int;
        var i;                      // int;
        var ch;                     // int;
        var dNote;                  // int;
        var pitch;                  // int;
        var freq;                   // int;
        var ms;                     // int;
        var ms16;                   // int;
        var rest;                   // int;
        tempo = 100;
        prevPitch = 3;
        prevDuration = 4;
        prevFreq = 110;
        note = -99;
        num = 0;
        typ = 3;
        ascNotes = notes;
        notesLen = (ascNotes).length;
        i = 0;
        while (i < notesLen) {
            ch = (ascNotes).charCodeAt(i);
            // A (note))
            if (ch == 65) {
                note = 0;
            }
            // B (note)
            if (ch == 66) {
                note = 2;
            }
            // C (note)
            if (ch == 67) {
                note = 3;
            }
            // D (note)
            if (ch == 68) {
                note = 5;
            }
            // E (note)
            if (ch == 69) {
                note = 7;
            }
            // F (note)
            if (ch == 70) {
                note = 8;
            }
            // G (note)
            if (ch == 71) {
                note = 10;
            }
            // '#' (sharp modifier)
            if (ch == 35) {
                note = note + 1;
            }
            // 'b' (flat modifier)
            if (ch == 98) {
                note = note - 1;
            }
            // ' (octave up)
            if (ch == 39) {
                prevPitch = prevPitch + 12;
            }
            // , (octave down)
            if (ch == 44) {
                prevPitch = prevPitch - 12;
            }
            // R (rest)
            if (ch == 82) {
                typ = 0;
            }
            // ! (staccato modifier)
            if (ch == 33) {
                typ = 1;
            }
            // ^ (short modifier)
            if (ch == 94) {
                typ = 2;
            }
            // _ (legato modifier)
            if (ch == 95) {
                typ = 4;
            }
            // - (glissando modifier)
            if (ch == 45) {
                typ = 5;
            }
            // % (tempo change)
            if ((ch == 37) && (num > 0)) {
                tempo = num;
                num = 0;
            }
            if ((ch >= 48) && (ch <= 57)) {
                // 0-9 (number)
                num = (num * 10) + (ch - 48);
            }
            if (ch == 46) {
                // . (duration modifier)
                num = parseInt((num * 2) / (3));
            }
            if (((ch == 32) || (i+1 == notesLen)) && ((note > -99) || (typ != 3))) {
                if (num == 0) {
                    num = prevDuration;
                } else {
                    prevDuration = num;
                }
                ms = Math.round(320000.0 / (tempo * num));
                if (typ == 0) {
                    this.addPulseToPlaySeq(0, ms);
                } else {
                    dNote = note - (((prevPitch) % (12)));
                    if (dNote > 6) {
                        dNote = dNote - 12;
                    }
                    if (dNote <= -6) {
                        dNote = dNote + 12;
                    }
                    pitch = prevPitch + dNote;
                    freq = Math.round(440 * Math.exp(pitch * 0.05776226504666));
                    ms16 = (ms >> 4);
                    rest = 0;
                    if (typ == 3) {
                        rest = 2 * ms16;
                    }
                    if (typ == 2) {
                        rest = 8 * ms16;
                    }
                    if (typ == 1) {
                        rest = 12 * ms16;
                    }
                    if (typ == 5) {
                        this.addPulseToPlaySeq(prevFreq, ms16);
                        this.addFreqMoveToPlaySeq(freq, 8 * ms16);
                        this.addPulseToPlaySeq(freq, ms - 9 * ms16);
                    } else {
                        this.addPulseToPlaySeq(freq, ms - rest);
                        if (rest > 0) {
                            this.addPulseToPlaySeq(0, rest);
                        }
                    }
                    prevFreq = freq;
                    prevPitch = pitch;
                }
                note = -99;
                num = 0;
                typ = 3;
            }
            i = i + 1;
        }
        return YAPI_SUCCESS;
    }

    /**
     * Starts the preprogrammed playing sequence. The sequence
     * runs in loop until it is stopped by stopPlaySeq or an explicit
     * change. To play the sequence only once, use oncePlaySeq().
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_startPlaySeq()
    {
        return this.sendCommand("S");
    }

    /**
     * Stops the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_stopPlaySeq()
    {
        return this.sendCommand("X");
    }

    /**
     * Resets the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_resetPlaySeq()
    {
        return this.sendCommand("Z");
    }

    /**
     * Starts the preprogrammed playing sequence and run it once only.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_oncePlaySeq()
    {
        return this.sendCommand("s");
    }

    /**
     * Saves the preprogrammed playing sequence to flash memory.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_savePlaySeq()
    {
        return this.sendCommand("W");
    }

    /**
     * Reloads the preprogrammed playing sequence from the flash memory.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_reloadPlaySeq()
    {
        return this.sendCommand("R");
    }

    /**
     * Activates the buzzer for a short duration.
     *
     * @param frequency : pulse frequency, in hertz
     * @param duration : pulse duration in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_pulse(frequency,duration)
    {
        return this.set_command("P"+String(Math.round(frequency))+","+String(Math.round(duration)));
    }

    /**
     * Makes the buzzer frequency change over a period of time.
     *
     * @param frequency : frequency to reach, in hertz. A frequency under 25Hz stops the buzzer.
     * @param duration :  pulse duration in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_freqMove(frequency,duration)
    {
        return this.set_command("F"+String(Math.round(frequency))+","+String(Math.round(duration)));
    }

    /**
     * Makes the buzzer volume change over a period of time, frequency  stays untouched.
     *
     * @param volume : volume to reach in %
     * @param duration : change duration in milliseconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_volumeMove(volume,duration)
    {
        return this.set_command("V"+String(Math.round(volume))+","+String(Math.round(duration)));
    }

    /**
     * Immediately play a note sequence. Notes are provided as text words, separated by
     * spaces. The pitch is specified using the usual letter from A to G. The duration is
     * specified as the divisor of a whole note: 4 for a fourth, 8 for an eight note, etc.
     * Some modifiers are supported: # and b to alter a note pitch,
     * ' and , to move to the upper/lower octave, . to enlarge
     * the note duration.
     *
     * @param notes : notes to be played, as a text string.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YBuzzer_playNotes(notes)
    {
        this.resetPlaySeq();
        this.addNotesToPlaySeq(notes);
        return this.oncePlaySeq();
    }

    /**
     * Continues the enumeration of buzzers started using yFirstBuzzer().
     * Caution: You can't make any assumption about the returned buzzers order.
     * If you want to find a specific a buzzer, use Buzzer.findBuzzer()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YBuzzer object, corresponding to
     *         a buzzer currently online, or a null pointer
     *         if there are no more buzzers to enumerate.
     */
    function YBuzzer_nextBuzzer()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YBuzzer.FindBuzzer(next_hwid);
    }

    /**
     * Starts the enumeration of buzzers currently accessible.
     * Use the method YBuzzer.nextBuzzer() to iterate on
     * next buzzers.
     *
     * @return a pointer to a YBuzzer object, corresponding to
     *         the first buzzer currently online, or a null pointer
     *         if there are none.
     */
    function YBuzzer_FirstBuzzer()
    {
        var next_hwid = YAPI.getFirstHardwareId('Buzzer');
        if(next_hwid == null) return null;
        return YBuzzer.FindBuzzer(next_hwid);
    }

    //--- (end of YBuzzer implementation)

    //--- (YBuzzer initialization)
    YBuzzer = YFunction._Subclass(_YBuzzer, {
        // Constants
        FREQUENCY_INVALID           : YAPI_INVALID_DOUBLE,
        VOLUME_INVALID              : YAPI_INVALID_UINT,
        PLAYSEQSIZE_INVALID         : YAPI_INVALID_UINT,
        PLAYSEQMAXSIZE_INVALID      : YAPI_INVALID_UINT,
        PLAYSEQSIGNATURE_INVALID    : YAPI_INVALID_UINT,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindBuzzer                  : YBuzzer_FindBuzzer,
        FirstBuzzer                 : YBuzzer_FirstBuzzer
    }, {
        // Methods
        set_frequency               : YBuzzer_set_frequency,
        setFrequency                : YBuzzer_set_frequency,
        get_frequency               : YBuzzer_get_frequency,
        frequency                   : YBuzzer_get_frequency,
        get_frequency_async         : YBuzzer_get_frequency_async,
        frequency_async             : YBuzzer_get_frequency_async,
        get_volume                  : YBuzzer_get_volume,
        volume                      : YBuzzer_get_volume,
        get_volume_async            : YBuzzer_get_volume_async,
        volume_async                : YBuzzer_get_volume_async,
        set_volume                  : YBuzzer_set_volume,
        setVolume                   : YBuzzer_set_volume,
        get_playSeqSize             : YBuzzer_get_playSeqSize,
        playSeqSize                 : YBuzzer_get_playSeqSize,
        get_playSeqSize_async       : YBuzzer_get_playSeqSize_async,
        playSeqSize_async           : YBuzzer_get_playSeqSize_async,
        get_playSeqMaxSize          : YBuzzer_get_playSeqMaxSize,
        playSeqMaxSize              : YBuzzer_get_playSeqMaxSize,
        get_playSeqMaxSize_async    : YBuzzer_get_playSeqMaxSize_async,
        playSeqMaxSize_async        : YBuzzer_get_playSeqMaxSize_async,
        get_playSeqSignature        : YBuzzer_get_playSeqSignature,
        playSeqSignature            : YBuzzer_get_playSeqSignature,
        get_playSeqSignature_async  : YBuzzer_get_playSeqSignature_async,
        playSeqSignature_async      : YBuzzer_get_playSeqSignature_async,
        get_command                 : YBuzzer_get_command,
        command                     : YBuzzer_get_command,
        get_command_async           : YBuzzer_get_command_async,
        command_async               : YBuzzer_get_command_async,
        set_command                 : YBuzzer_set_command,
        setCommand                  : YBuzzer_set_command,
        sendCommand                 : YBuzzer_sendCommand,
        addFreqMoveToPlaySeq        : YBuzzer_addFreqMoveToPlaySeq,
        addPulseToPlaySeq           : YBuzzer_addPulseToPlaySeq,
        addVolMoveToPlaySeq         : YBuzzer_addVolMoveToPlaySeq,
        addNotesToPlaySeq           : YBuzzer_addNotesToPlaySeq,
        startPlaySeq                : YBuzzer_startPlaySeq,
        stopPlaySeq                 : YBuzzer_stopPlaySeq,
        resetPlaySeq                : YBuzzer_resetPlaySeq,
        oncePlaySeq                 : YBuzzer_oncePlaySeq,
        savePlaySeq                 : YBuzzer_savePlaySeq,
        reloadPlaySeq               : YBuzzer_reloadPlaySeq,
        pulse                       : YBuzzer_pulse,
        freqMove                    : YBuzzer_freqMove,
        volumeMove                  : YBuzzer_volumeMove,
        playNotes                   : YBuzzer_playNotes,
        nextBuzzer                  : YBuzzer_nextBuzzer,
        _parseAttr                  : YBuzzer_parseAttr
    });
    //--- (end of YBuzzer initialization)
})();

//--- (YBuzzer functions)

/**
 * Retrieves a buzzer for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the buzzer is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YBuzzer.isOnline() to test if the buzzer is
 * indeed online at a given time. In case of ambiguity when looking for
 * a buzzer by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the buzzer, for instance
 *         YBUZZER2.buzzer.
 *
 * @return a YBuzzer object allowing you to drive the buzzer.
 */
function yFindBuzzer(func)
{
    return YBuzzer.FindBuzzer(func);
}

/**
 * Starts the enumeration of buzzers currently accessible.
 * Use the method YBuzzer.nextBuzzer() to iterate on
 * next buzzers.
 *
 * @return a pointer to a YBuzzer object, corresponding to
 *         the first buzzer currently online, or a null pointer
 *         if there are none.
 */
function yFirstBuzzer()
{
    return YBuzzer.FirstBuzzer();
}

//--- (end of YBuzzer functions)
