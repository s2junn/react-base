
$(document).ready(function(){

	secureDBOpt.initialize({
		
	"dropDB" : {
		"path" : "NewTestDB1.db",
	},

	"createDB" : {
		"path" : "NewTestDB1.db",
		"password" : "1234"
	},

	"createTable" : {
		"table" : "TestTable01",

		"columnArgs" : ["id INTEGER PRIMARY KEY AUTOINCREMENT", 
						"no1 integer not null", 
						"no2 INTEGER default 1111", 
						"no3 INTEGER default 2222", 
						"no4 INTEGER default 3333",
						"no5 INTEGER default 4444", 
						"content1 text",
						"content2 text",
						"content3 text default null",
						"content4 text default null",
						"content5 text default null"
						]
	},

	"insertData" : {
		"table" : "TestTable01",
		"values" : {
			"no1" : 1,
			"no2" : -10000,
			"no3" : 2222,
			"no4" : 1313,
			"no5" : 22222,
			"content1" : "",
			"content2" : "abcedefghijklmn",
			"content3" : "my ConteNT 03",
			"content4" : "my ConteNT 03",
			"content5" : "aa"
		},
	},

	
	"queryData" : {
		"table" : "TestTable01",
		"columns" : ["id", "no1","no2","no3","no4","no5", "content5" ],
		"selection" : "id > ? and id < ?",
		"selectionArgs" : ["0", "5"],
		"orderBy" : "id DESC"
	},
	
	"updateData" : {
		"table" : "TestTable01",
		"values" : { "no5" : 0 },
		"whereClause" : "id > ?",
		"whereArgs" : ["3"],
	},

	"deleteData" : {
		"table" : "TestTable01",
		"whereClause" : "id < ?",
		"whereArgs" : ["2"]
	},

/*	"queryData" : {
		"table" : "TestTable01",
		"columns" : ["id", "no5", "content5" ],
		"selection" : "id > ? and id < ?",
		"selectionArgs" : ["0", "5"],
		"orderBy" : "id DESC"
	},*/
		
	"execSQL" : {
		"sql" : "INSERT INTO TestTable01 (no1,no2,content1,content2) VALUES (11,12,'CON11','HAPPY')"
	}
	
});

secureDBOpt.INTERVALTIME =  500;

});