import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Arrow from '@material-ui/icons/ArrowDropDown'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import DownIcon from '@material-ui/icons/ArrowDropDown'
import Typography from "@material-ui/core/Typography"
import gray from "@material-ui/core/colors/grey"
import { makeStyles } from "@material-ui/styles"
import clsx from 'clsx'
import { history } from '../hooks/router'
import { Colors } from "../contexts/utils/style-guide"


const useStyles = makeStyles({
  noStyle: {
    listStyle: 'none',
    padding: 0
  }
})

export default function NavBar (props) {
  let [menuEl, setMenu] = useState(null)
  const { noStyle, logo } = useStyles()

  const { greeting, items, logo: logoImg, menu } = props

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar component="nav">
        <a href="/" className="logo-link">
          <img src={logoImg} alt="Samsung Pay Touch" width={85}/>
        </a>

        <Box width="1px" mx={3} height={40} bgcolor={gray[300]}/>

        <Grid container component="ul" className={noStyle} spacing={2}>
        {
          items.map(item => {
            let active = history.location.pathname === item.href
            if(history.location.pathname === '/'){
              active = item.href === '/product-catalog'
            }

            return (
              <Grid item component="li" key={item.href}>
                <Typography
                  component="a"
                  href={item.href}
                  variant="caption"
                  color={active ? "primary" : "textSecondary"}
                  style={{
                    textDecoration: 'none',
                    fontWeight: active && "bold"
                  }}>
                  {item.label}
                </Typography>
              </Grid>
            )
          })
        }
        </Grid>

        <Button>{ greeting }</Button>

        <IconButton
          color="inherit" aria-label="Menu"
          aria-owns={menuEl ? 'appbar-menu' : undefined}
          aria-haspopup="true"
          size="small"
          onClick={(e) => setMenu(e.currentTarget)}
          >
          <DownIcon/>
        </IconButton>

        <Menu
          id="appbar-menu"
          open={Boolean(menuEl)}
          anchorEl={menuEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={e => setMenu(null)}
          >
          {
            menu.map(item => (
              <MenuItem key={item.label} onClick={ (e) => (item.onClick(e), setMenu(null)) } selected={ item.selected }>
                <ListItemIcon>
                  { item.icon }
                </ListItemIcon>
                <Typography variant="body1">
                  { item.label }
                </Typography>
              </MenuItem>
            ))
          }
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
