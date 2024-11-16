/* jQuery based Multiple Answer Question - C2 XZ - Sept. 2011 */
var triesUser = 0;
var triesLimit = 2;
var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");

var fdbkWrong0  = "<p>You have not made any selections.  Please try again.</p>"
 
var judgeInteraction = function() {
	var strTemp;
	
	ansUser = $("input:checkbox").map( function() {
		return (this[checked="checked"]) ? this.id : "";
	}).get().join("");
	if (ansUser == "") {
		strTemp = fdbkWrong0;
	} else {
		triesUser += 1;
		if (ansUser == strCorrectAns) {
			triesUser = triesLimit;
			//if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
			strTemp = fdbkCorrect;
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				for (var i=0; i<nItems; i++) {
					$("input:checkbox[id='" + letters[i] + "']").attr("checked", false);
				}
				for (var i=0; i<strCorrectAns.length; i++) {
					$("input:checkbox[id='" + strCorrectAns.charAt(i) + "']").attr("checked", true);
				}
				//if (parent.inQuiz) parent.quiz[qID] = 0;	//set question status
				strTemp = fdbkWrong2;
				disableQ();
			} else {
				strTemp = fdbkWrong1;
			}
		}
	}
	showFeedback(strTemp);
}
/***** If feedback will be different based some correct/none correct, use the code below ****
	var someCorrect = "";
	for (var i=0; i<ansUser.length-1; i++) {
		if (strCorrectAns.indexOf(ansUser.charAt(i)) != -1) {
			someCorrect += ansUser.charAt(i);
		}
	}
	if (someCorrect.length == 0) {
		alert("None Correct.");
	} else {
		alert("Some Correct.");
	}
*/

function disableQ() {
	$("input:checkbox").attr("disabled", "disabled");
    //$("#qTable td").css("cursor", "default");
    $("input[name='ma']").css("cursor", "default");
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

jQuery( function($) {
  //$("#qTable td").css("cursor", "pointer");
  //The line above is used for all table cells. The line below is for radio button only to match MA questions in the course
  $("input[name='ma']").css("cursor", "pointer");
});