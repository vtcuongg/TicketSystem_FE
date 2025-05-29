import NavBar from "./NavBar";
import React, { useMemo, useState } from 'react';
import "../Styles/Employee.scss"
import DepartmentTable from "./DepartmentTable";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDeleteDepartmentMutation } from '../Services/departmentAPI';

const Department = () => {
    const [deleteDepartment, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] = useDeleteDepartmentMutation();
    const navigate = useNavigate();
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
    const [reloadFlag, setReloadFlag] = useState(false);
    const handleRowSelect = (ids) => {
        setSelectedDepartmentIds(ids);
    };

    const handleUpdateClick = () => {
        if (selectedDepartmentIds.length === 1) {
            navigate(`/update-department/${selectedDepartmentIds[0]}`);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Chú ý!',
                text: 'Vui lòng chọn đúng 1 Department để cập nhật.',
            });
        }
    };

    const handleDeleteClick = async () => {
        if (selectedDepartmentIds.length > 0) {
            const result = await Swal.fire({
                title: 'Xác nhận xoá',
                text: `Bạn có chắc chắn muốn xoá ${selectedDepartmentIds.length} Department?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Vâng, xoá!',
                cancelButtonText: 'Huỷ',
            });

            if (result.isConfirmed) {
                try {
                    await Promise.all(
                        selectedDepartmentIds.map(async (id) => {
                            await deleteDepartment(id);
                        })
                    );
                    setReloadFlag(prev => !prev);
                    Swal.fire(
                        'Đã xoá!',
                        'Các department đã được xoá thành công.',
                        'success'
                    );
                } catch (err) {
                    console.error('Lỗi khi xoá department:', deleteError || err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi!',
                        text: 'Đã xảy ra lỗi khi xoá các department.',
                    });
                }
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Chú ý!',
                text: 'Vui lòng chọn ít nhất một Department để xoá.',
            });
        }
    };
    return (
        <NavBar title="List Departments " path="Departments"   >
            <div className="main-container-employee">
                <div className="header-main">
                    <div className="header-main-left">
                        List Departments
                    </div>
                    <div className="header-main-right">
                        <div className="header-main-right-btn" onClick={() => navigate('/create-department')}>Add Department</div>
                        <div className="header-main-right-btn" onClick={() => handleDeleteClick()}>Delete Department</div>
                        <div className="header-main-right-btn" onClick={() => handleUpdateClick()}>Update Department</div>
                    </div>

                </div>
                <div className="Main-Employee">
                    <DepartmentTable onRowSelect={handleRowSelect} reloadFlag={reloadFlag} />
                </div>
            </div>
        </NavBar>
    )
}
export default Department;