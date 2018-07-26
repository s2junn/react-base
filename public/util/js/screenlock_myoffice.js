
function MDHBasic_ScreenLock_isLocked() {
	
	MDHBasic.ScreenLock.isLocked(
		function(status) {
			
			var ret = "";
			
			if(status == 'true'){
				ret="Currently Locked"			
			}else{
				ret="Currently UnLocked"
			}
			
			showSuccessPopUp("Result",'<div align="center"><strong>' + ret + '<strong></div>');
		},
		function(error) {
			
			var ret = "";
			
			switch(parseInt(error)) {
			
			case -10100:
			ret = "MDH_Basic_LAUNCHER_IS_NOT_INSTALLED";
			break;
			
			case -10101:
			ret = "MDH_Basic_SSO_SIGN_OFF";
			break;

			case -10102:
			ret = "MDH_Basic_NO_LOCK_PASSWORD";
			break;
			
			case -10104:
			ret = "MDH_Basic_SERVICE_IS_BINDING";
			break;
			
			case -10097:
			ret = "MDH_CLASS_NOT_FOUND";
			break;
			
			case -10109:	
			ret = "MDH_Basic_SERVICE_IS_NOT_BINDING";		
			break;
			
			case -10098:	
			ret = "MDH_NO_SUCH_METHOD";		
			break;

			default:		
			ret = "MDH_UNKNOWN_ERROR";		
			break;
		}
			showFailPopUp("Error","Error Message : " + ret);
	});
};

function MDHBasic_ScreenLock_unlock() {
		showLockScreenForMyOfficeTest();	
};
	
function afterLockScreenPopUpConfirmClick(){
	MDHBasic.ScreenLock.unlock(
			function(status) {
				if(status == "true"){
					showSuccessPopUp("Result",'<div align="center"><strong>Unlock Success<strong></div>');
				}else{
					showFailPopUp("Error","Error Message : Invalid Password");
				}
			},
			function(error) {
				
				var ret = "";
				
				switch(parseInt(error)) {
				
				case -10100:
				ret = "MDH_Basic_LAUNCHER_IS_NOT_INSTALLED";
				break;
				
				case -10101:
				ret = "MDH_Basic_SSO_SIGN_OFF";
				break;

				case -10102:
				ret = "MDH_Basic_NO_LOCK_PASSWORD";
				break;
				
				case -10104:
				ret = "MDH_Basic_SERVICE_IS_BINDING";
				break;
				
				case -10001:
				ret = "MDH_INVALID_ARGUMENT";
				break;
				
				case -10097:
				ret = "MDH_CLASS_NOT_FOUND";
				break;
				
				case -10109:	
				ret = "MDH_Basic_SERVICE_IS_NOT_BINDING";		
				break;
				
				case -10098:	
				ret = "MDH_NO_SUCH_METHOD";		
				break;

				default:		
				ret = "MDH_UNKNOWN_ERROR";		
				break;
			}
			showFailPopUp("Error","Error Message : " + ret);
		},
		screenLockPopInputValue
		)};

	