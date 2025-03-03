/*********************************************************************
 *
 * $Id: yocto_messagebox.js 62273 2024-08-23 07:20:59Z seb $
 *
 * Implements the high-level API for MessageBox functions
 *
 * - - - - - - - - - License information: - - - - - - - - -
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

//--- (generated code: YSms return codes)
//--- (end of generated code: YSms return codes)
//--- (generated code: YSms definitions)
//--- (end of generated code: YSms definitions)

//--- (generated code: YSms class start)
/**
 * YSms Class: SMS message sent or received, returned by messageBox.get_messages or messageBox.newMessage
 *
 * YSms objects are used to describe an SMS message, received or to be sent.
 * These objects are used in particular in conjunction with the YMessageBox class.
 */
//--- (end of generated code: YSms class start)

var YSms; // definition below
(function()
{
    function _YSms(obj_mbox)
    {
        //--- (generated code: YSms constructor)
        this._mbox                           = null;                       // YMessageBox
        this._slot                           = 0;                          // int
        this._deliv                          = 0;                          // bool
        this._smsc                           = "";                         // str
        this._mref                           = 0;                          // int
        this._orig                           = "";                         // str
        this._dest                           = "";                         // str
        this._pid                            = 0;                          // int
        this._alphab                         = 0;                          // int
        this._mclass                         = 0;                          // int
        this._stamp                          = "";                         // str
        this._udh                            = "";                         // bin
        this._udata                          = "";                         // bin
        this._npdu                           = 0;                          // int
        this._pdu                            = "";                         // bin
        this._parts                          = [];                         // YSmsArr
        this._aggSig                         = "";                         // str
        this._aggIdx                         = 0;                          // int
        this._aggCnt                         = 0;                          // int
        //--- (end of generated code: YSms constructor)
        this._mbox = obj_mbox;
    }

    //--- (generated code: YSms implementation)

    function YSms_get_slot()
    {
        return this._slot;
    }

    function YSms_get_smsc()
    {
        return this._smsc;
    }

    function YSms_get_msgRef()
    {
        return this._mref;
    }

    function YSms_get_sender()
    {
        return this._orig;
    }

    function YSms_get_recipient()
    {
        return this._dest;
    }

    function YSms_get_protocolId()
    {
        return this._pid;
    }

    function YSms_isReceived()
    {
        return this._deliv;
    }

    function YSms_get_alphabet()
    {
        return this._alphab;
    }

    function YSms_get_msgClass()
    {
        if ((this._mclass & 16) == 0) {
            return -1;
        }
        return (this._mclass & 3);
    }

    function YSms_get_dcs()
    {
        return (this._mclass | ((this._alphab << 2)));
    }

    function YSms_get_timestamp()
    {
        return this._stamp;
    }

    function YSms_get_userDataHeader()
    {
        return this._udh;
    }

    function YSms_get_userData()
    {
        return this._udata;
    }

    /**
     * Returns the content of the message.
     *
     * @return  a string with the content of the message.
     */
    function YSms_get_textData()
    {
        var isolatin;               // bin;
        var isosize;                // int;
        var i;                      // int;
        if (this._alphab == 0) {
            // using GSM standard 7-bit alphabet
            return this._mbox.gsm2str(this._udata);
        }
        if (this._alphab == 2) {
            // using UCS-2 alphabet
            isosize = (((this._udata).length) >> 1);
            isolatin = new Uint8Array(isosize);
            i = 0;
            while (i < isosize) {
                isolatin[i] = (this._udata).charCodeAt(2*i+1);
                i = i + 1;
            }
            return isolatin;
        }
        // default: convert 8 bit to string as-is
        return this._udata;
    }

    function YSms_get_unicodeData()
    {
        var res = [];               // intArr;
        var unisize;                // int;
        var unival;                 // int;
        var i;                      // int;
        if (this._alphab == 0) {
            // using GSM standard 7-bit alphabet
            return this._mbox.gsm2unicode(this._udata);
        }
        if (this._alphab == 2) {
            // using UCS-2 alphabet
            unisize = (((this._udata).length) >> 1);
            res.length = 0;
            i = 0;
            while (i < unisize) {
                unival = 256*(this._udata).charCodeAt(2*i)+(this._udata).charCodeAt(2*i+1);
                res.push(unival);
                i = i + 1;
            }
        } else {
            // return straight 8-bit values
            unisize = (this._udata).length;
            res.length = 0;
            i = 0;
            while (i < unisize) {
                res.push((this._udata).charCodeAt(i)+0);
                i = i + 1;
            }
        }
        return res;
    }

    function YSms_get_partCount()
    {
        if (this._npdu == 0) {
            this.generatePdu();
        }
        return this._npdu;
    }

    function YSms_get_pdu()
    {
        if (this._npdu == 0) {
            this.generatePdu();
        }
        return this._pdu;
    }

    function YSms_get_parts()
    {
        if (this._npdu == 0) {
            this.generatePdu();
        }
        return this._parts;
    }

    function YSms_get_concatSignature()
    {
        if (this._npdu == 0) {
            this.generatePdu();
        }
        return this._aggSig;
    }

    function YSms_get_concatIndex()
    {
        if (this._npdu == 0) {
            this.generatePdu();
        }
        return this._aggIdx;
    }

    function YSms_get_concatCount()
    {
        if (this._npdu == 0) {
            this.generatePdu();
        }
        return this._aggCnt;
    }

    function YSms_set_slot(val)
    {
        this._slot = val;
        return YAPI_SUCCESS;
    }

    function YSms_set_received(val)
    {
        this._deliv = val;
        return YAPI_SUCCESS;
    }

    function YSms_set_smsc(val)
    {
        this._smsc = val;
        this._npdu = 0;
        return YAPI_SUCCESS;
    }

    function YSms_set_msgRef(val)
    {
        this._mref = val;
        this._npdu = 0;
        return YAPI_SUCCESS;
    }

    function YSms_set_sender(val)
    {
        this._orig = val;
        this._npdu = 0;
        return YAPI_SUCCESS;
    }

    function YSms_set_recipient(val)
    {
        this._dest = val;
        this._npdu = 0;
        return YAPI_SUCCESS;
    }

    function YSms_set_protocolId(val)
    {
        this._pid = val;
        this._npdu = 0;
        return YAPI_SUCCESS;
    }

    function YSms_set_alphabet(val)
    {
        this._alphab = val;
        this._npdu = 0;
        return YAPI_SUCCESS;
    }

    function YSms_set_msgClass(val)
    {
        if (val == -1) {
            this._mclass = 0;
        } else {
            this._mclass = 16+val;
        }
        this._npdu = 0;
        return YAPI_SUCCESS;
    }

    function YSms_set_dcs(val)
    {
        this._alphab = (((val >> 2)) & 3);
        this._mclass = (val & (16+3));
        this._npdu = 0;
        return YAPI_SUCCESS;
    }

    function YSms_set_timestamp(val)
    {
        this._stamp = val;
        this._npdu = 0;
        return YAPI_SUCCESS;
    }

    function YSms_set_userDataHeader(val)
    {
        this._udh = val;
        this._npdu = 0;
        this.parseUserDataHeader();
        return YAPI_SUCCESS;
    }

    function YSms_set_userData(val)
    {
        this._udata = val;
        this._npdu = 0;
        return YAPI_SUCCESS;
    }

    function YSms_convertToUnicode()
    {
        var ucs2 = [];              // intArr;
        var udatalen;               // int;
        var i;                      // int;
        var uni;                    // int;
        if (this._alphab == 2) {
            return YAPI_SUCCESS;
        }
        if (this._alphab == 0) {
            ucs2 = this._mbox.gsm2unicode(this._udata);
        } else {
            udatalen = (this._udata).length;
            ucs2.length = 0;
            i = 0;
            while (i < udatalen) {
                uni = (this._udata).charCodeAt(i);
                ucs2.push(uni);
                i = i + 1;
            }
        }
        this._alphab = 2;
        this._udata = new Uint8Array(0);
        this.addUnicodeData(ucs2);
        return YAPI_SUCCESS;
    }

    /**
     * Add a regular text to the SMS. This function support messages
     * of more than 160 characters. ISO-latin accented characters
     * are supported. For messages with special unicode characters such as asian
     * characters and emoticons, use the  addUnicodeData method.
     *
     * @param val : the text to be sent in the message
     *
     * @return YAPI.SUCCESS when the call succeeds.
     */
    function YSms_addText(val)
    {
        var udata;                  // bin;
        var udatalen;               // int;
        var newdata;                // bin;
        var newdatalen;             // int;
        var i;                      // int;
        if ((val).length == 0) {
            return YAPI_SUCCESS;
        }
        if (this._alphab == 0) {
            // Try to append using GSM 7-bit alphabet
            newdata = this._mbox.str2gsm(val);
            newdatalen = (newdata).length;
            if (newdatalen == 0) {
                // 7-bit not possible, switch to unicode
                this.convertToUnicode();
                newdata = val;
                newdatalen = (newdata).length;
            }
        } else {
            newdata = val;
            newdatalen = (newdata).length;
        }
        udatalen = (this._udata).length;
        if (this._alphab == 2) {
            // Append in unicode directly
            udata = new Uint8Array(udatalen + 2*newdatalen);
            i = 0;
            while (i < udatalen) {
                udata[i] = (this._udata).charCodeAt(i);
                i = i + 1;
            }
            i = 0;
            while (i < newdatalen) {
                udata[udatalen+1] = (newdata).charCodeAt(i);
                udatalen = udatalen + 2;
                i = i + 1;
            }
        } else {
            // Append binary buffers
            udata = new Uint8Array(udatalen+newdatalen);
            i = 0;
            while (i < udatalen) {
                udata[i] = (this._udata).charCodeAt(i);
                i = i + 1;
            }
            i = 0;
            while (i < newdatalen) {
                udata[udatalen] = (newdata).charCodeAt(i);
                udatalen = udatalen + 1;
                i = i + 1;
            }
        }
        return this.set_userData(udata);
    }

    /**
     * Add a unicode text to the SMS. This function support messages
     * of more than 160 characters, using SMS concatenation.
     *
     * @param val : an array of special unicode characters
     *
     * @return YAPI.SUCCESS when the call succeeds.
     */
    function YSms_addUnicodeData(val)
    {
        var arrlen;                 // int;
        var newdatalen;             // int;
        var i;                      // int;
        var uni;                    // int;
        var udata;                  // bin;
        var udatalen;               // int;
        var surrogate;              // int;
        if (this._alphab != 2) {
            this.convertToUnicode();
        }
        // compute number of 16-bit code units
        arrlen = val.length;
        newdatalen = arrlen;
        i = 0;
        while (i < arrlen) {
            uni = val[i];
            if (uni > 65535) {
                newdatalen = newdatalen + 1;
            }
            i = i + 1;
        }
        // now build utf-16 buffer
        udatalen = (this._udata).length;
        udata = new Uint8Array(udatalen+2*newdatalen);
        i = 0;
        while (i < udatalen) {
            udata[i] = (this._udata).charCodeAt(i);
            i = i + 1;
        }
        i = 0;
        while (i < arrlen) {
            uni = val[i];
            if (uni >= 65536) {
                surrogate = uni - 65536;
                uni = (((surrogate >> 10) & 1023)) + 55296;
                udata[udatalen] = (uni >> 8);
                udata[udatalen+1] = (uni & 255);
                udatalen = udatalen + 2;
                uni = ((surrogate & 1023)) + 56320;
            }
            udata[udatalen] = (uni >> 8);
            udata[udatalen+1] = (uni & 255);
            udatalen = udatalen + 2;
            i = i + 1;
        }
        return this.set_userData(udata);
    }

    function YSms_set_pdu(pdu)
    {
        this._pdu = pdu;
        this._npdu = 1;
        return this.parsePdu(pdu);
    }

    function YSms_set_parts(parts)
    {
        var sorted = [];            // YSmsArr;
        var partno;                 // int;
        var initpartno;             // int;
        var i;                      // int;
        var retcode;                // int;
        var totsize;                // int;
        var subsms;                 // YSms;
        var subdata;                // bin;
        var res;                    // bin;
        this._npdu = parts.length;
        if (this._npdu == 0) {
            return YAPI_INVALID_ARGUMENT;
        }
        sorted.length = 0;
        partno = 0;
        while (partno < this._npdu) {
            initpartno = partno;
            i = 0;
            while (i < this._npdu) {
                subsms = parts[i];
                if (subsms.get_concatIndex() == partno) {
                    sorted.push(subsms);
                    partno = partno + 1;
                }
                i = i + 1;
            }
            if (initpartno == partno) {
                partno = partno + 1;
            }
        }
        this._parts = sorted;
        // inherit header fields from first part
        subsms = this._parts[0];
        retcode = this.parsePdu(subsms.get_pdu());
        if (retcode != YAPI_SUCCESS) {
            return retcode;
        }
        this._npdu = sorted.length;
        // concatenate user data from all parts
        totsize = 0;
        partno = 0;
        while (partno < this._parts.length) {
            subsms = this._parts[partno];
            subdata = subsms.get_userData();
            totsize = totsize + (subdata).length;
            partno = partno + 1;
        }
        res = new Uint8Array(totsize);
        totsize = 0;
        partno = 0;
        while (partno < this._parts.length) {
            subsms = this._parts[partno];
            subdata = subsms.get_userData();
            i = 0;
            while (i < (subdata).length) {
                res[totsize] = (subdata).charCodeAt(i);
                totsize = totsize + 1;
                i = i + 1;
            }
            partno = partno + 1;
        }
        this._udata = res;
        return YAPI_SUCCESS;
    }

    function YSms_encodeAddress(addr)
    {
        var bytes;                  // bin;
        var srclen;                 // int;
        var numlen;                 // int;
        var i;                      // int;
        var val;                    // int;
        var digit;                  // int;
        var res;                    // bin;
        bytes = addr;
        srclen = (bytes).length;
        numlen = 0;
        i = 0;
        while (i < srclen) {
            val = (bytes).charCodeAt(i);
            if ((val >= 48) && (val < 58)) {
                numlen = numlen + 1;
            }
            i = i + 1;
        }
        if (numlen == 0) {
            res = new Uint8Array(1);
            res[0] = 0;
            return res;
        }
        res = new Uint8Array(2+((numlen+1) >> 1));
        res[0] = numlen;
        if ((bytes).charCodeAt(0) == 43) {
            res[1] = 145;
        } else {
            res[1] = 129;
        }
        numlen = 4;
        digit = 0;
        i = 0;
        while (i < srclen) {
            val = (bytes).charCodeAt(i);
            if ((val >= 48) && (val < 58)) {
                if ((numlen & 1) == 0) {
                    digit = val - 48;
                } else {
                    res[(numlen >> 1)] = digit + 16*(val-48);
                }
                numlen = numlen + 1;
            }
            i = i + 1;
        }
        // pad with F if needed
        if ((numlen & 1) != 0) {
            res[(numlen >> 1)] = digit + 240;
        }
        return res;
    }

    function YSms_decodeAddress(addr,ofs,siz)
    {
        var addrType;               // int;
        var gsm7;                   // bin;
        var res;                    // str;
        var i;                      // int;
        var rpos;                   // int;
        var carry;                  // int;
        var nbits;                  // int;
        var byt;                    // int;
        if (siz == 0) {
            return "";
        }
        res = "";
        addrType = ((addr).charCodeAt(ofs) & 112);
        if (addrType == 80) {
            // alphanumeric number
            siz = parseInt((4*siz) / (7));
            gsm7 = new Uint8Array(siz);
            rpos = 1;
            carry = 0;
            nbits = 0;
            i = 0;
            while (i < siz) {
                if (nbits == 7) {
                    gsm7[i] = carry;
                    carry = 0;
                    nbits = 0;
                } else {
                    byt = (addr).charCodeAt(ofs+rpos);
                    rpos = rpos + 1;
                    gsm7[i] = (carry | (((byt << nbits)) & 127));
                    carry = (byt >> (7 - nbits));
                    nbits = nbits + 1;
                }
                i = i + 1;
            }
            return this._mbox.gsm2str(gsm7);
        } else {
            // standard phone number
            if (addrType == 16) {
                res = "+";
            }
            siz = ((siz+1) >> 1);
            i = 0;
            while (i < siz) {
                byt = (addr).charCodeAt(ofs+i+1);
                res = ""+res+""+((byt & 15)).toString(16).toLowerCase()+""+((byt >> 4)).toString(16).toLowerCase();
                i = i + 1;
            }
            // remove padding digit if needed
            if (((addr).charCodeAt(ofs+siz) >> 4) == 15) {
                res = res.substr(0, (res).length-1);
            }
            return res;
        }
    }

    function YSms_encodeTimeStamp(exp)
    {
        var explen;                 // int;
        var i;                      // int;
        var res;                    // bin;
        var n;                      // int;
        var expasc;                 // bin;
        var v1;                     // int;
        var v2;                     // int;
        explen = (exp).length;
        if (explen == 0) {
            res = new Uint8Array(0);
            return res;
        }
        if (exp.substr(0, 1) == "+") {
            n = YAPI._atoi(exp.substr(1, explen-1));
            res = new Uint8Array(1);
            if (n > 30*86400) {
                n = 192+parseInt(((n+6*86400)) / ((7*86400)));
            } else {
                if (n > 86400) {
                    n = 166+parseInt(((n+86399)) / (86400));
                } else {
                    if (n > 43200) {
                        n = 143+parseInt(((n-43200+1799)) / (1800));
                    } else {
                        n = -1+parseInt(((n+299)) / (300));
                    }
                }
            }
            if (n < 0) {
                n = 0;
            }
            res[0] = n;
            return res;
        }
        if (exp.substr(4, 1) == "-" || exp.substr(4, 1) == "/") {
            // ignore century
            exp = exp.substr(2, explen-2);
            explen = (exp).length;
        }
        expasc = exp;
        res = new Uint8Array(7);
        n = 0;
        i = 0;
        while ((i+1 < explen) && (n < 7)) {
            v1 = (expasc).charCodeAt(i);
            if ((v1 >= 48) && (v1 < 58)) {
                v2 = (expasc).charCodeAt(i+1);
                if ((v2 >= 48) && (v2 < 58)) {
                    v1 = v1 - 48;
                    v2 = v2 - 48;
                    res[n] = ((v2 << 4)) + v1;
                    n = n + 1;
                    i = i + 1;
                }
            }
            i = i + 1;
        }
        while (n < 7) {
            res[n] = 0;
            n = n + 1;
        }
        if (i+2 < explen) {
            // convert for timezone in cleartext ISO format +/-nn:nn
            v1 = (expasc).charCodeAt(i-3);
            v2 = (expasc).charCodeAt(i);
            if (((v1 == 43) || (v1 == 45)) && (v2 == 58)) {
                v1 = (expasc).charCodeAt(i+1);
                v2 = (expasc).charCodeAt(i+2);
                if ((v1 >= 48) && (v1 < 58) && (v1 >= 48) && (v1 < 58)) {
                    v1 = parseInt(((10*(v1 - 48)+(v2 - 48))) / (15));
                    n = n - 1;
                    v2 = 4 * (res).charCodeAt(n) + v1;
                    if ((expasc).charCodeAt(i-3) == 45) {
                        v2 = v2 + 128;
                    }
                    res[n] = v2;
                }
            }
        }
        return res;
    }

    function YSms_decodeTimeStamp(exp,ofs,siz)
    {
        var n;                      // int;
        var res;                    // str;
        var i;                      // int;
        var byt;                    // int;
        var sign;                   // str;
        var hh;                     // str;
        var ss;                     // str;
        if (siz < 1) {
            return "";
        }
        if (siz == 1) {
            n = (exp).charCodeAt(ofs);
            if (n < 144) {
                n = n * 300;
            } else {
                if (n < 168) {
                    n = (n-143) * 1800;
                } else {
                    if (n < 197) {
                        n = (n-166) * 86400;
                    } else {
                        n = (n-192) * 7 * 86400;
                    }
                }
            }
            return "+"+String(Math.round(n));
        }
        res = "20";
        i = 0;
        while ((i < siz) && (i < 6)) {
            byt = (exp).charCodeAt(ofs+i);
            res = ""+res+""+((byt & 15)).toString(16).toLowerCase()+""+((byt >> 4)).toString(16).toLowerCase();
            if (i < 3) {
                if (i < 2) {
                    res = ""+res+"-";
                } else {
                    res = ""+res+" ";
                }
            } else {
                if (i < 5) {
                    res = ""+res+":";
                }
            }
            i = i + 1;
        }
        if (siz == 7) {
            byt = (exp).charCodeAt(ofs+i);
            sign = "+";
            if ((byt & 8) != 0) {
                byt = byt - 8;
                sign = "-";
            }
            byt = (10*((byt & 15))) + ((byt >> 4));
            hh = ""+String(Math.round((byt >> 2)));
            ss = ""+String(Math.round(15*((byt & 3))));
            if ((hh).length<2) {
                hh = "0"+hh;
            }
            if ((ss).length<2) {
                ss = "0"+ss;
            }
            res = ""+res+""+sign+""+hh+":"+ss;
        }
        return res;
    }

    function YSms_udataSize()
    {
        var res;                    // int;
        var udhsize;                // int;
        udhsize = (this._udh).length;
        res = (this._udata).length;
        if (this._alphab == 0) {
            if (udhsize > 0) {
                res = res + parseInt(((8 + 8*udhsize + 6)) / (7));
            }
            res = parseInt(((res * 7 + 7)) / (8));
        } else {
            if (udhsize > 0) {
                res = res + 1 + udhsize;
            }
        }
        return res;
    }

    function YSms_encodeUserData()
    {
        var udsize;                 // int;
        var udlen;                  // int;
        var udhsize;                // int;
        var udhlen;                 // int;
        var res;                    // bin;
        var i;                      // int;
        var wpos;                   // int;
        var carry;                  // int;
        var nbits;                  // int;
        var thi_b;                  // int;
        // nbits = number of bits in carry
        udsize = this.udataSize();
        udhsize = (this._udh).length;
        udlen = (this._udata).length;
        res = new Uint8Array(1+udsize);
        udhlen = 0;
        nbits = 0;
        carry = 0;
        // 1. Encode UDL
        if (this._alphab == 0) {
            // 7-bit encoding
            if (udhsize > 0) {
                udhlen = parseInt(((8 + 8*udhsize + 6)) / (7));
                nbits = 7*udhlen - 8 - 8*udhsize;
            }
            res[0] = udhlen+udlen;
        } else {
            // 8-bit encoding
            res[0] = udsize;
        }
        // 2. Encode UDHL and UDL
        wpos = 1;
        if (udhsize > 0) {
            res[wpos] = udhsize;
            wpos = wpos + 1;
            i = 0;
            while (i < udhsize) {
                res[wpos] = (this._udh).charCodeAt(i);
                wpos = wpos + 1;
                i = i + 1;
            }
        }
        // 3. Encode UD
        if (this._alphab == 0) {
            // 7-bit encoding
            i = 0;
            while (i < udlen) {
                if (nbits == 0) {
                    carry = (this._udata).charCodeAt(i);
                    nbits = 7;
                } else {
                    thi_b = (this._udata).charCodeAt(i);
                    res[wpos] = (carry | (((thi_b << nbits)) & 255));
                    wpos = wpos + 1;
                    nbits = nbits - 1;
                    carry = (thi_b >> (7 - nbits));
                }
                i = i + 1;
            }
            if (nbits > 0) {
                res[wpos] = carry;
            }
        } else {
            // 8-bit encoding
            i = 0;
            while (i < udlen) {
                res[wpos] = (this._udata).charCodeAt(i);
                wpos = wpos + 1;
                i = i + 1;
            }
        }
        return res;
    }

    function YSms_generateParts()
    {
        var udhsize;                // int;
        var udlen;                  // int;
        var mss;                    // int;
        var partno;                 // int;
        var partlen;                // int;
        var newud;                  // bin;
        var newudh;                 // bin;
        var newpdu;                 // YSms;
        var i;                      // int;
        var wpos;                   // int;
        udhsize = (this._udh).length;
        udlen = (this._udata).length;
        mss = 140 - 1 - 5 - udhsize;
        if (this._alphab == 0) {
            mss = parseInt(((mss * 8 - 6)) / (7));
        }
        this._npdu = parseInt(((udlen+mss-1)) / (mss));
        this._parts.length = 0;
        partno = 0;
        wpos = 0;
        while (wpos < udlen) {
            partno = partno + 1;
            newudh = new Uint8Array(5+udhsize);
            newudh[0] = 0;           // IEI: concatenated message
            newudh[1] = 3;           // IEDL: 3 bytes
            newudh[2] = this._mref;
            newudh[3] = this._npdu;
            newudh[4] = partno;
            i = 0;
            while (i < udhsize) {
                newudh[5+i] = (this._udh).charCodeAt(i);
                i = i + 1;
            }
            if (wpos+mss < udlen) {
                partlen = mss;
            } else {
                partlen = udlen-wpos;
            }
            newud = new Uint8Array(partlen);
            i = 0;
            while (i < partlen) {
                newud[i] = (this._udata).charCodeAt(wpos);
                wpos = wpos + 1;
                i = i + 1;
            }
            newpdu = new YSms(this._mbox);
            newpdu.set_received(this.isReceived());
            newpdu.set_smsc(this.get_smsc());
            newpdu.set_msgRef(this.get_msgRef());
            newpdu.set_sender(this.get_sender());
            newpdu.set_recipient(this.get_recipient());
            newpdu.set_protocolId(this.get_protocolId());
            newpdu.set_dcs(this.get_dcs());
            newpdu.set_timestamp(this.get_timestamp());
            newpdu.set_userDataHeader(newudh);
            newpdu.set_userData(newud);
            this._parts.push(newpdu);
        }
        return YAPI_SUCCESS;
    }

    function YSms_generatePdu()
    {
        var sca;                    // bin;
        var hdr;                    // bin;
        var addr;                   // bin;
        var stamp;                  // bin;
        var udata;                  // bin;
        var pdutyp;                 // int;
        var pdulen;                 // int;
        var i;                      // int;
        // Determine if the message can fit within a single PDU
        this._parts.length = 0;
        if (this.udataSize() > 140) {
            // multiple PDU are needed
            this._pdu = new Uint8Array(0);
            return this.generateParts();
        }
        sca = this.encodeAddress(this._smsc);
        if ((sca).length > 0) {
            sca[0] = (sca).length-1;
        }
        stamp = this.encodeTimeStamp(this._stamp);
        udata = this.encodeUserData();
        if (this._deliv) {
            addr = this.encodeAddress(this._orig);
            hdr = new Uint8Array(1);
            pdutyp = 0;
        } else {
            addr = this.encodeAddress(this._dest);
            this._mref = this._mbox.nextMsgRef();
            hdr = new Uint8Array(2);
            hdr[1] = this._mref;
            pdutyp = 1;
            if ((stamp).length > 0) {
                pdutyp = pdutyp + 16;
            }
            if ((stamp).length == 7) {
                pdutyp = pdutyp + 8;
            }
        }
        if ((this._udh).length > 0) {
            pdutyp = pdutyp + 64;
        }
        hdr[0] = pdutyp;
        pdulen = (sca).length+(hdr).length+(addr).length+2+(stamp).length+(udata).length;
        this._pdu = new Uint8Array(pdulen);
        pdulen = 0;
        i = 0;
        while (i < (sca).length) {
            this._pdu[pdulen] = (sca).charCodeAt(i);
            pdulen = pdulen + 1;
            i = i + 1;
        }
        i = 0;
        while (i < (hdr).length) {
            this._pdu[pdulen] = (hdr).charCodeAt(i);
            pdulen = pdulen + 1;
            i = i + 1;
        }
        i = 0;
        while (i < (addr).length) {
            this._pdu[pdulen] = (addr).charCodeAt(i);
            pdulen = pdulen + 1;
            i = i + 1;
        }
        this._pdu[pdulen] = this._pid;
        pdulen = pdulen + 1;
        this._pdu[pdulen] = this.get_dcs();
        pdulen = pdulen + 1;
        i = 0;
        while (i < (stamp).length) {
            this._pdu[pdulen] = (stamp).charCodeAt(i);
            pdulen = pdulen + 1;
            i = i + 1;
        }
        i = 0;
        while (i < (udata).length) {
            this._pdu[pdulen] = (udata).charCodeAt(i);
            pdulen = pdulen + 1;
            i = i + 1;
        }
        this._npdu = 1;
        return YAPI_SUCCESS;
    }

    function YSms_parseUserDataHeader()
    {
        var udhlen;                 // int;
        var i;                      // int;
        var iei;                    // int;
        var ielen;                  // int;
        var sig;                    // str;
        this._aggSig = "";
        this._aggIdx = 0;
        this._aggCnt = 0;
        udhlen = (this._udh).length;
        i = 0;
        while (i+1 < udhlen) {
            iei = (this._udh).charCodeAt(i);
            ielen = (this._udh).charCodeAt(i+1);
            i = i + 2;
            if (i + ielen <= udhlen) {
                if ((iei == 0) && (ielen == 3)) {
                    // concatenated SMS, 8-bit ref
                    sig = ""+this._orig+"-"+this._dest+"-"+('00'+(this._mref).toString(16)).slice(-2).toLowerCase()+"-"+('00'+((this._udh).charCodeAt(i)).toString(16)).slice(-2).toLowerCase();
                    this._aggSig = sig;
                    this._aggCnt = (this._udh).charCodeAt(i+1);
                    this._aggIdx = (this._udh).charCodeAt(i+2);
                }
                if ((iei == 8) && (ielen == 4)) {
                    // concatenated SMS, 16-bit ref
                    sig = ""+this._orig+"-"+this._dest+"-"+('00'+(this._mref).toString(16)).slice(-2).toLowerCase()+"-"+('00'+((this._udh).charCodeAt(i)).toString(16)).slice(-2).toLowerCase()+""+('00'+((this._udh).charCodeAt(i+1)).toString(16)).slice(-2).toLowerCase();
                    this._aggSig = sig;
                    this._aggCnt = (this._udh).charCodeAt(i+2);
                    this._aggIdx = (this._udh).charCodeAt(i+3);
                }
            }
            i = i + ielen;
        }
        return YAPI_SUCCESS;
    }

    function YSms_parsePdu(pdu)
    {
        var rpos;                   // int;
        var addrlen;                // int;
        var pdutyp;                 // int;
        var tslen;                  // int;
        var dcs;                    // int;
        var udlen;                  // int;
        var udhsize;                // int;
        var udhlen;                 // int;
        var i;                      // int;
        var carry;                  // int;
        var nbits;                  // int;
        var thi_b;                  // int;
        this._pdu = pdu;
        this._npdu = 1;
        // parse meta-data
        this._smsc = this.decodeAddress(pdu, 1, 2*((pdu).charCodeAt(0)-1));
        rpos = 1+(pdu).charCodeAt(0);
        pdutyp = (pdu).charCodeAt(rpos);
        rpos = rpos + 1;
        this._deliv = ((pdutyp & 3) == 0);
        if (this._deliv) {
            addrlen = (pdu).charCodeAt(rpos);
            rpos = rpos + 1;
            this._orig = this.decodeAddress(pdu, rpos, addrlen);
            this._dest = "";
            tslen = 7;
        } else {
            this._mref = (pdu).charCodeAt(rpos);
            rpos = rpos + 1;
            addrlen = (pdu).charCodeAt(rpos);
            rpos = rpos + 1;
            this._dest = this.decodeAddress(pdu, rpos, addrlen);
            this._orig = "";
            if (((pdutyp & 16)) != 0) {
                if (((pdutyp & 8)) != 0) {
                    tslen = 7;
                } else {
                    tslen= 1;
                }
            } else {
                tslen = 0;
            }
        }
        rpos = rpos + (((addrlen+3) >> 1));
        this._pid = (pdu).charCodeAt(rpos);
        rpos = rpos + 1;
        dcs = (pdu).charCodeAt(rpos);
        rpos = rpos + 1;
        this._alphab = (((dcs >> 2)) & 3);
        this._mclass = (dcs & (16+3));
        this._stamp = this.decodeTimeStamp(pdu, rpos, tslen);
        rpos = rpos + tslen;
        // parse user data (including udh)
        nbits = 0;
        carry = 0;
        udlen = (pdu).charCodeAt(rpos);
        rpos = rpos + 1;
        if ((pdutyp & 64) != 0) {
            udhsize = (pdu).charCodeAt(rpos);
            rpos = rpos + 1;
            this._udh = new Uint8Array(udhsize);
            i = 0;
            while (i < udhsize) {
                this._udh[i] = (pdu).charCodeAt(rpos);
                rpos = rpos + 1;
                i = i + 1;
            }
            if (this._alphab == 0) {
                // 7-bit encoding
                udhlen = parseInt(((8 + 8*udhsize + 6)) / (7));
                nbits = 7*udhlen - 8 - 8*udhsize;
                if (nbits > 0) {
                    thi_b = (pdu).charCodeAt(rpos);
                    rpos = rpos + 1;
                    carry = (thi_b >> nbits);
                    nbits = 8 - nbits;
                }
            } else {
                // byte encoding
                udhlen = 1+udhsize;
            }
            udlen = udlen - udhlen;
        } else {
            udhsize = 0;
            this._udh = new Uint8Array(0);
        }
        this._udata = new Uint8Array(udlen);
        if (this._alphab == 0) {
            // 7-bit encoding
            i = 0;
            while (i < udlen) {
                if (nbits == 7) {
                    this._udata[i] = carry;
                    carry = 0;
                    nbits = 0;
                } else {
                    thi_b = (pdu).charCodeAt(rpos);
                    rpos = rpos + 1;
                    this._udata[i] = (carry | (((thi_b << nbits)) & 127));
                    carry = (thi_b >> (7 - nbits));
                    nbits = nbits + 1;
                }
                i = i + 1;
            }
        } else {
            // 8-bit encoding
            i = 0;
            while (i < udlen) {
                this._udata[i] = (pdu).charCodeAt(rpos);
                rpos = rpos + 1;
                i = i + 1;
            }
        }
        this.parseUserDataHeader();
        return YAPI_SUCCESS;
    }

    /**
     * Sends the SMS to the recipient. Messages of more than 160 characters are supported
     * using SMS concatenation.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSms_send()
    {
        var i;                      // int;
        var retcode;                // int;
        var pdu;                    // YSms;

        if (this._npdu == 0) {
            this.generatePdu();
        }
        if (this._npdu == 1) {
            return this._mbox._upload("sendSMS", this._pdu);
        }
        retcode = YAPI_SUCCESS;
        i = 0;
        while ((i < this._npdu) && (retcode == YAPI_SUCCESS)) {
            pdu = this._parts[i];
            retcode= pdu.send();
            i = i + 1;
        }
        return retcode;
    }

    function YSms_deleteFromSIM()
    {
        var i;                      // int;
        var retcode;                // int;
        var pdu;                    // YSms;

        if (this._npdu < 2) {
            return this._mbox.clearSIMSlot(this._slot);
        }
        retcode = YAPI_SUCCESS;
        i = 0;
        while ((i < this._npdu) && (retcode == YAPI_SUCCESS)) {
            pdu = this._parts[i];
            retcode= pdu.deleteFromSIM();
            i = i + 1;
        }
        return retcode;
    }

    //--- (end of generated code: YSms implementation)

    //--- (generated code: YSms initialization)
    YSms = _YSms;
    // Methods
    YSms.prototype.get_slot                    = YSms_get_slot;
    YSms.prototype.slot                        = YSms_get_slot;
    YSms.prototype.get_smsc                    = YSms_get_smsc;
    YSms.prototype.smsc                        = YSms_get_smsc;
    YSms.prototype.get_msgRef                  = YSms_get_msgRef;
    YSms.prototype.msgRef                      = YSms_get_msgRef;
    YSms.prototype.get_sender                  = YSms_get_sender;
    YSms.prototype.sender                      = YSms_get_sender;
    YSms.prototype.get_recipient               = YSms_get_recipient;
    YSms.prototype.recipient                   = YSms_get_recipient;
    YSms.prototype.get_protocolId              = YSms_get_protocolId;
    YSms.prototype.protocolId                  = YSms_get_protocolId;
    YSms.prototype.isReceived                  = YSms_isReceived;
    YSms.prototype.get_alphabet                = YSms_get_alphabet;
    YSms.prototype.alphabet                    = YSms_get_alphabet;
    YSms.prototype.get_msgClass                = YSms_get_msgClass;
    YSms.prototype.msgClass                    = YSms_get_msgClass;
    YSms.prototype.get_dcs                     = YSms_get_dcs;
    YSms.prototype.dcs                         = YSms_get_dcs;
    YSms.prototype.get_timestamp               = YSms_get_timestamp;
    YSms.prototype.timestamp                   = YSms_get_timestamp;
    YSms.prototype.get_userDataHeader          = YSms_get_userDataHeader;
    YSms.prototype.userDataHeader              = YSms_get_userDataHeader;
    YSms.prototype.get_userData                = YSms_get_userData;
    YSms.prototype.userData                    = YSms_get_userData;
    YSms.prototype.get_textData                = YSms_get_textData;
    YSms.prototype.textData                    = YSms_get_textData;
    YSms.prototype.get_unicodeData             = YSms_get_unicodeData;
    YSms.prototype.unicodeData                 = YSms_get_unicodeData;
    YSms.prototype.get_partCount               = YSms_get_partCount;
    YSms.prototype.partCount                   = YSms_get_partCount;
    YSms.prototype.get_pdu                     = YSms_get_pdu;
    YSms.prototype.pdu                         = YSms_get_pdu;
    YSms.prototype.get_parts                   = YSms_get_parts;
    YSms.prototype.parts                       = YSms_get_parts;
    YSms.prototype.get_concatSignature         = YSms_get_concatSignature;
    YSms.prototype.concatSignature             = YSms_get_concatSignature;
    YSms.prototype.get_concatIndex             = YSms_get_concatIndex;
    YSms.prototype.concatIndex                 = YSms_get_concatIndex;
    YSms.prototype.get_concatCount             = YSms_get_concatCount;
    YSms.prototype.concatCount                 = YSms_get_concatCount;
    YSms.prototype.set_slot                    = YSms_set_slot;
    YSms.prototype.setSlot                     = YSms_set_slot;
    YSms.prototype.set_received                = YSms_set_received;
    YSms.prototype.setReceived                 = YSms_set_received;
    YSms.prototype.set_smsc                    = YSms_set_smsc;
    YSms.prototype.setSmsc                     = YSms_set_smsc;
    YSms.prototype.set_msgRef                  = YSms_set_msgRef;
    YSms.prototype.setMsgRef                   = YSms_set_msgRef;
    YSms.prototype.set_sender                  = YSms_set_sender;
    YSms.prototype.setSender                   = YSms_set_sender;
    YSms.prototype.set_recipient               = YSms_set_recipient;
    YSms.prototype.setRecipient                = YSms_set_recipient;
    YSms.prototype.set_protocolId              = YSms_set_protocolId;
    YSms.prototype.setProtocolId               = YSms_set_protocolId;
    YSms.prototype.set_alphabet                = YSms_set_alphabet;
    YSms.prototype.setAlphabet                 = YSms_set_alphabet;
    YSms.prototype.set_msgClass                = YSms_set_msgClass;
    YSms.prototype.setMsgClass                 = YSms_set_msgClass;
    YSms.prototype.set_dcs                     = YSms_set_dcs;
    YSms.prototype.setDcs                      = YSms_set_dcs;
    YSms.prototype.set_timestamp               = YSms_set_timestamp;
    YSms.prototype.setTimestamp                = YSms_set_timestamp;
    YSms.prototype.set_userDataHeader          = YSms_set_userDataHeader;
    YSms.prototype.setUserDataHeader           = YSms_set_userDataHeader;
    YSms.prototype.set_userData                = YSms_set_userData;
    YSms.prototype.setUserData                 = YSms_set_userData;
    YSms.prototype.convertToUnicode            = YSms_convertToUnicode;
    YSms.prototype.addText                     = YSms_addText;
    YSms.prototype.addUnicodeData              = YSms_addUnicodeData;
    YSms.prototype.set_pdu                     = YSms_set_pdu;
    YSms.prototype.setPdu                      = YSms_set_pdu;
    YSms.prototype.set_parts                   = YSms_set_parts;
    YSms.prototype.setParts                    = YSms_set_parts;
    YSms.prototype.encodeAddress               = YSms_encodeAddress;
    YSms.prototype.decodeAddress               = YSms_decodeAddress;
    YSms.prototype.encodeTimeStamp             = YSms_encodeTimeStamp;
    YSms.prototype.decodeTimeStamp             = YSms_decodeTimeStamp;
    YSms.prototype.udataSize                   = YSms_udataSize;
    YSms.prototype.encodeUserData              = YSms_encodeUserData;
    YSms.prototype.generateParts               = YSms_generateParts;
    YSms.prototype.generatePdu                 = YSms_generatePdu;
    YSms.prototype.parseUserDataHeader         = YSms_parseUserDataHeader;
    YSms.prototype.parsePdu                    = YSms_parsePdu;
    YSms.prototype.send                        = YSms_send;
    YSms.prototype.deleteFromSIM               = YSms_deleteFromSIM;
    //--- (end of generated code: YSms initialization)
})();

//--- (generated code: YSms functions)
//--- (end of generated code: YSms functions)


//--- (generated code: YMessageBox return codes)
//--- (end of generated code: YMessageBox return codes)
//--- (generated code: YMessageBox definitions)
var Y_SLOTSINUSE_INVALID            = YAPI_INVALID_UINT;
var Y_SLOTSCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_SLOTSBITMAP_INVALID           = YAPI_INVALID_STRING;
var Y_PDUSENT_INVALID               = YAPI_INVALID_UINT;
var Y_PDURECEIVED_INVALID           = YAPI_INVALID_UINT;
var Y_OBEY_INVALID                  = YAPI_INVALID_STRING;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of generated code: YMessageBox definitions)

//--- (generated code: YMessageBox class start)
/**
 * YMessageBox Class: SMS message box interface control interface, available for instance in the
 * YoctoHub-GSM-2G, the YoctoHub-GSM-3G-EU, the YoctoHub-GSM-3G-NA or the YoctoHub-GSM-4G
 *
 * The YMessageBox class provides SMS sending and receiving capability for
 * GSM-enabled Yoctopuce devices.
 */
//--- (end of generated code: YMessageBox class start)

var YMessageBox; // definition below
(function()
{
    function _YMessageBox(str_func)
    {
        //--- (generated code: YMessageBox constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'MessageBox';

        this._slotsInUse                     = Y_SLOTSINUSE_INVALID;       // UInt31
        this._slotsCount                     = Y_SLOTSCOUNT_INVALID;       // UInt31
        this._slotsBitmap                    = Y_SLOTSBITMAP_INVALID;      // BinaryBuffer
        this._pduSent                        = Y_PDUSENT_INVALID;          // UInt31
        this._pduReceived                    = Y_PDURECEIVED_INVALID;      // UInt31
        this._obey                           = Y_OBEY_INVALID;             // Text
        this._command                        = Y_COMMAND_INVALID;          // Text
        this._nextMsgRef                     = 0;                          // int
        this._prevBitmapStr                  = "";                         // str
        this._pdus                           = [];                         // YSmsArr
        this._messages                       = [];                         // YSmsArr
        this._gsm2unicodeReady               = 0;                          // bool
        this._gsm2unicode                    = [];                         // intArr
        this._iso2gsm                        = "";                         // bin
        //--- (end of generated code: YMessageBox constructor)
    }

    //--- (generated code: YMessageBox implementation)

    function YMessageBox_parseAttr(name, val, _super)
    {
        switch(name) {
        case "slotsInUse":
            this._slotsInUse = parseInt(val);
            return 1;
        case "slotsCount":
            this._slotsCount = parseInt(val);
            return 1;
        case "slotsBitmap":
            this._slotsBitmap = val;
            return 1;
        case "pduSent":
            this._pduSent = parseInt(val);
            return 1;
        case "pduReceived":
            this._pduReceived = parseInt(val);
            return 1;
        case "obey":
            this._obey = val;
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the number of message storage slots currently in use.
     *
     * @return an integer corresponding to the number of message storage slots currently in use
     *
     * On failure, throws an exception or returns YMessageBox.SLOTSINUSE_INVALID.
     */
    function YMessageBox_get_slotsInUse()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SLOTSINUSE_INVALID;
            }
        }
        res = this._slotsInUse;
        return res;
    }

    /**
     * Gets the number of message storage slots currently in use.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMessageBox object that invoked the callback
     *         - the result:an integer corresponding to the number of message storage slots currently in use
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMessageBox.SLOTSINUSE_INVALID.
     */
    function YMessageBox_get_slotsInUse_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SLOTSINUSE_INVALID);
            } else {
                callback(context, obj, obj._slotsInUse);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of message storage slots on the SIM card.
     *
     * @return an integer corresponding to the total number of message storage slots on the SIM card
     *
     * On failure, throws an exception or returns YMessageBox.SLOTSCOUNT_INVALID.
     */
    function YMessageBox_get_slotsCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SLOTSCOUNT_INVALID;
            }
        }
        res = this._slotsCount;
        return res;
    }

    /**
     * Gets the total number of message storage slots on the SIM card.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMessageBox object that invoked the callback
     *         - the result:an integer corresponding to the total number of message storage slots on the SIM card
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMessageBox.SLOTSCOUNT_INVALID.
     */
    function YMessageBox_get_slotsCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SLOTSCOUNT_INVALID);
            } else {
                callback(context, obj, obj._slotsCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YMessageBox_get_slotsBitmap()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SLOTSBITMAP_INVALID;
            }
        }
        res = this._slotsBitmap;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMessageBox object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YMessageBox_get_slotsBitmap_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SLOTSBITMAP_INVALID);
            } else {
                callback(context, obj, obj._slotsBitmap);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of SMS units sent so far.
     *
     * @return an integer corresponding to the number of SMS units sent so far
     *
     * On failure, throws an exception or returns YMessageBox.PDUSENT_INVALID.
     */
    function YMessageBox_get_pduSent()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PDUSENT_INVALID;
            }
        }
        res = this._pduSent;
        return res;
    }

    /**
     * Gets the number of SMS units sent so far.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMessageBox object that invoked the callback
     *         - the result:an integer corresponding to the number of SMS units sent so far
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMessageBox.PDUSENT_INVALID.
     */
    function YMessageBox_get_pduSent_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PDUSENT_INVALID);
            } else {
                callback(context, obj, obj._pduSent);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the value of the outgoing SMS units counter.
     *
     * @param newval : an integer corresponding to the value of the outgoing SMS units counter
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMessageBox_set_pduSent(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pduSent',rest_val);
    }

    /**
     * Returns the number of SMS units received so far.
     *
     * @return an integer corresponding to the number of SMS units received so far
     *
     * On failure, throws an exception or returns YMessageBox.PDURECEIVED_INVALID.
     */
    function YMessageBox_get_pduReceived()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PDURECEIVED_INVALID;
            }
        }
        res = this._pduReceived;
        return res;
    }

    /**
     * Gets the number of SMS units received so far.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMessageBox object that invoked the callback
     *         - the result:an integer corresponding to the number of SMS units received so far
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMessageBox.PDURECEIVED_INVALID.
     */
    function YMessageBox_get_pduReceived_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PDURECEIVED_INVALID);
            } else {
                callback(context, obj, obj._pduReceived);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the value of the incoming SMS units counter.
     *
     * @param newval : an integer corresponding to the value of the incoming SMS units counter
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMessageBox_set_pduReceived(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pduReceived',rest_val);
    }

    /**
     * Returns the phone number authorized to send remote management commands.
     * When a phone number is specified, the hub will take contre of all incoming
     * SMS messages: it will execute commands coming from the authorized number,
     * and delete all messages once received (whether authorized or not).
     * If you need to receive SMS messages using your own software, leave this
     * attribute empty.
     *
     * @return a string corresponding to the phone number authorized to send remote management commands
     *
     * On failure, throws an exception or returns YMessageBox.OBEY_INVALID.
     */
    function YMessageBox_get_obey()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_OBEY_INVALID;
            }
        }
        res = this._obey;
        return res;
    }

    /**
     * Gets the phone number authorized to send remote management commands.
     * When a phone number is specified, the hub will take contre of all incoming
     * SMS messages: it will execute commands coming from the authorized number,
     * and delete all messages once received (whether authorized or not).
     * If you need to receive SMS messages using your own software, leave this
     * attribute empty.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMessageBox object that invoked the callback
     *         - the result:a string corresponding to the phone number authorized to send remote management commands
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YMessageBox.OBEY_INVALID.
     */
    function YMessageBox_get_obey_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_OBEY_INVALID);
            } else {
                callback(context, obj, obj._obey);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the phone number authorized to send remote management commands.
     * The phone number usually starts with a '+' and does not include spacers.
     * When a phone number is specified, the hub will take contre of all incoming
     * SMS messages: it will execute commands coming from the authorized number,
     * and delete all messages once received (whether authorized or not).
     * If you need to receive SMS messages using your own software, leave this
     * attribute empty. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * This feature is only available since YoctoHub-GSM-4G.
     *
     * @param newval : a string corresponding to the phone number authorized to send remote management commands
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMessageBox_set_obey(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('obey',rest_val);
    }

    function YMessageBox_get_command()
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
     *         - the YMessageBox object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YMessageBox_get_command_async(callback,context)
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

    function YMessageBox_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a SMS message box interface for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the SMS message box interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMessageBox.isOnline() to test if the SMS message box interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a SMS message box interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the SMS message box interface, for instance
     *         YHUBGSM1.messageBox.
     *
     * @return a YMessageBox object allowing you to drive the SMS message box interface.
     */
    function YMessageBox_FindMessageBox(func)                   // class method
    {
        var obj;                    // YMessageBox;
        obj = YFunction._FindFromCache("MessageBox", func);
        if (obj == null) {
            obj = new YMessageBox(func);
            YFunction._AddToCache("MessageBox", func, obj);
        }
        return obj;
    }

    function YMessageBox_nextMsgRef()
    {
        this._nextMsgRef = this._nextMsgRef + 1;
        return this._nextMsgRef;
    }

    function YMessageBox_clearSIMSlot(slot)
    {
        var retry;                  // int;
        var idx;                    // int;
        var res;                    // str;
        var bitmapStr;              // str;
        var int_res;                // int;
        var newBitmap;              // bin;
        var bitVal;                 // int;

        retry = 5;
        while (retry > 0) {
            this.clearCache();
            bitmapStr = this.get_slotsBitmap();
            newBitmap = YAPI._hexStrToBin(bitmapStr);
            idx = (slot >> 3);
            if (idx < (newBitmap).length) {
                bitVal = (1 << ((slot & 7)));
                if ((((newBitmap).charCodeAt(idx) & bitVal)) != 0) {
                    this._prevBitmapStr = "";
                    int_res = this.set_command("DS"+String(Math.round(slot)));
                    if (int_res < 0) {
                        return int_res;
                    }
                } else {
                    return YAPI_SUCCESS;
                }
            } else {
                return YAPI_INVALID_ARGUMENT;
            }
            res = this._AT("");
            retry = retry - 1;
        }
        return YAPI_IO_ERROR;
    }

    function YMessageBox_AT(cmd)
    {
        var chrPos;                 // int;
        var cmdLen;                 // int;
        var waitMore;               // int;
        var res;                    // str;
        var buff;                   // bin;
        var bufflen;                // int;
        var buffstr;                // str;
        var buffstrlen;             // int;
        var idx;                    // int;
        var suffixlen;              // int;
        // copied form the YCellular class
        // quote dangerous characters used in AT commands
        cmdLen = (cmd).length;
        chrPos = (cmd).indexOf("#");
        while (chrPos >= 0) {
            cmd = ""+cmd.substr(0, chrPos)+""+String.fromCharCode(37)+"23"+cmd.substr(chrPos+1, cmdLen-chrPos-1);
            cmdLen = cmdLen + 2;
            chrPos = (cmd).indexOf("#");
        }
        chrPos = (cmd).indexOf("+");
        while (chrPos >= 0) {
            cmd = ""+cmd.substr(0, chrPos)+""+String.fromCharCode(37)+"2B"+cmd.substr(chrPos+1, cmdLen-chrPos-1);
            cmdLen = cmdLen + 2;
            chrPos = (cmd).indexOf("+");
        }
        chrPos = (cmd).indexOf("=");
        while (chrPos >= 0) {
            cmd = ""+cmd.substr(0, chrPos)+""+String.fromCharCode(37)+"3D"+cmd.substr(chrPos+1, cmdLen-chrPos-1);
            cmdLen = cmdLen + 2;
            chrPos = (cmd).indexOf("=");
        }
        cmd = "at.txt?cmd="+cmd;
        res = "";
        // max 2 minutes (each iteration may take up to 5 seconds if waiting)
        waitMore = 24;
        while (waitMore > 0) {
            buff = this._download(cmd);
            bufflen = (buff).length;
            buffstr = buff;
            buffstrlen = (buffstr).length;
            idx = bufflen - 1;
            while ((idx > 0) && ((buff).charCodeAt(idx) != 64) && ((buff).charCodeAt(idx) != 10) && ((buff).charCodeAt(idx) != 13)) {
                idx = idx - 1;
            }
            if ((buff).charCodeAt(idx) == 64) {
                // continuation detected
                suffixlen = bufflen - idx;
                cmd = "at.txt?cmd="+buffstr.substr(buffstrlen - suffixlen, suffixlen);
                buffstr = buffstr.substr(0, buffstrlen - suffixlen);
                waitMore = waitMore - 1;
            } else {
                // request complete
                waitMore = 0;
            }
            res = ""+res+""+buffstr;
        }
        return res;
    }

    function YMessageBox_fetchPdu(slot)
    {
        var binPdu;                 // bin;
        var arrPdu = [];            // strArr;
        var hexPdu;                 // str;
        var sms;                    // YSms;

        binPdu = this._download("sms.json?pos="+String(Math.round(slot))+"&len=1");
        arrPdu = this._json_get_array(binPdu);
        hexPdu = this._decode_json_string(arrPdu[0]);
        sms = new YSms(this);
        sms.set_slot(slot);
        sms.parsePdu(YAPI._hexStrToBin(hexPdu));
        return sms;
    }

    function YMessageBox_initGsm2Unicode()
    {
        var i;                      // int;
        var uni;                    // int;
        this._gsm2unicode.length = 0;
        // 00-07
        this._gsm2unicode.push(64);
        this._gsm2unicode.push(163);
        this._gsm2unicode.push(36);
        this._gsm2unicode.push(165);
        this._gsm2unicode.push(232);
        this._gsm2unicode.push(233);
        this._gsm2unicode.push(249);
        this._gsm2unicode.push(236);
        // 08-0F
        this._gsm2unicode.push(242);
        this._gsm2unicode.push(199);
        this._gsm2unicode.push(10);
        this._gsm2unicode.push(216);
        this._gsm2unicode.push(248);
        this._gsm2unicode.push(13);
        this._gsm2unicode.push(197);
        this._gsm2unicode.push(229);
        // 10-17
        this._gsm2unicode.push(916);
        this._gsm2unicode.push(95);
        this._gsm2unicode.push(934);
        this._gsm2unicode.push(915);
        this._gsm2unicode.push(923);
        this._gsm2unicode.push(937);
        this._gsm2unicode.push(928);
        this._gsm2unicode.push(936);
        // 18-1F
        this._gsm2unicode.push(931);
        this._gsm2unicode.push(920);
        this._gsm2unicode.push(926);
        this._gsm2unicode.push(27);
        this._gsm2unicode.push(198);
        this._gsm2unicode.push(230);
        this._gsm2unicode.push(223);
        this._gsm2unicode.push(201);
        // 20-7A
        i = 32;
        while (i <= 122) {
            this._gsm2unicode.push(i);
            i = i + 1;
        }
        // exceptions in range 20-7A
        this._gsm2unicode[36] = 164;
        this._gsm2unicode[64] = 161;
        this._gsm2unicode[91] = 196;
        this._gsm2unicode[92] = 214;
        this._gsm2unicode[93] = 209;
        this._gsm2unicode[94] = 220;
        this._gsm2unicode[95] = 167;
        this._gsm2unicode[96] = 191;
        // 7B-7F
        this._gsm2unicode.push(228);
        this._gsm2unicode.push(246);
        this._gsm2unicode.push(241);
        this._gsm2unicode.push(252);
        this._gsm2unicode.push(224);
        // Invert table as well wherever possible
        this._iso2gsm = new Uint8Array(256);
        i = 0;
        while (i <= 127) {
            uni = this._gsm2unicode[i];
            if (uni <= 255) {
                this._iso2gsm[uni] = i;
            }
            i = i + 1;
        }
        i = 0;
        while (i < 4) {
            // mark escape sequences
            this._iso2gsm[91+i] = 27;
            this._iso2gsm[123+i] = 27;
            i = i + 1;
        }
        // Done
        this._gsm2unicodeReady = true;
        return YAPI_SUCCESS;
    }

    function YMessageBox_gsm2unicode(gsm)
    {
        var i;                      // int;
        var gsmlen;                 // int;
        var reslen;                 // int;
        var res = [];               // intArr;
        var uni;                    // int;
        if (!(this._gsm2unicodeReady)) {
            this.initGsm2Unicode();
        }
        gsmlen = (gsm).length;
        reslen = gsmlen;
        i = 0;
        while (i < gsmlen) {
            if ((gsm).charCodeAt(i) == 27) {
                reslen = reslen - 1;
            }
            i = i + 1;
        }
        res.length = 0;
        i = 0;
        while (i < gsmlen) {
            uni = this._gsm2unicode[(gsm).charCodeAt(i)];
            if ((uni == 27) && (i+1 < gsmlen)) {
                i = i + 1;
                uni = (gsm).charCodeAt(i);
                if (uni < 60) {
                    if (uni < 41) {
                        if (uni==20) {
                            uni=94;
                        } else {
                            if (uni==40) {
                                uni=123;
                            } else {
                                uni=0;
                            }
                        }
                    } else {
                        if (uni==41) {
                            uni=125;
                        } else {
                            if (uni==47) {
                                uni=92;
                            } else {
                                uni=0;
                            }
                        }
                    }
                } else {
                    if (uni < 62) {
                        if (uni==60) {
                            uni=91;
                        } else {
                            if (uni==61) {
                                uni=126;
                            } else {
                                uni=0;
                            }
                        }
                    } else {
                        if (uni==62) {
                            uni=93;
                        } else {
                            if (uni==64) {
                                uni=124;
                            } else {
                                if (uni==101) {
                                    uni=164;
                                } else {
                                    uni=0;
                                }
                            }
                        }
                    }
                }
            }
            if (uni > 0) {
                res.push(uni);
            }
            i = i + 1;
        }
        return res;
    }

    function YMessageBox_gsm2str(gsm)
    {
        var i;                      // int;
        var gsmlen;                 // int;
        var reslen;                 // int;
        var resbin;                 // bin;
        var resstr;                 // str;
        var uni;                    // int;
        if (!(this._gsm2unicodeReady)) {
            this.initGsm2Unicode();
        }
        gsmlen = (gsm).length;
        reslen = gsmlen;
        i = 0;
        while (i < gsmlen) {
            if ((gsm).charCodeAt(i) == 27) {
                reslen = reslen - 1;
            }
            i = i + 1;
        }
        resbin = new Uint8Array(reslen);
        i = 0;
        reslen = 0;
        while (i < gsmlen) {
            uni = this._gsm2unicode[(gsm).charCodeAt(i)];
            if ((uni == 27) && (i+1 < gsmlen)) {
                i = i + 1;
                uni = (gsm).charCodeAt(i);
                if (uni < 60) {
                    if (uni < 41) {
                        if (uni==20) {
                            uni=94;
                        } else {
                            if (uni==40) {
                                uni=123;
                            } else {
                                uni=0;
                            }
                        }
                    } else {
                        if (uni==41) {
                            uni=125;
                        } else {
                            if (uni==47) {
                                uni=92;
                            } else {
                                uni=0;
                            }
                        }
                    }
                } else {
                    if (uni < 62) {
                        if (uni==60) {
                            uni=91;
                        } else {
                            if (uni==61) {
                                uni=126;
                            } else {
                                uni=0;
                            }
                        }
                    } else {
                        if (uni==62) {
                            uni=93;
                        } else {
                            if (uni==64) {
                                uni=124;
                            } else {
                                if (uni==101) {
                                    uni=164;
                                } else {
                                    uni=0;
                                }
                            }
                        }
                    }
                }
            }
            if ((uni > 0) && (uni < 256)) {
                resbin[reslen] = uni;
                reslen = reslen + 1;
            }
            i = i + 1;
        }
        resstr = resbin;
        if ((resstr).length > reslen) {
            resstr = resstr.substr(0, reslen);
        }
        return resstr;
    }

    function YMessageBox_str2gsm(msg)
    {
        var asc;                    // bin;
        var asclen;                 // int;
        var i;                      // int;
        var ch;                     // int;
        var gsm7;                   // int;
        var extra;                  // int;
        var res;                    // bin;
        var wpos;                   // int;
        if (!(this._gsm2unicodeReady)) {
            this.initGsm2Unicode();
        }
        asc = msg;
        asclen = (asc).length;
        extra = 0;
        i = 0;
        while (i < asclen) {
            ch = (asc).charCodeAt(i);
            gsm7 = (this._iso2gsm).charCodeAt(ch);
            if (gsm7 == 27) {
                extra = extra + 1;
            }
            if (gsm7 == 0) {
                // cannot use standard GSM encoding
                res = new Uint8Array(0);
                return res;
            }
            i = i + 1;
        }
        res = new Uint8Array(asclen+extra);
        wpos = 0;
        i = 0;
        while (i < asclen) {
            ch = (asc).charCodeAt(i);
            gsm7 = (this._iso2gsm).charCodeAt(ch);
            res[wpos] = gsm7;
            wpos = wpos + 1;
            if (gsm7 == 27) {
                if (ch < 100) {
                    if (ch<93) {
                        if (ch<92) {
                            gsm7=60;
                        } else {
                            gsm7=47;
                        }
                    } else {
                        if (ch<94) {
                            gsm7=62;
                        } else {
                            gsm7=20;
                        }
                    }
                } else {
                    if (ch<125) {
                        if (ch<124) {
                            gsm7=40;
                        } else {
                            gsm7=64;
                        }
                    } else {
                        if (ch<126) {
                            gsm7=41;
                        } else {
                            gsm7=61;
                        }
                    }
                }
                res[wpos] = gsm7;
                wpos = wpos + 1;
            }
            i = i + 1;
        }
        return res;
    }

    function YMessageBox_checkNewMessages()
    {
        var bitmapStr;              // str;
        var prevBitmap;             // bin;
        var newBitmap;              // bin;
        var slot;                   // int;
        var nslots;                 // int;
        var pduIdx;                 // int;
        var idx;                    // int;
        var bitVal;                 // int;
        var prevBit;                // int;
        var i;                      // int;
        var nsig;                   // int;
        var cnt;                    // int;
        var sig;                    // str;
        var newArr = [];            // YSmsArr;
        var newMsg = [];            // YSmsArr;
        var newAgg = [];            // YSmsArr;
        var signatures = [];        // strArr;
        var sms;                    // YSms;

        bitmapStr = this.get_slotsBitmap();
        if (bitmapStr == this._prevBitmapStr) {
            return YAPI_SUCCESS;
        }
        prevBitmap = YAPI._hexStrToBin(this._prevBitmapStr);
        newBitmap = YAPI._hexStrToBin(bitmapStr);
        this._prevBitmapStr = bitmapStr;
        nslots = 8*(newBitmap).length;
        newArr.length = 0;
        newMsg.length = 0;
        signatures.length = 0;
        nsig = 0;
        // copy known messages
        pduIdx = 0;
        while (pduIdx < this._pdus.length) {
            sms = this._pdus[pduIdx];
            slot = sms.get_slot();
            idx = (slot >> 3);
            if (idx < (newBitmap).length) {
                bitVal = (1 << ((slot & 7)));
                if ((((newBitmap).charCodeAt(idx) & bitVal)) != 0) {
                    newArr.push(sms);
                    if (sms.get_concatCount() == 0) {
                        newMsg.push(sms);
                    } else {
                        sig = sms.get_concatSignature();
                        i = 0;
                        while ((i < nsig) && ((sig).length > 0)) {
                            if (signatures[i] == sig) {
                                sig = "";
                            }
                            i = i + 1;
                        }
                        if ((sig).length > 0) {
                            signatures.push(sig);
                            nsig = nsig + 1;
                        }
                    }
                }
            }
            pduIdx = pduIdx + 1;
        }
        // receive new messages
        slot = 0;
        while (slot < nslots) {
            idx = (slot >> 3);
            bitVal = (1 << ((slot & 7)));
            prevBit = 0;
            if (idx < (prevBitmap).length) {
                prevBit = ((prevBitmap).charCodeAt(idx) & bitVal);
            }
            if ((((newBitmap).charCodeAt(idx) & bitVal)) != 0) {
                if (prevBit == 0) {
                    sms = this.fetchPdu(slot);
                    newArr.push(sms);
                    if (sms.get_concatCount() == 0) {
                        newMsg.push(sms);
                    } else {
                        sig = sms.get_concatSignature();
                        i = 0;
                        while ((i < nsig) && ((sig).length > 0)) {
                            if (signatures[i] == sig) {
                                sig = "";
                            }
                            i = i + 1;
                        }
                        if ((sig).length > 0) {
                            signatures.push(sig);
                            nsig = nsig + 1;
                        }
                    }
                }
            }
            slot = slot + 1;
        }
        this._pdus = newArr;
        // append complete concatenated messages
        i = 0;
        while (i < nsig) {
            sig = signatures[i];
            cnt = 0;
            pduIdx = 0;
            while (pduIdx < this._pdus.length) {
                sms = this._pdus[pduIdx];
                if (sms.get_concatCount() > 0) {
                    if (sms.get_concatSignature() == sig) {
                        if (cnt == 0) {
                            cnt = sms.get_concatCount();
                            newAgg.length = 0;
                        }
                        newAgg.push(sms);
                    }
                }
                pduIdx = pduIdx + 1;
            }
            if ((cnt > 0) && (newAgg.length == cnt)) {
                sms = new YSms(this);
                sms.set_parts(newAgg);
                newMsg.push(sms);
            }
            i = i + 1;
        }
        this._messages = newMsg;
        return YAPI_SUCCESS;
    }

    function YMessageBox_get_pdus()
    {
        this.checkNewMessages();
        return this._pdus;
    }

    /**
     * Clear the SMS units counters.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMessageBox_clearPduCounters()
    {
        var retcode;                // int;

        retcode = this.set_pduReceived(0);
        if (retcode != YAPI_SUCCESS) {
            return retcode;
        }
        retcode = this.set_pduSent(0);
        return retcode;
    }

    /**
     * Sends a regular text SMS, with standard parameters. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText and addUnicodeData.
     *
     * @param recipient : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message : the text to be sent in the message
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMessageBox_sendTextMessage(recipient,message)
    {
        var sms;                    // YSms;

        sms = new YSms(this);
        sms.set_recipient(recipient);
        sms.addText(message);
        return sms.send();
    }

    /**
     * Sends a Flash SMS (class 0 message). Flash messages are displayed on the handset
     * immediately and are usually not saved on the SIM card. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText et addUnicodeData.
     *
     * @param recipient : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message : the text to be sent in the message
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMessageBox_sendFlashMessage(recipient,message)
    {
        var sms;                    // YSms;

        sms = new YSms(this);
        sms.set_recipient(recipient);
        sms.set_msgClass(0);
        sms.addText(message);
        return sms.send();
    }

    /**
     * Creates a new empty SMS message, to be configured and sent later on.
     *
     * @param recipient : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMessageBox_newMessage(recipient)
    {
        var sms;                    // YSms;
        sms = new YSms(this);
        sms.set_recipient(recipient);
        return sms;
    }

    /**
     * Returns the list of messages received and not deleted. This function
     * will automatically decode concatenated SMS.
     *
     * @return an YSms object list.
     *
     * On failure, throws an exception or returns an empty list.
     */
    function YMessageBox_get_messages()
    {
        this.checkNewMessages();
        return this._messages;
    }

    /**
     * Continues the enumeration of SMS message box interfaces started using yFirstMessageBox().
     * Caution: You can't make any assumption about the returned SMS message box interfaces order.
     * If you want to find a specific a SMS message box interface, use MessageBox.findMessageBox()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YMessageBox object, corresponding to
     *         a SMS message box interface currently online, or a null pointer
     *         if there are no more SMS message box interfaces to enumerate.
     */
    function YMessageBox_nextMessageBox()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMessageBox.FindMessageBox(next_hwid);
    }

    /**
     * Starts the enumeration of SMS message box interfaces currently accessible.
     * Use the method YMessageBox.nextMessageBox() to iterate on
     * next SMS message box interfaces.
     *
     * @return a pointer to a YMessageBox object, corresponding to
     *         the first SMS message box interface currently online, or a null pointer
     *         if there are none.
     */
    function YMessageBox_FirstMessageBox()
    {
        var next_hwid = YAPI.getFirstHardwareId('MessageBox');
        if(next_hwid == null) return null;
        return YMessageBox.FindMessageBox(next_hwid);
    }

    //--- (end of generated code: YMessageBox implementation)

    //--- (generated code: YMessageBox initialization)
    YMessageBox = YFunction._Subclass(_YMessageBox, {
        // Constants
        SLOTSINUSE_INVALID          : YAPI_INVALID_UINT,
        SLOTSCOUNT_INVALID          : YAPI_INVALID_UINT,
        SLOTSBITMAP_INVALID         : YAPI_INVALID_STRING,
        PDUSENT_INVALID             : YAPI_INVALID_UINT,
        PDURECEIVED_INVALID         : YAPI_INVALID_UINT,
        OBEY_INVALID                : YAPI_INVALID_STRING,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindMessageBox              : YMessageBox_FindMessageBox,
        FirstMessageBox             : YMessageBox_FirstMessageBox
    }, {
        // Methods
        get_slotsInUse              : YMessageBox_get_slotsInUse,
        slotsInUse                  : YMessageBox_get_slotsInUse,
        get_slotsInUse_async        : YMessageBox_get_slotsInUse_async,
        slotsInUse_async            : YMessageBox_get_slotsInUse_async,
        get_slotsCount              : YMessageBox_get_slotsCount,
        slotsCount                  : YMessageBox_get_slotsCount,
        get_slotsCount_async        : YMessageBox_get_slotsCount_async,
        slotsCount_async            : YMessageBox_get_slotsCount_async,
        get_slotsBitmap             : YMessageBox_get_slotsBitmap,
        slotsBitmap                 : YMessageBox_get_slotsBitmap,
        get_slotsBitmap_async       : YMessageBox_get_slotsBitmap_async,
        slotsBitmap_async           : YMessageBox_get_slotsBitmap_async,
        get_pduSent                 : YMessageBox_get_pduSent,
        pduSent                     : YMessageBox_get_pduSent,
        get_pduSent_async           : YMessageBox_get_pduSent_async,
        pduSent_async               : YMessageBox_get_pduSent_async,
        set_pduSent                 : YMessageBox_set_pduSent,
        setPduSent                  : YMessageBox_set_pduSent,
        get_pduReceived             : YMessageBox_get_pduReceived,
        pduReceived                 : YMessageBox_get_pduReceived,
        get_pduReceived_async       : YMessageBox_get_pduReceived_async,
        pduReceived_async           : YMessageBox_get_pduReceived_async,
        set_pduReceived             : YMessageBox_set_pduReceived,
        setPduReceived              : YMessageBox_set_pduReceived,
        get_obey                    : YMessageBox_get_obey,
        obey                        : YMessageBox_get_obey,
        get_obey_async              : YMessageBox_get_obey_async,
        obey_async                  : YMessageBox_get_obey_async,
        set_obey                    : YMessageBox_set_obey,
        setObey                     : YMessageBox_set_obey,
        get_command                 : YMessageBox_get_command,
        command                     : YMessageBox_get_command,
        get_command_async           : YMessageBox_get_command_async,
        command_async               : YMessageBox_get_command_async,
        set_command                 : YMessageBox_set_command,
        setCommand                  : YMessageBox_set_command,
        nextMsgRef                  : YMessageBox_nextMsgRef,
        clearSIMSlot                : YMessageBox_clearSIMSlot,
        _AT                         : YMessageBox_AT,
        fetchPdu                    : YMessageBox_fetchPdu,
        initGsm2Unicode             : YMessageBox_initGsm2Unicode,
        gsm2unicode                 : YMessageBox_gsm2unicode,
        gsm2str                     : YMessageBox_gsm2str,
        str2gsm                     : YMessageBox_str2gsm,
        checkNewMessages            : YMessageBox_checkNewMessages,
        get_pdus                    : YMessageBox_get_pdus,
        pdus                        : YMessageBox_get_pdus,
        clearPduCounters            : YMessageBox_clearPduCounters,
        sendTextMessage             : YMessageBox_sendTextMessage,
        sendFlashMessage            : YMessageBox_sendFlashMessage,
        newMessage                  : YMessageBox_newMessage,
        get_messages                : YMessageBox_get_messages,
        messages                    : YMessageBox_get_messages,
        nextMessageBox              : YMessageBox_nextMessageBox,
        _parseAttr                  : YMessageBox_parseAttr
    });
    //--- (end of generated code: YMessageBox initialization)
})();

//--- (generated code: YMessageBox functions)

/**
 * Retrieves a SMS message box interface for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the SMS message box interface is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YMessageBox.isOnline() to test if the SMS message box interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a SMS message box interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the SMS message box interface, for instance
 *         YHUBGSM1.messageBox.
 *
 * @return a YMessageBox object allowing you to drive the SMS message box interface.
 */
function yFindMessageBox(func)
{
    return YMessageBox.FindMessageBox(func);
}

/**
 * Starts the enumeration of SMS message box interfaces currently accessible.
 * Use the method YMessageBox.nextMessageBox() to iterate on
 * next SMS message box interfaces.
 *
 * @return a pointer to a YMessageBox object, corresponding to
 *         the first SMS message box interface currently online, or a null pointer
 *         if there are none.
 */
function yFirstMessageBox()
{
    return YMessageBox.FirstMessageBox();
}

//--- (end of generated code: YMessageBox functions)
