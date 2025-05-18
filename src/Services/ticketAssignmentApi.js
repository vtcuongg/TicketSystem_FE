import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ticketAssignmentApi = createApi({
    reducerPath: 'ticketAssignmentApi',
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
        assignUsersToTicket: builder.mutation({
            query: (payload) => ({
                url: 'api/TicketAssignment/assign-users',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
});

export const { useAssignUsersToTicketMutation } = ticketAssignmentApi;
