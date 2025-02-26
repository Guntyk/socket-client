import { Switch, Route } from 'react-router-dom';
import { Auth } from 'pages/Auth';
import { Main } from 'pages/Main';

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
