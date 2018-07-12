import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.css';

import Git from './se1108/git.jsx';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img className="App-header__logo" src={logo} />
				</header>
				<Git/>
			</div>
		);
	}
}

export default App;