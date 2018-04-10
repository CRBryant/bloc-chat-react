import React, { Component } from 'react';

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
    /*
    this.roomsRef.on('child_removed', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.filter(value) {
        return value.key !== room.key;
      }) });
    });
    */
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
        <h2>Choose a room:</h2>
        <div className='room-form'>
          <form onSubmit={this.createRoom}>
            <input type='text' placeholder='Create a new room...' onChange={this.updateRoomName} />
            <input type='submit' value='Create Room!'/>
          </form>
        </div>

        <div className='roomlist'>
          <ul>
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
