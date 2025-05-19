import React from "react";
import "./PersonDialog.css"; // add dialog styles

const PersonDialog = ({ personData, onClose }) => {
  if (!personData) return null;
  const { data } = personData;

  return (
    <div className="dialog-backdrop">
      <div className="dialog-box">
        <h2>Edit Person</h2>
        <form>
          <label>ID: <input type="text" value={data["id"] || ""} readOnly /></label>
          <label>First Name: <input type="text" value={data["first name"] || ""} readOnly /></label>
          <label>Last Name: <input type="text" value={data["last name"] || ""} readOnly /></label>
          <label>Gender: <input type="text" value={data["gender"] || ""} readOnly /></label>
          <label>Birth Date: <input type="date" value={data["birth_date"] || ""} readOnly /></label>
          <label>Death Date: <input type="date" value={data["death_date"] || ""} readOnly /></label>
          <label>Status: <input type="text" value={data["status"] || ""} readOnly /></label>
        </form>
        <div className="dialog-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PersonDialog;
