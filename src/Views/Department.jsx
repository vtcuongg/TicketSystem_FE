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
                title: 'Warning!',
                text: 'Please select a department to update.',
            });
        }
    };

    const handleDeleteClick = async () => {
        if (selectedDepartmentIds.length > 0) {
            const result = await Swal.fire({
                title: 'Confirm Deleted',
                text: `Are you sure you want to delete ${selectedDepartmentIds.length} Department?`,
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
                        selectedDepartmentIds.map(async (id) => {
                            await deleteDepartment(id);
                        })
                    );
                    setReloadFlag(prev => !prev);
                    Swal.fire(
                        'Deleted!',
                        'Departmens Deleted Successfully',
                        'success'
                    );
                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'An error occurred while deleting departments.',
                    });
                }
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select a department to update.',
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