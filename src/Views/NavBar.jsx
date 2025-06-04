import React, { useState, useRef, useEffect } from 'react';
import '../Styles/NavBar.scss';
import '../Styles/Notification.scss';
import logo from '../assets/Images/logo.png'
import avatar from '../assets/Images/avatar-df.png';
import { FaBuilding, FaTasks, FaArrowLeft, FaSearch, FaCog, FaBell, FaCommentDots, FaBars, FaChevronDown, FaArrowRight, FaCaretLeft, FaFacebookMessenger, FaPaperclip } from 'react-icons/fa';
import {
    FaTicketAlt,
    FaCaretDown,
    FaCaretRight,
    FaChartPie,
    FaUsers
} from 'react-icons/fa';
import { useGetAllUsersQuery } from "../Services/userApi";
import { useGetUserMessagesQuery, useGetMessagesBetweenUsersQuery, useSendMessageMutation } from "../Services/chatApi";
import { useGetNotificationByIdQuery } from "../Services/NotificationApi"
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from '../Stores/authSlice';
const NavBar = ({ children, title, path, showHeaderLink = true }) => {
    const [isTicketOpen, setIsTicketOpen] = useState(false);
    const [isCustomerOpen, setIsCustomerOpen] = useState(false)
    const [isReportOpen, setIsReportOpen] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovering_TK, setIsHovering_TK] = useState(false);
    const [isHovering_CT, setIsHovering_CT] = useState(false);
    const [isDropdownAvatarOpen, setIsDropdownAvatarOpen] = useState(false);
    const [isChatListOpen, setIsChatListOpen] = useState(false);
    const messageContainerRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isChatDetailOpen, setIsChatDetailOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false)
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp > currentTime) {
                    setUser(JSON.parse(storedUser));
                    setIsAdmin(JSON.parse(storedUser).roleName === 'Admin');
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

    const navigate = useNavigate();
    const { data: NotificaitonData, isLoading: isLoadingNotificaitonData, error: errorNotificaitonData, refetch: refetchNotification } = useGetNotificationByIdQuery(
        user?.id,
        { skip: !user }
    );
    const [sendMessage] = useSendMessageMutation();
    const handleSendMessage = async () => {
        if (!messageText && selectedFiles.length === 0) return;

        try {
            await sendMessage({
                senderId: user?.id,
                receiverId: activeChatId,
                content: messageText,
                attachments: selectedFiles
            }).unwrap();

            setMessageText("");
            setSelectedFiles([]);
            refetchChatData();
            refetchChatDataDetail()
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    }
    useEffect(() => {
        if (title == "Chat") {
            setIsChatOpen(true);
        }
        else if (title == "Report") {
            setIsReportOpen(true);
        }
        else if (title == "Employee List") {
            setIsCustomerOpen(true)
        }
        else if (title == "Create Ticket" || title == "All Ticket") {
            setIsTicketOpen(true)
        }
    }, [title])
    const toggleCategories = () => {
        setIsCategoriesOpen(!isCategoriesOpen);
        setIsDepartmentOpen(false);
        setIsUserOpen(false);

    };
    const toggleNotificationOpen = () => {

        setIsNotificationOpen(!isNotificationOpen);
        setIsChatListOpen(false);
        setIsDropdownAvatarOpen(false);
        refetchNotification()
    };
    const toggleDapartment = () => {
        setIsDepartmentOpen(!isDepartmentOpen);
        setIsUserOpen(false);
        setIsCategoriesOpen(false);

    };
    const toggleUser = () => {
        setIsUserOpen(!isUserOpen);
        setIsCategoriesOpen(false);
        setIsDepartmentOpen(false);

    };
    const handleSearchInputClick = () => {
        setIsSearch(true)
    }
    const handleSearchBackClick = (event) => {
        event.stopPropagation();
        setIsSearch(false)
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
    const HandleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const [activeChatId, setActiveChatId] = useState(null);
    const handleChatItemClick = (userId) => {
        setActiveChatId(userId);
        setIsChatDetailOpen(true);
        setIsChatListOpen(false)
    };
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const vnDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
        const today = new Date();
        const isToday = vnDate.toDateString() === today.toDateString();

        if (isToday) {
            const hours = vnDate.getHours().toString().padStart(2, '0');
            const minutes = vnDate.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        } else {
            const hours = vnDate.getHours().toString().padStart(2, '0');
            const minutes = vnDate.getMinutes().toString().padStart(2, '0');
            const day = vnDate.getDate().toString().padStart(2, '0');
            const month = (vnDate.getMonth() + 1).toString().padStart(2, '0');
            const year = vnDate.getFullYear();
            return `${hours}:${minutes} , ${day}/${month}/${year}`;
        }
    };

    const getTimeDifference = (dateTimeString) => {
        const now = new Date();
        const past = new Date(dateTimeString);
        const pastVN = new Date(past.getTime() + 7 * 60 * 60 * 1000);
        const diffInSeconds = Math.floor((now - pastVN) / 1000);
        console.log(now, pastVN)
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
    const { data: userData, isLoading: isLoadingUserData, error: errorUserData } = useGetAllUsersQuery();
    const { data: chatData, isLoading: isLoadingChatData, error: errorChatData, refetch: refetchChatData } = useGetUserMessagesQuery(user?.id);
    const { data: ChatDataDetail, isLoading: isLoaidngChatDataDetail, error: errorChatDataDetail, refetch: refetchChatDataDetail } =
        useGetMessagesBetweenUsersQuery({ userId: user?.id, otherUserId: activeChatId });
    const currentChatUser = chatData?.find(user => user.userID === activeChatId);
    const currentChatUser1 = userData?.data.users.find(user => user.id === activeChatId);
    const filteredChatDetail = ChatDataDetail?.filter(
        msg => (msg.senderID === user?.id && msg.receiverID === activeChatId) || (msg.senderID === activeChatId && msg.receiverID === user?.id)
    );
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [filteredChatDetail, activeChatId]);



    const toggleDropdownAvatar = () => {
        setIsDropdownAvatarOpen(!isDropdownAvatarOpen);
        setIsNotificationOpen(false);
    };
    const toggleChatListOpen = () => {
        setIsChatListOpen(!isChatListOpen);
        setIsNotificationOpen(false);
        refetchChatData()
    };
    const toggleChatDetailtOpen = () => {
        setIsChatDetailOpen(false);
        refetchChatDataDetail()
    };

    const handleMouseEnter = (string) => {
        if (string == "TK") {
            setIsHovering_TK(true);
        }
        else if (string == "CT") {
            setIsHovering_CT(true);
        }
    };

    const handleMouseLeave = (string) => {
        if (string == "TK") {
            setIsHovering_TK(false);
        }
        else if (string == "CT") {
            setIsHovering_CT(false);
        }

    };
    const toggleTicketMenu = () => {
        setIsTicketOpen(!isTicketOpen);
        setIsCustomerOpen(false)
        setIsReportOpen(false);
        setIsChatOpen(false)
    };
    const toggleReport = () => {
        setIsReportOpen(!isReportOpen);
        setIsCustomerOpen(false)
        setIsTicketOpen(false)
        setIsChatOpen(false)
    };
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        setIsReportOpen(false);
        setIsCustomerOpen(false)
        setIsTicketOpen(false)
        refetchChatData()
    };
    const toggleCustomertMenu = () => {
        setIsCustomerOpen(!isCustomerOpen);
        setIsTicketOpen(false)
        setIsReportOpen(false);
    };
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        setIsTicketOpen(false)
        setIsCustomerOpen(false)
    };
    if (user != null && chatData && userData) {
        return (
            <div className="layout-container">
                <div className="Layout-Header">
                    <div className={`Header-left ${isCollapsed ? 'collapsed' : ''}`}>
                        <div className="logo">
                            <img src={logo} alt="Logo" className="logo-image" />
                            <div className="logo-text">
                                <span className="Ticket">Ticket</span>
                                <span className="System">System</span>
                            </div>
                        </div>
                    </div>
                    <div className="Header-right">
                        <div className='Header-right-left'>
                            <div className="Menu">
                                <div className="Menu-icon" onClick={toggleCollapse}>
                                    {!isCollapsed ? <FaBars /> : <FaArrowRight />}
                                </div>
                                <span className="Menu-text">{title}</span>
                            </div>
                        </div>
                        <div className="Header-right-right">
                            <div className="icons">
                                <div className="icon-wrapper-1">
                                    <FaCog />
                                </div>
                                {title != "Chat" && (
                                    <div className="icon-wrapper with-dot" onClick={toggleChatListOpen}>
                                        <FaCommentDots />
                                        {isChatListOpen && (
                                            <div className='chat-list-container' onClick={(e) => {
                                                e.stopPropagation();
                                            }
                                            }>
                                                <div className={`chat-search-bar ${isSearch ? 'active' : ''}`} onClick={handleSearchInputClick}>
                                                    {isSearch && (<FaArrowLeft className="Back-icon" onClick={handleSearchBackClick} />)}
                                                    <FaSearch className="search-icon" />
                                                    <input type="text" placeholder="Tìm kiếm trên Messenger"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)} />
                                                </div>
                                                {isSearch ? (
                                                    <div className="user-list">
                                                        <h2>List User</h2>
                                                        {userData.data.users.filter(user =>
                                                            user.userName?.toLowerCase().includes(searchTerm?.toLowerCase())
                                                        ).length > 0 ? (
                                                            userData.data.users
                                                                .filter(user =>
                                                                    user.userName?.toLowerCase().includes(searchTerm?.toLowerCase())
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
                                                        {chatData?.length > 0 ? (
                                                            chatData.map(chat => (
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
                                                                            {chat.lastMessageSenderID === user?.id ? 'Bạn: ' : ''}
                                                                            {chat.lastMessageContent}
                                                                        </div>
                                                                    </div>
                                                                    <div className="last-active">{getTimeDifference(chat.lastMessageTime)}</div>
                                                                    <div className="options">
                                                                        <span>...</span>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) :
                                                            (
                                                                <div className="empty-chat-message">
                                                                    Không tìm thấy cuộc trò chuyện nào
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="icon-wrapper with-dot" onClick={toggleNotificationOpen}>
                                    <FaBell />
                                    {isNotificationOpen && (
                                        <div className="notification-dropdown" onClick={(e) => e.stopPropagation()}>
                                            <h3>Thông báo</h3>
                                            <div className="notification-list">
                                                {NotificaitonData?.data.length > 0 ? (
                                                    NotificaitonData.data.map((notification) => (
                                                        <div key={notification.notificationID} className="notification-item">
                                                            <div className="notification-content">
                                                                <span className="notification-title">Ticket {notification.ticketID}</span>
                                                                <span className="notification-time"> {getTimeDifference(notification.createdAt)}</span>
                                                            </div>
                                                            <div className="notification-message">
                                                                {notification.message}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    !isLoadingNotificaitonData && !errorNotificaitonData && (
                                                        <p style={{ fontSize: "18px", color: "#999" }}>Không có thông báo mới.</p>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="user-info" onClick={toggleDropdownAvatar}>
                                <img src={user?.avatar} alt="User" className="user-avatar" />
                                <span className="user-name">{user?.userName}</span>
                                <FaChevronDown />
                                {isDropdownAvatarOpen && (
                                    <div className="dropdown">
                                        <div className="dropdown-item" onClick={() => navigate(`/profile/${user?.id}`)}>
                                            <span className="dropdown-icon">👤</span> Profile
                                        </div>
                                        <div className="dropdown-item" onClick={HandleLogout}>
                                            <span className="dropdown-icon">➡️</span> Logout
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='SideBar-main-container'>
                    <div className={`SideBar ${isCollapsed ? 'collapsed' : ''}`}>
                        <ul className="sidebar-menu">
                            <li className="sidebar-item">
                                {isAdmin ?
                                    <div>
                                        <li className="sidebar-item" onClick={() => {
                                            toggleUser()
                                            navigate('/Users')
                                        }}>
                                            <a href="" className={`sidebar-link ${isUserOpen ? "Click" : ""}`}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}>
                                                <FaUsers className="sidebar-icon" />
                                                Users
                                            </a>
                                        </li>
                                        <li className="sidebar-item" onClick={() => {
                                            toggleDapartment()
                                            navigate('/department')
                                        }}>
                                            <a href="" className={`sidebar-link ${isDepartmentOpen ? "Click" : ""}`}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}>
                                                <FaBuilding className="sidebar-icon" />
                                                Departments
                                            </a>
                                        </li>
                                        <li className="sidebar-item" onClick={() => {
                                            toggleCategories()
                                            navigate('/Categories')
                                        }
                                        }>
                                            <a href="" className={`sidebar-link ${isCategoriesOpen ? "Click" : ""}`}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}>
                                                <FaTasks className="sidebar-icon" />
                                                Categories
                                            </a>
                                        </li>
                                    </div>
                                    :
                                    <div>
                                        <div className={`sidebar-link ${isTicketOpen ? "Click" : ""}`} onClick={toggleTicketMenu}
                                            onMouseEnter={() => handleMouseEnter("TK")}
                                            onMouseLeave={() => handleMouseLeave("TK")}>
                                            <FaTicketAlt className="sidebar-icon" onHover />
                                            Ticket
                                            <span className="badge">New</span>
                                            {isTicketOpen ? (
                                                <FaCaretDown className="sidebar-arrow" />
                                            ) : (
                                                <FaCaretRight className="sidebar-arrow" />
                                            )}
                                            {isHovering_TK && isCollapsed && (
                                                <ul className="hover-list">
                                                    <FaCaretLeft className="hover-list-arrow" />
                                                    <li className="hover-list-item">
                                                        <Link to="/create-ticket" className="hover-list-item-link"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            Create Ticket
                                                        </Link>
                                                        <Link to="/my-ticket" className="hover-list-item-link"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}>
                                                            My Ticket
                                                        </Link>
                                                        <Link to="/my-work" className="hover-list-item-link"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}>
                                                            My Work
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                        {isTicketOpen && !isCollapsed && (
                                            <ul className="submenu">
                                                <li className="submenu-item">
                                                    <Link to="/create-ticket" className="submenu-link">
                                                        Create Ticket
                                                    </Link>
                                                </li>
                                                <li className="submenu-item">
                                                    <Link to="/my-ticket" className="submenu-link">
                                                        My Ticket
                                                    </Link>
                                                </li>
                                                {(user?.roleName === "Employee" || user?.roleName === "Manager") &&
                                                    <li className="submenu-item">
                                                        <Link to="/my-work" className="submenu-link">
                                                            My Work
                                                        </Link>
                                                    </li>
                                                }
                                            </ul>
                                        )}

                                        {user.roleName == "Manager" &&
                                            <div>
                                                <li className="sidebar-item">
                                                    <div className={`sidebar-link ${isCustomerOpen ? "Click" : ""}`} onClick={toggleCustomertMenu}
                                                        onMouseEnter={() => handleMouseEnter("CT")}
                                                        onMouseLeave={() => handleMouseLeave("CT")}
                                                    >
                                                        <FaUsers className="sidebar-icon" />
                                                        Employee
                                                        {isTicketOpen ? (
                                                            <FaCaretDown className="sidebar-arrow" />
                                                        ) : (
                                                            <FaCaretRight className="sidebar-arrow" />
                                                        )}
                                                        {isHovering_CT && isCollapsed && (
                                                            <ul className="hover-list">
                                                                <FaCaretLeft className="hover-list-arrow" />
                                                                <li className="hover-list-item">
                                                                    <Link to="/employee" className="hover-list-item-link"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                        }}>
                                                                        Employee List
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        )}
                                                    </div>

                                                    {isCustomerOpen && !isCollapsed && (
                                                        <ul className="submenu">
                                                            <li className="submenu-item">
                                                                <Link to="/employee" className="submenu-link"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                    }}>
                                                                    Employee List
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    )}
                                                </li>
                                                <li className="sidebar-item" onClick={toggleReport}>
                                                    <Link to="/report" className={`sidebar-link ${isReportOpen ? "Click" : ""}`}
                                                        onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}>
                                                        <FaChartPie className="sidebar-icon" />
                                                        Report
                                                    </Link>
                                                </li>
                                            </div>
                                        }
                                        <li className="sidebar-item" onClick={toggleChat}>
                                            <Link to="/chat" className={`sidebar-link ${isChatOpen ? "Click" : ""}`}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}>
                                                <FaFacebookMessenger className="sidebar-icon" />
                                                Message
                                                <span className="badge">New</span>
                                            </Link>
                                        </li>

                                    </div>
                                }
                            </li>
                        </ul>
                    </div>
                    {showHeaderLink ?
                        <div className='Main-container'>
                            <div className='Header-Link'>
                                <div className='item-first'>{path} /</div>
                                <div className='item-second'>{title}</div>
                            </div>
                            <div className='Main'>
                                <div className='Main-Inner'>
                                    {children}
                                </div>
                            </div>

                        </div>
                        :
                        <div className='Main-container'>
                            {children}
                        </div>
                    }
                    {isChatDetailOpen && (
                        <div className='chat-detail-container'>
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
                                    <div className='hidden' onClick={toggleChatDetailtOpen}>X</div>
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
                                    <div className='hidden' onClick={toggleChatDetailtOpen}>X</div>
                                </div>
                            ) : null}

                            <div
                                className={`message-container ${selectedFiles.length > 0 ? 'isAttachment' : ''}`}
                                ref={messageContainerRef}
                            >
                                {filteredChatDetail?.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map(msg => (
                                    <div key={msg.messageID} className={`message ${msg.senderID === user?.id ? 'sent' : 'received'}`}>
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
                                                <div className="attachments-list">
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
                                            <input type="text" placeholder="Write your message..."
                                                value={messageText}
                                                onChange={(e) => setMessageText(e.target.value)} />
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
                                            <button className="send-button" onClick={handleSendMessage}>
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    )}


                </div>
            </div>
        );
    }
    else {
        return <div>Đang tải...</div>;
    }
}

export default NavBar;