import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../Services/userApi';
import authReducer from './authSlice';
import { ticketApi } from '../Services/ticketApi';
import { reportApi } from '../Services/reportApi';
import { chatApi } from '../Services/chatApi';
import { departmentApi } from '../Services/departmentAPI';
import { categoryApi } from '../Services/categoryApi';
import { ticketAssignmentApi } from '../Services/ticketAssignmentApi';
import { feedbackApi } from '../Services/feedBackApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userApi.reducerPath]: userApi.reducer,
        [ticketApi.reducerPath]: ticketApi.reducer,
        [reportApi.reducerPath]: reportApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [ticketAssignmentApi.reducerPath]: ticketAssignmentApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(ticketApi.middleware)
            .concat(reportApi.middleware)
            .concat(chatApi.middleware)
            .concat(departmentApi.middleware)
            .concat(categoryApi.middleware)
            .concat(ticketAssignmentApi.middleware)
            .concat(feedbackApi.middleware),
});
