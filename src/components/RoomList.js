import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      roomName: '',
    };
    this.updateRoomName = this.updateRoomName.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  createRoom(e) {
    this.roomsRef.push({ name: this.state.roomName });
    this.setState({ roomName: '' });
  }

  updateRoomName(e) {
    const newRoomName = e.target.value;
    this.setState({roomName: newRoomName});
  }

  render() {
    return (
      <div className='rooms'>
      <h1 id='app-name'>Bloc Chat</h1>
        <div className='rooms-form'>
          <form onSubmit={this.createRoom}>
            <input type='text' id='newRoom' onChange={this.updateRoomName} />
            <input type='submit' value='Create Room!'/>
          </form>
        </div>
        <div>
          <ul className='rooms-list'>
            {this.state.rooms.map( (room, index) => {
              return <li key={index} onClick={() => this.props.setActiveRoom(room)}>{room.name}</li>
            })}
          </ul>
        </div>
    </div>
    );
  }
}

export default RoomList;
