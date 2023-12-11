import * as React from 'react';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import albumTheme from './albumTheme';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  return (
    <ThemeProvider theme={albumTheme}>
      <CssBaseline />
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            Album layout
          </Typography>
        </Box>

        <Button color="inherit">About</Button>
        <Button color="inherit">Contact</Button>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            width: '100%',
            height: '480px',
            backgroundImage: `url("https://source.unsplash.com/random?wallpapers")`,
            backgroundSize: 'cover',
            color: 'white',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 'inherit',
              width: '100%',
              height: '480px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}
          />
          <Container
            maxWidth="sm"
            sx={{ position: 'relative', pt: { xs: 8, md: 10 }, zIndex: 1 }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="inherit"
              gutterBottom
              sx={{
                textShadow: '0px 0px 4px rgba(0, 0, 0, 0.9)',
              }}
            >
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="inherit"
              sx={{
                textShadow: '0px 0px 4px rgba(0, 0, 0, 0.9)',
              }}
              paragraph
            >
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  variant="outlined"
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2">
                        Heading
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        This is a media card. You can use this section to describe
                        the content.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
