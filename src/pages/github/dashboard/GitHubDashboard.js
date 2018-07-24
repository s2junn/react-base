import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Divider, Avatar } from '@material-ui/core';
import Bubble from 'pages/github/components/Bubble/bubble.js';
import BubbleHeader from 'pages/github/components/Bubble/bubbleHeader.js'
import BubbleContents from 'pages/github/components/Bubble/bubbleContents.js'

const styles = {
	dashboardSearch: {
		background:'#ffa41f',
		padding:'15px',
		marginBottom:'15px'
	},
	searchInput: {
		fontSize:'15px',
		fontWeight:'600',
		color:"#999",
		margin:'0 auto',
		padding:'15px',
		borderRadius:'3px',
		border:'1px solid #cdcdcd'
	}
};

class GitHubDashboard extends Component {
    static defaultProps = {

	}

    constructor(props) {
        super(props);

        this.state = {
        };
	}

    render() {
        const { classes } = this.props;

		const demoData_Repo = [
			{
				full_name: "demo/test1", // string 경로
				state: "open", // string
				private: false, // bool 공개 여부
				fork: false, // bool 포크 여부
				forks_count: 9, // bool 포크된 수
				stargazers_count: 80, // ?? 별 수 ??
				watchers_count: 80, // 구독 수 ??
				subscribers_count: 42, // 구독 수 ??????
				size: 108, // ????
				pushed_at: "2018-07-26T19:06:43Z",
				created_at: "2018-07-26T19:01:12Z",
				updated_at: "2018-07-26T19:14:43Z"
			},
			{
				full_name: "demo/test2", // string 경로
				state: "open", // string
				private: false, // bool 공개 여부
				fork: false, // bool 포크 여부
				forks_count: 9, // bool 포크된 수
				stargazers_count: 180, // ?? 별 수 ??
				watchers_count: 180, // 구독 수 ??
				subscribers_count: 2142, // 구독 수 ??????
				size: 108, // ????
				pushed_at: "2018-07-26T19:06:43Z",
				created_at: "2018-07-26T19:01:12Z",
				updated_at: "2018-07-26T19:14:43Z"
			}
		];

        return (
            <Fragment>
				<div className="git-contents">
					<div className={classes.dashboardSearch}>
						<input type="text" placeholder="Search GitHub" className={classes.searchInput + " form-control input-contrast width-full"}/>
					</div>
					<Bubble>
						<BubbleHeader>Recent activity</BubbleHeader>
						<BubbleContents>
							<div>TEST</div>
						</BubbleContents>
					</Bubble>
					<Bubble>
						<BubbleHeader>Repositories you contribute to</BubbleHeader>
						<BubbleContents>
							<List>
							{
								demoData_Repo.map( (data, index) => {
									return <ListItem key={index}>{data.full_name}</ListItem>
								} )
							}
							</List>
						</BubbleContents>
					</Bubble>
					<Bubble>
						<BubbleHeader>Starred repositories</BubbleHeader>
						<BubbleContents>
							<div>TEST</div>
						</BubbleContents>
					</Bubble>
					<Bubble>
						<BubbleHeader>Teams you belong to</BubbleHeader>
						<BubbleContents>
							<div>TEST</div>
						</BubbleContents>
					</Bubble>
				</div>
            </Fragment>
        );
    }
}

GitHubDashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( GitHubDashboard );