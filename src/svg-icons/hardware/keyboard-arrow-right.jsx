const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const HardwareKeyboardArrowRight = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
      </SvgIcon>
    );
  },
});

module.exports = HardwareKeyboardArrowRight;
