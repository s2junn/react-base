

function MDHUtil_Barcode_decode() {
	MDHUtil.Barcode.decode(
		function(result) {
			$('#decode_result').html(result.type + "," + result.value);
		},
		function(error) {
			var ret = "";
			
			switch(parseInt(error)) {
				case -10002:
				ret = "MDH_JSON_EXP_ERROR";
				break;
				case -10500:
				ret = "MDH_Util_NO_CAMERA";
				break;
				case -10501:
				ret = "MDH_Util_CAMERA_IS_LOCKED";
				break;
				case -10003:
					console.log("MDH_USER_CANCELED");
				//ret = "MDH_USER_CANCELED";
				break;
				case -10097:
				ret = "MDH_CLASS_NOT_FOUND";
				break;
				case -10098:
				ret = "MDH_NO_SUCH_METHOD";
				break;
				case -13007:
	            ret = "MDH_MDM_NOT_ALLOW_THIS_WORK";
	            break;
				default:
				ret = "MDH_UNKNOWN_ERROR";
				break;
			}
			if("" != ret){
				showFailPopUp("",ret);
			}
			
		}
	);
}

function MDHUtil_Barcode_encode() {
	/*$('#expandAreaEncode').show();	
	$('#barcode_result').hide();*/
}
function MDHUtil_Barcode_generate() {
	
	var data = ''
	if($("#radio-url").is(":checked")) {
		// url
        if( ! $('#keyword').attr('value') ) {
        	showFailPopUp("",'Insert Data');
		    img = document.getElementById('encode_barcode_image');
            img.style.display = 'none';
            $('#encode_result_log').html("");
            return
        }
		data = 'URL:' + $('#keyword').attr('value');
	}
	else if($("#radio-text").is(":checked")){
		// text
        if( ! $('#keyword').attr('value') ) {
        	showFailPopUp("",'Insert Data');
		    img = document.getElementById('encode_barcode_image');
            img.style.display = 'none';
            $('#encode_result_log').html("");
            return
        }
		data = $('#keyword').attr('value');
	}
	else if($("#radio-phone").is(":checked")){
		// phone
        if( ! $('#keyword').attr('value') ) {
        	showFailPopUp("",'Insert Data');
		    img = document.getElementById('encode_barcode_image');
            img.style.display = 'none';
        	$('#encode_result_log').html("");
            return
        }
		data = 'TEL:' + $('#keyword').attr('value');
	}
	else if($("#radio-sms").is(":checked")){
		// sms
        if( ! $('#keyword').attr('value') ) { 
        	showFailPopUp("",'Insert Data');
		    img = document.getElementById('encode_barcode_image');
            img.style.display = 'none';
    		$('#encode_result_log').html("");
            return
        }
		data = 'SMS:' + $('#keyword').attr('value');
	}
	
	console.log('generate barcode data  : '+data);
	
	MDHUtil.Barcode.encode(
		function(barcode) {
			$('#encode_result').show();
			$('#encode_barcode_image').show();
			photo = barcode.data
		    img = document.getElementById('encode_barcode_image');
		    img.src = "data:image/png;base64,"+photo;
		    
		    console.log("  barcode.type   : "+barcode.type );
		    console.log("  barcode.src   : "+barcode.src );
		},
		function(error) {
			var ret = "";
			switch(parseInt(error)) {
				case MDHMgr.MDH_INVALID_ARGUMENT:
				ret = "MDH_INVALID_ARGUMENT";
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
		},
		data
	);
}
