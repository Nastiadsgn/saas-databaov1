import Workspace from './pages/Workspace'

function App() {
  const user = { name: 'Data Steward', avatar: 'DS' }

  return <Workspace user={user} />
}

export default App
