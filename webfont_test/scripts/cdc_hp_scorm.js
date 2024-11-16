//This is a Course SCO for CDC Health Policy course
var reviewMode = false;	//change the style in content.css to hide comment links
var nLessons = 8;
var bookmark = "";
var lessonStatus = "00000000";
var courseStatus = "";
var strPagesViewed = "";
var inLMS = true;	//Remember to change this to true for delivery

function gotoPage(direction, pgURL) {
	closing = false;
	if (direction == "f") {
		if (blnLastPage) { 
			toMenu(); 
		} else if ( (isPageViewed(getPage()) != true) && (getPage().indexOf("menu") == -1) ) {
			strPagesViewed = strPagesViewed + "," + getPage();
			updateSuspendData(); 
		}
	} else if (blnLastPage) {
		updateLessonStatus('2');
	}
	window.location.href = pgURL;
}

function toMenu() {
	closing = false;
	if (blnLastPage) {
		updateLessonStatus('2');
	} else if ( getLessonStatus(getLesson()) != 2 ) {
		updateLessonStatus('1');
	}
	window.location.href = "../cdc_menu.html";
}

function getPage() {
	//return current page file name in lower case without file extension.
	var strTemp = location.href;
	var iPos1 = strTemp.lastIndexOf("/") + 1;
	var iPos2 = strTemp.lastIndexOf(".");
	return strTemp.substring(iPos1, iPos2).toLowerCase();
}

function getLesson() {
	//Returns an integer as lesson ID
	arrTemp = new Array();
	arrTemp = location.href.split("/");
	var strTemp = arrTemp[arrTemp.length-2];
	if ( strTemp.indexOf("lesson")>=0 ) {
		return parseInt(strTemp.substring(6) );
	} else {
		return 0;
	}
}

function updateLessonStatus(lesStatus) {
	getSuspendData();
	var iLes = getLesson();
	if ( iLes > 0 ) {
		lessonStatus = lessonStatus.substr(0,iLes-1) + lesStatus + lessonStatus.substr(iLes);
	}
	updateSuspendData();
	if ( lesStatus == 2 ) {
		if ( checkCourseStatus() ) { 
			doLMSSetValue("cmi.core.lesson_status", "passed"); 
		}
		cleanSuspendData();
	}
}

function getLessonStatus(iLes) {	//returns an integer 0, 1, or 2.
	//iLes is from 1 to nLessons for this course
	var intTemp;
	intTemp = parseInt(lessonStatus.substr(iLes-1,1));
	if ( (intTemp < 0) || (intTemp > 2) ) return 0;
	else return intTemp;
}

function checkCourseStatus() {
  if (inLMS == true) {
	courseStatus = doLMSGetValue( "cmi.core.lesson_status" );
	if (courseStatus == "passed") {return true;}
	getSuspendData();
	for (i=1; i<=nLessons; ++i) {
		if (getLessonStatus(i) < 2) {
			courseStatus = "incomplete";
			return false;
		}
	}
	courseStatus = "passed";
	return true;
  }
}

function initializePage() {
	closing = true;
	if (inLMS == true) { getSuspendData(); }
}

function initializeCourse() {
  if (inLMS == true) {
  	loadPage();	
	if (typeof(startDate) == "undefined") { startDate = new Date().getTime(); }
	setCookie("startTime", startDate);
	
	var entryStatus = doLMSGetValue( "cmi.core.entry" );
	if (entryStatus == "ab-initio") {
		//first time in the course
		doLMSSetValue( "cmi.suspend_data", lessonStatus + "~" + strPagesViewed );
		doLMSSetValue("cmi.core.lesson_location", "");
		doLMSSetValue( "cmi.core.lesson_status", "incomplete" ); 
		doLMSCommit();
	} else {
		//reentry
		courseStatus = doLMSGetValue( "cmi.core.lesson_status" );
		bookmark = doLMSGetValue("cmi.core.lesson_location");
		getSuspendData();
		if (courseStatus == "passed") {
			lessonStatus = "22222222";
		}
		if ( (bookmark == "301") || (bookmark == undefined) ) bookmark = "";
	}
  }
}

function exitCourse(ExitBtnClicked) {
  if (inLMS == true) {
	if (blnLastPage) { updateLessonStatus('2'); }
	startDate = getCookie("startTime");
	if (typeof(startDate) == "undefined") { startDate = 0; }
	getSuspendData();
	if (ExitBtnClicked) { closing = false; }
	if ( !exitPageStatus ) {
		if ( (courseStatus == "passed") || checkCourseStatus() ) {
			doLMSSetValue( "cmi.core.lesson_status", "passed" );	//"completed" won't work for Plateau
		} else {
			doLMSSetValue( "cmi.core.lesson_status", "incomplete" );	//incomplete
		}
		updateSuspendData();		//keep suspend data even the course is completed
		saveBookmark();			//relative path;
		doLMSCommit();
		setTimeout("unloadPage()", 500);
	}
  }
  window.close();
}
function callExitCourse() {
	//used for event handler
	if (closing) {
		exitCourse(false);
	}
}

function saveBookmark() {
  if ( inLMS == true ) {
	var strBookmark = "";

	if ( !blnLastPage && ( getPage().indexOf("menu") < 0) ) {
		strBookmark = "lesson"+ getLesson() + "/" + getPage() + ".html";
	}
	doLMSSetValue( "cmi.core.lesson_location", strBookmark);
  }
}

function isPageViewed(pageFile) {
	if ( inLMS != true ) {
		return false;
	} else {
	  pageFile = pageFile.toLowerCase()
	  var intTemp = pageFile.indexOf(".htm")
	  if (intTemp != -1) pageFile = pageFile.substring(0,intTemp)
	  var iLes = getLesson();
	  if ( getLessonStatus(iLes) == 2 ) { return true; }
	  if (typeof(strPagesViewed) == "undefined") { return false; }
	  if (strPagesViewed.indexOf(pageFile) >= 0) { return true; }
	  else { return false; }
	}
}

function getSuspendData() {
  /***** SuspendData = lessonStatus ~ strPagesViewed *****/
	if ( inLMS ) {
		strTemp = doLMSGetValue("cmi.suspend_data");
		if ( (strTemp != "") && (typeof(strTemp) != "undefined") ) {
			arrTemp = new Array();
			arrTemp = strTemp.split("~");
			lessonStatus = arrTemp[0];
			strPagesViewed = arrTemp[1];
		}
	}
	if ( (lessonStatus == "") || (lessonStatus == undefined) ) {
		lessonStatus = "00000000";
	}
}

function updateSuspendData() {
  if ( inLMS ) {
	doLMSSetValue("cmi.suspend_data", lessonStatus + "~" + strPagesViewed);
  }
}

function cleanSuspendData() {
	var strTemp = strPagesViewed.toLowerCase();
	arrTemp = strTemp.split(",");
	for (var i=1; i<=nLessons; i++) {
		if (getLessonStatus(i) == 2) {
			for (var k=0; k<arrTemp.length; k++) {
				if ( (arrTemp[k].substr(0,4)=="01_0") && (parseInt(arrTemp[k].substr(4,1))==i) ) arrTemp[k] = ""
			}
		}
	}
	strTemp = arrTemp.join();
	var re = /,{2,}/g;	//2 or more commas
	strTemp = strTemp.replace(re, ",");
	if (strTemp.substr(0,1) == ",") strTemp = strTemp.substr(1);
	//after cleaned
	strPagesViewed = strTemp;
	updateSuspendData();
}

/******************** Cookie functions ********************/
function setCookie(name, value, expire){
	//add a path to make a cookie available cross file folders
	document.cookie = name + "=" + escape(value) + ((expire == null)?"":("; expires =" + expire.toGMTString())) + "; path=/"
}

function getCookie(Name) {
	var Mysearch = Name + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(Mysearch);
		if (offset != -1){
			offset += Mysearch.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end));
		}
	}
}

function deleteCookie (name) { 
	var exp = new Date();  
	exp.setTime (exp.getTime() - 10);  
	var cookieValue = getCookie (name);  
	document.cookie = name + "=" + cookieValue + "; expires=" + exp.toGMTString();
}