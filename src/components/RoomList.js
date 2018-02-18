import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      roomName: '',
    };
    this.setRoomName = this.setRoomName.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(event) {
    event.preventDefault();
    this.roomsRef.push({
      name: this.state.roomName
    });
    this.setState({ roomName: '' });
  }

  setRoomName(e) {
    const newRoomName = e.target.value;
    this.setState({roomName: newRoomName});
  }

  render() {
    return (
      <div id='rooms'>
        <form onSubmit={this.createRoom}>
          <input type='text' onChange={this.setRoomName} />
          <input type='submit' value='Create Room!'/>
        </form>
        <ul className='roomsList'>
          {this.state.rooms.map( (room, index) =>
              <li key={index}>{room.name}</li>
            )}
        </ul>
      </div>
    );
  }
}

export default RoomList;
