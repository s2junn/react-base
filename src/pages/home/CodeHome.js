import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, Slide, Icon } from '@material-ui/core';
import { List, Divider, SwipeableDrawer } from '@material-ui/core';
import MenuIcon from 'components/AppBar/MenuIcon';

import CodeMain from 'pages/home/CodeMain';
import CodeGitHub from 'pages/github/CodeGitHub';
import CodeJIRA from 'pages/jira/CodeJIRA';
import CodeConfluence from 'pages/confluence/CodeConfluence';
import CodePortal from 'pages/portal/CodePortal';

import CodeSideMenu from 'pages/home/sidemenu/CodeSideMenu';
import temp_logo from 'assets/images/logo_main_header.png';

const propTypes = {
    classes: PropTypes.object.isRequired
};

const styles = {
    // for AppBar
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        width: '4rem',
        height: '4rem'
    },
};

class CodeHome extends Component {
    
    static defaultProps = {
        gravity: 'right',
    };

    constructor( props ) {
        super( props );

        this.state = Object.assign( {}, {
            // for SwipeableDrawer
            top: false,
            left: false,
            bottom: false,
            right: false,

            // for AppBar
            auth: false,
            anchorEl: null,
        }, props.location.state );
    }

    toggleDrawer = (side, open) => (() => {
        this.setState({
            [side]: open,
        });
    });

    sidemenu = (open) => (() => {
        this.toggleDrawer( this.props.gravity, open )();
    });

    openSideMenu = () => {
        this.sidemenu( true )();
    };    

    closeSideMenu = () => {
        this.sidemenu( false )();
    };

    render() {
        const { gravity } = this.props;
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean( anchorEl );

        return (
            <Fragment>
                <div className={ classes.root }>
                    <AppBar position="static" color="default" style={{height:'60px', backgroundColor:'#fff'}}>
                        <Toolbar>
                            <Typography align="center" variant="title" color="inherit" className={ classes.flex }>
                                <img src={ temp_logo } className="temp-logo" />
                            </Typography>

                            <IconButton className={ classes.menuButton } color="inherit" aria-label="Menu" onClick={ this.openSideMenu }>
                                <MenuIcon />
                            </IconButton>

                            <SwipeableDrawer anchor={ gravity } open={ this.state[ gravity ] } onClose={ this.closeSideMenu } onOpen={ this.openSideMenu }>
                                <CodeSideMenu onClick={ this.closeSideMenu } onKeyDown={ this.closeSideMenu } />
                            </SwipeableDrawer>
                        </Toolbar>
                    </AppBar>
                </div>
                <Switch>
                    <Route path="/home/github" component={ CodeGitHub } />
                    <Route path="/home/jira" component={ CodeJIRA } />
                    <Route path="/home/confluence" component={ CodeConfluence } />
                    <Route path="/home/portal" component={ CodePortal } />
                    <Route path="/home" component={ CodeMain } />
                    <Route exact path="/" render={() => (
                        auth ? (
                            <Redirect to="/home" />
                        ) : (
                            <Redirect to="/login" />
                        )
                    )}/>
                </Switch>
            </Fragment>
        );
    }
}

CodeHome.propTypes = propTypes;

export default withStyles( styles )( CodeHome );