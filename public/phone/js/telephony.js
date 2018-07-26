/*function Request(){
 var requestParam ="";
 
 //getParameter 펑션
  this.getParameter = function(param){
  //현재 주소를 decoding
  var url = unescape(location.href); 
  //파라미터만 자르고, 다시 &그분자를 잘라서 배열에 넣는다. 
   var paramArr = (url.substring(url.indexOf("?")+1,url.length)).split("&"); 
 
   for(var i = 0 ; i < paramArr.length ; i++){
     var temp = paramArr[i].split("="); //파라미터 변수명을 담음
 
     if(temp[0].toUpperCase() == param.toUpperCase()){
       // 변수명과 일치할 경우 데이터 삽입
       requestParam = paramArr[i].split("=")[1]; 
       break;
     }
   }
   return requestParam;
 }
}

var request = new Request();
alert(request.getParameter('test'));*/



function MDHPhone_Telephony_callStart() {
    var number = $('#callNumber').attr('value');
    	MDHPhone.Telephony.call(
    	        function(result) {
    	        	console.log("Telephony result  : "+result);
    	        }, 
    	        function(error) {
    	   			var ret = (error==-10001)?"MDH_INVALID_ARGUMENT":(error==-10201)?"MDH_PHONE_AIRPLANE_MODE":
    							(error==-10202)?"MDH_PHONE_CALLING":(error==-10309)?"MDH_Device_NOT_SUPPORT":
    	                        (error==-10097)?"MDH_CLASS_NOT_FOUND":(error==-10098)?"MDH_NO_SUCH_METHOD":"MDH_UNKNOWN_ERROR";       
    	   			showFailPopUp("",ret);
    	        }, 
    	        {
    	            "phoneNumber": number
    	        }
    	);

    
}

function MDHPhone_Telephony_sendSMSStart() {
    var number = $('#smsNumber').attr('value');
    var message = $('#smsMessage').attr('value');
	var directSMS = $("#directSMSOption").is(":checked");
	
		var numbers = new Array();
	    var i = 0;
	    while(number.indexOf(",") > -1) {
	        numbers[i] = number.substr(0, number.indexOf(","));
	        number = number.substr(number.indexOf(",") + 1);
	        i++;
	    }
	    numbers[i] = number;
	    
		MDHPhone.Telephony.sendSMS(
			function(result) {
				if(result == "OK")
					alert("메세지 전송완료");
					
			}, 
			function(error) {			
				var ret = (error==-10001)?"MDH_INVALID_ARGUMENT":
							(error==-10201)?"MDH_PHONE_AIRPLANE_MODE":
							(error==-10202)?"MDH_PHONE_CALLING":
							(error==-10250)?"MDH_PHONE_SMS_ERROR_GENERIC_FAILURE":
							(error==-10251)?"MDH_PHONE_SMS_ERROR_NO_SERVICE":
							(error==-10252)?"MDH_PHONE_SMS_ERROR_NULL_PDU":
							(error==-10253)?"MDH_PHONE_SMS_ERROR_RADIO_OFF":
							(error==-10309)?"MDH_Device_NOT_SUPPORT":
	                        (error==-10097)?"MDH_CLASS_NOT_FOUND":
	                        (error==-10098)?"MDH_NO_SUCH_METHOD":
							"MDH_UNKNOWN_ERROR";
				showFailPopUp("",ret);
			}, 
			{
	            "phoneNumber":numbers,
	            "message":message,
				"direct": directSMS
			}
		);
    
    
}







