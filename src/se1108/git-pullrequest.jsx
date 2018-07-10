import React, { Component, Fragment } from "react";
import List from "./list.jsx";

class GitPullRequest extends Component {
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
                number: 1, // number
                state: "", // string open, closed
                title: "", // string
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
                ]
            }
        ];
        return (
            <Fragment>
                <List />
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

export default GitPullRequest;
