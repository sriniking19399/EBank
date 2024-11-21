import {Switch, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <NotFound />
  </Switch>
)

export default App
