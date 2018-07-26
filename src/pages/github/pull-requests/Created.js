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

	/* GitHub
	componentDidMount() {
		let testGithub = 'https://api.github.com/search/issues';
		let _this = this;
        axios.get( testGithub + '?q=is:open+is:pr+author:se1108', {
			headers: {
				Authorization: 'token 091c937bc85b71165ff7ba6df4df80d21cfd5d4d',
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
		let testGithub = 'http://114.201.140.150:10080/semp/ws/rest/getService/GATEWAY_V1_GIT/';
		let _this = this;

		var data = {};
		data.CM_HEADER = [];
		data.CM_HEADER.push({key:'Authorization', value:'token 8b4e0ff0950b9c46194e0a2ceac8928b21b779cf'});
		
		data.CM_PARAMETER = [];
		//data.CM_PARAMETER.push({key:'name', value:'youhnhwan.bae'});
		//data.CM_PARAMETER.push({key:'project', value:'codemobile'});
		data.CM_PARAMETER.push({key:'q', value:'is:open+is:pr+author:se1108' });
		
		data.CM_PROTOCOL = {};
		data.CM_PROTOCOL.CM_URI = 'https://api.github.com/user/repos';
		data.CM_PROTOCOL.CM_METHOD = 'GET';

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