import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MyButton from '../utils/MyButton'

// MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
// Icons
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

const Navbar = props => {
  const authenticated = useSelector(state => state.user.authenticated)
  
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <React.Fragment>
            <MyButton tip="Post a Scream!">
              <AddIcon color="primary" />
            </MyButton>
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon color="primary" />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <Notifications color="primary" />
            </MyButton>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Sign up</Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar