import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {useSelector} from 'react-redux'
import {getTopCommenters} from '../store/slices/view'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

export default function TopComments() {
 const classes = useStyles();


 const commenters = useSelector(getTopCommenters)
    return (
        <>
        
            <h1>Top Commenters</h1>

            <List className={classes.root}>

            {
                commenters.map((commenter,index) => {
                    return (
                        <Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar>{commenter?.name[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                            primary={commenter?.name}
                            secondary={
                                <React.Fragment>
                               Comments:  {commenter?.counts}
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
    )
}