import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    list: {
        padding: 0,
		margin: 0,
		listStyle:'none',
		backgroundColor:'#fff'
	},
	listItem: {
		position: 'relative',
		display: 'block',
		width: '100%',
		padding: '14px 15px 14px 35px',
		lineHeight: 'inherit',
		textAlign: 'left'
	}
};

// @withStyles( styles )
class PullRequestList extends Component {
    
    static defaultProps = {
        items: []
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.list}>
			{
				this.props.items.map( (data, idx) => (
				<div className={classes.listItem} key={'pritem' + idx}>
					{data.number}
				</div>
				))
			}
            </div>
        )
    }
}

PullRequestList.propTypes = {
	items: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( PullRequestList );