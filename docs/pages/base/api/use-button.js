import * as React from 'react';
import HookApiPage from 'docs/src/modules/components/HookApiPage';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import jsonPageContent from './use-button.json';

export default function Page(props) {
  const { descriptions, pageContent } = props;
  return <HookApiPage descriptions={descriptions} pageContent={pageContent} />;
}

Page.getInitialProps = () => {
  const req = require.context(
    'docs/translations/api-docs/use-button',
    false,
    /\.\/use-button.*.json$/,
  );
  const descriptions = mapApiPageTranslations(req);

  return {
    descriptions,
    pageContent: jsonPageContent,
  };
};
