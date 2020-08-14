import React, { useState } from 'react'
import { signupUser } from '../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AppIcon from '../images/monkey.svg'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import formStyles from '../styles/form'

const useStyles = makeStyles((theme) => ({
  ...formStyles
}))

const Signup = props => {
  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()
  const errors = useSelector(state => state.ui.errors ? state.ui.errors : {})
  const loading = useSelector(state => state.ui.loading)
  const classes = useStyles()

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(signupUser({ handle, email, password, confirmPassword }, props.history))
  }

  const handleHandleChange = ({ target }) => setHandle(target.value)
  const handleEmailChange = ({ target }) => setEmail(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)
  const handleConfirmPasswordChange = ({ target }) => setConfirmPassword(target.value)

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image}/>
        <Typography variant="h3" className={classes.pageTitle}>
          Sign up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField 
            id="handle" 
            name="handle" 
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
            onChange={handleHandleChange}
            fullWidth
          />
          <TextField 
            id="email" 
            name="email" 
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
          <TextField 
            id="password" 
            name="password" 
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
          <TextField 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password"
            label="Confirm password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className={classes.button}
            disabled={loading}
          >
            Sign up
            {loading && (
              <CircularProgress 
                className={classes.progress} 
                size={30}
              />
            )}
          </Button>
        </form>
        <small className={classes.smallText}>
          Already have an account? Login <Link to="/login">here</Link>
        </small>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

export default Signup