import React, { Component } from 'react';
import './roomList.css';

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
      <section className='rooms'>
        <h2>{this.props.activeRoom.name || 'Choose Room'}</h2>
        <div>
          <ul className='rooms-list'>
            {this.state.rooms.map( (room, index) => {
              return <li key={index} onClick={() => this.props.setActiveRoom(room)}>{room.name}</li>
            })}
          </ul>
        </div>
        <form onSubmit={this.createRoom}>
          <input type='text' id='newRoom' onChange={this.updateRoomName} />
          <input type='submit' value='Create Room!'/>
        </form>
    </section>
    );
  }
}

export default RoomList;
