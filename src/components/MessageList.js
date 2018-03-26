import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: [],
        currentMessages: []
      };

      this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({messages: this.state.messages.concat( message )});
      });
    }

    /*componentWillReceiveProps() {
      const nextProps = this.props.activeRoom;
      this.updateCurrentMessages();
    }*/

    updateCurrentMessages(activeRoom) {
      const currentMessage = this.state.messages
      .filter(message => message.roomID === this.props.activeRoom.key);
      this.setState({currentMessages: currentMessage});
    }

    render() {
      return (
        <div className='message-list'>
          <div>
            <h2>{this.props.activeRoom.name}</h2>
          </div>
          {this.state.messages
            .filter(message => message.roomID === this.props.activeRoom.key)
            .map((currentMessages, index) =>
            <div key={index}>
              <h3>{currentMessages.username}</h3>
              <span>{currentMessages.sentAt}</span>
              <p>{currentMessages.content}</p>
            </div>
          )}
        </div>
      );
    }

}

export default MessageList;
