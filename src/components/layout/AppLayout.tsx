import { FC } from 'react'
import Header from '../misc/Header'
import Navigation from '../misc/Navigation'

const AppLayout: FC = ({ children }) => (
  <>
    <Header />
    <Navigation />
    {children}
  </>
)

export default AppLayout
