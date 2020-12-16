import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Index from './pages/Index'
import Settings from './pages/Settings'
import WorkSpaceIndex from './pages/workSpace/Index'
import WorkSpaceDetail from './pages/workSpace/Detail'
import WorkSpaceUpdate from './pages/workSpace/Update'
import { FirebaseProvider, FirebaseConsumer } from './components/misc/Firebase'
import {
  WorkSpaceProvider,
  WorkSpaceConsumer,
} from './components/misc/WorkSpace'
import WorkSpaceCreate from './pages/workSpace/Create'
import { WorkSpacesData } from './lib/workSpaceData'

const App: FC = () => {
  return (
    <>
      <FirebaseProvider>
        <WorkSpaceProvider>
          <Router>
            <h1>App</h1>
            <ul>
              <FirebaseConsumer>
                {({ isLogIn, user, logIn, logOut }) => (
                  <>
                    {isLogIn ? (
                      <button onClick={logOut}>LogOut</button>
                    ) : (
                      <button onClick={logIn}>LogIn</button>
                    )}
                    {isLogIn && <p>{user?.displayName}</p>}
                  </>
                )}
              </FirebaseConsumer>
            </ul>
            <ul>
              <li>
                <Link to="/">/</Link>
              </li>
              <li>
                <Link to="/settings">/settings</Link>
              </li>
              <li>
                <Link to="/workspace">/workspace</Link>
              </li>
              <li>
                <Link to="/workspace/create">/workspace/create</Link>
              </li>
              <WorkSpaceConsumer>
                {(workSpaceState) =>
                  workSpaceState &&
                  (workSpaceState as WorkSpacesData).map((workSpace) => (
                    <React.Fragment key={workSpace.id}>
                      <li>
                        <Link to={`/workspace/${workSpace.id}`}>
                          /workspace/
                          {workSpace.id}
                        </Link>
                      </li>
                      <li>
                        <Link to={`/workspace/${workSpace.id}/update`}>
                          /workspace/
                          {workSpace.id}
                          /update
                        </Link>
                      </li>
                    </React.Fragment>
                  ))
                }
              </WorkSpaceConsumer>
            </ul>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/workspace" component={WorkSpaceIndex} />
              <Route
                exact
                path="/workspace/create"
                component={WorkSpaceCreate}
              />
              <Route exact path="/workspace/:id" component={WorkSpaceDetail} />
              <Route
                exact
                path="/workspace/:id/update"
                component={WorkSpaceUpdate}
              />
            </Switch>
          </Router>
        </WorkSpaceProvider>
      </FirebaseProvider>
    </>
  )
}

export default App
