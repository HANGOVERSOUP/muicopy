import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/demos/chips/chips.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/chips/Chips.js': {
          js: require('docs/pages/demos/chips/Chips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/chips/Chips'), 'utf8')
`,
        },
        'pages/demos/chips/OutlinedChips.js': {
          js: require('docs/pages/demos/chips/OutlinedChips').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/chips/OutlinedChips'), 'utf8')
`,
        },
        'pages/demos/chips/ChipsPlayground.js': {
          js: require('docs/pages/demos/chips/ChipsPlayground').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/chips/ChipsPlayground'), 'utf8')
`,
        },
        'pages/demos/chips/ChipsArray.js': {
          js: require('docs/pages/demos/chips/ChipsArray').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/chips/ChipsArray'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
