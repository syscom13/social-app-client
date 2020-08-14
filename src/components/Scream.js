import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { likeScream, unlikeScream } from '../redux/actions/dataActions'
import MyButton from '../utils/MyButton'
import DeleteScream from './DeleteScream'
// Styles
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  content: {
    padding: 25,
  },
  media: {
    minWidth: 200,
    objectFit: 'cover'
  }
}))

const Scream = ({ scream }) => {
  const { body, createdAt, userImage, userHandle, likeCount, commentCount } = scream
  const likes = useSelector(state => state.user.likes)
  const authenticated = useSelector(state => state.user.authenticated)
  const { handle } = useSelector(state => state.user.credentials)
  const dispatch = useDispatch()
  const classes = useStyles()

  dayjs.extend(relativeTime)

  const likedScream = () => {
    if (likes) {
      return likes.find(like => like.screamId === scream.screamId)
    }
    return false
  }

  const handleLike = () => {
    dispatch(likeScream(scream.screamId))
  }

  const handleUnlike = () => {
    dispatch(unlikeScream(scream.screamId))
  }

  const likeButton = !authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : (
    likedScream() ? (
      <MyButton tip="Undo like" onClick={handleUnlike}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={handleLike}>
        <FavoriteBorder color="primary" />
      </MyButton>
    )
  )

  const deleteButton = authenticated && userHandle === handle ? (
    <DeleteScream screamId={scream.screamId} />
  ) : null

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        className={classes.media}
        title="Profile image"
      />
      <CardContent className={classes.content}>
        <Typography 
          variant="h5" 
          component={Link} 
          to={`/users/${userHandle}`} 
          color="primary"
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">
          {body}
        </Typography>
        {likeButton}
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        {deleteButton}
      </CardContent>
    </Card>
  )
}

export default Scream