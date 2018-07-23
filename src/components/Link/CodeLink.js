import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
        className: props.className + ' ' + classes.link
      } );
    };

    render() {
        return (
            <Link { ...this.state }>
                { this.props.children }
            </Link>
        );
    }
}

CodeLink.propTypes = {
    to: PropTypes.any,
    href: PropTypes.any,
    classes: PropTypes.object.isRequired,
}

export default withStyles( styles )( CodeLink );