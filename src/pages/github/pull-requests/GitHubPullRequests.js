import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, List, ListItem } from '@material-ui/core';
import axios from 'axios';
import 'se1108/git.css';
import PullRequestList from 'pages/github/components/list/PullRequestList.js';

const propTypes = {
	classes: PropTypes.object.isRequired
};

const styles = {
};

class GitHubPullRequests extends Component {
    static defaultProps = {

    };

    constructor( props ) {
        super( props );

        this.state = Object.assign({}, props, {
			tabsValue: 0,
			isLoadComplate: false,
            PRData: []
        });
    }

    handleChange = (event, tabsValue) => {
		this.setState({ tabsValue });
    };

    componentDidMount() {
		
		let testGithub = 'https://api.github.com/search/issues';
		let _this = this;
        axios.get( testGithub + '?q=is:open+is:pr+mentions:se1108', {
			headers: {
				Authorization: 'token aadb5a0a54f27a1d14cb3900ff1e360f44c409c7',
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
        const { tabsValue } = this.state;

        return (
            <Fragment>
                <Tabs
                    value={tabsValue}
                    onChange={this.handleChange}
                    indicatorColor="primary"
					textColor="primary"
					fullWidth
                    scrollable
                    scrollButtons="auto"
                >
                    <Tab label="Created" />
                    <Tab label="Assigned" />
                    <Tab label="Mentioned" />
                </Tabs>
				<PullRequestList items={this.state.PRData}/>
            </Fragment>
        );
    }
}

GitHubPullRequests.propTypes = propTypes;

export default withStyles( styles )( GitHubPullRequests );