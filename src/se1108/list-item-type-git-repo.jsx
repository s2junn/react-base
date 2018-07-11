import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GitIcon from './git-icon.jsx';

class GitListItemTypeRepo extends Component {
	static propTypes = {
		itemCondensed : PropTypes.string,
		itemDescription : PropTypes.string
	}

	render() {
		var itemCondensed = "aaa"
		var itemDescription = "bbb"

		return (
			<a href="#" className="list-item repo-list-item">
				<GitIcon iconName="pull-request" />
				<div>
					<span>{itemCondensed}</span>
					<span>{itemDescription}</span>
				</div>
			</a>
		);
	}
}

export default GitListItemTypeRepo;