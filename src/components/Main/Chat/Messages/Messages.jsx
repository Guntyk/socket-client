import './Messages.css';

export default function Message({ messages, username }) {
  return (
    <>
      {messages.length > 0 &&
        messages.map(({ user, message }, i) =>
          username.trim().toLowerCase() === user.name.trim().toLowerCase() ? (
            <div className='message me' key={i}>
              <p>{message}</p>
            </div>
          ) : (
            <div className={`message ${user.name === 'Admin' ? 'notification' : ''}`} key={i}>
              {user.name !== 'Admin' && <span className='author'>{user.name}</span>}
              <p>{message}</p>
            </div>
          ),
        )}
    </>
  );
}
