import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

//@withStyles( styles )
class CodeSettings extends Component {

    static defaultProps = {

    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                CodeSettings
            </div>
        );
    }
}

CodeSettings.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( CodeSettings );