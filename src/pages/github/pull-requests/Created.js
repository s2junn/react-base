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

	/* GitHub
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
	//* SEMP
    componentDidMount() {		
	
		var req_data = {
			CM_SSO: {
				CM_AUTH_ID: 'leesomi'
			},
			CM_HEADER: [
				{ key: 'Authorization', value: 'token 6d19e074afc40e0db3005b66c4e64cb29d878979' }
			],
			CM_PARAMETER: [
				{ key: 'q', value: 'is:open+is:pr+author:openobjectLeesomi' }
			],
			CM_PROTOCOL: {
				CM_URI: 'https://api.github.com/search/issues',
				CM_METHOD: 'GET'
			}
		};

		var env_data = {
			connectionType: 'http',
			ipAddress: window.SEMP_ipAddress,
			portNumber: window.SEMP_portNumber,
			userId: 'admin',
			deviceId: '01122223333',
			contextUrl: 'semp',
			dataType: 'json',
			sType: 'rest',
			sCode: 'GATEWAY_V1_GIT',
			parameter: "MESSAGE=" + JSON.stringify( req_data ).replace(/\\"/, '"'),
			paramEncrypted: 'true',
			paramCompressed: 'true'
		}
		
		window.MDHBasic.SEMP.request(
			function( status ) {
				var resulthtml = "";
				if ( env_data.dataType == "json" ) {
					resulthtml =  JSON.stringify( status );
					console.log( "SEMP result : <br>" + resulthtml );
				} else {
					resulthtml = status.replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
					console.log( "SEMP result : <br>" + resulthtml );
					let xmlDoc = this.loadXMLString( status );
					var serializer = new XMLSerializer();
					var string1 = serializer.serializeToString( xmlDoc );
					
					console.log( "MDHBasic.SEMP.request      status  : " + status );
					console.log( "MDHBasic.SEMP.request      serializeToString  : " + string1 );
					console.log( 'result = ' + resulthtml );
				}
			},
			function( error ) {
				var ret = ( error == -10001 ) ? "MDH_INVALID_ARGUMENT":
							( error == -10002 ) ? "MDH_JSON_EXP_ERROR":
							( error == -10099 ) ? "MDH_UNKNOWN_ERROR":
							( error == -10097 ) ? "MDH_CLASS_NOT_FOUND":
							( error == -10098 ) ? "MDH_NO_SUCH_METHOD":
							( error == -10009 ) ? "MDH_PLATFORM_NOT_SUPPORTED":
							error;
				
				if ( typeof ret == "object" ) {
					var resultData = error.resultData.replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
					console.log( "SEMP result : <br>" + "Error code : " + error.resultCode + "<br>" + 
										"Error Message : " + error.resultMsg + "<br>" + 
										"Error Data : " + resultData );
				}
				else {
					console.log("SEMP result : <br>" + "Error code : " + ret);
				}
			},
			env_data
		);
	}
	// */		

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
	}
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