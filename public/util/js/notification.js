

var TYPE_NORMAL = 0;
var TYPE_BIC_PICTURE = 1;
var TYPE_BIC_TEXT = 2;
var TYPE_INBOX = 3;
var TYPE_PROGRESS = 4;

var BIC_PICTURE_TYPE1 ="pic-big01";
var BIC_PICTURE_TYPE2 ="pic-big02";

var BIG_PICTURE1 = 'www/images/pic_big01.jpg';
var BIG_PICTURE2 = 'www/images/pic_big02.jpg';

var selectedType = 0;
var selectedIcon = 'alerm';
var selectedBicPic = BIC_PICTURE_TYPE1;

$(document).ready(function() {
	
	
	var select = $('select[name=noti-type]');
	select.change(function() {

		// type 선택시 화면 처리
		selectedType = $("#noti-type option").index($("#noti-type option:selected"));
		
		var notiSettingList = $('.noti-setting');
		$('.noti-setting').css('display', 'none');
		
		$(notiSettingList[selectedType]).css('display', 'block');
		
	});
	
	
	$('.ico-select li>a').on('click', function() {
		
		// icon 선택 처리
		var notiSettingList = $('.noti-setting');
		$(notiSettingList[selectedType]).find('.ico-select li>a').removeClass('selected');
		selectedIcon = $(this).attr('class');
		$(this).addClass('selected');
		
	});
	
	$('.pic-select li>a').on('click', function() {
		
		// big picture 선택 처리
		var notiSettingList = $('.noti-setting');
		$(notiSettingList[selectedType]).find('.pic-select li>a').removeClass('selected');
		selectedBicPic = $(this).attr('class');
		$(this).addClass('selected');
		
	});
});




var idN = 100;

function MDHUtil_Notification_start() {
	
	var setting = $($('.noti-setting')[selectedType]);
	
	var options = {
			type : setting.attr('id'),
			title : setting.find('input[name=title]').val(),
			message : setting.find('textarea[id=message]').val(),
			tickerText : setting.find('input[name=ticker-text]').val(),
			number: setting.find('input[name=number]').val(),
			sound: $(setting.find('input[id=sound]')).is(':checked'),
			vibrate: $(setting.find('input[id=vibrate]')).is(':checked'),
			icon : selectedIcon,
			id : idN
	}
	idN++;
	
	switch (selectedType) {
	case TYPE_NORMAL:
		
		break;
	case TYPE_BIC_PICTURE:
		
		options.BigContentTitle = setting.find('input[name=big-title]').val();
		options.SummaryText = setting.find('textarea[id=summary-text]').val();
		
		switch (selectedBicPic) {
			case BIC_PICTURE_TYPE1:
				options.bigPictureUrl = BIG_PICTURE1;
				break;
			case BIC_PICTURE_TYPE2:
				options.bigPictureUrl = BIG_PICTURE2;
				break;
			default:
				options.bigPictureUrl = BIG_PICTURE1;
				break;
		}
			
			break;
	case TYPE_BIC_TEXT:
		
		options.BigContentTitle = setting.find('input[name=big-title]').val();
		options.SummaryText = setting.find('textarea[id=summary-text]').val();
		options.bigText = setting.find('textarea[id=big-text]').val();
		
		break;
	case TYPE_INBOX:
		
		options.BigContentTitle = setting.find('input[name=big-title]').val();
		options.line1 = setting.find('input[name=line1]').val();
		options.line2 = setting.find('input[name=line2]').val();
		options.line3 = setting.find('input[name=line3]').val();
		options.SummaryText = setting.find('textarea[id=summary-text]').val();
		
		break;
	case TYPE_PROGRESS:
		
		options.interval = setting.find('input[name=interval]').val();
		options.contentText = setting.find('input[name=content-text]').val();
		
		break;
	default:
		break;
	}
	
	MDHMgr.exec("NotificationPlugin.startNotification", function(result) {
		showSuccessPopUp("",result);
	}, function(error) {
		
		var ret = "";
		switch(parseInt(error)) {
			case -10001:
			ret = "MDH_INVALID_ARGUMENT";
			break;
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
		showFailPopUp("",ret);
	}, options);
	
}


