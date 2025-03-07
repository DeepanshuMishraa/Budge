

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import '@fontsource/poppins/400.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { ThemeProvider } from './components/theme-provider'

// Create a new router instance
const router = createRouter({ routeTree })
const queryClient = new QueryClient()

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="dark" storageKey="vite-ui-theme"
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
