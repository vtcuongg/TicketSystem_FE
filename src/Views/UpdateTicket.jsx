import NavBar from "./NavBar";
import React, { useMemo, useState, useEffect, useRef } from 'react';
import "../Styles/UpdateTicket.scss"
import { Editor } from '@tinymce/tinymce-react';
import avatar from "../assets/Images/avatar-df.png"
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { useUpdateTicketMutation, useGetTicketsQuery } from '../Services/ticketApi';
import { useGetDepartmentsQuery } from '../Services/departmentAPI';
import { useGetCategoriesByDepartmentQuery } from '../Services/categoryApi';
import { useGetAllUsersQuery } from "../Services/userApi";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import { useAssignUsersToTicketMutation } from '../Services/ticketAssignmentApi';
import { jwtDecode } from 'jwt-decode';
import { useCreateNotificationMutation } from "../Services/NotificationApi"
import * as signalR from "@microsoft/signalr";
import Loading from "./Loading";

const UpdateTicket = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [ticketId, setTicketId] = useState('');
    const [status_init, setStatus] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [CreatedAt, setCreatedAt] = useState('');
    const [UpdateAt, setUpdateAt] = useState('');
    const [DueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [Priority, setPriority] = useState('');
    const [department, setDepartment] = useState('');
    const [description, setDescription] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [assignTo, setAssignTo] = useState([]);
    const [formData, setFormData] = useState(null);
    const [user, setUser] = useState(null);
    const newConnection = useRef(null);
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
        newConnection.current = new signalR.HubConnectionBuilder()
            .withUrl("https://vietcuong-001-site1.jtempurl.com/chathub", {
                accessTokenFactory: () => token,
            })
            .withAutomaticReconnect()
            .build();
        newConnection.current.start()
        return () => {
            newConnection.current.stop();
        };
    }, []);
    const { data: dataTicket, isLoading: isLoadingTicket, error: errorTicket, refetch } = useGetTicketsQuery({ TicketId: id });
    useEffect(() => {
        refetch()
    }, [location.pathname]);
    useEffect(() => {
        setStatus(dataTicket?.[0]?.status)
    }, [dataTicket]);
    useEffect(() => {
        setFormData({
            ticketID: dataTicket?.[0]?.ticketID,
            createdBy: dataTicket?.[0]?.createdBy,
            Title: dataTicket?.[0]?.title,
            CategoryID: dataTicket?.[0]?.categoryID,
            DepartmentID: dataTicket?.[0]?.departmentID,
            Priority: dataTicket?.[0]?.priority,
            Description: dataTicket?.[0]?.description,
            Status: dataTicket?.[0]?.status,
            assingTo: dataTicket?.[0]?.assignedUsers?.map(user => ({
                value: user.assignedTo,
                label: user.userName,
                avatar: user.avatar,
                userName: user.userName,
            })) || [],
            createdAt: dataTicket?.[0]?.createdAt?.slice(0, 10),
            UpdateAt: new Date().toISOString().slice(0, 10),
            DueDate: dataTicket?.[0]?.dueDate ? dataTicket[0].dueDate.slice(0, 10) : ''

        })
    }, [dataTicket])

    const { data: DepartmentOptions, isLoading: isLoadingDepartments, error: departmentError } = useGetDepartmentsQuery();
    const {
        data: categoryOptions = [],
        isLoading: loadingCategories,
        error: errorCategory
    } = useGetCategoriesByDepartmentQuery(formData?.DepartmentID, {
        skip: !formData?.DepartmentID,
    });
    const { data: Users, isLoading: isLoadingUserData, error: errorUserData } = useGetAllUsersQuery();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ['CategoryId', 'DepartmentId'];
        const newValue = numericFields.includes(name) ? Number(value) : value;
        setFormData(prev => ({
            ...prev,
            [name]: newValue,
        }));
    };
    const [updateTicket, { isLoading, isSuccess, error }] = useUpdateTicketMutation();
    const [createNotification, { isLoading: isLoadingCreate }] = useCreateNotificationMutation();
    const [assignToUser] = useAssignUsersToTicketMutation();
    const handleEditorChange = (content, editor) => {
        setFormData(prev => ({
            ...prev,
            Description: content,
        }));
    };

    const PriorityOptions = useMemo(() => [
        { value: '1', label: 'Thấp' },
        { value: '2', label: 'Trung bình' },
        { value: '3', label: 'Cao' },
        { value: '4', label: 'Khẩn cấp' },
    ], []);

    const StatusOptions = useMemo(() => [
        { value: '1', label: 'Mới' },
        { value: '2', label: 'Đang xử lý' },
        { value: '3', label: 'Chờ xác nhận' },
        { value: '4', label: 'Hoàn thành' },
        { value: '5', label: 'Đã hủy' },
    ], []);

    useEffect(() => {
        setAttachments(dataTicket?.[0]?.attachments)
    }, [dataTicket]);

    const handleAttachmentChange = (event) => {
        setAttachments([...attachments, ...event.target.files]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const submitData = new FormData();
        submitData.append("ticketID", formData.ticketID);
        submitData.append("createdBy", formData.createdBy);
        submitData.append("title", formData.Title);
        submitData.append("categoryID", formData.CategoryID);
        submitData.append("departmentID", formData.DepartmentID);
        submitData.append("priority", formData.Priority);
        submitData.append("description", formData.Description);
        submitData.append("status", formData.Status);
        submitData.append("createdAt", formData.createdAt);
        submitData.append("updatedAt", formData.UpdateAt);
        submitData.append("dueDate", formData.DueDate);
        attachments.forEach(file => {
            submitData.append("attachments", file);
        });
        try {
            await updateTicket(submitData).unwrap();
            const assignedUserIds = formData.assingTo.map(user => user.value);
            if (assignedUserIds.length > 0) {
                const assignPayload = {
                    ticketID: formData.ticketID,
                    assignedToList: assignedUserIds
                };
                await assignToUser(assignPayload).unwrap();
            }
            const senderID = user?.id
            const receiverIDs = [formData.createdBy, ...assignedUserIds];
            const now = new Date().toISOString();
            const getNotificationMessage = (status, ticketID, receiverID, assignedUserIds, createdBy, DueDate) => {
                const dueDate = new Date(DueDate);
                const today = new Date();
                dueDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);
                if (status_init === status) {
                    return `Ticket #${ticketID} vừa được cập nhật.`;
                }
                if (status !== 'Hoàn thành') {
                    if (dueDate < today) {
                        return `Ticket #${ticketID} 🔥 Deadline`;
                    }
                }
                if (status === 'Đang xử lý') {
                    if (receiverID === createdBy) {
                        return `Ticket #${ticketID} đang được xử lý.`;
                    }
                }
                switch (status) {
                    case 'Chờ xác nhận':
                        return `Ticket #${ticketID} đang chờ xác nhận.`;
                    case 'Hoàn thành':
                        return `Ticket #${ticketID} đã được hoàn thành.`;
                    case 'Đã hủy':
                        return `Ticket #${ticketID} đã bị hủy.`;
                    case 'Mới':
                        if (assignedUserIds.includes(receiverID)) {
                            return `Ticket #${ticketID} đã được giao đến cho bạn.`;
                        }
                }
            };
            for (const receiverID of receiverIDs) {
                const message = getNotificationMessage(formData.Status, formData.ticketID, receiverID, assignedUserIds, formData.createdBy, formData.DueDate);
                const notificationPayload = {
                    senderID: senderID,
                    receiverID: receiverID,
                    ticketID: formData.ticketID,
                    message: message,
                    isRead: false,
                    createdAt: now,
                };
                await createNotification(notificationPayload).unwrap();
                await newConnection.current.invoke("SendNotification");
            }

            Swal.fire(
                'Success!',
                'Ticket Updated Successfully',
                'success'
            );
            navigate('/my-ticket')
        } catch (err) {

        }

    };
    const handleRemoveAttachment = (index) => {
        const newAttachments = [...attachments];
        newAttachments.splice(index, 1);
        setAttachments(newAttachments);
    };
    const handleAssigntToChange = (selectedOptions) => {

        setFormData(prev => ({
            ...prev,
            assingTo: selectedOptions || []
        }));
    };
    const OptionComponent = (props) => {
        return (
            <div
                className={`${props.className} select__option`}
                onClick={() => {
                    if (props.selectOption) {
                        props.selectOption(props.data);
                    }
                }}
            >     <img
                    src={props.data.avatar}
                    alt={props.data.userName}
                    className="user-avatar-option" />
                <span>{props.data.userName}</span>
            </div>
        )
    };
    const MultiValueComponent = (props) => (
        <div className={`${props.className} select__multi-value`}>
            <img
                src={props.data.avatar}
                alt={props.data.userName}
                className="user-avatar-multi-value" />
            <span>{props.data.userName}</span>
        </div>
    );
    if (dataTicket && formData && user) {
        return (
            <NavBar title="Update Ticket" path="Ticket">
                <div className="update-ticket-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="ticketId">TicketID</label>
                            <input
                                type="text"
                                id="ticketId"
                                placeholder="TicketID"
                                value={formData?.ticketID}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="Title"
                                placeholder="Title"
                                value={formData?.Title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="CreatedBy">Author</label>
                            <input
                                type="text"
                                id="CreatedBy"
                                placeholder="CreatedBy"
                                value={dataTicket?.[0]?.createdByName}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="assignTo">Assignee</label>
                            <Select
                                id="assignTo"
                                value={formData?.assingTo}
                                onChange={handleAssigntToChange}
                                isMulti
                                options={
                                    Users?.data.users
                                        .filter(u => u.departmentID === user.departmentID)
                                        .map(u => ({
                                            value: u.id,
                                            label: u.userName,
                                            avatar: u.avatar,
                                            userName: u.userName
                                        }))
                                }
                                getOptionLabel={(option) => option.label}
                                getOptionValue={(option) => option.value}
                                components={{ Option: OptionComponent, MultiValueLabel: MultiValueComponent }}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                isDisabled={user?.roleName !== "Manager"}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Department">Department</label>
                            <select
                                id="Department"
                                name="DepartmentID"
                                value={formData?.DepartmentID}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a Department</option>
                                {DepartmentOptions?.data.map((option) => (
                                    <option key={option.departmentID} value={option.departmentID}>
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
                                value={formData?.CategoryID}
                                onChange={handleChange}
                                required
                                disabled={!formData?.DepartmentID}
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
                                value={formData?.Priority}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a Priority</option>
                                {PriorityOptions.map((option) => (
                                    <option key={option.label} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Status">Status</label>
                            <select
                                id="Status"
                                name="Status"
                                value={formData?.Status}
                                onChange={handleChange}
                                required
                                disabled={user?.roleName === "User"}
                            >
                                <option value="">Select a Status</option>
                                {StatusOptions.map((option) => (
                                    <option key={option.label} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="CreatedAt">Created</label>
                            <input
                                type="date"
                                id="CreatedAt"
                                name="createdAt"
                                value={formData?.createdAt}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="UpdateAt">Updated</label>
                            <input
                                type="date"
                                id="UpdateAt"
                                name="UpdateAt"
                                value={formData?.UpdateAt}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="DueDate">Due Date</label>
                            <input
                                type="date"
                                id="DueDate"
                                name="DueDate"
                                value={formData?.DueDate}
                                onChange={handleChange}
                                readOnly={user?.roleName !== "Manager"}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Ticket Description</label>
                            <Editor
                                apiKey="bn972j3oqquoc6n2870a4qxvsrmz16es2n5pgp2ny2lbsluk"
                                value={formData?.Description}
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

                                {attachments?.length > 0 && (
                                    <div className="attachments-preview">
                                        <div className="attachments-list">
                                            {Array.from(attachments).map((file, index) => (
                                                <div key={file.fileName ? file.fileName : file.name} className="attachment-item">
                                                    <span> <a style={{ color: 'white', textDecoration: 'none' }} href={file.url} target="_blank" rel="noopener noreferrer">
                                                        {file.fileName || file.name}
                                                    </a></span>
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
                </div >
            </NavBar >
        )
    }
    else {
        return (
            < Loading />
        )
    }
}
export default UpdateTicket;