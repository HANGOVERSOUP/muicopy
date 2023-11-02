import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Stack from '@mui/joy/Stack';

// Icons import
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

// custom
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Header from './components/Header';
import TableFiles from './components/TableFiles';

export default function FilesExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Stack
        id="tab-bar"
        direction="row"
        justifyContent="space-around"
        spacing={1}
        sx={(theme) => ({
          display: { xs: 'flex', sm: 'none' },
          zIndex: '999',
          bottom: 0,
          position: 'fixed',
          width: '100dvw',
          py: 2,
          backgroundColor: 'background.body',
          borderTop: '1px solid',
          borderColor: 'divider',
        })}
      >
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/email/"
          size="sm"
          startDecorator={<EmailRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Email
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/team/"
          size="sm"
          startDecorator={<PeopleAltRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Team
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="/joy-ui/getting-started/templates/files/"
          size="sm"
          startDecorator={<FolderRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Files
        </Button>
      </Stack>
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
          },
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
          >
            {' '}
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                gridColumn: '1/-1',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <TableFiles />
            </Sheet>
            <Sheet
              variant="outlined"
              sx={{
                display: { xs: 'inherit', sm: 'none' },
                borderRadius: 'sm',
                overflow: 'auto',
                '& > *': {
                  '&:nth-child(n):not(:nth-last-child(-n+4))': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                },
              }}
            >
              <List
                aria-labelledby="table-in-list"
                sx={{
                  '& .JoyListItemButton-root': { p: '0px' },
                }}
              >
                <ListItem>
                  <ListItemButton variant="soft" sx={{ bgcolor: 'transparent' }}>
                    <ListItemContent sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1,
                        }}
                      >
                        <Typography
                          level="body-sm"
                          startDecorator={<FolderRoundedIcon color="primary" />}
                          sx={{ alignItems: 'flex-start' }}
                        >
                          Travel pictures
                        </Typography>
                        <Typography level="body-sm" sx={{ color: 'success.600' }}>
                          987.5MB
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 2,
                        }}
                      >
                        <div>
                          <AvatarGroup
                            size="sm"
                            sx={{
                              '--AvatarGroup-gap': '-8px',
                              '--Avatar-size': '24px',
                            }}
                          >
                            <Avatar
                              src="https://i.pravatar.cc/24?img=6"
                              srcSet="https://i.pravatar.cc/48?img=6 2x"
                            />
                            <Avatar
                              src="https://i.pravatar.cc/24?img=7"
                              srcSet="https://i.pravatar.cc/48?img=7 2x"
                            />
                            <Avatar
                              src="https://i.pravatar.cc/24?img=8"
                              srcSet="https://i.pravatar.cc/48?img=8 2x"
                            />
                            <Avatar
                              src="https://i.pravatar.cc/24?img=9"
                              srcSet="https://i.pravatar.cc/48?img=9 2x"
                            />
                          </AvatarGroup>
                        </div>
                        <Typography level="body-sm">21 October 2011, 3PM</Typography>
                      </Box>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemButton variant="soft" sx={{ bgcolor: 'transparent' }}>
                    <ListItemContent sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1,
                        }}
                      >
                        <Typography
                          level="body-sm"
                          startDecorator={<FolderRoundedIcon color="primary" />}
                          sx={{ alignItems: 'flex-start' }}
                        >
                          Important documents
                        </Typography>
                        <Typography level="body-sm" sx={{ color: 'success.600' }}>
                          123.3KB
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 2,
                        }}
                      >
                        <div>
                          <AvatarGroup
                            size="sm"
                            sx={{
                              '--AvatarGroup-gap': '-8px',
                              '--Avatar-size': '24px',
                            }}
                          >
                            <Avatar
                              src="https://i.pravatar.cc/24?img=6"
                              srcSet="https://i.pravatar.cc/48?img=6 2x"
                            />
                            <Avatar
                              src="https://i.pravatar.cc/24?img=7"
                              srcSet="https://i.pravatar.cc/48?img=7 2x"
                            />
                            <Avatar
                              src="https://i.pravatar.cc/24?img=8"
                              srcSet="https://i.pravatar.cc/48?img=8 2x"
                            />
                            <Avatar
                              src="https://i.pravatar.cc/24?img=9"
                              srcSet="https://i.pravatar.cc/48?img=9 2x"
                            />
                          </AvatarGroup>
                        </div>
                        <Typography level="body-sm">26 May 2010, 7PM</Typography>
                      </Box>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </Sheet>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">lotr-two-towers.pdf</Typography>
                  <Typography level="body-sm">132.2MB</Typography>
                </Box>
                <IconButton variant="plain" color="neutral" size="sm">
                  <MoreVertRoundedIcon />
                </IconButton>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary" sx={{ borderRadius: 0 }}>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?auto=format&fit=crop&q=80&w=3024&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                </AspectRatio>
              </CardOverflow>
              <Typography level="body-xs">Added 27 Jun 2023</Typography>
            </Card>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">photos-travel.zip</Typography>
                  <Typography level="body-sm">2.4GB</Typography>
                </Box>
                <IconButton variant="plain" color="neutral" size="sm">
                  <MoreVertRoundedIcon />
                </IconButton>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio
                  ratio="16/9"
                  color="primary"
                  sx={{ borderRadius: 0, color: 'primary.plainColor' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <InsertDriveFileRoundedIcon />
                  </Box>
                </AspectRatio>
              </CardOverflow>
              <Typography level="body-xs">Added 16 May 2021</Typography>
            </Card>
            <Card
              variant="solid"
              invertedColors
              size="sm"
              sx={{
                border: '1px solid',
                borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
                minHeight: { xs: 250, md: '100%' },
              }}
            >
              <CardContent
                sx={{
                  mb: 'auto',
                  flexGrow: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">torres-del-paine.png</Typography>
                  <Typography level="body-xs" mt={0.5}>
                    Added 5 Apr 2021
                  </Typography>
                </Box>
                <IconButton variant="plain" size="sm">
                  <MoreVertRoundedIcon />
                </IconButton>
              </CardContent>
              <CardCover>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
                />
              </CardCover>
              <CardCover
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
                }}
              />
            </Card>
            <Card
              variant="solid"
              size="sm"
              invertedColors
              sx={{
                minHeight: { xs: 250, md: '100%' },
                border: '1px solid',
                borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
              }}
            >
              <CardContent
                sx={{
                  mb: 'auto',
                  flexGrow: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">serra-das-araras.png</Typography>
                  <Typography level="body-xs" mt={0.5}>
                    Added 2 Mar 2021
                  </Typography>
                </Box>
                <IconButton variant="plain" size="sm">
                  <MoreVertRoundedIcon />
                </IconButton>
              </CardContent>
              <CardCover>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1599593752325-ffa41031056e?auto=format&fit=crop&q=80&w=3570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </CardCover>
              <CardCover
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
                }}
              />
            </Card>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">translated-docs.txt</Typography>
                  <Typography level="body-sm">12.2KB</Typography>
                </Box>
                <IconButton variant="plain" color="neutral" size="sm">
                  <MoreVertRoundedIcon />
                </IconButton>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary" sx={{ borderRadius: 0 }}>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&q=80&w=3024&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                </AspectRatio>
              </CardOverflow>
              <Typography level="body-xs">Added 25 May 2019</Typography>
            </Card>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">final-version-v3.fig</Typography>
                  <Typography level="body-sm">1.1GB</Typography>
                </Box>
                <IconButton variant="plain" color="neutral" size="sm">
                  <MoreVertRoundedIcon />
                </IconButton>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio
                  ratio="16/9"
                  color="primary"
                  sx={{ borderRadius: 0, color: 'primary.plainColor' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <InsertDriveFileRoundedIcon />
                  </Box>
                </AspectRatio>
              </CardOverflow>
              <Typography level="body-xs">Added 12 May 2019</Typography>
            </Card>
          </Box>
        </Layout.Main>
        <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderLeft: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography level="title-md" sx={{ flex: 1 }}>
              torres-del-paine.png
            </Typography>
            <IconButton variant="plain" color="neutral" size="sm">
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <Divider />
          <Tabs>
            <TabList>
              <Tab sx={{ flexGrow: 1 }}>
                <Typography level="title-sm">Details</Typography>
              </Tab>
              <Tab sx={{ flexGrow: 1 }}>
                <Typography level="title-sm">Activity</Typography>
              </Tab>
            </TabList>
          </Tabs>
          <AspectRatio ratio="21/9">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
            />
          </AspectRatio>
          <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography level="title-sm" mr={1}>
              Shared with
            </Typography>
            <AvatarGroup size="sm" sx={{ '--Avatar-size': '24px' }}>
              <Avatar
                src="https://i.pravatar.cc/24?img=6"
                srcSet="https://i.pravatar.cc/48?img=6 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=7"
                srcSet="https://i.pravatar.cc/48?img=7 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=8"
                srcSet="https://i.pravatar.cc/48?img=8 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=9"
                srcSet="https://i.pravatar.cc/48?img=9 2x"
              />
            </AvatarGroup>
          </Box>
          <Divider />
          <Box
            sx={{
              gap: 2,
              p: 2,
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              '& > *:nth-child(odd)': { color: 'text.secondary' },
            }}
          >
            <Typography level="title-sm">Type</Typography>
            <Typography level="body-sm" textColor="text.primary">
              Image
            </Typography>

            <Typography level="title-sm">Size</Typography>
            <Typography level="body-sm" textColor="text.primary">
              3,6 MB (3,258,385 bytes)
            </Typography>

            <Typography level="title-sm">Location</Typography>
            <Typography level="body-sm" textColor="text.primary">
              Travel pictures
            </Typography>

            <Typography level="title-sm">Owner</Typography>
            <Typography level="body-sm" textColor="text.primary">
              Michael Scott
            </Typography>

            <Typography level="title-sm">Modified</Typography>
            <Typography level="body-sm" textColor="text.primary">
              26 October 2016
            </Typography>

            <Typography level="title-sm">Created</Typography>
            <Typography level="body-sm" textColor="text.primary">
              5 August 2016
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ py: 2, px: 1 }}>
            <Button variant="plain" size="sm" endDecorator={<EditRoundedIcon />}>
              Add a description
            </Button>
          </Box>
        </Sheet>
      </Layout.Root>
    </CssVarsProvider>
  );
}
