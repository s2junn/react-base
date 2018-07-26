


var map;
var geocoder;
var infowindow;
var markers = [];
var circle;
var overlay;
//지도에 추가된 지도타입정보를 가지고 있을 변수입니다
var currentTypeId;
var isInfoWindowClose = false;

var option = 'radio-latlng';

var OPTION_LATITUDE_LONGTITUDE = 'radio-latlng';
var OPTION_ADDRESS = 'radio-address';
var OPTION_KEYWORD = 'radio-keyword';


var MAP_MODE_DEFAULT = 'DEFAULT';
var MAP_MODE_TRAFFIC = 'TRAFFIC';
var MAP_MODE_ROADVIEW = 'ROADVIEW'
var MAP_MODE_TERRAIN = 'TERRAIN';
var MAP_MODE_SKYVIEW = 'SKYVIEW';

$(document).ready(function() {
	
	
	var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
	var options = { //지도를 생성할 때 필요한 기본 옵션
		center: new daum.maps.LatLng(37.5163374, 127.1005199), //지도의 중심좌표.
		level: 3 //지도의 레벨(확대, 축소 정도)
	};

	map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
	map.setDraggable(true);
	
	// 주소-좌표 변환 객체를 생성합니다
	geocoder = new daum.maps.services.Geocoder();
	
	$('input[name=radio]').change(function() {
		
		option = $(this).attr('id');
		
		switch (option) {
		case OPTION_LATITUDE_LONGTITUDE:
			$('.custom-info-area').css('display', 'none');
			$('.latlng-area').css('display', 'block');
			$('.address-area').css('display', 'none');
			$('.keyword-area').css('display', 'none');
			$('.zoom-level-area').css('display', 'block');
			
			break;
		case OPTION_ADDRESS:
			$('.custom-info-area').css('display', 'none');
			$('.latlng-area').css('display', 'none');
			$('.address-area').css('display', 'block');
			$('.keyword-area').css('display', 'none');
			$('.zoom-level-area').css('display', 'block');
			break;
		
		case OPTION_KEYWORD:
			$('.custom-info-area').css('display', 'block');
			$('.latlng-area').css('display', 'none');
			$('.address-area').css('display', 'none');
			$('.keyword-area').css('display', 'block');
			$('.zoom-level-area').css('display', 'none');
			break;
		default:
			break;
		}
		
	});
	
	daum.maps.event.addListener(map, 'tilesloaded', function() {
	    console.log('daum tilesloaded');
	});
	
	 infowindow = new daum.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
	// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
	daum.maps.event.addListener(map, 'click', function(mouseEvent) {
	    searchDetailAddrFromCoords(mouseEvent.latLng, function(status, result) {
	        if (status === daum.maps.services.Status.OK && !isInfoWindowClose) {
	        	
	        	resetMapContent();
	        	
	            var detailAddr = !!result[0].roadAddress.name ? '<div>도로명주소 : ' + result[0].roadAddress.name + '</div>' : '';
	            detailAddr += '<div>지번 주소 : ' + result[0].jibunAddress.name + '</div>';
	            
	            var content = '<div class="bAddr" style="font-size:13px;height:100%;width:21em;margin:0.5em;">' +
	                            detailAddr + 
	                        '</div>';
	            
	            var marker = new daum.maps.Marker(); // 클릭한 위치를 표시할 마커입니다

	            // 마커를 클릭한 위치에 표시합니다 
	            marker.setPosition(mouseEvent.latLng);
	            marker.setMap(map);
	            
	            markers.push(marker);

	            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
	            infowindow.setContent(content);
	            infowindow.open(map, marker);
	        }
	        
	        if(isInfoWindowClose){
	        	isInfoWindowClose = false;
	        }
	    });
	});
	
	
	
});


function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 상세 주소 정보를 요청합니다
    geocoder.coord2detailaddr(coords, callback);
}

function showMapWithOption() {
	
	resetMapContent();
	
	switch (option) {
	case OPTION_LATITUDE_LONGTITUDE:
		
		var latitude = $('#latitude').val();
		var longtitude = $('#longtitude').val();
		
		panTo(latitude, longtitude);
		
		break;
	case OPTION_ADDRESS:
		
		var address = $('#address').val();
		
		searchAddressPlace(address);
		
		break;
	
	case OPTION_KEYWORD:
		
		var keyword = $('#keyword').val();
		
		searchKeywordPlace(keyword);
		
		break;
	default:
		break;
	}
	
	var level = $('select[name=zoom-level] option:selected').val();
	setZoomLevel(level);
	
	var selectedMapMode = $('select[name=map-mode] option:selected').val();
	setOverlayMapTypeId(selectedMapMode);
	
	$('html, body').scrollTop(0);
	
}

function panTo(latitude, longtitude) {
	
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new daum.maps.LatLng(latitude, longtitude);
    displayMarker(moveLatLon);
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);          
    
    
}

function searchKeywordPlace(keyword) {
	
	// 장소 검색 객체를 생성합니다
	var ps = new daum.maps.services.Places(); 
	
	// 키워드로 장소를 검색합니다
	ps.keywordSearch(keyword, placesSearchCB); 
	
}

//키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (status, data, pagination) {
	
	console.log("placesSearchCB	status  : "+status);
	console.log("placesSearchCB	data  : ");
	console.log(data);
	
	var isCumstomWindow = $('input[name=custom-info]').is(':checked')
	
    if (status === daum.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new daum.maps.LatLngBounds();

        for (var i=0; i<data.places.length; i++) {
        	if(isCumstomWindow){
        		displayCustomMarker(data.places[i]);    
        	}else{
        		displayMarkerWithPlace(data.places[i]);    
        	}
        	
            bounds.extend(new daum.maps.LatLng(data.places[i].latitude, data.places[i].longitude));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    } 
}


function searchAddressPlace(address) {
	
	
	// 주소-좌표 변환 객체를 생성합니다
	var geocoder = new daum.maps.services.Geocoder();
	
	// 주소로 좌표를 검색합니다
	geocoder.addr2coord(address, function(status, result) {
		
		console.log("searchAddressPlace	status  : "+status);
		console.log("searchAddressPlace	result  : ");
		console.log(result);

	    // 정상적으로 검색이 완료됐으면 
	     if (status === daum.maps.services.Status.OK) {

	        var coords = new daum.maps.LatLng(result.addr[0].lat, result.addr[0].lng);
	        
	        displayMarker(coords, result.addr[0].title);
	        map.setCenter(coords);     
	    } 
	});
}





function displayCircle(postion) {
	
	clearCircle();
	
	// 지도에 표시할 원을 생성합니다
	circle = new daum.maps.Circle({
	    center : postion,  // 원의 중심좌표 입니다 
	    radius: 20, // 미터 단위의 원의 반지름입니다 
	    strokeWeight: 5, // 선의 두께입니다 
	    strokeColor: '#75B8FA', // 선의 색깔입니다
	    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
	    strokeStyle: 'dashed', // 선의 스타일 입니다
	    fillColor: '#CFE7FF', // 채우기 색깔입니다
	    fillOpacity: 0.7  // 채우기 불투명도 입니다   
	}); 

	// 지도에 원을 표시합니다 
	circle.setMap(map); 

}

//지도에 마커를 표시하는 함수입니다
function displayMarker(postion, title, image) {
	infowindow = new daum.maps.InfoWindow({zIndex:1});
    // 마커를 생성하고 지도에 표시합니다
	
	var marker;
	if(null != image && '' != image){
		
		var icon = new daum.maps.MarkerImage(
				image,
			    new daum.maps.Size(60, 60),
			    {
			        alt: "마커 이미지",
			        shape: "poly",
			        coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
			    }
			);
		
		 marker = new daum.maps.Marker({
		        map: map,
		        position: postion,
		        image : icon
		 });
	}else{
		 marker = new daum.maps.Marker({
		        map: map,
		        position: postion
		 });
	}
   
    markers.push(marker);
    // 마커에 클릭이벤트를 등록합니다
    
    if(null != title && '' != title){
    	   daum.maps.event.addListener(marker, 'click', function() {
    	        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    	        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + title + '</div>');
    	        infowindow.open(map, marker);
    	    });
    }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarkerWithPlace(place) {
	infowindow = new daum.maps.InfoWindow({zIndex:1});
    // 마커를 생성하고 지도에 표시합니다
    var marker = new daum.maps.Marker({
        map: map,
        position: new daum.maps.LatLng(place.latitude, place.longitude) 
    });
    markers.push(marker);
    // 마커에 클릭이벤트를 등록합니다
    daum.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.title + '</div>');
        infowindow.open(map, marker);
    });
}

function displayCustomMarker(place) {
	
	// 마커를 생성하고 지도에 표시합니다
    var marker = new daum.maps.Marker({
        map: map,
        position: new daum.maps.LatLng(place.latitude, place.longitude) 
    });
    
    marker.title = place.title;
    marker.address = place.address;
    marker.placeUrl = place.placeUrl;
    
    if(null != place.imageUrl && "" != place.imageUrl){
    	marker.imageUrl = place.imageUrl;
    }else{
    	marker.imageUrl = "../images/noimg.png";
    } 
   
    
    
    markers.push(marker);
	
	// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
	daum.maps.event.addListener(marker, 'click', function() {
		
		closeOverlay();
		
		
		var content = '<div class="wrap">' + 
	    '    <div class="info">' + 
	    '        <div class="title">' + 
	    			marker.title + 
	    '            <div class="close" title="닫기"></div>' + 
	    '        </div>' + 
	    '        <div class="body">' + 
	    '            <div class="img">' +
	    '                <img src="'+marker.imageUrl+'" width="73" height="70">' +
	    '           </div>' + 
	    '            <div class="desc">' + 
	    '                <div class="ellipsis">'+marker.address+'</div>' + 
	    '                <div class="jibun ellipsis"></div>' + 
	    '                <div><a href="'+marker.placeUrl+'" target="_blank" class="link touch">홈페이지</a></div>' + 
	    '            </div>' + 
	    '        </div>' + 
	    '    </div>' +    
	    '</div>';
		
		overlay = new daum.maps.CustomOverlay({
		    content: content,
		    map: map,
		    position: marker.getPosition()       
		});
		
	    overlay.setMap(map);
	    
		
		$(document).on('click', '.close' ,  function(e) {
			isInfoWindowClose = true;
			closeOverlay();
		
		});
	});
	
}


function clearMarker() {
	if(null != markers){
		
		for ( var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
	}
}

function closeOverlay() {
	if(null != overlay){
		overlay.setMap(null);  
	}
}

function clearCircle() {
	if(null != circle){
		circle.setMap(null); 
	}
}

function closeInfoWindow() {
	if(null != infowindow){
		infowindow.close();
	}
}

function resetMapContent() {
	
	clearMarker() ;
	closeInfoWindow();
	closeOverlay();
	clearCircle();
	
}

//지도 레벨은 1부터 14레벨이 있으며 숫자가 작을수록 지도 확대 수준이 높습니다
function setZoomLevel(level) {
	map.setLevel(parseInt(level));
}


// 버튼이 클릭되면 호출되는 함수입니다
function setOverlayMapTypeId(selectedMapMode) {
	
    var changeMaptype;
    
    switch (selectedMapMode) {
	case MAP_MODE_DEFAULT:
		changeMaptype = daum.maps.MapTypeId.ROADMAP; 
		break;
	case MAP_MODE_TRAFFIC:
		 // 교통정보 지도타입
        changeMaptype = daum.maps.MapTypeId.TRAFFIC;     
			break;
	case MAP_MODE_ROADVIEW:
		 // 로드뷰 도로정보 지도타입
        changeMaptype = daum.maps.MapTypeId.ROADVIEW;    
		break;
	case MAP_MODE_TERRAIN:
		 // 지형정보 지도타입
        changeMaptype = daum.maps.MapTypeId.TERRAIN;    

		break;
	case MAP_MODE_SKYVIEW:
		 // 지형정보 지도타입
       changeMaptype = daum.maps.MapTypeId.SKYVIEW ;    
		break;
		
	default:
		break;
	}
    // 이미 등록된 지도 타입이 있으면 제거합니다
    if (currentTypeId) {
        map.removeOverlayMapTypeId(currentTypeId);    
    }
    // maptype에 해당하는 지도타입을 지도에 추가합니다
    map.addOverlayMapTypeId(changeMaptype);
    
    // 지도에 추가된 타입정보를 갱신합니다
    currentTypeId = changeMaptype;        
}

var findPostionInterval;
// 현재 내 위치 찾기
function findMyLocation() {
    var inputTimeout = 4000;
	var inputAccuracy = 3;
	
	resetMapContent();
	
	findPostionInterval = setInterval(function() {
		$('.map-button').animate({'opacity':'0.3'},700).animate({'opacity':'1'},300);
	}, 1000);
	$('.map-button').animate({'opacity':'0.3'},700).animate({'opacity':'1'},300);
	
	// HTML의 geolocation 정보는 부정확하여 Device의 GPS를 통해 위도 경도를 가져옵니다.
	MDHDevice.GPS.getCurrentPosition(
        function(result) {
            
        	clearInterval(findPostionInterval);
            pos = result; 
            
            var lat = pos.coords.latitude , // 위도
            lon = pos.coords.longitude; // 경도
        
	        var locPosition = new daum.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
	        
	        console.log('findMyPosition result    latitude : '+lat+', longitude : '+lon);
	        displayCircle(locPosition);
	        displayMarker(locPosition, '', "../images/ico-location.png");
	        setZoomLevel(3);
	        map.setCenter(locPosition);      
                                     
        },
        function(error) {
        	clearInterval(findPostionInterval);
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
        {timeout:inputTimeout,
		 accuracy:inputAccuracy
		}
    );
}



