import React, { useState } from 'react';
import '../Styles/NavBar.scss';
import logo from '../assets/Images/logo.png'
import avatar from '../assets/Images/avatar-df.png';
import { FaSearch, FaCog, FaBell, FaCommentDots, FaBars, FaChevronDown, FaArrowRight, FaCaretLeft } from 'react-icons/fa';
import {
    FaTicketAlt,
    FaCaretDown,
    FaCaretRight,
    FaChartPie,
    FaUsers
} from 'react-icons/fa';
const NavBar = ({ children, title, path, showHeaderLink = true }) => {
    const [isTicketOpen, setIsTicketOpen] = useState(true);
    const [isCustomerOpen, setIsCustomerOpen] = useState(false)
    const [isReportOpen, setIsReportOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovering_TK, setIsHovering_TK] = useState(false);
    const [isHovering_CT, setIsHovering_CT] = useState(false);

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
    };
    const toggleReport = () => {
        setIsReportOpen(!isReportOpen);
        setIsCustomerOpen(false)
        setIsTicketOpen(false)
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
                        <div className="search-bar">
                            <input type="text" placeholder="Search here" />
                            <FaSearch className="search-icon" />
                        </div>

                        <div className="icons">
                            <div className="icon-wrapper-1">
                                <FaCog />
                            </div>
                            <div className="icon-wrapper with-dot">
                                <FaBell />
                            </div>
                            <div className="icon-wrapper with-dot">
                                <FaCommentDots />
                            </div>
                        </div>
                        <div className="user-info">
                            <img src={avatar} alt="User" className="user-avatar" />
                            <span className="user-name">David</span>
                            <FaChevronDown />
                        </div>
                    </div>
                </div>
            </div>
            <div className='SideBar-main-container'>
                <div className={`SideBar ${isCollapsed ? 'collapsed' : ''}`}>
                    <ul className="sidebar-menu">
                        <li className="sidebar-item">
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
                                            <a href="#" className="hover-list-item-link">
                                                Create Ticket
                                            </a>
                                            <a href="#" className="hover-list-item-link">
                                                My Ticket
                                            </a>
                                            <a href="#" className="hover-list-item-link">
                                                My Work
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            {isTicketOpen && !isCollapsed && (
                                <ul className="submenu">
                                    <li className="submenu-item">
                                        <a href="#" className="submenu-link">
                                            Create Ticket
                                        </a>
                                    </li>
                                    <li className="submenu-item">
                                        <a href="#" className="submenu-link">
                                            My Ticket
                                        </a>
                                    </li>
                                    <li className="submenu-item">
                                        <a href="#" className="submenu-link">
                                            My Work
                                        </a>
                                    </li>
                                </ul>
                            )}

                        </li>
                        <li className="sidebar-item">
                            <div className={`sidebar-link ${isCustomerOpen ? "Click" : ""}`} onClick={toggleCustomertMenu}
                                onMouseEnter={() => handleMouseEnter("CT")}
                                onMouseLeave={() => handleMouseLeave("CT")}
                            >
                                <FaUsers className="sidebar-icon" />
                                Customer
                                <span className="badge">New</span>
                                {isTicketOpen ? (
                                    <FaCaretDown className="sidebar-arrow" />
                                ) : (
                                    <FaCaretRight className="sidebar-arrow" />
                                )}
                                {isHovering_CT && isCollapsed && (
                                    <ul className="hover-list">
                                        <FaCaretLeft className="hover-list-arrow" />
                                        <li className="hover-list-item">
                                            <a href="#" className="hover-list-item-link">
                                                Customer List
                                            </a>
                                            <a href="#" className="hover-list-item-link">
                                                Chat
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {isCustomerOpen && !isCollapsed && (
                                <ul className="submenu">
                                    <li className="submenu-item">
                                        <a href="#" className="submenu-link">
                                            Customer List
                                        </a>
                                    </li>
                                    <li className="submenu-item">
                                        <a href="#" className="submenu-link">
                                            Chat
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className="sidebar-item" onClick={toggleReport}>
                            <a href="#" className={`sidebar-link ${isReportOpen ? "Click" : ""}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>
                                <FaChartPie className="sidebar-icon" />
                                Report
                            </a>
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

            </div>
        </div>
    );
}

export default NavBar;