function loadXMLString(txt) 
{
	if (window.DOMParser) {
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(txt,"text/xml");
	} else // Internet Explorer
	{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(txt); 
	}
	return xmlDoc;
}

function MDHBasic_SEMP_request() {
	
	var connectionType = $('#connectionType').val();
	var userId = $('#userId').val();
	var deviceId = $('#deviceId').val();
	var contextUrl = $('#contextUrl').val();
	var dataType = $('#dataType').val();
	var sType = $('#sType').val();
	var sCode = $('#sCode').val();
	var parameter = $('#parameter').val();
	var paramEncrypted = ($('#paramEncrypted').is(":checked")).toString();
	var paramCompressed = ($('#paramCompressed').is(":checked")).toString();
	
	MDHBasic.SEMP.request(
		function(status) {
			var resulthtml = "";
			if(dataType == "json") {
				resulthtml =  JSON.stringify(status);
				$('#sempResult').html("SEMP result : <br>" + resulthtml);
			} else {
				resulthtml = status.replace(/</g, '&lt;').replace(/>/g, '&gt;');
				$('#sempResult').html("SEMP result : <br>" + resulthtml);
				xmlDoc=loadXMLString(status);
				var serializer = new XMLSerializer();
				var string1 = serializer.serializeToString(xmlDoc);
				
				console.log("MDHBasic.SEMP.request	  status  : "+status);
				console.log("MDHBasic.SEMP.request	  serializeToString  : "+string1);
				
				showSuccessPopUp("",resulthtml);
			}
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
				var resultData = error.resultData.replace(/</g, '&lt;').replace(/>/g, '&gt;');
				$('#sempResult').html("SEMP result : <br>" + "Error code : " + error.resultCode + "<br>" + 
									"Error Message : " + error.resultMsg + "<br>" + 
									"Error Data : " + resultData);
			}
			else {
				$('#sempResult').html("SEMP result : <br>" + "Error code : " + ret);
			}
		},
		{	
			connectionType:connectionType,
			ipAddress:SEMP_ipAddress,
			portNumber:SEMP_portNumber,
			userId:userId,
			deviceId:deviceId,
			contextUrl:contextUrl,
			dataType:dataType,
			sType:sType,
			sCode:sCode,
			parameter:parameter,
			paramEncrypted : paramEncrypted,
			paramCompressed : paramCompressed
		}
	);
}

function s4() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

function gen_guid() {
	return s4() + s4() + s4() + s4() + s4() +  s4() + s4() + s4();
};

var uuid;

$(document).ready(function() {
	
	uuid = gen_guid();
	$('#up_requestId').val(uuid);
	
});

function MDHBasic_SEMP_fileUploadRequest() {
	
	var up_requestId = $('#up_requestId').val();
	var up_connectionType = $('#up_connectionType').val();
	var up_userId = $('#up_userId').val();
	var up_deviceId = $('#up_deviceId').val();
	var up_contextUrl = $('#up_contextUrl').val();
	var up_dataType = $('#up_dataType').val();
	var up_sType = $('#up_sType').val();
	var up_showProgress = ($('#up_showProgress').is(":checked")).toString();
	var up_fileTransferUseLimit = ($('#up_fileTransferUseLimit').is(":checked")).toString();
	var up_fileTransferMaxSIze = $('#up_fileTransferMaxSIze').val();
	var up_filePath = $('#up_filePath').val();
	var up_fileDescription = $('#up_fileDescription').val();
	
	var index_extension = up_filePath.lastIndexOf(".");
    var file_name = up_filePath.slice(0, index_extension);
    var file_extension = up_filePath.slice(index_extension+1);
	
    //added by dbkim. 2016.06.24. 파일명 특수 문자 체크 및 확장자 체크 --START
    //var iChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
    //if(!(iChars.match(/\W/g)) == "") {
    if(file_name.match(/[^a-zA-Z0-9_\-:/\.=+&]/g)) {
     	showFailPopUp("파일 업로드 실패","파일명에는 특수 문자를 사용할 수 없습니다.");
 		return;
    }    
    
    var cannotUsefileExtList = "asp jsp exe bat";
    var cannotUsefileExt = cannotUsefileExtList.split(" ");
    console.log("dbkim, split error : file_name = " + file_name + ", file_extension = "+file_extension);
    for(var i=0;i<cannotUsefileExt.length;i++) {
    	if(file_extension == cannotUsefileExt[i]) {
    		showFailPopUp("파일 업로드 실패", "다음 파일 확장자는 사용할 수 없습니다.<br>"+cannotUsefileExtList);
     		return;
    	}
    }
    //added by dbkim. 2016.06.24. 파일명 특수 문자 체크 및 확장자 체크 --END
	

	MDHBasic.SEMP.fileUpload(
		function(status) {
			if(dataType == "json") {
				$('#sempfileUploadResult').html("fileUpload result : <br>" + JSON.stringify(status) );
			} else {
				$('#sempfileUploadResult').html("fileUpload result : <br>" + status.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
				xmlDoc=loadXMLString(status);
				var serializer = new XMLSerializer();
				var string1 = serializer.serializeToString(xmlDoc);
				console.log("MDHBasic.SEMP.fileUpload",string1);
				showSuccessPopUp("",string1);
			}
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
				var resultData = error.resultData.replace(/</g, '&lt;').replace(/>/g, '&gt;');
				$('#sempfileUploadResult').html("fileUpload result : <br>" + "Error code : " + error.resultCode + "<br>" + 
									"Error Message : " + error.resultMsg + "<br>" + 
									"Error Data : " + resultData);
			}
			else {
				$('#sempfileUploadResult').html("fileUpload result : <br>" + "Error code : " + ret);
			}
		},
		{
			requestId : up_requestId,
			sType: up_sType,
			connectionType:up_connectionType,
			ipAddress:SEMP_ipAddress,
			portNumber:SEMP_portNumber,
			userId:up_userId,
			deviceId:up_deviceId,
			contextUrl:up_contextUrl,
			dataType: up_dataType,
			showProgress : up_showProgress,
			fileTransferUseLimit:up_fileTransferUseLimit,
			fileTransferMaxSIze:up_fileTransferMaxSIze,
			//fileName : "/storage/sdcard0/DCIM/Camera/20120223_173805.mp4",
			fileName : up_filePath,
			fileDescription:up_fileDescription
		}
	);
}

function MDHBasic_SEMP_fileUploadCancelRequest() {
	MDHBasic.SEMP.fileUploadCancel(
		{
			requestId : uuid
		}
	);
}


function getPicturePath (){
	
	  MDHDevice.Camera.getPicture(
		        function(result){
		            
		        	console.log('getPicturePath  : '+result);
		        	$('#up_filePath').val(result);
		        	
		        }, 
		        function(error){
		            var ret = "";
		            switch(parseInt(error)) {
		                case -10001:
		                ret = "MDH_INVALID_ARGUMENT";
		                break;
		                
		                case -10002:
		                ret = "MDH_JSON_EXP_ERROR";
		                break;
		                
		                case -10003:
		                ret = "MDH_USER_CANCELED";
		                break;
		                
		                case -10303:
		                ret = "MDH_Device_NO_CAMERA";
		                break;
		                
		                case -10305:
		                ret = "MDH_Device_OUT_OF_MEMORY";
		                break;
		                
		                case -10307:
		                ret = "MDH_Device_NO_DATA_IN_LIBRARY";
		                break;
		                
		                case -10400:
		                ret = "MDH_Storage_NOT_FOUND_ERR";
		                break;
		                
		                case -10411:
		                ret = "MDH_Storage_FILEBROWSER_ERR";
		                break;
		                
		                case -13007:
		                ret = "MDH_MDM_NOT_ALLOW_THIS_WORK";
		                break;

		                case -10009:
		                ret = "MDH_PLATFORM_NOT_SUPPORTED";
		                break;
		                
		                case -10099:
		                ret = "MDH_UNKNOWN_ERROR";
		                break;
		                
		                default:
		                ret = "MDH_UNKNOWN_ERROR";
		                break;
		            }
		            
		            if(parseInt(error) != -10003){            
		            	showFailPopUp("Error","Error Code : " + ret);
		            }
		        }, 
		        {
		            quality:50,
		            sourceType:MDHDevice.Camera.PictureSourceType.PHOTOLIBRARY,
		            destinationType:MDHDevice.Camera.DestinationType.FILE_URI,
		            imageType:MDHDevice.Camera.ImageType.ORIGINAL_IMAGE,
		            allowEdit:false,
		            useSecureStorage:false
		        }
		    );
	
}


