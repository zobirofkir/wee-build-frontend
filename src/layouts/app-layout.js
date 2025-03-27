import React from 'react'
import HeaderComponent from '../component/header-component'

const AppLayout = ({children}) => {
  return (
    <main>

      <header>
        <HeaderComponent />
      </header>

      {children}
    </main>
  )
}

export default AppLayout