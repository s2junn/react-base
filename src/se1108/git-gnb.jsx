import React, { Component } from 'react';

class GitGnb extends Component {
	render() {
		return (
			<nav className="gnb-wrap">
                <ul>
                    <li><a href="#" className="active">Dashboard</a></li>
                    <li><a href="#">Pull requests</a></li>
                    <li><a href="#">Issues</a></li>
                </ul>
            </nav>
		);
	}
}

export default GitGnb;