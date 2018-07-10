import React, { Component, Fragment } from "react";
import GitBubble from "./git-bubble.jsx";

class GitContents extends Component {
    constructor(props) {
        super(props);
        this.jsonCALL();
    }
    jsonCALL() {
        fetch("http://")
            .then(function(res) {
                return "";
            })
            .then(function(blob) {
                return "";
            })
            .catch(function(err) {
                console.log("fetch problem: " + err);
            });
    }
    render() {
        var demoData_PR = [
            {
                number: "",
                state: "", // string open, closed
                title: "" // string
            }
        ];
        var demoData_Repo = [
            {
                full_name: "", // string 경로
                state: "", // string
                private: false, // bool 공개 여부
                fork: false, // bool 포크 여부
                forks_count: 9, // bool 포크된 수
                stargazers_count: 80, // ?? 별 수 ??
                watchers_count: 80, // 구독 수 ??
                subscribers_count: 42, // 구독 수 ??????
                size: 108 // ????
            }
        ];
        return (
            <Fragment>
                <div className="git-contents">
                    <div className="dashboard-search">
                        <input
                            type="text"
                            placeholder="Search GitHub"
                            className="form-control input-contrast width-full"
                        />
                    </div>
                    <GitBubble bubbleTitle="Recent activity" listType="repo" />
                    <GitBubble bubbleTitle="Repositories you contribute to" />
                    <GitBubble bubbleTitle="Starred repositories" />
                </div>
                <div className="tab dashboard-tab">
                    <ul>
                        <li className="tab__active">
                            <a href="#">Overview</a>
                        </li>
                        <li>
                            <a href="#">Discover repositories</a>
                        </li>
                    </ul>
                </div>
            </Fragment>
        );
    }
}

export default GitContents;
