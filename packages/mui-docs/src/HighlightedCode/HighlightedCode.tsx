import * as React from 'react';
import prism from '@mui/internal-markdown/prism';
import { NoSsr } from '@mui/base/NoSsr';
import { ButtonProps } from '@mui/material/Button';
import { SxProps, styled } from '@mui/material/styles';
import { useCodeCopy, CodeCopyButton } from '../CodeCopy';
import { MarkdownElement } from '../MarkdownElement';

const Pre = styled('pre')(({ theme }) => ({
  margin: 0,
  color: 'hsl(60deg 30% 96.08%)', // fallback color until Prism's theme is loaded
  WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
  maxWidth: 'calc(100vw - 32px)',
  [theme.breakpoints.up('md')]: {
    maxWidth: 'calc(100vw - 32px - 16px)',
  },
  '& code': {
    // Avoid layout jump after hydration (style injected by Prism)
    ...theme.typography.caption,
    fontFamily: theme.typography.fontFamilyCode,
    fontWeight: 400,
    WebkitFontSmoothing: 'subpixel-antialiased',
    // Reset for Safari
    // https://github.com/necolas/normalize.css/blob/master/normalize.css#L102
  },
}));

export interface HighlightedCodeProps {
  code: string;
  copyButtonHidden?: boolean;
  copyButtonProps?: ButtonProps;
  language: string;
  parentComponent?: React.ElementType;
  preComponent?: React.ElementType;
  plainStyle?: boolean;
  sx?: SxProps;
}

export const HighlightedCode = React.forwardRef<HTMLDivElement, HighlightedCodeProps>(
  function HighlightedCode(props, ref) {
    const {
      copyButtonHidden = false,
      copyButtonProps,
      code,
      language,
      plainStyle,
      parentComponent: Component = plainStyle ? 'div' : MarkdownElement,
      preComponent: PreComponent = plainStyle ? Pre : 'pre',
      ...other
    } = props;
    const renderedCode = React.useMemo(() => {
      return prism(code.trim(), language);
    }, [code, language]);
    const handlers = useCodeCopy();

    return (
      <Component ref={ref} {...other}>
        <div className="MuiCode-root" {...handlers}>
          {copyButtonHidden ? null : (
            <NoSsr>
              <CodeCopyButton code={code} {...copyButtonProps} />
            </NoSsr>
          )}
          <PreComponent>
            <code
              className={`language-${language}`}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: renderedCode }}
            />
          </PreComponent>
        </div>
      </Component>
    );
  },
);
