import React, { useState } from "react";
import "./PersonDialog.css";
import useCreateSpouse from "../hooks/useCreateSpouse";
import useCreateParent from "../hooks/useCreateParent";
import useCreateChild from "../hooks/useCreateChild";
import { getAuthToken } from "../auth/authToken";


const PersonDialog = ({ personData, onClose }) => {
    if (!personData) return null;
    const { data } = personData;

    const [relationship, setRelationship] = useState("Spouse");
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        birth_date: "",
        death_date: "",
        gender: "Male",
        status: "Active",
        marriage_date: "",
        divorce_date: "",
        child_kind: "AdoptedChild",
        child_status: "Separated",
        mobile: "",
        is_owner: false,
    });

    const { createSpouse } = useCreateSpouse();
    const { createParent } = useCreateParent();
    const { createChild } = useCreateChild();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (relationship === "Spouse") {
                const input = {
                    person_id: data.id,
                    marriage_date: form.marriage_date || null,
                    spouse: {
                        first_name: form.first_name,
                        last_name: form.last_name,
                        birth_date: form.birth_date,
                        mobile: form.mobile, // include if needed
                    },
                    status: form.status || "Active",
                    marriage_status: form.marriage_status || "Related",
                };

                console.log("Submitting Spouse Mutation:", input);

                await createSpouse(input);

            } else if (relationship === "Parents") {
                const input = {
                    person_id: data.id,
                    marriage_date: form.marriage_date || null,
                    divorce_date: form.divorce_date || null,
                    father: {
                        first_name: form.first_name,
                        last_name: form.last_name,
                        birth_date: form.birth_date,
                        death_date: form.death_date || null,
                    },
                    mother: {
                        first_name: `${form.first_name} Mother`,
                        last_name: form.last_name,
                        birth_date: form.birth_date,
                        death_date: form.death_date || null,
                    },
                    status: form.status || "Active",
                };

                console.log("Submitting Parent Mutation:", input);

                await createParent({ variables: { input } });

            } else if (relationship === "Child") {
                const genderVal = form.gender === "Male" ? 1 : 0;

                const input = {
                    man_id: personData?.data?.gender === "Male" ? data.id : null,
                    woman_id: personData?.data?.gender === "Female" ? data.id : null,
                    child: {
                        first_name: form.first_name,
                        last_name: form.last_name,
                        birth_date: form.birth_date,
                        gender: genderVal,
                        is_owner: form.is_owner || false,
                        mobile: form.mobile,
                    },
                    child_kind: form.child_kind,
                    child_status: form.child_status,
                    status: form.status || "Active",
                };

                console.log("Submitting Child Mutation:", input);

                await createChild({ variables: { input } });
            }

            alert("Submitted successfully");
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
        
            const validation = error?.message?.includes("Validation Error")
                ? error?.response?.errors?.[0]?.extensions?.validation
                : null;
        
            if (validation) {
                Object.entries(validation).forEach(([field, messages]) => {
                    toast.error(`${field}: ${messages.join(", ")}`);
                });
            } else if (error.message) {
                toast.error("Error: " + error.message);
            } else {
                toast.error("Failed to submit");
            }
        }
        

    };


    return (
        <div className="dialog-backdrop">
            <div className="dialog-box">
                <h2>Add {relationship}</h2>

                <form onSubmit={handleSubmit}>
                    <label>
                        Relationship:
                        <select
                            name="relationship"
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}
                        >
                            <option>Spouse</option>
                            <option>Parents</option>
                            <option>Child</option>
                        </select>
                    </label>

                    {/* Common Fields */}
                    <label>
                        First Name:
                        <input name="first_name" value={form.first_name} onChange={handleChange} />
                    </label>

                    <label>
                        Last Name:
                        <input name="last_name" value={form.last_name} onChange={handleChange} />
                    </label>

                    <label>
                        Birth Date:
                        <input type="date" name="birth_date" value={form.birth_date} onChange={handleChange} />
                    </label>

                    {/* Conditional Fields */}
                    {(relationship === "Parents" || relationship === "Child") && (
                        <label>
                            Death Date:
                            <input type="date" name="death_date" value={form.death_date} onChange={handleChange} />
                        </label>
                    )}

                    {(relationship === "Spouse" || relationship === "Parents") && (
                        <label>
                            Marriage Date:
                            <input type="date" name="marriage_date" value={form.marriage_date} onChange={handleChange} />
                        </label>
                    )}

                    {relationship === "Parents" && (
                        <label>
                            Divorce Date:
                            <input type="date" name="divorce_date" value={form.divorce_date} onChange={handleChange} />
                        </label>
                    )}

                    {relationship === "Child" && (
                        <>
                            <label>
                                Gender:
                                <select name="gender" value={form.gender} onChange={handleChange}>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </label>

                            <label>
                                Child Kind:
                                <select name="child_kind" value={form.child_kind} onChange={handleChange}>
                                    <option>AdoptedChild</option>
                                    <option>BiologicalChild</option>
                                </select>
                            </label>

                            <label>
                                Child Status:
                                <select name="child_status" value={form.child_status} onChange={handleChange}>
                                    <option>Separated</option>
                                    <option>LivingTogether</option>
                                </select>
                            </label>

                            <label>
                                Status:
                                <select name="status" value={form.status} onChange={handleChange}>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </label>

                            <label>
                                Is Owner:
                                <input type="checkbox" name="is_owner" checked={form.is_owner} onChange={handleChange} />
                            </label>

                            <label>
                                Mobile:
                                <input name="mobile" value={form.mobile} onChange={handleChange} />
                            </label>
                        </>
                    )}

                    <div className="dialog-actions">
                        <button type="submit">Add</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonDialog;
