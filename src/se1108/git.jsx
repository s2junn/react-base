import React, { Component, Fragment } from "react";
import GitGnb from "./git-gnb.jsx";
import GitPullRequest from "./git-pullrequest.jsx";
import GitDashboard from "./git-dashboard.jsx";
import "./git.css";

class Git extends Component {
    render() {
        return (
            <Fragment>
                <GitGnb />
                <div>
                    <GitDashboard />
                </div>
                <hr style={{ width: "100%", height:"4px", backgroundColor:"red" }} />
                <div>
                    <GitPullRequest />
                </div>
            </Fragment>
        );
    }
}

export default Git;
