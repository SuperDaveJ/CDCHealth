// JavaScript Document
// override funcs defined within the Lib
function my_PickFunc()
{
    //if (dd.obj.name == 'drag1') alert('Image1 is selected.');
	//alert("object = " + dd.obj.name + "; below = " + dd.elements.img5.getEltBelow().name);
}

function my_DragFunc()
{
}

function my_DropFunc()
{
	uCorrect = 0;
	strTemp = arrCorrect.join();
	//alert("dd.obj.getEltBelow().name = " + dd.obj.getEltBelow().name);
	switch (dd.obj.getEltBelow().name) {
		case 'target1':
			if ( strTemp.indexOf(dd.obj.name) >= 0 )
				dd.obj.moveTo(dd.elements.target1.defx, dd.elements.target1.defy);
			break;
		case 'target2':
			if ( strTemp.indexOf(dd.obj.name) >= 0 )
				dd.obj.moveTo(dd.elements.target2.defx, dd.elements.target2.defy);
			break;
		case 'target3':
			if ( strTemp.indexOf(dd.obj.name) >= 0 )
				dd.obj.moveTo(dd.elements.target3.defx, dd.elements.target3.defy);
			break;
		case 'target4':
			if ( strTemp.indexOf(dd.obj.name) >= 0 )
				dd.obj.moveTo(dd.elements.target4.defx, dd.elements.target4.defy);
			break;
		case 'target5':
			if ( strTemp.indexOf(dd.obj.name) >= 0 )
				dd.obj.moveTo(dd.elements.target5.defx, dd.elements.target5.defy);
			break;
		case 'target6':
			if ( strTemp.indexOf(dd.obj.name) >= 0 )
				dd.obj.moveTo(dd.elements.target6.defx, dd.elements.target6.defy);
			break;
		default:
			dd.obj.moveTo(dd.obj.defx, dd.obj.defy);
			break;
	}
}

function evalMatches() {
	for (var i=0; i<nObj; i++) {
		//clear previous data first
		arrUser[i] = "";
		tempX = eval("dd.elements.img"+(i+1)+".x");
		tempY = eval("dd.elements.img"+(i+1)+".y");
		tX = dd.elements.targetHolder.x;
		tY = dd.elements.targetHolder.y;
		tW = dd.elements.targetHolder.w;
		tH = dd.elements.targetHolder.h;
		if ( (tempX > tX) && (tempX < (tX + tW)) && (tempY > tY) && (tempY < (tY + tH)) ) {
			arrUser[i] = eval("dd.elements.img"+(i+1)+".name");
		}
	}
}

function disableDrag() {
	for (var i=0; i<nObj; i++) {
		eval("dd.elements.img"+(i+1)+".setDraggable(false)");
	}
}

function judgeInteraction() {
	uCorrect = 0;
	triesUser += 1;
	if (triesUser > triesLimit) return
	
	evalMatches();
	for (var i=0; i<nObj; i++) {
	 	for (var j=0; j<nCorrect; j++) {
			if (arrCorrect[j] == arrUser[i]) uCorrect += 1;
		}
	}
	if (uCorrect == nCorrect) {
		//Correct
		if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
		strTemp = fdbkCorrect;
		disableDrag();
		triesUser = triesLimit;
	} else if (uCorrect == 0) {
		triesUser -= 1;
		strTemp = "<p>You have not made any selections.  Please try again.</p>";
	} else {
		if (triesUser < triesLimit) {
			//first try
			for (var i=nCorrect+1; i<=nObj; i++) {
				//move incorrect ones back to their initial positions.
				eval("dd.elements.img" + i + ".moveTo(dd.elements.img" + i + ".defx, dd.elements.img" + i + ".defy)");
			}
			strTemp = fdbkWrong1;
		} else {
			//final try
			for (var i=nCorrect+1; i<=nObj; i++) {
				//move incorrect ones back to their initial positions.
				eval("dd.elements.img" + i + ".moveTo(dd.elements.img" + i + ".defx, dd.elements.img" + i + ".defy)");
			}
			for (var i=1; i<=nCorrect; i++) {
				//move correct one to their target positions.
				eval("dd.elements.img" + i + ".moveTo(dd.elements.target" + i + ".defx, dd.elements.target" + i +".defy)");
			}
			strTemp = fdbkWrong2;
			
			disableDrag();
		}
	}
	showFeedback(strTemp);
}
/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");