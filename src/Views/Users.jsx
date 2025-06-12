import NavBar from "./NavBar";
import React, { useMemo, useState } from 'react';
import "../Styles/Employee.scss"
import EmployeeTable from "./EmployeeTable";
import { useNavigate } from 'react-router-dom';
import { useDeleteUserByIdMutation } from '../Services/userApi';
import Swal from 'sweetalert2';
const Users = () => {
    const navigate = useNavigate();
    const [deleteUser, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] = useDeleteUserByIdMutation();
    const [reloadFlag, setReloadFlag] = useState(false);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const handleRowSelect = (ids) => {
        setSelectedUserIds(ids);
    };
    const handleUpdateClick = () => {
        if (selectedUserIds.length === 1) {
            navigate(`/update-user/${selectedUserIds[0]}`);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select the correct 1 User to update',
            });
        }
    };

    const handleDeleteClick = async () => {
        if (selectedUserIds.length > 0) {
            const result = await Swal.fire({
                title: 'Confirm Deleted',
                text: `Are you sure you want to delete ${selectedUserIds.length} User ?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No',
            });

            if (result.isConfirmed) {
                try {
                    await Promise.all(
                        selectedUserIds.map(async (id) => {
                            await deleteUser(id);
                        })
                    );
                    setReloadFlag(prev => !prev);
                    Swal.fire(
                        'Deleted',
                        'The Users have been successfully deleted.',
                        'success'
                    );
                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'An error occurred while deleting Users.',
                    });
                }
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select at least one User to delete.',
            });
        }
    };
    return (
        <NavBar title="List Users " path="Users"   >
            <div className="main-container-employee">
                <div className="header-main">
                    <div className="header-main-left">
                        List Users
                    </div>
                    <div className="header-main-right">
                        <div className="header-main-right-btn" onClick={() => navigate('/create-user')}>Add User</div>
                        <div className="header-main-right-btn" onClick={() => handleDeleteClick()}>Delete User</div>
                        <div className="header-main-right-btn" onClick={() => handleUpdateClick()}>Update User</div>
                    </div>

                </div>
                <div className="Main-Employee">
                    <EmployeeTable onRowSelect={handleRowSelect} reloadFlag={reloadFlag} />
                </div>
            </div>
        </NavBar>
    )
}
export default Users;