import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class AccountCircle extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <img src={ require( 'logo.svg' ) } className="App-logo" alt="logo" />
            </Fragment>
        );
    }
}

AccountCircle.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( AccountCircle );
