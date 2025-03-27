import React from 'react'
import HeaderComponent from '../component/header-component'
import FooterComponent from '../component/footer-component'
import { ThemeProvider } from '../context/theme-context'

const AppLayout = ({children}) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <header>
          <HeaderComponent />
        </header>

        <main className="flex-grow pt-16">
          {children}
        </main>

        <footer>
          <FooterComponent />
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default AppLayout