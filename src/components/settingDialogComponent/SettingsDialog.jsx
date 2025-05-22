// components/settingsDialogComponent/SettingsDialog.jsx
import React from "react";
import { Dialog } from "@mui/material";
import { FiPlus, FiX } from "react-icons/fi";

const SettingsDialog = ({ open, onClose, settings, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const parsedValue = type === "checkbox" ? checked : parseInt(value);
    onChange({ ...settings, [name]: parsedValue });
  };

  const handleCardLineChange = (index, value) => {
    const updated = [...settings.cardDisplayLines];
    updated[index] = value;
    onChange({ ...settings, cardDisplayLines: updated });
  };

  const addCardLine = () => {
    onChange({ ...settings, cardDisplayLines: [...settings.cardDisplayLines, ""] });
  };

  const removeCardLine = (index) => {
    const updated = settings.cardDisplayLines.filter((_, i) => i !== index);
    onChange({ ...settings, cardDisplayLines: updated });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ padding: "20px", width: "400px" }}>
        <h2>Chart Settings</h2>

        <label>Orientation:</label>
        <select name="orientation" value={settings.orientation} onChange={handleInputChange}>
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
        </select>

        <br /><br />

        <label>Card X Spacing:</label>
        <input
          type="number"
          name="cardXSpacing"
          value={settings.cardXSpacing}
          onChange={handleInputChange}
        />

        <br /><br />

        <label>Card Y Spacing:</label>
        <input
          type="number"
          name="cardYSpacing"
          value={settings.cardYSpacing}
          onChange={handleInputChange}
        />

        <br /><br />

        <label>Transition Time (ms):</label>
        <input
          type="number"
          name="transitionTime"
          value={settings.transitionTime}
          onChange={handleInputChange}
        />

        <br /><br />

        <label>
          <input
            type="checkbox"
            name="miniTree"
            checked={settings.miniTree}
            onChange={handleInputChange}
          />
          Enable Mini Tree
        </label>

        <br /><br />

        <label>
          <input
            type="checkbox"
            name="singleParentEmptyCard"
            checked={settings.singleParentEmptyCard}
            onChange={handleInputChange}
          />
          Show "Add" for single parents
        </label>

        <br /><br />

        <label>Empty Card Label:</label>
        <input
          type="text"
          name="emptyCardLabel"
          value={settings.emptyCardLabel}
          onChange={handleInputChange}
        />

        <br /><br />

        <h4>Card Display Fields</h4>
        {settings.cardDisplayLines.map((line, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <input
              type="text"
              value={line}
              onChange={(e) => handleCardLineChange(index, e.target.value)}
              placeholder="e.g., first_name,last_name"
              style={{ flex: 1, marginRight: 8 }}
            />
            <button onClick={() => removeCardLine(index)} style={{ background: "none", border: "none" }}>
              <FiX size={18} />
            </button>
          </div>
        ))}

        <button onClick={addCardLine} style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10 }}>
          <FiPlus /> Add Line
        </button>

        <br /><br />
        <button onClick={onClose}>Close</button>
      </div>
    </Dialog>
  );
};

export default SettingsDialog;
