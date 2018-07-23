import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class GitHubPullRequesets extends Component {

    static defaultProps = {

    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                GitHubPullRequesets
            </div>
        );
    }
}

GitHubPullRequesets.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( GitHubPullRequesets );