import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { GridCellParams, GridRowsProp, GridColDef } from '@mui/x-data-grid';

export function renderStatus(
  params: GridCellParams<
    { status: 'verified' | 'new' | 'blocked' | 'uncertain' },
    any,
    any
  >,
) {
  const colors: { [index: string]: 'error' | 'success' | 'info' | 'default' } = {
    new: 'info',
    verified: 'success',
    blocked: 'error',
    uncertain: 'default',
  };

  return (
    <Chip
      label={params.value.status}
      color={colors[params.value.status]}
      variant="outlined"
    />
  );
}
export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>,
) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'pageTitle', headerName: 'Page Title', width: 200 },
  { field: 'eventCount', headerName: 'Event Count', type: 'number', width: 130 },
  { field: 'users', headerName: 'Users', type: 'number', width: 100 },
  {
    field: 'viewsPerUser',
    headerName: 'Views per User',
    type: 'number',
    width: 130,
  },
  { field: 'averageTime', headerName: 'Average Time', width: 130 },
  { field: 'conversions', headerName: 'Conversions', type: 'number', width: 120 },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    pageTitle: 'Homepage Overview',
    eventCount: 6345,
    users: 192423,
    viewsPerUser: 19.2,
    averageTime: '2m 23s',
    conversions: 400,
  },
  {
    id: 2,
    pageTitle: 'Product Details - Gadgets',
    eventCount: 4653,
    users: 152240,
    viewsPerUser: 10.2,
    averageTime: '2m 23s',
    conversions: 321,
  },
  {
    id: 3,
    pageTitle: 'Checkout Process - Step 1',
    eventCount: 2455,
    users: 61240,
    viewsPerUser: 16.4,
    averageTime: '2m 23s',
    conversions: 120,
  },
  {
    id: 4,
    pageTitle: 'User Profile Dashboard',
    eventCount: 123543,
    users: 102240,
    viewsPerUser: 3.74,
    averageTime: '2m 23s',
    conversions: 40,
  },
  {
    id: 5,
    pageTitle: 'Article Listing - Tech News',
    eventCount: 4653,
    users: 132240,
    viewsPerUser: 2.24,
    averageTime: '2m 23s',
    conversions: 49,
  },
  {
    id: 6,
    pageTitle: 'FAQs - Customer Support',
    eventCount: 123543,
    users: 12240,
    viewsPerUser: 3.67,
    averageTime: '2m 23s',
    conversions: 80,
  },
  {
    id: 7,
    pageTitle: 'About Us - Company Info',
    eventCount: 4653,
    users: 19240,
    viewsPerUser: 1.02,
    averageTime: '2m 23s',
    conversions: 2,
  },
  {
    id: 8,
    pageTitle: 'Contact Form Page',
    eventCount: 123543,
    users: 12240,
    viewsPerUser: 3.67,
    averageTime: '2m 23s',
    conversions: 80,
  },
  {
    id: 9,
    pageTitle: 'Services Overview - Web Development',
    eventCount: 6345,
    users: 19240,
    viewsPerUser: 1.02,
    averageTime: '2m 23s',
    conversions: 2,
  },
  {
    id: 10,
    pageTitle: 'Pricing Page - Subscription Plans',
    eventCount: 2455,
    users: 12240,
    viewsPerUser: 3.67,
    averageTime: '2m 23s',
    conversions: 80,
  },
];
