/*********************************************************************
 *
 * $Id: yocto_files.js 59977 2024-03-18 15:02:32Z mvuilleu $
 *
 * Implements yFindFiles(), the high-level API for Files functions
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
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
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

//--- (generated code: YFiles definitions)
var Y_FILESCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_FREESPACE_INVALID             = YAPI_INVALID_UINT;
//--- (end of generated code: YFiles definitions)

//--- (generated code: YFileRecord definitions)
//--- (end of generated code: YFileRecord definitions)

//--- (generated code: YFileRecord class start)
/**
 * YFileRecord Class: Description of a file on the device filesystem, returned by files.get_list
 *
 * YFileRecord objects are used to describe a file that is stored on a Yoctopuce device.
 * These objects are used in particular in conjunction with the YFiles class.
 */
//--- (end of generated code: YFileRecord class start)

var YFileRecord; // definition below
(function()
{
    function _YFileRecord(str_json)
    {
        //--- (generated code: YFileRecord constructor)
        this._name                           = "";                         // str
        this._size                           = 0;                          // int
        this._crc                            = 0;                          // int
        //--- (end of generated code: YFileRecord constructor)
        var loadval = JSON.parse(str_json);
        this._name = loadval.name;
        this._size = loadval.size;
        this._crc  = loadval.crc;
    }

    //--- (generated code: YFileRecord implementation)

    /**
     * Returns the name of the file.
     *
     * @return a string with the name of the file.
     */
    function YFileRecord_get_name()
    {
        return this._name;
    }

    /**
     * Returns the size of the file in bytes.
     *
     * @return the size of the file.
     */
    function YFileRecord_get_size()
    {
        return this._size;
    }

    /**
     * Returns the 32-bit CRC of the file content.
     *
     * @return the 32-bit CRC of the file content.
     */
    function YFileRecord_get_crc()
    {
        return this._crc;
    }

    //--- (end of generated code: YFileRecord implementation)

    //--- (generated code: YFileRecord initialization)
    YFileRecord = _YFileRecord;
    // Methods
    YFileRecord.prototype.get_name                    = YFileRecord_get_name;
    YFileRecord.prototype.name                        = YFileRecord_get_name;
    YFileRecord.prototype.get_size                    = YFileRecord_get_size;
    YFileRecord.prototype.size                        = YFileRecord_get_size;
    YFileRecord.prototype.get_crc                     = YFileRecord_get_crc;
    YFileRecord.prototype.crc                         = YFileRecord_get_crc;
    //--- (end of generated code: YFileRecord initialization)
})();


//--- (generated code: YFiles class start)
/**
 * YFiles Class: filesystem control interface, available for instance in the Yocto-Color-V2, the
 * Yocto-SPI, the YoctoHub-Ethernet or the YoctoHub-GSM-4G
 *
 * The YFiles class is used to access the filesystem embedded on
 * some Yoctopuce devices. This filesystem makes it
 * possible for instance to design a custom web UI
 * (for networked devices) or to add fonts (on display devices).
 */
//--- (end of generated code: YFiles class start)

var YFiles; // definition below
(function()
{
    function _YFiles(str_func)
    {
        //--- (generated code: YFiles constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Files';

        this._filesCount                     = Y_FILESCOUNT_INVALID;       // UInt31
        this._freeSpace                      = Y_FREESPACE_INVALID;        // UInt31
        //--- (end of generated code: YFiles constructor)
    }

    //--- (generated code: YFiles implementation)

    function YFiles_parseAttr(name, val, _super)
    {
        switch(name) {
        case "filesCount":
            this._filesCount = parseInt(val);
            return 1;
        case "freeSpace":
            this._freeSpace = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the number of files currently loaded in the filesystem.
     *
     * @return an integer corresponding to the number of files currently loaded in the filesystem
     *
     * On failure, throws an exception or returns YFiles.FILESCOUNT_INVALID.
     */
    function YFiles_get_filesCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_FILESCOUNT_INVALID;
            }
        }
        res = this._filesCount;
        return res;
    }

    /**
     * Gets the number of files currently loaded in the filesystem.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YFiles object that invoked the callback
     *         - the result:an integer corresponding to the number of files currently loaded in the filesystem
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YFiles.FILESCOUNT_INVALID.
     */
    function YFiles_get_filesCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_FILESCOUNT_INVALID);
            } else {
                callback(context, obj, obj._filesCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the free space for uploading new files to the filesystem, in bytes.
     *
     * @return an integer corresponding to the free space for uploading new files to the filesystem, in bytes
     *
     * On failure, throws an exception or returns YFiles.FREESPACE_INVALID.
     */
    function YFiles_get_freeSpace()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_FREESPACE_INVALID;
            }
        }
        res = this._freeSpace;
        return res;
    }

    /**
     * Gets the free space for uploading new files to the filesystem, in bytes.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YFiles object that invoked the callback
     *         - the result:an integer corresponding to the free space for uploading new files to the filesystem, in bytes
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns YFiles.FREESPACE_INVALID.
     */
    function YFiles_get_freeSpace_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_FREESPACE_INVALID);
            } else {
                callback(context, obj, obj._freeSpace);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a filesystem for a given identifier.
     * The identifier can be specified using several formats:
     *
     * - FunctionLogicalName
     * - ModuleSerialNumber.FunctionIdentifier
     * - ModuleSerialNumber.FunctionLogicalName
     * - ModuleLogicalName.FunctionIdentifier
     * - ModuleLogicalName.FunctionLogicalName
     *
     *
     * This function does not require that the filesystem is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFiles.isOnline() to test if the filesystem is
     * indeed online at a given time. In case of ambiguity when looking for
     * a filesystem by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * If a call to this object's is_online() method returns FALSE although
     * you are certain that the matching device is plugged, make sure that you did
     * call registerHub() at application initialization time.
     *
     * @param func : a string that uniquely characterizes the filesystem, for instance
     *         YRGBLED2.files.
     *
     * @return a YFiles object allowing you to drive the filesystem.
     */
    function YFiles_FindFiles(func)                             // class method
    {
        var obj;                    // YFiles;
        obj = YFunction._FindFromCache("Files", func);
        if (obj == null) {
            obj = new YFiles(func);
            YFunction._AddToCache("Files", func, obj);
        }
        return obj;
    }

    function YFiles_sendCommand(command)
    {
        var url;                    // str;
        url = "files.json?a="+command;

        return this._download(url);
    }

    /**
     * Reinitialize the filesystem to its clean, unfragmented, empty state.
     * All files previously uploaded are permanently lost.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YFiles_format_fs()
    {
        var json;                   // bin;
        var res;                    // str;
        json = this.sendCommand("format");
        res = this._json_get_key(json, "res");
        if (!(res == "ok")) {
            return this._throw(YAPI_IO_ERROR,"format failed",YAPI_IO_ERROR);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Returns a list of YFileRecord objects that describe files currently loaded
     * in the filesystem.
     *
     * @param pattern : an optional filter pattern, using star and question marks
     *         as wild cards. When an empty pattern is provided, all file records
     *         are returned.
     *
     * @return a list of YFileRecord objects, containing the file path
     *         and name, byte size and 32-bit CRC of the file content.
     *
     * On failure, throws an exception or returns an empty list.
     */
    function YFiles_get_list(pattern)
    {
        var ii; // iterator
        var json;                   // bin;
        var filelist = [];          // strArr;
        var res = [];               // YFileRecordArr;
        json = this.sendCommand("dir&f="+pattern);
        filelist = this._json_get_array(json);
        res.length = 0;
        for (ii_0 in filelist) {
            if(ii_0 =='indexOf') continue; // IE8 Don'tEnum bug
            res.push(new YFileRecord(filelist[ii_0]));
        }
        return res;
    }

    /**
     * Test if a file exist on the filesystem of the module.
     *
     * @param filename : the file name to test.
     *
     * @return a true if the file exist, false otherwise.
     *
     * On failure, throws an exception.
     */
    function YFiles_fileExist(filename)
    {
        var json;                   // bin;
        var filelist = [];          // strArr;
        if ((filename).length == 0) {
            return false;
        }
        json = this.sendCommand("dir&f="+filename);
        filelist = this._json_get_array(json);
        if (filelist.length > 0) {
            return true;
        }
        return false;
    }

    /**
     * Downloads the requested file and returns a binary buffer with its content.
     *
     * @param pathname : path and name of the file to download
     *
     * @return a binary buffer with the file content
     *
     * On failure, throws an exception or returns an empty content.
     */
    function YFiles_download(pathname)
    {
        return this._download(pathname);
    }

    /**
     * Uploads a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     *
     * @param pathname : path and name of the new file to create
     * @param content : binary buffer with the content to set
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YFiles_upload(pathname,content)
    {
        return this._upload(pathname, content);
    }

    /**
     * Deletes a file, given by its full path name, from the filesystem.
     * Because of filesystem fragmentation, deleting a file may not always
     * free up the whole space used by the file. However, rewriting a file
     * with the same path name will always reuse any space not freed previously.
     * If you need to ensure that no space is taken by previously deleted files,
     * you can use format_fs to fully reinitialize the filesystem.
     *
     * @param pathname : path and name of the file to remove.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YFiles_remove(pathname)
    {
        var json;                   // bin;
        var res;                    // str;
        json = this.sendCommand("del&f="+pathname);
        res  = this._json_get_key(json, "res");
        if (!(res == "ok")) {
            return this._throw(YAPI_IO_ERROR,"unable to remove file",YAPI_IO_ERROR);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Continues the enumeration of filesystems started using yFirstFiles().
     * Caution: You can't make any assumption about the returned filesystems order.
     * If you want to find a specific a filesystem, use Files.findFiles()
     * and a hardwareID or a logical name.
     *
     * @return a pointer to a YFiles object, corresponding to
     *         a filesystem currently online, or a null pointer
     *         if there are no more filesystems to enumerate.
     */
    function YFiles_nextFiles()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YFiles.FindFiles(next_hwid);
    }

    /**
     * Starts the enumeration of filesystems currently accessible.
     * Use the method YFiles.nextFiles() to iterate on
     * next filesystems.
     *
     * @return a pointer to a YFiles object, corresponding to
     *         the first filesystem currently online, or a null pointer
     *         if there are none.
     */
    function YFiles_FirstFiles()
    {
        var next_hwid = YAPI.getFirstHardwareId('Files');
        if(next_hwid == null) return null;
        return YFiles.FindFiles(next_hwid);
    }

    //--- (end of generated code: YFiles implementation)

    /**
     * Downloads the requested file and returns a binary buffer with its content.
     * This is the asynchronous version that uses a callback to pass the result
     * when the download is completed.
     *
     * @param pathname : path and name of the new file to load
     * @param callback : callback function that is invoked when the w
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YFiles object whose download_async was invoked
     *         - a binary buffer with the file content
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing.
     */
    function YFiles_download_async(pathname, callback, context)
    {
        return this._download_async(pathname, callback, context);
    }

    //--- (generated code: YFiles initialization)
    YFiles = YFunction._Subclass(_YFiles, {
        // Constants
        FILESCOUNT_INVALID          : YAPI_INVALID_UINT,
        FREESPACE_INVALID           : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindFiles                   : YFiles_FindFiles,
        FirstFiles                  : YFiles_FirstFiles
    }, {
        // Methods
        get_filesCount              : YFiles_get_filesCount,
        filesCount                  : YFiles_get_filesCount,
        get_filesCount_async        : YFiles_get_filesCount_async,
        filesCount_async            : YFiles_get_filesCount_async,
        get_freeSpace               : YFiles_get_freeSpace,
        freeSpace                   : YFiles_get_freeSpace,
        get_freeSpace_async         : YFiles_get_freeSpace_async,
        freeSpace_async             : YFiles_get_freeSpace_async,
        sendCommand                 : YFiles_sendCommand,
        format_fs                   : YFiles_format_fs,
        get_list                    : YFiles_get_list,
        list                        : YFiles_get_list,
        fileExist                   : YFiles_fileExist,
        download                    : YFiles_download,
        upload                      : YFiles_upload,
        remove                      : YFiles_remove,
        nextFiles                   : YFiles_nextFiles,
        _parseAttr                  : YFiles_parseAttr
    });
    //--- (end of generated code: YFiles initialization)
    YFiles.prototype.download_async = YFiles_download_async;
})();

//--- (generated code: YFiles functions)

/**
 * Retrieves a filesystem for a given identifier.
 * The identifier can be specified using several formats:
 *
 * - FunctionLogicalName
 * - ModuleSerialNumber.FunctionIdentifier
 * - ModuleSerialNumber.FunctionLogicalName
 * - ModuleLogicalName.FunctionIdentifier
 * - ModuleLogicalName.FunctionLogicalName
 *
 *
 * This function does not require that the filesystem is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YFiles.isOnline() to test if the filesystem is
 * indeed online at a given time. In case of ambiguity when looking for
 * a filesystem by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * If a call to this object's is_online() method returns FALSE although
 * you are certain that the matching device is plugged, make sure that you did
 * call registerHub() at application initialization time.
 *
 * @param func : a string that uniquely characterizes the filesystem, for instance
 *         YRGBLED2.files.
 *
 * @return a YFiles object allowing you to drive the filesystem.
 */
function yFindFiles(func)
{
    return YFiles.FindFiles(func);
}

/**
 * Starts the enumeration of filesystems currently accessible.
 * Use the method YFiles.nextFiles() to iterate on
 * next filesystems.
 *
 * @return a pointer to a YFiles object, corresponding to
 *         the first filesystem currently online, or a null pointer
 *         if there are none.
 */
function yFirstFiles()
{
    return YFiles.FirstFiles();
}

//--- (end of generated code: YFiles functions)
