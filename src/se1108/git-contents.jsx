import React, { Component } from 'react';
import GitBubble from './git-bubble.jsx';

class GitContents extends Component {
	constructor(props) {
		super(props);
		this.jsonCALL();
	}
	jsonCALL() {
		fetch('http://')
		.then(function (res) {
			return '';
		}).then(function (blob) {
			return '';
		}).catch(function (err) {
			console.log('fetch problem: ' + err);
		})
	}
	render() {
		return (
			<div className="git-contents">
				<div className="tab dashboard-tab">
					<ul>
						<li className="tab__active"><a href="#">Overview</a></li>
						<li><a href="#">Discover repositories</a></li>
					</ul>
				</div>
				<div className="dashboard-search">
					<input type="text" placeholder="Search GitHub" className="form-control input-contrast width-full"/>
				</div>
				<GitBubble bubbleTitle="Recent activity"/>
				<GitBubble bubbleTitle="Repositories you contribute to"/>
				<GitBubble bubbleTitle="Starred repositories"/>
			</div>
		);
	}
}

export default GitContents;