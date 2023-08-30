import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { styled, alpha } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLicensingModel } from 'docs/src/components/pricing/LicensingModelContext';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  padding: 2,
  maxWidth: 170,
  minHeight: 0,
  overflow: 'visible',
  borderRadius: 20,
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[100],
  backgroundColor: (theme.vars || theme).palette.grey[50],
  '&:has(.Mui-focusVisible)': {
    outline: `2px solid ${(theme.vars || theme).palette.primary.main}`,
  },
  '& .MuiTabs-scroller, & .MuiTab-root': {
    // Override inline-style to see the box-shadow
    overflow: 'visible!important',
  },
  '& span': {
    zIndex: 1,
  },
  '& .MuiTab-root': {
    padding: '4px 8px',
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightSemiBold,
    minWidth: 0,
    minHeight: 0,
    color: (theme.vars || theme).palette.grey[600],
    borderRadius: 20,
    '&:hover': {
      color: (theme.vars || theme).palette.grey[800],
    },
    '&.Mui-selected': {
      color: (theme.vars || theme).palette.primary[500],
      fontWeight: theme.typography.fontWeightSemiBold,
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#FFF',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.grey[200],
    height: '100%',
    borderRadius: 20,
    zIndex: 0,
  },
  ...theme.applyDarkStyles({
    borderColor: (theme.vars || theme).palette.primaryDark[700],
    backgroundColor: (theme.vars || theme).palette.primaryDark[900],
    color: (theme.vars || theme).palette.grey[400],
    '& .MuiTabs-indicator': {
      backgroundColor: alpha(theme.palette.primaryDark[600], 0.5),
      borderColor: (theme.vars || theme).palette.primaryDark[500],
      height: '100%',
      borderRadius: 20,
    },
    '& .MuiTab-root': {
      color: (theme.vars || theme).palette.grey[400],
      '&:hover': {
        color: (theme.vars || theme).palette.grey[300],
      },
      '&.Mui-selected': {
        color: (theme.vars || theme).palette.primary[200],
      },
    },
  }),
}));

const perpetualDescription =
  'One-time purchase to use the current released versions forever. 12 months of updates included.';
const annualDescription =
  'Upon expiration, your permission to use the Software in development ends. The license is perpetual in production.';

const tooltipProps = {
  enterDelay: 400,
  enterNextDelay: 50,
  enterTouchDelay: 500,
  placement: 'top' as 'top',
  describeChild: true,
  slotProps: {
    tooltip: {
      sx: {
        fontSize: 12,
      },
    },
  },
};

export default function LicensingModelSwitch() {
  const { licensingModel, setLicensingModel } = useLicensingModel();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setLicensingModel(newValue);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledTabs
        aria-label="licensing model"
        selectionFollowsFocus
        value={licensingModel}
        onChange={handleChange}
      >
        <Tab
          disableFocusRipple
          value="perpetual"
          label={
            <Tooltip title={perpetualDescription} {...tooltipProps}>
              <span>Perpetual</span>
            </Tooltip>
          }
        />
        <Tab
          disableFocusRipple
          value="annual"
          label={
            <Tooltip title={annualDescription} {...tooltipProps}>
              <span>Annual</span>
            </Tooltip>
          }
        />
      </StyledTabs>
    </Box>
  );
}
