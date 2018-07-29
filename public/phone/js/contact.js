
$(document).ready(function() {
	
	$("input[name=radio1]").change(function() {
		if($("#radio-total").is(":checked")) {
			
			$("input[name=keyword]").val('');
			$("input[name=radio2]")[0].checked = true;
			
			$("input[name=radio2]").each(function() {
				$(this).attr('disabled','disabled');
				$("input[name=keyword]").attr('disabled','disabled');
			});
			
		}else{
			
			$("input[name=radio2]").each(function() {
				$(this).removeAttr('disabled','disabled');
				$("input[name=keyword]").removeAttr('disabled','disabled');
			});
		}
	});
	
	
	$("input[name=radio2]").change(function() {
		$("input[name=keyword]").val('');
	});
	
});


function setResultList(result) {
	
	var contactArray = result;
	var lstResult = "";
	
	$('.contact-result').empty();
	

	if(contactArray.length == 0) {
		lstResult += "<tr>";
		lstResult += "<td colspan='3'>no result</td>";
		lstResult += "</tr>";
	} else {
		console.log(contactArray.length);
		
		
		for(var i=0; i < contactArray.length; i++) 
		{
			lstResult += "<tr>";	
			lstResult += "<td class='tc'>"+contactArray[i][MDHPhone.contactKey.FULLNAME]+"</td>";
			if(null != contactArray[i][MDHPhone.contactKey.NICKNAME]){
				lstResult += "<td class='tc'>"+contactArray[i][MDHPhone.contactKey.NICKNAME]+"</td>";
			}else{
				lstResult += "<td class='tc'></td>";
			}
			lstResult += "<td class='tc'>"+contactArray[i][MDHPhone.contactKey.TELMOBILE]+"</td>";
			lstResult += "</tr>";
		}
	}

	$('.contact-result').html(lstResult);
	$('#contact-result-area').attr('style' , 'display:block');
	
}

function sortDesc(a, b)
{
  if( a.fullname > b.fullname ) return 1 ;
  if( b.fullname > a.fullname ) return -1;

  return 0;
};

function MDHPhone_Contact_selectSearch() {
	var fieldsVar = [];
	var filterVar = $('#keyword').attr('value');
	var checkField = true;
	
	// for test
	/*var list = [{"uid":"1","telMobile":"010-9904-6608","fullname":"서보영"},{"uid":"2","telMobile":"112","fullname":"경찰"},{"uid":"3","telMobile":"119","fullname":"소방"},{"uid":"4","telMobile":"1234","fullname":"숫자"},{"uid":"5","telMobile":"09","nickname":"메롱","fullname":"바보"},{"uid":"6","telMobile":"010-9902-2222","fullname":"나야나"}];
	list.sort(sortDesc);
	setResultList(list);*/
	
	if($("#radio-total").is(":checked")) {
		fieldsVar.push("*");
		MDHPhone.Contact.search(
		function(result) {
			
			result.sort(sortDesc);
			setResultList(result);

		},
		function(e) {
			var ret;
			switch(parseInt(e)) {
				case -10001:
				ret = "MDH_INVALID_ARGUMENT";
				break;
				
				case -10002:
				ret = "MDH_JSON_EXP_ERROR";
				break;
				
				case -10203:
				ret = "MDH_PHONE_NO_DATA";
				break;

				default:
				ret = "MDH_UNKNOWN_ERROR";
				break;
			}
			
			showFailPopUp("",ret);

		},
		{fields : fieldsVar,
		filter : ""}
		);
		return;
	}
	else if($("#radio-part").is(":checked")){
		if($("#radio-name").is(":checked")) {
			fieldsVar.push(MDHPhone.contactKey.FULLNAME);
			checkField = false;
		}
		
		if($("#radio-nickname").is(":checked")) {
			fieldsVar.push(MDHPhone.contactKey.NICKNAME);
			checkField = false;
		}
		
		if($("#radio-number").is(":checked")) {
			fieldsVar.push(MDHPhone.contactKey.TELMOBILE);
			checkField = false;
		}	
	}
	else {
		showFailPopUp("","Select Search Type");
		return;
	}
	
	
	if(checkField == false) {
		if(filterVar.length == 0) {
			showFailPopUp("","Input Search Text");
		}
		else {
			MDHPhone.Contact.search(
		function(result) {
			
			result.sort(sortDesc);
			setResultList(result);
			
			},
		function(e) {
			var ret;
			switch(parseInt(e)) {
				case -10001:
				ret = "MDH_INVALID_ARGUMENT";
				break;
				
				case -10002:
				ret = "MDH_JSON_EXP_ERROR";
				break;
				
				case -10203:
				ret = "MDH_PHONE_NO_DATA";
				break;
	
				default:
				ret = "MDH_UNKNOWN_ERROR";
				break;
			}
			showFailPopUp("",ret);

		},
		{fields : fieldsVar,
		filter : filterVar}
		);
		}
		
	}
	else {
		showFailPopUp("","Select Search Fields");
	}
}

