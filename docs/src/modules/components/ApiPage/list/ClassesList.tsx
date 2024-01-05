/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import kebabCase from 'lodash/kebabCase';
import Alert from '@mui/material/Alert';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { ComponentClassDefinition } from '@mui-internal/docs-utilities';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ExpandableApiItem, {
  ApiItemContaier,
} from 'docs/src/modules/components/ApiPage/list/ExpandableApiItem';
import { brandingDarkTheme as darkTheme } from 'docs/src/modules/brandingTheme';

const StyledApiItem = styled(ExpandableApiItem)(
  ({ theme }) => ({
    '& p': {
      margin: 0,
    },
    '& .prop-list-title': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightSemiBold,
      color: theme.palette.text.primary,
      paddingRight: 5,
      whiteSpace: 'nowrap',
      margin: 0,
    },
    '& .prop-list-class': {
      margin: 0,
    },
    '& .classes-list-deprecated': {
      '& code': { all: 'unset' },
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .prop-list-title': {
        color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
      },
    },
  }),
);

type HashParams = { componentName: string; className: string };

export function getHash({ componentName, className }: HashParams) {
  return `${kebabCase(componentName)}-classes-${className}`;
}

type ClassesListProps = {
  componentName: string;
  classes: ComponentClassDefinition[];
  displayOption: 'collapsed' | 'expanded';
  displayClassKeys?: boolean;
};

export default function ClassesList(props: ClassesListProps) {
  const { classes, displayOption, componentName, displayClassKeys } = props;
  const t = useTranslate();

  return (
    <ApiItemContaier>
      {classes.map((classDefinition) => {
        const { className, key, description, isGlobal, isDeprecated, deprecationInfo } =
          classDefinition;

        return (
          <StyledApiItem
            id={getHash({ componentName, className: key })}
            key={key}
            note={isGlobal ? t('api-docs.state') : ''}
            title={`.${className}`}
            type="classes"
            displayOption={displayOption}
            isExtendable={!!description}
          >
            {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
            {displayClassKeys && !isGlobal && (
              <p className="prop-list-class">
                <span className="prop-list-title">{'Rule name'}:</span>
                <code className="Api-code">{key}</code>
              </p>
            )}
            {isDeprecated && (
              <Alert
                className="MuiApi-collapsible classes-list-deprecated"
                severity="warning"
                icon={<WarningRoundedIcon fontSize="small" />}
                sx={{
                  '& .MuiAlert-icon': {
                    height: 'fit-content',
                    py: '8px',
                  },
                }}
              >
                {t('api-docs.deprecated')}
                {deprecationInfo && (
                  <React.Fragment>
                    {' - '}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: deprecationInfo,
                      }}
                    />
                  </React.Fragment>
                )}
              </Alert>
            )}
          </StyledApiItem>
        );
      })}
    </ApiItemContaier>
  );
}
