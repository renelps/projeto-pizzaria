import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalStyle } from './styles/GlobalStyle.ts'
import { ThemeProvider  } from 'styled-components'
import App from './App.tsx'
import { theme } from './styles/theme.ts'
import PizzasProvider from './context/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <PizzasProvider>
        <GlobalStyle />
        <App />
      </PizzasProvider>
    </ThemeProvider>
  </StrictMode>,
)
