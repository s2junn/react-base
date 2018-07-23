import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    class1: {
        display: 'flex',
        boxSizing: 'border-box',
        backgroundColor: '#123456',
        backgroundImage: 'url(' + require( 'logo.svg' ) + ')',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        margin: '1rem',
        padding: '1rem',
    }
};

// @withStyles( styles )
class CodeTemplate extends Component {
    
    static defaultProps = {
        
    };

    render() {
        const { classes } = this.props;
        
        return (
            <div>
                CodeTemplate
            </div>
        );
    }
}

CodeTemplate.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( CodeTemplate );