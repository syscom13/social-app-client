import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editUserDetails } from '../redux/actions/userActions'
// Styles
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import profileStyles from '../styles/profile'

const useStyles = makeStyles((theme) => ({
  ...profileStyles(theme)
}))

const EditDetails = () => {
  const [bio, setBio]  = useState('')
  const [website, setWebsite]  = useState('')
  const [location, setLocation]  = useState('')
  const [open, setOpen]  = useState(false)
  const credentials = useSelector(state => state.user.credentials)
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    setBio(credentials.bio || '')
    setWebsite(credentials.website || '')
    setLocation(credentials.location || '')
  }, [credentials])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    dispatch(editUserDetails({ bio, website, location }))
    handleClose()
  }

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.spacedRight}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update User Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="bio"
              label="Bio"
              placeholder="A short bio about yourself"
              className={classes.textField}
              type="text"
              value={bio}
              onChange={({ target }) => setBio(target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="website"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              type="text"
              value={website}
              onChange={({ target }) => setWebsite(target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="location"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              type="text"
              value={location}
              onChange={({ target }) => setLocation(target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default EditDetails