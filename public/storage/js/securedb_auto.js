secureDBOpt = {}; // 무조건 초기화 하고 시작
secureDBOpt.init = false;
secureDBOpt.successFunc = function(key, nCount, success){
	var successLog = "[SUCCESS] NUMBER : " + (nCount+1) + "  COMMAND : " +  key + "<br>  RESULT : " +success + "<br>";
	console.log(successLog);
	secureDBOpt.resultArea[0].innerHTML = secureDBOpt.resultArea[0].innerHTML  + '<br>' + successLog;
};

secureDBOpt.errorFunc = function(error, key, nCount){

	var ret = "";
    switch(parseInt(error)) {
        case MDHMgr.MDH_CLASS_NOT_FOUND:
            ret = "MDH_CLASS_NOT_FOUND"
            break;
        case MDHMgr.MDH_NO_SUCH_METHOD:
            ret = "MDH_NO_SUCH_METHOD"
            break;
        case MDHMgr.MDH_INVALID_ARGUMENT:
            ret = "MDH_INVALID_ARGUMENT"
            break;
        case MDHMgr.MDH_JSON_EXP_ERROR:
            ret = "MDH_JSON_EXP_ERROR"
            break;
        case MDHMgr.MDH_SECUREDB_SQL_ERROR:
            ret = "MDH_SECUREDB_SQL_ERROR"
            break;
        case MDHMgr.MDH_CLASS_NOT_FOUND:
            ret = "MDH_CLASS_NOT_FOUND"
            break;
        case MDHMgr.MDH_NO_SUCH_METHOD:
            ret = "MDH_NO_SUCH_METHOD"
            break;
        default:
            ret = "MDH_UNKNOWN_ERROR";
            break;
    }
	
	testLog("[ERROR] NUMBER : " + (nCount+1) + " COMMAND : " +  key + "  RESULT : " + ret);
};

(function(opt, win){
	// 개인적으로 테스트 코드를 넣을때 쓴 것
	// 실제 테스트를 할 때는 false로 바꾸거나 삭제할 예정임
	var testVer = false;

	if(testVer == true){
		win.testLog = function(log){
			console.log(log);
			alert(log);
		};
	} else {
		win.testLog = function(log){
			console.log(log);
			// alert("[ERROR] NOT DEFINED FUNCTION IN MDHSTORAGE : " + key);
		};	
	}
	
	opt.runCB = {
		"createDB" : MDHStorage.SecureDB.createDB ,
		"dropDB" : MDHStorage.SecureDB.dropDB ,
		"createTable" : MDHStorage.SecureDB.createTable ,
		"dropTable" : MDHStorage.SecureDB.dropTable ,
		"insertData" : MDHStorage.SecureDB.insertData ,
		"updateData" : MDHStorage.SecureDB.updateData ,
		"queryData" : MDHStorage.SecureDB.queryData ,
		"deleteData" : MDHStorage.SecureDB.deleteData ,
		"execSQL" : MDHStorage.SecureDB.execSQL ,
		"closeDB" : MDHStorage.SecureDB.closeDB ,
	};
	
	// start check MDHStorage Secure managing function 
	$.each(opt.runCB, function(key, value){
		if(value == undefined){
			testLog("[ERROR] NOT DEFINED FUNCTION IN MDHstorage Plugin : " + key);
			return;
		}
	});

	var runCBLength = opt.runCB.length,
		runCBIndex = 0;

	opt.runExpresss = function(nIndex){
		// size check
		if(nIndex >= opt.autoValue.length) {
			opt.testLog("[END] EXECUTE COMMAND DONE")
			return;
		}
		
		// callback check
		if(opt.runCB[opt.autoValue[nIndex].COMMAND] == undefined){
			testLog("[ERROR] SECURE DB COMMAND.JS HAS WRONG_COMMAND");
		}
		var obj = opt.autoValue[nIndex];
		console.log('runExpresss');
		console.log('COMMAND  : '+obj.COMMAND);
		
		opt.runCB[obj.COMMAND](
			function(success){
				opt.successFunc(obj.COMMAND, nIndex, success);
				setTimeout(function(){
					opt.runExpresss(nIndex+1);
				}, opt.INTERVALTIME);
			}, 
			function(error){
				opt.errorFunc(error, obj.COMMAND  , nIndex);
			}, obj.VALUE
		);
	}

	opt.initialize = function(obj){
		
		if(opt.init == false){
			console.log("[SET] START init ");
			opt.autoValue = [];

			$.each(obj , function(key, value){
				console.log('  key : ' +  ' , value  :'+value);
				opt.autoValue.push({"COMMAND" : key , "VALUE" : value});
			});
			console.log("[SET] END init ");
			opt.init = true;

			if(opt.INTERVALTIME == undefined){
				opt.INTERVALTIME =  50;	
			}
		}

		opt.runExpresss(0);
	}

	// end check MDHStorage Secure managing function 
	$(document).ready(function(){
		
		opt.resultArea = $('#result_auto_run');
	});
})(secureDBOpt, window);


