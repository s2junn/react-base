import React, { Component, Fragment } from 'react';
import GitGnb from './git-gnb.jsx';
import GitPullRequest from './git-pullrequest.jsx';
import GitDashboard from './git-dashboard.jsx';
import './git.css';

class Git extends Component {
	render() {
		return (
			<Fragment>
				<GitGnb/>
				<div style={{outline:"2px solid red"}}>
					<GitDashboard/>
				</div>
				<div style={{outline:"2px solid red"}}>
					<GitPullRequest/>
				</div>
			</Fragment>
		);
	}
}

export default Git;