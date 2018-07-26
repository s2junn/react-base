
var createTableArg1  = "id INTEGER PRIMARY KEY AUTOINCREMENT";
var createTableArg2  = "no1 INTEGER default 1111";
var createTableArg3  = "content1 text";
var createTableArgs = [];

$(document).ready(function() {
	
	createTableArgs.push(createTableArg1);
	createTableArgs.push(createTableArg2);
	createTableArgs.push(createTableArg3);
	
});
		
function btnExecCreateDB(){	
	var id = 'ExecCreateDB';
	var testDBName = $('#'+id).attr('value');
	console.log("clicked start " + id);
	
	inputValue = {
		"path":testDBName,
		"password":"testA"
	};
	
	MDHStorage.SecureDB.createDB(function(success){
		showSuccessPopUp("","success createDB " + success);
	}, function(error){
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
            default:
                ret = "MDH_UNKNOWN_ERROR";
                break;
        }
	    showFailPopUp("",ret);
	}, inputValue);

	console.log("clicked end btnExecCreateDB");
};


function btnExecDropDB(){
	var id = 'ExecDropDB';
	var testDBName = $('#'+id).attr('value');
	console.log("clicked start " + id);

	inputValue = {
		"path":testDBName
	};

	MDHStorage.SecureDB.dropDB(function(success){
		if(success){
			showSuccessPopUp("","success dropDB " + success);
		}else{
			showFailPopUp("","fail dropDB");
		}
		
	}, function(error){
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
            default:
                ret = "MDH_UNKNOWN_ERROR";
                break;
        }
	    showFailPopUp("",ret);
	}, inputValue);

	console.log("clicked end btnExecDropDB DB");
};

function btnExecCloseDB(){

	
	MDHStorage.SecureDB.closeDB(function(success){
		showSuccessPopUp("","success closeDB " + success);
	}, function(error){
		var ret = "";
	    switch(parseInt(error)) {
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
	    showFailPopUp("",ret);
	});

	console.log("clicked end btnExecCloseDB Table");
};

function btnExecCreateTable(){
	var id = 'ExecCreateTable';
	var testTableName = $('#'+id).attr('value');
	
	console.log("clicked start " + id);
	
	inputValue = {
		"table":testTableName,
		"columnArgs":createTableArgs
	};

	MDHStorage.SecureDB.createTable(function(success){
		showSuccessPopUp("","success createTable " + success);
	}, function(error){
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
            default:
                ret = "MDH_UNKNOWN_ERROR";
                break;
        }
	    showFailPopUp("",ret);
	}, inputValue);

	console.log("clicked end btnExecCreateTable Table");

};

function btnExecDropTable(){
	var id = 'ExecDropTable';
	console.log("clicked start " + id);
	
	var testTableName = $('#'+id).attr('value');
	inputValue = {
		"table":testTableName
	};

	MDHStorage.SecureDB.dropTable(function(success){
		showSuccessPopUp("","success dropTable " + success);
	}, function(error){
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
            default:
                ret = "MDH_UNKNOWN_ERROR";
                break;
        }
	    showFailPopUp("",ret);
	}, inputValue);

	console.log("clicked end btnExecDropTable Data");
};

function btnExecInsertData(){
	var id = 'ExecInsertData';
	console.log("clicked start " + id);
	
	var values = {};
	values.no1 = $('#insert-no1').val();
	values.content1 = $('#insert-content1').val();

	var testTableName = $('#'+id).attr('value');
	inputValue = {
		"table":testTableName,
		"values" : values
	};

	MDHStorage.SecureDB.insertData(function(success){
		showSuccessPopUp("","success insertData " + success);
	}, function(error){
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
            default:
                ret = "MDH_UNKNOWN_ERROR";
                break;
        }
	    showFailPopUp("",ret);
	}, inputValue);
	
	console.log("clicked end btnExecInsertData Data");
};

function btnExecUpdateData(){
	var id = 'ExecUpdateData';
	var testTableName = $('#'+id).attr('value');
	console.log("clicked start " + id);
	
	var values = {};
	values.no1 = $('#update-no1').val();
	values.content1 = $('#update-content1').val();
	
	var whereArgs = [];
	whereArgs.push($('#update-where1').val());
	whereArgs.push($('#update-where2').val());
	
	inputValue = {
		"table":testTableName,
		"values" : values,
		"whereClause" : " id > ? and id < ? ",
		"whereArgs" : whereArgs
	};

	MDHStorage.SecureDB.updateData(function(success){
		showSuccessPopUp("","success updateData " + success);
	}, function(error){
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
            default:
                ret = "MDH_UNKNOWN_ERROR";
                break;
        }
	    showFailPopUp("",ret);
	}, inputValue);

	console.log("clicked end btnExecUpdateData Data");

};

function btnExecQueryData(){

	var id = 'ExecQueryData';
	var testTableName = $('#'+id).attr('value');
	console.log("clicked start " + id);
	
	var selectionArgs = [$('#query-data-arg').val()];
	var orderBy = $('#query-data-order').val();
	
	inputValue = {
		"table":testTableName,
		"columns" :["id","content1","no1"],
		"selection" : " id <= ? ",
		"selectionArgs" :selectionArgs,
		"orderBy" : orderBy
	};
	
	MDHStorage.SecureDB.queryData(function(success){
		console.log("result:" + success);
		showSuccessPopUp("","success queryData :" + success);
	}, function(error){
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
            default:
                ret = "MDH_UNKNOWN_ERROR";
                break;
        }
	    showFailPopUp("",ret);
	}, inputValue);

	console.log("clicked end btnExecQueryData Data");

};

function btnExecDeleteData(){

	var id = 'ExecDeleteData';
	var testTableName = $('#'+id).attr('value');
	
	console.log("clicked start " + id);
	
	var whereArgs = [$('#delete-data-arg').val()];
	
	inputValue = {
		"table":testTableName,
		"whereClause" : " id = ? ",
		"whereArgs" :whereArgs
	};

	MDHStorage.SecureDB.deleteData(function(success){
		showSuccessPopUp("","success deleteData :" + success);
	}, function(error){
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
            default:
                ret = "MDH_UNKNOWN_ERROR";
                break;
        }
	    showFailPopUp("",ret);
	}, inputValue);

	console.log("clicked end btnExecDeleteData SQL");

};
	
function btnExecQuerySQL(){
	
	var id = 'ExecQuerySQL';
	var sql = $('#'+id).attr('value');
	console.log("clicked start " + id);
	
	//added by dbkim. 2016.06.24. 쿼리문내 위험 문자열 체크--START
	if(sql.indexOf("--") > 0 || sql.indexOf(";") > 0 || sql.indexOf("%") > 0) {
		showFailPopUp("", "--(주석) ;(세미콜론) %(퍼센트) <br>위 문자는 쿼리문안에 포함될 수 없습니다.");
		return;
	}
	//added by dbkim. 2016.06.24. 쿼리문내 위험 문자열 체크--END
	
	inputValue = {
		"sql":sql
	};
	
	MDHStorage.SecureDB.querySQL(function(success){
		showSuccessPopUp("","success querySQL :" + success);
	}, function(error){
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
            default:
                ret = "MDH_UNKNOWN_ERROR";
                break;
        }
	    showFailPopUp("",ret);
	}, inputValue);

	console.log("clicked end btnExecQuerySQL SQL");

};
	
function btnExecExecSQL(){

	var id = 'ExecExecSQL';
	var sql = $('#'+id).attr('value');
	console.log("clicked start " + id);
	
    //added by dbkim. 2016.06.24. 쿼리문내 위험 문자열 체크--START
	if(sql.indexOf("--") >= 0 || sql.indexOf(";") >= 0 || sql.indexOf("%") >= 0) {
		showFailPopUp("", "--(주석) ;(세미콜론) %(퍼센트) <br>위 문자는 쿼리문안에 포함될 수 없습니다.");
		return;
	}
	//added by dbkim. 2016.06.24. 쿼리문내 위험 문자열 체크--END

	inputValue = {
		"sql":sql
	};

	MDHStorage.SecureDB.execSQL(function(success){
		showSuccessPopUp("","success execSQL :" + success);
	}, function(error){
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
            default:
                ret = "MDH_UNKNOWN_ERROR";
                break;
        }
	    showFailPopUp("",ret);
	}, inputValue);
	console.log("clicked end btnExecExecSQL SQL");
};

