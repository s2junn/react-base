
var keyUpHour = 0;
var keyUpMinute = 0;

$(document).ready(function() {
	
	if(isDeviceMode){
		getAccountsForSPlanner();
	}
	
	$('.account span').html("내 캘린더");
	setTodayDate();
	
	keyUpHour = startHour;
	keyUpMinute = startMinute;
	
	$('#datepicker_container').load("datepicker.html","", function() {
		setTimePickerKeyEvent();	
	});
	
	
});

var getKeyCode = function (str) {
    return str.charCodeAt(str.length - 1);
 }


var isValid = true;
function setTimePickerKeyEvent() {
	
	$("#hour").on("keyup", function(e) {
		
		keyUpHour = $(this).val();
		
		var keycode = e.keyCode || e.which;
		if (keycode == 0 || keycode == 229) {
			 keycode = getKeyCode(this.value);
		}
		if(keycode != 8 && keycode != 13){
			 if(!isValid || (parseInt(keyUpHour, 10) > 12)) {
				 keyUpHour = keyUpHour.slice(0,-1)
				$(this).val(keyUpHour);
			 } 
		}
		setTempDate();
	});
	$("#hour").on("keydown", function(e) {
		isValid = true;
		if(keyUpHour.length >= 2){
			isValid = false;
		}else if (keyUpHour.length == 1 && parseInt(keyUpHour, 10) > 1 ) {
			isValid = false;
		}
	});
	$("#minute").on("keyup", function(e) {
		
		keyUpMinute = $(this).val();
		
		var keycode = e.keyCode || e.which;
		if (keycode == 0 || keycode == 229) { 
			 keycode = getKeyCode(this.value);
		}
		
		if(keycode != 8 && keycode != 13){
			if(!isValid) {
				 keyUpMinute = keyUpMinute.slice(0,-1)
				$(this).val(keyUpMinute);
			 } 
		}
		setTempDate();
	});
	$("#minute").on("keydown", function(e) {
		isValid = true;
		if(keyUpMinute.length >= 2){
			isValid = false;
		}else if (keyUpMinute.length == 1 && parseInt(keyUpMinute, 10) > 5 ) {
			isValid = false;
		}
	});
}

function setDatePicker() {
	
	$("#start_datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function (date) {
        	setDisabledDay();
        }  ,
        changeYear: true,
        changeMonth: true
    });
	$("#end_datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function (date) {
        	setDisabledDay();
        }  ,
        changeYear: true,
        changeMonth: true
    });
};

var AM = "AM";
var PM = "PM";

var START = "start";
var END = "end";

var START_BTN = "clang-SCHEDULE_DATEPICKER_START";
var END_BTN = "clang-SCHEDULE_DATEPICKER_END";


var startDate = new Date();
var endDate = new Date();
var startDateTxt = "";
var endDateTxt = "";

var startHour = "08";
var startMinute = "00";
var endHour = "09";
var endMinute= "00";
var selectedStartAMPM = AM;
var selectedEndAMPM = AM;

var startHourTmp = "08";
var startMinuteTmp = "00";
var endHourTmp = "09";
var endMinuteTmp= "00";
var selectedStartAMPMTmp = AM;
var selectedEndAMPMTmp = AM;

var isCheckedAllDay = false;

function checkAllDay(e) {
	isCheckedAllDay = e.checked;
	setAllDayDate();
}

function reset() {
	
	$('input[id=schedule_subject]').val('');
    $('textarea[id=schedule_comment]').val('');
    
    $('#allday').attr('checked', false);
    isCheckedAllDay = false;
	
	startDate = new Date();
	endDate = new Date();
	startDateTxt = "";
	endDateTxt = "";

	startHour = "08";
	startMinute = "00";
	endHour = "09";
	endMinute= "00";
	selectedStartAMPM = AM;
	selectedEndAMPM = AM;

	startHourTmp = "08";
	startMinuteTmp = "00";
	endHourTmp = "09";
	endMinuteTmp= "00";
	selectedStartAMPMTmp = AM;
	selectedEndAMPMTmp = AM;
	
	setTodayDate();
}

function setTempDate() {
	
	var switchBtn = $('.btn-switch.on').attr('id');

	var h = $('#hour').val();
	var m = $('#minute').val();
	var ampm = $('#AMPM').html();
	
	if(switchBtn == START_BTN){
		startHourTmp = h;
		startMinuteTmp = m;
		selectedStartAMPMTmp = ampm;
	}else{
		endHourTmp = h;
		endMinuteTmp = m;
		selectedEndAMPMTmp = ampm;
	}
	
}

function setAllDayDate() {
	
	if(isCheckedAllDay){
		$('#start_date').val(getFileteredDate(startDate).format2);
		$('#end_date').val(getFileteredDate(endDate).format2);
	}else{
		$('#start_date').val(getFileteredDate(startDate).format2 + " "+selectedStartAMPMTmp+" "+startHourTmp+":"+startMinuteTmp);
		$('#end_date').val(getFileteredDate(endDate).format2 + " "+selectedEndAMPMTmp+" "+endHourTmp+":"+endMinuteTmp);
	}
	
}

function setTodayDate() {
	
	if(isCheckedAllDay){
		var today = new Date();
		$('#start_date').val(getFileteredDate(today).format2);
		$('#end_date').val(getFileteredDate(today).format2);
	}else{
		var today = new Date();
		$('#start_date').val(getFileteredDate(today).format2 + " "+selectedStartAMPM+" "+startHour+":"+startMinute);
		$('#end_date').val(getFileteredDate(today).format2 + " "+selectedEndAMPM+" "+endHour+":"+endMinute);
	}
	
}

function setDisabledDay() {
	
	var startD = getFileteredDate($( "#start_datepicker" ).datepicker( "getDate" ));
	var endD = getFileteredDate($( "#end_datepicker" ).datepicker( "getDate" ));
	
	$( "#end_datepicker" ).datepicker( "option", "minDate", new Date(startD.yyyy, parseInt(startD.mm, 10) - 1, startD.dd) );
}


function showDatePickerPopup() {
	
	setDatePicker();
	
	$( "#start_datepicker" ).datepicker( "setDate", startDate);
	$( "#end_datepicker" ).datepicker( "setDate", endDate);
	
	setDisabledDay();
	
	$('#datepicker_container').css('display','block');
	$('#schedule_container').css('display','none');
	$(document).find('body').css('background','#fff');
	
	
	if(isCheckedAllDay){
		$('.picker-time-wrap').css('display','none');
	}else{
		$('.picker-time-wrap').css('display','block');
	}
	

	$('#AMPM').html(selectedStartAMPM);
	$('#hour').val(startHour);	
	$('#minute').val(startMinute);
	
	$('#clang-SCHEDULE_DATEPICKER_END').removeClass('on');
	$('#clang-SCHEDULE_DATEPICKER_START').addClass('on');
	$("#start_datepicker").css('display','block');
	$("#end_datepicker").css('display','none');
	
}

function hideDatePickerPopup() {
	
	$( "#start_datepicker" ).datepicker( "destroy" );
	$( "#end_datepicker" ).datepicker( "destroy" );
	
	$('#schedule_container').css('display','block');
	$('#datepicker_container').css('display','none');
	$(document).find('body').css('background','#f7f7f7');
	
}


function setSelectedTime() {
	
	var switchBtn = $('.btn-switch.on').attr('id');
	
	if(switchBtn == START_BTN){
		startHourTmp = $('#hour').val();
		startMinuteTmp = $('#minute').val();
		selectedStartAMPMTmp = $('#AMPM').html();
		
		 $('#hour').val(endHourTmp);
		 $('#minute').val(endMinuteTmp);
		 $('#AMPM').html(selectedEndAMPMTmp);
		 
	}else{
		endHourTmp = $('#hour').val();
		endMinuteTmp = $('#minute').val();
		selectedEndAMPMTmp = $('#AMPM').html();
		
		$('#hour').val(startHourTmp);
		$('#minute').val(startMinuteTmp);
		$('#AMPM').html(selectedStartAMPMTmp);
	}
	
}


function switchDatepicker(type) {
	
	setSelectedTime();
	
	if(type == START){
		
		$('#clang-SCHEDULE_DATEPICKER_END').removeClass('on');
		$('#clang-SCHEDULE_DATEPICKER_START').addClass('on');
		$("#start_datepicker").css('display','block');
		$("#end_datepicker").css('display','none');
		
		$('#AMPM').html(selectedStartAMPMTmp);
		$('#hour').val(startHourTmp);	
		$('#minute').val(startMinuteTmp);	
		
		keyUpHour = startHourTmp;
		keyUpMinute = startMinuteTmp;
		
	}else{
		
		$('#clang-SCHEDULE_DATEPICKER_START').removeClass('on');
		$('#clang-SCHEDULE_DATEPICKER_END').addClass('on');
		$("#start_datepicker").css('display','none');
		$("#end_datepicker").css('display','block');
		
		$('#AMPM').html(selectedEndAMPMTmp);
		$('#hour').val(endHourTmp);	
		$('#minute').val(endMinuteTmp);	
		
		keyUpHour = endHourTmp;
		keyUpMinute = endMinuteTmp;
		

	}
	
}

function cancelSelectedDate() {
	
	startHourTmp = startHour;
	startMinuteTmp = startMinute;
	endHourTmp = endHour;
	endMinuteTmp = endMinute;
	selectedStartAMPMTmp = selectedStartAMPM;
	selectedEndAMPMTmp = selectedEndAMPM;
	
	hideDatePickerPopup();
}


function checkTimeValidation() {
	
	var selectStartDate = $( "#start_datepicker" ).datepicker( "getDate" );
	var selectEndDate = $( "#end_datepicker" ).datepicker( "getDate" );
	
	
	if(selectStartDate.getTime() == selectEndDate.getTime()){
		
		var startFullHour = getFormatFullHour(selectedStartAMPMTmp, parseInt(startHourTmp, 10))
		var endFullHour =  getFormatFullHour(selectedEndAMPMTmp, parseInt(endHourTmp, 10))
		
		var filteredSD = getFileteredDate(selectStartDate);
		var filteredED = getFileteredDate(selectEndDate);
		
		var startDateTmp = new Date(filteredSD.yyyy, parseInt(filteredSD.mm, 10) - 1, filteredSD.dd, startFullHour,startMinuteTmp);
		var endDateTmp = new Date(filteredED.yyyy,  parseInt(filteredED.mm, 10) - 1, filteredED.dd, endFullHour, endMinuteTmp);
		
		if(startDateTmp.getTime() <= endDateTmp.getTime()){
			return true;
		}else{
			return false;
		}
		
	}else{
		return true;
	}
	
	
}

function confirmSelectedDate() {
	
	if(!checkTimeValidation()){
		showFailPopUp("실패","종료 시간은 시작 시간 이후로 설정해야합니다.");
		return;
	}
	
	setSelectedTime();
	
	startHour = startHourTmp;
	startMinute = startMinuteTmp;
	endHour = endHourTmp;
	endMinute = endMinuteTmp;
	selectedStartAMPM = selectedStartAMPMTmp;
	selectedEndAMPM = selectedEndAMPMTmp;
	
	startDate = $( "#start_datepicker" ).datepicker( "getDate" );
	endDate = $( "#end_datepicker" ).datepicker( "getDate" );
	
	startDateTxt = getFileteredDate(startDate).format2;
	endDateTxt = getFileteredDate(endDate).format2;
	
	if(isCheckedAllDay){
		$('#start_date').val(startDateTxt);
		$('#end_date').val(endDateTxt);
	}else{
		$('#start_date').val(startDateTxt+ "  "+selectedStartAMPM+" "+startHour+":"+startMinute);
		$('#end_date').val(endDateTxt+ "  "+selectedEndAMPM+" "+endHour+":"+endMinute);
	}
		
	hideDatePickerPopup();
}



function changeAMPM() {
	
	var state = $('#AMPM').html();
	if(state == AM){
		$('#AMPM').html(PM);
	}else{
		$('#AMPM').html(AM);
	}	
	
	setTempDate();
}

function upHour() {
	
	var nowHour = $('#hour').val();	
	var upHour = parseInt(nowHour,10) + 1;
	var state = $('#AMPM').html();
	
	if(upHour == 12){
		if(state == AM){
			$('#AMPM').html(PM);
		}else if(state == PM){
			$('#AMPM').html(AM);
		}
	}
	
	if(upHour > 12){
		upHour = 1;
	}	
	
	upHour = getFormatTime(upHour);	
	$('#hour').val(upHour);	
	
	setTempDate();
	
}

function downHour() {
	
	var nowHour = $('#hour').val();	
	var downHour = parseInt(nowHour,10) - 1;
	var state = $('#AMPM').html();
	
	if(downHour == 11){
		if(state == AM){
			$('#AMPM').html(PM);
		}else if(state == PM){
			$('#AMPM').html(AM);
		}
	}
	
	if(downHour < 1){
		downHour = 12;
	}	
	downHour = getFormatTime(downHour);	
	 $('#hour').val(downHour);	
	 
	 setTempDate();
	
}

function upMinute() {
	
	var nowMinute = $('#minute').val();
	var upMinute = parseInt(nowMinute,10) + 1;
	
	if(upMinute == 60){
		upMinute = 0;
	}
	
	upMinute = getFormatTime(upMinute);	
	$('#minute').val(upMinute);	
	
	setTempDate();
	
}

function downMinute() {
	
	var nowMinute = $('#minute').val();
	var downMinute = parseInt(nowMinute,10) - 1;
	
	if(downMinute < 0){
		downMinute = 59;
	}
	
	downMinute = getFormatTime(downMinute);	
	$('#minute').val(downMinute);	
	
	setTempDate();
	
}

function getFormatTime(time) {
	var formatTime = (time < 10) ? "0"+time : time;
	return formatTime;
}

function getFormatFullHour(AMPM, hour) {
	var formatTime = (AMPM == PM) ? 12+hour : hour;
	formatTime = (formatTime < 10) ? "0"+formatTime : formatTime;
	return formatTime;
}

function setFormatTime() {
	
	var h = $('#hour').val();
	var m = $('#minute').val();
	
	var switchBtn = $('.btn-switch.on').attr('id');
	
	if(switchBtn == START_BTN){
		if(null != h && "" != h){
			$('#hour').val(getFormatTime(parseInt(h,10)));
		}else{
			$('#hour').val(startHour);
		}
		
		if(null != m && "" != m){
			$('#minute').val(getFormatTime(parseInt(m,10)));
		}else{
			$('#minute').val(startMinute);
		}
		 
	}else{
		
		if(null != h && "" != h){
			$('#hour').val(getFormatTime(parseInt(h,10)));
		}else{
			$('#hour').val(endHour);
		}
		
		if(null != m && "" != m){
			$('#minute').val(getFormatTime(parseInt(m,10)));
		}else{
			$('#minute').val(endMinute);
		}
		
	}
	
}


/**
 * 년,월,일,format 날짜 추출
 * example : formattedRegDate = getFileteredDate(new Date(regDate)).leadformat;
 */
function getFileteredDate(d) {
	var yyyy = d.getFullYear();
	var mm = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1); // getMonth() is zero-based
	var dd  = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
	var hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
	var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
	var date  = d.getDate();
	var week = //new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
		new Array('일', '월', '화', '수', '목', '금', '토');
	
	var date = {
			yyyy: yyyy,
			mm: mm,
			dd: dd,
			hour: hours,
			minute: minutes,
			date: date,
			week: week[d.getDay()],
			month_day: mm+"."+dd,
			format: "".concat(yyyy).concat(mm).concat(dd),
			format2: yyyy+"-"+mm+"-"+dd,
			format3: yyyy+"-"+mm+"-"+dd+" "+hours+':'+minutes,
			format4: yyyy+"."+mm+"."+dd+" "+hours+':'+minutes,
			format5: yyyy+"."+mm+"."+dd,
			leadformat: dd + "/"+ mm + "/" +yyyy,
			leadformat2: mm + "/" + dd,
			time: hours+':'+minutes,
			time2: hours+' : '+minutes
	}
	
	return date;
}

function showAccountPopup() {
	$('#id_account_pop').css('display','block');
	$('.dim').on('scroll touchmove', function(e){
		  e.preventDefault();
		  e.stopPropagation();
		  return false;
	});
	$('#schedule_container').css('overflow', 'hidden');
}

function hideAccountPopup() {
	$('#id_account_pop').css('display','none');
	$('#schedule_container').css('overflow', 'auto');
}

var selectedAccountName = "내 캘린더";
function selectAccount(e) {
	
	$(e).parent().find('input').attr('checked',false);
	$(e).find('input').attr('checked', true);
	 
	selectedAccountName = $(e).find('input').val();
	$('.account span').html(selectedAccountName);
	hideAccountPopup();
}

function setAccountList(list) {
	
	var accountHTML = '';
	
	for ( var i = 0; i < list.length; i++) {
		accountHTML += '<li>';
		accountHTML += '	<dl onclick="selectAccount(this)">';
		accountHTML += '		<dt>';
		accountHTML += '			<div class="cal-wrap">';
		accountHTML += '				<label>';
		accountHTML += '					<input name="radio" type="radio" id="radio" value="'+list[i].accountName+'">';
		accountHTML += '					'+list[i].accountLabel+'</label>';
		accountHTML += '			</div>';
		accountHTML += '		</dt>';
		accountHTML += '		<dd>'+list[i].accountName+'</dd>';
		accountHTML += '	</dl>';
		accountHTML += '</li>';
	}
	
	$('.list-cal').append(accountHTML);
	
	
}

var accountList = [];

function getAccountsForSPlanner() {
	
	
	MDHMgr.exec("SPlannerPlugin.getAccountsForSPlanner", function(result) {
        
		console.log("getAccountsForSPlanner  success");
        accountList = result.accountList;
        
        setAccountList(accountList);
        
        for ( var i = 0; i < accountList.length; i++) {
        	 console.log("SPlannerPlugin.getAccountsForSPlanner name : "+accountList[i].accountName);
        	 console.log("SPlannerPlugin.getAccountsForSPlanner type : "+accountList[i].accountType);
        	 console.log("SPlannerPlugin.getAccountsForSPlanner label : "+accountList[i].accountLabel);
		}

    }, function(error) {

        var ret = "";
        switch(parseInt(error)) {

            case -10002:
            ret = "MDH_JSON_EXP_ERROR";
            break;
            case -10097:
            ret = "MDH_CLASS_NOT_FOUND";
            break;
            case -10098:
            ret = "MDH_NO_SUCH_METHOD";
            break;
            default:
            ret = "MDH_UNKNOWN_ERROR";
            break;
        }
        
        console.log("SPlannerPlugin  error  : "+ret);

    });
	
}



function setScheduleToSPlanner() {
	var title = $('input[id=schedule_subject]').val();
	var desc = $('textarea[id=schedule_comment]').val();
	
	var type = "";
	if("내 캘린더"!= selectedAccountName){
		var index = accountList.map(function(e) { return e.accountName; }).indexOf(selectedAccountName);
		type = accountList[index].accountType;
		console.log("setScheduleToSPlanner index : "+index);
	}else{
		type = "default";
	}
	
	console.log("setScheduleToSPlanner type : "+type);
	getFormatFullHour(selectedEndAMPM, parseInt(endHour, 10));
	
	if(isDeviceMode){
		
		MDHMgr.exec("SPlannerPlugin.setScheduleToSPlanner", function(result) {
	        console.log("SPlannerPlugin.setScheduleToSPlanner success : "+result);
	        reset();
	        showSuccessPopUp("성공","이벤트가 등록되었습니다.");

	    }, function(error) {

	        var ret = "";
	        switch(parseInt(error)) {

	            case -10002:
	            ret = "MDH_JSON_EXP_ERROR";
	            break;
	            case -10097:
	            ret = "MDH_CLASS_NOT_FOUND";
	            break;
	            case -10098:
	            ret = "MDH_NO_SUCH_METHOD";
	            break;
	            case 1000031:
	            ret = "MDH_SPLANNER_NOT_SUPPORT_DEVICE";
	            break;
	            case 1000032:
		        ret = "MDH_SPLANNER_NO_SYSTEM_CALENDAR";
		        break;
	            case 1000033:
	            ret = "MDH_SPLANNER_FAIL_SAVE_SCHEDULE";
	            break;
	            case 1000034:
		        ret = "MDH_SPLANNER_ALREADY_SAVE_SCHEDULE";
		        showFailPopUp("실패","이미 등록된 이벤트입니다.");
		        break;
	            default:
	            ret = "MDH_UNKNOWN_ERROR";
	            break;
	        }
	        console.log("SPlannerPlugin  error  : "+ret);

	    },{
	    	startYear : getFileteredDate(startDate).yyyy,
	    	startMonth : getFileteredDate(startDate).mm,
	    	startDay : getFileteredDate(startDate).dd,
	    	startHour : getFormatFullHour(selectedStartAMPM, parseInt(startHour, 10)),
	    	startMinute : startMinute,
	    	endYear : getFileteredDate(endDate).yyyy,
	    	endMonth : getFileteredDate(endDate).mm,
	    	endDay : getFileteredDate(endDate).dd,
	    	endHour :  getFormatFullHour(selectedEndAMPM, parseInt(endHour, 10)),
	    	endMinute : endMinute,
	    	title : title,
	    	desc : desc,
	    	allday :isCheckedAllDay,
	    	type: type
	    });
	}
	
}