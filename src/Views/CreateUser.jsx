import NavBar from "./NavBar";
import React, { useMemo, useState, useEffect } from 'react';
import "../Styles/CreateUser.scss"
import { useParams } from 'react-router-dom';
import { useGetDepartmentsQuery } from '../Services/departmentAPI';
import { useAddUserMutation, useGetUserRolesQuery, useGetUsersByIdQuery, useUpdateUserMutation } from '../Services/userApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaSync } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const CreateUser = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { id } = useParams();
    const [isUpdate, setIsUpdate] = useState(false);
    const [UserName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dayofbirth, setDayOfBirth] = useState(new Date());
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [CCCD, setCCCD] = useState('');
    const [avatar, setAvatar] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('');
    const [UserRole, setUserRole] = useState('');
    const [password, setPassword] = useState('');
    const [createdAt, setCreatedAt] = useState(new Date().toISOString().slice(0, 10));
    const { data: DepartmentOptions, isLoading, error } = useGetDepartmentsQuery()
    const { data: UserRoles } = useGetUserRolesQuery()
    const [AddUserMutation, { isLoading: isLoadingAddUser, isSuccess: isSuccess }] = useAddUserMutation();
    const [UpdateUserMutation, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate }] = useUpdateUserMutation();
    const { data: User, refetch } = useGetUsersByIdQuery(id,
        {
            skip: !id
        });
    useEffect(() => {
        if (User) {
            refetch()
        }
    }, location)
    const StatusOptions = useMemo(() => [
        { value: '1', label: 'Active' },
        { value: '2', label: 'InActive' },
    ], []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!isUpdate) {
                const result = await AddUserMutation({
                    userName: UserName,
                    email: email,
                    phoneNumber: phone,
                    dateOfBirth: dayofbirth.slice(0, 10),
                    gender: gender,
                    address: address,
                    nationalID: CCCD,
                    avatar: '',
                    departmentID: department,
                    roleID: UserRole,
                    passwordHash: password,
                    status: status,
                    createdAt: createdAt
                });
                if (result.error) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning!',
                        text: "Enter incorrect information, please check again"
                    });
                }
                else {
                    Swal.fire(
                        'New created successfully!',
                        'User created successfully',
                        'success'
                    );
                    navigate('/users');
                }
            }
            else {
                const result = await UpdateUserMutation({
                    id: id,
                    userName: UserName,
                    email: email,
                    phoneNumber: phone,
                    dateOfBirth: dayofbirth.slice(0, 10),
                    gender: gender,
                    address: address,
                    nationalID: CCCD,
                    departmentID: department,
                    avatar: avatar,
                    roleID: UserRole,
                    ...(password === "User@123" && { password: password }),
                    status: status,
                });
                if (result.error) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning!',
                        text: "Entered incorrect information, please check again"
                    });
                }
                else {
                    Swal.fire(
                        'Updated successfully!',
                        'User Updated successfully',
                        'success'
                    );
                    navigate('/users');
                }
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
        setUserName(User?.data.userName)
        setEmail(User?.data.email)
        setPhone(User?.data.phoneNumber)
        setDayOfBirth(User?.data.dateOfBirth.slice(0, 10))
        setGender(User?.data.gender)
        setAddress(User?.data.address)
        setCCCD(User?.data.nationalID)
        setDepartment(User?.data.departmentID)
        setUserRole(User?.data.roleID)
        setStatus(User?.data.status)
        setCreatedAt(User?.data.createdAt.slice(0, 10))
        setAvatar(User?.data.avatar)
    }, [User])
    return (
        <NavBar title={isUpdate ? "Update User" : "Create User"} path="Users">
            <div className="create-user-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="UserName">Name </label>
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
                        <label htmlFor="Password">Password</label>
                        <input
                            type="text"
                            id="Password"
                            placeholder={isUpdate ? "*********" : "Password : Có ít nhất 6 kí tự bao gồm 1 chữ hoa và 1 kí tự đặc biệt"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            readOnly
                        />
                        <FaSync onClick={() => setPassword("User@123")} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Phone number: There are 10 numbers starting with 0"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dayofbirth">Date Of Birth</label>
                        <input
                            type="date"
                            id="dayofbirth"
                            value={dayofbirth}
                            onChange={(e) => setDayOfBirth(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Gender">Gender</label>
                        <input
                            type="text"
                            id="Gender"
                            placeholder="Giới tính : Nam hoặc Nữ "
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
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
                        <label htmlFor="CCCD">National ID</label>
                        <input
                            type="text"
                            id="CCCD"
                            placeholder="CMND/CCCD : có 12 số "
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
                            {DepartmentOptions?.data.map((option) => (
                                <option key={option.departmentID} value={option.departmentID}>
                                    {option.departmentName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="UserRole">UserRole</label>
                        <select
                            id="UserRole"
                            value={UserRole}
                            onChange={(e) => setUserRole(e.target.value)}
                            required
                        >
                            <option value="">Select a UserRole</option>
                            {UserRoles?.data.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
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
                                <option key={option.value} value={option.label}>
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
export default CreateUser;