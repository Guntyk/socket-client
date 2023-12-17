import { useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Members from 'components/Main/Members/Members';
import Chat from 'components/Main/Chat/Chat';
import './Main.css';

export default function Main() {
  const socket = io.connect('https://online-chat-wrhs.onrender.com');
  const [messages, setMessages] = useState([]);
  const [params, setParams] = useState(null);
  const [users, setUsers] = useState([]);
  const { search } = useLocation();
  const { push } = useHistory();

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on('roomUsersAction', ({ data: { users } }) => {
      setUsers(users);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className='main'>
      <Chat socket={socket} messages={messages} params={params} membersCount={users.length} push={push} />
      <Members members={users} />
    </div>
  );
}
