
var camera_Path;
var image_file_name;

function MDHDevice_Camera_getPictureStart(){	
    console.log("MDHDevice_Camera_getPicture()");
    $('#camera_result').html("");
    
    //input Quality
    var inputQuality = $('#quality').attr('value');
    
    var destinationType;
    if($("#radio1-1").is(":checked"))
        destinationType = MDHDevice.Camera.DestinationType.DATA_URL;
    else if($("#radio1-2").is(":checked"))
        destinationType = MDHDevice.Camera.DestinationType.FILE_URI;
        
    var pictureSourceType;
    if($("#radio2-1").is(":checked"))
        pictureSourceType = MDHDevice.Camera.PictureSourceType.PHOTOLIBRARY;
    else if($("#radio2-2").is(":checked"))
        pictureSourceType = MDHDevice.Camera.PictureSourceType.CAMERA;
    else if($("#radio2-3").is(":checked"))
        pictureSourceType = MDHDevice.Camera.PictureSourceType.SAVEDPHOTOALBUM;
        
    var imageSizeType;
    if($("#radio3-1").is(":checked"))
    {
        imageSizeType = MDHDevice.Camera.ImageType.ORIGINAL_IMAGE;
        console.log("getpicture : Camera.ImageType.ORIGINAL_IMAGE");
    }
    else if($("#radio3-2").is(":checked"))
    {
        imageSizeType = MDHDevice.Camera.ImageType.MINI_IMAGE;
        console.log("getpicture :Camera.ImageType.MINI_IMAGE");
    }
    else if($("#radio3-3").is(":checked"))
    {
        imageSizeType = MDHDevice.Camera.ImageType.MICRO_IMAGE;
        console.log("getpicture : Camera.ImageType.MICRO_IMAGE");
    }
    
//    alert("quality = " + inputQuality + "/n" + "desType = " + destinationType + "\n" + 
//    		"picSrcType = " + pictureSourceType + " imageSizeType = " + imageSizeType + "\n");
    		 
	
        
    MDHDevice.Camera.getPicture(
        function(imageData){
            //$('#camera').hide();
            $('#image_result').show();
            $('#image_result_name').html(image_file_name);
            
            $('#image_result_d').show();
            $('#image_result_name_d').html(image_file_name);
            
            var image = document.getElementById('myImage');
            
            if(destinationType == MDHDevice.Camera.DestinationType.DATA_URL)
            {
                image.src = "data:image/jpeg;base64," + imageData;
            }
            else
            {
                image.src = imageData;
            }
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
            //quality: 50,
            //sourceType: MDHDevice.Camera.PictureSourceType.PHOTOLIBRARY
            quality:inputQuality,
            sourceType:pictureSourceType,
            destinationType:destinationType,
            imageType:imageSizeType,
            allowEdit:true,
            useSecureStorage:false
        }
    );
}

function MDHDevice_Camera_addListener() {	
    MDHDevice.Camera.addListener("filepath", filepathReceiveCallback);
}

function MDHDevice_Camera_removeListener() {	
    MDHDevice.Camera.removeListener("filepath", filepathReceiveCallback);
}

function filepathReceiveCallback(event) {
    camera_Path = JSON.stringify(event.value);
    
    var vars = camera_Path.split("/");
    image_file_name = vars[vars.length -1];
    image_file_name = image_file_name.substring(0,image_file_name.length -1);
    
}

function MDHDevice_Camera_deleteImage() {	
    MDHDevice.Camera.deleteImage(
        function(imageData){
        	$('#image_result').hide();
        	$('#image_result_d').hide();
        	
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

                case -10309:
                ret = "MDH_Device_NOT_SUPPORT";
                break;
                
                case -10009:
                ret = "MDH_PLATFORM_NOT_SUPPORTED";
                break;
                                
                default:
                ret = "MDH_UNKNOWN_ERROR";
                break;
            }
            showFailPopUp("Error","Error Code : " + ret);
        }, 
        {
            path:camera_Path,
            useSecureStorage:false
        }
    )
}
