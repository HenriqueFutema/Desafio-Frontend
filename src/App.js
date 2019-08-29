import React, { useState, useEffect, useCallback } from 'react';
import api from './services/api'

import { makeStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



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
    button: {
      margin: theme.spacing(4),
    },
    input: {
      display: 'none',
    },
  }));

export default function App() {
  const classes = useStyles();

  const [docs, setDocs] = useState([])
  const [reloadDocs, setReloadDocs] = useState(0)
  const [person, setPerson] = useState('')


  const handleSubmit = useCallback(async (e) =>{
    e.preventDefault()

    console.log(person);
    const publicKey= "001ac6c73378bbfff488a36141458af2"    
    
    const docss = await api.get(`characters?ts=thesoer&apikey=${publicKey}&hash=72e5ed53d1398abb831c3ceec263f18b&name=${person}`)
    .then(function(response) {
      const data = response.data.data.results

      setDocs(data)
    })
    .catch(function(error) {
      console.log(error);
    })
    
  }, [person, setDocs])

  useEffect(() =>{
    
    const fetchData = async() =>{
      const publicKey= "001ac6c73378bbfff488a36141458af2"

      const limit = 20

      await api.get(`comics?ts=thesoer&apikey=${publicKey}&hash=72e5ed53d1398abb831c3ceec263f18b&limit=${limit}&offset=${reloadDocs}`)
      .then(function(response) {
          const olderDocs = docs

          const allDocs = [...olderDocs, response.data.data.results]
          console.log(allDocs.flat());
          
          setDocs(allDocs.flat())
      })
      .catch(function(error) {
        console.log(error)
      })
    }
    fetchData()
  
  }, [reloadDocs])

  const handleAddReaload = useCallback(() =>{

    let docsPerPage = reloadDocs

    setReloadDocs(docsPerPage += 20)

  
  }, [reloadDocs])


  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h3" component="h2">
            Marvel API
          </Typography>
        </Grid>
        <Grid item xs={4}>
        <form onSubmit={handleSubmit}>
        <TextField
            id="outlined-name"
            label="Personagem"
            className={classes.textField}
            value={person}
            onChange={e => setPerson(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        <Button variant="contained" color="secondary" className={classes.button} type="submit">
          Buscar
        </Button>
        </form>
        </Grid>
      { docs.map((doc, key) =>(
        <Card data={doc} key={key}/>
      )) }
      <Button fullWidth variant="contained" color="secondary" className={classes.button} onClick={handleAddReaload}>
        Reload
      </Button>
 
      </Grid>
    </div>

    );
  }


