import React, { Component } from 'react';
import { BrowserRouter , Switch , Route} from 'react-router-dom';

import Login from './pages/Login';
import SingUp from './pages/SingUp';
import Timeline from './pages/Timeline';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/timeline" component={Timeline}/>
          <Route path="/singup" component={SingUp}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
