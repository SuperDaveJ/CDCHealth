var flashID = "";
var hasAudio = false;
var blnLastPage = false;
var enableNext = true;
var enableBack = true;
var closing = true;
var secondAudio = false;

function exitConfirm(){
	if (confirm("Do you wish to exit the course?")==true) {
		exitCourse(true);
	}
}

function goNext() {
	gotoPage("f", nextURL);
	return false;
}

function goBack() {
	gotoPage("b", backURL);
	return false;
}

function goMenu() {
	toMenu();
	return false;
}

function show508version( pgURL ) {
	closing = false;
	window.location.href = pgURL;
}

/*********************** Audio Functions **********************************/
function getFlashMovie(movieName) { 
	if (window.document[movieName]) {	//IE
		return window.document[movieName];
	}
	if (navigator.appName.indexOf("Microsoft Internet") == -1) { 	//Not IE
		if (document.embeds && document.embeds[movieName]) {	//Firefox, Opera, etc.
      		return document.embeds[movieName]; 
  		} else {	//
    		return document.getElementById(movieName);
		}
  	}
}  

// Audio controls are modified when a second audio is introduced to a page
function play(FlashID) {
	if ( secondAudio ) {
		getFlashMovie("expert").Play();
	} else {
		getFlashMovie("FlashID").Play();
	}
}

function pause(FlashID) {
	if ( secondAudio ) {
		getFlashMovie("expert").StopPlay();
	} else {
		getFlashMovie("FlashID").StopPlay();
	}
}

function rewind() {
	if ( secondAudio ) {
	  getFlashMovie("expert").Rewind()//
	  if (audioOn) {
		  //play it only if the audio is ON
		  getFlashMovie("expert").Play();
	  }
	} else {
	  getFlashMovie("FlashID").Rewind()//
	  if (audioOn) {
		  //play it only if the audio is ON
		  getFlashMovie("FlashID").Play();
	  }
	}
}

function toggleAudio() {
	var fID;

	if ( arguments.length > 0 ) {
		fID = "expert";
		//if (getFlashMovie("FlashID").IsPlaying() ) { pause("FlashID"); }
		secondAudio = true;
	} else {
		fID = "FlashID";
	}
	if (audioOn) {
		audioOn = false;
		pause(fID);
		document.getElementById('audiotoggle').src = '../sysimages/audio_pause_0.png';
		document.getElementById('audiotoggle').alt = 'play audio';
		document.getElementById('audio').title = 'play audio';
	} else {
		audioOn = true;
		play(fID);
		document.getElementById('audiotoggle').src = '../sysimages/audio_play_0.png';
		document.getElementById('audiotoggle').alt = 'pause audio';
		document.getElementById('audio').title = 'pause audio';
	}
}

function mOver() {
	if (audioOn) {
		document.getElementById('audiotoggle').src = '../sysimages/audio_play_2.png';
	} else {
		document.getElementById('audiotoggle').src = '../sysimages/audio_pause_2.png';
	}
}

function mOut() {
	if (audioOn) {
		document.getElementById('audiotoggle').src = '../sysimages/audio_play_0.png';
	} else {
		document.getElementById('audiotoggle').src = '../sysimages/audio_pause_0.png';
	}
}
/*********************** End of Audio Functions **********************************/

/*********************** Open Popup Functions **********************************/
function openWinCentered(myUrl, myTitle, myWidth, myHeight, scrollbar, resize ) {
	// open the window
	positionTop = (screen.height - myHeight)/2 - 25;
	positionLeft = (screen.width - myWidth)/2 - 5;
	newWin = window.open (myUrl,myTitle,"toolbar=no,location=no,width="+myWidth+",height="+myHeight+",menubar=no,resizable="+resize+",status=no,scrollbars="+scrollbar+",top="+positionTop+",left="+positionLeft+"");
	if (window.focus) newWin.focus();
	return newWin;
}

function refreshPage() {
	closing = false;
	window.location.reload();
}

function openHelp() {
openWinCentered("../resources/Help.html", "Help", 910, 530, "no", "no");	//window.open("../resources/CDC_PolicyAnalysisHelpPage_DraftCW.pdf", "Help");
}

function openGlossary() {
	openWinCentered("../resources/glossary.html", "Glossary", 910, 530, "no", "no");
}

function openResources() {
	lesNum = getLesson();
	if ( (lesNum == 1) || (lesNum == 8) ) {
	  alert("There are no resources for this lesson.");
	} else {
	  resPath = "../resources/resources_lesson" + lesNum + ".html";
	  openWinCentered(resPath, "Resources", 910, 530, "no", "no");
	}
}

function show_cc() {
	if ( arguments.length > 0 ) {
		filename = "../generic_cc.html";
	} else {
		filename = getPage() + "_cc.html";
	}
	openWinCentered( filename, "AudioTranscript", 543, 321, "no", "yes" );
}

function showPopup(iTerm) {
    filename = getPage() + "_pop.html?popterm=" + iTerm;
    openWinCentered( filename, "popupText", 910, 530, "no", "yes" );
}
/*********************** End of Open Popup Functions **********************************/

/********************** Question Feedback *************************/
function showFeedback(fdbkText) {
	if (triesUser == triesLimit) {
		$("#next").css("display", "block");
		//There is no submit button for drag to trash can.
		if ($("#submit").length > 0) $("#submit").hide();
	}

	document.getElementById('fdbkTxt').innerHTML = fdbkText;
	document.getElementById('feedback').style.display = 'block';	
	document.getElementById('feedback').focus();	
}
/********************** End of Question Feedback *************************/

if ( inLMS == true ) {
	window.onunload = callExitCourse;
	//window.onbeforeunload = callExitCourse;
	initializePage();
}

$(document).ready(function () {
    $("#next").on("click", goNext);
    $("#back").on("click", goBack);
	$("#refresh").on("click", refreshPage);
    $("#menu").on("click", goMenu);
    $("#resources").on("click", openResources);
    $("#glossary").on("click", openGlossary);
	$("#help").on("click", openHelp);
    $("#exit").on("click", exitConfirm);
	if (hasAudio) {$("#audioAndCC").show(); audioOn=true;} else {$("#audioAndCC").hide(); audioOn=false;}
    if (!enableNext) $("#next").addClass("disabled");
    if (!enableBack) $("#back").addClass("disabled");
	$("img").attr("title", function() { return this.alt; } );
	$("#audio").on("mouseover", mOver);
	$("#audio").on("mouseout", mOut);
	$("a").each(function() {
	  if ( ($(this).attr("rel") != undefined) && ($(this).attr("rel").search("shadowbox") != -1) ) { 
		  $(this).click( function () {
			  $(this).addClass("sb_visited");
		  });
	  }
	});
});
