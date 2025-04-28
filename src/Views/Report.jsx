import NavBar from "./NavBar";
import React, { useMemo, useState } from 'react';
import "../Styles/Report.scss"
import ReactApexChart from 'react-apexcharts';
import RatingTable from "./RatingTable";
const Report = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const employeeData = {
        "totalUsers": 5,
        "statusCounts": [
            {
                "status": "Active",
                "userCount": 3
            },
            {
                "status": "InActive",
                "userCount": 2
            }
        ]
    }
    const ticketData = {
        "totalTicket": 11,
        "ticketSummary": [
            {
                "status": "Cháy Deadline",
                "ticketCount": 1,
                "ticketYear": 2025,
                "ticketMonth": 4
            },
            {
                "status": "Chờ xác nhận",
                "ticketCount": 1,
                "ticketYear": 2025,
                "ticketMonth": 4
            },
            {
                "status": "Đã hủy",
                "ticketCount": 1,
                "ticketYear": 2025,
                "ticketMonth": 4
            },
            {
                "status": "Đang xử lý",
                "ticketCount": 3,
                "ticketYear": 2025,
                "ticketMonth": 4
            },
            {
                "status": "Hoàn thành",
                "ticketCount": 1,
                "ticketYear": 2025,
                "ticketMonth": 4
            },
            {
                "status": "Mới",
                "ticketCount": 4,
                "ticketYear": 2025,
                "ticketMonth": 4
            }
        ]
    };
    const statusColorMap = {
        "Mới": "#FFA500",
        "Đang xử lý": "#008000",
        "Chờ xác nhận": "#0000FF",
        "Đã hủy": "#FF0000",
        "Hoàn thành": "#808080",
        "Cháy Deadline": "#FF4500"
    };
    const statusEmployeeColorMap = {
        "Active": "#008000",
        "InActive": "#FFA500"
    };
    const { ticketSummary } = ticketData;
    const { statusCounts } = employeeData;

    const series = ticketSummary.map(item => item.ticketCount);
    const labels = ticketSummary.map(item => item.status);
    const colors = ticketSummary.map(item => statusColorMap[item.status] || '#808080');

    const series_employee = statusCounts.map(item => item.userCount);
    const labels_employee = statusCounts.map(item => item.status);
    const colors_employee = statusCounts.map(item => statusEmployeeColorMap[item.status] || '#808080');

    const chartOptions = {
        chart: {
            type: 'donut',
        },
        labels: labels,
        colors: colors,
        legend: {
            position: 'right',
            offsetY: 0,
            offsetX: 10

        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    const chartEmployeeOptions = {
        chart: {
            type: 'donut',
        },
        labels: labels_employee,
        colors: colors_employee,
        legend: {
            position: 'right',
            offsetY: 0,
            offsetX: 10

        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };


    const chartSeries = series;
    const chartEmployeeSeries = series_employee;
    return (
        <NavBar title="Report" showHeaderLink={false} >
            <div className="report-main-container">
                <div className="main-top">
                    <div className="main-top-employee">
                        <div className="main-top-employee-title">
                            <p>
                                Employees
                            </p>
                        </div>
                        <ReactApexChart className="ReactApexChart" options={chartEmployeeOptions} series={series_employee} type="donut" height={240} />
                        <p >Tổng số Employee: {employeeData.totalUsers}</p>
                    </div>
                    <div className="main-top-ticket">
                        <div className="main-top-ticket-title">
                            <p>
                                Tickets
                            </p>
                            <input
                                type="date"
                                id="StartDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <span>~</span>
                            <input
                                type="date"
                                id="EndDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <ReactApexChart className="ReactApexChart" options={chartOptions} series={chartSeries} type="donut" height={240} />
                        <p >Tổng số tickets: {ticketData.totalTicket}</p>
                    </div>
                </div>
                <div className="main-bottom">
                    < RatingTable />
                </div>
            </div>
        </NavBar>
    )
}
export default Report;