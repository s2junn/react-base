import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GitIcon from './git-icon.jsx';

class ListItemGit extends Component {
	static propTypes = {
		itemData: PropTypes.object
	}

	constructor( props ) {
		super( props );
		
		this.setState = {
			
		}
	}

	render() {
		return (
			<a href="#" className="list-item">
				<GitIcon iconName="repo" />
				<div className="list-item-title repo-name">
					ABCDE
				</div>
			</a>
		);
	}
}

export default ListItemGit;