import { useState } from 'react';
import './App.css';
import FamilyTree from './components/familyTreeComponent/FamilyTree';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Family Tree</h1>
      <FamilyTree personId="111" />

      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
