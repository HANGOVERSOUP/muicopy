import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import * as pageProps from 'docs/data/base/components/button/button.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import componentApiJsonPageContent from './api/button-unstyled.json';
import hookApiJsonPageContent from './api/use-button.json';

export default function Page(props) {
  return <MarkdownDocs {...pageProps} {...props} />;
}

Page.getInitialProps = () => {
  const componentApiReq = require.context(
    'docs/translations/api-docs/button-unstyled',
    false,
    /button-unstyled.*.json$/,
  );
  const componentApiDescriptions = mapApiPageTranslations(componentApiReq);

  const hookApiReq = require.context(
    'docs/translations/api-docs/use-button',
    false,
    /use-button.*.json$/,
  );
  const hookApiDescriptions = mapApiPageTranslations(hookApiReq);

  return {
    componentApiDescriptions,
    componentApiPageContent: componentApiJsonPageContent,
    hookApiDescriptions,
    hookApiPageContent: hookApiJsonPageContent,
  };
};
