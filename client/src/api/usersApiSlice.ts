import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: '/users/auth/login',
        method: 'POST',
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url:'/users/auth/logout',
        method: 'POST',
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: '/users/',
        method: 'POST',
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: 'users/profile',
        method: 'PUT',
        body: data,
      }),
    }),

    getUser: builder.mutation({
        query: () => ({
            url: '/users/profile',
            method: 'GET',
        }),
    }),
    
  }),
});

export const {
  useLoginMutation ,
  useLogoutMutation ,
  useRegisterMutation ,
  useUpdateUserMutation ,
} = userApiSlice;