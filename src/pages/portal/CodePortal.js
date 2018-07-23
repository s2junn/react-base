import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class CodePortal extends Component {
    render() {
        const { classes } = this.props;

        return (
            <h1>
                CodePortal
            </h1>
        );
    }
}

CodePortal.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( CodePortal );