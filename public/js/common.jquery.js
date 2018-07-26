var textInputPopInputValue = "";
var screenLockPopInputValue= "";

$(document).ready(function() {
	
	saveCurrentPage();
	
    $('.slide_li').on('click', function(){
    	if(isScreenLockRunning() != "true" || isScreenLockTimeOver() != "true"){
	    	$(this).next().slideToggle('slow', function() {
	            // 객체가 다 펼치지거나 접히고 나면 여기에 든 내용이 실행된다.
	          });
    	}
    });
    
	$('#header > a').on('click', function(){
		var headerButton = $(this).attr('class');
		var currentFileName = location.href.split("/").slice(-1).toString();
		
		if(isScreenLockRunning() != "true" || isScreenLockTimeOver() != "true"){
			
			if(headerButton == "prev"){
				
				if(currentFileName == "record.html"){		
					MDHUtil_record_player_finish();
				}
				MoveToPreviousPage();
				
			}else if(headerButton == "home"){
				
				 if(currentFileName == "record.html"){		
						MDHUtil_record_player_finish();
				 }
				
				$(this).attr('href',"../index.html");
				
			}else{}
		}
	});
	
	console.log('isDeviceMode : '+isDeviceMode);
	
	if(isDeviceMode){
		//Set Back Key event to ALL(this line must be located upper side of removeListener)
		MDHBasic.Event.addListener("backKey", setBackKeyEvent);
	}
	
});

function saveCurrentPage(){
		
	if(sessionStorage.PageHistory == undefined){
		var currentPage = [];	
		currentPage.push(location.href);		
		sessionStorage.PageHistory = currentPage;
		
		//alert("Start = " + sessionStorage.PageHistory);
		
	}else{		
		var pageHistory = sessionStorage.PageHistory.split(',');
		pageHistory.push(location.href);
		sessionStorage.PageHistory = pageHistory;
		
		//alert("Normal = " + sessionStorage.PageHistory);
	}
}

function MoveToPreviousPage(){
	var pageHistory = sessionStorage.PageHistory.split(',');
	pageHistory.pop();
	var previousPage = pageHistory.pop();
	
	 window.location.href = previousPage;
	 sessionStorage.PageHistory = pageHistory;
}

function setBackKeyEvent() {	
	var currentFileName = location.href.split("/").slice(-1).toString();
	console.log('setBackKeyEvent currentFileName : '+currentFileName);
	
	var isFailShow = $('#fail_popup').is(':visible');
	var isSuccessShow = $('#success_popup').is(':visible');
	var isTextInputShow = $('#text_input_popup').is(':visible');
	var isMyOfficeLockScreenShow = $('#lock_screen_popup_myoffice').is(':visible');
	var isLockScreenShow = $('#lock_screen_popup').is(':visible');
	var isDatePickerShow = $('#datepicker_container').is(':visible');
	var isOpenSourceShow = $('#id_openSourcePage').is(':visible');	
	
	console.log('setBackKeyEvent isFailShow : '+isFailShow);
	console.log('setBackKeyEvent isSuccessShow : '+isSuccessShow);
	console.log('setBackKeyEvent isTextInputShow : '+isTextInputShow);
	console.log('setBackKeyEvent isMyOfficeLockScreenShow : '+isMyOfficeLockScreenShow);
	console.log('setBackKeyEvent isLockScreenShow : '+isLockScreenShow);
	console.log('setBackKeyEvent isOpenSourceShow : '+isOpenSourceShow);
	console.log('setBackKeyEvent isDatePickerShow : '+isDatePickerShow);

	
	if(isFailShow || isSuccessShow || isTextInputShow || isMyOfficeLockScreenShow || isOpenSourceShow){		
		$('#container').css('overflow', 'inherit');
		$('#success_popup').hide();
		$('#fail_popup').hide();
		$('#text_input_popup').hide();
		$('#lock_screen_popup_myoffice').hide();
		$('#id_openSourcePage').hide();	
		
	}else if(isLockScreenShow){
		$('#container').css('overflow', 'inherit');
		$('#lock_screen_popup').hide();
		
	}else if(currentFileName == "index.html"){		
		MDHUtil.Browser.terminateApp();
		
	}else if(isDatePickerShow){
    	cancelSelectedDate();
    }else{
		
		if(isScreenLockRunning() == "true" && isScreenLockTimeOver() == "true"){
			showLockScreen();			
		}else{
			 if(currentFileName == "record.html"){		
					MDHUtil_record_player_finish();
			 }
			 MoveToPreviousPage();
		}		
	}
};

function setPopUpClickEvent(){
	$('#popup_confirm_success').on('click', function(){			
		$('#container').css('overflow', 'inherit');
		$('#success_popup').hide();
		
		afterSuccessPopUpConfirmClick();	
	});
	
	$('#popup_confirm_fail').on('click', function(){		
		$('#container').css('overflow', 'inherit');		
		$('#fail_popup').hide();
		
		afterFailPopUpConfirmClick();
	});
	
	$('#popup_confirm_input_text').on('click', function(){		
		$('#container').css('overflow', 'inherit');		
		textInputPopInputValue = $('#inputText').val();
		$('#text_input_popup').hide();
		
		//Must declare this function in each JS
		afterTextInputPopUpConfirmClick();		
	});
	
	$('#popup_confirm_screenlock_myoffice').on('click', function(){		
		$('#container').css('overflow', 'inherit');	
		screenLockPopInputValue = $('#inputText_myoffice').val();
		$('#lock_screen_popup_myoffice').hide();
		
		//Must declare this function in each JS
		afterLockScreenPopUpConfirmClick();
	});
	
	$('#popup_calcel_screenlock_myoffice').on('click', function(){		
		$('#container').css('overflow', 'inherit');		
		$('#lock_screen_popup_myoffice').hide();
	});
	
	$('#popup_confirm_screenlock').on('click', function(){		
		screenLockPopInputValue = $('#inputText').val();
		
		if(screenLockPopInputValue ==""){
			$('#container').css('overflow', 'inherit');	
			$('#lock_screen_popup').hide();			
			showFailPopUp("Error", "Input Password<br>(Type Anything)")
			
		}else{
			$('#container').css('overflow', 'inherit');	
			$('#lock_screen_popup').hide();
			refreshLockScreenTimeStamp();
		}
		
	});
	
	$('#popup_calcel_screenlock').on('click', function(){		
		$('#container').css('overflow', 'inherit');		
		$('#lock_screen_popup').hide();		
	});
}

function showSuccessPopUp(head , msg){	
	
	var isSuccessShow = $('#success_popup').is(':visible');
	
	//Already show Popup case
	if(isSuccessShow){
		
		if(head != ""){
			$('#successPop_head').html(head);
		}else{
			$('#successPop_head').html("Result");
		}		
		$('#successPop_msg').html(msg);
		
	}else{
		
		$('#id_success_pop').load("../html/success_popup.html","", function() {
			
			if(head != ""){
				$('#successPop_head').html(head);
			}else{
				$('#successPop_head').html("Result");
			}		
			$('#successPop_msg').html(msg);		
			//Block Background dim area Scrolling
			//$('#container').css('overflow', 'hidden');		
			$('.dim').on('scroll touchmove', function(e){
				  e.preventDefault();
				  e.stopPropagation();
				  return false;
			});
			//setConfirm button Event
			setPopUpClickEvent();
			$('#success_popup').show();
		});
	}
}

function showFailPopUp(head , msg){	
	var isFailShow = $('#fail_popup').is(':visible');	
	
	//Already show Popup case
	if(isFailShow){
		
		if(head != ""){
			$('#failPop_head').html(head);
		}else{
			$('#failPop_head').html("Result");
		}		
		$('#failPop_msg').html(msg);
		
	}else{
		
		var path="";
		
		if(location.href.split("/").slice(-1).toString() == "index.html")
		{
			path = "html/fail_popup.html";
		}else{
			path = "../html/fail_popup.html";
		}
		
		$('#id_fail_pop').load(path,"", function() {
			
			if(head != ""){
				$('#failPop_head').html(head);
			}else{
				$('#failPop_head').html("Error");
			}
			
			$('#failPop_msg').html(msg);
			//Block Background dim area Scrolling
			//$('#container').css('overflow', 'hidden');
			$('.dim').on('scroll touchmove', function(e){
				  e.preventDefault();
				  e.stopPropagation();
				  return false;
			});
			setPopUpClickEvent();
			$('#fail_popup').show();
		});
	}
}

function showTextInputPopUp(head , msg){
	var isFailShow = $('#text_input_popup').is(':visible');	
	
	//Already show Popup case
	if(isFailShow){
		
		if(head != ""){
			$('#textInputPop_head').html(head);
		}else{
			$('#textInputPop_head').html("Result");
		}		
		$('#textInputPop_msg').html(msg);
		
	}else{
		$('#id_text_input_pop').load("../html/text_input_popup.html","", function() {
			
			if(head != ""){
				$('#textInputPop_head').html(head);
			}else{
				$('#textInputPop_head').html("Error");
			}
			
			$('#textInputPop_msg').html(msg);
			//Block Background dim area Scrolling
			//$('#container').css('overflow', 'hidden');
			$('.dim').on('scroll touchmove', function(e){
				  e.preventDefault();
				  e.stopPropagation();
				  return false;
			});
			setPopUpClickEvent();
			$('#text_input_popup').show();
		});
	}
}

function showLockScreenForMyOfficeTest(){
	var isLockScreenShow = $('#lock_screen_popup_myoffice').is(':visible');	
	
	//Already show Popup case
	if(!isLockScreenShow){
	    $('#id_screen_lock_myoffice').load("../html/lockscreen_myoffice.html","", function() {		
		
		//Block Background dim area Scrolling
		//$('#container').css('overflow', 'hidden');
	    	$('.dim').on('scroll touchmove', function(e){
				  e.preventDefault();
				  e.stopPropagation();
				  return false;
			});	
		setPopUpClickEvent();
		$('#lock_screen_popup_myoffice').show();
		});
	}
}
	
	function showLockScreen(){
		var isLockScreenShow = $('#lock_screen_popup').is(':visible');	
		var path="";
		
		//Already show Popup case
		if(!isLockScreenShow){
			//alert("showLockScreen");
			if(location.href.split("/").slice(-1).toString() == "index.html")
			{
				path = "html/lockscreen.html";
			}else{
				path = "../html/lockscreen.html";
			}
			
		    $('#id_screen_lock').load(path,"", function() {		
			
			//Block Background dim area Scrolling
			//$('#container').css('overflow', 'hidden');
		    $('.dim').on('scroll touchmove', function(e){
					  e.preventDefault();
					  e.stopPropagation();
					  return false;
			}); 	
			setPopUpClickEvent();
			$('#lock_screen_popup').show();
		});		
	}
}
	


//**********For LockScreen Start***********
	
document.addEventListener("keypress", function(e){
	//Keyboard NextButton
	if(e.which == 13) {		
	
		 if($('#lock_screen_popup_myoffice').is(':visible')){
			 
			 $('#container').css('overflow', 'inherit');	
			 screenLockPopInputValue = $('#inputText_myoffice').val();
			 $('#lock_screen_popup_myoffice').hide();    		
			 afterLockScreenPopUpConfirmClick();
		  }		 
   	 
		 if($('#lock_screen_popup').is(':visible')){
			 
			 screenLockPopInputValue = $('#inputText').val();
			 
			 if(screenLockPopInputValue ==""){
				$('#container').css('overflow', 'inherit');	
				$('#lock_screen_popup').hide();			
				showFailPopUp("Error", "Input Password<br>(Type Anything)")
				
			 }else{
				 
				$('#container').css('overflow', 'inherit');	
				$('#lock_screen_popup').hide();
				refreshLockScreenTimeStamp();
			 }		
   	 	 }
	}
});
	
//Catch All Click Event For Lock Screen
document.addEventListener("click",function(event){
	//Check LockScreen 
	if(isScreenLockRunning() == "true" && isScreenLockTimeOver() == "true"){		
		var targetId= event.target.id;
		//block LockScreen button Event
		if(targetId != "popup_calcel_screenlock" && targetId != "popup_confirm_screenlock"){			
			showLockScreen();
			event.preventDefault();
		}
		
		return;
	}
	
},false);

function setScreenLockInfo(isRunning , interval)
{
	localStorage.isLockScreenRunning = isRunning;
	localStorage.lockScreenInterval = interval;
	localStorage.lockScreenTimeStamp = new Date().getTime();
}

function isScreenLockRunning()
{	
	if(localStorage.isLockScreenRunning == "true"){	
		
		console.log("Lock Screen is Running ");
		return "true";	
		
	}
	console.log("Lock Screen is Not Running ");
	return "false";
}

function refreshLockScreenTimeStamp(){
	
	localStorage.lockScreenTimeStamp = new Date().getTime();
}

function isScreenLockTimeOver(){
	
	var timeGap = new Date().getTime() - localStorage.lockScreenTimeStamp;
	
	console.log("Lock Screen timegap = " + timeGap);
	console.log("Lock Screen localStorage.lockScreenInterval(MIN) = " + localStorage.lockScreenInterval);
	console.log("Lock Screen localStorage.lockScreenInterval(MilliSecond) = " + localStorage.lockScreenInterval * 1000 * 60);
	
	if(timeGap >= (localStorage.lockScreenInterval * 1000 * 60)){
		console.log("Lock Screen timeGap >= localStorage.lockScreenInterval ");
		return "true";
	}else{
		console.log("Lock Screen timeGap < localStorage.lockScreenInterval ");
		localStorage.lockScreenTimeStamp = new Date().getTime();			
	}
		
	return "false";
}

function clearScreenLockInfo()
{
	localStorage.isLockScreenRunning = "false";
	localStorage.lockScreenInterval = 0;
	localStorage.lockScreenTimeStamp = 0;
}

//**********For LockScreen End***********

