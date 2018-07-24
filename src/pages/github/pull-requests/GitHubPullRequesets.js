import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
import axios from 'axios';
import 'se1108/git.css';

const styles = {

};

class GitHubPullRequesets extends Component {
    static defaultProps = {

    };

    constructor( props ) {
        super( props );

        this.state = Object.assign({}, props, {
            tabsValue: 0,
            PRData: []
        });
    }

    handleChange = (event, tabsValue) => {
        this.setState({ tabsValue });
    };

    componentDidMount() {
		let testGithub = 'https://api.github.com/repos/se1108/icechoc/pulls';
		let _this = this;
        axios.get(testGithub, {
			headers: {
				Authorization: 'Bearer aadb5a0a54f27a1d14cb3900ff1e360f44c409c7',
			}
        })
        .then(function (response) {
			console.log(response);
			
			_this.setState({
				PRData:response.data
			});

			// _this.setState((prevState, props) => ({
			// 	PRData:response.data
			// }));
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
                    scrollable
                    scrollButtons="auto"
                >
                    <Tab label="Open"/>
                    <Tab label="Closed" />
                    <Tab label="Yours" />
                </Tabs>
                {this.state.PRContents}
            </Fragment>
        );
    }
}

GitHubPullRequesets.propTypes = {
	classes: PropTypes.object.isRequired,
	PRContents: PropTypes.array
}

export default withStyles( styles )( GitHubPullRequesets );