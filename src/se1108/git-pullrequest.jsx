import React, { Component, Fragment } from "react";
import List from "./list.jsx";

class GitPullRequest extends Component {
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
                number: 1, // number
                state: "open", // string open, closed
                title: "demo data title", // string
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
                number: 2, // number
                state: "open", // string open, closed
                title: "demo data title", // string
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
        return (
            <Fragment>
                <List itemData={demoData_PR} />
                <nav className="tabs">
					<a className="selected" href="#">Created</a>
					<a href="#">Assigned</a>
					<a href="#">Mentioned</a>
                </nav>
            </Fragment>
        );
    }
}

export default GitPullRequest;
