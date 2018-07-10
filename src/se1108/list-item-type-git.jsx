import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GitListItem extends Component {
	propTypes = {
		itemCondensed : PropTypes.string,
		itemDescription : PropTypes.string
	}

	render() {
		var itemCondensed = "aaa"
		var itemDescription = "bbb"

		return (
			<a href="#" className="list-item">
				일반 리스트
			</a>
		);
	}
}

export default GitListItem;