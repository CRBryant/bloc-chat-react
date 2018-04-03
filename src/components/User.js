import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }



  render() {

    return (
      <div>
        <button className="user-button" onClick={ () => this.signIn() }>Sign In</button>
        <button className="user-button" onClick={ () => this.signOut() }>Sign Out</button>
        <p>Current User: {this.props.activeUser === null ? 'Guest' : this.props.activeUser.displayName}</p>
      </div>
    )
  }
}

export default User;
