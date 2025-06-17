import NavBar from "./NavBar";
import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useRowSelect } from 'react-table';
import "../Styles/AllTicket.scss"
import TicketTable from "./TicketTable";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDeleteTicketMutation } from '../Services/ticketApi';
import { useLocation } from 'react-router-dom';

const MyTicket = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [deleteTicket] = useDeleteTicketMutation();
    const [selectedTicketIds, setSelectedTicketIds] = useState([]);
    const [reloadFlag, setReloadFlag] = useState(false);
    const handleRowSelect = (ids) => {
        setSelectedTicketIds(ids);
    };

    const handleUpdateClick = () => {
        if (selectedTicketIds.length === 1) {
            navigate(`/update-ticket/${selectedTicketIds[0]}`);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select a Ticket to update.',
            });
        }
    };

    const handleDeleteClick = async () => {
        if (selectedTicketIds.length > 0) {
            const result = await Swal.fire({
                title: 'Confirm Deleted',
                text: `Are you sure you want to delete ${selectedTicketIds.length} Tickets?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No',
            });

            if (result.isConfirmed) {
                for (const ticketId of selectedTicketIds) {
                    await deleteTicket(ticketId).unwrap();
                }
                setReloadFlag(prev => !prev);
                setSelectedTicketIds([]);
                Swal.fire(
                    'Deleted!',
                    'Tickets Deleted Successfully ',
                    'success'
                );
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select a Ticket to delete',
            });
        }
    };
    return (
        <NavBar
            title={location.pathname === "/my-work" ? "My Work" : "My Ticket"}
            path="Ticket"
        >
            <div className="main-container-ticket">
                <div className="header-main">
                    <div className="header-main-left">
                        {location.pathname === "/my-work" ? "My Work" : "My Ticket"}
                    </div>
                    <div className="header-main-right">
                        {location.pathname === "/my-work" ?
                            <div className="header-main-right-btn" onClick={() => handleUpdateClick()}>Update Ticket</div>
                            :
                            <div className="header-main-right">
                                <div className="header-main-right-btn" onClick={() => navigate('/create-ticket')}>Add Ticket</div>
                                <div className="header-main-right-btn" onClick={() => handleDeleteClick()}>Delete Ticket</div>
                                <div className="header-main-right-btn" onClick={() => handleUpdateClick()}>Update Ticket</div>
                            </div>
                        }
                    </div>
                </div>
                <div className="Main-Inner">
                    <TicketTable onRowSelect={handleRowSelect} reloadFlag={reloadFlag} />
                </div>
            </div>
        </NavBar>
    )
}
export default MyTicket;