import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/style/icons/icons.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/style/icons/SvgIcons.js': {
          js: require('docs/pages/style/icons/SvgIcons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/style/icons/SvgIcons'), 'utf8')
`,
        },
        'pages/style/icons/SvgMaterialIcons.js': {
          js: require('docs/pages/style/icons/SvgMaterialIcons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/style/icons/SvgMaterialIcons'), 'utf8')
`,
        },
        //         'pages/style/icons/SvgMaterialIconsAll.js': {
        //           js: require('docs/pages/style/icons/SvgMaterialIconsAll').default,
        //           raw: preval`
        // module.exports = require('fs')
        //   .readFileSync(require.resolve('docs/pages/style/icons/SvgMaterialIconsAll'),
        //      'utf8')
        // `,
        //         },
        'pages/style/icons/Icons.js': {
          js: require('docs/pages/style/icons/Icons').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/style/icons/Icons'), 'utf8')
`,
        },
        'pages/style/icons/FontAwesome.js': {
          js: require('docs/pages/style/icons/FontAwesome').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/style/icons/FontAwesome'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
