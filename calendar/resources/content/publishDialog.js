/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is OEone Calendar Code, released October 31st, 2001.
 *
 * The Initial Developer of the Original Code is
 * OEone Corporation.
 * Portions created by the Initial Developer are Copyright (C) 2001
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s): Garth Smedley <garths@oeone.com>
 *                 Mike Potter <mikep@oeone.com>
 *                 Colin Phillips <colinp@oeone.com> 
 *                 Chris Charabaruk <ccharabaruk@meldstar.com>
 *                 ArentJan Banck <ajbanck@planet.nl>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



/***** calendar/calendarEventDialog.js
* AUTHOR
*   Garth Smedley
* REQUIRED INCLUDES 
*   <script type="application/x-javascript" src="chrome://calendar/content/dateUtils.js"/>
*   <script type="application/x-javascript" src="chrome://calendar/content/calendarEvent.js"/>
*
* NOTES
*   Code for the calendar's new/edit event dialog.
*
*  Invoke this dialog to create a new event as follows:

   var args = new Object();
   args.mode = "new";               // "new" or "edit"
   args.onOk = <function>;          // funtion to call when OK is clicked
   args.calendarEvent = calendarEvent;    // newly creatd calendar event to be editted
    
   calendar.openDialog("caNewEvent", "chrome://calendar/content/calendarEventDialog.xul", true, args );
*
*  Invoke this dialog to edit an existing event as follows:
*
   var args = new Object();
   args.mode = "edit";                    // "new" or "edit"
   args.onOk = <function>;                // funtion to call when OK is clicked
   args.calendarEvent = calendarEvent;    // javascript object containin the event to be editted

* When the user clicks OK the onOk function will be called with a calendar event object.
*
*  
* IMPLEMENTATION NOTES 
**********
*/


/*-----------------------------------------------------------------
*   W I N D O W      V A R I A B L E S
*/


var gOnOkFunction;   // function to be called when user clicks OK

/*-----------------------------------------------------------------
*   W I N D O W      F U N C T I O N S
*/

/**
*   Called when the dialog is loaded.
*/

function loadCalendarPublishDialog()
{
   // Get arguments, see description at top of file
   
   var args = window.arguments[0];
   
   gOnOkFunction = args.onOk;
   
   //get default values from the prefs
   document.getElementById( "publish-url-textbox" ).value = opener.getCharPref( opener.gCalendarWindow.calendarPreferences.calendarPref, "publish.path", "" );
   document.getElementById( "publish-remotefilename-textbox" ).value = opener.getCharPref( opener.gCalendarWindow.calendarPreferences.calendarPref, "publish.filename", "" );
   document.getElementById( "publish-username-textbox" ).value = opener.getCharPref( opener.gCalendarWindow.calendarPreferences.calendarPref, "publish.username", "" );
   document.getElementById( "publish-password-textbox" ).value = opener.getCharPref( opener.gCalendarWindow.calendarPreferences.calendarPref, "publish.password", "" );

   var firstFocus = document.getElementById( "publish-url-textbox" );
   firstFocus.focus();
}



/**
*   Called when the OK button is clicked.
*/

function onOKCommand()
{
   var CalendarPublishObject = new Object();

   CalendarPublishObject.url = document.getElementById( "publish-url-textbox" ).value;
   CalendarPublishObject.remotePath = document.getElementById( "publish-remotefilename-textbox" ).value;
   CalendarPublishObject.username = document.getElementById( "publish-username-textbox" ).value;
   CalendarPublishObject.password = document.getElementById( "publish-password-textbox" ).value;

   // call caller's on OK function
   gOnOkFunction( CalendarPublishObject );
      
   // tell standard dialog stuff to close the dialog
   return true;
}


