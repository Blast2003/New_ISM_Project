import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_ENROLL_API = "http://localhost:3000/api/v1/enroll";

export const enrollApi = createApi({
  reducerPath: "enrollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_ENROLL_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Ghi danh vào khoá học
    createEnroll: builder.mutation({
      query: (courseId) => ({
        url: "/enroll",
        method: "POST",
        body: { courseId },
      }),
    }),
    // Lấy chi tiết khoá học + trạng thái ghi danh
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    // Lấy toàn bộ khoá học đã ghi danh
    getEnrolledCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateEnrollMutation,
  useGetCourseDetailWithStatusQuery,
  useGetEnrolledCoursesQuery,
} = enrollApi;
