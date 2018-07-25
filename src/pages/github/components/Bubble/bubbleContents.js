import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    bubbleContents: {
		padding: '15px',
		backgroundColor:'#fff'
    }
};

class BubbleContents extends Component {
    constructor( props ) {
		super( props );
	}
	
    render() {
		const { classes } = this.props;
		return (
			<div className={classes.bubbleContents}>
				{this.props.children}
			</div>
		);
	}
}

export default withStyles(styles)(BubbleContents);