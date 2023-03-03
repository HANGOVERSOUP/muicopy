import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import * as pageProps from 'docs/data/base/components/textarea-autosize/textarea-autosize.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import TextareaAutosizeApiJsonPageContent from './api/textarea-autosize.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getInitialProps = () => {
  const TextareaAutosizeApiReq = require.context(
    'docs/translations/api-docs/textarea-autosize',
    false,
    /textarea-autosize.*.json$/,
  );
  const TextareaAutosizeApiDescriptions = mapApiPageTranslations(TextareaAutosizeApiReq);

  return {
    componentsApiDescriptions: { TextareaAutosize: TextareaAutosizeApiDescriptions },
    componentsApiPageContents: { TextareaAutosize: TextareaAutosizeApiJsonPageContent },
    hooksApiDescriptions: {},
    hooksApiPageContents: {},
  };
};
