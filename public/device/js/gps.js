var gWatchId = null;

$(document).ready(function() {	 
	
   
    if(localStorage.GSP_Cur_result == "true")
    {
        $('#latitude').html(localStorage.GPS_Cur_latitude); 
        $('#longitude').html(localStorage.GPS_Cur_longitude);
        $('#altitude').html(localStorage.GPS_Cur_altitude);
        $('#accuracy').html(localStorage.GPS_Cur_accuracy);
        $('#bearing').html(localStorage.GPS_Cur_bearing);
        $('#speed').html(localStorage.GPS_Cur_speed);
        $('#time').html(localStorage.GPS_Cur_time);
        
        localStorage.GSP_Cur_result = "false";
        localStorage.GPS_Cur_latitude = "";
        localStorage.GPS_Cur_longitude = "";
        localStorage.GPS_Cur_altitude = "";
        localStorage.GPS_Cur_accuracy = "";
        localStorage.GPS_Cur_bearing = "";
        localStorage.GPS_Cur_speed = "";
        localStorage.GPS_Cur_time = "";
        
    	localStorage.isCurrentGPSResultShow = "true";
    }
    
    var currentFileName = location.href.split("/").slice(-1).toString();
    
    if(currentFileName == "gps.html" && localStorage.isCurrentGPSResultShow == "true"){
    	
    	$('.slide_li').first().next().slideToggle(0,null);
    	localStorage.isCurrentGPSResultShow = "false";
    }
    
});


function MDHDevice_GPS_stopWatch() {
	var watchId = sessionStorage.watchPositionId;
	if(watchId != null) {
		MDHDevice.GPS.clearWatch(watchId);
		sessionStorage.removeItem("watchPositionId");
		
		$('#latitude').html(""); 
		$('#longitude').html("");
		$('#altitude').html("");
		$('#accuracy').html("");
		$('#bearing').html("");
		$('#speed').html("");
		$('#time').html("");    
	}
}


function MDHDevice_GPS_getCurrentPositionStart() {
	
	
	console.log("MDHDevice_GPS_getCurrentPosition");
	
    var inputTimeout = $('#timeoutCurrent').attr('value');
	var inputAccuracy = $('#GPS_current').attr('value');
	
	MDHDevice.GPS.getCurrentPosition(
        function(result) {
            var lstResult = "";
            pos = result; 
            
            localStorage.GSP_Cur_result = "true";
            localStorage.GPS_Cur_latitude = pos.coords.latitude;
            localStorage.GPS_Cur_longitude = pos.coords.longitude;
            localStorage.GPS_Cur_altitude = pos.coords.altitude;
            localStorage.GPS_Cur_accuracy = pos.coords.accuracy;
            localStorage.GPS_Cur_bearing = pos.coords.bearing;
            localStorage.GPS_Cur_speed = pos.coords.speed;
            localStorage.GPS_Cur_time = pos.timestamp;
           
           // var gpsResultPage =  location.href.substring(0,location.href.lastIndexOf("/") +1) + "gps_result.html?coords=" + lstResult;
            window.location.href = location.href.substring(0,location.href.lastIndexOf("/") +1) + "gps_result.html";
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
                
                case -10003:
				ret = "MDH_USER_CANCELED";
				break;
				
				case -10099:
				ret = "MDH_UNKNOWN_ERROR";
				break;
				
				case -10300:
				ret = "MDH_Device_error";
				break;
				
				case -10301:
				ret = "MDH_Device_GPS_IS_NOT_AVAILABLE";
				break;

				case -10310:
				ret = "MDH_Device_GPS_TIMEOUT";
				break;
										
				default:
				ret = "MDH_UNKNOWN_ERROR";
				break;
			}
			
			showFailPopUp("","Error Code : " + ret);            
        },
        {timeout:/*default = 30000*/inputTimeout,
		 accuracy:inputAccuracy
		}
    );
}

function MDHDevice_GPS_watchPositionStart() {
	console.log("MDHDevice_GPS_watchPosition");
    var inputTimeout = $('#timeoutWatch').attr('value');
    var inputFrequency = $('#frequency').attr('value');
	var inputAccuracy = $('#GPS_watch').attr('value');	
    
	var watchId = sessionStorage.watchPositionId;
	console.log("MDHDevice_GPS_watchPosition " + watchId);
	MDHMgr.log("MDHDevice_GPS_watchPosition " + watchId);
	
	if(watchId == null || watchId == undefined || watchId == "" || watchId == "null" || watchId == "undefined") {
		watchId = MDHDevice.GPS.watchPosition(
                    function(result) {
                        var lstResult = "";
                        pos = result;
                        
                        lstResult +="<p align='left'>" + "latitude : " + pos.coords.latitude + "<br>";
                        lstResult += "longitude : " + pos.coords.longitude + "<br>";
                        lstResult += "altitude : " + pos.coords.altitude + "<br>";
                        lstResult += "accuracy : " + pos.coords.accuracy + "<br>";
                        lstResult += "bearing : " + pos.coords.bearing + "<br>";
                        lstResult += "speed : " + pos.coords.speed + "<br>";
                        lstResult += "time : " + pos.timestamp + "</p>";
                        
                        //Custom 팝업으로 적용 필요.
                        showSuccessPopUp("Watch Result",lstResult);
                        
                        var watchId = sessionStorage.watchPositionId;
                    	if (watchId > 0) {
                    		$('#gps_result').html("GPS watcher" + watchId + "exists!");
                    	}
                        
                       // window.location.href = "../device/gps_03.html?coords=" + lstResult;
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
                            
                            case -10003:
                            ret = "MDH_USER_CANCELED";
                            break;
							
							case -10099:
							ret = "MDH_UNKNOWN_ERROR";
							break;
							
							case -10300:
							ret = "MDH_Device_error";
							break;
							
							case -10301:
							ret = "MDH_Device_GPS_IS_NOT_AVAILABLE";
							break;

							case -10310:
							ret = "MDH_Device_GPS_TIMEOUT";
							break;
									
							default:
							ret = "MDH_UNKNOWN_ERROR";
							break;
						}
						showFailPopUp("","Error Code : " + ret); 
                    },
                    {timeout:/*30000*/inputTimeout, 
					 frequency:/*10000*/inputFrequency,
					 accuracy:inputAccuracy
					 }
                );
		
		sessionStorage.watchPositionId = watchId;		
		console.log("start to watchPosition[" + watchId + "]");
	} else {		
		showSuccessPopUp("Notice","GPS watcher [" + sessionStorage.watchPositionId + "] already exists!");        
	}
}

function MDHDevice_GPS_clearWatch() {	
	$('.gps_watch_li').next().slideToggle('slow', null);	
    var watchId = sessionStorage.watchPositionId;
	if (watchId > 0) {
		$('#gps_result').html("GPS watcher [" + watchId + "] exists!");
	}
}

function MDHDevice_GPS_clearWatchStart() {
	var watchId = sessionStorage.watchPositionId;
	console.log("MDHDevice_GPS_clearWatch " + watchId);
	if(watchId != null) {
		MDHDevice.GPS.clearWatch(watchId);
		sessionStorage.removeItem("watchPositionId");
		$('#gps_result').html("");
	}	
	
}
