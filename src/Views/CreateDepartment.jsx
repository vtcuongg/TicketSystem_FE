import NavBar from "./NavBar";
import React, { useMemo, useState, useEffect } from 'react';
import "../Styles/CreateDepartment.scss"
import { useParams } from 'react-router-dom';
const CreateDepartment = () => {
    const { id } = useParams();
    const [isUpdate, setIsUpdate] = useState(false);
    const [departmentId, setDepartmentId] = useState('');
    const [departmentName, setDepartmentName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

    };
    useEffect(() => {
        if (id) {
            setIsUpdate(true);

        } else {
            setIsUpdate(false);
        }
    }, [id]);
    return (
        <NavBar title={isUpdate ? "Update Department" : "Create Department"} path="Department">
            <div className="create-department-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="departmentId">ID </label>
                        <input
                            type="text"
                            id="departmentId"
                            placeholder="ID"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="departmentName">Tên phòng ban</label>
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