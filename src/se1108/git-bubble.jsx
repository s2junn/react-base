import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "./list.jsx";

class GitBubble extends Component {
	static propTypes = {
		bubbleData: PropTypes.object
	};

    constructor(props) {
        super(props);

        this.state = {
        };
	}
	

    render() {
        return (
            <div className="bubble">
                <h3 className="bubble-title bg-gray">
                    {this.props.bubbleData.bubbleTitle}
                </h3>
				{
					(() => {
						if ( this.props.bubbleData.listType != "NotList" )
							return <List listType={this.props.bubbleData.listType} itemData={this.props.bubbleData.listData} />
						else
							return <div>No Component</div>
					})()
				}
            </div>
        );
    }
}

export default GitBubble;
