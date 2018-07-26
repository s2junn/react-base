import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const styles = {
  link: {
    textDecoration: 'none'
  }
};

class CodeLink extends Component {

    static defaultProps = {

    }

    constructor( props ) {
      super( props );

      const { classes } = props;
      this.state = Object.assign( {}, props, { 
        className: props.className + ' ' + classes.link + ( props.activeClassName ? ' ' + props.activeClassName : '' )
      } );
    };

    render() {
        return (
            <NavLink { ...this.state }>
                { this.props.children }
            </NavLink>
        );
    }
}

CodeLink.propTypes = {
    to: PropTypes.any,
    href: PropTypes.any,
    classes: PropTypes.object.isRequired,
}

export default withStyles( styles )( CodeLink );