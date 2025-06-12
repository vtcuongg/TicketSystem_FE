import NavBar from "./NavBar";
import React, { useMemo, useState, useEffect } from 'react';
import "../Styles/CreateCategory.scss"
import { useParams } from 'react-router-dom';
import { useGetDepartmentsQuery } from '../Services/departmentAPI';
import { useAddCategoryMutation, useUpdateCategoryMutation, useGetCategoryByIdQuery } from '../Services/categoryApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const CreateCategory = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate()
    const [isUpdate, setIsUpdate] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [CategoryName, setCategoryName] = useState('');
    const [department, setDepartment] = useState('');
    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const { data: Category, refetch } = useGetCategoryByIdQuery(id,
        {
            skip: !id
        });
    useEffect(() => {
        refetch()
    }, location)
    useEffect(() => {
        setCategoryId(Category?.data.categoryID);
        setCategoryName(Category?.data.categoryName);
        setDepartment(Category?.data.departmentID)
    }, [Category])
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!isUpdate) {
                await addCategory({ departmentID: department, categoryName: CategoryName });
                Swal.fire(
                    'New created successfully!',
                    'Category created successfully',
                    'success'
                );
                navigate('/Categories')
            }
            else {
                await updateCategory({ categoryID: categoryId, categoryName: CategoryName, departmentID: department });
                Swal.fire(
                    'Updated successfully!',
                    'Category updated successfully',
                    'success'
                );
                navigate('/Categories')
            }
        } catch (err) {
        }

    };
    useEffect(() => {
        if (id) {
            setCategoryId(id)
            setIsUpdate(true)

        } else {
            setIsUpdate(false);
        }
    }, [id]);
    const { data: data, isLoading, error } = useGetDepartmentsQuery()
    if (data) {
        return (
            <NavBar title={isUpdate ? "Update Category" : "Create Category"} path="Categories">
                <div className="create-category-container">
                    <form onSubmit={handleSubmit}>
                        {isUpdate &&
                            <div className="form-group">

                                <label htmlFor="categoryId">Category ID</label>
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
                        }
                        <div className="form-group">
                            <label htmlFor="CategoryName">Category Name</label>
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
                                {data?.data.map((option) => (
                                    <option key={option.departmentID} value={option.departmentID}>
                                        {option.departmentName}
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
}
export default CreateCategory;