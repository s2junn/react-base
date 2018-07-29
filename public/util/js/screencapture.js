
function MDHUtil_Lock_On_Capture() {
	MDHMgr.exec("ScreenCapturePlugin.lockOnCapture",function(result){
		alert("LockOnSuccess = " + result);
	}, function(error){
		alert("LockOnFail = " + error);		
	});
}

function MDHUtil_Lock_Off_Capture() {
	MDHMgr.exec("ScreenCapturePlugin.lockOffCapture",function(result){
		alert("LockOffSuccess = " + result);
	}, function(error){
		alert("LockOffFail = " + error);		
	});
	
}



