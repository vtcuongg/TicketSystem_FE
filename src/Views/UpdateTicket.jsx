import NavBar from "./NavBar";
import React, { useMemo, useState } from 'react';
import "../Styles/UpdateTicket.scss"
import { Editor } from '@tinymce/tinymce-react';
import avatar from "../assets/Images/avatar-df.png"
import Select from 'react-select';
const UpdateTicket = () => {
    const [title, setTitle] = useState('');
    const [ticketId, setTicketId] = useState('');
    const [status, setStatus] = useState('');
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
    const categoryOptions = useMemo(() => [
        { value: 'technical', label: 'Technical Support' },
        { value: 'billing', label: 'Billing Inquiry' },
        { value: 'feature', label: 'Feature Request' },
        { value: 'other', label: 'Other' },
    ], []);
    const DepartmentOptions = useMemo(() => [
        { value: '1', label: 'Technical SupportD' },
        { value: '2', label: 'Billing InquiryD' },
        { value: '3', label: 'Feature RequestD' },
        { value: '4', label: 'OtherD' },
    ], []);
    const PriorityOptions = useMemo(() => [
        { value: '1', label: 'ThấpThấp' },
        { value: '2', label: 'Trung Bình' },
        { value: '3', label: 'Cao' },
        { value: '4', label: 'Khẩn cấp' },
    ], []);

    const StatusOptions = useMemo(() => [
        { value: '1', label: 'Mới' },
        { value: '2', label: 'Đang xử lý' },
        { value: '3', label: 'Chờ xác nhậnnhận' },
        { value: '4', label: 'Hoàn thành' },
        { value: '5', label: 'Đã hủy' },
        { value: '6', label: 'Cháy Deadline' },
    ], []);
    const Users = useMemo(() => [
        { Id: '1', Name: 'Nguyen Viet Cuong', Avatar: avatar },
        { Id: '2', Name: 'BBBBBBBBB', Avatar: avatar },
        { Id: '3', Name: 'CCCCCCCCC', Avatar: avatar },
        { Id: '4', Name: 'DDDDDDDDD', Avatar: avatar },
    ], []);
    const handleEditorChange = (content, editor) => {
        setDescription(content);
    };

    const handleAttachmentChange = (event) => {
        setAttachments([...attachments, ...event.target.files]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

    };
    const handleRemoveAttachment = (index) => {
        const newAttachments = [...attachments];
        newAttachments.splice(index, 1);
        setAttachments(newAttachments);
    };
    const handleAssigntToChange = (selectedOptions) => {
        setAssignTo(selectedOptions || []);
    };

    const OptionComponent = (props) => (
        <div
            className={`${props.className} select__option`} // Đảm bảo className được áp dụng
            onClick={() => {
                if (props.selectOption) {
                    props.selectOption(props.data);
                }
            }}
        >     <img
                src={props.data.Avatar}
                alt={props.data.Name}
                className="user-avatar-option" />
            <span>{props.data.Name}</span>
        </div>
    );
    const MultiValueComponent = (props) => (
        <div className={`${props.className} select__multi-value`}>
            <img
                src={props.data.Avatar}
                alt={props.data.Name}
                className="user-avatar-multi-value" />
            <span>{props.data.Name}</span>
        </div>
    );

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
                            value={ticketId}
                            onChange={(e) => setTicketId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CreatedBy">CreatedBy</label>
                        <input
                            type="text"
                            id="CreatedBy"
                            placeholder="CreatedBy"
                            value={createdBy}
                            onChange={(e) => setCreatedBy(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="assignTo">Assign To</label>
                        <Select
                            id="assignTo"
                            value={assignTo}
                            onChange={handleAssigntToChange}
                            isMulti
                            options={Users.map(user => ({ value: user.Id, label: user.Name, ...user }))}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            components={{ Option: OptionComponent, MultiValueLabel: MultiValueComponent }}
                            className="basic-multi-select"
                            classNamePrefix="select"
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
                    <div className="form-group">
                        <label htmlFor="category"> Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            disabled={!department}
                        >
                            <option value="">Select a category</option>
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Priority">Priority</label>
                        <select
                            id="Priority"
                            value={Priority}
                            onChange={(e) => setPriority(e.target.value)}
                            required
                        >
                            <option value="">Select a Priority</option>
                            {PriorityOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Status">Status</label>
                        <select
                            id="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="">Select a Status</option>
                            {StatusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="CreatedAt">CreatedAt</label>
                        <input
                            type="date"
                            id="CreatedAt"
                            value={CreatedAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="UpdateAt">UpdateAt</label>
                        <input
                            type="date"
                            id="UpdateAt"
                            value={UpdateAt}
                            onChange={(e) => setUpdateAt(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="DueDate">DueDate</label>
                        <input
                            type="date"
                            id="DueDate"
                            value={DueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Ticket Description</label>
                        <Editor
                            apiKey="bn972j3oqquoc6n2870a4qxvsrmz16es2n5pgp2ny2lbsluk" // Replace with your TinyMCE API key
                            value={description}
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
export default UpdateTicket;