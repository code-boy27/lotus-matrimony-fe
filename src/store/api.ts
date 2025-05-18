import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  bio?: string;
  location?: string;
  interests?: string[];
  preferences?: {
    ageRange?: [number, number];
    location?: string;
    distance?: number;
  };
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: async (headers, { getState }) => {
      const state = getState() as RootState;
      const user = state.auth.user;
      if (user) {
        const token = await user.getIdToken();
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => `users/${userId}`,
    }),
    updateUserProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (profile) => ({
        url: `users/${profile.id}`,
        method: "PATCH",
        body: profile,
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = api;
