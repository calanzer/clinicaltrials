import React from 'react';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const request = require('request')

function getData() {
  const data = "data"
  axios.defaults.headers.get['Content-Type'] ='application/x-www-form-urlencoded';

  axios.get('https://us-central1-find-clinical-trials.cloudfunctions.net/query1 ')
    .then(res => {
      data = res.data;
      console.log(data)
      return <h1>{data}</h1>
    })
  
 

}
class clinicalSearch extends React.Component {
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
          <Button color="primary" onclick={getData}>
            {getData()}
          </Button>
  </div>
  )}
}

export default clinicalSearch