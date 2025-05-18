import NavBar from "./NavBar";
import React, { useMemo, useState, useEffect } from 'react';
import "../Styles/CreateCategory.scss"
import { useParams } from 'react-router-dom';
const CreateCategory = () => {
    const { id } = useParams();
    const [isUpdate, setIsUpdate] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [CategoryName, setCategoryName] = useState('');
    const [department, setDepartment] = useState('');
    const DepartmentOptions = useMemo(() => [
        { value: '1', label: 'Technical SupportD' },
        { value: '2', label: 'Billing InquiryD' },
        { value: '3', label: 'Feature RequestD' },
        { value: '4', label: 'OtherD' },
    ], []);
    const handleSubmit = (event) => {
        event.preventDefault();

    };
    useEffect(() => {
        if (id) {
            setCategoryId(id)

        } else {
            setIsUpdate(false);
        }
    }, [id]);
    return (
        <NavBar title={isUpdate ? "Update Category" : "Create Category"} path="Categories">
            <div className="create-category-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="categoryId">Mã đề mục </label>
                        <input
                            type="text"
                            id="categoryId"
                            placeholder="ID"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            readOnly={isUpdate ? true : false}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CategoryName">Tên đề mục</label>
                        <input
                            type="text"
                            id="CategoryName"
                            placeholder="Tên đề mục"
                            value={CategoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Department">Department</label>
                        <select
                            id="Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        >
                            <option value="">Select a Department</option>
                            {DepartmentOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </NavBar>
    )
}
export default CreateCategory;