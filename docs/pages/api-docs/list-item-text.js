import React from 'react';
import MarkdownDocsX from 'docs/src/modules/components/MarkdownDocs.new';
import prepareMarkdown from 'docs/src/modules/utils/prepareMarkdown';

const pageFilename = 'api-docs/list-item-text';
const requireDemo = require.context('docs/src/pages/api-docs/list-item-text', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/api-docs/list-item-text',
  false,
  /\.(js|md|tsx)$/,
);

// eslint-disable-next-line react/prop-types
export default function Page({ demos, docs }) {
  return <MarkdownDocsX demos={demos} docs={docs} requireDemo={requireDemo} />;
}

Page.getInitialProps = async () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
