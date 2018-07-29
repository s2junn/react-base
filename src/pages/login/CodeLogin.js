import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CodeLink from 'components/Link/CodeLink';

import 'assets/css/login.css';

const propTypes = {
	classes: PropTypes.object.isRequired
};

const styles = theme => ({
    link: {
        textDecoration: 'none'
	},
	loginWrap: {
		background: `url( ${ require( 'assets/images/bg_login.png' ) } ) no-repeat center/100% 100%`
	}
});

class CodeLogin extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={'login ' + classes.loginWrap}>
                <div className="login-box">
					<div className="login-box__logo">
						<img src={ require('assets/images/logo_main.png') } alt="" />
					</div>
					<form action="">
						<input type="text" placeholder="ID"/>
						<input type="password" placeholder="PASSWORD"/>
						<CodeLink to={{ pathname: '/', state: { auth: true } }}>Login</CodeLink>
					</form>
				</div>
				<div className="copyright">
					<p>삼성전자 임직원을 위한 시스템으로서 인가된 분만 사용 가능하며, 불법적으로 사용시 법적 제제를 받을 수 있습니다.</p>
					<p>This System is strictly restricted to authorized user only.<br/>Any illegal access shall be punished with a related-law</p>
				</div>
            </div>
        );
    }
}

CodeLogin.propTypes = propTypes;
export default withStyles( styles )( CodeLogin );