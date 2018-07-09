import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GitBubbleListItem from './git-bubble-list-item.jsx';

class GitBubbleList extends Component {
	
	state = {
		count: 10
	}

	render() {
		var rows = [];
		for (var i = 0; i < this.state.count; i++) {
			rows.push(<GitBubbleListItem key={i} itemData={this.itemData}/>);
		}
		
		return (
			<div className="list repo-list">
				{ rows }
			</div>
		);
	}
}

GitBubbleList.propTypes = {
    itemData : PropTypes.object
}

GitBubbleList.defaultPropTypes = {
    itemData : {}
}


export default GitBubbleList;