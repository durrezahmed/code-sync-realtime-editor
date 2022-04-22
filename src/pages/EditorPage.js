import { useState } from 'react';
import Client from './../components/Client';
import Editor from './../components/Editor';

export default function EditorPage() {
  const [clients, setClients] = useState([
    { socketId: 1, username: 'Durrez A' },
    { socketId: 2, username: 'John Doe' },
    { socketId: 2, username: 'Jane Doe' },
  ]);

  return (
    // main wrap div
    <div className='mainWrap'>
      {/* aside div */}
      <div className='aside'>
        {/* aside inner div */}
        <div className='asideInner'>
          {/* logo div */}
          <div className='logo'>
            <img className='logoImage' src='/code-sync.png' alt='logo' />
          </div>
          <h3>Connected</h3>
          {/* clients list div */}
          <div className='clientsList'>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>

        <button className='btn copyBtn'>Copy ROOM ID</button>
        <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className='editorWrap'>
        <Editor />
      </div>
    </div>
  );
}
