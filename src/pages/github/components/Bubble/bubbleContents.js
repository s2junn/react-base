import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    bubbleContents: {
        padding: '15px'
    }
};

class BubbleContents extends Component {
    constructor( props ) {
		super( props );
	}
	
    render() {
		const { classes } = this.props;
		return (
			<Fragment>
				{this.props.children}
			</Fragment>
		);
	}
}

export default withStyles(styles)(BubbleContents);