const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const HardwareKeyboardArrowDown = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
      </SvgIcon>
    );
  },
});

module.exports = HardwareKeyboardArrowDown;
