const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const DeviceSignalWifi4Bar = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>
      </SvgIcon>
    );
  },
});

module.exports = DeviceSignalWifi4Bar;
