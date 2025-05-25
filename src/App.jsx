import { useState } from 'react';
import './App.css';
import FamilyTree from './components/familyTreeComponent/FamilyTree';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSettings } from 'react-icons/fi';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ display: "flex", gap: 40 }}>
        <FamilyTree chartId="FamilyChart1" />
        <FamilyTree chartId="FamilyChart2" />
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
