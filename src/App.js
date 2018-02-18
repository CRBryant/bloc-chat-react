import React, { Component } from 'react';
import RoomList from './components/RoomList';
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
  render() {
    return (
      <div className="App">
        <RoomList
          firebase={firebase} />
      </div>
    );
  }
}

export default App;
