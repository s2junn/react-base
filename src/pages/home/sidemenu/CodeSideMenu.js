import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, Divider, SwipeableDrawer } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CodeLink from 'components/Link/CodeLink.js';
import { Link } from 'react-router-dom';
import NestedList from '../../../components/List/NestedList'

import icon_github from 'assets/images/logo_github.svg';
import icon_dashboard from 'assets/images/icon_dashboard.svg';
import icon_pullrequest from 'assets/images/icon_pullrequest.svg';
import icon_issues from 'assets/images/icon_issues.svg';
import icon_project from 'assets/images/icon_project.svg'
import icon_recents from 'assets/images/icon_recents.svg'
import icon_space from 'assets/images/icon_space.svg'
import icon_request from 'assets/images/icon_request.svg'
import icon_search from 'assets/images/icon_search.svg'

import icon_jira from 'assets/images/logo_jira.svg';
import icon_confluence from 'assets/images/logo_confluence.svg';
import icon_portal from 'assets/images/logo_codeportal.svg';
import icon_settings from 'assets/images/logo_admin.svg';
import icon_logout from 'assets/images/logo_logout.svg';

import logo_bell from 'assets/images/logo_bell.svg';
import icon_close from 'assets/images/icon_close.svg';

const styles = {
    // for SideMenu
    list: {
        width: 300
    },
    fullList: {
        width: 'auto',
    },
};

//@withStyles( styles )
class CodeSideMenu extends Component {
    static defaultProps = {

    };

    render() {
        const { classes } = this.props;

        const data = {
            subheader: '',
            items: [
                {
                    type: List,
                    icon: icon_github,
                    text: 'GitHub',
                    path: '/home/github',
                    open: false,
                    children: [
                        {
                            type: CodeLink,
                            icon: icon_dashboard,
                            text: 'Dashboard',
                            path: '/home/github/dashboard',
                            open: false,
                            children: [],
                        },{
                            type: CodeLink,
                            icon: icon_pullrequest,
                            text: 'Pull Requests',
                            path: '/home/github/pullrequests',
                            open: false,
                            children: [],
                        },{
                            type: CodeLink,
                            icon: icon_issues,
                            text: 'Issues',
                            path: '/home/github/issues',
                            open: false,
                            children: [],
                        },
                    ],
                },
                {
                    type: List,
                    icon: icon_jira,
                    text: 'JIRA',
                    path: '/home/jira',
                    open: false,
                    children: [
                        {
                            type: CodeLink,
                            icon: icon_project,
                            text: 'Projects',
                            path: '/home/jira/projects',
                            open: false,
                            children: [],
                        },
                        {
                            type: CodeLink,
                            icon: icon_issues,
                            text: 'Issues',
                            path: '/home/jira/issues',
                            open: false,
                            children: [],
                        },
                    ],
                },
                {
                    type: List,
                    icon: icon_confluence,
                    text: 'Confluence',
                    path: '/home/confluence',
                    open: false,
                    children: [
                        {
                            type: CodeLink,
                            icon: icon_recents,
                            text: 'Recents',
                            path: '/home/confluence/recents',
                            open: false,
                            children: [],
                        },
                        {
                            type: CodeLink,
                            icon: icon_space,
                            text: 'Spaces',
                            path: '/home/confluence/spaces',
                            open: false,
                            children: [],
                        },
                    ],
                },
                {
                    type: List,
                    icon: icon_portal,
                    text: 'Portal',
                    path: '/home/portal',
                    open: false,
                    children: [
                        {
                            type: CodeLink,
                            icon: icon_request,
                            text: 'Request',
                            path: '/home/portal/request',
                            open: false,
                            children: [],
                        },
                        {
                            type: CodeLink,
                            icon: icon_search,
                            text: 'Search',
                            path: '/home/portal/search',
                            open: false,
                            children: [],
                        },
                    ],
                },
                {
                    type: CodeLink,
                    icon: icon_settings,
                    text: 'Settings',
                    path: '/home/',
                    open: false,
                    children: []
                },
                {
                    type: CodeLink,
                    icon: icon_logout,
                    text: 'Logout',
                    path: '/login',
                    open: false,
                    children: []
                },
            ]
        };

        return (
            <div tabIndex={ 0 } role="button" className={ `nav-wrap ${classes.list}` }>
                <div className="nav-header">
                    <button className="nav-btn noti"><img src={logo_bell} alt="알림"/></button>
                    <span className="user-name">홍길동</span>
                    <button className="nav-btn close" onClick={ this.props.onClick }><img src={icon_close} alt="닫기"/></button>
                </div>
                <NestedList items={ data.items } itemDepth={1} onClick={ this.props.onClick } onKeyDown={ this.props.onKeyDown } />
            </div>
        );
    }
}

CodeSideMenu.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles( styles )( CodeSideMenu );