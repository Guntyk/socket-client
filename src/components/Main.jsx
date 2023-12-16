import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export default function Main() {
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
      <h1>Join</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' name='username' value={values?.username} placeholder='Username' onChange={handleChange} autoComplete='off' />
        </div>
        <div>
          <input type='text' name='room' value={values?.room} placeholder='Room' onChange={handleChange} autoComplete='off' />
        </div>
        {error && <div className='error'>Fill in all field</div>}
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
}
