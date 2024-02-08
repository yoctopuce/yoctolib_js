/*********************************************************************
 *
 *  $Id: svn_id $
 *
 *  Implements the high-level API for RfidReader functions
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

//--- (generated code: YRfidTagInfo definitions)
//--- (end of generated code: YRfidTagInfo definitions)

//--- (generated code: YRfidTagInfo class start)
/**
 * YRfidTagInfo Class: RFID tag description, used by class YRfidReader
 *
 * YRfidTagInfo objects are used to describe RFID tag attributes,
 * such as the tag type and its storage size. These objects are returned by
 * method get_tagInfo() of class YRfidReader.
 */
//--- (end of generated code: YRfidTagInfo class start)

var YRfidTagInfo; // definition below
(function()
{
    function _YRfidTagInfo()
    {
        //--- (generated code: YRfidTagInfo constructor)
        this._tagId                          = "";                         // str
        this._tagType                        = 0;                          // int
        this._typeStr                        = "";                         // str
        this._size                           = 0;                          // int
        this._usable                         = 0;                          // int
        this._blksize                        = 0;                          // int
        this._fblk                           = 0;                          // int
        this._lblk                           = 0;                          // int
        //--- (end of generated code: YRfidTagInfo constructor)
    }

    //--- (generated code: YRfidTagInfo implementation)

    /**
     * Returns the RFID tag identifier.
     *
     * @return a string with the RFID tag identifier.
     */
    function YRfidTagInfo_get_tagId()
    {
        return this._tagId;
    }

    /**
     * Returns the type of the RFID tag, as a numeric constant.
     * (IEC_14443_MIFARE_CLASSIC1K, ...).
     *
     * @return an integer corresponding to the RFID tag type
     */
    function YRfidTagInfo_get_tagType()
    {
        return this._tagType;
    }

    /**
     * Returns the type of the RFID tag, as a string.
     *
     * @return a string corresponding to the RFID tag type
     */
    function YRfidTagInfo_get_tagTypeStr()
    {
        return this._typeStr;
    }

    /**
     * Returns the total memory size of the RFID tag, in bytes.
     *
     * @return the total memory size of the RFID tag
     */
    function YRfidTagInfo_get_tagMemorySize()
    {
        return this._size;
    }

    /**
     * Returns the usable storage size of the RFID tag, in bytes.
     *
     * @return the usable storage size of the RFID tag
     */
    function YRfidTagInfo_get_tagUsableSize()
    {
        return this._usable;
    }

    /**
     * Returns the block size of the RFID tag, in bytes.
     *
     * @return the block size of the RFID tag
     */
    function YRfidTagInfo_get_tagBlockSize()
    {
        return this._blksize;
    }

    /**
     * Returns the index of the first usable storage block on the RFID tag.
     *
     * @return the index of the first usable storage block on the RFID tag
     */
    function YRfidTagInfo_get_tagFirstBlock()
    {
        return this._fblk;
    }

    /**
     * Returns the index of the last usable storage block on the RFID tag.
     *
     * @return the index of the last usable storage block on the RFID tag
     */
    function YRfidTagInfo_get_tagLastBlock()
    {
        return this._lblk;
    }

    function YRfidTagInfo_imm_init(tagId,tagType,size,usable,blksize,fblk,lblk)
    {
        var typeStr;                // str;
        typeStr = "unknown";
        if (tagType == Y_IEC_15693) {
            typeStr = "IEC 15693";
        }
        if (tagType == Y_IEC_14443) {
            typeStr = "IEC 14443";
        }
        if (tagType == Y_IEC_14443_MIFARE_ULTRALIGHT) {
            typeStr = "MIFARE Ultralight";
        }
        if (tagType == Y_IEC_14443_MIFARE_CLASSIC1K) {
            typeStr = "MIFARE Classic 1K";
        }
        if (tagType == Y_IEC_14443_MIFARE_CLASSIC4K) {
            typeStr = "MIFARE Classic 4K";
        }
        if (tagType == Y_IEC_14443_MIFARE_DESFIRE) {
            typeStr = "MIFARE DESFire";
        }
        if (tagType == Y_IEC_14443_NTAG_213) {
            typeStr = "NTAG 213";
        }
        if (tagType == Y_IEC_14443_NTAG_215) {
            typeStr = "NTAG 215";
        }
        if (tagType == Y_IEC_14443_NTAG_216) {
            typeStr = "NTAG 216";
        }
        if (tagType == Y_IEC_14443_NTAG_424_DNA) {
            typeStr = "NTAG 424 DNA";
        }
        this._tagId = tagId;
        this._tagType = tagType;
        this._typeStr = typeStr;
        this._size = size;
        this._usable = usable;
        this._blksize = blksize;
        this._fblk = fblk;
        this._lblk = lblk;
    }

    //--- (end of generated code: YRfidTagInfo implementation)

    //--- (generated code: YRfidTagInfo initialization)
    YRfidTagInfo = _YRfidTagInfo;
    // Constants
    YRfidTagInfo.IEC_15693                             = 1;
    YRfidTagInfo.prototype.IEC_15693                   = 1;
    YRfidTagInfo.IEC_14443                             = 2;
    YRfidTagInfo.prototype.IEC_14443                   = 2;
    YRfidTagInfo.IEC_14443_MIFARE_ULTRALIGHT           = 3;
    YRfidTagInfo.prototype.IEC_14443_MIFARE_ULTRALIGHT = 3;
    YRfidTagInfo.IEC_14443_MIFARE_CLASSIC1K            = 4;
    YRfidTagInfo.prototype.IEC_14443_MIFARE_CLASSIC1K  = 4;
    YRfidTagInfo.IEC_14443_MIFARE_CLASSIC4K            = 5;
    YRfidTagInfo.prototype.IEC_14443_MIFARE_CLASSIC4K  = 5;
    YRfidTagInfo.IEC_14443_MIFARE_DESFIRE              = 6;
    YRfidTagInfo.prototype.IEC_14443_MIFARE_DESFIRE    = 6;
    YRfidTagInfo.IEC_14443_NTAG_213                    = 7;
    YRfidTagInfo.prototype.IEC_14443_NTAG_213          = 7;
    YRfidTagInfo.IEC_14443_NTAG_215                    = 8;
    YRfidTagInfo.prototype.IEC_14443_NTAG_215          = 8;
    YRfidTagInfo.IEC_14443_NTAG_216                    = 9;
    YRfidTagInfo.prototype.IEC_14443_NTAG_216          = 9;
    YRfidTagInfo.IEC_14443_NTAG_424_DNA                = 10;
    YRfidTagInfo.prototype.IEC_14443_NTAG_424_DNA      = 10;
    // Methods
    YRfidTagInfo.prototype.get_tagId                   = YRfidTagInfo_get_tagId;
    YRfidTagInfo.prototype.tagId                       = YRfidTagInfo_get_tagId;
    YRfidTagInfo.prototype.get_tagType                 = YRfidTagInfo_get_tagType;
    YRfidTagInfo.prototype.tagType                     = YRfidTagInfo_get_tagType;
    YRfidTagInfo.prototype.get_tagTypeStr              = YRfidTagInfo_get_tagTypeStr;
    YRfidTagInfo.prototype.tagTypeStr                  = YRfidTagInfo_get_tagTypeStr;
    YRfidTagInfo.prototype.get_tagMemorySize           = YRfidTagInfo_get_tagMemorySize;
    YRfidTagInfo.prototype.tagMemorySize               = YRfidTagInfo_get_tagMemorySize;
    YRfidTagInfo.prototype.get_tagUsableSize           = YRfidTagInfo_get_tagUsableSize;
    YRfidTagInfo.prototype.tagUsableSize               = YRfidTagInfo_get_tagUsableSize;
    YRfidTagInfo.prototype.get_tagBlockSize            = YRfidTagInfo_get_tagBlockSize;
    YRfidTagInfo.prototype.tagBlockSize                = YRfidTagInfo_get_tagBlockSize;
    YRfidTagInfo.prototype.get_tagFirstBlock           = YRfidTagInfo_get_tagFirstBlock;
    YRfidTagInfo.prototype.tagFirstBlock               = YRfidTagInfo_get_tagFirstBlock;
    YRfidTagInfo.prototype.get_tagLastBlock            = YRfidTagInfo_get_tagLastBlock;
    YRfidTagInfo.prototype.tagLastBlock                = YRfidTagInfo_get_tagLastBlock;
    YRfidTagInfo.prototype.imm_init                    = YRfidTagInfo_imm_init;
    //--- (end of generated code: YRfidTagInfo initialization)
})();


//--- (generated code: YRfidStatus definitions)
//--- (end of generated code: YRfidStatus definitions)

//--- (generated code: YRfidStatus class start)
/**
 * YRfidStatus Class: Detailled information about the result of RFID tag operations
 *
 * YRfidStatus objects provide additional information about
 * operations on RFID tags, including the range of blocks affected
 * by read/write operations and possible errors when communicating
 * with RFID tags.
 * This makes it possible, for example, to distinguish communication
 * errors that can be recovered by an additional attempt, from
 * security or other errors on the tag.
 */
//--- (end of generated code: YRfidStatus class start)

var YRfidStatus; // definition below
(function()
{
    function _YRfidStatus()
    {
        //--- (generated code: YRfidStatus constructor)
        this._tagId                          = "";                         // str
        this._errCode                        = 0;                          // int
        this._errBlk                         = 0;                          // int
        this._errMsg                         = "";                         // str
        this._yapierr                        = 0;                          // int
        this._fab                            = 0;                          // int
        this._lab                            = 0;                          // int
        //--- (end of generated code: YRfidStatus constructor)
    }

    //--- (generated code: YRfidStatus implementation)

    /**
     * Returns RFID tag identifier related to the status.
     *
     * @return a string with the RFID tag identifier.
     */
    function YRfidStatus_get_tagId()
    {
        return this._tagId;
    }

    /**
     * Returns the detailled error code, or 0 if no error happened.
     *
     * @return a numeric error code
     */
    function YRfidStatus_get_errorCode()
    {
        return this._errCode;
    }

    /**
     * Returns the RFID tag memory block number where the error was encountered, or -1 if the
     * error is not specific to a memory block.
     *
     * @return an RFID tag block number
     */
    function YRfidStatus_get_errorBlock()
    {
        return this._errBlk;
    }

    /**
     * Returns a string describing precisely the RFID commande result.
     *
     * @return an error message string
     */
    function YRfidStatus_get_errorMessage()
    {
        return this._errMsg;
    }

    function YRfidStatus_get_yapiError()
    {
        return this._yapierr;
    }

    /**
     * Returns the block number of the first RFID tag memory block affected
     * by the operation. Depending on the type of operation and on the tag
     * memory granularity, this number may be smaller than the requested
     * memory block index.
     *
     * @return an RFID tag block number
     */
    function YRfidStatus_get_firstAffectedBlock()
    {
        return this._fab;
    }

    /**
     * Returns the block number of the last RFID tag memory block affected
     * by the operation. Depending on the type of operation and on the tag
     * memory granularity, this number may be bigger than the requested
     * memory block index.
     *
     * @return an RFID tag block number
     */
    function YRfidStatus_get_lastAffectedBlock()
    {
        return this._lab;
    }

    function YRfidStatus_imm_init(tagId,errCode,errBlk,fab,lab)
    {
        var errMsg;                 // str;
        if (errCode == 0) {
            this._yapierr = YAPI_SUCCESS;
            errMsg = "Success (no error)";
        } else {
            if (errCode < 0) {
                if (errCode > -50) {
                    this._yapierr = errCode;
                    errMsg = "YoctoLib error "+String(Math.round(errCode));
                } else {
                    this._yapierr = YAPI_RFID_HARD_ERROR;
                    errMsg = "Non-recoverable RFID error "+String(Math.round(errCode));
                }
            } else {
                if (errCode > 1000) {
                    this._yapierr = YAPI_RFID_SOFT_ERROR;
                    errMsg = "Recoverable RFID error "+String(Math.round(errCode));
                } else {
                    this._yapierr = YAPI_RFID_HARD_ERROR;
                    errMsg = "Non-recoverable RFID error "+String(Math.round(errCode));
                }
            }
            if (errCode == Y_TAG_NOTFOUND) {
                errMsg = "Tag not found";
            }
            if (errCode == Y_TAG_JUSTLEFT) {
                errMsg = "Tag left during operation";
            }
            if (errCode == Y_TAG_LEFT) {
                errMsg = "Tag not here anymore";
            }
            if (errCode == Y_READER_BUSY) {
                errMsg = "Reader is busy";
            }
            if (errCode == Y_INVALID_CMD_ARGUMENTS) {
                errMsg = "Invalid command arguments";
            }
            if (errCode == Y_UNKNOWN_CAPABILITIES) {
                errMsg = "Unknown capabilities";
            }
            if (errCode == Y_MEMORY_NOT_SUPPORTED) {
                errMsg = "Memory no present";
            }
            if (errCode == Y_INVALID_BLOCK_INDEX) {
                errMsg = "Invalid block index";
            }
            if (errCode == Y_MEM_SPACE_UNVERRUN_ATTEMPT) {
                errMsg = "Tag memory space overrun attempt";
            }
            if (errCode == Y_COMMAND_NOT_SUPPORTED) {
                errMsg = "The command is not supported";
            }
            if (errCode == Y_COMMAND_NOT_RECOGNIZED) {
                errMsg = "The command is not recognized";
            }
            if (errCode == Y_COMMAND_OPTION_NOT_RECOGNIZED) {
                errMsg = "The command option is not supported.";
            }
            if (errCode == Y_COMMAND_CANNOT_BE_PROCESSED_IN_TIME) {
                errMsg = "The command cannot be processed in time";
            }
            if (errCode == Y_UNDOCUMENTED_ERROR) {
                errMsg = "Error with no information given";
            }
            if (errCode == Y_BLOCK_NOT_AVAILABLE) {
                errMsg = "Block is not available";
            }
            if (errCode == Y_BLOCK_ALREADY_LOCKED) {
                errMsg = "Block is already locked and thus cannot be locked again.";
            }
            if (errCode == Y_BLOCK_LOCKED) {
                errMsg = "Block is locked and its content cannot be changed";
            }
            if (errCode == Y_BLOCK_NOT_SUCESSFULLY_PROGRAMMED) {
                errMsg = "Block was not successfully programmed";
            }
            if (errCode == Y_BLOCK_NOT_SUCESSFULLY_LOCKED) {
                errMsg = "Block was not successfully locked";
            }
            if (errCode == Y_BLOCK_IS_PROTECTED) {
                errMsg = "Block is protected";
            }
            if (errCode == Y_CRYPTOGRAPHIC_ERROR) {
                errMsg = "Generic cryptographic error";
            }
            if (errCode == Y_BROWNOUT_DETECTED) {
                errMsg = "BrownOut detected (BOD)";
            }
            if (errCode == Y_BUFFER_OVERFLOW) {
                errMsg = "Buffer Overflow (BOF)";
            }
            if (errCode == Y_CRC_ERROR) {
                errMsg = "Communication CRC Error (CCE)";
            }
            if (errCode == Y_COLLISION_DETECTED) {
                errMsg = "Collision Detected (CLD/CDT)";
            }
            if (errCode == Y_COMMAND_RECEIVE_TIMEOUT) {
                errMsg = "Command Receive Timeout (CRT)";
            }
            if (errCode == Y_DID_NOT_SLEEP) {
                errMsg = "Did Not Sleep (DNS)";
            }
            if (errCode == Y_ERROR_DECIMAL_EXPECTED) {
                errMsg = "Error Decimal Expected (EDX)";
            }
            if (errCode == Y_HARDWARE_FAILURE) {
                errMsg = "Error Hardware Failure (EHF)";
            }
            if (errCode == Y_ERROR_HEX_EXPECTED) {
                errMsg = "Error Hex Expected (EHX)";
            }
            if (errCode == Y_FIFO_LENGTH_ERROR) {
                errMsg = "FIFO length error (FLE)";
            }
            if (errCode == Y_FRAMING_ERROR) {
                errMsg = "Framing error (FER)";
            }
            if (errCode == Y_NOT_IN_CNR_MODE) {
                errMsg = "Not in CNR Mode (NCM)";
            }
            if (errCode == Y_NUMBER_OU_OF_RANGE) {
                errMsg = "Number Out of Range (NOR)";
            }
            if (errCode == Y_NOT_SUPPORTED) {
                errMsg = "Not Supported (NOS)";
            }
            if (errCode == Y_NO_RF_FIELD_ACTIVE) {
                errMsg = "No RF field active (NRF)";
            }
            if (errCode == Y_READ_DATA_LENGTH_ERROR) {
                errMsg = "Read data length error (RDL)";
            }
            if (errCode == Y_WATCHDOG_RESET) {
                errMsg = "Watchdog reset (SRT)";
            }
            if (errCode == Y_TAG_COMMUNICATION_ERROR) {
                errMsg = "Tag Communication Error (TCE)";
            }
            if (errCode == Y_TAG_NOT_RESPONDING) {
                errMsg = "Tag Not Responding (TNR)";
            }
            if (errCode == Y_TIMEOUT_ERROR) {
                errMsg = "TimeOut Error (TOE)";
            }
            if (errCode == Y_UNKNOW_COMMAND) {
                errMsg = "Unknown Command (UCO)";
            }
            if (errCode == Y_UNKNOW_ERROR) {
                errMsg = "Unknown error (UER)";
            }
            if (errCode == Y_UNKNOW_PARAMETER) {
                errMsg = "Unknown Parameter (UPA)";
            }
            if (errCode == Y_UART_RECEIVE_ERROR) {
                errMsg = "UART Receive Error (URE)";
            }
            if (errCode == Y_WRONG_DATA_LENGTH) {
                errMsg = "Wrong Data Length (WDL)";
            }
            if (errCode == Y_WRONG_MODE) {
                errMsg = "Wrong Mode (WMO)";
            }
            if (errCode == Y_UNKNOWN_DWARFxx_ERROR_CODE) {
                errMsg = "Unknown DWARF15 error code";
            }
            if (errCode == Y_UNEXPECTED_TAG_ID_IN_RESPONSE) {
                errMsg = "Unexpected Tag id in response";
            }
            if (errCode == Y_UNEXPECTED_TAG_INDEX) {
                errMsg = "internal error : unexpected TAG index";
            }
            if (errCode == Y_TRANSFER_CLOSED) {
                errMsg = "transfer closed";
            }
            if (errCode == Y_WRITE_DATA_MISSING) {
                errMsg = "Missing write data";
            }
            if (errCode == Y_WRITE_TOO_MUCH_DATA) {
                errMsg = "Attempt to write too much data";
            }
            if (errCode == Y_COULD_NOT_BUILD_REQUEST) {
                errMsg = "Could not not request";
            }
            if (errCode == Y_INVALID_OPTIONS) {
                errMsg = "Invalid transfer options";
            }
            if (errCode == Y_UNEXPECTED_RESPONSE) {
                errMsg = "Unexpected Tag response";
            }
            if (errCode == Y_AFI_NOT_AVAILABLE) {
                errMsg = "AFI not available";
            }
            if (errCode == Y_DSFID_NOT_AVAILABLE) {
                errMsg = "DSFID not available";
            }
            if (errCode == Y_TAG_RESPONSE_TOO_SHORT) {
                errMsg = "Tag's response too short";
            }
            if (errCode == Y_DEC_EXPECTED) {
                errMsg = "Error Decimal value Expected, or is missing";
            }
            if (errCode == Y_HEX_EXPECTED) {
                errMsg = "Error Hexadecimal value Expected, or is missing";
            }
            if (errCode == Y_NOT_SAME_SECOR) {
                errMsg = "Input and Output block are not in the same Sector";
            }
            if (errCode == Y_MIFARE_AUTHENTICATED) {
                errMsg = "No chip with MIFARE Classic technology Authenticated";
            }
            if (errCode == Y_NO_DATABLOCK) {
                errMsg = "No Data Block";
            }
            if (errCode == Y_KEYB_IS_READABLE) {
                errMsg = "Key B is Readable";
            }
            if (errCode == Y_OPERATION_NOT_EXECUTED) {
                errMsg = "Operation Not Executed, would have caused an overflow";
            }
            if (errCode == Y_BLOK_MODE_ERROR) {
                errMsg = "Block has not been initialized as a 'value block'";
            }
            if (errCode == Y_BLOCK_NOT_WRITABLE) {
                errMsg = "Block Not Writable";
            }
            if (errCode == Y_BLOCK_ACCESS_ERROR) {
                errMsg = "Block Access Error";
            }
            if (errCode == Y_BLOCK_NOT_AUTHENTICATED) {
                errMsg = "Block Not Authenticated";
            }
            if (errCode == Y_ACCESS_KEY_BIT_NOT_WRITABLE) {
                errMsg = "Access bits or Keys not Writable";
            }
            if (errCode == Y_USE_KEYA_FOR_AUTH) {
                errMsg = "Use Key B for authentication";
            }
            if (errCode == Y_USE_KEYB_FOR_AUTH) {
                errMsg = "Use Key A for authentication";
            }
            if (errCode == Y_KEY_NOT_CHANGEABLE) {
                errMsg = "Key(s) not changeable";
            }
            if (errCode == Y_BLOCK_TOO_HIGH) {
                errMsg = "Block index is too high";
            }
            if (errCode == Y_AUTH_ERR) {
                errMsg = "Authentication Error (i.e. wrong key)";
            }
            if (errCode == Y_NOKEY_SELECT) {
                errMsg = "No Key Select, select a temporary or a static key";
            }
            if (errCode == Y_CARD_NOT_SELECTED) {
                errMsg = " Card is Not Selected";
            }
            if (errCode == Y_BLOCK_TO_READ_NONE) {
                errMsg = "Number of Blocks to Read is 0";
            }
            if (errCode == Y_NO_TAG) {
                errMsg = "No Tag detected";
            }
            if (errCode == Y_TOO_MUCH_DATA) {
                errMsg = "Too Much Data (i.e. Uart input buffer overflow)";
            }
            if (errCode == Y_CON_NOT_SATISFIED) {
                errMsg = "Conditions Not Satisfied";
            }
            if (errCode == Y_BLOCK_IS_SPECIAL) {
                errMsg = "Bad parameter: block is a special block";
            }
            if (errCode == Y_READ_BEYOND_ANNOUNCED_SIZE) {
                errMsg = "Attempt to read more than announced size.";
            }
            if (errCode == Y_BLOCK_ZERO_IS_RESERVED) {
                errMsg = "Block 0 is reserved and cannot be used";
            }
            if (errCode == Y_VALUE_BLOCK_BAD_FORMAT) {
                errMsg = "One value block is not properly initialized";
            }
            if (errCode == Y_ISO15693_ONLY_FEATURE) {
                errMsg = "Feature available on ISO 15693 only";
            }
            if (errCode == Y_ISO14443_ONLY_FEATURE) {
                errMsg = "Feature available on ISO 14443 only";
            }
            if (errCode == Y_MIFARE_CLASSIC_ONLY_FEATURE) {
                errMsg = "Feature available on ISO 14443 MIFARE Classic only";
            }
            if (errCode == Y_BLOCK_MIGHT_BE_PROTECTED) {
                errMsg = "Block might be protected";
            }
            if (errCode == Y_NO_SUCH_BLOCK) {
                errMsg = "No such block";
            }
            if (errCode == Y_COUNT_TOO_BIG) {
                errMsg = "Count parameter is too large";
            }
            if (errCode == Y_UNKNOWN_MEM_SIZE) {
                errMsg = "Tag memory size is unknown";
            }
            if (errCode == Y_MORE_THAN_2BLOCKS_MIGHT_NOT_WORK) {
                errMsg = "Writing more than two blocks at once might not be supported by this tag";
            }
            if (errCode == Y_READWRITE_NOT_SUPPORTED) {
                errMsg = "Read/write operation not supported for this tag";
            }
            if (errCode == Y_UNEXPECTED_VICC_ID_IN_RESPONSE) {
                errMsg = "Unexpected VICC ID in response";
            }
            if (errCode == Y_LOCKBLOCK_NOT_SUPPORTED) {
                errMsg = "This tag does not support the Lock block function";
            }
            if (errCode == Y_INTERNAL_ERROR_SHOULD_NEVER_HAPPEN) {
                errMsg = "Yoctopuce RFID code ran into an unexpected state, please contact support";
            }
            if (errCode == Y_INVLD_BLOCK_MODE_COMBINATION) {
                errMsg = "Invalid combination of block mode options";
            }
            if (errCode == Y_INVLD_ACCESS_MODE_COMBINATION) {
                errMsg = "Invalid combination of access mode options";
            }
            if (errCode == Y_INVALID_SIZE) {
                errMsg = "Invalid data size parameter";
            }
            if (errCode == Y_BAD_PASSWORD_FORMAT) {
                errMsg = "Bad password format or type";
            }
            if (errBlk >= 0) {
                errMsg = ""+errMsg+" (block "+String(Math.round(errBlk))+")";
            }
        }
        this._tagId = tagId;
        this._errCode = errCode;
        this._errBlk = errBlk;
        this._errMsg = errMsg;
        this._fab = fab;
        this._lab = lab;
    }

    //--- (end of generated code: YRfidStatus implementation)

    //--- (generated code: YRfidStatus initialization)
    YRfidStatus = _YRfidStatus;
    // Constants
    YRfidStatus.SUCCESS                               = 0;
    YRfidStatus.prototype.SUCCESS                     = 0;
    YRfidStatus.COMMAND_NOT_SUPPORTED                 = 1;
    YRfidStatus.prototype.COMMAND_NOT_SUPPORTED       = 1;
    YRfidStatus.COMMAND_NOT_RECOGNIZED                = 2;
    YRfidStatus.prototype.COMMAND_NOT_RECOGNIZED      = 2;
    YRfidStatus.COMMAND_OPTION_NOT_RECOGNIZED         = 3;
    YRfidStatus.prototype.COMMAND_OPTION_NOT_RECOGNIZED = 3;
    YRfidStatus.COMMAND_CANNOT_BE_PROCESSED_IN_TIME   = 4;
    YRfidStatus.prototype.COMMAND_CANNOT_BE_PROCESSED_IN_TIME = 4;
    YRfidStatus.UNDOCUMENTED_ERROR                    = 15;
    YRfidStatus.prototype.UNDOCUMENTED_ERROR          = 15;
    YRfidStatus.BLOCK_NOT_AVAILABLE                   = 16;
    YRfidStatus.prototype.BLOCK_NOT_AVAILABLE         = 16;
    YRfidStatus.BLOCK_ALREADY_LOCKED                  = 17;
    YRfidStatus.prototype.BLOCK_ALREADY_LOCKED        = 17;
    YRfidStatus.BLOCK_LOCKED                          = 18;
    YRfidStatus.prototype.BLOCK_LOCKED                = 18;
    YRfidStatus.BLOCK_NOT_SUCESSFULLY_PROGRAMMED      = 19;
    YRfidStatus.prototype.BLOCK_NOT_SUCESSFULLY_PROGRAMMED = 19;
    YRfidStatus.BLOCK_NOT_SUCESSFULLY_LOCKED          = 20;
    YRfidStatus.prototype.BLOCK_NOT_SUCESSFULLY_LOCKED = 20;
    YRfidStatus.BLOCK_IS_PROTECTED                    = 21;
    YRfidStatus.prototype.BLOCK_IS_PROTECTED          = 21;
    YRfidStatus.CRYPTOGRAPHIC_ERROR                   = 64;
    YRfidStatus.prototype.CRYPTOGRAPHIC_ERROR         = 64;
    YRfidStatus.READER_BUSY                           = 1000;
    YRfidStatus.prototype.READER_BUSY                 = 1000;
    YRfidStatus.TAG_NOTFOUND                          = 1001;
    YRfidStatus.prototype.TAG_NOTFOUND                = 1001;
    YRfidStatus.TAG_LEFT                              = 1002;
    YRfidStatus.prototype.TAG_LEFT                    = 1002;
    YRfidStatus.TAG_JUSTLEFT                          = 1003;
    YRfidStatus.prototype.TAG_JUSTLEFT                = 1003;
    YRfidStatus.TAG_COMMUNICATION_ERROR               = 1004;
    YRfidStatus.prototype.TAG_COMMUNICATION_ERROR     = 1004;
    YRfidStatus.TAG_NOT_RESPONDING                    = 1005;
    YRfidStatus.prototype.TAG_NOT_RESPONDING          = 1005;
    YRfidStatus.TIMEOUT_ERROR                         = 1006;
    YRfidStatus.prototype.TIMEOUT_ERROR               = 1006;
    YRfidStatus.COLLISION_DETECTED                    = 1007;
    YRfidStatus.prototype.COLLISION_DETECTED          = 1007;
    YRfidStatus.INVALID_CMD_ARGUMENTS                 = -66;
    YRfidStatus.prototype.INVALID_CMD_ARGUMENTS       = -66;
    YRfidStatus.UNKNOWN_CAPABILITIES                  = -67;
    YRfidStatus.prototype.UNKNOWN_CAPABILITIES        = -67;
    YRfidStatus.MEMORY_NOT_SUPPORTED                  = -68;
    YRfidStatus.prototype.MEMORY_NOT_SUPPORTED        = -68;
    YRfidStatus.INVALID_BLOCK_INDEX                   = -69;
    YRfidStatus.prototype.INVALID_BLOCK_INDEX         = -69;
    YRfidStatus.MEM_SPACE_UNVERRUN_ATTEMPT            = -70;
    YRfidStatus.prototype.MEM_SPACE_UNVERRUN_ATTEMPT  = -70;
    YRfidStatus.BROWNOUT_DETECTED                     = -71     ;
    YRfidStatus.prototype.BROWNOUT_DETECTED           = -71     ;
    YRfidStatus.BUFFER_OVERFLOW                       = -72;
    YRfidStatus.prototype.BUFFER_OVERFLOW             = -72;
    YRfidStatus.CRC_ERROR                             = -73;
    YRfidStatus.prototype.CRC_ERROR                   = -73;
    YRfidStatus.COMMAND_RECEIVE_TIMEOUT               = -75;
    YRfidStatus.prototype.COMMAND_RECEIVE_TIMEOUT     = -75;
    YRfidStatus.DID_NOT_SLEEP                         = -76;
    YRfidStatus.prototype.DID_NOT_SLEEP               = -76;
    YRfidStatus.ERROR_DECIMAL_EXPECTED                = -77;
    YRfidStatus.prototype.ERROR_DECIMAL_EXPECTED      = -77;
    YRfidStatus.HARDWARE_FAILURE                      = -78;
    YRfidStatus.prototype.HARDWARE_FAILURE            = -78;
    YRfidStatus.ERROR_HEX_EXPECTED                    = -79;
    YRfidStatus.prototype.ERROR_HEX_EXPECTED          = -79;
    YRfidStatus.FIFO_LENGTH_ERROR                     = -80;
    YRfidStatus.prototype.FIFO_LENGTH_ERROR           = -80;
    YRfidStatus.FRAMING_ERROR                         = -81;
    YRfidStatus.prototype.FRAMING_ERROR               = -81;
    YRfidStatus.NOT_IN_CNR_MODE                       = -82;
    YRfidStatus.prototype.NOT_IN_CNR_MODE             = -82;
    YRfidStatus.NUMBER_OU_OF_RANGE                    = -83;
    YRfidStatus.prototype.NUMBER_OU_OF_RANGE          = -83;
    YRfidStatus.NOT_SUPPORTED                         = -84;
    YRfidStatus.prototype.NOT_SUPPORTED               = -84;
    YRfidStatus.NO_RF_FIELD_ACTIVE                    = -85;
    YRfidStatus.prototype.NO_RF_FIELD_ACTIVE          = -85;
    YRfidStatus.READ_DATA_LENGTH_ERROR                = -86;
    YRfidStatus.prototype.READ_DATA_LENGTH_ERROR      = -86;
    YRfidStatus.WATCHDOG_RESET                        = -87;
    YRfidStatus.prototype.WATCHDOG_RESET              = -87;
    YRfidStatus.UNKNOW_COMMAND                        = -91;
    YRfidStatus.prototype.UNKNOW_COMMAND              = -91;
    YRfidStatus.UNKNOW_ERROR                          = -92;
    YRfidStatus.prototype.UNKNOW_ERROR                = -92;
    YRfidStatus.UNKNOW_PARAMETER                      = -93;
    YRfidStatus.prototype.UNKNOW_PARAMETER            = -93;
    YRfidStatus.UART_RECEIVE_ERROR                    = -94;
    YRfidStatus.prototype.UART_RECEIVE_ERROR          = -94;
    YRfidStatus.WRONG_DATA_LENGTH                     = -95;
    YRfidStatus.prototype.WRONG_DATA_LENGTH           = -95;
    YRfidStatus.WRONG_MODE                            = -96;
    YRfidStatus.prototype.WRONG_MODE                  = -96;
    YRfidStatus.UNKNOWN_DWARFxx_ERROR_CODE            = -97;
    YRfidStatus.prototype.UNKNOWN_DWARFxx_ERROR_CODE  = -97;
    YRfidStatus.RESPONSE_SHORT                        = -98;
    YRfidStatus.prototype.RESPONSE_SHORT              = -98;
    YRfidStatus.UNEXPECTED_TAG_ID_IN_RESPONSE         = -99;
    YRfidStatus.prototype.UNEXPECTED_TAG_ID_IN_RESPONSE = -99;
    YRfidStatus.UNEXPECTED_TAG_INDEX                  = -100;
    YRfidStatus.prototype.UNEXPECTED_TAG_INDEX        = -100;
    YRfidStatus.READ_EOF                              = -101;
    YRfidStatus.prototype.READ_EOF                    = -101;
    YRfidStatus.READ_OK_SOFAR                         = -102;
    YRfidStatus.prototype.READ_OK_SOFAR               = -102;
    YRfidStatus.WRITE_DATA_MISSING                    = -103;
    YRfidStatus.prototype.WRITE_DATA_MISSING          = -103;
    YRfidStatus.WRITE_TOO_MUCH_DATA                   = -104;
    YRfidStatus.prototype.WRITE_TOO_MUCH_DATA         = -104;
    YRfidStatus.TRANSFER_CLOSED                       = -105;
    YRfidStatus.prototype.TRANSFER_CLOSED             = -105;
    YRfidStatus.COULD_NOT_BUILD_REQUEST               = -106;
    YRfidStatus.prototype.COULD_NOT_BUILD_REQUEST     = -106;
    YRfidStatus.INVALID_OPTIONS                       = -107;
    YRfidStatus.prototype.INVALID_OPTIONS             = -107;
    YRfidStatus.UNEXPECTED_RESPONSE                   = -108;
    YRfidStatus.prototype.UNEXPECTED_RESPONSE         = -108;
    YRfidStatus.AFI_NOT_AVAILABLE                     = -109;
    YRfidStatus.prototype.AFI_NOT_AVAILABLE           = -109;
    YRfidStatus.DSFID_NOT_AVAILABLE                   = -110;
    YRfidStatus.prototype.DSFID_NOT_AVAILABLE         = -110;
    YRfidStatus.TAG_RESPONSE_TOO_SHORT                = -111;
    YRfidStatus.prototype.TAG_RESPONSE_TOO_SHORT      = -111;
    YRfidStatus.DEC_EXPECTED                          = -112 ;
    YRfidStatus.prototype.DEC_EXPECTED                = -112 ;
    YRfidStatus.HEX_EXPECTED                          = -113;
    YRfidStatus.prototype.HEX_EXPECTED                = -113;
    YRfidStatus.NOT_SAME_SECOR                        = -114;
    YRfidStatus.prototype.NOT_SAME_SECOR              = -114;
    YRfidStatus.MIFARE_AUTHENTICATED                  = -115;
    YRfidStatus.prototype.MIFARE_AUTHENTICATED        = -115;
    YRfidStatus.NO_DATABLOCK                          = -116;
    YRfidStatus.prototype.NO_DATABLOCK                = -116;
    YRfidStatus.KEYB_IS_READABLE                      = -117;
    YRfidStatus.prototype.KEYB_IS_READABLE            = -117;
    YRfidStatus.OPERATION_NOT_EXECUTED                = -118;
    YRfidStatus.prototype.OPERATION_NOT_EXECUTED      = -118;
    YRfidStatus.BLOK_MODE_ERROR                       = -119;
    YRfidStatus.prototype.BLOK_MODE_ERROR             = -119;
    YRfidStatus.BLOCK_NOT_WRITABLE                    = -120;
    YRfidStatus.prototype.BLOCK_NOT_WRITABLE          = -120;
    YRfidStatus.BLOCK_ACCESS_ERROR                    = -121;
    YRfidStatus.prototype.BLOCK_ACCESS_ERROR          = -121;
    YRfidStatus.BLOCK_NOT_AUTHENTICATED               = -122;
    YRfidStatus.prototype.BLOCK_NOT_AUTHENTICATED     = -122;
    YRfidStatus.ACCESS_KEY_BIT_NOT_WRITABLE           = -123;
    YRfidStatus.prototype.ACCESS_KEY_BIT_NOT_WRITABLE = -123;
    YRfidStatus.USE_KEYA_FOR_AUTH                     = -124;
    YRfidStatus.prototype.USE_KEYA_FOR_AUTH           = -124;
    YRfidStatus.USE_KEYB_FOR_AUTH                     = -125;
    YRfidStatus.prototype.USE_KEYB_FOR_AUTH           = -125;
    YRfidStatus.KEY_NOT_CHANGEABLE                    = -126;
    YRfidStatus.prototype.KEY_NOT_CHANGEABLE          = -126;
    YRfidStatus.BLOCK_TOO_HIGH                        = -127;
    YRfidStatus.prototype.BLOCK_TOO_HIGH              = -127;
    YRfidStatus.AUTH_ERR                              = -128;
    YRfidStatus.prototype.AUTH_ERR                    = -128;
    YRfidStatus.NOKEY_SELECT                          = -129;
    YRfidStatus.prototype.NOKEY_SELECT                = -129;
    YRfidStatus.CARD_NOT_SELECTED                     = -130;
    YRfidStatus.prototype.CARD_NOT_SELECTED           = -130;
    YRfidStatus.BLOCK_TO_READ_NONE                    = -131;
    YRfidStatus.prototype.BLOCK_TO_READ_NONE          = -131;
    YRfidStatus.NO_TAG                                = -132;
    YRfidStatus.prototype.NO_TAG                      = -132;
    YRfidStatus.TOO_MUCH_DATA                         = -133;
    YRfidStatus.prototype.TOO_MUCH_DATA               = -133;
    YRfidStatus.CON_NOT_SATISFIED                     = -134;
    YRfidStatus.prototype.CON_NOT_SATISFIED           = -134;
    YRfidStatus.BLOCK_IS_SPECIAL                      = -135;
    YRfidStatus.prototype.BLOCK_IS_SPECIAL            = -135;
    YRfidStatus.READ_BEYOND_ANNOUNCED_SIZE            = -136;
    YRfidStatus.prototype.READ_BEYOND_ANNOUNCED_SIZE  = -136;
    YRfidStatus.BLOCK_ZERO_IS_RESERVED                = -137;
    YRfidStatus.prototype.BLOCK_ZERO_IS_RESERVED      = -137;
    YRfidStatus.VALUE_BLOCK_BAD_FORMAT                = -138;
    YRfidStatus.prototype.VALUE_BLOCK_BAD_FORMAT      = -138;
    YRfidStatus.ISO15693_ONLY_FEATURE                 = -139;
    YRfidStatus.prototype.ISO15693_ONLY_FEATURE       = -139;
    YRfidStatus.ISO14443_ONLY_FEATURE                 = -140;
    YRfidStatus.prototype.ISO14443_ONLY_FEATURE       = -140;
    YRfidStatus.MIFARE_CLASSIC_ONLY_FEATURE           = -141;
    YRfidStatus.prototype.MIFARE_CLASSIC_ONLY_FEATURE = -141;
    YRfidStatus.BLOCK_MIGHT_BE_PROTECTED              = -142;
    YRfidStatus.prototype.BLOCK_MIGHT_BE_PROTECTED    = -142;
    YRfidStatus.NO_SUCH_BLOCK                         = -143;
    YRfidStatus.prototype.NO_SUCH_BLOCK               = -143;
    YRfidStatus.COUNT_TOO_BIG                         = -144;
    YRfidStatus.prototype.COUNT_TOO_BIG               = -144;
    YRfidStatus.UNKNOWN_MEM_SIZE                      = -145;
    YRfidStatus.prototype.UNKNOWN_MEM_SIZE            = -145;
    YRfidStatus.MORE_THAN_2BLOCKS_MIGHT_NOT_WORK      = -146;
    YRfidStatus.prototype.MORE_THAN_2BLOCKS_MIGHT_NOT_WORK = -146;
    YRfidStatus.READWRITE_NOT_SUPPORTED               = -147;
    YRfidStatus.prototype.READWRITE_NOT_SUPPORTED     = -147;
    YRfidStatus.UNEXPECTED_VICC_ID_IN_RESPONSE        = -148;
    YRfidStatus.prototype.UNEXPECTED_VICC_ID_IN_RESPONSE = -148;
    YRfidStatus.LOCKBLOCK_NOT_SUPPORTED               = -150;
    YRfidStatus.prototype.LOCKBLOCK_NOT_SUPPORTED     = -150;
    YRfidStatus.INTERNAL_ERROR_SHOULD_NEVER_HAPPEN    = -151;
    YRfidStatus.prototype.INTERNAL_ERROR_SHOULD_NEVER_HAPPEN = -151;
    YRfidStatus.INVLD_BLOCK_MODE_COMBINATION          = -152;
    YRfidStatus.prototype.INVLD_BLOCK_MODE_COMBINATION = -152;
    YRfidStatus.INVLD_ACCESS_MODE_COMBINATION         = -153;
    YRfidStatus.prototype.INVLD_ACCESS_MODE_COMBINATION = -153;
    YRfidStatus.INVALID_SIZE                          = -154;
    YRfidStatus.prototype.INVALID_SIZE                = -154;
    YRfidStatus.BAD_PASSWORD_FORMAT                   = -155;
    YRfidStatus.prototype.BAD_PASSWORD_FORMAT         = -155;
    // Methods
    YRfidStatus.prototype.get_tagId                   = YRfidStatus_get_tagId;
    YRfidStatus.prototype.tagId                       = YRfidStatus_get_tagId;
    YRfidStatus.prototype.get_errorCode               = YRfidStatus_get_errorCode;
    YRfidStatus.prototype.errorCode                   = YRfidStatus_get_errorCode;
    YRfidStatus.prototype.get_errorBlock              = YRfidStatus_get_errorBlock;
    YRfidStatus.prototype.errorBlock                  = YRfidStatus_get_errorBlock;
    YRfidStatus.prototype.get_errorMessage            = YRfidStatus_get_errorMessage;
    YRfidStatus.prototype.errorMessage                = YRfidStatus_get_errorMessage;
    YRfidStatus.prototype.get_yapiError               = YRfidStatus_get_yapiError;
    YRfidStatus.prototype.yapiError                   = YRfidStatus_get_yapiError;
    YRfidStatus.prototype.get_firstAffectedBlock      = YRfidStatus_get_firstAffectedBlock;
    YRfidStatus.prototype.firstAffectedBlock          = YRfidStatus_get_firstAffectedBlock;
    YRfidStatus.prototype.get_lastAffectedBlock       = YRfidStatus_get_lastAffectedBlock;
    YRfidStatus.prototype.lastAffectedBlock           = YRfidStatus_get_lastAffectedBlock;
    YRfidStatus.prototype.imm_init                    = YRfidStatus_imm_init;
    //--- (end of generated code: YRfidStatus initialization)
})();


//--- (generated code: YRfidOptions definitions)
//--- (end of generated code: YRfidOptions definitions)

//--- (generated code: YRfidOptions class start)
/**
 * YRfidOptions Class: Extra parameters for performing RFID tag operations
 *
 * YRfidOptions objects are used to provide optional
 * parameters to RFID commands that interact with tags, and in
 * particular to provide security keys when required.
 */
//--- (end of generated code: YRfidOptions class start)

var YRfidOptions; // definition below
(function()
{
    function _YRfidOptions()
    {
        //--- (generated code: YRfidOptions constructor)
        /**
         * Type of security key to be used to access the RFID tag.
         * For MIFARE Classic tags, allowed values are
         * Y_MIFARE_KEY_A or Y_MIFARE_KEY_B.
         * The default value is Y_NO_RFID_KEY, in that case
         * the reader will use the most common default key for the
         * tag type.
         * When a security key is required, it must be provided
         * using property HexKey.
         */
        this.KeyType                        = 0;                          // int
        /**
         * Security key to be used to access the RFID tag, as an
         * hexadecimal string. The key will only be used if you
         * also specify which type of key it is, using property
         * KeyType.
         */
        this.HexKey                         = "";                         // str
        /**
         * Force the use of single-block commands to access RFID tag memory blocks.
         * By default, the Yoctopuce library uses the most efficient access strategy
         * generally available for each tag type, but you can force the use of
         * single-block commands if the RFID tags you are using do not support
         * multi-block commands. If opération speed is not a priority, choose
         * single-block mode as it will work with any mode.
         */
        this.ForceSingleBlockAccess         = 0;                          // bool
        /**
         * Force the use of multi-block commands to access RFID tag memory blocks.
         * By default, the Yoctopuce library uses the most efficient access strategy
         * generally available for each tag type, but you can force the use of
         * multi-block commands if you know for sure that the RFID tags you are using
         * do support multi-block commands. Be  aware that even if a tag allows multi-block
         * operations, the maximum number of blocks that can be written or read at the same
         * time can be (very) limited. If the tag does not support multi-block mode
         * for the wanted opération, the option will be ignored.
         */
        this.ForceMultiBlockAccess          = 0;                          // bool
        /**
         * Enable direct access to RFID tag control blocks.
         * By default, Yoctopuce library read and write functions only work
         * on data blocks and automatically skip special blocks, as specific functions are provided
         * to configure security parameters found in control blocks.
         * If you need to access control blocks in your own way using
         * read/write functions, enable this option.  Use this option wisely,
         * as overwriting a special block migth very well irreversibly alter your
         * tag behavior.
         */
        this.EnableRawAccess                = 0;                          // bool
        /**
         * Disables the tag memory overflow test. By default, the Yoctopuce
         * library's read/write functions detect overruns and do not run
         * commands that are likely to fail. If you nevertheless wish to
         * access more memory than the tag announces, you can try to use
         * this option.
         */
        this.DisableBoundaryChecks          = 0;                          // bool
        /**
         * Enable simulation mode to check the affected block range as well
         * as access rights. When this option is active, the operation is
         * not fully applied to the RFID tag but the affected block range
         * is determined and the optional access key is tested on these blocks.
         * The access key rights are not tested though. This option applies to
         * write / configure operations only, it is ignored for read operations.
         */
        this.EnableDryRun                   = 0;                          // bool
        //--- (end of generated code: YRfidOptions constructor)
    }

    //--- (generated code: YRfidOptions implementation)

    function YRfidOptions_imm_getParams()
    {
        var opt;                    // int;
        var res;                    // str;
        if (this.ForceSingleBlockAccess) {
            opt = 1;
        } else {
            opt = 0;
        }
        if (this.ForceMultiBlockAccess) {
            opt = ((opt) | (2));
        }
        if (this.EnableRawAccess) {
            opt = ((opt) | (4));
        }
        if (this.DisableBoundaryChecks) {
            opt = ((opt) | (8));
        }
        if (this.EnableDryRun) {
            opt = ((opt) | (16));
        }
        res = "&o="+String(Math.round(opt));
        if (this.KeyType != 0) {
            res = ""+res+"&k="+('00'+(this.KeyType).toString(16)).slice(-2).toLowerCase()+":"+this.HexKey;
        }
        return res;
    }

    //--- (end of generated code: YRfidOptions implementation)

    //--- (generated code: YRfidOptions initialization)
    YRfidOptions = _YRfidOptions;
    // Constants
    YRfidOptions.NO_RFID_KEY                           = 0;
    YRfidOptions.prototype.NO_RFID_KEY                 = 0;
    YRfidOptions.MIFARE_KEY_A                          = 1;
    YRfidOptions.prototype.MIFARE_KEY_A                = 1;
    YRfidOptions.MIFARE_KEY_B                          = 2;
    YRfidOptions.prototype.MIFARE_KEY_B                = 2;
    // Methods
    YRfidOptions.prototype.imm_getParams               = YRfidOptions_imm_getParams;
    //--- (end of generated code: YRfidOptions initialization)
})();


//--- (generated code: YRfidReader return codes)
//--- (end of generated code: YRfidReader return codes)
//--- (generated code: YRfidReader definitions)
var Y_NTAGS_INVALID                 = YAPI_INVALID_UINT;
var Y_REFRESHRATE_INVALID           = YAPI_INVALID_UINT;
//--- (end of generated code: YRfidReader definitions)

function yInternalEventCallback(YRfidReader_obj, str_value)
{
    YRfidReader_obj._internalEventHandler(str_value);
}

//--- (generated code: YRfidReader class start)
/**
 * YRfidReader Class: RfidReader function interface
 *
 * The RfidReader class provides access detect,
 * read and write RFID tags.
 */
//--- (end of generated code: YRfidReader class start)

var YRfidReader; // definition below
(function()
{
    function _YRfidReader(str_func)
    {
        //--- (generated code: YRfidReader constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'RfidReader';

        this._nTags                          = Y_NTAGS_INVALID;            // UInt31
        this._refreshRate                    = Y_REFRESHRATE_INVALID;      // UInt31
        this._eventCallback                  = null;                       // YEventCallback
        this._isFirstCb                      = 0;                          // bool
        this._prevCbPos                      = 0;                          // int
        this._eventPos                       = 0;                          // int
        this._eventStamp                     = 0;                          // int
        //--- (end of generated code: YRfidReader constructor)
    }

    //--- (generated code: YRfidReader implementation)

    function YRfidReader_parseAttr(name, val, _super)
    {
        switch(name) {
        case "nTags":
            this._nTags = parseInt(val);
            return 1;
        case "refreshRate":
            this._refreshRate = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the number of RFID tags currently detected.
     *
     * @return an integer corresponding to the number of RFID tags currently detected
     *
     * On failure, throws an exception or returns YRfidReader.NTAGS_INVALID.
     */
    function YRfidReader_get_nTags()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NTAGS_INVALID;
            }
        }
        res = this._nTags;
        return res;
    }

    /**
     * Gets the number of RFID tags currently detected.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRfidReader object that invoked the callback
     *         - the result:an integer corresponding to the number of RFID tags currently detected
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRfidReader.NTAGS_INVALID.
     */
    function YRfidReader_get_nTags_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NTAGS_INVALID);
            } else {
                callback(context, obj, obj._nTags);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the tag list refresh rate, measured in Hz.
     *
     * @return an integer corresponding to the tag list refresh rate, measured in Hz
     *
     * On failure, throws an exception or returns YRfidReader.REFRESHRATE_INVALID.
     */
    function YRfidReader_get_refreshRate()
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
     * Gets the tag list refresh rate, measured in Hz.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRfidReader object that invoked the callback
     *         - the result:an integer corresponding to the tag list refresh rate, measured in Hz
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YRfidReader.REFRESHRATE_INVALID.
     */
    function YRfidReader_get_refreshRate_async(callback,context)
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
     * Changes the present tag list refresh rate, measured in Hz. The reader will do
     * its best to respect it. Note that the reader cannot detect tag arrival or removal
     * while it is  communicating with a tag.  Maximum frequency is limited to 100Hz,
     * but in real life it will be difficult to do better than 50Hz.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the present tag list refresh rate, measured in Hz
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRfidReader_set_refreshRate(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('refreshRate',rest_val);
    }

    /**
     * Retrieves a RFID reader for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RFID reader is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRfidReader.isOnline() to test if the RFID reader is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RFID reader by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the RFID reader, for instance
     *         MyDevice.rfidReader.
     *
     * @return a YRfidReader object allowing you to drive the RFID reader.
     */
    function YRfidReader_FindRfidReader(func)                   // class method
    {
        var obj;                    // YRfidReader;
        obj = YFunction._FindFromCache("RfidReader", func);
        if (obj == null) {
            obj = new YRfidReader(func);
            YFunction._AddToCache("RfidReader", func, obj);
        }
        return obj;
    }

    function YRfidReader_chkerror(tagId,json,status)
    {
        var jsonStr;                // str;
        var errCode;                // int;
        var errBlk;                 // int;
        var fab;                    // int;
        var lab;                    // int;
        var retcode;                // int;

        if ((json).length == 0) {
            errCode = this.get_errorType();
            errBlk = -1;
            fab = -1;
            lab = -1;
        } else {
            jsonStr = json;
            errCode = YAPI._atoi(this._json_get_key(json, "err"));
            errBlk = YAPI._atoi(this._json_get_key(json, "errBlk"))-1;
            if ((jsonStr).indexOf("\"fab\":") >= 0) {
                fab = YAPI._atoi(this._json_get_key(json, "fab"))-1;
                lab = YAPI._atoi(this._json_get_key(json, "lab"))-1;
            } else {
                fab = -1;
                lab = -1;
            }
        }
        status.imm_init(tagId, errCode, errBlk, fab, lab);
        retcode = status.get_yapiError();
        if (!(retcode == YAPI_SUCCESS)) {
            return this._throw(retcode,status.get_errorMessage(),retcode);
        }
        return YAPI_SUCCESS;
    }

    function YRfidReader_reset()
    {
        var json;                   // bin;
        var status;                 // YRfidStatus;
        status = new YRfidStatus();

        json = this._download("rfid.json?a=reset");
        return this._chkerror("", json, status);
    }

    /**
     * Returns the list of RFID tags currently detected by the reader.
     *
     * @return a list of strings, corresponding to each tag identifier.
     *
     * On failure, throws an exception or returns an empty list.
     */
    function YRfidReader_get_tagIdList()
    {
        var ii; // iterator
        var json;                   // bin;
        var jsonList = [];          // strArr;
        var taglist = [];           // strArr;

        json = this._download("rfid.json?a=list");
        taglist.length = 0;
        if ((json).length > 3) {
            jsonList = this._json_get_array(json);
            for (ii_0 in jsonList) {
                if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
                taglist.push(this._json_get_string(jsonList[ii_0]));
            }
        }
        return taglist;
    }

    /**
     * Retourne la description des propriétés d'un tag RFID présent.
     * Cette fonction peut causer des communications avec le tag.
     *
     * @param tagId : identifier of the tag to check
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a YRfidTagInfo object.
     *
     * On failure, throws an exception or returns an empty YRfidTagInfo objact.
     * When it happens, you can get more information from the status object.
     */
    function YRfidReader_get_tagInfo(tagId,status)
    {
        var url;                    // str;
        var json;                   // bin;
        var tagType;                // int;
        var size;                   // int;
        var usable;                 // int;
        var blksize;                // int;
        var fblk;                   // int;
        var lblk;                   // int;
        var res;                    // YRfidTagInfo;
        url = "rfid.json?a=info&t="+tagId;

        json = this._download(url);
        this._chkerror(tagId, json, status);
        tagType = YAPI._atoi(this._json_get_key(json, "type"));
        size = YAPI._atoi(this._json_get_key(json, "size"));
        usable = YAPI._atoi(this._json_get_key(json, "usable"));
        blksize = YAPI._atoi(this._json_get_key(json, "blksize"));
        fblk = YAPI._atoi(this._json_get_key(json, "fblk"));
        lblk = YAPI._atoi(this._json_get_key(json, "lblk"));
        res = new YRfidTagInfo();
        res.imm_init(tagId, tagType, size, usable, blksize, fblk, lblk);
        return res;
    }

    /**
     * Change an RFID tag configuration to prevents any further write to
     * the selected blocks. This operation is definitive and irreversible.
     * Depending on the tag type and block index, adjascent blocks may become
     * read-only as well, based on the locking granularity.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : first block to lock
     * @param nBlocks : number of blocks to lock
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    function YRfidReader_tagLockBlocks(tagId,firstBlock,nBlocks,options,status)
    {
        var optstr;                 // str;
        var url;                    // str;
        var json;                   // bin;
        optstr = options.imm_getParams();
        url = "rfid.json?a=lock&t="+tagId+"&b="+String(Math.round(firstBlock))+"&n="+String(Math.round(nBlocks))+""+optstr;

        json = this._download(url);
        return this._chkerror(tagId, json, status);
    }

    /**
     * Reads the locked state for RFID tag memory data blocks.
     * FirstBlock cannot be a special block, and any special
     * block encountered in the middle of the read operation will be
     * skipped automatically.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : number of the first block to check
     * @param nBlocks : number of blocks to check
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a list of booleans with the lock state of selected blocks
     *
     * On failure, throws an exception or returns an empty list. When it
     * happens, you can get more information from the status object.
     */
    function YRfidReader_get_tagLockState(tagId,firstBlock,nBlocks,options,status)
    {
        var optstr;                 // str;
        var url;                    // str;
        var json;                   // bin;
        var binRes;                 // bin;
        var res = [];               // boolArr;
        var idx;                    // int;
        var val;                    // int;
        var isLocked;               // bool;
        optstr = options.imm_getParams();
        url = "rfid.json?a=chkl&t="+tagId+"&b="+String(Math.round(firstBlock))+"&n="+String(Math.round(nBlocks))+""+optstr;

        json = this._download(url);
        this._chkerror(tagId, json, status);
        if (status.get_yapiError() != YAPI_SUCCESS) {
            return res;
        }
        binRes = YAPI._hexStrToBin(this._json_get_key(json, "bitmap"));
        idx = 0;
        while (idx < nBlocks) {
            val = (binRes).charCodeAt(((idx) >> (3)));
            isLocked = (((val) & (((1) << (((idx) & (7)))))) != 0);
            res.push(isLocked);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Tells which block of a RFID tag memory are special and cannot be used
     * to store user data. Mistakely writing a special block can lead to
     * an irreversible alteration of the tag.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : number of the first block to check
     * @param nBlocks : number of blocks to check
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a list of booleans with the lock state of selected blocks
     *
     * On failure, throws an exception or returns an empty list. When it
     * happens, you can get more information from the status object.
     */
    function YRfidReader_get_tagSpecialBlocks(tagId,firstBlock,nBlocks,options,status)
    {
        var optstr;                 // str;
        var url;                    // str;
        var json;                   // bin;
        var binRes;                 // bin;
        var res = [];               // boolArr;
        var idx;                    // int;
        var val;                    // int;
        var isLocked;               // bool;
        optstr = options.imm_getParams();
        url = "rfid.json?a=chks&t="+tagId+"&b="+String(Math.round(firstBlock))+"&n="+String(Math.round(nBlocks))+""+optstr;

        json = this._download(url);
        this._chkerror(tagId, json, status);
        if (status.get_yapiError() != YAPI_SUCCESS) {
            return res;
        }
        binRes = YAPI._hexStrToBin(this._json_get_key(json, "bitmap"));
        idx = 0;
        while (idx < nBlocks) {
            val = (binRes).charCodeAt(((idx) >> (3)));
            isLocked = (((val) & (((1) << (((idx) & (7)))))) != 0);
            res.push(isLocked);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from an RFID tag memory, as an hexadecimal string.
     * The read operation may span accross multiple blocks if the requested
     * number of bytes is larger than the RFID tag block size. By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use EnableRawAccess option.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where read should start
     * @param nBytes : total number of bytes to read
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return an hexadecimal string if the call succeeds.
     *
     * On failure, throws an exception or returns an empty binary buffer. When it
     * happens, you can get more information from the status object.
     */
    function YRfidReader_tagReadHex(tagId,firstBlock,nBytes,options,status)
    {
        var optstr;                 // str;
        var url;                    // str;
        var json;                   // bin;
        var hexbuf;                 // str;
        optstr = options.imm_getParams();
        url = "rfid.json?a=read&t="+tagId+"&b="+String(Math.round(firstBlock))+"&n="+String(Math.round(nBytes))+""+optstr;

        json = this._download(url);
        this._chkerror(tagId, json, status);
        if (status.get_yapiError() == YAPI_SUCCESS) {
            hexbuf = this._json_get_key(json, "res");
        } else {
            hexbuf = "";
        }
        return hexbuf;
    }

    /**
     * Reads data from an RFID tag memory, as a binary buffer. The read operation
     * may span accross multiple blocks if the requested number of bytes
     * is larger than the RFID tag block size.  By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use EnableRawAccess option.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where read should start
     * @param nBytes : total number of bytes to read
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a binary object with the data read if the call succeeds.
     *
     * On failure, throws an exception or returns an empty binary buffer. When it
     * happens, you can get more information from the status object.
     */
    function YRfidReader_tagReadBin(tagId,firstBlock,nBytes,options,status)
    {
        return YAPI._hexStrToBin(this.tagReadHex(tagId, firstBlock, nBytes, options, status));
    }

    /**
     * Reads data from an RFID tag memory, as a byte list. The read operation
     * may span accross multiple blocks if the requested number of bytes
     * is larger than the RFID tag block size.  By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use EnableRawAccess option.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where read should start
     * @param nBytes : total number of bytes to read
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a byte list with the data read if the call succeeds.
     *
     * On failure, throws an exception or returns an empty list. When it
     * happens, you can get more information from the status object.
     */
    function YRfidReader_tagReadArray(tagId,firstBlock,nBytes,options,status)
    {
        var blk;                    // bin;
        var idx;                    // int;
        var endidx;                 // int;
        var res = [];               // intArr;
        blk = this.tagReadBin(tagId, firstBlock, nBytes, options, status);
        endidx = (blk).length;
        idx = 0;
        while (idx < endidx) {
            res.push((blk).charCodeAt(idx));
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from an RFID tag memory, as a text string. The read operation
     * may span accross multiple blocks if the requested number of bytes
     * is larger than the RFID tag block size.  By default
     * firstBlock cannot be a special block, and any special block encountered
     * in the middle of the read operation will be skipped automatically.
     * If you rather want to read special blocks, use EnableRawAccess option.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where read should start
     * @param nChars : total number of characters to read
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return a text string with the data read if the call succeeds.
     *
     * On failure, throws an exception or returns an empty string. When it
     * happens, you can get more information from the status object.
     */
    function YRfidReader_tagReadStr(tagId,firstBlock,nChars,options,status)
    {
        return this.tagReadBin(tagId, firstBlock, nChars, options, status);
    }

    /**
     * Writes data provided as a binary buffer to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. If you rather want to rewrite special blocks as well,
     * use EnableRawAccess option.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param buff : the binary buffer to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    function YRfidReader_tagWriteBin(tagId,firstBlock,buff,options,status)
    {
        var optstr;                 // str;
        var hexstr;                 // str;
        var buflen;                 // int;
        var fname;                  // str;
        var json;                   // bin;
        buflen = (buff).length;
        if (buflen <= 16) {
            // short data, use an URL-based command
            hexstr = YAPI._bytesToHexStr(buff);
            return this.tagWriteHex(tagId, firstBlock, hexstr, options, status);
        } else {
            // long data, use an upload command
            optstr = options.imm_getParams();
            fname = "Rfid:t="+tagId+"&b="+String(Math.round(firstBlock))+"&n="+String(Math.round(buflen))+""+optstr;
            json = this._uploadEx(fname, buff);
            return this._chkerror(tagId, json, status);
        }
    }

    /**
     * Writes data provided as a list of bytes to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. If you rather want to rewrite special blocks as well,
     * use EnableRawAccess option.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param byteList : a list of byte to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    function YRfidReader_tagWriteArray(tagId,firstBlock,byteList,options,status)
    {
        var bufflen;                // int;
        var buff;                   // bin;
        var idx;                    // int;
        var hexb;                   // int;
        bufflen = byteList.length;
        buff = new Uint8Array(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = byteList[idx];
            buff[idx] = hexb;
            idx = idx + 1;
        }

        return this.tagWriteBin(tagId, firstBlock, buff, options, status);
    }

    /**
     * Writes data provided as an hexadecimal string to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. If you rather want to rewrite special blocks as well,
     * use EnableRawAccess option.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param hexString : a string of hexadecimal byte codes to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    function YRfidReader_tagWriteHex(tagId,firstBlock,hexString,options,status)
    {
        var bufflen;                // int;
        var optstr;                 // str;
        var url;                    // str;
        var json;                   // bin;
        var buff;                   // bin;
        var idx;                    // int;
        var hexb;                   // int;
        bufflen = (hexString).length;
        bufflen = ((bufflen) >> (1));
        if (bufflen <= 16) {
            // short data, use an URL-based command
            optstr = options.imm_getParams();
            url = "rfid.json?a=writ&t="+tagId+"&b="+String(Math.round(firstBlock))+"&w="+hexString+""+optstr;
            json = this._download(url);
            return this._chkerror(tagId, json, status);
        } else {
            // long data, use an upload command
            buff = new Uint8Array(bufflen);
            idx = 0;
            while (idx < bufflen) {
                hexb = parseInt((hexString).substr(2 * idx, 2), 16);
                buff[idx] = hexb;
                idx = idx + 1;
            }
            return this.tagWriteBin(tagId, firstBlock, buff, options, status);
        }
    }

    /**
     * Writes data provided as an ASCII string to an RFID tag memory.
     * The write operation may span accross multiple blocks if the
     * number of bytes to write is larger than the RFID tag block size.
     * By default firstBlock cannot be a special block, and any special block
     * encountered in the middle of the write operation will be skipped
     * automatically. If you rather want to rewrite special blocks as well,
     * use EnableRawAccess option.
     *
     * @param tagId : identifier of the tag to use
     * @param firstBlock : block number where write should start
     * @param text : the text string to write
     * @param options : an YRfidOptions object with the optional
     *         command execution parameters, such as security key
     *         if required
     * @param status : an RfidStatus object that will contain
     *         the detailled status of the operation
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code. When it
     * happens, you can get more information from the status object.
     */
    function YRfidReader_tagWriteStr(tagId,firstBlock,text,options,status)
    {
        var buff;                   // bin;
        buff = text;

        return this.tagWriteBin(tagId, firstBlock, buff, options, status);
    }

    /**
     * Returns a string with last tag arrival/removal events observed.
     * This method return only events that are still buffered in the device memory.
     *
     * @return a string with last events observed (one per line).
     *
     * On failure, throws an exception or returns  YAPI_INVALID_STRING.
     */
    function YRfidReader_get_lastEvents()
    {
        var content;                // bin;

        content = this._download("events.txt?pos=0");
        return content;
    }

    /**
     * Registers a callback function to be called each time that an RFID tag appears or
     * disappears. The callback is invoked only during the execution of
     * ySleep or yHandleEvents. This provides control over the time when
     * the callback is triggered. For good responsiveness, remember to call one of these
     * two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to call, or a null pointer.
     *         The callback function should take four arguments:
     *         the YRfidReader object that emitted the event, the
     *         UTC timestamp of the event, a character string describing
     *         the type of event ("+" or "-") and a character string with the
     *         RFID tag identifier.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YRfidReader_registerEventCallback(callback)
    {
        this._eventCallback = callback;
        this._isFirstCb = true;
        if (callback != null) {
            this.registerValueCallback(yInternalEventCallback);
        } else {
            this.registerValueCallback(null);
        }
        return 0;
    }

    function YRfidReader_internalEventHandler(cbVal)
    {
        var cbPos;                  // int;
        var cbDPos;                 // int;
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
        var intStamp;               // int;
        var binMStamp;              // bin;
        var msStamp;                // int;
        var evtStamp;               // float;
        var evtType;                // str;
        var evtData;                // str;
        // detect possible power cycle of the reader to clear event pointer
        cbPos = YAPI._atoi(cbVal);
        cbPos = parseInt((cbPos) / (1000));
        cbDPos = ((cbPos - this._prevCbPos) & (0x7ffff));
        this._prevCbPos = cbPos;
        if (cbDPos > 16384) {
            this._eventPos = 0;
        }
        if (!(this._eventCallback != null)) {
            return YAPI_SUCCESS;
        }
        if (this._isFirstCb) {
            // first emulated value callback caused by registerValueCallback:
            // retrieve arrivals of all tags currently present to emulate arrival
            this._isFirstCb = false;
            this._eventStamp = 0;
            content = this._download("events.txt");
            contentStr = content;
            eventArr = (contentStr).split('\n');
            arrLen = eventArr.length;
            if (!(arrLen > 0)) {
                return this._throw(YAPI_IO_ERROR,"fail to download events",YAPI_IO_ERROR);
            }
            // first element of array is the new position preceeded by '@'
            arrPos = 1;
            lenStr = eventArr[0];
            lenStr = (lenStr).substr(1, (lenStr).length-1);
            // update processed event position pointer
            this._eventPos = YAPI._atoi(lenStr);
        } else {
            // load all events since previous call
            url = "events.txt?pos="+String(Math.round(this._eventPos));
            content = this._download(url);
            contentStr = content;
            eventArr = (contentStr).split('\n');
            arrLen = eventArr.length;
            if (!(arrLen > 0)) {
                return this._throw(YAPI_IO_ERROR,"fail to download events",YAPI_IO_ERROR);
            }
            // last element of array is the new position preceeded by '@'
            arrPos = 0;
            arrLen = arrLen - 1;
            lenStr = eventArr[arrLen];
            lenStr = (lenStr).substr(1, (lenStr).length-1);
            // update processed event position pointer
            this._eventPos = YAPI._atoi(lenStr);
        }
        // now generate callbacks for each real event
        while (arrPos < arrLen) {
            eventStr = eventArr[arrPos];
            eventLen = (eventStr).length;
            typePos = (eventStr).indexOf(":")+1;
            if ((eventLen >= 14) && (typePos > 10)) {
                hexStamp = (eventStr).substr(0, 8);
                intStamp = parseInt(hexStamp, 16);
                if (intStamp >= this._eventStamp) {
                    this._eventStamp = intStamp;
                    binMStamp = (eventStr).substr(8, 2);
                    msStamp = ((binMStamp).charCodeAt(0)-64) * 32 + (binMStamp).charCodeAt(1);
                    evtStamp = intStamp + (0.001 * msStamp);
                    dataPos = (eventStr).indexOf("=")+1;
                    evtType = (eventStr).substr(typePos, 1);
                    evtData = "";
                    if (dataPos > 10) {
                        evtData = (eventStr).substr(dataPos, eventLen-dataPos);
                    }
                    if (this._eventCallback != null) {
                        this._eventCallback(this, evtStamp, evtType, evtData);
                    }
                }
            }
            arrPos = arrPos + 1;
        }
        return YAPI_SUCCESS;
    }

    /**
     * Continues the enumeration of RFID readers started using yFirstRfidReader().
     * Caution: You can't make any assumption about the returned RFID readers order.
     * If you want to find a specific a RFID reader, use RfidReader.findRfidReader()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YRfidReader object, corresponding to
     *         a RFID reader currently online, or a null pointer
     *         if there are no more RFID readers to enumerate.
     */
    function YRfidReader_nextRfidReader()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YRfidReader.FindRfidReader(next_hwid);
    }

    /**
     * Starts the enumeration of RFID readers currently accessible.
     * Use the method YRfidReader.nextRfidReader() to iterate on
     * next RFID readers.
     *
     * @return a pointer to a YRfidReader object, corresponding to
     *         the first RFID reader currently online, or a null pointer
     *         if there are none.
     */
    function YRfidReader_FirstRfidReader()
    {
        var next_hwid = YAPI.getFirstHardwareId('RfidReader');
        if(next_hwid == null) return null;
        return YRfidReader.FindRfidReader(next_hwid);
    }

    //--- (end of generated code: YRfidReader implementation)

    //--- (generated code: YRfidReader initialization)
    YRfidReader = YFunction._Subclass(_YRfidReader, {
        // Constants
        NTAGS_INVALID               : YAPI_INVALID_UINT,
        REFRESHRATE_INVALID         : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindRfidReader              : YRfidReader_FindRfidReader,
        FirstRfidReader             : YRfidReader_FirstRfidReader
    }, {
        // Methods
        get_nTags                   : YRfidReader_get_nTags,
        nTags                       : YRfidReader_get_nTags,
        get_nTags_async             : YRfidReader_get_nTags_async,
        nTags_async                 : YRfidReader_get_nTags_async,
        get_refreshRate             : YRfidReader_get_refreshRate,
        refreshRate                 : YRfidReader_get_refreshRate,
        get_refreshRate_async       : YRfidReader_get_refreshRate_async,
        refreshRate_async           : YRfidReader_get_refreshRate_async,
        set_refreshRate             : YRfidReader_set_refreshRate,
        setRefreshRate              : YRfidReader_set_refreshRate,
        _chkerror                   : YRfidReader_chkerror,
        reset                       : YRfidReader_reset,
        get_tagIdList               : YRfidReader_get_tagIdList,
        tagIdList                   : YRfidReader_get_tagIdList,
        get_tagInfo                 : YRfidReader_get_tagInfo,
        tagInfo                     : YRfidReader_get_tagInfo,
        tagLockBlocks               : YRfidReader_tagLockBlocks,
        get_tagLockState            : YRfidReader_get_tagLockState,
        tagLockState                : YRfidReader_get_tagLockState,
        get_tagSpecialBlocks        : YRfidReader_get_tagSpecialBlocks,
        tagSpecialBlocks            : YRfidReader_get_tagSpecialBlocks,
        tagReadHex                  : YRfidReader_tagReadHex,
        tagReadBin                  : YRfidReader_tagReadBin,
        tagReadArray                : YRfidReader_tagReadArray,
        tagReadStr                  : YRfidReader_tagReadStr,
        tagWriteBin                 : YRfidReader_tagWriteBin,
        tagWriteArray               : YRfidReader_tagWriteArray,
        tagWriteHex                 : YRfidReader_tagWriteHex,
        tagWriteStr                 : YRfidReader_tagWriteStr,
        get_lastEvents              : YRfidReader_get_lastEvents,
        lastEvents                  : YRfidReader_get_lastEvents,
        registerEventCallback       : YRfidReader_registerEventCallback,
        _internalEventHandler       : YRfidReader_internalEventHandler,
        nextRfidReader              : YRfidReader_nextRfidReader,
        _parseAttr                  : YRfidReader_parseAttr
    });
    //--- (end of generated code: YRfidReader initialization)
})();

//--- (generated code: YRfidReader functions)

/**
 * Retrieves a RFID reader for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the RFID reader is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YRfidReader.isOnline() to test if the RFID reader is
 * indeed online at a given time. In case of ambiguity when looking for
 * a RFID reader by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the RFID reader, for instance
 *         MyDevice.rfidReader.
 *
 * @return a YRfidReader object allowing you to drive the RFID reader.
 */
function yFindRfidReader(func)
{
    return YRfidReader.FindRfidReader(func);
}

/**
 * Starts the enumeration of RFID readers currently accessible.
 * Use the method YRfidReader.nextRfidReader() to iterate on
 * next RFID readers.
 *
 * @return a pointer to a YRfidReader object, corresponding to
 *         the first RFID reader currently online, or a null pointer
 *         if there are none.
 */
function yFirstRfidReader()
{
    return YRfidReader.FirstRfidReader();
}

//--- (end of generated code: YRfidReader functions)
