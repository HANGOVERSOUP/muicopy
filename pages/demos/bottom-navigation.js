import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/demos/bottom-navigation/bottom-navigation.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/bottom-navigation/SimpleBottomNavigation.js': {
          js: require('docs/pages/demos/bottom-navigation/SimpleBottomNavigation').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/pages/demos/bottom-navigation/SimpleBottomNavigation'), 'utf8')
`,
        },
        'pages/demos/bottom-navigation/LabelBottomNavigation.js': {
          js: require('docs/pages/demos/bottom-navigation/LabelBottomNavigation').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/pages/demos/bottom-navigation/LabelBottomNavigation'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
