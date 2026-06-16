import http from "@/lib/http";
import type { CreateConversationRequestBody, CreateConversationResponseData, FetchConversationListResponseData, FetchMessageDetailsQueryParams, FetchMessageDetailsResponseData, FetchMessagesQueryParams, FetchMessagesResponseData } from "./conversation.types";

export async function createConversation(body: CreateConversationRequestBody): Promise<CreateConversationResponseData> {
    const res = await http.post<CreateConversationResponseData, CreateConversationRequestBody>("/conversations/create", body);
    if (!res.data.data) {
        throw new Error("Failed to create conversation");
    }
    return res.data.data;
}

export async function fetchConversationList(): Promise<FetchConversationListResponseData> {
    const res = await http.get<FetchConversationListResponseData>("/conversations");
    if (!res.data.data) {
        throw new Error("Failed to fetch conversation list");
    }
    return res.data.data;
}

export async function getMessages(params: FetchMessagesQueryParams): Promise<FetchMessagesResponseData> {
    const res = await http.get<FetchMessagesResponseData, FetchMessagesQueryParams>("/messages", params);
    if (!res.data.data) {
        throw new Error("Failed to fetch messages");
    }
    return res.data.data;
}

export async function getMessageDetails(params: FetchMessageDetailsQueryParams): Promise<FetchMessageDetailsResponseData> {
    const res = await http.get<FetchMessageDetailsResponseData, FetchMessageDetailsQueryParams>("/messages/details", params);
    if (!res.data.data) {
        throw new Error("Failed to fetch message details");
    }
    return res.data.data;
}