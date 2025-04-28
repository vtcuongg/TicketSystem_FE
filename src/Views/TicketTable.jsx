import React, { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "../Styles/TicketTable.scss";
import avatar from "../assets/Images/avatar-df.png"
import { FaSearch } from 'react-icons/fa';

const TicketTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(8); // Số lượng ticket hiển thị trên mỗi trang
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại

    const data = React.useMemo(
        () => [
            {
                "ticketID": "TK_0325_000001",
                "title": "Lỗi đăng nhập hệ thống",
                "description": "Tôi không thể đăng nhập vào hệ thống với tài khoản của tôi.",
                "priority": "Cao",
                "status": "Mới",
                "createdBy": 6,
                "createdByName": "Tr?n Th? B",
                "createdByAvatar": null,
                "departmentID": 4,
                "categoryID": 8,
                "categoryName": "Xử lý lỗi hệ thống",
                "createdAt": "2025-04-07T10:39:57.9107979",
                "updatedAt": "2025-04-07T10:39:57.9107979",
                "dueDate": "2025-04-10T10:39:57.9107979",
                "isFeedBack": false,
                "assignedUsers": [
                    {
                        "assignmentID": 9,
                        "assignedTo": 6,
                        "userName": "Tr?n Th? B",
                        "avatar": null
                    },
                    {
                        "assignmentID": 10,
                        "assignedTo": 7,
                        "userName": "Ph?m Van C",
                        "avatar": null
                    }
                ],
                "attachments": []
            },
            {
                "ticketID": "TK_0325_000002",
                "title": "Yêu cầu cấp giấy xác nhận sinh viên",
                "description": "Tôi cần giấy xác nhận sinh viên để nộp hồ sơ học bổng.",
                "priority": "Trung bình",
                "status": "Mới",
                "createdBy": 2,
                "createdByName": "KKK",
                "createdByAvatar": "string",
                "departmentID": 1,
                "categoryID": 1,
                "categoryName": "Miễn giảm học phí",
                "createdAt": "2025-04-07T10:39:57.9107979",
                "updatedAt": "2025-04-07T10:39:57.9107979",
                "dueDate": "2025-04-12T10:39:57.9107979",
                "isFeedBack": false,
                "assignedUsers": [
                    {
                        "assignmentID": 2,
                        "assignedTo": 2,
                        "userName": "KKKkkkkkkkkkkkkkkkkkk",
                        "avatar": avatar
                    }
                ],
                "attachments": []
            },
            {
                "ticketID": "TK_0325_000003",
                "title": "Lỗi phần mềm kế toán",
                "description": "Phần mềm kế toán bị lỗi khi nhập dữ liệu.",
                "priority": "Khẩn cấp",
                "status": "Đang xử lý",
                "createdBy": 6,
                "createdByName": "Tr?n Th? B",
                "createdByAvatar": null,
                "departmentID": 5,
                "categoryID": 11,
                "categoryName": "Học bổng",
                "createdAt": "2025-04-07T10:39:57.9107979",
                "updatedAt": "2025-04-07T10:39:57.9107979",
                "dueDate": "2025-04-08T10:39:57.9107979",
                "isFeedBack": false,
                "assignedUsers": [
                    {
                        "assignmentID": 3,
                        "assignedTo": 7,
                        "userName": "Ph?m Van C",
                        "avatar": null
                    },
                    {
                        "assignmentID": 7,
                        "assignedTo": 7,
                        "userName": "Ph?m Van C",
                        "avatar": null
                    }
                ],
                "attachments": []
            },
            {
                "ticketID": "TK_0325_000004",
                "title": "Hỗ trợ mạng nội bộ",
                "description": "Mạng nội bộ của văn phòng bị chậm.",
                "priority": "Thấp",
                "status": "Mới",
                "createdBy": 7,
                "createdByName": "Ph?m Van C",
                "createdByAvatar": null,
                "departmentID": 4,
                "categoryID": 21,
                "categoryName": "Hỗ trợ phần mềm",
                "createdAt": "2025-04-07T10:39:57.9107979",
                "updatedAt": "2025-04-07T10:39:57.9107979",
                "dueDate": "2025-04-14T10:39:57.9107979",
                "isFeedBack": false,
                "assignedUsers": [
                    {
                        "assignmentID": 4,
                        "assignedTo": 7,
                        "userName": "Ph?m Van C",
                        "avatar": null
                    }
                ],
                "attachments": []
            },
            {
                "ticketID": "TK_0325_000005",
                "title": "Không nhận được email xác nhận",
                "description": "Tôi đã đăng ký nhưng không nhận được email xác nhận.",
                "priority": "Cao",
                "status": "Đã hủy",
                "createdBy": 5,
                "createdByName": "Nguy?n Van A",
                "createdByAvatar": null,
                "departmentID": 4,
                "categoryID": 7,
                "categoryName": "Học vụ",
                "createdAt": "2025-04-07T10:39:57.9107979",
                "updatedAt": "2025-04-07T07:04:22.7541238",
                "dueDate": "2025-04-09T10:39:57.9107979",
                "isFeedBack": true,
                "assignedUsers": [],
                "attachments": []
            },
            {
                "ticketID": "TK_0325_000006",
                "title": "Cập nhật thông tin nhân sự",
                "description": "Tôi cần cập nhật thông tin cá nhân trên hệ thống.",
                "priority": "Trung bình",
                "status": "Đang xử lý",
                "createdBy": 7,
                "createdByName": "Ph?m Van C",
                "createdByAvatar": null,
                "departmentID": 2,
                "categoryID": 5,
                "categoryName": "Cấp giấy tờ",
                "createdAt": "2025-04-07T10:39:57.9107979",
                "updatedAt": "2025-04-07T10:39:57.9107979",
                "dueDate": "2025-04-11T10:39:57.9107979",
                "isFeedBack": false,
                "assignedUsers": [],
                "attachments": []
            },
            {
                "ticketID": "TK_0325_000007",
                "title": "Lỗi khi tải tài liệu",
                "description": "Hệ thống báo lỗi khi tải tài liệu từ cổng thông tin.",
                "priority": "Cao",
                "status": "Chờ xác nhận",
                "createdBy": 2,
                "createdByName": "KKK",
                "createdByAvatar": "string",
                "departmentID": 9,
                "categoryID": 20,
                "categoryName": "Kỹ năng mềm",
                "createdAt": "2025-04-07T10:39:57.9107979",
                "updatedAt": "2025-04-07T10:39:57.9107979",
                "dueDate": "2025-04-10T10:39:57.9107979",
                "isFeedBack": false,
                "assignedUsers": [],
                "attachments": []
            },
            {
                "ticketID": "TK_0325_000008",
                "title": "Thanh toán học phí bị lỗi",
                "description": "Tôi không thể thanh toán học phí qua hệ thống.",
                "priority": "Khẩn cấp",
                "status": "Mới",
                "createdBy": 2,
                "createdByName": "KKK",
                "createdByAvatar": "string",
                "departmentID": 5,
                "categoryID": 11,
                "categoryName": "Học bổng",
                "createdAt": "2025-04-07T10:39:57.9107979",
                "updatedAt": "2025-04-07T10:39:57.9107979",
                "dueDate": "2025-04-08T10:39:57.9107979",
                "isFeedBack": false,
                "assignedUsers": [],
                "attachments": []
            },
            {
                "ticketID": "TK_0325_000009",
                "title": "Yêu cầu hỗ trợ phần mềm kế toán",
                "description": "Tôi cần hướng dẫn sử dụng phần mềm kế toán.",
                "priority": "Thấp",
                "status": "Mới",
                "createdBy": 8,
                "createdByName": "Lê Th? D",
                "createdByAvatar": null,
                "departmentID": 10,
                "categoryID": 21,
                "categoryName": "Hỗ trợ phần mềm",
                "createdAt": "2025-04-07T10:39:57.9107979",
                "updatedAt": "2025-04-07T10:39:57.9107979",
                "dueDate": "2025-04-12T10:39:57.9107979",
                "isFeedBack": false,
                "assignedUsers": [],
                "attachments": []
            },
            {
                "ticketID": "TK_0325_000010",
                "title": "Đề nghị nâng cấp máy chủ",
                "description": "Máy chủ hiện tại quá tải, cần nâng cấp.",
                "priority": "Cao",
                "status": "Đang xử lý",
                "createdBy": 8,
                "createdByName": "Lê Th? D",
                "createdByAvatar": null,
                "departmentID": 13,
                "categoryID": 27,
                "categoryName": "Quản lý máy chủ",
                "createdAt": "2025-04-07T10:39:57.9107979",
                "updatedAt": "2025-04-07T10:39:57.9107979",
                "dueDate": "2025-04-17T10:39:57.9107979",
                "isFeedBack": false,
                "assignedUsers": [],
                "attachments": []
            },
            {
                "ticketID": "TK_0425_000001",
                "title": "KKKK",
                "description": "AAAA",
                "priority": "Cao",
                "status": "New",
                "createdBy": 29,
                "createdByName": "Kandiess203",
                "createdByAvatar": "https://ticketsystem.bucket.s3.ap-southeast-2.amazonaws.com/avatars/29/2d9dc334-bf5e-4278-82bd-0be62a7f65dc_kawa4-03.avif",
                "departmentID": 4,
                "categoryID": 8,
                "categoryName": "Xử lý lỗi hệ thống",
                "createdAt": "2025-04-12T14:30:47.914897",
                "updatedAt": "2025-04-13T09:13:44.623967",
                "dueDate": null,
                "isFeedBack": true,
                "assignedUsers": [],
                "attachments": [
                    {
                        "fileName": "Manager (1).jsx",
                        "url": "https://ticketsystem.bucket.s3.ap-southeast-2.amazonaws.com/attachments/TK_0425_000001/96d89b4c-27ed-43af-9c1f-4d28fb94b65f_Manager (1).jsx"
                    }
                ]
            }
        ],
        []
    );
    // Xử lý filter dữ liệu
    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((ticket) => {
            const ticketIDMatch = ticket.ticketID?.toLowerCase().includes(searchTerm.toLowerCase());
            const createdByMatch = ticket.createdByName?.toLowerCase().includes(searchTerm.toLowerCase());
            const assignedToMatch = ticket.assignedUsers?.some((user) =>
                user.userName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return ticketIDMatch || createdByMatch || assignedToMatch;
        });
    }, [searchTerm, data]);
    // Tính toán số lượng trang
    const pageCount = Math.ceil(filteredData.length / pageSize);

    // Lấy dữ liệu cho trang hiện tại
    const currentPageData = React.useMemo(() => {
        const startIndex = currentPage * pageSize;
        return filteredData.slice(startIndex, startIndex + pageSize);
    }, [currentPage, pageSize, filteredData]);
    // Hàm xử lý thay đổi số lượng item trên trang
    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(0); // Reset về trang đầu tiên khi thay đổi pageSize
    };

    // Hàm xử lý chuyển trang
    const gotoPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // Hàm xử lý chuyển đến trang trước
    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Hàm xử lý chuyển đến trang sau
    const nextPage = () => {
        if (currentPage < pageCount - 1) {
            setCurrentPage(currentPage + 1);
        }
    };
    const columns = React.useMemo(
        () => [
            { Header: "TicketID", accessor: "ticketID" },
            { Header: "Title", accessor: "title" },
            {
                Header: "Description",
                accessor: "description",
                width: 500
            },
            {
                Header: "Priority",
                accessor: "priority",
                Cell: ({ value }) => {
                    let priorityClass = "";
                    switch (value) {
                        case "Thấp":
                            priorityClass = "priority-low";
                            break;
                        case "Trung bình":
                            priorityClass = "priority-medium";
                            break;
                        case "Cao":
                            priorityClass = "priority-high";
                            break;
                        case "Khẩn cấp":
                            priorityClass = "priority-urgent";
                            break;
                        default:
                            priorityClass = "";
                            break;
                    }
                    return <span className={`priority ${priorityClass}`}>{value}</span>;
                },
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }) => {
                    return <span className="status">{value}</span>;
                },
            },
            {
                Header: "Assign To",
                accessor: "assignedUsers",
                Cell: ({ value }) => {
                    if (!Array.isArray(value) || value.length === 0) {
                        return <span>Chưa được phân công</span>;
                    }
                    return (
                        <div>
                            {value.map((user) => (
                                <div key={user.assignmentID} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', width: '100px' }}>
                                    {user.avatar && (
                                        <img
                                            src={user.avatar}
                                            alt={user.userName}
                                            style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '8px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <span
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            flex: 1,
                                        }}
                                    >
                                        {user.userName}
                                    </span>
                                </div>
                            ))}
                        </div>
                    );
                },
            },
            {
                Header: "CreatedBy",
                accessor: "createdByName",
                Cell: ({ row }) => {
                    const createdByAvatar = row.original.createdByAvatar; // Lấy avatar từ dòng hiện tại
                    const createdByName = row.original.createdByName;  // Tên người tạo

                    return (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {createdByAvatar && (
                                <img
                                    src={createdByAvatar}
                                    alt={createdByName}
                                    style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '8px', objectFit: 'cover' }}
                                />
                            )}
                            <span
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    flex: 1,
                                }}
                            >
                                {createdByName}
                            </span>
                        </div>
                    );
                },
            },
            {
                Header: "CreatedAt",
                accessor: "createdAt",
                Cell: ({ value }) => {
                    if (value) {
                        const date = new Date(value);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = String(date.getFullYear()).slice(-2);
                        return <span className="date-cell">{`${day}/${month}/${year}`}</span>;
                    }
                    return '';
                },
            },
            {
                Header: "DueDate",
                accessor: "dueDate",
                Cell: ({ value }) => {
                    if (value) {
                        const date = new Date(value);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = String(date.getFullYear()).slice(-2);
                        return <span className="date-cell">{`${day}/${month}/${year}`}</span>;
                    }
                    return '';
                },
            },
            {
                Header: "Actions",
                Cell: () => (
                    <div className='action-icons'>
                        <button className='edit-btn'>
                            <div>
                                <span>✏️</span>
                            </div>
                        </button>
                        <button className='delete-btn'>
                            <div>
                                <span>🗑️</span>
                            </div>
                        </button>
                        <button className='feedback-btn'>
                            <div>
                                <span>💬</span>
                            </div>
                        </button>
                    </div>
                ),
            },
        ],
        []
    );


    const tableInstance = useTable({ columns, data: currentPageData }, useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;
    const renderPageNumbers = useMemo(() => {
        const pageNumbers = [];
        for (let i = 0; i < pageCount; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => gotoPage(i)}
                    className={currentPage === i ? "active" : ""}
                >
                    {i + 1}
                </button>
            );
        }
        return pageNumbers;
    }, [currentPage, pageCount, gotoPage]);
    return (
        <div className="ticket-table-wrapper">
            <div className="Table-Header">
                <div className="show-entries">
                    <span>Show</span>
                    <select value={pageSize} onChange={handlePageSizeChange}>
                        <option value={5}>5</option>
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                    <span>entries</span>
                </div>
                <div className="Header-Search">
                    <input
                        type="text"
                        placeholder="Tìm kiếm TicketID, CreatedBy, AssignTo"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <FaSearch className="search-icon" />
                </div>
            </div>
            <table {...getTableProps()} className="ticket-table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                    style={{ width: column.width ? column.width : 'auto' }}
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <span style={{ fontWeight: 'bold' }}> ▲</span>
                                            ) : (
                                                <span style={{ fontWeight: 'bold' }}> ▼</span>
                                            )
                                        ) : (
                                            <>
                                                {" "}
                                                <span style={{ opacity: 0.5 }}>▼</span>
                                                <span style={{ opacity: 0.5 }}>▲</span>
                                            </>
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {pageCount >= 1 && (
                <div className="pagination">
                    <div className="pagination-info">
                        Showing {currentPage * pageSize + 1} to{" "}
                        {Math.min((currentPage + 1) * pageSize, filteredData.length)} of{" "}
                        {filteredData.length} entries
                    </div>
                    <div className="pagination-buttons">
                        <button onClick={previousPage} disabled={currentPage === 0}>
                            Previous
                        </button>
                        {renderPageNumbers}
                        <button onClick={nextPage} disabled={currentPage === pageCount - 1}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketTable;
