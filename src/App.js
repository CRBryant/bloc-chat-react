import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBDmhhCVa3JgtJP8XbzYZW6En821xp7jWg",
    authDomain: "bloc-chat-7932a.firebaseapp.com",
    databaseURL: "https://bloc-chat-7932a.firebaseio.com",
    projectId: "bloc-chat-7932a",
    storageBucket: "bloc-chat-7932a.appspot.com",
    messagingSenderId: "558751687648"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      activeUser: ''
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room });
    console.log(room);
  }

  setUser(user) {
    this.setState({ activeUser: user });
    console.log(user.displayName);
  }

  render() {
    return (
      <section className="App">
        <h1 className='App-name'>Bloc Chat</h1>

        <RoomList
          firebase={firebase}
          setActiveRoom={this.setActiveRoom}
          activeRoom={this.state.activeRoom} />

        <MessageList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          activeUser={this.state.activeUser} />

        <User
          firebase={firebase}
          setUser={this.setUser}
          activeUser={this.state.activeUser} />
      </section>
    );
  }
}

export default App;
