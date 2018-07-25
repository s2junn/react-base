import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, List, ListItem } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom'
import 'se1108/git.css';
import { Created, Assigned, Mentioned } from 'pages/github/pull-requests';

const propTypes = {
	classes: PropTypes.object.isRequired
};

const styles = {
	tabRoot: {
		color:'#ffd5a9',
		fontSize:'15px',
		fontWeight:'800',
		opacity:1
    },
	tabSelected: {
		color:'#fff'
	},
};

class GitHubPullRequests extends Component {
    static defaultProps = {

    };

    constructor( props ) {
        super( props );

        this.state = Object.assign({}, props, {
			tabsValue: "Created",
        });
    }

    handleChange = (event, tabsValue) => {
		this.setState({ tabsValue });
    };

    render() {
        const { classes } = this.props;
        const { tabsValue } = this.state;

        return (
            <Fragment>
                <Tabs
                    value={tabsValue}
                    onChange={this.handleChange}
					fullWidth
                    scrollable
					scrollButtons="auto"
					className="innnerTabs depth1"
					indicatorColor="#ff41af"
                >
                    <Tab value="Created" classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Created" />
                    <Tab value="Assigned" classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Assigned" />
                    <Tab value="Mentioned" classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Mentioned" />
                </Tabs>
				{tabsValue === 'Created' && <Created/>}
				{tabsValue === 'Assigned' && <Assigned/>}
				{tabsValue === 'Mentioned' && <Mentioned/>}
            </Fragment>
        );
    }
}

GitHubPullRequests.propTypes = propTypes;

export default withStyles( styles )( GitHubPullRequests );