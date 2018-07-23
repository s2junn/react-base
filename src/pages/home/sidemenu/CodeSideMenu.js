import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, Divider, SwipeableDrawer } from '@material-ui/core';
import NestedList from '../../../components/List/NestedList'

const styles = {
  // for SideMenu
  list: {
    width: 330
  },
  fullList: {
    width: 'auto',
  },
};

//@withStyles( styles )
class CodeSideMenu extends Component {

  static defaultProps = {

  };

  render() {
    const { classes } = this.props;
    
    return (
      <div tabIndex={ 0 } role="button" className={ classes.list }>
          
            <NestedList onClick={ this.props.onClick } onKeyDown={ this.props.onKeyDown } />
          
      </div>
    );
  }
}

CodeSideMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles( styles )( CodeSideMenu );