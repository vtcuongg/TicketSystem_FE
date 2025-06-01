import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://vietcuong-001-site1.jtempurl.com/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getFeedbackByTicketId: builder.query({
            query: (ticketId) => `TicketFeedBack/ByTicketId/${ticketId}`,
        }),
        postFeedback: builder.mutation({
            query: (body) => ({
                url: 'TicketFeedBack',
                method: 'POST',
                body
            }),
        }),
        postFeedbackAssignee: builder.mutation({
            query: (body) => ({
                url: 'TicketFeedBackAssignee',
                method: 'POST',
                body
            }),
        }),
    }),
});

export const { useGetFeedbackByTicketIdQuery, usePostFeedbackMutation, usePostFeedbackAssigneeMutation } = feedbackApi;