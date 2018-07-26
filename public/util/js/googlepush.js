
function MDH_StartPushSetting(){	
	MDHMgr.exec("GooglePushPlugin.startPushSetting",function(result) {
		
		if(result != null){
			$('#sender_id').val(result.SenderID); 
			$('#api_key').val(result.APIKEY);
			$('#registration_id').val(result.RegisgrationID);
			$('#imei').val(result.IMEI);
			$('#phonenumber').val(result.PhoneNumber);
		}		
		MDHBasic_SEMP_RegisterPush(result.IMEI, result.PhoneNumber, result.RegisgrationID);
		
	}, function(error){		
		
		var ret ="";
		
		switch (error) {		
		case 1000022:
			ret = "Register Fail"; 
			break;
			
		case 1000023:
			ret = "Not Support in Knox Mode"; 
			break;

		default:
			break;
		}
		
		showFailPopUp("Result",ret);	
	});
}

function MDHBasic_SEMP_RegisterPush(imei, phoneNumber, regId ){	
	
	if(phoneNumber == null || phoneNumber == undefined || phoneNumber == "null" || phoneNumber == "undefined")
	{
		phoneNumber ="";
	}
	
	if(imei == null || imei == undefined || imei == "null" || imei == "undefined")
	{
		imei ="";
	}
	
	var requestParam = new Object();
	requestParam.imei = imei;
	requestParam.phone = phoneNumber;
	requestParam.gcmid = regId;
	
	var requestParamJson = JSON.stringify(requestParam);
	
	MDHBasic.SEMP.request(
			function(status) {				
				showSuccessPopUp("Result","Push Setting Success");
			},
			function(error) {
				var ret = (error==-10001)?"MDH_INVALID_ARGUMENT":
				          (error==-10002)?"MDH_JSON_EXP_ERROR":
						  (error==-10099)?"MDH_UNKNOWN_ERROR":
						  (error==-10097)?"MDH_CLASS_NOT_FOUND":
						  (error==-10098)?"MDH_NO_SUCH_METHOD":
						  (error==-10009)?"MDH_PLATFORM_NOT_SUPPORTED":
						  error;
				
				if(typeof ret == "object" ) {
					showFailPopUp("Fail","Error message : " + error.msg);				
				}
				else {					
					showFailPopUp("Fail","Error code : " + ret);
				}
			},
			{
				connectionType:'http',
				ipAddress:'210.118.57.138',
				portNumber:'8093',
				contextUrl:'semp',
				dataType : 'json',
				paramEncrypted : 'false',
			    paramCompressed : 'false',
			    useAdvancedKey : 'false',
			    eKeyType : '1',				
				sCode:'gcm',
				sType:'rest',
				userId:'test',
				parameter:"param="+requestParamJson
			}
		);	
}