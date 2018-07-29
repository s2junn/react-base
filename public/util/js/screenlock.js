
function MDH_RunLockScreen(){
	var inputTimeout = $('#inputTime').attr('value');
	
	if(inputTimeout > 0)
	{
		setScreenLockInfo("true", inputTimeout);
		showSuccessPopUp("Success","<p align='center'><strong>Start LockScreen!!<br><br>To Finish LockScreen Test, <br>Must Click Reset Button<strong><p>");		
				
	}else{
		showFailPopUp("Error","Incorrect Time Value!")
	}
}

function MDH_ResetLockScreen(){
	clearScreenLockInfo();
	showSuccessPopUp("Success","<p align='center'><strong>Reset Success</strong><p>");
}