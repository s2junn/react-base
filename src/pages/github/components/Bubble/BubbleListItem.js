import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styels = {

};

class BubbleListItem extends Component {
	render() {
		const { classes } = this.props;

		return (
			<Fragment>
				<ListItem { ...this.props } />
			</Fragment>
		);
	}
}

export default withStyles(styles)(BubbleListItem);