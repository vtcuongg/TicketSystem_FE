import NavBar from "./NavBar";
import React, { useMemo, useState } from 'react';
import "../Styles/CreateTicket.scss"
import { Editor } from '@tinymce/tinymce-react';
const CreateTicket = () => {
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [Priority, setPriority] = useState('');
    const [department, setDepartment] = useState('');
    const [description, setDescription] = useState('');
    const [attachments, setAttachments] = useState([]);
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
        { value: '1', label: 'Thap' },
        { value: '2', label: 'Trung Binh' },
        { value: '3', label: 'Cao' },
        { value: '4', label: 'Khan cap' },
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
    return (
        <NavBar title="Create Ticket" path="Ticket">
            <div className="create-ticket-container">
                <form onSubmit={handleSubmit}>
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
export default CreateTicket;