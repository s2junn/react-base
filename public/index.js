
//OpenSource Page 조회
function showOpenSourcePage() {
	console.log("showOpenSourcePage");
	
	$('#id_openSourcePage').load("./html/opensourcePage.html","", function() {		
		$('#id_openSourcePage').show();
	});	
}

function hideOpenSourcePage(){
	console.log("hideOpenSourcePage");
	$('#id_openSourcePage').hide();
}
