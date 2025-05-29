// src/Components/ChangePasswordScreen.jsx
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
                title: 'Đổi mật khẩu thành công!',
                text: 'Mật khẩu của bạn đã được cập nhật.',
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
            const errorMessage = passwordChangeError?.data?.Message || 'Đã có lỗi xảy ra khi đổi mật khẩu.';
            const errors = passwordChangeError?.data?.Errors ? passwordChangeError.data.Errors.join('\n') : '';

            Swal.fire({
                icon: 'error',
                title: 'Lỗi đổi mật khẩu!',
                text: `${errorMessage}\n${errors}`,
            });
        }
    }, [isPasswordChangeSuccess, isPasswordChangeError, passwordChangeError, navigate, id]);

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            Swal.fire('Lỗi!', 'Vui lòng điền đầy đủ các trường mật khẩu.', 'error');
            return;
        }
        if (newPassword !== confirmPassword) {
            Swal.fire('Lỗi!', 'Mật khẩu mới và xác nhận mật khẩu không khớp.', 'error');
            return;
        }

        try {
            const userId = id;
            if (isNaN(userId)) {
                Swal.fire('Lỗi!', 'ID người dùng không hợp lệ.', 'error');
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
                            <label htmlFor="currentPass">Mật khẩu hiện tại</label>
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
                            <label htmlFor="newPass">Mật khẩu mới</label>
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
                            <label htmlFor="confirmPass">Xác nhận mật khẩu mới</label>
                            <input
                                type="password"
                                id="confirmPass"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={isPasswordChanging}
                            />
                        </div>
                        <div style={{ color: "red" }}>Mật khẩu có ít nhất 6 kí tự bao gồm 1 chữ hoa và 1 kí tự đặc biệt</div>
                        <button type="submit" className="submit-button-changepass" disabled={isPasswordChanging}>
                            {isPasswordChanging ? 'Đang đổi mật khẩu...' : 'Đổi mật khẩu'}
                        </button>
                    </form>
                </div>
            </div>
        </NavBar>
    );
};

export default ChangePass;