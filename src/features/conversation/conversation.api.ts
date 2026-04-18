import http from "@/lib/http";
import type { CreateConversationRequestBody, CreateConversationResponseData } from "./conversation.types";

export async function createConversation(body: CreateConversationRequestBody): Promise<CreateConversationResponseData> {
    const res = await http.post<CreateConversationResponseData, CreateConversationRequestBody>("/conversations/create", body);
    if (!res.data.data) {
        throw new Error("Failed to create conversation");
    }
    return res.data.data;
}