var isNFCModuleStateError;

function afterSuccessPopUpConfirmClick(){
	MDH_CheckNFCStatus();
}

function afterFailPopUpConfirmClick(){
	if(isNFCModuleError == true){
		window.location.href = "./index_util_nfc.html";
	}else{
		MDH_CheckNFCStatus();
	}
}


function MDH_CheckNFCStatus(){	
	
	MDHMgr.exec("NFCPlugin.checkNFCStatus",
	
	function(result) {
		
	MDH_StartReadingNFCTag();
		
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
		
		isNFCModuleStateError = true;
		
		MDHBasic.Event.removeListener("backKey", setBackKeyEvent);
		MDHBasic.Event.addListener("backKey", "");
		
		showFailPopUp("Error","Error code : " + error + "<br>" +"Error Message : " + ret);
		
	});
	
}


function MDH_StartReadingNFCTag(){
	//showSuccessPopUp("Notice","Move NFC Tag to the back of the Phone");
	
	MDHMgr.exec("NFCPlugin.startReadingNFCTag",function(result) {
		
		if(result != null){
			
			$('#tag_id').val(result.TagId);
			$('#tag_size').val(result.TagSize); 
			$('#tag_writable').val(result.TagWritable);
			$('#tag_type').val(result.TagType);
			$('#tnf').val(result.Tnf);
			$('#type').val(result.RecordType);
			$('#result').val(result.successMessage);
		}
		
		showSuccessPopUp("SUCCESS","Reading Tag Success");
		
	},function(error){
		
		if(error  != null){
			
			$('#tag_id').val(error.TagId);
			$('#tag_size').val(error.TagSize); 
			$('#tag_writable').val(error.TagWritable);
			$('#tag_type').val(error.TagType);
			$('#tnf').val(error.Tnf);
			$('#type').val(error.RecordType);
			$('#result').val("");			
			
		}
		
		showFailPopUp("Error","Error code : " + error.errorCode + "<br>" +"Error Message : " + error.errorMessage);
		
	});
}

function MDH_onloadExecute(){
	
	//check if application Started with NFC Tagging
	MDHMgr.exec("NFCPlugin.isStartedWithNFCTag",function(result) {
		//Tagging Case
		MDH_ReadTagInfoDirect();
   },function(error){
	   //Normal Case
	   showSuccessPopUp("Notice","Move NFC Tag to the back of the Phone");
   });
}


//called When Application Started With Tagging(First Read)
function MDH_ReadTagInfoDirect(){
	MDHMgr.exec("NFCPlugin.readTagInfoDirect",function(result) {
		
		if(result != null){
			
			$('#tag_id').val(result.TagId);
			$('#tag_size').val(result.TagSize); 
			$('#tag_writable').val(result.TagWritable);
			$('#tag_type').val(result.TagType);
			$('#tnf').val(result.Tnf);
			$('#type').val(result.RecordType);
			$('#result').val(result.successMessage);
		}
		
		showSuccessPopUp("SUCCESS","Reading Tag Success");
		
	},function(error){
		
		if(error  != null){
			
			$('#tag_id').val(error.TagId);
			$('#tag_size').val(error.TagSize); 
			$('#tag_writable').val(error.TagWritable);
			$('#tag_type').val(error.TagType);
			$('#tnf').val(error.Tnf);
			$('#type').val(error.RecordType);
			$('#result').val("");			
			
		}
		
		showFailPopUp("Error","Error code : " + error.errorCode + "<br>" +"Error Message : " + error.errorMessage);		
	});	
}

