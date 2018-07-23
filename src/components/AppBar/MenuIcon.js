import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class MenuIcon extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <img src={ require( 'assets/images/btn_menu.png' ) } className="menu-icon" alt="menu" />
            </Fragment>
        );
    }
}

MenuIcon.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( MenuIcon );
