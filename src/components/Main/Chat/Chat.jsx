import { useState, useEffect, useRef } from 'react';
import Messages from 'components/Main/Chat/Messages/Messages';
import './Chat.css';

export default function Chat({ socket, messages, params, push }) {
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
    <div className='chat-page'>
      <div className='header'>
        <span className='chat-name'>{params?.room}</span>
        <button className='left-chat-btn' onClick={leftRoom}>
          Leave the room
        </button>
      </div>
      <div className='chat'>
        <Messages messages={messages} username={params?.name} />
        <div ref={messagesEndRef} />
      </div>
      <form className='input-message' onSubmit={handleSubmit}>
        <input
          type='text'
          name='message'
          value={message}
          placeholder='Message...'
          onChange={handleChange}
          autoComplete='off'
        />
        <button className='send-btn' type='submit' disabled={message?.length === 0}>
          Send
        </button>
      </form>
    </div>
  );
}
