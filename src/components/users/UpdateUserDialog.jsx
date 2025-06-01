import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from '@mui/material';
import useSingleUser from '../../hooks/user/useSingleUser';
// import useUpdateUser from '../../hooks/user/useUpdateUser'; // <-- remove for now

const UpdateUserDialog = ({ userId, open, onClose }) => {
    const { user, loading } = useSingleUser(userId);
    // const { updateUser, loading: updating } = useUpdateUser(); // remove for now

    const [formData, setFormData] = useState({
        mobile: '',
        role: '',
        status: '',
        image: null,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                mobile: user.mobile || '',
                role: user.role || '',
                status: user.status || '',
                image: null,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData((prev) => ({ ...prev, image: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // For now, just close on submit, no update logic:
    const handleSubmit = () => {
        // you can add update logic later here
        onClose();
    };

    if (loading) return <CircularProgress />;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update User</DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 20 }}>
                <TextField name="mobile" label="Mobile" value={formData.mobile} onChange={handleChange} fullWidth />
                <TextField name="role" label="Role" value={formData.role} onChange={handleChange} fullWidth />
                <TextField name="status" label="Status" value={formData.status} onChange={handleChange} fullWidth />
                <input type="file" name="image" onChange={handleChange} />
                {user?.image_url && (
                    <img src={user.image_url} alt="User" style={{ width: 80, borderRadius: 4, marginTop: 8 }} />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateUserDialog;
