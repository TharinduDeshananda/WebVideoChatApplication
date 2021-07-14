import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardHeader, IconButton } from '@material-ui/core';
import { getThemeProps } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    cursor: 'default',
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {



  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            1
          </Avatar>
        }
        title=""
      />
        <CardMedia
          className={classes.media}
          image={`http://localhost:3000/static/${props.imgurl}`}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.step}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.stepDesc}
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
  );
}
