import { useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Messages from 'components/Chat/Messages/Messages';
import './Chat.css';

export default function Chat() {
  const [message, setMessage] = useState('');
  const socket = io.connect('http://localhost:5000');
  const [messages, setMessages] = useState([]);
  const [params, setParams] = useState(null);
  const [users, setUsers] = useState(0);
  const { search } = useLocation();
  const { push } = useHistory();

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on('roomUsersAction', ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  function leftRoom() {
    socket.emit('leftRoom', { params });
    push('/');
  }

  function handleSubmit(e) {
    e.preventDefault();

    socket.emit('sendMessage', { message, params });

    setMessage('');
  }

  function handleChange({ target: { value } }) {
    setMessage(value);
  }

  return (
    <div className='chat-page'>
      <div className='header'>
        <span className='chat-name'>{params?.room}</span>
        <p className='users-count'>{users} users in room</p>
        <button className='left-chat-btn' onClick={leftRoom}>
          Left
        </button>
      </div>
      <div className='chat'>
        <Messages messages={messages} username={params?.name} />
      </div>
      <form className='input-message' onSubmit={handleSubmit}>
        <input type='text' name='message' value={message} placeholder='Message...' onChange={handleChange} autoComplete='off' />
        <button className='send-btn' type='submit' disabled={message.length === 0}>
          Send
        </button>
      </form>
    </div>
  );
}
