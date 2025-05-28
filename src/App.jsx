// App.jsx
import { useState } from 'react';
import './App.css';
import FamilyTree from './components/familyTreeComponent/FamilyTree';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dummy service for now – replace with your actual API call
const mergePersonService = async (sender_ids, receiver_ids) => {
  console.log("Merging", sender_ids, receiver_ids);
  // Simulate delay
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

function App() {
  const [mergePairs, setMergePairs] = useState([]);
  const [currentSender, setCurrentSender] = useState(null);

  const handleNodeSelect = (id, source) => {
    if (source === 'left') {
      setCurrentSender(id);
      toast.info(`Sender selected: ${id}`);
    } else if (source === 'right') {
      if (!currentSender) {
        toast.warning("Select a sender first.");
        return;
      }

      const pairExists = mergePairs.some(
        pair => pair.sender === currentSender && pair.receiver === id
      );
      if (pairExists) {
        toast.warning("This pair already exists.");
        return;
      }

      setMergePairs(prev => [...prev, { sender: currentSender, receiver: id }]);
      toast.success(`Pair added: ${currentSender} → ${id}`);
      setCurrentSender(null);
    }
  };

  const removePair = (index) => {
    setMergePairs(prev => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (mergePairs.length === 0) {
      toast.error("No pairs to merge.");
      return;
    }

    const sender_ids = mergePairs.map(p => p.sender);
    const receiver_ids = mergePairs.map(p => p.receiver);

    try {
      await mergePersonService(sender_ids, receiver_ids);
      toast.success("Merge successful!");
      setMergePairs([]);
    } catch (err) {
      toast.error("Merge failed.");
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
        {/* Left Tree (Sender) */}
        <FamilyTree chartId="FamilyChart1" onSelect={(id) => handleNodeSelect(id, 'left')} />

        {/* Middle Panel */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h3 style={{ textAlign: "center" }}>Merge Pairs</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Sender ID</th>
                <th>Receiver ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mergePairs.length > 0 ? mergePairs.map((pair, index) => (
                <tr key={index}>
                  <td>{pair.sender}</td>
                  <td>{pair.receiver}</td>
                  <td>
                    <button onClick={() => removePair(index)}>❌ Remove</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center' }}>No pairs selected</td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            onClick={handleMerge}
            style={{ marginTop: 10, padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
          >
            🔄 Merge Persons
          </button>
        </div>

        {/* Right Tree (Receiver) */}
        <FamilyTree chartId="FamilyChart2" onSelect={(id) => handleNodeSelect(id, 'right')} />
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
