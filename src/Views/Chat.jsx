import NavBar from "./NavBar";
import React, { useState, useRef, useEffect } from 'react';
import "../Styles/Chat.scss"
import { FaSearch, FaPaperclip, FaArrowLeft } from 'react-icons/fa';

const Chat = () => {
    const [activeChatId, setActiveChatId] = useState(null);
    const messageContainerRef = useRef(null); // Tạo ref cho message container
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const handleSearchInputClick = () => {
        setIsSearch(true)
    }
    const handleSearchBackClick = (event) => {
        event.stopPropagation();
        setIsSearch(false)
    }
    const userData = {
        "data": {
            "users": [
                {
                    "id": 2,
                    "userName": "KKK",
                    "email": "user@example.com",
                    "phoneNumber": "0390278385",
                    "dateOfBirth": "2025-04-07T03:15:59.258",
                    "gender": "Nam",
                    "address": "DN",
                    "avatar": "string",
                    "nationalID": "160254076853",
                    "departmentID": 4,
                    "departmentName": "Phòng Đào tạo",
                    "roleID": 2,
                    "roleName": "User",
                    "status": "Active",
                    "createdAt": "2025-04-07T03:15:59.258"
                },
                {
                    "id": 5,
                    "userName": "Nguy?n Van A",
                    "email": "nguyenvana@example.com",
                    "phoneNumber": "0987654321",
                    "dateOfBirth": "1990-05-10T00:00:00",
                    "gender": "Nam",
                    "address": "Hà N?i, Vi?t Nam",
                    "avatar": null,
                    "nationalID": "123456789",
                    "departmentID": 1,
                    "departmentName": "HC",
                    "roleID": 4,
                    "roleName": "Employee",
                    "status": "Active",
                    "createdAt": "2025-04-07T10:34:48.9496128"
                },
                {
                    "id": 6,
                    "userName": "Nguyễn Việt Cường",
                    "email": "tranthib@example.com",
                    "phoneNumber": "0912345678",
                    "dateOfBirth": "1995-08-15T00:00:00",
                    "gender": "Nữ",
                    "address": "H? Chí Minh, Vi?t Nam",
                    "avatar": null,
                    "nationalID": "987654321",
                    "departmentID": 4,
                    "departmentName": "Phòng Đào tạo",
                    "roleID": 2,
                    "roleName": "User",
                    "status": "InActive",
                    "createdAt": "2025-04-07T10:34:48.9496128"
                },
                {
                    "id": 7,
                    "userName": "Lê Công Đạt ",
                    "email": "phamvanc@example.com",
                    "phoneNumber": "0934567890",
                    "dateOfBirth": "1988-12-20T00:00:00",
                    "gender": "Nam",
                    "address": "Ðà N?ng, Vi?t Nam",
                    "avatar": null,
                    "nationalID": "567890123",
                    "departmentID": 4,
                    "departmentName": "Phòng Đào tạo",
                    "roleID": 2,
                    "roleName": "User",
                    "status": "InActive",
                    "createdAt": "2025-04-07T10:34:48.9496128"
                },
                {
                    "id": 8,
                    "userName": "Lê Th? D",
                    "email": "lethid@example.com",
                    "phoneNumber": "0976543210",
                    "dateOfBirth": "1993-07-25T00:00:00",
                    "gender": "Nam",
                    "address": "C?n Tho, Vi?t Nam",
                    "avatar": null,
                    "nationalID": "654321987",
                    "departmentID": 4,
                    "departmentName": "Phòng Đào tạo",
                    "roleID": 2,
                    "roleName": "User",
                    "status": "Active",
                    "createdAt": "2025-04-07T10:34:48.9496128"
                },
                {
                    "id": 9,
                    "userName": "Hoàng Minh E",
                    "email": "hoangminhe@example.com",
                    "phoneNumber": "0961234567",
                    "dateOfBirth": "1985-04-05T00:00:00",
                    "gender": "Nam",
                    "address": "H?i Phòng, Vi?t Nam",
                    "avatar": null,
                    "nationalID": "321654987",
                    "departmentID": 8,
                    "departmentName": "Phòng Thanh tra - Pháp chế",
                    "roleID": 3,
                    "roleName": "Manager",
                    "status": "Active",
                    "createdAt": "2025-04-07T10:34:48.9496128"
                },
                {
                    "id": 10,
                    "userName": "Vu Th? F",
                    "email": "vuthif@example.com",
                    "phoneNumber": "0943216547",
                    "dateOfBirth": "1997-11-11T00:00:00",
                    "gender": "Nam",
                    "address": "Bình Duong, Vi?t Nam",
                    "avatar": null,
                    "nationalID": "789456123",
                    "departmentID": 9,
                    "departmentName": "Phòng Cơ sở Vật chất",
                    "roleID": 4,
                    "roleName": "Employee",
                    "status": "Active",
                    "createdAt": "2025-04-07T10:34:48.9496128"
                },
                {
                    "id": 11,
                    "userName": "Ð?ng Van G",
                    "email": "dangvang@example.com",
                    "phoneNumber": "0923456789",
                    "dateOfBirth": "1992-09-30T00:00:00",
                    "gender": "Nam",
                    "address": "Nha Trang, Vi?t Nam",
                    "avatar": null,
                    "nationalID": "456789321",
                    "departmentID": 4,
                    "departmentName": "Phòng Đào tạo",
                    "roleID": 4,
                    "roleName": "Employee",
                    "status": "Active",
                    "createdAt": "2025-04-07T10:34:48.9496128"
                },
                {
                    "id": 12,
                    "userName": "Bùi Th? H",
                    "email": "buithih@example.com",
                    "phoneNumber": "0909876543",
                    "dateOfBirth": "1998-02-14T00:00:00",
                    "gender": "Nữ",
                    "address": "Hu?, Vi?t Nam",
                    "avatar": null,
                    "nationalID": "123789654",
                    "departmentID": 3,
                    "departmentName": "Phòng Hành chính - Tổng hợp",
                    "roleID": 4,
                    "roleName": "Employee",
                    "status": "Active",
                    "createdAt": "2025-04-07T10:34:48.9496128"
                },
                {
                    "id": 13,
                    "userName": "Ngô Van I",
                    "email": "ngovani@example.com",
                    "phoneNumber": "0998765432",
                    "dateOfBirth": "1989-06-21T00:00:00",
                    "gender": "Nữ",
                    "address": "Qu?ng Ninh, Vi?t Nam",
                    "avatar": null,
                    "nationalID": "987123456",
                    "departmentID": 6,
                    "departmentName": "Phòng Kế hoạch - Tài chính",
                    "roleID": 4,
                    "roleName": "Employee",
                    "status": "Active",
                    "createdAt": "2025-04-07T10:34:48.9496128"
                },
                {
                    "id": 14,
                    "userName": "Lý Th? K",
                    "email": "lythik@example.com",
                    "phoneNumber": "0954321678",
                    "dateOfBirth": "1994-03-03T00:00:00",
                    "gender": "Nữ",
                    "address": "Vung Tàu, Vi?t Nam",
                    "avatar": null,
                    "nationalID": "654987321",
                    "departmentID": 5,
                    "departmentName": "Phòng Kỹ thuật, IT",
                    "roleID": 4,
                    "roleName": "Employee",
                    "status": "Active",
                    "createdAt": "2025-04-07T10:34:48.9496128"
                },
                {
                    "id": 17,
                    "userName": "aaa",
                    "email": "user1234@example.com",
                    "phoneNumber": "0750711152",
                    "dateOfBirth": "2025-04-07T07:38:22.133",
                    "gender": "Nam",
                    "address": "DN",
                    "avatar": "https://ticketsystem.bucket.s3.ap-southeast-2.amazonaws.com/avatars/cef5279f-dd97-40d7-9abf-496f747d03be_1178873.jpg",
                    "nationalID": "693144751705",
                    "departmentID": 1,
                    "departmentName": "HC",
                    "roleID": 5,
                    "roleName": "Admin",
                    "status": "Active",
                    "createdAt": "2025-04-07T07:38:22.133"
                },
                {
                    "id": 19,
                    "userName": "Keo",
                    "email": "useKr@example.com",
                    "phoneNumber": "0799992372",
                    "dateOfBirth": "2025-04-07T08:36:22.969",
                    "gender": "Nam",
                    "address": "ND",
                    "avatar": "string",
                    "nationalID": "421036553319",
                    "departmentID": 1,
                    "departmentName": "HC",
                    "roleID": 3,
                    "roleName": "Manager",
                    "status": "Active",
                    "createdAt": "2025-04-07T08:36:22.969"
                },
                {
                    "id": 29,
                    "userName": "Kandiess203",
                    "email": "Kandiess203@example.com",
                    "phoneNumber": "0382768783",
                    "dateOfBirth": "2025-04-12T13:49:32.332",
                    "gender": "Nam",
                    "address": "DN",
                    "avatar": "https://ticketsystem.bucket.s3.ap-southeast-2.amazonaws.com/avatars/29/2d9dc334-bf5e-4278-82bd-0be62a7f65dc_kawa4-03.avif",
                    "nationalID": "281666417455",
                    "departmentID": 5,
                    "departmentName": "Phòng Kỹ thuật, IT",
                    "roleID": 3,
                    "roleName": "Manager",
                    "status": "Active",
                    "createdAt": "2025-04-12T13:49:32.332"
                }
            ]
        }
    }

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };
    const handleRemoveAttachment = (index) => {
        const newAttachments = [...selectedFiles];
        newAttachments.splice(index, 1);
        setSelectedFiles(newAttachments);
    };
    const myUserID = 7;
    const handleChatItemClick = (userId) => {
        setActiveChatId(userId);
    };

    const chatDataDetail = [
        {
            "messageID": 31,
            "senderID": 7,
            "receiverID": 8,
            "content": "UOAA",
            "timestamp": "2025-04-15T14:21:44.3839564",
            "isRead": false,
            "attachments": [
                {
                    "fileName": "avatar-df.png",
                    "url": "https://ticketsystem.bucket.s3.ap-southeast-2.amazonaws.com/MessageaAttachments/7/d4787e1b-47db-4fca-a114-b85b49a11483_avatar-df.png"
                },
                {
                    "fileName": "Employee.jsx",
                    "url": "https://ticketsystem.bucket.s3.ap-southeast-2.amazonaws.com/MessageaAttachments/7/61a318ea-4012-4ca3-898b-f720594b5310_Employee.jsx"
                }
            ]
        },
        {
            "messageID": 30,
            "senderID": 7,
            "receiverID": 8,
            "content": "KKKK",
            "timestamp": "2025-04-15T14:03:37.975233",
            "isRead": false,
            "attachments": [
                {
                    "fileName": "avatar-df.png",
                    "url": "https://ticketsystem.bucket.s3.ap-southeast-2.amazonaws.com/MessageaAttachments//cb9cd192-b702-4c8d-affa-7f8e2e10ada2_avatar-df.png"
                }
            ]
        },
        {
            "messageID": 29,
            "senderID": 8,
            "receiverID": 7,
            "content": "1",
            "timestamp": "2025-04-12T08:26:45.1401408",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 28,
            "senderID": 7,
            "receiverID": 8,
            "content": "Hello",
            "timestamp": "2025-04-12T08:04:31.5700206",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 27,
            "senderID": 8,
            "receiverID": 7,
            "content": "Hello11111111111111111111111111111 sfsffffffffffffffffsfsffffffffffffffffssssssssssssssssssssss",
            "timestamp": "2025-04-12T08:04:25.6159166",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 11,
            "senderID": 8,
            "receiverID": 7,
            "content": "KKKKK1122",
            "timestamp": "2025-04-11T14:30:00.0207919",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 29,
            "senderID": 8,
            "receiverID": 7,
            "content": "1",
            "timestamp": "2025-04-12T08:26:45.1401408",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 28,
            "senderID": 7,
            "receiverID": 8,
            "content": "Hello",
            "timestamp": "2025-04-12T08:04:31.5700206",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 27,
            "senderID": 8,
            "receiverID": 7,
            "content": "Hello11111111111111111111111111111 sfsffffffffffffffffsfsffffffffffffffffssssssssssssssssssssss",
            "timestamp": "2025-04-12T08:04:25.6159166",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 11,
            "senderID": 8,
            "receiverID": 7,
            "content": "KKKKK1122",
            "timestamp": "2025-04-11T14:30:00.0207919",
            "isRead": false,
            "attachments": []
        }, {
            "messageID": 29,
            "senderID": 8,
            "receiverID": 7,
            "content": "1",
            "timestamp": "2025-04-12T08:26:45.1401408",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 28,
            "senderID": 7,
            "receiverID": 8,
            "content": "Hello",
            "timestamp": "2025-04-12T08:04:31.5700206",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 27,
            "senderID": 8,
            "receiverID": 7,
            "content": "Hello11111111111111111111111111111 sfsffffffffffffffffsfsffffffffffffffffssssssssssssssssssssss",
            "timestamp": "2025-04-12T08:04:25.6159166",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 11,
            "senderID": 8,
            "receiverID": 7,
            "content": "KKKKK1122",
            "timestamp": "2025-04-11T14:30:00.0207919",
            "isRead": false,
            "attachments": []
        }, {
            "messageID": 29,
            "senderID": 8,
            "receiverID": 7,
            "content": "1",
            "timestamp": "2025-04-12T08:26:45.1401408",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 28,
            "senderID": 7,
            "receiverID": 8,
            "content": "Hello",
            "timestamp": "2025-04-12T08:04:31.5700206",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 27,
            "senderID": 8,
            "receiverID": 7,
            "content": "Hello11111111111111111111111111111 sfsffffffffffffffffsfsffffffffffffffffssssssssssssssssssssss",
            "timestamp": "2025-04-12T08:04:25.6159166",
            "isRead": false,
            "attachments": []
        },
        {
            "messageID": 11,
            "senderID": 8,
            "receiverID": 7,
            "content": "KKKKK1122",
            "timestamp": "2025-04-11T14:30:00.0207919",
            "isRead": false,
            "attachments": []
        }
    ];
    const chatData = [
        {
            "userID": 8,
            "fullName": "Lê Th? D",
            "email": "lethid@example.com",
            "avatar": "",
            "lastMessageId": 31,
            "isRead": false,
            "lastMessageContent": "UOAA",
            "lastMessageTime": "2025-04-15T14:21:44.3839564",
            "lastMessageSenderID": 7,
            "isOnline": true,
            "lastOnline": null,
            "attachments": [],
        },
        {
            "userID": 9,
            "fullName": "Hoàng Minh E",
            "email": "hoangminhe@example.com",
            "avatar": "",
            "lastMessageId": 17,
            "isRead": true,
            "lastMessageContent": "HHHH11222",
            "lastMessageTime": "2025-04-12T03:20:29.8660194",
            "lastMessageSenderID": 7,
            "isOnline": false,
            "lastOnline": null,
            "attachments": []
        },
        {
            "userID": 6,
            "fullName": "Nguyễn Việt Cường",
            "email": "tranthib@example.com",
            "avatar": "",
            "lastMessageId": 10,
            "isRead": false,
            "lastMessageContent": "KKKKK1122",
            "lastMessageTime": "2025-04-11T14:29:54.3913319",
            "lastMessageSenderID": 6,
            "isOnline": true,
            "lastOnline": null,
            "attachments": []
        },
        {
            "userID": 2,
            "fullName": "KKK",
            "email": "user@example.com",
            "avatar": null,
            "lastMessageId": 7,
            "isRead": true,
            "lastMessageContent": "KKKKKKK7",
            "lastMessageTime": "2025-04-11T14:01:16.1635689",
            "lastMessageSenderID": 2,
            "isOnline": true,
            "lastOnline": null,
            "attachments": []
        }
    ];
    const currentChatUser = chatData.find(user => user.userID === activeChatId);
    const currentChatUser1 = userData.data.users.find(user => user.id === activeChatId);
    const filteredChatDetail = chatDataDetail.filter(
        msg => (msg.senderID === myUserID && msg.receiverID === activeChatId) || (msg.senderID === activeChatId && msg.receiverID === myUserID)
    );
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [filteredChatDetail, activeChatId]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();

        if (isToday) {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        } else {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${hours}:${minutes} , ${day}/${month}/${year}`;
        }
    };

    const getTimeDifference = (dateTimeString) => {
        const now = new Date();
        const past = new Date(dateTimeString);
        const diffInSeconds = Math.floor((now - past) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} giây trước`;
        } else if (diffInSeconds < 3600) {
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            return `${diffInMinutes} phút trước`;
        } else if (diffInSeconds < 86400) {
            const diffInHours = Math.floor(diffInSeconds / 3600);
            return `${diffInHours} giờ trước`;
        } else {
            const diffInDays = Math.floor(diffInSeconds / 86400);
            return `${diffInDays} ngày trước`;
        }
    };
    return (
        <NavBar title="Chat" showHeaderLink={false}>
            <div className="main-container">
                <div className="Main-left">

                    <div className={`chat-search-bar ${isSearch ? 'active' : ''}`} onClick={handleSearchInputClick}>
                        {isSearch && (<FaArrowLeft className="Back-icon" onClick={handleSearchBackClick} />)}
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Tìm kiếm trên Messenger"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {isSearch ? (
                        <div className="user-list">
                            <h2>List User</h2>
                            {userData.data.users.filter(user =>
                                user.userName.toLowerCase().includes(searchTerm.toLowerCase())
                            ).length > 0 ? (
                                userData.data.users
                                    .filter(user =>
                                        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map(user => (
                                        <div className="user-item" key={user.userID} onClick={() => {
                                            handleChatItemClick(user.id)
                                        }}>
                                            <div className="avatar">
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt={user.userName} />
                                                ) : (
                                                    <span>{user.userName.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div className="user-info">
                                                <div className="user-name">{user.userName}</div>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="no-result">Không tìm thấy kết quả</div>
                            )}
                        </div>
                    ) : (
                        <div className="chat-list">
                            {chatData.map(chat => (
                                <div
                                    className={`chat-item ${activeChatId === chat.userID ? 'active' : ''}`}
                                    key={chat.userID}
                                    onClick={() => handleChatItemClick(chat.userID)}
                                >
                                    <div className="avatar">
                                        {chat.avatar ? <img src={chat.avatar} alt={chat.fullName} /> : <span>{chat.fullName.charAt(0)}</span>}
                                    </div>
                                    <div className={`online-status ${chat.isOnline ? 'online' : ''}`}></div>
                                    <div className={"message-info"}>
                                        <div className={`user-name ${activeChatId === chat.userID ? 'active' : ''}`}>{chat.fullName}</div>
                                        <div className={`last-message ${!chat.isRead ? 'unread' : ''}`}>
                                            {chat.lastMessageSenderID === myUserID ? 'Bạn: ' : ''}
                                            {chat.lastMessageContent}
                                        </div>
                                    </div>
                                    <div className="last-active">{getTimeDifference(chat.lastMessageTime)}</div>
                                    <div className="options">
                                        <span>...</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                <div className="Main-right">
                    {currentChatUser ? (
                        <div className="chat-header">
                            <div className="user-info">
                                <div className="avatar">
                                    {currentChatUser.avatar ? <img src={currentChatUser.avatar} alt={currentChatUser.fullName} /> : <span>{currentChatUser.fullName.charAt(0)}</span>}
                                </div>
                                <div className={`online-status-icon ${currentChatUser.isOnline ? 'online' : ''}`}></div>
                                <div className="user-details">
                                    <div className="user-name">{currentChatUser.fullName}</div>
                                    <div className="online-status">{currentChatUser.isOnline ? 'Đang hoạt động' : 'Không hoạt động'}</div>
                                </div>
                            </div>
                        </div>
                    ) : currentChatUser1 ? (
                        <div className="chat-header">
                            <div className="user-info">
                                <div className="avatar">
                                    {currentChatUser1.avatar ? (
                                        <img src={currentChatUser1.avatar} alt={currentChatUser1.userName} />
                                    ) : (
                                        <span>{currentChatUser1.userName.charAt(0)}</span>
                                    )}
                                </div>
                                <div className="user-details">
                                    <div className="user-name">{currentChatUser1.userName}</div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <div
                        className={`message-container ${selectedFiles.length > 0 ? 'isAttachment' : ''}`}
                        ref={messageContainerRef}
                    >
                        {filteredChatDetail.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map(msg => (
                            <div key={msg.messageID} className={`message ${msg.senderID === myUserID ? 'sent' : 'received'}`}>
                                <div className="message-inner">
                                    <div className="message-content">
                                        {msg.content}
                                        {msg.attachments && msg.attachments.map(attachment => (
                                            <div key={attachment.fileName} className="attachment">
                                                <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.fileName}</a>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="message-time">{formatDate(msg.timestamp)}</div>
                                </div>
                            </div>
                        ))}

                    </div>
                    {(currentChatUser || currentChatUser1) && (
                        <div className="input-container">
                            <div className="attachment-container">
                                {selectedFiles.length > 0 && (
                                    <div className="attachments-preview">
                                        <div className="attachments-list"> {/* Sử dụng div để chứa các thẻ */}
                                            {Array.from(selectedFiles).map((file, index) => (
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
                            <div className="chat-input-area">
                                <div className="input-field">
                                    <input type="text" placeholder="Write your message..." />
                                </div>
                                <div className="input-actions">
                                    <div className="attach-icon" onClick={() => document.getElementById('fileInput').click()} >
                                        <FaPaperclip />
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        multiple
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <button className="send-button">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </NavBar >
    )
}

export default Chat;