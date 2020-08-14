import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getScreams } from '../redux/actions/dataActions'
import Profile from '../components/Profile'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Scream from '../components/Scream'
import progressContainerStyles from '../styles/progress'

const useStyles = makeStyles((theme) => ({
  ...progressContainerStyles
}))

const Home = () => {
  const dispatch = useDispatch()
  const screams = useSelector(state => state.data.screams)
  const loading = useSelector(state => state.data.loading)
  const classes = useStyles()

  useEffect(() => {
    dispatch(getScreams())
  }, [])

  const listOfScreams = !loading ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <div className={classes.progressContainer}>
      <CircularProgress />
    </div>
  )

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {listOfScreams}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  )
}

export default Home