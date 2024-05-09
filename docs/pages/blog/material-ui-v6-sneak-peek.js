import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './material-ui-v6-sneak-peek.md?muiMarkdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
