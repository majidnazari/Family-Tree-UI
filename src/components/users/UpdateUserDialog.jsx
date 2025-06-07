import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    CircularProgress,
    MenuItem,
    FormControlLabel,
    Switch,
} from '@mui/material';

import useGetUserByAdmin from '../../hooks/useGetUserByAdmin';
import useUpdateUser from '../../hooks/useUpdateUserByAdmin';

const roleOptions = ['User', 'Admin', 'Supporter'];
const statusOptions = ['Blocked', 'None', 'Active', 'Inactive', 'Suspended', 'New'];

const SaveConfirmDialog = ({ open, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>Are you sure you want to save the changes?</DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button onClick={onConfirm} color="primary">Confirm</Button>
        </DialogActions>
    </Dialog>
);

const UpdateUserDialog = ({ userId, open, onClose }) => {
    const { getUser } = useGetUserByAdmin();
    const { updateUserByAdmin } = useUpdateUser();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [updating, setUpdating] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        country_code: '',
        role: '',
        status: '',
        image: null,
        blood_user_relation_calculated: false,
        code_expired_at: '',
        mobile_is_verified: false,
        password: '',
        password_change_attempts: '',
        sent_code: '',
        created_at: '',
        updated_at: '',
    });

    useEffect(() => {
        if (open && userId) {
            fetchUserData(userId);
        }
    }, [open, userId]);

    const fetchUserData = async (id) => {
        setLoading(true);
        try {
            const fetchedUser = await getUser(id);
            setUser(fetchedUser);
            setFormData({
                name: fetchedUser.name || '',
                email: fetchedUser.email || '',
                mobile: fetchedUser.mobile || '',
                country_code: fetchedUser.country_code || '',
                role: fetchedUser.role || '',
                status: fetchedUser.status || '',
                image: null,
                blood_user_relation_calculated: !!fetchedUser.blood_user_relation_calculated,
                code_expired_at: fetchedUser.code_expired_at || '',
                mobile_is_verified: !!fetchedUser.mobile_is_verified,
                password: '',
                password_change_attempts: fetchedUser.password_change_attempts || '',
                sent_code: fetchedUser.sent_code || '',
                created_at: fetchedUser.created_at || '',
                updated_at: fetchedUser.updated_at || '',
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = () => {
        setShowConfirm(true);
    };

    const confirmSave = async () => {
        setShowConfirm(false);
        setUpdating(true);
        try {
            const input = {
                ...formData,
                password_change_attempts: Number(formData.password_change_attempts || 0),
                blood_user_relation_calculated: Boolean(formData.blood_user_relation_calculated),
                mobile_is_verified: Boolean(formData.mobile_is_verified),
            };

            await updateUserByAdmin(userId, input); // ✅ this will now work
            onClose();
        } catch (err) {
            console.error('Update failed:', err);
        }
    };

    if (loading) {
        return <CircularProgress sx={{ margin: 'auto', display: 'block', mt: 4 }} />;
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ sx: { width: '90vw', maxWidth: 1000, minHeight: '60vh', display: 'flex', flexDirection: 'column' } }}>
                <DialogTitle>Update User</DialogTitle>
                <DialogContent
                    sx={{
                        flex: 1,
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
                    <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth />
                    <TextField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} fullWidth />
                    <TextField label="Country Code" name="country_code" value={formData.country_code} onChange={handleChange} fullWidth />
                    <TextField label="Sent Code" name="sent_code" value={formData.sent_code} onChange={handleChange} fullWidth />
                    <TextField label="Code Expired At" name="code_expired_at" value={formData.code_expired_at} onChange={handleChange} fullWidth />
                    <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth />
                    <TextField label="Password Change Attempts" name="password_change_attempts" type="number" value={formData.password_change_attempts} onChange={handleChange} fullWidth />

                    <TextField select label="Role" name="role" value={formData.role} onChange={handleChange} fullWidth>
                        {roleOptions.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField select label="Status" name="status" value={formData.status} onChange={handleChange} fullWidth>
                        {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>

                    <FormControlLabel
                        control={<Switch checked={formData.blood_user_relation_calculated} onChange={handleChange} name="blood_user_relation_calculated" />}
                        label="Blood User Relation Calculated"
                    />

                    <FormControlLabel
                        control={<Switch checked={formData.mobile_is_verified} onChange={handleChange} name="mobile_is_verified" />}
                        label="Mobile Verified"
                    />

                    <TextField label="Created At" name="created_at" value={formData.created_at} disabled fullWidth />
                    <TextField label="Updated At" name="updated_at" value={formData.updated_at} disabled fullWidth />

                    {/* Image upload + preview */}
                    <div style={{ gridColumn: '1 / -1', marginTop: 16 }}>
                        <input type="file" name="image" onChange={handleChange} />
                        {user?.image_url && (
                            <img src={user.image_url} alt="User" style={{ width: 100, borderRadius: 6, marginTop: 8 }} />
                        )}
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={updating}>
                        {updating ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </Dialog>

            <SaveConfirmDialog
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmSave}
            />
        </>
    );
};

export default UpdateUserDialog;
