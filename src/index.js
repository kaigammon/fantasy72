import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App'
import Season from './components/season/season'
import Team from './components/team/team'
import Player from './components/player/player'
import League from './components/league/league'
import Fixture from './components/fixture/fixture'
import Country from './components/country/country'
import 'semantic-ui-css/semantic.min.css'

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/seasons/:id" component={Season} />
      <Route path="/teams/:id" component={Team} />
      <Route path="/countries/:id" component={Country} />
      <Route path="/leagues/:id" component={League} />
      <Route path="/fixtures/:id" component={Fixture} />
      <Route path="/players/:tid/:pid" component={Player} />
    </Switch>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))