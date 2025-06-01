import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const NotificationApi = createApi({
    reducerPath: 'NotificationApi',
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
        getNotificationById: builder.query({
            query: (userId) => `api/Notification/${userId}`,
        }),

    }),
});

export const { useGetNotificationByIdQuery } = NotificationApi;

