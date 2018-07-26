

var RECORD_READY = 000001;
var RECORD_ING = 000002;
var RECORD_STOP = 000005;
var PLAY = 000006;
var PAUSE = 000007;

var recordState = RECORD_READY;
var runTime = 0;
var recordTimeStr = "00:00:00";

$(document).ready(function() {
	MDHUtil_record_player_finish();
});

// 녹음 시작
function MDHUtil_Record_start() {
	
	console.log('recordState  : '+recordState);
	
	var recordTitle = $('input[id=record-title]').val();
	var recordPath = $('input[id=record-path]').val();
	
	var options = {recordTitle : recordTitle, recordPath : recordPath};
	
	MDHMgr.exec("RecordPlugin.startRecord", function(result) {
		
		console.log('startRecord result.state : '+result.state);
		console.log('startRecord result.recordTimeStr : '+result.recordTimeStr);
		console.log('startRecord result.recordTimeSec : '+result.recordTimeSec);
		
		recordState = result.state;
		$('.time time').html(result.recordTimeStr);
		
		// Plugin의 콜백은 일회용으로 유지 될 수 없습니다.
		// 따라서 record 상태와 경과 시간 등을 받아오기 위해 setTimeout을 이용해 텀을 주어 재귀로 다시 MDHUtil_Record_start를 호출합니다.
		setTimeout(function() {
			MDHUtil_Record_start();
		}, 500);
		
		$('#start').css('display', 'none');
		$('#cancel').css('display', 'block');
		
	}, function(error) {
		
		$('#start').css('display', 'block');
		$('#cancel').css('display', 'none');
		
		var ret = "";
		
		switch(parseInt(error)) {
			case -10001:
			ret = "MDH_INVALID_ARGUMENT";
			break;
			case -10002:
			ret = "MDH_JSON_EXP_ERROR";
			break;
			
			case -10097:
			ret = "MDH_CLASS_NOT_FOUND";
			break;
			
			case -10098:
			ret = "MDH_NO_SUCH_METHOD";
			break;
			
			case 1000001:
				ret = "MDH_RECORD_ILLEGAL_STATE";
			break;
			default:
			ret = "MDH_UNKNOWN_ERROR";
			break;
		}
		showFailPopUp("",ret);
	}, options);
}

// 녹음 정지, 녹음이 완료되고 파일은 자동으로 저장됩니다.
function MDHUtil_Record_stop() {
	
	MDHMgr.exec("RecordPlugin.stopRecord", function(result) {
		
		$('#start').css('display', 'block');
		$('#cancel').css('display', 'none');
		
		runTime = result.runtime;
		recordTimeStr = result.recordTimeStr;
		recordState = result.state;
		
		$('.rt').html(recordTimeStr);
		$('.time time').html(recordTimeStr);
		console.log("RecordPlugin.stopRecord  success"  );
		console.log("runtime : "+result.runtime);
		console.log("recordTimeStr : "+result.recordTimeStr);
		console.log("title : "+result.title);
		console.log("path : "+result.path);
		console.log("mimetype : "+result.mimetype);
		
	}, function(error) {
		
		var ret = "";
		
		switch(parseInt(error)) {
			case -10001:
			ret = "MDH_INVALID_ARGUMENT";
			break;
			case -10002:
			ret = "MDH_JSON_EXP_ERROR";
			break;
			
			case -10097:
			ret = "MDH_CLASS_NOT_FOUND";
			break;
			case -10098:
			ret = "MDH_NO_SUCH_METHOD";
			break;
			case 1000001:
				ret = "MDH_RECORD_ILLEGAL_STATE";
			break;
			
			default:
			ret = "MDH_UNKNOWN_ERROR";
			break;
		}
		showFailPopUp("",ret);
	});
	
}

// 녹음 취소, 녹음이 취소되면 녹음되고 있던 파일 또한 삭제됩니다.
function MDHUtil_Record_cancel() {
	
	$('#start').css('display', 'block');
	$('#cancel').css('display', 'none');
	$('.time time').html('00:00:00');
	
	MDHMgr.exec("RecordPlugin.cancelRecord", function(result) {
		recordState = result.state;
		console.log('cancel record success,  state : '+result.state);
		
	}, function(error) {
		
		var ret = "";
		
		switch(parseInt(error)) {
			case -10001:
			ret = "MDH_INVALID_ARGUMENT";
			break;
			case -10002:
			ret = "MDH_JSON_EXP_ERROR";
			break;
			
			case -10097:
			ret = "MDH_CLASS_NOT_FOUND";
			break;
			
			case -10098:
			ret = "MDH_NO_SUCH_METHOD";
			break;
			
			case 1000001:
				ret = "MDH_RECORD_ILLEGAL_STATE";
			break;
			
			default:
			ret = "MDH_UNKNOWN_ERROR";
			break;
		}
		showFailPopUp("",ret);
	});
	
}

function startPlayRecode() {
	
	console.log('RecordPlugin.play  recordState : '+recordState);
	
	if(recordState == PLAY){
		showFailPopUp("","Playing now");
		return;
	}else{
		$('.pl').html("00:00:00");
		MDHUtil_player_play();
	}
	
}

function setProgressBar(value, total) {
	
	var sliderRange = $('.slider-range');
	var percent = (value * 100) / total;
	
	sliderRange.css('width', percent+'%');	
}


//녹음한 파일을 재생
function MDHUtil_player_play() {
	
	var options = {runTime : runTime};
	
	MDHMgr.exec("RecordPlugin.play", function(result) {
		
		console.log('play result.state : '+result.state);
		console.log('play result.playTimeStr : '+result.playTimeStr);
		console.log('play result.playTimeInmillisec : '+result.playTimeInmillisec);
		
		recordState = result.state;
		
		$('.pl').html(result.playTimeStr);
		
		if(result.state == RECORD_READY){
			// 처음 재생을 시작하거나 재생이 중지되었을 때, 프로그레스바 초기화
			$('#play').css('display', 'block');
			$('#pause').css('display', 'none');
			$('.pl').html("00:00:00");
			setProgressBar(0, 100);
			
		}else if(result.state == PAUSE){
			// 일시정지 상태가 되었을 때
			$('#play').css('display', 'block');
			$('#pause').css('display', 'none');
			
		}else {
			//재생 중인 상태
			$('#play').css('display', 'none');
			$('#pause').css('display', 'block');
			
			setProgressBar(result.playTimeInmillisec, runTime);
			
			// Plugin의 콜백은 일회용으로 유지 될 수 없다. 
			// 따라서 play 상태와 경과 시간 등을 받아오기 위해 setTimeout을 이용해 텀을 주어 재귀로 다시 MDHUtil_player_play를 호출한다.
			setTimeout(function() {
				console.log('MDHUtil_player_play call');
				MDHUtil_player_play();
			}, 100);
			
		}
		
	}, function(error) {
		
		var ret = "";
		
		switch(parseInt(error)) {
			case -10001:
			ret = "MDH_INVALID_ARGUMENT";
			break;
			case -10002:
			ret = "MDH_JSON_EXP_ERROR";
			break;
			case -10097:
			ret = "MDH_CLASS_NOT_FOUND";
			break;
			case -10098:
			ret = "MDH_NO_SUCH_METHOD";
			break;
			case 1000011:
			ret = "MDH_PLAY_ILLEGAL_STATE";
			break;
			default:
			ret = "MDH_UNKNOWN_ERROR";
			break;
		}
		showFailPopUp("",ret);
		
	}, options);
	
}

// 재생 중인 파일 일시 정지
function MDHUtil_player_pause() {
	
	$('#play').css('display', 'block');
	$('#pause').css('display', 'none');
	
	MDHMgr.exec("RecordPlugin.pause", function(result) {
		
		recordState = PAUSE;
		$('#play').css('display', 'block');
		$('#pause').css('display', 'none');
		
	}, function(error) {
		
		var ret = "";
		
		switch(parseInt(error)) {
			case -10001:
			ret = "MDH_INVALID_ARGUMENT";
			break;
			case -10002:
			ret = "MDH_JSON_EXP_ERROR";
			break;
			
			case -10097:
			ret = "MDH_CLASS_NOT_FOUND";
			break;
			
			case -10098:
			ret = "MDH_NO_SUCH_METHOD";
			break;
			case 1000011:
				ret = "MDH_PLAY_ILLEGAL_STATE";
			break;
			default:
			ret = "MDH_UNKNOWN_ERROR";
			break;
		}
		showFailPopUp("",ret);
		
	});
	
}

// 재생 중인 파일 정지
function MDHUtil_player_stop() {
	
	MDHMgr.exec("RecordPlugin.stop", function(result) {
		
		$('#play').css('display', 'block');
		$('#pause').css('display', 'none');
		recordState = RECORD_READY;
		$('.pl').html("00:00:00");
		setProgressBar(0, 100);
		
	}, function(error) {
		
		var ret = "";
		
		switch(parseInt(error)) {
			case -10001:
			ret = "MDH_INVALID_ARGUMENT";
			break;
			case -10002:
			ret = "MDH_JSON_EXP_ERROR";
			break;
			
			case -10097:
			ret = "MDH_CLASS_NOT_FOUND";
			break;
			
			case -10098:
			ret = "MDH_NO_SUCH_METHOD";
			break;
			
			case 1000011:
				ret = "MDH_PLAY_ILLEGAL_STATE";
			break;
			
			default:
			ret = "MDH_UNKNOWN_ERROR";
			break;
		}
		showFailPopUp("",ret);
		
	});
	
}


//recorder와 player를 모두 리셋시키는 함수입니다.
//기능 동작 중 화면을 벗어나는 경우 모든 기능을 중지시키기 위해 필요합니다.
// ex) Back 키를 눌렀을 경우, common.jquery.js 참고
function MDHUtil_record_player_finish() {
	
	MDHMgr.exec("RecordPlugin.finishRecordAndPlay", function(result) {
		
		console.log("MDHUtil_record_player_finish result : "+result);
		
	}, function(error) {
		
		var ret = "";
		
		switch(parseInt(error)) {
			
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
		
	});
	
}