
import React, { useState, useEffect, useRef, use } from 'react';
import { FaStar } from 'react-icons/fa';
import '../Styles/RatingModal.scss';
import { useGetFeedbackByTicketIdQuery } from '../Services/feedBackApi';
import Swal from 'sweetalert2';

const RatingModal = ({ isOpen, onClose, onSubmit, ticketId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isFeedBack, setIsFeedBack] = useState(false)
    const modalRef = useRef(null);
    const {
        data: feedbackData,
        isLoading,
        isFetching,
        error,
    } = useGetFeedbackByTicketIdQuery(ticketId, {
        skip: !ticketId,
    });
    useEffect(() => {
        if (error) {
            setRating(0);
            setComment('');
            setIsFeedBack(false)
        } else if (feedbackData) {
            setRating(feedbackData.data?.rating || 0);
            setComment(feedbackData.data?.comment || '');
            setIsFeedBack(true)
        }
    }, [feedbackData, error, ticketId]);
    console.log(isFeedBack)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null; // Không render gì nếu modal không mở

    const handleSubmit = () => {
        if (rating === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Chú ý!',
                text: 'Bạn chưa đánh giá mức độ hài lòng',
            });
        }
        onSubmit({ rating, comment });
    };
    if (!isLoading) {
        return (
            <div className="rating-modal-overlay">
                <div className="rating-modal" ref={modalRef} >
                    <h2>Đánh giá của bạn</h2>
                    <div className="stars-container">
                        {[...Array(5)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={index}
                                >
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={rating}
                                        onClick={() => setRating(currentRating)}
                                        style={{ display: 'none' }}
                                        disabled={isFeedBack ? true : false}
                                    />
                                    <FaStar
                                        className="star"
                                        size={30}
                                        color={currentRating <= rating ? "#ffc107" : "#e4e5e9"}
                                        disabled={isFeedBack ? true : false}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    <textarea
                        placeholder="Nhập nội dung đánh giá của bạn (không bắt buộc)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        className="comment-textarea"
                        readOnly={isFeedBack ? true : false}
                    />
                    {!isFeedBack &&
                        <div className="modal-actions">
                            <button onClick={onClose} className="cancel-btn">Hủy</button>
                            <button onClick={handleSubmit} className="submit-btn">Xác nhận</button>
                        </div>
                    }

                </div>
            </div>
        );
    }
};

export default RatingModal;