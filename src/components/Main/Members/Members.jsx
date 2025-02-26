import { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Members.scss';

export default function Members({ members }) {
  const [membersListWidth, setMembersListWidth] = useState(250);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const MIN_WIDTH_REM = 15;
  const MAX_WIDTH_REM = 50;
  const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);

  const handleMouseDown = () => {
    setIsMouseDown(true);
    document.body.style.cursor = 'ew-resize';
  };

  const handleMouseMove = (e) => {
    const finalWidth = window.innerWidth - e.clientX;
    const finalWidthRem = finalWidth / remInPixels;

    if (finalWidthRem >= MIN_WIDTH_REM && finalWidthRem <= MAX_WIDTH_REM) {
      setMembersListWidth(finalWidth);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    document.body.style.cursor = 'default';
  };

  useEffect(() => {
    if (isMouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <section className={styles.infoSection}>
      <span className={styles.membersCount}>{members?.length > 1 ? `${members?.length} members` : '1 member'}</span>
      <ul className={styles.membersList} style={{ minWidth: `${membersListWidth}px` }}>
        {members?.length > 0 &&
          members.map((u, i) => (
            <li className={styles.member} key={i}>
              <div className={styles.avatar} style={{ background: u.avatarColor }}>
                {u.name.slice(0, 1)}
                <div className={cn(styles.onlineStatus, { [styles.online]: u.online })} />
              </div>
              <span>{u.name}</span>
            </li>
          ))}{' '}
        <div className={styles.resizer} onMouseDown={handleMouseDown} />
      </ul>
    </section>
  );
}
