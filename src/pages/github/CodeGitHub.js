import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CodeLink from 'components/Link/CodeLink';
import { Switch, Route } from 'react-router-dom';

import GitHubDashboard from './dashboard/GitHubDashboard'
import GitHubPullRequests from './pull-requests/GitHubPullRequests'
import GitHubIssues from './issues/GitHubIssues'

const styles = {

};

class CodeGitHub extends Component {

    static defaultProps = {

    };
    
    render() {
        const { classes } = this.props;

        console.log( '[this.props.match.url] = ' + this.props.match.url );
        
        return (
            <div>
                <h1>
                    CodeGitHub
                </h1>
                
                <Switch>
                    <Route path={ `${ this.props.match.url }/dashboard` } component={ GitHubDashboard } />
                    <Route path={ `${ this.props.match.url }/pullrequests` } component={ GitHubPullRequests } />
                    <Route path={ `${ this.props.match.url }/issues` } component={ GitHubIssues } />
                </Switch>

				<nav className="tabs">
                    <CodeLink to={ `${ this.props.match.url }/dashboard` } activeClassName="selected">
                        <span>Dashboard</span>
                    </CodeLink>
                    <CodeLink to={ `${ this.props.match.url }/pullrequests` } activeClassName="selected">
                        <span>Pull Requests</span>
                    </CodeLink>
                    <CodeLink to={ `${ this.props.match.url }/issues` } activeClassName="selected">
                        <span>Issues</span>
                    </CodeLink>
				</nav>
            </div>
        );
    }
}

CodeGitHub.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( CodeGitHub );