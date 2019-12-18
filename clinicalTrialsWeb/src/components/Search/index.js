import React from 'react';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';

const request = require('request')
const mainDiv = {
  margin: 'auto',
  width: '50%',
  padding: '40px',
  border: '1px solid blue'
};

const mainTitle = {
  'text-align': 'center'
}

class clinicalSearch extends React.Component {
  
  constructor(props) {
    super(props);
    //this.input = React.createRef()
    this.state = {
      results: "No Results",
      input: "No input"
    }
    //this.getData = this.getData.bind(this);
  }

  getData() {
    var data = "data"
    console.log(this.state.input)
    axios.get('https://us-central1-find-clinical-trials.cloudfunctions.net/query1', {
      headers:{
        "Accept":"*/*"
      },
      params:{
        searchTermOne:this.state.input
      }
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
    <h1 style={mainTitle}>Find Clinical Trials</h1>
        <div style={mainDiv}>
          <TextField value={this.state.input} id="outlined-basic" label="Outlined" variant="outlined" onChange={e => this.setState({ input: e.target.value })}/>
          <Button
            variant="contained"
            color="primary"
            onClick={this.getData.bind(this)}
            endIcon={<Icon>search</Icon>}
          >
            Search
          </Button>
          {this.state.results}
        </div>
    </div>
  )}
}

export default clinicalSearch