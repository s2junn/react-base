/**
 * isDeviceMode : 브라우저에서 디버깅을 하기 위한 분기처리
 * true : 단말에 올릴시
 * false : 브라우저에서 디버깅 시
 * */
isDeviceMode = false;

// SEMP_ipAddress = "210.118.57.138";  // SEMP 서버 IP
// SEMP_portNumber = "8091";  // SEMP 서버 포트

SEMP_ipAddress = "114.201.140.150";  // SEMP 서버 IP
SEMP_portNumber = "10080";  // SEMP 서버 포트

ATTACHMENT_ipAddress = "www.samsungsmartoffice.net"; //첨부뷰어 서버 IP
ATTACHMENT_portNumber = "8002"; //첨부뷰어 서버 포트
ATTACHMENT_fileUrl_xls = "http://moffice.sec.samsung.net/common/upload/bulk/공용단말기 서비스 일괄신청 양식.xls";
ATTACHMENT_fileUrl_ppt = "http://moffice.sec.samsung.net/common/upload/report/협력사 임직원 보안복합기 사용안내.ppt";
ATTACHMENT_fileUrl_docx = "http://moffice.sec.samsung.net/common/upload/report/151117.docx"	 
ATTACHMENT_fileUrl_txt = "http://moffice.sec.samsung.net/common/upload/report/일일보고수정.txt";
ATTACHMENT_fileUrl_pdf = "http://moffice.sec.samsung.net/common/upload/report/KnoxGuideKor.pdf";
ATTACHMENT_fileUrl_gul = "http://moffice.sec.samsung.net/common/upload/report/erd.gul";
ATTACHMENT_fileUrl_jpg = "http://moffice.sec.samsung.net/common/upload/report/s5_knox.jpg";
ATTACHMENT_fileUrl_tiff =  "http://moffice.sec.samsung.net/common/upload/report/sample.tiff";


						
( function() {
	
	var scriptPaths = document.getElementsByTagName("script"),
		rootPath = "../",
		headerPath = "";
	
	var fileName = location.href.split("/").slice(-1).toString();
	if(fileName == "index.html"){
		rootPath = "";
	}
	
	for(var i = 0 ; i < scriptPaths.length ; i++){
		if(scriptPaths[i].getAttribute("src").indexOf('header.js') !== -1){
			//headerPath = scriptPaths[i].getAttribute("src").split('header.js')[0];
			var path =  headerPath + rootPath; 
			// document.write('<link rel="stylesheet" href="'+ path + 'css/common.css" />');
			// document.write('<link rel="stylesheet" href="'+ path + 'css/layout.css" />');
			
			document.write('<script src="'+ path + 'js/jquery.js"></script>');
			
			if(isDeviceMode){
				 document.write('<script src="'+ path + 'js/MDHAdapter.js"></script>');
			}
		   
		    document.write('<script src="'+ path + 'js/common.jquery.js"></script>');
		    
		    //for PopUp
		    document.write('<div id="id_success_pop" ></div>');
		    document.write('<div id="id_fail_pop" ></div>');
		    document.write('<div id="id_text_input_pop" ></div>');
		    document.write('<div id="id_screen_lock_myoffice" ></div>');
		    document.write('<div id="id_screen_lock" ></div>');
		}
	}
	
}());
