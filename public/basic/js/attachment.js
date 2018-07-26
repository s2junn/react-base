$(document).ready(function() {
	
    $('#docTypes > dd > a').on('click', function(){ 
    	$('[class=btn-type-dt-sm-selected]').removeClass('btn-type-dt-sm-selected').addClass('btn-type-dt-sm');
    	$(this).removeClass('btn-type-dt-sm').addClass('btn-type-dt-sm-selected');
    });
});

var ATTACHMENT_fileUrl = ATTACHMENT_fileUrl_xls;

function MDHBasic_Attachment_loadStart() {	
	console.log("MDHBasic_Attachment_load()");	
	var file_address = ATTACHMENT_fileUrl;
	
	//Encode Utf-8 for korean titled file.
	var file_name_index_from_file_address = file_address.lastIndexOf("/") + 1;
	var Encoded_file_name_from_file_address =  encodeURIComponent(file_address.substring(file_name_index_from_file_address));
	
	file_address = file_address.substring(0,file_name_index_from_file_address) + Encoded_file_name_from_file_address;
	
	var file_name = $('#file_name').attr('value');
	var id = $('#id').attr('value');
	var password = $('#password').attr('value');
	
	/*
	var attachID = $('#attachID').attr('value');
	var group = $('#group').attr('value');
	var email_address = $('#email_address').attr('value');
	var drm_user_id = $('#drm_user_id').attr('value');
	var drm_product_key = $('#drm_product_key').attr('value');
	*/
	var bSheet = false;
	var fit_width = false;
	var show_toast = false;
	
	if($("#whole_sheet").is(":checked")) {
		bSheet = true;
	}
	if($("#fit_width").is(":checked")) {
		fit_width = true;
	}
	if($("#show_toast").is(":checked")) {
		show_toast = true;
	}
	
	MDHBasic.Attachment.load(
		function(result) {
			//alert(result);
			console.log("MDHBasic.Attachment.load Success!!");
		},
		function(error){
			var ret = "";
			console.log("MDHBasic.Attachment.load Error!! parseInt(error) = " + parseInt(error));
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
				
				case -10001:
				ret = "MDH_INVALID_ARGUMENT";
				break;
				
				case -10003:
				ret = "MDH_USER_CANCELED";
				break;
				
				case -10099:	
				ret = "MDH_UNKNOWN_ERROR";		
				break;

				default:		
				ret = error;		
				break;
			}
			
			if(typeof ret == "object" ) {
				console.log("MDHBasic.Attachment.load Error!! object error.ErrorCode = " + error.ErrorCode + ", error.ErrorMessage = " + error.ErrorMessage);
				
				if(!show_toast) {
					showFailPopUp("Error","Error code : " + error.ErrorCode + "<br>" +"Error Message : " + error.ErrorMessage);
				}					
			}
			else {
				console.log("MDHBasic.Attachment.load Error!! None object");
				showFailPopUp("Error","Error code : " + error.ErrorCode + "<br>" +"Error Message : " + error.ErrorMessage);				
			}
		},

		{
			server_address:ATTACHMENT_ipAddress,
			port:ATTACHMENT_portNumber,
			file_address:file_address,
			file_name:file_name,
			id:id,
			password:password,
			/*
			attachID:attachID,
			group:group,
			email_address:email_address,
			drm_user_id:drm_user_id,
			drm_product_key:drm_product_key,
			*/
			whole_sheet:bSheet,
			fit_width:fit_width,
			show_toast:show_toast
		}
	);
}

function ClearFileInfos(){	
	//document.getElementById('server_address').value = "";
	//document.getElementById('port').value = "";
	//document.getElementById('file_address').value = "";
	document.getElementById('file_name').value = "";
	document.getElementById('id').value = "";
	document.getElementById('password').value = "";
	document.getElementById('whole_sheet').checked = false;
	/*
	document.getElementById('attachID').value = "";
	document.getElementById('group').value = "";
	document.getElementById('email_address').value = " ";
	document.getElementById('drm_user_id').value = "";
	document.getElementById('drm_product_key').value = "";
	*/	
}

function MDHBasic_Attachment_Excel() {
	ClearFileInfos();
	ATTACHMENT_fileUrl = ATTACHMENT_fileUrl_xls;
	document.getElementById('file_name').value = "공용단말기 서비스 일괄신청 양식.xls";
	document.getElementById('id').value = "test";
}

function MDHBasic_Attachment_PPT() {
	ClearFileInfos();
	ATTACHMENT_fileUrl = ATTACHMENT_fileUrl_ppt;
	document.getElementById('file_name').value = "협력사 임직원 보안복합기 사용안내.ppt";
	document.getElementById('id').value = "test";
}

function MDHBasic_Attachment_Docx() {
	ClearFileInfos();
	ATTACHMENT_fileUrl = ATTACHMENT_fileUrl_docx;
	document.getElementById('file_name').value = "151117.docx";
	document.getElementById('id').value = "test";
}

function MDHBasic_Attachment_Txt() {
	ClearFileInfos();
	ATTACHMENT_fileUrl = ATTACHMENT_fileUrl_txt;
	document.getElementById('file_name').value = "일일보고수정.txt";
	document.getElementById('id').value = "test";
	}

function MDHBasic_Attachment_Pdf() {
	ClearFileInfos();
	ATTACHMENT_fileUrl = ATTACHMENT_fileUrl_pdf;
	document.getElementById('file_name').value = "KnoxGuideKor.pdf";
	document.getElementById('id').value = "test";
}

function MDHBasic_Attachment_Gul() {
	ClearFileInfos();
	file_address_url = ATTACHMENT_fileUrl_gul;
	document.getElementById('file_name').value = "erd.gul";
	document.getElementById('id').value = "test";
}

function MDHBasic_Attachment_Jpg() {
	ClearFileInfos();
	ATTACHMENT_fileUrl = ATTACHMENT_fileUrl_jpg;
	document.getElementById('file_name').value = "s5_knox.jpg";
	document.getElementById('id').value = "test";
}

function MDHBasic_Attachment_Whole_Sheet() {
	ClearFileInfos();
	ATTACHMENT_fileUrl = ATTACHMENT_fileUrl_tiff;
	document.getElementById('file_name').value = "sample.tiff";
	document.getElementById('id').value = "test";
	document.getElementById('whole_sheet').checked = true;
}
