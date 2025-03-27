import React from 'react'
import HeaderComponent from '../component/header-component'
import FooterComponent from '../component/footer-component'

const AppLayout = ({children}) => {
  return (
    <main>

      <header>
        <HeaderComponent />
      </header>

       <body>
        {children}
       </body>

      <footer>
        <FooterComponent />
      </footer>

    </main>
  )
}

export default AppLayout