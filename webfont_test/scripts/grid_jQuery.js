// JavaScript Document
var triesUser = 0;
var triesLimit = 2;
var fdbkWrong0 = "<p>You have not made any selections.  Please try again.</p>";

//final incorrect.  It's not used
/*
var strC="";
for (i=0; i<nRows; i++) {
	col = parseInt(ansCorrect.charAt(i));
	strC =  strC +  "<li>"+ arrRowTitle[i+1] + " matches " + arrColTitle[col] +". </li>"
}
*/

var judgeInteraction = function() {
	var ch = ""; 
	var strTemp = "";
	var ansUser = "";
	//NOTE: id=r#c#;
	for (var i=1; i<=nRows; i++) {
		ch = $("input[name='row"+i+"']:checked").attr("id");
		ansUser += (ch == undefined) ? " " : ch.substr(ch.length-1, 1);
	}
	if ( ($.trim(ansUser)).length == 0 ) {
		strTemp = fdbkWrong0;
	} else {
		triesUser += 1;
		if (ansUser == ansCorrect) {
			triesUser = triesLimit;
			strTemp = fdbkCorrect;
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				for (var r=1; r<=nRows; r++) {
					$("input[name='row"+r+"']").attr("checked", function(i, value) {
						if ( parseInt(ansCorrect.charAt(r-1))-1 == i ) return "checked";
						//else return "";
					});
				}
				strTemp = fdbkWrong2;
				disableQ();
			} else {
				strTemp = fdbkWrong1;
			}
		}
	}
	showFeedback(strTemp);
}

function disableQ() {
	$("input:radio").attr("disabled", "disabled");
    $("input:radio").css("cursor", "default");
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

jQuery( function($) {
  $("#qForm").append("<table id='qTable' width='" + widthTable + "px' cellspacing='0' cellpadding='3' border=0></table>");
  myTr = "<tr><td width='" + widthCol0 + "px' class='gridFirstCell' align='center'>" + arrColTitle[0] + "</td>";
  for (j=1; j<=nCols; j++) {
	  myTr += "<td width='" + arrColWidth[j-1] + "' align='center' class='gridTop'>" + arrColTitle[j] + "</td>";
  }
  myTr += "</tr>";
  $("#qTable").append(myTr);
  
  for (i=1; i<=nRows; i++) {
	  myTr = "<tr><td class='gridLeft'>" + arrRowTitle[i] + "</td>";
	  //get rid of the punctuation at the end if there is one
	  chrTemp = arrRowTitle[i].substr(arrRowTitle[i].length-1,1);
	  if ( (chrTemp == ".") || (chrTemp == "!") || (chrTemp == "?") ) 
		  strTemp = arrRowTitle[i].substring(0, arrRowTitle[i].length-1);
	  else strTemp = arrRowTitle[i];
	  for (j=1; j<=nCols; j++) {
		  myTr += "<td align='center' valign='middle' class='gridStyle'>";
		  myTr += "<input name='row" + i + "' id='r"+i+"c"+j+"' type='radio' title='Match " + strTemp + " with " + arrColTitle[j] + ".";
		  myTr += "' tabindex='" + ((i-1)*nCols + j) + "' /></td>";
	  }
	  myTr += "</tr>";
      $("#qTable").append(myTr);
  }
  
  $("input:radio").css("cursor", "pointer");
});