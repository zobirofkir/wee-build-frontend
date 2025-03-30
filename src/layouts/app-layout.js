import React from 'react'
import HeaderComponent from '../components/header-component'
import FooterComponent from '../components/footer-component'
import { ThemeProvider } from '../contexts/theme-context'

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