import NavBar from "./NavBar";
import React, { useMemo, useState, useEffect } from 'react';
import "../Styles/CreateDepartment.scss"
import { useParams } from 'react-router-dom';
import { useAddDepartmentMutation, useGetDepartmentByIdQuery, useUpdateDepartmentMutation } from '../Services/departmentAPI';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateDepartment = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const { id } = useParams();
    const [isUpdate, setIsUpdate] = useState(false);
    const [departmentID, setDepartmentID] = useState('')
    const [departmentName, setDepartmentName] = useState('');
    const [addDepartment, { isLoading, isSuccess, isError, data, error }] = useAddDepartmentMutation();
    const [updateDepartment, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] = useUpdateDepartmentMutation();
    const { data: department, refetch } = useGetDepartmentByIdQuery(id,
        {
            skip: !id
        });
    useEffect(() => {
        refetch()
    }, location)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!isUpdate) {
                await addDepartment({ departmentName: departmentName });
                Swal.fire(
                    'Newly created successfully!',
                    'Department created successfully ',
                    'success'
                );
                navigate('/department')
            }
            else {
                await updateDepartment({ departmentID: departmentID, departmentName: departmentName });
                Swal.fire(
                    'Updated successfully!',
                    'Department Updated successfully',
                    'success'
                );
                navigate('/department')
            }
        } catch (err) {
        }


    };
    useEffect(() => {
        if (id) {
            setIsUpdate(true);
        } else {
            setIsUpdate(false);
        }
    }, [id]);
    useEffect(() => {
        setDepartmentID(department?.data.departmentID);
        setDepartmentName(department?.data.departmentName);
    }, [department])
    return (
        <NavBar title={isUpdate ? "Update Department" : "Create Department"} path="Department">
            <div className="create-department-container">
                <form onSubmit={handleSubmit}>
                    {location.pathname.includes("/update-department") &&
                        <div className="form-group">
                            <label htmlFor="departmenID">Department ID</label>
                            <input
                                type="text"
                                id="departmentID"
                                placeholder="ID phòng ban"
                                value={departmentID}
                                onChange={(e) => setDepartmentID(e.target.value)}
                                required
                                readOnly
                            />
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="departmentName">Department Name</label>
                        <input
                            type="text"
                            id="departmentName"
                            placeholder="Tên phòng ban"
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </NavBar>
    )
}
export default CreateDepartment;