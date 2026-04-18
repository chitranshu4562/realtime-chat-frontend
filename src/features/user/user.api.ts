import http from "@/lib/http";
import type { FetchUserListQueryParams, FetchUserListResponseData } from "./user.types";

export async function fetchUserList(params: FetchUserListQueryParams): Promise<FetchUserListResponseData> {
    const res = await http.get<FetchUserListResponseData, FetchUserListQueryParams>("/users", params);
    if (!res.data.data) {
        throw new Error("Failed to fetch user list");
    }
    return res.data.data;
}