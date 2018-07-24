import React, { Component, Fragment } from "react";
import GitBubble from "./git-bubble.jsx";

class GitContents extends Component {
    constructor(props) {
        super(props);
        //this.jsonCALL();
    }
    // jsonCALL() {
    //     fetch("http://")
    //         .then(function(res) {
    //             return "";
    //         })
    //         .then(function(blob) {
    //             return "";
    //         })
    //         .catch(function(err) {
    //             console.log("fetch problem: " + err);
    //         });
    // }
    render() {
        var demoData_PR = [
            {
                number: 1,
                state: "open",
                title: "demo data title1",
                labels: [
                    {
                        id: 208045946,
                        node_id: "MDU6TGFiZWwyMDgwNDU5NDY=",
                        url:
                            "https://api.github.com/repos/octocat/Hello-World/labels/bug",
                        name: "bug",
                        description: "Houston, we have a problem",
                        color: "f29513",
                        default: true
                    }
                ],
                locked: true,
                active_lock_reason: "too heated",
                created_at: "2018-07-10T19:01:12Z",
                updated_at: "2018-07-10T19:01:12Z",
                closed_at: "2018-07-10T19:01:12Z",
                merged_at: "2018-07-10T19:01:12Z"
            },
            {
                number: 2,
                state: "open",
                title: "demo data title2",
                labels: [
                    {
                        id: 208045946,
                        node_id: "MDU6TGFiZWwyMDgwNDU5NDY=",
                        url:
                            "https://api.github.com/repos/octocat/Hello-World/labels/bug",
                        name: "bug",
                        description: "Houston, we have a problem",
                        color: "f29513",
                        default: true
                    }
                ],
                locked: true,
                active_lock_reason: "too heated",
                created_at: "2018-07-10T19:02:12Z",
                updated_at: "2018-07-10T19:02:12Z",
                closed_at: "2018-07-10T19:02:12Z",
                merged_at: "2018-07-10T19:02:12Z"
            }
        ];
        var demoData_Repo = [
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
		
		var demoActivity = {
			bubbleTitle: "Recent activity",
			listType: "repo",
			listData: []
		};

		var demoRepo = {
			bubbleTitle: "Repositories you contribute to",
			listType: "repo",
			listData: demoData_Repo
		};
	
		var demoRepo2 = {
			bubbleTitle: "Starred repositories",
			listType: "repo",
			listData: demoData_Repo
		};

        return (
            <Fragment>
                <div className="git-contents">
                    <div className="dashboard-search">
                        <input type="text" placeholder="Search GitHub" className="form-control input-contrast width-full"/>
                    </div>
                    <GitBubble bubbleData={demoActivity} />
                    <GitBubble bubbleData={demoRepo} />
                    <GitBubble bubbleData={demoRepo2} />
                </div>
                <nav className="tabs">
					<a className="selected" href="#">Overview</a>
					<a href="#">Discover repositories</a>
                </nav>
            </Fragment>
        );
    }
}

export default GitContents;
