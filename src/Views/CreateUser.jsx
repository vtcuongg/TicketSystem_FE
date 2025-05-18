import NavBar from "./NavBar";
import React, { useMemo, useState, useEffect } from 'react';
import "../Styles/CreateUser.scss"
import { useParams } from 'react-router-dom';
const CreateUser = () => {
    const { id } = useParams();
    const [isUpdate, setIsUpdate] = useState(false);
    const [UserName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dayofbirth, setDayOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [CCCD, setCCCD] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const DepartmentOptions = useMemo(() => [
        { value: '1', label: 'Technical SupportD' },
        { value: '2', label: 'Billing InquiryD' },
        { value: '3', label: 'Feature RequestD' },
        { value: '4', label: 'OtherD' },
    ], []);
    const StatusOptions = useMemo(() => [
        { value: '1', label: 'Active' },
        { value: '2', label: 'InActive' },
    ], []);
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
        <NavBar title={isUpdate ? "Update User" : "Create User"} path="Users">
            <div className="create-user-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="UserName">Họ và tên </label>
                        <input
                            type="text"
                            id="UserName"
                            placeholder="Họ và tên"
                            value={UserName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <input
                            type="text"
                            id="Email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">SDT</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dayofbirth">Ngày sinh</label>
                        <input
                            type="date"
                            id="dayofbirth"
                            value={dayofbirth}
                            onChange={(e) => setDayOfBirth(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Gender">Giới tính</label>
                        <input
                            type="text"
                            id="Gender"
                            placeholder="Giới tính"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CCCD">CMND/CCCD</label>
                        <input
                            type="text"
                            id="CCCD"
                            placeholder="CMND/CCCD"
                            value={CCCD}
                            onChange={(e) => setCCCD(e.target.value)}
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
                        <label htmlFor="Status">Trạng thái</label>
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
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
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
export default CreateUser;