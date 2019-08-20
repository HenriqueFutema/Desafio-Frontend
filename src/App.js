import React, {Component} from 'react';
import api from './services/api'


export default class App extends Component {
  
  componentDidMount(){

    const publicKey= "001ac6c73378bbfff488a36141458af2"



    api.get(`characters?ts=thesoer&apikey=${publicKey}&hash=72e5ed53d1398abb831c3ceec263f18b`)
    .then(function(response) {
      console.log(response);
      
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  render() {
    return (
      <div>
        <h1>Marvel API</h1>
      </div>
    );
  }
}

