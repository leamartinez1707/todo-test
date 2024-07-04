import { AuthProvider } from "./Context/AuthContext"
import { TaskProvider } from "./Context/TaskContext"
import Router from "./Routes/Router"


function App() {
  return (
    <div className="bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <AuthProvider>
        <TaskProvider>
          <Router />
        </TaskProvider>
      </AuthProvider>
    </div>
  )
}

export default App
