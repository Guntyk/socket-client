import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import styles from './Chat.scss';

export const Chat = ({ socket, messages, params, push }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    <div className={styles.chatPage}>
      <div className={styles.header}>
        <span className={styles.chatName}>{params?.room}</span>
        <button className={styles.leftChatBtn} onClick={leftRoom}>
          Leave the room
        </button>
      </div>
      <div className={styles.chat}>
        {messages.length > 0 &&
          messages.map(({ user, message }, i) =>
            params?.name.trim().toLowerCase() === user.name.trim().toLowerCase() ? (
              <div className={cn(styles.message, styles.me)} key={i}>
                <p>{message}</p>
              </div>
            ) : (
              <div className={cn(styles.message, { [styles.notification]: user.name === 'Admin' })} key={i}>
                {user.name !== 'Admin' && <span className={styles.author}>{user.name}</span>}
                <p>{message}</p>
              </div>
            )
          )}
        <div ref={messagesEndRef} />
      </div>
      <form className={styles.inputMessage} onSubmit={handleSubmit}>
        <input
          type='text'
          name='message'
          value={message}
          placeholder='Message...'
          onChange={handleChange}
          autoComplete='off'
        />
        <button className={styles.sendBtn} type='submit' disabled={message?.length === 0}>
          Send
        </button>
      </form>
    </div>
  );
};
