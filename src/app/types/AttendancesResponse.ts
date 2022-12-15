import { Attendance } from './Attendance';

export interface AttendancesResponse {
  data: {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
    docs: Attendance[];
  };
}
