import AppLayout from '../components/layout/AppLayout'
import TokenForm from '../components/misc/TokenForm'
import { FC } from 'react'

const Settings: FC = () => {
  console.log('render settings')
  return (
    <AppLayout>
      <h1>Settings</h1>
      <TokenForm />
    </AppLayout>
  )
}

export default Settings
