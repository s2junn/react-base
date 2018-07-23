import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse, Divider, Avatar } from '@material-ui/core';
// import { InboxIcon, DraftsIcon, SendIcon, ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends Component {
  state = { open: true };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;
    
    const data = {
      subheader: '',
      items: [
        {
          type: ListItem,
          // icon: <SendIcon />,
          text: 'GitHub',
          open: false,
          children: [
            {
              type: ListItem,
              // icon: <StarBorder />,
              text: 'Dashboard',
              open: false,
              children: [],
            },{
              type: ListItem,
              // icon: <StarBorder />,
              text: 'Pull Requests',
              open: false,
              children: [],
            },{
              type: ListItem,
              // icon: <StarBorder />,
              text: 'Issues',
              open: false,
              children: [],
            },
          ],
        },
        {
          type: ListItem,
          // icon: <DraftsIcon />,
          text: 'JIRA',
          open: false,
          children: [],
        },
        {
          type: ListItem,
          // icon: <InboxIcon />,
          text: 'Confluence',
          open: false,
          children: [],
        },
        {
          type: List,
          // icon: <StarBorder />,
          text: 'Portal',
          open: false,
          children: [
            {
              type: ListItem,
              // icon: <StarBorder />,
              text: 'Request',
              open: false,
              children: [],
            },
          ],
        },
      ]
    };

    return (
      <div className={ classes.root }>
        <List component="nav" subheader={ 
          <ListSubheader component="div">
            { /* <Avatar src={ data.avatar } /> */ }
            Hello, Logged in!
          </ListSubheader> }>
          <Divider />
          {
            data.items.map( (item, index) => (
              ( item.type === List ) ? (
                <Fragment key={ index }>
                  <ListItem dense button className={ classes.listItem }>
                    { /* <ListItemIcon>{ item.icon }</ListItemIcon> */ }
                    <ListItemText primary={ item.text } />
                    { item.open ? '<ExpandLess />' : '<ExpandMore />' }
                  </ListItem>
                  <Collapse in={ item.open } timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      { 
                        item.children.map( (child, index) => (
                          <ListItem key={ index + 1000 } button className={ classes.nested }>
                            { /* <ListItemIcon>{ child.icon }</ListItemIcon> */ }
                            <ListItemText inset primary={ child.text } />
                          </ListItem>
                        ))
                      }
                    </List>
                  </Collapse>
                </Fragment>
              ) : (
                <Fragment key={ index }>
                  <ListItem dense button className={ classes.listItem }>
                    { /* <ListItemIcon>{ item.icon }</ListItemIcon> */ }
                    <ListItemText primary={ item.text } />
                  </ListItem>
                </Fragment>
              )
            ))
          }
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles( styles )( NestedList );