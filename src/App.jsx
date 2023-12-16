import { Switch, Route } from 'react-router-dom';
import Chat from 'components/Chat/Chat';
import Main from 'components/Main';

export default function App() {
  return (
    <div className='container'>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/chat'>
          <Chat />
        </Route>
      </Switch>
    </div>
  );
}
