import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import CodeLink from 'components/Link/CodeLink';
import 'assets/scss/CodeMain.css';

import { CodeGitHub } from 'pages/github/CodeGitHub';
import { CodeJIRA } from 'pages/jira/CodeJIRA';
import { CodeConfluence } from 'pages/confluence/CodeConfluence';
import { CodePortal } from 'pages/portal/CodePortal';

const styles = {
    github: {

    },
    jira: {

    },
    confluence: {

    },
    portal: {

    },
    pullrequest: {

    }
};

class CodeMain extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <div className="menu-btn-container">
                    <CodeLink to={ '/home/github' } className="btn index-contents__btn">
                        <span>GitHub</span>
                    </CodeLink>
                    <CodeLink to={ '/home/jira' } className="btn index-contents__btn">
                        <span>JIRA</span>
                    </CodeLink>
                    <CodeLink to={ '/home/confluence' } className="btn index-contents__btn">
                        <span>Confluence</span>
                    </CodeLink>
                    <CodeLink to={ '/home/portal' } className="btn index-contents__btn">
                        <span>Portal</span>
                    </CodeLink>
                </div>
                
                <img src={ require('assets/images/temporary_pr_main.png') } className="temp-main-pr" />

            </Fragment>
        );
    }
}

CodeMain.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( CodeMain );