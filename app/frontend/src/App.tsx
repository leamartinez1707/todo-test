import { AuthProvider } from "./Context/AuthContext"
import { TaskProvider } from "./Context/TaskContext"
import Router from "./Routes/Router"


function App() {
  return (
    <>
      <AuthProvider>
        <TaskProvider>
          <Router />
        </TaskProvider>
      </AuthProvider>
    </>
  )
}

export default App
