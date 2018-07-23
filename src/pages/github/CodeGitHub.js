import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CodeLink from 'components/Link/CodeLink';
import { Switch, Route } from 'react-router-dom';

import GitHubDashboard from './dashboard/GitHubDashboard'
import GitHubPullRequesets from './pull-requests/GitHubPullRequesets'
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

                <div className="menu-btn-container">
                    <CodeLink to={ `${ this.props.match.url }/dashboard` }>
                        <span>Dashboard</span>
                    </CodeLink>
                    <CodeLink to={ `${ this.props.match.url }/pullrequests` }>
                        <span>Pull Requests</span>
                    </CodeLink>
                    <CodeLink to={ `${ this.props.match.url }/issues` }>
                        <span>Issues</span>
                    </CodeLink>
                </div>
                
                <Switch>
                    <Route path={ `${ this.props.match.url }/dashboard` } component={ GitHubDashboard } />
                    <Route path={ `${ this.props.match.url }/pullrequests` } component={ GitHubPullRequesets } />
                    <Route path={ `${ this.props.match.url }/issues` } component={ GitHubIssues } />
                </Switch>

            </div>
        );
    }
}

CodeGitHub.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( CodeGitHub );