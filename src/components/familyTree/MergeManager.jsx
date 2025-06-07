// MergeManager.jsx
import { useRef, useState } from 'react';
import FamilyTree from './FamilyTree';
import { toast } from 'react-toastify';
import useMergePersons from "../../hooks/useMergePersons";

const mergePersonService = async (sender_ids, receiver_ids) => {
    console.log("Merging", sender_ids, receiver_ids);
    return new Promise((resolve) => setTimeout(resolve, 1000));
};

export default function MergeManager() {
    const [mergePairs, setMergePairs] = useState([]);
    const [currentSenderDisplay, setCurrentSenderDisplay] = useState(null);
    const [currentReceiverDisplay, setCurrentReceiverDisplay] = useState(null);
    const { mergePersons } = useMergePersons();

    const currentSenderRef = useRef(null);
    const currentReceiverRef = useRef(null);

    const [leftTreeKey, setLeftTreeKey] = useState(0);
    const [rightTreeKey, setRightTreeKey] = useState(0);

    const resetLeftTree = () => {
        setLeftTreeKey(prev => prev + 1);
        toast.info("Left tree has been reset.");
        currentSenderRef.current = null;
        setCurrentSenderDisplay(null);
    };

    const resetRightTree = () => {
        setRightTreeKey(prev => prev + 1);
        toast.info("Right tree has been reset.");
        currentReceiverRef.current = null;
        setCurrentReceiverDisplay(null);
    };

    const handleNodeSelect = (person, source) => {
        const gender = (person?.gender || person?.data?.gender || "").toLowerCase();

        if (source === "left") {
            currentSenderRef.current = person;
            setCurrentSenderDisplay(person);
            toast.success(`Sender selected: ${person.id}`);
            return;
        }

        if (source === "right") {
            const sender = currentSenderRef.current;

            if (!sender) {
                toast.warning("Select a sender first.");
                return;
            }

            const senderGender = (sender.gender || "").toLowerCase();

            if (senderGender !== gender) {
                toast.error("Sender and receiver must be the same gender.");
                return;
            }

            if (person.id === sender.id) {
                toast.error("Sender and receiver cannot be the same person.");
                return;
            }

            const alreadyAdded = mergePairs.some(
                pair =>
                    (pair.sender === sender.id && pair.receiver === person.id) ||
                    pair.sender === person.id || pair.receiver === person.id ||
                    pair.sender === sender.id || pair.receiver === sender.id
            );

            if (alreadyAdded) {
                toast.warning("This pair already exists.");
                return;
            }

            currentReceiverRef.current = person;
            setCurrentReceiverDisplay(person);

            setMergePairs(prev => [
                ...prev,
                { sender: sender.id, receiver: person.id },
            ]);

            toast.success(`Pair added: ${sender.id} → ${person.id}`);

            currentSenderRef.current = null;
            currentReceiverRef.current = null;
            setCurrentSenderDisplay(null);
            setCurrentReceiverDisplay(null);
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
            await mergePersons(sender_ids, receiver_ids);
           // await mergePersonService(sender_ids, receiver_ids);
            toast.success("Merge successful!");
            setMergePairs([]);
        } catch (err) {
            toast.error("Merge failed.");
        }
    };

    return (
        <div style={{ display: "flex", width: "100%", gap: 40, padding: "20px" }}>
            {/* Left Tree */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <FamilyTree key={leftTreeKey} chartId="FamilyChart1" onSelect={(person) => handleNodeSelect(person, 'left')} />
                <button onClick={resetLeftTree} style={{ marginTop: 10 }}>🔄 Reset Left Tree</button>
            </div>

            {/* Middle Panel */}
            <div
                style={{
                    flex: "0 1 15vw",
                    maxWidth: "18vw",
                    minWidth: "14vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "1em",
                }}
            >
                <h3 style={{ textAlign: "center", color: "#333", fontSize: "1em", marginBottom: "0.5em" }}>
                    Merge Pairs
                </h3>

                {currentSenderDisplay && (
                    <p style={{ textAlign: "center", color: "blue", fontSize: "0.75em" }}>
                        ✅ Sender: {currentSenderDisplay.id}
                    </p>
                )}

                {currentReceiverDisplay && (
                    <p style={{ textAlign: "center", color: "green", fontSize: "0.75em" }}>
                        ✅ Receiver: {currentReceiverDisplay.id}
                    </p>
                )}

                <div style={{ overflowX: "auto" }}>
                    <table
                        style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            fontSize: "0.75em",
                            minWidth: "12vw",
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#282828", color: "#fff" }}>

                                <th style={{ border: "1px solid #ccc", padding: "0.4em", fontWeight: "bold" }}>Sender</th>
                                <th style={{ border: "1px solid #ccc", padding: "0.4em", fontWeight: "bold" }}>Reciever</th>
                                <th style={{ border: "1px solid #ccc", width: "2em", textAlign: "center" }}>❌</th>

                            </tr>
                        </thead>
                        <tbody>
                            {mergePairs.length > 0 ? (
                                mergePairs.map((pair, index) => (
                                    <tr key={index}>
                                        <td style={{
                                            border: "1px solid #999",
                                            padding: "0.5em",
                                            fontWeight: "bold",
                                            fontSize: "0.85em",
                                            color: "#fff",
                                            textAlign: "center"
                                        }}>
                                            {pair.sender}
                                        </td>
                                        <td style={{
                                            border: "1px solid #999",
                                            padding: "0.5em",
                                            fontWeight: "bold",
                                            fontSize: "0.85em",
                                            color: "#fff",
                                            textAlign: "center"
                                        }}>
                                            {pair.receiver}
                                        </td>

                                        <td style={{ border: "1px solid #999", width: "2em", textAlign: "center" }}>

                                            <button
                                                onClick={() => removePair(index)}
                                                style={{
                                                    background: "transparent",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    fontSize: "1em",
                                                    color: "#d11a2a",
                                                }}
                                                title="Remove"
                                            >
                                                ❌
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} style={{ textAlign: "center", padding: "0.5em" }}>
                                        No pairs
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <button
                    onClick={handleMerge}
                    style={{
                        padding: "0.6em",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "0.8em",
                        marginTop: "1em",
                    }}
                >
                    🔄 Merge
                </button>
            </div>


            {/* Right Tree */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <FamilyTree key={rightTreeKey} chartId="FamilyChart2" onSelect={(person) => handleNodeSelect(person, 'right')} />
                <button onClick={resetRightTree} style={{ marginTop: 10 }}>🔄 Reset Right Tree</button>
            </div>
        </div>
    );
}
