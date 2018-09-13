import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/demos/lists/lists.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/lists/SimpleList.js': {
          js: require('docs/pages/demos/lists/SimpleList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/lists/SimpleList'), 'utf8')
`,
        },
        'pages/demos/lists/FolderList.js': {
          js: require('docs/pages/demos/lists/FolderList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/lists/FolderList'), 'utf8')
`,
        },
        'pages/demos/lists/InsetList.js': {
          js: require('docs/pages/demos/lists/InsetList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/lists/InsetList'), 'utf8')
`,
        },
        'pages/demos/lists/NestedList.js': {
          js: require('docs/pages/demos/lists/NestedList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/lists/NestedList'), 'utf8')
`,
        },
        'pages/demos/lists/SelectedListItem.js': {
          js: require('docs/pages/demos/lists/SelectedListItem').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/lists/SelectedListItem'), 'utf8')
`,
        },
        'pages/demos/lists/PinnedSubheaderList.js': {
          js: require('docs/pages/demos/lists/PinnedSubheaderList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/lists/PinnedSubheaderList'), 'utf8')
`,
        },
        'pages/demos/lists/CheckboxList.js': {
          js: require('docs/pages/demos/lists/CheckboxList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/lists/CheckboxList'), 'utf8')
`,
        },
        'pages/demos/lists/CheckboxListSecondary.js': {
          js: require('docs/pages/demos/lists/CheckboxListSecondary').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/lists/CheckboxListSecondary'), 'utf8')
`,
        },
        'pages/demos/lists/SwitchListSecondary.js': {
          js: require('docs/pages/demos/lists/SwitchListSecondary').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/lists/SwitchListSecondary'), 'utf8')
`,
        },
        'pages/demos/lists/InteractiveList.js': {
          js: require('docs/pages/demos/lists/InteractiveList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/lists/InteractiveList'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
