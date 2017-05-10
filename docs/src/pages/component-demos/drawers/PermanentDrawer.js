// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

const drawerWidth = 250;

const styleSheet = createStyleSheet('PermanentDrawer', () => ({
  demoFrame: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 32,
    zIndex: 1,
  },
  appBar: {
    position: 'relative',
    maxWidth: `calc(100% - ${drawerWidth}px)`,
  },
  drawerPaper: {
    position: 'relative',
    height: 'auto',
    width: drawerWidth,
    paddingTop: 64,
  },
  listItemText: {
    padding: '0 16px',
  },
}));

const PermanentDrawer = ({ classes }) => {
  const mailFolderListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <Typography type="body2" className={classes.listItemText}>
          Inbox
        </Typography>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <Typography type="body2" className={classes.listItemText}>
          Starred
        </Typography>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <Typography type="body2" className={classes.listItemText}>
          Send mail
        </Typography>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <Typography type="body2" className={classes.listItemText}>
          Drafts
        </Typography>
      </ListItem>
    </div>
  );

  const otherMailFolderListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <Typography type="body2" className={classes.listItemText}>
          All mail
        </Typography>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <Typography type="body2" className={classes.listItemText}>
          Trash
        </Typography>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <Typography type="body2" className={classes.listItemText}>
          Spam
        </Typography>
      </ListItem>
    </div>
  );

  return (
    <div className={classes.demoFrame}>
      <Drawer
        type="permanent"
        paperClassName={classes.drawerPaper}
      >
        <Divider />
        <List>
          {mailFolderListItems}
        </List>
        <Divider />
        <List>
          {otherMailFolderListItems}
        </List>
      </Drawer>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography type="title" colorInherit noWrap>
            Permanent navigation drawer
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PermanentDrawer);
