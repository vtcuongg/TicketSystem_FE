import React, { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "../Styles/RatingTable.scss";
import avatar from "../assets/Images/avatar-df.png"
import { FaSearch } from 'react-icons/fa';

const RatingTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(8); // Số lượng ticket hiển thị trên mỗi trang
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại

    const data = React.useMemo(
        () => [
            {
                "employeeID": 2,
                "fullName": "KKK",
                "totalFeedBack": 1,
                "averageRating": 3
            },
            {
                "employeeID": 6,
                "fullName": "Tr?n Th? B",
                "totalFeedBack": 1,
                "averageRating": 3
            },
            {
                "employeeID": 7,
                "fullName": "Ph?m Van C",
                "totalFeedBack": 0,
                "averageRating": 5
            },
            {
                "employeeID": 8,
                "fullName": "Lê Th? D",
                "totalFeedBack": 1,
                "averageRating": 3
            },
            {
                "employeeID": 11,
                "fullName": "Ð?ng Van G",
                "totalFeedBack": 0,
                "averageRating": 5
            }
        ],
        []
    );
    // Xử lý filter dữ liệu
    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((user) => {
            const userName = user.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
            return userName;
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
            { Header: "S/No.", accessor: (row, index) => index + 1 }, // Thêm cột số thứ tự
            { Header: "Employee ID", accessor: "employeeID" },
            { Header: "Name", accessor: "fullName" },
            {
                Header: "Rating",
                accessor: "averageRating",
                Cell: ({ value }) => {
                    const stars = Array.from({ length: 5 }, (_, index) => (
                        <span key={index} style={{ color: index < value ? 'gold' : 'gray', fontSize: "24px" }}>★</span>
                    ));
                    return <div>{stars}</div>;
                },
            },
            {
                Header: "Reply Count", accessor: "totalFeedBack",
                Cell: ({ value }) => (
                    <div className="reply-count-cell">
                        <span>{value}</span>
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
                        placeholder="Tìm kiếm theo tên"
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

export default RatingTable;
