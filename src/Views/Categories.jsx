import NavBar from "./NavBar";
import React, { useMemo, useState } from 'react';
import "../Styles/Employee.scss"
import CategoryTable from "./CategoryTable";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Categories = () => {
    const navigate = useNavigate();
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const handleRowSelect = (ids) => {
        setSelectedCategoryIds(ids);
    };

    const handleUpdateClick = () => {
        if (selectedCategoryIds.length === 1) {
            navigate(`/update-category/${selectedCategoryIds[0]}`);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Chú ý!',
                text: 'Vui lòng chọn đúng 1 Category để cập nhật.',
            });
        }
    };

    const handleDeleteClick = async () => {
        if (selectedCategoryIds.length > 0) {
            const result = await Swal.fire({
                title: 'Xác nhận xoá',
                text: `Bạn có chắc chắn muốn xoá ${selectedCategoryIds.length} Category?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Vâng, xoá!',
                cancelButtonText: 'Huỷ',
            });

            if (result.isConfirmed) {
                Swal.fire(
                    'Đã xoá!',
                    'Các Category đã được xoá thành công.',
                    'success'
                );
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Chú ý!',
                text: 'Vui lòng chọn ít nhất một Category để xoá.',
            });
        }
    };
    return (
        <NavBar title="List Categories " path="Categories"   >
            <div className="main-container-employee">
                <div className="header-main">
                    <div className="header-main-left">
                        List Categories
                    </div>
                    <div className="header-main-right">
                        <div className="header-main-right-btn" onClick={() => navigate('/create-category')}>Add Categoy</div>
                        <div className="header-main-right-btn" onClick={() => handleDeleteClick()}>Delete Categoy</div>
                        <div className="header-main-right-btn" onClick={() => handleUpdateClick()}>Update Categoy</div>
                    </div>

                </div>
                <div className="Main-Employee">
                    <CategoryTable onRowSelect={handleRowSelect} />
                </div>
            </div>
        </NavBar>
    )
}
export default Categories;