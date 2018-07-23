import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class GitHubDashboard extends Component {

    static defaultProps = {

    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                GitHubDashboard
            </div>
        );
    }
}

GitHubDashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( GitHubDashboard );