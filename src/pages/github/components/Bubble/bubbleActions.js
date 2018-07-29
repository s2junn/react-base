import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    bubbleActions: {
		padding: '15px',
		fontSize: '15px',
		fontWeight: '600',
        color: '#ffa4af'
    }
};

class BubbleActions extends Component {
    constructor( props ) {
		super( props );
	}
	
    render() {
		const { classes } = this.props;
		return (
			<Fragment>
				{this.props.children}
			</Fragment>
		)
	}
}

export default withStyles(styles)(BubbleActions);