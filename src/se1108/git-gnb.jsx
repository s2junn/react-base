import React, { Component } from 'react';

class GitGnb extends Component {
	render() {
		return (
			<div className="gnb-wrapper lh-default">
				<nav className="gnb">
					<a href="#" className="selected gnb-item"><span>Dashboard</span></a>
					<a href="#" className="gnb-item"><span>Pull requests</span></a>
					<a href="#" className="gnb-item"><span>Issues</span></a>
				</nav>
			</div>
		);
	}
}

export default GitGnb;