import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class CodeConfluence extends Component {

    static defaultProps = {

    };
    
    render() {
        const { classes } = this.props;

        return (
            <h1>
                CodeConfluence
            </h1>
        );
    }
}

CodeConfluence.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( CodeConfluence );