import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class GitHubIssues extends Component {

    static defaultProps = {

    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <img style={{width:'100%'}} src={require('assets/images/demo/github_issues.png')} alt=""/>
            </div>
        );
    }
}

GitHubIssues.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( GitHubIssues );