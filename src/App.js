import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import MainPage from './pages/MainPage'

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
    </Switch>
  </HashRouter>
)

export default App