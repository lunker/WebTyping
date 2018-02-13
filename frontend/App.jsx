import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import Discover from './Discover';
import { Form, TextArea, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import openSocket from 'socket.io-client';

// const url='http://bdf3372d.ngrok.io';
const url='http://localhost:3000';

import moment from 'moment';
import Enter from './Enter';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      isStart:false,
      startTime: null,
      endTime: null,
      inputLength: 0,
      enterText:'',
      sample:'',
      isWelcomed:false
    };

    const socket = openSocket(url);

    socket.on('connect', (data) => {
      console.log('on connect');
    });

    socket.on('data', (data) => {
      console.log('on data');
    });
  }// end constructor

  sendMessage() {
    socket.send('data', 'client say!');
  }

  onChange(event, data) {
    console.log('onChange');
    console.log(data);

    if(!this.state.isStart){
      this.setState({startTime: new Date(), isStart: true});
    }
    this.setState({enterText: data.value});
  }

  onKeyPress(event, data) {
    console.log('on keyPress');
    console.log(event.key);

    if(event.key == 'Enter'){
      // end typing
      const time=new Date() - this.state.startTime;
      const speed=Math.floor((this.state.enterText.length) / time * 1000 * 60);

      console.log('총 길이 : ' + this.state.enterText.length);
      console.log('소요시간 : ' + time );
      console.log('타자수 : ' + speed);
    }
  }

  load = () => {
    console.log('load');

    axios({
      url: 'http://localhost:3000/api/sample?roomNo=1',
      method: 'get',
      data: ''
    });
  }

  componentDidMount() {
    this.load();
  }

  render() {

    const isWelcomed=this.state.isWelcomed;

    return (
      <div>
        <Segment>
          {this.state.sample}
        </Segment>

        <Form>
          <TextArea
            placeholder='Tell us more'
            onChange={this.onChange.bind(this)}
            onKeyPress={this.onKeyPress.bind(this)}
          />
      </Form>
      </div>
    );
  }
}// end class

export default App;
