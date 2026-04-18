export type FetchUserListQueryParams = {
    search?: string;
    cursor?: number;
    limit?: number;
};

export type User = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
}

export type FetchUserListResponseData = {
    users: User[];
    nextCursor: number;
    hasMore: boolean;
}