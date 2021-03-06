import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: [],
        currentMessages: [],
        newMessage: ''
      };

      this.updateCurrentMessages = this.updateCurrentMessages.bind(this);
      this.createMessage = this.createMessage.bind(this);
      this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({messages: this.state.messages.concat( message )});
      });
    }

    createMessage(e) {
      e.preventDefault();
      if(this.props.activeRoom === undefined || this.props.activeUser === null) {
        this.setState({ newMessage: '' });
      } else {
      this.messagesRef.push({
        username: this.props.activeUser.displayName,
        roomID: this.props.activeRoom.key,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        content: this.state.newMessage
       });
     }
      this.setState({ newMessage: '' });
    }

    updateCurrentMessages(e) {
      const newMessage = e.target.value;
      this.setState({ newMessage: newMessage });
    }

    setTime(time) {
      const format = new Date(time);
      const newTime = String(format);
      return newTime;
    }

    render() {
      return (
          <section className='message-list'>
            <h2>{this.props.activeRoom.name}</h2>

            <div className='new-message'>
            {this.state.messages
              .filter(message => message.roomID === this.props.activeRoom.key)
              .map((currentMessages, index) =>
              <div key={index}>
                <h3 className='username'>{currentMessages.username}</h3>
                <span className='sentAt'>{this.setTime(currentMessages.sentAt)}</span>
                <p className='content'>{currentMessages.content}</p>
              </div>
            )}
            </div>

          <div className='message-form'>
            <form onSubmit={this.createMessage}>
              <input className='message-content' type='text' placeholder='Write your message here...' value={this.state.newMessage} onChange={this.updateCurrentMessages} />
              <input className='send-button' type='submit' value='Send'/>
            </form>
          </div>
        </section>
      );
    }

}
export default MessageList;
