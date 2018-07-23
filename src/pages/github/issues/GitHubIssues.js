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
                GitHubIssues
            </div>
        );
    }
}

GitHubIssues.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( GitHubIssues );