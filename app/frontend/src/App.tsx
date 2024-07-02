import { AuthProvider } from "./Context/AuthContext"
import Router from "./Routes/Router"


function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  )
}

export default App
