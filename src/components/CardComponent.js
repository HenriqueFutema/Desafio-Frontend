import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    minHeight: 600,
    maxHeight: 600,
    maxWidth: 345,
    overflowY: 'scroll',
    margin:theme.spacing(2),
  },
  media: {
    height: 140,
  },
}));



export default function CardComponent({data}) {
    const classes = useStyles();

    const image = `${data.thumbnail.path}.${data.thumbnail.extension}`

  return (

    
    <Grid item xs={12} sm={6} md={3} container  direction="row" justify="center"
    >
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {(data.title) ? data.title: data.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Test
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
