/*
 * virtual function
 */

if((typeof MDHVirtualAdapter === "undefined") && MDHMgr.device.platform === "virtual") {
    var MDHVirtualAdapter = new function() {
    	var result = {};
        result.status = 1;
       	result.keepCallback = 0;
                
        this.SSO = new function() {
            this.getInfo = function(callbackId, option) {
                
                if(!option || option.length == 0) {
                    result.message = MDHMgr.MDH_INVALID_ARGUMENT;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                }
                
                var ssoInfo = {
                    nickname : "별명",
                    fullname : "이름",
                    familyname : "성",
                    givenname : "뭐지",
                    telephone_home : "02-000-1111",
                    telephone_work : "02-111-2222",
                    telephone_mobile : "010-1111-3333",
                    telephone_fax : "031-111-2222",
                    email : "email@samsung.com",
                    address_home : "서울시 강남구",
                    address_work : "서울시 강남구 삼성동",
                    company : "회사",
                    department : "부서",
                    position : "직급",
                    employeeNumber : "사번",
                    departmentNumber : "111",
                    companyCode : "0101",
                    isBlue : "Y",
                    securityLevel : "3",
                    epid : "1234",
                    gender : "남",
                    titleNumber : "???",
                    userId : "ididid",
                    mailHost : "samsung.com",
                    telephoneInternet : "070-1111-2222",
                    gradeOrTitle : "???",
                    country : "대한민국",
                    preferredLanguagePresentation : "???",
                    userLevel : "30",
                    userStatus : "상태정보",
                    isNative : "N",
                    busiCode : "101",
                    busiName : "???",
                    suborgcode : "123",
                    suborgname : "???",
                    gradeName : "???",
                    resionCode : "321",
                    job : "회사원",
                    jobName : "회사원"
                }
                
                result.message = {};
                
                for(var i=0; i<option.length; i++) {
                    result.message[option[i]] = ssoInfo[option[i]];
                }
                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
        }
        
        this.ScreenLock = new function() {
            this.isLocked = function(callbackId, option) {
                result.message = "false";
                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.unlock = function(callbackId, option) {
                
                if(!option || option.length == 0) {
                    result.message = MDHMgr.MDH_INVALID_ARGUMENT;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                }
                
                result.message = "true";
                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
        }
        
	this.Attachment = new function() {
            // todo : option 처리 
            this.load = function(callbackId, option) {
                
                if(!option) {
                    result.message = MDHMgr.MDH_INVALID_ARGUMENT;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                }
                result.message = "";
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }

            this.loadTablet = function(callbackId, option) {
                
                if(!option) {
                    result.message = MDHMgr.MDH_INVALID_ARGUMENT;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                }
                result.message = "";
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
        }
        
        this.CustomEvent = new function() {
            this.link = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.unlink = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
        }
        
		this.Event = new function() {
            this.addListener = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.removeListener = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
        }
        
        this.SEMP = new function() {
            // todo : option 처리 
            this.request = function(callbackId, option) {
                
                if(!option) {
                    result.message = MDHMgr.MDH_INVALID_ARGUMENT;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                }
                
                var dataType = option.dataType;
                var jsonResult = {};
                var xmlResult = "<?xml version='1.0' encoding='UTF-8' standalone='yes' ?><rss xmlns:sds='http://www.samsung.com' version='2.0'></rss>";
                
                if(dataType == "json") {
                    jsonResult.type = "json",
                    jsonResult.data = "sample"
                    
                    result.message = jsonResult;
                    
                    return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                }
                else {
                    result.message = xmlResult;
                    
                    return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                }
            }
            
            this.fileUpload = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
			this.fileUploadCancel = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
        }

		this.SEMPLog = new function() {
            this.transferFile = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
        }
        
		this.SEMPProvision = new function() {
            this.provision = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.initProvision = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
        }
        
		this.EMMConnector = new function() {
            // todo : option 처리 
            this.request = function(callbackId, option) {
                
                if(!option) {
                    result.message = MDHMgr.MDH_INVALID_ARGUMENT;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                }
                
                var dataType = option.dataType;
                var jsonResult = {};
                var xmlResult = "<?xml version='1.0' encoding='UTF-8' standalone='yes' ?><rss xmlns:sds='http://www.samsung.com' version='2.0'></rss>";
                
                if(dataType == "json") {
                    jsonResult.type = "json",
                    jsonResult.data = "sample"
                    
                    result.message = jsonResult;
                    
                    return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                }
                else {
                    result.message = xmlResult;
                    
                    return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                }
            }
            
            this.fileUpload = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
			this.fileUploadCancel = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
        }
        
        this.Contact = new function() {
            this.search = function(callbackId, option) {
                
                result.message = [];
                
                var contactInfo = {
                    uid : "uid123",
                    fullname : "테스트",
                    addressHome : "집주소",
                    addressWork : "회사주소",
                    telMobile : "휴대폰번호",
                    telHome : "집전화",
                    telWork : "회사전화",
                    emailMobile : "모바일 이메일",
                    emailWork : "회사메일",
                    emailHome : "집 이메일",
                    website : "사이트",
                    note : "메모",
                    company : "회사",
                    position : "직급",
                    nickname : "별명",
                    im : "메신저주소"
                };
                
                if(!option.fields || option.fields.length == 0) {
                    result.message = MDHMgr.MDH_INVALID_ARGUMENT;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                }
                else if(option.fields == "*") {
                    if(!option.filter || option.filter.length == 0) {
                        result.message.push(contactInfo);
                        return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                    }
                    else {
                        for(var obj in contactInfo) {
                            if(contactInfo[obj].indexOf(option.filter) > -1) {
                                result.message.push(contactInfo);
                                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                            }
                        }
                        
                        if(result.message.length == 0) {
                            result.message = [];
                            return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                        }
                    }
                }
                else {
                    if(!option.filter || option.filter.length == 0) {
                        result.message = MDHMgr.MDH_INVALID_ARGUMENT;
                        return MDHMgr.CallbackMgr.onError(callbackId, result);
                    }
                    else {
                        for(var i=0; i<option.fields.length; i++) {
                            if(contactInfo[option.fields[i]].indexOf(option.filter) > -1) {
                                result.message.push(contactInfo);
                                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                            }
                        }
                        result.message = [];
                        return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                    }
                }
            }
        }
        
        this.Telephony = new function() {
            this.call = function(callbackId, option) {
                
                if(!option || option.phoneNumber.length == 0) {
                    result.message = MDHMgr.MDH_INVALID_ARGUMENT;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                }
                
                result.message = "OK";
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.sendSMS = function(callbackId, option) {
                // todo : option 값 처리 
                
                if(!option) {
                    result.message = MDHMgr.MDH_INVALID_ARGUMENT;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                }
                
                if(option.direct == true) {
                    result.message = "OK";
                    return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                }
                else {
                    result.message = MDHMgr.MDH_Device_NOT_SUPPORT;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                }
            }
        }
        
        this.Camera = new function() {
            var tempListener = null;
            this.getPicture = function(callbackId, option) {
                
                if( parseInt(option.quality) < 0 || parseInt(option.quality) > 100 
                   || parseInt(option.sourceType) < 0 || parseInt(option.sourceType) > 2 
                   || parseInt(option.destinationType) < 0 || parseInt(option.destinationType) > 1
                   || parseInt(option.imageType) < 0 || parseInt(option.imageType) > 2) {
                    result.message = -10001;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                } else if(parseInt(option.destinationType) == 1) { // file uri
                    result.message = -10303;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                }
                
                if(tempListener != null)
                    MDHDevice.Camera.fire({"type":tempListener , "value":"test.jpg"});
                
                result.message = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDGooor3jnP/9k=";
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.addListener = function(callbackId, option) {
                tempListener = option.type;
            }
            
            this.removeListener = function(callbackId, option) {
                tempListener = null;
            }
            
            this.deleteImage = function(callbackId, option) {
                
                if(option.path == null || option.path.indexOf("test.jpg") < 0) {
                    result.message = -10001;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                } else {
                    result.message = "test.jpg is deleted";
                    return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                }
            }
        }
        
        this.Accelerator = new function() {
            this.start = function(callbackId, option) {
                var x = 0.0, y = 10.0, z = 100.0;
                var _timer = setInterval(function() {
                                         MDHDevice.Accelerator._onUpdate(x++, y++, z++);
                                         }, option.frequency);
                
                sessionStorage.watchAccelId = _timer;
            }
            
            this.stop = function(callbackId, option) {
                clearInterval(sessionStorage.watchAccelId);
            }
        }
        
        this.Compass = new function() {
            this.start = function(callbackId, option) {
                var compassInfo = {
                    timestamp : 0.0,
                    magneticHeading : 10.0,
                    trueHeading : 100.0,
                    headingAccuracy : 1000.0
                }

                var _timer = setInterval(function() {
                                         compassInfo.trueHeading++;
                                         MDHDevice.Compass._setHeading(compassInfo);
                                         }, option.frequency);
                
                sessionStorage.watchCompassId = _timer;
            }
            
            this.stop = function(callbackId, option) {
                clearInterval(sessionStorage.watchCompassId);
            }
        }
        
        this.GPS = new function() {
            this.start = function(callbackId, option) {
                var coordsInfo = {
                    latitude : 37.0,
                    longitude : 132.0,
                    altitude : 79.05,
                    heading : 100.0,
                    speed : -1,
                    accuracy : 65,
                    altitudeAccuracy : 50
                }
                
                var result = {
                    timestamp : 10000000
                }
                
                result.coords = coordsInfo;
                
                var _timer = setInterval(function() {
                                         result.timestamp++;
                                         MDHDevice.GPS._setPosition(result);
                                         }, option.frequency);
                
                sessionStorage.watchPositionIdVirtual = _timer;
            }
            
            this.stop = function(callbackId, option) {
                clearInterval(sessionStorage.watchPositionIdVirtual);
            }
        }
        
        this.Network = new function() {
            this.isReachable = function(callbackId, option) {
                
                if(option.hostName == null) {
                    result.message = -10001;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                } else {
                    result.message = 1;
                    return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                }
                    
            }
        }
        
        this.Vibrator = new function() {
            this.run = function(callbackId, option) {
                
                if(option.duration == null || parseInt(option.duration) < 0) {
                    result.message = -10001;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                } else {
                    result.message = "OK";
                    return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                }
            }
        }
        
        this.File = new function() {
            this.getFreeDiskSpace = function(callbackId, option) {
                
                result.message = 123456789;
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.exists = function(callbackId, option) {
                
                if(sessionStorage.getItem(option.filepath) == null) {
                    result.message = "false";
                } else {
                    result.message = "true";
                }
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.remove = function(callbackId, option) {
                
                if(sessionStorage.getItem(option.filepath) == null) {
                    result.message = -10400;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                } else {
                    result.message = "OK";
                    sessionStorage.removeItem(option.filepath);
                    return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                }
            }
            
            this.list = function(callbackId, option) {
                
                var array =[];
                for(var index = 0; index < sessionStorage.length; index++) {
                    var fileKey = sessionStorage.key(index)
                    if(fileKey.indexOf(".txt") > 0)
                        array.push(fileKey);
                }
                result.message = array;
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.fileSize = function(callbackId, option) {
                
                if(sessionStorage.getItem(option.filepath) == null) {
                    result.message = -10400;
                    return MDHMgr.CallbackMgr.onError(callbackId, result);
                } else {
                    result.message = sessionStorage.getItem(option.filepath).length;
                    return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
                }
            }
            
			this.read = function(callbackId, option) {
                if(sessionStorage.getItem(option.filepath) == null) {
                    MDHStorage.FileMgr.writer_onerror(option.filepath, -10001);
                } else {
                    MDHStorage.FileMgr.reader_onloadstart(option.filepath);
                    MDHStorage.FileMgr.reader_onload(option.filepath, sessionStorage.getItem(option.filepath));
                }
            }
            
            // todo
            this.write = function(callbackId, option) {
                if(sessionStorage.getItem(option.filepath) != null)
                {
                    var contents = sessionStorage.getItem(option.filepath);
                    if(contents.length == option.offset)
                    {
                        MDHStorage.FileMgr.writer_onwritestart(option.filepath);
                        sessionStorage.setItem(option.filepath, contents + option.data);
                        MDHStorage.FileMgr.writer_oncomplete(option.filepath, option.data.length, sessionStorage.getItem(option.filepath).length);
                    }
                    else if(contents.length > option.offset)
                    {
                        MDHStorage.FileMgr.writer_onwritestart(option.filepath);
                        if(contents.length <= option.offset + option.data.length) {
                            sessionStorage.setItem(option.filepath, contents.substring(0, option.offset) + option.data);
                        } else {
                            sessionStorage.setItem(option.filepath, contents.substring(0, option.offset) + option.data + contents.substring(option.offset+option.data.length+1));
                        }
                    
                        MDHStorage.FileMgr.writer_oncomplete(option.filepath, option.data.length, sessionStorage.getItem(option.filepath).length);                    
                    }
                    else
                    {
                        // error case
                        MDHStorage.FileMgr.writer_onerror(option.filepath, -10001);
                    }
                }
                else
                {
                    MDHStorage.FileMgr.writer_onwritestart(option.filepath);
                    sessionStorage.setItem(option.filepath, option.data);
                    MDHStorage.FileMgr.writer_oncomplete(option.filepath, option.data.length, option.data.length);
                }
            }
            
            this.truncate = function(callbackId, option) {
                if(sessionStorage.getItem(option.filepath) == null) {
                    MDHStorage.FileMgr.writer_onerror(option.filepath, -10001);
                } else {
                    if(sessionStorage.getItem(option.filepath).length >= option.offset) {
                       var contents = sessionStorage.getItem(option.filepath);
                       sessionStorage.setItem(option.filepath, contents.substring(0, option.offset));
                       MDHStorage.FileMgr.writer_ontruncate(option.filepath, option.offset);
                    } else {
                       MDHStorage.FileMgr.writer_ontruncate(option.filepath, sessionStorage.getItem(option.filepath).length);
                    }
                }
            }
        }
        
		this.SEMPProvision = new function() {
            this.createDB = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.dropDB = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.closeDB = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.createTable = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.dropTable = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.insertData = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.updateData = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.queryData = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.deleteData = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.querySQL = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.execSQL = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
        }
        
        this.Barcode = new function() {
            this.encode = function(callbackId, option) {
                
                result.message = {"src":option.src,"type":option.type, "data":"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDKooorgPrj/9k="};
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.decode = function(callbackId, option) {
                
                result.message = {"type":"QR Code", "value":"This is a test decode message"};
                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
        }
        
        this.Browser = new function() {
            this.SENSOR_ON = 1;
            this.SENSOR_OFF = 2;
            this.LANDSCAPE = 3;
            this.PORTRAIT = 4;
            
            var orientationSetInfo = this.SENSOR_ON;
            
            this.startLoadingBar = function(callbackId, option) {
            	alert("Not supported command in virtual mode");
            }
            
            this.stopLoadingBar = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.clearHistory = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.setOrientation = function(callbackId, option) {
                
                result.message = option;
                orientationSetInfo = option;
                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.getOrientation = function(callbackId, option) {
                
                result.message = orientationSetInfo;
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.ORIENT_UNKNOWN = 0;
            this.ORIENT_PORTRAIT = 1;
            this.ORIENT_PORTRAITUP = 2;
            this.ORIENT_LANDSCAPELEFT = 3;
            this.ORIENT_LANDSCAPERIGHT = 4;
            this.ORIENT_FACEUP = 5;
            this.ORIENT_FACEDOWN = 6;
            this.getCurrentOrientation = function(callbackId, option) {
                
                result.message = this.ORIENT_UNKNOWN;                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.clearCache = function(callbackId, option) {
             	alert("Not supported command in virtual mode");   
            }
            
            this.terminateApp = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
            
            this.terminateApp2 = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
        }
        
		this.SignPad = new function() {
            this.start = function(callbackId, option) {
                alert("Not supported command in virtual mode");
            }
        }
        
        this.Device = new function() {
            this.getDeviceInfo = function(callbackId, option) {

                result.message = {
                    osInformation : "virtual",
                    uuid : "uuid value",
                    phoneNumber : "000-1111-2222",
                    modelInfo : "PC",
                    ownerInfo : "me",
                    imei : "imei value",
                    actualWidth : "1920",
                    actualHeight : "1080",
                    actualBodyWidth : "1920",
                    actualBodyHeight : "1060",
                    actualStatusBarHeight : "20"
                }
                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.getLanguage = function(callbackId, option) {
                
                result.message = "en";
                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.getNetworkInfo = function(callbackId, option) {
                
                result.message = MDHInfo.Device.CARRIER_DATA;
                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.getStorageInfo = function(callbackId, option) {
                
                result.message = {
                    totalSize : "100",
                    freeSize : "50",
                    extTotalSize : "100000",
                    extFreeSize : "50000"
                }
                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
            
            this.getBatteryInfo = function(callbackId, option) {
                
                result.message = {
                    level : 100,
                    isCharging : false
                }
                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
        }
        
        this.Platform = new function() {
            this.getVersions = function(callbackId, option) {
                
                result.message = {
                    Hybrid : "4.0.0",
                    Mobiledesk : "1.0",
                    Launcher : "1.0"
                }
                
                return MDHMgr.CallbackMgr.onSuccess(callbackId, result);
            }
        }
    }
}