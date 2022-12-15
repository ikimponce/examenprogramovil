import { User } from './User';

export interface UsersResponse {
  data: {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
    docs: User[];
  };
}
