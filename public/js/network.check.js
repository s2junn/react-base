
var PREFERENCE_KEY_NETWORK = "NETWORK_CONFIRM_CHECK";
var CHECK_TRUE = "true";
var CHECK_FALSE = "false";
var TYPE_MOBILE = 2;

$(document).ready(function() {
	
	
	var isNetworkChecked =  localStorage.getItem(PREFERENCE_KEY_NETWORK);
	if(null == isNetworkChecked){
		isNetworkChecked = CHECK_FALSE;
	}
	
	console.log("isNetworkChecked  : " + isNetworkChecked);
	
	
	if((isNetworkChecked == CHECK_FALSE) && isDeviceMode){
		
		
		MDHMgr.exec("NetworkCheckPlugin.getNetworkInfo", function(result) {
			
			console.log("NetworkCheckPlugin.getNetworkInfo : "+result.networkStatus);
			
			if(result.networkStatus == TYPE_MOBILE){
				
				$('#id_network_pop').load("html/network_popup.html","", function() {					
					
					//Block Background dim area Scrolling
					//$('#container').css('overflow', 'hidden');		
					$('.dim').on('scroll touchmove', function(e){
						  e.preventDefault();
						  e.stopPropagation();
						  return false;
					});
					
					$('#popup_confirm_network').on('click', function(){			
						$('#container').css('overflow', 'inherit');
						$('#network_popup').hide();
						
						var isCheck = $('#network_check').is(':checked');
						localStorage.setItem(PREFERENCE_KEY_NETWORK, isCheck);
						
						MDHMgr.exec("NFCPlugin.isStartedWithNFCTag",function(result) {
							window.location.href = "file:///android_asset/www/util/nfc_read_tag.html"
						},function(error){});
						
					});
					
					$('#popup_cancel_network').on('click', function(){			
						
						MDHUtil.Browser.terminateApp();
						
					});
					
					
					
					$('#network_popup').show();
				});
				
			}else{
				MDHMgr.exec("NFCPlugin.isStartedWithNFCTag",function(result) {
					window.location.href = "file:///android_asset/www/util/nfc_read_tag.html"
				},function(error){});
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
			showFailPopUp("",ret);
			
		});
		
	}else if(isNetworkChecked == CHECK_TRUE && isDeviceMode){
		
		MDHMgr.exec("NFCPlugin.isStartedWithNFCTag",function(result) {
			window.location.href = "file:///android_asset/www/util/nfc_read_tag.html"
		},function(error){});		
	}
});