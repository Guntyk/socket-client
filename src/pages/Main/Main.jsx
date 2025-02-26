import { useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getRandomArrayElement } from 'helpers/getRandomArrayElement';
import { avatarColors } from 'constants/avatarColors';
import { Members } from 'pages/Main/Members';
import { Chat } from 'pages/Main/Chat';
import styles from './Main.scss';

export const Main = () => {
  const socket = io.connect('http://62.80.165.251');
  const [messages, setMessages] = useState([]);
  const [params, setParams] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const { search } = useLocation();
  const { push } = useHistory();

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      setUser((user) => ({ ...user, online: false }));
    } else if (document.visibilityState === 'visible') {
      setUser((user) => ({ ...user, online: true }));
    }
  });

  window.addEventListener('beforeunload', () => {
    socket.emit('leftRoom', { user });
  });

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    const user = { ...searchParams, online: true, avatarColor: getRandomArrayElement(avatarColors) };

    setParams(searchParams);
    setUser(user);
    socket.emit('join', user);
  }, [search]);

  useEffect(() => {
    socket.emit('updateUserStatus', { user });
  }, [user]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on('roomUsersAction', ({ data: { users } }) => {
      setUsers(users);
    });

    socket.on('messageHistory', (messageHistory) => {
      setMessages(messageHistory);
    });
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className={styles.main}>
      <Chat socket={socket} messages={messages} params={params} membersCount={users?.length} push={push} />
      <Members members={users} />
    </div>
  );
};
