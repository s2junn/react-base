import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    class1: {
        display: 'flex',
        boxSizing: 'border-box',
        backgroundColor: '#123456',
        backgroundImage: 'url(' + require( 'logo.svg' ) + ')',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        margin: '1rem',
        padding: '1rem',
    }
};

// @withStyles( styles )
class CodeLifeCycleTemplate extends Component {
    
  static defaultProps = {
        
  };

  constructor( props ) {
    super( props );

    this.state = {
      error: false
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
      
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        CodeLifeCycleTemplate        
      </div>
    );
  }

  componentDidCatch(error, info) {
    this.setState({
      error: true
    });
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.array !== this.state.array) {
      const {
        scrollTop, scrollHeight
      } = this.list;

      return {
        scrollTop, scrollHeight
      };
    }
  }
  
  componentDidMount() {
    
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      const { scrollTop } = this.list;
      if (scrollTop !== snapshot.scrollTop) return;
      const diff = this.list.scrollHeight - snapshot.scrollHeight;
      this.list.scrollTop += diff;
    }
    
    if ( this.props.value !== prevProps.value ) {
      console.log( 'value changed: ', value );
    }
  }
  
  componentWillUnmount() {
    
  }
}

CodeMain.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyle( styles )( CodeLifeCycleTemplate );