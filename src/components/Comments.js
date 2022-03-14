import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {useDispatch,useSelector} from 'react-redux'
import {mockComments} from '../store/api'
import {getCommentsList,loadComments} from '../store/slices/view'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Comments() {
  const classes = useStyles();

  const dispatch = useDispatch();
 const comments = useSelector(getCommentsList)

  React.useEffect(()=>{
      dispatch(loadComments(mockComments))
  },[])

  return (
      <>

        <h1>Comments</h1>
      
        <List className={classes.root}>

        {
            comments.map((comment,index) => {
                return (
                    <Fragment key={comment?.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar>{comment?.name[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                        primary={comment?.name}
                        secondary={
                            <React.Fragment>
                            {comment?.comment}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </Fragment>
                )
            })
        }
        </List>
      </>
  );
}
