import NavBar from "./NavBar";
import React, { useMemo } from 'react';
import { useTable, useSortBy, useRowSelect } from 'react-table';
import "../Styles/AllTicket.scss"
import TicketTable from "./TicketTable";
const MyTicket = () => {
    return (
        <NavBar title="All Ticket" path="Ticket">
            <div className="main-container">
                <div className="header-main">
                    <div className="header-main-left">
                        All Ticket
                    </div>
                    <div className="header-main-right">
                        Add Ticket
                    </div>
                </div>
                <div className="Main-Inner">
                    <TicketTable />
                </div>
            </div>
        </NavBar>
    )
}
export default MyTicket;