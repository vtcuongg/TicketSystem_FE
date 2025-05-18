import NavBar from "./NavBar";
import React, { useMemo, useState } from 'react';
import "../Styles/Employee.scss"
import EmployeeTable from "./EmployeeTable";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Users = () => {
    const navigate = useNavigate();
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
                title: 'Chú ý!',
                text: 'Vui lòng chọn đúng 1 Users để cập nhật.',
            });
        }
    };

    const handleDeleteClick = async () => {
        if (selectedUserIds.length > 0) {
            const result = await Swal.fire({
                title: 'Xác nhận xoá',
                text: `Bạn có chắc chắn muốn xoá ${selectedUserIds.length} Users?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Vâng, xoá!',
                cancelButtonText: 'Huỷ',
            });

            if (result.isConfirmed) {
                Swal.fire(
                    'Đã xoá!',
                    'Các Users đã được xoá thành công.',
                    'success'
                );
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Chú ý!',
                text: 'Vui lòng chọn ít nhất một Users để xoá.',
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
                    <EmployeeTable onRowSelect={handleRowSelect} />
                </div>
            </div>
        </NavBar>
    )
}
export default Users;