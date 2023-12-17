import { Switch, Route } from 'react-router-dom';
import Auth from 'components/Auth/Auth';
import Main from 'components/Main/Main';

export default function App() {
  return (
    <div className='container'>
      <Switch>
        <Route exact path='/'>
          <Auth />
        </Route>
        <Route exact path='/chat'>
          <Main />
        </Route>
      </Switch>
    </div>
  );
}
