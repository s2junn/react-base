import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItemGit from "./list-item-type-git.jsx";
import ListItemGitRepo from "./list-item-type-git-repo.jsx";

class List extends Component {
	static propTypes = {
		itemData: PropTypes.array,
		listType: PropTypes.string
	};

	static defaultPropTypes = {
		listType: ""
	};

    constructor(props) {
        super(props);
		this.state = {
			className: "list"
		}

        switch ( this.props.listType ) {
			case "":
                break;
            case "repo":
				this.state = Object.assign({}, this.state, { className: "list repo-list" });
                break;
			//case "file":
		}
    }

    render() {
		var rows = [];
		var index = 0;
		for ( var item in this.props.itemData ) {
			console.log(this.props.itemData[item])
			if ( this.state.className === "list" ) {
				rows.push(<ListItemGit key={index} itemData={this.props.itemData[item]} />);
			} else {
				rows.push(<ListItemGitRepo key={index} itemData={this.props.itemData[item]} />);
			}
			index++;
		}
		index = 0;

		return (
			<div className={this.state.className}>{rows}</div>
		);
    }
}

export default List;
