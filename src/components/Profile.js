import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { uploadImage, logoutUser } from '../redux/actions/userActions'
import classNames from 'classnames'
import EditDetails from '../components/EditDetails'
// Styles
import { makeStyles } from '@material-ui/core/styles'
import profileStyles from '../styles/profile'
import Paper from '@material-ui/core/Paper'
import MLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import progressContainerStyles from '../styles/progress'
// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme) => ({
  ...profileStyles(theme),
  ...progressContainerStyles
}))

const Profile = () => {
  const { 
    loading, 
    credentials: { 
      handle, 
      createdAt, 
      imageUrl, 
      bio, 
      website, 
      location 
    } 
  } = useSelector(state => state.user)
  const authenticated = useSelector(state => state.user.authenticated)
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleImageUpload = e => {
    const image = e.target.files[0]
    // Upload image to server
    const formData = new FormData()
    formData.append('image', image, image.name)
    dispatch(uploadImage(formData))
  }

  const handleImageEdit = () => {
    const fileInput = document.getElementById('imageUpload')
    fileInput.click()
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const renderProfile = () => {
    if (!loading) {
      if (authenticated) {
        return (
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className="image-wrapper">
                <img src={imageUrl} alt="profile" className="profile-image" />
                <input 
                  type="file" 
                  id="imageUpload" 
                  onChange={handleImageUpload} 
                  hidden="hidden"
                />
              </div>
              <div className={classNames(classes.centerInside, classes.spacedTop)}>
                <Button 
                  className="button" 
                  onClick={handleImageEdit} 
                  variant="outlined" 
                  color="primary"
                >
                  <EditIcon className={classes.editIcon} />
                  Update Image
                </Button>
              </div>
              <hr/>
              <div className="profile-details">
                <MLink
                  component={Link}
                  to={`/users/${handle}`}
                  color="primary"
                  variant="h5"
                >
                  @{handle}
                </MLink>
                <hr/>
                {bio && <Typography variant="body2">{bio}</Typography>}
                <hr/>
                {location && (
                  <React.Fragment>
                    <LocationOn color="primary" /> <span>{location}</span>
                    <hr/>
                  </React.Fragment>
                )}
                {website && (
                  <React.Fragment>
                    <LinkIcon color="primary" />
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {' '}{website}
                    </a>
                    <hr/>
                  </React.Fragment>
                )}
                <CalendarToday color="primary" />{' '}
                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
              </div>
              <div className={classNames(classes.buttons, classes.spacedTop)}>
                <EditDetails />
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={handleLogout} 
                >
                  Log out
                </Button>
              </div>
            </div>
          </Paper>
        )
      } else {
        return (
          <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
              No profile found. Please log in again
            </Typography>
            <div className={classes.buttons}>
              <Button 
                variant="contained" 
                color="primary" 
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                component={Link}
                to="/signup"
              >
                Sign up
              </Button>
            </div>
          </Paper>
        )
      }
    } else {
      return (
        <div className={classes.progressContainer}>
          <CircularProgress />
        </div>
      )
    }
  }

  return (
    <React.Fragment>
      {renderProfile()}
    </React.Fragment>
  )
}

export default Profile