/**
* Insert a tab at the current text position in a textarea
* Jan Dittmer, jdittmer@ppp0.net, 2005-05-28
* Inspired by http://www.forum4designers.com/archive22-2004-9-127735.html
* Tested on: 
*   Mozilla Firefox 1.0.3 (Linux)
*   Mozilla 1.7.8 (Linux)
*   Epiphany 1.4.8 (Linux)
*   Internet Explorer 6.0 (Linux)
* Does not work in: 
*   Konqueror (no tab inserted, but focus stays)
*
* Stop the scrollbar jumping to the top (Firefox)
* Gabor Feher, feher_g@freemail.hu, 2005-07-31
* Inspired by: http://www.alexking.org/blog/2003/06/02/inserting-at-the-cursor-using-javascript/#comment-2975
* Tested on:
*   Mozilla Firefox 1.0.6 (Linux)
*/
/**
example usage:
<textarea onkeydown="return insertTab(event,this);" 
	  onkeyup="return insertTab(event,this);" 
	  onkeypress="return insertTab(event,this);" 
	  rows="30" cols="80">
</textarea>
*/
function insertTab(event,obj) {
	var tabKeyCode = 9;
	if (event.which) // mozilla
		var keycode = event.which;
	else // ie
		var keycode = event.keyCode;
	if (keycode == tabKeyCode) {
		if (event.type == "keydown") {
			if (obj.setSelectionRange) {
				// mozilla
				scrollTop = obj.scrollTop; //save scrollbar pos
				var s = obj.selectionStart;
				var e = obj.selectionEnd;
				obj.value = obj.value.substring(0, s) + 
					"\t" + obj.value.substr(e);
				obj.setSelectionRange(s + 1, s + 1);
				obj.focus();
				obj.scrollTop = scrollTop; //restore scrollbar pos
				
			} else if (obj.createTextRange) {
				// ie
				document.selection.createRange().text="\t"
				obj.onblur = function() { this.focus(); this.onblur = null; };
			} else {
				// unsupported browsers
			}
		}
		if (event.returnValue) // ie ?
			event.returnValue = false;
		if (event.preventDefault) // dom
			event.preventDefault();
		return false; // should work in all browsers
	}
	return true;
}

/*
scrollbar position storing capabilities (F.G.)
*/

function submit_scrollPos() {
	txt_obj = document.getElementById("txt_area");
        pos_field = document.getElementById("txt_scrollPos");

	pos_field.value = txt_obj.scrollTop;
	return true;
}

function setScroll(txt_scrollPos) {
        txt_obj =  document.getElementById("txt_area");
	txt_obj.scrollTop = txt_scrollPos;
}
