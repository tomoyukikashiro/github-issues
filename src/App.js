import React, {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import {auth, db} from './lib/firebase'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home';
import Login from './pages/Login'
import Settings from './pages/Settings';

const App = () => {
  const [authUser, setAuthUser] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    console.log(' auth user effect ')
    const listener = auth.onAuthStateChanged(setAuthUser)
    return () => {
      listener();
    };
  }, [authUser?.id])

  useEffect(() => {
    console.log(' user effect ')

    if (!authUser) return
    db.collection('users').doc(authUser.uid)
      .get().then(doc => doc.exists && setUser(doc.data()))
  }, [authUser?.uid, user?.token])

  return (
    <Router>
      <Layout authUser={authUser}>
        <Switch>
          <Route exact path="/login/">
            <Login user={user}/>
          </Route>
          <PrivateRoute exact user={user} path="/" component={Home} />
          <PrivateRoute exact user={user} path="/settings" component={() => <Settings user={user} setUser={setUser} />} />
          {/*<PrivateRoute exact path="/workspace/:workSpaceId/" component={WorkSpace} />*/}
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
