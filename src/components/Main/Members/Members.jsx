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

  const handleMouseMove = (e) => {
    const finalWidth = window.innerWidth - e.clientX;
    const finalWidthRem = finalWidth / remInPixels;

    // Constraining the width between MIN_WIDTH_REM and MAX_WIDTH_REM
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
    <section className='info-section'>
      <span className='members-count'>{members.length > 1 ? `${members.length} members` : '1 member'}</span>
      <ul className='members-list' style={{ minWidth: `${membersListWidth}px` }}>
        {members.length > 0 && members.map((u, i) => <li key={i}>{u.name}</li>)} <div className='resizer' onMouseDown={handleMouseDown} />
      </ul>
    </section>
  );
}