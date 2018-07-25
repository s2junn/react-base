import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    bubbleTitle: {
        display: 'block',
        padding: '10px 15px',
        margin: 0,
		fontSize: '15px',
		fontWeight: '800',
        color: '#2f363d',
        backgroundColor: '#f6f6f6',
        borderBottom: '1px solid #cdcdcd'
    }
};

class BubbleHeader extends Component {
    constructor( props ) {
		super( props );
	}
	
    render() {
		const { classes } = this.props;
        return (
			<h3 className={classes.bubbleTitle}>
				{this.props.children}
			</h3>
        );
    }
}

export default withStyles(styles)(BubbleHeader);