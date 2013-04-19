/*********************************************************************
 *
 * yocto_button.js
 *
 * Implements yButton(), the high-level API for Button functions
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
 * 2) If you have obtained this file from any other source, you
 *    are not entitled to use it, read it or create any derived 
 *    material. You should delete this file immediately.
 *
 *********************************************************************/

if(!yAPI) throw "yAPI is not defined, please include yocto_api.js first";

//--- Constants
// enumerated values: Y_ISPRESSED_enum
var Y_ISPRESSED_FALSE = 0;
var Y_ISPRESSED_TRUE = 1;
var Y_ISPRESSED_INVALID = -1;

var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_LASTTIMEPRESSED_INVALID       = -1;
var Y_LASTTIMERELEASED_INVALID      = -1;

//--- yButton
//
// YButton Class: Button Interface
//
var yButton; // definition below
(function()
{
    function YButton_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val); 
    }

    function YButton_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval; 
        var json_val = this._setAttr('logicalName',rest_val);
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val); 
    }

    function YButton_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val); 
    }

    function YButton_get_isPressed()
    {   var json_val = this._getAttr('isPressed');
        return (json_val == null ? Y_ISPRESSED_INVALID : parseInt(json_val)>0); 
    }

    function YButton_get_lastTimePressed()
    {   var json_val = this._getAttr('lastTimePressed');
        return (json_val == null ? Y_LASTTIMEPRESSED_INVALID : parseInt(json_val)); 
    }

    function YButton_get_lastTimeReleased()
    {   var json_val = this._getAttr('lastTimeReleased');
        return (json_val == null ? Y_LASTTIMERELEASED_INVALID : parseInt(json_val)); 
    }

    function YButton_nextButton()
    {   var next_hwid = yAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return yButton(next_hwid);
    }

    function YButton(str_func)
    {
        // inherit from YFunction (=== yAPI.newFunction)
        yAPI.newFunction.call(this, 'Button', str_func);
        
        // public
        this.get_logicalName = YButton_get_logicalName;
        this.set_logicalName = YButton_set_logicalName;
        this.get_advertisedValue = YButton_get_advertisedValue;
        this.get_isPressed = YButton_get_isPressed;
        this.get_lastTimePressed = YButton_get_lastTimePressed;
        this.get_lastTimeReleased = YButton_get_lastTimeReleased;
        this.nextButton = YButton_nextButton;
    }
    
    function _yButton(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = yAPI.getFunction('Button', str_func);
        if(obj_func) return obj_func;
        return new YButton(str_func);
    }

    yButton = _yButton;
})();

function yFirstButton()
{
    return yButton(yAPI.getFirstHardwareId('Button'));
}

//--- end of yButton
