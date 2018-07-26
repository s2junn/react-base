/*$(document).ready(function() {
    $('#expandArea').hide();
});

function MDHDevice_Vibrator_run() {
    $('#expandArea').show();
}*/

function MDHDevice_Vibrator_runStart() {
    var inputDuration = $('#runVib').attr('value');
    $('.description').html('');
    
	MDHDevice.Vibrator.run(
		function(result) {
			showSuccessPopUp("",result);
			//$('.description').html(result);
		},
		function(error) {
			var ret = "";
			switch(parseInt(error)) {
				case -10001:
				ret = "MDH_INVALID_ARGUMENT";
				break;
				
				case -10002:
				ret = "MDH_JSON_EXP_ERROR";
				break;
				
				case -10309:
				ret = "MDH_Device_NOT_SUPPORT";
				break;
				
				case -10099:
				ret = "MDH_UNKNOWN_ERROR";
				break;
				
				default:
				ret = "MDH_UNKNOWN_ERROR";
				break;
			}
			
			showFailPopUp("",ret);
            //$('.description').html("Error Code : " + ret);
		},
		{"duration" : inputDuration}
	);
}
