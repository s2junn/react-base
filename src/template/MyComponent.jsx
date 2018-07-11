import React, { Component, Fragment } from 'react'
import propTypes from 'prop-types'

class MyComponent extends Component {
	
	// constructor
	constructor( props ) {
		super( props );
		
		// props 는 DOM Element 에 attribute 를 통하여 입력받을 수 있는 값
		// 또는 react component 의 생성시 입력받는 값
		this.defaultProps = {

		};

		// state 는 component 가 화면에 rendering 을 하기 위해 필요한 값
		// rendering 대상이 아니면 state 에 포함시키지 않고 멤버 변수로 갖는다.
		this.state = {

		};

		// 생성시 전달받은 props 를 state 로 이용하는 경우
		// this.state = Object.assign( {}, props );
	}

	// life cycle
	componentDidMount() {

	}

	componentDidUpdate() {

	}

	componentWillUnmount() {

	}

	// handle events
	handleEvent(e) {

	}

	// render
	render() {
		return (
			<Fragment>

			</Fragment>
		);
	}
}

export default MyComponent;