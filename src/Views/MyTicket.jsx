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
                title: 'Chú ý!',
                text: 'Vui lòng chọn đúng 1 ticket để cập nhật.',
            });
        }
    };

    const handleDeleteClick = async () => {
        if (selectedTicketIds.length > 0) {
            const result = await Swal.fire({
                title: 'Xác nhận xoá',
                text: `Bạn có chắc chắn muốn xoá ${selectedTicketIds.length} Tickets?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Vâng, xoá!',
                cancelButtonText: 'Huỷ',
            });

            if (result.isConfirmed) {
                for (const ticketId of selectedTicketIds) {
                    await deleteTicket(ticketId).unwrap();
                }
                setReloadFlag(prev => !prev);
                setSelectedTicketIds([]);
                Swal.fire(
                    'Đã xoá!',
                    'Các Ticket đã được xoá thành công.',
                    'success'
                );
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Chú ý!',
                text: 'Vui lòng chọn ít nhất một Ticket để xoá.',
            });
        }
    };
    return (
        <NavBar title="All Ticket" path="Ticket">
            <div className="main-container-ticket">
                <div className="header-main">
                    <div className="header-main-left">
                        All Ticket
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
                    {/* <TicketTable /> */}
                    <TicketTable onRowSelect={handleRowSelect} reloadFlag={reloadFlag} />
                </div>
            </div>
        </NavBar>
    )
}
export default MyTicket;