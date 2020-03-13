import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import MainPage from './pages/MainPage'
import SettingsPage from './pages/SettingsPage'

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/settings">
        <SettingsPage />
      </Route>
    </Switch>
  </HashRouter>
)

export default App