import NavBar from "./NavBar";
import React, { useMemo, useState, useEffect, useRef } from 'react';
import "../Styles/profile.scss"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import avatar from "../assets/Images/avatar-df.png"
import { useAddUserMutation, useUpdateAvatarMutation, useGetUsersByIdQuery, useUpdateUserStatusMutation } from '../Services/userApi';
import { useParams } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
const Profile = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { id } = useParams();
    const [reloadFlag, setReloadFlag] = useState(false);
    const [status, setStatus] = useState('');
    const [avatar, setAvatar] = useState('');
    const [updateUserStatus, { isLoading, isSuccess, isError, error }] = useUpdateUserStatusMutation();
    const [updateUserAvatar, { isLoading: isAvatarUpdating, isSuccess: isAvatarSuccess, isError: isAvatarError, error: avatarError }] = useUpdateAvatarMutation();
    const fileInputRef = useRef(null);
    const { data: User, refetch } = useGetUsersByIdQuery(id,
        {
            skip: !id
        });
    useEffect(() => {
        if (User) {
            refetch()
        }
    }, location)
    useEffect(() => {
        setStatus(User?.data.status)
    }, User)
    const StatusOptions = useMemo(() => [
        { value: '1', label: 'Active' },
        { value: '2', label: 'InActive' },
    ], []);
    const handleStatusChange = async (e) => {
        const newStatusValue = e.target.value;
        setStatus(newStatusValue);
        try {
            await updateUserStatus({ userId: id, newStatus: newStatusValue }).unwrap();
        } catch (err) {
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024;
        if (!allowedTypes.includes(file.type)) {
            Swal.fire('Error', 'Only image files (JPEG, PNG, GIF) are accepted.', 'error');
            return;
        }
        if (file.size > maxSize) {
            Swal.fire('Error', 'File size too large (maximum 5MB).', 'error');
            return;
        }
        try {
            await updateUserAvatar({ avatarFile: file }).unwrap();
            refetch()
        } catch (err) {
            console.error("Error during avatar API call:", err);
        }
    };
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        } else {
        }
    };
    if (User) {
        return (
            <NavBar title="Profile" path="App">
                <div className="main-container-profile">
                    <div className="profile-info-section">
                        <img src={User?.data.avatar} alt={User?.data.userName} className="profile-picture" />
                        <FaCamera
                            className="camera-icon"
                            onClick={triggerFileInput}
                            style={{ cursor: 'pointer' }}
                            disabled={isAvatarUpdating}
                        />
                        {isAvatarUpdating && <p className="avatar-upload-loading">Upload...</p>}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            disabled={isAvatarUpdating}
                        />
                        <div className="profile-details">
                            <h1 className="profile-name">{User?.data.userName} </h1>
                            <p className="profile-title">{User?.data.roleName}</p>
                            <a href={User?.data.email} className="profile-email">{User?.data.email}</a>
                            <button
                                type="button"
                                onClick={() => navigate(`/change-pass/${id}`)}
                                className="submit-button"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                    <div className="profile-detail-container">
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                value={User?.data.phoneNumber}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dayofbirth">Date Of Birth</label>
                            <input
                                type="text"
                                id="dayofbirth"
                                value={User?.data.dateOfBirth.slice(0, 10)}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Gender">Gender</label>
                            <input
                                type="text"
                                id="Gender"
                                value={User?.data.gender}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={User?.data.address}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="CCCD">National ID</label>
                            <input
                                type="text"
                                id="CCCD"
                                value={User?.data.nationalID}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Department">Department</label>
                            <input
                                type="text"
                                id="Department"
                                value={User?.data.departmentName}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Status">Status</label>
                            <select
                                id="Status"
                                value={status}
                                onChange={handleStatusChange}
                                required
                            >
                                <option value="">Select a Status</option>
                                {StatusOptions.map((option) => (
                                    <option key={option.value} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>


                    </div>
                </div>
            </NavBar>
        )
    }
}
export default Profile;