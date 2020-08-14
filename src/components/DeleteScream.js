import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import MyButton from '../utils/MyButton'
import { deleteScream } from '../redux/actions/dataActions'
//  Styles
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

const DeleteScream = ({ screamId }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    dispatch(deleteScream(screamId))
    setOpen(false)
  }

  return (
    <React.Fragment>
      <MyButton tip="Delete Scream" onClick={handleOpen}>
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Are you sure you want to delete this scream?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default DeleteScream