import { useEffect, useState } from 'react';
import './Members.css';

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

  // eslint-disable-next-line
  const handleMouseMove = (e) => {
    const finalWidth = window.innerWidth - e.clientX;
    const finalWidthRem = finalWidth / remInPixels;

    if (finalWidthRem >= MIN_WIDTH_REM && finalWidthRem <= MAX_WIDTH_REM) {
      setMembersListWidth(finalWidth);
    }
  };

  // eslint-disable-next-line
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
    <section className='info-section'>
      <span className='members-count'>{members.length > 1 ? `${members.length} members` : '1 member'}</span>
      <ul className='members-list' style={{ minWidth: `${membersListWidth}px` }}>
        {members.length > 0 &&
          members.map((u, i) => (
            <li className='member' key={i}>
              <div className='avatar' style={{ background: u.avatarColor }}>
                {u.name.slice(0, 1)}
                <div className={`online-status ${u.online ? 'online' : 'offline'}`} />
              </div>
              <span>{u.name}</span>
            </li>
          ))}{' '}
        <div className='resizer' onMouseDown={handleMouseDown} />
      </ul>
    </section>
  );
}
