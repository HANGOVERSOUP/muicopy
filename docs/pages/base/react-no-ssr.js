import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import * as pageProps from 'docs/data/base/components/no-ssr/no-ssr.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import NoSsrApiJsonPageContent from './api/no-ssr.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getInitialProps = () => {
  const NoSsrApiReq = require.context('docs/translations/api-docs/no-ssr', false, /no-ssr.*.json$/);
  const NoSsrApiDescriptions = mapApiPageTranslations(NoSsrApiReq);

  return {
    componentsApiDescriptions: { NoSsr: NoSsrApiDescriptions },
    componentsApiPageContents: { NoSsr: NoSsrApiJsonPageContent },
    hooksApiDescriptions: {},
    hooksApiPageContents: {},
  };
};
