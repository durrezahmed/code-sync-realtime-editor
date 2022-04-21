import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
  };

  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img
          className='homePageLogo'
          src='/code-sync.png'
          alt='code-sync-logo'
        />
        <h4 className='mainLabel'>Paste invitation ROOM ID</h4>
        <div className='inputGroup'>
          <input
            type='text'
            className='inputBox'
            placeholder='ROOM ID'
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
          />

          <input
            type='text'
            className='inputBox'
            placeholder='USER NAME'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <button className='btn joinBtn'>Join</button>

          <span className='createInfo'>
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href='' className='createNewBtn'>
              new room
            </a>
          </span>
        </div>
      </div>

      <footer>
        <h4>
          Built with 💛 by &nbsp;
          <a href='https://github.com/durrezahmed'>Durrez Ahmed</a>
        </h4>
      </footer>
    </div>
  );
}