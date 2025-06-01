import NavBar from "./NavBar";
import React, { useState, useRef, useEffect } from 'react';
import "../Styles/Chat.scss"
import { FaSearch, FaPaperclip, FaArrowLeft } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { useGetUserMessagesQuery, useGetMessagesBetweenUsersQuery, useMarkMessageAsReadMutation, useSendMessageMutation } from "../Services/chatApi";
import { useGetAllUsersQuery } from "../Services/userApi";
const Chat = () => {
    const [activeChatId, setActiveChatId] = useState(null);
    const messageContainerRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [user, setUser] = useState(null);
    const [markMessageAsRead] = useMarkMessageAsReadMutation();
    const [sendMessage] = useSendMessageMutation();
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
    const handleChatItemClick = (userId) => {
        setActiveChatId(userId);
    };
    const handleChatItemClick1 = (userId, messageId) => {
        setActiveChatId(userId);
        markMessageAsRead(messageId);
        refetchChatData()
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
    };
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
    if (chatData && userData) {
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
                                {userData?.data.users.filter(user =>
                                    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
                                ).length > 0 ? (
                                    userData?.data.users
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

                                {chatData?.length > 0 ? (
                                    chatData?.map(chat => (
                                        <div
                                            className={`chat-item ${activeChatId === chat.userID ? 'active' : ''}`}
                                            key={chat.userID}
                                            onClick={() => handleChatItemClick1(chat.userID, chat.lastMessageId)}
                                        >
                                            <div className="avatar">
                                                {chat.avatar ? <img src={chat.avatar} alt={chat.fullName} /> : <span>{chat.fullName.charAt(0)}</span>}
                                            </div>
                                            <div className={`online-status ${chat.isOnline ? 'online' : ''}`}></div>
                                            <div className={"message-info"}>
                                                <div className={`user-name ${activeChatId === chat.userID ? 'active' : ''}`}>{chat.fullName}</div>
                                                <div className={`last-message ${!chat.isRead ? 'unread' : ''}`}>
                                                    {chat.lastMessageSenderID === user?.id ? 'Bạn: ' : ''}
                                                    {chat.lastMessageContent ? chat.lastMessageContent : "Bạn vừa gửi 1 file đính kèm"}
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
                </div>
            </NavBar >
        )
    }
}

export default Chat;