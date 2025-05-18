import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7198/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTickets: builder.query({
            query: (params) => {
                const queryString = new URLSearchParams(params).toString();
                return `api/Ticket/search?${queryString}`;
            },
        }),
        createTicket: builder.mutation({
            query: (newTicket) => ({
                url: 'api/Ticket',
                method: 'POST',
                body: newTicket,
            }),
        }),
        deleteTicket: builder.mutation({
            query: (ticketId) => ({
                url: `api/Ticket/${ticketId}`,
                method: 'DELETE',
            }),
        }),
        updateTicket: builder.mutation({
            query: (ticket) => ({
                url: `api/Ticket`,
                method: 'PUT', // hoặc PATCH nếu backend dùng PATCH
                body: ticket,
            }),
        }),
    }),
});

export const { useGetTicketsQuery, useCreateTicketMutation, useDeleteTicketMutation, useUpdateTicketMutation } = ticketApi;
