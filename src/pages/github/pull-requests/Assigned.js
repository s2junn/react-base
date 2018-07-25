import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import PullRequestList from 'pages/github/components/list/PullRequestList.js';

const styles = {
};

class Assigned extends Component {
    
    static defaultProps = {
        
	};

    constructor( props ) {
        super( props );

        this.state = Object.assign({}, props, {
			isLoadComplate: false,
			PRData: []
        });
	}

    componentDidMount() {
		
		let testGithub = 'https://api.github.com/search/issues';
		let _this = this;
        axios.get( testGithub + '?q=is:open+is:pr+assignee:se1108', {
			headers: {
				Authorization: 'token 04a1a297a090bbd7a9d882523a98a4618398b347',
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

    render() {
        const { classes } = this.props;
        
        return (
			<Fragment>
				<PullRequestList items={this.state.PRData}/>
			</Fragment>
        );
    }
}

Assigned.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( Assigned );