import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';

function getStyles(props, context) {
  const {inkBar} = context.muiTheme;

  return {
    root: {
      left: props.left,
      width: props.width,
      right: props.right,
      bottom: 0,
      display: 'block',
      backgroundColor: props.color || inkBar.backgroundColor,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: transitions.easeOut('1s', 'left'),
    },
  };
}

class InkBar extends Component {
  static propTypes = {
    color: PropTypes.string,
    left: React.PropTypes.number.isRequired,
    moveBarLeft: React.PropTypes.bool.isRequired,
    right: React.PropTypes.number.isRequired,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {style} = this.props;
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <div style={prepareStyles(Object.assign(styles.root, style))} />
    );
  }
}

export default InkBar;
