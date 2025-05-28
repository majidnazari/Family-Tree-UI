import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/dashboardComponent/Dashboard';

function App() {
  return (
    <>
      <Dashboard />
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
