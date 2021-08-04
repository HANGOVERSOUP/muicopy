import * as React from 'react';
import { useTheme, ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import ThemeProvider from 'docs/src/modules/ThemeContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppHeader from 'docs/src/layouts/AppHeader';
import ReferencesCore from 'docs/src/components/home/ReferencesCore';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import AppFooter from 'docs/src/layouts/AppFooter';
import { MuiStats } from 'docs/src/components/home/Testimonials';
import GradientText from 'docs/src/components/typography/GradientText';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';

let darkTheme = createTheme(getDesignTokens('dark'));

darkTheme = createTheme(darkTheme, getThemedComponents(darkTheme));

interface Profile {
  src: string;
  name: string;
  title: string;
  location: string; // https://www.locationflags.io/
  about?: string;
  github?: string;
  twitter?: string;
}

const Icon = ({ name }: { name: string }) => (
  <Box sx={{ display: 'inline-block', verticalAlign: 'bottom', mr: 1, lineHeight: 0 }}>
    <img width="28" height="28" loading="lazy" src={`/static/branding/about/${name}.svg`} alt="" />
  </Box>
);

const Person = (props: Profile & { sx?: PaperProps['sx'] }) => {
  return (
    <Paper variant="outlined" sx={{ p: 2, ...props.sx }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          '& > div': { minWidth: 'clamp(0px, (150px - 100%) * 999 ,100%)' },
        }}
      >
        <Box sx={{ lineHeight: 0 }}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              variant="rounded"
              src={props.src}
              sx={{ width: 70, height: 70, bgcolor: 'primaryDark.800' }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translateX(50%)',
                boxShadow: '0px 4px 20px rgba(61, 71, 82, 0.25)',
                width: 24,
                height: 24,
                border: '2px solid #fff',
                borderRadius: 40,
                overflow: 'hidden',
                '& > img': {
                  width: 28,
                  height: 32,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: 'translate(-4px, -6px)',
                },
              }}
            >
              <img
                loading="lazy"
                src={`https://www.countryflags.io/${props.location}/flat/64.png`}
                alt=""
              />
            </Box>
          </Box>
        </Box>
        <Box mx="auto" height={15} />
        <Box sx={{ mt: -0.5, mr: -0.5 }}>
          {props.github && (
            <IconButton
              aria-label={`${props.name} github`}
              component="a"
              href={props.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img width="20" height="20" src={`/static/images/logos/github-light.svg`} alt="" />
            </IconButton>
          )}
          {props.twitter && (
            <IconButton
              aria-label={`${props.name} twitter`}
              component="a"
              href={props.twitter}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img width="20" height="20" src={`/static/images/logos/twitter-light.svg`} alt="" />
            </IconButton>
          )}
        </Box>
      </Box>
      <Typography variant="body2" fontWeight="bold" sx={{ mt: 2, mb: 0.5 }}>
        {props.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {props.title}
      </Typography>
      {props.about && (
        <Divider
          sx={{
            my: 1,
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.100',
          }}
        />
      )}
      {props.about && (
        <Typography variant="body2" color="text.secondary">
          {props.about}
        </Typography>
      )}
    </Paper>
  );
};

const teamMembers: Array<Profile> = [
  {
    src: '/static/branding/about/olivier.jpg',
    name: 'Olivier Tassinari',
    title: 'Co-founder',
    about: 'Something quick about you here!',
    location: 'fr',
    twitter: 'https://twitter.com/olivtassinari',
    github: 'https://github.com/oliviertassinari',
  },
  {
    name: 'Matt Brookes',
    src: '/static/branding/about/matt.jpg',
    title: 'Co-founder',
    location: 'gb',
    twitter: 'randomtechdude',
    github: 'mbrookes',
  },
  {
    name: 'Sebastian Silbermann',
    src: '/static/branding/about/sebastian.jpg',
    title: 'Core components team',
    location: 'de',
    twitter: 'sebsilbermann',
    github: 'eps1lon',
  },
  {
    name: 'Damien Tassone',
    src: '/static/branding/about/damien.jpg',
    title: 'Advanced components team',
    location: 'es',
    twitter: 'madKakoO',
    github: 'dtassone',
  },
  {
    name: 'Marija Najdova',
    src: '/static/branding/about/marija.jpg',
    title: 'Core components team',
    location: 'mk',
    twitter: 'marijanajdova',
    github: 'mnajdova',
  },
  {
    name: 'Danail Hadjiatanasov',
    src: '/static/branding/about/danail.jpg',
    title: 'Advanced components team',
    location: 'nl',
    twitter: 'danail_h',
    github: 'DanailH',
  },
  {
    name: 'Matheus Wichman',
    src: '/static/branding/about/matheus.jpg',
    title: 'Advanced components team',
    location: 'br',
    github: 'm4theushw',
  },
  {
    name: 'Michał Dudak',
    src: '/static/branding/about/michal.jpg',
    title: 'Core components team',
    location: 'pl',
    twitter: 'michaldudak',
    github: 'michaldudak',
  },
  {
    name: 'Siriwat Kunaporn',
    src: '/static/branding/about/siriwat.jpg',
    title: 'Core components team',
    location: 'th',
    twitter: 'siriwatknp',
    github: 'siriwatknp',
  },
];

const contributors = [
  {
    name: 'Danica Shen',
    github: 'DDDDDanica',
    title: '🇨🇳 Chinese docs',
    location: 'cn',
    src: 'https://avatars.githubusercontent.com/u/12678455',
  },
  {
    name: 'Yan Lee',
    github: 'AGDholo',
    title: '🇨🇳 Chinese docs',
    location: 'cn',
    src: 'https://avatars.githubusercontent.com/u/13300332',
  },
  {
    name: 'Jairon Alves Lima',
    github: 'jaironalves',
    title: '🇧🇷 Brazilian docs',
    location: 'br',
    src: 'https://avatars.githubusercontent.com/u/29267813',
  },
];

const emeriti = [
  {
    name: 'Hai Nguyen',
    github: 'hai-cea',
    twitter: 'haicea',
    title: 'v0.x creator',
    location: 'us',
    src: 'https://avatars.githubusercontent.com/u/2007468',
  },
  {
    name: 'Nathan Marks',
    github: 'nathanmarks',
    title: 'v1.x co-creator',
    location: 'us',
    src: 'https://avatars.githubusercontent.com/u/4420103',
  },
  {
    name: 'Kevin Ross',
    github: 'rosskevin',
    twitter: 'rosskevin',
    title: 'Core focus, flow',
    location: 'us',
    src: 'https://avatars.githubusercontent.com/u/136564',
  },
  {
    name: 'Sebastian Sebald',
    github: 'sebald',
    twitter: 'sebastiansebald',
    title: 'Core focus',
    location: 'de',
    src: 'https://avatars.githubusercontent.com/u/985701',
  },
  {
    name: 'Ken Gregory',
    github: 'kgregory',
    title: 'Core focus',
    location: 'us',
    src: 'https://avatars.githubusercontent.com/u/3155127',
  },
  {
    name: 'Tom Crockett',
    github: 'pelotom',
    twitter: 'pelotom',
    title: 'Core focus',
    location: 'us',
    src: 'https://avatars.githubusercontent.com/u/128019',
  },
  {
    name: 'Maik Marschner',
    github: 'leMaik',
    twitter: 'leMaikOfficial',
    title: 'Core focus',
    location: 'de',
    src: 'https://avatars.githubusercontent.com/u/5544859',
  },
  {
    name: 'Oleg Slobodskoi',
    github: 'kof',
    twitter: 'oleg008',
    title: 'JSS',
    location: 'de',
    src: 'https://avatars.githubusercontent.com/u/52824',
  },
  {
    name: 'Dmitriy Kovalenko',
    github: 'dmtrKovalenko',
    twitter: 'dmtrKovalenko',
    title: 'Date pickers',
    location: 'ua',
    src: 'https://avatars.githubusercontent.com/u/16926049',
  },
  {
    name: 'Josh Wooding',
    github: 'joshwooding',
    twitter: 'JoshWooding_',
    title: 'Core focus, J.P. Morgan',
    location: 'gb',
    src: 'https://avatars.githubusercontent.com/u/12938082',
  },
];

export default function About() {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  return (
    <ThemeProvider>
      <CssBaseline />
      <AppHeader />
      <Container>
        <Box
          sx={{
            height: '40vh',
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 600,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="primary" fontWeight="bold">
            About us
          </Typography>
          <Typography variant="h2" sx={{ my: 1 }}>
            We&apos;re on a mission to make building UIs more{' '}
            <GradientText>accessible</GradientText>.
          </Typography>
          <Typography color="text.secondary" textAlign="center" sx={{ maxWidth: { md: 500 } }}>
            Our mission is to empower anyone to build UIs, faster. We&apos;re reducing the entry
            barrier, making design skills accessible.
          </Typography>
        </Box>
        <ReferencesCore />
      </Container>
      <Box
        sx={{ bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50') }}
      >
        <Container sx={{ py: { xs: 4, md: 8 } }}>
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ my: 1 }}>
                Our ultimate goal
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 1, maxWidth: 450 }}>
                We aim high trying to design the most effective and efficient tool for building UIs,
                for developers and designers. MUI started back in 2014, to unify React and Material
                Design. Since then, we&apos;ve become a community of over 2M developers from every
                corner of the world.
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                We plan on doing all that cultivating our values:
              </Typography>
              {[
                'Customer obsessession. We put our customers front & center.',
                'Transparency. Most of our work is public.',
                'Freedom. We work from anywhere in the world.',
                'Autonomy. We want to create a safe, high-trust team.',
                "Excellence. We're aiming high, and we know it.",
              ].map((text) => (
                <Box key={text} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <img src={`/static/branding/pricing/yes-${mode}.svg`} alt="" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight="extraBold"
                    sx={{ ml: 1 }}
                  >
                    {text}
                  </Typography>
                </Box>
              ))}
            </Grid>
            <MuiStats mode={mode} />
          </Grid>
        </Container>
      </Box>
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography variant="h2" sx={{ my: 1 }}>
              Team
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 450 }}>
              MUI is maintained by a group of invaluable core contributors, with the massive support
              and involvement of the community.
            </Typography>
            <Button
              endIcon={<KeyboardArrowRightRounded fontSize="small" />}
              variant="contained"
              size="large"
            >
              Join the team
            </Button>
          </div>
          <img
            width="130"
            height="124"
            loading="lazy"
            src="/static/branding/pricing/early-bird.svg"
            alt=""
          />
        </Box>
        <Divider sx={{ my: { xs: 2, sm: 4 } }} />
        <Typography variant="h5" color="primary" fontWeight="extraBold" sx={{ mb: 1 }}>
          Company
        </Typography>
        <Typography color="text.secondary">
          The development of the project and its ecosystem is guided by an international team.
        </Typography>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            {teamMembers.map((profile) => (
              <Grid key={profile.name} item xs={6} sm={4} md={3}>
                <Person sx={{ height: '100%' }} {...profile} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <MuiThemeProvider theme={darkTheme}>
        <Box sx={{ bgcolor: 'primaryDark.700' }}>
          <Container sx={{ py: { xs: 4, sm: 8 } }}>
            <Typography variant="h5" color="primary" fontWeight="extraBold" sx={{ mb: 1 }}>
              Community contributors
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: { md: 400 } }}>
              Some members of the community have so enriched it, that they deserve special mention.
            </Typography>
            <Box sx={{ pt: 2, pb: { xs: 4, sm: 8 } }}>
              <Grid container spacing={2}>
                {contributors.map((profile) => (
                  <Grid key={profile.name} item xs={6} sm={4} md={3}>
                    <Person sx={{ height: '100%' }} {...profile} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Typography variant="h5" color="warning.main" fontWeight="extraBold" sx={{ mb: 1 }}>
              Community emeriti
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: { md: 400 } }}>
              We honor some no-longer-active core team members who have made valuable contributions
              in the past. They advise us from time-to-time.
            </Typography>
            <Box sx={{ pt: 4, pb: { xs: 4, md: 8 } }}>
              <Grid container spacing={2}>
                {emeriti.map((profile) => (
                  <Grid key={profile.name} item xs={6} sm={4} md={3}>
                    <Person sx={{ height: '100%' }} {...profile} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </MuiThemeProvider>
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 } }}>
          Our ultimate goal
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography component="div" variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                <Icon name="give-feedback" />
                Give feedback
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Tell us what and where we can improve or share your happy moments with us! You can
                also up or downvote any page on our documentation. <br />
                <br /> And lastly, from time to time, we send our community a survey for a more
                structured feedback, you&apos;re always invinted to participate to share you
                thoughts.
              </Typography>
              <Link href="/" variant="body2">
                Leave your feedback{' '}
                <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px' }} />
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography component="div" variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                <Icon name="join-community" />
                Join the community
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Become a member of a huge community of developers supporting MUI. You can:
              </Typography>
              <Box
                component="ul"
                sx={{
                  typography: 'body2',
                  color: 'text.secondary',
                  pl: 2,
                }}
              >
                <li>Add new features by submitting a pull request.</li>
                <li>Fix bugs or improve our documentation.</li>
                <li>Help others bu reviewing and commenting on existing PRs and issues.</li>
                <li>Help translate the documentation.</li>
              </Box>
              <Link href="/" variant="body2">
                See the repository <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px' }} />
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography component="div" variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                <Icon name="support-us" />
                Suport us financially
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                If you use Material-UI in a commercial project and would like to support its
                continued development by becoming a Sponsor, or in a side or hobby project and would
                like to become a Backer, you can do so through OpenCollective.
                <br />
                <br />
                All funds donated are managed transparently, and Sponsors receive recognition in the
                README and on the Material-UI home page.
              </Typography>
              <Link href="/" variant="body2">
                See Open Collective{' '}
                <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px' }} />
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <HeroEnd />
      <Divider />
      <AppFooter />
    </ThemeProvider>
  );
}
