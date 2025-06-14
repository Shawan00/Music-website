import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from './components/theme/theme-provider'
import ClickSpark from './components/ui/ClickSpark'
import { TooltipProvider } from './components/ui/tooltip'
import { AllRoutes } from './routes'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='light' storageKey="vite-ui-theme">
        <ClickSpark
          sparkColor='oklch(0.85 0.19 148.82)'
          sparkSize={12}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <TooltipProvider>
            <ToastContainer />
            <AllRoutes />
          </TooltipProvider>
        </ClickSpark>

      </ThemeProvider>
    </>
  )
}

export default App
