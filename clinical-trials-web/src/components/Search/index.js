import React from 'react';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const request = require('request')


 


class clinicalSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "No Results"
    }
    this.getData = this.getData.bind(this);
  }

  getData() {
    var data = "data"
  
    axios.get('https://us-central1-find-clinical-trials.cloudfunctions.net/query1 ', {
      headers:{
        "Access-Control-Allow-Origin":"*"
      },
    }).then(res => {
        data = res.data[0];
        console.log(data)
        this.setState({
          results: data
        })
      })
    }

  render () {
  return (
  <div>
    <h1>LandingPage</h1>
      <div>
        <div>
          <SearchIcon />
        </div>
          <InputBase placeholder="Search"/>
      </div>
          <Button color="primary" onClick={this.getData.bind(this)}>
            search
          </Button>
          <div>{this.state.results}</div>
      </div>
     
  )}
}

export default clinicalSearch