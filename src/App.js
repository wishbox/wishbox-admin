import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { nbsp, capfirst } from './util'
import DisconnectDialog from './components/DisconnectDialog'
import theme from './theme'
import { useAuth } from './api'
import { useLocale, useHistory, useSnackbar } from './hooks'
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import clsx from 'clsx';
import loadable from '@loadable/component';

// const ForgotPasswordPage = loadable(() => import('./pages/forgot-password'))
// const ResetPasswordPage = loadable(() => import('./pages/reset-password'))
// const ResetPasswordConfirmationPage = loadable(() => import('./pages/reset-password-confirmation'))
// const EmailConfirmationPage = loadable(() => import('./pages/reset-password-confirmation'))
const SignInPage = loadable(() => import('./pages/sign-in'))
const DashboardPage = loadable(() => import('./pages/dashboard'))
const OrdersPage = loadable(() => import('./pages/orders'))


const Page = props => {
  switch (props.path) {
    // case '/password/forgot':
    //   return <ForgotPasswordPage {...props}/>
    // case '/password/reset':
    //   return <ResetPasswordPage {...props} />
    // case '/password/confirmation':
    //   return <ResetPasswordConfirmationPage {...props} />
    // case '/email-confirmed':
    //   return <EmailConfirmationPage {...props} />
    case '/orders':
      return <OrdersPage {...props} />
    case '/dashboard':
      return <DashboardPage {...props} />
    case '/sign-in':
    default:
      return <SignInPage {...props} />
  }
}


function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        DY
      </Link>
      {' team.'}
    </Typography>
  );
}



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
  })
)


export default function App (props) {
  // let { user } = useAuth()
  let user = false
  let { t, lang, setLang } = useLocale()
  let history = useHistory()
  const snack = useSnackbar()

  const menu = [
    { href: '/dashboard', label: t`Dashboard`, icon: <DashboardIcon/> },
    { href: '/orders', label: t`Orders`, icon: <ShoppingCartIcon/> },
  ]

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  let isAuthPage = ['/sign-in'].indexOf(history.location.pathname) >= 0

  // redirect not logged in user
  if (!user && !isAuthPage) {
    history.push('/sign-in')
    snack(t`You were logged out.`)
  }


  if (history.location.pathname === '/sign-in') return <Page path={history.location.path} />

  return (
    <Box display="flex">
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List component='nav'>
          {
            menu.map(({label, href, icon}) => (
              <ListItem key={'menu-item-' + label} button component='a' href={href} selected={history.location.pathname === href}>
                <ListItemIcon>
                  { icon }
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            ))
          }
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Page path={history.location.pathname} />
        </Container>
        <Footer />
      </main>
    </Box>
  );
}
