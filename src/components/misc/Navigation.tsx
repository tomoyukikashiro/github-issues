import React, { FC } from 'react'
import { FirebaseConsumer } from './Firebase'
import { Link } from 'react-router-dom'
import { WorkSpaceConsumer } from './WorkSpace'
import { WorkSpacesData } from '../../lib/workSpaceData'

const Navigation: FC = () => {
  return (
    <>
      <h2>Navigation</h2>
      <FirebaseConsumer>
        {({ user, logIn, logOut }) => (
          <>
            {!!user ? (
              <button onClick={logOut}>LogOut</button>
            ) : (
              <button onClick={logIn}>LogIn</button>
            )}
            {!!user && <p>{user?.displayName}</p>}
          </>
        )}
      </FirebaseConsumer>
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
              </React.Fragment>
            ))
          }
        </WorkSpaceConsumer>
      </ul>
    </>
  )
}

export default Navigation
