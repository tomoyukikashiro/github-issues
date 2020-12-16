import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Index from './pages/workSpace/Index'
import Settings from './pages/Settings'
import WorkSpaceDetail from './pages/workSpace/Detail'
import WorkSpaceUpdate from './pages/workSpace/Update'
import { FirebaseProvider } from './components/misc/Firebase'
import { WorkSpaceProvider } from './components/misc/WorkSpace'
import WorkSpaceCreate from './pages/workSpace/Create'
import Auth from './components/misc/Auth'
import Home from './pages/Home'

const App: FC = () => {
  return (
    <>
      <FirebaseProvider>
        <WorkSpaceProvider>
          <Router>
            <h1>App</h1>
            <Link to="/workspace">/workspace</Link>
            <Switch>
              <Route exact path="/" component={Home} />
              <Auth>
                <Switch>
                  <Route exact path="/workspace" component={Index} />
                  <Route exact path="/settings" component={Settings} />
                  <Route
                    exact
                    path="/workspace/create"
                    component={WorkSpaceCreate}
                  />
                  <Route
                    exact
                    path="/workspace/:id"
                    component={WorkSpaceDetail}
                  />
                  <Route
                    exact
                    path="/workspace/:id/update"
                    component={WorkSpaceUpdate}
                  />
                </Switch>
              </Auth>
            </Switch>
          </Router>
        </WorkSpaceProvider>
      </FirebaseProvider>
    </>
  )
}

export default App
