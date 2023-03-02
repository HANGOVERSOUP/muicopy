import * as React from 'react';
import ApiPage from 'docs/src/modules/components/ApiPage';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import jsonPageContent from './button-unstyled.json';

export default function Page(props) {
  const { descriptions, pageContent } = props;
  return <ApiPage descriptions={descriptions} pageContent={pageContent} />;
}

Page.getInitialProps = () => {
  const req = require.context(
    'docs/translations/api-docs/button-unstyled',
    false,
    /\.\/button-unstyled.*.json$/,
  );
  const descriptions = mapApiPageTranslations(req);

  return {
    descriptions,
    pageContent: jsonPageContent,
  };
};
