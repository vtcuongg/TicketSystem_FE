import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useRowSelect } from "react-table";
import "../Styles/EmployeeTable.scss";
import avatar from "../assets/Images/avatar-df.png"
import { FaSearch } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { useGetUsersByDepartmentQuery } from "../Services/userApi";
import { useGetTicketsQuery } from '../Services/ticketApi';
import { useGetAllUsersQuery } from "../Services/userApi";
import { useLocation } from 'react-router-dom';
const EmployeeTable = ({ onRowSelect, reloadFlag }) => {

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
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const getAllUsersQuery = useGetAllUsersQuery();

    const getUsersByDepartmentQuery = useGetUsersByDepartmentQuery(user?.departmentID);
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
    const {
        data: data,
        isLoading: isLoading,
        error: error,
        refetch
    } = user?.roleName === "Admin" ? getAllUsersQuery : getUsersByDepartmentQuery;
    useEffect(() => {
        if (refetch && typeof refetch === "function") {
            refetch().then(res => console.log("Refetch result:", res));
        }
    }, [location.pathname, refetch]);

    useEffect(() => {
        if (refetch && typeof refetch === "function") {
            refetch().then(res => console.log("Refetch result:", res));
        }
    }, [reloadFlag, refetch]);
    const filteredData = React.useMemo(() => {
        if (!data?.data.users) return [];
        if (!searchTerm) return data?.data.users;
        return data?.data.users.filter((user) => {
            const userName = user.userName?.toLowerCase().includes(searchTerm.toLowerCase());
            const Email = user.email?.toLowerCase().includes(searchTerm.toLowerCase());
            return userName || Email;
        });
    }, [searchTerm, data?.data.users]);
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
                id: 'selection',
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <div>
                        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                    </div>
                ),
                Cell: ({ row }) => (
                    <div>
                        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                    </div>
                ),
            },
            {
                Header: "Họ và tên", accessor: "userName",
                Cell: ({ value }) => (
                    <span className="single-line-cell">{value}</span>
                )

            },
            { Header: "Email", accessor: "email" },
            { Header: "SĐT", accessor: "phoneNumber" },
            {
                Header: "Ngày sinh",
                accessor: "dateOfBirth",
                Cell: ({ value }) => new Date(value).toLocaleDateString('vi-VN'),
            },
            { Header: "Giới tính", accessor: "gender" },
            {
                Header: "Địa chỉ", accessor: "address",
                Cell: ({ value }) => (
                    <span className="single-line-cell">{value}</span>
                )

            },
            {
                Header: "Avatar",
                accessor: "avatar",
                Cell: ({ value }) =>
                    value ? (
                        <img src={value} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                    ) : (
                        "N/A"
                    ),
            },
            { Header: "CMND/CCCD", accessor: "nationalID" },
            {
                Header: "Phòng ban", accessor: "departmentName",
                Cell: ({ value }) => (
                    <span className="single-line-cell">{value}</span>
                )
            },
            {
                Header: "Trạng thái",
                accessor: "status",
                Cell: ({ value }) => (
                    <div style={{
                        backgroundColor: value === "Active" ? "green" : "red",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        display: "inline-block",
                    }}>
                        {value}
                    </div>
                ),
            },
            {
                Header: "Ngày tạo",
                accessor: "createdAt",
                Cell: ({ value }) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                    });
                },
            },
        ],
        []
    );
    const tableInstance = useTable({
        columns, data: currentPageData,
        getRowId: (row) => row.id,
    }, useSortBy, useRowSelect);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state: { selectedRowIds }, toggleAllRowsSelected } =
        tableInstance;
    useEffect(() => {
        if (onRowSelect && selectedRowIds) {
            const selectedIdsArray = rows
                .filter(row => selectedRowIds[row.id])
                .map(row => row.original.id);
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

    if (data?.data.users) {
        return (
            <div className="Employee-table-wrapper">
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
                            placeholder="Tìm kiếm theo tên , email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <FaSearch className="search-icon" />
                    </div>
                </div>
                <div className="Employee-table-container">
                    <table {...getTableProps()} className="Employee-table">
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                            style={{ width: column.width ? column.width : 'auto', whiteSpace: "nowrap" }}
                                        >
                                            <span style={{ marginRight: "60px" }}>
                                                {column.render("Header")}
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
                                                )
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
    }

};

export default EmployeeTable;
