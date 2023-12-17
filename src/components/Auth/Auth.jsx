import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import './Auth.css';

export default function Auth() {
  const [values, setValues] = useState({ username: '', room: '' });
  const [error, setError] = useState(false);
  const { push } = useHistory();

  function handleChange({ target: { value, name } }) {
    setValues((state) => ({ ...state, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    if (Object.values(values).some((value) => !value)) {
      setError(true);
    } else {
      push(`/chat?name=${values?.username}&room=${values?.room}`);
    }
  }

  return (
    <div className='wrapper'>
      <form className='sign-in-form' onSubmit={handleSubmit}>
        <h1 className='title'>Join</h1>
        <input type='text' name='username' value={values?.username} placeholder='Username' onChange={handleChange} autoComplete='off' />
        <input type='text' name='room' value={values?.room} placeholder='Room' onChange={handleChange} autoComplete='off' />
        {error && <div className='error'>Fill in all field</div>}
        <button className='btn' type='submit'>
          Sign In
        </button>
      </form>
    </div>
  );
}
