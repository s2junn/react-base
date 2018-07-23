import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class CodeJIRA extends Component {
    render() {
        const { classes } = this.props;

        return (
            <h1>
                CodeJIRA
            </h1>
        );
    }
}

CodeJIRA.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( CodeJIRA );