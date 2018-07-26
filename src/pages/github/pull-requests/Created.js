import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import PullRequestList from 'pages/github/components/list/PullRequestList.js';

const styles = {
};

class Created extends Component {
    
    static defaultProps = {
        
	};

    constructor( props ) {
        super( props );

        this.state = Object.assign({}, props, {
			isLoadComplate: false,
			PRData: []
        });
	}

	loadXMLString = (txt) =>
	{
		let xmlDoc = '';
		if ( window.DOMParser ) {
			let parser = new DOMParser();
			xmlDoc = parser.parseFromString(txt,"text/xml");
		}

		return xmlDoc;
	}

	//* GitHub
	componentDidMount() {
		let testGithub = 'https://api.github.com/search/issues';
		let _this = this;
        axios.get( testGithub + '?q=is:open+is:pr+author:se1108', {
			headers: {
				Authorization: 'token ab4539702425dcd6ca8cc41ec1ab79405a691b7f',
			}
        })
        .then(function (response) {
			console.log(response.data);
			
			_this.setState({
				PRData:response.data.items,
				isLoadComplate: true
			});
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });
	}
	// */
	/* SEMP
    componentDidMount() {		
	
		var data = {};
		data.CM_HEADER = [];
		data.CM_HEADER.push({key:'Authorization', value:'token 740c64a70d9d63d4630124ebe2abee7a2c1f2014'});

		data.CM_PARAMETER = [];
		data.CM_PARAMETER.push({key:'q', value:'is:open+is:pr+author:openobjectLeesomi'});

		data.CM_PROTOCOL = {};
		data.CM_PROTOCOL.CM_URI = 'https://api.github.com/search/issues';
		data.CM_PROTOCOL.CM_METHOD = 'GET';

		var connectionType = 'http'; // $('#connectionType').val();	// reqOption.put("connectionType", "http");
		var ipAddress = '114.201.140.150';			// reqOption.put("ipAddress", "114.201.140.150");
        var portNumber = '10080';			// reqOption.put("portNumber", "10080");
		var userId = 'admin';	// $('#userId').val();	// reqOption.put("userId", "admin");
		var deviceId = '01122223333';	// $('#deviceId').val();	// reqOption.put("deviceId", "0112223333");
		var contextUrl = 'semp'; 	// $('#contextUrl').val();	// reqOption.put("contextUrl", "semp");
		var dataType = 'json'; // $('#dataType').val();	// reqOption.put("dataType", "json");
		var sType = 'rest'; // $('#sType').val();	// reqOption.put("sType", "rest");
		var sCode = 'GATEWAY_V1_GIT'; // $('#sCode').val();	// reqOption.put("sCode", "GATEWAY_V1_GIT");

		var parameter = "MESSAGE=" + JSON.stringify(data).replace(/\\"/, '"'); // $('#parameter').val();	// reqOption.put("parameter", "MESSAGE=" + Uri.encode(data.toString().replace("\\/", "/")));
		var paramEncrypted = 'true';	// ($('#paramEncrypted').is(":checked")).toString();
		var paramCompressed = 'true';	// ($('#paramCompressed').is(":checked")).toString();
		
		window.MDHBasic.SEMP.request(
			function(status) {
				var resulthtml = "";
				if(dataType == "json") {
					resulthtml =  JSON.stringify(status);
					console.log("SEMP result : <br>" + resulthtml);
				} else {
					resulthtml = status.replace(/</g, '&lt;').replace(/>/g, '&gt;');
					console.log("SEMP result : <br>" + resulthtml);
					let xmlDoc = this.loadXMLString( status );
					var serializer = new XMLSerializer();
					var string1 = serializer.serializeToString(xmlDoc);
					
					console.log("MDHBasic.SEMP.request      status  : "+status);
					console.log("MDHBasic.SEMP.request      serializeToString  : "+string1);
					
					console.log( 'result = ' + resulthtml);
				}
			},
			function(error) {
				var ret = (error==-10001)?"MDH_INVALID_ARGUMENT":
							(error==-10002)?"MDH_JSON_EXP_ERROR":
							(error==-10099)?"MDH_UNKNOWN_ERROR":
							(error==-10097)?"MDH_CLASS_NOT_FOUND":
							(error==-10098)?"MDH_NO_SUCH_METHOD":
							(error==-10009)?"MDH_PLATFORM_NOT_SUPPORTED":
							error;
				
				if(typeof ret == "object" ) {
					var resultData = error.resultData.replace(/</g, '&lt;').replace(/>/g, '&gt;');
					console.log("SEMP result : <br>" + "Error code : " + error.resultCode + "<br>" + 
										"Error Message : " + error.resultMsg + "<br>" + 
										"Error Data : " + resultData);
				}
				else {
					console.log("SEMP result : <br>" + "Error code : " + ret);
				}
			},
			{   
				connectionType:connectionType,
				ipAddress:ipAddress,	//SEMP_ipAddress,
				portNumber:portNumber, // SEMP_portNumber,
				userId:userId,
				deviceId:deviceId,
				contextUrl:contextUrl,
				dataType:dataType,
				sType:sType,
				sCode:sCode,
				parameter:parameter,
				paramEncrypted : paramEncrypted,
				paramCompressed : paramCompressed
			}
		);
		

		/*
        axios.post( testGithub , {
			headers: {
				Authorization: 'token 04a1a297a090bbd7a9d882523a98a4618398b347',
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			data : 'parameters=MESSAGE=' + encodeURI(JSON.stringify(data))
        })
        .then(function (response) {
			console.log(response.data);
			
			_this.setState({
				PRData:response.data.items,
				isLoadComplate: true
			});
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
		});
		*/
	/*}
	// */

    render() {
        const { classes } = this.props;
        
        return (
			<Fragment>
				<PullRequestList items={this.state.PRData}/>
			</Fragment>
        );
    }
}

Created.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( Created );