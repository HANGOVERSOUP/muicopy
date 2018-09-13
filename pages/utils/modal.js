import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/utils/modal/modal.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/utils/modal/SimpleModal.js': {
          js: require('docs/pages/utils/modal/SimpleModal').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/utils/modal/SimpleModal'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
