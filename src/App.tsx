import { AuthProvider, BuildStepProvider } from "./Context"
import Router from "./routes/Router"

function App() {
  return (
    <BuildStepProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BuildStepProvider>
  )
}

export default App
