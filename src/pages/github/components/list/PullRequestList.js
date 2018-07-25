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
		padding: '15px 42px 15px 38px',
		lineHeight: 'inherit',
		textAlign: 'left'
	},
	nwoLink: {
		display:'block',
		marginBottom:'6px',
		fontSize:'13px',
		fontWeight:600,
		color:'#999'
	},
	listItemTitle: {
		display:'block',
		marginRight:'55px',
		marginBottom:'11px',
		fontSize:'13px',
		fontWeight:'600',
		lineHeight:'1.2',
		color:'#333',
		wordWrap:'break-word'
	},
	byline: {
		display:'block',
		margin:0,
		fontSize:'11px',
		color:'#999'
	},
	meta: {
		color:'#999',
		fontSize:'11px',
		display:'inline-block',
		width:'20px',
		height:'20px',
		position:'absolute',
		bottom:'15px',
		right:'22px'
	},
	opened: {
		color:'#28a745'
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
            <div className={'list ' + classes.list}>
			{
				this.props.items.map( (data, idx) => (
				<div className={'list-item ' + classes.listItem} key={'pritem' + idx}>
					<svg className={'octicon octicon-git-pull-request ' + classes.opened} viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fillRule="evenodd" d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
					<span className={'meta ' + classes.meta}>#{data.number}</span>
					<span className={classes.nwoLink}>{data.repository_url.replace(/https:\/\/api.github.com\/repos\//g,'')}</span>
					<strong className={classes.listItemTitle}>{data.title}</strong>
					<span className={classes.byline}>
						Opened by <strong>{data.user.login}</strong> {data.created_at}
					</span>
					
					{
						data.labels.map( (label, idx) => {
							(<span key={'label' + idx} style={{backgroundColor:'#' + label.color}}>{label.name}</span>)
						} )
					}
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