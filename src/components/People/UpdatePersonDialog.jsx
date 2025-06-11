import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import useSinglePerson from "../../hooks/People/useSinglePerson";
import useUpdatePerson from "../../hooks/People/updatePerson";

const UpdatePersonDialog = ({ open, onClose, personId, onUpdateSuccess }) => {
    const { person: personData, loading } = useSinglePerson(personId);
    const { updatePerson } = useUpdatePerson();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        birth_date: "",
        death_date: "",
        gender: 1,
        is_owner: false,
        country_code: "",
        mobile: "",
    });

    useEffect(() => {
        if (personData) {
            setFormData({
                first_name: personData.first_name || "",
                last_name: personData.last_name || "",
                birth_date: convertToInputDateTime(personData.birth_date),
                death_date: convertToInputDateTime(personData.death_date),
                gender: personData.gender || 1,
                is_owner: personData.is_owner || false,
                country_code: personData.country_code || "",
                mobile: personData.mobile || "",
            });
        }
    }, [personData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePerson(personId, formData);
            if (onUpdateSuccess) onUpdateSuccess(); // ✅ call refetch
            onClose();
        } catch (err) { }
    };


    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                style: {
                    padding: 24,
                    backgroundColor: "#1e1e2f",
                    color: "white",
                    direction: "rtl",
                },
            }}
        >
            <div style={styles.header}>
                <h2 style={{ margin: 0 }}>Update Person</h2>
                <IconButton onClick={onClose} style={{ color: "white" }}>
                    <CloseIcon />
                </IconButton>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: 40 }}>
                    <CircularProgress color="inherit" />
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <FormRow label="First Name">
                        <input name="first_name" value={formData.first_name} onChange={handleChange} style={styles.input} />
                    </FormRow>

                    <FormRow label="Last Name">
                        <input name="last_name" value={formData.last_name} onChange={handleChange} style={styles.input} />
                    </FormRow>

                    <FormRow label="Birth Date">
                        <input type="datetime-local" name="birth_date" value={formData.birth_date} onChange={handleChange} style={styles.input} />
                    </FormRow>

                    <FormRow label="Death Date">
                        <input type="datetime-local" name="death_date" value={formData.death_date} onChange={handleChange} style={styles.input} />
                    </FormRow>

                    <FormRow label="Gender">
                        <select name="gender" value={formData.gender} onChange={handleChange} style={styles.input}>
                            <option value={1}>Male</option>
                            <option value={2}>Female</option>
                        </select>
                    </FormRow>

                    <FormRow label="Is Owner">
                        <input name="is_owner" type="checkbox" checked={formData.is_owner} onChange={handleChange} />
                    </FormRow>

                    <FormRow label="Country Code">
                        <input name="country_code" value={formData.country_code} onChange={handleChange} style={styles.input} />
                    </FormRow>

                    <FormRow label="Mobile">
                        <input name="mobile" value={formData.mobile} onChange={handleChange} style={styles.input} />
                    </FormRow>

                    <div style={styles.actions}>
                        <button type="button" style={styles.cancelButton} onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" style={styles.saveButton}>
                            Save
                        </button>
                    </div>
                </form>
            )}
        </Dialog>
    );
};

// Helper Components & Styles

const FormRow = ({ label, children }) => (
    <div style={styles.row}>
        <label style={styles.label}>{label}:</label>
        <div style={{ flex: 1 }}>{children}</div>
    </div>
);

const convertToInputDateTime = (datetime) => {
    if (!datetime) return "";
    return datetime.substring(0, 16);
};

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },
    row: {
        display: "flex",
        alignItems: "center",
        gap: 16,
    },
    label: {
        minWidth: 120,
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: 8,
        borderRadius: 4,
        border: "1px solid #ccc",
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 12,
        marginTop: 24,
    },
    saveButton: {
        padding: "10px 24px",
        backgroundColor: "#05A6E0",
        border: "none",
        color: "white",
        borderRadius: 4,
        cursor: "pointer",
    },
    cancelButton: {
        padding: "10px 24px",
        backgroundColor: "#777",
        border: "none",
        color: "white",
        borderRadius: 4,
        cursor: "pointer",
    },
};

export default UpdatePersonDialog;
