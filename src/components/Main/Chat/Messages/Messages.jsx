import cn from 'classnames';
import styles from './Messages.scss';

export default function Message({ messages, username }) {
  return (
    <>
      {messages.length > 0 &&
        messages.map(({ user, message }, i) =>
          username.trim().toLowerCase() === user.name.trim().toLowerCase() ? (
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
    </>
  );
}
