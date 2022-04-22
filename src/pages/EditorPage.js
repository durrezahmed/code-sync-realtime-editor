import { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from '../Actions';
import Client from './../components/Client';
import Editor from './../components/Editor';
import { initSocket } from './../socket';
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from 'react-router-dom';

export default function EditorPage() {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('ROOM ID has been copied to your clipboard.');
    } catch (err) {
      toast.error('Could not copy the ROOM ID.');
      console.log(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
      }

      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED).disconnect();
      socketRef.current.off(ACTIONS.DISCONNECTED).disconnect();
    };
  }, []);

  if (!location.state) {
    return <Navigate to='/' />;
  }

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

        <button className='btn copyBtn' onClick={copyRoomId}>
          Copy ROOM ID
        </button>
        <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className='editorWrap'>
        <Editor socketRef={socketRef} roomId={roomId} />
      </div>
    </div>
  );
}
