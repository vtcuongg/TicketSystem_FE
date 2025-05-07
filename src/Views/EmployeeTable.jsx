import React, { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "../Styles/EmployeeTable.scss";
import avatar from "../assets/Images/avatar-df.png"
import { FaSearch } from 'react-icons/fa';

const EmployeeTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(5); // Số lượng ticket hiển thị trên mỗi trang
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại

    const data = React.useMemo(
        () => [
            {
                "id": 2,
                "userName": "KKK",
                "email": "user@example.com",
                "phoneNumber": "0390278385",
                "dateOfBirth": "2025-04-07T03:15:59.258",
                "gender": "Nam",
                "address": "DN",
                "avatar": avatar,
                "nationalID": "160254076853",
                "departmentID": 4,
                "departmentName": "Phòng Đào tạo",
                "roleID": 2,
                "roleName": "User",
                "status": "Active",
                "createdAt": "2025-04-07T03:15:59.258"
            },
            {
                "id": 6,
                "userName": "Nguyễn Việt Cường",
                "email": "tranthib@example.com",
                "phoneNumber": "0912345678",
                "dateOfBirth": "1995-08-15T00:00:00",
                "gender": "Nữ",
                "address": "H? Chí Minh, Vi?t Nam",
                "avatar": avatar,
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
                "userName": "Lê Công Đạt",
                "email": "phamvanc@example.com",
                "phoneNumber": "0934567890",
                "dateOfBirth": "1988-12-20T00:00:00",
                "gender": "Nam",
                "address": "Ðà N?ng, Vi?t Nam",
                "avatar": avatar,
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
                "avatar": avatar,
                "nationalID": "654321987",
                "departmentID": 4,
                "departmentName": "Phòng Đào tạo",
                "roleID": 2,
                "roleName": "User",
                "status": "Active",
                "createdAt": "2025-04-07T10:34:48.9496128"
            },
            {
                "id": 11,
                "userName": "Ð?ngVanG",
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
            }
        ], []
    );
    // Xử lý filter dữ liệu
    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((user) => {
            const userName = user.userName?.toLowerCase().includes(searchTerm.toLowerCase());
            const Email = user.email?.toLowerCase().includes(searchTerm.toLowerCase());
            return userName || Email;
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
    const columns = useMemo(
        () => [
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
            }
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

export default EmployeeTable;
