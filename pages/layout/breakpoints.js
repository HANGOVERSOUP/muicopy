import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/layout/breakpoints/breakpoints.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/layout/breakpoints/MediaQuery.js': {
          js: require('docs/pages/layout/breakpoints/MediaQuery').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/layout/breakpoints/MediaQuery'), 'utf8')
`,
        },
        'pages/layout/breakpoints/WithWidth.js': {
          js: require('docs/pages/layout/breakpoints/WithWidth').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/layout/breakpoints/WithWidth'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
