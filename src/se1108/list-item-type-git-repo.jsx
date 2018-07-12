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
				<GitIcon iconName="repo" />
				<div>
					<span className="list-item-title repo-name">{itemCondensed}</span>
				</div>
			</a>
		);
	}
}

export default GitListItemTypeRepo;