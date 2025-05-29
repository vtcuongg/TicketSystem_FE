import NavBar from "./NavBar";
import React, { useMemo, useState, useEffect } from 'react';
import "../Styles/CreateTicket.scss"
import { Editor } from '@tinymce/tinymce-react';
import { useCreateTicketMutation } from '../Services/ticketApi';
import { useGetDepartmentsQuery } from '../Services/departmentAPI';
import { useGetCategoriesByDepartmentQuery } from '../Services/categoryApi';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const CreateTicket = ({ onLogout }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp > currentTime) {
                    setUser(JSON.parse(storedUser));
                } else {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                }
            } catch (err) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
            }
        }
    }, []);
    const [attachments, setAttachments] = useState([]);
    const [formData, setFormData] = useState({
        Title: '',
        CategoryID: '',
        DepartmentID: '',
        Priority: '',
        Description: '',
        Status: 'Mới',
    });
    useEffect(() => {
        if (user?.id) {
            setFormData(prev => ({
                ...prev,
                CreatedBy: user.id
            }));
        }
    }, [user?.id]);
    const { data: departments, isLoading: isLoadingDepartments, error: departmentError } = useGetDepartmentsQuery();
    const {
        data: categoryOptions = [],
        isLoading: loadingCategories,
        error: errorCategory
    } = useGetCategoriesByDepartmentQuery(formData.DepartmentID, {
        skip: !formData.DepartmentID,
    });
    const PriorityOptions = useMemo(() => [
        { value: '1', label: 'Thấp' },
        { value: '2', label: 'Trung bình' },
        { value: '3', label: 'Cao' },
        { value: '4', label: 'Khẩn cấp' },
    ], []);
    const [createTicket, { isLoading, isSuccess, error }] = useCreateTicketMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['CategoryId', 'DepartmentId'];
        const newValue = numericFields.includes(name) ? Number(value) : value;
        setFormData(prev => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleEditorChange = (content, editor) => {
        setFormData(prev => ({
            ...prev,
            Description: content,
        }));
    };

    const handleAttachmentChange = (event) => {
        setAttachments([...attachments, ...event.target.files]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("Title", formData.Title);
        formDataToSend.append("Description", formData.Description);
        formDataToSend.append("Priority", formData.Priority);
        formDataToSend.append("Status", formData.Status);
        formDataToSend.append("CreatedBy", user.id);
        if (formData.DepartmentID) formDataToSend.append("DepartmentID", formData.DepartmentID);
        if (formData.CategoryID) formDataToSend.append("CategoryID", formData.CategoryID);
        attachments.forEach((file) => {
            formDataToSend.append("Attachments", file);
        });
        try {
            await createTicket(formDataToSend).unwrap();
            Swal.fire(
                'Thành công!',
                'Ticket đã được tạo thành công.',
                'success'
            );
            navigate('/my-ticket')
        } catch (err) {
            console.error('Lỗi khi tạo ticket:', err);
        }
    };
    const handleRemoveAttachment = (index) => {
        const newAttachments = [...attachments];
        newAttachments.splice(index, 1);
        setAttachments(newAttachments);
    };
    if (departments && user) {
        return (
            <NavBar title="Create Ticket" path="Ticket" onLogout={onLogout}>
                <div className="create-ticket-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="Title"
                                name="Title"
                                placeholder="Title"
                                value={formData.Title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Department">Department</label>
                            <select
                                id="Department"
                                name="DepartmentID"
                                value={formData.DepartmentID}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a Department</option>
                                {departments?.data.map((option) => (
                                    <option key={option.departmentId} value={option.departmentID}>
                                        {option.departmentName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category"> Category</label>
                            <select
                                id="category"
                                name="CategoryID"
                                value={formData.CategoryID}
                                onChange={handleChange}
                                required
                                disabled={!formData.DepartmentID}
                            >
                                <option value="">Select a category</option>
                                {categoryOptions?.map((option) => (
                                    <option key={option.catgoryID} value={option.categoryID}>
                                        {option.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Priority">Priority</label>
                            <select
                                id="Priority"
                                name="Priority"
                                value={formData.Priority}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a Priority</option>
                                {PriorityOptions.map((option) => (
                                    <option key={option.value} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Ticket Description</label>
                            <Editor
                                apiKey="bn972j3oqquoc6n2870a4qxvsrmz16es2n5pgp2ny2lbsluk"
                                value={formData.Description}
                                onEditorChange={handleEditorChange}
                                init={{
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount',
                                        'textcolor',
                                        'heading',
                                        'fontselect',
                                        'formatselect'
                                    ],
                                    toolbar: 'heading | formatselect |undo redo | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: `
                                    body { 
                                      font-family: Helvetica, Arial, sans-serif; 
                                      font-size: 14px; 
                                      color: white; 
                                    }
                                  `,
                                    statusbar: false,
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="attachment">Attachment</label>
                            <div className="file-upload-container">
                                <input
                                    type="file"
                                    id="attachment"
                                    multiple
                                    onChange={handleAttachmentChange}
                                    className="file-upload-input"
                                />
                                <div className="file-drop-area">
                                    Drop files here to upload
                                </div>
                                {attachments.length > 0 && (
                                    <div className="attachments-preview">
                                        <div className="attachments-list"> {/* Sử dụng div để chứa các thẻ */}
                                            {Array.from(attachments).map((file, index) => (
                                                <div key={file.name} className="attachment-item">
                                                    <span>{file.name}</span>
                                                    <button type="button" className="remove-attachment" onClick={() => handleRemoveAttachment(index)}>
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
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
export default CreateTicket;