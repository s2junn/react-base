

function MDH_CheckNFCStatus(){
	
	MDHMgr.exec("NFCPlugin.checkNFCStatus",function(result) {
		
		MDH_StartWritingNFCTag();
		
	},function(error){
		
		var ret ="";
		
		switch (error) {
		
			case 1000012:
				ret= "Device is not Support NFC";
				break;
				
			case 1000017:
				ret= "NFC Module is Currently Off, Please Turn On";
				break;
	
			default:
				break;
		}
		
		showFailPopUp("Error","Error code : " + error + "<br>" +"Error Message : " + ret);
		
	});
	
}


function MDH_StartWritingNFCTag(){
	
	var inputValue;
	var writeType = $('input:radio[name="radio"]:checked').val();
	
	if(writeType ==="TEXT"){
		inputValue = $('#input_text').attr('value');
	}else if(writeType ==="URL"){		
		inputValue = $('#input_url').attr('value');		
	}else{
		inputValue ="";
	}
	
	if((writeType ==="TEXT" || writeType ==="URL") && inputValue ===""){
		showFailPopUp("Error","Input Text");
		return;
	}
	
	showSuccessPopUp("Notice","Move NFC Tag to the back of the Phone");
	
	MDHMgr.exec("NFCPlugin.startWritingNFCTag",function(result) {
		
		if(result != null){
			var ret=""
			switch (result.writeType) {
			case 2:
				ret = "Write Text Type Success"
				break;
				
			case 3:
				ret = "Write URL Type Success"
				break;
			
			case 4:
				ret = "Tag Format Success"
				break;

			default:
				break;
			}
			showSuccessPopUp("SUCCESS",ret);
		}
		
	},function(error){
		
		if(error  != null){
			showFailPopUp("Error","Error code : " + error.errorCode + "<br>" +"Error Message : " + error.errorMessage);			
		}
	},
	{
		writeType:writeType,
		inputValue:inputValue
	});
}
