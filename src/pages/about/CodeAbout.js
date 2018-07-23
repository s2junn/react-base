import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class CodeAbout extends Component {

    static defaultProps = {

    };
    
    render() {
        const { classes } = this.props;
        
        return (
            <h1>
                CodeAbout
            </h1>
        );
    }
}

CodeAbout.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles( styles )( CodeAbout );