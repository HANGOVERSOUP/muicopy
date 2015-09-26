const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const AvAirplay = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <defs><path id="a" d="M0 0h24v24H0V0z"/></defs><defs><path id="c" d="M0 0h24v24H0V0z"/></defs><clipPath id="b"><use  overflow="visible"/></clipPath><clipPath id="d" clip-path="url(#b)"><use  overflow="visible"/></clipPath><path d="M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" clip-path="url(#d)"/>
      </SvgIcon>
    );
  },
});

module.exports = AvAirplay;
