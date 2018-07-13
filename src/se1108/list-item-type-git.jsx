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
				<GitIcon iconName="pull-request" />
				<div className="list-item-title">
					<div className="text-gray">
						<span style={{margin:"0 4px"}}>·</span><span>{this.props.itemData.title}</span>
					</div>
				</div>
			</a>
		);
	}
}

export default ListItemGit;