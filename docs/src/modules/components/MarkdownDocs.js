import * as React from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/system';
import { exactProp } from '@mui/utils';
import { CssVarsProvider } from '@mui/joy/styles';
import { useColorScheme } from '@mui/material/styles';
import Demo from 'docs/src/modules/components/Demo';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import Ad from 'docs/src/modules/components/Ad';
import AdGuest from 'docs/src/modules/components/AdGuest';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import BrandingProvider from 'docs/src/BrandingProvider';

function MaterialModeObserver({ mode }) {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);
  return null;
}

MaterialModeObserver.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']),
};

function noComponent(moduleID) {
  return function NoComponent() {
    throw new Error(`No demo component provided for '${moduleID}'`);
  };
}

export default function MarkdownDocs(props) {
  const theme = useTheme();
  const router = useRouter();
  const { canonicalAs } = pathnameToLanguage(router.asPath);
  const {
    disableAd = false,
    disableToc = false,
    demos = {},
    docs,
    demoComponents,
    srcComponents,
  } = props;

  const userLanguage = useUserLanguage();
  const t = useTranslate();

  const localizedDoc = docs[userLanguage] || docs.en;
  const { description, location, rendered, title, toc, headers } = localizedDoc;

  const isJoy = canonicalAs.startsWith('/joy-ui/');

  const isCssVarsProvider = headers.provider === 'CssVarsProvider';
  const Provider = isCssVarsProvider ? BrandingCssVarsProvider : BrandingProvider;

  return (
    <Provider dense>
      {isCssVarsProvider && <MaterialModeObserver mode={theme.palette.mode} />}
      <AppLayoutDocs
        description={description}
        disableAd={disableAd}
        disableToc={disableToc}
        location={location}
        title={title}
        toc={toc}
      >
        {isJoy && <CssVarsProvider />}
        {disableAd ? null : (
          <AdGuest>
            <Ad />
          </AdGuest>
        )}
        {rendered.map((renderedMarkdownOrDemo, index) => {
          if (typeof renderedMarkdownOrDemo === 'string') {
            return <MarkdownElement key={index} renderedMarkdown={renderedMarkdownOrDemo} />;
          }

          if (renderedMarkdownOrDemo.component) {
            const name = renderedMarkdownOrDemo.component;
            const Component = srcComponents?.[name];

            if (Component === undefined) {
              throw new Error(`No component found at the path ${path.join('docs/src', name)}`);
            }

            return <Component key={index} {...renderedMarkdownOrDemo} markdown={localizedDoc} />;
          }

          const name = renderedMarkdownOrDemo.demo;
          const demo = demos?.[name];
          if (demo === undefined) {
            const errorMessage = [
              `Missing demo: ${name}. You can use one of the following:`,
              Object.keys(demos),
            ].join('\n');

            if (userLanguage === 'en') {
              throw new Error(errorMessage);
            }

            if (process.env.NODE_ENV !== 'production') {
              console.error(errorMessage);
            }

            const warnIcon = (
              <span role="img" aria-label={t('emojiWarning')}>
                ⚠️
              </span>
            );
            return (
              <div key={index}>
                {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
                {warnIcon} Missing demo `{name}` {warnIcon}
              </div>
            );
          }

          const splitLocationBySlash = location.split('/');
          splitLocationBySlash.pop();
          const fileNameWithLocation = `${splitLocationBySlash.join('/')}/${name}`;

          return (
            <Demo
              key={index}
              headers={headers}
              mode={theme.palette.mode}
              demo={{
                raw: demo.raw,
                js: demoComponents[demo.module] ?? noComponent(demo.module),
                scope: demos.scope,
                jsxPreview: demo.jsxPreview,
                rawTS: demo.rawTS,
                tsx: demoComponents[demo.moduleTS] ?? null,
                gaLabel: fileNameWithLocation.replace(/^\/docs\/data\//, ''),
              }}
              disableAd={disableAd}
              demoOptions={renderedMarkdownOrDemo}
              githubLocation={`${process.env.SOURCE_CODE_REPO}/blob/v${process.env.LIB_VERSION}${fileNameWithLocation}`}
            />
          );
        })}
      </AppLayoutDocs>
    </Provider>
  );
}

MarkdownDocs.propTypes = {
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}
