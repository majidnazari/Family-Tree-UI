import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FamilyTree from './components/FamilyTree'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Family Tree</h1>
      <FamilyTree personId="103" />
    </>
  )
}

export default App
