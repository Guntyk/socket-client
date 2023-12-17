import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import './Auth.css';

export default function Auth() {
  const [values, setValues] = useState({ username: '', room: 'One' });
  const { push } = useHistory();

  function handleChange({ target: { value, name } }) {
    setValues((state) => ({ ...state, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    push(`/chat?name=${values?.username}&room=${values?.room}`);
  }

  return (
    <div className='wrapper'>
      <form className='sign-in-form' onSubmit={handleSubmit}>
        <h1 className='title'>Join</h1>
        <div className='inputs-wrapper'>
          <input type='text' name='username' value={values?.username} placeholder='Username' onChange={handleChange} autoComplete='off' />
          <input type='text' name='room' value={values?.room} placeholder='Room' onChange={handleChange} autoComplete='off' />
        </div>
        <button className='btn sign-btn' type='submit' disabled={Object.values(values).some((value) => !value)}>
          Sign In
        </button>
      </form>
    </div>
  );
}
