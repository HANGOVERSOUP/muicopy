import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from './grid-list.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default withRoot(Page);
