import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './list.jsx';

class GitBubble extends Component {
	render() {
		return (
			<div className="bubble">
                <h3 className="bubble-title bg-gray">{this.props.bubbleTitle}</h3>
                <List/>
            </div>
		);
	}
}

GitBubble.propTypes = {
    bubbleTitle : PropTypes.string,
    bubbleData : PropTypes.array
}

export default GitBubble;