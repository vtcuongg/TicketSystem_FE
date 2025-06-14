import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useTable, useSortBy, useRowSelect } from "react-table";
import "../Styles/TicketTable.scss";
import avatar from "../assets/Images/avatar-df.png"
import { FaSearch, FaComments } from 'react-icons/fa';
import { useGetTicketsQuery } from '../Services/ticketApi';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import RatingModal from "./RatingModal";
import { usePostFeedbackMutation, usePostFeedbackAssigneeMutation } from '../Services/feedBackApi';
import Swal from 'sweetalert2';
const TicketTable = ({ onRowSelect, reloadFlag }) => {
    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef

            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])
            return (
                <>
                    <input className="checkbox" type="checkbox" ref={resolvedRef} {...rest} />
                </>
            )
        }
    )
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(0);
    const [assignFeedBack, setAssignFeedBack] = useState([])
    const [user, setUser] = useState(null);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [selectedTicketIdForRating, setSelectedTicketIdForRating] = useState(null);
    const [postFeedback] = usePostFeedbackMutation();
    const [postFeedbackAssignee] = usePostFeedbackAssigneeMutation();
    const handleOpenRatingModal = useCallback((ticketId, assignedUsers) => {
        setSelectedTicketIdForRating(ticketId);
        setIsRatingModalOpen(true);
        setAssignFeedBack(assignedUsers)
    }, []);
    const handleCloseRatingModal = useCallback(() => {
        setIsRatingModalOpen(false);
        setSelectedTicketIdForRating(null);
    }, []);
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
    const handleSubmitRating = useCallback(({ rating, comment }) => {
        try {
            postFeedback({
                ticketID: selectedTicketIdForRating,
                createdBy: user?.id,
                comment: comment,
                rating: rating
            }).unwrap();
            if (Array.isArray(assignFeedBack) && assignFeedBack.length > 0) {
                for (const assignee of assignFeedBack) {
                    try {
                        const assigneeFeedbackData = {
                            ticketID: selectedTicketIdForRating,
                            assignedTo: assignee.assignedTo
                        };
                        postFeedbackAssignee(assigneeFeedbackData).unwrap();
                    } catch (err) {
                        console.error(`Failed to post feedback for assignee ${assignee.userName || assignee.id}:`, err);
                    }
                }
            }
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Thank you for taking the time to review.',
            });
        } catch (err) {
        }

    }, [selectedTicketIdForRating]);
    const location = useLocation();
    const { data, isLoading, error, refetch } = useGetTicketsQuery({
        ...(location.pathname === "/my-ticket" && { createdBy: user?.id }),
        ...(location.pathname === "/my-work" && user?.roleName === "Manager" && { assignto: user?.id, departmentId: user?.departmentID }),
    },
        {
            skip: !user?.id,
        });
    useEffect(() => {
        if (user?.id) {
            refetch();
        }
    }, [reloadFlag, !user?.id]);
    useEffect(() => {
        if (user?.id) {
            refetch();
        }
    }, [location.pathname]);

    const filteredData = React.useMemo(() => {
        if (!data) return [];
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
    const pageCount = Math.ceil(filteredData.length / pageSize);
    const currentPageData = React.useMemo(() => {
        const startIndex = currentPage * pageSize;
        return filteredData.slice(startIndex, startIndex + pageSize);
    }, [currentPage, pageSize, filteredData]);
    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(0);
    };
    const gotoPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    const nextPage = () => {
        if (currentPage < pageCount - 1) {
            setCurrentPage(currentPage + 1);
        }
    };
    const columns = React.useMemo(

        () => {
            const baseColumns = [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => {
                        return (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        );
                    },
                },
                { Header: "TicketID", accessor: "ticketID" },
                {
                    Header: "Title", accessor: "title",
                    Cell: ({ value }) => (
                        <span className="title-line-cell">{value}</span>
                    )
                },
                {
                    Header: "Description",
                    accessor: "description",
                    Cell: ({ value }) => (
                        <span
                            className="description-line-cell"
                            dangerouslySetInnerHTML={{ __html: value }}
                        />
                    )
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
                    Header: "Warning",
                    id: "warning",
                    Cell: ({ row }) => {
                        const value = row.original.dueDate;

                        if (value) {
                            const dueDate = new Date(value);
                            const today = new Date();
                            dueDate.setHours(0, 0, 0, 0);
                            today.setHours(0, 0, 0, 0);

                            if (dueDate < today) {
                                return <span className="status" style={{ color: 'red' }}>🔥 Deadline</span>;
                            }
                        }

                        return <span className="status" style={{ color: 'gray' }}>N/A</span>;
                    },
                },
                {
                    Header: "Assignee",
                    accessor: "assignedUsers",
                    Cell: ({ value }) => {
                        if (!Array.isArray(value) || value.length === 0) {
                            return <span style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                flex: 1,
                            }}>
                                Not assigned yet</span>;
                        }
                        return (
                            <div>
                                {value.map((user) => (
                                    <div key={user?.assignmentID} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', width: '100px' }}>
                                        {user?.avatar && (
                                            <img
                                                src={user?.avatar}
                                                alt={user?.userName}
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
                    Header: "Author",
                    accessor: "createdByName",
                    Cell: ({ row }) => {
                        const createdByAvatar = row.original.createdByAvatar;
                        const createdByName = row.original.createdByName;

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
                    Header: "Created ",
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
                    Header: "Due Date",
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
            ];
            if (location.pathname === "/my-ticket") {
                return [
                    ...baseColumns,
                    {
                        Header: "Feed Back",
                        Cell: ({ row }) => (
                            <div className='action-icons'>
                                <button className='feedback-btn'>
                                    <div>
                                        <span><FaComments onClick={() => {
                                            handleOpenRatingModal(row.original.ticketID, row.original.assignedUsers)
                                        }
                                        }
                                        /></span>
                                    </div>
                                </button>
                            </div>
                        ),
                    },
                ];
            }
            return baseColumns;
        },
        [location.pathname, handleOpenRatingModal]
    );
    const tableInstance = useTable({
        columns, data: currentPageData,
        getRowId: (row) => row.ticketID,
    }, useSortBy, useRowSelect);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state: { selectedRowIds }, toggleAllRowsSelected, }
        = tableInstance;
    useEffect(() => {
        if (onRowSelect && selectedRowIds) {
            const selectedIdsArray = rows
                .filter(row => selectedRowIds[row.id])
                .map(row => row.original.ticketID);
            onRowSelect(selectedIdsArray);
        }
    }, [selectedRowIds]);

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
                        placeholder="Search by Ticket ID, Created, Assignee"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <FaSearch className="search-icon" />
                </div>
            </div>
            <div className="Ticket-table-container">
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
                                            {column.id !== 'selection' && column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <span style={{ fontWeight: 'bold' }}> ▲</span>
                                                ) : (
                                                    <span style={{ fontWeight: 'bold' }}> ▼</span>
                                                )
                                            ) : (column.id !== 'selection' && (
                                                <>
                                                    {" "}
                                                    <span style={{ opacity: 0.5 }}>▼</span>
                                                    <span style={{ opacity: 0.5 }}>▲</span>
                                                </>
                                            ))}
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
                                        <td {...cell.getCellProps()}>
                                            {
                                                cell.render("Cell")
                                            }
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
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
            <RatingModal
                isOpen={isRatingModalOpen}
                onClose={handleCloseRatingModal}
                onSubmit={handleSubmitRating}
                ticketId={selectedTicketIdForRating}
            />
        </div>
    );
};

export default TicketTable;
