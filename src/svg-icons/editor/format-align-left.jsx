const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const EditorFormatAlignLeft = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/>
      </SvgIcon>
    );
  },
});

module.exports = EditorFormatAlignLeft;
