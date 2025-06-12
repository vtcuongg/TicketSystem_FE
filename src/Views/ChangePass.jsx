import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavBar from "./NavBar";
import { useChangePasswordMutation } from '../Services/userApi';
import "../Styles/ChangePass.scss";

const ChangePass = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [
        changeUserPassword,
        { isLoading: isPasswordChanging, isSuccess: isPasswordChangeSuccess, isError: isPasswordChangeError, error: passwordChangeError }
    ] = useChangePasswordMutation();
    useEffect(() => {
        if (isPasswordChangeSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Password changed successfully!!',
                text: 'Your password has been updated.',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate(`/profile/${id}`);
            });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
        if (isPasswordChangeError) {
            console.error("Error changing password:", passwordChangeError);
            const errorMessage = passwordChangeError?.data?.Message || 'An error occurred while changing password.';
            const errors = passwordChangeError?.data?.Errors ? passwordChangeError.data.Errors.join('\n') : '';

            Swal.fire({
                icon: 'error',
                title: 'Password change error!',
                text: `${errorMessage}\n${errors}`,
            });
        }
    }, [isPasswordChangeSuccess, isPasswordChangeError, passwordChangeError, navigate, id]);

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            Swal.fire('Error!', 'Please fill in all password fields.', 'error');
            return;
        }
        if (newPassword !== confirmPassword) {
            Swal.fire('Error!', 'New password and confirm password do not match.', 'error');
            return;
        }

        try {
            const userId = id;
            if (isNaN(userId)) {
                Swal.fire('Error!', 'Invalid user ID.', 'error');
                return;
            }
            await changeUserPassword({
                userId: userId,
                currentPassword,
                newPassword,
                confirmPassword
            }).unwrap();
        } catch (err) {

        }
    };

    return (
        <NavBar title="Change Password" path="App">
            <div className="main-container-changepass">
                <div className="changepass-detail-container">
                    <form onSubmit={handleChangePasswordSubmit}>
                        <div className="form-group-change">
                            <label htmlFor="currentPass">Current Pass</label>
                            <input
                                type="password"
                                id="currentPass"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                disabled={isPasswordChanging}
                            />
                        </div>
                        <div className="form-group-change">
                            <label htmlFor="newPass">New Password</label>
                            <input
                                type="password"
                                id="newPass"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                disabled={isPasswordChanging}
                            />
                        </div>
                        <div className="form-group-change">
                            <label htmlFor="confirmPass">Confirm new Password</label>
                            <input
                                type="password"
                                id="confirmPass"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={isPasswordChanging}
                            />
                        </div>
                        <div style={{ color: "red" }}>Password must be at least 6 characters long, including 1 uppercase letter and 1 special character</div>
                        <button type="submit" className="submit-button-changepass" disabled={isPasswordChanging}>
                            {isPasswordChanging ? 'Changing Password' : 'Changed Password'}
                        </button>
                    </form>
                </div>
            </div>
        </NavBar>
    );
};

export default ChangePass;