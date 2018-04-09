import React, { Component } from 'react';
import './user.css';

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
      <section className="sign-in-out">
        <p className="current-user">Current User: {this.props.activeUser === null ? 'Guest' : this.props.activeUser.displayName}</p>
        <button className="sign-in" onClick={ () => this.signIn() }>Sign In</button>
        <button className="sign-out" onClick={ () => this.signOut() }>Sign Out</button>
      </section>
    )
  }
}

export default User;
