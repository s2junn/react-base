import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse, Divider, Avatar } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CodeLink from 'components/Link/CodeLink.js';
import SvgIcon from '@material-ui/core/SvgIcon';
// import { InboxIcon, DraftsIcon, SendIcon, ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';

import iconArrowDown from 'assets/images/icon_arrow_fold.svg';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class NestedList extends Component {
  render() {
	const { classes } = this.props;
	const { items } = this.props;

    return (
      <div className={`nested-list nested-list-dep${this.props.itemDepth}`}>
            {
				items.map( (item, index) => {
					if ( item.children.length > 0 ) {
						return (
							<ExpansionPanel key={ index } className="nested-list-item">
								<ExpansionPanelSummary className="nested-list-summary" expandIcon={ <img style={{height:'13px'}} src={iconArrowDown} /> }>
									{ item.icon && <img className="nested-list-icon" src={item.icon} /> }
									<div className="nested-list-text">{ item.text }</div>
								</ExpansionPanelSummary>									
								<ExpansionPanelDetails className="nested-list-detail">
									{ item.children && <NestedList items={ item.children } itemDepth={ this.props.itemDepth + 1 } classes={ classes } onClick={ this.props.onClick } /> }
								</ExpansionPanelDetails>
							</ExpansionPanel>
						);
					} else {
						return (
							<CodeLink to={ item.path } key={ index } className="nested-list-item" onClick={ this.props.onClick }>
								{ item.icon && <img className="nested-list-icon" src={item.icon} /> }
								<div className="nested-list-text">{ item.text }</div>
							</CodeLink>
						);
					}					
				})
			}
		</div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
  itemDepth: PropTypes.number.isRequired
};

export default withStyles( styles )( NestedList );