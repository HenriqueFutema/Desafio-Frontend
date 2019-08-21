import React, { useState, useEffect } from 'react';
import api from './services/api'

import { makeStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

import Card from './components/CardComponent.js'


const useStyles = makeStyles(theme => ({
  root: {
  flexGrow: 1,
  },
  paper: {
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  },
  }));

export default function App() {
  const classes = useStyles();

  const [docs, setDocs] = useState([])

  useEffect(() =>{
    
    const fetchData = async() =>{
      const publicKey= "001ac6c73378bbfff488a36141458af2"



    await api.get(`characters?ts=thesoer&apikey=${publicKey}&hash=72e5ed53d1398abb831c3ceec263f18b`)
    .then(function(response) {
      console.log(response.data.data.results);
      setDocs(response.data.data.results)
    })
    .catch(function(error) {
      console.log(error)
    })

  }
  fetchData()
  

  }, [])

  return (
    <div className={classes.root}>
      <Grid container>
      <Grid item xs={12}>
      <Typography variant="h3" component="h2">
  Marvel API
</Typography>
      </Grid>
      { docs.map((doc, key) =>(
<Card data={doc} key={key}/>
      )) }
      </Grid>
    </div>

    );
  }


