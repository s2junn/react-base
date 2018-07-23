import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CodeLink from 'components/Link/CodeLink';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    link: {
        textDecoration: 'none',
    }
});

class CodeLogin extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <h1>CodeLogin</h1>
                <CodeLink to={{ pathname: '/', state: { auth: true } }}>
                    <Button variant="contained" className={ classes.button }>
                        로그인
                    </Button>
                </CodeLink>
            </div>
        );
    }
}

CodeLogin.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( CodeLogin );