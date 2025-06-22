import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import "../Styles/RatingTable.scss";
import avatar from "../assets/Images/avatar-df.png"
import { FaSearch } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { useGetRatingReportByDepartmentQuery } from '../Services/reportApi';
const RatingTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(0);
    const [user, setUser] = useState(null);
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
    const { data, isLoading, error } = useGetRatingReportByDepartmentQuery(user?.departmentID);
    const filteredData = React.useMemo(() => {
        if (!data) return [];
        if (!searchTerm) return data;

        return data?.filter((user) => {
            const userName = user.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
            return userName;
        });
    }, [searchTerm, data]);
    const pageCount = Math.ceil(filteredData?.length / pageSize);
    const currentPageData = React.useMemo(() => {
        const startIndex = currentPage * pageSize;
        return filteredData?.slice(startIndex, startIndex + pageSize);
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
    const columns = useMemo(
        () => [
            {
                Header: "S/No.",
                accessor: (_row, index) => index + 1,
                id: "serial",
            },
            {
                Header: "Name",
                accessor: "fullName",
                Cell: ({ value }) => (
                    <span className="single-line-cell">{value}</span>
                )
            },
            {
                Header: "Average Rating",
                accessor: "averageRating",
                Cell: ({ value }) => {
                    const rounded = Math.round(value); // làm tròn
                    const stars = Array.from({ length: 5 }, (_, index) => (
                        <span
                            key={index}
                            style={{
                                color: index < rounded ? "gold" : "gray",
                                fontSize: "20px",
                            }}
                        >
                            ★
                        </span>
                    ));
                    return (
                        <div style={{ display: "flex", marginLeft: '25px' }}>
                            {stars}
                        </div>
                    );
                },
            },
            {
                Header: "Positive Feedback",
                accessor: "positiveFeedbackCount",
            },
            {
                Header: "Reply Count",
                accessor: "totalFeedBack",
                Cell: ({ value }) => (
                    <div className="reply-count-cell">
                        <span>{value}</span>
                    </div>
                ),
            },
            {
                Header: "Assigned Tickets",
                accessor: "totalAssignedTickets",
            },
            {
                Header: "Overdue Tickets",
                accessor: "totalOverdueTickets",
                Cell: ({ value }) => (
                    <span style={{ color: value > 0 ? "red" : "inherit" }}>{value}</span>
                ),
            },
            {
                Header: "Completed Tickets",
                accessor: "totalCompletedTickets",
            },
            {
                Header: "In Progress",
                accessor: "totalInProgressTickets",
            },
            {
                Header: "Completion On Time Rate (%)",
                accessor: "completionOnTimeRate",
                Cell: ({ value }) => (
                    <span style={{ color: value >= 80 ? "green" : value >= 50 ? "#f0ad4e" : "red" }}>
                        {value.toFixed(2)}%
                    </span>
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
        <div className="rating-table-wrapper">
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
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <FaSearch className="search-icon" />
                </div>
            </div>
            <div className="Rating-table-container">
                <table {...getTableProps()} className="Rating-table">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                        style={{ width: column.width ? column.width : 'auto', paddingRight: '20px' }}
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
            </div>
            {pageCount >= 1 && (
                <div className="pagination">
                    <div className="pagination-info">
                        Showing {currentPage * pageSize + 1} to{" "}
                        {Math.min((currentPage + 1) * pageSize, filteredData.length)} of{" "}
                        {filteredData?.length} entries
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

export default RatingTable;
