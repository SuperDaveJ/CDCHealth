// JavaScript Document
fdbkWrong0 = "You have not made any selections.  Please try again.";

function evalMatches() {
	for (var i=0; i<nObj; i++) {
		arrUser[i] = eval("dd.elements.drag"+(i+1)+".getEltBelow().name");
	}
}

function disableDrag() {
	for (var i=0; i<nObj; i++) {
		//The del() function below moves draggable items back to their original position
		//eval("dd.elements.drag"+(i+1)+".del()");
		eval("dd.elements.drag"+(i+1)+".setDraggable(false)");
	}
}

function judgeInteraction() {
	intUserCorrect = 0;
	triesUser += 1;
	strFdbk = ""
	
	if (triesUser <= triesLimit) {
		//Check to see if any object are moved
		nNotMoved = 0;
		for (var i=0; i<nObj; i++) {
			if ( eval("dd.elements.drag"+(i+1)+".x") == eval("dd.elements.drag"+(i+1)+".defx") && eval("dd.elements.drag"+(i+1)+".y") == eval("dd.elements.drag"+(i+1)+".defy") ) {
				nNotMoved += 1;
			}
		}

		if (nNotMoved == nObj) {
			strFdbk = fdbkWrong0;
			triesUser -= 1;
		} else {
			evalMatches();
			for (var i=0; i<nObj; i++) {
				if (arrUser[i] == arrCorrect[i]) intUserCorrect += 1;
			}
			if (intUserCorrect == nObj) {
				//Correct
				triesUser = triesLimit;
				strFdbk = fdbkCorrect;
				disableDrag();
			} else {
				if (triesUser != triesLimit) {
					//Not final try. Move incorrect ones back.
					for (var i=0; i<nObj; i++) {
						if (arrUser[i] != arrCorrect[i]) {
							eval("dd.elements.drag"+(i+1)+".moveTo(dd.elements.drag"+(i+1)+".defx, dd.elements.drag"+(i+1)+".defy)");
						}
					}
					//alert("Not quite! You got " + intUserCorrect + " correct. Try again.");
					strFdbk = fdbkWrong1;
				} else {
					//Final try. Show correct matches.
					for (var i=0; i<nObj; i++) {
						if (arrUser[i] != arrCorrect[i]) {
							eval("dd.elements.drag"+(i+1)+".moveTo(dd.elements."+arrCorrect[i]+".defx, dd.elements."+arrCorrect[i]+".defy)");
						}
					}
					//alert("Not quite! You got " + intUserCorrect + " correct. The correct matches are now displayed.");
					strFdbk = fdbkWrong2;
					disableDrag();
				}
			}
		}
		showFeedback("<p class='fdbkText'>" + strFdbk + "</p>");
	}
}

// override funcs defined within the Lib
function my_PickFunc()
{
    //if (dd.obj.name == 'drag1') alert('Image1 is selected.');
}

function my_DragFunc()
{
}

function my_DropFunc()
{
	//This function puts the dragged object either to the target or pull back to its original place.
	strTemp = dd.obj.name;
	
	switch (dd.obj.getEltBelow().name) {
		case 'target1':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target1.defx, dd.elements.target1.defy);
			break;
		case 'target2':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target2.defx, dd.elements.target2.defy);
			break;
		case 'target3':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target3.defx, dd.elements.target3.defy);
			break;
		case 'target4':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target4.defx, dd.elements.target4.defy);
			break;
		case 'target5':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target5.defx, dd.elements.target5.defy);
			break;
		case 'target6':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target6.defx, dd.elements.target6.defy);
			break;
		case 'target7':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target7.defx, dd.elements.target7.defy);
			break;
		case 'target8':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target8.defx, dd.elements.target8.defy);
			break;
		case 'target9':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target9.defx, dd.elements.target9.defy);
			break;
		case 'target10':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target10.defx, dd.elements.target10.defy);
			break;
		case 'target11':
			if ( strTemp.indexOf("drag") >= 0 )
				dd.obj.moveTo(dd.elements.target11.defx, dd.elements.target11.defy);
			break;
		default:
			dd.obj.moveTo(dd.obj.defx, dd.obj.defy);
			break;
	}
}
