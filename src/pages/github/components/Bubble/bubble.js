import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        padding: 0,
        margin: '0 22px 15px',
        overflow: 'hidden',
        wordBreak: 'break-word',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        background: '#fff',
        border: '1px solid #cdcdcd',
        borderRadius: '3px'
    }
};

class Bubble extends Component {
    constructor( props ) {
        super( props );
  
        const { classes } = props;
        this.state = Object.assign( {}, props, { 
            className: props.className + ' '
        } );
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div className={ this.state.className + classes.root }>
                { this.props.children }
            </div>
        );
    }
}

export default withStyles( styles )( Bubble );