import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItemGit from "./list-item-type-git.jsx";
import ListItemGitRepo from "./list-item-type-git-repo.jsx";

class GitList extends Component {
  propTypes = {
    itemData: PropTypes.object,
    listType: PropTypes.string
  };

  defaultPropTypes = {
    itemData: {},
    listType: ""
  };

  constructor(props) {
    super(props);
  }

  state = {
    addClassName: ""
  };

  render() {
    var rows = [];
    for (var i = 0; i < this.state.count; i++) {
      rows.push(<ListItemGit key={i} itemData={this.itemData} />);
    }

    switch (this.listType) {
      case "":
        break;
      case "repo":
        this.state.addClassName = "repo-list";
        break;
      case "file":
        this.state.addClassName = "file-list";
        break;
    }

    return <div className="list {this.state.addClassName}">{rows}</div>;
  }
}

export default GitList;
