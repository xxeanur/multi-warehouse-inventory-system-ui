export interface PaginationParams {
    pageNumber: number;
    pageSize: number;
    searchTerm?: string;
    orderBy?: string;
}

export interface PagedResult<T> {
    data: T[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;

    hasPrevious: boolean;
    hasNext: boolean;
}