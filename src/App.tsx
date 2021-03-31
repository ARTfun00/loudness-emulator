import { Layout } from './components'
import { ThemeProvider } from '@qonsoll/react-design'
import Theme from '../src/config/theme'
import './config/root.scss'
import Provider from '../src/context/Provider'
import React from 'react'

const App: React.FC<Record<string, unknown>> = ({}) => {
  return (
    <ThemeProvider theme={Theme}>
      <Provider store={{ points: [] }}>
        <Layout />
      </Provider>
    </ThemeProvider>
  )
}

export default App
